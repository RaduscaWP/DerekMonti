import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, getRouteMetadata } from './routeManifest.js';
import { localeDetails } from '../i18n/locales.js';
import {
  DEPLOYMENT_NOINDEX_META_NAME,
  isMetadataIndexable,
  structuredDataFor,
} from './head.js';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const metadata = getRouteMetadata(location.pathname);
    const deploymentNoindex = Boolean(
      document.head.querySelector(`meta[name="${DEPLOYMENT_NOINDEX_META_NAME}"][content="true"]`),
    );
    const indexable = isMetadataIndexable(metadata, deploymentNoindex);
    document.title = metadata.title;
    document.documentElement.lang = metadata.locale || 'en';

    setMeta('name', 'description', metadata.description);
    setMeta('name', 'robots', indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', metadata.openGraphLocale || 'en_US');
    setMeta('property', 'og:type', metadata.type === 'article' ? 'article' : 'website');
    setMeta('property', 'og:title', metadata.title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('property', 'og:url', metadata.canonical || window.location.href);
    setMeta('property', 'og:image', metadata.image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', metadata.title);
    setMeta('name', 'twitter:description', metadata.description);
    setMeta('name', 'twitter:image', metadata.image);

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

    // Navigation can leave an equivalent cluster. Clear its annotations first
    // so an English article never inherits another page's language alternates.
    document.head.querySelectorAll('link[rel="alternate"][hreflang], meta[property="og:locale:alternate"]')
      .forEach((element) => element.remove());
    if (indexable) {
      for (const { language, href } of metadata.alternates || []) {
        const alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.hreflang = language;
        alternate.href = href;
        document.head.appendChild(alternate);
        if (language !== metadata.locale && language !== 'x-default') {
          const alternateLocale = document.createElement('meta');
          alternateLocale.setAttribute('property', 'og:locale:alternate');
          alternateLocale.content = localeDetails(language).openGraph;
          document.head.appendChild(alternateLocale);
        }
      }
    }

    let structuredData = document.getElementById('page-structured-data');
    if (indexable) {
      if (!structuredData) {
        structuredData = document.createElement('script');
        structuredData.id = 'page-structured-data';
        structuredData.type = 'application/ld+json';
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = JSON.stringify(structuredDataFor(metadata));
    } else {
      structuredData?.remove();
    }
  }, [location.pathname]);

  return null;
}
