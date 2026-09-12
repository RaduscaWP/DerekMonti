import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, ArrowUpRight, ChevronDown, Menu, X, Pause, Play, PlaneTakeoff, PlaneLanding, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TripForm from './TripForm.jsx';
import { createInitialTrip, COMFORT_OPTIONS } from './tripState.js';
import './homepage-base.scss';
import './homepage.scss';

gsap.registerPlugin(ScrollTrigger);
const LIVE = '';
const WHATSAPP = 'https://wa.me/17867064828';
const visuals = { rested: 'A navy business-class seat with an extended leg rest and a woven blanket.', work: 'An upright navy business-class seat with a laptop on its tray.', together: 'Two neighboring navy business-class seats for shared travel.' };
const questions = [
  ['What happens after I share my trip?', 'Derek reviews your route, dates and preferences, then discusses suitable flight options with you. You can ask questions and review the details before deciding to book.'],
  ['Can I plan a one-way or multi-city journey?', 'Yes. Choose your trip type in the form. For a multi-city journey, add each flight with its departure date. You can also explain an open-jaw route or other details in your notes.'],
  ['Does choosing a comfort priority reserve a seat?', 'No. It helps Derek understand what matters to you. The cabin illustrations show a preference; the seat, amenities and seating arrangements depend on the actual flight and availability.'],
  ['Can I be flexible with my travel dates?', 'Yes. Tell Derek how flexible your dates are. He can consider that flexibility when reviewing your route and available options. Final prices and conditions depend on the itinerary.'],
  ['How do I contact Derek directly?', 'You can call, email or use WhatsApp through the links below. You will discuss your journey personally with Derek.'],
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return reduced;
}

function Brand({ light = false, onClick }) {
  return <a className={`brand${light ? ' brand--light' : ''}`} href="#top" onClick={onClick} aria-label="Fly with Derek home">Fly with <strong>Derek</strong></a>;
}

function HeroMedia({ reduced }) {
  const video = useRef(null);
  const host = useRef(null);
  const [paused, setPaused] = useState(false);
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
    if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches || paused || !visible || !pageVisible || failed) { element.pause(); return; }
    let cancelled = false;
    element.play().catch(() => { if (!cancelled) setPaused(true); });
    return () => { cancelled = true; element.pause(); };
  }, [reduced, paused, visible, pageVisible, failed]);
  return <div ref={host} className="hero-media">
    <img className="hero-poster" src="/images/homepage/hero-window-video-poster.webp" width="1536" height="1024" alt="" fetchpriority="high" />
    {!reduced && <video ref={video} className={`hero-video${playing || paused ? ' is-visible' : ''}`} muted loop playsInline preload="metadata" poster="/images/homepage/hero-window-video-poster.webp" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
      <source src="/images/homepage/hero-window-loop.webm" type="video/webm" />
      <source src="/images/homepage/hero-window-loop.mp4" type="video/mp4" onError={() => { setFailed(true); setPlaying(false); }} />
    </video>}
    <div className="hero-shade" />
    {!reduced && !failed && <button className="motion-toggle" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play background video' : 'Pause background video'}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? 'Play the view' : 'Pause the view'}</span></button>}
  </div>;
}

