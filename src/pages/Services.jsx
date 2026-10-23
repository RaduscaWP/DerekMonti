import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Clock3, Crown, Rotate3D } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import RouteCarousel from '../components/common/RouteCarousel.jsx';
import { imagery, serviceDeals, servicesFaqs } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { useMotionPreference } from '../context/MotionPreferenceProvider.jsx';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import { changeTripType } from '../components/homepage/tripState.js';
import { useLocale } from '../i18n/useLocale.js';
import styles from './Services.module.scss';

const serviceDossiers = [
  { id: 'business', icon: BriefcaseBusiness, title: 'Business Class', label: 'The long-haul journey', summary: 'Consider the seat, the schedule and the arrival as one journey.', focus: ['Cabin on every segment', 'Departure and arrival timing', 'Connections and ticket conditions'], intent: 'single_destination', cabin: 'business', path: '/business-class-flights' },
  { id: 'first', icon: Crown, title: 'First Class', label: 'The product matters', summary: 'Look closely at the actual first class cabin and the complete itinerary.', focus: ['The cabin and aircraft offered', 'First class across the itinerary', 'Included services and fare conditions'], intent: 'single_destination', cabin: 'first', path: '/first-class-flights' },
  { id: 'complex', icon: Rotate3D, title: 'Complex Itineraries', label: 'Every stop, connected', summary: 'Bring multiple cities, open-jaw routes and mixed cabins into one brief.', focus: ['The stops and dates that are fixed', 'The order and time between cities', 'Cabin and conditions on each leg'], intent: 'complex_itinerary', path: '/services/complex-itineraries' },
  { id: 'urgent', icon: Clock3, title: 'Time-Sensitive Travel', label: 'Start with your time limits', summary: 'Set out the departure and arrival constraints before discussing options.', focus: ['Earliest workable departure', 'Latest acceptable arrival', 'Alternative airports and routing'], intent: 'time_sensitive', cabin: 'business', path: '/services/last-minute-business-class' },
];

