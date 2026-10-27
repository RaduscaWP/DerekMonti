import { blogPosts } from '../data/blog.js';
import { homeFaqs } from '../data/siteData.js';
import { routePages } from '../data/routePages.js';
import { corePages } from '../data/corePages.js';

export const SITE_NAME = 'Fly with Derek';
export const SITE_ORIGIN = 'https://www.flywithderek.com';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_ORIGIN}/images/og/default.jpg`;
export const PORTRAIT_IMAGE = `${SITE_ORIGIN}/images/derek-monti.jpg`;
// Bump when site-wide content changes; individual routes can carry their own `updated` date.
export const CONTENT_UPDATED = '2026-10-23';

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  return `/${pathname}`.replace(/\/{2,}/g, '/').replace(/\/$/, '');
}

export function canonicalUrl(pathname) {
  const normalized = normalizePathname(pathname);
  return normalized === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalized}`;
}

const coreRoutes = [
  {
    pathname: '/',
    indexable: true,
    title: 'Business Class Tickets at Insider Prices | Fly with Derek',
    description:
      'Business & First Class tickets typically 15–60% below published fares, sourced personally by Derek Monti. Free quote within hours, WhatsApp 24/7.',
    type: 'website',
    priority: 1,
    faqs: homeFaqs,
    breadcrumbName: null,
  },
  {
    pathname: '/services',
    indexable: true,
    title: 'Business Class Travel Agent – Insider Fares | Fly with Derek',
    description:
      'Business and first class tickets, last-minute seats and multi-city trips handled personally by Derek Monti. Free quote, WhatsApp +1 (786) 706-4828.',
    type: 'website',
    priority: 0.9,
    breadcrumbName: 'Services',
  },
  {
    pathname: '/about',
    indexable: true,
    title: 'About Derek Monti – Business Class Advisor in Miami',
    description:
      'Derek Monti is a personal flight advisor in Miami who finds Business and First Class tickets at consolidator prices for private clients worldwide.',
    type: 'profile',
    priority: 0.8,
    image: PORTRAIT_IMAGE,
    breadcrumbName: 'About Derek',
  },
  {
    pathname: '/blog',
    indexable: true,
    title: 'Business Class Tips, Deals & Insider Guides | Fly with Derek',
    description:
      'How to fly business and first class for less: consolidator fares, last-minute seats, cabin comparisons and booking tips from Derek Monti.',
    type: 'website',
    priority: 0.8,
    breadcrumbName: 'Blog',
  },
  {
    pathname: '/privacy',
    indexable: true,
    sitemap: false,
    title: 'Privacy Policy | Fly with Derek',
    description:
      'How Derek Monti collects, uses, and protects the personal information of travelers using this site.',
    type: 'website',
    priority: 0.2,
    breadcrumbName: 'Privacy Policy',
  },
  {
    pathname: '/terms',
    indexable: true,
    sitemap: false,
    title: 'Terms of Service | Fly with Derek',
    description: 'The terms that apply when you request a flight quote or interact with Derek Monti.',
    type: 'website',
    priority: 0.2,
    breadcrumbName: 'Terms of Service',
  },
];

const articleRoutes = blogPosts.map((post) => ({
  pathname: `/blog/${post.slug}`,
  indexable: post.approvedForIndexing === true,
  title: `${post.seoTitle || post.title} | Fly with Derek`,
  description: post.description || post.excerpt,
  type: 'article',
  image: post.image ? `${SITE_ORIGIN}${post.image}` : DEFAULT_SOCIAL_IMAGE,
  imageAlt: post.imageAlt || post.title,
  publishedTime: post.publishedTime || post.date || null,
  updated: post.updated || post.publishedTime || null,
  author: post.author || null,
  priority: 0.7,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ],
}));

const p0LandingRoutes = corePages.map((page) => ({
  pathname: page.path,
  indexable: page.indexable === true,
  title: page.title,
  description: page.description,
  type: 'website',
  priority: 0.8,
  schema: page.schema,
  faqs: page.faqs,
  updated: page.updated || null,
}));

const corridorNames = {
  '/business-class-flights/europe': 'Business class flights to Europe',
  '/business-class-flights/usa': 'Business class flights to the USA',
  '/business-class-flights': 'Business class flights',
};

// City-pair landing pages (src/data/routePages.js): Service + FAQ + breadcrumbs, own image.
const routePageRoutes = routePages.map((page) => ({
  pathname: page.path,
  indexable: page.approvedForIndexing === true,
  title: page.title,
  description: page.description,
  type: 'website',
  priority: 0.7,
  image: page.image ? `${SITE_ORIGIN}${page.image}` : DEFAULT_SOCIAL_IMAGE,
  imageAlt: page.imageAlt,
  schema: [
    {
      '@type': 'Service',
      name: `${page.origin.city} to ${page.destination.city} business class flights`,
      description: page.description,
      serviceType: 'Business and first class flight booking',
      url: `${SITE_ORIGIN}${page.path}`,
      provider: { '@type': 'Person', name: 'Derek Monti' },
    },
  ],
  faqs: page.faqs,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: corridorNames[page.corridor] || 'Business class flights', path: page.corridor },
    { name: `${page.origin.city} to ${page.destination.city}`, path: page.path },
  ],
  updated: page.updated || null,
}));

function finalizeRoute(route) {
  return Object.freeze({
    image: DEFAULT_SOCIAL_IMAGE,
    ...route,
    indexable: route.indexable === true,
    sitemap: route.sitemap !== false,
    image: route.image || DEFAULT_SOCIAL_IMAGE,
    imageAlt: route.imageAlt || 'Fly with Derek: Business and First Class tickets at insider prices',
    pathname: normalizePathname(route.pathname),
    canonical: canonicalUrl(route.pathname),
    lastmod: route.updated || CONTENT_UPDATED,
  });
}

// Add future landing pages to coreRoutes or their own data file. Blog articles are derived
// from the content source so routing, metadata, prerendering, and the sitemap stay aligned.
export const routeManifest = Object.freeze(
  [...coreRoutes, ...p0LandingRoutes, ...routePageRoutes, ...articleRoutes].map(finalizeRoute),
);

export const notFoundMetadata = Object.freeze({
  pathname: '/404',
  title: 'Page Not Found | Fly with Derek',
  description: 'The requested page could not be found. Return to Fly with Derek to continue planning your trip.',
  type: 'website',
  image: DEFAULT_SOCIAL_IMAGE,
  imageAlt: 'Fly with Derek',
  canonical: null,
  indexable: false,
  sitemap: false,
});

const routeByPathname = new Map(routeManifest.map((route) => [route.pathname, route]));

export function getRouteMetadata(urlOrPathname) {
  const url = new URL(urlOrPathname || '/', SITE_ORIGIN);
  return routeByPathname.get(normalizePathname(url.pathname)) || notFoundMetadata;
}

export function routeOutputPath(pathname) {
  const normalized = normalizePathname(pathname);
  return normalized === '/' ? 'index.html' : `${normalized.slice(1)}.html`;
}
