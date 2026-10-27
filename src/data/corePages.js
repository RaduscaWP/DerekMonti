import { corePagesCopy } from './corePagesCopy.js';

const SITE_ORIGIN = 'https://www.flywithderek.com';

const absoluteUrl = (path) => `${SITE_ORIGIN}${path}`;

function createBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function createServiceSchema({ name, description, path, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: {
      '@type': 'Person',
      name: 'Derek Monti',
    },
  };
}

function definePage(source) {
  // Conversion copy lives in corePagesCopy.js; the page definition keeps routing, SEO and schema.
  const page = { ...source, ...(corePagesCopy[source.id] || {}) };
  const canonical = absoluteUrl(page.path);

  return {
    ...page,
    canonical,
    indexable: page.approvedForIndexing === true,
    metadata: {
      title: page.title,
      description: page.description,
      canonical,
      openGraph: {
        type: 'website',
        siteName: 'Fly with Derek',
        title: page.title,
        description: page.description,
        url: canonical,
      },
      twitter: {
        card: 'summary',
        title: page.title,
        description: page.description,
      },
    },
    schema: [
      createServiceSchema({
        name: page.schemaName,
        description: page.description,
        path: page.path,
        serviceType: page.serviceType,
      }),
      createBreadcrumbSchema(page.breadcrumbs),
    ],
  };
}

