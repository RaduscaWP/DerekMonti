import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
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
import RouteCarousel from '../components/common/RouteCarousel.jsx';
import ScenicBackdrop from '../components/common/ScenicBackdrop.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import {
  blogPosts,
  contactConfig,
  extraServices,
  imagery,
  homeHeroVideo,
  homeFaqs,
  methodology,
  routeDeals,
  siteBackdrops,
  steps,
  whyDerek,
} from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { initParticles } from '../utils/threeParticles.js';
import {
  ACCRUED_MILES_SERVICE_VALUE,
  GUIDANCE_SERVICE_VALUE,
  STANDARD_SERVICE_VALUE,
} from '../utils/quoteRequest.js';

const reasonIcons = [CircleDollarSign, CalendarClock, Route, ConciergeBell, Headphones, BadgeCheck];
const stepIcons = [PlaneTakeoff, BriefcaseBusiness, Sparkles, Gem];
const HOME_REQUEST_TITLE = 'Business & First Class Flight Quote Request';
const HOME_REQUEST_SOURCE = 'Home Page quote form';
const packageCards = [
  {
    value: GUIDANCE_SERVICE_VALUE,
    title: 'Guidance Package',
    summary:
      'Derek reviews your fare, checks the route logic, and helps you unlock better-value business or first class options.',
    meta: 'Fee: 50% of verified savings unlocked through Derek’s guidance.',
    detail:
      'Example: if Derek helps you save $1,000 compared to the verified published fare, the guidance fee is $500. Final options and savings are confirmed directly before booking.',
    Icon: Sparkles,
  },
  {
    value: ACCRUED_MILES_SERVICE_VALUE,
    title: 'Use Your Accrued Miles',
    summary:
      'Have unused miles or reward points? Derek helps you understand where they create the most value for business or first class travel.',
    meta: 'Best for travelers with airline miles, card points, or loyalty rewards.',
    detail:
      'Best for travelers with airline miles, card points, or loyalty rewards who want help turning them into smarter premium-cabin options.',
    Icon: CircleDollarSign,
  },
];

function TravelAdvantageSelector({ selectedService, onSelectService, promoCode, onPromoCodeChange }) {
  return (
    <section className="travel-advantage" aria-labelledby="travel-advantage-title">
      <div className="travel-advantage__header">
        <p className="travel-advantage__eyebrow">Optional Support</p>
        <h2 id="travel-advantage-title">Select Your Travel Advantage</h2>
        <p>Pick the support option that best matches your trip. Derek will review the details personally.</p>
      </div>

      <div className="travel-advantage__grid">
        {packageCards.map((card) => {
          const selected = selectedService === card.value;
          const toggleSelection = () => onSelectService(selected ? STANDARD_SERVICE_VALUE : card.value);

          return (
            <button
              type="button"
              className={`travel-advantage__card ${selected ? 'is-selected' : ''}`}
              key={card.value}
              aria-pressed={selected}
              onClick={toggleSelection}
            >
              <div className="travel-advantage__card-top">
                <span className="travel-advantage__icon">
                  <card.Icon aria-hidden="true" size={20} />
                </span>
                <span className="travel-advantage__status">{selected ? 'Selected' : 'Add'}</span>
              </div>
              <div className="travel-advantage__card-copy">
                <strong>{card.title}</strong>
                <p>{card.summary}</p>
                <span>{card.meta}</span>
                {selected && <small>{card.detail}</small>}
              </div>
            </button>
          );
        })}
      </div>

      <div className="travel-advantage__code">
        <label htmlFor="private-code" className="travel-advantage__code-label">
          <span>Private Code</span>
          <input
            id="private-code"
            name="promoCode"
            type="text"
            value={promoCode}
            onChange={(event) => onPromoCodeChange(event.target.value)}
            placeholder="For returning clients or private referrals"
            autoComplete="off"
            maxLength={120}
          />
        </label>
        <p className="travel-advantage__hint">No selection needed for a standard flight request.</p>
      </div>
    </section>
  );
}

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
    body: 'Clients consistently rate Derek highly for business and first class service.',
    href: 'https://search.google.com/local/reviews',
    stars: true,
  },
  {
    brand: <TrustpilotMark />,
    title: 'Trustpilot',
    value: 'Excellent',
    body: 'Independent reviews reflect Derek\'s Business Class and First Class support.',
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
    body: 'Secure, compliant ticketing through established business and first class travel channels.',
    href: 'https://www2.arccorp.com/',
  },
];

