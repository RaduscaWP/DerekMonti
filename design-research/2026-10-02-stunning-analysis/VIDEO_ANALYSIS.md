# Reference video analysis: subject-led visual direction for Derek Monti

Date: 2026-10-02. Scope: analysis and proposal only. No application source changed.

## Main finding

The second half succeeds because each scene makes its subject the visual center of the website. Material, environment, movement, framing, typography, and small interface details reinforce that particular subject. Adding dramatic animation to a conventional layout would capture only part of this effect.

For Derek, the strongest transfer is a recognizable aviation scene supported by useful itinerary information and a clear quote action. The emotional subject is the experience of traveling comfortably; the commercial subject is Derek personally finding suitable business and first class fares. Aircraft imagery must describe commercial premium travel, not imply a private jet service.

The current instruction to retain the 3D cards remains part of the proposal. Their surrounding composition can become more distinctive. A hero change can be proposed for approval; this analysis does not implement one.

## Evidence and limits

Source: `C:\Users\GZv0x00\Downloads\Telegram Desktop\video_2026-10-02_17-53-13.mp4`.

- Source fingerprint: SHA-256 `f6095e93c447ee24c359510641fa33d7ddf1ce9a8240e0ede01cfbf460ac6957`.
- Extracted stream: 1080 × 1920, 30 fps, 572 decoded frames, approximately 19.067 seconds of video frames. This duration describes the decoded video stream rather than any longer audio/container duration.
- Whole-video sampling: 77 frames at approximately quarter-second intervals, with nearest decoded frame times recorded in `frames.json`.
- Additional evidence: frame-by-frame visual differences identify the hard cuts; 0.1-second crops cover 11.0–15.4 seconds for the transitions and movement in the showcase.
- The sheet annotations and crops are analysis aids. They are extracted from the supplied video; they are not screenshots of live sites. No video pixels were retouched.

Evidence directory: [extracted frames and metadata](../../output/video-analysis/2026-10-02-new-reference/metadata.json).

Useful sheets:

- [Whole-video overview](../../output/video-analysis/2026-10-02-new-reference/overview-whole-video.jpg)
- [Second-half overview](../../output/video-analysis/2026-10-02-new-reference/overview-latter-half.jpg)
- [Early layout comparison](../../output/video-analysis/2026-10-02-new-reference/early-comparisons-crop.jpg)
- [Ring and portrait sequence](../../output/video-analysis/2026-10-02-new-reference/motion-crops-1.jpg)
- [Helmet, sneaker, and card sequence](../../output/video-analysis/2026-10-02-new-reference/motion-crops-2.jpg)
- [Card, design studio, and particle portrait sequence](../../output/video-analysis/2026-10-02-new-reference/motion-crops-3.jpg)
- [Can, fire, and outro sequence](../../output/video-analysis/2026-10-02-new-reference/motion-crops-4.jpg)

The clip is a fast edited montage. It does not establish whether the shown designs are deployed, responsive, accessible, fast, or commercially successful. It does not show usable quote or checkout flows. A rendered object could be a real-time 3D model, a prerecorded render, a video, or another compositing technique. GSAP, Three.js, scroll triggers, cursor interaction, and the cause of the visible motion cannot be identified from these frames alone.

Visible labels are transcribed only where legible. They identify a screen in this analysis, not a confirmed live business. Small text, exact fonts, and some logos remain uncertain. Audio was not transcribed; conclusions about the presenter’s argument below come from the visible caption and the visual sequence.

## Complete visual timeline

Times are frame timestamps from the decoded 30 fps stream. Boundaries are rounded to three decimals; each displayed frame represents 1/30 second. These are montage cuts, not measured UI animation start times.

