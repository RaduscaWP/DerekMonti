# Astra — Fly with Derek homepage prototype

## Objective and current authorization

Create a complete, visually polished, interactive homepage prototype for Fly with Derek, a personal business- and first-class flight advisory service. Deliver a working local preview for the owner to evaluate before integration into the production site.

The primary business outcome is a useful trip request for Derek. The desired emotional experience is calm anticipation, premium comfort and personal attention, expressed through a cinematic aircraft-window hero and an interactive comfort section.

The user approved the choices below after a live-site audit and three visual concepts. These choices govern this phase and supersede incompatible older design suggestions. The owner has explicitly selected Astra for this work.

This phase covers the complete homepage prototype. If the result is successful, the owner intends to redesign the remaining pages individually, maintaining the same visual quality. Prepare reusable foundations for that future work; the current task does not authorize redesigning all routes or releasing the site.

## Approved decisions — keep these fixed

| Decision | Approved direction |
| --- | --- |
| Hero reference | The first generated image, `concept-01-departure.png`, is mandatory |
| Hero motion | Smooth, subtle video loop: slow-moving clouds, natural light and an almost fixed camera |
| Comfort reference | The third generated image, `concept-03-comfort-studio.png`, becomes an interactive section |
| Overall rhythm | Spectacular hero, then an elegant, spacious homepage with a few purposeful interactions |
| Request entry | From / To directly in the hero; continue with dates, preferences and contact |
| Derek in hero | Small genuine portrait and name, with a fuller introduction farther down |
| Delivery | A complete local homepage prototype for review before integration |

The scroll-through-the-window treatment and globe direction were not selected. Do not introduce them as part of this phase. Native scrolling should feel natural throughout.

## Workspace and visual references

Workspace:

`C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti`

Mandatory hero reference:

`C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/design-research/2026-09-09/concept-01-departure.png`

Mandatory comfort reference:

`C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/design-research/2026-09-09/concept-03-comfort-studio.png`

Supporting research:

`C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/design-research/2026-09-09/DESIGN_REVIEW_AND_ASTRA_BRIEF.md`

Current website: https://www.flywithderek.com/

Atmosphere reference: https://www.igloo.inc/

Open and inspect both selected images before designing or implementing. Study their composition, scale, lighting, hierarchy, surfaces and spacing. Use the research report as context; this approved brief replaces its earlier unselected concepts and suggestions.

Reproduce the selected art direction with real responsive interface elements. The reference screenshots contain baked-in text and controls: never use a whole screenshot as the page, an image map or a video background. Extract or create clean visual assets separately from live HTML text and controls. Use the original Derek photo from the repository; the person recreated inside a generated mockup is not the production portrait.

## Visual system

Keep the current brand:

- Deep navy: `#0B1929` and `#08101A`.
- Burgundy accent: `#8A194F`; hover `#6E1340`.
- White: `#FFFFFF`; light sections: `#F5F5F7`.
- Headings: Syne. Body and controls: DM Sans.
- Natural photographic colors are welcome in the cloudscape and cabin materials.

The hero should feel intimate and architectural: a large, believable aircraft window, a luminous sky, dark cabin framing and carefully placed typography. Preserve the contrast between the dark cinematic opening and the lighter comfort section. Give the page generous spacing, controlled line lengths and distinctive typography.

Motion must have a specific purpose. Avoid repetitive reveal effects on every element, oversized empty sections, decorative particle layers across the page and a collection of unrelated visual tricks. Derek's personal service must remain the clear subject.

## Hero: mandatory aircraft-window composition

Use the first reference as the composition anchor:

- Large aircraft window on the right, looking over clouds and the ocean.
- Headline and concise copy on the left.
- Small original Derek portrait, his name and role.
- Compact, legible header and a persistent route to requesting a quote.
- From / To inputs directly inside the hero composition, followed by a clear continuation action.

Starting copy:

Eyebrow: `BUSINESS & FIRST CLASS`

Headline: `A better journey. Personally arranged.`

Supporting copy: `Tell Derek where you want to go. He will review the route, cabin and details around you.`

Primary action: `Plan my trip` or `Start planning`, used consistently where the action is the same.

Identity: `Derek Monti — Your personal flight advisor.`

Copy may be refined for clarity while preserving the personal premium-flight positioning and selected composition. Maintain one clear primary action; repeated header or body CTAs should join the same flow without resetting data.

