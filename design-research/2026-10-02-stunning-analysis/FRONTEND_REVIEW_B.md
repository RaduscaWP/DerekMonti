# Independent frontend review B

Date: 2 October 2026. Stage: analysis only. Reviewer role: independent visual critic, senior frontend/performance/accessibility engineer. No application source, runtime asset, package, or product behavior was edited. No quote was submitted. No application build or production performance test was run for this review.

## Decision

The current site has a strong opening image and a substantially functional request flow. Its principal design problem is inconsistency and repetition, not a shortage of effects. Home, Services, About, Blog and the footer do not behave visually like one personal brand. Larger headings, more scenic backgrounds, more scroll reveals or a new floating aircraft would leave that problem intact.

**Conditionally support Derek → Your Journey:** lead with the actual supplied portrait in its own photographic setting, keep business and first class unmistakable, then show one clear relationship between a traveler's priority and Derek's review. Cabin context supports the person and service. The first scroll must show a useful decision, not another decorative fare folio. Preserve the 3D flip and tilt cards, with accessible disclosures and a clear purpose.

This is a design judgment, not evidence that person-first will convert better. A conventional large headshot beside a generic promise fails this direction. Current narrow-mobile capture 08 already combines the category, named advisor and From/To entry; a redesign must retain that completeness.

## Evidence and limits

Before reading review A or any proposed new creative direction, I inspected these supplied current captures with the local image viewer:

| Evidence | Observed finding |
|---|---|
| `01-home-current.png` | A strong cabin/window composition, restrained header, small Derek portrait, two Plan my trip actions. The broad headline does not make the fare-advisor proposition specific. The route form is below this particular screenshot. |
| `02-home-reasons-current.png` | A very large centered introduction and considerable blank space before the first reason. The repeated marketing-section recipe dominates the actual information. |
| `03-services-cards-current.png` | Home's calm brand changes to Derek Monti, marquee, five uppercase links and telephone block. A three-line heading delays the cards. |
| `04-services-card-faces-current.png` | Four tall, similar navy service fronts and one burgundy back. Large unused upper space, small generic icons, badges, similar text rhythm. The back establishes an example state; the still image does not establish animation quality. |
| `05-about-current.png` | The About opening foregrounds an airport apron and aircraft rather than the advisor. Burgundy eyebrow text over a dark image needs a contrast check. |
| `06-blog-desktop-current.png` | An enormous generic heading and cabin background precede the articles. A search-shaped surface contains a search icon and text but the source has no search input. Its action requests a quote. |
| `08-home-mobile-current.png` | Category, advisor identity and a usable-looking route entry are present together. The background passes behind text, requiring careful contrast for any changed crop. No touch interaction was tested from the still. |
| `09-request-desktop-current.png` | A clear three-step form with a separate trip summary. The request section itself is functional product UI and should remain easy to scan. |

Capture 07 was not used as request evidence because the lead identified it as an earlier misnamed process capture. I inspected the whole-video overview and all five detailed contact sheets under `output/video-analysis/2026-10-02-new-reference/`, including the latter-half product scenes. This supports observations about composition and successive visual states. It does not establish the showcased sites' frame rates, interaction mechanisms, source technologies or usability.

Source was inspected in the reachable application tree: App, main, entry-server, Layout, both navbars, Homepage, HomeSections, Services, About, Blog, motion provider/hook, route cards/carousel, TripForm/tripState, FAQ, styles, Vite configuration and prerender script. The local root returned HTTP 200 with Vite's development client and an unrendered app placeholder. This confirms a development server, not a production SSR response.

The stored `dist` was inspected without rebuilding it. Its output timestamps were 17:39 on 2 October. Numbers below describe those stored artifacts, not actual network transfer, current deployed code, a fresh build or measured Core Web Vitals. API and product changes from other concurrent work must be validated in the final approved implementation build.

## What the reference video suggests

The early web examples change typography, background and graphic style while retaining essentially the same proposition and layout logic. Their value as a warning is repetition disguised as visual variety.

The latter-half examples give a specific subject the largest visual role: ring, human portrait/mask, footwear, payment card, reflective object, particle figure, product can. Their material and environment are related to that subject. Transferring the ring, neon figure, fire, chrome or a floating airplane into this project would copy a surface treatment. Transferring the relationship between subject, material, information and motion is more useful.

