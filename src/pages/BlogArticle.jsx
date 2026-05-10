import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import QuoteForm from '../components/common/QuoteForm.jsx';
import { blogPosts, contactConfig } from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

export default function BlogArticle() {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const post = blogPosts.find((item) => item.slug === slug) || blogPosts[0];
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  useDocumentMeta(`${post.title} | Derek Monti`, post.excerpt);
  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <section className="article-hero">
        <img src={post.image} alt={post.title} />
        <div className="article-hero__overlay" />
        <div className="article-hero__content">
          <Link to="/blog" className="article-hero__back">
            <ArrowLeft aria-hidden="true" size={18} />
            Blog
          </Link>
          <span>{post.category}</span>
          <h1>{post.title}</h1>
          <p>
            {post.date} - {post.readTime}
          </p>
        </div>
      </section>

      <section className="article-layout">
        <div className="container article-layout__inner">
          <article className="article-body" data-reveal>
            <p className="article-body__lead">{post.excerpt}</p>
            {post.body.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.text}</p>
              </section>
            ))}
            <blockquote>
              Derek's rule of thumb: a premium fare should save money without making the journey harder.
            </blockquote>
            <div className="article-share">
              <Share2 aria-hidden="true" size={18} />
              <span>Share this article with a traveler who overpays for business class.</span>
            </div>
          </article>

          <aside className="article-sidebar">
            <div className="article-sidebar__quote" data-reveal>
              <h2>Request a Quote</h2>
              <p>Send Derek your route and receive options personally.</p>
              <QuoteForm variant="sidebar" />
            </div>
            <div className="article-sidebar__related" data-reveal>
              <h2>Related Articles</h2>
              {related.map((item) => (
                <Link to={`/blog/${item.slug}`} key={item.slug}>
                  <img src={item.image} alt="" loading="lazy" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="article-cta" id="contact">
        <div className="container" data-reveal>
          <h2>Have a route in mind?</h2>
          <p>Derek can compare public fares against private premium cabin options.</p>
          <Button href={`mailto:${contactConfig.email}?subject=Premium%20flight%20quote%20request`}>
            Send Derek the Trip
          </Button>
        </div>
      </section>
    </div>
  );
}
