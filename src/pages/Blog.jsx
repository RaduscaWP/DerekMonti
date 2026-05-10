import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Mail, Search } from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../components/common/Button.jsx';
import QuoteForm from '../components/common/QuoteForm.jsx';
import ScenicBackdrop from '../components/common/ScenicBackdrop.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import { blogPosts, siteBackdrops } from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const categories = ['All', 'Business Class Tips', 'Travel Hacks', 'Destination Guides', "Derek's Picks"];

function BlogCard({ post }) {
  return (
    <Link className="blog-card" to={`/blog/${post.slug}`} data-category={post.category}>
      <div className="blog-card__image">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span>{post.category}</span>
      </div>
      <div className="blog-card__body">
        <time>{post.date}</time>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <small>{post.readTime}</small>
      </div>
    </Link>
  );
}

function BlogSidebar() {
  return (
    <aside className="blog-sidebar">
      <div className="blog-sidebar__quote" data-reveal>
        <div className="blog-sidebar__icon">
          <Mail aria-hidden="true" size={22} />
        </div>
        <h2>Get Your Free Quote</h2>
        <p>Derek responds personally within hours.</p>
        <QuoteForm variant="sidebar" />
      </div>
      <div className="blog-sidebar__recent" data-reveal>
        <h2>Recent Articles</h2>
        {blogPosts.slice(0, 5).map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.slug}>
            <img src={post.image} alt="" loading="lazy" />
            <span>
              <strong>{post.title}</strong>
              <small>{post.date}</small>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default function Blog() {
  const [category, setCategory] = useState('All');
  const pageRef = useRef(null);
  const gridRef = useRef(null);

  useDocumentMeta(
    'Blog - Business Class Tips, Travel Hacks and Deals | Derek Monti',
    'Read premium travel insights, business class tips, destination guides and Derek Monti fare strategy notes.',
  );
  usePageMotion(pageRef);

  const posts = useMemo(
    () => (category === 'All' ? blogPosts : blogPosts.filter((post) => post.category === category)),
    [category],
  );

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.blog-card');
    if (!cards?.length) return;
    gsap.fromTo(cards, { opacity: 0, y: 22 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.42, ease: 'power3.out' });
  }, [posts]);

  return (
    <div ref={pageRef}>
      <section className="blog-hero scenic-section scenic-section--blog-hero">
        <ScenicBackdrop backdrop={siteBackdrops.blogHero} loading="eager" />
        <div className="container">
          <p className="eyebrow">Current Articles</p>
          <h1>Travel Smarter. Read Better.</h1>
          <p>Premium travel guidance, fare logic, and destination notes from Derek's desk.</p>
          <div className="blog-hero__search">
            <Search aria-hidden="true" size={18} />
            <span>Subscribe for premium travel updates</span>
            <Button href="#contact" size="sm">
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      <section className="blog-listing">
        <div className="container">
          <SectionHeader
            eyebrow="Journal"
            title="Business and First Class Intelligence"
            text="Choose a category or scan the latest travel notes."
          />
          <div className="category-filter" role="tablist" aria-label="Blog categories">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="blog-layout">
            <div className="blog-grid" ref={gridRef}>
              {posts.map((post) => (
                <BlogCard post={post} key={post.slug} />
              ))}
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>

      <section className="newsletter" id="contact">
        <div className="container newsletter__inner" data-reveal>
          <div>
            <p className="eyebrow">Subscribe</p>
            <h2>Receive Derek's Premium Travel Notes</h2>
            <p>Short updates on fare windows, cabin trends, and useful routing ideas.</p>
          </div>
          <form>
            <label>
              <span>Name</span>
              <input placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <button type="button">
              <CalendarDays aria-hidden="true" size={18} />
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
