import {
  CABIN_OPTIONS, CONTACT_PREFERENCE_OPTIONS, FLEXIBILITY_OPTIONS, TRIP_TYPE_OPTIONS,
  validateQuoteFields,
} from '../../utils/quoteRequest.js';

export {
  CABIN_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  FLEXIBILITY_OPTIONS,
  TRIP_TYPE_OPTIONS,
  getCabinLabel,
  getContactPreferenceLabel,
  getFlexibilityLabel,
  getTripTypeLabel,
} from '../../utils/quoteRequest.js';

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
  if (['comfort', 'comfortPreference', 'flexibility', 'notes'].includes(name)) return 1;
  if (['fullName', 'email', 'phone', 'contactPreference', 'privacyAcknowledged', 'turnstile'].includes(name)) return 2;
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
    source: 'homepage',
    requestTitle: 'Personal flight review',
  };
  // A preference is included only after an explicit choice. User notes stay intact.
  if (COMFORT_OPTIONS.some(({ value }) => value === trip.comfort)) payload.comfortPreference = trip.comfort;
  return payload;
}

export async function submitTripRequest(trip, {
  turnstileToken = '', companyWebsite = '', formStartedAt = 0,
  fetchImpl = globalThis.fetch, today,
} = {}) {
  const fieldErrors = validateTrip(trip, today ? { today } : {});
  if (Object.keys(fieldErrors).length) {
    throw Object.assign(new Error('Review the highlighted fields.'), { code: 'VALIDATION', fieldErrors });
  }
  const payload = { ...serializeTrip(trip), companyWebsite, formStartedAt, turnstileToken };
  let response;
  try {
    response = await fetchImpl('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw Object.assign(new Error('We could not confirm receipt. Your details are kept. Check your email before trying again, or contact Derek.'), { code: 'NETWORK_UNCONFIRMED' });
  }
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.ok !== true) {
    const serverErrors = data?.fieldErrors && typeof data.fieldErrors === 'object' && !Array.isArray(data.fieldErrors)
      ? Object.fromEntries(Object.entries(data.fieldErrors)
        .filter(([, message]) => typeof message === 'string')
        .map(([name, message]) => [name === 'comfortPreference' ? 'comfort' : name, message]))
      : {};
    throw Object.assign(new Error(typeof data?.error === 'string' && data.error.trim()
      ? data.error
      : 'We could not confirm receipt. Your details are kept. Check your email before trying again, or contact Derek.'), {
      code: typeof data?.code === 'string' ? data.code : 'RESPONSE_UNCONFIRMED',
      fieldErrors: serverErrors,
    });
  }
  if (typeof data.reference !== 'string' || !data.reference.trim()) {
    throw Object.assign(new Error('The service did not return a request reference. Your details are kept. Check your email or contact Derek before trying again.'), { code: 'REFERENCE_MISSING' });
  }
  return { ok: true, reference: data.reference.trim(), confirmationSent: typeof data.confirmationSent === 'boolean' ? data.confirmationSent : null };
}

export const TRIP_PROGRESS_STORAGE_KEY = 'fly-with-derek:homepage-trip-progress:v1';

// The allowlist intentionally excludes contact information, free text and consent.
export function safeTripProgress(trip) {
  return {
    tripType: trip.tripType, from: trip.from, to: trip.to, departure: trip.departure,
    returnDate: trip.returnDate,
    legs: trip.legs.map(({ from, to, departure }) => ({ from, to, departure })),
    travelers: trip.travelers, cabin: trip.cabin, flexibility: trip.flexibility,
    comfort: trip.comfort, contactPreference: trip.contactPreference,
  };
}

export function restoreTripProgress(defaults, stored) {
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return defaults;
  const text = (value, max) => typeof value === 'string' ? value.slice(0, max) : '';
  const option = (value, choices, fallback) => choices.some((choice) => choice.value === value) ? value : fallback;
  const legs = Array.isArray(stored.legs) ? stored.legs.slice(0, MAX_TRIP_LEGS).map((leg) => ({
    from: text(leg?.from, 80), to: text(leg?.to, 80), departure: text(leg?.departure, 10),
  })) : defaults.legs;
  const travelers = Number(stored.travelers);
  return {
    ...defaults,
    tripType: option(stored.tripType, TRIP_TYPE_OPTIONS, defaults.tripType),
    from: text(stored.from, 80), to: text(stored.to, 80),
    departure: text(stored.departure, 10), returnDate: text(stored.returnDate, 10),
    legs: legs.length >= 2 ? legs : defaults.legs,
    travelers: Number.isInteger(travelers) && travelers >= 1 && travelers <= 10 ? String(travelers) : defaults.travelers,
    cabin: option(stored.cabin, CABIN_OPTIONS, defaults.cabin),
    flexibility: option(stored.flexibility, FLEXIBILITY_OPTIONS, defaults.flexibility),
    comfort: option(stored.comfort, COMFORT_OPTIONS, null),
    contactPreference: option(stored.contactPreference, CONTACT_PREFERENCE_OPTIONS, defaults.contactPreference),
  };
}
