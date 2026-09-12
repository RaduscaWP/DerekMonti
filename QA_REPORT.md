# Fly with Derek — QA Report

## Homepage release update — 2026-09-12

The approved cinematic homepage is now integrated into the production application. The August 31 report below remains as the historical PRD baseline; its 12-test count, bundle measurements, homepage description, and deployment status describe that older build.

- The current suite passes **40/40 tests**: 18 homepage trip-flow tests, 18 shared quote/API/email tests, and four SEO/deployment tests.
- The final Vite 6.4.3 client build, SSR build, 16-route prerender, `404.html`, sitemap, robots, and SEO validation pass.
- `npm.cmd audit --audit-level=low` reports **0 vulnerabilities** after the React Router 7.18.3 update and its SSR compatibility change.
- The built homepage passed targeted browser checks at 1440×1000, 768×1024, 390×844, and 320×800. Hero video/poster behavior, responsive layout, mobile menu, reduced motion, the comfort studio, route handoff, legacy-page navigation, and browser logs were checked.
- The real form adapter was exercised against a local no-delivery HTTP fixture. It preserved data through a recoverable 503 and showed success only after an explicit API receipt with a reference. No external lead or message was sent.

Current evidence and screenshots: [`qa/homepage-production/README.md`](qa/homepage-production/README.md).

Report date: 2026-08-31  
Scope: final PRD implementation in the current working tree  
Release decision: **repository checks passed; production approval remains gated**

## Executive result

- The final client build, SSR build, 16-route prerender, `404.html` generation, sitemap/robots generation, and SEO validator all passed.
- The combined automated test suite passed **12/12** tests: eight quote/API/email-template contract tests and four SEO/deployment tests.
- Independent Sass compilation and Node syntax checks passed. `git diff --check` reported no whitespace errors.
- Representative clean URLs, crawler files, redirects, and unknown-route handling returned the expected status codes and content types from the local prerender server.
- Targeted Chrome/Playwright checks passed for desktop/mobile rendering and the principal routing, menu, FAQ, and quote-form interactions.
- No production deployment or live third-party integration was exercised. The site is not represented as production-approved until the explicit evidence gaps in this report are closed.

## Commands and results

| Command/check | Result | Evidence |
|---|---|---|
| `npm.cmd test` | Pass | 12 tests, 12 pass, 0 fail, 0 skipped in the final recorded run |
| `npm.cmd run build` | Pass | Client build, SSR build, 16 prerendered routes plus `404.html`, sitemap/robots output, and prerender validation completed |
| Client build output | Pass | CSS 60.82 kB / 10.64 kB gzip; main JS 425.88 kB / 138.66 kB gzip; lazy Three.js 450.49 kB / 113.76 kB gzip; build 7.20 s |
| SSR build output | Pass | SSR entry 185.14 kB; build 1.11 s |
| Sass compilation checks | Pass | Global stylesheet and `CoreLanding.module.scss` both compiled |
| Node syntax checks | Pass | 19 JavaScript/MJS files in the verification set parsed successfully |
| `git diff --check` | Pass | No whitespace error; Git emitted line-ending conversion warnings only |
| Local prerender HTTP probe | Pass | Representative pages, crawler files, canonical slash redirect, and unknown URL behaved as expected |
| Chrome/Playwright smoke | Pass | Desktop and mobile visual captures plus targeted interaction scenarios completed |

The repository has no configured `lint` or `typecheck` script, so no lint/typecheck result is claimed. `npm audit` was not run because it requires current registry/network evidence.

## Route and prerender checks

The final validator confirmed these 16 explicit manifest routes:

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

For every route, the build validator checked one unique title, one matching meta description, one production canonical, one H1, expected indexability, no empty hash link, no unresolved placeholder copy, and exact sitemap agreement. It also validated `robots.txt` and the dedicated 404 head rules.

The four SEO/deployment tests additionally confirmed:

- Vercel preview/development and the explicit `FLY_WITH_DEREK_NOINDEX` flag activate the deployment guard.
- Every published route is explicit, unique, canonical, slash-consistent, and approved for indexing.
- Guide schema emits `Article` without inventing an author or publication/modification date.
- Noindex output suppresses JSON-LD while retaining the production canonical.

## HTTP status and content-type evidence

The final prerender artifact was served by `scripts/serve-prerender.mjs` and probed locally at `127.0.0.1`.

| Resource | Status | Content type / redirect evidence |
|---|---:|---|
| `/` | 200 | `text/html` |
| `/services` | 200 | `text/html` |
| `/about` | 200 | `text/html` |
| `/blog` | 200 | `text/html` |
| `/business-class-flights` | 200 | `text/html` |
| `/robots.txt` | 200 | `text/plain`; 90-byte production artifact |
| `/sitemap.xml` | 200 | `application/xml`; 1,432-byte production artifact |
| `/does-not-exist` | 404 | Branded `text/html` 404 artifact |
| `/services/` | 308 | `Location: /services` |

