# Security peer review: delivery resilience and the proposed homepage

2 October 2026 · analysis only · local HEAD `699c3cfea06852e0dc6d991da81fa1079c9b4fc6`

The original report is evidence-grounded. Its **SEC-01 Medium / SEC-02 Low / SEC-03 Low** ratings are reasonable for the demonstrated conditions. No new Critical or High finding is established by this bounded peer review. The design candidate can preserve the existing request contract without introducing new data collection. Production protection and delivery configuration remain unverified.

Reviewed: `SECURITY_REVIEW.md`, its isolated proof script and saved results, `api/_security.js`, `api/quote.js`, active `TripForm.jsx` / `tripState.js`, shared trip state, analytics, and the existing editorial priority component as a potential reuse source. Used the local security-best-practices React/general frontend guidance. No source edits, secret reads, provider calls, lead submissions, deployment, or new tests. Saved test/audit results were inspected, not rerun.

## 1. Findings and qualifications

| ID | Judgment | Evidence and qualification |
| --- | --- | --- |
| PEER-01 | Retain SEC-01 Medium | `_security.js:4–5,31–55` falls back to a process-local map; `58–62` intentionally skips Turnstile when its secret is absent. The two saved worker results substantiate separate quotas, not production exploitation. Missing Turnstile alone is not proof of an unsafe deployment if independent distributed controls are effective. Distinguish deliberate challenge-optional operation from accidentally mismatched client/server configuration. |
| PEER-02 | Retain SEC-02 Low; give it high operational priority | `quote.js:241,289–296,313–320` creates a new reference and two provider sends on each call. The form lock prevents double clicks but cannot resolve a lost response. A provider timeout/exception may occur after acceptance: the current `502` wording at `297–308` says delivery failed even though an indeterminate outcome is possible. This is a wording/state distinction, not proof of a new High vulnerability. |
| PEER-03 | Retain SEC-03 Low | `_security.js:38–40` increments before setting expiry and only attempts expiry for count 1. The synthetic Redis failure is consistent with the source. Repairing TTL later helps recovery but does not replace atomic count/expiry. The test does not show an attacker can induce the provider failure. |
| PEER-04 | Keep the report's narrow analytics claim | `analytics.js:14–20` blocks arbitrary text; it does not prove the complete analytics system is anonymous. Its allowlist includes `priority` at line 11. Existing `HomeEditorial.jsx:45` writes a choice directly into shared trip state and emits that category, but current imports do not connect that component to `Homepage → HomeSections`; do not describe this as active production behavior. It is a concrete reuse trap for the proposed two-stage interaction. |

The original report correctly avoids claiming account CSRF or Vercel IP spoofing. Its JSON/Origin and Turnstile hostname/action observations are defense-in-depth recommendations with explicit limits. Saved evidence supports the stated 47 passing tests and zero known dependency advisories at the time of that audit; neither establishes live configuration or logical security.

## 2. Concrete production failure and retry policy

Keep independent, distributed/edge admission controls effective for every public deployment. Add recipient and global dispatch budgets alongside an IP limit; tune them for clients sharing an office/network. Recipient counters should use a server-keyed digest rather than storing raw email addresses as keys, with short TTLs and no request bodies/tokens in monitoring. Do not rely on a client timer or honeypot as the main control.

| Condition | Server behavior | Visitor experience |
| --- | --- | --- |
| Input invalid or challenge token invalid | No dispatch; specific recoverable validation response | Preserve entries on the current page; focus the error and permit correction/reset. |
| Challenge service/widget unavailable | Do not silently skip an intended verification requirement. Continue automatic intake only through an explicitly designed mode whose independent distributed/edge controls are already verified; otherwise return temporary unavailability | Verification retry plus always-visible email/WhatsApp contact. No compulsory page reload and no dead end behind the widget. |
| Distributed limiter unavailable and no independent edge substitute is verified | No automatic email dispatch; temporary `503`, with a sensible retry delay | Keep entries and offer direct contact immediately. A memory-only quota is not a safe production replacement. |
| Admission quota exceeded | `429` and `Retry-After`; no dispatch | Explain when to retry, retain entries, show direct contact. Avoid implying the trip itself was rejected. |
| Advisor provider explicitly rejects the send | Retryable failure; no success claim | Keep entries and offer retry/contact. |
| Advisor outcome unknown or HTTP reply lost | Preserve the same request identity; reconcile or retry using the same provider idempotency key | “Receipt could not be confirmed.” Do not assert failure, success, or suggest starting a new request. |
| Advisor accepted; client confirmation fails | Return the accepted reference with `confirmationSent: false` | Request received; keep the reference. Never resend the advisor notification to recover only the confirmation. Existing `quote.js:311–330` and `TripForm.jsx:375–379` already follow this useful distinction. |

