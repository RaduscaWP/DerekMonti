import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { gsap } from 'gsap';
import { contactConfig } from '../../data/siteData.js';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';

const navItems = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: 'About', to: '/about' }, { label: 'Blog', to: '/blog' }, { label: 'Contact', to: '/#request-form' }];

export default function LegacyNavbar() {
  const navRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const { reduced, motionReady } = useMotionPreference();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!motionReady || reduced) return;
    const element = navRef.current;
    const tween = gsap.fromTo(element, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: .15, clearProps: 'transform,opacity' });
    return () => { tween.kill(); gsap.set(element, { clearProps: 'transform,opacity' }); };
  }, [reduced, motionReady]);

  useEffect(() => { setIsOpen(false); }, [pathname, hash]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen) { if (dialog.open) dialog.close(); return; }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; if (dialog.open) dialog.close(); triggerRef.current?.focus({ preventScroll: true }); };
  }, [isOpen]);

  return <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
    <Link className="navbar__brand" to="/"><span>Derek</span><strong>Monti</strong></Link>
    <nav className="navbar__links" aria-label="Primary navigation">{navItems.map(({ label, to }) => <NavLink key={label} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
    <div className="navbar__contact"><a href={`tel:${contactConfig.phoneHref}`}><small>Call Derek 24/7</small><span>{contactConfig.phoneLabel}</span></a><a className="navbar__call" href={`tel:${contactConfig.phoneHref}`} aria-label="Call Derek"><Phone aria-hidden="true" size={18} /></a></div>
    <button ref={triggerRef} className="navbar__toggle" type="button" onClick={() => setIsOpen(true)} aria-label="Open menu" aria-expanded={isOpen} aria-controls="legacy-mobile-menu"><Menu aria-hidden="true" /></button>
    <dialog id="legacy-mobile-menu" ref={dialogRef} className={`mobile-menu ${isOpen ? 'open' : ''}`} aria-label="Navigation menu" onCancel={() => setIsOpen(false)} onClose={() => setIsOpen(false)}>
      <button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu"><X aria-hidden="true" /></button>
      <nav aria-label="Mobile navigation">{navItems.map(({ label, to }) => <NavLink key={label} to={to} end={to === '/'} onClick={() => setIsOpen(false)}>{label}</NavLink>)}</nav>
      <a className="mobile-menu__phone" href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>
    </dialog>
  </header>;
}
