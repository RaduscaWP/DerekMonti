import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { imagery } from '../data/siteData.js';
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

      <section className={styles.letter} aria-labelledby="opening-title">
        <div className={styles.letterInner}>
          <aside data-reveal><p className={styles.eyebrow}>A note from Derek</p><p className={styles.letterSide}>A good journey<br />starts with<br />your priorities.</p><Link to="/services">Visit the itinerary desk <ArrowRight size={17} aria-hidden="true" /></Link></aside>
          <div className={styles.letterCopy} data-reveal>
            <h2 id="opening-title">Tell me what this<br />trip needs to do.</h2>
            <p className={styles.letterLead}>The arrival matters as much as the flight.</p>
            <p>A morning meeting, time with family, or a few days away each asks something different of a journey. Start there. Tell me what cannot move and where you have room to explore.</p>
            <p>I look at the cabin together with the departure, the connection, the arrival, and the ticket conditions. A beautiful seat is only useful when the trip around it works for you.</p>
            <p>My role is to put those differences into a clear conversation, so you can decide with the whole picture in view.</p>
            <div className={styles.signature}><strong>Derek Monti</strong><span>Personal flight advisor</span></div>
          </div>
        </div>
      </section>

      <section className={styles.perspective} aria-labelledby="method-title">
        <figure className={styles.perspectivePhoto} data-reveal><img src="/images/homepage/comfort-together.webp" alt="Illustrative neighboring premium seats beside an aircraft window" width="1200" height="1200" loading="lazy" decoding="async" /><figcaption><span className={styles.eyebrow}>Beyond the seat</span><h2 id="method-title">A little attention<br />changes the whole journey.</h2><p>Comfort in the cabin. Clarity about everything around it.</p></figcaption></figure>
        <div className={styles.perspectiveNotes}><p><strong>The arrival</strong>A useful time to land, with the day ahead in mind.</p><p><strong>The connection</strong>The airport, the time between flights, and the energy it takes.</p><p><strong>The conditions</strong>What changes or cancellations would mean for the specific ticket.</p></div>
        <p className={styles.imageCaption}>Cabin image for atmosphere. Your actual product is confirmed for the individual itinerary.</p>
      </section>

      <section className={styles.relationship} aria-labelledby="conversation-title"><div className={styles.inner}>
        <header data-reveal><p className={styles.eyebrow}>The working relationship</p><h2 id="conversation-title">One person to<br />bring the details to.</h2><p>Your priorities stay in the same conversation. The brief can be precise where it needs to be, and open where you still want advice.</p></header>
        <div className={styles.relationshipDetails}>{conversationDetails.map((item) => <details key={item.title}><summary>{item.title}<ArrowRight size={17} aria-hidden="true" /></summary><p>{item.body}</p></details>)}<Link to="/services#review-framework">See how an itinerary is compared <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div></section>

      <section className={styles.personalProcess} aria-labelledby="decision-title"><div className={styles.inner}>
        <header><p className={styles.eyebrow}>From a first conversation</p><h2 id="decision-title">A clear way forward.</h2></header>
        <ol>{decisionSteps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
      </div></section>

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
