import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import styles from './Blog.module.scss';

export default function Blog() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);
  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="guides-page-title">
        <div className={styles.inner}>
          <div className={styles.masthead}><p className={styles.eyebrow}>Derek Monti <span>/</span> The journal</p><span>Premium travel, considered.</span></div>
          <div className={styles.heroGrid}>
            <h1 id="guides-page-title" data-reveal>Good journeys.<br /><span>Better questions.</span></h1>
            <div className={styles.heroAside} data-reveal><p>Practical frameworks for comparing premium itineraries without pretending that one airline, seat, or headline price fits every traveler.</p><a href="#guide-library">Explore the guides <ArrowDown size={17} aria-hidden="true" /></a></div>
          </div>
          <div className={styles.heroFooter}><span>Decision guides</span><p>For the details that shape the whole journey.</p></div>
        </div>
      </section>
      <section id="guide-library" className={styles.library} aria-labelledby="guide-list-title">
        <div className={`${styles.inner} ${styles.libraryLayout}`}>
          <aside className={styles.libraryIntro} data-reveal><p className={styles.eyebrow}>Current library</p><h2 id="guide-list-title">Start with<br />a real decision.</h2><p>Each guide has one purpose, an honest reading time based on its word count, and a request path that matches the topic.</p><span className={styles.libraryCount}>{String(blogPosts.length).padStart(2, '0')} guides to explore</span></aside>
          <div className={styles.list}>
            {blogPosts.map((post, index) => (
              <article key={post.slug} className={styles.guide} data-reveal>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <Link to={`/blog/${post.slug}`}><div className={styles.metadata}><span>{post.category}</span><span>{post.readTime}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className={styles.readLink}>Read the guide <ArrowRight aria-hidden="true" size={19} /></span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.standard} aria-labelledby="editorial-note-title"><div className={`${styles.inner} ${styles.standardLayout}`} data-reveal><p className={styles.eyebrow}>Editorial standard</p><div><h2 id="editorial-note-title">Facts that change need a source and a review date.</h2><p>These initial guides focus on durable decision frameworks. Schedule, aircraft, lounge, fare-rule, and airline-product claims are not published here without a maintainable source and factual review.</p></div></div></section>
      <section className={styles.final} aria-labelledby="journal-cta-title"><div className={`${styles.inner} ${styles.finalLayout}`}><div><p className={styles.eyebrow}>From reading to planning</p><h2 id="journal-cta-title">Your trip.<br />Personally considered.</h2></div><div className={styles.finalActions}><p>Share the itinerary, the fixed constraints, and the priorities you want Derek to weigh.</p><Link to="/#request-form">Request a personal review <ArrowRight aria-hidden="true" size={19} /></Link></div></div></section>
    </div>
  );
}
