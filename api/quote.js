// SECURITY: RESEND_API_KEY is server-only. Never expose it to the client.
// Use .env for local development and Vercel Sensitive Environment Variables in production.

import { ensureEnv } from './_loadEnv.js';
import { renderTicketHtml, generateReference } from './_emailTemplate.js';
import { checkRateLimit, checkRequestContext, getRedis, isPublicDeployment, verifyTurnstile } from './_security.js';
import { createRequestRegistry, PROVIDER_RETRY_WINDOW_MS, VALID_REQUEST_ID } from './_requestRegistry.js';
import { confirmationEmail, sendEmail } from './_sendEmail.js';
import {
  CABIN_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  FLEXIBILITY_OPTIONS,
  TRIP_TYPE_OPTIONS,
  getCabinLabel,
  getComfortPreferenceLabel,
  getServiceIntentLabel,
  getContactPreferenceLabel,
  getFlexibilityLabel,
  getItineraryLegs,
  getTripTypeLabel,
  normalizeCabin,
  normalizeContactPreference,
  normalizeFlexibility,
  normalizeTripType,
  validateQuoteFields,
} from '../src/utils/quoteRequest.js';

const DEREK_EMAIL = 'Derek@travelbusinessclass.com';
const MAX_BODY_BYTES = 12 * 1024;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const MIN_FORM_AGE_MS = 800;

