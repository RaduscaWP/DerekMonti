# Fly with Derek — Redirect Map

Status date: 2026-08-31  
Canonical URL style: no trailing slash, except `https://www.flywithderek.com/`  
Configured custom redirects in `vercel.json`: none

## Policy

- Preserve a useful working URL when its subject remains represented by substantial content.
- Use a 301 only when a new page is a genuinely equivalent replacement.
- Do not send removed or unsupported articles to the homepage, blog hub, quote form, or a loosely related commercial page.
- A 404 is the intended result when no safe equivalent exists. This avoids a misleading redirect and a soft-404 signal.
- The table distinguishes repository/build and local HTTP evidence from deployed HTTP evidence. No production status-code verification is claimed.

## Legacy article decisions

| Source URL | Destination URL | Intended status | Reason | Verification status |
|---|---|---:|---|---|
| `/blog/why-travelers-overpay-business-class` | Same URL | 200, no redirect | Useful slug preserved; article rewritten as “A Better Way to Compare Business Class Options” with a durable comparison framework | Present in manifest; prerender and representative local clean-URL HTTP checks passed; deployed HTTP pending |
| `/blog/business-class-service-beyond-seat` | Same URL | 200, no redirect | Useful slug preserved; article rewritten as “Business Class Is More Than the Seat” | Present in manifest; prerender and representative local clean-URL HTTP checks passed; deployed HTTP pending |
| `/blog/last-minute-business-class` | Same URL | 200, no redirect | Useful slug preserved; article rewritten as “How to Prepare a Time-Sensitive Premium Flight Request” without fare or availability promises | Present in manifest; prerender and representative local clean-URL HTTP checks passed; deployed HTTP pending |
| `/blog/hidden-business-class-deals` | None | 404, no redirect | No sourced replacement supports “hidden deals” or airline-advertising claims | Absent from manifest; unknown article slug renders the not-found view and the local static server returns the generated 404 document; deployed HTTP pending |
| `/blog/tokyo-vs-singapore-first-class` | None | 404, no redirect | No current, sourced Tokyo/Singapore product comparison exists | Absent from manifest; unknown article slug renders the not-found view and the local static server returns the generated 404 document; deployed HTTP pending |
| `/blog/top-business-class-airlines-2026` | None | 404, no redirect | A current airline ranking requires dated product research, methodology, and owner approval | Absent from manifest; unknown article slug renders the not-found view and the local static server returns the generated 404 document; deployed HTTP pending |
| `/blog/emirates-vs-qatar-first-class` | None | 404, no redirect | No current, source-reviewed airline-product comparison exists; redirecting could imply unsupported equivalence | Absent from manifest; unknown article slug renders the not-found view and the local static server returns the generated 404 document; deployed HTTP pending |
| `/blog/how-consolidator-fares-work` | None | 404, no redirect | The business model and any consolidator access have not been owner-verified; the proposed future consolidator guide is not publish-ready | Absent from manifest; unknown article slug renders the not-found view and the local static server returns the generated 404 document; deployed HTTP pending |

## Existing page URLs

The following pre-existing public paths remain unchanged and therefore require no redirect:

- `/`
- `/services`
- `/about`
- `/blog`
- `/privacy`
- `/terms`

Seven new core URLs were added directly at their intended canonical paths; they have no known predecessor URLs to redirect.

## Trailing-slash handling

`vercel.json` declares `cleanUrls: true` and `trailingSlash: false`, while the manifest emits no-trailing-slash canonicals. The local static server returned `308` with `Location: /services` for `/services/`, and canonical clean URLs returned HTML with `200`. This is local verification only: capture the exact production response chain before release because the deployed platform remains authoritative.

## Follow-up conditions

- Review production analytics, Search Console, backlinks, and any prior sitemap before final deletion decisions. None was available for this map.
- If a genuinely equivalent, fact-checked replacement is later published, add a specific one-to-one 301 and record the live verification result.
- The local server returned HTML with HTTP `404` for an unknown path; repeat representative removed-article checks on the production host.
- Verify that `404.html` is served with a 404 response by the production host; local behavior does not prove the host configuration.
