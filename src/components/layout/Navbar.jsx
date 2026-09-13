import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { primaryNavigation, tripBriefPath } from '../../data/siteNavigation.js';
import { contactConfig } from '../../data/siteData.js';
import { useTripBrief } from '../../context/TripBriefProvider.jsx';

export default function Navbar() {
  const location = useLocation();
  const { markConversionSource } = useTripBrief();
  const menu = useRef(null);
  const toggle = useRef(null);
  const savedOverflow = useRef(null);
  const restoreFocus = useRef(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const releaseBody = () => {
    if (savedOverflow.current !== null) {
      document.body.style.overflow = savedOverflow.current;
      savedOverflow.current = null;
    }
  };
  const closeMenu = (focus = true) => {
    restoreFocus.current = focus;
    menu.current?.close();
    releaseBody();
    setOpen(false);
    if (focus) toggle.current?.focus();
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { closeMenu(false); }, [location.pathname, location.hash]);
  useEffect(() => () => releaseBody(), []);
  function openMenu() {
    restoreFocus.current = true;
    savedOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current.showModal();
    setOpen(true);
  }
  function planTrip() {
    if (location.pathname === '/services') markConversionSource('services');
    else if (location.pathname === '/') markConversionSource('homepage');
    closeMenu(false);

  }
  const brand = (close = false) => <Link className="brand brand--light" to="/" aria-label="Fly with Derek home" onClick={close ? () => closeMenu(false) : undefined}>Fly with <strong>Derek</strong></Link>;
  return <header className={`site-header${scrolled || location.pathname !== '/' ? ' is-scrolled' : ''}`}>
    <div className="header-inner">
      {brand()}
      <nav className="desktop-nav" aria-label="Primary navigation">{primaryNavigation.map(({ label, to }) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav>
      <Link className="button button--primary header-cta" to={tripBriefPath} onClick={planTrip}>Plan my trip <ArrowRight size={19} aria-hidden="true" /></Link>
      <button ref={toggle} className="menu-toggle" type="button" onClick={openMenu} aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation"><Menu aria-hidden="true" /></button>
    </div>
    <dialog ref={menu} id="mobile-navigation" className="homepage-mobile-menu" aria-label="Main menu" onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClose={() => { releaseBody(); setOpen(false); if (restoreFocus.current) toggle.current?.focus(); }}>
      <div className="menu-heading">{brand(true)}<button className="menu-toggle" type="button" onClick={() => closeMenu()} aria-label="Close menu"><X aria-hidden="true" /></button></div>
      <nav aria-label="Mobile navigation">{primaryNavigation.map(({ label, to }) => <NavLink key={to} to={to} onClick={() => closeMenu(false)}>{label}<ArrowUpRight aria-hidden="true" /></NavLink>)}<Link to={tripBriefPath} onClick={planTrip}>Plan my trip <ArrowRight aria-hidden="true" /></Link></nav>
      <a className="menu-contact" href={`https://wa.me/${contactConfig.whatsappNumber}`} target="_blank" rel="noreferrer">Talk to Derek on WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>
    </dialog>
  </header>;
}
