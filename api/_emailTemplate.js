import { resolveLocation } from './_iataLookup.js';
import {
  getCabinLabel,
  getComfortPreferenceLabel,
  getContactPreferenceLabel,
  getFlexibilityLabel,
  getItineraryLegs,
  getTripTypeLabel,
} from '../src/utils/quoteRequest.js';

const DEREK_PHONE = '+1 (786) 706-4828';
const DEREK_EMAIL = 'Derek@travelbusinessclass.com';
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://www.flywithderek.com';
const DEREK_AVATAR = `${SITE_URL}/images/DMphoto.jpg`;
const WHATSAPP_BASE = 'https://wa.me/17867064828';

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
};

function escape(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => escapeMap[char]);
}

function formatDateShort(value) {
  if (!value) return 'Not provided';
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return escape(value);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

function todayFormatted() {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());
}

function generateReference() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const digits = Math.floor(1000 + Math.random() * 9000);
  const prefix = Array.from({ length: 2 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  return `DM-${prefix}${digits}`;
}

function routeDetails(fields) {
  const legs = getItineraryLegs(fields);
  const first = legs[0] || {};
  const last = legs[legs.length - 1] || {};
  const from = resolveLocation(first.from || fields.from);
  const to = resolveLocation(last.to || fields.to);
  return { legs, from, to };
}

function detailCard(label, value) {
  return `
    <td width="50%" valign="top" style="padding:4px;vertical-align:top;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="background:#F5F5F7;border-radius:12px;padding:14px;">
            <div style="font:700 10px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#6D788B;line-height:1.3;">${escape(label)}</div>
            <div style="font:700 13px Arial,sans-serif;color:#061524;line-height:1.45;padding-top:6px;word-break:break-word;">${escape(value)}</div>
          </td>
        </tr>
      </table>
    </td>
  `;
}

function itineraryBlock(fields, legs) {
  if (fields.tripType !== 'multi_city') return '';
  const rows = legs
    .map(
      (leg, index) => `
        <tr>
          <td style="padding:10px 12px;border-top:1px solid #E6E9EE;font:700 11px Arial,sans-serif;color:#8A194F;white-space:nowrap;">FLIGHT ${index + 1}</td>
          <td style="padding:10px 12px;border-top:1px solid #E6E9EE;font:600 13px Arial,sans-serif;color:#061524;">${escape(leg.from)} &rarr; ${escape(leg.to)}</td>
          <td style="padding:10px 12px;border-top:1px solid #E6E9EE;font:400 12px Arial,sans-serif;color:#4D5A6D;white-space:nowrap;">${formatDateShort(leg.departure)}</td>
        </tr>
      `,
    )
    .join('');

  return `
    <tr>
      <td style="background:#FFFFFF;padding:0 24px 22px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E6E9EE;border-radius:12px;overflow:hidden;">
          ${rows}
        </table>
      </td>
    </tr>
  `;
}

function notesBlock(notes, label = 'Notes or priorities') {
  if (!notes) return '';
  return `
    <tr>
      <td style="background:#FFFFFF;padding:0 24px 24px;">
        <div style="background:#F5F5F7;border-radius:12px;padding:14px;">
          <div style="font:700 10px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#6D788B;line-height:1.3;">${escape(label)}</div>
          <div style="font:400 13px Arial,sans-serif;color:#253348;line-height:1.6;padding-top:6px;white-space:pre-line;">${escape(notes)}</div>
        </div>
      </td>
    </tr>
  `;
}

function renderTicketHtml(fields, meta) {
  const { legs, from, to } = routeDetails(fields);
  const reference = escape(meta.reference || generateReference());
  const tripType = getTripTypeLabel(fields.tripType);
  const departure = fields.tripType === 'multi_city' ? legs[0]?.departure : fields.departure;
  const returnValue =
    fields.tripType === 'round_trip' ? formatDateShort(fields.returnDate) : fields.tripType === 'one_way' ? 'Not applicable' : `${legs.length} flights`;
  const whatsappMessage = `Hi Derek, I submitted a flight quote request (Reference ${reference}).`;
  const whatsappLink = `${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappMessage)}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Premium flight review request</title>
  </head>
  <body style="margin:0;padding:0;background:#EDF0F4;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#EDF0F4;">
      <tr>
        <td align="center" style="padding:30px 12px;">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:100%;max-width:520px;border-collapse:collapse;background:#FFFFFF;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#07111F;padding:28px 24px 18px;text-align:center;border-radius:24px 24px 0 0;">
                <div style="font:700 11px Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#FFFFFF;line-height:1.2;">Premium Flight Review Request</div>
              </td>
            </tr>
            <tr>
              <td style="background:#FFFFFF;padding:30px 24px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="44%" align="left" valign="top">
                      <div style="font:400 42px Georgia,'Times New Roman',serif;color:#061524;line-height:1;letter-spacing:1px;">${escape(from.code)}</div>
                      <div style="font:700 11px Arial,sans-serif;color:#4D5A6D;line-height:1.4;padding-top:9px;letter-spacing:1px;text-transform:uppercase;">${escape(from.city)}</div>
                    </td>
                    <td width="12%" align="center" valign="middle" style="font:400 24px Georgia,serif;color:#8A194F;">&#9992;&#xFE0E;</td>
                    <td width="44%" align="right" valign="top">
                      <div style="font:400 42px Georgia,'Times New Roman',serif;color:#061524;line-height:1;letter-spacing:1px;">${escape(to.code)}</div>
                      <div style="font:700 11px Arial,sans-serif;color:#4D5A6D;line-height:1.4;padding-top:9px;letter-spacing:1px;text-transform:uppercase;">${escape(to.city)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${itineraryBlock(fields, legs)}
            <tr>
              <td style="background:#FFFFFF;padding:0 20px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    ${detailCard('Trip type', tripType)}
                    ${detailCard('Travel dates', `${formatDateShort(departure)} / ${returnValue}`)}
                  </tr>
                  <tr>
                    ${detailCard('Cabin and travelers', `${getCabinLabel(fields.cabin)} / ${fields.travelers}`)}
                    ${detailCard('Date flexibility', getFlexibilityLabel(fields.flexibility))}
                  </tr>
                  <tr>
                    ${detailCard('Traveler', fields.fullName)}
                    ${detailCard('Preferred contact', getContactPreferenceLabel(fields.contactPreference))}
                  </tr>
                  <tr>
                    ${detailCard('Email', fields.email)}
                    ${detailCard('Phone or WhatsApp', fields.phone || 'Not provided')}
                  </tr>
                </table>
              </td>
            </tr>
            ${notesBlock(fields.comfortPreference ? getComfortPreferenceLabel(fields.comfortPreference) : '', 'Comfort preference')}
            ${notesBlock(fields.notes)}
            <tr>
              <td style="background:#07111F;padding:22px 24px 24px;border-radius:0 0 24px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="64" valign="middle" style="padding-right:14px;">
                      <img src="${DEREK_AVATAR}" width="56" height="56" alt="Derek Monti" style="display:block;border-radius:28px;border:2px solid rgba(255,255,255,0.2);width:56px;height:56px;">
                    </td>
                    <td valign="middle">
                      <div style="font:700 16px Arial,sans-serif;color:#FFFFFF;line-height:1.2;">Derek Monti</div>
                      <div style="font:400 11px Arial,sans-serif;color:#AEB8C7;letter-spacing:0.5px;padding-top:4px;">Personal flight advisor</div>
                    </td>
                  </tr>
                </table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                  <tr>
                    <td align="center" bgcolor="#8A194F" style="background:#8A194F;border-radius:12px;">
                      <a href="${whatsappLink}" style="display:block;padding:15px 24px;font:700 13px Arial,sans-serif;color:#FFFFFF;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;border-radius:12px;">Contact Derek</a>
                    </td>
                  </tr>
                </table>
                <div style="font:400 10px 'Courier New',Courier,monospace;color:#AEB8C7;letter-spacing:1.5px;text-align:center;padding-top:18px;text-transform:uppercase;">Reference &middot; ${reference}</div>
              </td>
            </tr>
          </table>
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:100%;max-width:520px;border-collapse:collapse;margin-top:16px;">
            <tr>
              <td align="center" style="font:400 11px Arial,sans-serif;color:#6D788B;line-height:1.7;padding:0 12px;">
                ${escape(DEREK_PHONE)}<br>
                <span style="color:#9AA3B0;">This request is not a booking. Fares and availability must be confirmed.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderTicketSubject(fields, meta) {
  const { legs } = routeDetails(fields);
  const first = legs[0] || {};
  const last = legs[legs.length - 1] || {};
  const from = first.from || fields.from || 'Origin';
  const to = last.to || fields.to || 'Destination';
  return `${fields.requestTitle || 'Premium Flight Review Request'} ${meta.reference} - ${from} to ${to}`;
}

export { renderTicketHtml, renderTicketSubject, generateReference, todayFormatted };
