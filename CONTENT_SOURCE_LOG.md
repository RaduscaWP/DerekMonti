# Fly with Derek — Content and Source Log

Status date: 2026-08-31  
Maintainer: unassigned; owner must designate a content/factual reviewer  
Purpose: track the origin, approval, review date, and expiry of business, route, airport, airline, product, fare-rule, legal, and other changing claims

## Publication rule

No changing fact should be added to visible copy, metadata, alt text, schema, email, or generated SEO content unless this log records:

1. the exact claim or bounded set of claims;
2. a primary/authoritative source URL or owner-supplied evidence;
3. the publisher/source owner;
4. the date accessed;
5. the page(s) that use it;
6. the reviewer and approval date;
7. the next review date or expiry trigger;
8. any caveat needed to prevent an endorsement, guarantee, or stale claim.

Search snippets, AI output, unsourced affiliate pages, and copied competitor text are not evidence. A source may support a fact; it does not grant image, trademark, or text-republication rights.

## Current repository fact register

“Repository-confirmed” means the value is present consistently in code/PRD. It does not independently confirm real-world ownership, currency, or legal accuracy.

| ID | Fact/asset | Current source | Last repository check | Status | Used on/in | Next action |
|---|---|---|---|---|---|---|
| BRAND-001 | Working brand: Fly with Derek; named advisor: Derek Monti | Master PRD and current route/content data | 2026-08-31 | Repository-confirmed; owner identity/brand approval not recorded | Site-wide metadata, navigation, pages, email | Obtain written owner confirmation and legal/business identity details |
| DOMAIN-001 | Canonical origin configured as `https://www.flywithderek.com` | `src/seo/routeManifest.js` and PRD | 2026-08-31 | Repository-confirmed; DNS, ownership, and production target not verified | Canonicals, sitemap, schema, email avatar URL | Confirm domain ownership, preferred host, HTTPS, and production deployment |
| CONTACT-001 | Phone/WhatsApp: `+1 (786) 706-4828` / `+17867064828` | `src/data/siteData.js`, `api/quote.js`, and `api/_emailTemplate.js` | 2026-08-31 | Repository-confirmed string; ownership/current validity not independently verified | Home CTA, footer, Privacy, Terms, email | Owner test and written approval before production |
| CONTACT-002 | Operational email: `Derek@travelbusinessclass.com` | `src/data/siteData.js`, `api/quote.js`, `api/_emailTemplate.js` | 2026-08-31 | Repository-confirmed string; it is cross-domain relative to Fly with Derek, and ownership/brand relationship is not documented | Legal pages, API recipient/reply-to, email | Owner must confirm mailbox control and approve the cross-domain relationship, or replace it with an approved same-domain address |
| ASSET-001 | Derek portrait has two identical public copies: `public/images/DMphoto.jpg` and `public/images/derek-monti.jpg` | Current repository files; both SHA-256 `D14B9F654A6FF3E6216E15E181942AA297449A5A198EE92389EA4A2ACA3786D1` | 2026-08-31 | File identity confirmed; subject identity, photographer, release, and license not recorded; the unused root duplicate was removed | Home, About, quote success, social image, and email avatar use the public copies | Obtain model/photographer/usage approval, then decide whether to consolidate the two runtime names |
| ASSET-002 | Transactional email contains no remote stock-image hero; it uses the local portrait URL for the avatar | `api/_emailTemplate.js` | 2026-08-31 | Previous Pexels dependency removed; portrait rights remain governed by ASSET-001 | Email avatar | Keep remote third-party imagery out unless source, license, rights, and reliability are recorded first |
| QA-ARTIFACT-001 | Superseded transactional-email HTML previews and screenshots were removed | Deleted tracked `tmp-email-preview/` artifacts compared with `api/_emailTemplate.js` | 2026-08-31 | Removed because they still represented the prior Pexels/Trustpilot template and were misleading as current QA evidence | Repository hygiene only; not runtime content | Generate new previews only from the current template and record the email clients and date tested |
| SERVICE-001 | Site accepts business- and first-class itinerary requests for personal review | Master PRD and current page/form implementation | 2026-08-31 | Conservative repository scope; owner operational approval pending | Home, Services, About, seven core pages, form | Owner confirms exact service scope and operational boundaries |
| METHOD-001 | Comparison lens covers schedule, cabin, route logic, flexibility, ticket conditions, and whole-trip fit | PRD planning requirements and `src/data/siteData.js` | 2026-08-31 | Implementation framework; not a credential, guarantee, or external fact | Home, About, Services, core pages, guides | Owner/editorial approval; keep language non-guaranteed |
| CONTENT-001 | Seven core pages contain durable planning guidance and caveats, not specific fares/schedules/airline products | `src/data/corePages.js` | 2026-08-31 | Truthfulness-screened implementation; all seven explicitly opt in through `approvedForIndexing: true`; owner/editorial approval pending | Seven `/business-class-flights...`, `/first-class-flights`, and `/services/...` routes | Assign owner, review each page, and record approval before production content sign-off |
| CONTENT-002 | Three guides contain durable comparison/checklist frameworks; current word counts are 431, 342, and 296 and all compute to 2-minute reads | `src/data/siteData.js` computed content records | 2026-08-31 | Repository-confirmed counts; each guide explicitly opts in for indexing; no unverified byline or publication date is rendered or emitted in `Article` schema | Three `/blog/...` routes and guide hub | Approve the copy and any future byline/date separately; recalculate automatically after edits |
| DEPLOY-001 | Preview indexation guard uses `FLY_WITH_DEREK_NOINDEX=true` and automatically treats a present non-production `VERCEL_ENV` as noindex | `src/seo/deployment.js`, prerender scripts, and `.env.example` | 2026-08-31 | Code and automated contract tests verified; actual production environment values and crawler behavior not verified | Robots metadata, JSON-LD, sitemap, and `robots.txt` | Confirm production environment variables and inspect deployed page source/headers before opening indexing |
| VENDOR-001 | Code contains Resend email, Vercel hosting/analytics, Cloudflare Turnstile, and Upstash rate-limit integrations | `package.json`, `api/`, `src/App.jsx`, `.env.example` | 2026-08-31 | Technical integration confirmed; live API, live email delivery, Turnstile, Upstash, production enablement, contracts, regions, and data terms were not tested or verified | Quote workflow and Privacy assertions | Confirm enabled vendors/account owners, DPAs, data locations, retention, and lawful basis; run live integration tests with approved accounts |
| LEGAL-001 | Privacy page describes the current form fields, non-PII session state, request purposes, configured/optional services, undefined provider/email retention, cookies/identifiers in qualified terms, rights, security controls, and contact path | `src/pages/Privacy.jsx`; “Last updated August 31, 2026” | 2026-08-31 | Reconciled to the implementation; qualified legal/owner approval and production-account verification are still absent | `/privacy` | Verify deployed vendors/settings and actual operating practices, then obtain qualified legal/owner approval |
| LEGAL-002 | Terms describe an independent request/guidance website, no live inventory/payment/ticket issuance, requests not being bookings, traveler responsibilities, ticket-specific conditions, no price/availability guarantee, IP, and general-information limits | `src/pages/Terms.jsx`; “Last updated August 31, 2026” | 2026-08-31 | Unsupported partner, consolidator, fee, sample-savings, liability, and governing-law claims are absent; qualified legal/owner approval is still required | `/terms` | Confirm the actual operating/ticketing process and obtain qualified legal/owner approval before production sign-off |

