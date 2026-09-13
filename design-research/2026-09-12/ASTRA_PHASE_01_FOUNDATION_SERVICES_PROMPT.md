# Astra — Phase 01: shared foundation + Services

## Task

Implement the approved multipage foundation and fully redesign `/services` as **The Itinerary Desk** for Fly with Derek.

This run has exactly two deliverables:

1. shared shell, minimal navigation, shared motion preference, and safe shared Trip Brief foundation;
2. the complete `/services` redesign.

Stop after those pass QA. Do not redesign `/about` or any other interior page in this run. Do not add `/plan-my-trip`. Do not deploy or release the site.

## Read first

Workspace:

`C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti`

Read:

- `AGENTS.md`
- `design-research/2026-09-12/ASTRA_MULTIPAGE_REDESIGN_MASTER_PROMPT.md`
- `design-research/2026-09-12/MULTIPAGE_DESIGN_STRATEGY.md`
- `design-research/2026-09-09/ASTRA_HOMEPAGE_PROTOTYPE_PROMPT.md`
- `IMPLEMENTATION_NOTES.md`
- `QA_REPORT.md`
- current routing, homepage, shared layout, Trip Form, state, API, SEO, and test files named in the master prompt

The master prompt defines future phases and global invariants. This phase prompt defines the only work authorized now.

Before editing:

1. record `git status` and current commit;
2. run `npm.cmd test`;
3. run `npm.cmd run build`;
4. inspect the fresh prerender through `npm.cmd run preview:static`;
5. capture the current Home and Services at the required desktop/mobile states;
6. record built JavaScript/CSS sizes and current media requests.

If baseline tests, build, prerender, or required browser capture already fail, record the exact pre-existing failure and stop when it prevents a trustworthy before/after comparison. Do not silently absorb unrelated baseline repairs into this phase.

## Fixed design decisions

- The approved homepage visual composition remains unchanged.
- `design-research/2026-09-09/concept-01-departure.png` remains the mandatory Home hero reference, represented by the current approved loop and matching poster. Do not replace or reinterpret it in this phase.
- The aircraft-window hero belongs to Home and must not be repeated on Services.
- Navbar: `Services · About Derek · Journal · Plan my trip`.
- Logo is the Home link. Do not add a `Home` text link.
- No dropdown or mega-menu.
- Secondary routes are organized on Services, in contextual links, and in the footer.
- Services concept: **The Itinerary Desk**.
- Shared palette: navy `#0B1929` / `#08101A`, burgundy `#8A194F`, white, and `#F5F5F7`.
- Syne for display; DM Sans for body and controls.
- One dominant interaction, cardless editorial composition, restrained purposeful motion.
- English public UI only.

Do not reopen these decisions.

## Phase 0 — shared foundation

### One shell

After the refactor, `Layout`/`SiteShell` owns:

- the only skip link;
- one shared header with Home/interior visual variants;
- the single `<main id="main-content">`;
- one shared footer;
- the site-wide motion preference.

Remove the duplicate skip link, header, main, footer, and local contact constants from `Homepage`; extract their approved treatment into the shared variants. Page components render sections only. Do not leave parallel shells.

Home uses the immersive transparent treatment. Interior routes use a solid/contextual treatment. Shared-shell extraction must not change the approved Home hero, typography, imagery, comfort scene, narrative, or form layout.

`AnnouncementBar` is not part of the approved minimal chrome. Stop rendering it on all routes, but do not delete the component as unrelated cleanup.

When `AnnouncementBar` stops rendering, remove its height from `--header-total`, `--sticky-offset`, scroll padding, hero spacing, and mobile offsets. Verify that `#request-form`, focused headings, and validation-error targets are not hidden beneath either header variant.

Use `src/data/siteData.js` `contactConfig` as the only contact source. Do not change current contact values.

### Minimal semantic navigation

Render:

```text
Fly with Derek     Services     About Derek     Journal     [Plan my trip →]
```

- Logo → `/`.
- Services → `/services`.
- About Derek → `/about`.
- Journal → `/blog`.
- Plan my trip → `/#request-form`.

Use React Router links with real `href` output. Enhance same-page scrolling only after the link already works. Test Services → Plan my trip, full reload at `/#request-form`, browser Back, and the prerendered page with JavaScript disabled.

Mobile contains the same three text destinations and CTA. Preserve Escape close, focus trap, focus return, body-scroll restoration, safe-area spacing, visible focus, and internal scrolling.

Keep one route-focus controller. A pathname change focuses the new H1. `/#request-form` scrolls to the form and focuses `#trip-section-title`. Do not add competing scroll-to-top effects.

### Shared motion preference

