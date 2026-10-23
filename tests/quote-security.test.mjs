import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { SyntheticRedis, setSyntheticEnvironment } from './helpers/quoteMocks.mjs';

setSyntheticEnvironment();
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('Unexpected provider request blocked'); };
const { default: handler } = await import('../api/quote.js');
const { checkRateLimit, RATE_SCRIPT, withDeadline } = await import('../api/_security.js');
const { createRequestRegistry, RECEIPT_TTL_MS, PROVIDER_RETRY_WINDOW_MS } = await import('../api/_requestRegistry.js');
const { createInitialTrip, createSubmissionIdentity, submitTripRequest, safeTripProgress } = await import('../src/components/homepage/tripState.js');
globalThis.fetch = originalFetch;

function fixture(overrides = {}) {
  return { tripType: 'round_trip', from: 'New York JFK', to: 'London LHR', departure: '2030-05-01', returnDate: '2030-05-10', legs: [], travelers: 1, cabin: 'business', flexibility: 'exact', fullName: 'Synthetic Traveler', email: 'synthetic@example.com', phone: '', contactPreference: 'email', notes: 'Private synthetic notes', privacyAcknowledged: true, formStartedAt: Date.now() - 2000, turnstileToken: 'synthetic-token', requestId: randomUUID(), requestCreatedAt: Date.now(), ...overrides };
}

async function invoke(body, headers = {}, ip = '192.0.2.88') {
  const response = { headers: {}, statusCode: 200, setHeader(key, value) { this.headers[key] = value; }, status(value) { this.statusCode = value; return this; }, json(value) { this.payload = value; return this; } };
  await handler({ method: 'POST', body, headers: { 'content-type': 'application/json', ...headers }, socket: { remoteAddress: ip } }, response);
  return response;
}

function services(t, options = {}) {
  const baseline = { ...process.env };
  setSyntheticEnvironment();
  Object.assign(process.env, { NODE_ENV: 'production', UPSTASH_REDIS_REST_URL: 'https://redis.synthetic.example', UPSTASH_REDIS_REST_TOKEN: 'synthetic-only', ...options.env });
  t.after(() => { for (const key of Object.keys(process.env)) if (!(key in baseline)) delete process.env[key]; Object.assign(process.env, baseline); });
  const calls = { emails: [], challenges: [], unexpected: [] };
  const redis = options.redis || new SyntheticRedis();
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    if (String(url).startsWith('https://redis.synthetic.example')) return redis.rest(init);
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      calls.challenges.push(init);
      if (options.verify) return options.verify(init);
      return Response.json({ success: true, action: 'quote_request', hostname: 'www.flywithderek.com' });
    }
    if (url === 'https://api.resend.com/emails') {
      const call = { body: JSON.parse(init.body), key: init.headers['Idempotency-Key'], signal: init.signal };
      calls.emails.push(call);
      if (options.email) return options.email(call, calls.emails.length);
      return Response.json({ id: 'synthetic-message' });
    }
    calls.unexpected.push(String(url));
    throw new Error('Unexpected provider destination blocked');
  });
  return { calls, redis };
}

test('public intake refuses missing distributed configuration without verification or dispatch', async (t) => {
  const { calls } = services(t, { env: { UPSTASH_REDIS_REST_URL: '', UPSTASH_REDIS_REST_TOKEN: '' } });
  const response = await invoke(fixture());
  assert.equal(response.statusCode, 503);
  assert.equal(response.headers['Retry-After'], '60');
  assert.match(response.payload.error, /entries are kept/i);
  assert.deepEqual(calls, { emails: [], challenges: [], unexpected: [] });
});

test('public preview protection does not depend on NODE_ENV production', async (t) => {
  const { calls } = services(t, { env: { NODE_ENV: 'test', VERCEL_ENV: 'preview', UPSTASH_REDIS_REST_URL: '' } });
  assert.equal((await invoke(fixture())).statusCode, 503);
  assert.equal(calls.emails.length, 0);
});

test('Redis outage never falls back to process memory or sends email', async (t) => {
  const redis = new SyntheticRedis(); redis.fail = true;
  const { calls } = services(t, { redis });
  assert.equal((await invoke(fixture())).statusCode, 503);
  assert.equal(calls.emails.length, 0);
  assert.equal(calls.challenges.length, 0);
});

