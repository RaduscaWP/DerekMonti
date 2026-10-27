import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RouteCard from './RouteCard.jsx';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function RouteCarousel({ deals = [], showControls = true }) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const next = {
      start: track.scrollLeft <= 2,
      end: maxScroll <= 2 || track.scrollLeft >= maxScroll - 2,
    };
    setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateEdges);
    };
    updateEdges();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateEdges, deals.length]);

  const scrollByCard = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByCard(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByCard(1);
    }
  };

  return (
    <div className="route-carousel">
      {showControls && (
        <div className="route-carousel__controls">
          <button
            type="button"
            className="route-carousel__button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous route"
            aria-disabled={edges.start}
          >
            <ArrowLeft aria-hidden="true" size={20} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="route-carousel__button"
            onClick={() => scrollByCard(1)}
            aria-label="Next route"
            aria-disabled={edges.end}
          >
            <ArrowRight aria-hidden="true" size={20} strokeWidth={2.2} />
          </button>
        </div>
      )}
      <div
        ref={trackRef}
        className="route-carousel__track"
        role="group"
        aria-roledescription="carousel"
        aria-label="Example fares, use the arrow keys to move between routes"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {deals.map((deal) => (
          <RouteCard key={`${deal.fromCode}-${deal.toCode}-${deal.cabin}`} deal={deal} />
        ))}
      </div>
    </div>
  );
}
