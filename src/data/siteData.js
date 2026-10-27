export const contactConfig = {
  phoneLabel: '+1 (786) 706-4828',
  phoneHref: '+17867064828',
  email: 'Derek@travelbusinessclass.com',
  whatsappNumber: '17867064828',
  location: 'Miami, Florida',
  availability: '24/7 on WhatsApp',
  // Ticketing partner confirmed by the owner on 2026-10-23. Verify the accreditation
  // links on the agency's own profiles before showing badges.
  agency: {
    name: 'Travel Business Class',
    url: 'https://travelbusinessclass.com',
    accreditation: 'ARC-accredited agency',
  },
};

// TODO(owner-data): figures from CLAUDE.md, approved for publication on 2026-10-23
// until Derek supplies real numbers (savings examples, client count, response time).
export const stats = {
  savings: '15–60%',
  savingsLabel: 'below published fares',
  clients: '20+',
  clientsLabel: 'private clients',
  support: '24/7',
  supportLabel: 'on WhatsApp',
};

export const imagery = {
  derekPortrait: '/images/derek-monti.jpg',
  derekAvatar: '/images/derek-monti-160.webp',
  heroPoster: '/images/hero/cabin-poster.webp',
  heroVideo: '/videos/hero-flight.mp4',
  cabin: '/images/routes/cabin.webp',
};

export const capabilities = [
  {
    label: 'Business & First Class tickets',
    detail: 'Insider fares typically 15–60% below the published price, on 50+ airlines.',
  },
  {
    label: 'Transatlantic and worldwide',
    detail: 'US–Europe, the Middle East, Asia and multi-city trips, priced as one plan.',
  },
  {
    label: 'One advisor, start to finish',
    detail: 'You deal with Derek directly on WhatsApp, from the first quote to the e-ticket.',
  },
];

export const evaluationItems = [
  {
    number: '01',
    title: 'Schedule',
    body: 'Departure and arrival times, total journey length, and how the itinerary fits the purpose of the trip.',
  },
  {
    number: '02',
    title: 'Cabin',
    body: 'The premium experience across every segment, including where a mixed-cabin itinerary may change the value.',
  },
  {
    number: '03',
    title: 'Routing',
    body: 'Nonstop and connecting options considered alongside airport changes, connection time, and travel fatigue.',
  },
  {
    number: '04',
    title: 'Flexibility',
    body: 'Nearby dates, airports, and trip structures explored only when they make practical sense for the traveler.',
  },
  {
    number: '05',
    title: 'Fare rules',
    body: 'Change, cancellation, and ticketing conditions surfaced before a traveler decides what fits.',
  },
  {
    number: '06',
    title: 'Total trip fit',
    body: 'The final comparison balances comfort, timing, complexity, and the traveler’s stated priorities.',
  },
];

// TODO(owner-data): figures approved for publication on 2026-10-23 until Derek supplies real ones.
export const whyDerek = [
  {
    icon: 'tag',
    title: 'Insider fares',
    body: 'Consolidator contracts give me business and first class fares the airlines never publish online, typically 15–60% below the public price.',
  },
  {
    icon: 'clock',
    title: 'Last-minute seats',
    body: 'Need to fly within 48 hours? I find seats and prices when search engines show nothing, on any airline, to any destination.',
  },
  {
    icon: 'route',
    title: 'Complex itineraries',
    body: 'Multi-city, open-jaw, round-the-world and mixed-cabin trips on several airlines, built personally and priced as one plan.',
  },
  {
    icon: 'user',
    title: 'You talk to me',
    body: 'No call center and no handoff. I take the request, do the search, send the options and issue the ticket myself.',
  },
  {
    icon: 'headset',
    title: 'Support 24/7',
    body: 'Before, during and after the trip I am one WhatsApp message away, including when plans change mid-journey.',
  },
  {
    icon: 'badge',
    title: 'Trusted by 20+ clients',
    body: 'A private circle of travelers who book every long-haul trip with me and refer their friends and colleagues.',
  },
];

export const steps = [
  {
    title: 'Get in touch',
    body: 'Message me on WhatsApp or send the quick quote form with your route and dates.',
  },
  {
    title: 'Tell me what matters',
    body: 'Cabin, airlines, budget, seat preferences, fixed arrival times. I handle every detail personally.',
  },
  {
    title: 'Get real fares',
    body: 'Within hours you receive the best two or three itineraries, with the published fare next to mine.',
  },
  {
    title: 'Book and fly',
    body: 'Confirm securely, receive your e-ticket, and travel with me one message away.',
  },
];

