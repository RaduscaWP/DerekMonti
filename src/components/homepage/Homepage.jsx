import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeEditorial from '../editorial/HomeEditorial.jsx';
import { useTripBrief } from '../../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import { useNavigate } from 'react-router-dom';
import './homepage-base.scss';
import './homepage.scss';

gsap.registerPlugin(ScrollTrigger);
function HeroMedia({ reduced, motionReady }) {
  const video = useRef(null);
  const host = useRef(null);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(host.current);
    const change = () => setPageVisible(!document.hidden);
    change();
    document.addEventListener('visibilitychange', change);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', change); };
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!motionReady || reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !visible || !pageVisible || failed) { element.pause(); return; }
    let cancelled = false;
    element.play().catch(() => { if (!cancelled) setPlaying(false); });
    return () => { cancelled = true; element.pause(); };
  }, [reduced, motionReady, visible, pageVisible, failed]);
  return <div ref={host} className="hero-media">
    <img className="hero-poster" src="/images/homepage/hero-window-video-poster.webp" width="1536" height="1024" alt="" fetchpriority="high" />
    {motionReady && !reduced && <video ref={video} className={`hero-video${playing ? ' is-visible' : ''}`} muted loop playsInline preload="metadata" poster="/images/homepage/hero-window-video-poster.webp" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
      <source src="/images/homepage/hero-window-loop.webm" type="video/webm" />
      <source src="/images/homepage/hero-window-loop.mp4" type="video/mp4" onError={() => { setFailed(true); setPlaying(false); }} />
    </video>}
    <div className="hero-shade" />
  </div>;
}

export default function Homepage() {
  const { trip, setTrip, setStep, markConversionSource } = useTripBrief();
  const navigate = useNavigate();
  const [tripBusy, setTripBusy] = useState(false);
  const { reduced, motionReady } = useMotionPreference();
  const page = useRef(null);
  const heroFrom = useRef(null);
  const heroRoute = trip.tripType === 'multi_city' ? trip.legs[0] : trip;

  useEffect(() => {
    if (!motionReady || reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx;
    try {
      ctx = gsap.context(() => {}, page);
      ctx.add(() => {
        gsap.fromTo('.hero-enter', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .09, ease: 'power3.out', clearProps: 'transform,opacity' });
        gsap.utils.toArray('[data-reveal]').forEach((element) => gsap.fromTo(element, { y: 24, opacity: .4 }, { y: 0, opacity: 1, duration: .85, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }));
      });
    } catch {
      try { ctx?.revert(); } catch { /* Keep the static page usable. */ }
      page.current?.querySelectorAll('.hero-enter, [data-reveal]').forEach(element => { element.style.removeProperty('opacity'); element.style.removeProperty('transform'); });
    }
    return () => { try { ctx?.revert(); } catch { /* Motion is optional. */ } };
  }, [reduced, motionReady]);

  function goToTrip() {
    markConversionSource('homepage');
    navigate('/#request-form');
  }

  function updateHeroRoute(name, value) {
    if (tripBusy) return;
    document.getElementById('hero-to').setCustomValidity('');
    setTrip((current) => current.tripType === 'multi_city' ? { ...current, legs: current.legs.map((leg, index) => index === 0 ? { ...leg, [name]: value } : leg) } : { ...current, [name]: value });
  }
  function continueRoute(event) {
    event.preventDefault();
    if (tripBusy) return;
    const toInput = event.currentTarget.elements.heroTo;
    if (heroRoute.from.trim().toLowerCase() === heroRoute.to.trim().toLowerCase()) { toInput.setCustomValidity('Choose a destination different from your departure city.'); toInput.reportValidity(); return; }
    setStep(0);
    updateHeroRoute('from', heroRoute.from.trim());
    updateHeroRoute('to', heroRoute.to.trim());
    goToTrip();
  }

  return <div ref={page}>
      <section className="hero" aria-labelledby="hero-title">
        <HeroMedia reduced={reduced} motionReady={motionReady} />
        <div className="hero-inner section-wrap">
          <div className="hero-copy">
            <p className="homepage-eyebrow hero-enter">Business & first class</p>
            <h1 id="hero-title" className="hero-enter">A better journey.<br /><span>Personally arranged.</span></h1>
            <p className="hero-description hero-enter">Tell Derek where you want to go. He will review the route, cabin and details around you.</p>
            <div className="hero-actions hero-enter"><button className="button button--primary" onClick={() => { markConversionSource('homepage'); heroFrom.current?.focus(); }}>Plan my trip <ArrowRight size={21} /></button><a className="homepage-text-link" href="#meet-derek">Meet Derek</a></div>
            <div className="hero-advisor hero-enter"><img src="/images/homepage/derek-avatar.jpg" width="88" height="88" alt="Derek Monti" /><div><strong>Derek Monti</strong><span>Your personal flight advisor.</span></div></div>
            <p className="hero-signoff hero-enter">Exceptional travel<br />begins with a conversation.</p>
          </div>
          <form className="route-entry hero-enter" onSubmit={continueRoute} aria-label="Start planning your trip">
            <div className="route-input"><PlaneTakeoff size={27} /><label htmlFor="hero-from"><span>From</span><input disabled={tripBusy} ref={heroFrom} id="hero-from" name="heroFrom" autoComplete="off" maxLength={80} value={heroRoute.from} onChange={(event) => updateHeroRoute('from', event.target.value)} placeholder="Where are you flying from?" required /></label></div>
            <div className="route-input"><PlaneLanding size={27} /><label htmlFor="hero-to"><span>To</span><input disabled={tripBusy} id="hero-to" name="heroTo" autoComplete="off" maxLength={80} value={heroRoute.to} onChange={(event) => updateHeroRoute('to', event.target.value)} placeholder="Where do you want to go?" required /></label></div>
            <button className="button button--primary route-submit" type="submit" disabled={tripBusy}>Start planning <ArrowRight size={20} /></button>
            <a className="route-explore" href="#comfort"><span>Explore the experience<small>Start with what matters to you</small></span><ArrowDown size={20} /></a>
          </form>
        </div>
      </section>

      <HomeEditorial tripBusy={tripBusy} onBusyChange={setTripBusy} />
  </div>;
}