Derek's subject is a named person helping a traveler make a commercial premium-flight decision. The design needs to show that relationship. It must not accidentally sell private jets, a live booking engine, real-time fares or an airline's specific cabin product.

## Interchangeability risk, not an authorship detector

“AI slop” here means a quality failure: a site can be exchanged for another brand with little alteration, its visuals outweigh its substance, or its content makes promises it cannot substantiate. None of these observations identifies who or what authored the site.

1. **Two shell identities.** `Layout.jsx:14–16` selects Home's Fly with Derek header and a different Derek Monti/announcement shell elsewhere. Footer uses Derek Monti even on Home. Typography and color alone do not make these one identity.
2. **Repeated introductions.** The huge centered heading, tiny uppercase eyebrow, descriptive paragraph and long gap recur where content could begin directly. This flattens the page rhythm and makes different sections feel interchangeable.
3. **Generic premium language.** “A better journey,” “Travel smarter,” and “Whole premium journey” need concrete service content nearby. The service category should be readable without spotting a tiny eyebrow.
4. **Aviation atmosphere without decisions.** A cabin or airport photo is useful category context, but can belong to almost any travel agency. The person and an actual comparison lens make the site specific.
5. **Cards as decoration.** The service cards are a legitimate user-requested interaction. Their fronts are repetitive, their current back adds a small example, and their front does not visually explain that tapping reveals it. Improve the content/action relationship while retaining the 3D behavior.
6. **A false-looking control.** Blog's search-shaped strip is source-confirmed decorative text plus a quote link (`Blog.jsx:100–107`). Either make it a genuine article filter/search within scope or style it as a normal introduction/CTA; do not imply a capability that is absent.
7. **Credibility drift.** The source register says savings, private access, operating response times and other changing business claims remain unverified. Current Home and Services publish some of them again. Beautiful badges do not repair that conflict. Resolve the factual copy and register together before release.

The existing hero is documented as a generated cabin plate combined with real Mixkit window footage, not an authenticated photograph of a particular commercial cabin. Derek's portrait is repository-supplied; identity/rights approval is not independently established. Keep those distinctions when describing or reusing assets (`CONTENT_SOURCE_LOG.md:16,51`). A new authentic cabin plane requires a sourced photograph; otherwise its illustrative status must remain clear.

## Engineering findings

### Keep these foundations

- Prerendered HTML comes from `renderToString` with `StaticRouter`; production startup uses `hydrateRoot` when root content exists. Initial motion and trip state do not read browser preferences/storage during the initial render. This is a useful hydration-safe foundation, although no current runtime hydration audit was performed.
- The stored Home HTML contains no inline opacity-zero/visibility-hidden reveal styles. Text exists before enhancement. Preserve that; never make hero copy or the request entry depend on successful GSAP initialization.
- `MotionPreferenceProvider` queries system reduced motion after mount and listens for changes. `usePageMotion` creates scoped GSAP work, reverts it during cleanup and restores content on failure. Blog filtering also uses a scoped context and cleanup.
- HeroMedia retains a visible image, suppresses the video for reduced motion and pauses playback when offscreen or the document is hidden. Failed playback leaves the poster (`Homepage.jsx:13–41`).
- Route tilt is fine-pointer/mouse-only, guarded below 900px and during reduced motion, and resets on pointer leave/cancel/blur (`RouteCard.jsx:23–39`).
- Service flip has a real button, accessible name, expanded state, controlled back ID and keyboard activation. Hidden face content is marked with `aria-hidden`. Reduced-motion styles show the selected face without a 3D rotation (`Services.jsx:15–61`; `restoration.scss:44–53`).
- The carousel is native horizontal overflow with named previous/next controls, a focusable region and arrow-key navigation; it does not auto-advance. FAQ uses native details/summary.
- TripForm uses labels, field descriptions, a validation summary, status/error announcements, step focus and a submission lock. Airport suggestions are a small local combobox with free text retained. Request receipt comes from the API, and a confirmed receipt clears the safe draft. Preserve this real flow; it is more than a mailto demo.

React requires initial client output to match the server output. Keep browser-only media, stored drafts, current dates and motion enhancements out of the first render. [React hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot).

### Costs and limitations to address after approval

