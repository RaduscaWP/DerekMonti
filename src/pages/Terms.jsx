import { useRef } from 'react';
import { contactConfig } from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const LAST_UPDATED = 'May 25, 2026';

export default function Terms() {
  const pageRef = useRef(null);
  useDocumentMeta(
    'Terms of Service | Derek Monti',
    'The terms that apply when you request a flight quote or interact with Derek Monti.',
  );
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
            Derek Monti is an independent aviation advisor. The site does not sell tickets directly. Quote requests
            submitted through the form result in a personal reply from Derek with itinerary options sourced through
            licensed travel partners. Tickets, when issued, are issued by the operating airline or ticketing
            partner; the airline&apos;s fare rules apply.
          </p>

          <h2>Quotes are not bookings</h2>
          <p>
            Any pricing shown on the site or in a reply is a quote based on availability at the time. Fares change
            quickly. A quote becomes a confirmed booking only after the ticketing partner issues the ticket and the
            traveler completes payment.
          </p>

          <h2>Your responsibilities</h2>
          <ul>
            <li>Provide accurate trip details, passenger names, and contact information.</li>
            <li>Verify passport validity, visas, and any health or entry requirements for your route.</li>
            <li>Review fare rules, change fees, and cancellation conditions before paying for a ticket.</li>
            <li>Do not submit fraudulent requests, automated traffic, or third-party information without consent.</li>
          </ul>

          <h2>Cancellations, changes, and refunds</h2>
          <p>
            Changes and refunds follow the operating airline&apos;s fare rules and any consolidator partner
            conditions disclosed before booking. Derek will explain the relevant rules before any ticket is issued.
            Service fees, if any, will be disclosed in writing before payment.
          </p>

          <h2>No guarantee of savings</h2>
          <p>
            Sample savings shown on this site reflect comparable recent quotes and are illustrative. Actual savings
            depend on route, dates, cabin, inventory, and timing. No specific saving amount is guaranteed.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Content on this site, including text, layout, and imagery, is owned by Derek Monti or used under license
            from the original creators (for example, Unsplash and Pexels contributors). Do not reuse the content
            without permission.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, Derek Monti is not liable for indirect or consequential losses arising
            from use of the site or reliance on a quote, including travel disruption caused by airlines, weather,
            government action, or other third-party events. Mandatory consumer rights are unaffected.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws applicable at Derek Monti&apos;s place of business. Disputes that
            cannot be resolved informally will be resolved by the competent courts at that location, without
            limiting any mandatory consumer rights you have in your country of residence.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms as the service evolves. The &quot;last updated&quot; date at the top reflects
            the most recent version. Continued use of the site after a change means you accept the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions: <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
            <br />
            Phone: <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
