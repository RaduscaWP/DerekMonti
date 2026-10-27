import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { loadGsap } from '../../utils/motion.js';
import Button from '../common/Button.jsx';
import QuickQuote from '../common/QuickQuote.jsx';
import { imagery, stats } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';

const HERO_REQUEST_TITLE = 'Premium flight quote request';

const proofItems = [
  { value: stats.savings, label: stats.savingsLabel },
  { value: stats.clients, label: stats.clientsLabel },
  { value: stats.support, label: stats.supportLabel },
];

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const whatsappUrl = getWhatsappUrl({ requestTitle: HERO_REQUEST_TITLE });

  // Background video: only autoplay when the visitor has not asked for reduced motion.
  // The <video> is server-rendered without autoplay so the decision is made in the browser.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      if (query.matches) {
        video.pause();
        return;
      }
      const connection = navigator.connection;
      const smallScreen = !window.matchMedia('(min-width: 940px)').matches;
      if (smallScreen || (connection && (connection.saveData || /2g/.test(connection.effectiveType || '')))) {
        video.pause();
        return;
      }
      video.muted = true;
      video.defaultMuted = true;
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    };

    sync();

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', sync);
      return () => query.removeEventListener('change', sync);
    }
    query.addListener(sync);
    return () => query.removeListener(sync);
  }, []);

  // Entrance timeline (skipped under reduced motion or when the script arrives late).
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    // On a slow connection the copy has been on screen for a while before this runs;
    // hiding it again would only delay the largest contentful paint.
    if (performance.now() > 1000) return undefined;

    let cancelled = false;
    let ctx = null;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const base = { y: 28, opacity: 0, duration: 0.6, ease: 'power3.out' };

        gsap
          .timeline({ delay: 0.1, defaults: { stagger: 0.08 } })
          .from('.hero__eyebrow', { ...base, y: 16 })
          .from('.hero__title-line', { y: 48, duration: 0.75, ease: 'power3.out' }, '-=0.35')
          .from('.hero__copy', { y: 28, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .from('.hero__actions', base, '-=0.42')
          .from('.hero__quick', base, '-=0.42')
          .from('.hero__proof', base, '-=0.4')
          .from('.hero__fineprint', { ...base, y: 12 }, '-=0.45')
          .from('.hero__portrait', { x: 32, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.9');
      }, sectionRef);
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef} aria-labelledby="home-title">
      <div className="hero__media" aria-hidden="true">
        <video
          className="hero__video"
          ref={videoRef}
          poster={imagery.heroPoster}
          preload="none"
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        >
          <source src={imagery.heroVideo} type="video/mp4" />
        </video>
        <div className="hero__overlay" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Derek Monti · Personal flight advisor · Miami</p>

          <h1 className="hero__title" id="home-title">
            <span className="hero__title-line">Business &amp; First Class</span>
            <span className="hero__title-line">tickets at insider prices.</span>
          </h1>

          <p className="hero__copy">
            I source Business and First Class tickets through consolidator fares, typically {stats.savings} below what
            the airline publishes, and I handle every booking personally. Send me your route and dates; I reply with
            real options within hours.
          </p>

          <div className="hero__actions">
            <Button href="#request-form" size="lg">
              Get a quote
            </Button>
            <a className="btn btn--outline btn--lg" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={18} strokeWidth={2.1} />
              <span>WhatsApp Derek</span>
            </a>
          </div>

          <div className="hero__quick">
            <QuickQuote variant="hero" />
          </div>

          <ul className="hero__proof" aria-label="Why travelers book with Derek">
            {proofItems.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <p className="hero__fineprint">Free quote, no obligation. Fares are confirmed before ticketing.</p>
        </div>

        <figure className="hero__portrait">
          <div className="hero__portrait-frame">
            <img
              src="/images/derek-monti-768.webp"
              srcSet="/images/derek-monti-480.webp 480w, /images/derek-monti-768.webp 768w, /images/derek-monti-1122.webp 1122w"
              sizes="(max-width: 720px) 72vw, (max-width: 940px) 360px, 420px"
              alt="Derek Monti, personal flight advisor"
              width="1122"
              height="1402"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="hero__portrait-caption">
            <strong>Derek Monti</strong>
            <span>Your personal flight advisor</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