This proves the local artifact/server contract. It does not prove production CDN behavior or that every header in `vercel.json` is active on the final host.

## Browser and interaction checks

### Visual checks

- Final Chrome screenshots were captured through Playwright at 1440×900 and 390×844.
- The homepage and quote-request section were inspected at both desktop and mobile sizes.
- The premium hero hierarchy, navigation, portrait treatment, CTA layout, responsive stacking, and quote section rendered without observed horizontal clipping or broken assets.
- The built-in static fallback remained present independently of the optional Three.js enhancement.
- The local capture set was written under `output/playwright/` (`final-home-desktop.png`, `final-home-mobile.png`, `final-form-desktop.png`, `final-form-mobile.png`, and `final-form-fields-mobile.png`). These are disposable QA evidence, not production assets or deployment output, and do not need to ship with the application.

### Targeted interaction checks

- Direct route loads produced route-specific prerendered content and metadata.
- SPA navigation and browser back navigation updated content, metadata, scroll position, and route focus.
- The not-found route rendered branded recovery links with `noindex, nofollow` and no canonical.
- Empty quote submission exposed seven validation errors and moved focus to the linked error summary.
- Round-trip, one-way, and multi-city modes switched correctly; multi-city leg editing and validation were exercised.
- Safe quote progress restoration excluded name, email, phone, notes, and privacy acknowledgement from `sessionStorage`.
- An unavailable local API preserved entered values and exposed WhatsApp/email recovery actions.
- The mobile menu opened and closed correctly, trapped focus, responded to Escape, restored focus to its trigger, and prevented background scrolling.
- FAQ behavior kept at most one panel open and maintained the expected ARIA state.
- No React render error or uncaught page exception was observed during the targeted runs.
- A final local static-preview audit loaded `/`, `/services`, `/about`, `/blog`, and `/business-class-flights`; every route returned 200 and produced an empty issue list for console errors and `pageerror` events.

The local static server intentionally does not provide the production `/api/quote` serverless function. The Analytics wrapper does not inject Vercel Analytics on `localhost`, `127.0.0.1`, or `::1`, preventing a false local telemetry error. An intentionally attempted form submission still cannot count as a successful live integration test.

The repository's superseded `tmp-email-preview/` HTML and screenshots were removed so they cannot be mistaken for evidence of the current transactional template. Email HTML escaping and content are contract-tested; fresh rendering in representative live email clients remains outstanding.

## Accessibility checks

### Confirmed by source inspection and targeted browser behavior

- A visible skip link targets the single layout-level `<main id="main-content">`.
- The article route uses an `<article>` inside the layout main; the earlier nested-main issue is removed.
- Route and valid hash navigation programmatically move focus to the destination heading.
- Desktop/mobile navigation use real links. The mobile dialog has `aria-expanded`, `aria-controls`, a label, Escape handling, focus trapping, focus return, scroll locking, and internal scroll behavior.
- FAQ controls use buttons with `aria-expanded`/`aria-controls`; closed content is hidden from the accessibility tree.
- Quote inputs have labels and stable IDs; trip type uses native radios.
- Field errors expose `aria-invalid` and linked descriptions. Submission errors are summarized in a focusable alert with links back to fields.
- Busy, error, and success states expose appropriate live/focus behavior. Success focus was implemented and inspected.
- Contact PII is excluded from quote-progress storage.
- Reduced-motion preferences suppress nonessential motion and the decorative WebGL layer.
- Focus styling and contrast-sensitive footer, dark-section, and placeholder treatments were strengthened and visually inspected.

### Not tested

- No axe, Accessibility Insights, WAVE, or equivalent automated accessibility audit was run.
- No NVDA, JAWS, VoiceOver, TalkBack, or other screen-reader test was run.
- No complete keyboard-only journey across every route was recorded; only targeted navigation/menu/form/focus scenarios were exercised.
- No formal forced-colors, Windows high-contrast, 200% text, browser zoom, or reflow matrix was completed.
- No instrumented color-contrast audit was completed.

## Performance checks

### Measured build output

- CSS: 60.82 kB raw / 10.64 kB gzip.
- Main browser JavaScript: 425.88 kB raw / 138.66 kB gzip.
- Lazy Three.js particle chunk: 450.49 kB raw / 113.76 kB gzip.
- SSR entry: 185.14 kB.
- Final client build: 7.20 s; final SSR build: 1.11 s.

### Protective implementation confirmed

- Core content, routing, navigation, form, and CTAs do not depend on Three.js.
- The decorative particle module is capability-gated, viewport-gated, reduced-motion-gated, dynamically imported, failure-tolerant, and disposed on unmount.
- Fonts are bundled locally through `@fontsource`.
- The primary portrait includes declared dimensions.

### Not tested