export default function Homepage() {
  const [trip, setTrip] = useState(createInitialTrip);
  const [step, setStep] = useState(0);
  const [tripBusy, setTripBusy] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const systemReduced = useReducedMotion();
  const [quietMotion, setQuietMotion] = useState(false);
  const reduced = systemReduced || quietMotion;
  const page = useRef(null);
  const menu = useRef(null);
  const menuButton = useRef(null);
  const heroFrom = useRef(null);
  const selected = COMFORT_OPTIONS.find(({ value }) => value === trip.comfort);
  const shown = selected || COMFORT_OPTIONS[0];
  const heroRoute = trip.tripType === 'multi_city' ? trip.legs[0] : trip;

  useEffect(() => { const scroll = () => setScrolled(window.scrollY > 60); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => {
    if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-enter', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .09, ease: 'power3.out', clearProps: 'transform,opacity' });
      gsap.utils.toArray('[data-reveal]').forEach((element) => gsap.fromTo(element, { y: 24, opacity: .4 }, { y: 0, opacity: 1, duration: .85, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }));
    }, page);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  function closeMenu() { menu.current?.close(); document.body.style.overflow = ''; }
  function openMenu() { menu.current?.showModal(); document.body.style.overflow = 'hidden'; }
  function goToTrip() {
    closeMenu();
    requestAnimationFrame(() => {
      document.getElementById('request-form').scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
      document.getElementById('trip-section-title').focus({ preventScroll: true });
    });
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

  return <div ref={page} id="top" className="homepage-experience" data-motion={reduced ? 'reduced' : 'full'}>
    <a className="homepage-skip-link" href="#request-form">Skip to trip planning</a>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner"><Brand light /><nav className="desktop-nav" aria-label="Main navigation"><a href="#comfort">The experience</a><a href="#meet-derek">About Derek</a></nav><button className="button button--primary header-cta" onClick={goToTrip}>Plan my trip <ArrowRight size={19} /></button><button ref={menuButton} className="menu-toggle" onClick={openMenu} aria-label="Open menu" aria-haspopup="dialog"><Menu /></button></div>
    </header>
    <dialog ref={menu} className="homepage-mobile-menu" aria-label="Main menu" onClose={() => { document.body.style.overflow = ''; }} onCancel={closeMenu}>
      <div className="menu-heading"><Brand light onClick={closeMenu} /><button className="menu-toggle" onClick={closeMenu} aria-label="Close menu"><X /></button></div>
      <nav aria-label="Mobile navigation"><a onClick={closeMenu} href="#comfort">The experience <ArrowUpRight /></a><a onClick={closeMenu} href="#meet-derek">About Derek <ArrowUpRight /></a><a onClick={closeMenu} href="#how-it-works">How it works <ArrowUpRight /></a><button onClick={goToTrip}>Plan my trip <ArrowRight /></button></nav>
      <a className="menu-contact" href={WHATSAPP} target="_blank" rel="noreferrer">Talk to Derek on WhatsApp <ArrowUpRight size={18} /></a>
    </dialog>

    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <HeroMedia reduced={reduced} />
        <div className="hero-inner section-wrap">
          <div className="hero-copy">
            <p className="homepage-eyebrow hero-enter">Business & first class</p>
            <h1 id="hero-title" className="hero-enter">A better journey.<br /><span>Personally arranged.</span></h1>
            <p className="hero-description hero-enter">Tell Derek where you want to go. He will review the route, cabin and details around you.</p>
            <div className="hero-actions hero-enter"><button className="button button--primary" onClick={() => heroFrom.current?.focus()}>Plan my trip <ArrowRight size={21} /></button><a className="homepage-text-link" href="#meet-derek">Meet Derek</a></div>
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

      <section className="introduction section-wrap" id="meet-derek" aria-labelledby="intro-title">
        <div data-reveal><p className="homepage-eyebrow">A person behind your journey</p><h2 id="intro-title">The difference<br />is in the details.</h2></div>
        <div className="intro-copy"><p className="intro-lead">A good flight starts with someone who listens.</p><p>I'm Derek. I help you explore business and first class around your plans — the route, the cabin, the timing, and the little things that make travel feel easier.</p><p>You share what matters. I personally review the options with you.</p><a className="derek-intro-link" href={`${LIVE}/about`}><img src="/images/homepage/derek-monti.jpg" width="52" height="52" alt="" loading="lazy" /><span>Get to know Derek<small>Your personal flight advisor</small></span><ArrowUpRight size={20} /></a></div>
      </section>

      <section id="comfort" className="comfort" aria-labelledby="comfort-title">
        <div className="comfort-inner section-wrap">
          <div className="comfort-copy"><p className="homepage-eyebrow">Your journey, your priorities</p><h2 id="comfort-title">How do you<br />want to arrive?</h2><p className="section-description">Start with what matters to you. Derek will use your priorities to review your trip.</p>
            <fieldset className="comfort-options"><legend className="sr-only">Choose your arrival priority, optional</legend>{COMFORT_OPTIONS.map((option, index) => <label key={option.value} className={trip.comfort === option.value ? 'is-selected' : ''}><span className="comfort-number">0{index + 1}</span><input type="radio" disabled={tripBusy} name="studio-priority" aria-label={option.label} value={option.value} checked={trip.comfort === option.value} onChange={() => setTrip((current) => ({ ...current, comfort: option.value }))} /><span className="comfort-option-copy"><strong>{option.label}</strong><span className={`comfort-explanation${shown.value === option.value ? ' is-shown' : ''}`}>{option.description}</span></span></label>)}</fieldset>
            <button className="button button--primary comfort-continue" onClick={goToTrip}>{selected ? 'Add to my trip brief' : 'Start my trip brief'} <ArrowRight size={20} /></button>
            <p className="comfort-saved" aria-live="polite">{selected ? <><Check size={13} /> {selected.label} added. You can change it anytime.</> : 'Explore a priority, then add it to your trip.'}</p>
          </div>
          <div className="comfort-visual" aria-label={visuals[shown.value]} role="img">{COMFORT_OPTIONS.map(({ value }) => <img key={value} className={shown.value === value ? 'is-active' : ''} src={`/images/homepage/comfort-${value}.webp`} width="1200" height="1200" loading="lazy" decoding="async" alt="" aria-hidden="true" />)}<p>Illustrative cabin. Details vary by flight.</p></div>
        </div>
      </section>

      <section id="how-it-works" className="process section-wrap" aria-labelledby="process-title"><div className="section-heading" data-reveal><div><p className="homepage-eyebrow">Personally considered</p><h2 id="process-title">From your first thought<br />to your next departure.</h2></div><p>A simple conversation.<br />A journey shaped around you.</p></div><ol className="process-steps">{[
        ['Tell me your plans', 'Your route, your dates, your priorities. Start with what you know; we can work through the details together.'],
        ['Explore your options', 'I review suitable flights and talk you through the cabin, itinerary and fare conditions.'],
        ['Decide with confidence', 'Review the details and ask your questions. You decide whether the journey is right for you.'],
      ].map(([title, copy], i) => <li key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>

      <section className="request-section" id="request-form" aria-labelledby="trip-section-title"><div className="section-wrap"><div className="request-heading"><p className="homepage-eyebrow">Your next chapter</p><h2 id="trip-section-title" tabIndex="-1">Where shall we go?</h2><p>Start your trip brief. Make it yours, one detail at a time.</p></div><TripForm trip={trip} setTrip={setTrip} step={step} setStep={setStep} onBusyChange={setTripBusy} /></div></section>

      <section className="faq section-wrap" aria-labelledby="faq-title"><div><p className="homepage-eyebrow">Before you take off</p><h2 id="faq-title">A few things<br />to know.</h2><a className="homepage-text-link homepage-text-link--dark" href={WHATSAPP} target="_blank" rel="noreferrer">Ask Derek a question <ArrowUpRight size={17} /></a></div><div className="homepage-faq-list">{questions.map(([question, answer], index) => <div className={`homepage-faq-item${openFaq === index ? ' is-open' : ''}`} key={question}><h3><button aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<ChevronDown size={19} /></button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></div>)}</div></section>

      <section className="closing" aria-labelledby="closing-title"><div className="section-wrap closing-inner"><div><p className="homepage-eyebrow">A higher way to see the world</p><h2 id="closing-title">Your journey.<br />My personal attention.</h2></div><div className="closing-actions"><button className="button button--white" onClick={goToTrip}>Plan my trip <ArrowRight size={20} /></button><a href={WHATSAPP} target="_blank" rel="noreferrer">Or start a conversation on WhatsApp <ArrowUpRight size={17} /></a></div></div></section>
    </main>

    <footer className="site-footer"><div className="section-wrap"><div className="footer-main"><div className="footer-brand"><Brand light /><p>Business & first class.<br />Personally arranged.</p></div><nav aria-label="Footer navigation"><span className="footer-label">Explore</span><a href="#comfort">The experience</a><a href={`${LIVE}/services`}>Services</a><a href={`${LIVE}/about`}>About Derek</a><a href={`${LIVE}/blog`}>Travel journal</a></nav><div className="footer-contact"><span className="footer-label">Let's talk travel</span><a href="tel:+17867064828">+1 (786) 706-4828</a><a href="mailto:Derek@travelbusinessclass.com">Derek@travelbusinessclass.com</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} /></a></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Fly with Derek</p><div><a href={`${LIVE}/privacy`}>Privacy</a><a href={`${LIVE}/terms`}>Terms</a><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><label className="motion-preference"><input type="checkbox" checked={reduced} disabled={systemReduced} onChange={(event) => setQuietMotion(event.target.checked)} /> Reduce motion</label></div></div></footer>
  </div>;
}
