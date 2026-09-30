import { ArrowDown, ArrowRight, Check, Plus } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../context/MotionPreferenceProvider.jsx';
import { evaluationItems, servicesFaqs } from '../data/siteData.js';
import { editorialImages } from '../data/editorialData.js';
import { changeTripType } from '../components/homepage/tripState.js';
import ItineraryComparison from '../components/editorial/ItineraryComparison.jsx';
import styles from './Services.module.scss';

const situations = [
  { value: 'single_destination', title: 'One clear journey', subtitle: 'A destination. Your priorities.', route: ['Departure', 'Journey', 'Destination'], description: 'A single destination can still involve connections. Consider the complete journey alongside the cabin.', fixed: 'The destination and commitments that shape your arrival.', flexible: 'Nearby dates, departure airports, or connections you would consider.', links: [['Business class', '/business-class-flights'], ['First class', '/first-class-flights']] },
  { value: 'complex_itinerary', title: 'Several connected stops', subtitle: 'Make every leg work together.', route: ['Departure', 'Stop one', 'Stop two', 'Final stop'], description: 'Look at the sequence as a whole, with room for different priorities on each leg.', fixed: 'The order of essential stops and commitments at each destination.', flexible: 'The time between stops, airports, or cabin priorities by segment.', links: [['Complex itineraries', '/services/complex-itineraries']] },
  { value: 'time_sensitive', title: 'Departure is close', subtitle: 'Start with what cannot move.', route: ['Earliest departure', 'Travel window', 'Latest arrival'], description: 'Bring the time constraints into focus, whether the trip has one destination or several stops.', fixed: 'Your earliest possible departure and latest acceptable arrival.', flexible: 'Any workable alternatives in timing, airports, or cabin.', links: [['Time-sensitive travel', '/services/last-minute-business-class']] },
  { value: 'personal_advisor', title: 'Personal flight advisor', subtitle: 'Talk through the whole picture.', route: ['Your priorities', 'Personal review', 'Your decision'], description: 'Start with the purpose of the trip. Cabin, schedule, routing, and ticket conditions belong in the same conversation.', fixed: 'The reason for the journey and the priorities you need to protect.', flexible: 'The preferences you would like to discuss before choosing a direction.', links: [['Personal flight advice', '/services/premium-flight-advisor']] },
];

const routeIndex = [
  { title: 'Choose your cabin', links: [['Business class', '/business-class-flights'], ['First class', '/first-class-flights']] },
  { title: 'Shape your request', links: [['Complex itineraries', '/services/complex-itineraries'], ['Last-minute travel', '/services/last-minute-business-class'], ['Personal flight advisor', '/services/premium-flight-advisor']] },
  { title: 'Plan by journey', links: [['US to Europe', '/business-class-flights/europe'], ['Europe to the US', '/business-class-flights/usa']] },
];

const serviceExperiences = [
  { id: 'business', label: 'Business class', title: 'Arrive with more left in you.', image: '/images/homepage/comfort-rested.webp', alt: 'Illustrative premium cabin with a reclining seat beside the window', intent: 'single_destination', cabin: 'business', href: '/business-class-flights', summary: 'Rest, a useful schedule, and the cabin that makes sense for the longest part of the trip.', detail: 'Compare the seat on each segment, overnight timing, and the connection around it. The best fit depends on the actual route, aircraft, dates, and ticket conditions.', points: ['Long-haul rest', 'Cabin on every segment', 'Arrival that fits your plans'] },
  { id: 'first', label: 'First class', title: 'A little more space. A different pace.', ...editorialImages.tokyo, intent: 'single_destination', cabin: 'first', href: '/first-class-flights', summary: 'Privacy and space, considered alongside the route and the experience actually offered.', detail: 'First class has a narrower footprint than business class. Derek reviews the specific product, the cabin across connections, and whether the extra space suits your journey.', points: ['Product-specific review', 'Privacy and personal space', 'Business and first compared'] },
  { id: 'complex', label: 'Complex itineraries', title: 'Several stops. One considered journey.', ...editorialImages.rome, intent: 'complex_itinerary', href: '/services/complex-itineraries', summary: 'Multi-city, open-jaw, and mixed cabins with the important commitments kept in order.', detail: 'List the stops that must happen and the dates that cannot move. Derek considers how each leg affects the next, including airports, connection time, cabin changes, and room between commitments.', points: ['Two to six flight legs in your brief', 'Fixed stops and flexible gaps', 'Mixed-cabin continuity'] },
  { id: 'urgent', label: 'Last-minute travel', title: 'When the arrival cannot wait.', ...editorialImages.newYork, intent: 'time_sensitive', href: '/services/last-minute-business-class', summary: 'Begin with the latest arrival you can accept, then make the workable alternatives clear.', detail: 'A complete brief helps when time is short. Share exact dates, the latest acceptable arrival, airport flexibility, cabin preference, and a reliable contact method. Availability still requires confirmation.', points: ['Clear departure and arrival limits', 'Workable airport alternatives', 'Direct contact with Derek'] },
];