| Finding | Current evidence | Consequence and proposed treatment |
|---|---|---|
| All pages imported eagerly | `App.jsx:5–14`, one stored JS bundle | Home includes secondary-page code. Explore a route-aware client loading boundary while keeping prerendered content and initial hydration identical. Do not blindly wrap every route in React.lazy: this project's renderToString pipeline must still emit complete pages. |
| Several style systems loaded together | global, homepage, shared shell and restoration/legacy styles | Consolidate into one token/layout system. Stored CSS is 224,811 raw bytes. Existing module styles for replaced layouts should not survive merely because files exist. Confirm import reachability before deletion. |
| Ten static font-weight imports | `main.jsx:6–15`; 25 @font-face declarations | Keep Syne/DM Sans, restrict to weights actually used and required language ranges. Two correct font preloads already exist. Emitted font bytes are not the same as requested bytes; measure the eventual waterfall before claiming savings. |
| Oversized avatar resource | avatar JPEG 132,749 bytes, same size as the full portrait asset | Supply a small, responsive derivative for the 84px portrait. A large new hero portrait needs its own larger derivative and explicit dimensions. |
| Video load begins after hydration, without data-saving policy | mounted source + programmatic play | metadata preload does not cap playback download. Keep the present small loop or equivalent, defer optional playback until critical content is ready, and use a still for Save-Data/low-bandwidth conditions when detectable. A global motion preference should not be the only local video control. |
| Generic reveals can affect interactive descendants | usePageMotion animates any data-reveal element | Avoid opacity-zero entrances on sections containing focusable controls. A reveal must not temporarily hide a focused service toggle or link. Measure focus/scroll behavior after implementation; the static source is a risk, not proof of a live violation. |
| Tilt writes on every pointer event | geometry read + inline transform per event | Cache/recompute the rect on entry/resize, apply at most once per animation frame, and use a small angle. Do not promote every card permanently to a GPU layer. |
| Full card overlay toggle | `restoration.scss:20`; `Services.jsx:33–46` | The transparent button is keyboard-operable but visually undiscoverable on the front. Add an explicit visible show/hide control. Do not later put links behind an all-card hit surface or nest them inside a button. |
| Hover and pinned state combine | showingExample = flipped OR hovered | Hover reveals the back; clicking while hovered pins it. Clicking again does not show the front until the mouse leaves. Instructions such as “Tap or hover to return” do not describe that model well. Define one predictable explicit toggle state; preview must not override a user's chosen face. |
| No reachable Three.js use | only threeParticles.js references initParticles | Do not blame WebGL for present performance or revive it for generic star particles. CSS perspective preserves the requested 3D cards without requiring a canvas. If future use is justified, dynamically load it after critical content and pause/dispose correctly. |

There is no source evidence here that all GSAP animations are dead. The hook and targets are reachable. Conversely, still screenshots cannot prove that reveals are smooth. A runtime trace is required to make either claim.

Route splitting can also split route CSS when modules are truly asynchronous, but it must be evaluated with this project's SSR architecture. [Vite code splitting](https://vite.dev/guide/features.html#css-code-splitting).

## Stored artifact measurements

Local gzip/Brotli values were calculated from stored files. They are comparison estimates, not response Content-Encoding measurements.

| Artifact | Raw bytes | Local gzip bytes | Local Brotli bytes |
|---|---:|---:|---:|
| `dist/assets/index-DQJIYv5O.js` | 503,278 | 162,765 | 140,527 |
| `dist/assets/index-WR9_-YAw.css` | 224,811 | 35,230 | 28,338 |
| Stored Home HTML | 63,343 | 12,083 | Not calculated |

| Media/font output | Stored size |
|---|---:|
| Hero poster WebP | 106,362 bytes |
| Hero WebM loop | 311,986 bytes |
| Hero MP4 fallback | 582,145 bytes |
| Derek avatar JPEG | 132,749 bytes |
| All emitted font files, 50 files | 533,824 bytes |

The hero video is already small; adding a multi-megabyte cinematic replacement would regress its present transfer cost. Browsers normally choose one compatible video source, and font unicode ranges/format support mean not all emitted font files are necessarily downloaded. No Lighthouse score, actual LCP/INP/CLS, frame rate, heap size, GPU-memory use or deployed-network result is claimed here.

## Accessibility requirements

