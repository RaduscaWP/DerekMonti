import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderSeoHead } from '../src/seo/head.js';
import { shouldNoindexDeployment } from '../src/seo/deployment.js';
import {
  SITE_ORIGIN,
  notFoundMetadata,
  routeManifest,
  routeOutputPath,
} from '../src/seo/routeManifest.js';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(rootDirectory, 'dist');
const serverEntryPath = path.join(rootDirectory, '.vite', 'ssr', 'entry-server.js');
const templatePath = path.join(distDirectory, 'index.html');
const noindexDeployment = shouldNoindexDeployment();

const { render } = await import(`${pathToFileURL(serverEntryPath).href}?build=${Date.now()}`);
const template = await readFile(templatePath, 'utf8');

function assembleDocument(appHtml, metadata) {
  if (!template.includes('<!--app-html-->')) {
    throw new Error('The client template is missing the <!--app-html--> prerender marker.');
  }
  if (!/<!--seo-head:start-->[\s\S]*?<!--seo-head:end-->/.test(template)) {
    throw new Error('The client template is missing the SEO head markers.');
  }

  return template
    .replace(
      /<!--seo-head:start-->[\s\S]*?<!--seo-head:end-->/,
      renderSeoHead(metadata, { deploymentNoindex: noindexDeployment }),
    )
    .replace('<!--app-html-->', appHtml);
}

async function writeRenderedPage(outputPath, appHtml, metadata) {
  const destination = path.join(distDirectory, outputPath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, assembleDocument(appHtml, metadata), 'utf8');
}

for (const route of routeManifest) {
  const rendered = render(route.pathname);
  if (rendered.metadata.pathname !== route.pathname) {
    throw new Error(`SSR route metadata mismatch for ${route.pathname}.`);
  }
  const emittedMetadata = noindexDeployment ? { ...route, indexable: false } : route;
  await writeRenderedPage(routeOutputPath(route.pathname), rendered.html, emittedMetadata);
}

const notFound = render('/__not-found__');
await writeRenderedPage('404.html', notFound.html, notFoundMetadata);

const sitemapEntries = routeManifest
  .filter((route) => route.indexable && !noindexDeployment)
  .map((route) => `  <url>\n    <loc>${route.canonical}</loc>\n  </url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

const robots = noindexDeployment
  ? `User-agent: *\nDisallow: /\n`
  : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;

await Promise.all([
  writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(path.join(distDirectory, 'robots.txt'), robots, 'utf8'),
]);

console.log(
  `Prerendered ${routeManifest.length} routes plus 404.html${noindexDeployment ? ' with preview noindex protection' : ''}.`,
);
