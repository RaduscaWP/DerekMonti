import { resolveLocation } from './_iataLookup.js';

const DEREK_PHONE = '+1 (786) 706-4828';
const DEREK_EMAIL = 'Derek@travelbusinessclass.com';
const HERO_IMAGE =
  'https://images.pexels.com/photos/5645180/pexels-photo-5645180.jpeg?auto=compress&cs=tinysrgb&w=1200';

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

function formatDate(value) {
  if (!value) return 'To be confirmed';
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return escape(value);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

function passengerCount(value) {
  return escape(value || '1 Passenger');
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
  return escape(String(value || fallback || 'Not specified').trim());
}

function smallLabel(label) {
  return `<div style="font:700 9px Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#6D788B;">${label}</div>`;
}

function detailCell(label, value) {
  return `
    <td style="padding:14px 16px;border:1px solid #DDE3EA;vertical-align:top;background:#FFFFFF;">
      ${smallLabel(label)}
      <div style="font:700 14px Arial,sans-serif;color:#061524;line-height:1.35;padding-top:6px;">${value}</div>
    </td>
  `;
}

function detailRow(cells) {
  return `<tr>${cells.join('')}</tr>`;
}

function miniPill(label, value) {
  return `
    <td style="padding:0 8px 0 0;vertical-align:top;">
      <div style="border:1px solid #DDE3EA;background:#FFFFFF;padding:11px 12px;">
        ${smallLabel(label)}
        <div style="font:700 13px Arial,sans-serif;color:#061524;line-height:1.25;padding-top:5px;">${value}</div>
      </div>
    </td>
  `;
}

function stepRow(number, title, copy) {
  return `
    <tr>
      <td width="38" style="padding:12px 0;vertical-align:top;">
        <div style="width:28px;height:28px;border:1px solid #8A194F;color:#8A194F;font:700 11px Arial,sans-serif;line-height:28px;text-align:center;background:#FFFFFF;">${number}</div>
      </td>
      <td style="padding:11px 0;vertical-align:top;border-bottom:1px solid rgba(11,25,41,0.08);">
        <div style="font:700 14px Arial,sans-serif;color:#061524;line-height:1.35;">${title}</div>
        <div style="font:400 12px Arial,sans-serif;color:#4D5A6D;line-height:1.55;padding-top:3px;">${copy}</div>
      </td>
    </tr>
  `;
}

function renderTicketHtml(fields, meta) {
  const fromLocation = resolveLocation(fields.from);
  const toLocation = resolveLocation(fields.to);
  const fromCode = escape(fromLocation.code);
  const toCode = escape(toLocation.code);
  const fromCity = displayCity(fields.from, fromLocation.city);
  const toCity = displayCity(fields.to, toLocation.city);
  const tripType = escape(fields.tripType || 'Round trip');
  const cabin = escape(fields.cabin || 'Business');
  const returnValue =
    fields.tripType === 'One way' && !fields.returnDate ? 'One way' : formatDate(fields.returnDate);
  const issued = escape(meta.issued || todayFormatted());
  const reference = escape(meta.reference || generateReference());

  const notesBlock = fields.notes
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:16px;">
        <tr>
          <td style="border:1px solid #DDE3EA;background:#FFFFFF;padding:16px 18px;">
            ${smallLabel('Client notes')}
            <div style="font:400 13px Arial,sans-serif;color:#253348;line-height:1.65;padding-top:8px;white-space:pre-line;">${escape(
              fields.notes,
            )}</div>
          </td>
        </tr>
      </table>
    `
    : '';

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Derek Monti Premium Fare Request</title>
  </head>
  <body style="margin:0;padding:0;background:#EDF0F4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#EDF0F4;">
      <tr>
        <td align="center" style="padding:30px 12px;">
          <table role="presentation" width="660" cellpadding="0" cellspacing="0" style="width:100%;max-width:660px;border-collapse:collapse;background:#07111F;border:1px solid #D8DEE7;">
            <tr>
              <td style="background:#07111F;">
                <img src="${HERO_IMAGE}" width="660" alt="Aircraft wing above clouds" style="display:block;width:100%;max-width:660px;height:132px;border:0;">
              </td>
            </tr>
            <tr>
              <td style="padding:0;background:#FFFFFF;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="background:#07111F;padding:20px 24px;border-top:3px solid #8A194F;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="vertical-align:top;">
                            <div style="font:700 9px Arial,sans-serif;letter-spacing:1.8px;text-transform:uppercase;color:#C9D0DA;">Premium fare request</div>
                            <div style="font:700 27px Arial,sans-serif;color:#FFFFFF;line-height:1.1;padding-top:7px;">Derek Monti</div>
                            <div style="font:400 12px Arial,sans-serif;color:#AEB8C7;line-height:1.5;padding-top:6px;">Private fare audit and premium cabin advisory</div>
                          </td>
                          <td align="right" width="155" style="vertical-align:top;">
                            <div style="border:1px solid rgba(255,255,255,0.24);padding:10px 12px;background:#0B1929;">
                              <div style="font:700 8px Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#AEB8C7;">Reference</div>
                              <div style="font:700 17px 'Courier New',monospace;color:#FFFFFF;letter-spacing:0.5px;padding-top:5px;">${reference}</div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 24px 0;background:#FFFFFF;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#FAF9F7;border:1px solid #DDE3EA;">
                        <tr>
                          <td style="padding:20px 20px 18px;vertical-align:top;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                              <tr>
                                <td width="39%" style="vertical-align:top;">
                                  ${smallLabel('From')}
                                  <div style="font:700 46px Arial,sans-serif;letter-spacing:1px;color:#061524;line-height:0.95;padding-top:8px;">${fromCode}</div>
                                  <div style="font:700 15px Arial,sans-serif;color:#253348;line-height:1.3;padding-top:8px;">${fromCity}</div>
                                </td>
                                <td width="22%" align="center" style="vertical-align:middle;">
                                  <div style="font:700 11px Arial,sans-serif;letter-spacing:1.7px;text-transform:uppercase;color:#8A194F;padding-bottom:9px;">Route</div>
                                  <div style="height:1px;background:#B9C2D0;line-height:1px;">&nbsp;</div>
                                  <div style="font:700 22px Arial,sans-serif;color:#8A194F;line-height:1;margin-top:-12px;background:#FAF9F7;display:inline-block;padding:0 8px;">&rarr;</div>
                                </td>
                                <td width="39%" align="right" style="vertical-align:top;">
                                  ${smallLabel('To')}
                                  <div style="font:700 46px Arial,sans-serif;letter-spacing:1px;color:#061524;line-height:0.95;padding-top:8px;">${toCode}</div>
                                  <div style="font:700 15px Arial,sans-serif;color:#253348;line-height:1.3;padding-top:8px;">${toCity}</div>
                                </td>
                              </tr>
                            </table>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                              <tr>
                                ${miniPill('Trip type', tripType)}
                                ${miniPill('Cabin', cabin)}
                                ${miniPill('Passengers', passengerCount(fields.passengers))}
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 24px;background:#FFFFFF;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="22" style="padding:0;vertical-align:middle;"><div style="width:22px;height:22px;border-radius:11px;background:#EDF0F4;margin-left:-35px;">&nbsp;</div></td>
                          <td style="border-top:1px dashed #AEB7C4;line-height:1px;font-size:1px;">&nbsp;</td>
                          <td width="22" style="padding:0;vertical-align:middle;"><div style="width:22px;height:22px;border-radius:11px;background:#EDF0F4;margin-right:-35px;">&nbsp;</div></td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 24px 22px;background:#FFFFFF;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="70%" style="padding:18px 18px 18px 0;vertical-align:top;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                              ${detailRow([
                                detailCell('Departure', formatDate(fields.departure)),
                                detailCell('Return', returnValue),
                              ])}
                              ${detailRow([
                                detailCell('Request issued', issued),
                                detailCell('Status', '<span style="color:#8A194F;">Received</span>'),
                              ])}
                            </table>
                          </td>
                          <td width="30%" style="padding:18px 0 18px 18px;vertical-align:top;border-left:1px dashed #AEB7C4;">
                            <div style="background:#07111F;color:#FFFFFF;padding:16px 14px;border-top:3px solid #8A194F;">
                              <div style="font:700 8px Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#AEB8C7;">Fare desk</div>
                              <div style="font:700 19px Arial,sans-serif;line-height:1.1;padding-top:8px;">Request received</div>
                              <div style="font:400 12px Arial,sans-serif;color:#C9D0DA;line-height:1.45;padding-top:10px;">Derek reviews route, aircraft, rules, and private fare access before quoting.</div>
                            </div>
                          </td>
                        </tr>
                      </table>

                      <div style="font:700 10px Arial,sans-serif;letter-spacing:1.7px;color:#8A194F;text-transform:uppercase;padding-top:6px;">Request details</div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:12px;">
                        ${detailRow([
                          detailCell('Traveler', escape(fields.name || 'Guest traveler')),
                          detailCell('Email', escape(fields.email || 'Not provided')),
                        ])}
                        ${detailRow([
                          detailCell('Phone / WhatsApp', escape(fields.phone || 'Not provided')),
                          detailCell('Cabin request', cabin),
                        ])}
                      </table>
                      ${notesBlock}

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:18px;background:#F7F3F5;border:1px solid #E7D9E0;border-left:4px solid #8A194F;">
                        <tr>
                          <td style="padding:19px 20px;">
                            <div style="font:700 18px Arial,sans-serif;color:#061524;line-height:1.3;">Derek's advisor desk</div>
                            <div style="font:400 12px Arial,sans-serif;color:#4D5A6D;line-height:1.55;padding-top:5px;">The request is not just stored. It is reviewed like an itinerary audit.</div>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
                              ${stepRow(
                                '01',
                                'Audit the itinerary',
                                'Aircraft type, cabin quality, connection risk, ticket rules, and date flexibility are checked first.',
                              )}
                              ${stepRow(
                                '02',
                                'Compare private channels',
                                'Derek compares public pricing with private fare availability and explains the practical difference.',
                              )}
                              ${stepRow(
                                '03',
                                'Reply personally',
                                `Reply to this email or call / WhatsApp ${DEREK_PHONE} if timing is urgent.`,
                              )}
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="background:#07111F;padding:18px 24px;border-top:3px solid #8A194F;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="font:400 12px Arial,sans-serif;color:#C9D0DA;line-height:1.6;">
                            Derek Monti &middot; Premium cabin fare advisory<br>
                            ${DEREK_EMAIL} &middot; ${DEREK_PHONE}
                          </td>
                          <td align="right" style="font:700 9px Arial,sans-serif;letter-spacing:1.5px;color:#FFFFFF;text-transform:uppercase;">
                            Personal service
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
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
  return `Derek Monti request ${meta.reference} - ${from} to ${to}`;
}

export { renderTicketHtml, renderTicketSubject, generateReference, todayFormatted };
