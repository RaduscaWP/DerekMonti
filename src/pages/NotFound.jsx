import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/useLocale.js';
import styles from './Legal.module.scss';

const nextRoutes = [
  ['services', 'Services', '/services', 'See how Derek reviews a premium itinerary.'],
  ['about', 'About Derek', '/about', 'Meet the person behind the conversation.'],
  ['blog', 'Journal', '/blog', 'Read practical premium-travel guides.'],
];

export default function NotFound() {
  const { t, localePath, locale } = useLocale();
  return (
    <div className={`${styles.page} ${styles.notFound}`}>
      <section className={styles.notFoundHero} aria-labelledby="not-found-title">
        <span className={styles.routeNumber} aria-hidden="true">404</span>
        <div className={styles.inner}>
          <div className={styles.notFoundCopy}>
            <p className={styles.eyebrow}>{t('notFound.eyebrow', 'Route unavailable')}</p>
            <h1 id="not-found-title">{t('notFound.title', 'This route ends here.')}</h1>
            <p>{t('notFound.body', 'The page may have moved or the address may be incomplete. Choose a useful next direction below.')}</p>
            <div className={styles.notFoundActions}><Link to={localePath('/')}>{t('notFound.home', 'Return home')} <ArrowRight size={18} aria-hidden="true" /></Link><Link to={localePath('/#request-form')}>{t('common.planTrip', 'Plan my trip')}</Link></div>
          </div>
          <nav className={styles.routeList} aria-label={t('notFound.routes', 'Continue exploring')}>{nextRoutes.map(([id, label, to, description], index) => <Link to={localePath(to)} key={to}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{t(`notFound.${id}`, label)}{id === 'blog' && locale !== 'en' ? ' (English)' : ''}</strong><small>{t(`notFound.${id}Body`, description)}</small></div><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</nav>
        </div>
      </section>
    </div>
  );
}
