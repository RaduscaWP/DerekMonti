import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import { imagery } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import { useLocale } from '../i18n/useLocale.js';
import styles from './About.module.scss';

const approach = [
  ['Begin with your plans', 'Your route, dates and reason for traveling form the brief. Tell Derek which commitments are fixed and where you have room to adjust.'],
  ['Compare the complete journey', 'The cabin, timing, connections and ticket conditions deserve attention together. A better seat alone does not make an itinerary fit.'],
  ['Talk through the tradeoffs', 'Discuss what changes when you choose another flight, nearby date or routing. Keep the practical consequences in view.'],
  ['Make an informed decision', 'Review the current quote and its written conditions before deciding. Availability and ticket details are confirmed separately.'],
];
const boundaries = [
  ['Personal guidance', 'Derek reviews the request and discusses the details directly with you.'],
  ['Commercial airline travel', 'The focus is business and first class itineraries on commercial airlines.'],
  ['A request, then a review', 'This website collects your trip brief. It does not display live inventory, take payment or reserve a seat.'],
];

export default function About() {
  const pageRef = useRef(null);
  const { t, localePath } = useLocale();
  const { markConversionSource } = useTripBrief();
  usePageMotion(pageRef);
  const chooseAbout = () => markConversionSource('services');
  return (
    <div className={styles.page} ref={pageRef}>
      <section className={styles.hero} aria-labelledby="about-title"><div className={styles.heroInner}>
        <div className={styles.heroTop} data-reveal><p className={styles.lightEyebrow}>{t('about.eyebrow', 'The person behind the planning')}</p><span>{t('about.identity', 'Personal flight advisor')}</span></div>
        <h1 id="about-title" className={styles.name} data-reveal data-reveal-y="22">Derek <span>Monti.</span></h1>
        <div className={styles.heroBody}>
          <div className={styles.heroCopy} data-reveal><p className={styles.personalLine}>{t('about.hero.title', 'Your trip deserves a personal conversation.')}</p><p>{t('about.hero.text', 'Share where you need to go, how you want to travel and what matters along the way. I help you consider the whole premium journey.')}</p><Button to={localePath('/#request-form')} onClick={chooseAbout}>{t('about.hero.action', 'Plan with Derek')}</Button><a className={styles.quietLink} href="#about-approach">{t('about.hero.link', 'The approach')} <ArrowRight size={16} aria-hidden="true" /></a></div>
          <figure className={styles.portrait} data-reveal data-reveal-y="18"><img src={imagery.derekPortrait} alt={t('about.portrait.alt', 'Derek Monti seated at a table in a navy blazer')} width="1122" height="1402" fetchpriority="high" decoding="async" /><figcaption><strong>Derek Monti</strong><span>{t('about.portrait.caption', 'Business & First Class')}</span></figcaption></figure>
        </div>
      </div></section>
      <section className={styles.introduction}><div className={`${styles.inner} ${styles.introGrid}`}>
        <div data-reveal><p className={styles.eyebrow}>{t('about.intro.eyebrow', 'A personal service')}</p><h2>{t('about.intro.title', 'The seat is part of a bigger picture.')}</h2></div>
        <div className={styles.introCopy} data-reveal><p className={styles.lead}>{t('about.intro.lead', 'Derek Monti helps travelers consider business and first class journeys as a whole.')}</p><p>{t('about.intro.body', 'Arrival time, connections, cabin on each segment and the conditions attached to a ticket can all change how a journey works. The conversation begins with your plans and the priorities behind them.')}</p><p>{t('about.intro.second', 'This service is personal: you share the brief with Derek, discuss the options and decide which tradeoffs suit you. There is no substitute for checking the details of your individual itinerary.')}</p><Link to={localePath('/services')}>{t('about.intro.action', 'Explore the services')} <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div></section>
      <section id="about-approach" className={styles.approach} aria-labelledby="about-approach-title"><div className={`${styles.inner} ${styles.approachGrid}`}>
        <header className={styles.approachHeading} data-reveal><p className={styles.lightEyebrow}>{t('about.approach.eyebrow', 'Attention, in practice')}</p><h2 id="about-approach-title">{t('about.approach.title', 'From your plans to a considered choice.')}</h2><p>{t('about.approach.text', 'A clear brief makes the conversation useful. Each stage adds the context you need to make a decision.')}</p><div className={styles.routeLine} aria-hidden="true"><span /><i /><span /><i /><span /></div></header>
        <ol className={styles.approachList}>{approach.map(([title, body], index) => <li key={title} data-reveal><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{t(`about.approach${index}.title`, title)}</h3><p>{t(`about.approach${index}.body`, body)}</p></div></li>)}</ol>
      </div></section>
      <section className={styles.boundaries} aria-labelledby="about-boundaries-title"><div className={styles.inner}>
        <header className={styles.boundaryHeading} data-reveal><p className={styles.eyebrow}>{t('about.boundaries.eyebrow', 'Clear expectations')}</p><h2 id="about-boundaries-title">{t('about.boundaries.title', 'What you can expect here.')}</h2></header>
        <dl className={styles.boundaryList}>{boundaries.map(([title, body], index) => <div key={title} data-reveal><dt><span>{String(index + 1).padStart(2, '0')}</span>{t(`about.boundary${index}.title`, title)}</dt><dd>{t(`about.boundary${index}.body`, body)}</dd></div>)}</dl>
      </div></section>
      <section className={styles.final} id="contact"><div className={`${styles.inner} ${styles.finalInner}`} data-reveal><p className={styles.lightEyebrow}>{t('about.final.eyebrow', 'Start the conversation')}</p><h2>{t('about.final.title', 'Where are you heading?')}</h2><p>{t('about.final.text', 'Send your route, dates and cabin preference, along with the details that matter most to you.')}</p><Button to={localePath('/#request-form')} onClick={chooseAbout}>{t('common.planTrip', 'Plan my trip')}</Button></div></section>
    </div>
  );
}
