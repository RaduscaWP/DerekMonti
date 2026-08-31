import { useRef } from 'react';
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import FinalCta from '../components/common/FinalCta.jsx';
import { blogPosts } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import NotFound from './NotFound.jsx';

export default function BlogArticle() {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const post = blogPosts.find((item) => item.slug === slug);
  const related = post ? blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2) : [];

  usePageMotion(pageRef);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div ref={pageRef}>
      <header className="article-header">
        <div className="container article-header__inner">
          <Link to="/blog" className="article-header__back">
            <ArrowLeft aria-hidden="true" size={17} />
            All guides
          </Link>
          <p className="eyebrow eyebrow--light">{post.category}</p>
          <h1>{post.title}</h1>
          <div className="article-header__meta">
            <span>
              <Clock3 aria-hidden="true" size={16} />
              {post.readTime}
            </span>
            <span>{post.wordCount.toLocaleString('en-US')} words</span>
          </div>
        </div>
      </header>

      <div className="article-page">
        <div className="container article-page__layout">
          <article className="article-content" data-reveal>
            <p className="article-content__lead">{post.excerpt}</p>
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets?.length > 0 && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <aside className="article-content__caveat">
              <strong>Important</strong>
              <p>
                This guide is general decision support, not live fare or inventory information. A real itinerary must
                be checked against its current cabin, availability, and ticket conditions.
              </p>
            </aside>
          </article>

          <aside className="article-rail" aria-label="Related guidance">
            <div>
              <p className="eyebrow">Related guides</p>
              {related.map((item) => (
                <Link to={`/blog/${item.slug}`} key={item.slug}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              ))}
            </div>
            <Link className="article-rail__quote" to="/#request-form">
              <span>Apply this to your trip</span>
              <strong>Request a personal review</strong>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </aside>
        </div>
      </div>

      <FinalCta
        title="Turn the framework into a trip brief."
        text="Send the route, dates, flexibility, and the tradeoffs that matter most to you."
      />
    </div>
  );
}
