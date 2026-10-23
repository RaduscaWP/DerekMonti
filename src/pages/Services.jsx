import { useRef } from 'react';
import { ArrowRight, Clock3, Layers3, ScanSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { evaluationItems, servicesFaqs, steps } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const serviceLinks = [
  {
    icon: ScanSearch,
    eyebrow: 'Core service',
    title: 'Premium flight advisor',
    body: 'A structured review of business- and first-class options around the traveler’s complete brief.',
    href: '/services/premium-flight-advisor',
  },
  {
    icon: Layers3,
    eyebrow: 'Complex travel',
    title: 'Multi-city and open-jaw itineraries',
    body: 'Bring multiple legs, mixed-cabin priorities, and fixed commitments into one request.',
    href: '/services/complex-itineraries',
  },
  {
    icon: Clock3,
    eyebrow: 'Time-sensitive travel',
    title: 'Last-minute premium requests',
    body: 'Separate non-negotiable timing from preferences so available tradeoffs can be assessed clearly.',
    href: '/services/last-minute-business-class',
  },
];

export default function Services() {
  const pageRef = useRef(null);

  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <section className="editorial-hero editorial-hero--services" aria-labelledby="services-title">
        <div className="container editorial-hero__inner editorial-hero__inner--single">
          <div className="editorial-hero__copy" data-reveal>
            <p className="eyebrow eyebrow--light">Services</p>
            <h1 id="services-title">Premium travel, reviewed as a whole.</h1>
            <p>
              Share a business- or first-class trip and the priorities that shape it. Derek reviews the itinerary
              dimensions together and helps make the tradeoffs easier to understand.
            </p>
            <Link className="hero-link" to="/#request-form">
              Request a personal review <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <p className="editorial-hero__aside" data-reveal>
            No live inventory is displayed here. Availability, price, cabin, and ticket conditions can only be
            discussed against a real itinerary.
          </p>
        </div>
      </section>

      <section className="services-index" aria-labelledby="services-index-title">
        <div className="container">
          <SectionHeader
            eyebrow="Choose by need"
            title="Three distinct ways to start."
            text="Each service page explains the information needed, the review lens, and the practical limitations."
            align="left"
          />
          <h2 className="sr-only" id="services-index-title">
            Services
          </h2>
          <div className="services-index__list">
            {serviceLinks.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link to={service.href} key={service.href} data-reveal>
                  <span className="services-index__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="services-index__icon">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <div>
                    <small>{service.eyebrow}</small>
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                  </div>
                  <ArrowRight aria-hidden="true" size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="service-lens" aria-labelledby="service-lens-title">
        <div className="container service-lens__layout">
          <div className="service-lens__intro" data-reveal>
            <p className="eyebrow eyebrow--light">The comparison framework</p>
            <h2 id="service-lens-title">What is evaluated before a traveler decides.</h2>
            <p>The framework remains consistent while the weighting changes for each trip.</p>
          </div>
          <div className="service-lens__grid">
            {evaluationItems.map((item) => (
              <article key={item.title} data-reveal>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section process-section--services" aria-labelledby="services-process-title">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title="A short request. A considered review."
            text="The process leaves the decision with the traveler and does not imply a booking until real terms are confirmed."
          />
          <h2 className="sr-only" id="services-process-title">
            Service process
          </h2>
          <div className="process-grid">
            {steps.map((step, index) => (
              <article key={step.title} data-reveal>
                <div className="process-grid__top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="services-faq-title">
        <div className="container faq-section__layout">
          <div data-reveal>
            <p className="eyebrow">Services FAQ</p>
            <h2 id="services-faq-title">Know the boundaries before you begin.</h2>
            <p>Clear expectations make a premium-travel request easier to review and easier to trust.</p>
          </div>
          <FaqAccordion items={servicesFaqs} />
        </div>
      </section>

      <FinalCta
        title="Start with the trip you need to take."
        text="Send the route, dates, cabin preference, and flexibility. You can explain the finer priorities in your own words."
      />
    </div>
  );
}
