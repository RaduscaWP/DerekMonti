import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RouteCard from './RouteCard.jsx';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import { useLocale } from '../../i18n/useLocale.js';

const RouteCarousel = forwardRef(function RouteCarousel({ deals, showControls = true }, ref) {
  const scrollerRef = useRef(null);
  const { reduced } = useMotionPreference();
  const { t } = useLocale();

  const scroll = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cardWidth = scroller.firstElementChild?.getBoundingClientRect().width || 380;
    const gap = parseFloat(window.getComputedStyle(scroller).columnGap) || 0;
    scroller.scrollBy({ left: direction * (cardWidth + gap), behavior: reduced ? 'auto' : 'smooth' });
  };

  useImperativeHandle(ref, () => ({ scroll }), [reduced]);

  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    scroll(event.key === 'ArrowLeft' ? -1 : 1);
  };

  return (
    <div className="route-carousel">
      {showControls && (
        <div className="route-carousel__controls" aria-label={t('route.controls', 'Route carousel controls')}>
          <button type="button" onClick={() => scroll(-1)} aria-label={t('route.previous', 'Previous fare example')}><ArrowLeft aria-hidden="true" size={18} /></button>
          <button type="button" onClick={() => scroll(1)} aria-label={t('route.next', 'Next fare example')}><ArrowRight aria-hidden="true" size={18} /></button>
        </div>
      )}
      <div className="route-carousel__track" ref={scrollerRef} role="region" aria-label={t('route.examples', 'Illustrative fare examples')} tabIndex={0} onKeyDown={handleKeyDown}>
        {deals.map((deal) => <RouteCard key={`${deal.fromCode}-${deal.toCode}-${deal.derek}`} deal={deal} />)}
      </div>
    </div>
  );
});

export default RouteCarousel;
