import { MessageCircle } from 'lucide-react';
import { getWhatsappUrl } from '../../utils/message.js';
import Button from './Button.jsx';

export default function FinalCta({ title = 'Ready to Fly Better for Less?', text = 'Share your route, dates and cabin. Derek will review the details personally.', crimson = false, backdrop = null }) {
  return <section className={`final-cta ${crimson ? 'final-cta--crimson' : ''} ${backdrop ? 'scenic-section scenic-section--final-cta final-cta--with-backdrop' : ''}`} id="contact" aria-labelledby="final-cta-title">
    {backdrop && <><img className="scenic-section__image" src={backdrop.src} alt="" loading="lazy" /><div className="scenic-section__overlay" aria-hidden="true" /></>}
    <div className="final-cta__inner" data-reveal><p className="eyebrow">Request a quote</p><h2 id="final-cta-title">{title}</h2><p>{text}</p><div className="final-cta__actions"><Button to="/#request-form">Request a Quote</Button><Button href={getWhatsappUrl()} variant="outline" icon={false} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={18} /><span>Chat on WhatsApp</span></Button></div></div>
  </section>;
}
