import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Legal.module.scss';

const nextRoutes = [
  ['Services', '/services', 'See how Derek reviews a premium itinerary.'],
  ['About Derek', '/about', 'Meet the person behind the conversation.'],
  ['Journal', '/blog', 'Read practical premium-travel guides.'],
];

export default function NotFound() {
  return (
    <div className={`${styles.page} ${styles.notFound}`}>
      <section className={styles.notFoundHero} aria-labelledby="not-found-title">
        <span className={styles.routeNumber} aria-hidden="true">404</span>
        <div className={styles.inner}>
          <div className={styles.notFoundCopy}>
            <p className={styles.eyebrow}>Route unavailable</p>
            <h1 id="not-found-title">This route<br />ends here.</h1>
            <p>The page may have moved or the address may be incomplete. Choose a useful next direction below.</p>
            <div className={styles.notFoundActions}>
              <Link to="/">Return home <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link to="/#request-form">Plan my trip</Link>
            </div>
          </div>

          <nav className={styles.routeList} aria-label="Continue exploring">
            {nextRoutes.map(([label, to, description], index) => (
              <Link to={to} key={to}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{label}</strong><small>{description}</small></div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