### Video art direction and delivery

Create or source a genuine matching video asset. Aim for a seamless approximately 8–12-second loop, with an almost stationary camera, slowly drifting clouds, a stable horizon and subtle natural light changes. The window frame should remain stable. The motion should feel calm enough to watch while reading and typing.

Asset brief: photoreal commercial premium-cabin window; navy interior; restrained burgundy material detail; soft natural sunlight over cloud layers and the ocean; almost fixed viewpoint; no people, typography, logos, UI, camera flight through the window, abrupt exposure changes, flicker or artificial window deformation.

Keep controls and typography outside the video. Use muted inline playback, an immediate matching poster, and suitable responsive media. Check the loop seam. Provide a discreet accessible pause/play control. Pause when hidden or out of view. Under reduced motion or blocked autoplay, show the stable poster and retain the complete experience.

Record the source and usage rights for the final media. Use available authorized asset tools. If a matching video cannot be obtained with available capabilities, continue the prototype with a clean poster and explicitly report the video as outstanding. A CSS zoom on a still or animation of the full mockup does not meet the requested video requirement. Do not claim the prototype is fully complete while this required asset is missing.

## Comfort studio: interactive preferences

Use the third reference for the light section, large tactile seat illustration and strong typographic hierarchy.

Heading: `How do you want to arrive?`

Provide three explicit, accessible preference choices:

| Choice | Visual response | Useful preference communicated to Derek |
| --- | --- | --- |
| Rested | Rest-oriented seat state and softer lighting | Rest and a considered arrival time matter most |
| Ready to work | A more upright work-oriented state and clearer lighting | A usable work environment matters |
| Travelling together | An appropriate shared-travel illustration or composition | Seating proximity and shared-travel needs matter |

Each selection updates both the visual and a short explanation, then remains visible in the trip summary. Users can change it later without losing other details. An illustrative default state must not be silently recorded as a preference the visitor actively chose.

Use authentic or deliberately illustrative assets with consistent camera, lighting and material quality. A lightweight combination of state imagery, short clips and carefully timed transitions is acceptable; real-time 3D is optional. Touch and keyboard interaction must work as well as pointer input.

The section illustrates preferences. It does not reserve a seat, promise a double bed, guarantee Wi-Fi or specify an airline product. Use concise copy such as `Illustrative cabin. Details vary by flight.` where needed. Do not expand this into a seat configurator or an airline inventory browser.

## Complete homepage structure

Create a deliberate narrative with a beginning, useful middle and clear finish. A suitable starting order is:

1. Header and cinematic hero with From / To entry.
2. Concise personal introduction: who Derek is and what he evaluates for a traveler.
3. Interactive comfort studio.
4. Short explanation of how the personal review works.
5. Progressive trip request and editable summary.
6. Focused FAQ addressing the practical questions before submitting.
7. Personal closing CTA and complete footer.

Refine the order when it improves the journey, while keeping the two selected visual anchors. The hero CTA should take an action-oriented visitor directly to the next relevant form step; do not make them scroll through the comfort story or long introductory copy first. They can choose a priority within the form as well.

Use approved content from the repository. Reduce repetitive explanations. Keep supported contact and navigation links functional. Secondary pages can link to their current destinations; they are not part of the redesign deliverable.

Do not invent testimonials, savings, credentials, partner relationships, response-time guarantees or availability. If substantiated proof is absent, rely on the original portrait, clear process and transparent service description.

## Trip request behavior

Use one coherent state shared by the hero, comfort selector and form. Prototype flow:

1. Route and trip details: From / To carried from the hero, trip type, dates, travelers and cabin.
2. Preferences: selected comfort priority, flexibility and optional notes.
3. Contact and review: required contact details, preferred channel, privacy acknowledgement and editable trip summary.

Preserve round-trip, one-way and multi-city capability, validating fields only when relevant. Keep back navigation and editing lossless. Editing a route must not erase contact details or preferences. Form labels, validation messages and focus should make recovery straightforward.

The comfort preference must appear in the final simulated request data. Plan a compatible mapping to the existing quote contract; document any eventual schema change needed for production integration. If mapping to notes, preserve the user's original notes and prevent duplicated preference text.

The summary may borrow the visual precision of a boarding pass, but label it `Trip brief`. It is not a ticket or confirmed reservation.

