import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../data/siteData.js';
import NotFound from './NotFound.jsx';
import styles from './BlogArticle.module.scss';

export default function BlogArticle() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return <NotFound />;
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  return (
    <div className={styles.page}>
      <header className={styles.header}><div className={styles.inner}>
        <Link to="/blog" className={styles.back}><ArrowLeft aria-hidden="true" size={17} /> All guides</Link>
        <div className={styles.headerGrid}><div><p className={styles.eyebrow}>{post.category}</p><h1>{post.title}</h1></div><div className={styles.headerNote}><span>Derek Monti / The journal</span><p>A framework for the decisions behind your next journey.</p></div></div>
        <div className={styles.meta}><span><Clock3 aria-hidden="true" size={15} /> {post.readTime}</span><span>{post.wordCount.toLocaleString('en-US')} words</span><span>Decision guide</span></div>
      </div></header>
      <div className={styles.reading}><div className={`${styles.inner} ${styles.readingLayout}`}>
        <aside className={styles.rail}>
          <nav aria-label="In this guide"><p className={styles.eyebrow}>In this guide</p><ol>{post.sections.map((section, index) => <li key={section.heading}><a href={`#guide-section-${index + 1}`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.heading}</a></li>)}</ol></nav>
          <Link className={styles.railQuote} to="/#request-form"><span>Apply this to your trip</span><strong>Request a personal review</strong><ArrowRight aria-hidden="true" size={18} /></Link>
        </aside>
        <article className={styles.content}>
          <p className={styles.lead}>{post.excerpt}</p>
          {post.sections.map((section, index) => (
            <section id={`guide-section-${index + 1}`} key={section.heading} aria-labelledby={`guide-heading-${index + 1}`}>
              <span className={styles.sectionNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h2 id={`guide-heading-${index + 1}`}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets?.length > 0 && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <aside className={styles.caveat}><strong>A note before you book</strong><p>This guide is general decision support, not live fare or inventory information. A real itinerary must be checked against its current cabin, availability, and ticket conditions.</p></aside>
        </article>
      </div></div>
      <section className={styles.related} aria-labelledby="related-guides-title"><div className={`${styles.inner} ${styles.relatedLayout}`}><div><p className={styles.eyebrow}>Continue reading</p><h2 id="related-guides-title">Another angle<br />on your journey.</h2></div><div className={styles.relatedList}>{related.map((item) => <Link to={`/blog/${item.slug}`} key={item.slug}><span>{item.category} · {item.readTime}</span><h3>{item.title}</h3><ArrowRight aria-hidden="true" size={20} /></Link>)}</div></div></section>
      <section className={styles.final} aria-labelledby="article-cta-title"><div className={`${styles.inner} ${styles.finalLayout}`}><div><p className={styles.eyebrow}>The next step</p><h2 id="article-cta-title">Turn the framework<br />into a trip brief.</h2><p>Send the route, dates, flexibility, and the tradeoffs that matter most to you.</p></div><Link to="/#request-form">Request a personal review <ArrowRight aria-hidden="true" size={19} /></Link></div></section>
    </div>
  );
}
