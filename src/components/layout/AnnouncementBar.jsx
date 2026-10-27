import { MessageCircle, Phone } from 'lucide-react';
import { contactConfig, stats } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';

export default function AnnouncementBar() {
  const whatsapp = getWhatsappUrl({ requestTitle: 'Business & First Class flight quote' });

  return (
    <div className="announcement-bar" aria-label="Contact Derek">
      <div className="container announcement-bar__inner">
        <a href={`tel:${contactConfig.phoneHref}`}>
          <Phone aria-hidden="true" size={13} />
          <span className="announcement-bar__lead">Call Derek 24/7 ·&nbsp;</span>
          {contactConfig.phoneLabel}
        </a>
        <i aria-hidden="true" />
        <a href={whatsapp} target="_blank" rel="noopener noreferrer">
          <MessageCircle aria-hidden="true" size={13} />
          WhatsApp
        </a>
        <i aria-hidden="true" />
        <span>Business &amp; First Class tickets, typically {stats.savings} below published fares</span>
      </div>
    </div>
  );
}