- No Lighthouse mobile or desktop run was completed.
- No Core Web Vitals measurement or field data was collected.
- No measured LCP, INP, CLS, TTFB, Speed Index, CPU-throttled trace, slow-network waterfall, or real-device performance run is available.

No Lighthouse score or Core Web Vitals pass/failure should be inferred from bundle sizes or implementation choices.

## Schema and metadata checks

- The manifest supplies unique absolute canonicals on `https://www.flywithderek.com`.
- Client navigation and server prerender use the same metadata source for title, description, robots, canonical, Open Graph, Twitter, and JSON-LD.
- Standard routes emit `WebPage` data. Guides emit `Article` without an unverified author or date. Core pages add reviewed `Service` and `BreadcrumbList` nodes.
- No price, offer, rating, review, airline organization, or availability schema is emitted.
- The 404 is `noindex, nofollow`, has one H1, and emits neither canonical nor JSON-LD.
- Non-production builds retain production canonicals but apply noindex, suppress JSON-LD, empty the sitemap, and disallow crawling in `robots.txt`.

No Schema Markup Validator, Google Rich Results Test, Search Console inspection, social-card debugger, or external crawler run was completed.

## Quote contract and API checks

The eight quote/API/template tests confirmed:

1. A complete round-trip request passes validation.
2. A round trip requires a return date and privacy acknowledgement.
3. A valid two-leg multi-city request passes.
4. Chronologically invalid multi-city legs fail with a field error.
5. Phone/WhatsApp contact preference requires a phone number; email preference does not.
6. Traveler free text is escaped in email HTML, and removed sales fields/ratings are absent.
7. An incomplete legacy payload returns field-level API errors.
8. The honeypot path returns a non-revealing success response without attempting delivery.

Source inspection additionally confirmed request-size enforcement, normalization, date-boundary tolerance, sanitization, form-timing checks, rate-limit handling, optional Turnstile verification, optional Upstash use, Resend error handling, advisor-first notification order, traveler confirmation handling, and no intentional PII logging.

### Not tested live

- The deployed `/api/quote` endpoint was not called.
- Resend advisor/traveler delivery, sender-domain authentication, SPF/DKIM/DMARC, inbox placement, reply-to behavior, and bounce/failure handling were not tested.
- Cloudflare Turnstile success, failure, expiry, and replay behavior were not tested with real keys.
- Upstash distributed rate limiting and multi-instance behavior were not tested with a real Redis instance.
- WhatsApp and mail-app fallbacks were not tested across real mobile/desktop applications.
- Production reference persistence, duplicate submissions across instances, offline recovery, and provider outages were not tested end to end.

## Security and privacy observations

- Environment-variable names are documented without secret values.
- The form stores no contact PII in `sessionStorage`.
- The UI collects no payment details, passport details, loyalty credentials, or account passwords.
- Email-template free text is escaped before interpolation.
- Security headers are declared in `vercel.json`, but only the local server’s `Content-Type` and `X-Content-Type-Options` behavior were observed directly.
- No dedicated secret-scanner run, penetration test, dependency vulnerability review, or live abuse/load test was completed.

## Explicit evidence boundary

The following were **not tested** and remain required where applicable:

- production/live API behavior;
- live Resend email delivery;
- live Cloudflare Turnstile behavior;
- live Upstash distributed rate limiting;
- Lighthouse;
- Core Web Vitals;
- axe or another automated accessibility auditor;
- screen readers.

## Remaining production gates

1. Confirm Derek’s identity, contact endpoints, portrait rights, domain ownership, service scope, operating model, and content ownership.
2. Obtain legal approval for Privacy and Terms and reconcile them with real production vendors, data retention, ticketing, payment, refund/change, and support processes.
3. Resolve and approve the relationship between the Fly with Derek brand/domain and `Derek@travelbusinessclass.com`.
4. Configure and test Resend, Turnstile, Upstash, analytics, environment secrets, and the production deployment.
5. Run axe and screen-reader checks plus a complete keyboard, zoom/reflow, forced-colors, and real-device accessibility matrix.
6. Run Lighthouse and Core Web Vitals measurement on mobile and desktop, then remediate missed budgets.
7. Verify final production status codes, redirects, content types, CSP/security headers, canonicals, crawler files, 404 behavior, analytics, and live quote submission.
8. Obtain final editorial sign-off for all landing pages and guides.

## Final checklist

- [x] Combined automated tests: 12/12 pass.
- [x] Final client and SSR builds pass.
- [x] Sixteen routes plus `404.html` prerender and validate.
- [x] Sass and Node syntax checks pass.
- [x] Local HTTP status/content-type/redirect checks pass.
- [x] Targeted desktop/mobile browser and interaction smoke passes.
- [ ] Live API, Resend, Turnstile, Upstash, and analytics integration testing.
- [ ] axe and screen-reader validation.
- [ ] Lighthouse and Core Web Vitals measurement.
- [ ] Owner, image-rights, editorial, business-fact, privacy, and legal approvals.
- [ ] Production deployment verification.