function RouteDrawing({ situation }) {
  const labels = situation?.route || ['Your starting point', 'Your priorities', 'Your next chapter'];
  const complex = situation?.value === 'complex_itinerary';
  const points = complex ? [[35, 153], [191, 75], [347, 161], [505, 81]] : [[35, 153], [270, 75], [505, 153]];
  return (
    <figure className={styles.routeFigure}>
      <div className={styles.figureLabel}><span>Illustrative</span><span>{situation ? 'Your review starts here' : 'A journey, yet to take shape'}</span></div>
      <svg className={styles.horizontalRoute} viewBox="0 0 540 215" role="img" aria-label={labels.join(' → ')}>
        {situation?.value === 'time_sensitive' && <rect x="180" y="25" width="180" height="160" rx="3" className={styles.timeWindow} />}
        <path className={styles.guide} d="M35 185 H505 M35 25 V185 M505 25 V185" />
        <path key={situation?.value || 'empty'} className={situation ? styles.routeLine : styles.unselectedLine} d={complex ? 'M35 153 C95 153 120 75 191 75 S280 161 347 161 S441 81 505 81' : 'M35 153 C135 153 161 75 270 75 S412 153 505 153'} />
        {points.map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r="6" className={styles.node} /><text x={x} y={y + 28} textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}>{labels[index]}</text></g>)}
      </svg>
      <ol className={styles.verticalRoute} aria-label="Illustrative journey sequence">{labels.map((label) => <li key={label}><span aria-hidden="true" /><span>{label}</span></li>)}</ol>
      <figcaption>{situation?.description || 'Choose the situation that best describes where you want to begin. The finer details come next.'}</figcaption>
      {situation?.value === 'personal_advisor' && <p className={styles.advisorLenses}>Schedule · Cabin · Routing · Flexibility · Fare rules · Total trip fit</p>}
      <p className={styles.routeNote}>A planning illustration. Routes, cabin, price, and ticket conditions depend on your actual itinerary.</p>
    </figure>
  );
}

