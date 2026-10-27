# Fly with Derek — raport de audit și rebuild (23–27 octombrie 2026)

Ramură: `rebuild/aug31-hybrid` (commit `6ab5a27`), construită pe baseline-ul din 31 august (`f6f56b4`). Tot ce fusese adăugat din septembrie încolo a fost parcat pe `wip/october-2026-rejected` și etichetat (`archive/2026-09-30-editorial`), conform deciziei proprietarului.

Build-ul de verificare trece complet: `npm run build` → „Validated 30 prerendered routes, sitemap.xml, robots.txt, and 404.html”; `npm test` → 15/15.

## 1. Ce a găsit auditul (site-ul din 31 august, live până acum ca 699c3cf)

Auditul a rulat cu 10 agenți (159 constatări) plus măsurători Playwright și Lighthouse pe build-ul din 31 august. Dovezile sunt în `output/playwright/2026-10-23-audit/` (capturi la 320/390/768/1024/1440/1920 și `metrics.json`).

Problema de fond nu era un bug, ci faptul că site-ul nu vindea nimic și nu suna a persoană:

| Constatare | Măsurat pe 31 august |
|---|---|
| Prețuri, procente, companii aeriene, recenzii, telefon above-the-fold | 0 din fiecare |
| „review” / „tradeoff” / disclaimere în text | 198 / 41 / 68 apariții |
| Titluri SEO cu termeni comerciali („business class tickets/flights”) | niciunul; titlurile foloseau „guidance”, „planning” |
| Șablonul de secțiune (eyebrow + H2 uriaș + listă 01/02/03) | reutilizat pe fiecare pagină |
| Home pe mobil | 13.920 px, cu un formular de 12 câmpuri ca a doua secțiune |
| Text sub 12 px / ținte de tap sub 44 px | 61 / 25 pe home mobil |
| Bug-uri vizibile | About: H2 suprapus peste listă la 1440 px și scroll orizontal sub 375 px; 404: buton gol (crimson pe crimson) |
| Lighthouse mobil home | 71 (FCP 4,3 s, CSS blocant 1,2 s, 149 KB JS nefolosit, chunk three.js 440 KB) |

Categorii de „AI slop” identificate: voce de document de conformitate („the whole journey”, „tradeoffs”, „human review”), sloganuri în două bătăi fără conținut, numerotare decorativă 01–06, iconițe Lucide în cercuri în loc de conținut, zero fotografie reală, disclaimere în titluri, particule three.js în hero.

## 2. Ce s-a construit

### Reguli respectate pe fiecare pagină
- Persoana I, propoziții concrete (rută, companie, preț, timp); un singur disclaimer pe pagină, sub buton; fără numerotare decorativă; fără iconițe-în-cerc ca substitut de conținut; fără three.js.
- Minim 12 px pentru orice text; ținte de tap de 44 px (excepție: cele două link-uri din bara de anunț, 36 px).
- Un singur vocabular de CTA: „Get a quote” / „Send request to Derek” / „WhatsApp Derek”, cu telefonul lângă fiecare buton principal.
- Fără recenzii inventate: secțiunea de testimoniale se randează doar când `reviews[]` conține recenzii reale. Până atunci trust bar-ul afișează rating-urile agenției Travel Business Class, cu atribuire explicită.
- Cifrele din CLAUDE.md (15–60 %, 20+ clienți, 24/7, rute-exemplu) sunt marcate `TODO(owner-data)` și etichetate „example from a recent quote” în interfață.

### Home (hibrid: codul din 31 august + modulele comerciale din mai, cu design nou)
Hero cu video de cabină (doar pe desktop; pe mobil rămâne posterul), portret, H1 comercial, QuickQuote (tip călătorie, de unde, unde, date, pasageri, cabină) → trust bar (Google 4,9, BBB A+, ARC, via Travel Business Class) → 8 carduri de rute cu tarif publicat vs tariful lui Derek și fotografii reale → „How it works” cu linie desenată → „Why Derek” cu contoare → marquee companii → formular în doi pași (persistență în sessionStorage, honeypot, Turnstile, fallback WhatsApp) → explorare pagini → blog → FAQ (7 întrebări cu schema FAQPage) → CTA final → footer în trei niveluri. Bară lipicioasă pe mobil: WhatsApp / Call / Get a quote.

