# Fly with Derek — SEO Content Map

Status date: 2026-08-31  
Canonical host configured in code: `https://www.flywithderek.com`  
URL convention: lowercase, hyphenated, no trailing slash except the root URL

## Status definitions

- **Implemented** means the route, copy, metadata record, and prerender target exist in the current working tree.
- **Indexable** means the current manifest requests `index, follow` for a production build; it does not prove that a production crawler can reach the URL. Preview/non-production builds fail closed to `noindex` as described below.
- **Truthfulness screen complete** means the implementation avoids unsupported prices, savings, ratings, testimonials, response times, partnerships, and guarantees. It is not a substitute for owner factual approval.
- **Owner review pending** means Derek or the authorized content owner has not supplied a recorded approval in the repository.
- The keyword fields below describe the intended query/topic focus. They are not instructions to repeat phrases or add unsupported “cheap/deal” claims.

## Current route map

| Canonical URL | Page type | Indexation | Primary keyword/topic | Secondary topic cluster | Title | H1 | Content owner | Factual-review status | Publish status | Principal internal links | Structured data |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `https://www.flywithderek.com/` | Brand/service home | Index, follow | premium flight guidance | business class; first class; personal itinerary review | Premium Business & First Class Flight Guidance \| Fly with Derek | Premium flights, handled personally. | Derek Monti / Fly with Derek | Truthfulness screen complete; identity, contact, portrait, and service approval pending | Implemented; build, prerender, local HTTP, and browser QA passed; production/live approval pending | All 7 core pages; `/about`; `/blog`; 3 guides; `#request-form` | `WebPage` |
| `https://www.flywithderek.com/services` | Service hub | Index, follow | premium flight advisory services | complex itineraries; time-sensitive requests; whole-trip review | Premium Flight Advisory Services \| Fly with Derek | Premium travel, reviewed as a whole. | Derek Monti / Fly with Derek | Truthfulness screen complete; owner service-scope approval pending | Implemented and locally validated; production/live approval pending | 3 `/services/...` pages; home quote; FAQ | `WebPage` |
| `https://www.flywithderek.com/about` | Brand/profile page | Index, follow | Derek Monti flight advisor | human itinerary review; service principles; independence | About Derek Monti \| Personal Premium Flight Guidance | The person behind the request. | Derek Monti | No invented biography; identity, role, portrait, and rights approval pending | Implemented and locally validated; production content approval pending | Home quote; service framework; global core links | `WebPage` |
| `https://www.flywithderek.com/blog` | Guide hub | Index, follow | premium flight planning guides | cabin decisions; itinerary comparison; time-sensitive travel | Premium Flight Planning Guides \| Fly with Derek | Travel questions, answered for the whole journey. | Derek Monti / editorial owner | Durable-framework screen complete; editorial approval pending; no unverified byline is emitted | Implemented and locally validated; production/live approval pending | 3 current guides; home quote | `WebPage` |
| `https://www.flywithderek.com/privacy` | Legal | Index, follow in current manifest | Fly with Derek privacy policy | quote data; analytics; anti-abuse; data rights | Privacy Policy \| Derek Monti | Privacy Policy | Owner + qualified legal reviewer | Legal and operational factual review required | In manifest, but not production-approved in this document | Contact email/phone; global navigation | `WebPage` |
| `https://www.flywithderek.com/terms` | Legal | Index, follow in current manifest | Fly with Derek terms | quote status; ticketing; changes; liability | Terms of Service \| Derek Monti | Terms of Service | Owner + qualified legal reviewer | Legal and business-model factual review required | In manifest, but not production-approved in this document | Contact email/phone; global navigation | `WebPage` |
| `https://www.flywithderek.com/business-class-flights` | Core service/cabin hub | Index, follow | business class flight guidance | cabin fit; routing; timing; ticket conditions | Business Class Flight Guidance \| Fly with Derek | Business class planning with the whole trip in view | Derek Monti / Fly with Derek | Truthfulness screen complete; owner/editorial review pending | Implemented and locally validated; production/live approval pending | Europe hub; USA hub; complex itineraries; first class; home quote | `WebPage` + `Service` + `BreadcrumbList` |
| `https://www.flywithderek.com/first-class-flights` | Core service/cabin hub | Index, follow | first class flight planning | product scope; mixed cabin; first vs business | First Class Flight Planning \| Fly with Derek | First class, considered in the context of the journey | Derek Monti / Fly with Derek | Truthfulness screen complete; no changing product claims; owner/editorial review pending | Implemented and locally validated; production/live approval pending | Business class; premium advisor; complex itineraries; blog; home quote | `WebPage` + `Service` + `BreadcrumbList` |
| `https://www.flywithderek.com/business-class-flights/europe` | Regional corridor hub | Index, follow | business class flights from the US to Europe | eastbound timing; gateways; cabin continuity | Business Class Flights from the US to Europe \| Fly with Derek | Business class planning from the United States to Europe | Derek Monti / Fly with Derek | Generic planning framework only; route-specific facts and owner review pending | Implemented and locally validated; do not expand to route facts without sources | Business class hub; USA hub; complex itineraries; premium advisor; home quote | `WebPage` + `Service` + `BreadcrumbList` |
| `https://www.flywithderek.com/business-class-flights/usa` | Regional corridor hub | Index, follow | business class flights from Europe to the USA | westbound timing; gateways; arrival constraints | Business Class Flights from Europe to the USA \| Fly with Derek | Business class planning from Europe to the United States | Derek Monti / Fly with Derek | Generic planning framework only; route-specific facts and owner review pending | Implemented and locally validated; do not expand to route facts without sources | Business class hub; Europe hub; complex itineraries; about; home quote | `WebPage` + `Service` + `BreadcrumbList` |
| `https://www.flywithderek.com/services/last-minute-business-class` | Service landing page | Index, follow | last-minute business class request | urgent trip brief; fixed constraints; realistic tradeoffs | Last-Minute Business Class Request Support \| Fly with Derek | A clearer way to submit an urgent business class request | Derek Monti / Fly with Derek | Truthfulness screen complete; no response-time or availability promise; owner review pending | Implemented and locally validated; production/live approval pending | Business class; premium advisor; complex itineraries; about; home quote | `WebPage` + `Service` + `BreadcrumbList` |
| `https://www.flywithderek.com/services/complex-itineraries` | Service landing page | Index, follow | complex multi-city flight itinerary | open-jaw; cabin continuity; segment dependencies | Complex and Multi-City Flight Itinerary Review \| Fly with Derek | Make every segment serve the complete journey | Derek Monti / Fly with Derek | Truthfulness screen complete; owner review pending | Implemented and locally validated; production/live approval pending | Business class; first class; last-minute; premium advisor; home quote | `WebPage` + `Service` + `BreadcrumbList` |
| `https://www.flywithderek.com/services/premium-flight-advisor` | Service landing page | Index, follow | personal premium flight advisor | human review; trip brief; comparison framework | Personal Premium Flight Advisor \| Fly with Derek | A human review for a premium flight decision | Derek Monti / Fly with Derek | Truthfulness screen complete; role/service approval pending | Implemented and locally validated; production/live approval pending | Business class; first class; last-minute; about; home quote | `WebPage` + `Service` + `BreadcrumbList` |
| `https://www.flywithderek.com/blog/why-travelers-overpay-business-class` | Editorial guide | Index, follow | compare business class options | schedule; cabin consistency; routing; fare conditions | A Better Way to Compare Business Class Options \| Fly with Derek | A Better Way to Compare Business Class Options | Editorial owner unassigned | Durable-framework screen complete; editorial approval pending; no unverified byline/date emitted | Rewritten on preserved slug and locally validated; production/live approval pending | Other 2 guides; `/blog`; home quote | `Article` |
| `https://www.flywithderek.com/blog/business-class-service-beyond-seat` | Editorial guide | Index, follow | business class beyond the seat | airport experience; cabin consistency; ticket conditions | Business Class Is More Than the Seat \| Fly with Derek | Business Class Is More Than the Seat | Editorial owner unassigned | Durable-framework screen complete; editorial approval pending; no unverified byline/date emitted | Rewritten on preserved slug and locally validated; production/live approval pending | Other 2 guides; `/blog`; home quote | `Article` |
| `https://www.flywithderek.com/blog/last-minute-business-class` | Editorial guide | Index, follow | time-sensitive premium flight request | urgent travel checklist; fixed constraints; data minimization | How to Prepare a Time-Sensitive Premium Flight Request \| Fly with Derek | How to Prepare a Time-Sensitive Premium Flight Request | Editorial owner unassigned | Durable-framework screen complete; editorial approval pending; no unverified byline/date emitted | Rewritten on preserved slug and locally validated; production/live approval pending | Other 2 guides; `/blog`; home quote | `Article` |
| None (`404.html`) | Error page | Noindex, nofollow | None | recovery/navigation | Page Not Found \| Fly with Derek | Page Not Found | Fly with Derek | Technical copy only | Implemented; local server returned HTTP 404 with HTML; deployed-host behavior still pending | `/`, `/services`, `/blog`, and global navigation | None |

