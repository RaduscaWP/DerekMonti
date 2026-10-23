// Existing disclosure text, preserved as the common English source.
export const legalDocuments = {
  privacy: {
    title: 'Privacy Policy', label: 'Privacy', updated: '2026-10-03',
    lead: 'Fly with Derek uses this website to receive requests for personal review of premium-flight itineraries. This notice describes the data handled by the current site implementation and the services used to deliver and protect a request.',
    contactIntro: 'Privacy questions can be sent through the',
    sections: [
      { id: 'information', nav: 'Information we collect', heading: 'What information we collect', items: [
        { id: 'request', prefix: 'Quote request data:', text: 'trip type, origin and destination for each leg, travel dates, traveler count, cabin and flexibility preferences, name, email, preferred contact method, optional phone or WhatsApp number, optional notes, and privacy acknowledgement. A request identifier and attempt timestamp support safe retries.' },
        { id: 'technical', prefix: 'Technical data:', text: 'normal request information such as IP address and browser headers can be processed by hosting and security services. Vercel Analytics is present for aggregate site usage.' },
        { id: 'local', prefix: 'Local form state:', text: 'the browser may keep itinerary structure and travel preferences in session storage so a page refresh is less disruptive. Contact details, notes, and acknowledgement are not stored there by this site.' },
        { id: 'abuse', prefix: 'Anti-abuse data:', text: 'rate limiting uses keyed digests of IP addresses and recipients. When enabled, Cloudflare Turnstile verifies a challenge token before submission. A request registry stores identifiers, a keyed digest of normalized request data, timing, and provider-acceptance status for safe retries; it does not store request messages or contact details.' },
      ] },
      { id: 'use', nav: 'Why we use it', heading: 'Why we use it', items: [
        { id: 'respond', prefix: 'To review and respond to your request', text: 'using the contact method you select.' },
        { id: 'deliver', prefix: 'To deliver request and confirmation emails', text: 'and preserve an operational record of the conversation.' },
        { id: 'reduce', prefix: 'To reduce spam and abuse', text: 'through validation, a honeypot, rate limiting, and optional human verification.' },
        { id: 'aggregate', prefix: 'To understand aggregate site use', text: 'and improve the experience without intentionally sending form contact details or notes to analytics.' },
      ] },
      { id: 'services', nav: 'Services used', heading: 'Services used by the site', items: [
        { id: 'resend', prefix: 'Resend', text: '— sends the advisor notification and a minimal customer acknowledgement with a request reference. Provider acceptance does not guarantee inbox delivery.' },
        { id: 'vercel', prefix: 'Vercel', text: '— hosts the site and provides aggregate analytics.' },
        { id: 'turnstile', prefix: 'Cloudflare Turnstile', text: '— verifies the form when the integration is configured.' },
        { id: 'redis', prefix: 'Upstash Redis', text: '— stores short-lived rate-limit counters and a request registry for safe retries. Distributed controls are required for automatic intake on public deployments; if unavailable, automatic submission stops and direct contact remains available. In-memory controls are limited to local development.' },
      ], body: 'Each service processes data under its own terms and privacy notice. Their deployment regions, account settings, and retention controls can vary with the production configuration.' },
      { id: 'retention', nav: 'How long we keep it', heading: 'How long we keep it', body: 'The site code does not define the retention period for delivered email or provider account records. Rate-limit counters expire after ten minutes. Request-registry records expire after 48 hours and contain no message body or contact details. Retry identifiers in browser memory are not kept in session storage. Browser session storage normally lasts for the tab session and can be cleared through browser controls. Provider retention follows the production account settings and applicable requirements.' },
      { id: 'cookies', nav: 'Cookies', heading: 'Cookies', body: 'The application code does not add advertising cookies. Hosting, analytics, or anti-abuse services may process technical identifiers according to their current notices and the production configuration.' },
      { id: 'rights', nav: 'Your rights', heading: 'Your rights', body: 'Depending on the law that applies to you, you may have rights to ask about, correct, or delete personal data and to object to or restrict some processing. Use the contact options below to make a request.' },
      { id: 'security', nav: 'Security', heading: 'Security', body: 'Production hosting is configured for HTTPS and security headers. The form validates and sanitizes its payload, limits request size, and applies anti-abuse controls. The site does not request payment-card or passport data. No internet transmission or storage system can be promised as completely secure.' },
      { id: 'changes', nav: 'Changes', heading: 'Changes to this policy', body: 'We may update this policy as services change. The "last updated" date at the top reflects the most recent version. Material changes will be highlighted.' },
      { id: 'contact', nav: 'Contact', heading: 'Contact' },
    ],
  },
  terms: {
    title: 'Terms of Service', label: 'Terms', updated: '2026-08-31',
    lead: 'These terms apply to your use of this website and any quote request you submit. By using the site, you accept these terms. If you do not agree, please do not use the site.',
    contactIntro: 'Questions can be sent through the',
    sections: [
      { id: 'service', nav: 'Nature of the service', heading: 'Nature of the service', body: 'Fly with Derek is an independent request and guidance website. It does not display live inventory, take payment, issue tickets, or represent an airline. A submitted request gives Derek information to review; it does not create a booking, agency relationship, seat hold, or promise of a particular outcome.' },
      { id: 'quotes', nav: 'Quotes are not bookings', heading: 'Quotes are not bookings', body: 'The site does not show live prices or availability. If an itinerary or price is later discussed, its provider, availability, conditions, payment process, and confirmation status must be reviewed separately. Nothing is confirmed merely because you submit this form or receive an initial message.' },
      { id: 'responsibilities', nav: 'Your responsibilities', heading: 'Your responsibilities', items: [
        { id: 'accurate', text: 'Provide accurate trip details, passenger names, and contact information.' },
        { id: 'rules', text: 'Verify passports, visas, health rules, and entry requirements with current official sources.' },
        { id: 'review', text: 'Review the issuing party, fare rules, fees, change terms, and cancellation conditions before paying.' },
        { id: 'fraud', text: 'Do not submit fraudulent requests, automated traffic, or third-party information without consent.' },
      ] },
      { id: 'changes-refunds', nav: 'Changes and refunds', heading: 'Cancellations, changes, and refunds', body: 'This website does not set ticket change, cancellation, or refund rules. Those terms depend on the actual ticket and issuing party. Review the complete written conditions before proceeding with any purchase.' },
      { id: 'availability', nav: 'Price and availability', heading: 'No guarantee of price or availability', body: 'No particular price, saving, cabin, schedule, aircraft, route, or availability is promised. Airline products and operating details can change, so current information must be checked before a decision.' },
      { id: 'property', nav: 'Intellectual property', heading: 'Intellectual property', body: 'Do not reproduce or commercially reuse site content beyond uses permitted by applicable law without first obtaining permission from the relevant rights holder.' },
      { id: 'information', nav: 'General information', heading: 'General information', body: 'Guides on this site are general planning information, not legal, immigration, safety, or financial advice. Use current airline and government sources for decisions that depend on changing rules. Nothing in these terms limits rights that cannot lawfully be limited.' },
      { id: 'updates', nav: 'Changes', heading: 'Changes', body: 'We may update these terms as the service evolves. The "last updated" date at the top reflects the most recent version. Continued use of the site after a change means you accept the updated terms.' },
      { id: 'contact', nav: 'Contact', heading: 'Contact' },
    ],
  },
};

export const legalSourceMessages = {
  'legal.label': 'Legal', 'legal.updated': 'Last updated {date}',
  'legal.scope': 'Website and trip requests', 'legal.contents': 'On this page',
  'legal.requestForm': 'request form', 'legal.phoneJoin': 'or discussed by phone at',
};

for (const [kind, document] of Object.entries(legalDocuments)) {
  for (const field of ['title', 'label', 'lead', 'contactIntro']) {
    legalSourceMessages[`legal.${kind}.${field}`] = document[field];
  }
  legalSourceMessages[`legal.${kind}.contentLabel`] = `${document.title} content`;
  legalSourceMessages[`legal.${kind}.sectionLabel`] = `${document.title} sections`;
  for (const section of document.sections) {
    const prefix = `legal.${kind}.${section.id}`;
    legalSourceMessages[`${prefix}.nav`] = section.nav;
    legalSourceMessages[`${prefix}.heading`] = section.heading;
    if (section.body) legalSourceMessages[`${prefix}.body`] = section.body;
    for (const item of section.items || []) {
      if (item.prefix) legalSourceMessages[`${prefix}.${item.id}.prefix`] = item.prefix;
      legalSourceMessages[`${prefix}.${item.id}.text`] = item.text;
    }
  }
}
