import assert from 'node:assert/strict';
import test from 'node:test';
import { renderTicketHtml } from '../api/_emailTemplate.js';
import quoteHandler from '../api/quote.js';
import { validateQuoteFields } from '../src/utils/quoteRequest.js';
import { buildQuoteMessage, getMailto, getWhatsappUrl } from '../src/utils/message.js';

const validRoundTrip = {
  tripType: 'round_trip',
  from: 'New York JFK',
  to: 'London LHR',
  departure: '2030-05-01',
  returnDate: '2030-05-10',
  legs: [],
  travelers: 2,
  cabin: 'business',
  flexibility: 'plus_minus_1',
  fullName: 'Ada Traveler',
  email: 'ada@example.com',
  phone: '',
  contactPreference: 'email',
  notes: '',
  privacyAcknowledged: true,
};

async function invokeQuoteApi(body, method = 'POST', { headers = {}, ip = '127.0.0.1' } = {}) {
  const response = {
    statusCode: 200,
    headers: {},
    payload: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
  await quoteHandler({ method, headers, body, socket: { remoteAddress: ip } }, response);
  return response;
}

// Every network path is replaced before invoking a deliverable request. These
// contract tests can never submit leads or use the developer's email credentials.
function mockQuoteServices(t, { emailStatuses = [], verificationSucceeds = true, production = false } = {}) {
  const overrides = {
    RESEND_API_KEY: 're_test_local_only',
    TURNSTILE_SECRET: 'test_turnstile_secret',
    NODE_ENV: production ? 'production' : 'test',
    UPSTASH_REDIS_REST_URL: '',
    UPSTASH_REDIS_REST_TOKEN: '',
    KV_REST_API_URL: '',
    KV_REST_API_TOKEN: '',
  };
  const previous = Object.fromEntries(Object.keys(overrides).map((key) => [key, process.env[key]]));
  Object.assign(process.env, overrides);
  t.after(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  const calls = { emails: [], challenges: [], unexpected: [] };
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      calls.challenges.push(options.body);
      return Response.json({ success: verificationSucceeds });
    }
    if (url === 'https://api.resend.com/emails') {
      calls.emails.push(JSON.parse(options.body));
      const status = emailStatuses[calls.emails.length - 1] || 200;
      return Response.json(status === 200 ? { id: 'local-test-message' } : { name: 'test_error' }, { status });
    }
    calls.unexpected.push(String(url));
    throw new Error('Unexpected network request blocked by test');
  });
  t.mock.method(console, 'warn', () => {});
  t.mock.method(console, 'error', () => {});
  return calls;
}

const submission = (overrides = {}) => ({
  ...validRoundTrip,
  formStartedAt: Date.now() - 2_000,
  turnstileToken: 'local-test-challenge',
  ...overrides,
});

test('accepts a complete round-trip request', () => {
  assert.deepEqual(validateQuoteFields(validRoundTrip, { today: '2030-01-01' }), {});
});

test('requires a return date and privacy acknowledgement', () => {
  const errors = validateQuoteFields(
    { ...validRoundTrip, returnDate: '', privacyAcknowledged: false },
    { today: '2030-01-01' },
  );
  assert.equal(errors.returnDate, 'Choose a valid return date.');
  assert.equal(errors.privacyAcknowledged, 'Confirm that you have read the Privacy Policy.');
});

test('accepts a two-leg multi-city request', () => {
  const errors = validateQuoteFields(
    {
      ...validRoundTrip,
      tripType: 'multi_city',
      from: '',
      to: '',
      departure: '',
      returnDate: '',
      legs: [
        { from: 'New York', to: 'London', departure: '2030-05-01' },
        { from: 'Paris', to: 'Rome', departure: '2030-05-06' },
      ],
    },
    { today: '2030-01-01' },
  );
  assert.deepEqual(errors, {});
});

test('rejects multi-city legs entered out of date order', () => {
  const errors = validateQuoteFields(
    {
      ...validRoundTrip,
      tripType: 'multi_city',
      legs: [
        { from: 'New York', to: 'London', departure: '2030-05-08' },
        { from: 'Paris', to: 'Rome', departure: '2030-05-06' },
      ],
    },
    { today: '2030-01-01' },
  );
  assert.equal(errors['legs.1.departure'], 'Flights must be entered in date order.');
});

