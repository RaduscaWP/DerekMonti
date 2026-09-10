# Homepage design QA

Date: 10 September 2026.

**Findings:** No unresolved P0, P1 or P2 findings in the scoped homepage prototype after the final comparison. The desktop headline contrast correction was independently rechecked.

## Visual truth and normalization

- Mandatory hero: `../../design-research/2026-09-09/concept-01-departure.png`.
- Comfort reference: `../../design-research/2026-09-09/concept-03-comfort-studio.png`.
- Implementation: http://127.0.0.1:4174/, built with Vite after the final source correction.
- Both source images: 1505 × 1045 px. Desktop browser viewport: 1440 × 1000 CSS px; screenshot: 1425 × 990 px. Browser capture scaling and its scrollbar explain the difference; an exact deviceScaleFactor was not set or assumed.
- Paired comparison images normalize each full content frame to 1000 px wide, preserving aspect ratio (source 1.4402, captured implementation 1.4394). These are visual comparisons, not pixel-difference scores.
- Hero state: desktop top of page, blank From / To, normal video playback, genuine portrait. The source is a still golden-hour concept; the implementation capture is a frame of the twilight loop.
- Comfort state: Rested explicitly selected, both source and implementation. The implementation uses reduced motion for a stable capture. Its sticky navigation remains visible.

## Comparison evidence

- [Full hero comparison](qa/hero-comparison.jpg): source and final rendered hero in one input.
- [Focused portrait and route-control comparison](qa/hero-controls-comparison.jpg): checks live input labels, CTA, genuine portrait and lower-hero alignment.
- [Full comfort comparison](qa/comfort-comparison.jpg): selected Rested state, live controls and seat illustration in one input. Text and seat detail were also inspected in the full-resolution implementation image; no additional crop was needed for this less dense region.
- [Final desktop hero](qa/desktop-hero-1440.png), [Rested](qa/desktop-comfort-rested-1440.png), [work](qa/desktop-comfort-work-1440.png), [together](qa/desktop-comfort-together-1440.png).
- [Full desktop page](qa/desktop-full-1440.png) and [full mobile page](qa/mobile-full-390.png), captured with reduced motion so reveal transitions do not hide content.

## Required fidelity surfaces

| Surface | Assessment |
| --- | --- |
| Fonts and typography | Self-hosted Syne headings and DM Sans body preserve the approved geometric character. Weight, spacing, hierarchy, wrapping and control labels reviewed. Final desktop hero uses 4.7vw, capped at 73px, keeping the complete pink line off the bright window trim. Tablet wraps intentionally; mobile has its own scale. |
| Spacing and layout rhythm | Preserves left editorial hero / dominant right window, compact genuine portrait and wide route bar; airy two-column comfort scene and natural stacked mobile layout. Section spacing, input widths, sticky-header offsets, radii and whitespace checked. |
| Colors and tokens | Navy #0B1929 / #08101A, burgundy #8A194F, light #F5F5F7 and white retain the selected identity. Pink hero typography and pale seat background remain readable. No unreadable overlap remains at checked breakpoints. |
| Image quality | Real generated image assets rather than flattened website art; fixed cabin with actual moving footage, sharp matching poster, tactile navy/white/burgundy seats. Removed blend mode that made the seat background visibly gray. All three states have credible distinct configurations without promising a specific airline product. |
| Copy and content | Selected headline and personal-advisor positioning preserved. Live From / To form, explicit optional comfort choices, trip brief and next action are clear. No fabricated reviews, savings, credentials or guarantees. Genuine supplied portrait replaces the mockup likeness. |

## Corrected findings and comparison history

| Severity | Earlier finding and impact | Fix | Post-fix evidence |
| --- | --- | --- | --- |
| P1 | Desktop “arranged.” ended on illuminated window trim, reducing headline contrast. | Reduced headline size approximately 6%; also restrained intermediate desktop size. Rebuilt, recaptured and compared again. | Final `desktop-hero-1440.png`, `hero-comparison.jpg`; independent review confirmed the entire line now ends on dark cabin. |
| P2 | Tablet headline extended onto the bright window. | Limited text width to 390px in the tablet breakpoint for a deliberate line break. | `tablet-hero-768.png`, checked visually after rebuild. |
| P2 | Body minimum width created horizontal overflow at the narrowest browser content width. | Removed the fixed 320px body minimum; retained responsive control widths and narrow typography. | `mobile-hero-320.png`; scroll width and client width both 305px. |
| P2 | Comfort image blend mode produced a conspicuous gray rectangle against the light section. | Removed multiply compositing; retained the natural studio ground and contact shadow. | Final Rested/work/together captures and `comfort-comparison.jpg`. |
| P2 | Video control placement competed with the route area at some sizes. | Positioned the control near the upper right with explicit desktop/mobile offsets. | Final desktop, tablet and mobile hero captures show the control clear of primary inputs. |

Earlier iterations were not accepted as final. Each listed visual fix was followed by a new browser capture; the last desktop typography fix was rebuilt and paired with the source before this report passed.

## Intentional differences

- The actual footage is cooler blue/pink twilight; the mandatory window architecture, navy cabin, burgundy edge and text composition are preserved. Original golden-hour still remains available as an alternative.
- The portrait is the genuine repository asset and stays deliberately small. It is not the generated likeness in the concept.
- The comfort concept is integrated as a homepage section with a consistent dark sticky header. Its standalone bottom wizard strip is replaced by the real three-step request later on the page.
- “Plan my trip” / “Start planning” lead into the working flow. The concept's decorative destination-view action becomes “Explore the experience,” linking to the useful comfort selection.
- Initial seat art illustrates Rested but no radio or payload preference is selected until the visitor chooses. This intentionally differs from the selected-state concept.
- No decorative 3D globe or WebGL layer is needed; the cabin video and preference imagery carry the selected visual language.

## Interaction and responsive acceptance

Desktop 1440 × 1000, tablet 768 × 1024, mobile 390 × 844 and narrow mobile 320 × 740 CSS viewports were checked. Final corresponding hero captures are 1425 × 990, 753 × 1004, 375 × 811 and 305 × 705 pixels. Screenshots preserve the browser's capture scaling; no physical-device density is claimed.

Hero route continuation, validation recovery, round/one-way/multi-city, preference retention, contact review, local loading/error/retry/success, menu, FAQ, keyboard radio selection, focus recovery, reduced motion and missing-video poster fallback were exercised. Normal-preview console checks returned no warnings/errors. Detailed results and untested release scenarios are in [verification.md](verification.md).

## Implementation checklist

- [x] Both selected references opened and compared with rendered output in paired inputs.
- [x] All five fidelity surfaces inspected.
- [x] P1/P2 findings corrected and recaptured.
- [x] Required video, matching poster, three seat images and genuine portrait present.
- [x] Full simulated trip path and lossless edits checked.
- [x] Desktop, tablet, mobile and narrow-mobile layouts inspected.
- [x] Fresh built preview running locally; source manifest and verification record delivered.

**Open questions:** None blocking the approved homepage prototype scope.

**Follow-up polish:** Owner may choose a warmer moving-sky grade in a later aesthetic iteration. Production device/performance validation and real delivery integration remain separate release work, as documented.

final result: passed
