import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addTripLeg, changeTripType, COMFORT_OPTIONS, createInitialTrip, localTodayIso,
  removeTripLeg, serializeTrip, simulateTripSubmission, validateTrip, validateTripStep,
} from '../src/tripState.js';

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

test('adapter validates before simulated loading; success and recoverable error make no network calls', async () => {
  const originalFetch = globalThis.fetch;
  let networkCalls = 0;
  globalThis.fetch = async () => { networkCalls++; throw new Error('Network is forbidden in this test'); };
  try {
    const trip = validTrip({ comfort: 'work', notes: 'Please retain this.' });
    const snapshot = structuredClone(trip);
    await assert.rejects(simulateTripSubmission({ ...trip, email: '' }, { delayMs: 0, ...dateOptions }), { code: 'VALIDATION' });
    await assert.rejects(simulateTripSubmission(trip, { outcome: 'error', delayMs: 1, ...dateOptions }), { code: 'SIMULATED_FAILURE', delivered: false });
    assert.deepEqual(trip, snapshot);
    const result = await simulateTripSubmission(trip, { delayMs: 1, ...dateOptions });
    assert.equal(result.ok, true);
    assert.equal(result.preview, true);
    assert.equal(result.delivered, false);
    assert.equal(result.payload.comfortPreference, 'work');
    assert.equal(result.payload.notes, trip.notes);
    assert.equal(networkCalls, 0);
    assert.deepEqual(trip, snapshot);
  } finally { globalThis.fetch = originalFetch; }
});

test('adapter snapshots submitted data before awaiting simulated response', async () => {
  const trip = validTrip({ tripType: 'multi_city', legs: [{ from: 'NYC', to: 'LON', departure: '2030-05-01' }, { from: 'LON', to: 'ROM', departure: '2030-05-04' }] });
  const pending = simulateTripSubmission(trip, { delayMs: 2, ...dateOptions });
  trip.legs[0].from = 'Edited later';
  const result = await pending;
  assert.equal(result.payload.legs[0].from, 'NYC');
});