test('requires a phone number only for phone or WhatsApp follow-up', () => {
  const errors = validateQuoteFields(
    { ...validRoundTrip, contactPreference: 'whatsapp', phone: '' },
    { today: '2030-01-01' },
  );
  assert.equal(errors.phone, 'Add a phone number for phone or WhatsApp contact.');
});

test('email template escapes free text and omits removed sales fields and ratings', () => {
  const html = renderTicketHtml(
    { ...validRoundTrip, notes: '<script>alert("x")</script>' },
    { reference: 'DM-TEST', submittedAt: '2030-01-01T00:00:00.000Z' },
  );
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /Guidance Package|Accrued Miles|Private Code|Selected Support|Trustpilot|4\.9\/5/i);
});

test('API returns field-level errors for an incomplete legacy-style payload', async () => {
  const response = await invokeQuoteApi({
    tripType: 'Round trip',
    from: 'New York',
    to: 'London',
    departure: '2030-05-01',
    returnDate: '2030-05-10',
    travelers: 1,
    cabin: 'Business',
    flexibility: 'exact',
    email: 'ada@example.com',
    contactPreference: 'email',
    formStartedAt: Date.now() - 2_000,
  });
  assert.equal(response.statusCode, 400);
  assert.equal(response.payload.fieldErrors.fullName, 'Enter your full name.');
  assert.equal(
    response.payload.fieldErrors.privacyAcknowledged,
    'Confirm that you have read the Privacy Policy.',
  );
});

test('API rejects fractional and mixed-text traveler counts', async () => {
  for (const travelers of ['2.5', '2abc']) {
    const response = await invokeQuoteApi({
      ...validRoundTrip,
      travelers,
      formStartedAt: Date.now() - 2_000,
    });

    assert.equal(response.statusCode, 400);
    assert.equal(response.payload.fieldErrors.travelers, 'Choose between 1 and 10 travelers.');
  }
});

test('API keeps the honeypot response non-revealing and does not attempt delivery', async () => {
  const response = await invokeQuoteApi({ companyWebsite: 'spam.example' });
  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.ok, true);
  assert.match(response.payload.reference, /^DM-/);
});

test('comfort preference is optional, accepts each explicit choice, and rejects unknown values or types', () => {
  for (const comfortPreference of [undefined, null, '', 'rested', 'work', 'together']) {
    assert.deepEqual(validateQuoteFields({ ...validRoundTrip, comfortPreference }, { today: '2030-01-01' }), {});
  }
  for (const comfortPreference of ['luxury', 'Rested', '<script>', ['rested'], {}, true]) {
    assert.equal(
      validateQuoteFields({ ...validRoundTrip, comfortPreference }, { today: '2030-01-01' }).comfortPreference,
      'Choose a valid comfort preference.',
    );
  }
});

