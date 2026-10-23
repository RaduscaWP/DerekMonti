import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { contactConfig } from '../../data/siteData.js';
import { planningNavigation } from '../../data/siteNavigation.js';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import { usePageMotion } from '../../hooks/usePageMotion.js';
import { useLocale } from '../../i18n/useLocale.js';

export default function Footer() {
  const { reduced, systemReduced, setQuietMotion } = useMotionPreference();
  const { t, locale, localePath } = useLocale();
  const footer = useRef(null); usePageMotion(footer);
  return <footer className="site-footer" ref={footer}><div className="section-wrap">
    <div className="footer-invitation" data-reveal><p className="eyebrow">{t('footer.invitation', 'A conversation is a good place to start.')}</p><Link to={localePath('/#request-form')}>{t('footer.title', 'Your journey. Personally arranged.')}<ArrowUpRight size={42} strokeWidth={1.1} aria-hidden="true" /></Link></div>
    <div className="footer-main"><div className="footer-brand" data-reveal><Link className="brand brand--light" to={localePath('/')}>Fly with <strong>Derek</strong></Link><p>{t('footer.tagline', 'Your personal flight advisor. Business & First Class travel, considered around you.')}</p></div><nav aria-label={t('footer.navigation', 'Navigation')} data-reveal><span className="footer-label">{t('footer.navigation', 'Navigation')}</span><Link to={localePath('/services')}>{t('nav.services', 'Services')}</Link><Link to={localePath('/about')}>{t('nav.about', 'About Derek')}</Link><Link to="/blog">{t('nav.journal', 'Journal')}{locale !== 'en' && <small lang="en">EN</small>}</Link><Link to={localePath('/#request-form')}>{t('nav.plan', 'Plan my trip')}</Link></nav><div className="footer-contact" data-reveal><span className="footer-label">{t('footer.contact', 'Direct contact')}</span><a href={'mailto:' + contactConfig.email}>{contactConfig.email}<ArrowUpRight size={14} aria-hidden="true" /></a><a href={'tel:' + contactConfig.phoneHref}>{contactConfig.phoneLabel}</a><a href={'https://wa.me/' + contactConfig.whatsappNumber} target="_blank" rel="noreferrer">{t('footer.whatsapp', 'WhatsApp Derek')}<ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
    <nav className="footer-planning" aria-label={t('footer.planning', 'Trip planning guides')}><span className="footer-label">{t('footer.planning', 'Trip planning guides')}{locale !== 'en' && ' · English'}</span>{planningNavigation.map(({ to, label }, index) => <Link to={to} key={to} lang="en">{label}<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</nav>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Derek Monti</p><div><Link to={localePath('/privacy')}>{t('footer.privacy', 'Privacy')}</Link><Link to={localePath('/terms')}>{t('footer.terms', 'Terms')}</Link><a href="#top">{t('footer.top', 'Back to top')}</a></div><label className="motion-preference"><input type="checkbox" checked={reduced} disabled={systemReduced} onChange={event => setQuietMotion(event.target.checked)} />{t('motion.reduce', 'Reduce motion')}</label></div>
  </div></footer>;
}