export default function Services() {
  const firstChoice = useRef(null);
  const { trip, setTrip, selectServiceIntent, markConversionSource } = useTripBrief();
  const { reduced, motionReady } = useMotionPreference();
  const selected = situations.find(({ value }) => value === trip.serviceIntent);
  const markServices = () => markConversionSource('services');
  const clearSelection = () => {
    selectServiceIntent(null);
    window.requestAnimationFrame(() => firstChoice.current?.focus());
  };
  const continueLink = (className) => <Link className={className} to="/#request-form" onClick={markServices}>Continue my trip brief <ArrowRight size={18} aria-hidden="true" /></Link>;
  const chooseExperience = (experience) => {
    selectServiceIntent(experience.intent);
    if (experience.cabin) setTrip((value) => ({ ...value, cabin: experience.cabin }));
    if (experience.intent === 'complex_itinerary') setTrip((value) => changeTripType(value, 'multi_city'));
    markServices();
  };

  return (
    <div className={styles.page} data-motion={motionReady && !reduced ? 'full' : 'reduced'}>
      <section className={styles.desk} aria-labelledby="services-title">
        <div className={styles.inner}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>Services <span aria-hidden="true">/</span> The itinerary desk</p>
            <h1 id="services-title">Premium travel, <br /><span>reviewed as a whole.</span></h1>
            <div className={styles.introBottom}><p>Derek considers cabin, route, timing, flexibility, and ticket conditions together.</p>{continueLink(styles.primary)}</div>
          </header>
          <div className={styles.workspace}>
            <div className={styles.selector}>
              <h2 id="situation-title">Where shall we begin?</h2>
              <p id="situation-help" className={styles.selectorHelp}>Choose a starting point. Your trip details stay yours to decide.</p>
              <div role="group" aria-labelledby="situation-title" aria-describedby="situation-help">
                {situations.slice(0, 3).map((situation, index) => (
                  <div className={styles.choiceWrap} key={situation.value}>
                    <button ref={index === 0 ? firstChoice : undefined} className={styles.choice} type="button" disabled={!motionReady} aria-pressed={selected?.value === situation.value} onClick={() => selectServiceIntent(situation.value)}>
                      <span className={styles.choiceNumber}>{String(index + 1).padStart(2, '0')}</span><span><strong>{situation.title}</strong><small>{situation.subtitle}</small></span><span className={styles.choiceMark}>{selected?.value === situation.value ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}</span>
                    </button>
                    {selected?.value === situation.value && <p className={styles.mobileExplanation}>{situation.description}</p>}
                  </div>
                ))}
                <button className={styles.advisorChoice} type="button" disabled={!motionReady} aria-pressed={selected?.value === 'personal_advisor'} onClick={() => selectServiceIntent('personal_advisor')}><span>Prefer to talk it through?<strong>Personal flight advisor</strong></span>{selected?.value === 'personal_advisor' ? <Check size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}</button>
              </div>
              {selected && <button type="button" className={styles.clearChoice} onClick={clearSelection}>Clear starting point</button>}
              <noscript><p className={styles.noScript}>The interactive desk needs JavaScript. Explore every service below or continue directly to the trip brief.</p></noscript>
            </div>
            <div className={styles.routeStage} data-intent={selected?.value || 'none'}>
              <div className={styles.stageHeading}><span>Your itinerary</span><span aria-live="polite" aria-atomic="true">{selected ? selected.title : 'No starting point selected'}</span></div>
              <RouteDrawing situation={selected} />
              {selected && <div className={styles.selectedActions}>{continueLink(styles.textLink)}<div className={styles.contextLinks}>{selected.links.map(([title, href]) => <Link key={href} to={href}>{title} <ArrowRight size={15} aria-hidden="true" /></Link>)}</div></div>}
            </div>
          </div>
          <a className={styles.explore} href="#review-framework">A closer look at the review <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </section>
      <section className={styles.experiences} aria-labelledby="experiences-title">
        <div className={styles.inner}>
          <header className={styles.experienceHeading}><div><p className={styles.eyebrow}>Your kind of journey</p><h2 id="experiences-title">The details change.<br />The attention stays personal.</h2></div><p>Choose what matters to this trip. Explore the details, or take that starting point straight into your brief.</p></header>
          <div className={styles.experienceGrid}>
            {serviceExperiences.map((experience) => <article className={styles.experience} key={experience.id}>
              <Link className={styles.experiencePhoto} to={experience.href} aria-label={`Explore ${experience.label.toLowerCase()}`}><img src={experience.image} alt={experience.alt} width={experience.id === 'business' ? '1200' : '1800'} height={experience.id === 'complex' || experience.id === 'first' ? '2700' : experience.id === 'urgent' ? '1350' : '1200'} loading="lazy" decoding="async" /><span>{experience.label}<ArrowRight size={19} aria-hidden="true" /></span></Link>
              <div className={styles.experienceBody}><h3>{experience.title}</h3><p>{experience.summary}</p>
                <details className={styles.experienceDetails}><summary>What we consider <Plus size={17} aria-hidden="true" /></summary><div><p>{experience.detail}</p><ul>{experience.points.map((point) => <li key={point}>{point}</li>)}</ul><Link to={experience.href}>Read the {experience.label.toLowerCase()} guide <ArrowRight size={16} aria-hidden="true" /></Link></div></details>
                <Link className={styles.experienceAction} to="/#request-form" onClick={() => chooseExperience(experience)}>Plan this kind of trip <ArrowRight size={18} aria-hidden="true" /></Link>
              </div>
            </article>)}
          </div>
          <p className={styles.photoNote}>Cabin imagery is illustrative. The product on your flights is confirmed for your route and dates.</p>
        </div>
      </section>
      <section className={styles.planningBoundaries} aria-labelledby="boundaries-title"><div className={styles.inner}>
        <header><p className={styles.eyebrow}>Room to work</p><h2 id="boundaries-title">Keep the essentials fixed.<br />Give the rest some room.</h2></header>
        <dl><div><dt>What cannot move</dt><dd>{selected?.fixed || 'The commitments, destinations, and dates your trip must respect.'}</dd></div><div><dt>What could change</dt><dd>{selected?.flexible || 'The nearby dates, airports, or preferences you are open to exploring.'}</dd></div></dl>
        <p>Set your actual dates and flexibility in the trip brief. A starting point leaves those details in your hands.</p>
      </div></section>
      <div id="review-framework" className={styles.comparisonAnchor}><span id="comparison" className={styles.comparisonTarget} aria-hidden="true" /><ItineraryComparison compact={false} /></div>
      <section className={styles.reviewNotes} aria-labelledby="review-title"><div className={styles.inner}><h2 id="review-title">The complete trip, considered.</h2><div>{evaluationItems.map((item) => <details key={item.number}><summary>{item.title}<Plus size={16} aria-hidden="true" /></summary><p>{item.body}</p></details>)}</div></div></section>
      <nav className={styles.index} aria-labelledby="route-index-title"><div className={styles.inner}><p className={styles.eyebrow}>Explore the details</p><h2 id="route-index-title">Find your way in.</h2><div className={styles.indexColumns}>{routeIndex.map((group) => <div key={group.title}><h3>{group.title}</h3>{group.links.map(([title, href]) => <Link key={href} to={href}>{title}<ArrowRight size={17} aria-hidden="true" /></Link>)}</div>)}</div></div></nav>
      <section className={styles.faq} aria-labelledby="services-faq-title"><div className={`${styles.inner} ${styles.faqLayout}`}><div><p className={styles.eyebrow}>Before you begin</p><h2 id="services-faq-title">A few useful answers.</h2></div><div>{servicesFaqs.map((item) => <details key={item.question}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div></section>
      <section className={styles.final} aria-labelledby="services-final-title"><div className={styles.inner}><p className={styles.eyebrow}>Your next step</p><h2 id="services-final-title">Bring the journey<br />into focus.</h2><p>Share the route, dates, and priorities. Leave room for the details you still want to discuss.</p>{continueLink(styles.primary)}</div></section>
    </div>
  );
}
