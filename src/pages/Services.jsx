import { ArrowDown, ArrowRight, Check, Plus } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../context/MotionPreferenceProvider.jsx';
import { evaluationItems, servicesFaqs } from '../data/siteData.js';
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
  const { trip, selectServiceIntent, markConversionSource } = useTripBrief();
  const { reduced, motionReady } = useMotionPreference();
  const selected = situations.find(({ value }) => value === trip.serviceIntent);
  const markServices = () => markConversionSource('services');
  const clearSelection = () => {
    selectServiceIntent(null);
    window.requestAnimationFrame(() => firstChoice.current?.focus());
  };
  const continueLink = (className) => <Link className={className} to="/#request-form" onClick={markServices}>Continue my trip brief <ArrowRight size={18} aria-hidden="true" /></Link>;

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
      <section className={styles.boundaries} aria-labelledby="boundaries-title"><div className={`${styles.inner} ${styles.boundaryLayout}`}>
        <div><p className={styles.eyebrow}>Room to work</p><h2 id="boundaries-title">What is fixed.<br />What can move.</h2><p>A useful brief makes the difference clear.</p></div>
        <dl className={styles.boundaryDetails}><div><dt><span aria-hidden="true">01</span> Fixed</dt><dd>{selected?.fixed || 'The commitments, destinations, and dates your trip must respect.'}</dd></div><div><dt><span aria-hidden="true">02</span> Flexible</dt><dd>{selected?.flexible || 'The nearby dates, airports, or preferences you are open to exploring.'}</dd></div></dl>
        <p className={styles.boundaryNote}>Set your actual dates and flexibility in the trip brief. Choosing a starting point does not change them.</p>
      </div></section>
      <section className={styles.review} id="review-framework" aria-labelledby="review-title"><div className={styles.inner}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>How Derek reviews</p><h2 id="review-title">Six lenses.<br />One complete trip.</h2></div><p>A premium seat is one part of the decision. The rest of the journey deserves the same attention.</p></div>
        <div className={styles.reviewList}>{evaluationItems.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      </div></section>
      <nav className={styles.index} aria-labelledby="route-index-title"><div className={styles.inner}><p className={styles.eyebrow}>Explore the details</p><h2 id="route-index-title">Find your way in.</h2><div className={styles.indexColumns}>{routeIndex.map((group) => <div key={group.title}><h3>{group.title}</h3>{group.links.map(([title, href]) => <Link key={href} to={href}>{title}<ArrowRight size={17} aria-hidden="true" /></Link>)}</div>)}</div></div></nav>
      <section className={styles.faq} aria-labelledby="services-faq-title"><div className={`${styles.inner} ${styles.faqLayout}`}><div><p className={styles.eyebrow}>Before you begin</p><h2 id="services-faq-title">A few useful answers.</h2></div><div>{servicesFaqs.map((item) => <details key={item.question}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div></section>
      <section className={styles.final} aria-labelledby="services-final-title"><div className={styles.inner}><p className={styles.eyebrow}>Your next step</p><h2 id="services-final-title">Bring the journey<br />into focus.</h2><p>Share the route, dates, and priorities. Leave room for the details you still want to discuss.</p>{continueLink(styles.primary)}</div></section>
    </div>
  );
}
