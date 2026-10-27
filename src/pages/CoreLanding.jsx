import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Phone } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import QuickQuote from '../components/common/QuickQuote.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Spotlight from '../components/landing/Spotlight.jsx';
import { contactConfig } from '../data/siteData.js';
import { spotlights } from '../data/spotlights.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { getWhatsappUrl } from '../utils/message.js';
import styles from './CoreLanding.module.scss';

const cabinByPage = { 'first-class-flights': 'first' };

function Breadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index < items.length - 1 ? (
              <Link to={item.path}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Hero({ page, whatsapp }) {
  return (
    <section className={styles.hero} aria-labelledby={`${page.id}-title`}>
      <div className={`container ${styles.heroInner}`}>
        <Breadcrumbs items={page.breadcrumbs} />
        <div className={styles.heroCopy} data-reveal data-reveal-y="24">
          <p className={`eyebrow ${styles.heroEyebrow}`}>{page.eyebrow}</p>
          <h1 id={`${page.id}-title`}>{page.h1}</h1>
          <p className={styles.heroSummary}>{page.heroSummary}</p>
          <div className={styles.heroActions}>
            <Button href="#quote">Get a quote</Button>
            <a className={styles.heroContact} href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={17} />
              WhatsApp Derek
            </a>
            <a className={styles.heroContact} href={`tel:${contactConfig.phoneHref}`}>
              <Phone aria-hidden="true" size={17} />
              {contactConfig.phoneLabel}
            </a>
          </div>
        </div>
        <div className={styles.heroQuote} id="quote" data-reveal data-reveal-y="18">
          <p className={styles.heroQuoteTitle}>Price my trip</p>
          <QuickQuote variant="inline" cabin={cabinByPage[page.id] || null} label="Get my quote" />
          <p className={styles.heroQuoteNote}>Free quote, no obligation. I reply within hours, usually the same day.</p>
        </div>
        <ul className={styles.heroPoints} aria-label="What you get" data-reveal data-reveal-y="18">
          {page.heroPoints.map((point) => (
            <li key={point}>
              <Check aria-hidden="true" size={18} />
              <strong>{point}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Introduction({ page }) {
  return (
    <section className={styles.introduction} aria-labelledby={`${page.id}-intro-title`}>
      <div className={`container ${styles.introGrid}`}>
        <div className={styles.introCopy} data-reveal>
          <p className="eyebrow">How I work this route</p>
          <h2 id={`${page.id}-intro-title`}>{page.introTitle}</h2>
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.audience} data-reveal>
          <h3>{page.audienceTitle}</h3>
          <ol>
            {page.audience.map((item) => (
              <li key={item.title}>
                <Check aria-hidden="true" size={18} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Evaluation({ page }) {
  return (
    <section className={styles.evaluation} aria-labelledby={`${page.id}-evaluation-title`}>
      <div className="container">
        <SectionHeader eyebrow="Before you book" title={page.evaluationTitle} text={page.evaluationIntro} align="left" light />
        <h2 className="sr-only" id={`${page.id}-evaluation-title`}>
          {page.evaluationTitle}
        </h2>
        <div className={styles.evaluationGrid}>
          {page.evaluation.map((item) => (
            <article key={item.title} data-reveal>
              <Check aria-hidden="true" size={20} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ page }) {
  return (
    <section className={styles.process} aria-label="How it works">
      <div className="container">
        <SectionHeader eyebrow="How it works" title="From your message to a confirmed ticket" text="Send the trip, get real fares, book when you are ready." align="left" />
        <ol className={styles.processList}>
          {page.process.map((step, index) => (
            <li key={step.title} data-reveal>
              <span>Step {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function RelatedPages({ page }) {
  return (
    <section className={styles.related} aria-labelledby={`${page.id}-related-title`}>
      <div className={`container ${styles.relatedInner}`}>
        <div className={styles.relatedIntro} data-reveal>
          <p className="eyebrow">Keep planning</p>
          <h2 id={`${page.id}-related-title`}>Other ways I can help with this trip</h2>
        </div>
        <nav className={styles.relatedLinks} aria-label="Related pages" data-reveal>
          {page.related.map((item) => (
            <Link to={item.path} key={item.path}>
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
              <ArrowUpRight aria-hidden="true" size={19} />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

function FrequentlyAskedQuestions({ page }) {
  return (
    <section className={`faq-section ${styles.faq}`} aria-labelledby={`${page.id}-faq-title`}>
      <div className={`container faq-section__inner ${styles.faqInner}`}>
        <div data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id={`${page.id}-faq-title`}>Questions travelers ask me</h2>
          <p className={styles.faqIntro}>Straight answers before you request a quote.</p>
          <a className={styles.faqAction} href="#quote">
            Get a quote
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
        <FaqAccordion items={page.faqs} />
      </div>
    </section>
  );
}

export default function CoreLanding({ page }) {
  if (!page) {
    throw new Error('CoreLanding requires a core page data object.');
  }

  const pageRef = useRef(null);
  usePageMotion(pageRef);
  const whatsapp = getWhatsappUrl({ requestTitle: `${page.schemaName} quote` });
  const spotlight = spotlights[page.id];

  return (
    <div className={styles.page} ref={pageRef}>
      <Hero page={page} whatsapp={whatsapp} />
      <Introduction page={page} />
      {spotlight && <Spotlight spotlight={spotlight} pageId={page.id} />}
      <Evaluation page={page} />
      <Process page={page} />
      <RelatedPages page={page} />
      <FrequentlyAskedQuestions page={page} />
      <FinalCta
        title="Tell me where you want to fly"
        text="Route, dates, travelers and cabin. I reply with real fares, usually the same day, and the published price next to mine."
        quoteHref="#quote"
      />
    </div>
  );
}
