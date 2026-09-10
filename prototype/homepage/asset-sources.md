# Asset sources

Recorded 10 September 2026. Runtime assets are local; the page does not fetch images, video or fonts from a third-party CDN.

| Asset | Provenance | Runtime use |
| --- | --- | --- |
| `public/assets/hero-window-loop.webm` / `.mp4` | Project-generated cabin plate composited with actual Mixkit clip 4204 footage | Fixed cabin, moving ocean/cloud view, 12 seconds, 1536 × 1024, 24 fps, no audio |
| `public/assets/hero-window-video-poster.webp` | First frame of the delivered loop | Immediate load, reduced motion and unavailable-video fallback |
| `public/assets/hero-window.png` / `.webp` | Built-in Imagegen, matching the approved departure reference | Retained golden-hour master and static alternative; not the runtime video poster |
| `public/assets/comfort-rested.webp` | Built-in Imagegen, approved comfort reference | Rest-oriented illustrative seat |
| `public/assets/comfort-work.webp` | Built-in Imagegen, same seat/material reference | Upright seat, tray and laptop |
| `public/assets/comfort-together.webp` | Built-in Imagegen, same material reference | Two separate neighboring seats |
| `public/assets/derek-monti.jpg` / `derek-avatar.jpg` | Copied unchanged from repository `../../public/images/derek-monti.jpg` | Genuine supplied portrait; no regenerated likeness |
| Syne and DM Sans | Installed `@fontsource` packages, SIL Open Font License 1.1 | Self-hosted typography |
| Lucide React icons | Installed `lucide-react` package, ISC with included Feather MIT notices | Interface icons |

The original and both copied portrait files share SHA256 `D14B9F654A6FF3E6216E15E181942AA297449A5A198EE92389EA4A2ACA3786D1`. The existing project asset is reused under the user's project authorization; no separate stock-license claim is inferred.

## Moving footage

[Pink sunset seen from a plane window — Mixkit clip 4204](https://mixkit.co/free-stock-video/pink-sunset-seen-from-a-plane-window-4204/) was checked on 10 September 2026 and marked for personal and commercial use under the [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree). Its retained source is `media-source/mixkit-4204-720.mp4`.

The source was cropped to the unbranded ocean/cloud region, color graded, placed inside the fixed generated cabin, and joined with a two-second eased dissolve. It contains real moving footage; no CSS still zoom substitutes for the required video. The view is cooler twilight than the approved golden-hour reference. This difference is visible in the comparison evidence.

Full prompts, original paths, sizes, encoding and reproduction details: [hero-media.md](hero-media.md). Independent decoded-frame evidence: `media-source/independent-media-verification.json` and `media-source/hero-seam-review.jpg`.

## Generated seat illustrations

All three 1200 × 1200 WebPs use the same navy upholstery, white shell and burgundy trim, with no baked-in website controls. Total optimized size: 350,646 bytes. They are illustrative preferences, not airline inventory, guaranteed amenities or a seat reservation. The visible caption states: “Illustrative cabin. Details vary by flight.”

Full generation prompts, source names and visual inspection: [comfort-media.md](comfort-media.md). Original PNGs are retained under `media-source/`.

## License notices

- [Syne OFL](docs/licenses/Syne-OFL.txt)
- [DM Sans OFL](docs/licenses/DM-Sans-OFL.txt)
- [Lucide ISC / Feather MIT notices](docs/licenses/Lucide-ISC-MIT.txt)

The selected concept files in `../../design-research/2026-09-09/` are visual references, not flattened screenshots used as page content. Headings, controls, route fields and navigation are live HTML.
