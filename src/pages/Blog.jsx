import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../components/common/Button.jsx';
import { blogPosts, imagery } from '../data/siteData.js';
import { articleVisuals } from '../data/editorialData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { useMotionPreference } from '../context/MotionPreferenceProvider.jsx';
import { useTripBrief } from '../context/TripBriefProvider.jsx';
import styles from './Blog.module.scss';

const categories = ['All', ...new Set(blogPosts.map((post) => post.category))];
const postImage = (post) => post.image || articleVisuals[post.slug]?.image || imagery.cabin;

function Guide({ post, index }) {
  return <article className={styles.guide}><Link to={`/blog/${post.slug}`}><div className={styles.guideImage}><img src={postImage(post)} alt={articleVisuals[post.slug]?.alt || ''} width="1800" height="1100" loading="lazy" decoding="async" /></div><div className={styles.guideMeta}><span>{post.category}</span><span>{post.readTime}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className={styles.guideAction}>Read guide <ArrowUpRight size={18} aria-hidden="true" /></span></Link></article>;
}

export default function Blog() {
  const [category, setCategory] = useState('All');
  const pageRef = useRef(null);
  const selectionRef = useRef(null);
  const { reduced, motionReady } = useMotionPreference();
  const { markConversionSource } = useTripBrief();
  const posts = useMemo(() => category === 'All' ? blogPosts : blogPosts.filter((post) => post.category === category), [category]);
  const featured = posts[0];
  usePageMotion(pageRef);
  useEffect(() => {
    if (reduced || !motionReady || !selectionRef.current) return undefined;
    const context = gsap.context(() => gsap.fromTo(selectionRef.current, { opacity:.35, y:12 }, { opacity:1, y:0, duration:.3, ease:'power2.out' }), selectionRef);
    return () => context.revert();
  }, [category, reduced, motionReady]);
  return (
    <div className={styles.page} ref={pageRef}>
      <section className={styles.journal} aria-labelledby="journal-title"><div className={styles.inner}>
        <div className={styles.masthead} data-reveal><p className={styles.lightEyebrow}>Fly with Derek · Journal</p><span>Premium travel, in perspective</span></div>
        <div className={styles.opening} data-reveal><h1 id="journal-title">The journey,<br /><span>considered.</span></h1><p>Practical notes on the cabin, the connections and the details worth knowing before you choose.</p></div>
        <div className={styles.filters} role="group" aria-label="Journal categories">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}<span className={styles.count} aria-live="polite">{posts.length} {posts.length === 1 ? 'guide' : 'guides'}</span></div>
        <div ref={selectionRef}>
          {featured && <article className={styles.feature}><Link className={styles.featureImage} to={`/blog/${featured.slug}`} tabIndex={-1} aria-hidden="true"><img src={postImage(featured)} alt="" width="1800" height="1100" fetchpriority="high" decoding="async" /></Link><div className={styles.featureCopy}><div className={styles.featureMeta}><span>Selected reading</span><span>{featured.readTime}</span></div><p className={styles.featureCategory}>{featured.category}</p><h2><Link to={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Link className={styles.readLink} to={`/blog/${featured.slug}`}>Read the guide <ArrowRight size={20} aria-hidden="true" /></Link></div></article>}
          {posts.length > 1 && <div className={styles.moreGuides}><header><p className={styles.eyebrow}>Keep reading</p><h2>Another part of the journey.</h2></header><div className={styles.guideGrid}>{posts.slice(1).map((post, index) => <Guide key={post.slug} post={post} index={index} />)}</div></div>}
          {!posts.length && <p className={styles.empty} role="status">No guides in this category yet. Choose another category to continue reading.</p>}
        </div>
        <p className={styles.editorialNote}>General planning guidance. Flight products, availability and ticket conditions must be checked for your individual dates.</p>
      </div></section>
      <section className={styles.final} id="contact"><div className={`${styles.inner} ${styles.finalGrid}`} data-reveal><div><p className={styles.lightEyebrow}>From reading to planning</p><h2>Put your own journey in view.</h2><p>Send Derek your route, dates and the priorities behind your trip.</p></div><Button to="/#request-form" onClick={() => markConversionSource('blog')}>Plan my trip</Button></div></section>
    </div>
  );
}
