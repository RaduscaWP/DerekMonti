const image = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const dealImage = (id, width = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const contactConfig = {
  phoneLabel: '+1 (786) 706-4828',
  phoneHref: '+17867064828',
  email: 'Derek@travelbusinessclass.com',
  whatsappNumber: '17867064828',
  trustpilotUrl: 'https://www.trustpilot.com/review/travelbusinessclass.com',
};

export const imagery = {
  hero: dealImage('5645180', 2400),
  servicesHero: dealImage('23522837', 2400),
  aboutHero: image('photo-1569154941061-e231b4725ef1', 2400),
  cabin: image('photo-1540339832862-474599807836', 1800),
  concierge: image('photo-1551836022-d5d88e9218df', 1400),
  lounge: image('photo-1519671482749-fd09be7ccebf', 1400),
};

export const homeHeroVideo = {
  src: 'https://videos.pexels.com/video-files/29053716/12559029_2336_1080_30fps.mp4',
  poster: imagery.hero,
  alt: 'Aircraft wing flying above clouds',
};

export const siteBackdrops = {
  homeSavings: {
    src: dealImage('5645180', 2200),
    alt: 'Aircraft wing above clouds at dusk',
  },
  homeMethodology: {
    src: dealImage('11757933', 2200),
    alt: 'Modern aircraft cabin with rows of passenger seats',
  },
  homeFinalCta: {
    src: dealImage('23522837', 2200),
    alt: 'Commercial airplane preparing for departure on an airport runway',
  },
  servicesSteps: {
    src: dealImage('5645180', 2200),
    alt: 'Aircraft wing above a calm cloud layer',
  },
  servicesSavings: {
    src: dealImage('11757933', 2200),
    alt: 'Premium aircraft cabin prepared for boarding',
  },
  servicesFinalCta: {
    src: dealImage('23522837', 2200),
    alt: 'Commercial jet on an airport runway',
  },
  blogHero: {
    src: dealImage('11757933', 2200),
    alt: 'Premium aircraft cabin interior',
  },
  aboutFinalCta: {
    src: dealImage('23522837', 2200),
    alt: 'Airplane flying through a sunset sky',
  },
  articleCta: {
    src: dealImage('5645180', 2200),
    alt: 'Aircraft wing over clouds during a long-haul flight',
  },
};

export const homeBackdrops = {
  savings: siteBackdrops.homeSavings,
  methodology: siteBackdrops.homeMethodology,
  finalCta: siteBackdrops.homeFinalCta,
};

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

export const routeDeals = [
  {
    from: 'New York',
    fromCode: 'JFK',
    to: 'London',
    toCode: 'LHR',
    cabin: 'Business',
    carriers: 'BA/AA/UA',
    published: '$3,570',
    derek: '$2,625',
    savings: 'Saved up to 60%',
    flexibleWindow: '+/- 2 days',
    note: 'Based on a recent quote',
    image: dealImage('460672'),
    advisorNote: {
      title: 'Why Derek would audit it',
      points: ['Check nonstop vs. one-stop tradeoff', 'Compare aircraft and seat layout', 'Confirm fare rules before ticketing'],
      cta: 'Ask Derek to audit this route',
    },
  },
  {
    from: 'Chicago',
    fromCode: 'ORD',
    to: 'Rome',
    toCode: 'FCO',
    cabin: 'Business',
    carriers: 'UA/LH/ITA',
    published: '$5,060',
    derek: '$3,530',
    savings: 'Saved up to 50%',
    flexibleWindow: '+/- 4 days',
    note: 'Flexible dates shown',
    image: dealImage('2064827'),
    advisorNote: {
      title: 'Where the value usually appears',
      points: ['Test nearby date windows', 'Compare Lufthansa and ITA routing', 'Avoid weak overnight connections'],
      cta: 'Have Derek review the options',
    },
  },
  {
    from: 'San Francisco',
    fromCode: 'SFO',
    to: 'Frankfurt',
    toCode: 'FRA',
    cabin: 'Business',
    carriers: 'LH/UA',
    published: '$5,550',
    derek: '$3,870',
    savings: 'Saved up to 40%',
    flexibleWindow: '+/- 1 day',
    note: 'Comparable itinerary',
    image: dealImage('109629'),
    advisorNote: {
      title: 'What Derek checks first',
      points: ['Verify the operating aircraft', 'Protect the long-haul cabin quality', 'Compare rules against public fares'],
      cta: 'Ask for a fare audit',
    },
  },
  {
    from: 'Boston',
    fromCode: 'BOS',
    to: 'Dubai',
    toCode: 'DXB',
    cabin: 'Business',
    carriers: 'EK/BA/QR',
    published: '$5,041',
    derek: '$3,400',
    savings: 'Saved up to 45%',
    flexibleWindow: '+/- 5 days',
    note: 'Recent client quote',
    image: dealImage('3787839'),
    advisorNote: {
      title: 'How Derek keeps it practical',
      points: ['Balance savings against travel time', 'Check Emirates and Qatar options', 'Review change and refund rules'],
      cta: 'Get Derek to compare it',
    },
  },
  {
    from: 'Los Angeles',
    fromCode: 'LAX',
    to: 'Tokyo',
    toCode: 'HND',
    cabin: 'Business',
    carriers: 'JL/AA/NH',
    published: '$6,185',
    derek: '$4,200',
    savings: 'Saved up to 40%',
    flexibleWindow: '+/- 4 days',
    note: 'Sample routing',
    image: dealImage('2506923'),
    advisorNote: {
      title: 'What matters on this route',
      points: ['Check Japan Airlines and ANA aircraft', 'Avoid unnecessary domestic positioning', 'Compare arrival time comfort'],
      cta: 'Ask Derek about this fare',
    },
  },
  {
    from: 'Miami',
    fromCode: 'MIA',
    to: 'Singapore',
    toCode: 'SIN',
    cabin: 'First Class',
    carriers: 'SQ/EK',
    published: '$12,400',
    derek: '$7,200',
    savings: 'Saved up to 42%',
    flexibleWindow: '+/- 6 days',
    note: 'Premium cabin sample',
    image: dealImage('777059'),
    advisorNote: {
      title: 'First class needs extra scrutiny',
      points: ['Confirm true first class availability', 'Check lounge and ground benefits', 'Protect the long-haul experience'],
      cta: 'Have Derek qualify it',
    },
  },
  {
    from: 'New York',
    fromCode: 'JFK',
    to: 'Johannesburg',
    toCode: 'JNB',
    cabin: 'Business',
    carriers: 'UA/LH/ET',
    published: '$6,530',
    derek: '$4,100',
    savings: 'Saved up to 37%',
    flexibleWindow: '+/- 2 days',
    note: 'Subject to inventory',
    image: dealImage('1058759'),
    advisorNote: {
      title: 'Where Derek adds judgement',
      points: ['Compare connection risk', 'Check partner airline consistency', 'Watch ticketing deadlines closely'],
      cta: 'Ask for route guidance',
    },
  },
  {
    from: 'Washington',
    fromCode: 'IAD',
    to: 'Cairo',
    toCode: 'CAI',
    cabin: 'Business',
    carriers: 'MS/UA/LH',
    published: '$4,140',
    derek: '$2,737',
    savings: 'Saved up to 40%',
    flexibleWindow: '+/- 5 days',
    note: 'Based on real booking logic',
    image: dealImage('262786'),
    advisorNote: {
      title: 'How to avoid a weak fare',
      points: ['Confirm mixed-cabin exposure', 'Review EgyptAir and partner options', 'Check stop length against savings'],
      cta: 'Let Derek audit the fare',
    },
  },
];

export const serviceDeals = [
  { ...routeDeals[0], derek: '$2,200' },
  { ...routeDeals[1], derek: '$3,100' },
  { ...routeDeals[4], derek: '$4,000' },
  { ...routeDeals[5], to: 'Dubai', toCode: 'DXB', derek: '$7,800', image: routeDeals[3].image },
];

export const whyDerek = [
  {
    title: 'Exclusive Deals',
    body: 'Derek accesses insider fares through consolidator partners, often 15-60% below published premium cabin pricing.',
  },
  {
    title: 'Last Minute Bookings',
    body: 'Need to fly within 48 hours? Derek works the options personally when search engines look exhausted.',
  },
  {
    title: 'Complex Itineraries',
    body: 'Multi-city, open-jaw, mixed cabin, and multi-airline routing built around the way you actually travel.',
  },
  {
    title: 'Personal Attention',
    body: 'You deal with Derek directly. No queue, no generic desk, no handoff after the quote.',
  },
  {
    title: '24/7 Support',
    body: 'Before departure, during the trip, and when plans change, Derek remains reachable through WhatsApp.',
  },
  {
    title: 'Trusted by Clients',
    body: 'A focused network of repeat travelers returns because the service feels human and the pricing holds up.',
  },
];

export const services = [
  {
    title: 'Business Class Deals',
    badge: '15-60% Savings',
    description: 'Private access to business class fares for long-haul routes without sacrificing routing quality.',
    example: 'New York to London - lie-flat business - flexible dates',
  },
  {
    title: 'First Class Access',
    badge: 'Private Suites',
    description: 'High-touch sourcing for Emirates, Singapore, Etihad, and other true first class experiences.',
    example: 'Miami to Dubai - first class - chauffeur and lounge eligible fares',
  },
  {
    title: 'Complex Itineraries',
    badge: 'Multi-City',
    description: 'Open-jaw, round-the-world, and mixed cabin trips built by a person who reads the fare rules.',
    example: 'London to Tokyo to Sydney to New York - four cities, five flights',
  },
  {
    title: 'Last Minute Bookings',
    badge: 'Any Timeline',
    description: 'Same-week international travel support when mainstream booking tools show thin availability.',
    example: '48-hour departure windows - business or first - any destination',
  },
];

export const extraServices = [
  {
    label: 'Private fare logic',
    storyLabel: 'Traveler finds a fare',
    title: 'Private Fare Playbook',
    activeSummary: 'Derek turns a confusing premium fare search into a clear decision path.',
    body:
      'Derek explains date windows, airline tradeoffs, routing choices, and fare rules before you spend time searching or committing.',
    outcome: 'Best for travelers who want the strategy behind the quote.',
    checklist: ['Date windows that actually matter', 'Airline and routing tradeoffs', 'Fare rules worth reading twice'],
  },
  {
    label: 'Route audit',
    storyLabel: 'Derek audits the details',
    title: 'Route & Aircraft Audit',
    activeSummary: 'Send the option you found and Derek checks whether it is truly worth booking.',
    body:
      'Send Derek an option you found online. He checks the aircraft, cabin quality, connection risk, ticket rules, and better alternatives.',
    outcome: 'Useful before paying for a premium fare that may not feel premium.',
    checklist: ['Aircraft and seat quality', 'Connection risk and timing', 'Cleaner alternatives if the fare is weak'],
  },
  {
    label: 'Booking confidence',
    storyLabel: 'You decide with confidence',
    title: 'Self-Booking Guidance',
    activeSummary: 'If you prefer to book yourself, Derek gives you the practical guardrails first.',
    body:
      'For clients who prefer to book themselves, Derek gives a clear path so you avoid weak routings, hidden fees, or cabin surprises.',
    outcome: 'Guidance first. Booking support if you want Derek to take over.',
    checklist: ['Steps before final checkout', 'Rules and fees to verify', 'When to let Derek take over'],
  },
];

export const methodology = [
  {
    title: 'Published Fare',
    body: 'A snapshot of publicly available premium cabin fares for comparable dates and routings.',
  },
  {
    title: "Derek's Fare",
    body: 'The most recent quote sourced through consolidator channels available to Derek clients.',
  },
  {
    title: 'Your Savings',
    body: 'The difference between the public fare and Derek quote, shown as a practical percentage.',
  },
  {
    title: 'Flexible Dates',
    body: 'The date window expands or tightens by route, usually from +/- 1 to +/- 6 days, when it improves value.',
  },
];

export const steps = [
  {
    title: 'Get in Touch',
    body: 'Send Derek a WhatsApp message or submit a quote request.',
  },
  {
    title: 'Share Your Needs',
    body: 'Destination, dates, cabin, budget, and preferences are reviewed personally.',
  },
  {
    title: 'Check Your Inbox',
    body: 'Derek sends the best matching itineraries at insider fares.',
  },
  {
    title: 'Book and Fly',
    body: 'Confirm securely, receive your e-ticket, and travel with support behind you.',
  },
];

export const reviews = [
  {
    title: 'The only way I book long-haul now',
    body: 'Derek found a business class seat to Tokyo for less than I expected to pay in premium economy. Fast, calm, and completely transparent.',
    name: 'Michael R.',
    date: '2 months ago',
  },
  {
    title: 'Booked in three hours',
    body: 'I had a last-minute London trip and Derek handled the whole thing before dinner. The fare was better than anything I found myself.',
    name: 'Sarah T.',
    date: '1 month ago',
  },
  {
    title: 'Personal service that actually feels personal',
    body: 'Derek remembered my aisle preference, connection limits, and airline priorities. That level of care is rare.',
    name: 'James K.',
    date: '3 weeks ago',
  },
];

export const homeFaqs = [
  {
    question: 'How does Derek find lower business class fares?',
    answer:
      'Derek searches consolidator fare channels, unpublished fare classes, and flexible routing options that are not always visible on public booking engines.',
  },
  {
    question: 'Are these real tickets with major airlines?',
    answer:
      'Yes. Quotes are for real airline tickets, subject to availability, fare rules, and ticketing deadlines at the moment Derek confirms them.',
  },
  {
    question: 'Can Derek help with first class?',
    answer:
      'Yes. First class support is available for select routes and airlines, especially long-haul international travel.',
  },
  {
    question: 'How quickly will I receive options?',
    answer:
      'Most quote requests receive an initial response within hours. Urgent requests should be sent through WhatsApp.',
  },
];

export const servicesFaqs = [
  {
    question: "What is the difference between a published fare and Derek's fare?",
    answer:
      'A published fare is visible publicly. Derek fares come from negotiated or consolidator inventory and may have different rules, availability, or booking windows.',
  },
  {
    question: 'Can Derek book flights within 24-48 hours?',
    answer:
      'Often, yes. Last-minute availability depends on route, cabin, airline inventory, and how flexible your dates or connections can be.',
  },
  {
    question: 'Do you handle multi-stop international itineraries?',
    answer:
      'Yes. Derek can build multi-city, open-jaw, mixed cabin, and multi-airline trips that standard searches often price poorly.',
  },
  {
    question: 'Which airlines does Derek work with?',
    answer:
      'Derek can quote across many leading international carriers including Qatar, Emirates, Turkish, Singapore, Cathay Pacific, Lufthansa, Air France, British Airways, United, American, ANA, JAL, and Etihad.',
  },
  {
    question: 'How do I submit a booking request?',
    answer:
      'Use the quote form or WhatsApp Derek with your origin, destination, dates, cabin preference, passenger count, and timing.',
  },
  {
    question: 'What happens if I need to change or cancel?',
    answer:
      'Derek will explain the fare rules before ticketing and help with changes or cancellations according to the airline and ticket conditions.',
  },
];

export const timeline = [
  {
    year: '2010',
    title: 'Aviation foundation',
    body: 'Derek begins learning the premium travel market and how consolidator fare access works behind the scenes.',
  },
  {
    year: '2014',
    title: 'Partner network',
    body: 'Early airline and ticketing relationships turn into a practical network for unpublished premium cabin options.',
  },
  {
    year: '2018',
    title: 'Personal clients',
    body: 'Derek starts serving individual travelers directly, building long-term relationships instead of one-off transactions.',
  },
  {
    year: '2022',
    title: 'Repeat referrals',
    body: 'A compact client base grows through referrals from travelers who value direct access and calm support.',
  },
  {
    year: '2026',
    title: 'Personal brand',
    body: 'The Derek Monti site brings his private advisory model online for a wider international audience.',
  },
];

export const values = [
  {
    title: 'Trust',
    body: 'Every quote is honest, transparent, and based on real availability. No hidden surprises.',
  },
  {
    title: 'Speed',
    body: 'Derek respects timing. Urgent requests are handled with the pace premium travel demands.',
  },
  {
    title: 'Personalization',
    body: 'Dates, cabins, stops, airline preference, budget, and comfort all shape the recommendation.',
  },
];

export const blogPosts = [
  {
    slug: 'why-travelers-overpay-business-class',
    title: 'Why Some Travelers Keep Overpaying for Business Class',
    category: 'Business Class Tips',
    date: 'May 5, 2026',
    readTime: '15 min read',
    excerpt: 'The public fare is only one version of the market. Here is why premium cabin pricing moves differently.',
    image: image('photo-1500530855697-b586d89ba3ee', 1100),
    body: [
      {
        heading: 'Public prices are not the whole market',
        text: 'Business class pricing changes quickly and not every fare appears in the same channel. Consolidator inventory, routing combinations, fare rules, and flexible dates can create meaningful differences.',
      },
      {
        heading: 'The expensive option is often the easiest to find',
        text: 'Most travelers search one route, one date, and one booking engine. Derek looks at the trip like an advisor: route, timing, cabin quality, connection comfort, and ticket rules together.',
      },
      {
        heading: 'A better quote needs context',
        text: 'The more Derek knows about your priorities, the better he can balance comfort and savings. A flexible return date or preferred connection city can change the fare completely.',
      },
    ],
  },
  {
    slug: 'business-class-service-beyond-seat',
    title: 'The Part of Business Class Travel That Has Nothing to Do With the Seat',
    category: 'Travel Hacks',
    date: 'May 2, 2026',
    readTime: '11 min read',
    excerpt: 'Comfort begins before boarding. Better booking support can change the entire trip.',
    image: image('photo-1519671482749-fd09be7ccebf', 1100),
    body: [
      {
        heading: 'The seat is only one layer',
        text: 'A premium cabin can still feel stressful if the routing is awkward, the fare rules are unclear, or no one is available when plans change.',
      },
      {
        heading: 'A human advisor protects the trip',
        text: 'Derek helps interpret options, check tradeoffs, and respond when timing changes. That support is part of the value.',
      },
    ],
  },
  {
    slug: 'hidden-business-class-deals',
    title: "Hidden Business Class Deals: How to Find What Airlines Do Not Advertise",
    category: 'Business Class Tips',
    date: 'April 27, 2026',
    readTime: '9 min read',
    excerpt: 'Unpublished options are not magic. They come from fare access, timing, routing, and experience.',
    image: image('photo-1529074963764-98f45c47344b', 1100),
    body: [
      {
        heading: 'Hidden does not mean risky',
        text: 'The best private fares are still legitimate airline tickets. The difference is access, timing, and fare construction.',
      },
      {
        heading: 'Flexibility creates leverage',
        text: 'A one-day shift, nearby airport, or better connection can unlock better pricing without lowering the cabin experience.',
      },
    ],
  },
  {
    slug: 'tokyo-vs-singapore-first-class',
    title: 'Tokyo vs. Singapore: Which First Class Experience Is Worth More?',
    category: 'Destination Guides',
    date: 'April 21, 2026',
    readTime: '13 min read',
    excerpt: 'Two iconic premium routes, very different expectations. Here is how to think about the value.',
    image: image('photo-1540959733332-eab4deabeeaf', 1100),
    body: [
      {
        heading: 'Value depends on the whole routing',
        text: 'First class value is shaped by aircraft, lounge access, schedule, route length, and whether the aircraft has a true suite.',
      },
      {
        heading: 'Do not pay for the wrong luxury',
        text: 'Derek compares the full experience, not only the brand name, so the fare matches what you actually care about.',
      },
    ],
  },
  {
    slug: 'last-minute-business-class',
    title: 'Last Minute Business Class: Is It Actually Possible to Score Good Fares?',
    category: 'Travel Hacks',
    date: 'April 18, 2026',
    readTime: '7 min read',
    excerpt: 'Sometimes yes, sometimes no. The answer depends on inventory, rules, and how fast you can decide.',
    image: image('photo-1569154941061-e231b4725ef1', 1100),
    body: [
      {
        heading: 'Last minute does not always mean impossible',
        text: 'Premium cabin inventory can open and close quickly. Derek checks options that a broad public search may miss.',
      },
      {
        heading: 'Speed matters',
        text: 'When a good fare appears close to departure, it may not hold. Clear requirements and quick confirmation help.',
      },
    ],
  },
  {
    slug: 'top-business-class-airlines-2026',
    title: 'My Top 5 Business Class Airlines for Long-Haul Flights in 2026',
    category: "Derek's Picks",
    date: 'April 10, 2026',
    readTime: '10 min read',
    excerpt: 'Derek looks at seat, service, routing, lounge access, and fare value together.',
    image: image('photo-1512453979798-5ea266f8880c', 1100),
    body: [
      {
        heading: 'A great airline still needs the right aircraft',
        text: 'Business class quality can vary by plane and route. Derek checks the actual operating aircraft before recommending an option.',
      },
      {
        heading: 'The best fare is balanced',
        text: 'A strong business class deal should save money without adding exhausting connections or weak fare rules.',
      },
    ],
  },
  {
    slug: 'emirates-vs-qatar-first-class',
    title: 'Emirates vs. Qatar: A First Class Showdown',
    category: 'Destination Guides',
    date: 'April 4, 2026',
    readTime: '12 min read',
    excerpt: 'Private suites, service style, lounges, and fare access all matter.',
    image: image('photo-1512453979798-5ea266f8880c', 1100),
    body: [
      {
        heading: 'The brand is only the beginning',
        text: 'First class products differ by aircraft and route. The right pick depends on what matters most to the traveler.',
      },
      {
        heading: 'Fare rules still matter in luxury cabins',
        text: 'Even high-end tickets can have restrictions. Derek reviews rules before a client commits.',
      },
    ],
  },
  {
    slug: 'how-consolidator-fares-work',
    title: 'How Consolidator Fares Work and Why Most Travelers Never Access Them',
    category: 'Business Class Tips',
    date: 'March 29, 2026',
    readTime: '8 min read',
    excerpt: 'A simple explanation of the private fare channels behind many premium cabin savings.',
    image: image('photo-1540339832862-474599807836', 1100),
    body: [
      {
        heading: 'Consolidator fares are relationship driven',
        text: 'They depend on channel access, inventory, fare rules, and timing. Derek translates those moving parts into usable options.',
      },
      {
        heading: 'Savings vary for honest reasons',
        text: 'Route, season, cabin demand, advance purchase, and ticket rules all affect the final quote.',
      },
    ],
  },
];
