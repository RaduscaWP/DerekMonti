# Trip request prototype: implementation and integration

## Local boundary

`src/TripForm.jsx` receives `trip`, `setTrip`, `step` and `setStep` from the homepage. `src/tripState.js` owns initial state, trip-type transitions, validation, serialization and the isolated simulated adapter. It imports the existing site's pure quote validator and option labels; it does not import the production form, API adapter, storage or delivery SDK.

`simulateTripSubmission` validates, snapshots the payload and waits 650 ms locally. It returns `preview: true` and `delivered: false`. The optional recoverable-error control demonstrates a failed simulation, then resets the next attempt to success. Neither result sends a request. Successful previews expose the simulated JSON under a disclosure for review. Editing shared data invalidates an old success. A hero or comfort edit during the delay prevents the stale result from being presented as the updated brief.

State stays in React memory. Reloading the page clears it. No sensitive contact data is persisted, and the production form's session key is untouched.

## Field compatibility

The route, dates, legs, travelers, cabin, flexibility, name, email, phone, contact preference, privacy acknowledgement, source and request title use the existing quote field names and values. One-way serialization excludes the inactive return value with an empty string; multi-city serialization uses the legs array and empty inactive top-level route fields. Inactive values remain in React state for lossless trip-type edits.

The prototype adds an optional `comfortPreference` enum: `rested`, `work`, or `together`. No property is emitted until the visitor chooses a preference. `notes` remains the original user text, with its existing 600-character limit. Changing or clearing a preference never appends text to notes, avoiding duplicate preference lines and truncation of the user's text.

The current `api/quote.js` normalizer does not accept this new property; forwarding the prototype payload to it unchanged would drop the preference. A later production integration must add the optional enum to server normalization and validation, and show its human-readable label in the advisor email and relevant request summaries. Add corresponding contract/rendering tests. Keep the current production anti-abuse fields, challenge handling, timing checks and delivery semantics when implementing a separate real adapter. This prototype has not modified that API or connected to it.

## Verification on 2026-09-10

- Moved the previous untracked state test from the repository root into `prototype/homepage/tests/trip-state.test.mjs`; updated its import for the isolated package.
- `npm.cmd test`: **11 passed, 0 failed** after the review changes.
- Coverage includes independent initial state and no default preference; per-step validation; invalid and past dates; lossless round/one-way/multi-city switches; multi-city chronological order and two-to-six-leg limits; all three comfort payload values; unchanged notes; conditional phone requirements; local calendar date handling; validation before submission; a failed simulation followed by success; immutable payload snapshots; and zero `fetch` calls from the adapter.
- `TripForm.jsx` passed an esbuild JSX transform and `trip-form.scss` compiled with Sass. These are syntax/stylesheet checks, not browser interaction tests.
- Added focus recovery for validation summaries and fields, step changes, success/edit transitions and flight add/remove controls. Focused content uses a 120 px scroll margin and is revealed when outside the viewport. Added an accessible loading announcement and made aggregate-error targets focusable.

Final browser interaction, responsive visual checks and the assembled production build are performed by the main homepage task; the checks above do not substitute for those.