### Pagini
- 7 landing-uri (`CoreLanding`): hero sub 720 px cu cardul de ofertă, text nou la persoana I (`src/data/corePagesCopy.js`, 7.011 cuvinte, verificate la duplicate și vocabular), un modul „Spotlight” unic pe tip de pagină (tabel de tarife, tabel de rute, cronologie 24 h, schemă multi-city, comparație canale), FAQ-uri ca interogări reale.
- Pagina locală Miami (`/business-class-flights-miami`): companiile nonstop de la MIA, tabel cu 5 rute Miami–Europa, FAQ local.
- 10 pagini de rute (`src/data/routePages.js`, 768–853 cuvinte fiecare): Miami–Londra/Paris/Madrid/Roma/București, New York–Londra, Chicago–Roma, Los Angeles–Tokyo, San Francisco–Frankfurt, Boston–Dubai. Fotografii noi pentru Paris, Madrid și București (Pexels, self-hosted, WebP 1200/600).
- Blog: index cu carduri (copertă 16:9, categorie, dată, autor), filtre pe categorie, rail cu ofertă; articol cu măsură de 720 px, rail lipicios (autor, ofertă, articole conexe, rute), share. 6 articole de 1.312–1.475 cuvinte, cu titluri SEO separate (≤ 70 caractere).
- About: biografie la persoana I, contoare, „cum obțin tarifele”, cele șase verificări, valori, companii, blocul agenției partenere. Services: hero cu ofertă, 4 carduri cu flip 3D (tap pe mobil), rute-exemplu, pași, FAQ. Legal: persoana I, afilierea cu Travel Business Class explicată, data republicării. 404 cu rute populare și telefon.

### SEO tehnic
- `routeManifest.js`: titluri ≤ 70, descrieri ≤ 160 cu ofertă + telefon, `lastmod` și `priority` în sitemap, paginile legale indexabile dar în afara sitemap-ului.
- Schema: `WebSite` + `TravelAgency` (telefon, email, Miami, `memberOf` Travel Business Class, program 24/7) + `Person` pe toate paginile; `Service` + `BreadcrumbList` + `FAQPage` pe landing-uri și rute; `Article` cu autor și date pe blog.
- `og:image` 1200×630, `twitter:card`, favicon-uri, `site.webmanifest`, `Cache-Control` imutabil pentru `/assets`, 7 zile pentru imagini și video.
- Validatorul de prerender refuză acum: titluri > 70, descrieri > 160, JSON-LD invalid, pagini cu sub 5 link-uri interne, disclaimere în H1/H2.

### Performanță
- Code splitting pe rute compatibil cu prerender-ul (`pageLoaders.js` + `LazyPage`): bundle-ul principal a scăzut de la 636 KB la 209 KB; GSAP se încarcă lazy; three.js și greutățile de font nefolosite au fost eliminate.
- CSS-ul este inline în fiecare pagină (fără request blocant), fonturile Syne 800 și DM Sans 400 sunt preîncărcate, portretul și rutele au `srcset` WebP, video-ul din hero se încarcă doar pe desktop.
- Niciun conținut nu mai este ascuns înainte de hidratare (reveal-urile sar peste ce e deja pe ecran), CLS 0 pe toate paginile măsurate.

## 3. Măsurători după rebuild (`output/playwright/2026-10-27-rebuild-v3/`, `-v4/`)