Move the existing manual Reduce motion preference into shared state used by Home media and interior-page motion. The operating-system preference always wins. Initialize browser preference after hydration without changing the server tree. Navigating between routes must not reactivate motion or create duplicate listeners, observers, ScrollTriggers, or animation loops.

### Shared Trip Brief provider

Mount one `TripBriefProvider` inside the active BrowserRouter/StaticRouter context and above the shared shell/routes in `App`.

- Server render and first client render use the same deterministic initial state.
- Read session storage only after hydration.
- Move safe restoration/persistence ownership out of `TripForm` into the provider.
- Restore exactly once.
- Merge stored progress and newly selected route intent with explicit field precedence.
- Mounting `TripForm` must never overwrite the choice that initiated navigation.
- If changing the storage key, migrate the existing safe draft once and test the migration.

Restoration precedence is: explicit choices made during the current browser session > restored safe session data > initial defaults. If a visitor interacts before asynchronous storage restoration completes, restoration may fill untouched fields only and must never overwrite a dirty field.

The provider owns draft clearing as well as restoration/persistence. After server-confirmed success, `TripForm` signals the provider to remove the stored safe draft and suspend automatic write-back while the success state is displayed. Starting a new request resets state and re-enables persistence. A successful removal must not be immediately overwritten by unchanged provider state.

Preserve the existing round-trip, one-way, two-to-six-leg multi-city, date, traveler, cabin, flexibility, comfort, contact, validation, error-recovery, privacy, anti-spam, and server-confirmed success behavior.

Never persist name, email, phone, free-form notes, privacy acknowledgement, Turnstile data, or other contact PII. Preserve the established required defaults. Every new optional preference starts as `null` and is serialized only after explicit selection.

## Phase 1 — Services: The Itinerary Desk

### Visual thesis

A private itinerary studio: a deep navy working surface, a fine luminous route line, restrained burgundy instruments, tactile labels, large confident typography, and generous space. The page should feel like Derek has opened the travel situation on his desk and is making it understandable.

This is not another aircraft-window hero, a booking engine, a dashboard, or a grid of service cards.

### First viewport

The header and hero share one viewport budget. Do not place a 100vh hero below a fixed header.

At 1280 × 720 and 390 × 844, show without scrolling:

- Services identity;
- one unique H1;
- one short value sentence;
- primary CTA;
- the first Itinerary Desk option fully visible and operable.

At 320 × 800, keep identity, H1, value sentence, and CTA visible; the selector begins immediately afterward.

Suggested truthful content anchor:

- Eyebrow: `Services`.
- H1: retain `Premium travel, reviewed as a whole.` unless a shorter rendering preserves its meaning and metadata contract.
- Supporting sentence: explain that Derek considers cabin, route, timing, flexibility, and ticket conditions together.

Keep the text column concise. The desk itself is the dominant visual.

### Signature interaction

Offer three immediately available choices:

1. `One clear journey`;
2. `Several connected stops`;
3. `Departure is close`.

A quiet fourth path introduces `Personal flight advisor` without competing with the three main situations.

The route illustration responds only after a meaningful selection:

- one destination becomes a single-destination journey that may still include connections;
- several stops becomes a multi-segment sequence;
- departure close becomes a restrained time-window state;
- personal advisor reveals the review lenses without pretending to compare live itineraries.

The selector identifies the primary way to begin, not an exclusive classification of the journey. Selecting time-sensitive travel must not erase existing multi-city legs or imply that the trip is single-destination.

Never make the first state look like guaranteed nonstop availability. Do not show live searches, fares, flight numbers, airline marks, schedules, availability indicators, or recommendations.

Keep the selector lightweight. It may ask for the situation and a small number of relevant constraints. Detailed routes, dates, segments, and contact details stay in the central Trip Brief.

### State and payload contract

Add exactly one optional backward-compatible field:

```text
serviceIntent: null | 'single_destination' | 'complex_itinerary' | 'time_sensitive' | 'personal_advisor'
```

Implement it end to end in:

- initial state;
- editable Trip Brief summary;
- safe session allowlist and restoration;
- client validation and serialization;
- server normalization and strict validation;
- advisor email rendering;
- customer-safe fallback text where applicable;
- request-size handling;
- contract tests.

Never encode structured context inside the visitor's notes.

Correct the existing hardcoded `source: 'homepage'`. `source` remains optional for backward compatibility: missing or empty source is accepted for legacy callers, while any present value is restricted to `homepage` or `services`. The UI-generated value is still untrusted client input and must never affect authorization, anti-abuse decisions, or delivery behavior.

Use last explicit conversion-touch attribution:

