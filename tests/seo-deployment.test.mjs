import test from 'node:test';
import assert from 'node:assert/strict';
import { blogPosts } from '../src/data/blog.js';
import { corePages } from '../src/data/corePages.js';
import { routePages } from '../src/data/routePages.js';
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
  // 6 core routes + landing pages + blog articles; route pages are added below when registered.
  assert.equal(routeManifest.length, 6 + corePages.length + routePages.length + blogPosts.length);
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

test('article schema only carries an author and dates when the content source provides them', () => {
  for (const article of routeManifest.filter((route) => route.type === 'article')) {
    const schema = structuredDataFor(article);
    const nodes = schema['@graph'] || [schema];
    const node = nodes.find((entry) => entry['@type'] === 'Article');

    assert.ok(node, `${article.pathname} must emit an Article node`);
    assert.equal(node.headline, article.title.replace(/ \| Fly with Derek$/, ''));
    assert.ok(nodes.some((entry) => entry['@type'] === 'BreadcrumbList'), 'articles carry breadcrumbs');
    if (article.author) {
      assert.equal(node.author.name, article.author);
      assert.equal(node.datePublished, article.publishedTime);
    } else {
      assert.equal(node.author, undefined);
      assert.equal(node.datePublished, undefined);
      assert.equal(node.dateModified, undefined);
    }
  }
});

test('landing pages and the home page expose FAQ and breadcrumb structured data', () => {
  const home = routeManifest.find((route) => route.pathname === '/');
  const homeTypes = (structuredDataFor(home)['@graph'] || []).map((node) => node['@type']);
  assert.ok(homeTypes.includes('FAQPage'));

  for (const page of corePages) {
    const route = routeManifest.find((entry) => entry.pathname === page.path);
    const types = (structuredDataFor(route)['@graph'] || []).map((node) => node['@type']);
    assert.ok(types.includes('BreadcrumbList'), `${page.path} breadcrumbs`);
    assert.ok(types.includes('FAQPage'), `${page.path} FAQPage`);
    assert.ok(types.includes('Service'), `${page.path} Service`);
  }

  for (const page of routePages) {
    const route = routeManifest.find((entry) => entry.pathname === page.path);
    const types = (structuredDataFor(route)['@graph'] || []).map((node) => node['@type']);
    assert.ok(types.includes('BreadcrumbList'), `${page.path} breadcrumbs`);
    assert.ok(types.includes('FAQPage'), `${page.path} FAQPage`);
    assert.ok(types.includes('Service'), `${page.path} Service`);
  }
});

test('legal pages stay indexable but out of the sitemap', () => {
  for (const pathname of ['/privacy', '/terms']) {
    const route = routeManifest.find((entry) => entry.pathname === pathname);
    assert.equal(route.indexable, true);
    assert.equal(route.sitemap, false);
  }
  assert.ok(routeManifest.every((route) => /^\d{4}-\d{2}-\d{2}/.test(route.lastmod)));
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
