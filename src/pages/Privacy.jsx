import { useRef } from 'react';
import { contactConfig } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const LAST_UPDATED = 'August 31, 2026';

export default function Privacy() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy Policy</h1>
          <p>Last updated {LAST_UPDATED}.</p>
        </div>
      </section>

      <section className="legal-body">
        <div className="container legal-body__inner" data-reveal>
          <p>
            Fly with Derek uses this website to receive requests for personal review of premium-flight itineraries.
            This notice describes the data handled by the current site implementation and the services used to
            deliver and protect a request.
          </p>

          <h2>What information we collect</h2>
          <ul>
            <li>
              <strong>Quote request data:</strong> trip type, origin and destination for each leg, travel dates,
              traveler count, cabin and flexibility preferences, name, email, preferred contact method, optional
              phone or WhatsApp number, optional notes, and privacy acknowledgement.
            </li>
            <li>
              <strong>Technical data:</strong> normal request information such as IP address and browser headers can
              be processed by hosting and security services. Vercel Analytics is present for aggregate site usage.
            </li>
            <li>
              <strong>Local form state:</strong> the browser may keep itinerary structure and travel preferences in
              session storage so a page refresh is less disruptive. Contact details, notes, and acknowledgement are
              not stored there by this site.
            </li>
            <li>
              <strong>Anti-abuse data:</strong> when configured, rate limiting uses an IP-derived key and Cloudflare
              Turnstile verifies a challenge token before submission.
            </li>
          </ul>

          <h2>Why we use it</h2>
          <ul>
            <li>
              <strong>To review and respond to your request</strong> using the contact method you select.
            </li>
            <li>
              <strong>To deliver request and confirmation emails</strong> and preserve an operational record of the
              conversation.
            </li>
            <li>
              <strong>To reduce spam and abuse</strong> through validation, a honeypot, rate limiting, and optional
              human verification.
            </li>
            <li>
              <strong>To understand aggregate site use</strong> and improve the experience without intentionally
              sending form contact details or notes to analytics.
            </li>
          </ul>

          <h2>Services used by the site</h2>
          <ul>
            <li>
              <strong>Resend</strong> &mdash; sends the advisor notification and customer confirmation email.
            </li>
            <li>
              <strong>Vercel</strong> &mdash; hosts the site and provides aggregate analytics.
            </li>
            <li>
              <strong>Cloudflare Turnstile</strong> &mdash; verifies the form when the integration is configured.
            </li>
            <li>
              <strong>Upstash Redis</strong> &mdash; stores short-lived rate-limit counters when configured; otherwise
              the API uses an in-memory fallback.
            </li>
          </ul>
          <p>
            Each service processes data under its own terms and privacy notice. Their deployment regions, account
            settings, and retention controls can vary with the production configuration.
          </p>

          <h2>How long we keep it</h2>
          <p>
            The site code does not define the retention period for delivered email or provider account records.
            Rate-limit windows are configured for ten minutes. Browser session storage normally lasts for the tab
            session and can be cleared through browser controls. Provider retention follows the production account
            settings and applicable requirements.
          </p>

          <h2>Cookies</h2>
          <p>
            The application code does not add advertising cookies. Hosting, analytics, or anti-abuse services may
            process technical identifiers according to their current notices and the production configuration.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on the law that applies to you, you may have rights to ask about, correct, or delete personal
            data and to object to or restrict some processing. Use the contact options below to make a request.
          </p>

          <h2>Security</h2>
          <p>
            Production hosting is configured for HTTPS and security headers. The form validates and sanitizes its
            payload, limits request size, and applies anti-abuse controls. The site does not request payment-card or
            passport data. No internet transmission or storage system can be promised as completely secure.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as services change. The &quot;last updated&quot; date at the top reflects the
            most recent version. Material changes will be highlighted.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions can be sent through the <a href="/#request-form">request form</a> or discussed by
            phone at <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
