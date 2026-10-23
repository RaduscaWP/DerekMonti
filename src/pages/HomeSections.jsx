import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Moon, BriefcaseBusiness, Users } from 'lucide-react';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import RouteCarousel from '../components/common/RouteCarousel.jsx';
import TripForm from '../components/homepage/TripForm.jsx';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { useLocale } from '../i18n/useLocale.js';
import { blogPosts, contactConfig, routeDeals } from '../data/siteData.js';
import { articleVisuals } from '../data/editorialData.js';
import '../styles/home-editorial.scss';
import '../styles/priority-review.scss';

const priorities = [
  { value: 'rested', icon: Moon, title: 'Rested on arrival', reviewTitle: 'Protect the overnight rest.', condition: 'If the overnight leg is your main chance to rest', tradeoffs: [['A shorter journey', 'Less time in transit can leave a tighter connection after the overnight flight.'], ['More time between flights', 'A longer connection can reduce rushing, but extends the travel day.']], takeaway: 'Read the cabin on every leg alongside the connection time and your plans after landing.' },
  { value: 'work', icon: BriefcaseBusiness, title: 'Ready for what follows', reviewTitle: 'Work back from your arrival.', condition: 'If your first commitment is soon after landing', tradeoffs: [['An earlier arrival', 'More time before your plans can come at the cost of a shorter overnight rest.'], ['A longer connection', 'More time to transfer can make the connection easier, but leaves less time at your destination.']], takeaway: 'Compare the local arrival time, the onward transfer and the time you need before your first commitment.' },
  { value: 'together', icon: Users, title: 'A journey shared', reviewTitle: 'Keep the group in view.', condition: 'If staying together matters on each flight', tradeoffs: [['Fewer connections', 'A simpler route means fewer group transfers; the seats still need a separate review.'], ['A different routing', 'Another route can change the cabins offered and may add transitions for everyone in the group.']], takeaway: 'Discuss seats on each leg and the time your group needs to connect. Adjacent seating must be checked separately.' },
];
function PriorityReview({ busy }) {
  const { trip, setTrip } = useTripBrief();
  const { t } = useLocale();
  const [selected, setSelected] = useState(trip.comfort || 'rested');
  const active = priorities.find(({ value }) => value === selected) || priorities[0];
  const applied = trip.comfort === selected;
  return <section id="comfort" className="priority-review priority-review--document chapter" aria-labelledby="priority-title"><div className="section-wrap">
    <div className="chapter-heading" data-reveal><p className="eyebrow">01 / {t('home.priority.label', 'The arrival matters')}</p><h2 id="priority-title">{t('home.priority.title', 'How do you want to arrive?')}</h2><p>{t('home.priority.intro', 'Start with what matters to you. Derek can weigh the route around it.')}</p></div>
    <div className="priority-layout"><div className="priority-controls" data-reveal>
      <fieldset aria-describedby="priority-preview-note"><legend className="sr-only">{t('home.priority.choose', 'Preview a travel priority')}</legend>{priorities.map(({ value, icon: Icon, title }, index) => <label key={value} className={selected === value ? 'is-selected' : ''}><input type="radio" name="priority-preview" value={value} checked={selected === value} onChange={() => setSelected(value)} aria-controls="priority-review-document" /><span className="priority-number">0{index + 1}</span><span>{t('home.priority.' + value + '.title', title)}</span><Icon size={21} strokeWidth={1.4} aria-hidden="true" /></label>)}</fieldset>
      <p id="priority-preview-note" className="priority-preview-note">{t('priorityReview.disclosure', 'Illustrative planning notes. No flights, fares or availability are being offered here.')}</p>
      <button type="button" disabled={busy || applied} className="button button--primary" onClick={() => setTrip(current => ({ ...current, comfort: selected }))}>{applied ? <><Check size={17} aria-hidden="true" />{t('home.priority.applied', 'Added to your brief')}</> : <>{t('home.priority.apply', 'Add this priority')}<ArrowRight size={18} aria-hidden="true" /></>}</button>
      <p className="priority-status" role="status">{applied ? t('home.priority.saved', 'You can change it in the request below.') : t('home.priority.preview', 'Preview only. Your request changes when you add this priority.')}</p>
    </div><article id="priority-review-document" className="priority-document" aria-labelledby="priority-document-title" data-reveal data-reveal-y="20">
      <div className="priority-document-masthead"><span>{t('priorityReview.document', 'An illustrative review')}</span><span>0{priorities.indexOf(active) + 1} / 03</span></div>
      <div className="priority-document-opening"><div><p className="priority-document-condition">{t('priorityReview.' + active.value + '.condition', active.condition)}</p><h3 id="priority-document-title">{t('priorityReview.' + active.value + '.title', active.reviewTitle)}</h3></div><figure className="priority-document-illustration"><img src={'/images/homepage/comfort-' + active.value + '.webp'} alt="" loading="lazy" decoding="async" width="1024" height="1024" /><figcaption>{t('home.priority.illustration', 'Cabin illustration')}</figcaption></figure></div>
      <p className="priority-document-label">{t('priorityReview.compare', 'The tradeoff to discuss')}</p>
      <dl className="priority-document-tradeoffs">{active.tradeoffs.map(([title, body], index) => <div key={index}><dt>{t('priorityReview.' + active.value + '.option' + index, title)}</dt><dd>{t('priorityReview.' + active.value + '.tradeoff' + index, body)}</dd></div>)}</dl>
      <div className="priority-document-takeaway"><ArrowUpRight size={19} aria-hidden="true" /><p>{t('priorityReview.' + active.value + '.takeaway', active.takeaway)}</p></div>
    </article></div>
  </div></section>;
}
function JourneyRoutes() {
  const { t, localePath } = useLocale();
  return <section className="journey-routes chapter" aria-labelledby="routes-title"><div className="section-wrap">
    <div className="chapter-heading chapter-heading--split" data-reveal><div><p className="eyebrow">02 / {t('home.routes.label', 'A world of possibilities')}</p><h2 id="routes-title">{t('home.routes.title', 'Your next chapter. Anywhere.')}</h2></div><div><p>{t('home.routes.intro', 'Business Class, First Class or several cities in one trip. Start with your route; compare the details before deciding.')}</p><Link className="text-link text-link--light" to={localePath('/services')}>{t('home.routes.services', 'Explore the services')}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
    <div className="legacy-experience" data-legacy><RouteCarousel deals={routeDeals} /></div>
    <p className="route-disclaimer">{t('home.routes.note', 'These are illustrative fare comparisons, not bookable offers or a record of client savings. Your dates, cabin, availability and airline rules determine the actual quote.')}</p>
  </div></section>;
}
function MeetDerek() {
  const { t, localePath } = useLocale();
  const rows = [['The route', 'Departure, arrival and the time in between.'], ['The cabin', 'The aircraft and cabin on every important segment.'], ['The conditions', 'Changes, cancellation, baggage and ticketing deadlines.']];
  return <section className="derek-chapter chapter" id="meet-derek" aria-labelledby="derek-title"><div className="section-wrap derek-layout">
    <figure className="derek-portrait" data-reveal><img src="/images/homepage/derek-monti.jpg" alt={t('home.derek.alt', 'Derek Monti, your personal flight advisor')} width="1122" height="1402" loading="lazy" decoding="async" /><figcaption><span>Derek Monti</span><small>{t('home.derek.caption', 'The person behind your journey')}</small></figcaption></figure>
    <div className="derek-copy"><p className="eyebrow" data-reveal>03 / {t('home.derek.label', 'Meet Derek')}</p><h2 id="derek-title" data-reveal>{t('home.derek.title', 'One person. Your whole journey.')}</h2><p className="derek-intro" data-reveal>{t('home.derek.intro', 'A premium seat is only part of a good itinerary. Tell me what the trip needs to do for you. We can look at the details together.')}</p><div className="derek-review" data-reveal>{rows.map(([title, body], index) => <div key={title}><span>0{index + 1}</span><div><h3>{t('home.derek.row' + index + '.title', title)}</h3><p>{t('home.derek.row' + index + '.body', body)}</p></div></div>)}</div><Link className="text-link" to={localePath('/about')} data-reveal>{t('home.derek.more', 'More about Derek')}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </div></section>;
}
function RequestSection({ onBusyChange }) {
  const { trip, setTrip, step, setStep } = useTripBrief();
  const { t } = useLocale();
  return <section id="request-form" className="request-section chapter" aria-labelledby="trip-section-title"><div className="section-wrap">
    <div className="request-heading chapter-heading chapter-heading--split"><div><p className="eyebrow">04 / {t('home.request.label', 'Your next departure')}</p><h2 id="trip-section-title" tabIndex="-1">{t('home.request.title', 'Where shall we go?')}</h2></div><p>{t('home.request.intro', 'Share your route, dates and preferences. Derek reviews the brief; you decide whether to proceed with an option.')}</p></div>
    <TripForm trip={trip} setTrip={setTrip} step={step} setStep={setStep} onBusyChange={onBusyChange} />
    <p className="request-contact">{t('home.request.prefer', 'Prefer a conversation?')} <a href={'https://wa.me/' + contactConfig.whatsappNumber} target="_blank" rel="noreferrer">{t('home.request.whatsapp', 'Talk to Derek on WhatsApp')}<ArrowUpRight size={15} aria-hidden="true" /></a> <a href={'mailto:' + contactConfig.email}>{t('home.request.email', 'Email Derek')}<ArrowUpRight size={15} aria-hidden="true" /></a></p>
  </div></section>;
}
function Questions() {
  const { t } = useLocale();
  const faqs = [
    ['Is this a booking engine?', 'No. The request starts a conversation with Derek. You review the proposed itinerary, fare and conditions before deciding to book.'],
    ['What should I include in the request?', 'Route, dates, cabin and traveler count are the starting point. Add any fixed arrival time, seating needs or flexibility that could affect the trip.'],
    ['Can I describe a trip with several cities?', 'Yes. Choose Multi-city in the request and add each flight. You can explain open-jaw or mixed-cabin preferences in the notes.'],
    ['Are the card prices available to book?', 'The cards show illustrative comparisons. They do not represent live inventory or guaranteed savings. An actual quote depends on your specific itinerary and airline rules.'],
    ['What if my plans change?', 'The options you receive should be reviewed for change, cancellation and baggage conditions. Ask Derek about the relevant rules before committing to a ticket.'],
  ].map(([question, answer], index) => ({ question: t('home.faq.' + index + '.q', question), answer: t('home.faq.' + index + '.a', answer) }));
  return <section className="questions-chapter chapter" aria-labelledby="questions-title"><div className="section-wrap questions-layout"><div data-reveal><p className="eyebrow">05 / {t('home.faq.label', 'Before you begin')}</p><h2 id="questions-title">{t('home.faq.title', 'A few good questions.')}</h2><p>{t('home.faq.intro', 'The useful details, before you send your brief.')}</p></div><FaqAccordion items={faqs} /></div></section>;
}
function Journal() {
  const { t, locale } = useLocale();
  return <section className="journal-chapter chapter" aria-labelledby="journal-title"><div className="section-wrap">
    <div className="chapter-heading chapter-heading--split" data-reveal><div><p className="eyebrow">06 / {t('home.journal.label', 'The journal')}</p><h2 id="journal-title">{t('home.journal.title', 'Read before you depart.')}</h2></div><Link className="text-link" to="/blog">{t('home.journal.all', 'All travel guides')}{locale !== 'en' && <small lang="en">English</small>}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    <div className="journal-preview">{blogPosts.slice(0, 3).map((post, index) => { const visual = articleVisuals[post.slug] || articleVisuals['why-travelers-overpay-business-class']; return <Link key={post.slug} to={'/blog/' + post.slug} className="journal-story" data-reveal><figure><img src={visual.image} alt="" width="1200" height="800" loading="lazy" decoding="async" /></figure><div className="journal-story-copy"><span>0{index + 1} / {t('home.journal.guide', 'English guide')}</span><h3 lang="en">{post.title}</h3><span className="journal-read">{t('home.journal.read', 'Read the guide')}<ArrowUpRight size={18} aria-hidden="true" /></span></div></Link>; })}</div>
  </div></section>;
}
export default function HomeSections({ onBusyChange, busy = false }) {
  const scope = useRef(null);
  usePageMotion(scope);
  return <div className="editorial-home" ref={scope}><PriorityReview busy={busy} /><JourneyRoutes /><MeetDerek /><RequestSection onBusyChange={onBusyChange} /><Questions /><Journal /></div>;
}

