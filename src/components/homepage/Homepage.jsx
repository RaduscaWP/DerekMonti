import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, ArrowUpRight, ChevronDown, PlaneTakeoff, PlaneLanding, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TripForm from './TripForm.jsx';
import { COMFORT_OPTIONS } from './tripState.js';
import { useTripBrief } from '../../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts, contactConfig, homeFaqs, whyDerek } from '../../data/siteData.js';
import './homepage-base.scss';
import './homepage.scss';

gsap.registerPlugin(ScrollTrigger);
const whatsapp = `https://wa.me/${contactConfig.whatsappNumber}`;
const visuals = { rested: 'A navy business-class seat with an extended leg rest and a woven blanket.', work: 'An upright navy business-class seat with a laptop on its tray.', together: 'Two neighboring navy business-class seats for shared travel.' };
const trustStandards = [
  ['Direct with Derek', 'Your request stays in one conversation.'],
  ['No booking commitment', 'A request starts a review. You decide what happens next.'],
  ['Conditions in view', 'Schedule, cabin, routing, and fare rules are considered together.'],
  ['A focused first step', 'Share trip and contact details — never payment or passport data.'],
];
const reviewChecks = [
  ['Schedule', 'Departure, arrival, and the complete travel day.'],
  ['Every segment', 'Where the cabin changes across the itinerary.'],
  ['Routing', 'Connections, airport changes, and total journey time.'],
  ['Fare conditions', 'The rules that matter if plans change.'],
];

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
  const { trip, setTrip, step, setStep, markConversionSource } = useTripBrief();
  const navigate = useNavigate();
  const [tripBusy, setTripBusy] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const { reduced, motionReady } = useMotionPreference();
  const page = useRef(null);
  const heroFrom = useRef(null);
  const selected = COMFORT_OPTIONS.find(({ value }) => value === trip.comfort);
  const shown = selected || COMFORT_OPTIONS[0];
  const heroRoute = trip.tripType === 'multi_city' ? trip.legs[0] : trip;

  useEffect(() => {
    if (!motionReady || reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-enter', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .09, ease: 'power3.out', clearProps: 'transform,opacity' });
      gsap.utils.toArray('[data-reveal]').forEach((element) => gsap.fromTo(element, { y: 24, opacity: .4 }, { y: 0, opacity: 1, duration: .85, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }));
    }, page);
    return () => ctx.revert();
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

      <section className="trust-standard" aria-labelledby="trust-standard-title">
        <div className="section-wrap trust-standard-inner">
          <div className="trust-standard-heading"><p className="homepage-eyebrow">The service standard</p><h2 id="trust-standard-title">Trust is built<br />into the process.</h2></div>
          <ol className="trust-standard-list">{trustStandards.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="introduction section-wrap" id="meet-derek" aria-labelledby="intro-title">
        <div data-reveal><p className="homepage-eyebrow">A person behind your journey</p><h2 id="intro-title">The difference<br />is in the details.</h2></div>
        <div className="intro-copy"><p className="intro-lead">A good flight starts with someone who listens.</p><p>I'm Derek. I help you explore business and first class around your plans — the route, the cabin, the timing, and the little things that make travel feel easier.</p><p>You share what matters. I personally review the options with you.</p><a className="derek-intro-link" href="/about"><img src="/images/homepage/derek-monti.jpg" width="52" height="52" alt="" loading="lazy" /><span>Get to know Derek<small>Your personal flight advisor</small></span><ArrowUpRight size={20} /></a></div>
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

      <section className="fare-review" aria-labelledby="fare-review-title">
        <div className="section-wrap fare-review-inner">
          <div className="fare-review-copy" data-reveal><p className="homepage-eyebrow">Before you decide</p><h2 id="fare-review-title">A fare can look right.<br /><span>The journey can tell a different story.</span></h2><p>Derek reviews the parts that decide whether an option actually fits your plans. The headline price is only one of them.</p><Link className="homepage-text-link" to="/blog/why-travelers-overpay-business-class">See the comparison framework <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <ol className="fare-review-list">{reviewChecks.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}</ol>
          <div className="fare-review-question"><span>The useful question</span><p>Which option makes the whole trip work better?</p><a href={whatsapp} target="_blank" rel="noreferrer">Bring Derek an itinerary <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section id="how-it-works" className="process section-wrap" aria-labelledby="process-title"><div className="section-heading" data-reveal><div><p className="homepage-eyebrow">Personally considered</p><h2 id="process-title">From your first thought<br />to your next departure.</h2></div><p>A simple conversation.<br />A journey shaped around you.</p></div><ol className="process-steps">{[
        ['Tell me your plans', 'Your route, your dates, your priorities. Start with what you know; we can work through the details together.'],
        ['Explore your options', 'I review suitable flights and talk you through the cabin, itinerary and fare conditions.'],
        ['Decide with confidence', 'Review the details and ask your questions. You decide whether the journey is right for you.'],
      ].map(([title, copy], i) => <li key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>

      <section className="why-personal" aria-labelledby="why-personal-title">
        <div className="section-wrap why-personal-inner">
          <header data-reveal><p className="homepage-eyebrow">Why work with Derek</p><h2 id="why-personal-title">One trip.<br />One person keeping<br />the full picture in view.</h2><p>Your priorities remain part of the same conversation from the first brief to the final comparison.</p><Link className="homepage-text-link" to="/services">Explore the itinerary desk <ArrowRight size={17} aria-hidden="true" /></Link></header>
          <ol>{whyDerek.map((item, index) => <li key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="request-section" id="request-form" aria-labelledby="trip-section-title"><div className="section-wrap"><div className="request-heading"><p className="homepage-eyebrow">Your next chapter</p><h2 id="trip-section-title" tabIndex="-1">Where shall we go?</h2><p>Start your trip brief. Make it yours, one detail at a time.</p></div><TripForm trip={trip} setTrip={setTrip} step={step} setStep={setStep} onBusyChange={setTripBusy} /></div></section>

      <section className="faq section-wrap" aria-labelledby="faq-title"><div><p className="homepage-eyebrow">Before you take off</p><h2 id="faq-title">A few things<br />to know.</h2><a className="homepage-text-link homepage-text-link--dark" href={whatsapp} target="_blank" rel="noreferrer">Ask Derek a question <ArrowUpRight size={17} /></a></div><div className="homepage-faq-list">{homeFaqs.map(({ question, answer }, index) => <div className={`homepage-faq-item${openFaq === index ? ' is-open' : ''}`} key={question}><h3><button aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<ChevronDown size={19} /></button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></div>)}</div></section>

      <section className="journal-preview" aria-labelledby="journal-preview-title">
        <div className="section-wrap">
          <header className="journal-preview-heading" data-reveal><div><p className="homepage-eyebrow">From the Journal</p><h2 id="journal-preview-title">Useful before<br />you choose.</h2></div><p>Three practical reads for comparing premium travel with clearer questions and fewer assumptions.</p></header>
          <div className="journal-preview-list">{blogPosts.slice(0, 3).map((post, index) => <Link to={`/blog/${post.slug}`} key={post.slug}><span>0{index + 1}</span><div><small>{post.category} · {post.readTime}</small><h3>{post.title}</h3><p>{post.excerpt}</p></div><ArrowRight size={20} aria-hidden="true" /></Link>)}</div>
          <Link className="homepage-text-link" to="/blog">View the full Journal <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="closing" aria-labelledby="closing-title"><div className="section-wrap closing-inner"><div><p className="homepage-eyebrow">A higher way to see the world</p><h2 id="closing-title">Your journey.<br />My personal attention.</h2></div><div className="closing-actions"><button className="button button--white" onClick={goToTrip}>Plan my trip <ArrowRight size={20} /></button><a href={whatsapp} target="_blank" rel="noreferrer">Or start a conversation on WhatsApp <ArrowUpRight size={17} /></a></div></div></section>
  </div>;
}
