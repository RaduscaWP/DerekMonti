import { validateQuoteFields } from '../../../src/utils/quoteRequest.js';

export {
  CABIN_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  FLEXIBILITY_OPTIONS,
  TRIP_TYPE_OPTIONS,
  getCabinLabel,
  getContactPreferenceLabel,
  getFlexibilityLabel,
  getTripTypeLabel,
} from '../../../src/utils/quoteRequest.js';

export const MAX_TRIP_LEGS = 6;
export const COMFORT_OPTIONS = [
  { value: 'rested', label: 'Rested', description: 'Rest and a considered arrival time matter most.' },
  { value: 'work', label: 'Ready to work', description: 'A usable work environment matters.' },
  { value: 'together', label: 'Travelling together', description: 'Seating proximity and shared-travel needs matter.' },
];

const createLeg = () => ({ from: '', to: '', departure: '' });

export function createInitialTrip() {
  return {
    tripType: 'round_trip',
    from: '',
    to: '',
    departure: '',
    returnDate: '',
    legs: [createLeg(), createLeg()],
    travelers: '1',
    cabin: 'business',
    flexibility: 'exact',
    comfort: null,
    fullName: '',
    email: '',
    phone: '',
    contactPreference: 'email',
    notes: '',
    privacyAcknowledged: false,
  };
}

// Calendar dates follow the traveler's local day, including near UTC midnight.
export function localTodayIso(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function changeTripType(trip, tripType) {
  if (!['round_trip', 'one_way', 'multi_city'].includes(tripType)) return trip;
  const next = { ...trip, tripType };
  // Seed the first multi-city flight only once; never overwrite a saved itinerary.
  if (tripType === 'multi_city' && trip.legs.every((leg) => !leg.from && !leg.to && !leg.departure)) {
    next.legs = [
      { from: trip.from, to: trip.to, departure: trip.departure },
      { from: trip.to, to: '', departure: '' },
    ];
  }
  return next;
}

export function addTripLeg(trip) {
  if (trip.legs.length >= MAX_TRIP_LEGS) return trip;
  return { ...trip, legs: [...trip.legs, { ...createLeg(), from: trip.legs.at(-1)?.to || '' }] };
}

export function removeTripLeg(trip, index) {
  if (trip.legs.length <= 2 || index < 0 || index >= trip.legs.length) return trip;
  return { ...trip, legs: trip.legs.filter((_, legIndex) => legIndex !== index) };
}

export function fieldStep(name) {
  if (['comfort', 'flexibility', 'notes'].includes(name)) return 1;
  if (['fullName', 'email', 'phone', 'contactPreference', 'privacyAcknowledged'].includes(name)) return 2;
  return 0;
}

export function validateTrip(trip, options = {}) {
  const errors = validateQuoteFields(trip, options);
  if (trip.comfort !== null && !COMFORT_OPTIONS.some(({ value }) => value === trip.comfort)) {
    errors.comfort = 'Choose a listed priority, or leave this optional preference unselected.';
  }
  if (String(trip.notes || '').length > 600) errors.notes = 'Keep your notes to 600 characters or fewer.';
  return errors;
}

export function validateTripStep(trip, step, options = {}) {
  return Object.fromEntries(Object.entries(validateTrip(trip, options)).filter(([name]) => fieldStep(name) === step));
}

export function serializeTrip(trip) {
  const text = (value) => String(value || '').trim();
  const multiCity = trip.tripType === 'multi_city';
  const payload = {
    tripType: trip.tripType,
    from: multiCity ? '' : text(trip.from),
    to: multiCity ? '' : text(trip.to),
    departure: multiCity ? '' : trip.departure,
    returnDate: trip.tripType === 'round_trip' ? trip.returnDate : '',
    legs: multiCity ? trip.legs.map((leg) => ({ from: text(leg.from), to: text(leg.to), departure: leg.departure })) : [],
    travelers: Number(trip.travelers),
    cabin: trip.cabin,
    flexibility: trip.flexibility,
    fullName: text(trip.fullName),
    email: text(trip.email).toLowerCase(),
    phone: text(trip.phone),
    contactPreference: trip.contactPreference,
    notes: trip.notes,
    privacyAcknowledged: trip.privacyAcknowledged === true,
    source: 'homepage-prototype',
    requestTitle: 'Personal flight review',
  };
  // Explicit extension for later API integration. User notes remain untouched.
  if (COMFORT_OPTIONS.some(({ value }) => value === trip.comfort)) payload.comfortPreference = trip.comfort;
  return payload;
}

// Deliberately local: no endpoint, delivery SDK, analytics, storage or network calls.
// The later production adapter must separately implement the existing anti-abuse
// contract and support comfortPreference in validation and email rendering.
export async function simulateTripSubmission(trip, { outcome = 'success', delayMs = 650, today } = {}) {
  const fieldErrors = validateTrip(trip, today ? { today } : {});
  if (Object.keys(fieldErrors).length) {
    throw Object.assign(new Error('Review the highlighted fields.'), { code: 'VALIDATION', fieldErrors });
  }
  const payload = serializeTrip(trip);
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  if (outcome === 'error') {
    throw Object.assign(new Error('This is a simulated interruption. Your details are still here. Try again when you are ready.'), {
      code: 'SIMULATED_FAILURE',
      preview: true,
      delivered: false,
    });
  }
  return { ok: true, preview: true, delivered: false, reference: 'PREVIEW', payload };
}
