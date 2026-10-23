# Fly with Derek — Implementation Notes

Status date: 2026-08-31  
Scope: final PRD-led implementation in the current working tree  
Production deployment status: not performed or verified by this report

## Implementation outcome

The repository now contains a complete, prerendered React site for Fly with Derek, a validated quote-request flow, explicit SEO routes, a branded 404 experience, and deployment safeguards. The public copy is intentionally conservative: it does not claim unverified savings, prices, response times, testimonials, ratings, client counts, qualifications, airline relationships, or access to private inventory.

The implementation is technically verified at build, static-server, and browser-smoke level. Production approval still depends on owner/legal review and end-to-end checks with the real email, bot-protection, rate-limit, analytics, and hosting configuration.

## Architecture

- React 18 and React Router 6 provide the application and route layer.
- Vite 6 creates the browser bundle. A second Vite SSR build compiles `src/entry-server.jsx` for server-side rendering during prerender.
- `scripts/prerender.mjs` renders every record in `src/seo/routeManifest.js`, then emits route-specific HTML, `404.html`, `sitemap.xml`, and `robots.txt`.
- `scripts/validate-prerender.mjs` verifies the generated titles, descriptions, canonicals, H1s, indexing directives, sitemap membership, robots directives, empty-hash links, unresolved placeholder copy, and 404 head rules.
- The browser hydrates the prerendered HTML. Core copy, navigation, the portrait, and the quote form remain usable without WebGL.
- `src/seo/routeManifest.js` is the canonical source for route metadata and sitemap membership. `src/data/corePages.js` holds seven reviewed service/hub records; `src/data/siteData.js` holds shared content and three planning guides.
- GSAP supplies restrained progressive motion. Three.js is dynamically imported only for the decorative hero layer after capability, viewport, and reduced-motion checks; failures are caught and the static design remains intact.
- `/api/quote` is a Vercel-style serverless handler. It normalizes and validates input, limits request size, sanitizes free text, uses a honeypot and form-timing check, rate-limits requests, and supports Resend delivery when configured.
- Cloudflare Turnstile and Upstash Redis are optional integrations. If Upstash is absent, the API uses a per-instance in-memory rate-limit fallback.
- Vercel Analytics is mounted at application level. Its real collection behavior and privacy approval were not verified here.
- `vercel.json` configures clean, non-trailing-slash URLs and security headers including CSP, HSTS, `Referrer-Policy`, `Permissions-Policy`, and `X-Content-Type-Options`.

## Implemented public routes

The manifest contains 16 explicitly approved, unique, indexable production routes:

1. `/`
2. `/services`
3. `/about`
4. `/blog`
5. `/privacy`
6. `/terms`
7. `/business-class-flights`
8. `/first-class-flights`
9. `/business-class-flights/europe`
10. `/business-class-flights/usa`
11. `/services/last-minute-business-class`
12. `/services/complex-itineraries`
13. `/services/premium-flight-advisor`
14. `/blog/why-travelers-overpay-business-class`
15. `/blog/business-class-service-beyond-seat`
16. `/blog/last-minute-business-class`

Unknown URLs render the branded not-found view. The build also emits a dedicated `404.html` with `noindex, nofollow`, one H1, and no canonical.

The manifest is the authoritative build list, not evidence that any route is already deployed publicly.

## Product and content decisions

1. **Personal review instead of a simulated booking engine.** The principal action is a structured request for Derek to review. The interface does not show live inventory, promise availability, or fabricate a booking result.
2. **Truthfulness over inherited claims.** Unsupported fares, savings percentages, testimonials, ratings, client totals, response times, biography details, credentials, partnerships, and airline affiliations were removed or omitted.
3. **Derek as the brand anchor.** The homepage uses a portrait-led quiet-luxury direction instead of presenting Fly with Derek as a large agency. Rights and identity approval for the supplied portrait remain an owner gate.
4. **A complete static experience before enhancement.** Three.js adds atmosphere only. It is lazy-loaded into a separate chunk and is not required for content, navigation, conversion, or form completion.
5. **A reviewed content set instead of bulk SEO templates.** Seven distinct core pages and three durable planning guides were implemented. Route, destination, airline, and additional guide templates were not generated without maintainable sources and distinct value.
6. **One metadata source.** Routing, canonical metadata, structured data, prerender paths, sitemap entries, and validation derive from the same manifest to reduce drift.
7. **Explicit indexing approval.** The seven core records and three guide records require `approvedForIndexing: true`; automated tests ensure every published route is explicit, unique, canonical, and slash-consistent.
8. **Preview/staging fail-safe.** Vercel preview/development builds, or any build with `FLY_WITH_DEREK_NOINDEX=true`, emit page-level `noindex`, omit JSON-LD, publish an empty sitemap, and disallow crawling through `robots.txt`. Production canonicals are retained.
9. **No arbitrary redirects.** Useful retained article URLs were rewritten with substantive content. Unsupported slugs and unknown pages return a true 404 instead of redirecting to an unrelated destination.
10. **General editorial frameworks only.** The guides avoid changing schedule, aircraft, airport, lounge, product, price, visa, and fare-rule assertions. Their reading time is calculated from current word count at 220 words per minute.
11. **Independent positioning.** The interface does not use airline logos or imply endorsement. It includes independence and trademark language.

