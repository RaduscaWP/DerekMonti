import { useRef } from 'react';
import { contactConfig } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const LAST_UPDATED = 'October 27, 2026';

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
            I am Derek Monti and I use this website to receive quote requests for business and first class flights.
            This notice explains what data the site handles, which services help deliver and protect a request, and
            what happens to your details when you decide to book.
          </p>

          <h2>What information I collect</h2>
          <ul>
            <li>
              <strong>Quote request data:</strong> trip type, origin and destination for each leg, travel dates,
              traveler count, cabin and flexibility preferences, your name, email, preferred contact method,
              optional phone or WhatsApp number, optional notes, and your acknowledgement of this notice.
            </li>
            <li>
              <strong>Technical data:</strong> normal request information such as IP address and browser headers can
              be processed by the hosting and security services below. Vercel Analytics records aggregate site usage.
            </li>
            <li>
              <strong>Local form state:</strong> the browser may keep the itinerary you typed in session storage so a
              page refresh does not lose it. Contact details and notes are not stored there by this site.
            </li>
            <li>
              <strong>Anti-abuse data:</strong> when configured, rate limiting uses an IP-derived key and Cloudflare
              Turnstile verifies a challenge token before submission.
            </li>
          </ul>

          <h2>Why I use it</h2>
          <ul>
            <li>
              <strong>To answer your request</strong> with real fares, using the contact method you selected.
            </li>
            <li>
              <strong>To deliver request and confirmation emails</strong> and keep a record of our conversation so I
              can follow up on your trip.
            </li>
            <li>
              <strong>To issue your ticket</strong> once you decide to book: I pass the passenger details the airline
              requires to {contactConfig.agency.name}, the {contactConfig.agency.accreditation} that issues the ticket,
              under its own privacy notice.
            </li>
            <li>
              <strong>To reduce spam and abuse</strong> through validation, a honeypot, rate limiting and optional
              human verification.
            </li>
            <li>
              <strong>To understand aggregate site use</strong> and improve the pages, without sending your contact
              details or notes to analytics.
            </li>
          </ul>

          <h2>Services used by the site</h2>
          <ul>
            <li>
              <strong>Resend</strong> &mdash; sends my notification and your confirmation email.
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
            <li>
              <strong>{contactConfig.agency.name}</strong> &mdash; issues tickets and receives passenger details only
              when you book.
            </li>
          </ul>
          <p>
            Each service processes data under its own terms and privacy notice. Their regions, account settings and
            retention controls depend on the production configuration.
          </p>

          <h2>How long I keep it</h2>
          <p>
            Email records of your requests stay in my inbox so I can follow up on your trip and on any booking made
            through it; you can ask me to delete them at any time, subject to records I must keep for a booking.
            Rate-limit windows last ten minutes. Browser session storage normally lasts for the tab session and can
            be cleared through browser controls.
          </p>

          <h2>Cookies</h2>
          <p>
            The site does not add advertising cookies. Hosting, analytics or anti-abuse services may process technical
            identifiers according to their current notices and the production configuration.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on the law that applies to you, you may have rights to ask about, correct or delete personal
            data and to object to or restrict some processing. Contact me using the options below and I will respond.
          </p>

          <h2>Security</h2>
          <p>
            Production hosting is configured for HTTPS and security headers. The form validates and sanitizes its
            payload, limits request size and applies anti-abuse controls. The site never asks for payment-card or
            passport data; those are collected only at ticketing, through the agency. No internet transmission or
            storage system can be promised as completely secure.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            I may update this policy as services change. The &quot;last updated&quot; date at the top shows the
            current version, and I will highlight material changes.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions: call or WhatsApp <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>,
            email <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>, or use the{' '}
            <a href="/#request-form">request form</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
