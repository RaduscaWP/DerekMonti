import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import BlogArticle from './pages/BlogArticle.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';
import CoreLanding from './pages/CoreLanding.jsx';
import { corePages } from './data/corePages.js';
import { TripBriefProvider } from './context/TripBriefProvider.jsx';
import { MotionPreferenceProvider } from './context/MotionPreferenceProvider.jsx';
import SeoHead from './seo/SeoHead.jsx';

function RouteFocus() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
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
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}

function SiteAnalytics() {
  const localHosts = new Set(['localhost', '127.0.0.1', '::1']);
  const isLocalPreview = typeof window !== 'undefined' && localHosts.has(window.location.hostname);
  return isLocalPreview ? null : <Analytics />;
}

export default function App() {
  return (
    <TripBriefProvider><MotionPreferenceProvider>
      <SeoHead />
      <Layout>
        <RouteFocus />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {corePages.map((page) => (
            <Route path={page.path} element={<CoreLanding page={page} />} key={page.path} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <SiteAnalytics />
    </MotionPreferenceProvider></TripBriefProvider>
  );
}
