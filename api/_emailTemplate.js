import { resolveLocation } from './_iataLookup.js';

const COLORS = {
  crimson: '#8A194F',
  crimsonDark: '#5C0F35',
  crimsonTint: 'rgba(138,25,79,0.06)',
  dashed: 'rgba(11,25,41,0.20)',
  navy: '#0B1929',
  navyDeep: '#08101A',
  textMuted: '#4A5568',
  textBody: '#2A3548',
  bgLight: '#F5F5F7',
  border: 'rgba(11,25,41,0.08)',
  white: '#FFFFFF',
  trustpilot: '#00B67A',
};

const FONT_DISPLAY = "'Syne', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'DM Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

const HERO_IMAGE_URL =
  'https://images.pexels.com/photos/5645180/pexels-photo-5645180.jpeg?auto=compress&cs=tinysrgb&w=1200';

const DEREK_PHOTO_URL =
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&facepad=2.4&w=160&h=160&q=85';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function escape(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return value ? escape(value).toUpperCase() : '—';
  const [, year, month, day] = match;
  const m = MONTHS[Number(month) - 1] || month;
  return `${Number(day)} ${m.toUpperCase()} ${year}`;
}

function passengerCount(value) {
  const match = /(\d+)/.exec(value || '');
  return match ? Number(match[1]) : 1;
}

function todayFormatted() {
  const d = new Date();
  return `${d.getDate()} ${MONTHS[d.getMonth()].toUpperCase()} ${d.getFullYear()}`;
}

const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateReference() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)];
  }
  return `DM-${code}`;
}

function classCode(cabin) {
  const c = (cabin || '').toLowerCase();
  if (c.includes('first')) return 'F';
  if (c.includes('business')) return 'J';
  if (c.includes('premium')) return 'W';
  if (c.includes('either')) return 'J';
  return 'Y';
}

function gridCell(label, value, align = 'left') {
  return `
    <td valign="top" align="${align}" style="padding:14px 8px 14px 0; vertical-align:top;">
      <div style="font-family:${FONT_BODY}; font-size:9px; letter-spacing:0.18em; text-transform:uppercase; font-weight:800; color:${COLORS.textMuted}; line-height:1;">${label}</div>
      <div style="font-family:${FONT_BODY}; font-size:13px; font-weight:700; color:${COLORS.navy}; padding-top:7px; line-height:1.25; letter-spacing:0.02em;">${value}</div>
    </td>`;
}

function gridRow(cells) {
  return `<tr>${cells.join('')}</tr>`;
}

