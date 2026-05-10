import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  CircleDollarSign,
  ConciergeBell,
  Gem,
  Headphones,
  PlaneTakeoff,
  Route,
  Sparkles,
} from 'lucide-react';
import { gsap } from 'gsap';
import AirlineMarquee from '../components/common/AirlineMarquee.jsx';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import QuoteForm from '../components/common/QuoteForm.jsx';
import ReviewCard from '../components/common/ReviewCard.jsx';
import RouteCarousel from '../components/common/RouteCarousel.jsx';
import ScenicBackdrop from '../components/common/ScenicBackdrop.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import {
  blogPosts,
  contactConfig,
  extraServices,
  homeHeroVideo,
  homeFaqs,
  methodology,
  reviews,
  routeDeals,
  siteBackdrops,
  steps,
  whyDerek,
} from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { initParticles } from '../utils/threeParticles.js';

const reasonIcons = [CircleDollarSign, CalendarClock, Route, ConciergeBell, Headphones, BadgeCheck];
const stepIcons = [PlaneTakeoff, BriefcaseBusiness, Sparkles, Gem];

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="trust-logo trust-logo--google">
      <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.2 4 9.4 8.5 6.3 14.7z" />
      <path fill="#FBBC05" d="M24 44c5.2 0 9.9-2 13.4-5.3l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.2 39.5 16.1 44 24 44z" />
      <path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C36.9 39.1 44 34 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}

function TrustpilotMark() {
  return (
    <svg viewBox="0 0 176 44" aria-label="Trustpilot" className="trust-logo trust-logo--trustpilot" role="img">
      <path fill="#00B67A" d="M35.2 15.4H24.9L21.7 5.6l-3.2 9.8H8.2l8.4 6.1-3.2 9.8 8.4-6.1 8.3 6.1-3.2-9.8 8.3-6.1Z" />
      <path fill="#005128" d="m27.6 23.7-.7-2.2-5.1 3.7 5.8-1.5Z" />
      <text x="45" y="29" fill="#0B1929" fontFamily="Arial, Helvetica, sans-serif" fontSize="23" fontWeight="700" letterSpacing="-.7">
        Trustpilot
      </text>
    </svg>
  );
}

function BbbMark() {
  return (
    <svg viewBox="0 0 132 50" aria-label="BBB Accredited Business" className="trust-logo trust-logo--bbb" role="img">
      <rect width="132" height="50" rx="6" fill="#0B1929" />
      <path d="M21 10h13c5 0 8 2.3 8 6.4 0 2.4-1.2 4.2-3.3 5.2 2.8.9 4.5 3 4.5 6.2 0 4.8-3.8 7.2-9.1 7.2H21V10Zm12 10.2c2 0 3.1-.9 3.1-2.5 0-1.7-1.2-2.5-3.3-2.5h-5.9v5h6.1Zm.8 9.6c2.2 0 3.5-1 3.5-2.9 0-1.8-1.3-2.8-3.6-2.8h-6.8v5.7h6.9Z" fill="#fff" />
      <path d="M48 10h13c5 0 8 2.3 8 6.4 0 2.4-1.2 4.2-3.3 5.2 2.8.9 4.5 3 4.5 6.2 0 4.8-3.8 7.2-9.1 7.2H48V10Zm12 10.2c2 0 3.1-.9 3.1-2.5 0-1.7-1.2-2.5-3.3-2.5h-5.9v5h6.1Zm.8 9.6c2.2 0 3.5-1 3.5-2.9 0-1.8-1.3-2.8-3.6-2.8h-6.8v5.7h6.9Z" fill="#fff" />
      <path d="M75 10h13c5 0 8 2.3 8 6.4 0 2.4-1.2 4.2-3.3 5.2 2.8.9 4.5 3 4.5 6.2 0 4.8-3.8 7.2-9.1 7.2H75V10Zm12 10.2c2 0 3.1-.9 3.1-2.5 0-1.7-1.2-2.5-3.3-2.5h-5.9v5h6.1Zm.8 9.6c2.2 0 3.5-1 3.5-2.9 0-1.8-1.3-2.8-3.6-2.8h-6.8v5.7h6.9Z" fill="#fff" />
      <path d="M104 13h20v6h-20v-6Zm0 10h20v5h-20v-5Zm0 9h20v5h-20v-5Z" fill="#8A194F" />
      <text x="20" y="44" fill="#fff" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700" letterSpacing=".7">ACCREDITED BUSINESS</text>
    </svg>
  );
}