| Time | Visible content | Analytical role |
| --- | --- | --- |
| 0.000–5.567 s | Presenter, with the on-screen caption “We’re entering the WORST era of web design…” | Sets up the critique. The caption is a viewpoint, not evidence that every current site is poor. |
| 5.600–6.467 s | Dark “Acme Inc.” page with violet accent, centered heading, two actions, avatar proof | Familiar software landing page composition. |
| 6.500–7.367 s | Newspaper-like “ACME.INC” page, black serif heading, ruled columns, editorial details | Changes the styling and typography substantially while retaining the same generic promise. |
| 7.400–8.233 s | Graphic “ACMEINC.” page, large stacked type, red/yellow/blue geometric shapes | Different visual language, still centered on the same generic product message. |
| 8.267–9.133 s | Light “Acme Inc.” page, left-aligned heading, soft UI illustration, blue action | Another polished variant of the repeated content and landing-page components. |
| 9.167–11.200 s | Presenter returns, without the earlier large caption | Separates the comparison from the example showcase. |
| 11.233–11.767 s | Metallic ring in pink clouds with translucent interface elements | Subject-led product atmosphere. |
| 11.800–12.333 s | “KAI RENNARD” portrait; patterned teal helmet assembles across the face | Personal identity and object-based transformation. |
| 12.367–12.900 s | “ecco” sneaker suspended above green terrain against blue sky | Product silhouette, material, and environmental coherence. |
| 12.933–13.400 s | “Crest” payment card over red reflective liquid, framed by circular forms | A tangible product within a controlled lighting composition. |
| 13.433–14.033 s | Black design-studio page, chrome central form, asymmetric cards, “DESIGNTHINKING” | More expressive composition with a clear visual hierarchy. |
| 14.067–14.533 s | Purple particle head, “Human-Grade Reasoning,” “Built Into Every Decision” | A central metaphor used to express an abstract capability. |
| 14.567–15.133 s | Sculptural red/gold can, rock-like ground, moving yellow fire, “Feel the Thunder” | The most intense product scene, with headline and order action to the left. |
| 15.167–19.033 s | The can scene dims beneath a large Instagram symbol and the visible handle `@MARCELODESIGNXH` | Creator attribution/outro, not an additional website case. |

## What the first half actually demonstrates

The four Acme screens repeat “Transform the way your team works.” Dark violet software styling, newspaper editorial styling, bold geometric styling, and soft light interface styling all lead back to an interchangeable promise. The screenshots are visually different, so the useful criticism is not that they literally look identical. It is that their message and relationship to a specific product remain weak despite the different surfaces.

The comparison supports a distinction between a style treatment and a design idea. A style treatment changes colors, type, shapes, or gradients. A design idea decides what the visitor should see, feel, understand, and do because this product or person is distinctive. For Derek, “premium,” “exclusive,” and “personal service” need tangible expression: commercial cabin comfort, a traveler’s real routing problem, the quote process, and Derek’s human presence.

This is an interpretation of the visual sequence. The montage is not evidence that any of the Acme examples are AI-generated, ineffective, or technically defective.

## Second-half critique, scene by scene

### 1. Ring in pink clouds: 11.233–11.767 s

**Observed.** A large metallic ring floats near the middle of a soft pink cloud environment. The rim has a warm bright edge, the interior reflects the scene, and foreground/background clouds establish depth. Small translucent panels become visible to the left; a circular portrait and segmented gauge appear on the right. A small control cluster sits at the bottom. The overall screen remains rounded and compact within the vertical video frame.

**Motion.** At 11.30 s the ring and environment already dominate the scene. Between approximately 11.40 and 11.60 s the secondary interface fades into view. Subtle changes in the ring angle and scene are visible. The sampled sequence does not show a pointer action or establish a scroll trigger.

**Why it works.** There is one immediately recognizable object, with smaller details acting as satellites. Warm reflections connect the ring to its environment. Transparency lets the interface coexist with the scene without turning it into a large opaque dashboard. The portrait and health-like metrics suggest a wearable context, although the brand and precise product are unconfirmed.

**Risk.** Many labels are tiny and low contrast. This is powerful presentation imagery but insufficient evidence of a readable product interface. Copy and a commercial action are not prominent at the scale shown.

**Transfer to Derek.** Use depth, atmosphere, and a dominant aviation focal point, then place a small number of legible itinerary details around it. A commercial cabin window, seat detail, or carefully framed route can supply the subject. Do not transplant pink clouds, a floating ring, or unrelated health widgets. A transparent trip panel should have a sufficiently solid reading surface and generous touch targets.

