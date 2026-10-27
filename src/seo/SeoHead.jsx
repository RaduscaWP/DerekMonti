import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (content === null || content === undefined) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setJsonLd(id, data) {
  let element = document.getElementById(id);
  if (!data) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function applyHead(pathname, manifest, head) {
  const metadata = manifest.getRouteMetadata(pathname);
  const deploymentNoindex = Boolean(
    document.head.querySelector(`meta[name="${head.DEPLOYMENT_NOINDEX_META_NAME}"][content="true"]`),
  );
  const indexable = head.isMetadataIndexable(metadata, deploymentNoindex);
  const imageAlt = metadata.imageAlt || metadata.title;
  const isDefaultImage = metadata.image === manifest.DEFAULT_SOCIAL_IMAGE;
  document.title = metadata.title;

  setMeta('name', 'description', metadata.description);
  setMeta('name', 'robots', indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow');
  setMeta('property', 'og:site_name', manifest.SITE_NAME);
  setMeta('property', 'og:locale', 'en_US');
  setMeta('property', 'og:type', metadata.type === 'article' ? 'article' : 'website');
  setMeta('property', 'og:title', metadata.title);
  setMeta('property', 'og:description', metadata.description);
  setMeta('property', 'og:url', metadata.canonical || window.location.href);
  setMeta('property', 'og:image', metadata.image);
  setMeta('property', 'og:image:width', isDefaultImage ? '1200' : null);
  setMeta('property', 'og:image:height', isDefaultImage ? '630' : null);
  setMeta('property', 'og:image:alt', imageAlt);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', metadata.title);
  setMeta('name', 'twitter:description', metadata.description);
  setMeta('name', 'twitter:image', metadata.image);
  setMeta('name', 'twitter:image:alt', imageAlt);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (metadata.canonical) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metadata.canonical);
  } else {
    canonical?.remove();
  }

  setJsonLd('page-structured-data', indexable ? head.structuredDataFor(metadata) : null);
  setJsonLd('site-structured-data', indexable ? head.siteEntityGraph() : null);
}

// The prerendered HTML already carries the right head; this keeps it in sync on in-app
// navigation. The manifest (and the page data behind it) loads lazily so it stays out of
// the main bundle.
export default function SeoHead() {
  const location = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    // The prerendered document already carries the correct head for the first URL; only
    // in-app navigation needs the manifest (which brings the page data with it).
    if (firstRun.current) {
      firstRun.current = false;
      if (document.head.querySelector('meta[property="og:title"]')) return undefined;
    }
    let cancelled = false;
    Promise.all([import('./routeManifest.js'), import('./head.js')]).then(([manifest, head]) => {
      if (!cancelled) applyHead(location.pathname, manifest, head);
    });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  return null;
}
