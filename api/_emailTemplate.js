import { resolveLocation } from './_iataLookup.js';

const DEREK_PHONE = '+1 (786) 706-4828';
const DEREK_EMAIL = 'Derek@travelbusinessclass.com';
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://derekmonti.com';
const DEREK_AVATAR = `${SITE_URL}/images/DMphoto.jpg`;
const HERO_IMAGE =
  'https://images.pexels.com/photos/5645180/pexels-photo-5645180.jpeg?auto=compress&cs=tinysrgb&w=920';
const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/travelbusinessclass.com';
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
  if (!value) return 'TBC';
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return escape(value);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
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

function displayCity(value, fallback) {
  return escape(String(value || fallback || 'Not specified').trim().toUpperCase());
}

function iconCard(label, value) {
  return `
    <td width="50%" valign="top" style="padding:4px;vertical-align:top;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="background:#F5F5F7;border-radius:12px;padding:14px 14px;">
            <div style="font:700 10px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#6D788B;line-height:1.3;">${label}</div>
            <div style="font:700 13px Arial,sans-serif;color:#061524;line-height:1.45;padding-top:6px;word-break:break-word;">${value}</div>
          </td>
        </tr>
      </table>
    </td>
  `;
}

function notesBlock(notes) {
  if (!notes) return '';
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:0;">
      <tr>
        <td style="padding:4px;vertical-align:top;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="background:#F5F5F7;border-radius:12px;padding:14px;">
                <div style="font:700 10px Arial,sans-serif;letter-spacing:1.2px;text-transform:uppercase;color:#6D788B;line-height:1.3;">Your Notes</div>
                <div style="font:400 13px Arial,sans-serif;color:#253348;line-height:1.6;padding-top:6px;white-space:pre-line;">${escape(notes)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function renderTicketHtml(fields, meta) {
  const fromLocation = resolveLocation(fields.from);
  const toLocation = resolveLocation(fields.to);
  const fromCode = escape(fromLocation.code);
  const toCode = escape(toLocation.code);
  const fromCity = displayCity(fields.from, fromLocation.city);
  const toCity = displayCity(fields.to, toLocation.city);

  const tripType = fields.tripType === 'One way' ? 'One way' : 'Round trip';
  const cabin = escape(fields.cabin || 'Business');
  const passengers = escape(fields.passengers || '1 Passenger');
  const cabinPax = `${cabin} &middot; ${passengers}`;

  const departureFmt = formatDateShort(fields.departure);
  const datesValue =
    tripType === 'One way'
      ? `${departureFmt} &middot; One way`
      : `${departureFmt} &rarr; ${formatDateShort(fields.returnDate)}`;

  const email = escape(fields.email || 'Not provided');
  const phone = escape(fields.phone || 'Not provided');
  const reference = escape(meta.reference || generateReference());

  const whatsappMessage = `Hi Derek, I just submitted a Business Class request (Reference ${reference}). Looking forward to hearing back.`;
  const whatsappLink = `${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappMessage)}`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Business &amp; First Class Request</title>
  </head>
  <body style="margin:0;padding:0;background:#EDF0F4;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#EDF0F4;">
      <tr>
        <td align="center" style="padding:30px 12px;">

          <table role="presentation" width="460" cellpadding="0" cellspacing="0" style="width:100%;max-width:460px;border-collapse:collapse;background:#FFFFFF;border-radius:24px;overflow:hidden;">

            <!-- HERO -->
            <tr>
              <td style="background:#07111F;padding:30px 24px 18px;text-align:center;border-radius:24px 24px 0 0;">
                <div style="font:700 11px Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#FFFFFF;line-height:1.2;">Business Class Request</div>
              </td>
            </tr>
            <tr>
              <td style="background:#07111F;padding:0;line-height:0;">
                <img src="${HERO_IMAGE}" width="460" height="150" alt="Aircraft above clouds" style="display:block;width:100%;max-width:460px;height:150px;object-fit:cover;object-position:center;border:0;outline:none;">
              </td>
            </tr>

            <!-- ROUTE -->
            <tr>
              <td style="background:#FFFFFF;padding:32px 24px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="45%" align="left" valign="top" style="vertical-align:top;">
                      <div style="font:400 44px Georgia,'Times New Roman',serif;color:#061524;line-height:1;letter-spacing:1px;">${fromCode}</div>
                      <div style="font:700 11px Arial,sans-serif;color:#4D5A6D;line-height:1.4;padding-top:10px;letter-spacing:1px;text-transform:uppercase;">${fromCity}</div>
                    </td>
                    <td width="10%" align="center" valign="middle" style="vertical-align:middle;padding:0 4px;">
                      <div style="font:400 24px Georgia,serif;color:#8A194F;line-height:1;">&#9992;&#xFE0E;</div>
                    </td>
                    <td width="45%" align="right" valign="top" style="vertical-align:top;">
                      <div style="font:400 44px Georgia,'Times New Roman',serif;color:#061524;line-height:1;letter-spacing:1px;">${toCode}</div>
                      <div style="font:700 11px Arial,sans-serif;color:#4D5A6D;line-height:1.4;padding-top:10px;letter-spacing:1px;text-transform:uppercase;">${toCity}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- GRID 2x2 -->
            <tr>
              <td style="background:#FFFFFF;padding:0 20px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    ${iconCard('Travel Dates', datesValue)}
                    ${iconCard('Cabin &amp; Passengers', cabinPax)}
                  </tr>
                  <tr>
                    ${iconCard('Contact Email', email)}
                    ${iconCard('Contact Phone', phone)}
                  </tr>
                </table>
                ${notesBlock(fields.notes)}
              </td>
            </tr>

            <!-- ADVISOR FOOTER -->
            <tr>
              <td style="background:#07111F;padding:22px 24px 24px;border-radius:0 0 24px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="64" valign="middle" style="vertical-align:middle;padding-right:14px;">
                      <img src="${DEREK_AVATAR}" width="56" height="56" alt="Derek Monti" style="display:block;border-radius:28px;border:2px solid rgba(255,255,255,0.2);width:56px;height:56px;">
                    </td>
                    <td valign="middle" style="vertical-align:middle;">
                      <div style="font:700 16px Arial,sans-serif;color:#FFFFFF;line-height:1.2;">Derek Monti</div>
                      <div style="font:400 11px Arial,sans-serif;color:#AEB8C7;letter-spacing:0.5px;padding-top:4px;">Your Personal Advisor</div>
                    </td>
                    <td align="right" valign="middle" style="vertical-align:middle;">
                      <a href="${TRUSTPILOT_URL}" style="text-decoration:none;color:#FFFFFF;display:inline-block;">
                        <div style="font:700 9px Arial,sans-serif;color:#FFFFFF;line-height:1.2;letter-spacing:0.5px;">
                          <span style="color:#00B67A;">&#9733;</span> TRUSTPILOT
                        </div>
                        <div style="font:700 13px Arial,sans-serif;color:#FFFFFF;padding-top:4px;line-height:1;">4.9/5</div>
                        <div style="font:400 9px Arial,sans-serif;color:#AEB8C7;padding-top:3px;letter-spacing:0.3px;">Excellent</div>
                      </a>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                  <tr>
                    <td align="center" bgcolor="#8A194F" style="background:#8A194F;border-radius:12px;">
                      <a href="${whatsappLink}" style="display:block;padding:15px 24px;font:700 13px Arial,sans-serif;color:#FFFFFF;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;border-radius:12px;">Contact Advisor</a>
                    </td>
                  </tr>
                </table>

                <div style="font:400 10px 'Courier New',Courier,monospace;color:#6D788B;letter-spacing:1.5px;text-align:center;padding-top:18px;text-transform:uppercase;">Reference &middot; ${reference}</div>
              </td>
            </tr>

          </table>

          <table role="presentation" width="460" cellpadding="0" cellspacing="0" style="width:100%;max-width:460px;border-collapse:collapse;margin-top:16px;">
            <tr>
              <td align="center" style="font:400 11px Arial,sans-serif;color:#6D788B;line-height:1.7;padding:0 12px;">
                ${DEREK_EMAIL} &middot; ${DEREK_PHONE}<br>
                <span style="color:#9AA3B0;">Business &amp; First Class fare advisory</span>
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
  const from = fields.from || 'Origin';
  const to = fields.to || 'Destination';
  return `${fields.requestTitle || 'Business & First Class Flight Quote Request'} ${meta.reference} - ${from} to ${to}`;
}

export { renderTicketHtml, renderTicketSubject, generateReference, todayFormatted };