test('registry outage after admission still prevents dispatch', async (t) => {
  const redis = new SyntheticRedis();
  const original = redis.eval.bind(redis);
  redis.eval = async (script, keys, args) => { if (script.startsWith('-- quote-claim')) throw new Error('Registry unavailable'); return original(script, keys, args); };
  const { calls } = services(t, { redis });
  const response = await invoke(fixture());
  assert.equal(response.statusCode, 503);
  assert.equal(calls.challenges.length, 1);
  assert.equal(calls.emails.length, 0);
});

test('missing server or client challenge configuration never silently skips verification', async (t) => {
  const { calls } = services(t, { env: { TURNSTILE_SECRET: '' } });
  let response = await invoke(fixture());
  assert.equal(response.statusCode, 503);
  assert.equal(response.payload.code, 'VERIFICATION_UNAVAILABLE');
  process.env.TURNSTILE_SECRET = 'synthetic-only'; process.env.VITE_TURNSTILE_SITE_KEY = '';
  response = await invoke(fixture());
  assert.equal(response.statusCode, 503);
  assert.equal(calls.emails.length, 0);
  assert.equal(calls.challenges.length, 0);
});

test('verification outage is a recoverable unavailable state and no send', async (t) => {
  const { calls } = services(t, { verify: async () => { throw new Error('Synthetic verification outage'); } });
  const response = await invoke(fixture());
  assert.equal(response.statusCode, 503);
  assert.equal(response.payload.code, 'VERIFICATION_UNAVAILABLE');
  assert.equal(calls.emails.length, 0);
});

test('wrong challenge hostname/action and token bounds stop delivery', async (t) => {
  const { calls } = services(t, { verify: async () => Response.json({ success: true, hostname: 'unapproved.example', action: 'another_form' }) });
  for (const token of ['synthetic', '', 'x'.repeat(2049)]) {
    const response = await invoke(fixture({ turnstileToken: token }));
    assert.equal(response.statusCode, 400);
    assert.equal(response.payload.code, 'VERIFICATION_FAILED');
  }
  assert.equal(calls.challenges.length, 1);
  assert.equal(calls.emails.length, 0);
});

test('deliberate distributed-only mode keeps independent budgets and does not call challenge service', async (t) => {
  const { calls } = services(t, { env: { QUOTE_CHALLENGE_MODE: 'distributed_only', TURNSTILE_SECRET: '', VITE_TURNSTILE_SITE_KEY: '' } });
  assert.equal((await invoke(fixture({ turnstileToken: '' }))).statusCode, 200);
  assert.equal(calls.challenges.length, 0);
  assert.equal(calls.emails.length, 2);
  process.env.UPSTASH_REDIS_REST_URL = '';
  assert.equal((await invoke(fixture())).statusCode, 503);
  assert.equal(calls.emails.length, 2);
});

test('JSON, browser origin, metadata and payload shape are checked before providers', async (t) => {
  const { calls, redis } = services(t);
  for (const [headers, status] of [[{ 'content-type': 'text/plain' }, 415], [{ origin: 'https://foreign.example' }, 403], [{ 'sec-fetch-site': 'cross-site' }, 403]]) assert.equal((await invoke(fixture(), headers)).statusCode, status);
  for (const body of [null, [], 'null']) assert.equal((await invoke(body)).statusCode, 400);
  assert.equal(calls.emails.length, 0);
  assert.equal(calls.challenges.length, 0);
  assert.equal(redis.commands.filter(({ script }) => script.startsWith('-- quote-claim')).length, 0);
});

test('same ID gives a minimal stable receipt and different payload cannot reuse it', async (t) => {
  const { calls, redis } = services(t);
  const body = fixture();
  const first = await invoke(body);
  const duplicate = await invoke({ ...body, turnstileToken: 'fresh-token' });
  assert.deepEqual(duplicate.payload, first.payload);
  assert.deepEqual(Object.keys(duplicate.payload).sort(), ['confirmationSent', 'ok', 'reference']);
  assert.equal(calls.emails.length, 2);
  const conflict = await invoke({ ...body, notes: 'Edited after attempt' });
  assert.equal(conflict.statusCode, 409);
  assert.equal(conflict.payload.code, 'REQUEST_CONFLICT');
  assert.equal(calls.emails.length, 2);
  const stored = redis.get(`quote:receipt:${body.requestId}`).value;
  for (const text of [body.email, body.fullName, body.notes, body.from, body.turnstileToken]) assert.ok(!stored.includes(text));
  assert.ok(redis.commands.every(({ keys }) => keys.every((key) => !key.includes(body.email))));
});

