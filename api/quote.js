// SECURITY: RESEND_API_KEY is server-only. Never expose to client.
// Stored in .env (gitignored) for dev; set via Vercel env vars in prod.

import { Resend } from 'resend';
import { renderTicketHtml, renderTicketSubject, generateReference, todayFormatted } from './_emailTemplate.js';

const DEREK_EMAIL = 'Derek@travelbusinessclass.com';
const FROM_ADDRESS = 'Derek Monti <onboarding@resend.dev>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildPlainSummary(fields, meta) {
  const lines = [
    `New premium flight quote request — ${meta.reference}`,
    `Issued: ${meta.issued}`,
    '',
    `Trip type:   ${fields.tripType || 'Round trip'}`,
    `From:        ${fields.from || 'Not provided'}`,
    `To:          ${fields.to || 'Not provided'}`,
    `Departure:   ${fields.departure || 'Not provided'}`,
    `Return:      ${fields.returnDate || (fields.tripType === 'One way' ? 'One way' : 'Not provided')}`,
    `Passengers:  ${fields.passengers || '1'}`,
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
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Email service not configured. Add RESEND_API_KEY to environment variables.',
    });
  }

  const fields = await readJsonBody(req);

  const customerEmail = (fields.email || '').trim();
  const from = (fields.from || '').trim();
  const to = (fields.to || '').trim();
  const departure = (fields.departure || '').trim();

  if (!EMAIL_RE.test(customerEmail)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!from || !to || !departure) {
    return res.status(400).json({ error: 'Please fill in From, To, and Departure date.' });
  }

  const resend = new Resend(apiKey);
  const meta = { reference: generateReference(), issued: todayFormatted() };
  const subject = renderTicketSubject(fields, meta);
  const html = renderTicketHtml(fields, meta);
  const plain = buildPlainSummary(fields, meta);

  try {
    const [customerResult, derekResult] = await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: [customerEmail],
        replyTo: DEREK_EMAIL,
        subject,
        html,
        text: plain,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: [DEREK_EMAIL],
        replyTo: customerEmail,
        subject: `Quote ${meta.reference} — ${from} → ${to}${fields.name ? ` (${fields.name})` : ''}`,
        text: plain,
      }),
    ]);

    if (customerResult.error) {
      console.error('Customer email failed:', customerResult.error);
      return res.status(502).json({
        error: 'We couldn\'t deliver the boarding pass to your inbox. Please try WhatsApp instead.',
      });
    }

    if (derekResult.error) {
      console.error('Derek notification failed:', derekResult.error);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Quote send failed:', err);
    return res.status(500).json({
      error: 'Something went wrong on our end. Please try WhatsApp or email Derek directly.',
    });
  }
}
