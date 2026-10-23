export const TRIP_TYPE_OPTIONS = [
  { value: 'round_trip', label: 'Round trip' },
  { value: 'one_way', label: 'One way' },
  { value: 'multi_city', label: 'Multi-city' },
];

export const CABIN_OPTIONS = [
  { value: 'business', label: 'Business class' },
  { value: 'first', label: 'First class' },
  { value: 'either', label: 'Business or first class' },
];

export const FLEXIBILITY_OPTIONS = [
  { value: 'exact', label: 'Exact dates' },
  { value: 'plus_minus_1', label: '+/- 1 day' },
  { value: 'plus_minus_3', label: '+/- 3 days' },
  { value: 'flexible', label: 'More flexible' },
];

export const CONTACT_PREFERENCE_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone call' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE_ALLOWED_RE = /^[+()\d\s.-]+$/;

const optionValues = (options) => new Set(options.map((option) => option.value));
const TRIP_TYPE_VALUES = optionValues(TRIP_TYPE_OPTIONS);
const CABIN_VALUES = optionValues(CABIN_OPTIONS);
const FLEXIBILITY_VALUES = optionValues(FLEXIBILITY_OPTIONS);
const CONTACT_PREFERENCE_VALUES = optionValues(CONTACT_PREFERENCE_OPTIONS);

const legacyTripTypes = {
  'Round trip': 'round_trip',
  'One way': 'one_way',
  'Multi-city': 'multi_city',
};

const legacyCabins = {
  Business: 'business',
  First: 'first',
  Either: 'either',
};

function optionLabel(options, value, fallback) {
  return options.find((option) => option.value === value)?.label || fallback;
}

export function normalizeTripType(value) {
  const normalized = legacyTripTypes[value] || String(value || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  return TRIP_TYPE_VALUES.has(normalized) ? normalized : 'round_trip';
}

export function normalizeCabin(value) {
  const normalized = legacyCabins[value] || String(value || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  return CABIN_VALUES.has(normalized) ? normalized : 'business';
}

export function normalizeFlexibility(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return FLEXIBILITY_VALUES.has(normalized) ? normalized : 'exact';
}

export function normalizeContactPreference(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return CONTACT_PREFERENCE_VALUES.has(normalized) ? normalized : 'email';
}

export function getTripTypeLabel(value) {
  return optionLabel(TRIP_TYPE_OPTIONS, normalizeTripType(value), 'Round trip');
}

export function getCabinLabel(value) {
  return optionLabel(CABIN_OPTIONS, normalizeCabin(value), 'Business class');
}

export function getFlexibilityLabel(value) {
  return optionLabel(FLEXIBILITY_OPTIONS, normalizeFlexibility(value), 'Exact dates');
}

export function getContactPreferenceLabel(value) {
  return optionLabel(CONTACT_PREFERENCE_OPTIONS, normalizeContactPreference(value), 'Email');
}

export function isValidPhone(value) {
  const trimmed = String(value || '').trim();
  const digits = trimmed.replace(/\D/g, '');
  return !trimmed || (PHONE_ALLOWED_RE.test(trimmed) && digits.length >= 7 && digits.length <= 20);
}

function isValidIsoDate(value) {
  if (!ISO_DATE_RE.test(String(value || ''))) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function localTodayIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validateRouteFields(fields, errors, prefix = '', today = localTodayIso()) {
  const fromKey = `${prefix}from`;
  const toKey = `${prefix}to`;
  const departureKey = `${prefix}departure`;
  const from = String(fields?.from || '').trim();
  const to = String(fields?.to || '').trim();
  const departure = String(fields?.departure || '');

  if (from.length < 2) errors[fromKey] = 'Enter an origin city or airport.';
  if (to.length < 2) errors[toKey] = 'Enter a destination city or airport.';
  if (from && to && from.localeCompare(to, undefined, { sensitivity: 'accent' }) === 0) {
    errors[toKey] = 'Origin and destination must be different.';
  }
  if (!isValidIsoDate(departure)) {
    errors[departureKey] = 'Choose a valid departure date.';
  } else if (departure < today) {
    errors[departureKey] = 'Departure date cannot be in the past.';
  }
}

export function validateQuoteFields(fields, { today = localTodayIso() } = {}) {
  const errors = {};
  const rawTripType = legacyTripTypes[fields?.tripType] || String(fields?.tripType || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  const tripType = normalizeTripType(fields?.tripType);
  const travelers = Number(fields?.travelers);
  const fullName = String(fields?.fullName || '').trim();
  const email = String(fields?.email || '').trim();
  const phone = String(fields?.phone || '').trim();
  const contactPreference = normalizeContactPreference(fields?.contactPreference);

  if (!TRIP_TYPE_VALUES.has(rawTripType)) errors.tripType = 'Choose a valid trip type.';

  if (tripType === 'multi_city') {
    const legs = Array.isArray(fields?.legs) ? fields.legs : [];
    if (legs.length < 2) {
      errors.legs = 'Add at least two flights for a multi-city trip.';
    } else if (legs.length > 6) {
      errors.legs = 'A multi-city request can include up to six flights.';
    }

    legs.slice(0, 6).forEach((leg, index) => {
      validateRouteFields(leg, errors, `legs.${index}.`, today);
      if (
        index > 0 &&
        isValidIsoDate(leg?.departure) &&
        isValidIsoDate(legs[index - 1]?.departure) &&
        leg.departure < legs[index - 1].departure
      ) {
        errors[`legs.${index}.departure`] = 'Flights must be entered in date order.';
      }
    });
  } else {
    validateRouteFields(fields, errors, '', today);
    if (tripType === 'round_trip') {
      if (!isValidIsoDate(fields?.returnDate)) {
        errors.returnDate = 'Choose a valid return date.';
      } else if (isValidIsoDate(fields?.departure) && fields.returnDate < fields.departure) {
        errors.returnDate = 'Return date must be on or after departure.';
      }
    }
  }

  if (!Number.isInteger(travelers) || travelers < 1 || travelers > 10) {
    errors.travelers = 'Choose between 1 and 10 travelers.';
  }
  if (!CABIN_VALUES.has(String(fields?.cabin || ''))) errors.cabin = 'Choose a cabin preference.';
  if (!FLEXIBILITY_VALUES.has(String(fields?.flexibility || ''))) {
    errors.flexibility = 'Choose how flexible your dates are.';
  }
  if (fullName.length < 2) errors.fullName = 'Enter your full name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone or WhatsApp number.';
  if (!CONTACT_PREFERENCE_VALUES.has(String(fields?.contactPreference || ''))) {
    errors.contactPreference = 'Choose a contact preference.';
  } else if (contactPreference !== 'email' && !phone) {
    errors.phone = 'Add a phone number for phone or WhatsApp contact.';
  }
  if (fields?.privacyAcknowledged !== true) {
    errors.privacyAcknowledged = 'Confirm that you have read the Privacy Policy.';
  }

  return errors;
}

export function getItineraryLegs(fields) {
  if (normalizeTripType(fields?.tripType) === 'multi_city') {
    return Array.isArray(fields?.legs) ? fields.legs : [];
  }
  return [
    {
      from: fields?.from || '',
      to: fields?.to || '',
      departure: fields?.departure || '',
    },
  ];
}
