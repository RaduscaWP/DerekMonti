import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { imagery } from '../../data/siteData.js';

const MAX_TILT = 8;
const TILT_MIN_WIDTH = 900;

function canTilt() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  if (window.innerWidth < TILT_MIN_WIDTH) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export default function RouteCard({ deal }) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [deal.image]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const resetTilt = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    delete card.dataset.tilting;
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const card = cardRef.current;
      if (!card || !canTilt()) return;
      const { clientX, clientY } = event;
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const dx = clientX - rect.left - rect.width / 2;
        const dy = clientY - rect.top - rect.height / 2;
        const rotateX = Math.max(-MAX_TILT, Math.min(MAX_TILT, -dy * 0.03));
        const rotateY = Math.max(-MAX_TILT, Math.min(MAX_TILT, dx * 0.03));
        card.dataset.tilting = 'true';
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });
    },
    []
  );

  const handleImageError = () => {
    if (!imageFailed) setImageFailed(true);
  };

  const imageProps = imageFailed
    ? { src: imagery.cabin }
    : {
        src: deal.image,
        srcSet: deal.imageSmall ? `${deal.imageSmall} 600w, ${deal.image} 1200w` : undefined,
        sizes: '(max-width: 720px) 88vw, 380px',
      };

  return (
    <article
      ref={cardRef}
      className="route-card"
      aria-label={`${deal.from} (${deal.fromCode}) to ${deal.to} (${deal.toCode}), ${deal.cabin}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <div className="route-card__media">
        <img
          {...imageProps}
          alt={imageFailed ? '' : deal.imageAlt || ''}
          width="1200"
          height="675"
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
        <span className="route-card__stamp">{deal.savings}</span>
      </div>

      <div className="route-card__body">
        <div className="route-card__route">
          <div className="route-card__endpoint">
            <small>From</small>
            <strong>{deal.fromCode}</strong>
            <span>{deal.from}</span>
          </div>
          <span className="route-card__arrow" aria-hidden="true">
            <ArrowRight size={20} strokeWidth={2} />
          </span>
          <div className="route-card__endpoint route-card__endpoint--to">
            <small>To</small>
            <strong>{deal.toCode}</strong>
            <span>{deal.to}</span>
          </div>
        </div>

        <dl className="route-card__meta">
          <div>
            <dt>Dates</dt>
            <dd>{deal.window}</dd>
          </div>
          <div>
            <dt>Cabin</dt>
            <dd>{deal.cabin}</dd>
          </div>
          <div>
            <dt>Carriers</dt>
            <dd>{deal.carriers}</dd>
          </div>
        </dl>
      </div>

      <div className="route-card__stub">
        <span className="route-card__notch route-card__notch--left" aria-hidden="true" />
        <span className="route-card__notch route-card__notch--right" aria-hidden="true" />
        <dl className="route-card__fares">
          <div className="route-card__fare">
            <dt>Published fare</dt>
            <dd>
              <s>{deal.published}</s>
            </dd>
          </div>
          <div className="route-card__fare route-card__fare--derek">
            <dt>Derek&rsquo;s fare</dt>
            <dd>{deal.derek}</dd>
          </div>
        </dl>
        <p className="route-card__fine">Example from a recent quote &middot; fares change</p>
      </div>
    </article>
  );
}
