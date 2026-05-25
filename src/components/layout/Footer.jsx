import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactConfig } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';

const columns = [
  {
    title: 'Navigation',
    links: ['Home', 'Services', 'About', 'Blog', 'Contact'],
  },
  {
    title: 'Regions',
    links: ['Europe', 'Asia', 'Middle East', 'North America', 'Latin America', 'Oceania'],
  },
  {
    title: 'Countries',
    links: ['France', 'Italy', 'Germany', 'Japan', 'UAE', 'UK', 'View More'],
  },
  {
    title: 'Airlines',
    links: ['Emirates', 'Qatar', 'Turkish', 'Singapore', 'Cathay Pacific', 'Lufthansa'],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand footer-col" data-reveal>
          <a className="footer__logo" href="/">
            Derek <strong>Monti</strong>
          </a>
          <p>Your personal aviation advisor - premium seats at prices you will not find anywhere else.</p>
          <div className="footer__socials">
            <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin aria-hidden="true" size={18} />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram aria-hidden="true" size={18} />
            </a>
            <a href={getWhatsappUrl()} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        {columns.map((column) => (
          <div className="footer__column footer-col" key={column.title} data-reveal>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <a href={link === 'Contact' ? '#contact' : '#'}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__contact footer-col" data-reveal>
          <h3>Contact</h3>
          <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>
          <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
          <a className="footer__whatsapp" href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp Derek
          </a>
          <a
            className="footer__trust"
            href={contactConfig.trustpilotUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Excellent</strong>
            <span>Read reviews on Trustpilot</span>
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright 2026 Derek Monti. All fares are subject to availability and airline fare rules.</p>
        <div>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>American Express</span>
        </div>
      </div>
    </footer>
  );
}
