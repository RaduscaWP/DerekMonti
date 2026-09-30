import { useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import { useMotionPreference } from '../context/MotionPreferenceProvider.jsx';
import JournalFeature from '../components/editorial/JournalFeature.jsx';
import styles from './Blog.module.scss';

export default function Blog() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);
  const { markConversionSource } = useTripBrief();
  const { reduced, motionReady } = useMotionPreference();
  const [category, setCategory] = useState('all');
  const categories = useMemo(() => [...new Set(blogPosts.map((post) => post.category))], []);
  const visiblePosts = category === 'all' ? blogPosts : blogPosts.filter((post) => post.category === category);
  return (
    <div ref={pageRef} className={styles.page} data-motion={motionReady && !reduced ? 'full' : 'reduced'}>
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
        <div className={`${styles.inner} ${styles.libraryHeader}`}>
          <div><p className={styles.eyebrow}>A considered departure</p><h2 id="guide-list-title">Read before you go.</h2></div>
          <p>Cabin choices, better comparisons, and a clear plan when time is short.</p>
        </div>
        <div className={`${styles.inner} ${styles.filterBar}`}>
          <div className={styles.filters} role="group" aria-label="Filter guides by topic">
            <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>All guides <span>{blogPosts.length}</span></button>
            {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{blogPosts.filter((post) => post.category === item).length}</span></button>)}
          </div>
          <p className={styles.resultCount} aria-live="polite" aria-atomic="true">{visiblePosts.length} {visiblePosts.length === 1 ? 'guide' : 'guides'}</p>
        </div>
        <div key={category} className={styles.guideSelection}><JournalFeature posts={visiblePosts} heading={null} showAllLink={false} /></div>
        <p className={`${styles.inner} ${styles.editorialNote}`}>Flight details, availability, and ticket conditions depend on your actual itinerary.</p>
      </section>
      <section className={styles.final} aria-labelledby="journal-cta-title"><div className={`${styles.inner} ${styles.finalLayout}`}><div><p className={styles.eyebrow}>A conversation with Derek</p><h2 id="journal-cta-title">Let's talk about<br />your next journey.</h2></div><div className={styles.finalActions}><p>Bring your route, dates, and the details that matter to you. Derek considers them together.</p><Link to="/#request-form" onClick={() => markConversionSource('blog')}>Start your trip brief <ArrowRight aria-hidden="true" size={19} /></Link></div></div></section>
    </div>
  );
}
