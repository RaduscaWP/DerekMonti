import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addTripLeg, changeTripType, COMFORT_OPTIONS, createInitialTrip, localTodayIso,
  removeTripLeg, serializeTrip, submitTripRequest, validateTrip, validateTripStep, restoreTripProgress, safeTripProgress, fieldStep,
} from '../src/components/homepage/tripState.js';

const dateOptions = { today: '2030-01-01' };
function validTrip(overrides = {}) {
  return { ...createInitialTrip(), from: 'New York JFK', to: 'London LHR', departure: '2030-05-01', returnDate: '2030-05-10', fullName: 'Alex Example', email: 'alex@example.com', privacyAcknowledged: true, ...overrides };
}

test('new journeys have independent legs and no silently selected comfort priority', () => {
  const first = createInitialTrip();
  const second = createInitialTrip();
  first.legs[0].from = 'Tokyo';
  assert.equal(first.legs[1].from, '');
  assert.equal(second.legs[0].from, '');
  assert.equal(first.comfort, null);
  assert.equal('comfortPreference' in serializeTrip(first), false);
});

test('route step validates only active route fields and ignores unfinished contact', () => {
  const trip = validTrip({ fullName: '', email: '', privacyAcknowledged: false });
  assert.deepEqual(validateTripStep(trip, 0, dateOptions), {});
  assert.deepEqual(validateTripStep(trip, 1, dateOptions), {});
  assert.deepEqual(Object.keys(validateTripStep(trip, 2, dateOptions)), ['fullName', 'email', 'privacyAcknowledged']);
});

test('round-trip date errors preserve route, preferences and contact details', () => {
  const trip = validTrip({ returnDate: '2030-04-30', comfort: 'rested', notes: 'Arrive before lunch.' });
  const snapshot = structuredClone(trip);
  assert.match(validateTripStep(trip, 0, dateOptions).returnDate, /on or after departure/);
  assert.deepEqual(trip, snapshot);
  assert.match(validateTripStep({ ...trip, departure: '2029-12-31' }, 0, dateOptions).departure, /past/);
  assert.match(validateTripStep({ ...trip, departure: '2030-02-30' }, 0, dateOptions).departure, /valid departure/);
});

test('one-way hides and omits return without destroying saved round-trip state', () => {
  const original = validTrip({ comfort: 'work', notes: 'Desk time matters.' });
  const oneWay = changeTripType(original, 'one_way');
  assert.equal(oneWay.returnDate, original.returnDate);
  assert.deepEqual(validateTrip(oneWay, dateOptions), {});
  assert.equal(serializeTrip(oneWay).returnDate, '');
  assert.deepEqual(changeTripType(oneWay, 'round_trip'), original);
});

test('multi-city seeds hero route once, enforces date order, and survives trip-type switches', () => {
  let trip = changeTripType(validTrip({ comfort: 'together' }), 'multi_city');
  assert.deepEqual(trip.legs[0], { from: 'New York JFK', to: 'London LHR', departure: '2030-05-01' });
  trip = { ...trip, legs: [trip.legs[0], { from: 'Paris CDG', to: 'Tokyo HND', departure: '2030-05-06' }] };
  assert.deepEqual(validateTrip(trip, dateOptions), {});
  const roundTrip = changeTripType(trip, 'round_trip');
  assert.equal(roundTrip.from, 'New York JFK');
  assert.deepEqual(changeTripType(roundTrip, 'multi_city'), trip);
  const badOrder = { ...trip, legs: [trip.legs[0], { ...trip.legs[1], departure: '2030-04-30' }] };
  assert.match(validateTripStep(badOrder, 0, dateOptions)['legs.1.departure'], /date order/);
  assert.equal(serializeTrip(trip).from, '');
  assert.equal(serializeTrip(trip).legs.length, 2);
});

test('multi-city add and remove respect two-to-six-leg boundaries without mutating other details', () => {
  let trip = changeTripType(validTrip({ comfort: 'rested' }), 'multi_city');
  assert.equal(removeTripLeg(trip, 0), trip);
  for (let index = 0; index < 7; index++) trip = addTripLeg(trip);
  assert.equal(trip.legs.length, 6);
  assert.equal(addTripLeg(trip), trip);
  const removed = removeTripLeg(trip, 3);
  assert.equal(removed.legs.length, 5);
  assert.equal(removed.email, trip.email);
  assert.equal(removed.comfort, 'rested');
  assert.equal(trip.legs.length, 6);
});

