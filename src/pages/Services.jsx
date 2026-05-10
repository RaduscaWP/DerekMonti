import { useRef, useState } from 'react';
import { BriefcaseBusiness, Clock3, Crown, Rotate3D, ShieldCheck } from 'lucide-react';
import AirlineMarquee from '../components/common/AirlineMarquee.jsx';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import RouteCarousel from '../components/common/RouteCarousel.jsx';
import ScenicBackdrop from '../components/common/ScenicBackdrop.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { extraServices, imagery, serviceDeals, services, servicesFaqs, siteBackdrops, steps } from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const icons = [BriefcaseBusiness, Crown, Rotate3D, Clock3];

function ServiceCard({ service, index }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = icons[index];

  return (
    <article
      className={`service-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped((current) => !current)}
      data-reveal
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') setFlipped((current) => !current);
      }}
    >
      <div className="service-card__inner">
        <div className="service-card__face service-card__front">
          <span className="service-card__badge">{service.badge}</span>
          <Icon aria-hidden="true" size={34} />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
        <div className="service-card__face service-card__back">
          <span>Example</span>
          <h3>{service.title}</h3>
          <p>{service.example}</p>
          <small>Tap or hover to return</small>
        </div>
      </div>
    </article>
  );
}

function ServicesHero() {
  return (
    <section className="page-hero page-hero--services">
      <img src={imagery.servicesHero} alt="Premium airport terminal" />
      <div className="page-hero__overlay" />
      <div className="page-hero__content">
        <p className="eyebrow">Services</p>
        <h1>Premium Flight Planning, Handled Personally.</h1>
        <p>
          Business class, first class, complex itineraries, and urgent requests sourced by Derek with private fare
          access.
        </p>
        <Button href="#services-grid">Explore Services</Button>
      </div>
    </section>
  );
}

function CompactSteps() {
  return (
    <section className="steps-section steps-section--dark scenic-section scenic-section--steps">
      <ScenicBackdrop backdrop={siteBackdrops.servicesSteps} />
      <div className="container">
        <SectionHeader
          eyebrow="How It Works"
          title="From Message to E-Ticket"
          text="The process stays simple because Derek does the fare work behind the scenes."
          light
        />
        <div className="steps">
          {steps.map((step, index) => (
            <article key={step.title} data-reveal>
              <div className="steps__icon">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtraServices() {
  return (
    <section className="guidance-section" id="guidance">
      <div className="container guidance-section__inner">
        <aside className="guidance-section__copy" data-reveal>
          <p className="eyebrow">Extra Services</p>
          <h2>Book Smarter With Derek's Guidance</h2>
          <p>
            For travelers who want the strategy behind premium fares, not just the final quote. Derek turns fare logic
            into practical next steps before you commit.
          </p>
          <div className="guidance-section__tags" aria-label="Guidance focus areas">
            <span>Private fare logic</span>
            <span>Route audit</span>
            <span>Booking confidence</span>
          </div>
          <Button href="#contact" variant="outline-dark">
            Ask for guidance
          </Button>
        </aside>
        <div className="guidance-notes" aria-label="Derek guidance services">
          {extraServices.map((service, index) => (
            <article key={service.title} data-reveal>
              <span className="guidance-notes__number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{service.label}</strong>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <small>{service.outcome}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const pageRef = useRef(null);
  useDocumentMeta(
    'Services - Business Class, First Class and Complex Itineraries | Derek Monti',
    'Business class, first class, last-minute bookings and complex premium itineraries sourced personally by Derek Monti.',
  );
  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <ServicesHero />
      <section className="services-section" id="services-grid">
        <div className="container">
          <SectionHeader
            eyebrow="What Derek Handles"
            title="One Advisor for the Whole Premium Journey"
            text="Each service is built around your exact route, timing, cabin preference, and comfort threshold."
          />
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.title} />
            ))}
          </div>
        </div>
      </section>
      <ExtraServices />
      <AirlineMarquee />
      <section className="savings-section scenic-section scenic-section--services-savings">
        <ScenicBackdrop backdrop={siteBackdrops.servicesSavings} />
        <div className="container">
          <SectionHeader
            eyebrow="Savings Proof"
            title="Recent Fare Scenarios"
            text="Route examples show how published fares can shift when Derek searches private channels."
            light
          />
          <RouteCarousel deals={serviceDeals} />
        </div>
      </section>
      <CompactSteps />
      <section className="faq-section">
        <div className="container faq-section__inner">
          <div data-reveal>
            <p className="eyebrow">Services FAQ</p>
            <h2>Good Questions Before You Send Dates</h2>
            <p>
              Derek will confirm rules, availability, and ticketing deadlines before you commit to any fare.
            </p>
            <div className="faq-section__seal">
              <ShieldCheck aria-hidden="true" size={20} />
              <span>Transparent quote process</span>
            </div>
          </div>
          <FaqAccordion items={servicesFaqs} />
        </div>
      </section>
      <FinalCta
        crimson
        backdrop={siteBackdrops.servicesFinalCta}
        title="Ready to Fly Better for Less?"
        text="Send Derek your travel details and receive options within hours - no commitment required."
      />
    </div>
  );
}
