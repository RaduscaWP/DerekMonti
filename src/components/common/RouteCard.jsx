import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { imagery } from '../../data/siteData.js';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import { useLocale } from '../../i18n/useLocale.js';

export default function RouteCard({ deal }) {
  const cardRef = useRef(null);
  const frame = useRef(null);
  const { t } = useLocale();
  const [imageSrc, setImageSrc] = useState(deal.image || imagery.cabin);
  const { reduced, motionReady } = useMotionPreference();
  const savings = t('route.example', 'Fare example');

  useEffect(() => { setImageSrc(deal.image || imagery.cabin); }, [deal.image]);
  useEffect(() => {
    cancelAnimationFrame(frame.current);
    if (cardRef.current) cardRef.current.style.removeProperty('transform');
    return () => cancelAnimationFrame(frame.current);
  }, [reduced, motionReady]);

  const handleMove = (event) => {
    if (!motionReady || reduced || event.pointerType !== 'mouse' || window.innerWidth < 900
      || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const card = cardRef.current;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const rotateX = Math.max(-8, Math.min(8, -y * 0.015));
    const rotateY = Math.max(-8, Math.min(8, x * 0.015));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { if (card) card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`; });
  };

  const reset = () => { cancelAnimationFrame(frame.current); cardRef.current?.style.removeProperty('transform'); };
  const handleImageError = () => {
    if (imageSrc !== imagery.cabin) setImageSrc(imagery.cabin);
  };

  return (
    <article
      className="route-card"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
      aria-label={t('route.label', '{from} to {to}: illustrative fare comparison', { from: deal.from, to: deal.to })}
      data-reveal
    >
      <div className="route-card__surface" ref={cardRef}>
      <div className="route-card__ticket-head">
        <div className="route-card__image">
          <img src={imageSrc} alt={deal.imageAlt || `${deal.to} destination`} loading="lazy" decoding="async" onError={handleImageError} />
        </div>
        <span className="route-card__stamp">{savings}</span>
      </div>
      <div className="route-card__body">
        <div className="route-card__route">
          <div className="route-card__endpoint"><small>{t('route.from', 'From')}</small><strong>{deal.fromCode}</strong><span>{deal.from}</span></div>
          <span className="route-card__arrow"><ArrowRight aria-hidden="true" size={22} strokeWidth={1.8} /></span>
          <div className="route-card__endpoint"><small>{t('route.to', 'To')}</small><strong>{deal.toCode}</strong><span>{deal.to}</span></div>
        </div>
        <dl className="route-card__meta">
          <div><dt>{t('route.dates', 'Dates')}</dt><dd>{t('route.flexible', '±3 days')}</dd></div>
          <div><dt>{t('route.cabin', 'Cabin')}</dt><dd>{deal.cabin === 'First Class' ? t('route.first', 'First Class') : t('route.business', 'Business Class')}</dd></div>
          <div><dt>{t('route.carriers', 'Example carriers')}</dt><dd>{deal.carriers}</dd></div>
        </dl>
      </div>
      <div className="route-card__stub">
        <span className="route-card__notch route-card__notch--left" aria-hidden="true" />
        <span className="route-card__notch route-card__notch--right" aria-hidden="true" />
        <div className="route-card__prices">
          <div className="route-card__price-row"><span>{t('route.published', 'Published example')}</span><del>{deal.published}</del></div>
          <div className="route-card__price-row route-card__highlight"><span>{t('route.option', 'Example option')}</span><strong>{deal.derek}</strong></div>
        </div>
        <p className="route-card__note">{t('route.note', 'Illustrative comparison. Final fares depend on your itinerary.')}</p>
      </div>
      </div>
    </article>
  );
}
