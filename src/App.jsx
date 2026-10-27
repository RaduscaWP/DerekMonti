import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import LazyPage, { PAGE_READY_EVENT } from './pages/LazyPage.jsx';
import SeoHead from './seo/SeoHead.jsx';

function focusCurrentPage(hash) {
  let focusTarget;

  if (hash) {
    let id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // Keep the original hash when it is not valid percent-encoding.
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ block: 'start' });
      focusTarget = section.querySelector('h1, h2') || section;
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
    focusTarget = document.querySelector('#main-content h1');
  }

  if (focusTarget instanceof HTMLElement) {
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });
  }
}

function RouteFocus() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Runs on navigation and again once a lazily loaded page chunk has rendered.
    const frame = window.requestAnimationFrame(() => focusCurrentPage(hash));
    const onReady = () => focusCurrentPage(hash);
    window.addEventListener(PAGE_READY_EVENT, onReady);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(PAGE_READY_EVENT, onReady);
    };
  }, [pathname, hash]);

  return null;
}

function SiteAnalytics() {
  const localHosts = new Set(['localhost', '127.0.0.1', '::1']);
  const isLocalPreview = typeof window !== 'undefined' && localHosts.has(window.location.hostname);
  return isLocalPreview ? null : <Analytics />;
}

// Keep this table in sync with pageNameForPath() in pages/pageLoaders.js.
export default function App() {
  return (
    <>
      <SeoHead />
      <Layout>
        <RouteFocus />
        <Routes>
          <Route path="/" element={<LazyPage name="Home" />} />
          <Route path="/services" element={<LazyPage name="Services" />} />
          <Route path="/about" element={<LazyPage name="About" />} />
          <Route path="/blog" element={<LazyPage name="Blog" />} />
          <Route path="/blog/:slug" element={<LazyPage name="BlogArticle" />} />
          <Route path="/privacy" element={<LazyPage name="Privacy" />} />
          <Route path="/terms" element={<LazyPage name="Terms" />} />
          <Route path="/business-class-flights" element={<LazyPage name="Landing" />} />
          <Route path="/business-class-flights-miami" element={<LazyPage name="Landing" />} />
          <Route path="/business-class-flights/:slug" element={<LazyPage name="Landing" />} />
          <Route path="/first-class-flights" element={<LazyPage name="Landing" />} />
          <Route path="/services/:slug" element={<LazyPage name="Landing" />} />
          <Route path="*" element={<LazyPage name="NotFound" />} />
        </Routes>
      </Layout>
      <SiteAnalytics />
    </>
  );
}