Use one opaque random request ID for an immutable submission and all retries, with an atomic distributed record binding it to a canonical payload digest and stable reference. Different payload with the same ID must be rejected; legitimate edits start a new identity. Separate advisor/confirmation provider keys and a concurrent claim prevent two workers sending simultaneously. A browser timeout bounds waiting but does not cancel a server-side send, so it requires the same uncertain-outcome handling. Do not advertise guaranteed exactly-once delivery.

An idempotency record is not authorization to expose contact/trip data: duplicate responses should contain only the minimal receipt. Keep retention explicit and avoid raw payloads in the deduplication registry unless the approved delivery architecture genuinely requires them. A new durable queue is a separate architecture decision; do not claim receipt merely because an in-memory task was started.

The customer confirmation currently repeats the complete advisor `html`/`plain` payload (`quote.js:313–320`). The original fixed-content recommendation is sound: use a concise branded acknowledgement/reference without free notes or caller-controlled titles. HTML escaping prevents markup execution but does not prevent unsolicited branded messages to an address supplied by another person.

## 3. Privacy boundaries for “Derek → Your Journey”

1. Keep a real Derek portrait in its original setting. Present cabin imagery separately with its illustrative status readable. Avoid implied airline affiliation, guaranteed availability, or a fabricated portrait/cabin composite.
2. Keep the first-scroll choice in transient, separate preview state. Rested / Ready to work / Travelling together should change only explanations of cabin by segment, schedule/connections, and fare conditions. Scroll position, an image change, or a default preview must not write a preference to the request.
3. **“Use this priority in my request” is the sole handoff** to existing `trip.comfort`. Preserve all route/contact/notes fields, show the applied value, and retain the form's “Clear priority” action (`TripForm.jsx:435–446`). New selection must be blocked while submission is busy. Existing enum validation/serialization already accepts these values and leaves them absent when unselected (`tripState.js:44–48,109–115,144–147`; `quoteRequest.js:212–214`).
4. No new choice analytics, profiling, score, remote personalization, or third-party calls. Do not reuse `HomeEditorial.jsx:45` unchanged. The new preview should not emit `comfort_select` or the selected priority, and never place routes, dates, names, email, notes, or choice in URLs or analytics properties.
5. Preserve existing storage minimization: preview state stays in memory; the explicitly applied preference may follow the current itinerary session draft. Contact data, notes, consent and challenge tokens remain excluded (`tripState.js:207–217`). Session itineraries can still be sensitive. Successful receipt already clears both draft keys (`TripBriefProvider.jsx:57–67`); do not duplicate or weaken that behavior.
6. Keep request privacy acknowledgement separate from the optional preference and any future marketing consent. Current acknowledgement says the notice was read (`TripForm.jsx:462–464`), not permission for newsletters. Direct-contact fallback should remain an explicit user action, with no automatic transfer of form details to an external service.

## 4. Verification before implementation is considered production-ready

- Confirm production and public-preview admission policy, effective Redis/edge controls, quotas, and failure modes without exposing secret values. Verify client/server challenge configuration, hostname/action policy, and runtime timeouts.
- Inspect live security headers/CSP on the actual domain and API responses. Repository declarations are not evidence that every response receives them.
- Verify provider sender/recipient routing, budgets and current idempotency behavior with approved isolated fixtures or a staging sink. Do not submit a real lead as a test.
- Test concurrent duplicate requests, partial acceptance, unknown outcomes, limiter/verification outages and shared-IP use with fully simulated providers. Confirm no automatic retry sends a second advisor email.
- For the candidate, verify preview/apply/clear behavior, keyboard operation, busy-state protection, draft restore, and browser network traffic: choice-only exploration must produce no quote submission or new tracking request.

The design itself does not require an account, a compulsory challenge on every interaction, or new external services. Delivery hardening should preserve direct access to Derek while refusing only the automatic side effect when no adequate admission control is available.
