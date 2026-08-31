// SECURITY: RESEND_API_KEY is server-only. Never expose it to the client.
// Use .env for local development and Vercel Sensitive Environment Variables in production.

import { Resend } from 'resend';
import { ensureEnv } from './_loadEnv.js';
import { renderTicketHtml, renderTicketSubject, generateReference, todayFormatted } from './_emailTemplate.js';
import { checkRateLimit, verifyTurnstile } from './_security.js';
import {
  CABIN_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  FLEXIBILITY_OPTIONS,
  TRIP_TYPE_OPTIONS,
  getCabinLabel,
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
const FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || 'Derek Monti <onboarding@resend.dev>';
const MAX_BODY_BYTES = 12 * 1024;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const MIN_FORM_AGE_MS = 800;

function sanitizeLogError(error) {
  if (!error) return { category: 'email-service-error' };
  return {
    name: error.name,
    code: error.code,
    statusCode: error.statusCode,
  };
}

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
    source: cleanText(raw.source, 80),
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

  if (req.body && typeof req.body === 'object') return req.body;

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
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (process.env.NODE_ENV === 'production' && !(await checkRateLimit(req))) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });
  }

  let rawFields;
  try {
    rawFields = await readJsonBody(req);
  } catch (error) {
    const status = error.statusCode === 413 ? 413 : 400;
    return res.status(status).json({ error: status === 413 ? 'Request is too large.' : 'Invalid request payload.' });
  }

  const fields = normalizeFields(rawFields || {});
  const meta = { reference: generateReference(), issued: todayFormatted(), submittedAt: new Date().toISOString() };

  if (fields.companyWebsite) {
    return res.status(200).json({ ok: true, reference: meta.reference });
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

  const turnstileResult = await verifyTurnstile(rawFields?.turnstileToken, req);
  if (!turnstileResult.ok) {
    console.warn('[api/quote] turnstile rejected:', turnstileResult.reason);
    return res.status(400).json({
      error: 'Human verification could not be completed. Reload the page and try again.',
      fieldErrors: { turnstile: 'Complete the human-verification challenge again.' },
    });
  }

  ensureEnv();
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[api/quote] transactional email is not configured');
    return res.status(500).json({
      error: 'Email delivery is unavailable right now. Use WhatsApp or email Derek directly.',
    });
  }

  const resend = new Resend(apiKey);
  const subject = renderTicketSubject(fields, meta);
  const html = renderTicketHtml(fields, meta);
  const plain = buildPlainSummary(fields, meta);
  const route = routeSummary(fields);

  let derekResult;
  try {
    derekResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [DEREK_EMAIL],
      replyTo: fields.email,
      subject: `[NEW QUOTE] ${meta.reference} - ${route.from} to ${route.to}`,
      html,
      text: plain,
    });
  } catch (error) {
    console.error('Advisor notification failed:', sanitizeLogError(error));
    return res.status(502).json({
      error: 'The request could not be delivered. Your entries have been kept; please try again or contact Derek directly.',
    });
  }

  if (derekResult.error) {
    console.error('Advisor notification failed:', sanitizeLogError(derekResult.error));
    return res.status(502).json({
      error: 'The request could not be delivered. Your entries have been kept; please try again or contact Derek directly.',
    });
  }

  let confirmationSent = true;
  try {
    const customerResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [fields.email],
      replyTo: DEREK_EMAIL,
      subject,
      html,
      text: plain,
    });
    if (customerResult.error) {
      confirmationSent = false;
      console.error('Customer confirmation failed:', sanitizeLogError(customerResult.error));
    }
  } catch (error) {
    confirmationSent = false;
    console.error('Customer confirmation failed:', sanitizeLogError(error));
  }

  return res.status(200).json({ ok: true, reference: meta.reference, confirmationSent });
}
