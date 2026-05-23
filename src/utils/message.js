import { contactConfig } from '../data/siteData.js';

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return value || 'Not provided';
  return `${match[2]}/${match[3]}/${match[1]}`;
}

export function buildQuoteMessage(fields) {
  const requestTitle = fields.requestTitle || 'Business & First Class Flight Quote Request';
  const lines = [
    requestTitle,
    fields.source ? `Source: ${fields.source}` : null,
    `Trip type: ${fields.tripType || 'Round trip'}`,
    `From: ${fields.from || 'Not provided'}`,
    `To: ${fields.to || 'Not provided'}`,
    `Departure: ${formatDate(fields.departure)}`,
    `Return: ${formatDate(fields.returnDate)}`,
    `Passengers: ${fields.passengers || '1'}`,
    `Cabin: ${fields.cabin || 'Business'}`,
    fields.name ? `Name: ${fields.name}` : null,
    fields.email ? `Email: ${fields.email}` : null,
    fields.phone ? `Phone Number: ${fields.phone}` : null,
    fields.notes ? `Notes: ${fields.notes}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

export function getMailto(fields) {
  const subject = encodeURIComponent(fields.requestTitle || 'Business & First Class Flight Quote Request');
  const body = encodeURIComponent(buildQuoteMessage(fields));
  return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
}

export function getWhatsappUrl(fields = {}) {
  const text = encodeURIComponent(buildQuoteMessage(fields));
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${text}`;
}