## Claims intentionally not published

| Claim category | Current status | Evidence required before use | Review trigger |
|---|---|---|---|
| Live or “from” fares, price examples, discounts, and savings percentages | Not published in rebuilt marketing content | Real source, timestamp, route, cabin, conditions, comparison basis, owner approval, and expiry | Recheck immediately before display; remove when source expires |
| Availability, inventory access, special/private/unpublished fares | Not published | Owner evidence of actual capability and compliant wording; no airline-affiliation implication | Recheck whenever supplier/access terms change |
| Response times, same-day/24-hour promises, last-minute success | Not published | Measured operating data, service definition, and owner approval | Periodic operational review and after staffing/process changes |
| Testimonials, ratings, reviews, client totals, experience, awards, credentials | Not published | Verifiable source, consent, ownership/relationship, date, and approved display terms | Recheck source ownership and current display rights |
| Airline partnerships, endorsements, negotiated access, airline logos | Not published | Written relationship/usage approval and legally reviewed disclosure | Recheck at agreement expiry or material change |
| Specific aircraft, seats, cabins, lounges, routes, and schedules | Not published on current guides/core pages | Official airline/airport source, flight/date/aircraft caveat, access date, reviewer | Review before publish and on product/schedule change |
| Specific fare rules, baggage, fees, change/cancel/refund terms | Not published as a universal claim | The exact ticket/fare conditions or official current rule for the specific context | Verify for every real option and before editorial reuse |
| Visa, passport, health, entry, or regulatory requirements | Not published as advice | Current official government/authority source, jurisdiction and traveler caveat | Review immediately before publication/use |
| Derek biography, years, milestones, licensing, address, entity, jurisdiction | Not published in rebuilt About content | Owner-supplied facts plus documents where a regulated/legal claim is involved | Owner review after any business change |

