# Astra — Fly with Derek multipage redesign

## Active instruction for this run

Extend the approved cinematic homepage into a coherent, premium multipage website. Work **one page at a time**.

For the first run, complete only:

1. **Phase 0 — shared foundation and minimal navigation**;
2. **Phase 1 — `/services`, The Itinerary Desk**.

Deliver a complete local preview and route-specific QA evidence for those two phases, then stop for owner review. Do not redesign About, cabin pages, corridor pages, service detail pages, articles, legal pages, or 404 during the first run. Do not deploy or release the site.

The remaining page briefs in this document are the approved continuation plan. They exist so the foundations created now support the later routes without making them identical.

## Objective

Create a business-effective website with the emotional quality of a high-end interactive editorial experience. The site must feel calm, cinematic, personal, and unusually considered while making one commercial action easier: giving Derek a useful premium-flight trip brief.

The homepage creates anticipation. Every interior page must demonstrate a different part of Derek's value:

- Services organizes the travel situation.
- About builds trust in the person.
- Business Class evaluates the whole journey.
- First Class explains continuity and fit.
- Corridor pages frame direction-specific arrival decisions.
- Service detail pages turn complexity into a usable brief.
- The journal turns reading into a better decision.

Spectacle must explain, orient, or help the visitor express a real priority. Do not add interaction only because it looks impressive.

## Owner-approved decisions — fixed

The owner approved the recommended direction on September 12, 2026 and delegated the final design choices.

| Area | Approved direction |
|---|---|
| Navigation | `Services · About Derek · Journal · Plan my trip`; no list of every route in the navbar and no mega-menu |
| Services | The Itinerary Desk |
| About | Across the Desk from Derek with an annotated illustrative brief |
| Business Class | The Whole-Journey Lens |
| First Class | Continuity Ribbon plus a priorities selector |
| Corridor pages | Arrival Horizon for US → Europe; Beyond the Gateway for Europe → USA |
| Complex itineraries | Full Route Atelier interaction |
| Time-sensitive travel | Departure Brief |
| Premium advisor | Derek's Review Lens |
| Blog | Premium Flight Journal with useful decision tools |
| Articles | One distinct interactive explainer per existing article |
| Conversion | Add `/plan-my-trip` only in its later approved phase; continue using the existing central form until then |
| Delivery | Complete and approve one page before starting the next |

These choices supersede incompatible older page concepts. Do not ask the owner to choose again unless a real missing asset, business fact, or legal fact blocks the approved direction.

## Workspace and sources of truth

Workspace:

`C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti`

Read before editing:

- `AGENTS.md`
- `design-research/2026-09-09/ASTRA_HOMEPAGE_PROTOTYPE_PROMPT.md`
- `design-research/2026-09-12/MULTIPAGE_DESIGN_STRATEGY.md`
- `IMPLEMENTATION_NOTES.md`
- `QA_REPORT.md`
- `src/App.jsx`
- `src/components/layout/Layout.jsx`
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/homepage/Homepage.jsx`
- `src/components/homepage/TripForm.jsx`
- `src/components/homepage/tripState.js`
- `src/pages/Services.jsx`
- `src/pages/About.jsx`
- `src/pages/Blog.jsx`
- `src/pages/BlogArticle.jsx`
- `src/pages/CoreLanding.jsx`
- `src/data/corePages.js`
- `src/data/siteData.js`
- `src/seo/routeManifest.js`
- `src/utils/quoteRequest.js`
- `api/quote.js`
- current package scripts and installed dependency versions

Inspect the current Git state and the built site before changing files. Do not assume that old documentation reflects current dependency versions or deployed behavior.

Before editing, record `git status`, run `npm.cmd test`, run `npm.cmd run build`, and inspect the freshly generated prerendered site through `npm.cmd run preview:static`. Use the same commands after implementation. Use the static preview, not only the Vite development server, for canonical, SSR HTML, clean-URL, and 404 evidence.

If baseline tests, build, prerender, or required browser capture already fail, record the exact pre-existing failure and stop when it prevents a trustworthy before/after comparison. Do not silently absorb unrelated baseline repairs into this phase.

## Existing homepage — protected visual reference

The current homepage in commit `5b90bcc` is the approved visual anchor:

- `design-research/2026-09-09/concept-01-departure.png` remains the mandatory hero reference, represented by the approved loop and matching poster;
- cinematic aircraft-window hero;
- real subtle cloud-view loop and matching poster;
- `A better journey. Personally arranged.` hierarchy;
- From / To entry in the hero;
- genuine Derek portrait;
- interactive `How do you want to arrive?` section;
- one progressive Trip Brief and production request flow.

Do not redesign the homepage hero, comfort scene, typography, imagery, or narrative during Phase 0. Change only what is necessary to unify the navigation architecture, shared state, footer behavior, accessibility, and routing. Capture before/after screenshots and reject any visual regression to the approved homepage.

The aircraft window belongs to Home. Interior pages must share the atmosphere and material quality without cloning that composition.

## Audited problems to solve

1. The homepage currently bypasses the global site shell and exposes only in-page links in its header. The other routes therefore feel missing even though they still exist.
2. Services and Journal are available from the homepage footer, while Business Class and First Class are absent from the homepage's primary navigation.
3. Seven service/SEO pages use the same `CoreLanding` composition with different copy.
4. Current landing-page heroes use the same navy/rings treatment and oversized title. In current desktop captures, the principal CTA falls below the first viewport on most inspected routes at approximately 1280 × 720.
5. An earlier implementation had more visual components, but some depended on unsupported prices, savings, reviews, client counts, biography facts, or airline relationships. Recover visual quality without restoring unverified claims.

## Complete route inventory — preserve all existing URLs

Do not delete, rename, merge, redirect, or hide any existing route:

```text
/
/services
/about
/blog
/privacy
/terms
/business-class-flights
/first-class-flights
/business-class-flights/europe
/business-class-flights/usa
/services/last-minute-business-class
/services/complex-itineraries
/services/premium-flight-advisor
/blog/why-travelers-overpay-business-class
/blog/business-class-service-beyond-seat
/blog/last-minute-business-class
```

Preserve wildcard NotFound behavior and the generated `404.html`. The later `/plan-my-trip` route is additive and must not replace `/#request-form` until its own phase is approved and validated.

