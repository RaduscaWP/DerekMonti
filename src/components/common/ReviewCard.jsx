import { BadgeCheck, Quote } from 'lucide-react';

export default function ReviewCard({ review }) {
  const verified = review.verified === true && review.placeholder !== true;
  const rating = Number(review.rating);
  const hasRating = verified && Number.isFinite(rating) && rating >= 1 && rating <= 5;

  return (
    <article className="review-card" data-reveal>
      <div className="review-card__top">
        <span className="review-card__stars" aria-label={hasRating ? `${rating} out of 5` : 'Illustrative testimonial'}>
          {hasRating ? rating.toFixed(1) : 'Example'}
        </span>
        <span>
          {verified ? <BadgeCheck aria-hidden="true" size={16} /> : <Quote aria-hidden="true" size={16} />}
          {verified ? 'Verified' : 'Illustrative testimonial'}
        </span>
      </div>
      <h3>{review.title}</h3>
      <p>{review.body}</p>
      <footer>
        <strong>{review.name}</strong>
        {verified && review.date && <span>{review.date}</span>}
      </footer>
    </article>
  );
}
