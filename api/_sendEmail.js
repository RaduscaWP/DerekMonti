import { withDeadline } from './_security.js';

export async function sendEmail(payload, idempotencyKey) {
  try {
    return await withDeadline(async (signal) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST', signal,
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && typeof data?.id === 'string' && data.id) return { outcome: 'accepted' };
      // 5xx/ambiguous responses and concurrency have no reliable non-delivery proof.
      if (response.status >= 500 || response.status === 408 || data?.name === 'concurrent_idempotent_requests' || response.ok) return { outcome: 'unknown' };
      return { outcome: 'rejected', status: response.status };
    }, 8000);
  } catch { return { outcome: 'unknown' }; }
}

export function confirmationEmail(reference, from, replyTo, email) {
  // Never repeat unverified free text or caller-provided titles in branded mail.
  const text = `Your flight request has been received by the request system.\n\nReference: ${reference}\n\nDerek will review your request and respond using your preferred contact method. Fares and availability are confirmed separately. This is not a booking or ticket.\n\nFly with Derek`;
  return { from, to: [email], reply_to: replyTo, subject: `Your flight request · ${reference}`, text, html: `<p>Your flight request has been received by the request system.</p><p>Reference: <strong>${reference}</strong></p><p>Derek will review your request and respond using your preferred contact method. Fares and availability are confirmed separately. This is not a booking or ticket.</p><p>Fly with Derek</p>` };
}
