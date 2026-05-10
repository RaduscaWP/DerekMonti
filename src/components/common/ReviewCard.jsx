import { BadgeCheck } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <article className="review-card" data-reveal>
      <div className="review-card__top">
        <span className="review-card__stars" aria-label="Five star review">
          5.0
        </span>
        <span>
          <BadgeCheck aria-hidden="true" size={16} />
          Verified
        </span>
      </div>
      <h3>{review.title}</h3>
      <p>{review.body}</p>
      <footer>
        <strong>{review.name}</strong>
        <span>{review.date}</span>
      </footer>
    </article>
  );
}