For this prototype, simulate submission locally through an isolated adapter. Clearly indicate near submission that the preview does not send a request. Demonstrate loading, success and recoverable error states without calling the production quote endpoint or sending test leads. Do not imply Derek received a simulated request. Keep a clean integration boundary for the later production phase.

## Technical approach and isolation

Inspect `AGENTS.md`, current Git state, package scripts and relevant components first. The current project uses React 18, React Router, Vite, SCSS, GSAP and Three.js. Work with this foundation and its reusable code where it helps; no framework migration is needed.

Create a dedicated local prototype entry or isolated directory that does not replace the production homepage. Scope styles and shared-component changes so the prototype cannot unintentionally redesign existing pages. Keep the current quote API and delivery configuration intact. Use a separate prototype state key if persisting non-sensitive draft preferences; do not overwrite the live form's session state.

Useful current source references:

- `src/pages/Home.jsx`
- `src/components/common/QuoteForm.jsx`
- `src/utils/quoteRequest.js`
- `src/data/siteData.js`
- `src/styles/_variables.scss`
- `src/App.jsx`
- `src/seo/`
- `api/quote.js`

The original portrait is currently referenced through `src/data/siteData.js` as `/images/derek-monti.jpg`; verify the asset before using it.

Preserve prerendering and metadata behavior for the existing site. Keep prototype URLs outside production navigation and the production sitemap. Avoid production analytics for prototype interactions. Build reusable typography, buttons, spacing and motion primitives without preemptively rewriting every page.

## Responsive behavior, motion and accessibility

Design a specific mobile composition rather than shrinking the desktop screenshot. Preserve the window identity, readable text, small Derek portrait and an easy start to the route form. Keep the form close to the initial action, without a long block of introductory text between them. At narrow widths, stack naturally instead of compressing controls.

Content and inputs must work immediately, independently of video or 3D loading. Use responsive image sizes, stable dimensions, deferred nonessential media and an economical rendering strategy. Record measured behavior honestly instead of claiming performance scores that were not obtained.

Provide visible focus, persistent field labels, useful errors, keyboard and touch support, sufficient contrast and reduced-motion behavior. Use semantic controls for the comfort choices. Any decorative layer must allow clicks and typing to reach the interface. Native scrolling remains available. Avoid automatic sound and hover-only essential information.

## Validation and acceptance

Compare the final implementation directly with both selected images. Assess composition, lighting, window scale, typography, hierarchy, whitespace and the tactile quality of the comfort scene. Fix clear visual mismatches before delivery.

Verify the final built version in a real browser, including desktop, tablet and narrow mobile views. Useful checks include 1440px, 768px, 390px and 320px widths, adjusted for the available browser tooling.

Required behavioral checks:

- Hero From / To values survive continuation, backward navigation and validation errors.
- All three comfort choices visibly change the section and remain correct in the summary and simulated payload.
- Preference changes preserve other trip and contact values.
- Round-trip, one-way and multi-city paths show appropriate controls and validation.
- Prototype submission performs no production request; loading, simulated success and recoverable error are truthful.
- Header actions, navigation, FAQ, mobile menu, contact links and footer work.
- Keyboard, touch, reduced motion, unavailable video and any unavailable WebGL retain a complete usable path.
- No horizontal overflow, obscured inputs, unreadable text over video or focus hidden under the header.
- The hero uses the actual smooth loop when available, with a clean seam and a matching poster. Any missing required media remains explicitly outstanding.

Run the relevant prototype checks and existing repository tests/build when affected. Current repository commands include `npm.cmd test` and `npm.cmd run build`; inspect the actual scripts before running. Rebuild after the final relevant changes, then visually inspect the built output. Add targeted tests for meaningful state/validation behavior rather than mirroring static markup.

## Delivery and continuation

Deliver the functioning local homepage preview, representative desktop/mobile screenshots, clear start instructions, an asset-source manifest, and a concise verification record. State exactly which behaviors were checked, which results were simulated and which assets or capabilities remain outstanding.

The owner evaluates this homepage before production integration. Once approved, continue page by page using the same visual foundations, adapting composition and interaction to each page's purpose. Future pages should share the quality and identity of this prototype rather than repeat the same hero mechanically.

Begin with the approved choices and proceed through the necessary work. Ask only for a genuine missing dependency or a decision that would materially change the selected scope. Deliver a complete homepage prototype, not only a hero mockup or a plan.