test('all explicit comfort selections serialize once while original notes remain unchanged', () => {
  const original = validTrip({ notes: 'Please consider an earlier arrival.\nWindow preferred.' });
  for (const { value } of COMFORT_OPTIONS) {
    const selected = { ...original, comfort: value };
    assert.deepEqual(validateTrip(selected, dateOptions), {});
    assert.equal(serializeTrip(selected).comfortPreference, value);
    assert.equal(serializeTrip(selected).notes, original.notes);
    assert.deepEqual(serializeTrip(selected), serializeTrip(selected));
  }
  assert.equal('comfortPreference' in serializeTrip({ ...original, comfort: null }), false);
  assert.ok(validateTripStep({ ...original, comfort: 'fake' }, 1, dateOptions).comfort);
});

test('contact contract keeps email required and phone conditional on chosen contact method', () => {
  assert.deepEqual(validateTrip(validTrip(), dateOptions), {});
  for (const contactPreference of ['phone', 'whatsapp']) {
    assert.match(validateTrip(validTrip({ contactPreference }), dateOptions).phone, /Add a phone/);
  }
  assert.ok(validateTrip(validTrip({ travelers: '2.5' }), dateOptions).travelers);
  assert.ok(validateTrip(validTrip({ from: 'London LHR', to: 'london lhr' }), dateOptions).to);
  assert.ok(validateTrip(validTrip({ notes: 'x'.repeat(601) }), dateOptions).notes);
});

test('local today uses local calendar getters, independent of the UTC date', () => {
  const localDay = { getFullYear: () => 2030, getMonth: () => 0, getDate: () => 2, toISOString: () => '2030-01-01T23:00:00.000Z' };
  assert.equal(localTodayIso(localDay), '2030-01-02');
});

const mockResponse = (data, ok = true) => ({ ok, json: async () => data });
const successfulResponse = () => mockResponse({ ok: true, reference: 'DM-TEST123', confirmationSent: true });

test('production request sends the active itinerary, explicit preference and anti-abuse contract exactly once', async () => {
  const trip = validTrip({ comfort: 'work', notes: 'Please retain this note.\nSecond line.' });
  const before = structuredClone(trip);
  const calls = [];
  const result = await submitTripRequest(trip, {
    ...dateOptions, turnstileToken: 'test-token', companyWebsite: '', formStartedAt: 1893456000000,
    fetchImpl: async (...args) => { calls.push(args); return successfulResponse(); },
  });
  assert.equal(calls.length, 1);
  const [url, init] = calls[0];
  assert.equal(url, '/api/quote');
  assert.equal(init.method, 'POST');
  assert.equal(init.headers['Content-Type'], 'application/json');
  const body = JSON.parse(init.body);
  assert.equal(body.turnstileToken, 'test-token');
  assert.equal(body.companyWebsite, '');
  assert.equal(body.formStartedAt, 1893456000000);
  assert.equal(body.source, 'homepage');
  assert.equal(body.comfortPreference, 'work');
  assert.equal(body.notes, trip.notes);
  assert.equal(body.privacyAcknowledged, true);
  assert.equal(body.travelers, 1);
  assert.deepEqual(result, { ok: true, reference: 'DM-TEST123', confirmationSent: true });
  assert.deepEqual(trip, before);
});

test('production adapter never sends invalid contact or dates and does not fabricate success', async () => {
  let calls = 0;
  const fetchImpl = async () => { calls++; return successfulResponse(); };
  for (const overrides of [{ email: '' }, { departure: '2030-02-30' }, { privacyAcknowledged: false }, { comfort: 'unknown' }]) {
    await assert.rejects(submitTripRequest(validTrip(overrides), { ...dateOptions, fetchImpl }), { code: 'VALIDATION' });
  }
  assert.equal(calls, 0);
});

test('HTTP success, explicit API confirmation and a real reference are all required', async () => {
  const cases = [
    { response: mockResponse({ ok: true, reference: 'DM-TEST123' }, false), code: 'RESPONSE_UNCONFIRMED' },
    { response: mockResponse({ ok: false, reference: 'DM-TEST123' }), code: 'RESPONSE_UNCONFIRMED' },
    { response: mockResponse({ reference: 'DM-TEST123' }), code: 'RESPONSE_UNCONFIRMED' },
    { response: mockResponse({ ok: true }), code: 'REFERENCE_MISSING' },
    { response: mockResponse({ ok: true, reference: '  ' }), code: 'REFERENCE_MISSING' },
    { response: mockResponse({ ok: true, reference: 42 }), code: 'REFERENCE_MISSING' },
    { response: { ok: true, json: async () => { throw new SyntaxError('Not JSON'); } }, code: 'RESPONSE_UNCONFIRMED' },
    { response: mockResponse(null), code: 'RESPONSE_UNCONFIRMED' },
  ];
  for (const { response, code } of cases) {
    await assert.rejects(submitTripRequest(validTrip(), { ...dateOptions, fetchImpl: async () => response }), { code });
  }
});