## Quote-request implementation

- Trip types use native radio inputs: round trip, one way, and multi-city.
- The multi-city editor supports two to six legs, with per-leg origin, destination, and departure date.
- Inputs have stable labels and IDs, field-level messages, `aria-invalid`, and descriptions linked through `aria-describedby`.
- Client and server share the same validation contract. Server validation includes a one-day date grace window so a valid local “today” value is not rejected solely because the server is already on the next UTC date.
- Failed validation moves focus to a linked error summary. Server/network errors keep the entered values and offer WhatsApp and email fallbacks.
- A successful request moves focus to a branded confirmation state and returns a request reference without promising a response time or availability.
- Duplicate submission is blocked while a request is in flight.
- `sessionStorage` restores only safe trip structure and preferences. Name, email, phone, notes, privacy acknowledgement, and other contact PII are excluded.
- The API rejects oversized or malformed requests, escapes traveler-entered text in email HTML, and does not log PII.
- The advisor notification is attempted before the traveler confirmation. Delivery behavior still requires a live Resend test.
- The transactional email uses the self-hosted portrait URL; the earlier remote Pexels dependency is no longer present.
- The tracked `tmp-email-preview/` HTML and screenshots were removed because they represented the superseded email template and were no longer valid QA evidence. The current template is covered by contract tests, but still needs a fresh visual pass in real email clients.

## Accessibility and interaction work

- One layout-level `<main id="main-content">` and a skip link provide a stable landmark target. The article page no longer nests a second `<main>`.
- Route changes and valid hash navigation move scroll position and programmatic focus to the destination heading.
- The mobile menu supports Escape, focus trapping, focus return, body scroll locking, internal scrolling, and mobile safe-area spacing.
- FAQ controls are real buttons with `aria-expanded`/`aria-controls`; hidden panels are removed from the accessibility tree and only one item opens at a time.
- The quote form has native semantics, a focusable error summary, recoverable failure behavior, busy/live-state semantics, and focused success confirmation.
- Visible focus treatment, dark-section contrast, footer contrast, placeholder contrast, and responsive spacing were strengthened.
- Reduced-motion preferences suppress nonessential animation and the optional WebGL layer.

These measures passed code inspection and targeted browser smoke tests. They are not a substitute for a final axe audit or screen-reader evaluation.

## SEO and deployment implementation

- Every public route is prerendered with substantive HTML instead of an app-shell-only response.
- Each route has a unique title, description, canonical, H1, Open Graph block, Twitter card block, and JSON-LD generated from the manifest.
- Standard pages emit `WebPage`. Planning guides emit `Article` without an invented author or publication date. Core landing pages add their reviewed `Service` and `BreadcrumbList` nodes.
- No price, offer, rating, review, inventory, or airline-affiliation schema is emitted.
- `robots.txt`, `sitemap.xml`, and `404.html` are generated and validated as part of `npm run build`.
- `scripts/serve-prerender.mjs` provides clean-URL behavior, canonical trailing-slash redirects, correct static content types, and real 404 responses for local artifact QA.

## Verified repository facts

“Verified” here means confirmed in the repository, not independently verified as a real-world business claim.

- The working brand is “Fly with Derek,” and the named advisor is Derek Monti.
- Two public portrait files remain: `public/images/derek-monti.jpg` and `public/images/DMphoto.jpg`. They are byte-identical and share SHA-256 `D14B9F654A6FF3E6216E15E181942AA297449A5A198EE92389EA4A2ACA3786D1`. The redundant root copy was removed.
- The configured contact endpoints are phone/WhatsApp `+1 (786) 706-4828` and `Derek@travelbusinessclass.com`.
- The canonical production origin is `https://www.flywithderek.com`.
- The 16-route manifest, seven core records, three guide records, shared quote contract, prerender pipeline, deployment guard, and custom 404 exist in source.
- Privacy and Terms were rewritten and carry a last-updated date of August 31, 2026.
- Optional integration hooks exist for Resend, Turnstile, and Upstash. Their presence in code does not prove production configuration.

## Final technical verification

