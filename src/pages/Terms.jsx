import { useRef } from 'react';
import { contactConfig } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const LAST_UPDATED = 'October 27, 2026';

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
            These terms apply to your use of flywithderek.com and to any quote request you send me through it. By
            using the site you accept them. If you do not agree, please do not use the site.
          </p>

          <h2>Who I am and how tickets are issued</h2>
          <p>
            I am Derek Monti, a personal flight advisor based in {contactConfig.location}. I am affiliated with{' '}
            {contactConfig.agency.name}, an {contactConfig.agency.accreditation}. When you decide to book, the ticket
            is issued through the agency and the airline&rsquo;s own fare rules apply to it. This website itself does
            not display live inventory, take payment or issue tickets.
          </p>

          <h2>Quotes</h2>
          <p>
            A quote request is free and does not commit you to anything. It gives me the route, dates, cabin and
            traveler details I need to search for fares. The prices I quote are real fares available at the time I
            send them; fares change, sometimes within hours, and a fare is only secured once I confirm it with you
            in writing and the ticket is issued. Example fares shown on this site come from recent quotes and are
            labelled as such; they are not an offer at that price.
          </p>

          <h2>Your responsibilities</h2>
          <ul>
            <li>Give me accurate passenger names exactly as they appear in the passport, plus correct contact details.</li>
            <li>
              Check passport validity, visas, health and entry rules with official sources. I flag what I know, but
              the responsibility stays with you.
            </li>
            <li>Read the fare rules, fees, change and cancellation conditions I send before paying.</li>
            <li>Do not send fraudulent requests, automated traffic or someone else&rsquo;s details without their consent.</li>
          </ul>

          <h2>Changes, cancellations and refunds</h2>
          <p>
            Change and refund rules are set by the airline&rsquo;s fare, not by me or this website. I send them with
            every quote and explain them before you pay. If your plans change after ticketing, contact me first: I
            handle the change with the airline and tell you what it costs.
          </p>

          <h2>Fares and availability</h2>
          <p>
            I confirm every price before ticketing. Until then, availability, cabin, schedule, aircraft and price can
            change, and an airline can withdraw a fare without notice. The savings quoted on this site are examples
            and typical ranges from past quotes, not a promise for your trip.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The text, photographs and design of this site may not be reproduced or reused commercially without
            permission from the rights holder.
          </p>

          <h2>General information</h2>
          <p>
            The guides on this site are general planning information, not legal, immigration, safety or financial
            advice. Use current airline and government sources for decisions that depend on changing rules. Nothing
            in these terms limits rights that cannot lawfully be limited.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            I may update these terms as the service evolves. The &quot;last updated&quot; date at the top shows the
            current version. Continued use of the site after a change means you accept the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: call or WhatsApp{' '}
            <a href={`tel:${contactConfig.phoneHref}`}>{contactConfig.phoneLabel}</a>, email{' '}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>, or use the{' '}
            <a href="/#request-form">request form</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
