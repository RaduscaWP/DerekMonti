import { MessageCircle } from 'lucide-react';
import { contactConfig } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';
import Button from './Button.jsx';

export default function FinalCta({
  title = 'Ready to Fly Better for Less?',
  text = 'Send Derek your travel details and receive curated options within hours.',
  crimson = false,
  backdrop = null,
}) {
  return (
    <section
      className={`final-cta ${crimson ? 'final-cta--crimson' : ''} ${
        backdrop ? 'scenic-section scenic-section--final-cta final-cta--with-backdrop' : ''
      }`}
      id="contact"
    >
      {backdrop && (
        <>
          <img className="scenic-section__image" src={backdrop.src} alt={backdrop.alt} />
          <div className="scenic-section__overlay" aria-hidden="true" />
        </>
      )}
      <div className="final-cta__inner" data-reveal>
        <p className="eyebrow">REQUEST A QUOTE</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="final-cta__actions">
          <Button href={`mailto:${contactConfig.email}?subject=Business%20%26%20First%20Class%20Flight%20Quote%20Request`}>
            Request a Quote
          </Button>
          <Button href={getWhatsappUrl()} variant="outline" icon={false}>
            <MessageCircle aria-hidden="true" size={18} />
            <span>Chat on WhatsApp</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
