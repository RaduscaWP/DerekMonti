import test from 'node:test';
import assert from 'node:assert/strict';
import { blogPosts } from '../src/data/siteData.js';
import { corePages } from '../src/data/corePages.js';
import { shouldNoindexDeployment } from '../src/seo/deployment.js';
import {
  DEPLOYMENT_NOINDEX_META_NAME,
  isMetadataIndexable,
  renderSeoHead,
  structuredDataFor,
} from '../src/seo/head.js';
import { routeManifest } from '../src/seo/routeManifest.js';

test('deployment guard blocks previews and explicit staging environments', () => {
  assert.equal(shouldNoindexDeployment({}), false);
  assert.equal(shouldNoindexDeployment({ VERCEL_ENV: 'production' }), false);
  assert.equal(shouldNoindexDeployment({ VERCEL_ENV: 'preview' }), true);
  assert.equal(shouldNoindexDeployment({ VERCEL_ENV: 'development' }), true);
  assert.equal(shouldNoindexDeployment({ FLY_WITH_DEREK_NOINDEX: 'true' }), true);
  assert.equal(
    shouldNoindexDeployment({ VERCEL_ENV: 'production', FLY_WITH_DEREK_NOINDEX: '1' }),
    true,
  );
});

test('every published route is explicit, unique, canonical, and slash-consistent', () => {
  assert.equal(routeManifest.length, 16);
  assert.equal(new Set(routeManifest.map((route) => route.pathname)).size, routeManifest.length);
  assert.equal(new Set(routeManifest.map((route) => route.title)).size, routeManifest.length);
  assert.equal(new Set(routeManifest.map((route) => route.description)).size, routeManifest.length);

  for (const route of routeManifest) {
    assert.equal(route.indexable, true, `${route.pathname} must be explicitly approved for indexing`);
    assert.match(route.canonical, /^https:\/\/www\.flywithderek\.com\//);
    if (route.pathname !== '/') assert.doesNotMatch(route.pathname, /\/$/);
  }

  assert.ok(corePages.every((page) => page.approvedForIndexing === true && page.indexable === true));
  assert.ok(blogPosts.every((post) => post.approvedForIndexing === true));
});

test('article schema does not invent an author or publication date', () => {
  const article = routeManifest.find((route) => route.type === 'article');
  const schema = structuredDataFor(article);

  assert.equal(schema['@type'], 'Article');
  assert.equal(schema.author, undefined);
  assert.equal(schema.datePublished, undefined);
  assert.equal(schema.dateModified, undefined);
  assert.equal(schema.headline, article.title.replace(/ \| Fly with Derek$/, ''));
});

test('noindex output suppresses structured data while retaining the production canonical', () => {
  const route = routeManifest[0];
  const head = renderSeoHead(route, { deploymentNoindex: true });

  assert.match(head, /name="robots" content="noindex, nofollow"/);
  assert.ok(head.includes(`name="${DEPLOYMENT_NOINDEX_META_NAME}" content="true"`));
  assert.ok(head.includes(`rel="canonical" href="${route.canonical}"`));
  assert.doesNotMatch(head, /application\/ld\+json/);
  assert.equal(isMetadataIndexable(route, true), false);
  assert.equal(isMetadataIndexable(route, false), true);
});