test('network uncertainty retains submitted fields and never claims that a request was not sent', async () => {
  const trip = validTrip({ comfort: 'together', notes: 'Keep my original details.' });
  const before = structuredClone(trip);
  await assert.rejects(submitTripRequest(trip, {
    ...dateOptions, fetchImpl: async () => { throw new Error('Connection lost after sending'); },
  }), (error) => {
    assert.equal(error.code, 'NETWORK_UNCONFIRMED');
    assert.match(error.message, /could not confirm receipt/i);
    assert.doesNotMatch(error.message, /no request|not sent/i);
    return true;
  });
  assert.deepEqual(trip, before);
});

test('server field errors and timing code survive for recovery and priority focus goes to preferences', async () => {
  await assert.rejects(submitTripRequest(validTrip(), {
    ...dateOptions,
    fetchImpl: async () => mockResponse({
      ok: false, code: 'FORM_TIMING', error: 'Please review your details and submit again.',
      fieldErrors: { comfortPreference: 'Choose a listed priority.', email: 'Review this email.', ignored: { unsafe: 'object' } },
    }, false),
  }), (error) => {
    assert.equal(error.code, 'FORM_TIMING');
    assert.equal(error.message, 'Please review your details and submit again.');
    assert.deepEqual(error.fieldErrors, { comfort: 'Choose a listed priority.', email: 'Review this email.' });
    assert.equal(fieldStep('comfort'), 1);
    assert.equal(fieldStep('turnstile'), 2);
    return true;
  });
});

test('a confirmed advisor request stays successful when the confirmation email fails', async () => {
  const result = await submitTripRequest(validTrip(), {
    ...dateOptions, fetchImpl: async () => mockResponse({ ok: true, reference: 'DM-TEST456', confirmationSent: false }),
  });
  assert.deepEqual(result, { ok: true, reference: 'DM-TEST456', confirmationSent: false });
  const unknown = await submitTripRequest(validTrip(), {
    ...dateOptions, fetchImpl: async () => mockResponse({ ok: true, reference: 'DM-TEST789' }),
  });
  assert.equal(unknown.confirmationSent, null);
});

test('the submitted request is immutable while later edits are made to multi-city fields', async () => {
  const trip = validTrip({ tripType: 'multi_city', legs: [
    { from: 'NYC', to: 'LON', departure: '2030-05-01' },
    { from: 'LON', to: 'ROM', departure: '2030-05-04' },
  ] });
  let body;
  let resolveResponse;
  const pending = submitTripRequest(trip, {
    ...dateOptions,
    fetchImpl: async (_url, init) => { body = init.body; return new Promise((resolve) => { resolveResponse = resolve; }); },
  });
  trip.legs[0].from = 'Changed after send';
  trip.email = 'new@example.com';
  resolveResponse(successfulResponse());
  await pending;
  const actual = JSON.parse(body);
  assert.equal(actual.legs[0].from, 'NYC');
  assert.equal(actual.email, 'alex@example.com');
  assert.equal('comfortPreference' in actual, false);
});

test('session progress stores only bounded route and preferences, never contact, notes or consent', () => {
  const trip = validTrip({ comfort: 'rested', notes: 'Private request.', phone: '+1 212 555 1234' });
  trip.legs[0].privateValue = 'must not leak';
  const stored = safeTripProgress(trip);
  for (const key of ['fullName', 'email', 'phone', 'notes', 'privacyAcknowledged', 'companyWebsite', 'formStartedAt', 'turnstileToken']) {
    assert.equal(key in stored, false, key);
  }
  assert.equal('privateValue' in stored.legs[0], false);
  const restored = restoreTripProgress(createInitialTrip(), {
    ...stored, fullName: 'Injected contact', email: 'injected@example.com', phone: '+1234567890', notes: 'Injected note', privacyAcknowledged: true,
  });
  assert.equal(restored.from, trip.from);
  assert.equal(restored.comfort, 'rested');
  assert.equal(restored.email, '');
  assert.equal(restored.fullName, '');
  assert.equal(restored.phone, '');
  assert.equal(restored.notes, '');
  assert.equal(restored.privacyAcknowledged, false);
});