## Visual thesis

**Private travel editorial meets a precise itinerary studio:** deep navy architecture, warm natural light, tactile cabin materials, restrained burgundy instruments, large confident typography, and generous white space. The energy is quiet, assured, and human.

Use the existing system:

- Deep navy: `#0B1929` and `#08101A`.
- Burgundy: `#8A194F`; hover `#6E1340`.
- White: `#FFFFFF`.
- Light surface: `#F5F5F7`.
- Display: Syne.
- Body and controls: DM Sans.

Natural photographic colors may appear in skies, cabin materials, portraits, and editorial imagery. Do not introduce competing brand accents.

## Composition rules

- Treat every first viewport as a poster: one clear promise, one dominant visual, one primary action.
- Keep the header, H1, value sentence, CTA, and beginning of the signature interaction visible at common laptop dimensions, including 1280 × 720.
- Prefer image-led, cardless layouts, strong cropping, columns, dividers, and editorial sequencing.
- Do not create generic card grids, floating dashboard mosaics, pill soup, logo clouds, or repeated gradient boxes.
- Keep headlines to approximately two or three lines on desktop and readable at a glance on mobile.
- Give each section one job and remove repeated explanations.
- Use at most two typefaces and the existing accent color.
- The page must remain premium when shadows and decorative effects are removed.

The cinematic hero and signature-interaction requirements apply to marketing and service pages. Journal articles, legal pages, and 404 use the composition appropriate to their job; do not force a cinematic hero or ornamental interaction where readability and speed are more valuable.

## Shared navigation — deliberately minimal

Desktop header:

```text
Fly with Derek     Services     About Derek     Journal     [Plan my trip →]
```

Rules:

- The logo links to `/`; do not add a separate Home link.
- Services links to `/services`; no mega-menu in the approved version.
- About Derek links to `/about`.
- Journal links to `/blog`.
- Plan my trip reaches the central Trip Brief without losing existing safe state.
- Do not put Business, First, corridor pages, or individual service pages in the top-level navbar.
- The Services hub, contextual links, and complete footer expose secondary routes.
- The mobile menu contains the same three destinations and CTA, not sixteen links.
- Centralize navigation and contact configuration so homepage and interior routes cannot drift again.
- Preserve Escape close, focus trap, focus return, body-scroll restoration, visible focus, safe-area spacing, and internal mobile scrolling.

Logo and navigation destinations use React Router links with real `href` output. `Plan my trip` is a semantic link to `/#request-form`, progressively enhanced with same-page smooth scrolling. It must work from `/services`, after full reload, and from the prerendered artifact without JavaScript.

Keep `src/data/siteData.js` `contactConfig` as the sole contact source. Remove homepage-local phone, email, WhatsApp, and `LIVE` constants when extracting shared chrome. Do not change current contact values during this phase.

`AnnouncementBar` is not part of the owner-approved minimal chrome. Stop rendering it on all routes during Phase 0, but do not delete the component as unrelated cleanup.

When `AnnouncementBar` stops rendering, remove its height from `--header-total`, `--sticky-offset`, scroll padding, hero spacing, and mobile offsets. Verify that `#request-form`, focused headings, and validation-error targets are not hidden beneath either header variant.

After Phase 0, `Layout`/`SiteShell` owns the only skip link, shared header, single `<main id="main-content">`, and shared footer on every route. Remove the internal header, main, footer, and duplicate skip link from `Homepage`; extract their approved visual treatment into shared variants. Page components render route sections only. Home keeps an immersive transparent header variant while interior routes use a solid or context-sensitive variant. Do not leave two parallel site shells.

Keep one route-focus controller. On pathname changes it focuses the new page H1; on `/#request-form` it scrolls to the section and focuses `#trip-section-title`. Test Services → Plan my trip → browser Back. Do not introduce competing scroll-to-top effects.

## Shared Trip Brief — the product differentiator

