# Fly with Derek: multilingual search and content architecture

Analysis date: 2 October 2026. Scope: research and proposal only. No application source, public content, redirect, indexing setting, deployment or external account was changed for this analysis.

## 1. The achievable objective

Build a distinctive, credible personal brand that can earn visibility for premium commercial-airline travel requests in English, Romanian, Russian and German, then turn relevant visits into qualified conversations with Derek. The primary subjects are Business Class, First Class, complex itineraries, urgent premium travel and personal flight advice.

Being first for every query in every language is not a deliverable anyone can honestly guarantee. Google explicitly rejects guarantees of first-place ranking. Search visibility depends on the query, competition and search context, and a technically eligible page may still not be selected. The correct commitment is excellent implementation, useful reviewed content, clear measurement and continuous improvement. [Google: choosing an SEO](https://developers.google.com/search/docs/fundamentals/do-i-need-seo).

This site's strongest opportunity is a traveler who wants a person to evaluate a premium trip, rather than an indiscriminate attempt to attract every search for cheap flights. Commercial airline cabins must remain unmistakable in words and imagery: no visual or semantic drift toward private-jet charter, aircraft brokerage or general aviation consulting.

The multilingual request supersedes the older English-only instruction for this proposal. It does not establish that Derek can personally serve clients in all four languages. Confirm the supported conversation languages and translation arrangements before claiming multilingual service.

## 2. What is established, and what remains unknown

### Current local source

The checkout is at `699c3cfea06852e0dc6d991da81fa1079c9b4fc6` with an uncommitted visual restoration. Its actual dependencies are React 18, Vite 6 and React Router 7. The older AGENTS stack description is not the installed dependency inventory.

The existing SEO foundation should be retained:

- `src/seo/routeManifest.js` defines 16 English canonical routes on `https://www.flywithderek.com`.
- `src/entry-server.jsx` renders route-specific React HTML. `scripts/prerender.mjs` emits each route, a sitemap, robots and an independent 404 document.
- `src/seo/head.js` supplies metadata and schema in the first HTML response. `SeoHead.jsx` updates these during SPA navigation.
- Core pages have `WebPage`, `Service` and breadcrumb data; articles have `Article`. Current schema does not publish ratings, reviews, offers, prices or availability.
- The preview guard suppresses indexability, schema and sitemap URLs when `FLY_WITH_DEREK_NOINDEX` is true or a present `VERCEL_ENV` is not production.
- There is no locale/content-equivalence model or hreflang implementation. `html lang="en"` and `og:locale="en_US"` are hardcoded. The sitemap is monolingual.

`SEO_CONTENT_MAP.md`, `CONTENT_SOURCE_LOG.md` and `REDIRECT_MAP.md` describe the prior screened content and release boundaries. The uncommitted restoration introduces new statements, so those logs cannot be treated as approval of everything currently visible locally.

### Direct public production checks

Read-only GET requests were made on 2 October 2026 at approximately 19:31 UTC, with redirects disabled for exact status capture. Evidence: [production-seo-audit.json](evidence/production-seo-audit.json).

| Public observation | Result | Meaning |
|---|---|---|
| All 16 canonical pages | 200 HTML; one H1 each; correct self canonical; index/follow metadata | Reachable and technically eligible in this sample |
| Language annotations on those pages | `lang=en`; zero hreflang | No published multilingual architecture was observed |
| `/robots.txt` | 200 text; public paths allowed, `/api/` excluded; canonical sitemap declared | Current public crawling is allowed |
| `/sitemap.xml` | 200 XML; exactly 16 canonical URLs | Discovery inventory agrees with the current manifest |
| `/services/` | 308, Location `/services` | The deployed no-trailing-slash convention works on this sample |
| Five historic removed articles | Genuine 404 HTML, no canonical, noindex/nofollow | Existing removal policy remains stable in production |
| Unknown path | Genuine 404 HTML, no canonical, noindex/nofollow | No homepage fallback or soft 404 was observed |
| `/ro` | 404 | The proposed Romanian root is not live |

The five checked removed paths are `/blog/hidden-business-class-deals`, `/blog/tokyo-vs-singapore-first-class`, `/blog/top-business-class-airlines-2026`, `/blog/emirates-vs-qatar-first-class` and `/blog/how-consolidator-fares-work`.

These observations do **not** establish the deployed Git commit, Google/Bing index coverage, backlinks, current rankings, impressions, conversions, real-user Core Web Vitals or account ownership. No Search Console/Bing account was accessed, no lead was submitted and no search-result scraping was performed. The restored phrase “within hours” was absent from the live homepage response checked earlier in the audit.

A sitemap assists discovery but does not guarantee crawling or indexing. Public `index, follow` is a permission, not evidence of an indexed page. [Google: sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

## 3. Reconcile factual debt before expanding languages

The premium design can be persuasive without unsupported proof. Local source inspection found the following publication dependencies:

| Current local surface | Finding | Required decision |
|---|---|---|
| Home reasons and bio teaser | 15–60% savings; 24/7 and 365/year support | Document a defensible savings methodology and actual support capacity, or replace the promises |
| Home and Services final CTA | Options “within hours” | Confirm a measured, bounded service standard or use non-guaranteed request wording |
| Home methodology and Services hero/cards | Private/consolidator fare access | Owner verifies the actual supplier/business model and permitted language |
| About airline section | “Partner Airlines” and a premium network | Separate airlines that may be considered from contractual partnerships; verify any relationship claim |
| About counter | 20+ existing clients | User brief supplies the starting context, but publishable current evidence and owner approval still need recording |
| Route comparison cards | Illustrative pricing is labeled; percentage is computed from the displayed values | This is not proof of real bookings, current fares or typical savings. Replace invented amounts with useful itinerary factors in the proposed concept |
| Dormant restored timeline/review data | Fictional dated biography and named example testimonials remain in `siteData.js` | Treat as dormant data debt: the current About timeline renders methodology and current pages do not import `ReviewCard`; do not claim the fictional timeline/reviews are currently displayed |

“Illustrative” labels are useful for an educational comparison. They do not establish supplier access, response times or client outcomes in surrounding copy. A hypothetical client quotation with a plausible name is especially weak evidence for a personal premium brand. Prefer an actual approved client story, or a clearly presented decision example without an invented customer.

Every factual claim must have one source record that propagates to its translations, metadata, alt text and schema. The existing source log already provides a good template. Add language reviewer, translated claim text, version and approval status rather than creating four independent truth standards. Withdrawal or expiry of a shared claim invalidates every dependent locale variant until reviewed; an older translation must not keep a removed promise live. Owner review is required for business facts; airline/airport/product facts need the appropriate current primary source.

## 4. URL and language model

### Keep English authority at its existing URLs

Retain `/`, `/services`, `/about`, the seven core paths and all three retained article slugs. Do not move English into `/en` for visual symmetry. No current evidence justifies the migration, new redirects or duplicate English inventory.

Add `/ro`, `/ru` and `/de` as language roots, using the existing no-trailing-slash convention. A language root names a language, not a guaranteed market or nationality. Start with broad `en`, `ro`, `ru` and `de` hreflang values; introduce country variations only when the service and content actually differ. Russian-language content is not automatically a claim to serve a specific country.

Recommended content entity shape for later implementation:

```text
contentId → approved locale variants
variant → locale, pathname, title, description, H1, body, social image,
          reviewer, approval version, sources, indexable status
entity → equivalent published URLs, related entities, fallback language
```

The shared entity ID, rather than string replacement on a slug, must drive language switching and alternates. Future localized slugs below are editorial proposals, not existing URLs or approved translations.

### Initial subject inventory, released in coherent reviewed bundles

The first localization scope is the three essential brand/service pages plus the seven existing core planning pages. This is an inventory of subjects, not a demand to publish every row in every language at once.

| Content entity | English, preserved | Romanian proposal | Russian proposal | German proposal |
|---|---|---|---|---|
| Home | `/` | `/ro` | `/ru` | `/de` |
| Services hub | `/services` | `/ro/servicii` | `/ru/uslugi` | `/de/leistungen` |
| Derek profile | `/about` | `/ro/despre-derek` | `/ru/o-dereke` | `/de/ueber-derek` |
| Business Class | `/business-class-flights` | `/ro/bilete-business-class` | `/ru/aviabilety-biznes-klassa` | `/de/business-class-fluege` |
| First Class | `/first-class-flights` | `/ro/bilete-first-class` | `/ru/aviabilety-pervogo-klassa` | `/de/first-class-fluege` |
| US → Europe corridor | `/business-class-flights/europe` | `/ro/bilete-business-class/sua-europa` | `/ru/aviabilety-biznes-klassa/ssha-evropa` | `/de/business-class-fluege/usa-europa` |
| Europe → US corridor | `/business-class-flights/usa` | `/ro/bilete-business-class/europa-sua` | `/ru/aviabilety-biznes-klassa/evropa-ssha` | `/de/business-class-fluege/europa-usa` |
| Urgent premium requests | `/services/last-minute-business-class` | `/ro/servicii/business-class-ultima-ora` | `/ru/uslugi/srochnye-biznes-aviabilety` | `/de/leistungen/kurzfristige-business-class-fluege` |
| Complex itineraries | `/services/complex-itineraries` | `/ro/servicii/itinerarii-complexe` | `/ru/uslugi/slozhnye-marshruty` | `/de/leistungen/komplexe-flugrouten` |
| Personal premium advisor | `/services/premium-flight-advisor` | `/ro/servicii/consilier-personal-zboruri` | `/ru/uslugi/lichnyi-konsultant-po-pereletam` | `/de/leistungen/persoenliche-flugberatung` |

The two corridor pages must keep their origin/destination meaning. Translating the Europe page into German must not silently turn “US to Europe” into “flights from Germany.” A materially different corridor is a new subject requiring distinct facts and a distinct content decision.

| Other inventory | English inventory | Localization decision |
|---|---|---|
| Journal hub | `/blog` | Localize when there is a real reviewed article collection in that language |
| Three retained guides | Existing article slugs preserved | Translate the useful whole-trip comparison/checklist content one article at a time; verify an actual author/reviewer before adding a byline |
| Privacy and terms | `/privacy`, `/terms` remain | Supply approved language-appropriate disclosures before opening a localized lead funnel; these are operating prerequisites, not traffic targets |
| New route/destination/airline guides | Existing deferred source queue | Select only subjects with useful unique facts and actual demand; do not multiply the queue by four automatically |

All locales need fully translated navigation, meaningful body content, FAQ, form labels, validation, loading, success, error/recovery messages and contact expectations. Date/currency presentation must reflect the intended audience without implying unsupported fares. Draft translations can be assisted by AI; named native editors approve commercial tone, grammar, terminology and factual equivalence. Google evaluates visible page language; translating navigation alone is insufficient. [Google: multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

### Alternates, canonical and fallback behavior

For each published equivalent cluster, use absolute reciprocal hreflang links including the current page. Publish only real, crawlable equivalents. An unfinished locale is omitted rather than linked to a 404 or an English page pretending to be translated. [Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions).

Each language version keeps a self canonical in its own language. Romanian/Russian/German pages must not all canonicalize to English. Internal links and sitemap URLs should consistently use that chosen canonical. [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Use `x-default` as the intentional fallback. For the home cluster, `/` can remain the English default with an obvious language chooser. For deep content clusters, the English equivalent can be the fallback and expose the same chooser, preserving the user's subject. A dedicated neutral language-selection page is optional if the eventual UX needs it; no new gate is required simply to add hreflang.

Expose the language names as real links: English, Română, Русский, Deutsch. Preserve the equivalent subject when switching. If that subject has no approved translation, show an explicit availability message and offer the chosen-language hub; do not claim it is an equivalent alternate. Do not force IP/browser-language redirects. [Google: language switching](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

Render language, title, description, canonical, alternates, breadcrumb and schema in the first HTML response. Update the same values, including stale alternates, during SPA navigation. Keep the prerender manifest, router, sitemap and language switcher derived from the same approved records. The initial document and hydrated experience must agree. [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## 5. Query and topic map

These are **research examples, not search-volume estimates, rank predictions or approved published copy**. Final wording requires native editorial review and account-supported query research. Several queries contain a booking intent; they can only be answered with a booking-service claim after Derek's actual ticketing role is confirmed.

| Subject and intent | English examples | Romanian examples | Russian examples | German examples | Best content answer |
|---|---|---|---|---|---|
| Named advisor / brand | Derek Monti flights; Fly with Derek | Derek Monti bilete de avion | Дерек Монти авиабилеты | Derek Monti Flugberatung | Home + factual profile + direct contact |
| Business Class options | business class flights; personal business class flight advice | bilete de avion business class; consilier pentru zboruri business class | авиабилеты бизнес-класса; подбор перелёта бизнес-классом | Business Class Flüge; persönliche Business Class Beratung | Cabin hub with clear comparison criteria and request path |
| First Class planning | first class flight advisor; first class flight options | bilete de avion first class; planificare zbor la clasa întâi | авиабилеты первого класса; подбор перелёта первым классом | First Class Flüge; Beratung für First Class Flüge | First Class hub that distinguishes actual product scope from marketing imagery |
| US → Europe | business class flights US to Europe | zboruri business class din SUA în Europa | бизнес-класс из США в Европу | Business Class Flüge von den USA nach Europa | Existing US-origin corridor with relevant arrival/connection decisions |
| Europe → US | business class flights Europe to USA | zboruri business class din Europa în SUA | бизнес-класс из Европы в США | Business Class Flüge von Europa in die USA | Existing Europe-origin corridor, without inventing departure-market facts |
| Complex / multi-city | multi-city business class itinerary; open-jaw flight planning | itinerar business class cu mai multe orașe; zboruri cu destinații multiple | сложный маршрут бизнес-классом; перелёт с несколькими городами | Business Class Multi-City Flüge; Gabelflug planen | Complex-itinerary service plus a meaningful segment/constraint example |
| Urgent request | last-minute business class assistance | bilete business class de ultimă oră | срочные авиабилеты бизнес-класса | kurzfristige Business Class Flüge | Urgent-request brief, tradeoffs and explicit absence of an availability guarantee |
| Human advisor | personal premium flight advisor | consilier personal pentru zboruri premium | личный консультант по премиальным перелётам | persönliche Beratung für Premium-Flüge | Advisor service, scope and directly reachable Derek |
| Value comparison | compare business class fares; business class fare rules | compară tarifele business class; condiții bilete business class | сравнение тарифов бизнес-класса; условия билетов бизнес-класса | Business Class Tarife vergleichen; Tarifbedingungen Business Class | Retained comparison guide plus price/rule methodology, using only sourced claims |
| Cabin decision | business class vs first class; mixed cabin itinerary | business class sau first class; itinerar cu clase diferite | бизнес-класс или первый класс; смешанные классы в маршруте | Business Class oder First Class; gemischte Reiseklassen | Distinct editorial answer after product/source review |

Do not manufacture separate pages for every synonym: “cheap,” “discount,” “deal,” “best,” city, airport and airline combination. A request for lower pricing can be addressed honestly inside the relevant page, but Derek must not be represented as a live low-cost flight-search engine. Prioritize content that helps a visitor decide, then measure whether the visitor is a fit.

Every new route guide needs an independent reason to exist: useful airport choices, segment/cabin caveats, timing or connection tradeoffs, fare-condition questions, reviewed sources and a directly relevant request path. Translation of a substantial original guide is legitimate localization; a city-name replacement funnel is a different proposition. Doorway pages, keyword stuffing and scaled unoriginal content intended to manipulate ranking violate Google's spam policies. [Google: spam policies](https://developers.google.com/search/docs/essentials/spam-policies).

## 6. Premium art direction and discoverable substance

The proposed analysis direction is **Derek → Your Journey**: preserve the inherited approved hero, show the real Derek portrait in its original setting, introduce a separate illustrative commercial premium-cabin scene, and explain the factors he reviews. This new concept still requires visual review; it is not a previously approved finished design. One arrival preference can feed the actual request when useful. Do not invent fares, saved amounts or simulated recommendation results to make this interaction appear operational. Search information can live naturally in that composition; it does not require repetitive numbered chapters, keyword walls or a footer directory of unbuilt routes.

| Design choice | Search/user requirement |
|---|---|
| Cinematic cabin/video atmosphere | Headline, service explanation and navigation remain real HTML text; poster communicates the cabin before video starts |
| Derek portrait | Accurate alt text and approved identity/rights; no stock model presented as Derek |
| Journey-review factors | Semantic labels and meaningful text describe cabin, timing, connections and conditions; no fabricated fare or simulated result |
| Carousels and flip cards | Important service facts are in initial HTML, usable without hover, keyboard accessible and understandable on touch |
| Scroll reveals | Content remains visible/readable when JavaScript or animation fails; motion enhances the page after content is available |
| Route imagery | Show the actual subject; do not call a general cabin image a verified airline product or a scene a real client booking |
| Language selector | Real linked equivalent pages; complete readable labels, adequate hit area and no forced redirect |

Current installed Syne and DM Sans font-face files include Latin/Latin-ext; Syne also includes Greek. Neither inspected package stylesheet contains a Cyrillic subset. Russian therefore needs a deliberately selected compatible Cyrillic font/fallback, not an accidental browser substitute. Preserve Syne/DM Sans for their supported scripts, and obtain design approval for the Russian pairing. Test `ă â î ș ț`, German umlauts/ß and Russian long headings; do not enforce English line breaks everywhere.

Aim for real-user LCP ≤2.5 seconds, INP ≤200 ms and CLS ≤0.1, evaluated at the 75th percentile separately for mobile and desktop. These are quality targets, not a ranking guarantee. [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), [web.dev: measurement thresholds](https://web.dev/articles/vitals).

Project budgets to validate during implementation, rather than claim as measured now: prioritize the visible poster and text; load secondary scenic images lazily; reserve image/video dimensions; prevent fonts from moving the form; limit simultaneous autoplay media and pause offscreen scenes. The current local hero files are approximately 104 KiB poster, 305 KiB WebM and 569 KiB MP4. Small files alone do not establish a good LCP or INP: test hydration, animation work and the full quote interaction on representative mobile hardware/network conditions. Three.js or advanced effects should earn their cost through a visible benefit.

## 7. Structured data, identity and external discovery

Retain the existing conservative semantic graph. Extend locale fields and stable entity IDs when implementing; add approved Person identity, article author/reviewer and real publication/modification dates only where those facts exist. A `Service` node describes the service; it is not a promise of a Google rich result.

Do not add fabricated aggregate ratings, testimonial markup, Offer prices or airline affiliation. Structured data must represent the visible content, and correct syntax does not guarantee a special search appearance. [Google: structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). Self-serving business review stars have additional eligibility restrictions; an embedded third-party review widget does not bypass them. [Google: review snippets](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).

Clarify Derek's actual role, contact ownership and the relationship to the operational `travelbusinessclass.com` mailbox. Build consistent approved identity and a real biography; do not infer credentials, legal entity, offices, airline contracts or experience dates from a design brief. Useful genuine references and independently earned coverage are preferable to purchased ranking links or invented association badges.

Bing Webmaster Tools can later provide a separate discovery/indexing baseline. IndexNow can notify participating engines of approved new/changed/deleted URLs, but notification does not guarantee indexing. It is a possible post-implementation integration, not an action performed in this analysis. [Bing: sitemaps](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed), [IndexNow FAQ](https://www.indexnow.org/faq).

For Google's AI search features, the same fundamentals apply: accessible, eligible, helpful pages and consistent visible/structured information. Do not sell an invented special AI schema or promise citation in AI answers. [Google: AI features](https://developers.google.com/search/docs/appearance/ai-features).

## 8. Technical acceptance and URL stability

Extend the current validator only when the localization implementation exists. Required acceptance checks:

1. Approved locale routes return 200 HTML with correct language, unique subject-appropriate title/description/H1, self canonical and complete initial content.
2. Each equivalent set has accurate reciprocal/self hreflang and intentional x-default; all targets are published 200 canonical pages, with no draft/404/redirect member.
3. Initial HTML and client navigation agree on language, metadata, schema and alternates. No stale English metadata remains on another locale.
4. Language links preserve subject where an equivalent exists; internal links stay inside the chosen locale unless a clearly marked exception applies.
5. Sitemap contains only approved canonical indexable URLs. `lastmod`, if added, records a substantive actual update, not every build timestamp.
6. Preview protection remains intact and cannot be undone by hydration. Public production is checked separately for accidental noindex/blocked assets.
7. Existing 16 English URLs retain their current purpose. The three retained article slugs remain stable. All five historic removals and arbitrary missing paths remain genuine 404s unless a reviewed equivalent replacement specifically justifies a one-to-one permanent redirect.
8. Slash/host/HTTPS redirects are consistent and do not create chains; current `/services/` → `/services` 308 behavior is preserved. Host and HTTP variants were not covered by this audit and require a later bounded check.
9. No price/review/affiliation claim leaks into translated alt text, metadata, social cards or schema.
10. The localized quote flow handles keyboard, touch, validation, verification, server error and recovery states correctly. “Success” still requires the actual API receipt contract.

The preview implementation currently combines `noindex` with robots disallow. Retain its intent, but do not describe robots disallow as a guaranteed removal mechanism: a crawler must be able to fetch a page to read its noindex. If a preview has already leaked into an index, use a deliberate removal/access strategy appropriate to that host, with account evidence. [Google: blocking indexing](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## 9. Baseline and the first 90 days after an approved launch

This is a proposed review cadence, not a created automation or a promise of organic growth within 90 days. The current baseline establishes 16 reachable English URLs only. Traffic, query visibility, conversion and field performance numbers are unknown.

| Period | Work and evidence | Decision/output |
|---|---|---|
| Before launch | Owner approves claims, actual service languages and identity; native editors approve the selected complete locale funnel; establish domain access and export existing performance/index coverage if available | Final launch scope and honest starting baseline |
| Days 1–14 | Validate deployed headers/HTML, locale alternates, sitemap and protected previews; submit/inspect approved discovery inventory through owner-authorized tools; record URL-level exclusions | Resolve technical selection/discovery problems before more content |
| Days 15–30 | Review locale landing pages, actual non-brand query families, CTR and quote funnel friction; check real-user performance when enough data exists | Improve mismatched intent, unclear snippets or broken conversion states |
| Days 31–60 | Compare matched rolling periods with sample size/country/device context; review qualified request patterns; publish only the next sourced content entity that answers demonstrated needs | Expand a successful subject/locale, or improve weak existing content |
| Days 61–90 | Review index coverage, useful non-brand visibility, assisted/direct qualified requests, content accuracy and field performance; revisit the page queue | Continue, narrow or rebalance based on evidence rather than page-count targets |

Measure these separately:

- **Technical quality:** all launched locale pages pass the acceptance contract; zero unsupported equivalent links, accidental draft indexability or false proof.
- **Discovery/selection:** submitted vs known vs indexed canonical URLs, exclusion reasons and search-engine-selected canonical. URL inspection evidence is distinct from a successful public HTTP response.
- **Visibility:** clicks, impressions and CTR for brand and relevant non-brand query families, per landing-locale/country/device. Search Console language is inferred from the locale landing URL and reviewed query wording; do not invent a native language report or assume every query is disclosed.
- **Commercial quality:** qualified quote requests and actual customer fit. A form start is interest; API-acknowledged success means the request was accepted under the receipt contract, with actual inbox delivery still a separate observation. A WhatsApp click is a click, not a completed conversation or booking.
- **Experience:** mobile/desktop field LCP, INP and CLS, plus friction in the multilingual quote path. A Lighthouse lab score is not a substitute for field data.

Current analytics events are allowlisted and opt-in by deployment flag. Useful existing events include `quote_form_view`, `quote_form_start`, `quote_form_submit`, `quote_form_success`, `contact_method_click` and `comparison_view`. Production enablement and data collection have not been verified. Adding a bounded locale/content-ID category would be a future implementation choice; keep traveler names, email, phone, route free text and notes outside analytics. Account-level baseline work and further inspection need owner-provided access, never passwords in chat. [Google: Search Console workflow](https://developers.google.com/search/docs/monitor-debug/search-console-start).

## 10. Recommended next decision

Approve **Derek → Your Journey**, a personal premium-commercial-travel direction centered on the real Derek, a separate illustrative cabin atmosphere and readable itinerary-review factors. Preserve the existing English URLs and protected request system. Start localization with reviewed brand + seven core subjects, delivered incrementally as complete locale experiences. Reconcile the restored claim debt before copying it into three more languages.

The work to approve next is a bounded implementation plan and reviewed content inventory, with named owner/native reviewers and clear engineering checks. Ranking, indexing, lead volume and AI citation are outcomes to measure, not promises to fabricate.