## Structured-data notes

- Every indexable route receives a base `WebPage` node; editorial routes receive `Article` instead.
- The seven data-driven core pages render an `@graph` containing `WebPage`, `Service`, and `BreadcrumbList`.
- Editorial `Article` schema intentionally omits author, `datePublished`, and `dateModified` until those facts have an approved source.
- No rating, review, airline-organization, product, offer, price, or availability schema is emitted.
- The 404 page intentionally has no JSON-LD and no canonical.

## Deployment indexation guard

- Production metadata is indexable only where the manifest or data record explicitly opts in.
- `FLY_WITH_DEREK_NOINDEX=true` forces `noindex, nofollow`, suppresses JSON-LD and sitemap URLs, and makes `robots.txt` disallow crawling.
- Vercel environments where `VERCEL_ENV` is present and is not `production` receive the same fail-closed treatment automatically.
- The full build and validator passed locally for 16 indexable routes plus `404.html`; Search Console, production crawling, and the live deployment remain separate release checks.

## Deferred content map

The following proposed clusters remain out of the manifest and sitemap until each URL has unique content, a source record, an owner, and a factual review:

- 10 route pages under `/routes/`.
- 6 destination pages under `/destinations/`.
- 5 independent airline guides under `/airlines/`.
- 4 additional guide pages for consolidator fares, points, booking timing, and business class versus premium economy.
- Any further pages from the broader keyword inventory.

See `CONTENT_SOURCE_LOG.md` for the required evidence workflow and `IMPLEMENTATION_NOTES.md` for the release gates.