Move safe trip intent high enough in the application tree that route-specific interactions can contribute to the same editable Trip Brief.

Mount `TripBriefProvider` inside the active BrowserRouter/StaticRouter context and above `SiteShell`/`Routes` in `App`. Its server render and first client render must use the same deterministic initial state. Read session storage only after hydration to avoid a hydration mismatch.

Move session restoration and safe persistence ownership out of `TripForm` and into the provider. Restore exactly once. Merge a newly selected route intent with stored progress using explicit field precedence; mounting `TripForm` must never overwrite the selection that initiated navigation. Remove duplicate restoration/persistence effects from `TripForm`.

Restoration precedence is: explicit choices made during the current browser session > restored safe session data > initial defaults. If a visitor interacts before asynchronous storage restoration completes, restoration may fill untouched fields only and must never overwrite a dirty field.

The provider owns draft clearing as well as restoration/persistence. After server-confirmed success, `TripForm` signals the provider to remove the stored safe draft and suspend automatic write-back while the success state is displayed. Starting a new request resets state and re-enables persistence. A successful removal must not be immediately overwritten by unchanged provider state.

Build on the existing `tripState.js`, `TripForm.jsx`, validation, serializer, and `/api/quote` contract. Preserve:

- `round_trip`, `one_way`, and `multi_city`;
- two-to-six-leg multi-city behavior;
- From and To;
- dates;
- travelers;
- cabin;
- flexibility;
- comfort values exactly as `rested`, `work`, or `together`;
- notes and contact preference;
- privacy acknowledgement;
- validation and focus recovery;
- recoverable network/server errors;
- server-confirmed success.

Route interactions may add validated, non-PII context such as preferred cabin, arrival purpose, route direction, fixed/flexible constraints, connection tolerance, or multi-city legs.

Rules:

- One Trip Brief, one submission path, one validation contract.
- Do not create a separate quote form or submission implementation for each page.
- Do not persist name, email, phone, free-form notes, acknowledgement, or other contact PII in session storage.
- Every new optional preference introduced by this redesign starts as `null` and is serialized only after explicit selection. Do not change the established required defaults for cabin, traveler count, contact preference, or date flexibility during this phase.
- Every stored choice remains editable and can be removed.
- Changing `serviceIntent` may clear only controls owned exclusively by the Services interaction. It must never clear trip type, route, legs, dates, travelers, cabin, flexibility, comfort, contact fields, notes, or consent. In Phase 1, changing only `serviceIntent` normally requires no other field clearing. Explain any exceptional clearing visibly.
- Back navigation, route navigation, validation errors, and changing one preference must not erase unrelated fields.
- Continue posting only to `/api/quote`.
- If adding a field, update UI, safe storage rules, client validation, server validation, email rendering, fallbacks, and contract tests together.
- Preserve honeypot, timing checks, request-size limits, escaping/sanitization, rate limiting, optional Turnstile, and delivery behavior.
- Show success only after an HTTP success response with `{ ok: true }` and a non-empty request reference.
- During QA, intercept or isolate submission. Never send test leads through the production delivery path.

If the shared state replaces the current homepage-specific storage key, implement and test a versioned migration so a safe existing draft is not silently lost. Keep storage access SSR-safe.

Phase 1 adds exactly one optional, backward-compatible structured field:

```text
serviceIntent: null | 'single_destination' | 'complex_itinerary' | 'time_sensitive' | 'personal_advisor'
```

It must appear as an editable/removable Trip Brief item and be allowlisted through initial state, safe session progress, restoration, client validation, serialization, server normalization/validation, advisor email, customer-safe fallback text, request-size handling, and contract tests. Never encode it by altering the visitor's free-form notes. Existing field meanings remain unchanged. Do not add another submitted field during Phase 1.

The existing `source` field must stop being hardcoded inaccurately as `homepage`. `source` remains optional for backward compatibility: missing or empty source is accepted for legacy callers, while any present value is restricted to `homepage` or `services`. The UI-generated value is still untrusted client input and must never affect authorization, anti-abuse decisions, or delivery behavior.

Use last explicit conversion-touch attribution:

- submitting the form without a prior cross-route action -> `homepage`;
- selecting a Services situation or activating a Services Plan/Continue CTA -> `services`;
- passive route viewing and Home form mounting do not change source;
- a new explicit Home start -> `homepage`;
- clear source only after server-confirmed success or an explicit draft reset.

Persist source only as safe attribution state. Test absent, empty, both valid values, a rejected unknown value, SPA navigation, full reload, Back, validation failure, recoverable failure, and retry.

### Active-phase field-mapping gate

Before implementation, document every Services control as:

| Control | Existing Trip Brief field | Stored in session | Submitted to API |
|---|---|---|---|

Do not infer a trip type merely from `serviceIntent`. Do not place structured context inside free-form notes. Arbitrary URLs or page labels must not be accepted as an unvalidated submission source.

Only an explicit date-flexibility choice may update the existing `flexibility` field, using its exact accepted values: `exact`, `plus_minus_1`, `plus_minus_3`, or `flexible`. Other Fixed/Flexible markers are explanatory during Phase 1. Do not add further payload fields during this run, and never infer or submit a hidden value from visual state.

