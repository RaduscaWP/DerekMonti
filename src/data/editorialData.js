export const editorialImages = {
  london: { image: '/images/editorial/london.webp', alt: 'The River Thames and Westminster in London at dusk.' },
  tokyo: { image: '/images/editorial/tokyo.webp', alt: 'The Tokyo skyline in the warm light of sunset.' },
  rome: { image: '/images/editorial/rome.webp', alt: 'The rooftops of Rome in the evening light.' },
  newYork: { image: '/images/editorial/new-york.webp', alt: 'The Manhattan skyline across the water.' },
};

export const articleVisuals = {
  'why-travelers-overpay-business-class': editorialImages.london,
  'business-class-service-beyond-seat': { image: '/images/homepage/comfort-rested.webp', alt: 'An illustrative business-class seat with a blanket and extended leg rest.' },
  'last-minute-business-class': editorialImages.newYork,
};

// These are trip-planning starting points, not offers or flight availability.
export const selectedJourneys = [
  { id: 'london', city: 'London', country: 'United Kingdom', from: 'New York (JFK)', to: 'London (LHR)', fromCode: 'JFK', toCode: 'LHR', label: 'Across the Atlantic', detail: 'The overnight journey. The arrival that follows.', description: 'Start with when you need to arrive, then compare the cabin, connection and room to rest.', hub: '/business-class-flights/europe', ...editorialImages.london },
  { id: 'new-york', city: 'New York', country: 'United States', from: 'London (LHR)', to: 'New York (JFK)', fromCode: 'LHR', toCode: 'JFK', label: 'A different direction', detail: 'A city arrival, shaped around your plans.', description: 'Bring the commitments on the other side of the journey into the conversation from the start.', hub: '/business-class-flights/usa', ...editorialImages.newYork },
  { id: 'rome', city: 'Rome', country: 'Italy', from: 'Chicago (ORD)', to: 'Rome (FCO)', fromCode: 'ORD', toCode: 'FCO', label: 'More than one destination', detail: 'One trip. Room for another chapter.', description: 'A return from another city or several connected stops can be considered in the same brief.', hub: '/services/complex-itineraries', ...editorialImages.rome },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', from: 'Los Angeles (LAX)', to: 'Tokyo (HND)', fromCode: 'LAX', toCode: 'HND', label: 'A longer journey', detail: 'Consider every part of the travel day.', description: 'Compare the full itinerary: the time in transit, the cabin on each segment, and the arrival.', hub: '/business-class-flights', ...editorialImages.tokyo },
];
