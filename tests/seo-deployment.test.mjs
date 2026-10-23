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
import { getRouteMetadata, routeManifest, withLanguageAlternates } from '../src/seo/routeManifest.js';
import { contentRoutes, getLocalizedPath, localeFromPath, localePath } from '../src/i18n/locales.js';
import { localizedIndexingApproved } from '../src/i18n/reviewStatus.js';
import { createTranslator, messages } from '../src/i18n/messages.js';
import { legalSourceMessages, legalDocuments } from '../src/i18n/legalContent.js';
import { translations as legalTranslations } from '../src/i18n/legalCopy.js';

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
  assert.equal(routeManifest.filter((route) => route.locale === 'en').length, 16);
  assert.equal(routeManifest.length, 16 + contentRoutes.length * 3);
  assert.equal(new Set(routeManifest.map((route) => route.pathname)).size, routeManifest.length);
  assert.equal(new Set(routeManifest.map((route) => route.title)).size, routeManifest.length);
  assert.equal(new Set(routeManifest.map((route) => route.description)).size, routeManifest.length);

  for (const route of routeManifest) {
    assert.equal(route.indexable, route.locale === 'en' || localizedIndexingApproved, `${route.pathname} approval state must be explicit`);
    assert.match(route.canonical, /^https:\/\/www\.flywithderek\.com\//);
    if (route.pathname !== '/') assert.doesNotMatch(route.pathname, /\/$/);
  }

  assert.ok(corePages.every((page) => page.approvedForIndexing === true && page.indexable === true));
  assert.ok(blogPosts.every((post) => post.approvedForIndexing === true));
});

test('locale links preserve the subject, query and hash without inventing article translations', () => {
  assert.equal(localePath('/services#review-framework', 'ro'), '/ro/servicii#review-framework');
  assert.equal(localePath('/ru/o-dereke?source=nav#profile', 'de'), '/de/ueber-derek?source=nav#profile');
  assert.equal(localePath('/#request-form', 'ru'), '/ru#request-form');
  assert.equal(localePath('#review-framework', 'ru'), '#review-framework');
  assert.equal(localePath('mailto:Derek@travelbusinessclass.com', 'de'), 'mailto:Derek@travelbusinessclass.com');
  assert.equal(getLocalizedPath('/blog', 'ro'), null);
  assert.equal(getLocalizedPath('/blog/an-untranslated-guide', 'ru'), null);
  assert.equal(localePath('/business-class-flights/europe', 'de'), '/business-class-flights/europe');
  assert.equal(localeFromPath('/rubbish'), 'en');
  assert.equal(localeFromPath('/ru/unavailable'), 'ru');
});

test('first-response locale metadata and genuine unknown routes stay separate', () => {
  const romanian = getRouteMetadata('/ro/servicii');
  assert.equal(romanian.locale, 'ro');
  assert.equal(romanian.openGraphLocale, 'ro_RO');
  assert.equal(romanian.canonical, 'https://www.flywithderek.com/ro/servicii');
  assert.match(romanian.title, /consiliere/);
  assert.equal(getRouteMetadata('/ru/ne-sushchestvuet').canonical, null);
  assert.equal(getRouteMetadata('/ru/ne-sushchestvuet').indexable, false);
  assert.equal(getRouteMetadata('/ru/ne-sushchestvuet').locale, 'ru');
  assert.match(getRouteMetadata('/ru/ne-sushchestvuet').title, /не найдена/);
  assert.equal(getRouteMetadata('/ro/blog').canonical, null);
});

test('hreflang contains only reciprocal approved equivalents and subject-specific English fallback', () => {
  const home = routeManifest.filter((route) => route.contentId === 'home');
  const approved = withLanguageAlternates(home.map((route) => ({ ...route, indexable: route.locale !== 'de' })));
  for (const route of approved.filter((entry) => entry.indexable)) {
    assert.deepEqual(route.alternates.map((alternate) => alternate.language), ['en', 'ro', 'ru', 'x-default']);
    assert.ok(route.alternates.some(({ href, language }) => href === route.canonical && language === route.locale));
    assert.equal(route.alternates.at(-1).href, 'https://www.flywithderek.com/');
    const head = renderSeoHead(route);
    assert.equal((head.match(/hreflang=/g) || []).length, 4);
    assert.doesNotMatch(renderSeoHead(route, { deploymentNoindex: true }), /hreflang=/);
  }
  assert.deepEqual(approved.find((route) => route.locale === 'de').alternates, []);
  assert.equal(structuredDataFor(approved.find((route) => route.locale === 'ru')).inLanguage, 'ru');
});

test('translation interpolation uses only supplied fields and keeps an English source fallback', () => {
  const translate = createTranslator('ro');
  assert.equal(translate('unregistered-example', 'Request {reference}', { reference: 'ABC123' }), 'Request ABC123');
  assert.equal(translate('unregistered-example', 'Request {missing}'), 'Request {missing}');
});

test('every disclosure section and body is present in each locale, including safety limits and retention', () => {
  const expectedKeys = Object.keys(legalSourceMessages).sort();
  for (const locale of ['ro', 'ru', 'de']) {
    assert.deepEqual(Object.keys(legalTranslations[locale]).sort(), expectedKeys);
    for (const key of expectedKeys) assert.ok(legalTranslations[locale][key]?.trim(), `${locale}:${key} must be complete`);
    assert.match(legalTranslations[locale]['legal.updated'], /\{date\}/);
    assert.match(legalTranslations[locale]['legal.privacy.retention.body'], /48/);
    assert.ok(legalTranslations[locale]['legal.terms.service.body'].includes('Fly with Derek'));
  }
  assert.equal(legalDocuments.privacy.updated, '2026-10-03');
  assert.match(legalSourceMessages['legal.privacy.services.redis.text'], /required for automatic intake on public deployments/);
  assert.doesNotMatch(legalSourceMessages['legal.privacy.services.redis.text'], /otherwise the API uses an in-memory fallback/);
  assert.match(legalSourceMessages['legal.privacy.services.resend.text'], /does not guarantee inbox delivery/);
  assert.equal(legalDocuments.terms.updated, '2026-08-31');
});

test('locale dictionaries cover the same shared UI and recovery keys with matching interpolation fields', () => {
  const referenceKeys = Object.keys(messages.ro).sort();
  const placeholders = (value) => [...String(value).matchAll(/\{([a-zA-Z\d_]+)\}/g)].map((match) => match[1]).sort();
  for (const locale of ['ru', 'de']) {
    assert.deepEqual(Object.keys(messages[locale]).sort(), referenceKeys, `${locale} must cover the whole localized journey`);
    for (const key of referenceKeys) {
      assert.ok(messages[locale][key]?.trim(), `${locale}:${key} must have copy`);
      assert.deepEqual(placeholders(messages[locale][key]), placeholders(messages.ro[key]), `${locale}:${key} interpolation must preserve the same data`);
    }
  }
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