## Deferred URL source queue

All URLs below remain outside the route manifest and sitemap. “Deferred” is intentional, not an invitation to generate templates.

### Route pages — unique route evidence required

Each route needs current official airport/airline sources, route-specific timing and connection context, airport caveats, a unique decision purpose, owner review, and a last-reviewed date.

- `/routes/new-york-to-london-business-class`
- `/routes/new-york-to-paris-business-class`
- `/routes/boston-to-london-business-class`
- `/routes/miami-to-madrid-business-class`
- `/routes/chicago-to-london-business-class`
- `/routes/los-angeles-to-london-business-class`
- `/routes/london-to-new-york-business-class`
- `/routes/paris-to-new-york-business-class`
- `/routes/frankfurt-to-new-york-business-class`
- `/routes/madrid-to-miami-business-class`

### Destination pages — arrival/onward evidence required

Each destination needs official airport choices, onward-travel context, accessibility caveats where relevant, current sources, unique internal links, and owner review.

- `/destinations/london/business-class-flights`
- `/destinations/paris/business-class-flights`
- `/destinations/rome/business-class-flights`
- `/destinations/milan/business-class-flights`
- `/destinations/new-york/business-class-flights`
- `/destinations/miami/business-class-flights`

### Airline guides — product and trademark evidence required

Each guide must be explicitly independent, identify the product/aircraft/route scope, cite official current product sources, carry caveats and a last-reviewed date, and avoid logos unless usage is approved.

- `/airlines/emirates/business-class`
- `/airlines/qatar-airways/business-class`
- `/airlines/lufthansa/business-class`
- `/airlines/british-airways/business-class`
- `/airlines/delta-one/business-class`

### Additional guides — editorial/source review required

- `/guides/business-class-consolidator-fares`: owner verification of business model/access plus compliance review.
- `/guides/use-points-for-business-class`: current official loyalty-program sources and non-affiliate editorial policy.
- `/guides/best-time-book-business-class-europe`: defensible methodology and dated dataset; no unsupported universal “best time.”
- `/guides/business-class-vs-premium-economy`: current product-scope caveats and owner editorial review.

## Source record template

Copy this block for every approved claim set:

```text
Source ID:
Claim(s) supported:
Page URL(s):
Source title:
Source publisher/owner:
Primary source URL or owner-evidence location:
Date published/updated by source:
Date accessed:
Source excerpt or precise fact location:
Implementation paraphrase:
Limitations/caveats:
Trademark/image rights status:
Factual reviewer:
Owner approver:
Approval date:
Next review date or expiry event:
Status: draft | approved | expired | removed
```

## Maintenance workflow

1. Add the source record before drafting changing facts.
2. Prefer the airline, airport, government, program, or ticket terms that owns the fact.
3. Write a bounded paraphrase and record the caveat; do not copy substantial source text.
4. Have a named reviewer check the published claim against the source and intended page context.
5. Add the page only after uniqueness, metadata, internal-link, schema, accessibility, and HTTP checks pass.
6. At expiry, re-verify, revise, or remove the claim and any dependent metadata/schema. Never leave an expired price, schedule, product, or legal rule live by default.
7. Record removals and redirects in `REDIRECT_MAP.md`; do not redirect unsupported content to an unrelated URL.
