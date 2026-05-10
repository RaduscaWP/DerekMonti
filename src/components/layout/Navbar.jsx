import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { gsap } from 'gsap';
import { contactConfig } from '../../data/siteData.js';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const tween = gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          clearProps: 'transform,opacity',
        },
      );
      return () => tween.kill();
    }
    return undefined;
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen);
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
      <a className="navbar__brand" href="/">
        <span>Derek</span>
        <strong>Monti</strong>
      </a>

      <nav className="navbar__links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
        <a href="#contact">Contact</a>
      </nav>

      <div className="navbar__contact">
        <a href={`tel:${contactConfig.phoneHref}`}>
          <small>Call Derek 24/7</small>
          <span>{contactConfig.phoneLabel}</span>
        </a>
        <a className="navbar__call" href={`tel:${contactConfig.phoneHref}`} aria-label="Call Derek">
          <Phone aria-hidden="true" size={18} />
        </a>
      </div>

      <button className="navbar__toggle" type="button" onClick={() => setIsOpen(true)} aria-label="Open menu">
        <Menu aria-hidden="true" />
      </button>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu">
          <X aria-hidden="true" />
        </button>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </nav>
        <a className="mobile-menu__phone" href={`tel:${contactConfig.phoneHref}`}>
          {contactConfig.phoneLabel}
        </a>
      </div>
    </header>
  );
}
