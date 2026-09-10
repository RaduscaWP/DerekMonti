# Fly with Derek — homepage prototype

Completed local review build, 10 September 2026.

**Preview:** http://127.0.0.1:4174/

An isolated, English-language homepage based on the approved Departure Window and Comfort Studio concepts. The production homepage, API, delivery settings and other pages are unchanged.

## What to explore

1. Watch the fixed-cabin, 12-second moving-cloud hero; pause or resume it using the discreet control.
2. Enter From / To and choose **Start planning**. These values carry into the trip form.
3. Try **Rested**, **Ready to work** and **Travelling together**. Each changes the illustration and updates the shared trip brief. No preference is recorded until selected.
4. Complete the three steps: journey, preferences, contact and review. Round trip, one way and multi-city are supported. Back navigation and edits preserve your details.
5. Try the local submission preview, including its recoverable-error option. Loading, error, retry and success are simulated. **No request is delivered to Derek.**

The form shares state with the hero and comfort section. Reloading clears that state. Existing contact links point to Derek's real channels; secondary navigation points to the current website.

## Start or restart

From this directory in PowerShell:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run preview
```

Open http://127.0.0.1:4174/. If the delivered preview is already running, use it; a second preview process will report the port in use. Keep the preview terminal running when starting it yourself.

For source editing, `npm.cmd run dev` serves http://127.0.0.1:4173/. Rebuild before reviewing the built preview. Node.js and npm must be available. The prototype imports the parent repository's pure quote validator, so keep `prototype/homepage` inside this checkout.

## Deliverables

- [Desktop homepage](qa/desktop-full-1440.png) and [mobile homepage](qa/mobile-full-390.png)
- [Desktop hero](qa/desktop-hero-1440.png), [mobile hero](qa/mobile-hero-390.png), [320px hero](qa/mobile-hero-320.png)
- [Comfort studio](qa/desktop-comfort-rested-1440.png), [work](qa/desktop-comfort-work-1440.png), [together](qa/desktop-comfort-together-1440.png)
- [Reference comparison and design QA](design-qa.md)
- [Verification record](verification.md)
- [Asset sources and license notices](asset-sources.md)
- [Form contract and future integration boundary](trip-integration.md)

## Implementation

React 18, Vite, SCSS, GSAP, self-hosted Syne / DM Sans and library icons. The hero uses local WebM / MP4 with an immediate matching poster. The scene does not depend on WebGL. Reduced motion removes the video and disables decorative animation; essential inputs work independently of media loading.

Main files: `src/App.jsx`, `src/homepage.scss`, `src/styles.css`, `src/TripForm.jsx`, `src/tripState.js`, `src/trip-form.scss`. Runtime media is in `public/assets`; source media and reproduction details are retained separately.

## Review boundary

This is a complete homepage prototype for owner review, not a production release. The video preserves the selected window composition, with cooler pink/blue twilight outside instead of the reference's golden light. The comfort images are deliberately illustrative, not promised airline equipment.

All required media is present. Production delivery, anti-abuse integration and persistence remain the later integration phase. In particular, the existing server must explicitly accept the new optional `comfortPreference` property; see the integration document. Other page redesigns follow homepage approval. No site was published or deployed in this task.
