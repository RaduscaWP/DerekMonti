const STANDARD_SERVICE_VALUE = 'standard';
const GUIDANCE_SERVICE_VALUE = 'guidance_package';
const ACCRUED_MILES_SERVICE_VALUE = 'use_accrued_miles';
const PRIVATE_CODE_NONE = 'None provided';
const PRIVATE_CODE_CONFIRMATION =
  'Private code received. Derek will verify available benefits with your quote.';

const SERVICE_LABELS = {
  [STANDARD_SERVICE_VALUE]: 'Standard Flight Request',
  [GUIDANCE_SERVICE_VALUE]: 'Guidance Package',
  [ACCRUED_MILES_SERVICE_VALUE]: 'Use Your Accrued Miles',
};

const SERVICE_OPTIONS = [
  { value: GUIDANCE_SERVICE_VALUE, label: SERVICE_LABELS[GUIDANCE_SERVICE_VALUE] },
  { value: ACCRUED_MILES_SERVICE_VALUE, label: SERVICE_LABELS[ACCRUED_MILES_SERVICE_VALUE] },
];

function normalizeSelectedService(value) {
  return SERVICE_LABELS[value] ? value : STANDARD_SERVICE_VALUE;
}

function getSelectedServiceLabel(value) {
  return SERVICE_LABELS[normalizeSelectedService(value)];
}

function normalizePromoCode(value) {
  return String(value ?? '').trim().slice(0, 120);
}

function getPrivateCodeLabel(value) {
  const normalized = normalizePromoCode(value);
  return normalized || PRIVATE_CODE_NONE;
}

export {
  ACCRUED_MILES_SERVICE_VALUE,
  GUIDANCE_SERVICE_VALUE,
  PRIVATE_CODE_CONFIRMATION,
  PRIVATE_CODE_NONE,
  SERVICE_OPTIONS,
  STANDARD_SERVICE_VALUE,
  getPrivateCodeLabel,
  getSelectedServiceLabel,
  normalizePromoCode,
  normalizeSelectedService,
};