const expectationCards = [
  {
    label: 'Business Class route audit',
    title: 'A cleaner view of the fare',
    body: 'Derek reviews aircraft, cabin quality, timing, and fare rules before recommending a Business Class option.',
  },
  {
    label: 'First Class availability check',
    title: 'Luxury only when it makes sense',
    body: 'For First Class requests, Derek checks whether the product, route, and price justify the upgrade.',
  },
  {
    label: 'Last-minute itinerary support',
    title: 'A human follow-up path',
    body: 'When timing matters, Derek can clarify details by phone or WhatsApp and keep the request moving.',
  },
];

const homeBlogExcerpts = {
  'why-travelers-overpay-business-class':
    'The public fare is only one version of the Business Class market. Here is why cabin pricing moves differently.',
  'business-class-service-beyond-seat':
    'Comfort begins before boarding. Better booking support can change the entire Business Class trip.',
  'hidden-business-class-deals':
    'Unpublished Business Class options come from fare access, timing, routing, and experience.',
};

function Hero({ selectedService, onSelectService, promoCode, onPromoCodeChange, onResetExtras }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUsable, setVideoUsable] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

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
        .from('.hero__advisor-card', { y: 28, opacity: 0, duration: 0.52, ease: 'power3.out' }, '-=0.2')
        .from('.hero .quote-form', { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.22');
    }, heroRef);

    return () => {
      desktopQuery.removeEventListener('change', updateVideoState);
      motionQuery.removeEventListener('change', updateVideoState);
      cleanup();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setVideoReady(false);
    setVideoUsable(true);

    if (!showVideo) return undefined;

    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.playsInline = true;

    const startPlayback = async () => {
      try {
        await video.play();
        if (!cancelled && video.readyState >= 2) {
          setVideoReady(true);
        }
      } catch {
        if (!cancelled) {
          setVideoReady(false);
        }
      }
    };

    const loadTimer = window.setTimeout(() => {
      if (!cancelled && video.readyState === 0) {
        setVideoUsable(false);
      }
    }, 9000);

    void startPlayback();

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimer);
    };
  }, [showVideo]);

  const activateVideo = () => {
    const video = videoRef.current;
    if (!video || video.paused || video.readyState < 2) return;
    setVideoReady(true);
  };

  const requestVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    void video
      .play()
      .then(() => {
        if (video.readyState >= 2) {
          setVideoReady(true);
        }
      })
      .catch(() => setVideoReady(false));
  };

  const disableVideo = () => {
    setVideoReady(false);
    setVideoUsable(false);
  };

  return (
    <section className="hero" id="home-hero" ref={heroRef}>
      <img className="hero__image hero__poster" src={homeHeroVideo.poster} alt={homeHeroVideo.alt} />
      {showVideo && videoUsable && (
        <video
          ref={videoRef}
          className={`hero__video ${videoReady ? 'hero__video--ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={homeHeroVideo.poster}
          aria-hidden="true"
          onCanPlay={requestVideoPlayback}
          onError={disableVideo}
          onLoadedData={requestVideoPlayback}
          onPlaying={activateVideo}
          onStalled={() => setVideoReady(false)}
        >
          <source src={homeHeroVideo.src} type="video/mp4" />
        </video>
      )}
      <div className="hero__overlay" />
      <canvas className="hero__particles" ref={canvasRef} aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__layout">
          <div className="hero__intro">
            <p className="hero__eyebrow">Personal Aviation Advisor</p>
            <h1 className="hero__title">
              <span className="line">Derek</span>
              <span className="line">Monti</span>
            </h1>
            <p className="hero__headline">Business Class. Remarkable Prices.</p>
            <p className="hero__copy">
              Business and first class seats sourced personally by Derek - private fare access, calmer support, and
              quotes within hours.
            </p>
            <div className="hero__airlines">
              <span>Flying with</span>
              <b>Qatar</b>
              <b>Emirates</b>
              <b>Turkish</b>
              <b>Singapore</b>
              <b>Cathay Pacific</b>
            </div>
          </div>

          <aside className="hero__advisor-card" aria-label="Derek Monti advisor profile">
            <div className="hero__advisor-image">
              <img
                src={imagery.derekPortrait}
                alt="Derek Monti smiling in a navy blazer"
                loading="eager"
                decoding="async"
                width="1122"
                height="1402"
              />
            </div>
            <div className="hero__advisor-meta">
              <strong>Derek Monti</strong>
              <p>Business &amp; first class, sourced by hand.</p>
            </div>
          </aside>

          <div className="hero__form-panel" id="request-form">
            <QuoteForm
              requirePhone
              source={HOME_REQUEST_SOURCE}
              requestTitle={HOME_REQUEST_TITLE}
              extraPayload={{ selectedService, promoCode }}
              confirmationContext={{
                selectedService,
                promoCode,
                advisorAvatarSrc: imagery.derekAvatar,
              }}
              onResetExtras={onResetExtras}
            />
            <TravelAdvantageSelector
              selectedService={selectedService}
              onSelectService={onSelectService}
              promoCode={promoCode}
              onPromoCodeChange={onPromoCodeChange}
            />
          </div>
        </div>
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
            before recommending the cleanest business and first class itinerary.
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
          text="Business and first class fares are only useful when the service around them is equally considered."
        />
        <div className="why-showcase">
          <aside className="why-showcase__brief" data-reveal>
            <p className="eyebrow">Derek's Difference</p>
            <h3>Business class fares deserve a human eye.</h3>
            <p>
              Derek checks the fare, aircraft, routing, rules, and support path before you commit. The result feels
              less like searching and more like having someone in your corner.
            </p>
            <div className="why-showcase__metrics" aria-label="Derek Monti service highlights">
              <div>
                <strong>15-60%</strong>
                <span>business and first class savings</span>
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
            relationships, and finding the highest value for each business and first class journey.
          </p>
          <Button href="#contact">Contact Derek</Button>
        </div>
        <div className="bio-teaser__portrait" data-reveal>
          <div className="derek-portrait">
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
    <section className="testimonials" id="expectations">
      <div className="container">
        <div className="testimonials__intro" data-reveal>
          <p className="eyebrow">Advisor Support</p>
          <h2>What Travelers Can Expect From Derek</h2>
          <p>Clear Business Class and First Class fare guidance before you commit to the ticket.</p>
        </div>
        <div className="review-grid">
          {expectationCards.map((item) => (
            <article className="proof-card" key={item.title} data-reveal>
              <span className="proof-card__label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
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
          text="Business Class strategy, destination guidance, and Derek's practical travel notes."
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
                <p>{homeBlogExcerpts[post.slug] || post.excerpt}</p>
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
  const savingsCarouselRef = useRef(null);
  const [selectedService, setSelectedService] = useState(STANDARD_SERVICE_VALUE);
  const [promoCode, setPromoCode] = useState('');
  useDocumentMeta(
    'Derek Monti - Personal Aviation Advisor | Business Class at Insider Prices',
    'Get business and first class flights at 15-60% off published fares. Derek Monti is your personal aviation expert.',
  );
  usePageMotion(pageRef);

  const resetHomeExtras = () => {
    setSelectedService(STANDARD_SERVICE_VALUE);
    setPromoCode('');
  };

  return (
    <div ref={pageRef}>
      <Hero
        selectedService={selectedService}
        onSelectService={setSelectedService}
        promoCode={promoCode}
        onPromoCodeChange={setPromoCode}
        onResetExtras={resetHomeExtras}
      />
      <section className="savings-section savings-section--inline-controls scenic-section scenic-section--savings">
        <ScenicBackdrop backdrop={siteBackdrops.homeSavings} />
        <div className="container">
          <div className="savings-section__lead">
            <SectionHeader
              eyebrow="Smart Savings"
              title="Save More. Fly Better."
              text="By uncovering hidden fares and private offers, Derek makes business and first class travel more accessible without compromising comfort."
              align="left"
              light
            />
            <div className="route-carousel__controls savings-section__controls" aria-label="Route carousel controls">
              <button
                type="button"
                onClick={() => savingsCarouselRef.current?.scroll(-1)}
                aria-label="Previous deal"
              >
                <ArrowLeft aria-hidden="true" size={18} />
              </button>
              <button
                type="button"
                onClick={() => savingsCarouselRef.current?.scroll(1)}
                aria-label="Next deal"
              >
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
          <RouteCarousel ref={savingsCarouselRef} deals={routeDeals} showControls={false} />
          <p className="savings-section__fineprint">
            Sample fares are based on comparable recent quotes. Prices change quickly and are not guaranteed until
            ticketed.
          </p>
        </div>
      </section>
      <Methodology />
      <WhyDerek />
      <TrustBar />
      <GuidanceTeaser />
      <BioTeaser />
      <HowItWorks />
      <Testimonials />
      <section className="faq-section" id="faq">
        <div className="container faq-section__inner">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" align="left" />
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>
      <AirlineMarquee />
      <BlogPreview />
      <FinalCta
        backdrop={siteBackdrops.homeFinalCta}
        title="Ready to Fly Business Class for Less?"
        text="Send Derek your Business Class or First Class travel details and receive curated options within hours."
      />
    </div>
  );
}