### 2. Portrait and teal helmet: 11.800–12.333 s

**Observed.** The screen reads “KAI RENNARD,” with “KR” centered near the top and a small store action at the upper right. A portrait fills much of an off-white frame. The patterned clothing, teal helmet, teal border, and speed-like surrounding streaks belong to the same visual system. The helmet first appears to one side of the face, then moves across it and becomes a complete helmet in front of the portrait.

**Motion.** The portrait is unobscured at 11.80 s; partial helmet coverage is visible around 12.00 s; the visor covers the face around 12.10 s; the completed helmet is visible by 12.20–12.30 s. The visible effect is layered assembly/coverage. The evidence does not prove a biometric transformation, a morph shader, or a draggable model.

**Why it works.** A person and their professional world become one scene. The transformation communicates identity with an object associated with that identity. Pattern repetition makes it feel authored rather than like a generic portrait placed beside a decorative shape. The resting portrait is itself strong before the transformation completes.

**Risk.** Covering the person’s face would weaken personal trust if used as the permanent state for an advisor. The example’s store action fits a merchandise context; Derek’s commercial action is a personal quote conversation.

**Transfer to Derek.** Make Derek recognizably present, with a real portrait and editorial framing. A route, window reflection, itinerary, or cabin layer can connect him to his work without hiding his face. The scene should explain “one person handling your journey.” No pilot uniform, cockpit, or private jet imagery unless authentic and relevant to his actual service.

### 3. Suspended sneaker and green terrain: 12.367–12.900 s

**Observed.** The visible “ecco” label, restrained top navigation, blue sky, and grassy terrain leave most of the visual attention on a single sneaker. Grass-like material appears on the shoe in the earlier angles. The later frame includes left-side copy, “Stay in control. Feel the freedom,” a small lower-left action, and a lower-right product thumbnail.

**Motion.** The shoe changes orientation from a rear/sole view around 12.40 s, to a three-quarter side view, to a front view around 12.70 s, then another three-quarter view around 12.90 s. Terrain framing also changes, and copy becomes legible near the end. Motion is confirmed; whether it is an interactive product orbit or a prerecorded sequence is unconfirmed.

**Why it works.** Negative space gives the silhouette room. Product and ground share a tactile material relationship. Soft shadows make the suspended object feel situated instead of pasted onto a gradient. The navigation and action are restrained enough to preserve the product focus.

**Risk.** A spinning object can delay access to practical details if visitors must wait for it. The montage does not show product sizing, purchasing, performance, or mobile behavior.

**Transfer to Derek.** Use a strong, well-lit commercial cabin detail and generous space, with movement that reveals something useful. For example, a restrained scene shift could reveal the actual seat position, window, or route context. This can also inform the retained 3D cards: distinguish each service through meaningful aviation imagery rather than giving every card the same generic shine. Any tilt/flip should preserve readable titles, keyboard access, and a practical touch alternative.

### 4. Crest payment card and reflective liquid: 12.933–13.400 s

**Observed.** A vertical red/black card is centered above a warm pool of light, with circular framing behind it and red reflective liquid across the ground. The scene is repeated at a larger scale in the surrounding montage background. Top navigation includes Features, Rewards, Pricing, and Contact; the upper-right action reads “Apply now.” Small feature copy flanks the object. The lower-left heading begins “Tap. Split. Earn back.” A miniature card selection panel sits at the lower right.

**Motion.** The card’s angle, reflections, light, and liquid details vary slightly over the sampled half-second. The continuous circular framing remains stable. No navigation, application, or card-selection interaction is shown.

**Why it works.** The physical card is the anchor, and a controlled light path draws attention to its edge, surface, and chip. Circles frame the focal point without competing with it. The red environment connects the entire presentation to the card. Text is placed in the leftover space rather than covering the object.

**Risk.** A finance visual language can accidentally imply a payment product. Tiny pricing or trust claims in this scene are not transferable evidence for Derek.