## Motion and interaction thesis

Each page gets three motion layers at most:

1. one restrained hero entrance;
2. one explanatory motion tied to the signature interaction;
3. small press, focus, hover, and state transitions that sharpen feedback.

Use the current GSAP/CSS foundation; do not add another animation framework without a concrete need.

Motion rules:

- Animate only transform and opacity where possible.
- Use strong ease-out for elements entering and ease-in-out for on-screen morphs.
- Avoid `ease-in`, `transition: all`, animation from `scale(0)`, and sluggish 400ms dropdown interactions.
- Keep routine UI transitions around 150–250ms.
- Use subtle `scale(0.97)` press feedback on buttons where it does not cause layout change.
- Marketing motion can be slower when it explains the page, but must remain interruptible and skippable.
- No scroll hijacking, fake loading, cursor gimmicks, continuous particle fields, gratuitous parallax, or automatic carousels.
- Pause video/canvas work when offscreen or when the document is hidden.
- Never hide essential information behind hover.
- Persist the user-facing Reduce motion preference across SPA route navigation. The operating-system reduced-motion preference always wins.
- Give every automatically moving visual lasting more than five seconds a reachable pause/stop control.
- Repeated route navigation must not create duplicate animation-frame loops, ScrollTriggers, observers, or event listeners.

Move the existing manual Reduce motion preference into a shared motion provider used by Home media and interior-page motion. Initialize it after hydration without changing the server-rendered tree, and verify that route navigation does not reactivate motion.

Under `prefers-reduced-motion`:

- replace video with its poster;
- show routes and diagrams in their completed state;
- remove parallax, drawing animations, pulses, auto-scroll, and looping decorative movement;
- preserve every choice and explanation;
- announce meaningful changes through text and appropriate live regions.

## Media rules

- Use real-looking, high-quality imagery that performs narrative work.
- Do not place UI, text, airline logos, or signage inside generated image assets.
- Do not regenerate Derek's portrait. Use the approved original and document its source.
- Cabin and itinerary imagery without verified product identity must be labelled `Illustrative` wherever it could be mistaken for a current airline product or live result.
- Provide WebP/AVIF or suitable responsive formats, fixed dimensions, and a polished static fallback.
- Load route-specific media and interactive code only on the relevant route.
- Do not load every page's scene globally.
- Record before/after built JavaScript and CSS byte sizes from Vite output and list every new media file with encoded dimensions and bytes. Distinguish initial shared code from optional enhancement code; do not claim route-level splitting unless the build manifest and network trace verify it.

The current SSR pipeline uses synchronous `renderToString`. Do not convert semantic route components or their H1/content to `React.lazy`/Suspense during this phase. Keep indexable route content synchronously SSR-renderable. Dynamically import only optional heavy client enhancements after hydration, preferably when their host approaches the viewport. A failed enhancement import leaves the complete semantic fallback visible.

## Truthfulness and brand boundaries

Do not invent or restore:

- savings percentages or fare examples;
- live inventory or seat availability;
- airline access, partnerships, endorsement, or affiliation;
- response-time or delivery promises;
- customer counts, average savings, ratings, or testimonials;
- qualifications, years of experience, biography milestones, or business relationships;
- article authors, publication dates, or additional articles;
- visa, airport, customs, schedule, aircraft, lounge, route, or product claims without maintainable sources and review dates.

Lead with useful value. Place limitations exactly where they influence a decision instead of repeating defensive copy throughout every section.

Before delivery, create a claim ledger for every added or changed factual statement with one status: existing approved copy, owner-confirmed fact, clearly illustrative content, or blocked pending evidence. A blocked claim must not ship.

Review visible copy, validation and success messages, image captions, alt text, accessible names, metadata, JSON-LD, Trip Brief summaries, serialized payloads, fallback messages, and generated email text. Illustrative labels must remain adjacent and visible in every interaction state; a tooltip, FAQ, or hidden description is insufficient. Do not use real-looking flight numbers, carrier names, schedules, prices, airport recommendations, availability indicators, or `Best`/`Recommended` states in illustrative comparisons.

## SEO, SSR, and routing invariants

`src/seo/routeManifest.js` remains the canonical source for route metadata, canonical URLs, index state, prerender paths, and sitemap membership. `corePages.js` remains the approved source for core-page copy, FAQs, breadcrumbs, related links, limitations, and schema content.

Every phase must preserve:

- the exact pathname and slug;
- one unique, visible, SSR-rendered H1;
- unique title and description;
- correct absolute canonical;
- existing Open Graph, Twitter, schema, and breadcrumb behavior;
- `cleanUrls: true` and `trailingSlash: false` behavior;
- production sitemap membership;
- preview/development `noindex` protection and suppressed JSON-LD;
- a `noindex, nofollow` 404 with no canonical or JSON-LD;
- real 404 status behavior;
- semantic links and copy without JavaScript.

Canvas, video, WebGL, and client interactions enhance semantic HTML. They never replace the H1, explanation, navigation, CTA, or indexable content.

