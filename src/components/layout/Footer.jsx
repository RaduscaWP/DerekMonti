import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactConfig } from '../../data/siteData.js';
import { primaryNavigation, planningNavigation } from '../../data/siteNavigation.js';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';

export default function Footer() {
  const { reduced, systemReduced, setQuietMotion } = useMotionPreference();
  return <footer className="site-footer"><div className="section-wrap">
    <div className="footer-main">
      <div className="footer-brand"><Link className="brand brand--light" to="/">Fly with <strong>Derek</strong></Link><p>Business & first class.<br />Personally arranged.</p></div>
      <nav aria-label="Footer navigation"><span className="footer-label">Explore</span>{primaryNavigation.map(({ label, to }) => <Link key={to} to={to}>{label}</Link>)}</nav>
      <div className="footer-contact"><span className="footer-label">Let's talk travel</span><a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a><a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a><a href={`https://wa.me/${contactConfig.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a></div>
    </div>
    <nav className="footer-planning" aria-label="Planning pages"><span className="footer-label">Plan by journey</span>{planningNavigation.map(({ label, to }) => <Link key={to} to={to}>{label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</nav>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Fly with Derek</p><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href="#top">Back to top <ArrowUpRight size={14} aria-hidden="true" /></a></div><label className="motion-preference"><input type="checkbox" checked={reduced} disabled={systemReduced} onChange={(event) => setQuietMotion(event.target.checked)} /> Reduce motion</label></div>
  </div></footer>;
}
