import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource/syne/400.css';
import '@fontsource/syne/500.css';
import '@fontsource/syne/600.css';
import '@fontsource/syne/700.css';
import '@fontsource/syne/800.css';
import '@fontsource/dm-sans/300.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import App from './App.jsx';
import './styles/global.scss';

gsap.registerPlugin(ScrollTrigger);

const rootElement = document.getElementById('root');
const application = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (rootElement.childElementCount > 0) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}
