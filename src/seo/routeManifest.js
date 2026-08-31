import { blogPosts } from '../data/siteData.js';
import { corePages } from '../data/corePages.js';

export const SITE_NAME = 'Fly with Derek';
export const SITE_ORIGIN = 'https://www.flywithderek.com';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_ORIGIN}/images/derek-monti.jpg`;

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
    title: 'Premium Business & First Class Flight Guidance | Fly with Derek',
    description:
      'Request a personal review of business- and first-class flight options across the United States, Europe, and international routes.',
    type: 'website',
    priority: 1,
  },
  {
    pathname: '/services',
    indexable: true,
    title: 'Premium Flight Advisory Services | Fly with Derek',
    description:
      'Explore personal itinerary review for business class, first class, complex routes, and time-sensitive premium travel requests.',
    type: 'website',
    priority: 0.9,
  },
  {
    pathname: '/about',
    indexable: true,
    title: 'About Derek Monti | Personal Premium Flight Guidance',
    description:
      'Meet Derek Monti and learn how Fly with Derek approaches business- and first-class itinerary requests.',
    type: 'profile',
    priority: 0.8,
  },
  {
    pathname: '/blog',
    indexable: true,
    title: 'Premium Flight Planning Guides | Fly with Derek',
    description:
      'Practical guides for comparing business class, cabin consistency, fare rules, and time-sensitive premium travel requests.',
    type: 'website',
    priority: 0.8,
  },
  {
    pathname: '/privacy',
    indexable: true,
    title: 'Privacy Policy | Derek Monti',
    description:
      'How Derek Monti collects, uses, and protects the personal information of travelers using this site.',
    type: 'website',
    priority: 0.2,
  },
  {
    pathname: '/terms',
    indexable: true,
    title: 'Terms of Service | Derek Monti',
    description: 'The terms that apply when you request a flight quote or interact with Derek Monti.',
    type: 'website',
    priority: 0.2,
  },
];

const articleRoutes = blogPosts.map((post) => ({
  pathname: `/blog/${post.slug}`,
  indexable: post.approvedForIndexing === true,
  title: `${post.title} | Fly with Derek`,
  description: post.excerpt,
  type: 'article',
  image: post.image || DEFAULT_SOCIAL_IMAGE,
  publishedTime: post.publishedTime || post.date || null,
  priority: 0.7,
}));

const p0LandingRoutes = corePages.map((page) => ({
  pathname: page.path,
  indexable: page.indexable === true,
  title: page.title,
  description: page.description,
  type: 'website',
  priority: 0.8,
  schema: page.schema,
}));

function finalizeRoute(route) {
  return Object.freeze({
    image: DEFAULT_SOCIAL_IMAGE,
    ...route,
    indexable: route.indexable === true,
    image: route.image || DEFAULT_SOCIAL_IMAGE,
    pathname: normalizePathname(route.pathname),
    canonical: canonicalUrl(route.pathname),
  });
}

// Add future P0 landing pages to coreRoutes. Blog articles are derived from the
// existing content source so routing, metadata, prerendering, and the sitemap stay aligned.
export const routeManifest = Object.freeze(
  [...coreRoutes, ...p0LandingRoutes, ...articleRoutes].map(finalizeRoute),
);

export const notFoundMetadata = Object.freeze({
  pathname: '/404',
  title: 'Page Not Found | Fly with Derek',
  description: 'The requested page could not be found. Return to Fly with Derek to continue planning your trip.',
  type: 'website',
  image: DEFAULT_SOCIAL_IMAGE,
  canonical: null,
  indexable: false,
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
