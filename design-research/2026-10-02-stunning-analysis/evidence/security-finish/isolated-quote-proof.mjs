import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

// Set synthetic configuration before importing the endpoint: _loadEnv never
// reads the workspace .env. Every outbound fetch is replaced below.
Object.assign(process.env, {
  RESEND_API_KEY: 're_security_local_only',
  MAIL_FROM_ADDRESS: 'Security fixture <sender@example.invalid>',
  NODE_ENV: 'production',
  TURNSTILE_SECRET: '',
  UPSTASH_REDIS_REST_URL: '',
  UPSTASH_REDIS_REST_TOKEN: '',
  KV_REST_API_URL: '',
  KV_REST_API_TOKEN: '',
});

const mode = process.argv[2] || 'endpoint';
const calls = [];
const blockedNetwork = [];
let redisCount = 0;
let expireAttempts = 0;
if (mode === 'redis-expiry') {
  process.env.UPSTASH_REDIS_REST_URL = 'https://security-test-redis.invalid';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'synthetic-token';
}

globalThis.fetch = async (input, options = {}) => {
  const url = String(input);
  if (url === 'https://api.resend.com/emails') {
    const payload = JSON.parse(options.body);
    const headers = Object.fromEntries(new Headers(options.headers));
    calls.push({ payload, headers });
    return Response.json({ id: `mock-message-${calls.length}` });
  }
  if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
    calls.push({ verification: true });
    return Response.json({ success: true, hostname: 'other.example.invalid', action: 'other-surface' });
  }
  if (url.startsWith('https://security-test-redis.invalid')) {
    const body = JSON.parse(options.body);
    const commands = Array.isArray(body[0]) ? body : [body];
    const results = commands.map(command => {
      if (String(command[0]).toLowerCase() === 'incr') return { result: ++redisCount };
      if (String(command[0]).toLowerCase() === 'pexpire') {
        expireAttempts++;
        return { error: 'synthetic expiration failure' };
      }
      throw new Error(`Unexpected mock Redis command: ${command[0]}`);
    });
    return Response.json(Array.isArray(body[0]) ? results : results[0]);
  }
  blockedNetwork.push(url);
  throw new Error('All real network calls are blocked by this proof');
};

const handler = (await import(pathToFileURL(path.resolve('api/quote.js')))).default;
const security = await import(pathToFileURL(path.resolve('api/_security.js')));
const body = {
  tripType: 'round_trip', from: 'New York JFK', to: 'London LHR',
  departure: '2030-05-01', returnDate: '2030-05-10', legs: [],
  travelers: 1, cabin: 'business', flexibility: 'exact',
  fullName: 'Synthetic Traveler', email: 'recipient@example.invalid', phone: '',
  contactPreference: 'email', notes: 'Synthetic review only.',
  privacyAcknowledged: true, source: 'homepage',
  formStartedAt: Date.now() - 2000, companyWebsite: '',
};

async function invoke(payload = body, headers = {}) {
  const response = {
    statusCode: 200, payload: null, headers: {},
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
    setHeader(name, value) { this.headers[name] = value; },
  };
  await handler({ method: 'POST', headers, body: payload, socket: { remoteAddress: '192.0.2.88' } }, response);
  return response;
}

let evidence;
if (mode === 'endpoint') {
  const foreign = await invoke(JSON.stringify(body), { origin: 'https://other.example.invalid', 'content-type': 'text/plain' });
  assert.equal(foreign.statusCode, 200);
  assert.equal(calls.length, 2);
  const repeated = await invoke(body);
  assert.equal(repeated.statusCode, 200);
  assert.equal(calls.length, 4);
  assert.notEqual(foreign.payload.reference, repeated.payload.reference);
  assert.ok(calls.every(call => !call.headers['idempotency-key']));
  const statuses = [foreign.statusCode, repeated.statusCode];
  for (let i = 2; i < 9; i++) statuses.push((await invoke()).statusCode);
  assert.deepEqual(statuses, [...Array(8).fill(200), 429]);
  evidence = {
    mode, syntheticProvidersOnly: true, foreignOriginTextPlainStatus: foreign.statusCode,
    verificationCallsWithoutSecret: calls.filter(call => call.verification).length,
    repeatCreatesNewReference: foreign.payload.reference !== repeated.payload.reference,
    repeatedRequestEmailCount: 4, idempotencyHeadersPresent: false,
    statusesForSameIpWithinOneProcess: statuses, emailCalls: calls.length,
  };
} else if (mode === 'turnstile-binding') {
  process.env.TURNSTILE_SECRET = 'synthetic-secret';
  const result = await security.verifyTurnstile('synthetic-token', { headers: {}, socket: { remoteAddress: '192.0.2.88' } });
  assert.equal(result.ok, true);
  evidence = { mode, syntheticProvidersOnly: true, acceptsSuccessForOtherHostnameAndAction: true, result };
} else if (mode === 'redis-expiry') {
  const req = { headers: {}, socket: { remoteAddress: '192.0.2.88' } };
  const results = [];
  for (let i = 0; i < 4; i++) results.push(await security.checkRateLimit(req, { max: 3, windowMs: 5 }));
  await new Promise(resolve => setTimeout(resolve, 12));
  const afterWindow = await security.checkRateLimit(req, { max: 3, windowMs: 5 });
  assert.deepEqual(results, [true, true, true, false]);
  assert.equal(afterWindow, false);
  assert.equal(expireAttempts, 1);
  evidence = { mode, syntheticProvidersOnly: true, simulatedRedisExpiryFailure: true, results, acceptedAfterWindowElapsed: afterWindow, expireAttempts, redisCount };
} else {
  throw new Error('Unknown proof mode');
}

assert.equal(blockedNetwork.length, 0);
console.log(JSON.stringify({ ...evidence, realNetworkCalls: 0 }, null, 2));
