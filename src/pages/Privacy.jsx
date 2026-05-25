import { useRef } from 'react';
import { contactConfig } from '../data/siteData.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const LAST_UPDATED = 'May 25, 2026';

export default function Privacy() {
  const pageRef = useRef(null);
  useDocumentMeta(
    'Privacy Policy | Derek Monti',
    'How Derek Monti collects, uses, and protects the personal information of travelers using this site.',
  );
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
            Derek Monti ("Derek", "we", "I") operates this website to help travelers request business and first
            class flight quotes. This policy explains what personal information is collected, why, where it is sent,
            and the choices available to you.
          </p>

          <h2>Who is the data controller</h2>
          <p>
            Derek Monti is the data controller for personal information submitted through this site. Contact for
            privacy questions or data subject requests: <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>.
          </p>

          <h2>What information we collect</h2>
          <ul>
            <li>
              <strong>Quote request data:</strong> name, email, phone or WhatsApp number, origin, destination, travel
              dates, passenger count, cabin preference, optional notes, optional private code, and the support
              package selected.
            </li>
            <li>
              <strong>Technical data:</strong> IP address, user-agent, referring URL, and page-view metadata captured
              by hosting (Vercel) and our cookieless analytics provider (Vercel Analytics).
            </li>
            <li>
              <strong>Anti-abuse data:</strong> if the human-verification challenge is shown, Cloudflare Turnstile
              processes signals (IP, browser environment) to determine whether the visitor is a real person. No
              tracking cookies are set by Turnstile.
            </li>
          </ul>

          <h2>Why we use it (legal basis)</h2>
          <ul>
            <li>
              <strong>To respond to your quote request</strong> &mdash; pre-contractual measures at your request
              (GDPR Art. 6(1)(b)).
            </li>
            <li>
              <strong>To follow up by email, phone, or WhatsApp</strong> &mdash; legitimate interest in responding to
              inquiries we receive (GDPR Art. 6(1)(f)).
            </li>
            <li>
              <strong>To prevent abuse, spam, and credential stuffing</strong> &mdash; legitimate interest in service
              integrity (GDPR Art. 6(1)(f)).
            </li>
            <li>
              <strong>Aggregate analytics</strong> &mdash; legitimate interest in improving the site (GDPR Art.
              6(1)(f)).
            </li>
          </ul>

          <h2>Who processes your data (sub-processors)</h2>
          <ul>
            <li>
              <strong>Resend</strong> (United States) &mdash; transactional email delivery. Quote details are sent to
              Resend so the confirmation email and lead notification can be delivered.
            </li>
            <li>
              <strong>Vercel</strong> (United States, with EU edge regions) &mdash; site hosting and aggregate
              analytics.
            </li>
            <li>
              <strong>Cloudflare</strong> (global) &mdash; Turnstile human-verification challenge on the quote form.
            </li>
            <li>
              <strong>Upstash</strong> (United States) &mdash; ephemeral rate-limit counters keyed by IP address,
              with a short time-to-live, to prevent abuse.
            </li>
          </ul>
          <p>
            Transfers outside the European Economic Area rely on Standard Contractual Clauses or equivalent
            safeguards provided by these vendors.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Quote request emails are retained in Derek&apos;s inbox for as long as the request is reasonably active,
            and archived for up to 24 months for follow-up and record-keeping. Rate-limit counters expire within 10
            minutes. Aggregate analytics are retained according to Vercel&apos;s defaults. You may request earlier
            deletion at any time.
          </p>

          <h2>Cookies</h2>
          <p>
            This site does not set tracking cookies. Vercel Analytics is cookieless. Cloudflare Turnstile may set
            short-lived cookies strictly necessary to run the challenge; these are not used for tracking.
          </p>

          <h2>Your rights</h2>
          <p>
            Under applicable data protection law (including GDPR for EEA visitors and equivalent regimes), you have
            the right to access, correct, delete, restrict, or port your personal data, and to object to processing
            based on legitimate interest. To exercise these rights, write to{' '}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>. EEA visitors also have the right to
            lodge a complaint with their national supervisory authority.
          </p>

          <h2>Security</h2>
          <p>
            Connections to this site use HTTPS. The site enforces strict transport security, a strict
            Content-Security-Policy, and uses sub-resource fonts hosted on its own origin to avoid third-party
            tracking. Email delivery uses authenticated transport. No payment data is collected on this site.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as services change. The &quot;last updated&quot; date at the top reflects the
            most recent version. Material changes will be highlighted.
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
