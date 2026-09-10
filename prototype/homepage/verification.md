# Verification record

Date: 10 September 2026. Target: built local homepage at http://127.0.0.1:4174/. This records checks performed across the resumed implementation; it is not a claim of universal browser or device coverage.

## Automated checks

| Check | Result |
| --- | --- |
| Prototype `npm.cmd test` | 11 passed, 0 failed |
| Prototype `npm.cmd run test:sites` | 4 passed, 0 failed |
| Parent repository `npm.cmd test` | 13 passed, 0 failed |
| Parent repository `npm.cmd run build` | Client, SSR, 16 prerendered routes and SEO checks passed |
| Prototype `npm.cmd run build` after final CSS correction | Passed; CSS 33.65 kB / gzip 7.34 kB; JS 309.65 kB / gzip 106.36 kB |

Total: **28 automated tests passed**. The final change adjusted hero typography only and was followed by a fresh build and browser capture. The parent SSR build emitted an existing empty `threeParticles` chunk warning; it did not fail. No performance score is inferred from successful builds or asset sizes.

State tests cover explicit optional comfort selection, all three payload values, unchanged user notes, per-step validation, past/invalid dates, conditional phone requirements, one-way/round-trip/multi-city transitions, chronological legs and leg limits, local dates, failed simulation and retry, immutable snapshots, and zero `fetch` calls from the simulated adapter.

## Browser interaction checks

- Hero From / To carried into the full form and survived validation and edits. In multi-city mode, the hero edited the first leg without erasing other legs or contact data.
- All three comfort choices changed the illustration and summary. Keyboard radio navigation changed the selected choice. The serialized preview included the selected enum and retained original notes.
- Round trip showed return; one way hid it and excluded it from the active payload; switching back restored the prior return date. Multi-city supported two legs, adding a third, removing it, and continuing through all steps.
- Route/date validation exposed a focused error summary with links to the relevant controls. Step changes and editing returned to the appropriate form content below the fixed header.
- Synthetic name, email, dates, traveler count, flexibility, notes and privacy acknowledgement were retained through backward edits. No real client data was used.
- Loading announced that no request was being sent. The deliberate recoverable-error path showed retry, and retry produced an explicitly simulated success. The preview JSON was inspected.
- Header and body actions, anchor navigation and FAQ worked. One FAQ remained open at a time. The mobile menu opened, closed via a link and Escape, and returned focus to its opener. Native modal behavior was used.
- Existing contact and secondary-page links were checked against repository data and routes. No email, WhatsApp message or phone call was initiated.

## Responsive, media and motion checks

Browser viewport widths: 1440, 768, 390 and 320 CSS px. Horizontal overflow was zero at all final checked widths. Available content widths were 1425, 753, 375 and 305 px respectively because of the browser scrollbar. Mobile controls were exercised in the responsive browser; this is not a physical-phone certification.

Normal playback used the 12-second muted loop and showed a working pause/resume control. Both formats decoded to 288 frames; seam and beginning/middle/end frames were visually reviewed. Independent measurements confirmed movement in the window and an effectively stationary cabin. Continuous browser playback was observed; seam quality was assessed with decoded-frame evidence, not a recorded full-loop browser trace.

The footer reduced-motion control removed the video and disabled motion while retaining the form and navigation. The OS `prefers-reduced-motion` listener and CSS were inspected, but the system setting itself was not toggled during QA.

Both built video files were temporarily made unavailable for a fresh browser load. The matching poster appeared, the unavailable playback control was omitted, and the route-to-form path remained usable. Both video files were restored and successful playback rechecked. The app uses no WebGL scene, so WebGL availability is not a dependency.

Normal-preview browser console checks returned no warnings or errors. The adapter was inspected for delivery calls and its test observed zero `fetch` calls; no browser-wide network trace was collected. Prototype code has no production quote delivery integration or analytics. Production anti-abuse and delivery behavior are outside this local simulation.

## Evidence and limits

See [design-qa.md](design-qa.md) for paired visual comparisons, corrected findings and screenshot paths. See [trip-integration.md](trip-integration.md) for the production contract boundary.

Not measured: Lighthouse/Core Web Vitals, bandwidth-throttled loading, Safari/iOS/Android device behavior, screen-reader speech output, actual OS reduced-motion switching or a forced browser autoplay rejection. The blocked-autoplay fallback is implemented but that particular browser policy rejection was not forced. These are residual release checks, not missing prototype assets.

Tracked production files remained unchanged. No production deploy, lead, message or analytics event was generated by the prototype's simulated submission.