test('API delivers each preference separately from unchanged notes and keeps older forms valid', async (t) => {
  const calls = mockQuoteServices(t);
  const notes = 'Aisle seat, please.\nDo not turn <script>alert("x")</script> into markup.';
  for (const [comfortPreference, label] of [
    ['rested', 'Rested'], ['work', 'Ready to work'], ['together', 'Travelling together'], [undefined, null],
  ]) {
    const response = await invokeQuoteApi(submission({ comfortPreference, notes }));
    assert.equal(response.statusCode, 200);
    assert.equal(response.payload.ok, true);
    assert.equal(response.payload.confirmationSent, true);
    assert.match(response.payload.reference, /^DM-/);
    const [advisor, customer] = calls.emails.slice(-2);
    assert.deepEqual(advisor.to, ['Derek@travelbusinessclass.com']);
    assert.deepEqual(customer.to, ['ada@example.com']);
    assert.equal(advisor.reply_to, 'ada@example.com');
    for (const email of [advisor, customer]) {
      assert.ok(email.text.includes(`Notes:\n${notes}\n\nPrivacy acknowledgement`));
      assert.match(email.html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
      assert.doesNotMatch(email.html, /<script>/);
      if (label) {
        assert.ok(email.text.includes(`Comfort preference: ${label}\n`));
        assert.ok(email.html.includes('Comfort preference'));
        assert.ok(email.html.includes(label));
      } else {
        assert.doesNotMatch(email.text + email.html, /Comfort preference/);
      }
    }
  }
  assert.equal(calls.emails.length, 8);
  assert.equal(calls.challenges.length, 4);
  assert.deepEqual(calls.unexpected, []);
});

test('API rejects an unknown comfort preference before verification or delivery', async (t) => {
  const calls = mockQuoteServices(t);
  for (const comfortPreference of ['private_suite', ['rested'], '<img src=x onerror=alert(1)>']) {
    const response = await invokeQuoteApi(submission({ comfortPreference }));
    assert.equal(response.statusCode, 400);
    assert.equal(response.payload.fieldErrors.comfortPreference, 'Choose a valid comfort preference.');
  }
  assert.deepEqual(calls, { emails: [], challenges: [], unexpected: [] });
});

test('fallback links retain explicit comfort preference and original notes', () => {
  const fields = { ...validRoundTrip, comfortPreference: 'work', notes: 'Aisle & window options, please.\nNo overnight connection.' };
  const message = buildQuoteMessage(fields);
  assert.ok(message.includes('Comfort preference: Ready to work'));
  assert.ok(message.endsWith(`Notes: ${fields.notes}`));
  assert.equal(new URL(getWhatsappUrl(fields)).searchParams.get('text'), message);
  assert.equal(new URL(getMailto(fields)).searchParams.get('body'), message);
  assert.doesNotMatch(buildQuoteMessage(validRoundTrip), /Comfort preference/);
});

test('comfort-enabled requests retain timing, honeypot, size, and HTTP method protections', async (t) => {
  const calls = mockQuoteServices(t);
  const tooFast = await invokeQuoteApi(submission({ comfortPreference: 'rested', formStartedAt: Date.now() }));
  assert.equal(tooFast.statusCode, 400);
  assert.equal(tooFast.payload.code, 'FORM_TIMING');
  const expired = await invokeQuoteApi(submission({ comfortPreference: 'work', formStartedAt: Date.now() - 25 * 60 * 60 * 1000 }));
  assert.equal(expired.payload.code, 'FORM_TIMING');
  const honeypot = await invokeQuoteApi(submission({ comfortPreference: 'together', companyWebsite: 'spam.example' }));
  assert.equal(honeypot.payload.ok, true);
  const oversized = await invokeQuoteApi(submission({ comfortPreference: 'work' }), 'POST', { headers: { 'content-length': 13 * 1024 } });
  assert.equal(oversized.statusCode, 413);
  const wrongMethod = await invokeQuoteApi(submission({ comfortPreference: 'work' }), 'GET');
  assert.equal(wrongMethod.statusCode, 405);
  assert.equal(wrongMethod.headers.Allow, 'POST');
  assert.deepEqual(calls, { emails: [], challenges: [], unexpected: [] });
});

test('failed human verification prevents email delivery with a selected comfort preference', async (t) => {
  const calls = mockQuoteServices(t, { verificationSucceeds: false });
  const response = await invokeQuoteApi(submission({ comfortPreference: 'together' }));
  assert.equal(response.statusCode, 400);
  assert.ok(response.payload.fieldErrors.turnstile);
  assert.equal(calls.challenges.length, 1);
  assert.equal(calls.emails.length, 0);
});

test('production rate limit still stops comfort-enabled requests before delivery', async (t) => {
  const calls = mockQuoteServices(t, { production: true });
  const ip = '192.0.2.44';
  globalThis.__derekQuoteRateBuckets.delete(ip);
  t.after(() => globalThis.__derekQuoteRateBuckets.delete(ip));
  for (let index = 0; index < 8; index += 1) {
    const response = await invokeQuoteApi(submission({ comfortPreference: 'rested', companyWebsite: 'spam.example' }), 'POST', { ip });
    assert.equal(response.statusCode, 200);
  }
  const limited = await invokeQuoteApi(submission({ comfortPreference: 'rested' }), 'POST', { ip });
  assert.equal(limited.statusCode, 429);
  assert.deepEqual(calls, { emails: [], challenges: [], unexpected: [] });
});

test('advisor delivery failure remains a retryable failure without claiming submission success', async (t) => {
  const calls = mockQuoteServices(t, { emailStatuses: [500] });
  const response = await invokeQuoteApi(submission({ comfortPreference: 'work' }));
  assert.equal(response.statusCode, 502);
  assert.equal(response.payload.ok, undefined);
  assert.match(response.payload.error, /could not be delivered/);
  assert.equal(calls.emails.length, 1);
});

test('customer confirmation failure preserves advisor delivery success and reports the missing confirmation', async (t) => {
  const calls = mockQuoteServices(t, { emailStatuses: [200, 500] });
  const response = await invokeQuoteApi(submission({ comfortPreference: 'together' }));
  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.ok, true);
  assert.equal(response.payload.confirmationSent, false);
  assert.equal(calls.emails.length, 2);
});

