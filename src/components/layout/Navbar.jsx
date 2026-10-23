import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X, Pause, Play } from 'lucide-react';
import { primaryNavigation, tripBriefPath } from '../../data/siteNavigation.js';
import { contactConfig } from '../../data/siteData.js';
import { useTripBrief } from '../../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import { useLocale } from '../../i18n/useLocale.js';
import { LOCALES, getLocalizedPath, contentEntityForPath } from '../../i18n/locales.js';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, locale, localePath } = useLocale();
  const { markConversionSource } = useTripBrief();
  const { reduced, systemReduced, setQuietMotion } = useMotionPreference();
  const menu = useRef(null), toggle = useRef(null), savedOverflow = useRef(null), restoreFocus = useRef(true);
  const [scrolled, setScrolled] = useState(false), [open, setOpen] = useState(false);
  const entity = contentEntityForPath(location.pathname);
  const releaseBody = () => { if (savedOverflow.current !== null) { document.body.style.overflow = savedOverflow.current; savedOverflow.current = null; } };
  const closeMenu = (focus = true) => { restoreFocus.current = focus; menu.current?.close(); releaseBody(); setOpen(false); if (focus) toggle.current?.focus(); };
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 60); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => { closeMenu(false); }, [location.pathname, location.hash]);
  useEffect(() => () => releaseBody(), []);
  function openMenu() { restoreFocus.current = true; savedOverflow.current = document.body.style.overflow; document.body.style.overflow = 'hidden'; menu.current.showModal(); setOpen(true); }
  function planTrip() { if (entity?.id === 'services') markConversionSource('services'); else if (entity?.id === 'home') markConversionSource('homepage'); closeMenu(false); }
  const brand = (close = false) => <Link className="brand brand--light" to={localePath('/')} aria-label={t('nav.home', 'Fly with Derek home')} onClick={close ? () => closeMenu(false) : undefined}>Fly with <strong>Derek</strong></Link>;
  const labels = { '/services': ['nav.services', 'Services'], '/about': ['nav.about', 'About Derek'], '/blog': ['nav.journal', 'Journal'] };
  const navigation = primaryNavigation.map(({ to }) => <NavLink key={to} to={localePath(to)} onClick={() => closeMenu(false)}>{t(...labels[to])}{to === '/blog' && locale !== 'en' && <small className="language-tag" lang="en">EN</small>}</NavLink>);
  const languages = <label className="language-switch"><span className="sr-only">{t('nav.language', 'Language')}</span><select aria-label={t('nav.language', 'Language')} value={locale} onChange={event => { const next = getLocalizedPath(location.pathname, event.target.value); navigate((next || LOCALES.find(item => item.code === event.target.value).root) + (next ? location.hash : '')); closeMenu(false); }}>{LOCALES.map(({ code, label }) => <option key={code} value={code} lang={code}>{label}</option>)}</select></label>;
  return <header className={'site-header' + (scrolled || entity?.id !== 'home' ? ' is-scrolled' : '')}><div className="header-inner">{brand()}<nav className="desktop-nav" aria-label={t('nav.primary', 'Primary navigation')}>{navigation}</nav><div className="header-tools">{languages}<button type="button" className="motion-toggle" disabled={systemReduced} aria-pressed={reduced} aria-label={systemReduced ? t('motion.system', 'Reduced motion follows your device setting') : reduced ? t('motion.resume', 'Resume animation') : t('motion.pause', 'Pause animation')} onClick={() => setQuietMotion(!reduced)}>{reduced ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}</button><Link className="button button--primary header-cta" to={localePath(tripBriefPath)} onClick={planTrip}>{t('nav.plan', 'Plan my trip')}<ArrowRight size={18} aria-hidden="true" /></Link><button ref={toggle} className="menu-toggle" type="button" onClick={openMenu} aria-label={t('nav.open', 'Open menu')} aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation"><Menu aria-hidden="true" /></button></div></div>
  <dialog ref={menu} id="mobile-navigation" className="homepage-mobile-menu" aria-label={t('nav.menu', 'Main menu')} onCancel={event => { event.preventDefault(); closeMenu(); }} onClose={() => { releaseBody(); setOpen(false); if (restoreFocus.current) toggle.current?.focus(); }}><div className="menu-heading">{brand(true)}<button className="menu-toggle" type="button" onClick={() => closeMenu()} aria-label={t('nav.close', 'Close menu')}><X aria-hidden="true" /></button></div><nav aria-label={t('nav.mobile', 'Mobile navigation')}>{navigation}<Link to={localePath(tripBriefPath)} onClick={planTrip}>{t('nav.plan', 'Plan my trip')}<ArrowRight aria-hidden="true" /></Link></nav><a className="menu-contact" href={'https://wa.me/' + contactConfig.whatsappNumber} target="_blank" rel="noreferrer">{t('home.request.whatsapp', 'Talk to Derek on WhatsApp')}<ArrowUpRight size={18} aria-hidden="true" /></a>{!entity && <p className="menu-availability">{t('nav.englishPage', 'This guide is in English. Choose a language to open its homepage.')}</p>}</dialog></header>;
}
