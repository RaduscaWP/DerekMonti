import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, CircleDot, Compass } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { usePageMotion } from '../hooks/usePageMotion.js';
import styles from './CoreLanding.module.scss';

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

function Hero({ page }) {
  return (
    <section className={styles.hero} aria-labelledby={`${page.id}-title`}>
      <div className={`container ${styles.heroInner}`}>
        <Breadcrumbs items={page.breadcrumbs} />
        <div className={styles.heroCopy} data-reveal data-reveal-y="24">
          <p className={`eyebrow ${styles.heroEyebrow}`}>{page.eyebrow}</p>
          <h1 id={`${page.id}-title`}>{page.h1}</h1>
          <p className={styles.heroSummary}>{page.heroSummary}</p>
          <div className={styles.heroActions}>
            <Button to="/#request-form">Request a Personal Review</Button>
            <Link className={styles.quietLink} to="/about">
              About Derek
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
        <aside className={styles.heroDossier} aria-label="Guide overview" data-reveal data-reveal-y="18">
          <p className={styles.dossierLabel}>Your itinerary, considered</p>
          <ul className={styles.heroPoints} aria-label="Review focus">
          {page.heroPoints.map((point, index) => (
            <li key={point}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{point}</strong>
            </li>
          ))}
          </ul>
          <nav className={styles.contents} aria-label="On this page">
            <p>Inside this guide</p>
            <a href={`#${page.id}-context`}>The request in context <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href={`#${page.id}-review`}>What Derek evaluates <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href={`#${page.id}-questions`}>Questions before requesting <ArrowUpRight size={16} aria-hidden="true" /></a>
          </nav>
        </aside>
      </div>
    </section>
  );
}

function Introduction({ page }) {
  return (
    <section id={`${page.id}-context`} className={styles.introduction} aria-labelledby={`${page.id}-intro-title`}>
      <div className={`container ${styles.introGrid}`}>
        <div className={styles.introCopy} data-reveal>
          <p className="eyebrow">The request in context</p>
          <h2 id={`${page.id}-intro-title`}>{page.introTitle}</h2>
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.audience} data-reveal>
          <h3>{page.audienceTitle}</h3>
          <ol>
            {page.audience.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
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
    <section id={`${page.id}-review`} className={styles.evaluation} aria-label={page.evaluationTitle}>
      <div className={`container ${styles.reviewLayout}`}>
        <SectionHeader
          eyebrow="Itinerary Review"
          title={page.evaluationTitle}
          text={page.evaluationIntro}
          align="left"
          light
        />
        <div className={styles.evaluationGrid}>
          {page.evaluation.map((item, index) => (
            <article key={item.title} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Limitations({ page }) {
  return (
    <section className={styles.limitations} aria-labelledby={`${page.id}-limitations-title`}>
      <div className={`container ${styles.limitationsInner}`} data-reveal>
        <div className={styles.limitationsHeading}>
          <CircleDot aria-hidden="true" size={22} />
          <div>
            <p className="eyebrow">Clear expectations</p>
            <h2 id={`${page.id}-limitations-title`}>{page.limitationsTitle}</h2>
          </div>
        </div>
        <ul>
          {page.limitations.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" size={17} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process({ page }) {
  return (
    <section className={styles.process} aria-label="How it works">
      <div className="container">
        <SectionHeader
          eyebrow="How It Works"
          title="Three steps from request to decision"
          text="The process stays focused on the trip information and the tradeoffs that can be confirmed."
          align="left"
        />
        <ol className={styles.processList}>
          {page.process.map((step, index) => (
            <li key={step.title} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
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
          <Compass aria-hidden="true" size={26} />
          <p className="eyebrow">Continue planning</p>
          <h2 id={`${page.id}-related-title`}>Explore the next relevant guide</h2>
        </div>
        <nav className={styles.relatedLinks} aria-label="Related planning pages" data-reveal>
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
    <section id={`${page.id}-questions`} className={`faq-section ${styles.faq}`} aria-labelledby={`${page.id}-faq-title`}>
      <div className={`container faq-section__inner ${styles.faqInner}`}>
        <div data-reveal>
          <p className="eyebrow">Questions before requesting</p>
          <h2 id={`${page.id}-faq-title`}>Frequently asked questions</h2>
          <p className={styles.faqIntro}>
            These answers explain the review process. Specific flights, products, and conditions still require
            confirmation for the individual request.
          </p>
        </div>
        <FaqAccordion items={page.faqs} />
      </div>
    </section>
  );
}

function FinalCallToAction() {
  return (
    <section className={styles.finalCta} aria-labelledby="core-landing-cta-title">
      <div className={`container ${styles.finalCtaInner}`} data-reveal>
        <div>
          <p className="eyebrow">Start with the trip</p>
          <h2 id="core-landing-cta-title">Share the journey you want Derek to review</h2>
          <p>
            Provide the route, dates, traveler count, cabin preference, and the tradeoffs that matter most. Submitting
            the request does not create a reservation.
          </p>
        </div>
        <Button to="/#request-form">Request a Personal Review</Button>
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

  return (
    <div className={styles.page} ref={pageRef}>
      <Hero page={page} />
      <Introduction page={page} />
      <Evaluation page={page} />
      <Limitations page={page} />
      <Process page={page} />
      <RelatedPages page={page} />
      <FrequentlyAskedQuestions page={page} />
      <FinalCallToAction />
    </div>
  );
}
