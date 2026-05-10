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
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const reset = (event) => {
    event.currentTarget.style.transform = '';
  };

  return (
    <article className="route-card" onMouseMove={handleMove} onMouseLeave={reset} data-reveal>
      <div className="route-card__image">
        <img src={deal.image} alt={`${deal.to} premium travel`} loading="lazy" />
        <span>{deal.savings}</span>
      </div>
      <div className="route-card__body">
        <div className="route-card__route">
          <div>
            <small>from</small>
            <strong>{deal.from}</strong>
            <b>{deal.fromCode}</b>
          </div>
          <ArrowRight aria-hidden="true" size={22} strokeWidth={1.8} />
          <div>
            <small>to</small>
            <strong>{deal.to}</strong>
            <b>{deal.toCode}</b>
          </div>
        </div>
        <dl className="route-card__meta">
          <div>
            <dt>Flexible dates</dt>
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
        <div className="route-card__prices">
          <div>
            <span>Published Fare</span>
            <del>{deal.published}</del>
          </div>
          <div className="route-card__highlight">
            <span>Derek's Price</span>
            <strong>{deal.derek}</strong>
          </div>
        </div>
        <p>{deal.note}</p>
      </div>
    </article>
  );
}
