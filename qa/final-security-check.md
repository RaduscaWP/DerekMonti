# Quote intake security and recovery check

Reviewed 2026-10-03. This is a focused source review with synthetic local tests, not a penetration test or a verification of live provider settings.

The distributed intake, payload binding, bounded retry and fixed acknowledgement controls are present. Two material browser recovery issues were found and fixed: edits could silently create another identity after an uncertain send, and leaving the form could discard its attempt or late receipt. No further material server defect was confirmed in the reviewed paths.

## Fixed findings

### 1. High: edited details could bypass an unresolved attempt

An advisor email may already have been accepted when the browser receives no reply. The earlier form unlocked editing and created a new UUID when any serialized detail changed, giving the next email a different provider idempotency key.

The submission controller now holds a frozen original trip and identity. Uncertain, in-progress, conflicting and expired attempts lock request edits and cannot be reset into another automatic submission. Retrying uses the original snapshot even if altered data is supplied. A definite first rejection permits correction; a later rejection preserves earlier uncertainty. See `src/components/homepage/tripState.js:160-218`, `src/components/homepage/TripForm.jsx:137-170` and `src/context/TripBriefProvider.jsx:19-31`.

Tests cover changed email and notes after uncertainty, identical retry bodies and UUIDs, first versus later rejection, expiry without another provider call, and validation or verification failure after an uncertain attempt. See `tests/homepage-trip.test.mjs:391` onward.

### 2. High: route changes could lose the attempt and late result

The identity and receipt previously belonged to the mounted form. Navigating away could lose its deduplication identity or ignore a successful response while keeping the old draft available to send again.

The controller now belongs to `TripBriefProvider`, which surrounds the route tree. Async results continue updating that shared memory after the form unmounts. A late acceptance clears the saved draft and keeps the original receipt available on return. A late uncertain result retains the same attempt and retry. See `src/context/TripBriefProvider.jsx:15-18`, `src/context/TripBriefProvider.jsx:94-105`, and `src/App.jsx:72-95`.

Tests unsubscribe the form listener while a mocked transport remains pending, then verify both late acceptance and late uncertainty. Acceptance is visible on return without a second send.

## Server controls checked

