# Comfort studio media

Created 2026-09-10 with the built-in Imagegen tool, one call per state. These are AI-generated illustrative commercial business-class seats, not photographs of a promised airline product. Use the visible UI qualification: **Illustrative cabin. Details vary by flight.**

## Files

| State | Runtime asset | Dimensions | Bytes | Preserved source |
| --- | --- | --- | --- | --- |
| Rested | `public/assets/comfort-rested.webp` | 1200 × 1200 | 134,154 | `media-source/comfort-rested-source.png` |
| Ready to work | `public/assets/comfort-work.webp` | 1200 × 1200 | 101,138 | `media-source/comfort-work-source.png` |
| Travelling together | `public/assets/comfort-together.webp` | 1200 × 1200 | 115,354 | `media-source/comfort-together-source.png` |

The total WebP transfer size is 350,646 bytes. Each is RGB on a very pale studio background, with no alpha. Original generated PNGs remain in `C:/Users/GZv0x00/.codex/generated_images/01a08a14-dcbe-7821-a7f0-2dfd7eefc45a/` and are also preserved under `media-source/` in this prototype. WebP conversion used bundled Sharp at quality 86, effort 6, resized without cropping to 1200 × 1200.

## Reference and provenance

Mandatory art direction: `../../design-research/2026-09-09/concept-03-comfort-studio.png`, inspected before generation. Work and together also used the generated rested image as the exact material/camera reference.

Generated originals:

- Rested: `exec-611a167d-84ad-473d-9b42-5a52f1e742b3.png`
- Ready to work: `exec-8cdaf410-d097-43db-9148-c84bd1e370cc.png`
- Travelling together: `exec-05832007-8ad3-4c89-b34e-0a47046b36ed.png`

## Prompt set

### Rested

Use case: product-mockup. Create ONE square 1200x1200 clean production web asset, not an entire website screenshot. Reference image is ART DIRECTION only: extract the exact premium illustrative commercial-airline seat language from the right-hand image. Subject: one modern commercial business-class seat, slightly reclined in relaxed resting position with its calf rest extended modestly, beautiful tactile deep navy upholstery, soft white composite outer shell edged with slender burgundy piping (#8A194F), charcoal plinth, a folded woven light gray blanket softly draped over the seat cushion. Same front three-quarter camera looking from passenger's front-right as reference, realistic proportions, seat assembly completely visible from headrest to base. Full chair occupies roughly 78 percent of square canvas with generous clean margins, centered, unified near-white #F5F5F7 infinite studio floor/background, soft subtle contact shadow and high-end diffused product photography light, physically realistic textures. No cabin environment, no people, no typography, no text, no logos, no UI elements, no arrows, no ghosted or translucent duplicate seat, no multiple images, no cut-off chair, no private jet chair, no big pillow blocking the seat. Keep polished photorealistic product render quality and reference material palette.

### Ready to work

Use case: precise-object-edit. Production web asset: ONE square image near 1200x1200. Reference image 1 is original website art direction only; image 2 is EXACT seat asset to match. Create READY TO WORK state of the very same seat as image 2 with identical front three-quarter camera, equal framing/scale, floor, studio light, white outer shell, burgundy piping, navy upholstery, side console and materials. Change only the seat configuration and accessories: backrest more upright, calf rest stowed (closed vertical below cushion), remove the blanket, extend a refined tray table across the passenger lap area and place one discreet slim open laptop on the tray facing the seated passenger. Laptop screen dark with NO text/branding. Retain refined airy commercial premium airline design, no private jet. Seat assembly fully visible with clean margins and soft contact shadow on seamless near-white #F5F5F7 studio background. NO people, no UI, no text, no logos, no ghost duplicate chairs, no cabin, no cut-off object. Photoreal polished consistent product render; physical believable tray support and laptop orientation.

### Travelling together

Use case: product-mockup. Production web asset: ONE square image near 1200x1200. Image 1 is original website art direction; image 2 is exact seat style reference. Create TRAVELLING TOGETHER state: TWO separate neighboring commercial business class seats, both facing same direction, conventional side-by-side center-pair premium airline layout separated by a LOW shared console/divider (comfortable for conversation), explicitly not a double bed. Match reference seat: deep navy woven upholstery, white sculpted composite outer shell, slender burgundy piping #8A194F and charcoal plinth, warm understated dark wood side surfaces. Same front three-quarter camera angle viewed from passenger front-right, pulled back only enough to show complete pair. Both chairs have upright relaxed backrests with calf rests stowed, no laptops, no blankets required. Keep two seats clearly separate with their own cushions and headrests; physically credible commercial-airline seating. Full seat pair centered filling roughly 80 percent of square frame, generous clean margin around it. Soft diffused studio product-render lighting and subtle contact shadow on seamless near-white #F5F5F7 infinite studio background; no cabin, no people, no text, no UI, no logo, no ghosted seats, no cut-off objects, no private jet aesthetic. Photoreal textures, polished matching family to image 2.

## Inspection

All three tool outputs and final optimized WebPs were visually inspected. The images contain full seats with clean bounds; matching navy/white/burgundy materials; distinct resting, work, and neighboring-seat configurations; no image-baked text, branding, UI, or ghost seats. The work laptop faces the intended seated passenger. Together depicts two separate seats and does not depict a double bed.

Use a consistent square frame and `object-fit: contain`. A restrained crossfade is appropriate; these are raster product illustrations, not an exact interactive 3D model or proof of a particular airline's equipment.

Independent review on 2026-09-10 inspected the selected concept alongside all
three delivered WebPs. They retain the reference's tactile navy upholstery,
white shell, burgundy trim, three-quarter viewpoint and pale studio ground.
Rested has an extended leg rest and blanket; work is upright with a tray and
open laptop; together has two separate neighboring seats. No baked-in website
controls, headlines, people or airline logos were found. The set is appropriate
for the requested illustrative preference selector; browser state and summary
behavior remain separate UI checks.
