import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactConfig } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';

const navigation = [
  { label: 'Business Class', to: '/business-class-flights' },
  { label: 'First Class', to: '/first-class-flights' },
  { label: 'Services', to: '/services' },
  { label: 'Guides', to: '/blog' },
  { label: 'About Derek', to: '/about' },
];

const planning = [
  { label: 'US to Europe', to: '/business-class-flights/europe' },
  { label: 'Europe to USA', to: '/business-class-flights/usa' },
  { label: 'Complex Itineraries', to: '/services/complex-itineraries' },
  { label: 'Time-Sensitive Travel', to: '/services/last-minute-business-class' },
  { label: 'Premium Flight Advisor', to: '/services/premium-flight-advisor' },
];

export default function Footer() {
  const whatsapp = getWhatsappUrl({ requestTitle: 'Premium flight request' });

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand" data-reveal>
          <Link to="/" className="footer__logo">
            Fly with <strong>Derek</strong>
          </Link>
          <p>Personal review for business- and first-class flight requests.</p>
          <a href="/#request-form" className="footer__quote">
            Request a personal review <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>

        <nav className="footer__column" aria-label="Site navigation" data-reveal>
          <h2>Navigate</h2>
          {navigation.map((item) => (
            <Link to={item.to} key={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="footer__column" aria-label="Planning pages" data-reveal>
          <h2>Plan</h2>
          {planning.map((item) => (
            <Link to={item.to} key={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer__contact" data-reveal>
          <h2>Direct contact</h2>
          <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={17} />
            WhatsApp Derek
          </a>
          <p>Do not send passport, payment, or account credentials through the website.</p>
        </div>
      </div>

      <div className="footer__disclosure">
        <div className="container">
          <p>
            Fly with Derek is an independent advisory service. Airline names and trademarks belong to their
            respective owners; no airline endorsement or affiliation is implied.
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Fly with Derek.</p>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
