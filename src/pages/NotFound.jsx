import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import { contactConfig } from '../data/siteData.js';
import { getWhatsappUrl } from '../utils/message.js';

const popularPages = [
  { label: 'Home', to: '/' },
  { label: 'Business class flights', to: '/business-class-flights' },
  { label: 'First class flights', to: '/first-class-flights' },
  { label: 'Last minute business class', to: '/services/last-minute-business-class' },
  { label: 'Blog', to: '/blog' },
];

export default function NotFound() {
  const whatsapp = getWhatsappUrl({ requestTitle: 'Business & First Class flight quote' });

  return (
    <div>
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p>This route does not exist, but your trip can.</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container legal-body__inner">
          <p>
            The address may be outdated or mistyped. Try one of the pages below, or message me and I will take it from
            there.
          </p>
          <div className="not-found__actions">
            <Button href="/#request-form">Get a quote</Button>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={17} />
              WhatsApp Derek
            </a>
            <a href={`tel:${contactConfig.phoneHref}`}>
              <Phone aria-hidden="true" size={17} />
              Call {contactConfig.phoneLabel}
            </a>
          </div>
          <nav className="not-found__links" aria-label="Popular pages">
            {popularPages.map((page) => (
              <Link to={page.to} key={page.to}>
                <ArrowRight aria-hidden="true" size={15} />
                {page.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
