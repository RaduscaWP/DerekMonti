import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics.js';
import styles from './ItineraryComparison.module.scss';

const lenses = [
  { label: 'A direct journey', title: 'Look beyond the absence of a connection.', route: ['Departure', 'Arrival'], checks: [
    ['Timing', 'Does the arrival work with your first commitment?'],
    ['Cabin', 'Which seat and cabin are scheduled on this flight?'],
    ['Conditions', 'What changes or cancellations does the fare permit?'],
  ] },
  { label: 'A connecting journey', title: 'Consider the space between flights.', route: ['Departure', 'Connection', 'Arrival'], checks: [
    ['Connection', 'How much time is there, and is an airport change involved?'],
    ['Every segment', 'Does the requested cabin continue across both flights?'],
    ['Whole travel day', 'How do the extra hours affect the reason for your trip?'],
  ] },
  { label: 'Several destinations', title: 'Make the individual flights work together.', route: ['First city', 'Next city', 'Return city'], checks: [
    ['Trip structure', 'Which cities and dates are fixed, and which can move?'],
    ['Continuity', 'Are the flights on one ticket or separate arrangements?'],
    ['Flexibility', 'How would a change to one flight affect the rest?'],
  ] },
];

export default function ItineraryComparison({ compact = false }) {
  const [active, setActive] = useState(0);
  const lens = lenses[active];
  const id = compact ? 'home-comparison-title' : 'services-comparison-title';
  return <section className={styles.section} aria-labelledby={id}>
    <div className={styles.inner}>
      <header className={styles.header} data-reveal>
        <div><p className={styles.eyebrow}>What Derek evaluates</p><h2 id={id}>The seat is one part.<br />The journey is the whole.</h2></div>
        <p>A useful comparison considers the schedule, cabin, routing, fare conditions, flexibility and the fit of the whole trip.</p>
      </header>
      <div className={styles.workspace}>
        <div className={styles.controls} role="group" aria-label="Explore itinerary considerations">{lenses.map(({ label }, index) => <button key={label} type="button" aria-pressed={active === index} aria-controls={`${id}-lens`} onClick={() => { setActive(index); trackEvent('comparison_view'); }}>{label}<ArrowUpRight size={17} aria-hidden="true" /></button>)}</div>
        <div className={styles.lens} id={`${id}-lens`}>
          <div className={styles.overview}>
            <p className={styles.caption}>A planning framework</p><h3>{lens.title}</h3>
            <ol className={styles.route} aria-label={lens.label}>{lens.route.map((stop, i) => <li key={stop}><span aria-hidden="true" /><p>{stop}</p>{i < lens.route.length - 1 && <ArrowRight aria-hidden="true" size={18} />}</li>)}</ol>
            <p className={styles.note}>Questions for your review. This is not a fare quote or a flight schedule.</p>
          </div>
          <dl className={styles.checks}>{lens.checks.map(([title, detail]) => <div key={title}><dt><Check size={17} aria-hidden="true" />{title}</dt><dd>{detail}</dd></div>)}</dl>
        </div>
      </div>
      <div className={styles.bottom}><p>Which option fits the trip you need to take?</p><Link to={compact ? '/services#comparison' : '/#request-form'}>{compact ? 'Explore the itinerary desk' : 'Bring your trip to Derek'}<ArrowRight size={18} aria-hidden="true" /></Link></div>
      {!compact && <p className={styles.extended}>Actual options depend on your dates and availability. Before you decide, ask about the scheduled cabin on every segment, the total journey time, baggage and ticket conditions. Any price difference is meaningful only when the itineraries and conditions being compared are clear.</p>}
    </div>
  </section>;
}