- `npm.cmd test`: **12/12 passed** — eight quote/API/template contract tests and four SEO/deployment tests.
- `npm.cmd run build`: **passed** — client build, SSR build, 16-route prerender plus `404.html`, and SEO artifact validation.
- Captured output: CSS 60.82 kB (10.64 kB gzip), main JavaScript 425.88 kB (138.66 kB gzip), lazy Three.js chunk 450.49 kB (113.76 kB gzip), and SSR entry 185.14 kB. Client build took 7.20 s; SSR build took 1.11 s.
- Sass compilation: **passed** for the global stylesheet and the core-page module.
- Node syntax check: **passed** across 19 JavaScript/MJS files included in the verification run.
- `git diff --check`: **passed** with line-ending conversion warnings only and no whitespace errors.
- Local HTTP checks: representative pages returned 200 HTML; `robots.txt` returned 200 plain text; `sitemap.xml` returned 200 XML; an unknown URL returned 404 HTML; `/services/` returned 308 to `/services`.
- Chrome/Playwright browser smoke: desktop and mobile rendering, SPA navigation, metadata changes, 404 head rules, form validation/recovery, multi-city editing, safe session restoration, mobile-menu focus behavior, FAQ exclusivity, and final screenshots passed. A final static-preview pass across five representative 200 routes reported no console errors or `pageerror` events.
- Screenshot files created under `output/playwright/` are local, disposable QA evidence rather than production assets or deployment artifacts.

Exact QA evidence and remaining boundaries are in `QA_REPORT.md`.

## Facts and approvals still required

- Derek’s approved biography, experience, qualifications, licensing, affiliations, business entity, physical address, and applicable jurisdiction.
- Current ownership and approval of the phone number, WhatsApp endpoint, email address, domain, and portrait usage rights.
- The relationship between Fly with Derek and `travelbusinessclass.com`; a same-brand sending/contact domain should be preferred if available.
- The real ticketing party, payment flow, fees, change/cancellation/refund responsibilities, service boundaries, and escalation process.
- Evidence and approval for any future savings, pricing, fare-access, availability, response-time, guarantee, client-count, review, testimonial, award, or airline-relationship claim.
- Legal approval of Privacy and Terms, including confirmation that named data flows, processors, retention, security, and operational responsibilities match production.
- Editorial ownership and factual sign-off for every guide and landing page.
- Production configuration and approval for Resend, analytics, Turnstile, Upstash, and the hosting environment.

## Deferred scope

- **Route pages:** deferred until each page has maintained route, airport, scheduling, and date-stamped factual sources plus unique user value.
- **Destination pages:** deferred until arrival-airport, onward-travel, and destination-specific premium-travel facts have a source and reviewer.
- **Airline pages:** deferred until product, aircraft, lounge, route, trademark, and review-date facts can be maintained without implying affiliation.
- **Additional guides:** consolidator-fare, points, booking-time, and premium-economy comparison pages remain deferred pending source, owner, and compliance review.
- **Bulk keyword expansion:** no mass landing-page or keyword rollout was generated.
- **Airport autocomplete:** free-text origin/destination fields remain until a maintained airport source and accessible combobox interaction can be tested.
- **Dedicated thank-you URL:** the current success state is inline. A noindex thank-you page is deferred until analytics and reload/share behavior are approved.

## Environment variables

Values belong only in local or hosting secrets and must not be committed into documentation.

- Live email: `RESEND_API_KEY`.
- Optional sender/site configuration: `MAIL_FROM_ADDRESS`, `PUBLIC_SITE_URL`.
- Optional Turnstile: `VITE_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`.
- Optional distributed rate limiting: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, or `KV_REST_API_URL`, `KV_REST_API_TOKEN`.
- Optional non-production indexing lock: `FLY_WITH_DEREK_NOINDEX=true`.
- Vercel automatically supplies `VERCEL_ENV`; preview and development values activate noindex protection.
- Runtime/platform behavior also reads `NODE_ENV`.

## Remaining release gates

1. Obtain owner confirmation for identity, contact endpoints, domain, portrait rights, service scope, operating model, and editorial ownership.
2. Complete legal review of Privacy and Terms against the real vendors, retention, ticketing, payment, refund/change, and support processes.
3. Configure and test Resend identity/delivery, Turnstile, distributed Upstash rate limiting, analytics consent/collection, and hosting secrets in a production-safe environment.
4. Run axe and screen-reader checks, then complete full keyboard, zoom/reflow, forced-colors, and real-device QA.
5. Run mobile and desktop Lighthouse/Core Web Vitals measurements and remediate any missed budget.
6. Deploy to the intended host and re-verify production headers, canonical URLs, redirects, crawler files, real 404 behavior, analytics, and the live quote workflow.
