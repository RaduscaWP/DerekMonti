import { MessageCircle, Phone } from 'lucide-react';
import { contactConfig } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';
import Button from './Button.jsx';

// Crimson closing band used at the bottom of the inner pages (Services, About,
// Blog, BlogArticle). Copy on the left, the three ways to reach Derek on the
// right. Styles: src/styles/sections/_final-cta.scss (scoped to .final-cta--band).

export default function FinalCta({
  title = 'Ready to fly better for less?',
  text = 'Send me the route and dates. You get real fares, the published price next to mine and a straight answer on what is worth booking.',
  quoteHref = '/#request-form',
}) {
  const whatsapp = getWhatsappUrl({ requestTitle: 'Premium flight request' });

  return (
    <section className="final-cta final-cta--band" aria-labelledby="final-cta-title">
      <div className="container final-cta__inner" data-reveal>
        <header className="final-cta__copy">
          <p className="eyebrow eyebrow--light final-cta__eyebrow">Get a quote</p>
          <h2 id="final-cta-title" className="final-cta__title">
            {title}
          </h2>
          <p className="final-cta__text">{text}</p>
        </header>

        <div className="final-cta__actions">
          <Button href={quoteHref} size="lg" className="btn--white">
            Get a quote
          </Button>
          <Button
            href={whatsapp}
            variant="outline"
            size="lg"
            icon={false}
            target="_blank"
            className="final-cta__whatsapp"
          >
            <MessageCircle aria-hidden="true" size={18} strokeWidth={2.1} />
            WhatsApp Derek
          </Button>
          <a className="final-cta__phone" href={`tel:${contactConfig.phoneHref}`}>
            <Phone aria-hidden="true" size={18} strokeWidth={2.1} />
            <span>Call {contactConfig.phoneLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