export function renderTicketHtml(fields = {}, meta = {}) {
  const from = resolveLocation(fields.from);
  const to = resolveLocation(fields.to);

  const isOneWay = (fields.tripType || '').toLowerCase() === 'one way';
  const departText = formatDate(fields.departure);
  const returnText = isOneWay ? '—' : formatDate(fields.returnDate);
  const pax = passengerCount(fields.passengers);
  const cabinName = (fields.cabin || 'Business').toUpperCase();
  const cabinCode = classCode(fields.cabin);
  const tripType = (fields.tripType || 'Round trip').toUpperCase();
  const passengerName = (fields.name || '').trim() || '—';
  const reference = meta.reference || generateReference();
  const issued = meta.issued || todayFormatted();
  const status = 'AWAITING ADVISOR';
  const notes = (fields.notes || '').trim();

  const dataGrid = [
    gridRow([
      gridCell('Passenger', escape(passengerName).toUpperCase()),
      gridCell('Departing', departText),
      gridCell('Returning', returnText, 'right'),
    ]),
    gridRow([
      gridCell('Trip', escape(tripType)),
      gridCell('Passengers', String(pax)),
      gridCell('Cabin', `${escape(cabinName)} &middot; ${cabinCode}`, 'right'),
    ]),
    gridRow([
      gridCell('Reference', `<span style="font-family:${FONT_MONO}; letter-spacing:0.06em;">${reference}</span>`),
      gridCell('Issued', issued),
      gridCell('Status', status, 'right'),
    ]),
  ].join('');

  const notesBlock = notes
    ? `
      <tr>
        <td style="padding:12px 28px 0;">
          <div style="font-size:0; line-height:0; border-top:1px dashed ${COLORS.dashed};">&nbsp;</div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 28px 4px;">
          <div style="font-family:${FONT_BODY}; font-size:9px; letter-spacing:0.18em; text-transform:uppercase; font-weight:800; color:${COLORS.crimson};">Your notes</div>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 28px 14px;">
          <div style="font-family:${FONT_BODY}; font-size:13px; color:${COLORS.textBody}; line-height:1.6;">${escape(notes)}</div>
        </td>
      </tr>`
    : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Boarding Pass &middot; ${reference}</title>
</head>
<body style="margin:0; padding:0; background:${COLORS.bgLight}; font-family:${FONT_BODY}; color:${COLORS.navy}; -webkit-font-smoothing:antialiased;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
    Boarding pass ${reference}: ${escape(from.code)} to ${escape(to.code)}, ${escape(tripType.toLowerCase())}, ${escape(cabinName.toLowerCase())}.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLORS.bgLight}; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; background:${COLORS.white}; border-radius:14px; overflow:hidden; border:1px solid ${COLORS.border}; box-shadow:0 18px 48px rgba(11,25,41,0.14);">

          <!-- Hero image with cabin stamp -->
          <tr>
            <td style="padding:0;">
              <div style="position:relative; line-height:0; font-size:0; background:${COLORS.navy};">
                <img src="${HERO_IMAGE_URL}" width="600" alt="" style="display:block; width:100%; max-width:600px; height:auto; max-height:200px; object-fit:cover;" />
                <!--[if !mso]><!-->
                <div style="position:absolute; top:16px; right:16px; padding:7px 12px; background:${COLORS.crimson}; color:${COLORS.white}; font-family:${FONT_BODY}; font-size:10px; font-weight:900; letter-spacing:0.12em; text-transform:uppercase; line-height:1; border:1px solid rgba(255,255,255,0.18); border-radius:4px; box-shadow:0 14px 30px rgba(8,16,26,0.25);">
                  ${escape(cabinName)} &middot; ${cabinCode}
                </div>
                <!--<![endif]-->
              </div>
            </td>
          </tr>

          <!-- Route block -->
          <tr>
            <td style="padding:24px 28px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td valign="top" width="44%" style="padding-right:8px;">
                    <div style="font-family:${FONT_BODY}; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; font-weight:900; color:${COLORS.textMuted}; line-height:1;">From</div>
                    <div style="font-family:${FONT_DISPLAY}; font-size:38px; font-weight:800; color:${COLORS.navy}; line-height:0.95; padding-top:9px; letter-spacing:-0.01em;">${escape(from.code)}</div>
                    <div style="font-family:${FONT_BODY}; font-size:11px; font-weight:800; color:${COLORS.textMuted}; letter-spacing:0.1em; text-transform:uppercase; padding-top:9px; line-height:1.2;">${escape(from.city)}</div>
                  </td>
                  <td align="center" valign="middle" width="12%" style="padding:6px 0;">
                    <div style="display:inline-block; width:34px; height:34px; line-height:32px; text-align:center; border:1px solid rgba(138,25,79,0.25); border-radius:999px; background:rgba(138,25,79,0.06); color:${COLORS.crimson}; font-family:${FONT_BODY}; font-size:18px; font-weight:700;">&rarr;</div>
                  </td>
                  <td valign="top" align="right" width="44%" style="padding-left:8px;">
                    <div style="font-family:${FONT_BODY}; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; font-weight:900; color:${COLORS.textMuted}; line-height:1;">To</div>
                    <div style="font-family:${FONT_DISPLAY}; font-size:38px; font-weight:800; color:${COLORS.navy}; line-height:0.95; padding-top:9px; letter-spacing:-0.01em;">${escape(to.code)}</div>
                    <div style="font-family:${FONT_BODY}; font-size:11px; font-weight:800; color:${COLORS.textMuted}; letter-spacing:0.1em; text-transform:uppercase; padding-top:9px; line-height:1.2;">${escape(to.city)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Dashed perforation -->
          <tr>
            <td style="padding:20px 28px 0;">
              <div style="font-size:0; line-height:0; border-top:1px dashed ${COLORS.dashed};">&nbsp;</div>
            </td>
          </tr>

          <!-- 3x3 boarding-pass data grid -->
          <tr>
            <td style="padding:4px 28px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                ${dataGrid}
              </table>
            </td>
          </tr>

          ${notesBlock}

          <!-- Dashed perforation before reference block -->
          <tr>
            <td style="padding:14px 28px 0;">
              <div style="font-size:0; line-height:0; border-top:1px dashed ${COLORS.dashed};">&nbsp;</div>
            </td>
          </tr>

          <!-- Big bottom-of-pass reference (boarding-pass tradition) -->
          <tr>
            <td align="center" style="padding:18px 28px 22px;">
              <div style="font-family:${FONT_MONO}; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:${COLORS.textMuted};">Reference</div>
              <div style="font-family:${FONT_MONO}; font-size:22px; font-weight:700; color:${COLORS.navy}; letter-spacing:0.18em; padding-top:8px;">${reference}</div>
            </td>
          </tr>

          <!-- Signature card -->
          <tr>
            <td style="background:${COLORS.navy}; padding:22px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td valign="top" width="84">
                    <img src="${DEREK_PHOTO_URL}" width="68" height="68" alt="Derek Monti" style="display:block; border-radius:50%; border:2px solid ${COLORS.crimson};" />
                  </td>
                  <td valign="top" style="padding-left:18px;">
                    <div style="font-family:${FONT_DISPLAY}; color:${COLORS.white}; font-size:18px; font-weight:800;">Derek Monti</div>
                    <div style="color:${COLORS.crimson}; font-size:11px; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; padding-top:4px;">Personal Aviation Advisor</div>
                    <div style="padding-top:12px; font-size:13px; color:rgba(255,255,255,0.82); line-height:1.85;">
                      <a href="tel:+17867064828" style="color:rgba(255,255,255,0.82); text-decoration:none;">&#x260E;&#xFE0E; +1 (786) 706-4828</a><br />
                      <a href="mailto:Derek@travelbusinessclass.com" style="color:rgba(255,255,255,0.82); text-decoration:none;">&#x2709;&#xFE0E; Derek@travelbusinessclass.com</a><br />
                      <a href="https://travelbusinessclass.com" style="color:rgba(255,255,255,0.82); text-decoration:none;">&#x1F310; travelbusinessclass.com</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trust badges -->
          <tr>
            <td style="background:${COLORS.navyDeep}; padding:14px 28px; border-top:1px solid rgba(255,255,255,0.06);">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size:11px; color:rgba(255,255,255,0.7); letter-spacing:0.04em;">
                    <span style="color:${COLORS.trustpilot}; font-weight:700;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    <span style="color:${COLORS.white}; padding:0 4px; font-weight:700;">4.9</span>
                    Trustpilot
                  </td>
                  <td align="center" style="font-size:11px; color:rgba(255,255,255,0.7); letter-spacing:0.04em;">
                    <span style="color:${COLORS.white}; font-weight:800; letter-spacing:0.05em;">ARC</span> Accredited
                  </td>
                  <td align="right" style="font-size:11px; color:rgba(255,255,255,0.7); letter-spacing:0.04em;">
                    Florida Seller of Travel
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Legal footer -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; padding:18px 8px 0;">
          <tr>
            <td align="center" style="font-size:11px; color:${COLORS.textMuted}; line-height:1.7;">
              &copy; 2026 Derek Monti &middot; Personal Aviation Advisor<br />
              Reference ${reference} &middot; Issued ${issued}
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderTicketSubject(fields = {}, meta = {}) {
  const from = resolveLocation(fields.from);
  const to = resolveLocation(fields.to);
  const reference = meta.reference || '';
  return reference
    ? `Boarding Pass · ${reference} · ${from.code} → ${to.code}`
    : `Boarding Pass · ${from.code} → ${to.code}`;
}

export { generateReference, todayFormatted };
