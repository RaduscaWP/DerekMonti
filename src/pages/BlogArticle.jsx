import { useRef } from 'react';
import { Clock3, Mail, MessageCircle, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../components/blog/BlogCard.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import QuickQuote from '../components/common/QuickQuote.jsx';
import { blogPosts } from '../data/blog.js';
import { imagery } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { SITE_ORIGIN } from '../seo/routeManifest.js';
import NotFound from './NotFound.jsx';

const routeLinks = [
  { path: '/business-class-flights', label: 'Cheap business class flights', small: 'Worldwide' },
  { path: '/business-class-flights/europe', label: 'Business class to Europe', small: 'US → Europe' },
  { path: '/services/last-minute-business-class', label: 'Last-minute business class', small: 'This week' },
];

function relatedTo(post) {
  const others = blogPosts.filter((item) => item.slug !== post.slug);
  const sameCategory = others.filter((item) => item.category === post.category);
  const rest = others.filter((item) => item.category !== post.category);
  return [...sameCategory, ...rest].slice(0, 3);
}

export default function BlogArticle() {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const post = blogPosts.find((item) => item.slug === slug);

  usePageMotion(pageRef);

  if (!post) {
    return <NotFound />;
  }

  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const related = relatedTo(post);
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(url);

  return (
    <div ref={pageRef}>
      <header className="article-hero">
        <div className="article-hero__media" aria-hidden="true">
          <img src={post.image} alt="" width="1200" height="675" fetchpriority="high" decoding="async" />
        </div>
        <div className="container article-hero__inner">
          <nav className="article-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <span aria-current="page">{post.title}</span>
              </li>
            </ol>
          </nav>
          <span className="article-hero__category">{post.category}</span>
          <h1>{post.title}</h1>
          <ul className="article-hero__meta">
            <li>By {post.author || 'Derek Monti'}</li>
            <li>
              <time dateTime={post.publishedTime}>{formatDate(post.publishedTime)}</time>
            </li>
            <li>
              <Clock3 aria-hidden="true" size={16} />
              {post.readTime}
            </li>
          </ul>
        </div>
      </header>

      <div className="article-layout">
        <div className="container article-layout__inner">
          <article className="article-body">
            <p className="article-body__lead">{post.excerpt}</p>
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                ))}
                {section.bullets?.length > 0 && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item.slice(0, 60)}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="article-share" aria-label="Share this article">
              <span>
                <Share2 aria-hidden="true" size={15} /> Share
              </span>
              <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" size={16} />
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a href={`mailto:?subject=${shareText}&body=${shareUrl}`}>
                <Mail aria-hidden="true" size={16} />
                Email
              </a>
            </div>
          </article>

          <aside className="article-rail" aria-label="About the author and next steps">
            <div className="article-rail__author">
              <img src={imagery.derekAvatar} alt="Derek Monti" width="56" height="56" loading="lazy" decoding="async" />
              <div>
                <strong>Derek Monti</strong>
                <span>Personal flight advisor in Miami. Business and first class at insider prices for 20+ private clients.</span>
              </div>
            </div>
            <div className="article-rail__quote" id="quote">
              <p className="article-rail__title">Price my trip</p>
              <QuickQuote variant="inline" label="Get my quote" />
              <p className="article-rail__note">
                Free quote, no obligation. Example fares in this guide come from recent quotes; fares change daily.
              </p>
            </div>
            <div>
              <p className="eyebrow">Keep reading</p>
              <ul className="article-rail__list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/blog/${item.slug}`}>
                      <small>{item.category}</small>
                      <strong>{item.title}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Get a quote for</p>
              <ul className="article-rail__list">
                {routeLinks.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>
                      <small>{item.small}</small>
                      <strong>{item.label}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <FinalCta
        title="Ready to see real fares for your route?"
        text="Send me the route and dates. I reply within hours with options and the published price next to mine."
        quoteHref="#quote"
      />
    </div>
  );
}