test('concurrent workers cannot dispatch the same request twice', async (t) => {
  let releaseAdvisor; let advisorStarted;
  const started = new Promise((resolve) => { advisorStarted = resolve; });
  const { calls } = services(t, { email: async (_call, count) => {
    if (count === 1) { advisorStarted(); return new Promise((resolve) => { releaseAdvisor = resolve; }); }
    return Response.json({ id: 'synthetic-confirmation' });
  } });
  const body = fixture();
  const first = invoke(body);
  await started;
  const parallel = await invoke({ ...body, turnstileToken: 'fresh-token' });
  assert.equal(parallel.statusCode, 409);
  assert.equal(parallel.payload.code, 'REQUEST_IN_PROGRESS');
  assert.equal(calls.emails.length, 1);
  releaseAdvisor(Response.json({ id: 'synthetic-advisor' }));
  assert.equal((await first).statusCode, 200);
  assert.equal(calls.emails.length, 2);
});

test('unknown provider result reuses identical advisor payload/key and preserves the reference', async (t) => {
  const { calls } = services(t, { email: async (_call, count) => { if (count === 1) throw new Error('Connection lost after possible acceptance'); return Response.json({ id: 'synthetic-reconciled' }); } });
  const body = fixture();
  const unknown = await invoke(body);
  assert.equal(unknown.statusCode, 502);
  assert.equal(unknown.payload.code, 'DELIVERY_UNCONFIRMED');
  assert.equal(unknown.payload.ok, undefined);
  assert.doesNotMatch(unknown.payload.error, /could not be delivered|not sent/i);
  const retry = await invoke({ ...body, turnstileToken: 'fresh-token' });
  assert.equal(retry.statusCode, 200);
  assert.deepEqual(calls.emails[0].body, calls.emails[1].body);
  assert.equal(calls.emails[0].key, calls.emails[1].key);
  assert.notEqual(calls.emails[1].key, calls.emails[2].key);
  assert.ok(retry.payload.reference.includes(body.requestId.toUpperCase()));
});

test('provider 5xx is unconfirmed; explicit 4xx rejection stays retryable', async (t) => {
  const { calls } = services(t, { email: async (_call, count) => Response.json({ name: 'synthetic_error' }, { status: count === 1 ? 500 : 400 }) });
  assert.equal((await invoke(fixture())).payload.code, 'DELIVERY_UNCONFIRMED');
  assert.equal((await invoke(fixture())).payload.code, 'DELIVERY_REJECTED');
  assert.equal(calls.emails.length, 2);
});

test('client confirmation failure never resends the advisor and contains no caller-controlled content', async (t) => {
  const { calls } = services(t, { email: async (_call, count) => Response.json(count === 1 ? { id: 'advisor-accepted' } : { name: 'synthetic_error' }, { status: count === 1 ? 200 : 400 }) });
  const body = fixture({ requestTitle: 'Caller controlled title', notes: 'Untrusted note <script>' });
  const first = await invoke(body); const retry = await invoke(body);
  assert.equal(first.payload.confirmationSent, false);
  assert.deepEqual(first.payload, retry.payload);
  assert.equal(calls.emails.length, 2);
  const confirmation = JSON.stringify(calls.emails[1].body);
  for (const text of [body.notes, body.requestTitle, body.fullName, body.from]) assert.ok(!confirmation.includes(text));
});

test('recipient and global dispatch budgets are distributed and have Retry-After', async (t) => {
  const { calls, redis } = services(t);
  for (let index = 0; index < 4; index += 1) assert.equal((await invoke(fixture(), {}, `192.0.2.${index + 1}`)).statusCode, 200);
  const limited = await invoke(fixture(), {}, '192.0.2.100');
  assert.equal(limited.statusCode, 429);
  assert.equal(limited.payload.code, 'RATE_LIMITED');
  assert.ok(Number(limited.headers['Retry-After']) > 0);
  assert.equal(calls.emails.length, 8);
  redis.entries.set('quote:rl:dispatch', { value: 80, expiresAt: Date.now() + 600_000 });
  const globalLimit = await invoke(fixture({ email: 'other@example.com' }), {}, '192.0.2.101');
  assert.equal(globalLimit.statusCode, 429);
  assert.equal(calls.emails.length, 8);
});

