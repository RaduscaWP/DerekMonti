import { DEFAULT_SOCIAL_IMAGE, PORTRAIT_IMAGE, SITE_NAME, SITE_ORIGIN } from './routeManifest.js';
import { contactConfig } from '../data/siteData.js';

export const DEPLOYMENT_NOINDEX_META_NAME = 'fly-with-derek-noindex';

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const PERSON_ID = `${SITE_ORIGIN}/#derek-monti`;
const TELEPHONE = `+${contactConfig.phoneHref.replace(/^\+/, '')}`;

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

function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function absoluteUrl(path) {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

// Site-wide entity graph: who runs the site, how to reach him, and the agency that
// issues the tickets. Emitted once per page next to the page-specific node.
export function siteEntityGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: 'en',
      },
      {
        '@type': 'TravelAgency',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        image: PORTRAIT_IMAGE,
        logo: `${SITE_ORIGIN}/favicon-512.png`,
        telephone: TELEPHONE,
        email: contactConfig.email,
        description:
          'Personal flight advisor sourcing Business and First Class airline tickets at consolidator prices for private clients.',
        areaServed: ['US', 'EU'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Miami',
          addressRegion: 'FL',
          addressCountry: 'US',
        },
        founder: { '@id': PERSON_ID },
        memberOf: {
          '@type': 'Organization',
          name: contactConfig.agency.name,
          url: contactConfig.agency.url,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: TELEPHONE,
            contactType: 'sales',
            availableLanguage: ['English'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Derek Monti',
        jobTitle: 'Personal flight advisor',
        url: `${SITE_ORIGIN}/about`,
        image: PORTRAIT_IMAGE,
        telephone: TELEPHONE,
        email: contactConfig.email,
        worksFor: { '@id': ORGANIZATION_ID },
        knowsAbout: ['Business class flights', 'First class flights', 'Consolidator airfares', 'Multi-city itineraries'],
      },
    ],
  };
}

function breadcrumbNode(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function faqNode(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function structuredDataFor(metadata) {
  const base = {
    '@context': 'https://schema.org',
    '@type': metadata.type === 'article' ? 'Article' : 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url: metadata.canonical || `${SITE_ORIGIN}/`,
    image: metadata.image,
    isPartOf: {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
    },
  };

  const pageData = metadata.type === 'article'
    ? {
      ...base,
      headline: metadata.title.replace(/ \| (?:Derek Monti|Fly with Derek)$/, ''),
      mainEntityOfPage: metadata.canonical || `${SITE_ORIGIN}/`,
      ...(metadata.publishedTime
        ? { datePublished: metadata.publishedTime, dateModified: metadata.updated || metadata.publishedTime }
        : {}),
      ...(metadata.author
        ? {
          author: { '@type': 'Person', '@id': PERSON_ID, name: metadata.author, url: `${SITE_ORIGIN}/about` },
          publisher: { '@id': ORGANIZATION_ID },
        }
        : {}),
    }
    : base;

  const supplementalNodes = (metadata.schema || []).map((node) => {
    const { '@context': _nodeContext, ...schemaNode } = node;
    return schemaNode;
  });
  const hasBreadcrumbs = supplementalNodes.some((node) => node['@type'] === 'BreadcrumbList');
  if (!hasBreadcrumbs && metadata.breadcrumbs?.length) {
    supplementalNodes.push(breadcrumbNode(metadata.breadcrumbs));
  } else if (!hasBreadcrumbs && metadata.breadcrumbName && metadata.pathname && metadata.pathname !== '/') {
    supplementalNodes.push(
      breadcrumbNode([
        { name: 'Home', path: '/' },
        { name: metadata.breadcrumbName, path: metadata.pathname },
      ]),
    );
  }
  if (metadata.faqs?.length) supplementalNodes.push(faqNode(metadata.faqs));

  if (!supplementalNodes.length) return pageData;

  const { '@context': _pageContext, ...pageNode } = pageData;
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
  const imageAlt = metadata.imageAlt || metadata.title;
  const imageSize = metadata.image === DEFAULT_SOCIAL_IMAGE
    ? `\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />`
    : '';
  const structuredData = indexable
    ? `\n    <script id="page-structured-data" type="application/ld+json">${serializeJsonLd(
        structuredDataFor(metadata),
      )}</script>\n    <script id="site-structured-data" type="application/ld+json">${serializeJsonLd(
        siteEntityGraph(),
      )}</script>`
    : '';

  return `<!--seo-head:start-->
    <title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="robots" content="${robots}" />${deploymentMarker}${canonical}
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="${metadata.type === 'article' ? 'article' : 'website'}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${escapeHtml(metadata.canonical || `${SITE_ORIGIN}/`)}" />
    <meta property="og:image" content="${escapeHtml(metadata.image)}" />${imageSize}
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${escapeHtml(metadata.image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />${structuredData}
    <!--seo-head:end-->`;
}
