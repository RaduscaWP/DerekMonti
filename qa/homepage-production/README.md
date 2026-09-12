# Production homepage integration — QA evidence

Recorded: 2026-09-12
Scope: the approved cinematic homepage integrated into the production React/Vite application.

## Release-candidate result

- `npm.cmd test`: **40 tests passed, 0 failed**.
- `npm.cmd run build`: **passed** with Vite 6.4.3. Vite built 1,638 modules, SSR built successfully, and 16 routes plus `404.html` were prerendered and validated.
- Final client output: CSS 102.27 kB (17.24 kB gzip) and JavaScript 451.24 kB (147.63 kB gzip). SSR entry: 202.29 kB.
- `npm.cmd audit --audit-level=low`: **0 vulnerabilities** after updating React Router to 7.18.3 and applying the matching SSR import.
- `git diff --check`: no whitespace errors; Git reported line-ending conversion warnings only.
- Local HTTP checks returned 200 for `/` and `/about`, `video/webm` and `video/mp4` for the two hero sources, and 404 for an unknown route.

## Browser checks

The final built application was inspected at 1440×1000, 768×1024, 390×844, and 320×800 CSS pixels.

- The fixed-cabin hero, real 12-second moving cloud view, Derek portrait, primary call to action, and route starter rendered correctly.
- No horizontal page overflow was observed at any recorded viewport.
- The mobile menu opened as a modal, exposed the expected links, closed with Escape, and returned to its closed state.
- The Rested comfort state visibly changed the selected control and trip brief.
- Reduce motion removed the video element and exposed the static poster without removing page content.
- The legacy `/about` page still rendered with its original shared layout. Its `/#request-form` link returned to the new homepage form.
- Browser warning/error logs were empty in the final responsive checks.

Evidence:

- [Approved hero vs production](hero-comparison.jpg)
- [Approved comfort direction vs production](comfort-comparison.jpg)
- [Desktop hero](desktop-hero.png)
- [Desktop comfort state](desktop-comfort.png)
- [Tablet hero](tablet-768-hero.png)
- [390 px hero](mobile-390-hero.png)
- [320 px hero](mobile-320-hero.png)
- [Mobile menu](mobile-390-menu.png)
- [Mobile form](mobile-390-form.png)

## Request-flow check

The production form and its real `/api/quote` adapter were exercised against `scripts/serve-homepage-qa.mjs`, a local-only fixture that imports the shared validator and performs no provider or network delivery.

- Hero From/To values carried into the route step.
- Round-trip, one-way, and multi-city modes retained the expected fields; a third multi-city leg could be added and removed.
- Route, preference, and contact details survived edits between steps.
- The explicit `work` comfort preference was serialized separately while notes remained unchanged.
- The request included the honeypot, form-start time, and Turnstile token fields expected by the API contract.
- The first valid response returned 503; the form kept all values and showed a recoverable error.
- Retry produced the success UI only after `{ ok: true, reference: "QA-LOCAL-RECEIPT" }` arrived.
- No live email, WhatsApp message, provider request, or production lead was sent.

Evidence:

- [Captured request contract](browser-request-check.json)
- [Recoverable API error](form-error.png)
- [Confirmed local receipt](form-success.png)

The homepage media provenance and license record remains in [`prototype/homepage/asset-sources.md`](../../prototype/homepage/asset-sources.md). The comfort assets are illustrative and the visible interface states that cabin details vary by flight.