- submitting the form without a prior cross-route action -> `homepage`;
- selecting a Services situation or activating a Services Plan/Continue CTA -> `services`;
- passive route viewing and Home form mounting do not change source;
- a new explicit Home start -> `homepage`;
- clear source only after server-confirmed success or an explicit draft reset.

Persist source only as safe attribution state. Test absent, empty, both valid values, a rejected unknown value, SPA navigation, full reload, Back, validation failure, recoverable failure, and retry.

Before implementation, write this field-mapping table for every Services control:

| Control | Existing/new Trip Brief field | Stored in session | Submitted to API |
|---|---|---|---|

Do not infer `tripType` from `serviceIntent`.

Only an explicit date-flexibility choice may update `flexibility`, using `exact`, `plus_minus_1`, `plus_minus_3`, or `flexible`. Other Fixed/Flexible labels remain explanatory in Phase 1. Do not add further payload fields during this run.

Changing `serviceIntent` may clear only controls owned exclusively by the Services interaction. It must never clear trip type, route, legs, dates, travelers, cabin, flexibility, comfort, contact fields, notes, or consent. In Phase 1, changing only `serviceIntent` normally requires no other field clearing. Explain any exceptional clearing visibly.

### Actions and route discovery

Selecting a state never auto-navigates.

Every state has one primary link:

`Continue my trip brief` → `/#request-form`

The selected `serviceIntent` survives navigation.

Contextual learn-more links:

- `single_destination` → `/business-class-flights` and `/first-class-flights`;
- `complex_itinerary` → `/services/complex-itineraries`;
- `time_sensitive` → `/services/last-minute-business-class`;
- `personal_advisor` → `/services/premium-flight-advisor`.

Add a quiet, cardless `Plan by journey` index for:

- `/business-class-flights/europe`;
- `/business-class-flights/usa`.

All seven secondary cabin/service/corridor routes must be reachable from Services without appearing in the global navbar.

### Content rhythm

Use this sequence as a starting point:

1. Services hero and first Itinerary Desk choice.
2. Complete situation selector and responsive route transformation.
3. `Fixed / Flexible` explanation tied to the selected situation.
4. `How Derek reviews` using the existing Schedule, Cabin, Routing, Flexibility, ticket/fare conditions, and Total trip fit content in a cardless composition.
5. Contextual service and journey links.
6. Focused existing FAQ.
7. Final `Continue my trip brief` action.

Every section gets one job. Remove repeated defensive copy. Place limitations only where they change a decision.

### Motion

- One restrained hero entrance.
- One clear transformation of the itinerary line after selection.
- Short state/press/focus transitions.
- Use the current GSAP/CSS stack; add no animation library.
- Animate transform/opacity where possible.
- Use strong ease-out for entrances and ease-in-out for morphs.
- Routine UI transitions stay around 150–250ms.
- Never use `transition: all`, `ease-in`, scale from zero, raw cursor tracking, continuous particles, parallax for decoration, or auto-scroll.

With reduced motion, show every route state already resolved. Selection and explanation remain fully functional without drawing/morphing animation.

### Responsive and semantic fallback

Design mobile independently; do not shrink the desktop desk. Transform the horizontal route into a vertical sequence with the explanation next to its control. Do not require horizontal swiping.

Use semantic buttons/radios, visible labels, accessible name/role/state/instructions, and restrained live-region announcements. Essential meaning never depends on color or hover.

With JavaScript disabled in generated `dist/services.html`, keep visible and usable:

- unique H1 and value explanation;
- links to all seven secondary cabin/service/corridor routes;
- primary `/#request-form` link;
- limitations and FAQ text;
- complete footer navigation.

The animated route and state transfer may be absent; do not represent them as functional without JavaScript.

## Truthfulness

Do not restore or invent prices, savings, reviews, ratings, customer counts, response times, private inventory, airline relationships, biography details, or product availability.

Any route/cabin example that could look real remains adjacent to a visible `Illustrative` label in every state. Do not use plausible flight numbers, carrier names, schedules, or `Best`/`Recommended` badges.

Create a claim ledger for every added or changed factual statement:

- existing approved copy;
- owner-confirmed fact;
- clearly illustrative content;
- blocked pending evidence.

Blocked claims do not ship.

## SSR, SEO, and loading boundaries

Preserve all 16 current published routes and wildcard 404 behavior.

`src/seo/routeManifest.js` remains the canonical metadata/prerender/sitemap source. Preserve the Services pathname, one unique SSR H1, title, description, canonical, social metadata, structured data, preview noindex behavior, clean URLs, sitemap, and real 404 output.