export const discoveryLinks = [
  {
    eyebrow: 'Cabin guide',
    title: 'Business class flights',
    body: 'A practical starting point for long-haul comfort, route logic, and fare-rule questions.',
    href: '/business-class-flights',
  },
  {
    eyebrow: 'Cabin guide',
    title: 'First class flights',
    body: 'Understand where first class differs and why availability and product scope need closer review.',
    href: '/first-class-flights',
  },
  {
    eyebrow: 'Travel corridor',
    title: 'United States to Europe',
    body: 'Plan an eastbound premium journey around overnight timing, routing, and arrival priorities.',
    href: '/business-class-flights/europe',
  },
  {
    eyebrow: 'Travel corridor',
    title: 'Europe to the United States',
    body: 'Compare westbound schedules, airport choices, connections, and the full day of travel.',
    href: '/business-class-flights/usa',
  },
  {
    eyebrow: 'Service',
    title: 'Complex itineraries',
    body: 'Bring multi-city, open-jaw, and mixed-cabin trip requirements into one coherent request.',
    href: '/services/complex-itineraries',
  },
  {
    eyebrow: 'Service',
    title: 'Time-sensitive travel',
    body: 'Share the fixed constraints first so the review can focus on realistic options and tradeoffs.',
    href: '/services/last-minute-business-class',
  },
];

export const homeFaqs = [
  {
    question: 'How can I find cheap business class tickets?',
    answer:
      'The cheapest business class tickets are rarely on airline websites. I buy through consolidator contracts that give access to unpublished fares, typically 15–60% below the published price, and I show you the public fare next to mine so you can see the difference.',
  },
  {
    question: 'How much can I save with Derek compared with booking directly?',
    answer:
      'Typically 15–60% off the published business or first class fare. On a New York to London business class ticket that can mean paying around $2,600 instead of $3,570. Every quote lists the published fare next to mine.',
  },
  {
    question: 'What airlines does Derek work with?',
    answer:
      'Qatar Airways, Emirates, Turkish Airlines, Singapore Airlines, Cathay Pacific, Lufthansa, Air France, British Airways, United, American, Japan Airlines, ANA and Etihad, among others. Tickets are issued through Travel Business Class, an ARC-accredited agency.',
  },
  {
    question: 'How quickly will I receive my quote?',
    answer:
      'Usually within a few hours during the day, and the same day for most requests. Last-minute trips get priority: message me on WhatsApp and I start searching immediately.',
  },
  {
    question: 'What is included in business class on international flights?',
    answer:
      'A lie-flat seat on long-haul aircraft, priority check-in and boarding, lounge access, a full meal service and a larger baggage allowance. Products differ by airline and aircraft, so I tell you exactly which seat and cabin you get on every leg.',
  },
  {
    question: 'Is first class worth the extra cost over business class?',
    answer:
      'On airlines like Emirates, Singapore or Lufthansa, first class adds a private suite, better dining and a quieter cabin. With consolidator fares the gap between business and first is often smaller than published prices suggest, so I price both and you decide.',
  },
  {
    question: 'Does sending a request commit me to anything?',
    answer:
      'No. A quote is free and non-binding. You see the itinerary, the fare and the ticket conditions, including change and refund rules, before you decide to book.',
  },
];

export const servicesFaqs = [
  {
    question: 'How do you get business class fares below the airline price?',
    answer:
      'Through consolidator contracts: wholesale fares that airlines release to accredited agencies but do not publish online. I compare them with the public fare and send you the best two or three options.',
  },
  {
    question: 'Can you book a flight for tomorrow or this week?',
    answer:
      'Yes. Last-minute requests get priority. Send the route, the date and the number of travelers on WhatsApp and I reply the same day with seats I can ticket.',
  },
  {
    question: 'Do you handle multi-city, open-jaw or round-the-world trips?',
    answer:
      'Yes. Choose multi-city in the form and add each flight. I combine airlines and cabins where it makes sense and price the whole trip as one plan.',
  },
  {
    question: 'Who issues the ticket, and is my payment protected?',
    answer:
      'Tickets are issued through Travel Business Class, an ARC-accredited agency, so you get a standard airline e-ticket and agency protection while I handle the booking personally.',
  },
  {
    question: 'What happens after I send a request?',
    answer:
      'I check the fares on your dates, send you the options with the published price next to mine, and answer your questions. You decide whether to book; nothing is charged until you confirm.',
  },
];

export const airlines = [
  'Qatar Airways',
  'Emirates',
  'Turkish Airlines',
  'Singapore Airlines',
  'Cathay Pacific',
  'Lufthansa',
  'Air France',
  'British Airways',
  'United Airlines',
  'American Airlines',
  'Japan Airlines',
  'ANA',
  'Etihad',
];

