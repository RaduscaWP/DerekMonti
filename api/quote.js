// SECURITY: RESEND_API_KEY is server-only. Never expose it to the client.
// Use .env for local dev and Vercel Sensitive Environment Variables in prod.

import './_loadEnv.js';
import { Resend } from 'resend';
import { renderTicketHtml, renderTicketSubject, generateReference, todayFormatted } from './_emailTemplate.js';

const DEREK_EMAIL = 'Derek@travelbusinessclass.com';
const FROM_ADDRESS = 'Derek Monti <onboarding@resend.dev>';

const MAX_BODY_BYTES = 12 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE_ALLOWED_RE = /^[+()\d\s.-]+$/;

const rateBuckets = globalThis.__derekQuoteRateBuckets || new Map();
globalThis.__derekQuoteRateBuckets = rateBuckets;

function sanitizeLogError(error) {
  if (!error) return { message: 'Unknown email service error' };
  return {
    name: error.name,
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
  };
}

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (firstForwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function checkRateLimit(req) {
  const now = Date.now();
  const key = clientKey(req);
  const current = rateBuckets.get(key);

  if (!current || now - current.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(key, { startedAt: now, count: 1 });
    return true;
  }

  current.count += 1;
  return current.count <= RATE_LIMIT_MAX;
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

function isValidPhone(value) {
  const trimmed = String(value || '').trim();
  const digits = trimmed.replace(/\D/g, '');
  return trimmed.length > 0 && PHONE_ALLOWED_RE.test(trimmed) && digits.length >= 7 && digits.length <= 20;
}

function normalizeFields(raw) {
  const tripType = raw.tripType === 'One way' ? 'One way' : 'Round trip';

  return {
    tripType,
    from: cleanText(raw.from, 80),
    to: cleanText(raw.to, 80),
    departure: cleanText(raw.departure, 20),
    returnDate: cleanText(raw.returnDate, 20),
    passengers: cleanText(raw.passengers, 24) || '1 Passenger',
    cabin: cleanText(raw.cabin, 32) || 'Business',
    name: cleanText(raw.name, 80),
    email: cleanText(raw.email, 120).toLowerCase(),
    phone: cleanText(raw.phone, 40),
    notes: cleanText(raw.notes, 600, { multiline: true }),
    source: cleanText(raw.source, 80),
    requestTitle: cleanText(raw.requestTitle, 120) || 'Business & First Class Flight Quote Request',
    companyWebsite: cleanText(raw.companyWebsite || raw.website || raw.url, 120),
  };
}

function validateFields(fields) {
  if (!EMAIL_RE.test(fields.email)) {
    return 'Please provide a valid email address.';
  }

  if (fields.from.length < 2 || fields.to.length < 2 || !ISO_DATE_RE.test(fields.departure)) {
    return 'Please fill in From, To, and Departure date.';
  }

  if (fields.source === 'Home Page quote form' && !isValidPhone(fields.phone)) {
    return 'Please enter a valid phone number so Derek can follow up quickly.';
  }

  if (fields.phone && !isValidPhone(fields.phone)) {
    return 'Please provide a valid phone number.';
  }

  if (fields.tripType !== 'One way' && fields.returnDate && !ISO_DATE_RE.test(fields.returnDate)) {
    return 'Please use a valid return date.';
  }

  return null;
}

function buildPlainSummary(fields, meta) {
  const lines = [
    `${fields.requestTitle || 'Business & First Class Flight Quote Request'} - ${meta.reference}`,
    `Issued: ${meta.issued}`,
    meta.submittedAt ? `Timestamp: ${meta.submittedAt}` : null,
    fields.source ? `Source: ${fields.source}` : null,
    '',
    `Trip type:   ${fields.tripType}`,
    `From:        ${fields.from || 'Not provided'}`,
    `To:          ${fields.to || 'Not provided'}`,
    `Departure:   ${fields.departure || 'Not provided'}`,
    `Return:      ${fields.returnDate || (fields.tripType === 'One way' ? 'One way' : 'Not provided')}`,
    `Passengers:  ${fields.passengers || '1 Passenger'}`,
    `Cabin:       ${fields.cabin || 'Business'}`,
    '',
    fields.name ? `Name:        ${fields.name}` : null,
    fields.email ? `Email:       ${fields.email}` : null,
    fields.phone ? `Phone:       ${fields.phone}` : null,
    fields.notes ? '' : null,
    fields.notes ? `Notes:\n${fields.notes}` : null,
  ].filter((line) => line !== null);

  return lines.join('\n');
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

  if (process.env.NODE_ENV === 'production' && !checkRateLimit(req)) {
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
    return res.status(200).json({ ok: true, reference: meta.reference, issued: meta.issued });
  }

  const validationError = validateFields(fields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const isDev = process.env.NODE_ENV !== 'production';
    return res.status(500).json({
      error: 'Email service is not configured. Please contact Derek by WhatsApp or email.',
      ...(isDev && {
        _debug: {
          cwd: process.cwd(),
          envKeysWithResend: Object.keys(process.env).filter((k) => k.toLowerCase().includes('resend')),
          nodeEnv: process.env.NODE_ENV || null,
        },
      }),
    });
  }

  const resend = new Resend(apiKey);
  const subject = renderTicketSubject(fields, meta);
  const html = renderTicketHtml(fields, meta);
  const plain = buildPlainSummary(fields, meta);

  try {
    const [customerResult, derekResult] = await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: [fields.email],
        replyTo: DEREK_EMAIL,
        subject,
        html,
        text: plain,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: [DEREK_EMAIL],
        replyTo: fields.email,
        subject: `Business & First Class Quote ${meta.reference} - ${fields.from} to ${fields.to}${
          fields.name ? ` (${fields.name})` : ''
        }`,
        text: plain,
      }),
    ]);

    if (customerResult.error) {
      console.error('Customer email failed:', sanitizeLogError(customerResult.error));
      return res.status(502).json({
        error: 'We could not send the confirmation email. Please try WhatsApp or email Derek directly.',
      });
    }

    if (derekResult.error) {
      console.error('Derek notification failed:', sanitizeLogError(derekResult.error));
    }

    return res.status(200).json({ ok: true, reference: meta.reference, issued: meta.issued });
  } catch (error) {
    console.error('Quote send failed:', sanitizeLogError(error));
    return res.status(500).json({
      error: 'Something went wrong on our end. Please try WhatsApp or email Derek directly.',
    });
  }
}