test('Services enums are raw, backward-compatible and reject coercion before delivery', async (t) => {
  const calls = mockQuoteServices(t);
  const invalid = {
    serviceIntent: ['', 'TIME_SENSITIVE', ' time_sensitive', 'time_sensitive ', 'time_sensitive\u0000', ['time_sensitive'], { value: 'time_sensitive' }, 0, false, 'unknown'],
    source: [null, 'Services', ' services', 'services ', 'services\u0000', ['services'], { value: 'services' }, 0, false, 'https://example.com', 'services' + 'x'.repeat(100)],
  };
  for (const [field, values] of Object.entries(invalid)) for (const value of values) {
    const fields = submission({ [field]: value });
    assert.ok(validateQuoteFields(fields, { today: '2030-01-01' })[field]);
    const response = await invokeQuoteApi(fields);
    assert.equal(response.statusCode, 400, `${field}: ${JSON.stringify(value)}`);
    assert.ok(response.payload.fieldErrors[field]);
  }
  assert.deepEqual(calls, { emails: [], challenges: [], unexpected: [] });
});

test('Services selections and valid attribution reach advisor/customer email without changing notes', async (t) => {
  const calls = mockQuoteServices(t);
  const cases = [
    ['single_destination', 'One clear journey'], ['complex_itinerary', 'Several connected stops'],
    ['time_sensitive', 'Departure is close'], ['personal_advisor', 'Personal flight advisor'],
  ];
  for (const [serviceIntent, label] of cases) {
    const notes = 'Keep my notes intact.';
    const response = await invokeQuoteApi(submission({ serviceIntent, source: 'services', notes }));
    assert.equal(response.statusCode, 200);
    assert.equal(response.payload.ok, true);
    assert.ok(response.payload.reference);
    for (const email of calls.emails.slice(-2)) {
      assert.ok(email.text.includes('Source: services'));
      assert.ok(email.text.includes(`Travel situation: ${label}`));
      assert.ok(email.text.includes(`Notes:\n${notes}`));
      assert.ok(email.html.includes(label));
    }
    assert.ok(buildQuoteMessage({ serviceIntent }).includes(label));
  }
  for (const source of [undefined, '', 'homepage', 'services']) {
    const response = await invokeQuoteApi(submission({ source }));
    assert.equal(response.statusCode, 200);
    assert.doesNotMatch(calls.emails.at(-1).text + calls.emails.at(-1).html, /Travel situation/);
  }
  assert.deepEqual(calls.unexpected, []);
});

test('oversized parsed and string Services requests are rejected without trusting Content-Length', async (t) => {
  const calls = mockQuoteServices(t);
  const fields = submission({ serviceIntent: 'time_sensitive', source: 'services', notes: 'x'.repeat(13 * 1024) });
  assert.equal((await invokeQuoteApi(fields)).statusCode, 413);
  assert.equal((await invokeQuoteApi(JSON.stringify(fields))).statusCode, 413);
  assert.deepEqual(calls, { emails: [], challenges: [], unexpected: [] });
});