Refactor the current `CoreLanding` architecture incrementally only when each affected route enters its approved phase. The first run must not refactor or redesign those pages beyond necessary shared-shell compatibility. When that work begins, use route-specific slots or a validated design registry keyed by the existing page IDs, and do not duplicate SEO copy in visual configuration files.

## Approved page briefs

### Home — The Window

**Job:** anticipation, personal positioning, and the first Trip Brief action.

**Protected signature:** cinematic aircraft window and `How do you want to arrive?` comfort studio.

**Allowed work in Phase 0:** shared navigation/footer/state integration and accessibility corrections without changing the approved composition.

### Services — The Itinerary Desk

**Job:** help a visitor identify the correct way to begin and make every secondary route discoverable.

**Visual:** a precise navy itinerary surface with a fine luminous route line, restrained burgundy controls, tactile labels, and large editorial typography. It should feel like Derek has opened a travel brief on a private desk.

**Signature interaction:**

- `One clear journey`;
- `Several connected stops`;
- `Departure is close`.

The route line transforms into a single-destination journey that may still include connections, a multi-segment sequence, or a time-window state. Beside it, show which facts matter and allow a small number of relevant `Fixed` / `Flexible` markers. Never make `One clear journey` look like a promise of a nonstop flight.

The selector identifies the primary way to begin, not an exclusive classification of the journey. Selecting time-sensitive travel must not erase existing multi-city legs or imply that the trip is single-destination.

The interaction explains and routes; it does not search inventory, calculate a fare, recommend a flight, or pretend to verify availability.

Selecting a state never auto-navigates. Each state has one primary conversion link, `Continue my trip brief`, which preserves the chosen `serviceIntent` and navigates to `/#request-form`.

It also exposes contextual learn-more links:

- `single_destination` → both `/business-class-flights` and `/first-class-flights`;
- `complex_itinerary` → `/services/complex-itineraries`;
- `time_sensitive` → `/services/last-minute-business-class`;
- the quiet advisor path sets `personal_advisor` and links to `/services/premium-flight-advisor`.

If `Choose how to start` is used elsewhere, it may only move focus to an otherwise offscreen selector; it must not unlock or gate the choices.

Keep this hub interaction lightweight: select the travel situation and at most a small number of relevant constraints. Detailed airports, dates, segments, and contact information remain in the central Trip Brief.

### About — Across the Desk from Derek

**Job:** build trust in the real person and distinguish Derek's role from the service framework.

**Visual:** a large genuine portrait, intimate editorial light, generous space, and subtle cabin-material references.

**Signature interaction:** an explicitly illustrative itinerary brief with questions such as `What cannot change?`, `Where does comfort matter most?`, and `What happens after arrival?`. Selecting a question reveals the note Derek would investigate.

Use only owner-confirmed biography. A later real 20–30 second opt-in video is allowed after a genuine asset is supplied. Do not invent a timeline, credentials, or client proof.

**CTA:** `Tell Derek about my journey`.

### Business Class — The Whole-Journey Lens

**Job:** show why a business-class decision includes the complete itinerary.

**Visual:** `Departure → Long-haul → Connection → Arrival`, shown through an elegant journey timeline and abstract cabin details without airline branding.

**Signature interaction:** `Look beyond the seat` with Cabin, Connection, Arrival, and Conditions lenses. Explain what should be confirmed and how each dimension affects the trip. Reuse a Home comfort preference as context without repeating the Home selector.

**CTA:** `Review my whole journey`.

### First Class — Continuity of the Experience

**Job:** help the visitor describe which first-class differences matter and understand segment continuity.

**Visual:** an intimate, slow suite detail built from light, material, privacy, and space; a distinct composition from Home.

**Signature interaction:** a segment ribbon showing where cabin, continuity, ground experience, connections, and useful product duration need confirmation. Pair it with `Which differences matter to you?`: Privacy, Personal space, Ground experience, Journey continuity.

No automatic verdict, `Best` badge, product guarantee, or implied availability.

**CTA:** `Compare First around my priorities`.

### US → Europe — Arrival Horizon

**Job:** plan backward from the first day after an eastbound transatlantic journey.

**Visual:** a refined night-to-dawn light band and journey axis, related to aviation without repeating Home's window.

**Signature interaction:** `What must your first day feel like?`: Rested, Ready for a commitment, Continuing onward. Show an illustrative `Depart → Arrive → First plan` axis and add the chosen arrival purpose to the Trip Brief.

Do not show invented flights, schedules, arrival times, aircraft, products, or availability.

**CTA:** `Plan my Europe arrival`.

### Europe → USA — Beyond the Gateway

**Job:** clarify whether the first US airport is the actual destination or another step in the journey.

**Visual:** `European origin → possible US gateway → actual destination`, with a westbound sense of light and distance.

**Signature interaction:** `Where does your journey really end?`. A visitor can indicate whether the first gateway is final or whether another segment/transfer follows. Hidden fields must not submit stale values.

This page must not be a mirrored copy of US → Europe. Do not recommend gateways or state transit/customs feasibility without current sources.

**CTA:** `Map my complete US journey`.

### Complex Itineraries — Route Atelier

