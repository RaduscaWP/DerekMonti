import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { contactConfig } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import styles from './Legal.module.scss';

const LAST_UPDATED = 'August 31, 2026';
const contents = [
  ['service', 'Nature of the service'],
  ['quotes', 'Quotes are not bookings'],
  ['responsibilities', 'Your responsibilities'],
  ['changes-refunds', 'Changes and refunds'],
  ['availability', 'Price and availability'],
  ['property', 'Intellectual property'],
  ['information', 'General information'],
  ['updates', 'Changes'],
  ['contact', 'Contact'],
];

export default function Terms() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);

  return (
    <div className={styles.page} ref={pageRef}>
      <section className={styles.hero} aria-labelledby="terms-title">
        <div className={styles.inner} data-reveal data-reveal-y="18">
          <p className={styles.eyebrow}>Legal <span aria-hidden="true">/</span> Terms</p>
          <h1 id="terms-title">Terms of Service</h1>
          <div className={styles.meta}>
            <span>Last updated {LAST_UPDATED}</span>
            <span>Website and trip requests</span>
          </div>
        </div>
      </section>

      <section className={styles.document} aria-label="Terms of Service content">
        <div className={`${styles.inner} ${styles.documentInner}`}>
          <aside className={styles.contents} aria-label="Terms of Service sections">
            <p>On this page</p>
            <nav>
              {contents.map(([id, label], index) => (
                <a href={`#terms-${id}`} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>
              ))}
            </nav>
          </aside>

          <article className={styles.article}>
            <p className={styles.lead}>These terms apply to your use of this website and any quote request you submit. By using the site, you accept these terms. If you do not agree, please do not use the site.</p>

            <section aria-labelledby="terms-service">
              <h2 id="terms-service">Nature of the service</h2>
              <p>Fly with Derek is an independent request and guidance website. It does not display live inventory, take payment, issue tickets, or represent an airline. A submitted request gives Derek information to review; it does not create a booking, agency relationship, seat hold, or promise of a particular outcome.</p>
            </section>

            <section aria-labelledby="terms-quotes">
              <h2 id="terms-quotes">Quotes are not bookings</h2>
              <p>The site does not show live prices or availability. If an itinerary or price is later discussed, its provider, availability, conditions, payment process, and confirmation status must be reviewed separately. Nothing is confirmed merely because you submit this form or receive an initial message.</p>
            </section>

            <section aria-labelledby="terms-responsibilities">
              <h2 id="terms-responsibilities">Your responsibilities</h2>
              <ul>
                <li>Provide accurate trip details, passenger names, and contact information.</li>
                <li>Verify passports, visas, health rules, and entry requirements with current official sources.</li>
                <li>Review the issuing party, fare rules, fees, change terms, and cancellation conditions before paying.</li>
                <li>Do not submit fraudulent requests, automated traffic, or third-party information without consent.</li>
              </ul>
            </section>

            <section aria-labelledby="terms-changes-refunds">
              <h2 id="terms-changes-refunds">Cancellations, changes, and refunds</h2>
              <p>This website does not set ticket change, cancellation, or refund rules. Those terms depend on the actual ticket and issuing party. Review the complete written conditions before proceeding with any purchase.</p>
            </section>

            <section aria-labelledby="terms-availability">
              <h2 id="terms-availability">No guarantee of price or availability</h2>
              <p>No particular price, saving, cabin, schedule, aircraft, route, or availability is promised. Airline products and operating details can change, so current information must be checked before a decision.</p>
            </section>

            <section aria-labelledby="terms-property">
              <h2 id="terms-property">Intellectual property</h2>
              <p>Do not reproduce or commercially reuse site content beyond uses permitted by applicable law without first obtaining permission from the relevant rights holder.</p>
            </section>

            <section aria-labelledby="terms-information">
              <h2 id="terms-information">General information</h2>
              <p>Guides on this site are general planning information, not legal, immigration, safety, or financial advice. Use current airline and government sources for decisions that depend on changing rules. Nothing in these terms limits rights that cannot lawfully be limited.</p>
            </section>

            <section aria-labelledby="terms-updates">
              <h2 id="terms-updates">Changes</h2>
              <p>We may update these terms as the service evolves. The &quot;last updated&quot; date at the top reflects the most recent version. Continued use of the site after a change means you accept the updated terms.</p>
            </section>

            <section aria-labelledby="terms-contact">
              <h2 id="terms-contact">Contact</h2>
              <p>Questions can be sent through the <Link to="/#request-form">request form</Link> or discussed by phone at <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>.</p>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}