**Transfer to Derek.** This is a useful composition reference for the permitted navy/burgundy palette: use burgundy selectively as rim light, route emphasis, or a CTA, with navy supporting depth. An itinerary document, fare comparison, or cabin window can become the physical anchor. Never turn a conceptual ticket render into a claim of an issued real ticket, a guaranteed fare, or verified savings. Use confirmed case data or clear illustrative labels.

### 5. Chrome form and design-studio cards: 13.433–14.033 s

**Observed.** A glossy chrome form occupies the center of a black page. Small service panels of different sizes sit on both sides. They contain a brain, a pencil, image fragments, and visible service text. The large “DESIGNTHINKING” wordmark becomes visible across the top later in the sequence. The page is asymmetric, yet the chrome subject and large text hold the composition together.

**Motion.** The central reflective form rotates/changes silhouette from approximately 13.50 to 14.00 s. Its bright reflections shift substantially. The large heading emerges across the top around 13.90–14.00 s. These observations do not establish that the object reacts to the cursor or that the cards are functional controls.

**Why it works.** Scale contrast is deliberate: one large object, one large text statement, and smaller supporting modules. The panels differ according to their content instead of repeating an identical icon/title/body pattern. An imperfectly regular layout creates tension while preserving a strong focal point.

**Risk.** An abstract chrome object is appropriate for an expressive design studio, but it provides little direct explanation of an aviation advisor. Small dense modules could become difficult to read on a narrow screen.

**Transfer to Derek.** This is the clearest reference for improving the composition around the retained 3D cards. Make the service grouping an editorial scene: one stronger lead service, supporting service cards, variation in visual scale, and a visible quote action. Each card should still provide a clear title and real service explanation. Do not fill the center with unrelated chrome sculpture, make essential information depend on hover, or use uneven layout without a deliberate mobile reading order.

### 6. “Human-Grade Reasoning” particle portrait: 14.067–14.533 s

**Observed.** A large purple particle head dominates a dark screen. Fine technical markings sit around it. The upper-left text reads “Human-Grade Reasoning”; lower-right text reads “Built Into Every Decision.” The face is represented through many luminous points rather than a flat cutout. A small upper-right access action is visible, but its full wording and function are not established here.

**Motion.** The particle form changes shape around the nose/mouth area from roughly 14.30 to 14.50 s, with a visible cloud extending to the right. This appears as a controlled disruption or redistribution of points. A full dissolve/reassembly cycle is not shown.

**Why it works.** An abstract capability is translated into one understandable metaphor: human reasoning. The point cloud gives that metaphor a technical character. Headline and visual share a subject instead of being independent decorations.

**Risk.** Human likeness and simulated data labels can suggest capabilities without explaining them. The particle treatment can be expensive and would distract from personal trust if it replaced Derek’s genuine portrait.

**Transfer to Derek.** Take the rule that visual metaphors should match the message. A sparse route network could express routing expertise; a real itinerary could express tailored planning. If particles appear, keep them subordinate and purposeful. A particle face, AI dashboard, and unrelated coordinate labels do not help travelers understand Derek’s service.

### 7. Thunderbull can and fire: 14.567–15.133 s

**Observed.** The visible top label reads “Thunderbull.” A sculptural red/gold can stands in the center on dark textured ground. The left headline reads “Feel the Thunder,” with a small order action below. A bright vertical yellow fire field fills the background. A small product preview at the lower right repeats the can, while the principal can remains dominant.

**Motion.** The fiery background brightens and changes shape dramatically between 14.60 and 15.10 s. The can remains comparatively stable and readable. At 15.167 s the whole presentation dims for the Instagram outro. That dimming belongs to the edited video, not demonstrated site behavior.

**Why it works.** The dramatic environment externalizes the product promise. A stable object provides an anchor while the surrounding energy moves. The left-side text maintains a separate reading area. The scene has a decisive subject instead of many equally weighted decorations.

**Risk.** This energy is suitable for the shown beverage-like product. Literal flames, fractured surfaces, or aggressive animation would send the wrong emotional message for a travel advisor expected to provide calm and reliable support.

