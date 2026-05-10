import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RouteCard from './RouteCard.jsx';

export default function RouteCarousel({ deals }) {
  const scrollerRef = useRef(null);

  const scroll = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * 380, behavior: 'smooth' });
  };

  return (
    <div className="route-carousel">
      <div className="route-carousel__controls" aria-label="Route carousel controls">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous deal">
          <ArrowLeft aria-hidden="true" size={18} />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next deal">
          <ArrowRight aria-hidden="true" size={18} />
        </button>
      </div>
      <div className="route-carousel__track" ref={scrollerRef}>
        {deals.map((deal) => (
          <RouteCard key={`${deal.fromCode}-${deal.toCode}-${deal.derek}`} deal={deal} />
        ))}
      </div>
    </div>
  );
}
