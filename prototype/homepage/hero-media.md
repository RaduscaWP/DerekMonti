# Hero media manifest

Created and verified: 2026-09-10. Scope: local homepage prototype.

## Delivered files

All served files are in `public/assets/`. All share a 1536 × 1024 (3:2) canvas.

| File | Bytes | Purpose |
| --- | ---: | --- |
| `hero-window.webp` | 118084 | Original golden-hour generated poster; closest to the mandatory reference |
| `hero-window.png` | 1997762 | Original generated master for reproducible video compositing |
| `hero-window-video-poster.webp` | 106362 | Matching first-frame poster for the actual video loop |
| `hero-window-loop.webm` | 311986 | VP9, 24 fps, 12 seconds, no audio |
| `hero-window-loop.mp4` | 582145 | H.264, 24 fps, 12 seconds, no audio, fast-start metadata |

Prefer the WebM source, then MP4. Use `hero-window-video-poster.webp` as the video
element poster for a visually consistent load. The original `hero-window.webp`
is also available as the golden-hour static variation. Both assets preserve the
dark navy left area, large right-hand aircraft window, natural interior light,
and burgundy seat edge. Neither has baked-in website UI, text, logos, or people.

The moving window view is blue/pink twilight rather than an exact animation of
the generated golden-hour ocean. The cabin and its frame remain stationary.
This is a composite with actual moving in-flight ocean/cloud footage, not a
CSS zoom or a video made by zooming a still image.

## Generated plate provenance

- Built-in `image_gen` tool, produced for this project on 2026-09-10.
- Reference: `../../design-research/2026-09-09/concept-01-departure.png`.
- Generated original retained at:
  `C:/Users/GZv0x00/.codex/generated_images/01a08a14-9e60-7c01-a78a-450758d64631/exec-6b4774a3-0cd7-4010-88af-615aaa8348a6.png`.
- This is an illustrative premium cabin, not a representation of a specific
  airline's seat, confirmed flight, or purchased ticket.

Generation prompt:

> Use case: photorealistic-natural. Create one clean photographic background
> plate for a premium personal aviation website. The supplied image is a
> mandatory reference for the aircraft cabin composition and atmosphere only;
> remove ALL of its typography, buttons, logo, form bar, portrait, iconography
> and graphic UI. Full bleed photorealistic aircraft cabin image, wide landscape
> composition approximately 3:2 at highest quality. Keep a large vertical rounded
> aircraft window prominently on the RIGHT, window opening from about 59% to 83%
> of image width, natural cream-colored recessed sculpted trim, aircraft wall
> remains perfectly still. Through the window: real blue ocean far below, small
> fluffy white clouds at cruising altitude, hazy warm natural late-afternoon
> sunlight. Realistic narrow burgundy fabric seat edge at far right, no
> embroidered text. Leftmost 55% of image is almost-black deep navy cabin wall in
> shadow, quiet seamless negative space designed for live white website
> headlines, no objects, no highlights, no visible graphics there. Match the
> reference's premium quiet materiality, photographic optics, gentle warm rim
> light on the window and fabric. Window must be slightly shorter than reference
> so its entire frame fits between 12% and 81% image height. Keep bottom 17%
> relatively dark for live form overlay. No people, no text, no UI, no watermark,
> no logo, no airline branding, no stylized illustration, no sci-fi. This must be
> a usable standalone photo asset, NOT a website screenshot.

## Moving footage provenance and rights

- Source: [Pink sunset seen from a plane window, Mixkit clip 4204](https://mixkit.co/free-stock-video/pink-sunset-seen-from-a-plane-window-4204/).
- Download served by the source page:
  `https://assets.mixkit.co/videos/4204/4204-720.mp4`.
- Retained source: `media-source/mixkit-4204-720.mp4` (8,717,516 bytes,
  1280 × 720, 24 fps, 690 frames).
- The exact clip page was checked on 2026-09-10 and marks this clip for personal
  and commercial use under the [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree).
  It is not one of Mixkit's personal-use-only restricted-license clips.
- Adaptation: cropped the left part of the frame to remove the aircraft wing
  and its markings; restrained warm color grade; composited into the generated
  cabin's window; audio omitted; 2-second eased dissolve for the loop join.
- No purchased asset, account login, watermark removal, or external publication.
- Sora was inspected but not used: `OPENAI_API_KEY` was absent in the process
  environment. No key value was read or printed. No paid generation fallback
  was invoked.

## Reproduction and verification

Run from the repository root:

```powershell
python prototype/homepage/media-source/build_hero_loop.py
```

Requires existing Python packages `numpy`, `opencv-python`, `imageio-ffmpeg`.
The script edits moving footage and encodes with the bundled FFmpeg binary.

Verification completed:

- Inspected the generated plate, source video frames, composite frame, and
  beginning/middle/end contact sheet visually.
- H.264 output decodes to 288 frames at 24 fps: exactly 12 seconds.
- WebM stream inspection confirms VP9, 1536 × 1024, 24 fps, 12 seconds, no audio.
- Pixel mean absolute difference between the first and 5-second decoded frame
  inside the window: 8.42/255; the cabin's left region: 0.034/255. This confirms
  actual scene movement while the cabin stays still.
- First/last unencoded composite mean absolute difference: 0.108/255;
  first/last decoded MP4 difference: 0.971/255.
- Review image: `media-source/hero-loop-contact-sheet.jpg`.

Browser loading, pause controls, reduced-motion behavior, mobile framing, and
autoplay rejection handling belong to the consuming UI and must be verified
there. Asset generation alone does not establish those checks.

## Independent media review

Rechecked on 2026-09-10 after the interrupted implementation resumed:

- Both delivered formats decode successfully to **288 frames at 24 fps**,
  **1536 × 1024**, **12.0 seconds**. Stream inspection finds only video, no audio.
- The original Mixkit clip page was reopened and still explicitly permits
  commercial and personal use under its Stock Video Free License.
- The retained source frame shows genuine in-flight clouds over the ocean. The
  compositing script crops the unbranded left side of this footage into a fixed
  generated window plate. It does not create motion by zooming a still image.
- Independently measured MP4 window difference from 0 to 5 seconds is
  **8.43/255**; the dark cabin region is **0.053/255**. Corresponding WebM values
  are **8.30/255** and **0.043/255**. Motion is concentrated in the window view.
- Reviewed decoded frames at 0, 9.92, 10.42, 10.92, 11.42 and 11.96 seconds:
  the window frame is stable, and the final clouds return close to the opening
  composition through the two-second dissolve. First/last decoded whole-frame
  differences are **0.971/255** for MP4 and **0.981/255** for WebM. These small
  codec differences do not establish perfect pixel equality; final continuous
  playback and controls still require browser QA.
- The principal visual variation from the reference is the cooler pink/blue
  twilight outside, rather than the reference's golden reflected sunlight. The
  window architecture, navy cabin, burgundy edge and clear left text area remain.

Evidence: `media-source/independent-media-verification.json`,
`media-source/hero-seam-review.jpg`, and
`media-source/source-frame-independent-review.jpg`.
