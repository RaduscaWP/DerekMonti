import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { contactConfig } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { useLocale } from '../i18n/useLocale.js';
import { legalDocuments, legalSourceMessages } from '../i18n/legalContent.js';
import styles from './Legal.module.scss';

export default function LegalDocument({ kind }) {
  const pageRef = useRef(null);
  const { locale, t, localePath } = useLocale();
  const document = legalDocuments[kind];
  const message = (key, values) => t(key, legalSourceMessages[key], values);
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' })
    .format(new Date(`${document.updated}T12:00:00Z`));
  usePageMotion(pageRef);

  return (
    <div className={`${styles.page} legacy-legal-page`} ref={pageRef}>
      <section className={`${styles.hero} legal-hero`} aria-labelledby={`${kind}-title`}>
        <div className={styles.inner} data-reveal data-reveal-y="18">
          <p className={styles.eyebrow}>{message('legal.label')} <span aria-hidden="true">/</span> {message(`legal.${kind}.label`)}</p>
          <h1 id={`${kind}-title`}>{message(`legal.${kind}.title`)}</h1>
          <div className={styles.meta}>
            <span>{message('legal.updated', { date: updated })}</span>
            <span>{message('legal.scope')}</span>
          </div>
        </div>
      </section>
      <section className={`${styles.document} legal-body`} aria-label={message(`legal.${kind}.contentLabel`)}>
        <div className={`${styles.inner} ${styles.documentInner}`}>
          <aside className={styles.contents} aria-label={message(`legal.${kind}.sectionLabel`)}>
            <p>{message('legal.contents')}</p>
            <nav>
              {document.sections.map((section, index) => <a href={`#${kind}-${section.id}`} key={section.id}><span>{String(index + 1).padStart(2, '0')}</span>{message(`legal.${kind}.${section.id}.nav`)}</a>)}
            </nav>
          </aside>
          <article className={`${styles.article} legal-body__article`}>
            <p className={styles.lead}>{message(`legal.${kind}.lead`)}</p>
            {document.sections.map((section) => {
              const prefix = `legal.${kind}.${section.id}`;
              return (
                <section aria-labelledby={`${kind}-${section.id}`} key={section.id}>
                  <h2 id={`${kind}-${section.id}`}>{message(`${prefix}.heading`)}</h2>
                  {section.items && <ul>{section.items.map((item) => <li key={item.id}>{item.prefix && <><strong>{message(`${prefix}.${item.id}.prefix`)}</strong>{' '}</>}{message(`${prefix}.${item.id}.text`)}</li>)}</ul>}
                  {section.body && <p>{message(`${prefix}.body`)}</p>}
                  {section.id === 'contact' && <p>{message(`legal.${kind}.contactIntro`)} <Link to={localePath('/#request-form')}>{message('legal.requestForm')}</Link> {message('legal.phoneJoin')} <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>.</p>}
                </section>
              );
            })}
          </article>
        </div>
      </section>
    </div>
  );
}
