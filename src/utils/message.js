import { contactConfig } from '../data/siteData.js';
import {
  getCabinLabel,
  getContactPreferenceLabel,
  getFlexibilityLabel,
  getItineraryLegs,
  getTripTypeLabel,
  normalizeTripType,
} from './quoteRequest.js';

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return value || 'Not provided';
  return `${match[2]}/${match[3]}/${match[1]}`;
}

function hasQuoteDetails(fields) {
  return Boolean(
    fields?.from ||
      fields?.to ||
      fields?.departure ||
      fields?.fullName ||
      fields?.email ||
      fields?.phone ||
      fields?.notes ||
      fields?.legs?.some((leg) => leg.from || leg.to || leg.departure),
  );
}

export function buildQuoteMessage(fields = {}) {
  if (!hasQuoteDetails(fields)) {
    return 'Hi Derek, I would like help planning a business or first class trip.';
  }

  const requestTitle = fields.requestTitle || 'Premium Flight Review Request';
  const tripType = normalizeTripType(fields.tripType);
  const legs = getItineraryLegs(fields);
  const lines = [
    requestTitle,
    fields.source ? `Source: ${fields.source}` : null,
    `Trip type: ${getTripTypeLabel(tripType)}`,
  ];

  if (tripType === 'multi_city') {
    lines.push('Itinerary:');
    legs.forEach((leg, index) => {
      lines.push(
        `Flight ${index + 1}: ${leg.from || 'Origin not provided'} to ${leg.to || 'destination not provided'} - ${formatDate(leg.departure)}`,
      );
    });
  } else {
    lines.push(
      `From: ${fields.from || 'Not provided'}`,
      `To: ${fields.to || 'Not provided'}`,
      `Departure: ${formatDate(fields.departure)}`,
      `Return: ${tripType === 'one_way' ? 'Not applicable' : formatDate(fields.returnDate)}`,
    );
  }

  lines.push(
    `Travelers: ${fields.travelers || 1}`,
    `Cabin: ${getCabinLabel(fields.cabin)}`,
    `Date flexibility: ${getFlexibilityLabel(fields.flexibility)}`,
    fields.fullName ? `Name: ${fields.fullName}` : null,
    fields.email ? `Email: ${fields.email}` : null,
    fields.phone ? `Phone or WhatsApp: ${fields.phone}` : null,
    `Preferred contact: ${getContactPreferenceLabel(fields.contactPreference)}`,
    fields.notes ? `Notes: ${fields.notes}` : null,
  );

  return lines.filter(Boolean).join('\n');
}

export function getMailto(fields = {}) {
  const subject = encodeURIComponent(fields.requestTitle || 'Premium Flight Review Request');
  const body = encodeURIComponent(buildQuoteMessage(fields));
  return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
}

export function getWhatsappUrl(fields = {}) {
  const text = encodeURIComponent(buildQuoteMessage(fields));
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${text}`;
}
