// Route landing pages consumed by src/pages/RouteLanding.jsx.
// Facts are general route knowledge (airlines, block times, aircraft, seasonality) as of 2025–2026 and
// must be re-checked against live schedules before each publish. Every fare is an example from a quote.
// TODO(owner-data): replace example fares with Derek's real recent quotes (route, cabin, published vs paid, month).

const CORRIDOR_EUROPE = '/business-class-flights/europe';
const CORRIDOR_ALL = '/business-class-flights';
const FARE_LABEL = 'Example from a recent quote, round trip per person';
const UPDATED = '2026-10-27';

const routeImage = (name, alt) => ({
  image: `/images/routes/${name}.webp`,
  imageSmall: `/images/routes/${name}-600.webp`,
  imageAlt: alt,
});

export const routePages = [
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'miami-to-london',
    path: '/business-class-flights/miami-to-london',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'Miami', code: 'MIA', airport: 'Miami International Airport' },
    destination: { city: 'London', code: 'LHR', airport: 'London Heathrow' },
    title: 'Miami to London Business Class Flights – Insider Fares (MIA–LHR)',
    description:
      'Business class Miami to London on BA, American and Virgin Atlantic at consolidator fares, typically 15–60% below published. WhatsApp +1 (786) 706-4828.',
    h1: 'Miami to London business class flights, for less',
    intro: [
      'Miami to London is the route I price more often than any other, because it is my home airport and three airlines compete on it every single night. British Airways, American Airlines and Virgin Atlantic all fly nonstop to Heathrow, which means I can usually find a lie-flat seat with a sliding door at a consolidator fare that sits well below what any of them show on their own websites.',
      'The flight itself is a comfortable overnight hop. Block time is around eight hours forty-five minutes eastbound, with departures clustered between late afternoon and ten in the evening and arrivals at Heathrow from early morning onward. The westbound return takes closer to nine and a half hours against the jet stream and leaves London late morning or early afternoon, landing in Miami before dinner.',
      'Aircraft on the route are all widebodies with proper lie-flat business cabins: British Airways uses the Boeing 777 and Airbus A350 and sometimes the A380, American flies the Boeing 777 and Virgin Atlantic operates the Airbus A350 and A330neo. I check the exact aircraft on your date before I quote, because the seat you get on this route depends on it more than on the airline name.',
    ],
    ...routeImage('london', 'Westminster and the Thames at dusk, seen from the South Bank'),
    exampleFare: { cabin: 'Business', published: '$4,400', derek: '$2,850', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'British Airways, American Airlines, Virgin Atlantic' },
      { label: 'Flight time', value: '≈ 8 h 45 eastbound, ≈ 9 h 30 westbound, nonstop' },
      { label: 'Departures', value: 'Evening bank 5–10 pm from Miami, arrive Heathrow next morning' },
      { label: 'Aircraft', value: 'Boeing 777, Airbus A350 and A330neo, occasionally the A380' },
      { label: 'Alliances', value: 'oneworld (BA, American) and SkyTeam (Virgin Atlantic)' },
      { label: 'Best value months', value: 'Late October to early December and mid-January to March' },
    ],
    cabins: [
      {
        airline: 'British Airways',
        product: 'Club Suite (lie-flat, sliding door, 1-2-1)',
        note: 'On the A350 and most refitted 777s. Some 777s and the A380 still carry the older Club World cabin without doors, so I confirm which one is scheduled on your date.',
      },
      {
        airline: 'American Airlines',
        product: 'Flagship Business (lie-flat, 1-2-1)',
        note: 'Every seat has direct aisle access. The retrofitted 777-300ERs are receiving Flagship Suites with doors; the 777-200 keeps the earlier lie-flat seat, still a good night of sleep.',
      },
      {
        airline: 'Virgin Atlantic',
        product: 'Upper Class Suite (lie-flat, sliding door on the A350)',
        note: 'The A350 cabin faces forward with a door; the A330neo adds the Retreat Suite, a pair of extra-large seats at the front that I can request for couples.',
      },
    ],
    tips: [
      'Tuesday and Wednesday departures on this route are consistently cheaper in my quotes than Thursday to Sunday, so give me a two-day window either side if your meeting allows it.',
      'If Heathrow is not essential, I also price Gatwick: British Airways runs a seasonal Miami to Gatwick service, and the consolidator fare there is sometimes lower than for Heathrow on the same dates.',
      'An open-jaw that flies into London and home from Paris, Madrid or Rome usually costs little more than a plain round trip, and it saves you a day of backtracking.',
      'When the nonstops are sold out in business, a same-day connection through New York or Boston on the same airline keeps you in a lie-flat seat and often undercuts the nonstop fare by several hundred dollars.',
    ],
    faqs: [
      {
        question: 'How much does business class from Miami to London cost?',
        answer:
          'Published round-trip business fares on Miami to London usually sit between $3,800 and $6,500 depending on season and how far ahead you book. My consolidator fares typically come in 15–60% below that; the example on this page is $2,850 against a $4,400 published price, round trip per person.',
      },
      {
        question: 'Which airlines fly nonstop from Miami to London Heathrow?',
        answer:
          'British Airways, American Airlines and Virgin Atlantic all fly Miami to Heathrow nonstop, several times a day between them. British Airways also serves London Gatwick from Miami on a seasonal basis. I price all of them and tell you which aircraft and seat you get on each option.',
      },
      {
        question: 'How long is the flight from Miami to London?',
        answer:
          'Around eight hours forty-five minutes eastbound and about nine and a half hours on the way back, because the westbound flight fights the jet stream. Evening departures from Miami land at Heathrow the next morning, so a lie-flat seat really matters on this leg.',
      },
      {
        question: 'Is it cheaper to fly business class to London in winter?',
        answer:
          'Yes. Outside the Christmas and New Year week, November through March is the cheapest period for Miami to London in business, and consolidator fares drop further then. Summer, Easter and the weeks around Wimbledon are the most expensive, so ask me early for those dates.',
      },
    ],
    related: ['new-york-to-london', 'miami-to-paris', 'miami-to-madrid'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'miami-to-paris',
    path: '/business-class-flights/miami-to-paris',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'Miami', code: 'MIA', airport: 'Miami International Airport' },
    destination: { city: 'Paris', code: 'CDG', airport: 'Paris Charles de Gaulle' },
    title: 'Miami to Paris Business Class Flights – Insider Fares (MIA–CDG)',
    description:
      'Business class Miami to Paris CDG on Air France and American at consolidator fares, typically 15–60% below the airline price. WhatsApp +1 (786) 706-4828.',
    h1: 'Miami to Paris business class flights, for less',
    intro: [
      'Air France and American Airlines both fly Miami to Paris Charles de Gaulle nonstop, and that head-to-head competition is exactly what I use to get you a lie-flat seat for less. Air France runs the route year-round with the Boeing 777-300ER, American typically with the 777-200 or the 787, and both leave Miami in the early evening so you sleep over the Atlantic and land in Paris after breakfast.',
      'Count on roughly nine hours in the air eastbound and a little over ten hours on the way home, when the westbound flight leaves Paris around midday and reaches Miami in the late afternoon. Charles de Gaulle is the Air France hub, so an onward connection to Nice, Lyon, Bordeaux or anywhere in Europe is a short walk inside Terminal 2 rather than a change of airport.',
      'Most of my Paris quotes come in two shapes: the nonstop on Air France or American, and a one-stop through Atlanta on Delta, which shares the transatlantic joint venture with Air France. I price both and show you the published fare beside my consolidator fare. The one-stop adds about three hours but is often the cheaper way into a seat with a door.',
    ],
    ...routeImage('paris', 'Paris at sunset with the Eiffel Tower and La Défense on the horizon'),
    exampleFare: { cabin: 'Business', published: '$4,600', derek: '$3,050', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'Air France (year-round), American Airlines' },
      { label: 'Flight time', value: '≈ 9 h eastbound, ≈ 10 h 15 westbound, nonstop' },
      { label: 'Departures', value: 'Early evening 5–8 pm from Miami, arrive Paris mid-morning' },
      { label: 'Aircraft', value: 'Boeing 777-300ER (Air France), Boeing 777-200 or 787 (American)' },
      { label: 'Alliances', value: 'SkyTeam (Air France, Delta via Atlanta) and oneworld (American)' },
      { label: 'Best value months', value: 'November and mid-January to mid-March, outside the fashion weeks' },
    ],
    cabins: [
      {
        airline: 'Air France',
        product: 'Business (lie-flat, 1-2-1, sliding door on refitted 777-300ERs)',
        note: 'The newest cabin has a privacy door and a seat that converts into a two-metre bed; older 777s keep the earlier lie-flat seat without the door. I tell you which version is scheduled for your flight.',
      },
      {
        airline: 'American Airlines',
        product: 'Flagship Business (lie-flat, 1-2-1)',
        note: 'Direct aisle access from every seat and a full-flat bed; the 787-9 version is the newer of the two and is my first choice when it appears on the schedule.',
      },
      {
        airline: 'Delta via Atlanta',
        product: 'Delta One Suite (lie-flat, closed door, 1-2-1)',
        note: 'A one-stop option that keeps you in a suite with a door on the Atlanta to Paris leg, often the best-value route into Paris when the Miami nonstops are full.',
      },
    ],
    tips: [
      'Paris fares spike for the fashion weeks in late February and late September and for the Easter and summer holidays, so if your dates are flexible I steer you a week either side.',
      'A late-evening Air France departure gets you more sleep than the 5 pm one; when both are priced the same I book the later flight unless you need to be in the city by noon.',
      'Flying into Paris and home from Nice, Lyon or even Barcelona as an open-jaw rarely adds more than a few hundred dollars and removes a backtrack through Charles de Gaulle.',
      'Business class on this route books out in late June and July around the school holidays, so for summer travel I need your dates two to three months ahead to lock the consolidator fare.',
    ],
    faqs: [
      {
        question: 'How much is a business class ticket from Miami to Paris?',
        answer:
          'Published round-trip business fares on Miami to Paris typically run from about $4,200 to $7,000, with summer and the holidays at the top of that range. The consolidator fares I quote are usually 15–60% lower; the example on this page is $3,050 against a published $4,600, round trip per person.',
      },
      {
        question: 'Who flies nonstop from Miami to Paris?',
        answer:
          'Air France flies Miami to Charles de Gaulle nonstop every day of the year with the Boeing 777-300ER, and American Airlines also operates the route, most reliably in the busier months. Delta offers the main one-stop alternative through Atlanta inside its joint venture with Air France.',
      },
      {
        question: 'How long is the flight from Miami to Paris?',
        answer:
          'About nine hours nonstop going east and ten hours or a little more coming back. Departures from Miami are in the early evening, so the eastbound leg is an overnight flight where a lie-flat seat pays for itself; the return is a daytime flight.',
      },
      {
        question: 'Can I fly Miami to Paris in business class and return from another city?',
        answer:
          'Yes. An open-jaw with Paris on the way out and Nice, Lyon, Madrid or London on the way back is something I build regularly, and the consolidator fare usually treats it like a normal round trip. Tell me both cities and I quote the whole trip as one plan.',
      },
    ],
    related: ['miami-to-london', 'miami-to-rome', 'miami-to-madrid'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'miami-to-madrid',
    path: '/business-class-flights/miami-to-madrid',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'Miami', code: 'MIA', airport: 'Miami International Airport' },
    destination: { city: 'Madrid', code: 'MAD', airport: 'Madrid Barajas' },
    title: 'Miami to Madrid Business Class Flights – Insider Fares (MIA–MAD)',
    description:
      'Business class Miami to Madrid on Iberia, Air Europa and American at consolidator fares, typically 15–60% below published prices. WhatsApp +1 (786) 706-4828.',
    h1: 'Miami to Madrid business class flights, for less',
    intro: [
      'Three airlines fly Miami to Madrid nonstop, which makes this one of the easiest transatlantic routes for me to price well. Iberia operates several flights a day with the Airbus A350 and A330, Air Europa flies the Boeing 787 Dreamliner, and American Airlines adds its own widebody. With that much lie-flat capacity, a consolidator fare in business is rarely hard to find, even a few weeks out.',
      'The eastbound flight takes about eight and a half hours. Iberia spreads its departures from early afternoon to late evening, so you can choose between landing in Madrid at dawn or in the early afternoon, while American and Air Europa leave in the evening. The return is close to ten hours, departing Madrid around midday and arriving in Miami in the late afternoon, in time for dinner at home.',
      'Madrid Barajas is a hub in both directions: Iberia connects you onward to Barcelona, Seville, Lisbon and Milan within an hour or two, and the same terminal also links to all of Latin America. That is why a Madrid fare is often my recommendation for a trip that continues into Spain or Portugal. I price the nonstop against those connections and send you the published fare next to mine.',
    ],
    ...routeImage('madrid', 'The Metropolis building on Gran Vía in Madrid at sunset'),
    exampleFare: { cabin: 'Business', published: '$4,300', derek: '$2,800', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'Iberia, Air Europa, American Airlines' },
      { label: 'Flight time', value: '≈ 8 h 30 eastbound, ≈ 9 h 50 westbound, nonstop' },
      { label: 'Departures', value: 'Iberia from early afternoon to late evening; American and Air Europa in the evening' },
      { label: 'Aircraft', value: 'Airbus A350-900 and A330 (Iberia), Boeing 787 (Air Europa), Boeing 777 or 787 (American)' },
      { label: 'Alliances', value: 'oneworld (Iberia, American) and SkyTeam (Air Europa)' },
      { label: 'Best value months', value: 'Mid-January to February and November; Easter week and July to August cost the most' },
    ],
    cabins: [
      {
        airline: 'Iberia',
        product: 'Business (lie-flat, 1-2-1, sliding door on the newest A350s)',
        note: 'Every seat has aisle access; the A350s delivered from 2024 carry the Next Business suite with a door, while the A330 keeps the earlier lie-flat seat. I confirm the aircraft before I quote.',
      },
      {
        airline: 'Air Europa',
        product: 'Business (lie-flat on the 787)',
        note: 'The 787-9 has a 1-2-1 layout with direct aisle access; the smaller 787-8 is 2-2-2, so a window seat means stepping over a neighbour. I steer couples to the 2-2-2 and solo travelers to the 787-9.',
      },
      {
        airline: 'American Airlines',
        product: 'Flagship Business (lie-flat, 1-2-1)',
        note: 'A fully flat bed with aisle access on every seat, plus oneworld lounge access at Madrid Terminal 4S on the way home, the same lounge Iberia passengers use.',
      },
    ],
    tips: [
      'Iberia often has the lowest consolidator fare on this route but only on specific flight numbers, so if you can take the early-afternoon departure instead of the late one I can usually save you a few hundred dollars.',
      'For trips that continue to Lisbon, Barcelona or the Canary Islands, I price the whole itinerary as one ticket through Madrid; the add-on leg in Iberia business class usually costs much less than buying it separately.',
      'Semana Santa, the week before Easter, and the first half of August are the two periods when Madrid flights fill up and consolidator seats disappear early; send me those dates as soon as you have them.',
      'If you want a door on the seat, ask me for the Iberia A350 flights specifically; I can see the aircraft assignment and will tell you honestly when the schedule shows an older cabin.',
    ],
    faqs: [
      {
        question: 'How much does business class cost from Miami to Madrid?',
        answer:
          'Published round-trip business fares on Miami to Madrid typically range from about $3,900 to $6,500, with the Spanish summer at the top end. My consolidator fares usually land 15–60% below; the example on this page is $2,800 against a $4,300 published fare, round trip per person.',
      },
      {
        question: 'Which airlines fly nonstop between Miami and Madrid?',
        answer:
          'Iberia, Air Europa and American Airlines all fly nonstop between Miami and Madrid Barajas, with Iberia offering the most daily frequencies. All three use widebody aircraft with lie-flat business seats; the difference is the layout, which I spell out for each flight in your quote.',
      },
      {
        question: 'How long is the flight from Miami to Madrid?',
        answer:
          'Roughly eight and a half hours going to Madrid and just under ten hours coming back to Miami. The eastbound flights are overnight or late-afternoon departures, and the westbound ones leave Madrid late morning or around midday, so you land in Miami the same afternoon.',
      },
      {
        question: 'Is Madrid a good connection point for business class to the rest of Spain?',
        answer:
          'Yes. Madrid Barajas Terminal 4 is the Iberia hub, with short connections to Barcelona, Seville, Malaga, Lisbon and Porto on the same ticket. I usually price your final destination through Madrid rather than stopping there, because the fare for the whole trip is often not much more than for Madrid alone.',
      },
    ],
    related: ['miami-to-paris', 'miami-to-london', 'miami-to-rome'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'miami-to-rome',
    path: '/business-class-flights/miami-to-rome',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'Miami', code: 'MIA', airport: 'Miami International Airport' },
    destination: { city: 'Rome', code: 'FCO', airport: 'Rome Fiumicino' },
    title: 'Miami to Rome Business Class Flights – Insider Fares (MIA–FCO)',
    description:
      'Business class Miami to Rome on ITA Airways and American, plus one-stops, at consolidator fares typically 15–60% below published. WhatsApp +1 (786) 706-4828.',
    h1: 'Miami to Rome business class flights, for less',
    intro: [
      'Rome is the Italian gateway I book most from Miami, and there is a nonstop for it: ITA Airways flies Miami to Fiumicino year-round with the Airbus A330neo, and American Airlines adds a seasonal nonstop in the warmer months. Both put you in a lie-flat seat for the nine-and-a-half-hour overnight crossing, and both have consolidator fares that I can usually bring in well under the published price.',
      'The eastbound flight leaves Miami in the early evening and lands in Rome late the next morning, which works nicely for a hotel check-in. Coming home takes closer to eleven hours because of the headwinds; departures from Fiumicino are around midday, so you reach Miami in the late afternoon. In winter, when the American flight pauses, ITA keeps the nonstop going and I lean on one-stop options to add choice.',
      'Those one-stops are not a downgrade. Lufthansa through Frankfurt or Munich, Swiss through Zurich, British Airways through London and Air France through Paris all connect Miami to Rome with a lie-flat seat on the long leg and a two-hour layover. They often price lower than the nonstop, and for travelers heading on to Florence or Naples a connection can even shorten the day.',
    ],
    ...routeImage('rome', 'The Colosseum in Rome in the late-afternoon light'),
    exampleFare: { cabin: 'Business', published: '$5,200', derek: '$3,400', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'ITA Airways (year-round), American Airlines (seasonal, spring to autumn)' },
      { label: 'Flight time', value: '≈ 9 h 30 eastbound, ≈ 10 h 50 westbound, nonstop' },
      { label: 'Departures', value: 'Early evening from Miami, land Rome late morning; one-stops via Frankfurt, Zurich, London or Paris' },
      { label: 'Aircraft', value: 'Airbus A330-900neo (ITA Airways), Boeing 777 (American)' },
      { label: 'Alliances', value: 'SkyTeam (ITA Airways) and oneworld (American, British Airways)' },
      { label: 'Best value months', value: 'November to early March, outside the Christmas week; May to October is peak' },
    ],
    cabins: [
      {
        airline: 'ITA Airways',
        product: 'Business (lie-flat, 1-2-1, sliding door)',
        note: 'The A330neo cabin has a door at every seat, a large screen and Italian catering; it is the best hard product on the nonstop and the one I quote first.',
      },
      {
        airline: 'American Airlines',
        product: 'Flagship Business (lie-flat, 1-2-1)',
        note: 'Operated in the busier months only. A fully flat bed with aisle access on every seat; the 777-300ER version with the new Flagship Suite is worth asking for if it is assigned to your date.',
      },
      {
        airline: 'Lufthansa via Frankfurt or Munich',
        product: 'Business (lie-flat, Allegris suites on the newest A350s)',
        note: 'The long Miami to Germany leg is on a 747-8 or A350; the Allegris cabin with a door is spreading across the fleet, while older jets still have the 2-2-2 layout. The Rome hop is a short European business seat.',
      },
    ],
    tips: [
      'For summer travel to Rome I need your dates by March; business seats on the nonstops sell down early and the consolidator fare moves up as the cabin fills.',
      'An open-jaw into Rome and out of Milan, Venice or Naples is the itinerary I build most for Italy, and it usually prices within a few hundred dollars of a straight round trip.',
      'If the nonstop is full or expensive, the Zurich and Munich connections keep the total trip to around thirteen hours with a layover near two hours, and the fare is frequently lower.',
      'January and February are the cheapest months for Rome in business, and the lower demand also means I can usually hold a choice of seats rather than the last two.',
    ],
    faqs: [
      {
        question: 'How much does it cost to fly business class from Miami to Rome?',
        answer:
          'Published round-trip business fares between Miami and Rome generally run from about $4,500 in winter to $7,500 or more in summer. Through my consolidator contracts that drops by 15–60%; the example on this page is $3,400 against a published $5,200, round trip per person.',
      },
      {
        question: 'Is there a nonstop flight from Miami to Rome?',
        answer:
          'Yes. ITA Airways flies Miami to Rome Fiumicino nonstop all year with the Airbus A330neo, and American Airlines operates a seasonal nonstop, usually from spring until autumn. Outside those months I price one-stop itineraries through Frankfurt, Munich, Zurich, London or Paris alongside the ITA flight.',
      },
      {
        question: 'How long is the flight from Miami to Rome?',
        answer:
          'Around nine and a half hours nonstop eastbound and close to eleven hours on the way back. With a connection in Europe, count on twelve to fourteen hours door to door depending on the layover, which is why I only propose connections with a lie-flat seat on the ocean leg.',
      },
      {
        question: 'When is the cheapest time to fly to Rome in business class?',
        answer:
          'November through early March, apart from the Christmas and New Year week. Rome demand peaks from May to October and around Easter, and that is when the published fares and the consolidator fares both sit highest, so flexible travelers save the most by shifting a week or two.',
      },
    ],
    related: ['chicago-to-rome', 'miami-to-paris', 'miami-to-madrid'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'miami-to-bucharest',
    path: '/business-class-flights/miami-to-bucharest',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'Miami', code: 'MIA', airport: 'Miami International Airport' },
    destination: { city: 'Bucharest', code: 'OTP', airport: 'Bucharest Henri Coandă (Otopeni)' },
    title: 'Miami to Bucharest Business Class Flights – Insider Fares (MIA–OTP)',
    description:
      'Business class Miami to Bucharest, one stop via Frankfurt, Munich, Istanbul or Paris, at fares typically 15–60% below published. WhatsApp +1 (786) 706-4828.',
    h1: 'Miami to Bucharest business class flights, for less',
    intro: [
      'There is no nonstop flight between Miami and Bucharest, so every business class ticket on this route is a one-stop, and the choice of connection decides how the trip feels. Lufthansa through Frankfurt or Munich, Turkish Airlines through Istanbul and Air France through Paris are the combinations I price most, with British Airways through London and LOT through Warsaw as useful backups when the others are full.',
      'All of them follow the same rhythm: an overnight transatlantic leg of nine to twelve hours in a lie-flat seat, a layover of one to three hours, then a short European flight into Otopeni of between ninety minutes from Istanbul and about two hours forty from Frankfurt. Total travel time is usually thirteen to fifteen hours, landing in Bucharest in the afternoon or early evening of the next day.',
      'The part most travelers miss is that the second leg is a narrowbody. From Frankfurt, Munich, Paris or Istanbul you fly an Airbus A320 family jet with European business class, which means a wider pitch and an empty middle seat rather than a bed. That is fine for a two-hour hop, but it is why I put all the weight of the comparison on the long leg and its cabin.',
    ],
    ...routeImage('bucharest', 'The Palace of the Parliament in Bucharest on a clear day'),
    exampleFare: { cabin: 'Business', published: '$4,900', derek: '$3,100', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'None; one stop via Frankfurt, Munich, Istanbul, Paris, London or Warsaw' },
      { label: 'Flight time', value: '≈ 13–15 h in total, including a 1–3 h connection' },
      { label: 'Departures', value: 'Evening from Miami, arrive Bucharest Otopeni the next afternoon or evening' },
      { label: 'Aircraft', value: 'Boeing 747-8, 777 or Airbus A350 across the Atlantic; Airbus A320 family on the short leg' },
      { label: 'Alliances', value: 'Star Alliance (Lufthansa, Turkish, LOT), SkyTeam (Air France), oneworld (British Airways)' },
      { label: 'Best value months', value: 'Late October to November and mid-January to March; Christmas, Easter and summer peak' },
    ],
    cabins: [
      {
        airline: 'Lufthansa via Frankfurt or Munich',
        product: 'Business (lie-flat; Allegris suites on the newest aircraft)',
        note: 'Miami to Frankfurt flies on the 747-8 and Miami to Munich on the A350; Allegris, with its doored suites, is rolling out while the older 2-2-2 cabin remains on many 747s. The Frankfurt to Bucharest leg is two hours forty on an A320 family jet.',
      },
      {
        airline: 'Turkish Airlines via Istanbul',
        product: 'Business (lie-flat, 1-2-1 on the A350 and 787-9, 2-3-2 on the 777)',
        note: 'The Miami to Istanbul leg is long, around twelve hours, but the catering and the Istanbul lounge are strong, and the final hop to Bucharest is only ninety minutes. Often the lowest consolidator fare of the group.',
      },
      {
        airline: 'Air France via Paris',
        product: 'Business (lie-flat, 1-2-1, sliding door on refitted 777-300ERs)',
        note: 'Nine hours to Paris in a seat with a door on the refitted aircraft, then about three hours on to Bucharest. The layover at Charles de Gaulle Terminal 2 is usually short because both flights are Air France.',
      },
    ],
    tips: [
      'Istanbul connections are long in the air but the cheapest in my quotes more often than not, so if price leads your decision, ask me for Turkish Airlines first.',
      'Lufthansa through Munich usually beats Frankfurt on connection time and terminal size, and the Munich to Bucharest hop is a little shorter too.',
      'For the return, early-morning departures from Bucharest connect to the midday transatlantic flights and reach Miami the same afternoon, so the whole trip home happens in daylight.',
      'An open-jaw that lands in Bucharest and departs from Cluj, Vienna or Budapest works on the same one-stop structure, and I price it as a single ticket.',
    ],
    faqs: [
      {
        question: 'Is there a direct flight from Miami to Bucharest?',
        answer:
          'No. Nobody flies Miami to Bucharest nonstop, so the trip always involves one connection, usually in Frankfurt, Munich, Istanbul, Paris, London or Warsaw. I compare those connections on price, layover length and the cabin on the long leg, and send you the two or three that make sense.',
      },
      {
        question: 'How much is business class from Miami to Bucharest?',
        answer:
          'Published round-trip business fares on Miami to Bucharest typically run from about $4,500 to $7,000 because of the connection. My consolidator fares are usually 15–60% below that; the example on this page is $3,100 against a published $4,900, round trip per person.',
      },
      {
        question: 'How long does it take to fly from Miami to Bucharest?',
        answer:
          'Thirteen to fifteen hours in total. The transatlantic leg is between nine hours to Paris and about twelve hours to Istanbul, the layover is one to three hours, and the final flight into Bucharest takes from ninety minutes to roughly three hours depending on the hub.',
      },
      {
        question: 'Which connection is best for business class to Bucharest?',
        answer:
          'For the shortest total journey, Munich or Frankfurt on Lufthansa. For the lowest fare, Istanbul on Turkish Airlines is often the answer. For a seat with a door on the long leg, I look at the Air France refitted 777 through Paris. I check all three on your dates.',
      },
    ],
    related: ['miami-to-rome', 'miami-to-paris', 'san-francisco-to-frankfurt'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'new-york-to-london',
    path: '/business-class-flights/new-york-to-london',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'New York', code: 'JFK', airport: 'New York John F. Kennedy' },
    destination: { city: 'London', code: 'LHR', airport: 'London Heathrow' },
    title: 'New York to London Business Class Flights – Insider Fares (JFK–LHR)',
    description:
      'JFK to Heathrow business class on BA, American, Virgin, Delta and JetBlue at consolidator fares, typically 15–60% below published. WhatsApp +1 (786) 706-4828.',
    h1: 'New York to London business class flights, for less',
    intro: [
      'New York to London is the busiest premium route across the Atlantic, with British Airways, American Airlines, Virgin Atlantic, Delta and JetBlue all flying JFK to Heathrow and United adding more from Newark. That many lie-flat seats leaving every evening is the reason the published fare of $3,570 in my example became $2,625 through a consolidator contract, and why I can almost always find a seat on short notice.',
      'The eastbound flight is short for an overnight, about seven hours, so the departure time matters more than on longer routes. The main bank leaves JFK between 6 pm and 11 pm and lands at Heathrow from early morning; British Airways and Virgin also sell daytime flights that arrive in the evening, which many of my clients prefer because they get a full night in a bed before the first meeting.',
      'Coming home takes about eight hours against the wind, with departures spread across the whole day from London. On this route I quote by seat rather than by airline: the BA Club Suite, the Virgin Upper Class Suite on the A350, the Delta One Suite and the JetBlue Mint Suite all have doors, while some older aircraft on the same flight numbers still do not. The aircraft on your date decides which I recommend.',
    ],
    ...routeImage('london', 'The Houses of Parliament and the Thames at dusk'),
    exampleFare: { cabin: 'Business', published: '$3,570', derek: '$2,625', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'British Airways, American Airlines, Virgin Atlantic, Delta, JetBlue; United from Newark' },
      { label: 'Flight time', value: '≈ 7 h eastbound, ≈ 8 h westbound, nonstop' },
      { label: 'Departures', value: 'Main bank 6–11 pm from JFK plus several daytime flights; dozens of departures a day' },
      { label: 'Aircraft', value: 'Airbus A350 and A380, Boeing 777 and 787, Airbus A330neo, Airbus A321LR on JetBlue' },
      { label: 'Alliances', value: 'oneworld (BA, American), SkyTeam (Virgin Atlantic, Delta), JetBlue independent' },
      { label: 'Best value months', value: 'January to mid-March and November; Christmas, June to August and Wimbledon fortnight peak' },
    ],
    cabins: [
      {
        airline: 'British Airways',
        product: 'Club Suite (lie-flat, sliding door, 1-2-1)',
        note: 'Fitted on the A350, the 787-10 and most 777s on this route; the A380 and a few 777s still have the old eight-across Club World, which I avoid when a Club Suite flight is priced the same.',
      },
      {
        airline: 'Virgin Atlantic',
        product: 'Upper Class Suite (lie-flat, sliding door on the A350)',
        note: 'The A350-1000 Upper Class cabin has doors and a social space called The Loft; the 787-9 keeps the older herringbone seat that faces the aisle, so I tell you which aircraft is on your flight.',
      },
      {
        airline: 'JetBlue',
        product: 'Mint Suite (lie-flat, sliding door, 1-1 layout)',
        note: 'A small cabin on the A321LR with a door at every seat and two Mint Studios at the front; it is often the lowest business fare on the route and the one I suggest for solo travelers who want quiet.',
      },
    ],
    tips: [
      'Daytime flights to London are sometimes cheaper in business than the evening bank, and you arrive rested; ask me for the morning BA or Virgin departures if your schedule allows.',
      'If your dates are fixed, let me check Newark too: the United Polaris flights from Newark are often priced differently from JFK, and the extra twenty minutes in a car can be worth several hundred dollars.',
      'For a London trip that continues to Paris or Amsterdam, I book an open-jaw with the Eurostar in between; the fare into London and out of Paris is usually close to a plain return.',
      'Because there are so many flights, a same-week request on this route is routine; send me the dates and I come back the same day with seats I can ticket.',
    ],
    faqs: [
      {
        question: 'How much does business class cost from New York to London?',
        answer:
          'Published round-trip business fares from JFK to Heathrow usually sit between $3,000 and $6,000, with the cheapest fares in January and February. My consolidator fares typically run 15–60% below; the example on this page is $2,625 against a published $3,570, round trip per person.',
      },
      {
        question: 'Which airlines fly business class from JFK to London Heathrow?',
        answer:
          'British Airways, American Airlines, Virgin Atlantic, Delta and JetBlue all fly JFK to Heathrow nonstop with lie-flat business seats, and United flies from Newark. Between them there are dozens of departures a day, which is why I can usually find a seat even for travel this week.',
      },
      {
        question: 'How long is the flight from New York to London?',
        answer:
          'About seven hours eastbound and about eight hours on the way back. Evening departures from JFK land in London early the next morning; daytime departures land in the evening and give you a normal night in a hotel bed, which is why many of my clients choose them.',
      },
      {
        question: 'Is it cheaper to fly to London from JFK or Newark?',
        answer:
          'It changes week to week. United flies Newark to Heathrow with Polaris, and its consolidator fare is sometimes lower than the JFK carriers on the same dates, sometimes higher. I price both airports unless you tell me one is off the table, and show you the difference next to the published fare.',
      },
    ],
    related: ['miami-to-london', 'boston-to-dubai', 'chicago-to-rome'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'chicago-to-rome',
    path: '/business-class-flights/chicago-to-rome',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'Chicago', code: 'ORD', airport: 'Chicago O’Hare International' },
    destination: { city: 'Rome', code: 'FCO', airport: 'Rome Fiumicino' },
    title: 'Chicago to Rome Business Class Flights – Insider Fares (ORD–FCO)',
    description:
      'Business class Chicago to Rome on United, American and ITA Airways at consolidator fares, typically 15–60% below published prices. WhatsApp +1 (786) 706-4828.',
    h1: 'Chicago to Rome business class flights, for less',
    intro: [
      'Chicago to Rome Fiumicino has three nonstop airlines in the busy season: United, American and ITA Airways, with Lufthansa through Frankfurt or Munich as the strongest one-stop all year. In my example quote the published business fare was $5,060 and my consolidator fare $3,530, which is a typical gap for a route where the nonstops compete from spring through autumn.',
      'The eastbound flight takes around nine and a half hours. Departures leave Chicago in the late afternoon and early evening, so you sleep across the Atlantic and land in Rome late morning. The return is a daytime flight of roughly ten and a half to eleven hours, leaving Fiumicino around midday and arriving in Chicago in the middle of the afternoon with time to clear customs and make a connection.',
      'Seasonality shapes everything on this route. United and American run their Rome nonstops mainly from March or April until October, and ITA Airways also leans on the summer schedule, so in winter the one-stops through Frankfurt, Munich, Zurich, Paris or London do most of the work. The upside is that winter is when the consolidator fares drop furthest, and the connecting itineraries keep you lie-flat on the ocean leg.',
    ],
    ...routeImage('rome', 'The Colosseum in Rome at the end of the day'),
    exampleFare: { cabin: 'Business', published: '$5,060', derek: '$3,530', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'United, American Airlines, ITA Airways (nonstops are busiest from spring to autumn)' },
      { label: 'Flight time', value: '≈ 9 h 30 eastbound, ≈ 10 h 45 westbound, nonstop' },
      { label: 'Departures', value: 'Late afternoon and early evening from Chicago, arrive Rome late morning' },
      { label: 'Aircraft', value: 'Boeing 787 and 767 (United), Boeing 787 (American), Airbus A330neo or A350 (ITA Airways)' },
      { label: 'Alliances', value: 'Star Alliance (United, Lufthansa), oneworld (American), SkyTeam (ITA Airways)' },
      { label: 'Best value months', value: 'November to March; Easter, May to June and September to October are peak' },
    ],
    cabins: [
      {
        airline: 'United',
        product: 'Polaris (lie-flat, 1-2-1)',
        note: 'Every Polaris seat has aisle access and Chicago has a dedicated Polaris lounge before the flight; the 787 cabin is quieter than the older 767, so I note the aircraft in each quote.',
      },
      {
        airline: 'American Airlines',
        product: 'Flagship Business (lie-flat, 1-2-1)',
        note: 'The 787-8 has the earlier lie-flat seat without a door; retrofitted 787-9s carry the newer Flagship Suite. Flagship lounge access in Chicago is included with a business ticket on this route.',
      },
      {
        airline: 'ITA Airways',
        product: 'Business (lie-flat, 1-2-1, sliding door on the A330neo)',
        note: 'Both the A330neo and the A350 give direct aisle access from every seat, and the A330neo adds a sliding door; the ITA consolidator fare is often the lowest of the three nonstops.',
      },
    ],
    tips: [
      'Nonstop capacity to Rome from Chicago is seasonal, so for travel between November and March I usually quote Lufthansa through Munich or Swiss through Zurich; the total trip is about twelve hours and the long leg is lie-flat.',
      'Book summer Rome by March if you want a nonstop in business at a consolidator fare; by May the cheaper fare buckets on the Chicago flights are usually gone.',
      'An open-jaw into Rome and home from Milan or Venice fits the way most of my clients tour Italy, and on United, American and ITA it usually prices like a normal return.',
      'If Rome is one stop on a longer European trip, I can leave a gap for the train to Florence or Naples and still issue all the flights as one ticket, which keeps the fare rules simple.',
    ],
    faqs: [
      {
        question: 'How much is a business class flight from Chicago to Rome?',
        answer:
          'Published round-trip business fares from Chicago to Rome typically run between $4,500 and $8,000, with June and September at the top. My consolidator fares usually come in 15–60% below; the example on this page is $3,530 against a published $5,060, round trip per person.',
      },
      {
        question: 'Which airlines fly nonstop from Chicago to Rome?',
        answer:
          'United and American Airlines fly nonstop from Chicago to Rome Fiumicino, mostly between spring and autumn, and ITA Airways also operates the route. In winter I usually route you through Frankfurt, Munich, Zurich or Paris with a lie-flat seat on the transatlantic leg.',
      },
      {
        question: 'How long is the flight from Chicago to Rome?',
        answer:
          'About nine and a half hours eastbound on the nonstop and ten and three-quarter hours on the way home. Through a European hub, add roughly two to three hours; a Munich connection, for example, comes to around twelve hours in total.',
      },
      {
        question: 'What is the best time of year to fly business class to Rome from Chicago?',
        answer:
          'For price, November through March, outside the holidays. For the nonstop schedule, April through October, when all three airlines fly the route daily. If you want both a nonstop and a low consolidator fare, late October and early April are the sweet spots.',
      },
    ],
    related: ['miami-to-rome', 'new-york-to-london', 'san-francisco-to-frankfurt'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'los-angeles-to-tokyo',
    path: '/business-class-flights/los-angeles-to-tokyo',
    corridor: CORRIDOR_ALL,
    origin: { city: 'Los Angeles', code: 'LAX', airport: 'Los Angeles International' },
    destination: { city: 'Tokyo', code: 'HND', airport: 'Tokyo Haneda (also Narita, NRT)' },
    title: 'Los Angeles to Tokyo Business Class Flights – Insider Fares (LAX–HND)',
    description:
      'LAX to Tokyo business class on ANA, JAL, American, Delta and United at consolidator fares, typically 15–60% below published. WhatsApp +1 (786) 706-4828.',
    h1: 'Los Angeles to Tokyo business class flights, for less',
    intro: [
      'Los Angeles to Tokyo is the transpacific route with the deepest business class competition: ANA, Japan Airlines, American and Delta fly nonstop to Haneda, and JAL, United and Singapore Airlines serve Narita. In my example quote the published business fare was $6,185 and my consolidator fare $4,200, a saving of almost $2,000 on a flight where the seat matters for eleven and a half hours.',
      'Westbound block time is around eleven and a half to twelve hours; the return is closer to ten because the jet stream pushes you home. Most departures leave Los Angeles in the early afternoon and land in Tokyo the following afternoon or early evening, with a few late-night flights that arrive the morning after next, local date. Haneda sits twenty to thirty minutes from central Tokyo, Narita about an hour by express train.',
      'The reason I quote this route by aircraft is that the hard product varies enormously. ANA flies The Room on its 777-300ERs, one of the widest business seats anywhere, while its 787s carry a standard staggered seat; JAL has brand-new suites on the A350-1000 but older Sky Suites on the 777 and 787. A consolidator fare on the right flight number gets you the best seat on the route for less than the worst one at published prices.',
    ],
    ...routeImage('tokyo', 'Tokyo streets lit up at night'),
    exampleFare: { cabin: 'Business', published: '$6,185', derek: '$4,200', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'ANA, Japan Airlines, American, Delta (Haneda); JAL, United, Singapore Airlines (Narita)' },
      { label: 'Flight time', value: '≈ 11 h 30 westbound to Tokyo, ≈ 10 h eastbound, nonstop' },
      { label: 'Departures', value: 'Mostly early afternoon from LAX, arrive Tokyo next afternoon; a few late-night options' },
      { label: 'Aircraft', value: 'Boeing 777-300ER and 787 (ANA, JAL), Airbus A350-1000 (JAL), A350-900 (Delta), 787-9 (American, United)' },
      { label: 'Alliances', value: 'Star Alliance (ANA, United, Singapore), oneworld (JAL, American), SkyTeam (Delta)' },
      { label: 'Best value months', value: 'Mid-January to February and early December; cherry blossom, Golden Week, Obon and New Year peak' },
    ],
    cabins: [
      {
        airline: 'ANA',
        product: 'The Room (lie-flat, sliding door, 1-2-1) on the 777-300ER',
        note: 'The widest business seat I can book across the Pacific, with a door and a seat that doubles as a sofa; the 787 flights on the same route carry the older staggered cabin, so I always check the aircraft before quoting.',
      },
      {
        airline: 'Japan Airlines',
        product: 'Business Class Suite (lie-flat, sliding door) on the A350-1000',
        note: 'The A350-1000 flies Haneda and has doored suites with large screens and more privacy; the 777 and 787 keep the earlier Sky Suite, still fully flat but without a door.',
      },
      {
        airline: 'Delta',
        product: 'Delta One Suite (lie-flat, closed door, 1-2-1) on the A350',
        note: 'Delta flies Haneda with the A350-900, so every seat has a door and direct aisle access; it is frequently the best-priced option with a suite when ANA and JAL are full, and the Delta Sky Club at LAX is included.',
      },
    ],
    tips: [
      'Haneda is the airport to ask for; it saves an hour each way compared with Narita, and the consolidator fares to Haneda are often no higher than to Narita.',
      'Late March to mid-April for the cherry blossoms is the single most expensive period in business class, so I need those dates four to six months ahead to hold a consolidator seat.',
      'If you are continuing to Osaka, Fukuoka or Sapporo, I ticket the domestic leg on ANA or JAL in the same booking; the add-on usually costs little and the connection at Haneda is simple.',
      'A one-stop through Seoul on Korean Air or through Taipei on EVA or STARLUX can undercut the nonstops in a lie-flat seat, and the total journey is only two to three hours longer.',
    ],
    faqs: [
      {
        question: 'How much does business class cost from Los Angeles to Tokyo?',
        answer:
          'Published round-trip business fares from Los Angeles to Tokyo typically run from about $5,500 to $9,000, with spring and the year-end holidays at the top. A consolidator fare usually cuts that by 15–60%; the example on this page is $4,200 against a published $6,185, round trip per person.',
      },
      {
        question: 'Should I fly into Haneda or Narita from Los Angeles?',
        answer:
          'Haneda, unless the fare difference is large. It is twenty to thirty minutes from central Tokyo versus about an hour from Narita by express train, and ANA, JAL, American and Delta all fly there nonstop from LAX. I price both airports and show you the difference.',
      },
      {
        question: 'How long is the flight from LAX to Tokyo?',
        answer:
          'Around eleven and a half hours westbound and roughly ten hours coming back to Los Angeles. Early-afternoon departures land in Tokyo the next afternoon; because you cross the date line, the return often lands in Los Angeles earlier on the clock than it left Tokyo.',
      },
      {
        question: 'Which airline has the best business class from Los Angeles to Tokyo?',
        answer:
          'On hard product, ANA with The Room on the 777-300ER and JAL with the A350-1000 suite lead the route; Delta One Suite on the A350 is the strongest US-carrier option. Which one I recommend depends on the aircraft assigned to your date and on the consolidator fare that day, both of which I check before I quote.',
      },
    ],
    related: ['san-francisco-to-frankfurt', 'boston-to-dubai', 'new-york-to-london'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'san-francisco-to-frankfurt',
    path: '/business-class-flights/san-francisco-to-frankfurt',
    corridor: CORRIDOR_EUROPE,
    origin: { city: 'San Francisco', code: 'SFO', airport: 'San Francisco International' },
    destination: { city: 'Frankfurt', code: 'FRA', airport: 'Frankfurt Airport' },
    title: 'San Francisco to Frankfurt Business Class Flights – Insider Fares',
    description:
      'SFO to Frankfurt business class on Lufthansa, United and Condor at consolidator fares, typically 15–60% below published. WhatsApp +1 (786) 706-4828.',
    h1: 'San Francisco to Frankfurt business class flights, for less',
    intro: [
      'San Francisco to Frankfurt is an eleven-hour flight, long enough that the cabin on the long leg is the whole decision. Lufthansa and United fly it nonstop year-round, and Condor adds a third option on several days a week with a surprisingly good lie-flat cabin. In my example quote the published business fare was $5,550 and my consolidator fare $3,870, which is the kind of gap I see most weeks on this route.',
      'Departures leave San Francisco from early afternoon to early evening, so the eastbound leg is an overnight flight that lands in Frankfurt the next morning or around midday. The return is nearly twelve hours and leaves Frankfurt in the morning or early afternoon, arriving in San Francisco the same afternoon local time. Frankfurt is the Lufthansa hub, so Berlin, Vienna, Zurich, Milan or Warsaw are one short hop away on the same ticket.',
      'What makes this route interesting right now is the generational change in the seats. Lufthansa is rolling out Allegris, a business cabin with several seat types including doored suites, across its long-haul fleet, while the Boeing 747-8s that still carry much of the San Francisco schedule keep the older 2-2-2 layout. United Polaris on the 777-300ER already gives every seat aisle access. I quote the seat, not just the airline.',
    ],
    ...routeImage('frankfurt', 'The Frankfurt skyline across the river Main'),
    exampleFare: { cabin: 'Business', published: '$5,550', derek: '$3,870', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'Lufthansa, United (daily); Condor on several days a week' },
      { label: 'Flight time', value: '≈ 11 h eastbound, ≈ 11 h 45 westbound, nonstop' },
      { label: 'Departures', value: 'Early afternoon to early evening from SFO, arrive Frankfurt next morning or midday' },
      { label: 'Aircraft', value: 'Boeing 747-8 and Airbus A350 or A380 (Lufthansa), Boeing 777 (United), Airbus A330neo (Condor)' },
      { label: 'Alliances', value: 'Star Alliance (Lufthansa, United); Condor independent' },
      { label: 'Best value months', value: 'November and mid-January to February; summer and Frankfurt trade-fair weeks cost the most' },
    ],
    cabins: [
      {
        airline: 'Lufthansa',
        product: 'Business, Allegris on refitted aircraft (lie-flat; suites with doors available)',
        note: 'Allegris offers several seat types, from standard lie-flat to a Suite with a sliding door, sold at different prices; aircraft not yet refitted keep the 2-2-2 cabin. I tell you which cabin is scheduled and what the Suite upgrade costs.',
      },
      {
        airline: 'United',
        product: 'Polaris (lie-flat, 1-2-1)',
        note: 'Direct aisle access from every seat on the 777-300ER, a Polaris lounge at San Francisco before departure, and often the most consistent product on the route because there is only one cabin version.',
      },
      {
        airline: 'Condor',
        product: 'Business (lie-flat, 1-2-1) on the A330neo',
        note: 'A new Airbus A330-900 fleet with a fully flat seat and aisle access for everyone, plus Prime seats at the front with more space; Condor is a leisure airline, but the consolidator fare can be the lowest of the three.',
      },
    ],
    tips: [
      'Frankfurt hosts large trade fairs through the year, Ambiente in February and the Book Fair in October among them, and business fares jump during those weeks; tell me your dates and I will say if you are landing in one.',
      'If Munich works as well as Frankfurt for your onward plans, Lufthansa also flies San Francisco to Munich nonstop, and the Munich flights get Allegris aircraft more often.',
      'Condor is worth a look when the two Star Alliance carriers are expensive; the seat is fully flat and I can usually confirm it the same day.',
      'For Switzerland or Austria, an open-jaw out of Zurich or Vienna on Swiss or Austrian costs little more than a Frankfurt round trip and avoids a backtrack through Germany.',
    ],
    faqs: [
      {
        question: 'How much is business class from San Francisco to Frankfurt?',
        answer:
          'Published round-trip business fares between San Francisco and Frankfurt generally sit between $5,000 and $8,500, with summer and trade-fair weeks at the top. The fares I quote through consolidators typically sit 15–60% lower; the example on this page is $3,870 against a published $5,550, round trip per person.',
      },
      {
        question: 'Which airlines fly nonstop from San Francisco to Frankfurt?',
        answer:
          'Lufthansa and United fly nonstop every day, and Condor operates the route on several days a week. Each of them flies a widebody with a lie-flat business cabin; the layout ranges from the 2-2-2 cabin on older Lufthansa jets to 1-2-1 with doors on the newest Allegris aircraft.',
      },
      {
        question: 'How long is the flight from San Francisco to Frankfurt?',
        answer:
          'About eleven hours eastbound and close to twelve hours on the return. The outbound is an overnight flight that lands in Frankfurt the next morning or around midday; the westbound flight is a long daytime flight that arrives in San Francisco the same afternoon.',
      },
      {
        question: 'What is Lufthansa Allegris and will I get it on this route?',
        answer:
          'Allegris is the new Lufthansa long-haul cabin, with business seats that range from a standard lie-flat to a Suite with a sliding door. It is on the newest A350s and is being retrofitted across the fleet, but many San Francisco flights still use the 747-8 with the older cabin. I check the aircraft on your date.',
      },
    ],
    related: ['chicago-to-rome', 'los-angeles-to-tokyo', 'miami-to-bucharest'],
  },
  {
    approvedForIndexing: true,
    updated: UPDATED,
    slug: 'boston-to-dubai',
    path: '/business-class-flights/boston-to-dubai',
    corridor: CORRIDOR_ALL,
    origin: { city: 'Boston', code: 'BOS', airport: 'Boston Logan International' },
    destination: { city: 'Dubai', code: 'DXB', airport: 'Dubai International' },
    title: 'Boston to Dubai Business Class Flights – Insider Fares (BOS–DXB)',
    description:
      'Boston to Dubai business class on Emirates nonstop, or via Doha on Qatar Airways, typically 15–60% below published fares. WhatsApp +1 (786) 706-4828.',
    h1: 'Boston to Dubai business class flights, for less',
    intro: [
      'Emirates is the only airline flying Boston to Dubai nonstop, a daily Boeing 777-300ER that covers the 6,600 miles in about twelve and a half hours. With a single carrier on the nonstop, the published fare has little competition, which is exactly where a consolidator contract earns its keep: my example quote came to $3,400 in business against a published $5,041.',
      'The Emirates flight typically leaves Boston late in the evening and lands in Dubai the following evening local time; the return departs Dubai in the small hours and reaches Boston in the morning of the same day, so you arrive with a full day ahead. Dubai is also the gateway to the Emirates network, with same-terminal connections to India, the Maldives, East Africa and Southeast Asia.',
      'The one-stops are serious alternatives, not consolation prizes. Qatar Airways flies Boston to Doha nonstop and connects to Dubai in under an hour and a half, and the Qsuite on that long leg is a business seat with a closed door. British Airways through London and Turkish Airlines through Istanbul also work well, and on many dates one of them beats the Emirates fare by a wide margin.',
    ],
    ...routeImage('dubai', 'The Dubai skyline lit up at night'),
    exampleFare: { cabin: 'Business', published: '$5,041', derek: '$3,400', label: FARE_LABEL },
    facts: [
      { label: 'Nonstop airlines', value: 'Emirates (daily); one stop on Qatar Airways via Doha, British Airways via London, Turkish via Istanbul' },
      { label: 'Flight time', value: '≈ 12 h 30 eastbound, ≈ 14 h westbound, nonstop' },
      { label: 'Departures', value: 'Late evening from Boston, arrive Dubai the next evening; return lands Boston in the morning' },
      { label: 'Aircraft', value: 'Boeing 777-300ER (Emirates), Airbus A350 (Qatar Airways), Boeing 777 or 787 (British Airways)' },
      { label: 'Alliances', value: 'Emirates independent; Qatar Airways and British Airways are oneworld, Turkish is Star Alliance' },
      { label: 'Best value months', value: 'June to September, when Dubai is hottest; November to March, Dubai Shopping Festival and Eid peak' },
    ],
    cabins: [
      {
        airline: 'Emirates',
        product: 'Business (lie-flat, 2-3-2 on most 777-300ERs; 1-2-1 on refitted aircraft)',
        note: 'The older 777 layout seats seven across, so a middle seat means climbing over someone; the retrofitted aircraft move to a 1-2-1 cabin with direct aisle access. I check which version is on your date and seat couples at the window pair.',
      },
      {
        airline: 'Emirates First',
        product: 'First Class suite (closed door, 1-2-1)',
        note: 'The 777 first cabin has fully enclosed suites; on the handful of 777s refitted with the Game Changer product the suites have floor-to-ceiling doors and virtual windows. There is no onboard shower on the 777, that is an A380 feature.',
      },
      {
        airline: 'Qatar Airways via Doha',
        product: 'Qsuite (lie-flat, sliding door, 1-2-1)',
        note: 'The Boston to Doha leg is on the A350 with the Qsuite, a doored business seat that can form a double bed for couples; the Doha to Dubai hop takes about seventy minutes. Often the lowest fare into Dubai from Boston.',
      },
    ],
    tips: [
      'Summer is the quiet season for Dubai because of the heat, and that is when the Emirates consolidator fare drops furthest; if your trip can move to June, July or September, tell me.',
      'Ask me to price first class as well as business on Emirates; with a consolidator contract the step up is often smaller than the published fares suggest, especially midweek.',
      'If Dubai is the start of a longer trip to the Maldives, India or Southeast Asia, I price the whole journey as one Emirates ticket; the onward legs usually cost much less than booking them separately.',
      'When the Emirates flight is full in business, the Qatar Airways connection through Doha gets you a Qsuite with a door for the long leg and adds only two to three hours to the trip.',
    ],
    faqs: [
      {
        question: 'How much is business class from Boston to Dubai?',
        answer:
          'Published round-trip business fares from Boston to Dubai on the nonstop typically run from about $4,500 to $8,000, with the winter high season at the top. With a consolidator contract I usually take 15–60% off that; the example on this page is $3,400 against a published $5,041, round trip per person.',
      },
      {
        question: 'Which airline flies nonstop from Boston to Dubai?',
        answer:
          'Only Emirates, with a daily Boeing 777-300ER. Qatar Airways flies Boston to Doha nonstop and connects to Dubai in about seventy minutes, and British Airways and Turkish Airlines offer one-stops through London and Istanbul. I price all of them for your dates.',
      },
      {
        question: 'How long is the flight from Boston to Dubai?',
        answer:
          'About twelve and a half hours eastbound and around fourteen hours on the return against the wind. Through Doha, count on roughly fifteen to sixteen hours in total including the connection. Both the nonstop and the Doha routing are lie-flat on the long leg.',
      },
      {
        question: 'Is Emirates business class on the Boston flight a good seat?',
        answer:
          'It is fully flat, with excellent catering and lounge access, but most of the 777-300ERs on this route still have the 2-3-2 layout, so solo travelers in the middle do not get direct aisle access. Emirates is refitting aircraft with a 1-2-1 cabin; I check which version is scheduled before I quote.',
      },
    ],
    related: ['new-york-to-london', 'los-angeles-to-tokyo', 'miami-to-london'],
  },
];

export const routePageBySlug = Object.fromEntries(routePages.map((page) => [page.slug, page]));
export const routePageByPath = Object.fromEntries(routePages.map((page) => [page.path, page]));
