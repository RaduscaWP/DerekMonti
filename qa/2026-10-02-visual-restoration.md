# Historical visual restoration

## Direction and scope

Visual thesis: restore the May aviation site's navy and burgundy surfaces, rounded fare cards and tactile 3D interactions while preserving the approved aircraft-window homepage hero.

Content plan: retain the current homepage hero; restore the historical savings, methodology, personal-advisor, process, FAQ and journal sections; restore Services, About and Blog layouts; apply the same visual language to newer planning and legal routes.

Interaction thesis: service cards rotate from navy fronts to burgundy examples; fare cards respond to cursor position with restrained perspective; GSAP reveals and marquees provide the original motion, with keyboard, touch and reduced-motion alternatives.

## Provenance

The recording is 10.7 seconds, 1920 × 1080, and shows the Services card section. It does not show other pages. The observed title, four services, examples, card faces and 3D rotation correspond to source in `c57759674b76c4f51ada9a5e0ca2912205099c31`.

Counts are relative to starting HEAD `699c3cfea06852e0dc6d991da81fa1079c9b4fc6`:

| Milestone | Commit | Date | Commits behind starting HEAD |
| --- | --- | --- | --- |
| Effect introduced | `9d327e7` | 2026-05-10 | 25 |
| Latest commit preceding the recording filename timestamp | `c577596` | 2026-05-25 18:13:39 +03:00 | 8 |
| Last commit retaining the effect | `15510d6` | 2026-05-25 21:24:10 +03:00 | 6 |
| Effect removed | `f6f56b4` | 2026-08-31 | 5 |

The filename timestamp alone cannot prove which exact checkout was recorded; multiple commits contain the same card implementation. `c577596` is the compatible historical version used for restoration.

## Implementation

- Historical styles are isolated beneath `.legacy-experience[data-legacy]`. The approved hero's styles, media, markup and homepage header are retained.
- Services restores the four-card desktop grid and a 0.65-second Y rotation. Each card supports hover, a semantic button, Enter, Space and touch. Quiet mode changes faces without a rotation.
- Route cards restore perspective tilt, limited to eight degrees. Examples are explicitly illustrative, and savings percentages derive from displayed prices.
- Eleven original public Pexels photographs are cached locally. Their source URLs and historical source commit are recorded in `public/images/legacy/sources.json`.
- The current shared trip state, validation, private-data handling, API, anti-abuse controls, SEO, prerendering and actual article content are retained. Blog quote links lead to the current shared form.
- Planning/legal/404 routes created after May use the restored visual language and retain their current content. Unverified historical ratings, reviews and career dates are not presented as facts.
- Git history is retained. The implementation is a local working-tree change, with no push or deployment performed.

## Verification

- 51 existing tests passed.
- Production client and server builds, prerendering of 16 routes plus 404, and SEO validation passed.
- Browser checks cover all published routes on desktop and mobile, selected 320-pixel views, navigation, mobile menu/focus, card rotation and reduced motion, fare tilt, carousel controls and local anchors.
- Final production smoke passed all 16 published routes and the expected 404 response, with no runtime errors or horizontal overflow. The hero route fields still populate the shared trip form after navigation.
- An isolated form fixture passed validation, draft migration, airport keyboard controls, recovery after failure, retry and confirmation states at 390 and 320 pixels. No real request was sent.
- Hero/header markup, geometry, computed styles, fonts and protected media match the baseline. The mobile screenshot is pixel-identical. Desktop has a small documented raster difference of 1,496 pixels (0.104%), concentrated in one-value background rounding and the avatar's rounded edge; the hero design is unchanged.

Detailed captures and machine-readable evidence are in `output/playwright/2026-10-02-restoration/`; full video analysis and history notes are in `output/video-analysis/` and `output/history-analysis/`.
