import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import { useLocale } from '../../i18n/useLocale.js';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import './shared-shell.scss';
import '../../styles/ticket-cards.scss';
import '../../styles/premium.scss';

export default function Layout({ children }) {
  const { t } = useLocale();
  const { reduced } = useMotionPreference();
  return <div id="top" className="site-shell homepage-experience premium-experience" data-motion={reduced ? 'reduced' : 'full'}>
    <a className="skip-link" href="#main-content">{t('nav.skip', 'Skip to main content')}</a>
    <Navbar />
    <main id="main-content">{children}</main>
    <Footer />
  </div>;
}