1. **Contrast.** Calculated token pairs: burgundy `#8A194F` on navy `#0B1929` is approximately **1.97:1**, on `#08101A` **2.12:1**, and on white **9.00:1**. Burgundy small text on a plain navy background fails normal-text contrast. Use white for small text on dark sections while keeping burgundy for a contrasting filled control or decorative mark. The About eyebrow's actual photo pixels need separate measurement; token arithmetic does not certify photographic contrast. Check every video frame/crop or provide a stable local scrim. [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
2. **Continuous motion.** The footer has a Reduce motion checkbox, but users should not have to navigate the entire page to control a loop or marquee. Provide a nearby persistent pause/play button where continuous moving content remains. Stopping only while hovered or focused is insufficient. A decorative marquee can instead become static. [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).
3. **Reduced motion.** Keep the same service details, controls and review state, changing only the transition. Disable continuous drift, parallax, tilt and 3D rotation. A system setting plus nearby control is preferable to merely shortening long motion. Animation-from-interactions is a Level AAA criterion; use it as a design quality target, not a false AA requirement. [WCAG Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).
4. **Keyboard and touch parity.** Cards need a visible toggle; Enter/Space operates it; focus stays on that control; the accessible state matches the visible face; hidden-face links are absent from the tab sequence. No service explanation or CTA exists only on hover. A stylized review uses native radio/select/button semantics, not a pointer-only canvas.
5. **Targets.** Use a 44px design minimum for key controls where practical. WCAG 2.2 AA requires 24×24 CSS pixels or one of its defined exceptions; 44px is our comfort target, not the AA rule. Check close, flip, carousel, brief edit and radio labels. [WCAG Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
6. **Fixed headers and focus.** Preserve scroll padding and error/step focus. Inspect the focused field, validation summary, section anchor and card toggle under the actual header at each breakpoint and at zoom. The criterion concerns focus not being wholly obscured; aim for the whole control and ring to remain visible. [WCAG Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum).
7. **Content and form stability.** Avoid pinned scroll scenes around the real form, automatic focus changes on priority selection, timed testimonial rotation, and transitions that rearrange inputs. Keep a readable linear order at 320 CSS pixels, 200% zoom and with enlarged text. First-screen composition is not an exemption from reflow.
8. **Suggestion touch test.** Current airport options prevent mousedown to keep the input focused, then choose on click. Verify actual touch selection on Safari/iOS and Android, because blur closes the list. This is a test requirement, not a confirmed bug from source alone.

## Signature motion with a fallback matrix

Three motion families are sufficient. None may gate navigation or conceal essential content. Animate transforms and opacity; avoid persistent full-screen blur, animated shadow/filter and gratuitous WebGL. [web.dev animation performance](https://web.dev/articles/animations-guide), [GSAP matchMedia lifecycle](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/).

| Family and purpose | Fine pointer / full motion | Touch / narrow screen | Reduced motion, Save-Data or failure |
|---|---|---|---|
| Person → journey introduction | One 500–700ms entrance, portrait and short statement align with one supporting cabin/context plane. Optional image drift limited to a few pixels; no focus delay, no scroll pin. | Deliberately cropped static portrait/context; short 250–400ms opacity entrance only if useful. Copy and action visible immediately. | Final composition visible immediately. Still media. No prerequisite animation or canvas. |
| Priority → review decision | A native selection changes one readable explanation with 160–250ms opacity/short translation. One thin itinerary line can reveal once in ≤600ms. | Same selection and explanation in a stacked layout. No horizontal scrubbing gesture required. | Instant text/state replacement. A live announcement identifies the changed explanation without stealing focus. |
| Requested 3D card interaction | Tilt ±3–5°, pointer updates ≤1/frame. Flip 400–550ms on explicit action; essential title and service summary always readable. | Tilt disabled; visible Show details/Hide details button. Optional controlled flip around a stable height. | Instant face/disclosure change; exactly the same information and CTA. Static content if animation initialization fails. |

Do not rotate a card while a user is reading its back or interacting with its controls. Tilt and flip belong to different wrappers to avoid transform conflicts. Stop motion outside the viewport and when the document is hidden. Clean up timelines, observers, listeners, frames and renderers on navigation. No permanent will-change across the whole card gallery.

A single 1440×900 layer at device pixel ratio 2 has a rough RGBA backing-store arithmetic of **19.8 MiB** before overhead. This is an illustration of why several full-screen promoted planes can be expensive, not a measurement of this site's GPU memory. Keep the effect count small and test the actual low-end device path.

## Proposed budgets and acceptance evidence

Budgets below are project targets, not measured outcomes or universal rules. Use the approved production build, record its commit/source hashes and test routes directly as well as through SPA navigation.

| Area | Target and meaningful evidence |
|---|---|
| Initial route JavaScript | ≤150KB gzip transferred before optional enhancements, preferably lower on Home. Inspect build graph and actual cold-load waterfall; do not count a route chunk as deferred if it is preloaded eagerly on every page. |
| Initial route CSS | ≤28KB gzip with one coherent style system. Inspect coverage and route-level transfer, not only CSS source line count. |
| Fonts actually requested | ≤80KB total compressed font transfer on the first route; preload only 1–2 needed faces. Preserve the two required families and verify wrapping/fallback. |
| Hero still | ≤140KB desktop, ≤90KB mobile derivative; explicit width/height/aspect ratio. High priority only for the real LCP candidate. |
| Small avatar | ≤25KB suitable derivative; do not download a portrait master for an 84px display. |
| Optional video | Aim ≤600KB for the selected loop, poster already shown, no autoplay under reduced motion, pause hidden/offscreen, nearby pause control. No new multi-megabyte dependency on first paint. |
| Initial first-view transfer | Aim ≤500KB excluding deliberately deferred video; use real encoded transfer values for HTML/CSS/JS/fonts/images. |
| Visual stability | CLS ≤0.1; reserve images, video and card faces; do not shift the form when late fonts or motion preferences arrive. |
| Loading and responsiveness | LCP ≤2.5s and INP ≤200ms at the 75th percentile when enough field data exists. Before release, use repeatable cold mobile lab runs and scripted interactions as diagnostics, not field-certification claims. |
| Motion | Three meaningful families; no visible jank during scroll/form typing. Record Performance traces for the hero, one card flip and priority update on representative desktop and mobile hardware. Investigate long tasks >50ms and large repaints. |
| Accessibility | Manual keyboard/touch/reduced-motion/zoom testing plus automated checks on Home, Services, About, Blog, article and request states. An image mock proves none of these. |
| Flow correctness | Preserve round trip, one way, 2–6-leg multi-city, dates, preferences, draft recovery, validation and API success/error semantics. Use isolated/stubbed request delivery for QA; never send real leads during design verification. |
| Prerender/hydration | Direct-route HTML has content and metadata, no-JS page remains informative with contact recovery, no hydration errors, route change clears obsolete motion and retains intended trip context. |

The Core Web Vitals values are Google's good thresholds assessed at the 75th percentile. A single Lighthouse run cannot establish them for the audience. [web.dev threshold definitions](https://web.dev/articles/defining-core-web-vitals-thresholds?hl=en). A poster is useful for a video/LCP candidate, but indiscriminate asset preloading creates bandwidth competition. [web.dev video guidance](https://web.dev/articles/lazy-loading-video?hl=en), [LCP optimization](https://web.dev/articles/optimize-lcp).

## Pass/fail design rubric

All gates must pass. These are observable review criteria, not an AI-authorship score or a claim of conversion performance.

| Gate | Pass | Fail | Current assessment |
|---|---|---|---|
| Personal category clarity | The first view names Derek, clearly says commercial Business & First Class, and explains what he does. | The image/headline can represent any concierge, coach, travel agency or private-jet brand. | Partial: named advisor and category exist, but category is small and the headline broad. |
| One brand | Same masthead, navigation vocabulary and shell across every route. | Home and secondary pages feel like separate businesses. | Fail, evidenced in 01 vs 03/05/06 and source. |
| Distinctive relationship | Person, priority and journey form one legible composition and first-scroll decision. | New portrait/cabin merely decorates a familiar split hero or folio. | Not established; proposed direction must prove it. |
| Editing discipline | Each chapter answers one different traveler question. | Repeated reasons/methodology/benefits/guidance say the same thing. | Fail from repeated captured introductions and current 13-chapter source sequence. |
| Honest specificity | Concrete review dimensions, bounded examples and sourced business claims. | Unsupported discounts, operational promises, credentials or faux booking output create authority. | Fail pending reconciliation with content register. |
| 3D has a job | Flip reveals useful detail through an explicit control; tilt enhances tangible content. | A hidden back, vague example or hover trick exists mainly for spectacle. | Partial: semantics/fallback exist; purpose and discoverability need improvement. |
| Mobile completeness | Person, category and request action appear together; details become readable stacks. | A beautiful portrait consumes a whole screen before visitors learn the service. | Current 08 is a baseline to preserve; proposal unverified. |
| Readable motion | Page works immediately and motion highlights one relationship at a time. | Scroll is commandeered; controls/text wait for a sequence; several loops compete. | Source foundations positive; runtime not measured. |
| Real product affordances | Every control-looking element performs the named job. | Search icons and input-shaped decoration promise absent functionality. | Blog strip fails this clarity test. |
| Technical truth | Measurements identify artifact, build and conditions; fallback/flow are tested. | A screenshot or demo video is presented as usability, delivery or performance evidence. | This analysis states limits; implementation remains unverified. |

## Independent debate and final direction conditions

**Blind initial position, sent to the lead before reading A:** cabin/category first, then one evidence-rich itinerary scene and Derek/process, with tactile cards and limited motion. The captured supporting-page formula, dual identity and decorative card content were the main objections.

**A's strongest challenge:** the current Home already contains a strong passenger-view cabin, portrait, fare ticket and guidance folio. A larger cabin plus another review paper is not a materially new concept. This is supported by inspected source and images. I accept the objection; the captures supply no evidence that a new cabin-first treatment is stronger or converts better.

**My strongest challenge to person-first:** a large headshot is also a common consultant template. It can reduce aviation recognition and push the request below the first screen. It is distinctive only if a traveler can understand the link between Derek and an actual premium-flight decision without decoding a graphic. Adding three abstract words “person → decisions → journey” is not that link.

**Agreed conditional direction:** use the real supplied portrait honestly in its own photo plane; use separately sourced authentic or explicitly illustrative cabin context; make a single priority and review dimension visible; retain one clear first-screen request entry/action; move into one short illustrative decision scene. Do not generate a new fake documentary image of Derek at a desk, composite him into a cabin as if photographed there, or fabricate schedules, price availability or clients.

**What would change my mind:** show the complete hero and first-scroll scene at 1440px and 390px with actual English copy and the actual request path. In a quick review, a person should identify who, category, action and one practical review decision. The mobile composition must preserve 08's completeness. Use one brand, max seven non-repeating Home chapters, and the interaction/fallback matrix above. If that paired artifact becomes a consultant split hero or repeats the existing window/folio, revise the relationship before implementing.

A mockup can earn approval for composition. It cannot prove accessibility, performance, request delivery or responsive behavior. Those remain explicit implementation acceptance work after the user's approval.

## Exact English copy for the candidate

Recommended opening, using specific service language without unsupported savings or operating promises:

- Eyebrow/identity: **DEREK MONTI · PERSONAL FLIGHT ADVISOR**
- H1, line 1: **Business & First Class.**
- H1, line 2: **Planned with Derek.**
- Supporting copy: **Share your route, dates and what matters to you. I’ll help you compare the cabin, connections and ticket conditions.**
- Main action: **Plan my trip**
- Route labels: **From** / **To**; route action: **Start planning**
- Small service boundary close to the entry when needed: **A request for personal review. Fares and availability are confirmed separately.**

The headline makes the category unmistakable and connects it to a named person. It promises the advertised review process, not a discount, response deadline, secured seat or guaranteed outcome. Do not add “15–60%,” “exclusive access,” “24/7,” “within hours,” “best price” or “guaranteed” without the owner's supporting evidence.

First-scroll example:

- Heading: **What matters on your way there?**
- Existing choice label: **Arrive rested** (maps to the existing `rested` priority; retain the stored value).
- Intro: **Rest on a long flight and a considered arrival time matter most.**
- Review lead: **For that priority, Derek reviews:**
- Four readable factors: **Cabin on every segment**; **Departure and arrival timing**; **Connection length and complexity**; **Ticket conditions and flexibility**.
- Short boundary: **An illustration of the review process, not a live flight result.**

Other existing choices can reuse `work` and `together` while changing the explanation. Selection updates the explanation, preserves its value in the existing trip brief and never creates prices, ranks, inventory or implied flight search results. Do not automatically navigate or move focus when a priority is selected.

## Memory use

A light memory pass was used to locate the prior checkout and its functional boundaries, then those boundaries were rechecked against the current source. The older hero-preservation preference is superseded by this task's explicit permission to change the hero. Relevant pointers: `MEMORY.md:453–467`; `rollout_summaries/2026-09-30T15-07-58-BzWH-fly_with_derek_editorial_redesign_release.md:14–29`, rollout ID `01a0f2db-ace0-7e92-af8c-c62ac16a5f4b`. No memory-derived past validation or release result is presented as current evidence.
