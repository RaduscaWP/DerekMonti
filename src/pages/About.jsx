import { useRef } from 'react';
import { BadgeCheck, Handshake, HeartHandshake, Plane, TimerReset } from 'lucide-react';
import AnimatedCounter from '../components/common/AnimatedCounter.jsx';
import Button from '../components/common/Button.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import ReviewCard from '../components/common/ReviewCard.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { airlines, imagery, reviews, siteBackdrops, timeline, values } from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const valueIcons = [Handshake, TimerReset, HeartHandshake];

export default function About() {
  const pageRef = useRef(null);
  useDocumentMeta(
    'About Derek Monti - Your Personal Aviation Advisor',
    'Meet Derek Monti, a personal aviation advisor helping travelers access premium cabin fares with human support.',
  );
  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <section className="page-hero page-hero--about">
        <img src={imagery.aboutHero} alt="Airplane at sunset" />
        <div className="page-hero__overlay" />
        <div className="page-hero__content page-hero__content--center">
          <p className="eyebrow">About Derek</p>
          <h1>Helping People Travel Smart.</h1>
          <p>Years of aviation expertise, private fare access, and a service style built around direct attention.</p>
        </div>
      </section>

      <section className="about-bio">
        <div className="container about-bio__inner">
          <div className="about-bio__portrait" data-reveal>
            <div className="derek-portrait derek-portrait--large">
              <img
                src={imagery.derekPortrait}
                alt="Derek Monti smiling in a navy blazer"
                loading="lazy"
                decoding="async"
                width="1122"
                height="1402"
              />
            </div>
          </div>
          <div className="about-bio__copy" data-reveal>
            <p className="eyebrow">Meet Derek</p>
            <h2>Your Personal Aviation Expert</h2>
            <p>
              Derek Monti works like a private aviation advisor for commercial premium cabins. He understands the fare
              channels, routing details, and quiet service touches that make business and first class travel feel
              effortless.
            </p>
            <p>
              His model is intentionally personal. You are not handed from agent to agent; Derek reviews the request,
              weighs the tradeoffs, and explains the quote clearly before you commit.
            </p>
            <div className="counter-grid">
              <AnimatedCounter value={20} suffix="+" label="Clients served" />
              <AnimatedCounter value={1800} prefix="$" label="Average savings" />
              <AnimatedCounter value={5} suffix=".0" label="Review target" />
              <AnimatedCounter value={24} suffix="/7" label="Personal support" />
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <SectionHeader
            eyebrow="My Story"
            title="The Journey to Becoming Your Aviation Expert"
            text="Placeholder milestones are ready for Derek's real career story."
          />
          <div className="timeline">
            {timeline.map((item, index) => (
              <article className={index % 2 === 0 ? 'left' : 'right'} key={item.year} data-reveal>
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section">
        <img src={imagery.cabin} alt="Premium lounge atmosphere" />
        <div className="values-section__overlay" />
        <div className="container">
          <SectionHeader
            eyebrow="What I Stand For"
            title="My Commitment to You"
            text="Premium travel deserves a clear, calm, human advisor."
            light
          />
          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <article key={value.title} data-reveal>
                  <span>
                    <Icon aria-hidden="true" size={24} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="airline-grid-section">
        <div className="container">
          <SectionHeader
            eyebrow="Partner Airlines"
            title="Airlines Derek Can Quote"
            text="A practical premium network across the carriers travelers request most often."
          />
          <div className="airline-grid">
            {airlines.slice(0, 12).map((airline) => (
              <span key={airline} data-reveal>
                <Plane aria-hidden="true" size={17} />
                {airline}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials testimonials--light">
        <div className="container">
          <div className="testimonials__intro" data-reveal>
            <p className="eyebrow">Social Proof</p>
            <h2>Trusted by Premium Travelers</h2>
            <p>Replace these placeholders with real Trustpilot reviews once Derek provides his page.</p>
            <Button href="https://www.trustpilot.com/" variant="ghost">
              See all reviews
            </Button>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.name} />
            ))}
          </div>
          <div className="about-badge" data-reveal>
            <BadgeCheck aria-hidden="true" size={22} />
            <span>Rated 5.0 / 5 placeholder</span>
          </div>
        </div>
      </section>
      <FinalCta
        backdrop={siteBackdrops.aboutFinalCta}
        title="Ready to Work With Derek?"
        text="Get in touch today and receive your personalized quote within hours."
      />
    </div>
  );
}
