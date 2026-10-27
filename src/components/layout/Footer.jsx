import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { airlines, contactConfig } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';

const navigation = [
  { label: 'Business Class', to: '/business-class-flights' },
  { label: 'First Class', to: '/first-class-flights' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'About Derek', to: '/about' },
];

const planning = [
  { label: 'US to Europe', to: '/business-class-flights/europe' },
  { label: 'Europe to USA', to: '/business-class-flights/usa' },
  { label: 'Last Minute Flights', to: '/services/last-minute-business-class' },
  { label: 'Multi-City Itineraries', to: '/services/complex-itineraries' },
  { label: 'Personal Advisor', to: '/services/premium-flight-advisor' },
];

const bookedAirlines = airlines.slice(0, 8);

export default function Footer() {
  const whatsapp = getWhatsappUrl({ requestTitle: 'Business & First Class flight quote' });

  return (
    <footer className="footer">
      {/* Tier 1: brand, navigation, airlines and contact */}
      <div className="container footer__top">
        <div className="footer__brand" data-reveal>
          <Link to="/" className="footer__logo" aria-label="Fly with Derek, home">
            <span className="footer__logo-lead">Fly with</span> <strong>Derek</strong>
          </Link>
          <p className="footer__tagline">
            Business and First Class tickets at insider prices, sourced personally by Derek Monti in
            Miami.
          </p>
          <Button href="/#request-form" variant="primary" size="md" className="footer__cta">
            Get a quote
          </Button>
        </div>

        <nav className="footer__column" aria-label="Site navigation" data-reveal>
          <p className="footer__heading">Navigate</p>
          <ul className="footer__list">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__column" aria-label="Flight planning pages" data-reveal>
          <p className="footer__heading">Flights</p>
          <ul className="footer__list">
            {planning.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__column" data-reveal>
          <p className="footer__heading">Airlines I book</p>
          <ul className="footer__list footer__list--plain">
            {bookedAirlines.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <address className="footer__contact" data-reveal>
          <p className="footer__heading">Contact Derek</p>
          <ul className="footer__list">
            <li>
              <a href={`tel:${contactConfig.phoneHref}`} className="footer__link footer__link--icon">
                <Phone aria-hidden="true" size={16} strokeWidth={2} />
                <span>{contactConfig.phoneLabel}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsapp}
                className="footer__link footer__link--icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" size={16} strokeWidth={2} />
                <span>WhatsApp Derek</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contactConfig.email}`} className="footer__link footer__link--icon">
                <Mail aria-hidden="true" size={16} strokeWidth={2} />
                <span>{contactConfig.email}</span>
              </a>
            </li>
          </ul>
          <p className="footer__where">
            {contactConfig.location} · {contactConfig.availability}
          </p>
        </address>
      </div>

      {/* Tier 2: agency disclosure */}
      <div className="footer__disclosure">
        <div className="container">
          <p>
            Derek Monti is a personal flight advisor. Tickets are issued through{' '}
            <a href={contactConfig.agency.url} target="_blank" rel="noopener noreferrer">
              {contactConfig.agency.name}
            </a>
            , an {contactConfig.agency.accreditation}. Airline names and trademarks belong to their
            respective owners.
          </p>
        </div>
      </div>

      {/* Tier 3: bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">© {new Date().getFullYear()} Fly with Derek</p>
          <ul className="footer__legal">
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
