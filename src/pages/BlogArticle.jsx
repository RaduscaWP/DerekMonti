import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../data/siteData.js';
import { articleVisuals } from '../data/editorialData.js';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../context/MotionPreferenceProvider.jsx';
import NotFound from './NotFound.jsx';
import styles from './BlogArticle.module.scss';

const guideContexts = {
  'why-travelers-overpay-business-class': { title: 'Bring the comparison into focus.', body: 'Share your route, dates, and the tradeoffs you want Derek to consider.' },
  'business-class-service-beyond-seat': { title: 'What matters on your journey?', body: 'Rest, time to work, or a considered arrival. Tell Derek what you want the itinerary to make possible.' },
  'last-minute-business-class': { title: 'Start with what cannot move.', body: 'Share the earliest possible departure, latest acceptable arrival, and any workable alternatives.' },
};

export default function BlogArticle() {
  const { slug } = useParams();
  const [contentsOpen, setContentsOpen] = useState(true);
  useEffect(() => { if (window.matchMedia('(max-width: 800px)').matches) setContentsOpen(false); }, []);
  const { trip, markConversionSource } = useTripBrief();
  const { reduced, motionReady } = useMotionPreference();
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return <NotFound />;
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const visual = articleVisuals[post.slug];
  const context = guideContexts[post.slug];
  const markBlog = () => markConversionSource('blog');
  const firstLeg = trip.tripType === 'multi_city' ? trip.legs[0] : trip;
  const hasRoute = firstLeg.from.trim() && firstLeg.to.trim();
  return (
    <div className={styles.page} data-motion={motionReady && !reduced ? 'full' : 'reduced'}>
      <header className={styles.header}><div className={styles.inner}>
        <Link to="/blog" className={styles.back}><ArrowLeft aria-hidden="true" size={17} /> All guides</Link>
        <div className={styles.headerGrid}><div><p className={styles.eyebrow}>{post.category}</p><h1>{post.title}</h1></div><div className={styles.headerNote}><span>Derek Monti / The journal</span><p>A framework for the decisions behind your next journey.</p></div></div>
        <div className={styles.meta}><span><Clock3 aria-hidden="true" size={15} /> {post.readTime}</span><span>{post.wordCount.toLocaleString('en-US')} words</span><span>Decision guide</span></div>
      </div></header>
      <figure className={styles.openingImage}>
        <img src={visual.image} alt={visual.alt} width="1400" height="1000" loading="lazy" decoding="async" />
        <figcaption>{post.slug === 'business-class-service-beyond-seat' ? 'Illustrative cabin. The product on your flight may differ.' : visual.alt}</figcaption>
      </figure>
      <div className={styles.reading}><div className={`${styles.inner} ${styles.readingLayout}`}>
        <aside className={styles.rail}>
          <nav aria-label="In this guide"><details className={styles.contentsDisclosure} open={contentsOpen} onToggle={event => setContentsOpen(event.currentTarget.open)}><summary className={styles.contentsHeading}><p className={styles.eyebrow}>In this guide</p><span className={styles.contentsAction}>Sections<span aria-hidden="true" /></span></summary><ol id="guide-contents" className={styles.contentsList}>{post.sections.map((section, index) => <li key={section.heading}><a href={`#guide-section-${index + 1}`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.heading}</a></li>)}</ol></details></nav>
          <div className={styles.briefContext}>
            <p className={styles.eyebrow}>Your next journey</p>
            <h2>{context.title}</h2><p>{context.body}</p>
            {hasRoute && <p className={styles.savedRoute}><span>Your trip brief</span>{firstLeg.from} <ArrowRight size={14} aria-label="to" role="img" /> {firstLeg.to}</p>}
            <Link className={styles.railQuote} to="/#request-form" onClick={markBlog}>{hasRoute ? 'Continue your trip brief' : 'Start your trip brief'}<ArrowRight aria-hidden="true" size={18} /></Link>
          </div>
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
      <section className={styles.related} aria-labelledby="related-guides-title"><div className={styles.inner}>
        <div className={styles.relatedHeader}><div><p className={styles.eyebrow}>Continue reading</p><h2 id="related-guides-title">Consider another angle.</h2></div><Link to="/blog">All guides <ArrowRight size={18} aria-hidden="true" /></Link></div>
        <div className={styles.relatedList}>{related.map((item) => <article key={item.slug}><Link to={`/blog/${item.slug}`}><div className={styles.relatedImage}><img src={articleVisuals[item.slug].image} alt={articleVisuals[item.slug].alt} width="1400" height="1000" loading="lazy" decoding="async" /></div><div className={styles.relatedCopy}><span>{item.category} · {item.readTime}</span><h3>{item.title}</h3><span className={styles.relatedRead}>Read the guide <ArrowRight aria-hidden="true" size={20} /></span></div></Link></article>)}</div>
      </div></section>
      <section className={styles.final} aria-labelledby="article-cta-title"><div className={`${styles.inner} ${styles.finalLayout}`}><h2 id="article-cta-title">Your priorities.<br />A journey to suit them.</h2><Link to="/#request-form" onClick={markBlog}>Talk through your trip <ArrowRight aria-hidden="true" size={19} /></Link></div></section>
    </div>
  );
}