**Job:** make Derek's value visible for multi-city, open-jaw, and mixed-priority travel.

**Visual:** an abstract constellation of city nodes and fine contrail lines.

**Signature interaction:** add and reorder two to six segments, mark fixed/flexible dates, and identify where cabin priority matters most. A layer titled `Derek will verify` highlights cabin continuity, airport continuity, and dependencies without pretending to check real schedules.

Drag-and-drop must have Move up / Move down controls and full keyboard support. On mobile, use a clear vertical editor rather than a shrunken canvas.

This is the second major visual moment after Home. Load its code and media only on this route.

**CTA:** `Build my complete itinerary`.

### Last-Minute Business Class — Departure Brief

**Job:** obtain a complete, realistic time-sensitive request quickly.

**Visual:** calm night runway light and a precise operational brief. Keep this page especially lightweight.

**Signature interaction:** `Cannot move` and `Can flex`. A completion indicator measures only brief completeness and ends at `Ready for Derek to review`.

No countdown, instant-response language, availability promise, seat hold, artificial urgency, or heavy hero canvas.

**CTA:** `Start my time-sensitive brief`.

### Premium Flight Advisor — Derek's Review Lens

**Job:** demonstrate the value of a human review without repeating the About story.

**Visual:** genuine Derek portrait next to a raw illustrative itinerary that becomes clearer layer by layer.

**Signature interaction:** Rest, Timing, Connections, Flexibility, and Cabin continuity lenses. Changing the lens updates the visual, short explanation, and Trip Brief.

Any sample itineraries remain permanently labelled `Illustrative comparison`. Use a semantic table/list fallback. Do not display `Best`, `Recommended`, prices, or live product claims.

**CTA:** `Share my priorities with Derek`.

### Blog — The Flight Journal

**Job:** give the three existing articles a premium editorial identity and guide visitors by the decision they face.

**Visual:** one strongly illustrated feature story and two secondary editorial compositions. Images explain cabin continuity, connection structure, or trip-brief preparation.

**Signature interaction:** `What are you deciding?`: Comparing options, Evaluating the whole journey, Preparing a time-sensitive request.

Do not build an oversized category/filter system for a three-article library. Keep the foundation ready to grow later.

**CTA:** `Apply a guide to my trip`.

### Article 1 — A Better Way to Compare Business Class Options

Add an accessible decision matrix for Schedule, Cabin continuity, Routing, Flexibility, and Conditions. A visitor can add selected priorities to the Trip Brief. The prose remains the primary SSR content.

### Article 2 — Business Class Is More Than the Seat

Add a restrained `Journey X-ray` narrative through airport, departure, cabin, connection, and arrival. Every scene answers one practical question. Native scrolling remains fully controlled by the visitor.

### Article 3 — How to Prepare a Time-Sensitive Premium Flight Request

Add a `Known / Flexible / Missing` readiness checklist that can transfer safe context into Departure Brief. It measures completeness, not availability or response speed.

Do not add `author`, `datePublished`, or `dateModified` to article UI or structured data. The current approved article records intentionally omit unverified authors and publication dates.

### Privacy — Privacy in Plain English

Use a calm legal-document shell with a navigation summary, sticky table of contents, visible existing review date, and a simple `What you send → Why it is used → What not to send` diagram. Preserve the complete existing legal copy. It is implementation-reviewed and must not be described as legally approved. Do not change its meaning, add a legal interpretation, or change the displayed last-updated date without owner and qualified legal review. Any visual summary must use direct, faithful excerpts and state that the complete policy controls.

### Terms — Before You Decide

Reuse the legal shell with concise navigation to the existing terms. Preserve the complete existing copy. Do not change its meaning, add an interpretive summary, alter the displayed last-updated date, or add operational promises without owner and qualified legal review. Any visual overview must use faithful excerpts and state that the complete terms control.

### 404 — Lost Route

Use a lightweight interrupted route above the clouds with immediate actions: Return home, Explore services, Plan my trip. Preserve real 404 behavior, noindex/nofollow, no canonical, and no JSON-LD.

### Future additive route — `/plan-my-trip`

After all existing priority pages are approved, add a shareable dedicated conversion route that reuses the same Trip Brief component, context, validation, API contract, privacy behavior, and success criteria. Do not create a second implementation or remove the homepage form.

Do not add `/plan-my-trip` during the first run. Its later phase requires a separately approved title, description, canonical, indexing decision, route-manifest entry, App route, prerender output, sitemap behavior, and tests before implementation.

## Phase 0 — implementation requirements for this run

1. Create or refactor the shared navigation/contact configuration.
2. Implement the exact minimal navigation approved above, with no dropdown.
3. Give Home an immersive header variant and interior pages a compatible solid/contextual variant.
4. Keep Home reachable through the logo only. The visible text destinations are Services, About Derek, and Journal, followed by Plan my trip. Secondary routes remain available through Services, contextual links, and footer.
5. Keep exactly one main landmark and working skip navigation per route.
6. Build or prepare the shared safe Trip Brief provider without changing submitted meaning or exposing PII.
7. Preserve the approved Home appearance except for the corrected navigation and shared-shell integration.
8. Record a before/after Home comparison at desktop and mobile.

