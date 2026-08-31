import assert from 'node:assert/strict';
import test from 'node:test';
import { renderTicketHtml } from '../api/_emailTemplate.js';
import quoteHandler from '../api/quote.js';
import { validateQuoteFields } from '../src/utils/quoteRequest.js';

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

async function invokeQuoteApi(body, method = 'POST') {
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
  await quoteHandler({ method, headers: {}, body, socket: { remoteAddress: '127.0.0.1' } }, response);
  return response;
}

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
