import { useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import QuickQuote from '../components/common/QuickQuote.jsx';
import { blogPosts } from '../data/blog.js';
import { contactConfig } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { getWhatsappUrl } from '../utils/message.js';

const sortedPosts = [...blogPosts].sort((a, b) => (b.publishedTime || '').localeCompare(a.publishedTime || ''));
const categories = ['All', ...new Set(sortedPosts.map((post) => post.category))];

const popularPages = [
  { path: '/business-class-flights', label: 'Cheap business class flights' },
  { path: '/first-class-flights', label: 'First class flight deals' },
  { path: '/business-class-flights/europe', label: 'Business class to Europe' },
  { path: '/services/last-minute-business-class', label: 'Last-minute business class' },
  { path: '/services/complex-itineraries', label: 'Multi-city and round-the-world' },
];

export default function Blog() {
  const pageRef = useRef(null);
  const [category, setCategory] = useState('All');
  usePageMotion(pageRef);

  const visible = category === 'All' ? sortedPosts : sortedPosts.filter((post) => post.category === category);
  const whatsapp = getWhatsappUrl({ requestTitle: 'Business class quote' });

  return (
    <div ref={pageRef}>
      <section className="blog-hero" aria-labelledby="blog-title">
        <div className="container blog-hero__inner">
          <div data-reveal>
            <p className="eyebrow eyebrow--light">Blog</p>
            <h1 id="blog-title">Business class tips, deals and insider guides</h1>
          </div>
          <p className="blog-hero__lead" data-reveal>
            How I find fares 15–60% below the published price, what to check before you book, and what is realistic
            when you have to fly this week. Written by me, from real quotes.
          </p>
        </div>
        <div className="container">
          <ul className="blog-filter" aria-label="Filter articles by category">
            {categories.map((item) => (
              <li key={item}>
                <button type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="blog-layout" aria-label="Articles">
        <div className="container blog-layout__inner">
          <div className="blog-grid">
            {visible.map((post, index) => (
              <BlogCard post={post} key={post.slug} featured={index === 0 && category === 'All'} />
            ))}
            {visible.length === 0 && <p className="blog-grid__empty">No articles in this category yet.</p>}
          </div>

          <aside className="blog-rail" aria-label="Get a quote and popular pages">
            <div className="blog-rail__card" id="quote">
              <p className="blog-rail__title">Price my trip</p>
              <QuickQuote variant="inline" label="Get my quote" />
              <p className="blog-rail__note">Free quote, no obligation. I reply within hours, usually the same day.</p>
            </div>
            <div className="blog-rail__card">
              <p className="blog-rail__title">Popular pages</p>
              <ul className="blog-rail__links">
                {popularPages.map((page) => (
                  <li key={page.path}>
                    <Link to={page.path}>
                      {page.label}
                      <ArrowRight aria-hidden="true" size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="blog-rail__card blog-rail__card--dark">
              <p className="blog-rail__title">Prefer to talk?</p>
              <div className="blog-rail__contact">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" size={18} />
                  WhatsApp Derek
                </a>
                <a href={`tel:${contactConfig.phoneHref}`}>
                  <Phone aria-hidden="true" size={18} />
                  {contactConfig.phoneLabel}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FinalCta
        title="Want these fares for your own trip?"
        text="Send me the route and dates. You get real options within hours, with the published price next to mine."
        quoteHref="#quote"
      />
    </div>
  );
}
