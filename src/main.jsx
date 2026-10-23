import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/fonts.css';
import './i18n/cyrillicFonts.css';
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