// TODO(owner-data): example fares from CLAUDE.md 4.3, labelled as examples on the cards.
// Replace with Derek's real recent bookings (route, cabin, carriers, published vs paid, month).
const routeImage = (name, alt) => ({
  image: `/images/routes/${name}.webp`,
  imageSmall: `/images/routes/${name}-600.webp`,
  imageAlt: alt,
});

export const routeDeals = [
  { from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', cabin: 'Business', carriers: 'BA / AA / UA', published: '$3,570', derek: '$2,625', savings: 'Save up to 60%', window: '±3 days', ...routeImage('london', 'Westminster and the Thames at dusk') },
  { from: 'Chicago', fromCode: 'ORD', to: 'Rome', toCode: 'FCO', cabin: 'Business', carriers: 'UA / LH / ITA', published: '$5,060', derek: '$3,530', savings: 'Save up to 50%', window: '±3 days', ...routeImage('rome', 'The Colosseum in Rome') },
  { from: 'San Francisco', fromCode: 'SFO', to: 'Frankfurt', toCode: 'FRA', cabin: 'Business', carriers: 'LH / UA', published: '$5,550', derek: '$3,870', savings: 'Save up to 40%', window: '±3 days', ...routeImage('frankfurt', 'Frankfurt skyline') },
  { from: 'Boston', fromCode: 'BOS', to: 'Dubai', toCode: 'DXB', cabin: 'Business', carriers: 'EK / BA / QR', published: '$5,041', derek: '$3,400', savings: 'Save up to 45%', window: '±3 days', ...routeImage('dubai', 'Dubai skyline at night') },
  { from: 'Los Angeles', fromCode: 'LAX', to: 'Tokyo', toCode: 'HND', cabin: 'Business', carriers: 'JL / AA / NH', published: '$6,185', derek: '$4,200', savings: 'Save up to 40%', window: '±3 days', ...routeImage('tokyo', 'Tokyo streets at night') },
  { from: 'Miami', fromCode: 'MIA', to: 'Singapore', toCode: 'SIN', cabin: 'First Class', carriers: 'SQ / EK', published: '$12,400', derek: '$7,200', savings: 'Save up to 42%', window: '±3 days', ...routeImage('singapore', 'Singapore waterfront') },
  { from: 'New York', fromCode: 'JFK', to: 'Johannesburg', toCode: 'JNB', cabin: 'Business', carriers: 'UA / LH / ET', published: '$6,530', derek: '$4,100', savings: 'Save up to 37%', window: '±3 days', ...routeImage('johannesburg', 'Johannesburg skyline') },
  { from: 'Washington', fromCode: 'IAD', to: 'Cairo', toCode: 'CAI', cabin: 'Business', carriers: 'MS / UA / LH', published: '$4,140', derek: '$2,737', savings: 'Save up to 40%', window: '±3 days', ...routeImage('cairo', 'The pyramids of Giza') },
];

export const routeDealsNote =
  'Example fares from recent quotes. Fares change daily; your dates, cabin and airline rules determine the final price.';

export const methodology = [
  { title: 'Published fare', body: 'The public business or first class fare for similar dates, as shown on the airline website.' },
  { title: "Derek's fare", body: 'The most recent consolidator quote available to my clients for the same route and cabin.' },
  { title: 'Your saving', body: 'The difference between the two, shown as a percentage of the published fare.' },
  { title: 'Flexible dates', body: 'Fares use a ±3 day window because a day either side often changes the price; exact dates decide the final quote.' },
];

// Trust marks belong to the ticketing agency, Travel Business Class, and must be attributed to it.
// verified: true only after checking the agency's live profile (checked 2026-10-23: Google 4.9 and ARC on
// travelbusinessclass.com, BBB profile link live; Trustpilot blocked automated checks - confirm manually).
export const trustMarks = [
  { id: 'google', label: 'Google Reviews', value: '4.9 / 5', note: 'via Travel Business Class', href: 'https://travelbusinessclass.com', verified: true },
  { id: 'trustpilot', label: 'Trustpilot', value: 'Excellent', note: 'via Travel Business Class', href: 'https://www.trustpilot.com/review/travelbusinessclass.com', verified: false },
  { id: 'bbb', label: 'BBB rating', value: 'A+', note: 'Travel Business Class', href: 'https://www.bbb.org/us/fl/sunny-isles-beach/profile/travel-agency/travelbusinessclasscom-llc-0633-92036603', verified: true },
  { id: 'arc', label: 'ARC accredited', value: 'Ticketing agency', note: 'Travel Business Class', href: 'https://travelbusinessclass.com', verified: true },
];

// Real client reviews only (first name + initial, route, source). Rendered only when non-empty.
export const reviews = [];
