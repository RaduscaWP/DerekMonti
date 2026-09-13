import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { evaluationItems, imagery } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { getWhatsappUrl } from '../utils/message.js';
import styles from './About.module.scss';

const conversationDetails = [
  {
    title: 'The reason for the trip',
    body: 'A client meeting, a family journey, or a long-awaited escape changes what a good itinerary needs to do.',
  },
  {
    title: 'What cannot move',
    body: 'Essential dates, arrival times, airports, and commitments set the boundaries for a useful review.',
  },
  {
    title: 'Where comfort matters',
    body: 'The longest segment, an overnight flight, or the need to arrive ready can carry more weight than a cabin label.',
  },
  {
    title: 'What needs explaining',
    body: 'Connections, mixed cabins, and fare conditions should be understood before an option becomes a decision.',
  },
];

const decisionSteps = [
  {
    number: '01',
    title: 'You share',
    body: 'The route, dates, cabin preference, flexibility, and the details that matter to your journey.',
  },
  {
    number: '02',
    title: 'Derek reviews',
    body: 'The itinerary as a whole, with the practical differences placed beside the premium experience.',
  },
  {
    number: '03',
    title: 'You decide',
    body: 'A request starts a conversation. Nothing is reserved or committed before you review a real option.',
  },
];

export default function About() {
  const pageRef = useRef(null);
  const whatsapp = getWhatsappUrl({ requestTitle: 'Premium flight conversation' });

  usePageMotion(pageRef);

  return (
    <div className={styles.page} ref={pageRef}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy} data-reveal data-reveal-y="20">
            <p className={styles.eyebrow}>About <span aria-hidden="true">/</span> Derek Monti</p>
            <h1 id="about-title">One journey.<br />One person<br /><span>listening.</span></h1>
            <p className={styles.heroText}>
              Derek brings the route, cabin, timing, flexibility, and ticket conditions into one clear conversation.
            </p>
            <Link className={styles.primaryLink} to="/#request-form">
              Share your trip <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <figure className={styles.portrait} data-reveal data-reveal-y="28">
            <span className={styles.monogram} aria-hidden="true">DM</span>
            <img
              src={imagery.derekPortrait}
              alt="Derek Monti"
              width="1122"
              height="1402"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
            <figcaption>
              <strong>Derek Monti</strong>
              <span>Personal flight advisor</span>
            </figcaption>
          </figure>
        </div>

        <ol className={styles.heroPrinciples} aria-label="Derek's service approach">
          <li><span>01</span> Listen before searching</li>
          <li><span>02</span> Review the complete itinerary</li>
          <li><span>03</span> Explain the real tradeoffs</li>
        </ol>
      </section>

      <section className={styles.opening} aria-labelledby="opening-title">
        <div className={styles.inner}>
          <div className={styles.openingHeading} data-reveal>
            <p className={styles.eyebrow}>The point of view</p>
            <h2 id="opening-title">The work begins<br />with listening.</h2>
          </div>
          <div className={styles.openingCopy} data-reveal>
            <p className={styles.lead}>Premium travel is full of details that look small until they change the whole trip.</p>
            <p>
              A seat can be excellent while the itinerary around it is wrong. An awkward departure, a long connection,
              or restrictive conditions can matter more than the name on the cabin.
            </p>
            <p>
              Fly with Derek gives those details one place to live. You explain the journey you need to take; Derek
              personally reviews how the pieces fit together and makes the differences easier to understand.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.conversation} aria-labelledby="conversation-title">
        <div className={styles.inner}>
          <header className={styles.sectionHeading} data-reveal>
            <div>
              <p className={styles.eyebrow}>The working relationship</p>
              <h2 id="conversation-title">What stays in the<br />same conversation.</h2>
            </div>
            <p>Your priorities remain visible from the first brief to the final comparison.</p>
          </header>

          <ol className={styles.conversationList}>
            {conversationDetails.map((item, index) => (
              <li key={item.title} data-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.method} aria-labelledby="method-title">
        <div className={styles.inner}>
          <div className={styles.methodHeading} data-reveal>
            <p className={styles.eyebrow}>Derek's review</p>
            <h2 id="method-title">Six lenses.<br /><span>One complete trip.</span></h2>
            <p>A premium seat is one part of the decision. The journey around it deserves the same attention.</p>
            <div className={styles.reviewPath} aria-label="Review sequence">
              <span>Your brief</span><ArrowRight size={16} aria-hidden="true" />
              <span>Derek's review</span><ArrowRight size={16} aria-hidden="true" />
              <span>Your decision</span>
            </div>
          </div>

          <ol className={styles.methodList}>
            {evaluationItems.map((item) => (
              <li key={item.number} data-reveal>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.decision} aria-labelledby="decision-title">
        <div className={styles.inner}>
          <header data-reveal>
            <p className={styles.eyebrow}>Clear boundaries</p>
            <h2 id="decision-title">You remain<br />in control.</h2>
          </header>
          <ol className={styles.decisionList}>
            {decisionSteps.map((step) => (
              <li key={step.number} data-reveal>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.final} aria-labelledby="about-final-title">
        <div className={styles.inner} data-reveal>
          <div>
            <p className={styles.eyebrow}>Start with a conversation</p>
            <h2 id="about-final-title">Bring Derek the trip<br />you actually need to take.</h2>
          </div>
          <div className={styles.finalActions}>
            <Link to="/#request-form">Plan my trip <ArrowRight size={19} aria-hidden="true" /></Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              Talk to Derek on WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