test('malformed session data cannot introduce unsupported options or oversized itineraries', () => {
  const defaults = createInitialTrip();
  for (const invalid of [null, [], 'text', 42]) assert.equal(restoreTripProgress(defaults, invalid), defaults);
  const restored = restoreTripProgress(defaults, {
    tripType: 'invalid', travelers: '2.5', cabin: 'invalid', flexibility: 'invalid', comfort: 'invalid', contactPreference: 'invalid',
    from: 'A'.repeat(100), to: {}, departure: 'X'.repeat(20),
    legs: Array.from({ length: 10 }, () => ({ from: 'B'.repeat(100), to: 'CDG', departure: '2030-05-01', email: 'hidden' })),
  });
  assert.equal(restored.tripType, 'round_trip');
  assert.equal(restored.travelers, '1');
  assert.equal(restored.cabin, 'business');
  assert.equal(restored.flexibility, 'exact');
  assert.equal(restored.comfort, null);
  assert.equal(restored.contactPreference, 'email');
  assert.equal(restored.from.length, 80);
  assert.equal(restored.to, '');
  assert.equal(restored.departure.length, 10);
  assert.equal(restored.legs.length, 6);
  assert.equal(restored.legs[0].from.length, 80);
  assert.equal('email' in restored.legs[0], false);
});

test('Services intent defaults remain absent and explicit selections never change unrelated fields', () => {
  const trip = validTrip({ notes: 'Keep my words.', comfort: 'rested' });
  assert.equal(trip.serviceIntent, null);
  assert.equal(trip.source, null);
  assert.equal('serviceIntent' in serializeTrip(trip), false);
  assert.equal('serviceIntent' in safeTripProgress(trip), false);
  for (const serviceIntent of ['single_destination', 'complex_itinerary', 'time_sensitive', 'personal_advisor']) {
    const selected = { ...trip, serviceIntent, source: 'services' };
    assert.deepEqual(validateTrip(selected, dateOptions), {});
    assert.equal(serializeTrip(selected).serviceIntent, serviceIntent);
    assert.equal(serializeTrip(selected).source, 'services');
    assert.equal(safeTripProgress(selected).serviceIntent, serviceIntent);
    assert.equal(restoreTripProgress(createInitialTrip(), safeTripProgress(selected)).source, 'services');
    assert.deepEqual({ ...selected, serviceIntent: null, source: null }, trip);
  }
});

test('restoration fills untouched safe fields but preserves explicit choices and all in-memory PII', async () => {
  const { mergeRestoredTrip } = await import('../src/components/homepage/tripState.js');
  const stored = { ...safeTripProgress(validTrip({ serviceIntent: 'complex_itinerary', source: 'homepage' })), fullName: 'Injected', email: 'injected@example.com', notes: 'Injected', privacyAcknowledged: true };
  const current = { ...createInitialTrip(), serviceIntent: 'time_sensitive', source: 'services', fullName: 'Current visitor', from: 'Tokyo HND' };
  const merged = mergeRestoredTrip(current, stored, new Set(['serviceIntent', 'source', 'from']));
  assert.equal(merged.serviceIntent, 'time_sensitive');
  assert.equal(merged.source, 'services');
  assert.equal(merged.from, 'Tokyo HND');
  assert.equal(merged.to, 'London LHR');
  assert.equal(merged.fullName, 'Current visitor');
  assert.equal(merged.email, '');
  assert.equal(merged.notes, '');
  assert.equal(merged.privacyAcknowledged, false);
  const cleared = mergeRestoredTrip({ ...current, serviceIntent: null }, stored, new Set(['serviceIntent']));
  assert.equal(cleared.serviceIntent, null);
  assert.deepEqual(mergeRestoredTrip(current, null), current);
});

test('Services attribution and intent survive validation failure, recoverable failure and retry', async () => {
  const trip = validTrip({ serviceIntent: 'time_sensitive', source: 'services' });
  const snapshot = structuredClone(trip);
  const requests = [];
  const fetchImpl = async (_url, options) => {
    requests.push(JSON.parse(options.body));
    return requests.length === 1 ? Response.json({ error: 'Service unavailable' }, { status: 503 }) : Response.json({ ok: true, reference: 'LOCAL-ONLY' });
  };
  await assert.rejects(submitTripRequest({ ...trip, email: '' }, { fetchImpl, today: dateOptions.today }), { code: 'VALIDATION' });
  assert.equal(requests.length, 0);
  await assert.rejects(submitTripRequest(trip, { fetchImpl, today: dateOptions.today }), /Service unavailable/);
  assert.deepEqual(trip, snapshot);
  const result = await submitTripRequest(trip, { fetchImpl, today: dateOptions.today });
  assert.equal(result.reference, 'LOCAL-ONLY');
  assert.deepEqual(requests[0], requests[1]);
  assert.equal(requests[1].source, 'services');
  assert.equal(requests[1].serviceIntent, 'time_sensitive');
});