function cleanText(value, max, { multiline = false } = {}) {
  let text = String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');

  text = multiline
    ? text.replace(/[^\S\n]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
    : text.replace(/\s+/g, ' ').trim();

  return text.slice(0, max);
}

function normalizeLegs(rawLegs) {
  if (!Array.isArray(rawLegs)) return [];
  return rawLegs.slice(0, 6).map((leg) => ({
    from: cleanText(leg?.from, 80),
    to: cleanText(leg?.to, 80),
    departure: cleanText(leg?.departure, 10),
  }));
}

function normalizeStrictOption(value, options, normalizer, legacyValues = []) {
  const cleaned = cleanText(value, 32);
  const isKnown = options.some((option) => option.value === cleaned) || legacyValues.includes(cleaned);
  return isKnown ? normalizer(cleaned) : cleaned;
}

function normalizeFields(raw) {
  const travelers = Number(String(raw.travelers ?? ''));
  const formStartedAt = Number(raw.formStartedAt);

  return {
    tripType: normalizeStrictOption(
      raw.tripType,
      TRIP_TYPE_OPTIONS,
      normalizeTripType,
      ['Round trip', 'One way', 'Multi-city'],
    ),
    from: cleanText(raw.from, 80),
    to: cleanText(raw.to, 80),
    departure: cleanText(raw.departure, 10),
    returnDate: cleanText(raw.returnDate, 10),
    legs: normalizeLegs(raw.legs),
    travelers: Number.isFinite(travelers) ? travelers : 0,
    cabin: normalizeStrictOption(raw.cabin, CABIN_OPTIONS, normalizeCabin, ['Business', 'First', 'Either']),
    flexibility: normalizeStrictOption(raw.flexibility, FLEXIBILITY_OPTIONS, normalizeFlexibility),
    comfortPreference: raw.comfortPreference ?? '',
    serviceIntent: raw.serviceIntent ?? null,
    fullName: cleanText(raw.fullName, 80),
    email: cleanText(raw.email, 120).toLowerCase(),
    phone: cleanText(raw.phone, 40),
    contactPreference: normalizeStrictOption(
      raw.contactPreference,
      CONTACT_PREFERENCE_OPTIONS,
      normalizeContactPreference,
    ),
    notes: cleanText(raw.notes, 600, { multiline: true }),
    privacyAcknowledged: raw.privacyAcknowledged === true,
    source: raw.source === undefined ? '' : raw.source,
    requestTitle: cleanText(raw.requestTitle, 120) || 'Premium Flight Review Request',
    companyWebsite: cleanText(raw.companyWebsite || raw.website || raw.url, 120),
    formStartedAt: Number.isFinite(formStartedAt) ? formStartedAt : 0,
  };
}

function formTimingIsValid(formStartedAt) {
  if (!Number.isFinite(formStartedAt) || formStartedAt <= 0) return false;
  const age = Date.now() - formStartedAt;
  return age >= MIN_FORM_AGE_MS && age <= MAX_FORM_AGE_MS;
}

function routeSummary(fields) {
  const legs = getItineraryLegs(fields);
  const first = legs[0];
  const last = legs[legs.length - 1];
  return {
    from: first?.from || fields.from || 'Not provided',
    to: last?.to || fields.to || 'Not provided',
  };
}

function buildPlainSummary(fields, meta) {
  const lines = [
    `${fields.requestTitle} - ${meta.reference}`,
    `Submitted: ${meta.submittedAt}`,
    fields.source ? `Source: ${fields.source}` : null,
    '',
    `Trip type: ${getTripTypeLabel(fields.tripType)}`,
  ];

  if (fields.tripType === 'multi_city') {
    lines.push('Itinerary:');
    fields.legs.forEach((leg, index) => {
      lines.push(`  Flight ${index + 1}: ${leg.from} -> ${leg.to} on ${leg.departure}`);
    });
  } else {
    lines.push(
      `From: ${fields.from}`,
      `To: ${fields.to}`,
      `Departure: ${fields.departure}`,
      `Return: ${fields.tripType === 'one_way' ? 'Not applicable' : fields.returnDate}`,
    );
  }

  lines.push(
    `Travelers: ${fields.travelers}`,
    `Cabin: ${getCabinLabel(fields.cabin)}`,
    `Date flexibility: ${getFlexibilityLabel(fields.flexibility)}`,
    fields.comfortPreference ? `Comfort preference: ${getComfortPreferenceLabel(fields.comfortPreference)}` : null,
    fields.serviceIntent ? `Travel situation: ${getServiceIntentLabel(fields.serviceIntent)}` : null,
    '',
    `Name: ${fields.fullName}`,
    `Email: ${fields.email}`,
    fields.phone ? `Phone or WhatsApp: ${fields.phone}` : null,
    `Preferred contact: ${getContactPreferenceLabel(fields.contactPreference)}`,
    fields.notes ? '' : null,
    fields.notes ? `Notes:\n${fields.notes}` : null,
    '',
    'Privacy acknowledgement: confirmed',
  );

  return lines.filter((line) => line !== null).join('\n');
}

async function readJsonBody(req) {
  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    const error = new Error('Payload too large');
    error.statusCode = 413;
    throw error;
  }

  if (req.body && typeof req.body === 'object') {
    if (Buffer.byteLength(JSON.stringify(req.body), 'utf8') > MAX_BODY_BYTES) {
      throw Object.assign(new Error('Payload too large'), { statusCode: 413 });
    }
    return req.body;
  }

  if (typeof req.body === 'string') {
    if (Buffer.byteLength(req.body, 'utf8') > MAX_BODY_BYTES) {
      const error = new Error('Payload too large');
      error.statusCode = 413;
      throw error;
    }
    return req.body ? JSON.parse(req.body) : {};
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    let size = 0;
    let rejected = false;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES && !rejected) {
        rejected = true;
        const error = new Error('Payload too large');
        error.statusCode = 413;
        reject(error);
        return;
      }
      if (!rejected) raw += chunk;
    });

    req.on('end', () => {
      if (rejected) return;
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        error.statusCode = 400;
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const context = checkRequestContext(req);
  if (!context.ok) return res.status(context.status).json({ error: 'This request could not be accepted. Submit the form from this website.', code: context.code });

  const unavailable = (code = 'INTAKE_UNAVAILABLE') => {
    res.setHeader('Retry-After', '60');
    return res.status(503).json({ error: 'Automatic requests are temporarily unavailable. Your entries are kept. Try again later or contact Derek directly.', code, retryAfter: 60 });
  };
  const limited = (retryAfter) => {
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Please wait before trying again. Your entries are kept; you can contact Derek directly.', code: 'RATE_LIMITED', retryAfter });
  };
  const redis = getRedis();
  if (isPublicDeployment()) {
    const admission = await checkRateLimit(req, { redis });
    if (!admission.available) return unavailable();
    if (!admission.ok) return limited(admission.retryAfter);
  }

  let rawFields;
  try {
    rawFields = await readJsonBody(req);
  } catch (error) {
    const status = error.statusCode === 413 ? 413 : 400;
    return res.status(status).json({ error: status === 413 ? 'Request is too large.' : 'Invalid request payload.' });
  }

  if (!rawFields || typeof rawFields !== 'object' || Array.isArray(rawFields)) return res.status(400).json({ error: 'Invalid request payload.', code: 'INVALID_PAYLOAD' });
  const fields = normalizeFields(rawFields);

  if (fields.companyWebsite) {
    return res.status(200).json({ ok: true, reference: generateReference() });
  }

  if (!formTimingIsValid(fields.formStartedAt)) {
    return res.status(400).json({
      error: 'Please wait a moment, then review and submit the form again.',
      code: 'FORM_TIMING',
    });
  }

  // A visitor's local calendar date can trail the server's UTC date by one day.
  // The browser enforces the visitor-local minimum; this grace avoids rejecting a
  // legitimate same-day request at the international date boundary.
  const earliestAcceptedDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const fieldErrors = validateQuoteFields(fields, { today: earliestAcceptedDate });
  if (Object.keys(fieldErrors).length) {
    return res.status(400).json({ error: 'Review the highlighted fields.', fieldErrors });
  }

  const requestId = rawFields.requestId;
  const requestCreatedAt = Number(rawFields.requestCreatedAt);
  const requestAge = Date.now() - requestCreatedAt;
  if (typeof requestId !== 'string' || !VALID_REQUEST_ID.test(requestId) || !Number.isFinite(requestCreatedAt) || requestAge < -60_000 || requestAge >= PROVIDER_RETRY_WINDOW_MS) {
    return res.status(400).json({ error: 'This request attempt cannot be retried safely. Your entries are kept. Contact Derek directly about the earlier attempt.', code: 'REQUEST_ID_INVALID' });
  }

  const turnstileResult = await verifyTurnstile(rawFields?.turnstileToken, req);
  if (!turnstileResult.ok) {
    if (turnstileResult.unavailable) return unavailable('VERIFICATION_UNAVAILABLE');
    return res.status(400).json({
      error: 'Human verification could not be completed. Retry the verification or contact Derek directly.',
      code: 'VERIFICATION_FAILED',
      fieldErrors: { turnstile: 'Complete the human-verification challenge again.' },
    });
  }

  ensureEnv();
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return unavailable();
  }

  const registry = createRequestRegistry(redis);
  let claim;
  try { claim = await registry.claim(requestId.toLowerCase(), fields); }
  catch { return unavailable(); }
  if (claim.status === 'conflict') return res.status(409).json({ error: 'This request identity was already used with different details. Your entries are kept. Contact Derek about the earlier attempt.', code: 'REQUEST_CONFLICT' });
  if (claim.status === 'expired') return res.status(409).json({ error: 'Receipt of the earlier request is still unconfirmed and its safe retry window has ended. Contact Derek directly; your entries are kept.', code: 'RETRY_WINDOW_EXPIRED' });
  if (claim.status === 'busy') {
    res.setHeader('Retry-After', '60');
    return res.status(409).json({ error: 'The earlier attempt is still being processed. Keep this page open and retry in a minute, or contact Derek directly.', code: 'REQUEST_IN_PROGRESS', retryAfter: 60 });
  }
  const receipt = (confirmationSent) => res.status(200).json({ ok: true, reference: claim.record.reference, confirmationSent });
  if (claim.status === 'received') return receipt(claim.record.confirmationSent === true);

  const release = async (changes) => { try { await registry.update(claim, { ...changes, leaseUntil: 0 }); } catch { /* Keep the claim until its bounded lease expires. */ } };
  if (isPublicDeployment()) {
    const budget = await checkRateLimit(req, { redis, recipient: fields.email });
    if (!budget.available || !budget.ok) {
      await release({});
      return budget.available ? limited(budget.retryAfter) : unavailable();
    }
  }
  const meta = claim.record;
  const from = process.env.MAIL_FROM_ADDRESS || 'Derek Monti <onboarding@resend.dev>';
  const html = renderTicketHtml(fields, meta);
  const plain = buildPlainSummary(fields, meta);
  const route = routeSummary(fields);

  const derekResult = await sendEmail({
      from,
      to: [DEREK_EMAIL],
      reply_to: fields.email,
      subject: `[NEW QUOTE] ${meta.reference} - ${route.from} to ${route.to}`,
      html,
      text: plain,
    }, `quote-advisor/${requestId.toLowerCase()}`);
  if (derekResult.outcome !== 'accepted') {
    await release({ advisorState: derekResult.outcome });
    return res.status(502).json({
      error: derekResult.outcome === 'unknown'
        ? 'Receipt could not be confirmed. Your entries are kept. Retry this same request later or contact Derek about the earlier attempt.'
        : 'The email service declined the request. Your entries are kept. Try again later or contact Derek directly.',
      code: derekResult.outcome === 'unknown' ? 'DELIVERY_UNCONFIRMED' : 'DELIVERY_REJECTED',
    });
  }
  // Persist acceptance before a second side effect. Receipt means provider acceptance,
  // not delivery into an inbox. No retry of this receipt resends the advisor message.
  try {
    await registry.update(claim, { advisorState: 'accepted' });
  } catch { return receipt(false); }
  const customerResult = await sendEmail(confirmationEmail(meta.reference, from, DEREK_EMAIL, fields.email), `quote-confirmation/${requestId.toLowerCase()}`);
  const confirmationSent = customerResult.outcome === 'accepted';
  await release({ advisorState: 'accepted', confirmationSent });
  return receipt(confirmationSent);
}