**Transfer to Derek.** Retain the idea of a memorable central scene with controlled moving surroundings. Use calm cabin light, an airport horizon, or clouds seen from a real commercial aircraft window. Text and quote action should remain steady. Avoid intensity that implies danger, spectacle, nightlife, or private aircraft ownership.

## Design rules that transfer across the examples

1. **Define the subject before choosing effects.** For Derek, a premium commercial journey and personal advisor relationship should determine the scene.
2. **Give one element the largest share of attention.** Strong examples have a primary object/person, useful supporting text, and small tertiary details. A full page of equally large cards loses this hierarchy.
3. **Connect the image, material, lighting, and motion.** A convincing scene needs shared light, plausible edges/shadows, and appropriate scale. An isolated object over a generic gradient is weaker.
4. **Use asymmetry with a clear reading path.** Visual variety can improve the retained cards, but title, explanation, and quote action must remain easy to find.
5. **Make motion reveal or reinforce meaning.** A portrait-to-helmet reveal explains identity. A rotation exposes a product. Derek’s motion should reveal cabin comfort, route relationships, or the personal planning process.
6. **Keep the commercial action stable.** A brief animation can create interest while the form, navigation, and essential copy are available immediately.
7. **Judge the resting frame.** The video gives no evidence of a motion-disabled design. Derek’s proposed page should be strong as a static image, with equivalent content when motion is reduced.
8. **Use real content as the distinctive asset.** Real Derek imagery, authentic commercial cabin media, precise service explanations, and confirmed cases offer more defensible originality than borrowed effects.

## Recommended translation into Derek’s next design proposal

**Hero.** Propose one coherent scene built around commercial business/first class travel. A carefully composed aircraft window/cabin environment is a credible candidate, but the choice should be reviewed as an actual composition rather than settled by a verbal mood description. Keep a direct, plain-English promise, Derek’s role, and an immediate trip request path visible. The existing palette and Syne/DM Sans stay the visual foundation.

**Services and 3D cards.** Retain the 3D behavior requested by the user. Improve the framing, imagery, scale, and spacing so that the section reads as a designed aviation scene. The four services need clear distinctions: business fares, first class, complex itineraries, and urgent bookings. Do not make them four copies of the same generic tile with different icons. Provide persistent useful copy and intentional keyboard/touch behavior when a face flips or a card tilts.

**Derek’s presence.** Use a real portrait as a commercial trust asset. An editorial scene can connect Derek to routes or documents while preserving an unobscured face. Keep a clear personal point of contact and avoid language or visuals that turn the site into an airline, corporate agency, or private aviation operator.

**Proof and explanation.** Use legible itinerary/fare comparison only where the data and circumstances are known. Make the mechanics of a request understandable without imitating a real-time booking engine. The clip supplies design references, not evidence for savings, ratings, accreditation, or testimonials.

**Motion distribution.** Concentrate the strongest visual effect in one focal scene. Use restrained supporting movement for card reveals, transitions, and route emphasis. A collection of unrelated particle, chrome, cloud, liquid, and flame scenes would weaken brand coherence.

**Production evaluation after approval.** The eventual implementation should be judged at desktop and mobile sizes, with keyboard and touch, reduced motion, a slow connection, and the complete request journey. Text must remain real page content, images should have appropriate descriptions, controls need usable targets, and decorative media must not hold up navigation or the quote flow. None of these properties is proven by the reference montage.

## Decisions the video cannot settle

- Whether a new hero should use prerecorded cabin video, a composed static scene with restrained motion, or actual real-time 3D.
- Whether any shown concept is a real deployed website or commissioned production work.
- Which technical stack produced the effects, whether movement follows scroll/cursor/time, and whether it loops cleanly.
- Actual mobile layout, accessibility, performance, reading comprehension, conversion, or SEO quality.
- Exact original fonts, small text, asset licenses, and unconfirmed brand identities.
- Which real portraits, cabin assets, testimonials, and fare examples Derek can supply or authorize.

The next approval should therefore concern a concrete site composition and interaction plan using Derek’s authentic service content. The footage supplies strong visual principles; it does not supply an implementation specification or proof of business results.
