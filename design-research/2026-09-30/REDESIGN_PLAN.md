# Fly with Derek — plan de redesign, cu hero-ul protejat

Data: 30 septembrie 2026. Stadiu: cercetare și plan; implementarea site-ului nu a fost modificată.

## 1. Recomandarea

Site-ul trebuie să arate ca o publicație premium despre călătorii, condusă de un consultant pe care îl cunoști personal. Spectacolul vine din fotografie, compoziție, contrast de scară și câteva interacțiuni clare. Identitatea rămâne Derek: Business și First Class pe curse comerciale, consultanță personală și acces la oferte. Referințele de aviație privată inspiră prezentarea, nu schimbă serviciul oferit.

**Teza vizuală:** atmosferă de cabină premium, precizia unui itinerar bine construit și apropierea unei conversații cu Derek.

**Teza de conținut:** arătăm întâi o călătorie concretă, apoi omul și modul în care te ajută; cererea de ofertă devine punctul natural de continuare.

**Teza de interacțiune:** alegerea unei călătorii schimbă imaginea și detaliile; preferința de confort continuă în cerere; comparația unui itinerar explică vizual o decizie.

Hero-ul actual, inclusiv imaginea/video-ul, titlul, formularul From/To, portretul, animația, comportamentul responsive și headerul suprapus, rămâne intact. Ca limită conservatoare, planul lucrează sub zonele de hero existente și pe conținutul paginilor; nu propune rescrierea masthead-urilor secundare.

## 2. Ce am verificat

Trei subagenți au investigat separat istoricul funcțiilor, referințele online și structura actuală. Am confruntat rezultatele cu fișierele și cu capturi noi din previzualizarea locală.

- Versiunea curentă: `6f6899ce022e8173d9789e845914cdb61691e822`, 14 septembrie 2026. Verificarea ramurilor publicate a găsit numai `main`, la același commit.
- Singurul commit cu dată de autor sau committer din august în istoricul disponibil: `f6f56b4e3e85712b5091688c56a394ad3929f879`, 31 august 2026.
- Părintele lui: `15510d6840ebf40939be1bbb09bb1b0cda543e56`, 25 mai 2026. Acesta este ultimul snapshot comis înainte de simplificarea din august și conține interacțiunile eliminate atunci.
- Am citit specificația proiectului și planul anterior din 12 septembrie. `phase2_workspace_diff.md` nu există în checkout-ul actual.
- Capturile sunt din sursa locală actuală, la 1440 × 1000 și 390 × 844, cu mișcare redusă pentru stabilitate. Fotografiile lazy-loaded au fost încărcate înaintea capturilor finale. Nu am trimis cereri și nu am verificat primirea emailurilor în producție.
- Referințele externe au fost cercetate prin paginile oficiale și studiile creatorilor. Lecțiile despre aspectul lor provin, unde este cazul, din descrierile studiourilor; nu reprezintă un audit vizual complet al fiecărui site.

## 3. Diagnosticul actual

Problema principală este repetiția, nu lipsa efectelor. Home are zece secțiuni după hero; multe folosesc un titlu mare, etichetă foarte mică și rânduri numerotate cu linii fine. About repetă analiza itinerarului din Services. Blog prezintă cele trei ghiduri numai ca rânduri de text. Cele șapte landing pages folosesc aceeași schemă, deși rezolvă nevoi diferite.

Selectorul de confort este un punct bun: imagine dominantă, alegere clară și continuitate spre formular. Îl păstrăm ca funcție și îl integrăm într-un ritm mai variat. Restul site-ului are nevoie de mai multe scene vizuale distincte și de mai puține explicații care repetă aceleași cuvinte: route, cabin, timing, complete journey.

Capturi inspectate în această sesiune:

- [Home — desktop](../../output/playwright/2026-09-30-design-plan/home-desktop.png)
- [Hero protejat — desktop](../../output/playwright/2026-09-30-design-plan/home-hero-desktop.png)
- [Selectorul de confort](../../output/playwright/2026-09-30-design-plan/home-comfort-desktop.png)
- [Services](../../output/playwright/2026-09-30-design-plan/services-desktop.png)
- [About](../../output/playwright/2026-09-30-design-plan/about-desktop.png)
- [Blog](../../output/playwright/2026-09-30-design-plan/blog-desktop.png)
- [Home — mobil](../../output/playwright/2026-09-30-design-plan/home-mobile.png)

