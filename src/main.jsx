import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/syne/600.css';
import '@fontsource/syne/700.css';
import '@fontsource/syne/800.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import App from './App.jsx';
import { pageNameForPath, preloadPage } from './pages/pageLoaders.js';
import './styles/global.scss';

const rootElement = document.getElementById('root');
const application = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Load a page chunk as soon as the visitor shows intent (hover, touch or focus on an
// internal link), so in-app navigation feels instant without downloading every chunk.
function prefetchOnIntent() {
  const seen = new WeakSet();
  const handler = (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href^="/"]') : null;
    if (!link || seen.has(link)) return;
    seen.add(link);
    const href = (link.getAttribute('href') || '').split(/[?#]/)[0];
    preloadPage(pageNameForPath(href)).catch(() => {});
  };
  document.addEventListener('pointerover', handler, { passive: true });
  document.addEventListener('touchstart', handler, { passive: true });
  document.addEventListener('focusin', handler);
}

// The chunk for the current URL must be in memory before hydration so the first client
// render matches the prerendered HTML exactly.
preloadPage(pageNameForPath(window.location.pathname)).then(() => {
  if (rootElement.childElementCount > 0) {
    hydrateRoot(rootElement, application);
  } else {
    createRoot(rootElement).render(application);
  }
  prefetchOnIntent();
});
