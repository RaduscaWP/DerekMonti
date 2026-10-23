import { SITE_NAME, SITE_ORIGIN } from './routeManifest.js';

export const DEPLOYMENT_NOINDEX_META_NAME = 'fly-with-derek-noindex';

export function isMetadataIndexable(metadata, deploymentNoindex = false) {
  return Boolean(metadata.indexable && !deploymentNoindex);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function structuredDataFor(metadata) {
  const base = {
    '@context': 'https://schema.org',
    '@type': metadata.type === 'article' ? 'Article' : 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url: metadata.canonical || `${SITE_ORIGIN}/`,
    image: metadata.image,
    inLanguage: metadata.locale || 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: metadata.locale && metadata.locale !== 'en' ? `${SITE_ORIGIN}/${metadata.locale}` : `${SITE_ORIGIN}/`,
    },
  };

  const pageData = metadata.type === 'article'
    ? {
      ...base,
      headline: metadata.title.replace(/ \| (?:Derek Monti|Fly with Derek)$/, ''),
      ...(metadata.publishedTime
        ? { datePublished: metadata.publishedTime, dateModified: metadata.publishedTime }
        : {}),
    }
    : base;

  if (!metadata.schema?.length) return pageData;

  const { '@context': _pageContext, ...pageNode } = pageData;
  const supplementalNodes = metadata.schema.map((node) => {
    const { '@context': _nodeContext, ...schemaNode } = node;
    return schemaNode;
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [pageNode, ...supplementalNodes],
  };
}

export function renderSeoHead(metadata, { deploymentNoindex = false } = {}) {
  const indexable = isMetadataIndexable(metadata, deploymentNoindex);
  const robots = indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow';
  const deploymentMarker = deploymentNoindex
    ? `\n    <meta name="${DEPLOYMENT_NOINDEX_META_NAME}" content="true" />`
    : '';
  const canonical = metadata.canonical
    ? `\n    <link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`
    : '';
  const alternates = indexable ? (metadata.alternates || []).map(({ language, href }) => (
    `\n    <link rel="alternate" hreflang="${escapeHtml(language)}" href="${escapeHtml(href)}" />`
  )).join('') : '';
  const alternateLocales = indexable ? (metadata.alternates || [])
    .filter(({ language }) => language !== metadata.locale && language !== 'x-default')
    .map(({ language }) => `\n    <meta property="og:locale:alternate" content="${{ en: 'en_US', ro: 'ro_RO', ru: 'ru_RU', de: 'de_DE' }[language]}" />`).join('') : '';
  const structuredData = indexable
    ? `\n    <script id="page-structured-data" type="application/ld+json">${JSON.stringify(
        structuredDataFor(metadata),
      ).replaceAll('<', '\\u003c')}</script>`
    : '';

  return `<!--seo-head:start-->
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="robots" content="${robots}" />${deploymentMarker}${canonical}${alternates}
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="${escapeHtml(metadata.openGraphLocale || 'en_US')}" />${alternateLocales}
    <meta property="og:type" content="${metadata.type === 'article' ? 'article' : 'website'}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${escapeHtml(metadata.canonical || `${SITE_ORIGIN}/`)}" />
    <meta property="og:image" content="${escapeHtml(metadata.image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${escapeHtml(metadata.image)}" />${structuredData}
    <!--seo-head:end-->`;
}
