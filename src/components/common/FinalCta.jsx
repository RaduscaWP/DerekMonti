import { MessageCircle } from 'lucide-react';
import { contactConfig } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';
import Button from './Button.jsx';

export default function FinalCta({
  title = 'Have a premium trip in mind?',
  text = 'Share the route, dates, flexibility, and the priorities that matter most.',
}) {
  const whatsapp = getWhatsappUrl({ requestTitle: 'Premium flight request' });

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="container final-cta__inner" data-reveal>
        <div>
          <p className="eyebrow eyebrow--light">Request a review</p>
          <h2 id="final-cta-title">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="final-cta__actions">
          <Button to="/#request-form" size="lg">
            Request a personal review
          </Button>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={18} />
            WhatsApp Derek
          </a>
          <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>
        </div>
      </div>
    </section>
  );
}
