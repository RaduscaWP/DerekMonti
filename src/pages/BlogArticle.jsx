import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import { blogPosts, imagery } from '../data/siteData.js';
import { articleVisuals } from '../data/editorialData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import NotFound from './NotFound.jsx';
import styles from './BlogArticle.module.scss';

export default function BlogArticle() {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const { markConversionSource } = useTripBrief();
  const post = blogPosts.find((item) => item.slug === slug);
  usePageMotion(pageRef);
  if (!post) return <NotFound />;
  const image = post.image || articleVisuals[post.slug]?.image || imagery.cabin;
  const sections = post.sections || post.body || [];
  const related = blogPosts.filter((item) => item.slug !== slug);
  return (
    <div className={styles.page} ref={pageRef}>
      <header className={styles.hero}><div className={styles.inner}><div className={styles.heroTop}><Link to="/blog"><ArrowLeft size={16} aria-hidden="true" />The journal</Link><span>{post.category}</span></div><h1 data-reveal data-reveal-y="18">{post.title}</h1><div className={styles.articleMeta}><span>Fly with Derek · Planning guide</span><span>{post.date ? `${post.date} · ` : ''}{post.readTime}</span></div></div></header>
      <figure className={styles.openingImage}><img src={image} alt={articleVisuals[post.slug]?.alt || ''} width="1800" height="1100" fetchpriority="high" decoding="async" /></figure>
      <section className={styles.reading}><div className={`${styles.inner} ${styles.readingGrid}`}>
        <aside className={styles.contents} aria-label="In this guide"><p>In this guide</p><nav>{sections.map((section, index) => <a key={section.heading} href={`#article-section-${index}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.heading}</a>)}</nav><Link className={styles.contentsAction} to="/#request-form" onClick={() => markConversionSource('blog')}>Discuss your journey <ArrowUpRight size={17} aria-hidden="true" /></Link></aside>
        <article className={styles.articleBody}><p className={styles.lead}>{post.excerpt}</p>{sections.map((section, index) => <section key={section.heading} aria-labelledby={`article-section-${index}`}><h2 id={`article-section-${index}`}>{section.heading}</h2>{(section.paragraphs || (section.text ? [section.text] : [])).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets?.length > 0 && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<div className={styles.articleNote}><p>General planning guidance</p><span>Check current airline information and the written conditions of your individual quote. This guide does not establish availability, a specific flight product or a ticket price.</span></div><Link className={styles.backToJournal} to="/blog"><ArrowLeft size={17} aria-hidden="true" />Back to the journal</Link></article>
      </div></section>
      <section className={styles.related} aria-labelledby="article-related-title"><div className={styles.inner}><header><p className={styles.eyebrow}>Keep reading</p><h2 id="article-related-title">Another angle on your trip.</h2></header><div className={styles.relatedGrid}>{related.map((item) => <Link to={`/blog/${item.slug}`} key={item.slug}><img src={item.image || articleVisuals[item.slug]?.image || imagery.cabin} alt="" width="1800" height="1100" loading="lazy" decoding="async" /><div><span>{item.category} · {item.readTime}</span><h3>{item.title}</h3><p>Read the guide <ArrowRight size={17} aria-hidden="true" /></p></div></Link>)}</div></div></section>
      <section className={styles.final} id="contact"><div className={`${styles.inner} ${styles.finalGrid}`} data-reveal><div><p className={styles.lightEyebrow}>Your itinerary, personally</p><h2>Have a route in mind?</h2><p>Share your travel dates, cabin preferences and priorities with Derek.</p></div><Button to="/#request-form" onClick={() => markConversionSource('blog')}>Plan my trip</Button></div></section>
    </div>
  );
}