test('atomic count/expiry repairs old immortal counters and resets at the window boundary', async (t) => {
  services(t);
  let now = 1000;
  const redis = new SyntheticRedis({ now: () => now });
  const req = { headers: {}, socket: { remoteAddress: '192.0.2.91' } };
  const first = await checkRateLimit(req, { redis, windowMs: 100, max: 1 });
  assert.equal(first.ok, true);
  const key = redis.commands[0].keys[0];
  assert.equal(redis.get(key).expiresAt, 1100);
  assert.equal((await checkRateLimit(req, { redis, windowMs: 100, max: 1 })).ok, false);
  now = 1100;
  assert.equal((await checkRateLimit(req, { redis, windowMs: 100, max: 1 })).ok, true);
  redis.entries.set(key, { value: 10, expiresAt: null });
  await checkRateLimit(req, { redis, windowMs: 100 });
  assert.equal(redis.get(key).expiresAt, 1200);
  assert.ok(redis.commands.every(({ script }) => script === RATE_SCRIPT));
  assert.match(RATE_SCRIPT, /INCR[\s\S]*PEXPIRE/);
});

test('registry retention is bounded and unknown send cannot replay outside provider key window', async (t) => {
  services(t);
  let now = 1000;
  const redis = new SyntheticRedis({ now: () => now });
  const registry = createRequestRegistry(redis);
  const id = randomUUID(); const fields = fixture();
  const claim = await registry.claim(id, fields, now);
  await registry.update(claim, { advisorState: 'unknown', leaseUntil: 0 });
  now += 60_000;
  const retry = await registry.claim(id, fields, now);
  assert.equal(retry.status, 'claimed');
  assert.equal(retry.record.reference, claim.record.reference);
  assert.equal(redis.get(claim.key).expiresAt, 1000 + RECEIPT_TTL_MS);
  now = 1000 + PROVIDER_RETRY_WINDOW_MS;
  assert.equal((await registry.claim(id, fields, now)).status, 'expired');
  const response = await invoke(fixture({ requestCreatedAt: Date.now() - PROVIDER_RETRY_WINDOW_MS }));
  assert.equal(response.payload.code, 'REQUEST_ID_INVALID');
});

test('client identity persists across retry, rotates on edits and stays out of session drafts', async () => {
  const trip = { ...createInitialTrip(), ...fixture() };
  const identity = createSubmissionIdentity(trip);
  assert.equal(createSubmissionIdentity(structuredClone(trip), identity), identity);
  const edited = createSubmissionIdentity({ ...trip, notes: 'Edited' }, identity);
  assert.notEqual(edited.requestId, identity.requestId);
  const payloads = [];
  const fetchImpl = async (_url, init) => { payloads.push(JSON.parse(init.body)); if (payloads.length === 1) throw new Error('Lost reply'); return Response.json({ ok: true, reference: 'DM-SYNTHETIC', confirmationSent: false }); };
  await assert.rejects(submitTripRequest(trip, { requestIdentity: identity, fetchImpl, today: '2030-01-01' }), { code: 'NETWORK_UNCONFIRMED' });
  await submitTripRequest(trip, { requestIdentity: identity, fetchImpl, today: '2030-01-01' });
  assert.equal(payloads[0].requestId, payloads[1].requestId);
  assert.equal(payloads[0].requestCreatedAt, payloads[1].requestCreatedAt);
  for (const key of ['requestId', 'requestCreatedAt', 'payloadKey']) assert.ok(!(key in safeTripProgress(trip)));
});

test('browser and provider deadlines report uncertainty and retain all inputs', async () => {
  const trip = { ...createInitialTrip(), ...fixture() }; const snapshot = structuredClone(trip);
  await assert.rejects(submitTripRequest(trip, { timeoutMs: 5, today: '2030-01-01', fetchImpl: async () => new Promise(() => {}) }), { code: 'NETWORK_UNCONFIRMED' });
  await assert.rejects(submitTripRequest(trip, { timeoutMs: 5, today: '2030-01-01', fetchImpl: async () => ({ ok: true, json: async () => new Promise(() => {}) }) }), { code: 'NETWORK_UNCONFIRMED' });
  assert.deepEqual(trip, snapshot);
  let signal;
  await assert.rejects(withDeadline((value) => { signal = value; return new Promise(() => {}); }, 5), /provider-timeout/);
  assert.equal(signal.aborted, true);
});
