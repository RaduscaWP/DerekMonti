import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { COMFORT_OPTIONS } from '../homepage/tripState.js';
import { useTripBrief } from '../../context/TripBriefProvider.jsx';
import { contactConfig, homeFaqs } from '../../data/siteData.js';
import { selectedJourneys } from '../../data/editorialData.js';
import { trackEvent } from '../../utils/analytics.js';
import TripForm from '../homepage/TripForm.jsx';
import ItineraryComparison from './ItineraryComparison.jsx';
import JournalFeature from './JournalFeature.jsx';
import styles from './HomeEditorial.module.scss';

const whatsapp = `https://wa.me/${contactConfig.whatsappNumber}`;
const comfortAlts = { rested: 'An illustrative business-class seat with an extended leg rest and blanket.', work: 'An illustrative business-class seat with a laptop on the tray.', together: 'Two illustrative neighboring business-class seats.' };

export default function HomeEditorial({ tripBusy, onBusyChange }) {
  const { trip, setTrip, step, setStep, markConversionSource } = useTripBrief();
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [routeNotice, setRouteNotice] = useState('');
  const navigate = useNavigate();
  const journey = selectedJourneys[journeyIndex];
  const comfort = COMFORT_OPTIONS.find(({ value }) => value === trip.comfort) || COMFORT_OPTIONS[0];

  function goToTrip() { markConversionSource('homepage'); navigate('/#request-form'); }
  function useJourney() {
    if (tripBusy) return;
    setTrip(current => current.tripType === 'multi_city'
      ? { ...current, legs: current.legs.map((leg, i) => i === 0 ? { ...leg, from: journey.from, to: journey.to } : leg) }
      : { ...current, from: journey.from, to: journey.to });
    setStep(0);
    setRouteNotice(`${journey.from} to ${journey.to} added to your brief.`);
    trackEvent('journey_select', { source: 'homepage' });
    goToTrip();
  }

  return <div className={styles.editorial}>
    <section className={styles.standards} aria-label="Personal service">
      <div className={styles.wrap}><p>Business & first class.<br /><strong>With a person behind the plan.</strong></p><ul><li><Check size={17} aria-hidden="true" />Direct with Derek</li><li><Check size={17} aria-hidden="true" />Your whole itinerary considered</li><li><Check size={17} aria-hidden="true" />No booking commitment to request</li></ul></div>
    </section>

    <ItineraryComparison compact />

    <section id="comfort" className={styles.comfort} aria-labelledby="comfort-title">
      <div className={styles.wrap}><div className={styles.comfortStage}><div className={styles.comfortCopy}><p className={styles.eyebrow}>Your journey, your priorities</p><h2 id="comfort-title">How do you<br />want to arrive?</h2><p>{comfort.description}</p><Link className={styles.primary} to="/#request-form" onClick={() => markConversionSource('homepage')}>Build my trip brief <ArrowRight size={19} aria-hidden="true" /></Link></div><figure className={styles.comfortImage}><img src={`/images/homepage/comfort-${comfort.value}.webp`} width="1200" height="1200" alt={comfortAlts[comfort.value]} loading="lazy" decoding="async" /><figcaption>Illustrative cabin. Details vary by flight.</figcaption></figure></div><fieldset className={styles.comfortOptions}><legend className="sr-only">Choose an arrival priority, optional</legend>{COMFORT_OPTIONS.map(option => <label key={option.value} data-selected={trip.comfort === option.value}><input type="radio" name="editorial-priority" disabled={tripBusy} checked={trip.comfort === option.value} onChange={() => { setTrip(current => ({ ...current, comfort: option.value })); trackEvent('comfort_select', { priority: option.value }); }} /><span>{option.label}</span><ArrowUpRight size={18} aria-hidden="true" /></label>)}</fieldset><p className={styles.saved} aria-live="polite">{trip.comfort ? `${comfort.label} added to your brief. You can change it anytime.` : 'Choose what matters to you, or leave it open for discussion.'}</p></div>
    </section>

    <section id="meet-derek" className={`${styles.advisor} ${styles.wrap}`} aria-labelledby="intro-title">
      <figure><img src="/images/derek-monti.jpg" width="1122" height="1402" alt="Derek Monti, your personal flight advisor." loading="lazy" decoding="async" /><figcaption>Derek Monti <span>Your personal flight advisor</span></figcaption></figure><div className={styles.advisorCopy} data-reveal><p className={styles.eyebrow}>A person behind your journey</p><h2 id="intro-title">A good flight starts<br />with someone<br />who listens.</h2><p>I'm Derek. Tell me where you need to be, what matters on the way, and the details you would like help comparing.</p><p>I review the route, cabin, timing and fare conditions together. Your priorities stay part of the same conversation.</p><Link className={styles.textLink} to="/about">Get to know Derek <ArrowUpRight size={19} aria-hidden="true" /></Link><a className={styles.advisorContact} href={whatsapp} target="_blank" rel="noreferrer" onClick={() => trackEvent('contact_method_click', { method: 'whatsapp', source: 'homepage' })}>Or start a conversation on WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </section>

    <section id="how-it-works" className={`${styles.process} ${styles.wrap}`} aria-labelledby="process-title"><header data-reveal><p className={styles.eyebrow}>How it works</p><h2 id="process-title">A conversation.<br />A considered journey.</h2></header><ol>{[
      ['Share your plans', 'Your route, dates, cabin and priorities. Start with the details you know.'],
      ['Review the options', 'Derek considers the schedule, each flight segment and the fare conditions.'],
      ['Choose what fits', 'Compare the details, ask your questions and decide whether to proceed.'],
    ].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

    <section className={`${styles.journeys} ${styles.wrap}`} aria-labelledby="selected-journeys-title">
      <header className={styles.splitHeading} data-reveal><div><p className={styles.eyebrow}>Selected journeys</p><h2 id="selected-journeys-title">Where the next<br />chapter begins.</h2></div><p>A few starting points. Bring your destination, your dates and the way you want to travel.</p></header>
      <div className={styles.destination}>
        <figure className={styles.destinationImage}><img src={journey.image} alt={journey.alt} loading="lazy" decoding="async" width="1800" height={journey.id === 'london' ? '992' : journey.id === 'new-york' ? '1350' : '2700'} /><figcaption><span>{journey.country}</span><strong>{journey.city}</strong></figcaption></figure>
        <div className={styles.destinationCopy}><p className={styles.eyebrow}>{journey.label}</p><h3>{journey.detail}</h3><p>{journey.description}</p><div className={styles.cityPair}><div><small>From</small><strong>{journey.fromCode}</strong><span>{journey.from.split(' (')[0]}</span></div><ArrowRight size={26} aria-hidden="true" /><div><small>To</small><strong>{journey.toCode}</strong><span>{journey.city}</span></div></div><button type="button" className={styles.primary} disabled={tripBusy} onClick={useJourney}>Plan this journey <ArrowRight size={19} aria-hidden="true" /></button><Link className={styles.textLink} to={journey.hub}>Read the planning guide <ArrowUpRight size={17} aria-hidden="true" /></Link><small className={styles.disclaimer}>A route to explore. Availability and fares are reviewed for your dates.</small></div>
      </div>
      <div className={styles.journeyNavigation}><div className={styles.destinations} role="group" aria-label="Choose a journey">{selectedJourneys.map(({ city }, index) => <button type="button" key={city} aria-pressed={journeyIndex === index} onClick={() => setJourneyIndex(index)}>{city}</button>)}</div><div className={styles.carouselButtons}><button type="button" aria-label="Previous journey" onClick={() => setJourneyIndex(index => (index + selectedJourneys.length - 1) % selectedJourneys.length)}><ChevronLeft size={20} aria-hidden="true" /></button><button type="button" aria-label="Next journey" onClick={() => setJourneyIndex(index => (index + 1) % selectedJourneys.length)}><ChevronRight size={20} aria-hidden="true" /></button></div></div><p className="sr-only" aria-live="polite">{routeNotice}</p>
    </section>

    <section className={`${styles.hubs} ${styles.wrap}`} aria-labelledby="discovery-title"><div><p className={styles.eyebrow}>Continue exploring</p><h2 id="discovery-title">Find your starting point.</h2></div><nav aria-label="Premium travel planning"><Link to="/business-class-flights">Business class <ArrowUpRight size={18} aria-hidden="true" /></Link><Link to="/first-class-flights">First class <ArrowUpRight size={18} aria-hidden="true" /></Link><Link to="/services/last-minute-business-class">Time-sensitive travel <ArrowUpRight size={18} aria-hidden="true" /></Link><Link to="/services/premium-flight-advisor">Personal flight guidance <ArrowUpRight size={18} aria-hidden="true" /></Link></nav></section>

    <section className={`request-section ${styles.request}`} id="request-form" aria-labelledby="trip-section-title"><div className={styles.wrap}><div className={`request-heading ${styles.requestHeading}`}><p className={styles.eyebrow}>Your next departure</p><h2 id="trip-section-title" tabIndex="-1">Where shall we go?</h2><p>Start with your journey. Add the details that make it yours.</p></div><TripForm trip={trip} setTrip={setTrip} step={step} setStep={setStep} onBusyChange={onBusyChange} /><noscript><p className={styles.noScript}>To share your plans directly, <a href={`mailto:${contactConfig.email}`}>email Derek</a> or <a href={whatsapp}>use WhatsApp</a>.</p></noscript></div></section>

    <section className={`${styles.faq} ${styles.wrap}`} aria-labelledby="faq-title"><header><p className={styles.eyebrow}>Before you take off</p><h2 id="faq-title">A few things<br />to know.</h2><a className={styles.textLink} href={whatsapp} target="_blank" rel="noreferrer">Ask Derek a question <ArrowUpRight size={17} aria-hidden="true" /></a></header><div>{homeFaqs.map(({ question, answer }, index) => <details className={styles.faqItem} key={question} name="home-faq" open={index === 0 || undefined}><summary><h3>{question}</h3><span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>

    <JournalFeature />

    <section className={styles.closing} aria-labelledby="closing-title"><img src="/images/editorial/tokyo.webp" alt="" width="1800" height="2700" loading="lazy" decoding="async" /><div className={styles.wrap}><p className={styles.eyebrow}>Your next chapter</p><h2 id="closing-title">Your journey.<br />My personal attention.</h2><p className={styles.closingNext}>Share your route and dates. Derek will review the details around you.</p><Link className={styles.whiteButton} to="/#request-form" onClick={() => markConversionSource('homepage')}>Plan my trip <ArrowRight size={20} aria-hidden="true" /></Link></div></section>
  </div>;
}
