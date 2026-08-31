import { useRef } from 'react';
import { ArrowRight, BookOpenText } from 'lucide-react';
import { Link } from 'react-router-dom';
import FinalCta from '../components/common/FinalCta.jsx';
import { blogPosts } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

export default function Blog() {
  const pageRef = useRef(null);

  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <section className="guides-hero" aria-labelledby="guides-page-title">
        <div className="container guides-hero__inner">
          <div data-reveal>
            <p className="eyebrow eyebrow--light">Decision guides</p>
            <h1 id="guides-page-title">Travel questions, answered for the whole journey.</h1>
          </div>
          <p data-reveal>
            Practical frameworks for comparing premium itineraries without pretending that one airline, seat, or
            headline price fits every traveler.
          </p>
        </div>
      </section>

      <section className="guides-index" aria-labelledby="guide-list-title">
        <div className="container guides-index__layout">
          <aside data-reveal>
            <BookOpenText aria-hidden="true" size={24} />
            <p className="eyebrow">Current library</p>
            <h2 id="guide-list-title">Start with a real decision.</h2>
            <p>
              Each guide has one purpose, an honest reading time based on its word count, and a request path that
              matches the topic.
            </p>
          </aside>
          <div className="guides-index__list">
            {blogPosts.map((post, index) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} data-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <small>
                    {post.category} · {post.readTime}
                  </small>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <ArrowRight aria-hidden="true" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-note" aria-labelledby="editorial-note-title">
        <div className="container editorial-note__inner" data-reveal>
          <p className="eyebrow">Editorial standard</p>
          <h2 id="editorial-note-title">Facts that change need a source and a review date.</h2>
          <p>
            These initial guides focus on durable decision frameworks. Schedule, aircraft, lounge, fare-rule, and
            airline-product claims are not published here without a maintainable source and factual review.
          </p>
        </div>
      </section>

      <FinalCta
        title="Want the framework applied to your trip?"
        text="Share the itinerary, the fixed constraints, and the priorities you want Derek to weigh."
      />
    </div>
  );
}
