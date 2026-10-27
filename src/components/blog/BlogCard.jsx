import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Deterministic (UTC, en-US) so the server HTML and the first client render match.
export function formatDate(iso) {
  if (!iso) return '';
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogCard({ post, featured = false, headingLevel = 'h3' }) {
  const Heading = headingLevel;
  const small = post.imageSmall || post.image.replace(/\.webp$/, '-600.webp');

  return (
    <article className={`blog-card${featured ? ' blog-card--featured' : ''}`} data-reveal>
      <Link to={`/blog/${post.slug}`} className="blog-card__link">
        <div className="blog-card__media">
          <img
            src={post.image}
            srcSet={`${small} 600w, ${post.image} 1200w`}
            sizes={featured ? '(max-width: 940px) 92vw, 640px' : '(max-width: 720px) 92vw, 420px'}
            alt=""
            width="1200"
            height="675"
            loading="lazy"
            decoding="async"
          />
          <span className="blog-card__category">{post.category}</span>
        </div>
        <div className="blog-card__body">
          <p className="blog-card__meta">
            <time dateTime={post.publishedTime}>{formatDate(post.publishedTime)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </p>
          <Heading className="blog-card__title">{post.title}</Heading>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <span className="blog-card__more">
            Read the guide
            <ArrowRight aria-hidden="true" size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
