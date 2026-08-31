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

function definePage(page) {
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
    title: 'Business Class Flight Guidance | Fly with Derek',
    description:
      'Request a personal review of business class flight options, including cabin fit, routing, timing, flexibility, and fare conditions.',
    schemaName: 'Business Class Flight Guidance',
    serviceType: 'Business class flight itinerary review',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Business Class Flights', path: '/business-class-flights' },
    ],
    eyebrow: 'Business Class Guidance',
    h1: 'Business class planning with the whole trip in view',
    heroSummary:
      'Share the journey you are considering and Derek will review the cabin, routing, timing, flexibility, and ticket conditions together.',
    heroPoints: ['Cabin and aircraft context', 'Route and connection tradeoffs', 'Ticket-condition review'],
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
          'No. Fly with Derek is an independent advisory service. Airline names and products, when discussed for a request, belong to their respective owners.',
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
    title: 'First Class Flight Planning | Fly with Derek',
    description:
      'Request an independent review of international first class options, product scope, itinerary fit, and ticket conditions.',
    schemaName: 'First Class Flight Planning',
    serviceType: 'First class flight itinerary review',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'First Class Flights', path: '/first-class-flights' },
    ],
    eyebrow: 'First Class Planning',
    h1: 'First class, considered in the context of the journey',
    heroSummary:
      'First class is not offered on every route or aircraft. Derek reviews the product that is actually presented for the trip and how it fits the wider itinerary.',
    heroPoints: ['Product scope', 'Journey continuity', 'Conditions and caveats'],
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
          'No airline affiliation is represented on this page. Fly with Derek is an independent advisory service and airline trademarks belong to their owners.',
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
    title: 'Business Class Flights from the US to Europe | Fly with Derek',
    description:
      'Plan a US-to-Europe business class request around cabin fit, departure and arrival timing, connection quality, airports, and flexibility.',
    schemaName: 'US to Europe Business Class Planning',
    serviceType: 'US to Europe business class itinerary review',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Business Class Flights', path: '/business-class-flights' },
      { name: 'US to Europe', path: '/business-class-flights/europe' },
    ],
    eyebrow: 'US to Europe',
    h1: 'Business class planning from the United States to Europe',
    heroSummary:
      'Build the request around the arrival you need, the journey you can tolerate, and the cabin priorities that matter after crossing the Atlantic.',
    heroPoints: ['Departure and arrival fit', 'Gateway and connection logic', 'Cabin continuity'],
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
          'No. Fly with Derek is an independent advisory service and does not represent an airline.',
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
    title: 'Business Class Flights from Europe to the USA | Fly with Derek',
    description:
      'Plan a Europe-to-USA business class request around departure options, arrival airports, connections, cabin continuity, and trip priorities.',
    schemaName: 'Europe to USA Business Class Planning',
    serviceType: 'Europe to USA business class itinerary review',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Business Class Flights', path: '/business-class-flights' },
      { name: 'Europe to USA', path: '/business-class-flights/usa' },
    ],
    eyebrow: 'Europe to USA',
    h1: 'Business class planning from Europe to the United States',
    heroSummary:
      'Frame the request around the US arrival that works, the European departure options available to you, and the connection pattern you are prepared to accept.',
    heroPoints: ['Arrival-airport fit', 'European departure options', 'Onward-journey context'],
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
    title: 'Last-Minute Business Class Request Support | Fly with Derek',
    description:
      'Submit a time-sensitive business class request with the route, dates, traveler details, cabin priorities, and realistic flexibility made clear.',
    schemaName: 'Last-Minute Business Class Request Support',
    serviceType: 'Time-sensitive business class itinerary review',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Last-Minute Business Class', path: '/services/last-minute-business-class' },
    ],
    eyebrow: 'Time-Sensitive Requests',
    h1: 'A clearer way to submit an urgent business class request',
    heroSummary:
      'When departure is close, a complete brief matters. Share the non-negotiables, the genuine flexibility, and a reliable contact method from the start.',
    heroPoints: ['Complete trip brief', 'Firm versus flexible details', 'No availability promise'],
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
    title: 'Complex and Multi-City Flight Itinerary Review | Fly with Derek',
    description:
      'Organize a multi-city, open-jaw, or mixed-cabin request around segment order, fixed dates, cabin continuity, connections, and ticket conditions.',
    schemaName: 'Complex Flight Itinerary Review',
    serviceType: 'Multi-city and complex flight itinerary review',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Complex Itineraries', path: '/services/complex-itineraries' },
    ],
    eyebrow: 'Complex Itineraries',
    h1: 'Make every segment serve the complete journey',
    heroSummary:
      'Bring multi-city, open-jaw, mixed-cabin, and connection-heavy requests into one clear itinerary brief before comparing individual flights.',
    heroPoints: ['Segment-by-segment clarity', 'Cabin continuity', 'Fixed dates and dependencies'],
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
    title: 'Personal Premium Flight Advisor | Fly with Derek',
    description:
      'Work through a premium flight request with a personal itinerary review focused on cabin, routing, timing, flexibility, and ticket conditions.',
    schemaName: 'Personal Premium Flight Advisor',
    serviceType: 'Premium flight itinerary advisory',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Premium Flight Advisor', path: '/services/premium-flight-advisor' },
    ],
    eyebrow: 'Personal Flight Advisor',
    h1: 'A human review for a premium flight decision',
    heroSummary:
      'Derek brings the route, cabin, timing, flexibility, and ticket conditions into one conversation so the traveler can assess the journey as a whole.',
    heroPoints: ['One clear trip brief', 'Itinerary-level comparison', 'Tradeoffs explained in context'],
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
          'No. Fly with Derek is an independent advisory service. Airline products and trademarks belong to their respective owners.',
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
];

export const corePageByPath = Object.fromEntries(corePages.map((page) => [page.path, page]));
export const corePageById = Object.fromEntries(corePages.map((page) => [page.id, page]));

export { SITE_ORIGIN };
