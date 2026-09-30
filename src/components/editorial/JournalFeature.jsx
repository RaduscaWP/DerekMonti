import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/siteData.js';
import { articleVisuals } from '../../data/editorialData.js';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';
import styles from './JournalFeature.module.scss';

function JournalArticle({ post, featured = false, index = 0 }) {
  const visual = articleVisuals[post.slug];
  return (
    <article className={featured ? styles.featured : styles.secondary}>
      <Link className={styles.articleLink} to={`/blog/${post.slug}`}>
        <div className={styles.image}>
          <img src={visual.image} alt={visual.alt} loading="lazy" decoding="async" width="1400" height="1000" />
          <span className={styles.imageNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className={styles.articleCopy}>
          <div className={styles.metadata}><span>{post.category}</span><span>{post.readTime}</span></div>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <span className={styles.read}>Read the guide <ArrowRight size={19} aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}

export default function JournalFeature({
  posts = blogPosts,
  heading = 'Before the next departure.',
  eyebrow = 'The journal',
  showAllLink = true,
  id = 'journal-feature-title',
}) {
  const { reduced, motionReady } = useMotionPreference();
  const [featured, ...secondary] = posts;
  if (!featured) return null;
  return (
    <section className={styles.section} data-motion={motionReady && !reduced ? 'full' : 'reduced'} aria-labelledby={heading ? id : undefined} aria-label={heading ? undefined : 'Travel guides'}>
      {heading && <div className={styles.heading}>
        <div><p className={styles.eyebrow}>{eyebrow}</p><h2 id={id}>{heading}</h2></div>
        {showAllLink && <Link className={styles.allLink} to="/blog">Explore the journal <ArrowRight size={18} aria-hidden="true" /></Link>}
      </div>}
      <div className={styles.layout} data-count={posts.length}>
        <JournalArticle post={featured} featured />
        {secondary.length > 0 && <div className={styles.secondaryList}>{secondary.map((post, index) => <JournalArticle post={post} key={post.slug} index={index + 1} />)}</div>}
      </div>
    </section>
  );
}