| Metrică | 31 august | Acum |
|---|---|---|
| Text sub 12 px (home mobil) | 61 | 0 |
| Ținte de tap sub 40×40 (home mobil) | 25 | 2 (link-urile din bara de anunț, 36 px) |
| Scroll orizontal | About sub 375 px | niciunul la 320/390/768/1024/1440/1920 |
| Înălțime home mobil | 13.920 px | 13.412 px (mai mult conținut comercial pe aceeași lungime) |
| Înălțime blog mobil | — | 4.974 px |
| Lighthouse desktop home | — | 85–94 (variază între rulări), a11y 97, SEO 100 |
| Lighthouse mobil home (laborator, throttling simulat) | 71 | 52 (vezi nota) |
| Lighthouse mobil pagină de rută / landing | — | 66 / 63, a11y 100, SEO 100 |
| FCP / LCP observate la throttling real (slow 4G, CPU ×4) | — | 2,5 s / 2,5 s |

Nota despre scorul mobil: pagina de home are acum de trei ori mai mult conținut (1.125 elemente DOM, 123 KB CSS), iar simularea Lighthouse penalizează costul de stil și layout pe CPU ×4 (FCP simulat 5,5 s față de 0,6 s observat). Pe serverul local fără compresie scorul este și mai pesimist; pe Vercel (brotli) și în PageSpeed Insights trebuie remăsurat după deploy. Pașii următori pentru ≥ 90 sunt la secțiunea 5.

## 4. Ce rămâne în sarcina proprietarului (nu se poate face din cod)

Chestionarul complet este în `DEREK_QUESTIONNAIRE.md`. Cele mai importante:
1. 3–8 rezervări reale (rută, cabină, companii, tarif publicat vs plătit, luna) pentru a înlocui exemplele din CLAUDE.md.
2. Permisiunea de a cita 3 recenzii reale (prenume + inițială + sursă) → activează secțiunea de testimoniale.
3. Ani în domeniu, anul primului client privat, număr de clienți, companiile pe care emite bilete, limbi vorbite.
4. Acreditările exacte ale Travel Business Class (ARC #, BBB, IATAN) și formularea agreată a afilierii; link-ul Trustpilot (rămâne `verified: false` până se confirmă).
5. Off-site: Google Search Console (DNS TXT) + trimiterea sitemap-ului, Google Business Profile ca service-area business (Miami-Dade/Broward/Palm Beach), Trustpilot, LinkedIn, Apple Business Connect.

## 5. Pași următori recomandați

1. Lansare: preview Vercel pe ramura `rebuild/aug31-hybrid` (noindex automat), verificare manuală a formularului (e-mail real primit de Derek) și a WhatsApp-ului, apoi merge în `main` doar cu acordul proprietarului; rollback de urgență: deployment `dpl_3Vg8VJMNK711PTG8q5P2PBsGEuy6`.
2. Performanță mobil: împărțirea CSS-ului în critic (inline) + restul încărcat asincron; carduri de rute cu varianta de 900 px pentru ecrane DPR 3; reducerea DOM-ului din home (carusel randat progresiv). Remăsurare în PageSpeed Insights după deploy.
3. Conținut: lotul 2 de rute (Boston–Frankfurt, Miami–Lisabona, New York–Paris…), paginile de țară (`/business-class-flights/italy` etc.) și un articol la două săptămâni, conform calendarului din plan.
4. Date reale: înlocuirea exemplelor marcate `TODO(owner-data)` în `siteData.js`, `routePages.js`, `corePagesCopy.js` și `Services.jsx` în ≤ 30 de zile de la lansare.

## 6. Cum se verifică

```
npm ci && npm test && npm run build
npm run preview:static            # http://127.0.0.1:4173, cu gzip ca în producție
AUDIT_CHROME="$LOCALAPPDATA/ms-playwright/chromium-1228/chrome-win64/chrome.exe" AUDIT_BASE=http://127.0.0.1:4173 AUDIT_OUT=output/playwright/<data> node scripts/qa/capture.mjs
node scripts/qa/sections.mjs            # înălțimea secțiunilor pe mobil (ROUTES="/,/about")
node scripts/qa/css-coverage.mjs        # reguli CSS nefolosite pe nicio pagină
```