Captura și măsurarea la 390px nu au arătat overflow orizontal. Această observație nu înlocuiește verificarea tuturor dimensiunilor și stărilor formularului.

## 4. Referințe și decizii de design

| Sursă cercetată | Lecția susținută de sursă | Aplicare pentru Derek |
|---|---|---|
| [Rocani — Platoon Aviation](https://rocani.studio/work/platoon-aviation) | Creatorii descriu un lookbook cinematic, fotografie și microinteracțiuni, apropiat de editorialul de modă. | Compoziții cu imagini mari și identitate memorabilă; păstrăm cererea de ofertă simplă. |
| [Matter Of Form — Belmond](https://www.matterofform.com/work/belmond) | Un sistem comun permite individualitatea fiecărei experiențe; conținutul ajută vizitatorul înaintea conversiei. | Aceleași fonturi și culori, dar compoziții diferite pentru Home, About, Services și Journal. |
| [Belmond](https://www.belmond.com/en) | Experiențe, destinații și povești organizate separat, cu navigare și contact explicite. | Secțiuni cu roluri distincte și footer ușor de parcurs. |
| [Black Tomato — concierge](https://www.blacktomato.com/travel-concierge/) | Oameni identificați, roluri clare și povești ale călătorilor. | Portret amplu, mesaj personal și cazuri de călătorie cu context. |
| [Black Tomato — enquiry](https://www.blacktomato.com/us/make-an-enquiry/) | Explică următorul pas după formular și oferă telefon pentru o conversație imediată. | Lângă cerere, explicăm ce urmează și oferim canalele existente ale lui Derek. |
| [Scott Dunn](https://www.scottdunn.com/) | Enquiry → specialist → quote → booking, cu rezultate clare pentru fiecare etapă. | Proces scurt și concret, atașat formularului. |
| [Four Seasons — Private Jet](https://www.fourseasons.com/privatejet/) | Journeys, experiență, FAQ și contact sunt distincte. | Serviciile au scenarii proprii și un traseu de contact clar. |
| [Four Seasons — African Wonders](https://www.fourseasons.com/privatejet/journeys/african-wonders/) | Destinații, tip de călătorie, preț și condiții apar ca informații explicite. | Comparațiile au rută, cabină, date, preț și condiții lizibile. |
| [Aman](https://www.aman.com/) | Selecții tematice de experiențe și povești sezoniere. | Un articol principal și două secundare, în locul unei biblioteci artificial umflate. |
| [Heckfield Place](https://www.heckfieldplace.com/) | Conținutul înaintează prin capitole despre loc, camere, mâncare și wellbeing. | O succesiune de scene cu subiecte diferite, legate într-o poveste. |
| [Poppins — VistaJet](https://poppins.agency/work/vistajet) | Creatorii explică o poveste în două acte și optimizarea experienței 3D pentru mobil. | Câteva schimbări de perspectivă intenționate; nu adăugăm un tur 3D greu pentru consultanța de bilete. |
| [Travel Business Class](https://travelbusinessclass.com/) | Referință pentru cereri, oferte, FAQ și organizarea informației de călătorie. | Comparator funcțional; cifrele și reputația companiei nu devin automat ale lui Derek. |

Direcția recomandată combină caracterul editorial descris de Rocani și Matter Of Form cu claritatea serviciului personal de la Black Tomato. Designul final va avea o singură identitate; nu va fi un colaj de fragmente din aceste site-uri.

## 5. Home: compoziția propusă după hero

### A. Tranziție compactă

O bandă scurtă: contact direct cu Derek, Business / First Class, cerere fără obligație de rezervare. Fără patru mini-secțiuni explicative. Eventualele ratinguri apar numai cu sursă atribuibilă.

### B. Selected journeys — prima scenă memorabilă

O fotografie mare de destinație ocupă aproximativ șapte coloane; în rest apare itinerarul ales. Coduri IATA mari, numele orașelor, cabină și date. Selectarea uneia dintre trei-patru călătorii schimbă imaginea și informația, cu o tranziție scurtă. Următoarele exemple rămân accesibile prin săgeți și swipe.

Comparația published fare / Derek's quote apare dacă avem un caz confirmat. Pentru demonstrație folosim eticheta explicită de exemplu ilustrativ. Economia se calculează din valori, nu dintr-un badge separat. CTA-ul poate precompleta ruta în același trip brief, fără a promite preț sau disponibilitate curentă.

Aceasta recuperează utilitatea caruselului istoric într-o compoziție mai puternică decât opt carduri identice.

### C. Comfort studio — interacțiunea bună rămâne

Păstrăm Rested / Ready to work / Travelling together și transferul selecției în cerere. Pentru a evita repetarea compoziției 7/5 din Selected journeys, această scenă ocupă toată lățimea: imaginea existentă rămâne proporțională într-un cadru panoramic de studio, iar cele trei alegeri apar într-o bandă compactă dedesubt. Alegerea schimbă fotografia și o singură explicație concretă. Textul are suficientă mărime; pe mobil, alegerile rămân imediat lângă imagine, accesibile fără hover.

Nu prezentăm imaginea ilustrativă ca produs exact al unei companii aeriene. Pe mobil, imaginea și alegerea trebuie să se vadă într-o secvență scurtă, fără spații imense între ele.

### D. Derek — întâlnirea personală

Un portret amplu, o scurtă scrisoare la persoana întâi și o observație personală aprobată. Compoziție asimetrică, fotografie verticală și text aerisit. Unificăm introducerea și beneficiile personale repetate într-o singură secțiune cu personalitate.

Pagina About dezvoltă omul și experiența lui; Home oferă o întâlnire scurtă și un link clar. Biografia și fotografiile trebuie aprobate ca reprezentări reale ale lui Derek.

### E. The better itinerary — valoarea explicată vizual

În locul unei alte liste despre schedule/cabin/routing, prezentăm două opțiuni ale aceleiași călătorii: plecare, conexiune, durată, cabină pe segmente, sosire și reguli relevante. Schimbarea opțiunii evidențiază diferențele. O propoziție explică de ce o variantă poate fi mai potrivită.

Folosim un caz anonim aprobat sau un exemplu ilustrativ. Home arată o comparație scurtă; explorarea completă aparține Services, pentru a evita repetarea aceleiași demonstrații pe ambele pagini. Un afișaj precis de itinerar este mai distinctiv pentru acest business decât o hartă decorativă animată permanent.

### F. Proces scurt + cerere de ofertă

Explicăm succint: share your plans → Derek reviews options → discuss and decide. Dedesubt, formularul actual devine o zonă calmă, cu câmpuri lizibile, indicator de progres și rezumat editabil.

Păstrăm un singur formular și o singură stare a călătoriei. Intrările din Services, Blog și carusel alimentează același brief. Dacă trimiterea eșuează, reapar WhatsApp și email precompletate, împreună cu reîncercarea.

### G. Dovezi și răspunsuri

O mărturie principală și eventual două secundare, numai când avem surse reale. O citare utilă include contextul călătoriei. Până atunci, folosim informații verificabile despre proces, nu review-uri fictive.

FAQ rămâne compact și funcțional. Fiecare întrebare elimină o neclaritate reală: cerere versus rezervare, flexibilitate, cabină, schimbări, următorul pas.

### H. Journal + contact final

Un articol cu fotografie dominantă și două intrări secundare, cu categorie și timp de lectură. Închiderea este o invitație personală scurtă și două acțiuni clare: cerere sau WhatsApp. Footerul păstrează toate paginile existente, contactul și linkurile legale.

Ritmul întregii pagini devine: **călătorie → experiență de cabină → om → comparație → cerere → răspunsuri → lectură → contact**. Nu fiecare capitol are nevoie de un titlu uriaș sau de un ecran întreg.

## 6. Restul paginilor

| Pagină | Compoziția de sub hero | Funcții păstrate / recuperate |
|---|---|---|
| Services | Experiențe distincte pentru Business, First, complex și urgent, cu fotografie și scenariu; păstrăm selectorul de itinerar actual. | Toate serviciile și linkurile; dezvăluire de detalii prin click/tap/keyboard; selecțiile continuă în brief. |
| About | Portret, scrisoare personală, experiență reală și detalii despre munca lui. Cronologie numai cu date confirmate. | Contact, cerere, FAQ/linkuri relevante. Contoare numai pentru cifre susținute. |
| Blog | O deschidere editorială cu articol principal, apoi biblioteca cu imagini și metadate; filtre vizibile când există suficient conținut. | Slugurile celor trei ghiduri aprobate; filtrarea istorică se recuperează fără categorii goale sau articole fictive. |
| Article | Coloană confortabilă de lectură, imagini utile, cuprins discret și un panou contextual de cerere. | Cuprins, reading time, related articles și continuare în același brief. |
| Business / First | Detalii despre cabină și comparație de itinerar; Business poate arăta echilibrul dintre odihnă și program, First spațiul și intimitatea. | Rutele și metadatele; selecția cabinei ajunge în cerere. |
| Complex itineraries | Itinerar cu segmente și un exemplu clar de constrângeri. | Multi-city, 2–6 segmente, date ordonate, adăugare/eliminare și rezumat. |
| Last-minute | Ora de sosire, limite fixe și canale de contact ușor de găsit. | Cerere urgentă/context, telefon, WhatsApp; fără garanții de disponibilitate inventate. |
| US–Europe / Europe–US | Fotografie de destinație și scenarii de călătorie relevante fiecărei direcții. | Rutele existente, linkurile între servicii și formular. |
| Personal advisor | Modul de lucru și exemple de ajutor personal, cu o prezentare vizuală proprie. | Contact și cerere cu service intent păstrat. |
| Privacy / Terms / 404 | Lectură clară și o ieșire simplă spre paginile utile. | Conținut legal, comportament 404 și noindex. |

Headerul suprapus hero-ului rămâne protejat. Descoperirea Business / First și a celorlalte servicii se îmbunătățește în Services și în navigarea de sub hero; orice schimbare ulterioară a headerului trebuie tratată separat.

## 7. Funcționalități: două straturi istorice

Expresia „funcționalitățile din august” acoperă aici atât rezultatul commitului din 31 august, cât și interacțiunile eliminate de acel commit. Nu facem rollback complet: infrastructura de cereri și SEO din august este mai solidă decât cea a părintelui.

### 7.1 Baza obligatorie: finalul lui august

| Funcție | Stare actuală | Acțiune în redesign |
|---|---|---|
| 16 rute publice + 404; trei ghiduri | Păstrate | Păstrăm URL-urile, deep links, conținutul și metadatele. |
| Round trip / one way / multi-city | Păstrate | Aceleași tipuri de cerere și schimbare de mod. |
| Multi-city 2–6 segmente | Păstrat | Aceleași limite, ordine a datelor și adăugare/eliminare. |
| 1–10 călători; Business / First / Either | Păstrate | Selecții clare pe desktop, touch și tastatură. |
| Date, flexibilitate, contact preferat, note, privacy acknowledgement | Păstrate | Toate câmpurile și validările rămân. |
| Draft sigur în sesiune | Păstrat cu altă cheie | Păstrăm numai datele de călătorie permise; considerăm migrarea compatibilă a vechii chei. |
| API de cerere, notificare Derek și confirmare călător | Implementate | Păstrăm API-ul; emailurile reale se verifică separat cu configurație validă. |
| Referință de cerere și confirmare corectă | Îmbunătățite în septembrie | Păstrăm distincția dintre cerere primită și email de confirmare nereușit. |
| WhatsApp + mailto după eroare | Lipsesc din formularul activ | Recuperare prioritară din QuoteForm-ul de august. |
| FAQ, navigare, focus și scroll | Păstrate | Prezentare nouă cu același comportament accesibil. |
| SSR, prerender, canonical, sitemap, robots, staging noindex | Păstrate | Nicio degradare din cauza redesignului. |
| Validare server, honeypot, timing, rate limit, Turnstile opțional | Păstrate | Integritatea contractului și stările de eroare rămân. |

Fișiere relevante: `TripForm.jsx`, `tripState.js`, `TripBriefProvider.jsx`, `quoteRequest.js`, `api/quote.js`, `QuoteForm.jsx`, `siteData.js`, `corePages.js` și `src/seo/*`. Formularul activ este TripForm; QuoteForm-ul istoric nu trebuie reintrodus ca un al doilea sistem paralel.

### 7.2 Interacțiuni eliminate la 31 august: recuperare adaptată

| Funcție istorică reală | Sursa în `15510d6` | Forma propusă |
|---|---|---|
| Carusel cu prev/next și scroll orizontal | RouteCarousel.jsx | Selected journeys, swipe + controale și detalii lizibile. |
| Tilt pe carduri | RouteCard.jsx | Opțional, subtil și numai pe pointer precis; disabled în reduced motion. |
| Flip pentru patru servicii, inclusiv click/keyboard | Services.jsx | Dezvăluire de detalii cu buton clar; CTA-ul principal rămâne vizibil. |
| Tabs și accordion pentru servicii suplimentare | Services.jsx / ExtraServices | Un selector coerent cu starea formularului și mobile disclosure. |
| Filtre Blog și carduri cu imagini | Blog.jsx | Compoziție editorială și filtrare reală când biblioteca o justifică. |
| Formular în sidebar Blog/Article | Blog.jsx / BlogArticle.jsx | Intrare contextuală în același brief, fără stări incompatibile. |
| Calendar și selectoare custom | DatePicker.jsx / SelectMenu.jsx | Îmbunătățire accesibilă; nu copiem lipsurile vechi de tastatură/focus. |
| Guidance Package / Use Your Accrued Miles | TravelAdvantageSelector + request utils | Preferințe opționale de discutat cu Derek, dacă serviciile sunt încă oferite. |
| Private/referral code | quoteRequest, API, email și receipt | Câmp transmis lui Derek; fără a sugera discount automat, care nu exista. |
| Contoare, review-uri, carrier strip | AnimatedCounter / ReviewCard / AirlineMarquee | Numai cu cifre și surse atribuibile; mișcare discretă, controlabilă. |

Câmpurile suplimentare istorice trebuie mapate explicit în validare, API, email, fallback și reset dacă revin. Politica și prețul serviciilor opționale necesită confirmarea informației comerciale; nu recuperăm automat vechiul exemplu „50% of savings”.

Cinci articole istorice au fost eliminate: `hidden-business-class-deals`, `tokyo-vs-singapore-first-class`, `top-business-class-airlines-2026`, `emirates-vs-qatar-first-class`, `how-consolidator-fares-work`. Pentru fiecare decidem conținut verificat sau redirect relevant. Nu repunem vechi texte demonstrative ca articole expert gata publicate.

Newsletterul, share-ul efectiv, autocomplete-ul de aeroporturi, un Trustpilot embed, conturile, inventarul live, rezervarea și plata nu erau funcții implementate în aceste două versiuni. Newsletter și share pot constitui extinderi separate, cu integrare reală. Multe linkuri istorice de directoare/social erau placeholder; ele nu reprezintă funcționalitate de restaurat prin linkuri goale.

## 8. Reguli care previn un rezultat generic

1. **Compoziții diferite:** nu repetăm aceeași secțiune split + listă de șase ori. Fiecare scenă are o imagine, o decizie sau o informație dominantă.
2. **Fotografie coerentă:** cadre de cabină, materiale, destinații și un portret aprobat. Selectăm puține imagini bune; verificăm drepturile și ce reprezintă. Nu fabricăm portrete, review-uri sau „capturi” de rezervare.
3. **Identitate strictă în noul conținut:** alb `#FFFFFF`, light `#F5F5F7`, navy `#0B1929`, deep `#08101A`, burgundy `#8A194F` / hover `#6E1340`; Syne + DM Sans. Stilul deja aprobat al hero-ului este o zonă protejată.
4. **Tipografie cu ierarhie:** display pentru momentele principale, subtitluri vizibil mai mici, corp 16–18px și etichete în general 12–14px. Numere tabulare pentru tarife. Nicio informație esențială în text microscopic.
5. **Spațiu cu scop:** container de 1280px și grid desktop de 12 coloane. Mai mult spațiu lângă imagini și mai puțin între elementele unui formular. Nu adăugăm înălțime doar pentru a părea premium.
6. **Burgundy pentru acțiuni și detalii:** nu saturăm fiecare suprafață. Limitele și umbrele rămân discrete; carduri numai unde gruparea ajută.
7. **Text specific:** o idee pe secțiune, mai puține adjective și exemple mai concrete. Site-ul rămâne integral în engleză; planul este în română.
8. **Motion cu rol:** tranziția călătoriei, schimbarea confortului și feedback-ul formularului. Hover aproximativ 180–250ms, reveal aproximativ 400–650ms; fără scroll blocat, custom cursor sau animații obligatorii pentru citirea conținutului.
9. **Mobile compus separat:** controale touch clare, secvențe mai scurte, rezumat de cerere compact și comparații lizibile. Caruselul are săgeți și swipe; conținutul nu depinde de hover.
10. **Afirmații exacte:** reputația și acreditările Travel Business Class nu sunt atribuite automat lui Derek. Exemplul `$3,570 → $2,625` înseamnă aproximativ 26,5%, nu 60%. Cazurile de economii au dată, condiții și proveniență.

## 9. Ordinea implementării și livrabilele

| Etapă | Lucru concret | Criteriu de încheiere |
|---|---|---|
| 1. Înghețare și inventar | Capturi hero desktop/tablet/320–390px; maparea celor două straturi de funcții; listă de conținut și imagini. | Hero și contractul funcțional au o bază clară de comparație. |
| 2. Direcție vizuală | Compoziții desktop + mobil pentru Selected journeys, Derek și comparația de itinerar, alături de comfort studio existent. | Cele patru scene arată coerent și au ritm diferit; aspectul poate fi evaluat înaintea refacerii tuturor paginilor. |
| 3. Home + recuperare funcții | CSS izolat sub hero, prezentare nouă și maparea interacțiunilor istorice în formularul modern. | Cererea rămâne un singur flux; fallback, draft, extras și selecții funcționează. |
| 4. Paginile secundare | Services → About → Blog/Article → cele șapte landing pages → footer/legal. | Fiecare pagină are conținut și compoziție potrivite rolului; rutele existente rămân accesibile. |
| 5. Verificare finală | Hero, formular cu livrare izolată de test, mobil/tastatură, reduced motion, build/SSR/SEO, deep links și 404. | Nicio funcție obligatorie pierdută; diferențele de design sunt controlate și explicite. |

Primul livrabil vizual recomandat este o porțiune de Home după hero care include Selected journeys, comfort studio și Derek. Acesta validează fotografia, ritmul și scara; nu înlocuiește livrarea completă a restului site-ului.

## 10. Protejarea hero-ului și criterii de acceptare

Hero-ul este în `src/components/homepage/Homepage.jsx`, iar stilurile lui împart fișiere cu restul Home. Îl pot modifica accidental `homepage.scss`, `homepage-base.scss`, fonturile globale, `.section-wrap`, `.button`, regulile heading, Navbar, shared-shell, Layout, TripBriefProvider sau MotionPreferenceProvider. Noile stiluri trebuie izolate într-un wrapper/module pentru conținutul de sub hero. Nu modificăm global culorile sau dimensiunile pentru a corecta numai restul paginii.

Acceptarea finală cere:

- Hero identic în aceeași stare și același viewport; cadrele video se compară cu posterul/starea stabilă, nu prin pixeli aleatori între două momente.
- Toate rutele și linkurile vechi relevante păstrate sau tratate prin redirect justificat.
- Round trip, one way și multi-city, contact preferat, consimțământ, retry și fallback verificate cu date sintetice.
- Nicio trimitere reală prezentată ca dovedită doar printr-un răspuns de test.
- Filtre, selectors, carousels și disclosure utilizabile la tastatură și touch; focus vizibil și reduced motion respectat.
- Fără overflow la 320, 390, 768 și 1440px și fără butoane/câmpuri tăiate.
- Testele existente și build-ul cu prerender/SEO trec după implementare. Aceste teste nu au fost rulate din nou pentru acest plan fără modificări de produs.
- O revizie finală elimină repetițiile de text, imagini nepotrivite, badge-uri neconfirmate și controale fără efect.

Modelul `Codex-opus-4-6` menționat în specificația proiectului nu este disponibil în această sesiune; cercetarea a folosit agenții disponibili. Nu au fost generate imagini noi și nu a fost schimbată configurația proiectului.

# Implementation reconciliation — 2026-09-30

The approved design direction has been implemented under the later instruction to follow the exact Master PRD strictly. Where the earlier historical-function plan conflicts, the Master PRD controls: Guidance Package, accrued-miles upsells, the private-code block, unverified fares, reviews and counters remain removed. Historical interactions were adapted into accessible journey controls, service disclosures, real-category journal filters, safe draft migration and submission recovery. The existing hero remains protected. Final implementation and test evidence are in the root `IMPLEMENTATION_NOTES.md` and `QA_REPORT.md`.
