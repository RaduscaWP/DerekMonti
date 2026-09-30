# Fly with Derek — QA Report

## 2026-09-30 — Final protected-hero redesign verification

Scope: existing 16 canonical routes, the shared quote flow, static rendering, below-hero visual redesign and PRD reconciliation. This is local evidence, not a production deployment or a live-delivery claim.

### Final results

| Check | Result | Evidence |
|---|---|---|
| `npm.cmd test` | 51 passed, 0 failed | `output/playwright/2026-09-30-redesign/tests.log` |
| `npm.cmd run build` | Client, SSR, 16-page prerender plus 404, SEO validation passed | `output/playwright/2026-09-30-redesign/build.log` |
| `git diff --check` | Passed; only Git line-ending warnings | `output/playwright/2026-09-30-redesign/diff-check.log` |
| Protected hero | Original JSX and both original stylesheets unchanged; desktop and mobile first-view pixels identical | `output/playwright/2026-09-30-redesign/hero-preservation.json` |
| Browser audit | 16 pages at 1440px; 15 additional route/width checks at 320/390/768px; no overflow or page exceptions | `verification.json` in the redesign evidence folder |
| Automated accessibility | axe-core 4.10.3: 0 WCAG A/AA violations across all 16 desktop routes and the Home mobile scan | Same verification file; browser evidence only, not an accessibility certification |
| No-JavaScript | All 16 routes contain substantive HTML, one H1 and working link navigation | Same verification file |
| Interaction smoke | 13 checks passed: journey selection/prefill, comparison lenses, comfort persistence, cross-page brief, grouped FAQ, contact fallback, final CTA and native article contents | Same verification file |
| Internal links | 20 unique root-relative links/assets checked; no 4xx/5xx result | Same verification file |
| Images | All referenced images decoded successfully; no missing source files | Local capture forces image decode after its scroll tour to separate lazy-load timing from asset failures |
| Keyboard/mobile/zoom | Native article contents, mobile menu/Escape, and a 200% CSS-zoom reflow spot check passed | `spot-checks.json`; not a substitute for physical browser/device testing |
| Form fixture | Safe August migration; keyboard combobox; retained failure entries; complete recovery messages; identical retry; receipt/confirmation distinction; reset; 390/320px layout passed | `output/playwright/2026-09-30-form/fixture-results.json` |
| Analytics privacy boundary | PII/trip details and prototype keys excluded, categorical values retained, unknown events rejected, localhost emits nothing | `analytics-policy.json`; mocked transport, no real events |

No separate lint or typecheck command is configured in this JavaScript repository. The existing test/build/SEO commands are the configured engineering checks.

The form fixture runs in Chrome with every API submission intercepted. The site-wide audit runs in Edge Chromium with external requests blocked and WebGL explicitly unavailable. No real lead, email or WhatsApp message was sent. The prior sub-agent visual checks also covered Services/About plus all seven core pages at 1440/390/320px and real Blog filters/brief continuation; captures are in `output/playwright/2026-09-30-secondary/` and `output/playwright/2026-09-30-editorial/`.

### Local HTTP and SEO

`scripts/serve-prerender.mjs` served the built files on localhost. All 16 canonical routes returned HTML with 200. `/robots.txt` returned 200/plain text and `/sitemap.xml` returned 200/XML. The branded unknown route and all five unsupported old article URLs returned HTML/404. `/services/` returned 308 with `Location: /services`. All 25 individual status/content-type records are in `verification.json`.

Build validation checks unique title/description/H1, production canonicals, page-appropriate JSON-LD, preview noindex protection, canonical sitemap membership and the real 404 artifact. Article images now match the visible illustrations/photographs. No author, date, affiliation, review, savings, fare or credential was invented. No removed upsell/code state or payload logic was found in the active homepage/form/API paths.

### Performance measurements and budgets

Budget used for this pass: main JavaScript <=180 kB gzip; CSS <=40 kB gzip; critical hero poster plus avatar <=250 kB; no essential WebGL or external media/font requests. Current build: JavaScript **499.27 kB / 162.40 kB gzip**, CSS **188.63 kB / 31.76 kB gzip**. The two existing critical fonts are preloaded; new destination images remain local WebP and lazy-loaded.

Final cold-load lab probe used 1.6 Mbps download, 150 ms latency, 4x CPU slowdown, reduced motion and negotiated gzip from the optional local `--compress` server. Measurements are from browser PerformanceObserver, not Lighthouse or production field data:

| Viewport | LCP | CLS | Longest observed interaction event | Initial transfer |
|---|---:|---:|---:|---:|
| Mobile 390px | 2.108 s | 0.000418 | 96 ms | 550,092 bytes |
| Desktop 1440px | 2.096 s | 0.000673 | 160 ms | 685,458 bytes |

Exact resource records are in `output/playwright/2026-09-30-redesign/performance-compressed.json`. The longest observed event is a lab interaction indicator, **not verified field INP**. Earlier compressed runs ranged from 2.256–2.628 s on mobile before critical-font/native-FAQ optimization, with one 224 ms desktop event. The deliberately uncompressed static-server run measured 4.896 s mobile and 4.740 s desktop; it is retained separately in `performance.json`. These differences show why compression, competing CPU load and lab variability must be stated.

The final local LCP/CLS measurements meet the PRD target values; the production 75th percentile and field INP remain unmeasured. Verify actual compression/cache headers on a preview/production deployment, then measure real-device and field results. If targets are missed, prioritize route-level JS/CSS splitting with preserved SSR stylesheet output, critical-font/asset scheduling and owner-approved avatar optimization. The frozen hero was not recompressed or visually changed to improve a score.

### Remaining verification boundaries

- Live Resend, Turnstile, Upstash, confirmation delivery and approved analytics configuration were not tested with real credentials/leads. Existing guards fail honestly and fixture/unit paths passed.
- Production status codes, caching/compression, CSP headers, robots/sitemap delivery and Search Console coverage are not established by localhost. No external publication or sitemap submission was performed.
- Safari/iOS, Firefox, physical Android/iOS, a real screen reader and a complete assistive-technology matrix remain release checks; automated axe and keyboard checks do not prove all WCAG criteria.
- Business/contact ownership, the email/domain relationship, portrait rights, author/review dates, legal approval and future route/airline facts remain owner/reviewer inputs. Future PRD roadmap pages are not published without unique sourced content and approval.

## Historical verification record

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
