import { useRef } from 'react';
import { contactConfig } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const LAST_UPDATED = 'August 31, 2026';

export default function Terms() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">Terms</p>
          <h1>Terms of Service</h1>
          <p>Last updated {LAST_UPDATED}.</p>
        </div>
      </section>

      <section className="legal-body">
        <div className="container legal-body__inner" data-reveal>
          <p>
            These terms apply to your use of this website and any quote request you submit. By using the site, you
            accept these terms. If you do not agree, please do not use the site.
          </p>

          <h2>Nature of the service</h2>
          <p>
            Fly with Derek is an independent request and guidance website. It does not display live inventory, take
            payment, issue tickets, or represent an airline. A submitted request gives Derek information to review;
            it does not create a booking, agency relationship, seat hold, or promise of a particular outcome.
          </p>

          <h2>Quotes are not bookings</h2>
          <p>
            The site does not show live prices or availability. If an itinerary or price is later discussed, its
            provider, availability, conditions, payment process, and confirmation status must be reviewed separately.
            Nothing is confirmed merely because you submit this form or receive an initial message.
          </p>

          <h2>Your responsibilities</h2>
          <ul>
            <li>Provide accurate trip details, passenger names, and contact information.</li>
            <li>Verify passports, visas, health rules, and entry requirements with current official sources.</li>
            <li>Review the issuing party, fare rules, fees, change terms, and cancellation conditions before paying.</li>
            <li>Do not submit fraudulent requests, automated traffic, or third-party information without consent.</li>
          </ul>

          <h2>Cancellations, changes, and refunds</h2>
          <p>
            This website does not set ticket change, cancellation, or refund rules. Those terms depend on the actual
            ticket and issuing party. Review the complete written conditions before proceeding with any purchase.
          </p>

          <h2>No guarantee of price or availability</h2>
          <p>
            No particular price, saving, cabin, schedule, aircraft, route, or availability is promised. Airline
            products and operating details can change, so current information must be checked before a decision.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Do not reproduce or commercially reuse site content beyond uses permitted by applicable law without
            first obtaining permission from the relevant rights holder.
          </p>

          <h2>General information</h2>
          <p>
            Guides on this site are general planning information, not legal, immigration, safety, or financial
            advice. Use current airline and government sources for decisions that depend on changing rules. Nothing
            in these terms limits rights that cannot lawfully be limited.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms as the service evolves. The &quot;last updated&quot; date at the top reflects
            the most recent version. Continued use of the site after a change means you accept the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions can be sent through the <a href="/#request-form">request form</a> or discussed by phone at{' '}
            <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
