// Long-form guides for /blog. Same shape as the drafts in siteData.js plus
// publishedTime, author, image and imageAlt.
//
// TODO(owner-data): the fare pairs quoted inside the articles are the example
// quotes from CLAUDE.md 4.3 / routeDeals, always introduced as examples.
// Replace them with Derek's real recent bookings when he supplies them.

export const articles = [
  {
    approvedForIndexing: true,
    slug: "why-travelers-overpay-business-class",
    seoTitle: "Why Travelers Overpay for Business Class: 5 Checks",
    title: "Why Travelers Overpay for Business Class: 5 Checks Before You Book",
    category: "Business Class Tips",
    excerpt:
      "The airline's website shows one price and most travelers assume it is the only one. Five checks that separate a fair business class fare from an overpaid one.",
    publishedTime: "2026-10-24",
    author: "Derek Monti",
    image: "/images/routes/london.webp",
    imageAlt: "Westminster and the Thames at dusk, the arrival city for a New York to London business class example",
    sections: [
      {
        heading: "Why do so many travelers overpay for business class?",
        paragraphs: [
          "Most people who overpay for business class do nothing wrong. They open the airline's website, type in New York to London, pick a date and see a business class fare of $3,570. They assume that number is the price, because for almost everything else we buy, the price on the maker's website is the price.",
          "Airline tickets do not work that way. For the same flight and the same seat, a recent quote I sent a client came to $2,625: $3,570 published, $2,625 my fare, about 26% less. Nothing about the bed, the lounge or the meal changed. Only the channel the ticket was bought through.",
          "After enough premium bookings you learn where the money leaks. It comes down to five checks, and most of them take minutes. Run them before you pay for any long-haul business class ticket.",
        ],
      },
      {
        heading: "Check 1: Is the fare you see the only fare that exists?",
        paragraphs: [
          "Airlines file their public fares through a central system, and those published fares are what you see on the airline's website, on Google Flights, on Kayak and on Expedia. Every one of those sites is looking at the same shelf.",
          "There is a second shelf. Airlines also sign net-fare contracts with consolidators, who distribute those fares to accredited travel agencies. Consolidator fares are not published online, and the contracts usually forbid advertising them. You only see one when an agent with access to the contract quotes it to you.",
          "They are most common exactly where the money is largest: international business and first class. That is why they matter so much more on a $5,000 ticket than on a $400 economy seat. If you only search the public sites, you have compared every store that sells at retail and skipped the wholesaler.",
          "A quick way to see this for yourself: the next time an agent with consolidator access sends you a quote, look up the same flights on the airline's website. If the agent is doing the job properly, both numbers are already in the quote.",
        ],
      },
      {
        heading: "Check 2: Did you price the one-stop?",
        paragraphs: [
          "A nonstop is worth paying for on a seven-hour flight. On a 14-hour trip it is less obvious, and the one-stop is often where the real savings sit. Hub airlines price aggressively to pull traffic through their home airports: Qatar Airways through Doha, Turkish Airlines through Istanbul, Emirates through Dubai, TAP through Lisbon, Aer Lingus through Dublin.",
          "For example, a recent Boston to Dubai business class quote: $5,041 published, my fare $3,400. A recent Washington Dulles to Cairo quote, routed with one connection: $4,140 published, my fare $2,737. In both cases the connection added a couple of hours and a lounge visit, and removed well over a thousand dollars.",
          "Also look at the flights airlines operate between two foreign cities on their way home. Emirates flies New York JFK to Milan and Newark to Athens; Singapore Airlines flies JFK to Frankfurt. Same aircraft and cabin as the long-haul, often priced very differently from the home airline on that route.",
          "When is the nonstop still right? Daytime flights of eight hours or less, trips where every hour at the destination counts, and travelers who sleep badly on planes and would rather do it once. I price both and tell you which one I would take.",
        ],
      },
      {
        heading: "Check 3: Are your dates doing the work for you?",
        paragraphs: [
          "Business cabins are sold in booking classes, and the cheapest ones hold only a few seats per flight. When those seats sell, the price jumps to the next class, often by $800 to $1,500 on a transatlantic ticket. Move one day earlier or later and you can land back in the cheap class.",
          "That is why every fare I quote comes with a window of three days either side. A Tuesday or Wednesday departure is frequently cheaper than Friday or Sunday. Flying to Europe in late October or February instead of July can take a third off the published fare before any consolidator contract is applied.",
          "Tell me what is fixed and what is not. If the meeting is on the 14th, the outbound is fixed. The return rarely is, and that single flexible leg is often where I find the better price.",
        ],
        bullets: [
          "Fixed: meetings, cruise departures, weddings, hotel dates you cannot move.",
          "Flexible: the return date, a red-eye instead of a daytime flight, a Monday instead of a Sunday.",
          "Worth asking: whether shifting the whole trip by two days opens a cheaper booking class.",
        ],
      },
      {
        heading: "Check 4: Did you look at the seat, or just the word “Business”?",
        paragraphs: [
          "“Business class” covers everything from a fully flat bed behind a sliding door to a recliner with a footrest. Qatar Airways' Qsuite, British Airways' Club Suite, Delta One Suites and United Polaris are all flat beds with direct aisle access. Several airlines still fly older cabins laid out 2-3-2 or 2-2-2, where the window passenger climbs over a neighbor at 3 a.m.",
          "Turkish Airlines is a good example of why the aircraft matters more than the airline. Its Boeing 787s and Airbus A350s have 1-2-1 cabins with aisle access from every seat; many of its 777s have a 2-3-2 layout. Same airline, same fare, two very different nights.",
          "Then check every segment. A ticket sold as business class can include a domestic connection in a recliner, or a short European hop in an economy seat with the middle seat blocked. That is normal, but you should know it before you pay, not when you board. I list the aircraft and seat type for every leg on every quote.",
        ],
      },
      {
        heading: "Check 5: Did you read the fare rules before paying?",
        paragraphs: [
          "Two tickets at the same price can carry completely different rules. One is refundable for a fee, the other is not. One allows date changes for $300 plus any fare difference, the other charges $750. One earns full miles, the other earns a fraction.",
          "Consolidator fares tend to be stricter than the airline's flexible published fares and similar to its discounted ones. Most are non-refundable; most allow changes for a fee. Whether that matters depends on how likely your plans are to move. Paying $1,000 extra for a fully refundable fare only makes sense if the chance you will cancel is real.",
          "Ask for the rules in plain English before you commit. I write them into the quote next to the price so there are no surprises at the airport.",
        ],
        bullets: [
          "Change fee, and whether changes are still allowed after the outbound flight.",
          "Refund policy, including the penalty if a refund is allowed at all.",
          "Mileage earning for the booking class, as a percentage of miles flown.",
          "Upgrade eligibility, if you hold miles with the airline.",
          "Who processes a change: the airline, or the agency that issued the ticket.",
        ],
      },
      {
        heading: "What does a fair business class quote look like?",
        paragraphs: [
          "When I send a quote, it has two or three itineraries, not twenty. For each one you see the airline, the flight numbers, the aircraft, the seat type on every leg, the published fare as shown on the airline's website that day, my fare, and the rules.",
          "For example, Los Angeles to Tokyo Haneda in business: $6,185 published, my fare $4,200, with the carrier, aircraft and cabin spelled out per leg. Fares move daily, so a quote holds only while the booking class stays open. The structure never changes, and you can verify every published number yourself in two minutes.",
          "I also tell you which option I would book myself, and why. Sometimes that is the more expensive one, because a 6 a.m. arrival after a night in a 2-3-2 cabin is a bad way to start a week of meetings.",
          "Run the five checks and you will rarely overpay again. Skip them and the airline's website will happily charge you the full published fare for the same seat someone three rows away bought for a thousand dollars less.",
        ],
      },
      {
        heading: "Want me to price your route?",
        paragraphs: [
          "Send me the route, your dates and how flexible they are, and the number of travelers, on WhatsApp or through the quote form. I come back with two or three real options, the published fare next to mine, and the rules in plain English. The quote is free and commits you to nothing.",
        ],
      },
    ],
  },
  {
    approvedForIndexing: true,
    slug: "business-class-service-beyond-seat",
    seoTitle: "Business Class Is More Than the Seat: What to Check",
    title: "Business Class Is More Than the Seat: What to Check Before You Book",
    category: "Business Class Tips",
    excerpt:
      "Lie-flat or angled, which lounge, which cabin on the connecting leg, what the fare class strips out: what decides whether a business class ticket is good.",
    publishedTime: "2026-10-24",
    author: "Derek Monti",
    image: "/images/routes/cabin.webp",
    imageSmall: "/images/routes/cabin.webp",
    imageAlt: "Lie-flat business class seat in a long-haul cabin with warm mood lighting",
    sections: [
      {
        heading: "What is actually included in a business class ticket?",
        paragraphs: [
          "On a long-haul international flight, a business class ticket normally includes a seat that converts into a bed, priority check-in and boarding, lounge access at the departure airport and at any connection, two checked bags of up to 32 kg each on flights to and from the United States, a multi-course meal service, bedding and an amenity kit.",
          "That is the baseline. Around it, airlines add their own extras. Emirates includes a chauffeur-drive service on many business fares. Qatar Airways has been rolling out free Starlink Wi-Fi across much of its fleet. Singapore Airlines lets you pre-order main courses through Book the Cook. Turkish Airlines puts a chef in the cabin on long-haul flights.",
          "Here is the catch. None of that is guaranteed just because the booking says “Business”. The aircraft, the route, the connecting flight and the fare class all change what you receive. The checks below take a few minutes and prevent the most common disappointments.",
        ],
      },
      {
        heading: "Lie-flat vs angled lie-flat vs recliner: what is the difference?",
        paragraphs: [
          "A fully flat seat reclines to 180 degrees and becomes a horizontal bed. An angled lie-flat seat reclines to roughly 160 to 170 degrees, so you sleep on a slope and slide towards your feet. A recliner is what domestic first class in the United States gives you: a wider seat with a footrest, and nothing like a bed.",
          "On a six-hour overnight flight to Europe, that difference is the difference between arriving rested and arriving wrecked. Today nearly every major carrier flies fully flat seats across the Atlantic and the Pacific, but angled seats and recliners still exist on older aircraft, on some leisure carriers, and on many shorter international flights.",
          "The second thing to check is the layout. A 1-2-1 cabin gives every passenger direct access to the aisle. In a 2-2-2 or 2-3-2 cabin, the window passenger climbs over a neighbor to get out. Qatar Airways' Qsuite, British Airways' Club Suite, Air France's newest business cabin, Delta One Suites and United Polaris are all 1-2-1 with aisle access; several airlines still fly older 2-3-2 cabins on part of their fleet.",
        ],
      },
      {
        heading: "How do I know which seat I will get on my flight?",
        paragraphs: [
          "The aircraft type decides the seat, and the same airline often flies two or three generations of business class at once. Emirates' Airbus A380 business cabin is 1-2-1; many of its Boeing 777s are 2-3-2. Turkish Airlines' A350s and 787s are 1-2-1; many of its 777s are 2-3-2. Lufthansa is introducing its Allegris cabin while older seats remain on much of the fleet.",
          "When you book on your own, look up the aircraft type on the booking page and open the seat map before paying. Airlines swap aircraft, especially on routes with several daily flights, and a swap can change the seat without any change to your ticket.",
          "Read the seat map with a purpose. In staggered cabins, alternate rows put the window seats either right against the window or next to the aisle, and the difference in privacy is large. Seats by the galley and the lavatories are noisier. The paired middle seats suit couples and nobody else.",
          "When you book with me, I check the aircraft and the seat map for every leg, tell you which product you are getting, and point out where a different flight number on the same day gives you the newer cabin for the same money. That is often the most useful thing I do on a quote.",
        ],
      },
      {
        heading: "Is lounge access included in business class?",
        paragraphs: [
          "Yes. On international business class tickets you have lounge access before departure and at connecting airports, either the airline's own lounge or a partner's. Which lounge matters. At a hub you get the flagship: Qatar Airways' Al Mourjan in Doha, the Turkish Airlines lounge in Istanbul, Emirates' lounges in Dubai, Cathay Pacific's The Pier in Hong Kong, Singapore Airlines' SilverKris at Changi. At a foreign outstation you may be sent to a contract lounge that is a room with sandwiches.",
          "Arrivals lounges are rarer. British Airways and Virgin Atlantic run arrivals lounges at London Heathrow with showers, which is worth knowing if you land at 7 a.m. with a 10 a.m. meeting.",
          "Two things to watch. On a mixed-cabin ticket, lounge access applies at the airports where you depart in business, not necessarily at the one where you connect in economy. And at some smaller airports there is no lounge at all, only a voucher for the café. Ask which lounge you get at each airport, not just whether you get one.",
        ],
      },
      {
        heading: "What is a mixed-cabin itinerary, and how do you avoid one by accident?",
        paragraphs: [
          "A mixed-cabin itinerary is a ticket where not every flight is in the cabin you paid for. The most common versions are a domestic connection in a recliner or in economy before the long-haul flat bed, and a short European or Asian hop in an economy-style seat with the middle seat kept empty.",
          "Booking sites often label the whole ticket by its highest cabin, so the confirmation says “Business” and the surprise arrives at the gate in Dallas or Düsseldorf. Sometimes the compromise is fine: a 50-minute hop from Frankfurt to Munich does not need a bed. A four-hour overnight connection does.",
          "The questions are simple. Which cabin on each flight? Which aircraft on the long-haul? Is the connecting flight overnight? I show the cabin for each segment on every quote and flag anything that is not what you would expect.",
        ],
        bullets: [
          "Check the cabin of every segment, not the label on the ticket.",
          "Give the longest and the overnight legs the most weight.",
          "Treat intra-Europe “business” as a wider economy seat with a blocked middle, plus lounge access.",
          "Ask whether a different connection puts you in a flat bed on the long leg for similar money.",
        ],
      },
      {
        heading: "Does the fare class change what I get, even in business?",
        paragraphs: [
          "Increasingly, yes. Several European airlines now sell “Business Light” fares that strip out things like free seat selection, flexibility and in some cases even a checked bag. Emirates' cheapest business fares exclude chauffeur-drive and earn fewer miles. Many airlines pay reduced mileage on their lowest business booking classes.",
          "Consolidator fares, the ones I use most, come with their own rules: most are non-refundable, changes carry a fee, and mileage earning can be reduced depending on the booking class. In exchange, the price is typically 15 to 60% below the published fare. For example, a recent San Francisco to Frankfurt business class quote: $5,550 published, my fare $3,870.",
          "What matters is that you know the rules before you buy. I write the change fee, the refund policy and the mileage earning into each quote in plain English, next to the price.",
        ],
        bullets: [
          "Is seat selection free, or paid until check-in?",
          "Is a checked bag included, and how many?",
          "What is the change fee, and is the fare refundable at all?",
          "What percentage of miles does this booking class earn?",
          "Are the airline's extras, such as chauffeur-drive, included on this fare type?",
        ],
      },
      {
        heading: "What about food, bedding, Wi-Fi and baggage?",
        paragraphs: [
          "These vary more than people expect. Dine-on-demand, where you eat when you want rather than when the trolley arrives, is standard on Qatar Airways and offered by a growing list of carriers. Proper duvets and mattress pads are standard on Qatar Airways, Japan Airlines and ANA, and on most of the new cabins in Europe and the United States.",
          "Wi-Fi is the fastest-changing part. Free high-speed Wi-Fi is now normal on Qatar Airways' Starlink-equipped aircraft and for Delta SkyMiles members on most of Delta's fleet, while other airlines still charge for it in business class. If you need to work for eight hours, ask before you book.",
          "Baggage is generous and consistent: two bags of up to 32 kg each is the usual business allowance on flights to and from the United States, and priority tags mean they come out first. Check it anyway on the lightest fare types.",
        ],
      },
      {
        heading: "Want me to price your route?",
        paragraphs: [
          "Tell me where you are flying, when, with how many people, and what you care about most: the bed, the schedule, the lounge or the price. Message me on WhatsApp or use the quote form. I send back two or three itineraries with the aircraft, seat and cabin spelled out for every leg, the published fare next to mine, and the rules in plain English.",
        ],
      },
    ],
  },
  {
    approvedForIndexing: true,
    slug: "last-minute-business-class",
    seoTitle: "Last Minute Business Class Flights: Fares in 48 Hours",
    title: "Last Minute Business Class Flights: How to Get a Good Fare in 48 Hours",
    category: "Travel Hacks",
    excerpt:
      "Business cabins often leave with empty seats. What is realistic 24, 48 and 72 hours before departure, which routings still work, and what to send me.",
    publishedTime: "2026-10-24",
    author: "Derek Monti",
    image: "/images/routes/dubai.webp",
    imageAlt: "Dubai skyline at night, a hub that keeps one-stop business class options open at short notice",
    sections: [
      {
        heading: "Can you really get a good business class fare 48 hours before departure?",
        paragraphs: [
          "Yes, more often than the airline's website suggests. Airlines price their last-minute business fares for the corporate traveler whose company pays whatever it costs, which is why a walk-up business class fare from Miami to London can show $7,000 or $8,000 two days out. That number is a statement about who the airline expects to buy, not about how many seats are left.",
          "The seats are usually there. Business cabins on long-haul flights regularly depart with empty seats, and the booking classes agents use for consolidator fares are frequently still open the day before departure. Those contract fares were set months ago and do not spike because the calendar got close.",
          "What you give up at 48 hours is choice, not the chance of a fair price. The very cheapest booking classes are often gone, the nonstop may be full, and you may need to accept a connection or a different airport. What you can still avoid, almost always, is paying the walk-up fare.",
        ],
      },
      {
        heading: "What happens to business class prices in the last 72 hours?",
        paragraphs: [
          "Two things move at once. The airline's published fare usually climbs, because the cheaper booking classes close as seats sell and the airline's system assumes late bookers are not price-sensitive. On some routes with soft demand the opposite happens and the airline quietly opens a cheaper class to fill the cabin, but you cannot plan a trip around that.",
          "Consolidator fares behave differently. The price in the contract is fixed; what changes is whether the booking class the contract requires is still open on your flight. If it is, the fare is the same as it would have been a month ago. If it has closed, I look at the next flight, the next airport or the one-stop.",
          "Advance purchase rules are the other factor. Many published discount fares require booking 7, 14 or 21 days ahead. Some consolidator contracts carry no advance purchase requirement at all, others need three days. Knowing which contract applies to which airline is a large part of what I do in the first ten minutes of a last-minute request.",
        ],
      },
      {
        heading: "What is realistic at 72, 48 and 24 hours?",
        paragraphs: [
          "Here is how I set expectations when someone messages me with a close departure.",
        ],
        bullets: [
          "72 hours out: almost everything an advance booking has, apart from the lowest booking classes. Nonstops are usually still available in business.",
          "48 hours out: the nonstop may be full or in its highest class; one-stop routings through Doha, Istanbul, Lisbon, Dublin, Paris or Frankfurt are usually open and often cheaper than the nonstop ever was.",
          "24 hours out: still bookable. The ticket must be issued within hours, so payment has to clear and names have to be ready. Online check-in opens 24 to 48 hours before departure, and ticketing before it opens makes the airport simpler.",
          "Same day: possible on many routes, if we can talk immediately and you can be at the airport within a few hours.",
        ],
      },
      {
        heading: "Why one-stop routings save last-minute travelers the most",
        paragraphs: [
          "A nonstop route has a handful of flights a day, sometimes one. A one-stop opens dozens. Miami to London has nonstops on British Airways, American and Virgin Atlantic; add connections and you have TAP through Lisbon, Iberia through Madrid, Aer Lingus through Dublin, Air France through Paris and KLM through Amsterdam, each with its own business cabin and its own inventory.",
          "To Asia and Africa the effect is bigger. From the US East Coast, Qatar Airways, Emirates, Etihad and Turkish Airlines connect through their hubs to almost everywhere, and those hubs are built for 90-minute connections with a shower in the lounge. From the West Coast the equivalents are Japan Airlines and ANA through Tokyo, Korean Air through Seoul, EVA Air through Taipei and Cathay Pacific through Hong Kong.",
          "The numbers hold up close to departure. For example, a recent New York JFK to Johannesburg business class quote, routed with one stop: $6,530 published, my fare $4,100. A recent Washington Dulles to Cairo quote: $4,140 published, my fare $2,737. Close-in, that kind of gap narrows a little; it does not disappear.",
          "A good one-stop also fixes schedules. If the only nonstop leaves at 6 p.m. and you need to be in the meeting by 9 a.m., a connection with a 10 p.m. departure can be the better trip as well as the cheaper one.",
        ],
      },
      {
        heading: "Flexible on the airport or the date? Say so in the first message",
        paragraphs: [
          "Two words in your first message can halve the price: “flexible on”. Flexible on the airport means I can look at Fort Lauderdale as well as Miami, Newark as well as JFK, Baltimore as well as Dulles, Gatwick as well as Heathrow. Flexible on the date means the Tuesday morning flight is in play when Monday night is sold out in business.",
          "One thing I do not recommend at short notice is a separate positioning ticket, where you buy a cheap flight to another city and start the business class ticket there. When the first flight is late, the second airline owes you nothing, and at 48 hours out there is no time to recover. Everything on one ticket, so one airline is responsible for getting you there.",
        ],
      },
      {
        heading: "What I need from you to move fast",
        paragraphs: [
          "A complete first message saves an hour of back and forth, and at 48 hours an hour matters. Send me:",
        ],
        bullets: [
          "Full names exactly as printed on each passport, plus dates of birth. Type them; do not send passport scans through the form.",
          "The route, the day you need to leave and the latest you can arrive.",
          "Number of travelers, and whether you want business, first, or either.",
          "Which airports and dates you are flexible on.",
          "A budget ceiling, if you have one. It lets me decide between a one-stop and a nonstop without another round of messages.",
          "Frequent flyer numbers, if you want the miles credited.",
          "A card ready to pay. Close-in tickets must be issued within hours of booking.",
        ],
      },
      {
        heading: "What to check before I issue a last-minute ticket",
        paragraphs: [
          "Check passport validity and the entry requirements for your destination before I ticket. Many countries require six months of validity beyond your travel dates, and a ticket I can issue in twenty minutes is no use if the passport expires in May.",
          "Expect the fare to be non-refundable, with changes allowed for a fee plus any fare difference. That is normal for both consolidator and discounted published fares, and I write the exact rules into the quote. If there is any chance the trip is called off, say so; sometimes a slightly higher fare with a smaller change fee is the better buy.",
          "If the trip is important enough to book business class at two days' notice, pay with a card that carries trip delay cover, and install the airline's app before you leave for the airport. Both cost nothing and both matter when a connection goes wrong.",
          "Once ticketed, you receive a standard airline e-ticket number and a booking reference you can open on the airline's website within minutes. Add your seat, your meal and your frequent flyer number there. If a flight is cancelled while you are travelling, message me and I start on the rebooking while the line at the desk is still forming.",
        ],
      },
      {
        heading: "Want me to price your route?",
        paragraphs: [
          "If you need to fly in the next few days, do not spend the evening refreshing fare sites. Send me the route, the dates and the names on WhatsApp, or through the quote form, and I start searching straight away. You get two or three real options with the published fare next to mine, and nothing is charged until you confirm.",
        ],
      },
    ],
  },
  {
    approvedForIndexing: true,
    slug: "how-to-find-cheap-business-class-flights",
    seoTitle: "How to Find Cheap Business Class Flights in 2026",
    title: "How to Find Cheap Business Class Flights in 2026 (What Actually Works)",
    category: "Travel Hacks",
    excerpt:
      "Flexible dates, nearby airports, one-stops, positioning flights, miles or cash, and consolidator fares most travelers never see. What works and what does not.",
    publishedTime: "2026-10-27",
    author: "Derek Monti",
    image: "/images/routes/tokyo.webp",
    imageAlt: "Tokyo streets at night, the destination of a Los Angeles to Tokyo Haneda business class example",
    sections: [
      {
        heading: "What does “cheap business class” mean in 2026?",
        paragraphs: [
          "Cheap is relative, so let me put numbers on it. A transatlantic business class ticket from the East Coast runs from about $2,500 on a good day to $7,000 or more at the wrong moment. To Asia, the Gulf or Africa, double the spread. The published fare the airline shows is the starting point, not the price.",
          "A realistic target is 15 to 60% below that published fare, depending on route, season and airline. Some recent examples from my own quotes: New York JFK to London, $3,570 published, my fare $2,625. Chicago to Rome, $5,060 published, my fare $3,530. Los Angeles to Tokyo Haneda, $6,185 published, my fare $4,200.",
          "Those are not tricks. They come from a short list of methods that work year after year, roughly in the order below. I will also tell you which popular advice does not work, because that is where people lose money.",
        ],
      },
      {
        heading: "Do flexible dates really lower business class fares?",
        paragraphs: [
          "Yes, and more than in economy. Business cabins are small and sold in booking classes with only a few seats each. When the cheap class on Friday sells out, Thursday's may still be open at $900 less. That is why every fare I quote comes with a three-day window either side of your date.",
          "The calendar matters too. Tuesday and Wednesday departures are typically cheaper than Friday and Sunday. Europe from late October to March, outside Christmas and New Year, is far cheaper than June to August. Asia is cheapest in the weeks after Lunar New Year and in the autumn shoulder season.",
          "The practical move is to decide which end of the trip is fixed. For most trips one date is immovable and the other is not, and the flexible one is where the saving sits.",
        ],
      },
      {
        heading: "Nearby airports: when the next airport over is cheaper",
        paragraphs: [
          "Fares are filed by city pair, so the same airline can price Newark to Frankfurt differently from JFK to Frankfurt. In my own back yard, Fort Lauderdale sometimes beats Miami. Baltimore sometimes beats Dulles. San Jose and Oakland sometimes beat San Francisco.",
          "The best-known example is London. The United Kingdom charges Air Passenger Duty of over £200 per person on long-haul departures in premium cabins, so a round trip that starts in Dublin, Milan or Madrid and connects through London can be noticeably cheaper than one that starts in London, on the same airline.",
          "Switching airports costs ground time and transfers, so I only suggest it when the difference is worth it. Tell me which airports you are willing to use and I include them in the search.",
        ],
      },
      {
        heading: "One-stop flights: the biggest single lever",
        paragraphs: [
          "If you take one thing from this article, take this. Hub airlines price connections aggressively to pull traffic through their home airports, and on long routes the one-stop is where the largest discounts live. Qatar Airways through Doha, Turkish Airlines through Istanbul, Emirates through Dubai, Etihad through Abu Dhabi, TAP through Lisbon, Aer Lingus through Dublin, Iberia through Madrid.",
          "For example, a recent Boston to Dubai business class quote: $5,041 published, my fare $3,400. A recent JFK to Johannesburg quote with one stop: $6,530 published, my fare $4,100. On a 15-hour journey, a 90-minute connection with a shower in the lounge is a small price for that.",
          "One-stops also give you access to better seats. If the nonstop on your route flies an older 2-3-2 cabin, the connection through a hub may put you in a 1-2-1 suite for less money.",
        ],
      },
      {
        heading: "Positioning flights and ex-Europe fares: powerful, but know the risk",
        paragraphs: [
          "A positioning flight is a separate cheap ticket to the city where your business class fare starts. Frequent flyers use it to take advantage of cheaper fares from, say, Dublin or Stockholm to the United States, or from a secondary US city to Asia.",
          "It works, and it carries a real risk: the two tickets are not connected. If the positioning flight is delayed and you miss the long-haul, the second airline owes you nothing, and a last-minute replacement in business can cost more than the saving. If you do it, fly in the day before, and never do it on a trip that matters.",
          "What I will not do is use tricks that break the fare rules, such as hidden-city or throwaway ticketing. Airlines audit these, and the penalties range from cancelled return flights to closed frequent flyer accounts. The savings above are large enough without that.",
        ],
      },
      {
        heading: "Miles or cash: which is cheaper for business class?",
        paragraphs: [
          "Miles can be excellent value for business class, when the seat exists. The problem is that saver-level award space in business is scarce on popular routes and dates, award prices on many programs now move with demand, and some airlines, notably British Airways and Lufthansa, add carrier surcharges of several hundred dollars each way on top of the miles.",
          "Here is the comparison I suggest. Price the award in miles plus cash, and price the consolidator fare in cash. If the award costs 60,000 miles plus $600 and my fare is $2,625, you are being paid about 3.4 cents per mile to use them, which is a good deal. If the award is 120,000 miles plus $900, keep the miles.",
          "If you have a large balance and flexible dates, awards are worth the effort. If you do not, hours of searching for uncertain results rarely beats a fare you can book in an afternoon.",
        ],
      },
      {
        heading: "What does not work for cheap business class?",
        paragraphs: [
          "A short list of popular advice I would skip.",
        ],
        bullets: [
          "Waiting for a last-minute drop. Sometimes airlines open cheaper classes close to departure; more often the price climbs. You cannot plan a trip around it.",
          "Incognito mode and clearing cookies. Fares are set by booking class availability, not by your browser history.",
          "Error fares. Real, rare, and frequently cancelled by the airline after you have booked the hotel.",
          "“Business class deal” newsletters that resell published fares. If you can find the same price on the airline's site, you are not getting a deal; you are getting a mailing list.",
          "Unknown websites with prices far below everyone else's and no accreditation. Tickets paid for with stolen cards or miles get cancelled, usually right before departure.",
        ],
      },
      {
        heading: "Consolidator fares through an advisor: the lever most travelers never pull",
        paragraphs: [
          "Airlines sell business and first class seats at wholesale rates to consolidators, who distribute them through accredited agencies. These fares are not published on the airline's website or on Google Flights, and the contracts usually prohibit advertising them. They are most common where tickets are most expensive: long-haul business and first.",
          "That is the main reason a quote from me can be 15 to 60% below the price you see online. The ticket is a standard airline e-ticket, issued through Travel Business Class, an ARC-accredited agency. You earn miles according to the booking class, pick your seat on the airline's website and fly the same flight as everyone else in the cabin.",
          "The rules are usually stricter than the airline's flexible fares: most consolidator tickets are non-refundable, and changes carry a fee. I put the published fare next to mine on every quote, with the rules in plain English, so you can verify the number and decide with everything in front of you.",
        ],
      },
      {
        heading: "Want me to price your route?",
        paragraphs: [
          "Send me the route, your dates and how flexible they are, the number of travelers and the cabin you want, on WhatsApp or through the quote form. I apply everything above in one pass, dates, airports, one-stops and contract fares, and send back two or three real options. The quote is free.",
        ],
      },
    ],
  },
  {
    approvedForIndexing: true,
    slug: "consolidator-fares-explained",
    seoTitle: "Consolidator Business Class Fares Explained",
    title: "Consolidator Fares Explained: Why an Agent Can Beat the Airline's Own Price",
    category: "Business Class Tips",
    excerpt:
      "What consolidator fares are, why airlines sell seats below their own price, who can issue them, the rules, and how I show them next to the public fare.",
    publishedTime: "2026-10-30",
    author: "Derek Monti",
    image: "/images/routes/singapore.webp",
    imageAlt: "Singapore waterfront at dusk, the destination of a Miami to Singapore first class example",
    sections: [
      {
        heading: "What is a consolidator fare?",
        paragraphs: [
          "A consolidator fare is a wholesale airfare. The airline sells seats to a consolidator at a net price under a contract, the consolidator distributes that contract to accredited travel agencies, and the agency sells you the ticket with its margin added. Even with the margin, the final price is usually well below the fare the airline publishes on its own website.",
          "You will also hear them called net fares, private fares, negotiated fares or bulk fares. They are the same idea. What they have in common is that they are not published: they do not appear on the airline's website, on Google Flights or on the big online travel agencies, and the contracts usually forbid advertising the price.",
          "Consolidator fares exist in every cabin, but they matter most in long-haul business and first class, where the published fare is $4,000 to $12,000 and a 30% difference is real money. That is the part of the market I work in.",
        ],
      },
      {
        heading: "Why would an airline sell seats below its own published price?",
        paragraphs: [
          "Because a published fare is a public statement and a consolidator contract is a private one. An airline that cuts its website price for business class to fill a soft route has told every customer, every competitor and every corporate account that its product is worth less this month. A contract fare fills the same seats quietly.",
          "There are other reasons. Airlines use consolidators to reach markets their own marketing does not: specific countries, communities and travel segments. They use them to balance directional demand, where one direction of a route is full and the other is not. And distribution through an agency costs the airline something whether it pays a commission or offers a discount, so a net fare is simply one way of paying for sales.",
          "None of this is new. Consolidators have existed since airline deregulation, and the largest carriers in the world have used them for decades. What is new is how few travelers know about them, because the public internet only shows the published shelf.",
        ],
      },
      {
        heading: "Who is allowed to sell consolidator fares?",
        paragraphs: [
          "Only accredited agencies. In the United States that means accreditation by ARC, the Airlines Reporting Corporation, which is owned by the airlines and authorizes agencies to issue tickets on their behalf. Elsewhere the equivalent is IATA accreditation. Accreditation involves financial bonding, reporting and settlement of every ticket sold through ARC, and ticketing authority granted airline by airline.",
          "The consolidator contract then sits on top of that accreditation. An agency without the contract cannot see the fare; an agency without accreditation cannot issue the ticket. Both are needed, which is why these fares are not something an individual traveler can access directly.",
          "I issue tickets through Travel Business Class, an ARC-accredited agency. Whichever agent you use, ask which agency issues the ticket and whether it is ARC or IATA accredited. It is a simple question and a legitimate agent answers it in one sentence.",
        ],
      },
      {
        heading: "How can you tell a consolidator ticket from a published one?",
        paragraphs: [
          "Mostly, you cannot, and that is the point. You receive a standard airline e-ticket with a 13-digit number that begins with the airline's own code: 001 for American, 016 for United, 125 for British Airways, 157 for Qatar Airways, 176 for Emirates. You get a booking reference you can open on the airline's website within minutes of ticketing, where you choose seats, add meals and enter your frequent flyer number.",
          "The one visible difference is on the receipt. Where a published ticket shows the fare amount, a bulk or inclusive-tour ticket shows the letters BT or IT instead, because the contract price is confidential. Airport staff see this every day; it changes nothing about how you are treated on board.",
          "Everything else is identical: the seat, the lounge, the meal, the baggage allowance, the priority tags. You are not flying on a lesser ticket. You are flying on a ticket that was bought through a different door.",
        ],
      },
      {
        heading: "What are the rules on a consolidator fare, and what do you give up?",
        paragraphs: [
          "The lower price comes with rules, and I would rather you read them before paying than discover them afterwards.",
        ],
        bullets: [
          "Refunds: most consolidator fares are non-refundable, or refundable only with a significant penalty.",
          "Changes: usually allowed for a fee plus any fare difference. The fee is often similar to the airline's discounted published fares and higher than its flexible ones.",
          "Mileage earning: depends on the booking class. Some earn full miles, many earn a reduced percentage, a few earn none. I tell you which before you book.",
          "Upgrades: using miles to upgrade a consolidator ticket is generally not permitted.",
          "Name changes: not possible on any airline ticket, consolidator or published, beyond minor spelling corrections. Names must match passports exactly.",
          "Who handles changes: voluntary changes and refunds go through the agency that issued the ticket. If the airline cancels or reschedules a flight, the airline rebooks you, and I work it from my side at the same time.",
        ],
      },
      {
        heading: "When is a published fare the better buy?",
        paragraphs: [
          "For a traveler whose dates are reasonably settled, the rules above cost nothing. For a trip with a real chance of being cancelled, a fully flexible published fare can be the better buy even though it costs more, and I say so when that is the case.",
          "Airline sales are the other exception. A few times a year an airline puts a business class sale on its own website that beats the contract on a particular route. When that happens I book you the published fare instead; I can sell those too. The point is not that one channel always wins. The point is that you should see both before you pay.",
        ],
      },
      {
        heading: "How big is the difference, really?",
        paragraphs: [
          "It varies by route, airline, season and how far ahead you book, so I will give you real quotes rather than a promise. New York JFK to London in business: $3,570 published, my fare $2,625, about 26% less. Chicago to Rome in business: $5,060 published, my fare $3,530, about 30% less. Boston to Dubai: $5,041 published, my fare $3,400, about 33% less.",
          "First class gaps are often larger in dollars. Miami to Singapore in first: $12,400 published, my fare $7,200, about 42% less. That is the kind of difference that turns first class from a fantasy into a decision.",
          "Fares change daily, so treat every figure above as an example, not a list price. Your dates, your airline and the booking class that is open on your flight decide the final number.",
        ],
      },
      {
        heading: "How I show the published fare next to mine",
        paragraphs: [
          "Every quote I send has the same structure. Two or three itineraries, each with the airline, flight numbers, aircraft and seat type on every leg. For each one, the published fare as shown on the airline's website that day, my fare, and the rules in plain English: change fee, refund policy, mileage earning.",
          "I show the published fare for a reason: you can check it yourself in two minutes. If my number is not meaningfully better, you should book direct, and I would rather you knew that than wondered. Quotes hold while the booking class stays open, which can be a few hours or a few days; I tell you which.",
        ],
      },
      {
        heading: "Is a consolidator ticket safe?",
        paragraphs: [
          "Yes, when it is issued by an accredited agency. Pay by credit card, which gives you chargeback protection. Within minutes of ticketing, open the booking on the airline's website with the reference I send you and see your name, your flights and your e-ticket number. That is the confirmation that matters.",
          "Be careful with anyone who will not tell you which agency issues the ticket, who takes wire transfers only, or whose price is far below every other quote. Tickets bought with stolen cards or stolen miles are real, and they are cancelled, usually days before departure. A good consolidator fare is 15 to 60% below published, not 80%.",
        ],
      },
      {
        heading: "Want me to price your route?",
        paragraphs: [
          "Send me the route, your dates, the number of travelers and the cabin, on WhatsApp or through the quote form. You get the published fare and my fare side by side, with the rules written out, and nothing is charged until you decide to book.",
        ],
      },
    ],
  },
  {
    approvedForIndexing: true,
    slug: "business-class-travel-agent-vs-booking-direct",
    seoTitle: "Business Class Through an Agent: Is It Cheaper?",
    title: "Is It Cheaper to Book Business Class Through a Travel Agent?",
    category: "Business Class Tips",
    excerpt:
      "Airline website, online travel agency or a personal advisor: which is cheapest for business class, when each wins, how agents are paid, and what to ask first.",
    publishedTime: "2026-11-03",
    author: "Derek Monti",
    image: "/images/routes/rome.webp",
    imageAlt: "The Colosseum in Rome, the destination of a Chicago to Rome business class example",
    sections: [
      {
        heading: "Is it cheaper to book business class through a travel agent? The short answer",
        paragraphs: [
          "For a domestic economy ticket, no. Book it on the airline's website and get on with your day. For a long-haul business or first class ticket, often yes, by a wide margin, but only through an agent with access to consolidator fares. A travel agent who rebooks the same published fare you can see online adds a fee and nothing else.",
          "The difference comes from where the fare is sourced. Airlines sell business and first class seats at wholesale rates to consolidators, who distribute them through accredited agencies. Those fares are not published online. A personal advisor with those contracts can quote, for example, New York JFK to London in business at $2,625 when the published fare is $3,570, or San Francisco to Frankfurt at $3,870 against $5,550 published.",
          "Below I compare the three ways to buy a premium ticket, including when each one wins, because there are trips where you should book direct and I will tell you so.",
        ],
      },
      {
        heading: "When booking direct with the airline wins",
        paragraphs: [
          "The airline's website wins when the published fare is the best fare available. That happens more often than agents like to admit: during a genuine sale, on short-haul and domestic routes, on fully flexible fares, and on routes where no consolidator contract exists.",
          "It also wins when you want the airline to own the whole relationship. Changes on a ticket you bought direct are made in the airline's app in minutes. If you hold elite status and want full mileage earning on the highest booking classes, the published flexible fare is often the one that earns it.",
          "And it wins for award tickets. Nobody books your miles better than you, with the exception of the award-booking specialists who charge a fee for exactly that.",
        ],
      },
      {
        heading: "When an online travel agency wins, and what it costs you",
        paragraphs: [
          "Online travel agencies like Expedia and Priceline, and the dozens behind Kayak and Skyscanner results, sell the same published fares as the airline, occasionally a few dollars cheaper by trimming their own margin. They are convenient for packaging a hotel with the flight.",
          "For business class, the saving is rarely meaningful and the cost shows up when something goes wrong. The agency, not the airline, controls the ticket, so changes and refunds go through its call center. Some sites assemble separate tickets on different airlines into one itinerary with no protection if the first flight is late. Fare rules are shown in a smaller font than the price.",
          "If you are booking a straightforward published fare, you are better off with the airline than with an online agency. If you are booking business class, you can do better than either.",
        ],
      },
      {
        heading: "When a personal advisor wins",
        paragraphs: [
          "A personal advisor with consolidator contracts wins on exactly the trips where the money is large and the search is hard.",
        ],
        bullets: [
          "International business and first class, where contract fares are typically 15 to 60% below the published price.",
          "Multi-city and open-jaw trips, where I price the whole itinerary as one ticket instead of three searches that do not talk to each other.",
          "Last-minute travel, where published fares climb and contract fares do not.",
          "Mixed-cabin decisions, such as business on the overnight leg and economy on the 50-minute hop, priced deliberately rather than by accident.",
          "Trips where the aircraft and the seat matter and you want someone to check them for every leg.",
          "Anything that goes wrong on the road, when you want one person on WhatsApp instead of a hold queue.",
        ],
      },
      {
        heading: "How much cheaper is business class through an advisor? Two examples",
        paragraphs: [
          "For example, a recent Chicago to Rome business class quote: $5,060 published, my fare $3,530, about 30% less. A recent Los Angeles to Tokyo Haneda quote: $6,185 published, my fare $4,200, about 32% less. Same flights, same seats, same lounge.",
          "The percentage moves with the route and the season. Transatlantic routes with many competing airlines often sit at the lower end of the range; long routes to Asia, Africa and the Gulf, and first class generally, sit higher. Treat the figures as examples, and ask me for the real number on your dates.",
        ],
      },
      {
        heading: "How do travel agents make money on business class tickets?",
        paragraphs: [
          "Plainly, because this is where people get suspicious. Airlines in the United States stopped paying base commissions to travel agents in 2002. Today an agent earns in one of three ways: a margin built into a consolidator fare, a service fee charged on top of a published fare, or volume incentives from airlines paid to large agencies.",
          "With me it works like this. The fare I quote is the complete price: ticket, taxes and my margin. The margin sits inside the consolidator fare, which is why I can show you the published fare next to mine and still be the lower number. If a particular booking only makes sense on a published fare, where there is no margin, I tell you what the service fee would be before you decide anything.",
          "Quotes are free. If my number is not better than what you can find yourself, book direct with my blessing. I would rather lose a ticket than a client.",
        ],
      },
      {
        heading: "Is it safe to pay a travel agent for a business class ticket?",
        paragraphs: [
          "Yes, if the agent is legitimate, and there are three easy ways to check. Ask which agency issues the ticket and whether it is ARC accredited, or IATA accredited outside the United States. Pay by credit card, never by wire transfer to an individual. And within minutes of ticketing, open the booking on the airline's own website with the reference you are given and see your name, your flights and the e-ticket number.",
          "My tickets are issued through Travel Business Class, an ARC-accredited agency. You receive a standard airline e-ticket and a booking reference that works on the airline's website, where you pick seats, add meals and enter your frequent flyer number like any other passenger.",
        ],
      },
      {
        heading: "What to ask any travel agent before you book business class",
        paragraphs: [
          "Whether you book with me or with someone else, these questions sort the professionals from the rest in five minutes.",
        ],
        bullets: [
          "Which agency issues the ticket, and is it ARC or IATA accredited?",
          "Can you show me the published fare next to yours for the same flights?",
          "Which aircraft and which seat type am I getting on each leg?",
          "What are the change fee, the refund rule and the mileage earning, in plain English?",
          "Is the price final, including taxes, fees and your margin?",
          "Will I receive an airline booking reference I can open on the airline's website?",
          "Who do I message when my flight is cancelled at 2 a.m. in a foreign airport, and will they answer?",
        ],
      },
      {
        heading: "What working with me looks like",
        paragraphs: [
          "You message me on WhatsApp or send the quote form with the route, dates, travelers and cabin. I check the contract fares and the published fares on your dates and send back two or three itineraries with the aircraft and seat for every leg, the published fare next to mine, and the rules. You pick one, pay by card and receive the airline e-ticket. From then until you land back home, I am one message away.",
        ],
      },
      {
        heading: "Want me to price your route?",
        paragraphs: [
          "Try the comparison on your next trip. Send me the route and dates on WhatsApp or through the quote form, then open the airline's website and look at the published fare. If my number is not better, you have lost ten minutes. If it is, you have found out how your next business class seat gets paid for.",
        ],
      },
    ],
  },
];
