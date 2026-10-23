# Final visual review A

Reviewed the live local site at `http://127.0.0.1:5174/` on 3 October 2026. This is a visual and interaction assessment, not evidence of authorship or a forecast of conversion performance.

## Scope and evidence

Actual Home, Services and Journal screens were inspected through Cua at the existing 1280 × 720 browser viewport. No viewport override was changed. Captures render at 1264 × 712. The parent owns 320/390/1440 checks, the final build, hero changes and service repairs. No request, email, WhatsApp or provider submission was made. Only reversible preview, carousel, filter, flip and local brief controls were exercised.

Screenshots are in [the evidence folder](<C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/qa/final-visual-critic-a>). Saved opening, service-back, journal, fare and new priority screens were reopened from disk for inspection. Earlier captures are before states; they must not be used as proof that a later parent repair failed.

## Step assessment

| Step | Health | Evidence and conclusion |
| --- | --- | --- |
| 1. Opening and route entry | Revised by parent; final acceptance remains with parent | Initial `01-home-opening.jpg` was a conventional copy/portrait split with the request entry below the fold. It was legible and preserved Derek's face, but did not meet the approved cover aspiration. Latest live DOM has the clearer `Business & First Class` category heading and compact route entry. |
| 2. Priority exploration | Improved and verified | `18-priority-document-work-preview.jpg` shows the new dominant document, two concrete consequences and adjacent disclosure. Work selection did not alter the brief; explicit Add did. Together preview after Work was added also preserved Work in the brief. |
| 3. Fare examples | Healthy interaction; image accuracy corrected by parent | `11-home-fare-examples.jpg` records working cards, clear labels and nearby illustrative disclosure. The old Frankfurt photograph appears to show Berlin's Reichstag. Latest live DOM uses a neutral aircraft-wing illustration with accurate alt text. |
| 4. Meet Derek | Coherent, somewhat repetitive | `13-home-meet-derek.jpg` keeps the person central and describes route/cabin/conditions. The repeated portrait is acceptable for a personal brand; the heading is less specific than the useful detail below it. |
| 5. Services | Clear card interaction; keyboard repair assigned to parent | `07-services-complex-back.jpg` shows readable detail and explicit actions. `16-services-tab-skips-back-actions.jpg` proves the initial next-Tab path skipped the fourth card's newly exposed links. The parent is repairing order and sizing. |
| 6. Request entry | Repair assigned to parent | Initial `14-home-request-entry.jpg` had the first From field around y706. The description computed to `rgb(74,85,104)` at full opacity on navy, so its low contrast was not an entrance animation. The parent owns compactness and contrast repairs. |
| 7. Journal | Functional, visually coherent, editorial hierarchy can tighten | `08-journal-opening.jpg` and `09-journal-cabin-category.jpg` show the real feature and category filtering. With three guides, the very large generic masthead delays the actual reading choices. |

## Concrete improvements and their tradeoffs

1. **Replace the priority seat-and-checklist panel with an illustrative review document. Implemented.** The large seat image and general bullets repeated category benefits rather than revealing how a decision changes. The replacement uses a conditional premise, two contrasted consequences and one takeaway for each priority. The seat is now a small illustration. The counterargument was that a document could become another checklist and add reading effort; the final copy is limited to one specific tension per state. No itinerary, availability, price or service guarantee is invented.

2. **Expose useful route entry early and keep the request introduction legible. Parent implementation.** A conventional split was easy to read, but the first action was lower than the approved cover composition suggested. Tightening the opening while retaining the mandatory portrait is a more useful repair than replacing the photo. A large editorial title is still defensible when it leaves the category and action obvious; artistic difference alone does not prove a better funnel.

3. **Repair service keyboard order while retaining all four flip cards. Parent implementation.** Explicit toggles make the effect discoverable, but a user opening a card should reach its new actions on the next Tab. Keeping the toggle before controlled content in DOM supports that path while preserving visual placement and a predictable close control. Keyboard access is a concrete problem; removing the approved flip effect would not address the user's design requirement.

4. **Make the remaining headings describe the chapter's practical purpose. Future polish, no blocking redesign.** `Your next chapter. Anywhere.`, `One person. Your whole journey.`, `One trip. Considered in full.` and `The journey, considered.` repeat abstract travel language. Potential directions are `Compare an illustrative fare`, `The route, cabin and conditions` and `Guides for your next request`. These would help orientation, but replacing every line could flatten the personal voice; change only headings that delay understanding. Journal spacing should be adjusted with the heading so the actual guides gain first-view weight.

## Implementation boundary

Edited only the authorized `priorities` and `PriorityReview` portions of [HomeSections.jsx](<C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/src/pages/HomeSections.jsx>), added [priority-review.scss](<C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/src/styles/priority-review.scss>) and [priorityCopy.js](<C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/src/i18n/priorityCopy.js>), and registered the module in [messages.js](<C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/src/i18n/messages.js>). `home-editorial.scss`, `homeCopy.js` and `siteData.js` were not changed by A.

All 24 new translation keys are present and nonempty in English, Romanian, Russian and German, and were checked through the actual translator registration. The scoped stylesheet has no fixed document height, clipping or new animation, keeps disclosure beside controls, and places controls before the document on narrow screens. Narrow rendering and long localized text still need the parent's actual viewport checks. The whitespace check passed. No independent production build or performance measurement is claimed.

No verified Frankfurt-specific asset was found in the local image inventory. The existing `/images/legacy/pexels-5645180.jpg` is a verified neutral wing image, suitable only with an accurate illustration description. A did not modify the route data; the parent adopted that recommendation.

## A/B challenge and resolution

A favored replacing the original priority checklist with visible reasoning. B challenged the risk of more generic copy and advised one conditional tradeoff rather than fictional options. The implemented document follows that constraint. B also caught an unconditional group-routing consequence; `may add transitions` and the modal equivalents in all four languages replaced it. B independently reopened captures 18 and 20 and accepted the visual and content result at the attributed 1280 viewport, with no additional revision recommended. Both reviewers accepted that the initial split hero was readable and that retaining the mandatory portrait while improving action access was more justified than a late artistic restart. B independently covers reduced motion, Russian font selection and narrow card sizing; A does not duplicate those claims without rendered evidence.

![Priority review with Work preview and adjacent disclosure](<C:/Users/GZv0x00/OneDrive/Документы/Codex-test Derek Monti/qa/final-visual-critic-a/18-priority-document-work-preview.jpg>)
