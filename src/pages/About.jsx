import { useRef } from 'react';
import { ArrowRight, Compass, FileCheck2, MessageCircle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import FinalCta from '../components/common/FinalCta.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { evaluationItems, imagery } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const principles = [
  {
    icon: MessageCircle,
    title: 'A direct conversation',
    body: 'The trip brief stays connected to the person reviewing it, so priorities can be clarified in context.',
  },
  {
    icon: Scale,
    title: 'Tradeoffs made visible',
    body: 'Schedule, cabin, routing, flexibility, and fare conditions are easier to weigh when differences are stated plainly.',
  },
  {
    icon: Compass,
    title: 'The journey stays central',
    body: 'The purpose of the trip and the traveler’s real constraints shape the comparison—not a generic ranking.',
  },
  {
    icon: FileCheck2,
    title: 'A clear next step',
    body: 'A quote request begins a review. It does not create a booking or promise an outcome before real options exist.',
  },
];

export default function About() {
  const pageRef = useRef(null);

  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <section className="editorial-hero editorial-hero--about" aria-labelledby="about-title">
        <div className="container editorial-hero__inner">
          <div className="editorial-hero__copy" data-reveal>
            <p className="eyebrow eyebrow--light">About Derek</p>
            <h1 id="about-title">The person behind the request.</h1>
            <p>
              Fly with Derek is built around a simple idea: premium travel decisions are easier when one person can
              understand the full trip and explain the tradeoffs clearly.
            </p>
            <Link className="text-link text-link--light" to="/#request-form">
              Share your trip <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <figure className="about-portrait" data-reveal>
            <img
              src={imagery.derekPortrait}
              alt="Derek Monti"
              width="1122"
              height="1402"
              loading="eager"
              decoding="async"
            />
            <figcaption>
              <strong>Derek Monti</strong>
              <span>Personal premium-flight advisor</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="about-intro" aria-labelledby="about-approach-title">
        <div className="container about-intro__layout">
          <div data-reveal>
            <p className="eyebrow">The operating approach</p>
            <h2 id="about-approach-title">A human review, without the mythology.</h2>
          </div>
          <div className="about-intro__copy" data-reveal>
            <p>
              The website does not present live inventory, guaranteed pricing, airline endorsements, or a substitute
              for the conditions attached to a real ticket. It gives travelers a structured way to share a premium
              itinerary for personal review.
            </p>
            <p>
              Derek’s role is to bring the request into one coherent comparison: what must stay fixed, what can move,
              where the cabin matters most, and which fare conditions deserve attention before a decision.
            </p>
          </div>
        </div>
      </section>

      <section className="principles-section" aria-labelledby="principles-title">
        <div className="container">
          <SectionHeader
            eyebrow="Service philosophy"
            title="What the experience is designed to protect."
            text="A calm process, clear boundaries, and enough context to make a premium itinerary understandable."
          />
          <h2 className="sr-only" id="principles-title">
            Service principles
          </h2>
          <div className="principles-grid">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title} data-reveal>
                  <Icon aria-hidden="true" size={22} />
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-method" aria-labelledby="about-method-title">
        <div className="container about-method__layout">
          <div className="about-method__header" data-reveal>
            <p className="eyebrow eyebrow--light">The review lens</p>
            <h2 id="about-method-title">Six questions before one recommendation.</h2>
            <p>Each lens keeps the discussion anchored to the complete journey.</p>
          </div>
          <div className="about-method__list">
            {evaluationItems.map((item) => (
              <article key={item.title} data-reveal>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-boundary" aria-labelledby="about-boundary-title">
        <div className="container about-boundary__inner" data-reveal>
          <p className="eyebrow">Clear expectations</p>
          <h2 id="about-boundary-title">What a request does—and does not do.</h2>
          <div>
            <p>
              It gives Derek the route, dates, cabin preference, flexibility, and traveler priorities needed for an
              initial review.
            </p>
            <p>
              It does not reserve a seat, lock a fare, guarantee availability, or imply a relationship with any
              airline. Those details can only be assessed against real options and their applicable rules.
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        title="Have a premium trip in mind?"
        text="Share the itinerary and the constraints that matter. The next step is a personal review, not an automated booking."
      />
    </div>
  );
}