Keep semantic route content synchronous for the current `renderToString` SSR pipeline. Do not put the H1 or essential content behind `React.lazy`/Suspense. Dynamically import only optional heavy client enhancement code after hydration. Failure leaves the complete semantic Services page visible.

Home must not request Services-only media or optional enhancement chunks. Services must not request media for later routes. Do not add Three.js for a route line that SVG/CSS can render accessibly and more cheaply.

Record before/after Vite JS/CSS byte sizes and each new media file's dimensions/bytes. Distinguish shared initial code from optional enhancement code and verify claimed splitting from the build/network output.

## Required verification

Run after the final edit:

- `npm.cmd test`;
- `npm.cmd run build`;
- `npm.cmd run preview:static` for built-artifact checks;
- no-JavaScript inspection of `dist/services.html`;
- console, page-error, hydration, link, and media-failure checks.

Viewports:

- 1440 × 1000;
- 1366 × 768;
- 1280 × 720;
- 768 × 1024;
- 390 × 844;
- 320 × 800;
- 844 × 390 landscape;
- 200% browser zoom and 320 CSS px reflow;
- increased text spacing and forced colors;
- safe-area CSS and Visual Viewport behavior in emulation;
- a real on-screen keyboard only when a real mobile/device surface is available; otherwise record real-device keyboard behavior as unverified and do not describe it as tested.

Accessibility gates:

- complete keyboard/touch operation;
- visible, unobscured focus and logical tab order;
- 44 × 44 CSS px standalone targets, with documented WCAG-compliant exceptions for smaller inline controls;
- normal text contrast at least 4.5:1;
- large text, meaningful boundaries, icons, and focus at least 3:1;
- no sticky element covers focused content;
- OS reduced motion overrides the site preference;
- any motion lasting more than five seconds has a reachable pause/stop control.

State tests:

- no optional visual default enters storage/summary/payload before selection;
- each `serviceIntent` maps correctly and remains editable/removable;
- changing `serviceIntent` preserves all unrelated trip values and clears only Services-owned state when a documented incompatibility exists;
- browser Back, edit, refresh, validation failure, recoverable 503, and retry preserve unrelated safe values;
- success requires `{ ok: true }` plus a non-empty request reference;
- a local no-delivery fixture proves the serialized payload;
- no name, email, phone, notes, consent, or other contact PII appears in session storage;
- no test request reaches production delivery.

Regression checks:

- all 16 existing routes still prerender;
- protected Home regions -- hero composition below the header, comfort scene, narrative, and form -- match at identical viewports and states. Header, mobile menu, and footer may differ only through the explicitly approved navigation and shared-shell changes; annotate those intentional differences in the comparison;
- one shared header/footer/main/skip link/motion preference/analytics instance per route;
- Services, About Derek, and Journal appear in Home and interior headers;
- all secondary routes remain reachable through Services, context, or footer;
- Services selection survives navigation to Home, Trip Brief editing, browser Back, and reload;
- unknown URLs still return the branded 404 with correct head rules.

Performance evidence:

- capture pre/post route waterfalls and bundle report;
- run three cold mobile lab measurements and report the median and settings;
- identify LCP element, CLS sources, and main-thread blocking work;
- do not describe Lighthouse/lab numbers as field Core Web Vitals;
- stop offscreen animation work and prevent layout shift from media.

Use an already available Lighthouse runner without modifying dependencies. If none exists, do not install one implicitly; record Lighthouse as unavailable, capture the build/network/runtime evidence that is available, and mark that performance item unverified instead of claiming the phase passed it.

Record the current baseline before editing. Fail the phase if Home or Services initial JavaScript/CSS grows by more than 10% without an itemized cause and explicit owner acceptance, or if Home requests Services-only enhancement code/media. Report absolute and gzip sizes for shared and route-specific output.

## Delivery

Provide:

1. complete local Phase 0 + Services implementation;
2. exact changed files and reasons;
3. desktop/tablet/mobile built screenshots;
4. annotated Home same-state before/after comparisons that separate protected regions from approved shared-shell differences;
5. Services default state, all four selected states, reduced motion, JavaScript-disabled content, and optional-enhancement failure;
6. a media-blocked fallback only if Services introduces route-specific external media; do not create artificial user-facing error or media states solely to satisfy QA evidence;
7. exact tests/build commands and results;
8. field-mapping table and local-fixture payload evidence;
9. bundle/network/media impact;
10. asset source/rights manifest;
11. claim ledger;
12. explicit unverified items or missing owner facts/assets.

## Stop condition

Stop after the shared foundation and `/services` pass these gates. Present the preview and evidence for owner review. Do not begin About or any later page in this run.

Begin by reading the required files and recording the baseline. Then implement without reopening the approved design choices.
