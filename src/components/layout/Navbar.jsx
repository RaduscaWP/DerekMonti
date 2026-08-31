import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Business Class', to: '/business-class-flights' },
  { label: 'First Class', to: '/first-class-flights' },
  { label: 'Services', to: '/services' },
  { label: 'Guides', to: '/blog' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const toggleRef = useRef(null);
  const dialogRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    restoreFocusRef.current = false;
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const openMenu = () => {
    restoreFocusRef.current = true;
    setIsOpen(true);
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    restoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  };

  const closeForNavigation = (destination) => {
    const target = new URL(destination, window.location.origin);
    const sameLocation = target.pathname === location.pathname && target.hash === location.hash;
    closeMenu({ restoreFocus: sameLocation });
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll('a[href], button:not([disabled])') || [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    first?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || focusable.length < 2) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (restoreFocusRef.current) toggleRef.current?.focus();
      restoreFocusRef.current = false;
    };
  }, [isOpen]);

  const solid = isScrolled || location.pathname !== '/';

  return (
    <header className={`navbar ${solid ? 'navbar--solid' : ''}`}>
      <div className="container navbar__inner">
        <Link className="navbar__brand" to="/" aria-label="Fly with Derek home">
          <span>Fly with</span>
          <strong>Derek</strong>
        </Link>

        <nav className="navbar__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a className="navbar__cta" href="/#request-form">
          Request a quote
          <ArrowRight aria-hidden="true" size={17} />
        </a>

        <button
          ref={toggleRef}
          className="navbar__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation menu"
          onClick={openMenu}
        >
          <Menu aria-hidden="true" size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="mobile-menu"
          id="mobile-navigation"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-menu__top">
            <Link className="navbar__brand" to="/" onClick={() => closeForNavigation('/')}>
              <span>Fly with</span>
              <strong>Derek</strong>
            </Link>
            <button type="button" onClick={() => closeMenu()} aria-label="Close navigation menu">
              <X aria-hidden="true" size={25} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <NavLink key={item.to} to={item.to} onClick={() => closeForNavigation(item.to)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a
            className="mobile-menu__cta"
            href="/#request-form"
            onClick={() => closeForNavigation('/#request-form')}
          >
            Request a personal review
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      )}
    </header>
  );
}
