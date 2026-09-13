import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import { useLocation } from 'react-router-dom';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import './shared-shell.scss';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { reduced } = useMotionPreference();
  return <div id="top" className={`site-shell${pathname === '/' ? ' homepage-experience' : ''}`} data-motion={reduced ? 'reduced' : 'full'}>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <Navbar />
    <main id="main-content">{children}</main>
    <Footer />
  </div>;
}