function ServiceCard({ service, index, onChoose }) {
  const [flipped, setFlipped] = useState(false);
  const detailsId = useId();
  const { t, localePath, locale } = useLocale();
  const title = t(`services.${service.id}.title`, service.title);
  const Icon = service.icon;
  return (
    <article className={`${styles.dossier} ${flipped ? styles.flipped : ''}`} data-reveal>
      <button className={styles.dossierToggle} type="button" aria-expanded={flipped} aria-controls={detailsId} aria-label={`${t(flipped ? 'services.card.hide' : 'services.card.show', flipped ? 'Hide details' : 'Show details')}: ${title}`} onClick={() => setFlipped((value) => !value)}>
        <span>{t(flipped ? 'services.card.hide' : 'services.card.show', flipped ? 'Hide details' : 'Show details')}</span><Rotate3D size={18} aria-hidden="true" />
      </button>
      <div className={styles.dossierRotation}>
        <div className={`${styles.face} ${styles.front}`} aria-hidden={flipped}>
          <div className={styles.dossierTop}><span>{String(index + 1).padStart(2, '0')}</span><span>{t(`services.${service.id}.label`, service.label)}</span><Icon size={23} aria-hidden="true" /></div>
          <div className={styles.dossierCopy}><h3>{title}</h3><p>{t(`services.${service.id}.summary`, service.summary)}</p></div>
          <span className={styles.frontNote}>{t('services.card.note', 'A personal review of your trip.')}</span>
        </div>
        <div className={`${styles.face} ${styles.back}`} id={detailsId} aria-hidden={!flipped}>
          <p className={styles.dossierBackLabel}>{t('services.card.review', 'What Derek reviews')}</p>
          <h3>{title}</h3>
          <ul>{service.focus.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span>{t(`services.${service.id}.focus${itemIndex}`, item)}</li>)}</ul>
          <Link to={localePath('/#request-form')} tabIndex={flipped ? 0 : -1} onClick={() => onChoose(service)}>{t('services.card.start', 'Start this request')} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link className={styles.guideLink} to={localePath(service.path)} tabIndex={flipped ? 0 : -1}>{t('services.card.guide', 'Read the planning guide')}{locale !== 'en' ? ' (English)' : ''} <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const pageRef = useRef(null);
  const { reduced } = useMotionPreference();
  const { t, localePath } = useLocale();
  const { setTrip, selectServiceIntent, markConversionSource } = useTripBrief();
  usePageMotion(pageRef);
  const chooseService = (service) => {
    selectServiceIntent(service.intent);
    if (service.cabin) setTrip((value) => ({ ...value, cabin: service.cabin }));
    if (service.intent === 'complex_itinerary') setTrip((value) => changeTripType(value, 'multi_city'));
    markConversionSource('services');
  };
  const reviewFactors = [
    ['The cabin', 'The seat and cabin on each flight, including any shorter connecting segment.'],
    ['The travel day', 'Departure, arrival and connection times in the context of your plans.'],
    ['The routing', 'Stops, airport changes and the practical complexity of getting there.'],
    ['The conditions', 'What the quoted ticket allows, and what changes or cancellations could mean.'],
  ];
  const faqItems = servicesFaqs.map((item, index) => ({ ...item, question: t(`services.faq${index}.q`, item.question), answer: t(`services.faq${index}.a`, item.answer) }));
  return (
    <div className={styles.page} data-motion={reduced ? 'reduced' : 'full'} ref={pageRef}>
      <section className={styles.hero} aria-labelledby="services-title">
        <img className={styles.heroImage} src={imagery.servicesHero} alt="" aria-hidden="true" width="1800" height="1200" fetchpriority="high" decoding="async" data-parallax="0.08" />
        <div className={styles.heroShade} />
        <div className={styles.inner}>
          <div className={styles.heroTop} data-reveal><p className={styles.lightEyebrow}>{t('services.eyebrow', 'Derek Monti · Services')}</p><span>01—04</span></div>
          <div className={styles.heroCopy} data-reveal data-reveal-y="26"><h1 id="services-title">{t('services.hero.title', 'One trip.')}<br /><span>{t('services.hero.second', 'Considered in full.')}</span></h1><p>{t('services.hero.text', 'Business and first class, multiple cities or a narrow travel window. Start with what your journey needs.')}</p><Button href="#services-grid">{t('services.hero.action', 'Explore the services')}</Button></div>
          <p className={styles.heroBoundary}>{t('services.hero.boundary', 'Personal flight guidance. Fares and availability are confirmed separately.')}</p>
        </div>
      </section>
      <section className={styles.services} id="services-grid" aria-labelledby="service-dossiers-title">
        <div className={styles.inner}>
          <header className={styles.sectionHeading} data-reveal><div><p className={styles.eyebrow}>{t('services.dossiers.eyebrow', 'Four ways to begin')}</p><h2 id="service-dossiers-title">{t('services.dossiers.title', 'What are you planning?')}</h2></div><p>{t('services.dossiers.text', 'Open a service to see the details Derek considers. Your request stays personal to your route and priorities.')}</p></header>
          <div className={styles.dossiers}>{serviceDossiers.map((service, index) => <ServiceCard key={service.id} service={service} index={index} onChoose={chooseService} />)}</div>
        </div>
      </section>
      <section className={styles.review} id="review-framework" aria-labelledby="review-framework-title"><div className={`${styles.inner} ${styles.reviewGrid}`}>
        <div className={styles.reviewHeading} data-reveal><p className={styles.eyebrow}>{t('services.review.eyebrow', 'Beyond the seat')}</p><h2 id="review-framework-title">{t('services.review.title', 'The fare is one part of the decision.')}</h2><p>{t('services.review.text', 'A useful comparison brings the whole itinerary into view. These are the details worth discussing before you choose.')}</p><Link to={localePath('/#request-form')} onClick={() => markConversionSource('services')}>{t('services.review.action', 'Share your priorities')} <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <ol className={styles.reviewList}>{reviewFactors.map(([title, body], index) => <li key={title} data-reveal><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{t(`services.review${index}.title`, title)}</h3><p>{t(`services.review${index}.body`, body)}</p></div></li>)}</ol>
      </div></section>
      <section className={styles.fares} aria-labelledby="services-fares-title"><div className={styles.inner}><header className={styles.sectionHeading} data-reveal><div><p className={styles.lightEyebrow}>{t('services.fares.eyebrow', 'Illustrative comparisons')}</p><h2 id="services-fares-title">{t('services.fares.title', 'Look at the whole journey.')}</h2></div><p>{t('services.fares.text', 'These fare scenarios explain a comparison. They are not live prices, available seats or verified booking results.')}</p></header><RouteCarousel deals={serviceDeals} /><p className={styles.fareNote}>{t('services.fares.note', 'Your dates, routing and ticket conditions determine the options discussed for your own request.')}</p></div></section>
      <section className={styles.faq} aria-labelledby="services-faq-title"><div className={`${styles.inner} ${styles.faqGrid}`}><div data-reveal><p className={styles.eyebrow}>{t('services.faq.eyebrow', 'Before you begin')}</p><h2 id="services-faq-title">{t('services.faq.title', 'A few useful answers.')}</h2><p>{t('services.faq.text', 'A request begins a conversation. It does not create a booking or reserve a fare.')}</p></div><FaqAccordion items={faqItems} /></div></section>
      <section className={styles.final} id="contact"><div className={`${styles.inner} ${styles.finalGrid}`} data-reveal><div><p className={styles.lightEyebrow}>{t('services.final.eyebrow', 'Your journey next')}</p><h2>{t('services.final.title', 'Bring Derek into the planning.')}</h2><p>{t('services.final.text', 'Share the route, dates and the details that matter to you.')}</p></div><Button to={localePath('/#request-form')} onClick={() => markConversionSource('services')}>{t('common.planTrip', 'Plan my trip')}</Button></div></section>
    </div>
  );
}
