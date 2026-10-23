# Automatic request intake

Public production and public previews require working Redis credentials and a
server-only `QUOTE_DIGEST_SECRET` of at least 32 characters. A missing provider
or failed Redis operation returns temporary unavailability before email dispatch.
Local process memory is only a development convenience and is never a public fallback.

The default `QUOTE_CHALLENGE_MODE=required` requires both the server Turnstile
secret and public widget key on public deployments. Siteverify must return the
`quote_request` action and an expected hostname. Default allowed origins are the
two Fly with Derek domains; the exact Vercel deployment hostname is also accepted.
Set `QUOTE_ALLOWED_ORIGINS` and `TURNSTILE_EXPECTED_HOSTNAMES` explicitly for any
additional approved domain. Cross-site browser requests and non-JSON bodies are
rejected. These headers do not authenticate direct clients.

`QUOTE_CHALLENGE_MODE=distributed_only` is a deliberate operational alternative,
not an outage fallback. It still requires Redis and all distributed controls.
Before choosing it, the owner must review traffic and provider budgets. Remove
the client widget key if choosing this mode. No edge protection is inferred from
an environment flag. Default limits are 8 attempts per IP, 4 dispatch attempts per
recipient and 80 global dispatch attempts in ten minutes. Each claimed request can
send at most two messages. Review these limits for shared office IPs and the actual
email quota. Keys contain server-keyed digests, never raw email addresses or IPs.
Redis Lua increments and sets/repairs TTL in one atomic operation.

Each immutable browser submission receives a random UUID and creation time held
only in memory. A retry keeps both; edited details receive a new UUID. Redis stores
only a keyed payload digest, reference, timestamps, a bounded processing lease and
delivery state, with 48-hour retention. It stores no request bodies, contact details,
notes, or challenge tokens. Same ID/different payload is rejected. Concurrent
workers claim one 60-second lease. Crash recovery waits for that lease and uses the
same independent `quote-advisor/{UUID}` and `quote-confirmation/{UUID}` provider keys.

The provider retains idempotency keys for 24 hours, so an unconfirmed send is retried
only within 23 hours. The client keeps the original attempt time and the server
checks it, as well as its stored creation time. After that, contact Derek about the
earlier attempt. This is bounded deduplication, not guaranteed exactly-once delivery.
Do not rotate the digest key, change sender routing, or delete registry data during
an unresolved retry window without reviewing recovery consequences. Redis loss or
credential changes can prevent reconciliation; no application can prove inbox
delivery from provider acceptance alone.

Advisor acceptance is saved before client confirmation. A successful receipt
contains only the reference and confirmation status. Duplicate receipts never
resend either message; a failed confirmation is reported with the accepted advisor
reference. The customer acknowledgement is fixed content without the itinerary,
free notes, names, or caller-controlled title. A 5xx, timeout, interrupted connection
or ambiguous provider result says receipt is unconfirmed and never invents failure
or success. All failures preserve current page inputs and direct contact links.

Provider waits are bounded: Redis/Siteverify 5 seconds, each email 8 seconds, browser
submission 35 seconds including its response body. A browser timeout does not cancel
a server side effect. Ensure the deployment's function duration accommodates the
entire workflow and reserve room for infrastructure latency. A timeout during email
processing must recover with the original identity. Current live function duration,
WAF settings, keys, sender permissions, quotas, and inbox delivery are unverified.

Verification uses synthetic environment values set before API import, mocked
Siteverify/Resend/Redis fetches and blocked unexpected network destinations.
Run `node --test tests/quote-contract.test.mjs tests/homepage-trip.test.mjs
tests/quote-security.test.mjs`. These tests exercise the application state machine
and Redis REST command contract; a synthetic Redis fixture does not establish live
Redis availability or independently certify the Lua runtime/provider configuration.
Do not submit the dev server form for QA without intercepting `/api/quote`, because
the Vite middleware can execute the real API and load local configuration.

Primary contracts: [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys),
[Cloudflare token validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
[Upstash EVAL](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval).