function ArcMark() {
  return (
    <svg viewBox="0 0 124 44" aria-label="ARC accredited agency" className="trust-logo trust-logo--arc" role="img">
      <rect width="124" height="44" rx="6" fill="#fff" />
      <path d="M17 31 28 9l11 22h-7l-2-4h-4l-2 4h-7Zm10.4-9h2.2L28.5 19l-1.1 3Z" fill="#0B1929" />
      <path d="M45 13h13c5 0 8 2.7 8 7 0 3-1.5 5.2-4.1 6.3l5.2 7.7h-7.7l-4.2-6.6h-3.1V34H45V13Zm12.1 9.2c1.8 0 2.9-.9 2.9-2.3 0-1.5-1.1-2.3-2.9-2.3h-5v4.6h5Z" fill="#0B1929" />
      <path d="M72 23.5C72 17 77 12.5 83.8 12.5c4.6 0 8.4 2.1 10.3 5.6l-5.3 3c-1-1.8-2.6-2.7-4.7-2.7-3.1 0-5.2 2.1-5.2 5.1 0 3 2.2 5.1 5.3 5.1 2 0 3.7-.9 4.7-2.7l5.3 3c-1.9 3.5-5.7 5.6-10.4 5.6C77 34.5 72 30 72 23.5Z" fill="#8A194F" />
      <text x="18" y="40" fill="#4A5568" fontFamily="Arial, sans-serif" fontSize="6.5" fontWeight="700" letterSpacing=".8">AIRLINES REPORTING CORPORATION</text>
    </svg>
  );
}

function Stars() {
  return (
    <span className="trust-stars" aria-label="Five star rating">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </span>
  );
}

const trustItems = [
  {
    brand: <GoogleMark />,
    title: 'Google Reviews',
    value: '4.9 / 5',
    body: 'Clients consistently rate Derek highly for premium service.',
    href: 'https://search.google.com/local/reviews',
    stars: true,
  },
  {
    brand: <TrustpilotMark />,
    title: 'Trustpilot',
    value: 'Excellent',
    body: 'Independent reviews for TravelBusinessClass service quality.',
    href: contactConfig.trustpilotUrl,
    stars: true,
  },
  {
    brand: <BbbMark />,
    title: 'BBB',
    value: 'A+ Rating',
    body: 'Accredited business profile reference for TravelBusinessClass ticketing.',
    href: 'https://www.bbb.org/',
  },
  {
    brand: <ArcMark />,
    title: 'ARC',
    value: 'Accredited Agency',
    body: 'Secure, compliant ticketing through established premium travel channels.',
    href: 'https://www2.arccorp.com/',
  },
];

