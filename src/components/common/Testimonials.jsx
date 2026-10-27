import { Star } from 'lucide-react';
import { reviews } from '../../data/siteData';

const STAR_COUNT = 5;
const STARS = Array.from({ length: STAR_COUNT }, (_, index) => index);

export function hasReviews() {
  return Array.isArray(reviews) && reviews.length > 0;
}

function isTrustpilot(source) {
  return typeof source === 'string' && source.trim().toLowerCase() === 'trustpilot';
}

function ReviewCard({ review }) {
  const { title, body, name, route, source, href } = review;
  const starsClass = `reviews__stars${isTrustpilot(source) ? ' reviews__stars--trustpilot' : ''}`;
  const sourceLabel = source ? `via ${source}` : null;

  return (
    <article className="reviews__card">
      <div className={starsClass} role="img" aria-label={`Rated ${STAR_COUNT} out of ${STAR_COUNT}`}>
        {STARS.map((index) => (
          <Star key={index} size={16} strokeWidth={0} fill="currentColor" aria-hidden="true" focusable="false" />
        ))}
      </div>
      {title && <h3 className="reviews__title">{title}</h3>}
      <p className="reviews__body">{body}</p>
      <footer className="reviews__footer">
        <p className="reviews__meta">
          <span className="reviews__name">{name}</span>
          {route && <span className="reviews__route">{route}</span>}
        </p>
        {sourceLabel && href && (
          <a className="reviews__source" href={href} target="_blank" rel="noopener noreferrer">
            {sourceLabel}
          </a>
        )}
        {sourceLabel && !href && <span className="reviews__source reviews__source--static">{sourceLabel}</span>}
      </footer>
    </article>
  );
}

export default function Testimonials() {
  if (!hasReviews()) return null;

  return (
    <section className="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews__header" data-reveal>
          <p className="eyebrow">Client reviews</p>
          <h2 id="reviews-heading">What my clients say.</h2>
        </div>

        <ul className="reviews__grid">
          {reviews.map((review, index) => (
            <li key={`${review.name}-${index}`} className="reviews__item" data-reveal>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>

        <p className="reviews__note" data-reveal>
          Reviews are quoted with permission.
        </p>
      </div>
    </section>
  );
}
