import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  CalendarRange,
  Check,
  Compass,
  FileSearch,
  MessageCircle,
  Plane,
  Route,
  ShieldCheck,
} from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import QuoteForm from '../components/common/QuoteForm.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import {
  blogPosts,
  capabilities,
  contactConfig,
  discoveryLinks,
  evaluationItems,
  homeFaqs,
  imagery,
  steps,
  whyDerek,
} from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { getWhatsappUrl } from '../utils/message.js';

const HOME_REQUEST_TITLE = 'Premium flight quote request';
const HOME_REQUEST_SOURCE = 'Home page quote form';
const whyIcons = [MessageCircle, FileSearch, Compass, Route];
const stepIcons = [CalendarRange, FileSearch, Check];

function canUseDecorativeWebGl() {
  if (typeof window === 'undefined') return false;
  if (window.innerWidth < 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let disposeParticles = () => {};

    if (!reduceMotion) {
      const context = gsap.context(() => {
        gsap
          .timeline({ delay: 0.12 })
          .from('.home-hero__eyebrow', { y: 18, opacity: 0, duration: 0.45, ease: 'power3.out' })
          .from('.home-hero__title span', { yPercent: 110, duration: 0.72, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
          .from('.home-hero__copy, .home-hero__actions, .home-hero__note', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
          }, '-=0.35')
          .from('.home-hero__portrait', { x: 36, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.55');
      }, heroRef);

      if (canUseDecorativeWebGl()) {
        import('../utils/threeParticles.js')
          .then(({ initParticles }) => {
            if (disposed) return;
            try {
              disposeParticles = initParticles(canvasRef.current);
            } catch {
              disposeParticles = () => {};
            }
          })
          .catch(() => {});
      }

      return () => {
        disposed = true;
        disposeParticles();
        context.revert();
      };
    }

    return () => {
      disposed = true;
      disposeParticles();
    };
  }, []);

  return (
    <section className="home-hero" ref={heroRef} aria-labelledby="home-title">
      <div className="home-hero__wash" aria-hidden="true" />
      <canvas className="home-hero__particles" ref={canvasRef} aria-hidden="true" />
      <div className="container home-hero__inner">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Personal premium-flight guidance</p>
          <h1 className="home-hero__title" id="home-title">
            <span>Premium flights,</span>
            <span>handled personally.</span>
          </h1>
          <p className="home-hero__copy">
            Business- and first-class options researched around your dates, priorities, cabin preference, and
            flexibility.
          </p>
          <div className="home-hero__actions">
            <Button href="#request-form" size="lg">
              Request a personal review
            </Button>
            <a className="text-link text-link--light" href="#how-it-works">
              See how it works <ArrowDown aria-hidden="true" size={17} />
            </a>
          </div>
          <p className="home-hero__note">
            <ShieldCheck aria-hidden="true" size={17} />
            A request starts a personal review. It is not a booking or a guarantee of availability.
          </p>
        </div>

        <figure className="home-hero__portrait">
          <div className="home-hero__portrait-frame">
            <img
              src={imagery.derekPortrait}
              alt="Derek Monti"
              width="1122"
              height="1402"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <figcaption>
            <span>Derek Monti</span>
            <strong>Your point of contact</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function CapabilityStrip() {
  return (
    <section className="capability-strip" aria-labelledby="capability-title">
      <h2 className="sr-only" id="capability-title">
        Service scope
      </h2>
      <div className="container capability-strip__grid">
        {capabilities.map((item, index) => (
          <article key={item.label} data-reveal>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="quote-section" id="request-form" aria-labelledby="quote-title">
      <div className="container quote-section__layout">
        <div className="quote-section__intro" data-reveal>
          <p className="eyebrow">Start with the essentials</p>
          <h2 id="quote-title">Tell Derek about the trip.</h2>
          <p>
            Share the fixed details first, then add the preferences that will shape the review. Your information is
            used to respond to this request.
          </p>
          <ol>
            <li>
              <span>01</span>
              <p>Route, dates, travelers, and cabin.</p>
            </li>
            <li>
              <span>02</span>
              <p>Flexibility and the tradeoffs you care about.</p>
            </li>
            <li>
              <span>03</span>
              <p>A safe contact method for the response.</p>
            </li>
          </ol>
        </div>
        <div className="quote-section__form">
          <QuoteForm
            variant="full"
            full
            source={HOME_REQUEST_SOURCE}
            requestTitle={HOME_REQUEST_TITLE}
            confirmationContext={{ advisorAvatarSrc: imagery.derekAvatar }}
          />
        </div>
      </div>
    </section>
  );
}

function EvaluationSection() {
  return (
    <section className="evaluation-section" aria-labelledby="evaluation-title">
      <div className="container">
        <div className="evaluation-section__header" data-reveal>
          <div>
            <p className="eyebrow eyebrow--light">What Derek evaluates</p>
            <h2 id="evaluation-title">A fare is only one part of the journey.</h2>
          </div>
          <p>
            The method is a consistent comparison of the details that change the quality of a trip, not a display of
            illustrative prices that may no longer apply.
          </p>
        </div>
        <div className="evaluation-grid">
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
  );
}

function WhySection() {
  return (
    <section className="why-section" aria-labelledby="why-title">
      <div className="container why-section__layout">
        <div className="why-section__intro" data-reveal>
          <p className="eyebrow">Why Derek</p>
          <h2 id="why-title">Human context for a high-value decision.</h2>
          <p>
            The service is designed for travelers who want the whole itinerary reviewed—not another wall of search
            results.
          </p>
          <Link className="text-link" to="/about">
            Meet Derek <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <div className="why-section__list">
          {whyDerek.map((item, index) => {
            const Icon = whyIcons[index];
            return (
              <article key={item.title} data-reveal>
                <span>
                  <Icon aria-hidden="true" size={21} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="process-section" id="how-it-works" aria-labelledby="process-title">
      <div className="container">
        <SectionHeader
          eyebrow="A simple process"
          title="From trip brief to a clearer decision."
          text="Three steps keep the request focused and leave room for the details that make each journey different."
        />
        <h2 className="sr-only" id="process-title">
          How it works
        </h2>
        <div className="process-grid">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <article key={step.title} data-reveal>
                <div className="process-grid__top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" size={22} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DiscoverySection() {
  return (
    <section className="discovery-section" aria-labelledby="discovery-title">
      <div className="container">
        <SectionHeader
          eyebrow="Explore by need"
          title="Start with the trip you are planning."
          text="Each guide has a distinct purpose and leads back to the same focused request when you are ready."
          align="left"
        />
        <h2 className="sr-only" id="discovery-title">
          Services and travel guides
        </h2>
        <div className="discovery-grid">
          {discoveryLinks.map((item) => (
            <Link to={item.href} key={item.href} data-reveal>
              <span>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <strong>
                Explore <ArrowRight aria-hidden="true" size={17} />
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuidesSection() {
  return (
    <section className="guides-preview" aria-labelledby="guides-title">
      <div className="container">
        <div className="guides-preview__header" data-reveal>
          <div>
            <p className="eyebrow">Decision guides</p>
            <h2 id="guides-title">Read before you compare.</h2>
          </div>
          <Link className="text-link" to="/blog">
            View all guides <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <div className="guide-list">
          {blogPosts.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <small>{post.category}</small>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <strong>{post.readTime}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCallout() {
  const whatsappUrl = getWhatsappUrl({ requestTitle: HOME_REQUEST_TITLE });

  return (
    <section className="home-final" aria-labelledby="final-title">
      <div className="container home-final__inner" data-reveal>
        <div>
          <p className="eyebrow eyebrow--light">Your next trip</p>
          <h2 id="final-title">Bring Derek the itinerary—not a perfect brief.</h2>
          <p>Share what is fixed, what can move, and what a good journey needs to protect.</p>
        </div>
        <div className="home-final__actions">
          <Button href="#request-form" size="lg">
            Request a personal review
          </Button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={18} />
            WhatsApp Derek
          </a>
          <a href={`tel:${contactConfig.phoneHref}`}>Call {contactConfig.phoneLabel}</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const pageRef = useRef(null);

  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <Hero />
      <CapabilityStrip />
      <QuoteSection />
      <EvaluationSection />
      <WhySection />
      <HowItWorks />
      <DiscoverySection />
      <GuidesSection />
      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="container faq-section__layout">
          <div data-reveal>
            <p className="eyebrow">Before you request</p>
            <h2 id="faq-title">Useful answers, stated plainly.</h2>
            <p>Learn what the request process needs, what can change, and how to describe useful flexibility.</p>
          </div>
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>
      <FinalCallout />
    </div>
  );
}