function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUsable, setVideoUsable] = useState(true);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 901px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateVideoState = () => setShowVideo(desktopQuery.matches && !motionQuery.matches);

    updateVideoState();
    desktopQuery.addEventListener('change', updateVideoState);
    motionQuery.addEventListener('change', updateVideoState);

    const cleanup = initParticles(canvasRef.current);
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.15 });
      timeline
        .from('.hero__eyebrow', { y: 22, opacity: 0, duration: 0.45, ease: 'power3.out' })
        .from('.hero__title .line', { y: 58, opacity: 0, duration: 0.58, stagger: 0.06, ease: 'power3.out' }, '-=0.18')
        .from('.hero__headline', { y: 22, opacity: 0, duration: 0.42, ease: 'power3.out' }, '-=0.32')
        .from('.hero__copy', { y: 20, opacity: 0, duration: 0.42, ease: 'power3.out' }, '-=0.28')
        .from('.hero__airlines', { y: 16, opacity: 0, duration: 0.36, ease: 'power3.out' }, '-=0.22')
        .from('.hero .quote-form', { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.22')
        .from('.hero__proof', { opacity: 0, duration: 0.35 }, '-=0.16');
    }, heroRef);

    return () => {
      desktopQuery.removeEventListener('change', updateVideoState);
      motionQuery.removeEventListener('change', updateVideoState);
      cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <img className="hero__image hero__poster" src={homeHeroVideo.poster} alt={homeHeroVideo.alt} />
      {showVideo && videoUsable && (
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={homeHeroVideo.poster}
          aria-hidden="true"
          onError={() => setVideoUsable(false)}
        >
          <source src={homeHeroVideo.src} type="video/mp4" />
        </video>
      )}
      <div className="hero__overlay" />
      <canvas className="hero__particles" ref={canvasRef} aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Personal Aviation Advisor</p>
        <h1 className="hero__title">
          <span className="line">Derek</span>
          <span className="line">Monti</span>
        </h1>
        <p className="hero__headline">Business Class. Remarkable Prices.</p>
        <p className="hero__copy">
          Premium seats sourced personally by Derek - private fare access, calmer support, and quotes within hours.
        </p>
        <div className="hero__airlines">
          <span>Flying with</span>
          <b>Qatar</b>
          <b>Emirates</b>
          <b>Turkish</b>
          <b>Singapore</b>
          <b>Cathay Pacific</b>
        </div>
        <QuoteForm />
        <p className="hero__proof">Last month Derek's clients saved an average of $1,800 per ticket.</p>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="trust-bar__inner">
        {trustItems.map((item) => (
          <a key={item.title} href={item.href} target="_blank" rel="noreferrer" data-reveal>
            <div className="trust-bar__brand">{item.brand}</div>
            <div className="trust-bar__rating">
              <strong>{item.value}</strong>
              {item.stars && <Stars />}
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Methodology() {
  const exampleDeal = routeDeals[1];
  const publishedFare = Number(exampleDeal.published.replace(/[$,]/g, ''));
  const derekFare = Number(exampleDeal.derek.replace(/[$,]/g, ''));
  const savings = publishedFare - derekFare;
  const flexibleLabel = exampleDeal.flexibleWindow.replace(' days', '-day');

  return (
    <section className="methodology scenic-section scenic-section--methodology">
      <ScenicBackdrop backdrop={siteBackdrops.homeMethodology} />
      <div className="container methodology__inner">
        <div className="methodology__intro" data-reveal>
          <p className="eyebrow">How Derek Works</p>
          <h2>Fare method, not guesswork.</h2>
          <p>
            Derek compares the public fare, private quote channels, aircraft quality, ticket rules, and date flexibility
            before recommending the cleanest premium itinerary.
          </p>
        </div>
        <aside className="methodology__ticket" aria-label="Example fare audit" data-reveal>
          <div className="methodology__ticket-top">
            <span>Fare Audit</span>
            <small>{flexibleLabel} search</small>
          </div>
          <div className="methodology__route">
            <div>
              <strong>{exampleDeal.fromCode}</strong>
              <span>{exampleDeal.from}</span>
            </div>
            <PlaneTakeoff aria-hidden="true" size={28} strokeWidth={1.7} />
            <div>
              <strong>{exampleDeal.toCode}</strong>
              <span>{exampleDeal.to}</span>
            </div>
          </div>
          <dl className="methodology__fares">
            <div>
              <dt>Published fare</dt>
              <dd>{exampleDeal.published}</dd>
            </div>
            <div>
              <dt>Derek's quote</dt>
              <dd>{exampleDeal.derek}</dd>
            </div>
            <div>
              <dt>Client keeps</dt>
              <dd>${savings.toLocaleString()}</dd>
            </div>
          </dl>
          <p>Example only. Final fares depend on live inventory and ticketing deadline.</p>
        </aside>
        <div className="methodology__rail" data-reveal>
          {methodology.map((item, index) => (
            <article key={item.title}>
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

function WhyDerek() {
  return (
    <section className="why-section">
      <div className="container">
        <SectionHeader
          eyebrow="Six Good Reasons"
          title="Book With Derek"
          text="A premium fare is only useful if the service around it is equally considered."
        />
        <div className="why-showcase">
          <aside className="why-showcase__brief" data-reveal>
            <p className="eyebrow">Derek's Difference</p>
            <h3>Premium fares deserve a human eye.</h3>
            <p>
              Derek checks the fare, aircraft, routing, rules, and support path before you commit. The result feels
              less like searching and more like having someone in your corner.
            </p>
            <div className="why-showcase__metrics" aria-label="Derek Monti service highlights">
              <div>
                <strong>15-60%</strong>
                <span>premium cabin savings</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>direct trip support</span>
              </div>
            </div>
            <Button href={`tel:${contactConfig.phoneHref}`} variant="outline-dark">
              Call Derek
            </Button>
          </aside>
          <div className="why-list">
            {whyDerek.map((reason, index) => {
              const Icon = reasonIcons[index];
              return (
                <article key={reason.title}>
                  <span className="why-list__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="why-list__icon">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <div>
                    <h3>{reason.title}</h3>
                    <p>{reason.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidanceTeaser() {
  return (
    <section className="guidance-teaser">
      <div className="container guidance-teaser__inner" data-reveal>
        <div className="guidance-teaser__copy">
          <p className="eyebrow">Derek's Desk</p>
          <h2>Found a fare? Let Derek pressure-test it before you book.</h2>
          <p>
            Send the route, aircraft, or airline you are considering. Derek reads the parts most travelers never see:
            rules, cabin quality, connection risk, and whether the savings are worth it.
          </p>
          <Button href="#contact" variant="outline-dark">
            Ask for guidance
          </Button>
        </div>
        <div className="guidance-teaser__sequence" aria-label="Private fare playbook flow">
          {extraServices.map((service, index) => (
            <article key={service.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{service.storyLabel}</strong>
              <p>{service.activeSummary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BioTeaser() {
  return (
    <section className="bio-teaser">
      <div className="bio-teaser__inner">
        <div className="bio-teaser__copy" data-reveal>
          <p className="eyebrow">Passion for Excellence</p>
          <h2>Derek places every client at the center of his attention.</h2>
          <p>
            You get a personal travel advisor entirely dedicated to understanding your needs, building long-term
            relationships, and finding the highest value for each premium journey.
          </p>
          <Button href="#contact">Contact Derek</Button>
        </div>
        <div className="bio-teaser__portrait" data-reveal>
          <div className="portrait-placeholder">
            <span>DM</span>
          </div>
        </div>
        <div className="bio-teaser__support" data-reveal>
          <p className="eyebrow">24/7 and 365/year</p>
          <h3>Personal Support Service</h3>
          <p>
            Derek is available for questions, adjustments, and unexpected travel events - before departure and while
            you are moving.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="steps-section">
      <div className="container">
        <SectionHeader
          eyebrow="Simple Steps"
          title="How to Book"
          text="A quote request starts a personal conversation, not a generic booking flow."
        />
        <div className="steps">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <article key={step.title} data-reveal>
                <div className="steps__icon">
                  <Icon aria-hidden="true" size={24} />
                </div>
                <span>Step {String(index + 1).padStart(2, '0')}</span>
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

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__intro" data-reveal>
          <p className="eyebrow">Social Proof</p>
          <h2>97% of Travelers Recommend Derek Monti</h2>
          <p>Review placeholders are ready to be replaced with Derek's real Trustpilot entries.</p>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  return (
    <section className="blog-preview">
      <div className="container">
        <SectionHeader
          eyebrow="Current Articles"
          title="Travel Smarter. Read Better."
          text="Premium cabin strategy, destination guidance, and Derek's practical travel notes."
        />
        <div className="blog-preview__grid">
          {blogPosts.slice(0, 3).map((post) => (
            <Link className="blog-card" to={`/blog/${post.slug}`} key={post.slug} data-reveal>
              <div className="blog-card__image">
                <img src={post.image} alt={post.title} loading="lazy" />
                <span>{post.category}</span>
              </div>
              <div className="blog-card__body">
                <time>{post.date}</time>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <small>{post.readTime}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const pageRef = useRef(null);
  useDocumentMeta(
    'Derek Monti - Personal Aviation Advisor | Business Class at Insider Prices',
    'Get business and first class flights at 15-60% off published fares. Derek Monti is your personal aviation expert.',
  );
  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <Hero />
      <TrustBar />
      <section className="savings-section scenic-section scenic-section--savings">
        <ScenicBackdrop backdrop={siteBackdrops.homeSavings} />
        <div className="container">
          <SectionHeader
            eyebrow="Smart Savings"
            title="Save More. Fly Better."
            text="By uncovering hidden fares and private offers, Derek makes premium travel more accessible without compromising comfort."
            light
          />
          <RouteCarousel deals={routeDeals} />
          <p className="savings-section__fineprint">
            Sample fares are based on comparable recent quotes. Prices change quickly and are not guaranteed until
            ticketed.
          </p>
        </div>
      </section>
      <Methodology />
      <WhyDerek />
      <GuidanceTeaser />
      <BioTeaser />
      <HowItWorks />
      <Testimonials />
      <section className="faq-section">
        <div className="container faq-section__inner">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" align="left" />
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>
      <AirlineMarquee />
      <BlogPreview />
      <FinalCta backdrop={siteBackdrops.homeFinalCta} />
    </div>
  );
}
