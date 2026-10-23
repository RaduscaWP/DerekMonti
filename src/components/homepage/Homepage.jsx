import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeSections from '../../pages/HomeSections.jsx';
import { useTripBrief } from '../../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../i18n/useLocale.js';
import './homepage-base.scss';
import './homepage.scss';
gsap.registerPlugin(ScrollTrigger);

export default function Homepage() {
  const { t, localePath } = useLocale();
  const { trip, setTrip, setStep, markConversionSource } = useTripBrief();
  const navigate = useNavigate();
  const [tripBusy, setTripBusy] = useState(false);
  const { reduced, motionReady } = useMotionPreference();
  const page = useRef(null), heroFrom = useRef(null);
  const heroRoute = trip.tripType === 'multi_city' ? trip.legs[0] : trip;
  useEffect(() => {
    if (!motionReady || reduced) return;
    let ctx;
    try {
      ctx = gsap.context(() => {
        gsap.fromTo('.hero-enter', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .065, ease: 'power3.out', clearProps: 'transform,opacity' });
      }, page);
    } catch {
      ctx?.revert();
      page.current?.querySelectorAll('.hero-enter').forEach(element => { element.style.removeProperty('opacity'); element.style.removeProperty('transform'); });
    }
    return () => { try { ctx?.revert(); } catch { /* Keep the static composition visible. */ } };
  }, [reduced, motionReady]);
  function updateHeroRoute(name, value) {
    if (tripBusy) return;
    document.getElementById('hero-to')?.setCustomValidity('');
    setTrip(current => current.tripType === 'multi_city' ? { ...current, legs: current.legs.map((leg, index) => index === 0 ? { ...leg, [name]: value } : leg) } : { ...current, [name]: value });
  }
  function continueRoute(event) {
    event.preventDefault();
    if (tripBusy) return;
    if (heroRoute.from.trim().toLowerCase() === heroRoute.to.trim().toLowerCase()) {
      event.currentTarget.elements.heroTo.setCustomValidity(t('hero.sameCity', 'Choose a destination different from your departure city.'));
      event.currentTarget.elements.heroTo.reportValidity(); return;
    }
    setStep(0);
    updateHeroRoute('from', heroRoute.from.trim()); updateHeroRoute('to', heroRoute.to.trim());
    markConversionSource('homepage'); navigate(localePath('/#request-form'));
  }
  return <div ref={page}><section className="hero hero--portrait" aria-labelledby="hero-title"><div className="hero-inner section-wrap">
    <div className="hero-cover hero-copy">
      <div className="hero-identity hero-enter"><img className="hero-mobile-portrait" src="/images/homepage/derek-monti.jpg" alt="" width="1122" height="1402" decoding="async" /><p className="homepage-eyebrow">Derek Monti · {t('hero.eyebrow', 'Personal flight advisor')}</p></div>
      <h1 id="hero-title" className="hero-enter"><span className="hero-category-first">{t('hero.title1', 'Business')}</span>{' '}<span>{t('hero.title2', '& First Class')}</span></h1>
      <div className="hero-personal hero-enter"><p className="hero-signoff">{t('hero.signoff', 'Premium airline flights, personally reviewed.')}</p><p className="hero-description">{t('hero.description', 'Share your route, dates and what matters to you. I’ll help you compare the cabin, connections and ticket conditions.')}</p><a className="homepage-text-link" href="#meet-derek">{t('home.derek.label', 'Meet Derek')}<ArrowRight size={16} aria-hidden="true" /></a></div>
    </div>
    <form className="route-entry hero-enter" onSubmit={continueRoute} aria-label={t('hero.form', 'Start planning your trip')}>
      <div className="route-input"><PlaneTakeoff size={27} aria-hidden="true" /><label htmlFor="hero-from"><span>{t('route.from', 'From')}</span><input disabled={tripBusy} ref={heroFrom} id="hero-from" name="heroFrom" autoComplete="off" maxLength={80} value={heroRoute.from} onChange={event => updateHeroRoute('from', event.target.value)} placeholder={t('hero.from', 'Where are you flying from?')} required /></label></div>
      <div className="route-input"><PlaneLanding size={27} aria-hidden="true" /><label htmlFor="hero-to"><span>{t('route.to', 'To')}</span><input disabled={tripBusy} id="hero-to" name="heroTo" autoComplete="off" maxLength={80} value={heroRoute.to} onChange={event => updateHeroRoute('to', event.target.value)} placeholder={t('hero.to', 'Where do you want to go?')} required /></label></div>
      <button className="button button--primary route-submit" type="submit" disabled={tripBusy}>{t('hero.start', 'Start planning')}<ArrowRight size={20} aria-hidden="true" /></button>
      <a className="route-explore" href="#comfort"><span>{t('hero.explore', 'Explore the experience')}<small>{t('hero.exploreNote', 'Start with what matters to you')}</small></span><ArrowDown size={20} aria-hidden="true" /></a>
    </form>
    <p className="hero-clarity hero-enter">{t('hero.clarity', 'A request for personal review. Fares and availability are confirmed separately.')}</p>
    <figure className="hero-portrait hero-enter"><img src="/images/homepage/derek-monti.jpg" width="1122" height="1402" alt={t('home.derek.alt', 'Derek Monti, your personal flight advisor')} fetchpriority="high" decoding="async" /><figcaption><strong>Derek Monti</strong><span>{t('hero.advisor', 'Your personal flight advisor.')}</span></figcaption></figure>
  </div></section><HomeSections onBusyChange={setTripBusy} busy={tripBusy} /></div>;
}
