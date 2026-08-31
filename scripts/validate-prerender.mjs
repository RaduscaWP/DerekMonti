import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEPLOYMENT_NOINDEX_META_NAME } from '../src/seo/head.js';
import { SITE_ORIGIN, routeManifest, routeOutputPath } from '../src/seo/routeManifest.js';
import { shouldNoindexDeployment } from '../src/seo/deployment.js';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(rootDirectory, 'dist');
const errors = [];
const noindexDeployment = shouldNoindexDeployment();

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function normalizeText(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function matches(html, expression) {
  return [...html.matchAll(expression)];
}

function visibleText(html) {
  return normalizeText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' '),
  );
}

const seen = {
  title: new Map(),
  description: new Map(),
  h1: new Map(),
};

function recordUnique(kind, value, pathname) {
  const existing = seen[kind].get(value);
  if (existing) {
    errors.push(`Duplicate ${kind} on ${existing} and ${pathname}: ${value}`);
  } else {
    seen[kind].set(value, pathname);
  }
}

for (const route of routeManifest) {
  const outputPath = routeOutputPath(route.pathname);
  let html;
  try {
    html = await readFile(path.join(distDirectory, outputPath), 'utf8');
  } catch {
    errors.push(`Missing prerendered file for ${route.pathname}: ${outputPath}`);
    continue;
  }

  const titles = matches(html, /<title>([\s\S]*?)<\/title>/gi).map((match) => normalizeText(match[1]));
  const descriptions = matches(
    html,
    /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/gi,
  ).map((match) => decodeEntities(match[1]).trim());
  const canonicals = matches(html, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/gi).map(
    (match) => decodeEntities(match[1]),
  );
  const headings = matches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi).map((match) => normalizeText(match[1]));

  if (titles.length !== 1) errors.push(`${route.pathname} must contain exactly one title; found ${titles.length}.`);
  if (descriptions.length !== 1) {
    errors.push(`${route.pathname} must contain exactly one meta description; found ${descriptions.length}.`);
  }
  if (canonicals.length !== 1) {
    errors.push(`${route.pathname} must contain exactly one canonical; found ${canonicals.length}.`);
  }
  if (headings.length !== 1) errors.push(`${route.pathname} must contain exactly one H1; found ${headings.length}.`);

  if (titles[0]) {
    if (titles[0] !== route.title) errors.push(`${route.pathname} title does not match its manifest entry.`);
    recordUnique('title', titles[0], route.pathname);
  }
  if (descriptions[0]) {
    if (descriptions[0] !== route.description) {
      errors.push(`${route.pathname} description does not match its manifest entry.`);
    }
    recordUnique('description', descriptions[0], route.pathname);
  }
  if (canonicals[0] && canonicals[0] !== route.canonical) {
    errors.push(`${route.pathname} canonical is ${canonicals[0]}, expected ${route.canonical}.`);
  }
  if (headings[0]) recordUnique('h1', headings[0], route.pathname);

  if (/\bhref\s*=\s*["']#["']/i.test(html)) {
    errors.push(`${route.pathname} contains an empty hash link (href="#").`);
  }
  const containsNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const deploymentMarkers = matches(
    html,
    new RegExp(`<meta\\s+name="${DEPLOYMENT_NOINDEX_META_NAME}"\\s+content="true"\\s*\\/?>`, 'gi'),
  );
  if (noindexDeployment && !containsNoindex) {
    errors.push(`${route.pathname} must contain noindex on a non-production deployment.`);
  } else if (!noindexDeployment && containsNoindex) {
    errors.push(`${route.pathname} is indexable in the manifest but contains noindex.`);
  }
  if (noindexDeployment && deploymentMarkers.length !== 1) {
    errors.push(`${route.pathname} must contain exactly one client noindex deployment marker.`);
  } else if (!noindexDeployment && deploymentMarkers.length !== 0) {
    errors.push(`${route.pathname} must not contain a client noindex deployment marker in production.`);
  }

  const text = visibleText(html);
  if (/\b(?:placeholder|placeholders|todo|tbd|changeme)\b/i.test(text) || /\blorem ipsum\b/i.test(text)) {
    errors.push(`${route.pathname} contains visible placeholder copy.`);
  }
  if (/\[(?:derek(?:'s)?|your|insert|replace|todo)[^\]]*\]/i.test(text)) {
    errors.push(`${route.pathname} contains an unresolved bracketed placeholder.`);
  }
}

const sitemap = await readFile(path.join(distDirectory, 'sitemap.xml'), 'utf8');
const sitemapUrls = matches(sitemap, /<loc>([^<]+)<\/loc>/gi)
  .map((match) => decodeEntities(match[1]))
  .sort();
const expectedSitemapUrls = routeManifest
  .filter((route) => route.indexable && !noindexDeployment)
  .map((route) => route.canonical)
  .sort();

if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemapUrls)) {
  errors.push('sitemap.xml URLs do not exactly match the indexable route manifest.');
}
if (new Set(sitemapUrls).size !== sitemapUrls.length) {
  errors.push('sitemap.xml contains duplicate URLs.');
}

const robots = await readFile(path.join(distDirectory, 'robots.txt'), 'utf8');
if (!/^User-agent:\s*\*/m.test(robots)) {
  errors.push('robots.txt is missing its crawler user-agent directive.');
}
if (noindexDeployment) {
  if (!/^Disallow:\s*\/$/m.test(robots) || /^Allow:\s*\/$/m.test(robots)) {
    errors.push('robots.txt must block all crawling on a non-production deployment.');
  }
} else {
  if (!/^Allow:\s*\/$/m.test(robots)) {
    errors.push('robots.txt is missing its public allow directive.');
  }
  if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
    errors.push('robots.txt does not reference the canonical sitemap URL.');
  }
}

const notFound = await readFile(path.join(distDirectory, '404.html'), 'utf8');
const notFoundDeploymentMarkers = matches(
  notFound,
  new RegExp(`<meta\\s+name="${DEPLOYMENT_NOINDEX_META_NAME}"\\s+content="true"\\s*\\/?>`, 'gi'),
);
if (!/<meta\s+name="robots"\s+content="noindex, nofollow"/i.test(notFound)) {
  errors.push('404.html must be noindex, nofollow.');
}
if (noindexDeployment && notFoundDeploymentMarkers.length !== 1) {
  errors.push('404.html must contain exactly one client noindex deployment marker in preview mode.');
} else if (!noindexDeployment && notFoundDeploymentMarkers.length !== 0) {
  errors.push('404.html must not contain a client noindex deployment marker in production.');
}
if (matches(notFound, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi).length !== 1) {
  errors.push('404.html must contain exactly one H1.');
}
if (/<link\s+rel="canonical"/i.test(notFound)) {
  errors.push('404.html must not declare a canonical URL.');
}
if (/\bhref\s*=\s*["']#["']/i.test(notFound)) {
  errors.push('404.html contains an empty hash link (href="#").');
}

if (errors.length) {
  console.error(`Prerender validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${routeManifest.length} prerendered routes, sitemap.xml, robots.txt, and 404.html${noindexDeployment ? ' in preview noindex mode' : ''}.`,
  );
}