export const corePages = [
  definePage({
    approvedForIndexing: true,
    id: 'business-class-flights',
    path: '/business-class-flights',
    title: 'Cheap Business Class Flights & Tickets | Fly with Derek',
    description:
      'Discounted business class tickets on major airlines, typically 15–60% below published fares. Derek quotes personally within hours. WhatsApp 24/7.',
    schemaName: 'Discounted Business Class Flights',
    serviceType: 'Business class ticket sourcing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Business Class Flights', path: '/business-class-flights' },
    ],
    eyebrow: 'Business Class Flights',
    h1: 'Cheap business class flights, sourced personally',
    heroSummary:
      'I find business class tickets through consolidator fares that airline websites never show. Send me your route and dates; I reply with real options, usually the same day.',
    heroPoints: ['Lie-flat seats on major airlines', 'Published fare vs my fare, side by side', 'Ticket rules explained before you book'],
    introTitle: 'A useful option is more than a cabin label',
    intro: [
      'Business class products and ticket conditions can differ across an itinerary. A personal review keeps the decision focused on the parts that affect the complete journey, not one feature in isolation.',
      'The request can be simple or detailed. Dates, preferred airports, connection tolerance, traveler count, and cabin priorities help Derek understand which tradeoffs deserve attention.',
    ],
    audienceTitle: 'Requests this page is designed to support',
    audience: [
      {
        title: 'Long-haul comfort decisions',
        body: 'For travelers weighing rest, privacy, working space, arrival timing, and the overall cabin experience.',
      },
      {
        title: 'One-stop and nonstop comparisons',
        body: 'For trips where connection quality, total journey shape, and airport choice matter alongside the cabin.',
      },
      {
        title: 'Flexible or multi-airport trips',
        body: 'For travelers who can adjust dates or airports and want the consequences explained clearly.',
      },
    ],
    evaluationTitle: 'What Derek evaluates',
    evaluationIntro:
      'The review is organized around practical decisions that can be checked for the specific request.',
    evaluation: [
      { title: 'Cabin fit', body: 'Whether the proposed cabin and seat context match the traveler\'s priorities.' },
      { title: 'Route logic', body: 'How stops, airports, and the sequence of flights shape the complete journey.' },
      { title: 'Timing', body: 'Whether departure, arrival, and connection timing fit the purpose of the trip.' },
      { title: 'Flexibility', body: 'Which date or airport preferences are firm and which can be adjusted.' },
      { title: 'Ticket conditions', body: 'The change, cancellation, and other conditions presented with a specific option.' },
      { title: 'Trip fit', body: 'How the available details work together for this traveler and this journey.' },
    ],
    limitationsTitle: 'What to expect from a request',
    limitations: [
      'Submitting the form starts an itinerary review; it does not create a reservation or hold a seat.',
      'Cabins, routes, and flight availability can change and must be confirmed for the requested dates.',
      'Fly with Derek is an independent advisory service and is not an airline or an airline website.',
    ],
    process: [
      { title: 'Share your trip', body: 'Provide the route, dates, traveler count, cabin preference, and the priorities that matter most.' },
      { title: 'Derek reviews the request', body: 'The itinerary is considered across cabin, timing, routing, flexibility, and ticket conditions.' },
      { title: 'Review the tradeoffs', body: 'Consider the relevant options and decide which combination best fits the journey.' },
    ],
    faqs: [
      {
        question: 'What should I include in a business class request?',
        answer:
          'Include origin, destination, preferred dates, traveler count, cabin preference, and any firm limits on connections or airports. You can also note which parts of the experience matter most.',
      },
      {
        question: 'Can I request a one-way or multi-city itinerary?',
        answer:
          'Yes. The request can describe a return, one-way, open-jaw, or multi-city journey. Complex trips benefit from listing each required stop and any fixed dates.',
      },
      {
        question: 'Does submitting a request reserve a seat?',
        answer:
          'No. A request begins a review. Any flight, cabin, ticket condition, and availability must be confirmed before a traveler decides whether to proceed.',
      },
      {
        question: 'Is Fly with Derek an airline?',
        answer:
          'No. I am a personal flight advisor, and your tickets are issued through Travel Business Class, an ARC-accredited agency. You get agency protection with one person handling your trip.',
      },
    ],
    related: [
      {
        path: '/business-class-flights/europe',
        label: 'US to Europe planning',
        description: 'Consider west-to-east transatlantic business class requests.',
      },
      {
        path: '/business-class-flights/usa',
        label: 'Europe to USA planning',
        description: 'Consider east-to-west transatlantic business class requests.',
      },
      {
        path: '/services/complex-itineraries',
        label: 'Complex itineraries',
        description: 'Organize multi-city, open-jaw, and mixed-priority trips.',
      },
      {
        path: '/first-class-flights',
        label: 'First class planning',
        description: 'Understand the narrower scope of international first class.',
      },
    ],
  }),

  definePage({
    approvedForIndexing: true,
    id: 'first-class-flights',
    path: '/first-class-flights',
    title: 'First Class Flight Deals | Discounted Tickets by Derek',
    description:
      'First class tickets on Emirates, Qatar, Lufthansa, British Airways and more at insider prices. Personal quotes from Derek Monti within hours.',
    schemaName: 'First Class Flight Deals',
    serviceType: 'First class ticket sourcing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'First Class Flights', path: '/first-class-flights' },
    ],
    eyebrow: 'First Class Flights',
    h1: 'First class flight deals most travelers never see',
    heroSummary:
      'Private suites and lie-flat first class cabins at consolidator prices. Tell me where you are flying; I check what is actually available on your dates and what it costs.',
    heroPoints: ['Private suites and lie-flat cabins', 'Real availability on your dates', 'Business vs first, priced both ways'],
    introTitle: 'The label alone does not define the experience',
    intro: [
      'International first class has a narrower and more variable footprint than business class. The relevant question is not simply whether a first class label appears, but what the specific itinerary includes and whether it supports the traveler\'s priorities.',
      'A request should identify the desired route, dates, traveler count, and the aspects of the journey that matter most. Derek can then frame the available information without implying that a product exists where it does not.',
    ],
    audienceTitle: 'When a first class review is useful',
    audience: [
      {
        title: 'Product-specific travelers',
        body: 'For travelers who care about a particular seat, privacy level, ground experience, or service characteristic.',
      },
      {
        title: 'Mixed-itinerary decisions',
        body: 'For journeys where first class may appear on only part of the trip and continuity needs to be understood.',
      },
      {
        title: 'Business versus first class',
        body: 'For travelers deciding whether the specific product differences matter for their journey.',
      },
    ],
    evaluationTitle: 'What Derek evaluates',
    evaluationIntro:
      'The review stays tied to the product and itinerary that can be confirmed for the request.',
    evaluation: [
      { title: 'Actual product', body: 'The cabin and product identified for each relevant flight segment.' },
      { title: 'Itinerary continuity', body: 'Where the cabin changes across connections or separate journey segments.' },
      { title: 'Ground experience', body: 'Which pre-flight or arrival elements are stated for the specific option.' },
      { title: 'Journey length and timing', body: 'Whether the flight sequence gives the product meaningful use within the trip.' },
      { title: 'Ticket conditions', body: 'The conditions attached to the specific option before any decision is made.' },
      { title: 'Alternative fit', body: 'Whether a business class option may better match the traveler\'s stated priorities.' },
    ],
    limitationsTitle: 'First class availability requires confirmation',
    limitations: [
      'First class does not operate on every route, flight, airline, or aircraft, and products can change.',
      'Submitting a request does not reserve a cabin, hold a seat, or guarantee a particular product.',
      'Fly with Derek is independent and does not represent or speak for any airline.',
    ],
    process: [
      { title: 'Describe the experience', body: 'Share the route, dates, traveler count, and the first class qualities that matter to you.' },
      { title: 'Derek reviews the scope', body: 'The stated product, itinerary continuity, timing, and ticket conditions are considered together.' },
      { title: 'Compare the fit', body: 'Review the first class option alongside relevant alternatives and decide what suits the journey.' },
    ],
    faqs: [
      {
        question: 'Is first class available on every international route?',
        answer:
          'No. First class has a limited and changing footprint. Availability, aircraft, and product details must be confirmed for the specific route and dates.',
      },
      {
        question: 'Can an itinerary mix first class and business class?',
        answer:
          'It can. When cabins differ by segment, the review should make those changes clear so the traveler understands the complete itinerary.',
      },
      {
        question: 'How is first class compared with business class?',
        answer:
          'The comparison can consider the stated seat and cabin, privacy, ground experience, journey length, itinerary continuity, and ticket conditions. The relevant differences depend on the specific flights.',
      },
      {
        question: 'Does Fly with Derek have an airline affiliation?',
        answer:
          'I am not affiliated with any airline. I buy through consolidator contracts and issue tickets through Travel Business Class, an ARC-accredited agency, which is how the fares come in below published prices.',
      },
    ],
    related: [
      {
        path: '/business-class-flights',
        label: 'Business class guidance',
        description: 'Review business class cabin and itinerary tradeoffs.',
      },
      {
        path: '/services/premium-flight-advisor',
        label: 'Premium flight advisor',
        description: 'See how a personal itinerary review is structured.',
      },
      {
        path: '/services/complex-itineraries',
        label: 'Complex itineraries',
        description: 'Clarify cabin continuity across a multi-part journey.',
      },
      {
        path: '/blog',
        label: 'Travel guides',
        description: 'Browse current educational articles from Fly with Derek.',
      },
    ],
  }),

  definePage({
    approvedForIndexing: true,
    id: 'business-class-europe',
    path: '/business-class-flights/europe',
    title: 'Business Class Flights to Europe from the US – Insider Fares',
    description:
      'Business class flights from the US to London, Paris, Rome, Frankfurt and more, typically 15–60% below published fares. Personal quotes from Derek Monti.',
    schemaName: 'US to Europe Business Class Flights',
    serviceType: 'US to Europe business class ticket sourcing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Business Class Flights', path: '/business-class-flights' },
      { name: 'US to Europe', path: '/business-class-flights/europe' },
    ],
    eyebrow: 'US to Europe',
    h1: 'Business class flights from the US to Europe, for less',
    heroSummary:
      'Overnight lie-flat flights from New York, Miami, Chicago or the West Coast to Europe. I compare the nonstops, the one-stops and the consolidator fares, then send you the two or three worth booking.',
    heroPoints: ['Nonstop and one-stop options', 'Overnight lie-flat departures', 'Published fare vs my fare'],
    introTitle: 'Plan backward from the purpose of the trip',
    intro: [
      'A transatlantic request is easier to evaluate when the desired arrival, onward plans, and acceptable connection pattern are clear. That context helps distinguish a workable itinerary from one that merely reaches the destination.',
      'Derek can review a proposed US-to-Europe journey around timing, airports, cabin continuity, and flexibility. Route operations and products change, so any specific flight detail must be confirmed for the requested dates.',
    ],
    audienceTitle: 'Useful context for a west-to-east request',
    audience: [
      {
        title: 'Arrival-sensitive travel',
        body: 'For trips where the arrival day, onward plans, or ability to rest affects the itinerary choice.',
      },
      {
        title: 'Multiple gateway options',
        body: 'For travelers able to consider more than one departure or arrival airport.',
      },
      {
        title: 'Multi-city Europe plans',
        body: 'For journeys that enter through one city and continue or return from another.',
      },
    ],
    evaluationTitle: 'What Derek evaluates',
    evaluationIntro:
      'The review connects the transatlantic flight to the plans immediately before and after it.',
    evaluation: [
      { title: 'Origin options', body: 'Which stated departure airports are practical for the traveler.' },
      { title: 'Arrival fit', body: 'How the proposed arrival supports the first day and any onward journey.' },
      { title: 'Connection shape', body: 'The number, placement, and practical burden of connections.' },
      { title: 'Cabin continuity', body: 'Where the requested cabin applies and where a segment may differ.' },
      { title: 'Date flexibility', body: 'Which travel dates are fixed and which can be considered as a wider window.' },
      { title: 'Ticket conditions', body: 'The conditions shown for a specific option before proceeding.' },
    ],
    limitationsTitle: 'Route information changes',
    limitations: [
      'Flight schedules, operating aircraft, cabins, and availability can change and are not guaranteed by this page.',
      'No airline affiliation, endorsement, or special inventory relationship is represented.',
      'A quote request is not a booking and does not hold any itinerary.',
    ],
    process: [
      { title: 'Set the arrival goal', body: 'Share the origin, European destination, dates, traveler count, and first-day or onward priorities.' },
      { title: 'Derek reviews the journey', body: 'Airports, connections, cabin continuity, timing, flexibility, and conditions are considered together.' },
      { title: 'Choose the right tradeoffs', body: 'Review the relevant itinerary shapes and decide which one fits the complete trip.' },
    ],
    faqs: [
      {
        question: 'Should I include more than one US departure airport?',
        answer:
          'Include every airport you would genuinely use. If one airport is strongly preferred, say so; if several are workable, that flexibility can be reviewed as part of the itinerary.',
      },
      {
        question: 'Can I arrive in one European city and return from another?',
        answer:
          'Yes. Describe both endpoints and the dates that are fixed. This creates an open-jaw or multi-city request and should be reviewed as one complete journey.',
      },
      {
        question: 'Are nonstop flights guaranteed to be available?',
        answer:
          'No. Route operations and availability change. The request can state that nonstop travel is preferred, but any specific option must be confirmed for the travel dates.',
      },
      {
        question: 'Does this page represent a European or US airline?',
        answer:
          'No. I work for you, not for an airline. I compare the carriers on your route and issue the ticket through Travel Business Class, an ARC-accredited agency.',
      },
    ],
    related: [
      {
        path: '/business-class-flights',
        label: 'Business class guidance',
        description: 'See the complete business class review framework.',
      },
      {
        path: '/business-class-flights/usa',
        label: 'Europe to USA planning',
        description: 'Plan the transatlantic journey in the other direction.',
      },
      {
        path: '/services/complex-itineraries',
        label: 'Complex itineraries',
        description: 'Organize open-jaw and multi-city travel.',
      },
      {
        path: '/services/premium-flight-advisor',
        label: 'Premium flight advisor',
        description: 'Understand Derek\'s personal review process.',
      },
    ],
  }),

  definePage({
    approvedForIndexing: true,
    id: 'business-class-usa',
    path: '/business-class-flights/usa',
    title: 'Business Class Flights Europe to USA – Insider Fares',
    description:
      'Business class tickets from London, Paris, Frankfurt, Bucharest and other European cities to the USA at consolidator prices. Quotes within hours.',
    schemaName: 'Europe to USA Business Class Flights',
    serviceType: 'Europe to USA business class ticket sourcing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Business Class Flights', path: '/business-class-flights' },
      { name: 'Europe to USA', path: '/business-class-flights/usa' },
    ],
    eyebrow: 'Europe to USA',
    h1: 'Business class flights from Europe to the United States, for less',
    heroSummary:
      'Daytime westbound flights with a lie-flat seat and a sensible arrival time. I price the published fare next to my fare so you see exactly what you save.',
    heroPoints: ['Daytime westbound flights', 'Departures from your nearest hub', 'Published fare vs my fare'],
    introTitle: 'The best-shaped itinerary finishes the journey well',
    intro: [
      'For Europe-to-USA travel, the arrival airport and any onward plans can be as important as the transatlantic cabin. A useful request explains the final destination, not only the first US airport on the itinerary.',
      'Derek can review the stated route around departure options, connection burden, cabin continuity, arrival fit, and flexibility. Specific schedules and products are confirmed only for the actual dates under consideration.',
    ],
    audienceTitle: 'Useful context for an east-to-west request',
    audience: [
      {
        title: 'Final-destination planning',
        body: 'For travelers who may arrive at one US gateway and continue to another city.',
      },
      {
        title: 'Flexible European departures',
        body: 'For travelers who can reasonably begin the journey from more than one airport.',
      },
      {
        title: 'Return or open-jaw travel',
        body: 'For trips whose US arrival and departure cities are different.',
      },
    ],
    evaluationTitle: 'What Derek evaluates',
    evaluationIntro:
      'The review follows the journey from the first European departure through the traveler\'s real US endpoint.',
    evaluation: [
      { title: 'Departure fit', body: 'Which European origin choices are practical for the traveler.' },
      { title: 'US arrival', body: 'How the arrival airport relates to the traveler\'s final destination and plans.' },
      { title: 'Connection burden', body: 'How each connection affects the length and complexity of the journey.' },
      { title: 'Cabin continuity', body: 'Whether the requested cabin is consistent across the relevant segments.' },
      { title: 'Return structure', body: 'Whether a return, one-way, or open-jaw shape best describes the request.' },
      { title: 'Ticket conditions', body: 'The conditions presented with a specific itinerary before any commitment.' },
    ],
    limitationsTitle: 'Every itinerary must be confirmed for its dates',
    limitations: [
      'Flight schedules, operating aircraft, cabins, and availability can change.',
      'This page does not imply affiliation with a US or European airline.',
      'Submitting a request does not reserve a flight, cabin, or fare condition.',
    ],
    process: [
      { title: 'Describe the full journey', body: 'Share the European origin, final US destination, dates, traveler count, and acceptable airports.' },
      { title: 'Derek reviews the structure', body: 'Departure choices, arrival fit, connections, cabin continuity, flexibility, and conditions are considered.' },
      { title: 'Review the complete route', body: 'Compare the relevant journey shapes and decide which tradeoffs work for the trip.' },
    ],
    faqs: [
      {
        question: 'Should I provide my first US airport or my final destination?',
        answer:
          'Provide the final destination you need to reach. If you are open to arranging an onward segment separately, mention that as a preference rather than leaving the destination unclear.',
      },
      {
        question: 'Can I depart from one European city and return to another?',
        answer:
          'Yes. List the preferred outbound and return origins clearly. The itinerary can then be reviewed as an open-jaw or multi-city journey.',
      },
      {
        question: 'Can the cabin change on a connecting itinerary?',
        answer:
          'It can. Each segment should be checked so the traveler understands where the requested cabin applies and where it differs.',
      },
      {
        question: 'Are route details on this page live?',
        answer:
          'No. This page explains the review process. Specific flights, products, and availability must be confirmed for a traveler\'s dates.',
      },
    ],
    related: [
      {
        path: '/business-class-flights',
        label: 'Business class guidance',
        description: 'See the complete business class review framework.',
      },
      {
        path: '/business-class-flights/europe',
        label: 'US to Europe planning',
        description: 'Plan the transatlantic journey in the other direction.',
      },
      {
        path: '/services/complex-itineraries',
        label: 'Complex itineraries',
        description: 'Structure open-jaw and multi-city requests.',
      },
      {
        path: '/about',
        label: 'About Derek',
        description: 'Learn how the personal advisory approach is presented.',
      },
    ],
  }),

  definePage({
    approvedForIndexing: true,
    id: 'last-minute-business-class',
    path: '/services/last-minute-business-class',
    title: 'Last Minute Business Class Flights – Booked in Hours',
    description:
      'Flying in the next 48 hours? Derek finds last minute business and first class seats when airline sites show nothing. WhatsApp +1 (786) 706-4828 now.',
    schemaName: 'Last Minute Business Class Flights',
    serviceType: 'Last-minute business class ticket sourcing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Last-Minute Business Class', path: '/services/last-minute-business-class' },
    ],
    eyebrow: 'Last-Minute Flights',
    h1: 'Last minute business class flights, booked in hours',
    heroSummary:
      'Need to fly tomorrow or this week? Message me the route, the date and how many travelers. I work my consolidator network and reply the same day with seats I can ticket.',
    heroPoints: ['Same-day search', 'Seats airline sites do not show', 'WhatsApp reply within hours'],
    introTitle: 'Urgency should make the request clearer, not louder',
    intro: [
      'A time-sensitive request is easier to assess when the required route, travel date, traveler count, and decision constraints are complete. Missing details can make an already narrow decision harder to review.',
      'This service page explains how to prepare the request. It does not promise that a suitable flight, cabin, or product will be available, and it does not promise a particular reply time.',
    ],
    audienceTitle: 'What to make clear at the start',
    audience: [
      {
        title: 'Fixed departure needs',
        body: 'State the latest workable departure or arrival requirement and why it is firm.',
      },
      {
        title: 'Real flexibility',
        body: 'List only airports, dates, or connections the traveler would actually accept.',
      },
      {
        title: 'Decision priorities',
        body: 'Explain whether timing, cabin continuity, connection burden, or ticket conditions lead the decision.',
      },
    ],
    evaluationTitle: 'What Derek evaluates',
    evaluationIntro:
      'A time-sensitive review prioritizes clarity about what is possible for the stated request.',
    evaluation: [
      { title: 'Time window', body: 'The departure and arrival boundaries supplied by the traveler.' },
      { title: 'Airport flexibility', body: 'Which origin and destination alternatives are genuinely workable.' },
      { title: 'Connection tolerance', body: 'The maximum complexity the traveler is prepared to accept.' },
      { title: 'Cabin continuity', body: 'Where the requested cabin applies within a proposed journey.' },
      { title: 'Decision readiness', body: 'Whether the traveler has supplied enough information to assess an option.' },
      { title: 'Ticket conditions', body: 'The conditions that need attention before deciding to proceed.' },
    ],
    limitationsTitle: 'Urgent does not mean guaranteed',
    limitations: [
      'No flight, cabin, route, or availability is guaranteed for a time-sensitive request.',
      'No response or delivery timeframe is promised on this page.',
      'Submitting the form is not a reservation and does not hold a seat.',
    ],
    process: [
      { title: 'Send a complete brief', body: 'Provide the route, dates, traveler count, cabin preference, contact details, and hard constraints.' },
      { title: 'Derek reviews the constraints', body: 'Timing, airports, connections, cabin continuity, flexibility, and conditions are considered.' },
      { title: 'Assess what is presented', body: 'Review the tradeoffs and decide whether a confirmed option fits the urgent trip.' },
    ],
    faqs: [
      {
        question: 'What makes a last-minute request complete?',
        answer:
          'Include the exact route, travel date, traveler count, cabin preference, latest acceptable arrival, airport flexibility, connection tolerance, and a reliable contact method.',
      },
      {
        question: 'Is availability guaranteed for an urgent request?',
        answer:
          'No. Availability and cabin details can change, particularly close to departure. Any specific option must be confirmed before a traveler decides to proceed.',
      },
      {
        question: 'Is a particular response time guaranteed?',
        answer:
          'No. This page makes no response-time promise. A complete request helps Derek understand the trip without implying a delivery deadline.',
      },
      {
        question: 'Should I list airports I would not actually use?',
        answer:
          'No. State only genuine flexibility. A broad but unrealistic request makes the decision less clear rather than more useful.',
      },
    ],
    related: [
      {
        path: '/business-class-flights',
        label: 'Business class guidance',
        description: 'Review the broader business class decision framework.',
      },
      {
        path: '/services/premium-flight-advisor',
        label: 'Premium flight advisor',
        description: 'See how Derek structures a personal itinerary review.',
      },
      {
        path: '/services/complex-itineraries',
        label: 'Complex itineraries',
        description: 'Prepare a time-sensitive request with several segments.',
      },
      {
        path: '/about',
        label: 'About Derek',
        description: 'Read about the personal service approach.',
      },
    ],
  }),

  definePage({
    approvedForIndexing: true,
    id: 'complex-itineraries',
    path: '/services/complex-itineraries',
    title: 'Multi-City & Round-the-World Business Class Tickets',
    description:
      'Multi-city, open-jaw and round-the-world business class itineraries built personally by Derek, with mixed cabins and several airlines priced together.',
    schemaName: 'Multi-City Business Class Itineraries',
    serviceType: 'Multi-city and round-the-world ticket sourcing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Complex Itineraries', path: '/services/complex-itineraries' },
    ],
    eyebrow: 'Complex Itineraries',
    h1: 'Multi-city and round-the-world business class, built personally',
    heroSummary:
      'London to Tokyo to Sydney to New York, or an open-jaw that ends in a different city: I build the routing, mix cabins where it makes sense and price the whole trip as one plan.',
    heroPoints: ['Up to six legs in one plan', 'Mixed cabins where it makes sense', 'One price for the whole trip'],
    introTitle: 'Complex trips need one source of truth',
    intro: [
      'When a journey has several stops, reviewing each flight separately can hide conflicts between dates, airports, cabins, or ticket conditions. A structured request makes the order and dependencies visible.',
      'Derek can review the itinerary as a whole: which cities are required, which dates are fixed, where the cabin matters most, and how connections affect the journey. The result is a clearer decision framework, not a guarantee of a particular routing.',
    ],
    audienceTitle: 'Journeys that benefit from a structured brief',
    audience: [
      {
        title: 'Multi-city travel',
        body: 'For journeys with several required destinations and a defined order or date sequence.',
      },
      {
        title: 'Open-jaw travel',
        body: 'For trips that arrive in one city and depart from another rather than retracing the same route.',
      },
      {
        title: 'Mixed-priority segments',
        body: 'For journeys where cabin, timing, or flexibility matters differently on each segment.',
      },
    ],
    evaluationTitle: 'What Derek evaluates',
    evaluationIntro:
      'The review focuses on dependencies that are easy to miss when flights are considered one by one.',
    evaluation: [
      { title: 'Segment order', body: 'Whether the sequence supports the traveler\'s actual commitments.' },
      { title: 'Fixed dates', body: 'Which dates cannot move and which segments have a usable window.' },
      { title: 'Airport continuity', body: 'Whether arrival and departure airports create an unintended transfer burden.' },
      { title: 'Cabin continuity', body: 'Where cabin changes appear and whether they match the traveler\'s priorities.' },
      { title: 'Connection logic', body: 'How connections affect the complete itinerary rather than a single flight.' },
      { title: 'Ticket conditions', body: 'Which conditions or separate-ticket dependencies require attention.' },
    ],
    limitationsTitle: 'Complexity creates additional dependencies',
    limitations: [
      'A requested sequence may not be available exactly as described and no routing is guaranteed.',
      'Separate flights or ticket conditions can introduce dependencies that must be reviewed for a specific option.',
      'Submitting an itinerary is not a reservation and does not hold any segment.',
    ],
    process: [
      { title: 'Map every required segment', body: 'List each city pair, fixed date, traveler count, cabin priority, and important dependency.' },
      { title: 'Derek reviews the sequence', body: 'Segment order, airports, connections, cabin continuity, flexibility, and conditions are considered together.' },
      { title: 'Review the complete journey', body: 'Assess the itinerary as one plan and decide which tradeoffs are acceptable.' },
    ],
    faqs: [
      {
        question: 'What is the difference between multi-city and open-jaw travel?',
        answer:
          'A multi-city request includes several flight segments. An open-jaw trip typically arrives in one city and returns from another. A journey can include both patterns.',
      },
      {
        question: 'How should I submit several destinations?',
        answer:
          'List them in travel order, with fixed dates and acceptable date windows for each segment. Note any surface travel or meetings that create a dependency between flights.',
      },
      {
        question: 'Can cabin preference differ by segment?',
        answer:
          'Yes. State where the cabin is essential and where it is flexible. Any proposed itinerary should show cabin details segment by segment.',
      },
      {
        question: 'Does a complex-itinerary request guarantee one ticket?',
        answer:
          'No. The ticket structure depends on the specific options presented. Any separate-ticket or condition-related dependency should be made clear before a decision.',
      },
    ],
    related: [
      {
        path: '/business-class-flights',
        label: 'Business class guidance',
        description: 'Review cabin, route, and ticket-condition tradeoffs.',
      },
      {
        path: '/first-class-flights',
        label: 'First class planning',
        description: 'Understand first class scope within a mixed itinerary.',
      },
      {
        path: '/services/last-minute-business-class',
        label: 'Time-sensitive requests',
        description: 'Prepare a complete brief when departure is close.',
      },
      {
        path: '/services/premium-flight-advisor',
        label: 'Premium flight advisor',
        description: 'See the personal review framework behind the service.',
      },
    ],
  }),

  definePage({
    approvedForIndexing: true,
    id: 'premium-flight-advisor',
    path: '/services/premium-flight-advisor',
    title: 'Personal Business Class Advisor – Derek Monti',
    description:
      'A personal advisor, not a call center: Derek Monti reviews your business or first class trip, finds consolidator fares and handles the booking end to end.',
    schemaName: 'Personal Business Class Advisor',
    serviceType: 'Personal business and first class flight advisory',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Premium Flight Advisor', path: '/services/premium-flight-advisor' },
    ],
    eyebrow: 'Personal Flight Advisor',
    h1: 'One advisor for your business and first class flights',
    heroSummary:
      'You deal with me directly, from the first message to the e-ticket. Share the route, dates and what matters most; I come back with real fares and the conditions that matter.',
    heroPoints: ['One point of contact', 'Consolidator fares on 50+ airlines', 'Booking handled end to end'],
    introTitle: 'Advice starts with the traveler, not a search result',
    intro: [
      'A premium flight request often includes priorities that are difficult to express in a short search: rest, privacy, arrival timing, connection tolerance, airport preference, or flexibility if plans change.',
      'The advisory process gives those priorities a clear place in the review. Derek considers the request personally and frames the relevant tradeoffs without claiming that any particular flight, product, or outcome is guaranteed.',
    ],
    audienceTitle: 'When personal review adds clarity',
    audience: [
      {
        title: 'High-consideration journeys',
        body: 'For trips where several cabin, timing, airport, or condition-related priorities need to be balanced.',
      },
      {
        title: 'Travelers short on comparison time',
        body: 'For people who want the important itinerary differences organized in one place.',
      },
      {
        title: 'Requests with firm constraints',
        body: 'For journeys shaped by fixed dates, limited connection tolerance, or specific arrival needs.',
      },
    ],
    evaluationTitle: 'What Derek evaluates',
    evaluationIntro:
      'The review connects each itinerary detail to the priorities stated in the request.',
    evaluation: [
      { title: 'Traveler priorities', body: 'The comfort, timing, airport, and flexibility needs identified in the brief.' },
      { title: 'Cabin context', body: 'The cabin information presented for each relevant segment.' },
      { title: 'Route shape', body: 'How stops, airports, and segment order affect the journey.' },
      { title: 'Timing fit', body: 'How the proposed departure, arrival, and connection timing support the trip.' },
      { title: 'Flexibility', body: 'Which parts of the request are fixed and which can be considered differently.' },
      { title: 'Ticket conditions', body: 'The conditions supplied for a specific option before any decision.' },
    ],
    limitationsTitle: 'Independent guidance, specific confirmation',
    limitations: [
      'Fly with Derek is independent and does not represent an airline or guarantee airline products.',
      'Routes, cabins, flight details, and availability must be confirmed for each specific request.',
      'A submitted request is not a booking, seat hold, or guarantee of a particular outcome.',
    ],
    process: [
      { title: 'Share the complete brief', body: 'Provide the trip details and explain which comfort, timing, routing, or flexibility priorities matter most.' },
      { title: 'Derek reviews the request', body: 'The available itinerary details are considered against those stated priorities.' },
      { title: 'Decide with context', body: 'Review the relevant tradeoffs and choose whether an option fits the journey.' },
    ],
    faqs: [
      {
        question: 'What does a personal flight advisor review?',
        answer:
          'The review can cover cabin context, route shape, airports, timing, connections, flexibility, traveler priorities, and the ticket conditions presented with a specific option.',
      },
      {
        question: 'What information should I share?',
        answer:
          'Share the route, dates, traveler count, cabin preference, acceptable airports and connections, plus any fixed arrival needs or flexibility. Optional notes can explain what matters most.',
      },
      {
        question: 'Does Derek represent an airline?',
        answer:
          'No. I represent you. Fares come from consolidator contracts across many airlines, and tickets are issued through Travel Business Class, an ARC-accredited agency.',
      },
      {
        question: 'What happens after I submit the request?',
        answer:
          'The request provides the information needed for a personal review. Any later option remains subject to its own availability, product details, and ticket conditions before a traveler decides whether to proceed.',
      },
    ],
    related: [
      {
        path: '/business-class-flights',
        label: 'Business class guidance',
        description: 'Explore the business class itinerary review framework.',
      },
      {
        path: '/first-class-flights',
        label: 'First class planning',
        description: 'Review the narrower scope of international first class.',
      },
      {
        path: '/services/last-minute-business-class',
        label: 'Time-sensitive requests',
        description: 'Prepare a concise brief when departure is close.',
      },
      {
        path: '/about',
        label: 'About Derek',
        description: 'Read more about the personal advisory approach.',
      },
    ],
  }),

  definePage({
    approvedForIndexing: true,
    id: 'business-class-miami',
    path: '/business-class-flights-miami',
    updated: '2026-10-27',
    title: 'Business Class Travel Agent in Miami – Insider Fares from MIA',
    description:
      'Miami-based business and first class flight advisor. Consolidator fares from MIA and FLL, typically 15–60% below published. WhatsApp +1 (786) 706-4828.',
    schemaName: 'Business Class Travel Agent in Miami',
    serviceType: 'Business class flight booking from Miami',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Business Class Flights', path: '/business-class-flights' },
      { name: 'Miami', path: '/business-class-flights-miami' },
    ],
    eyebrow: 'Miami · MIA & FLL',
    h1: 'Your business class travel agent in Miami',
    heroSummary:
      'I live in Miami and price flights out of MIA and Fort Lauderdale every day: London, Madrid, Paris, Rome, Bucharest and beyond, in business and first class at consolidator fares the airline sites never show.',
    heroPoints: ['Nonstop MIA to London, Madrid, Paris, Rome and more', 'Published fare vs my fare, side by side', 'Same-day quotes, 24/7 on WhatsApp'],
    introTitle: 'Miami is one of the best-served US airports for premium cabins to Europe and Latin America',
    intro: [
      'From Miami International you can fly nonstop in a lie-flat seat to London, Madrid, Paris, Rome, Frankfurt, Zurich, Lisbon and Istanbul, and to almost every capital in Latin America. That much competition is good news for my clients: when four airlines sell the same overnight flight, at least one of them is quietly discounting it through consolidators.',
      'I am based here, so I know which evening departures sell out first, when American and British Airways release their cheapest business fares to Heathrow, and when a one-stop through Lisbon or Madrid is worth the extra hour. Fort Lauderdale is often part of the answer too.',
      'Send me the trip on WhatsApp and I reply the same day with real fares, the published price next to mine and the seat you actually get on each leg.',
    ],
    audienceTitle: 'Who I help from Miami',
    audience: [
      {
        title: 'South Florida families flying to Europe',
        body: 'Summer and Christmas trips to London, Madrid, Rome or Paris, priced per seat so a family of four sees the real saving before booking.',
      },
      {
        title: 'Executives on short notice',
        body: 'Same-week business class to Europe, the Gulf or Latin America when the airline website shows only full fares or nothing at all.',
      },
      {
        title: 'Visitors flying home',
        body: 'Romanian, Spanish, Italian and Latin American clients who fly the same route every year and want one person who remembers how they like to travel.',
      },
    ],
    evaluationTitle: 'What I check before I quote a Miami departure',
    evaluationIntro: 'Four questions decide whether a fare out of MIA is a good one, and I answer them before you see a price.',
    evaluation: [
      {
        title: 'Nonstop or one-stop',
        body: 'A nonstop from MIA is usually worth a few hundred dollars more; a one-stop through Madrid or Lisbon can save a thousand. I show both.',
      },
      {
        title: 'The seat on each leg',
        body: 'Miami to Europe is all widebody, lie-flat business; I tell you which airlines fly suites with doors and which still run older cabins.',
      },
      {
        title: 'Departure time',
        body: 'Most European flights leave Miami between 5 pm and 11 pm. The latest departures often carry the best consolidator fares.',
      },
      {
        title: 'Fare rules',
        body: 'Consolidator fares have their own change and refund rules; I spell them out before you book, not after.',
      },
    ],
    process: [
      { title: 'Message me the trip', body: 'WhatsApp or the form: route, dates, travelers and cabin. Flexible dates help me find the better fare.' },
      { title: 'I search the fares', body: 'Published fares and my consolidator contracts, nonstop and one-stop, out of MIA and FLL.' },
      { title: 'You get real options', body: 'Usually within hours: price, seat, schedule and the rules for each option, with the published fare next to mine.' },
      { title: 'I issue the ticket', body: 'Through Travel Business Class, an ARC-accredited agency, with your airline record locator sent the same day.' },
    ],
    faqs: [
      {
        question: 'Which airlines fly business class nonstop from Miami to Europe?',
        answer:
          'British Airways, American and Virgin Atlantic to London; Iberia and American to Madrid; Air France to Paris; ITA Airways to Rome; Lufthansa to Frankfurt; Swiss to Zurich; TAP to Lisbon; Turkish Airlines to Istanbul. All of them fly lie-flat business class and I price every one of them.',
      },
      {
        question: 'How much is business class from Miami to London?',
        answer:
          'Published round-trip fares run roughly $4,000 to $7,000 depending on the season. As an example, a recent quote I sent came to $2,850 against $4,400 published. Fares change daily and I confirm the price before ticketing.',
      },
      {
        question: 'Do you also book from Fort Lauderdale?',
        answer:
          'Yes. FLL has fewer premium-cabin nonstops, but a one-stop from there is sometimes the cheapest business class fare in South Florida, and I check it alongside Miami on every request.',
      },
      {
        question: 'Can I call you instead of using the form?',
        answer:
          'Yes. Call or WhatsApp +1 (786) 706-4828 any time; most of my clients send the trip on WhatsApp because it is the fastest way to get options back.',
      },
      {
        question: 'Do you only work with Miami clients?',
        answer:
          'No. I book business and first class worldwide for clients across the US and Europe. Miami is simply where I am based and the airport I know best.',
      },
    ],
    related: [
      {
        path: '/business-class-flights/miami-to-london',
        label: 'Miami to London',
        description: 'Nonstop business class on British Airways, American and Virgin Atlantic.',
      },
      {
        path: '/business-class-flights/miami-to-madrid',
        label: 'Miami to Madrid',
        description: 'Iberia and American nonstops, plus the one-stops that cut the fare.',
      },
      {
        path: '/business-class-flights/miami-to-rome',
        label: 'Miami to Rome',
        description: 'Seasonal nonstops and year-round one-stops in business class.',
      },
      {
        path: '/business-class-flights/europe',
        label: 'Business class to Europe',
        description: 'Every US gateway, priced below the published fare.',
      },
    ],
  }),
];

export const corePageByPath = Object.fromEntries(corePages.map((page) => [page.path, page]));
export const corePageById = Object.fromEntries(corePages.map((page) => [page.id, page]));

export { SITE_ORIGIN };