Verify that shared-shell integration creates no duplicate header, footer, main landmark, skip link, motion preference, or analytics instance. Compare Home before/after at identical viewports and states. Protected Home regions -- hero composition below the header, comfort scene, narrative, and form -- must match. Header, mobile menu, and footer may differ only through the explicitly approved navigation and shared-shell changes; annotate those intentional differences in the comparison. A screenshot pair without a same-state comparison is insufficient evidence.

## Phase 1 — detailed Services implementation for this run

### Content plan

1. **Hero:** Services identity, `Premium travel, reviewed as a whole`, one concise value sentence, CTA, and the beginning of the itinerary desk in the first viewport.
2. **Itinerary Desk:** the three primary travel situations, the quieter Personal flight advisor path, and their transforming route states.
3. **What changes with the request:** a cardless explanation of fixed/flexible details and why the relevant service differs.
4. **How Derek reviews:** retain the approved Schedule, Cabin, Routing, Flexibility, ticket or fare conditions presented for a specific option, and Total trip fit content, but do not repeat it as six identical boxes.
5. **Service paths:** clear links to Personal Advisor, Complex Itineraries, and Time-Sensitive Travel, with Business and First guidance available in the single-destination state.
6. **Focused FAQ:** preserve approved answers and semantic accordion behavior.
7. **Final CTA:** continue the selected situation into the central Trip Brief.

### Interaction states

For each travel situation, specify and implement:

- default visual state;
- selected state;
- concise explanation;
- relevant fixed/flexible controls;
- destination/service link;
- safe data added to Trip Brief;
- keyboard and touch behavior;
- reduced-motion state;
- mobile composition;
- no-JavaScript fallback: the prerendered explanation and real destination links remain visible and usable. Animation and Trip Brief state transfer may require JavaScript and must not be represented as working without it.

Do not make a decorative route react to raw mouse position. The transformation should happen because the visitor made a meaningful choice.

In generated `dist/services.html`, with JavaScript disabled, verify that the unique H1, value explanation, links to all seven secondary cabin/service/corridor routes, primary `/#request-form` link, limitations, FAQ text, and footer navigation remain present and usable. The animated route transformation may be absent.

### First-viewport requirement

At 1280 × 720 and 390 × 844, the visitor must see:

- that this is the Services page;
- the H1;
- the value sentence;
- the primary CTA;
- the first Itinerary Desk option fully visible and keyboard/touch operable without scrolling. A clipped heading, decorative line, or partial control does not satisfy this gate.

The header and hero must be budgeted together. Do not stack a 100vh hero below a persistent header.

## Page-by-page continuation order

After Services is explicitly approved, continue in this order, one page per owner review:

1. About.
2. Complex Itineraries.
3. Business Class.
4. First Class.
5. US → Europe.
6. Europe → USA.
7. Last-Minute Business Class.
8. Premium Flight Advisor.
9. Blog hub.
10. The three article pages, each reviewed individually.
11. Privacy.
12. Terms.
13. 404.
14. `/plan-my-trip` as an additive final phase.

Do not treat approval of one route as approval of later routes.

## Acceptance gate for every page

Every active phase must pass its page-type gate.

For marketing, service, corridor, and blog-hub routes:

- Hero/signature treatment is specific to the route and its job.
- At 1280 × 720 and 390 × 844, the header, route identity, H1, value sentence, primary CTA, and beginning of the signature interaction are visible without scrolling. At 320 × 800, the header, route identity, H1, value sentence, and primary CTA remain visible, with the interaction beginning immediately afterward.

For article routes:

- The first viewport prioritizes journal identity, unique H1, concise introduction, reading orientation, and legibility.
- The article's interactive explainer appears at the point where it improves understanding; it need not be forced into the hero.

For Privacy and Terms:

- No signature interaction is required.
- The first viewport contains the H1, existing last-updated date, faithful introduction, and beginning of navigation/content.

For 404:

- It is intentionally absent from navigation.
- Test both an arbitrary unknown URL and generated `404.html`.
- Require HTTP 404, one H1, `noindex, nofollow`, no canonical, and no JSON-LD.
- Validate against `notFoundMetadata`; do not require a route-manifest entry.

Common gates for published routes and the applicable 404 checks:

- Exact route resolves correctly.
- Every published route is discoverable through header, Services hub, contextual navigation, or footer.
- Exactly one visible, unique, SSR-rendered H1.
- Metadata, canonical, structured data, and index state match the manifest or the applicable 404 metadata contract.
- Mouse, keyboard, and touch can complete the interaction.
- Tab order follows visual order; focus remains visible and is not covered by sticky UI.
- Standalone interactive controls provide a 44 × 44 CSS px target. Any smaller inline control must still meet WCAG 2.2 minimum target-size or spacing requirements and have its exception documented.
- Drag interactions have a non-dragging alternative.
- Normal text meets 4.5:1 contrast; large text, meaningful UI boundaries, icons, and visible focus meet at least 3:1.
- Every custom control exposes an accessible name, role, current state, instructions, and error relationship.
- SPA route and hash navigation move focus to the new page or requested section without creating a keyboard trap.
- Dynamic summaries use restrained live-region announcements and do not announce decorative animation frames.
- Forced-colors/high-contrast mode retains selection, focus, error, and fixed/flexible distinctions.
- Reduced-motion mode remains complete and understandable.
- Media failure produces a polished static fallback.
- No horizontal overflow, clipped text, overlap, or layout shift from missing media dimensions.
- Context added to the Trip Brief is accurate, removable, and survives navigation/back/edit.
- Every new optional visual preference introduced by the redesign is absent from storage, summary, and payload until explicitly selected. Established required defaults remain unchanged.
- Changing a situation, toggle, or route removes only obsolete route-specific optional values from the rendered summary and serialized payload; it never clears unrelated trip data.
- Back, edit, refresh, validation failure, and recoverable server failure preserve unrelated safe values.
- Captured local-fixture payload evidence proves the expected field mapping and confirms that contact PII, free text, and consent are absent from session storage.
- Submission QA uses a no-delivery local fixture: test validation failure, recoverable 503, retry, and success only after `{ ok: true }` with a non-empty reference. No production lead is sent.
- Contact PII remains excluded from session storage.
- Illustrative content is labelled and no unsupported claims appear.
- Route-specific media/code loads only where used.
- No console error, page error, hydration error, or broken link.
- Existing tests pass.
- `npm.cmd run build` completes client build, SSR build, all-route prerender, and SEO validation.

Phase 0/1 regression checks must also prove:

- all 16 existing URLs still prerender;
- homepage hero, video/poster, typography, comfort visuals, and form behavior match the approved baseline;
- one shared header/footer and one main landmark exist per route;
- Services, About Derek, and Journal appear in both Home and interior headers;
- Business Class, First Class, both corridor pages, and all three service-detail pages remain reachable through Services, contextual links, or footer;
- a Services selection survives navigation to Home, Trip Brief editing, browser Back, and reload;
- no contact PII, free text, or consent appears in the existing or migrated `fly-with-derek:*trip-progress*` session keys;
- no test request reaches production email delivery.

Test representative viewports:

- 1440 × 1000;
- 1366 × 768;
- 1280 × 720;
- 768 × 1024;
- 390 × 844;
- 320 × 800.

Also verify:

- 200% browser zoom at a common desktop viewport;
- reflow at 320 CSS px without two-dimensional scrolling;
- 844 × 390 mobile landscape;
- increased text spacing;
- safe-area CSS and Visual Viewport behavior in emulation;
- a real on-screen keyboard only when a real mobile/device surface is available; otherwise record real-device keyboard behavior as unverified and do not describe it as tested.

No sticky header, footer, CTA, dialog, or validation summary may cover focused content.

Use Lighthouse only as lab evidence. Where field Core Web Vitals are available, interpret LCP, INP, and CLS from real field data; do not claim field performance from a local Lighthouse run.

Use an already available Lighthouse runner without modifying dependencies. If none exists, do not install one implicitly; record Lighthouse as unavailable, capture the build/network/runtime evidence that is available, and mark that performance item unverified instead of claiming the phase passed it.

Record the pre-change and post-change route waterfall and bundle report. Home must not eagerly download Services-only media or an optional Services enhancement chunk; synchronous semantic route code may remain in the current SSR-compatible application bundle. Services must not download later-route media. Fail the phase if an offscreen loop continues consuming frames or media dimensions cause layout shift. Record the baseline first. Fail the phase if Home or Services initial JavaScript/CSS grows by more than 10% without an itemized cause and explicit owner acceptance. Report absolute and gzip sizes for shared and route-specific output. Run three cold mobile lab measurements with an available runner and report the median, test settings, LCP element, CLS sources, and main-thread blocking work; otherwise mark the unavailable lab evidence as unverified.

## Deliverables for each phase

1. A working local implementation of only the active phase.
2. Desktop, tablet, and mobile screenshots of the built version.
3. A before/after comparison for the redesigned route.
4. A short list of changed files and why each changed.
5. Exact tests/build commands and results.
6. Keyboard, reduced-motion, optional-enhancement failure, conditional media-fallback, and responsive verification notes.
7. Bundle/media impact for the active route.
8. An asset-source and rights manifest for new media.
9. A claim ledger for every added or changed factual statement.
10. A truthful list of anything not verified or still awaiting owner facts/assets.

For Services, capture the default state, all four selected states, reduced motion, JavaScript-disabled content, and optional-enhancement failure. For later routes, capture the first viewport and each state that the implemented interaction actually defines. Capture a media-blocked fallback only when route-specific external media exists. Do not create artificial user-facing error or media states solely to satisfy QA evidence. If the experience uses semantic HTML/SVG/CSS without external media, document that fact and verify optional enhancement failure; do not introduce media solely to satisfy this checklist.

## Stop condition for the first run

Stop after Phase 0 and the complete `/services` redesign pass the acceptance gate. Present the preview and evidence for owner review. Do not begin `/about` or any later page in the same run.

Begin by inspecting the current files and rendered baseline. Then implement the approved foundation and Services page without reopening settled design choices.