- Production and public preview do not fall back to process memory. Missing digest or Redis configuration, rate-limit errors and claim errors stop before email dispatch. See `api/_security.js:10-22`, `api/_security.js:70-84`, `api/_requestRegistry.js:64-68`, and `api/quote.js:231-235,292-295`.
- Rate counts and expiry repair use a single Lua `EVAL`; recipient and global dispatch budgets are independent of the admission IP budget. Claim and update scripts atomically bind the UUID to a keyed normalized-payload digest, own a bounded lease and preserve record expiry. See `api/_security.js:54-81`, `api/_requestRegistry.js:11-44`, and `api/quote.js:306-311`.
- Records have 48-hour retention; unresolved sends have a 23-hour retry limit. The same advisor payload and UUID use the same provider key, with a separate key for acknowledgement. This fits the documented 24-hour provider retention, while leaving a margin. See `api/_requestRegistry.js:4-7`, `api/quote.js:269-273,319-343`, and [Resend idempotency documentation](https://resend.com/docs/dashboard/emails/idempotency-keys).
- Advisor acceptance is recorded before acknowledgement. Accepted duplicate receipts do not resend either email. Provider 5xx, concurrency, timeouts and ambiguous success remain uncertain. A failed acknowledgement does not erase accepted advisor receipt. See `api/_sendEmail.js:3-17` and `api/quote.js:303,327-344`.
- Acknowledgements contain fixed branded text and a restricted UUID-derived reference, without visitor names, routes, notes or titles. Advisor HTML escapes request values. See `api/_sendEmail.js:20-23` and `api/_emailTemplate.js:18-27`.
- JSON and exact allowed browser origins are checked, cross-site browser metadata is rejected, and provider waits are bounded. Required challenge mode verifies success, action and expected hostname; missing configuration does not silently disable it. The explicit distributed-only mode still requires the distributed controls. See `api/_security.js:26-45,98-143`, `src/components/common/TurnstileWidget.jsx:47-58`, and [Cloudflare validation documentation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

## Verification and practical limits

The targeted homepage suite passed **32/32 tests**, including seven new recovery-state tests. Both edited JSX modules also passed a syntax transformation. Tests used the actual request adapter with mocked fetch responses and synthetic contact values. No real quote API submission, email send, Redis request, challenge verification, or local credential-file read was performed during this check. The root task owns full build and rendered browser verification.

Synthetic Redis tests validate the REST command contract and modeled transitions; they do not independently execute the Lua scripts in a live Redis engine. [Upstash EVAL documentation](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval) confirms the selected server-side script interface. Live credentials, challenge registration, sender permissions, mail budgets, edge policy, trusted proxy IP handling and function duration still require deployment verification.

The 48 hours describe record retention. The existing POST timestamp check rejects even accepted attempts after 23 hours before registry lookup, so this is not a promise of 48-hour browser receipt retrieval. Intake rate limits and verification may also prevent immediate receipt reconciliation. Origin and fetch metadata do not authenticate direct clients.

The original attempt, contact details and receipt remain only in page memory. Full page reload or closing the tab loses them; the form therefore tells visitors to keep the page open and contact Derek about the earlier reference. Safe session drafts still exclude contact details, notes, consent and submission identities. No inbox delivery or exactly-once guarantee is claimed.

## Isolated rendered recovery fixture

Prepared `qa/fixtures/quote-recovery.html` and `qa/fixtures/quote-recovery.jsx`, served locally at `http://127.0.0.1:5174/qa/fixtures/quote-recovery.html`. They are outside `src` and `public`, require a local hostname and QA path, and are not production build entries. The existing App is mounted in a MemoryRouter so Services/Home navigation exercises the real route tree and shared provider.

Every local `/api/quote` fetch is intercepted before validation and waits for a fixture control to resolve it. No quote branch forwards to the server. Only `example.test` synthetic emails are accepted. Other fetches retain the normal implementation. The fixture supplies a synthetic Turnstile object before App import, preventing a real challenge script or verification. It records request bodies in its local evidence panel and never persists them.

The fixture JSX passed syntax transformation. This review agent could not perform browser actions: inventory returned no enabled browsers and binding the root's browser ID returned `Browser is not available: 2`. The root subsequently executed the following steps in its working browser; this agent independently inspected the saved screenshots, current locking source and payload evidence afterward.

1. Enter New York JFK to London LHR, departure `2030-05-01`, return `2030-05-10`. Continue, enter `LOCAL QA original notes`, then continue. Use `QA Synthetic Traveler` and `qa-recovery@example.test`, with privacy acknowledged.
2. Submit, then promptly click **Fixture: Services**, **Fixture: Accept pending**, and **Fixture: Return Home**. Resolve within the 35-second browser deadline. Expected: the original accepted receipt remains visible after returning, with one recorded quote fetch.
3. Start another request and repeat the dummy details. Submit, then click **Fixture: Services**, **Fixture: Unknown pending**, and **Fixture: Return Home**. Expected: original details and attempt reference remain; contact and edit controls are disabled; **Retry the same request** stays available.
4. Retry and click **Fixture: Accept pending**. Expand **Fixture payload evidence**. Expected: original uncertain request and retry have identical `requestId`, `requestCreatedAt` and trip fields. Only verification token and form start time may change across route remounts. The accepted receipt retains the original reference.

### Root-executed rendered results, independently reviewed

The root ran both route-change scenarios with the dummy details above. For the first request it submitted, navigated to Services while pending, accepted the pending fixture response, then returned Home. The saved `qa/final-preview/receipt-after-route.jpg` visibly shows the accepted original receipt, New York JFK to London LHR, May 1–10, 2030, original notes, and fixture counter **Recorded: 1 · Pending: 0**. Its `DM-4F1964EC-3D58-4CFE-8810-5D580606A265` reference matches the first payload's UUID.

For the second request the root navigated to Services while pending, resolved it as unknown, and returned Home. It observed the unconfirmed error and attempt reference, disabled contact/edit/hero controls, and an enabled **Retry the same request** action. The saved `qa/final-preview/uncertain-after-route.jpg` shows return to Contact & review with the original route and fixture counter **Recorded: 2 · Pending: 0**. Its capture ends before the error and contact controls; those control-state observations come from the root's browser check, supported here by current source and the state tests, rather than that screenshot alone.

The root retried the second request and accepted its pending fixture response. Independent assertions against `qa/final-preview/recovery-payload-check.json` passed:

- Exactly three recorded quote fetches, with outcomes **accepted → unknown → accepted**.
- The unknown request and accepted retry share UUID `f59c2055-6203-4226-9547-149ef36e21e9` and creation time `1791035815152`.
- Their complete payloads match after excluding only `formStartedAt` and `turnstileToken`. The only actual changed key is `formStartedAt`; the token is empty in both records. All original route, contact, notes, privacy, cabin and attribution fields match.
- The first accepted request has a distinct UUID; all three emails are the synthetic `qa-recovery@example.test`.

These artifacts verify the rendered application recovery path with local fixture responses. They do not establish real server dispatch, provider acceptance, inbox delivery or deployed challenge configuration. No production source was changed during this evidence review.
