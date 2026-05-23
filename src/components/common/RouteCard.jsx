import { ArrowRight } from 'lucide-react';

export default function RouteCard({ deal }) {
  const handleMove = (event) => {
    const card = event.currentTarget;
    if (window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const rotateX = Math.max(Math.min(-y * 0.015, 8), -8);
    const rotateY = Math.max(Math.min(x * 0.015, 8), -8);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const reset = (event) => {
    event.currentTarget.style.transform = '';
  };

  return (
    <article
      className="route-card"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      aria-label={`${deal.from} to ${deal.to} business and first class fare example`}
      data-reveal
    >
      <div className="route-card__ticket-head">
        <div className="route-card__image">
          <img src={deal.image} alt={`${deal.to} business and first class travel`} loading="lazy" />
        </div>
        <span className="route-card__stamp">{deal.savings}</span>
      </div>
      <div className="route-card__body">
        <div className="route-card__route">
          <div className="route-card__endpoint">
            <small>from</small>
            <strong>{deal.fromCode}</strong>
            <span>{deal.from}</span>
          </div>
          <span className="route-card__arrow">
            <ArrowRight aria-hidden="true" size={22} strokeWidth={1.8} />
          </span>
          <div className="route-card__endpoint">
            <small>to</small>
            <strong>{deal.toCode}</strong>
            <span>{deal.to}</span>
          </div>
        </div>
        <dl className="route-card__meta">
          <div>
            <dt>Dates</dt>
            <dd>{deal.flexibleWindow}</dd>
          </div>
          <div>
            <dt>Cabin</dt>
            <dd>{deal.cabin}</dd>
          </div>
          <div>
            <dt>Example carriers</dt>
            <dd>{deal.carriers}</dd>
          </div>
        </dl>
      </div>
      <div className="route-card__stub">
        <span className="route-card__notch route-card__notch--left" aria-hidden="true" />
        <span className="route-card__notch route-card__notch--right" aria-hidden="true" />
        <div className="route-card__prices">
          <div className="route-card__price-row">
            <span>Published</span>
            <del>{deal.published}</del>
          </div>
          <div className="route-card__price-row route-card__highlight">
            <span>Derek's fare</span>
            <strong>{deal.derek}</strong>
          </div>
        </div>
        <p className="route-card__note">{deal.note}</p>
      </div>
    </article>
  );
}
