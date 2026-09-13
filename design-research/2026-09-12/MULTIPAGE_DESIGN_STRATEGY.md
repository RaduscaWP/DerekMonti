# Fly with Derek — strategie de redesign pentru toate paginile

**Data analizei:** 12 septembrie 2026
**Stadiu:** direcție creativă înainte de briefurile Astra și înainte de modificarea paginilor secundare

## Decizie aprobată de proprietar

Proprietarul a aprobat direcția recomandată și a delegat alegerea finală pe 12 septembrie 2026.

Setul fixat este: `1A, 2A, 3A, 4A, 5C, 6A, 7A, 8A, 9A, 10C, 11A, 12A, 13A`.

Implementarea va rămâne pagină-cu-pagină. Prima livrare după fundația comună este `Services`, deoarece repară descoperirea rutelor și validează sistemul interactiv folosit ulterior. Nicio aprobare de pagină nu autorizează automat publicarea sau redesignul simultan al rutelor rămase.

## Răspunsul direct: paginile nu au fost șterse

Ultimul commit, `5b90bcc` (`feat: launch cinematic homepage experience`), a integrat experiența cinematică numai pe ruta `/`. Rutele secundare și fișierele lor au rămas în proiect.

Senzația că paginile au dispărut este însă justificată din două motive:

1. `Layout.jsx` lasă homepage-ul să-și folosească propriul header și footer. Headerul nou de pe Home afișează numai `The experience`, `About Derek` și CTA-ul `Plan my trip`. `Services` și `Travel journal` sunt disponibile numai în footer, iar `Business Class` și `First Class` nu sunt accesibile din navigația principală a homepage-ului.
2. Șapte landing pages sunt randate prin același `CoreLanding.jsx`, în aceeași ordine: Hero → Introduction → Evaluation → Limitations → Process → Related → FAQ → CTA. Conținutul se schimbă, dar experiența vizuală este aproape identică. Capturile live curente au confirmat același hero navy, aceleași cercuri decorative și aceeași scară de titlu. Pe patru dintre cele cinci landing pages inspectate, CTA-ul principal cade sub primul viewport la 1265 × 712.

Un commit anterior, `f6f56b4`, a simplificat masiv paginile secundare și a eliminat carousels, counters, carduri vizuale și alte componente interactive. O parte din acea schimbare a avut un motiv bun: vechile secțiuni conțineau prețuri, economii, testimoniale, statistici și relații cu companii aeriene care nu erau confirmate. Redesignul nou trebuie să recupereze spectacolul și personalitatea fără să readucă afirmații nesusținute.

Brief-ul anterior a fost homepage-only deoarece alegerea `6B` a definit exact această etapă: întâi homepage-ul complet, apoi fiecare pagină separat. Formularea a fost corectă tehnic, dar trebuia explicat mai clar că navigația completă trebuie păstrată vizibilă.

## Inventarul real

Sunt 16 rute publice plus pagina 404:

| Grup | Rute |
|---|---|
| Experiența principală | `/`, `/services`, `/about` |
| Cabină și servicii | `/business-class-flights`, `/first-class-flights`, `/services/premium-flight-advisor`, `/services/complex-itineraries`, `/services/last-minute-business-class` |
| Coridoare de călătorie | `/business-class-flights/europe`, `/business-class-flights/usa` |
| Editorial | `/blog` și trei articole individuale |
| Legal | `/privacy`, `/terms` |
| Sistem | pagina 404 |

Nu există acum o rută separată `/contact`; formularul principal este `/#request-form`.

## Ideea mare pentru întregul site

### A journey that understands you

Homepage-ul creează dorința. Restul site-ului trebuie să arate cum Derek transformă acea dorință într-o călătorie bine gândită.

Elementul diferențiator comun va fi un **Trip Brief viu și editabil**. Vizitatorul poate adăuga pe parcurs:

- ruta și tipul călătoriei;
- scopul sosirii;
- priorități precum odihnă, lucru, intimitate sau călătorie împreună;
- date și aeroporturi fixed/flexible;
- toleranța pentru conexiuni;
- priorități diferite pentru fiecare segment.

Selecțiile apar într-un rezumat discret și pot fi modificate oricând. Datele de contact, notele libere și consimțământul nu se salvează în sesiune. Fiecare pagină adaugă context aceluiași brief; nu creăm formulare și stări paralele.

Acesta este „crazy stuff”-ul care ajută business-ul: site-ul nu doar arată premium, ci pregătește o cerere mai bună pentru Derek și explică valoarea consultanței înainte de contact.

## Navigația care trebuie reparată prima

Headerul trebuie să rămână foarte scurt:

- **Services** — conduce la pagina-hub care organizează Business Class, First Class, Premium Advisor, Complex Itineraries, Last-minute și cele două coridoare;
- **About Derek**;
- **Journal**;
- CTA permanent: **Plan my trip**.

Logo-ul conduce la Home, deci nu avem nevoie de un link `Home`. Business, First, rutele și serviciile speciale nu devin elemente separate în bara principală și nici nu cer un mega-menu. Ele sunt organizate pe pagina `Services`, apar contextual în conținut și rămân disponibile în footer.

Pe Home, `The experience` rămâne o ancoră în conținut sau o acțiune secundară din hero, nu încă un element permanent în navbar. Pe mobil, aceleași trei destinații și CTA-ul apar în meniul full-screen; `Services` rămâne un singur link către hub, fără submenu sau dropdown. Footerul păstrează întreaga hartă a site-ului.

## Direcții distincte pentru fiecare pagină

### 1. Home — The Window / anticiparea călătoriei

**Păstrăm direcția aprobată:** primul concept este obligatoriu, cu hubloul cinematic și bucla video foarte calmă. A treia imagine rămâne secțiunea interactivă `How do you want to arrive?`.

**Rol:** emoție, poziționare personală și primul pas în Trip Brief.

**De îmbunătățit:** restabilirea navigației către toate paginile și adăugarea unor intrări elegante către Business, First, itinerarii complexe și journal. Hubloul rămâne semnătura Home; nu îl clonăm mecanic pe fiecare pagină.

### 2. Services — The Itinerary Desk

**Problema actuală:** trei servicii și șase criterii sunt explicate corect, dar pagina nu demonstrează cum se schimbă abordarea în funcție de călătorie.

**Scena:** o suprafață navy, precisă, inspirată de o masă de lucru premium. În centru există un traseu viu, desenat ca o linie fină de lumină.

**Interacțiunea semnătură:** vizitatorul alege:

- `One clear journey`;
- `Several connected stops`;
- `Departure is close`.

Linia se transformă într-o rută simplă, o călătorie multi-segment sau o fereastră de timp. Alături apar exact informațiile de care Derek are nevoie. Marcajele `Fixed` și `Flexible` demonstrează personalizarea și conduc către serviciul potrivit.

**CTA contextual:** `Choose how to start`.

### 3. About — Across the Desk from Derek

**Problema actuală:** portretul autentic există, dar pagina vorbește mai mult despre mecanism și limitări decât despre Derek. Repetă cele șase criterii de pe Services.

**Scena:** portret autentic mare, lumină editorială intimă, text cu mult spațiu și detalii vizuale din lumea cabinei. Pagina trebuie să creeze senzația unei conversații directe.

**Interacțiunea semnătură:** un brief ilustrativ adnotat de Derek. Vizitatorul alege o întrebare precum `What cannot change?`, `Where does comfort matter most?` sau `What happens after arrival?`; pe itinerar apare nota pe care Derek ar urmări-o.

**Conținut obligatoriu:** vocea reală și biografia confirmată de Derek. O introducere video reală de 20–30 secunde, pornită voluntar, ar fi mult mai puternică decât o cronologie inventată.

**CTA:** `Tell Derek about my journey`.

### 4. Business Class — The Whole-Journey Lens

**Problema actuală:** pagina spune că Derek compară întreaga călătorie, dar vizitatorul nu vede comparația. Vizual este identică cu First Class.

**Scena:** o cronologie elegantă `Departure → Long-haul → Connection → Arrival`, cu detalii de cabină abstracte și fără branding de companie aeriană.

**Interacțiunea semnătură:** `Look beyond the seat`. Vizitatorul schimbă lentila între:

- Cabin;
- Connection;
- Arrival;
- Conditions.

Interfața arată ce trebuie verificat pe fiecare segment și cum o alegere poate afecta restul călătoriei. Preferința aleasă pe Home poate fi preluată și explicată aici, fără a repeta selectorul Home.

**CTA:** `Review my whole journey`.

### 5. First Class — Continuity of the Experience

**Problema actuală:** diferența față de Business Class este aproape numai în text; produsul rar și foarte personal nu are o expresie proprie.

**Scena:** un cadru foarte apropiat și lent al unei suite ilustrative — lumină, material, spațiu, liniște. Nu folosim aceeași compoziție cu hubloul Home.

**Interacțiunea semnătură:** o panglică segment-cu-segment arată unde trebuie confirmate:

- cabina reală;
- continuitatea First/Business;
- experiența la sol;
- conexiunile și durata utilă a produsului.

Un selector `Which differences matter to you?` adaugă privacy, personal space, ground experience sau journey continuity în Trip Brief. Nu oferă un verdict automat și nu sugerează disponibilitate.

**CTA:** `Compare First around my priorities`.

### 6. US → Europe — Arrival Horizon

**Problema actuală:** copy-ul vorbește bine despre `arrival fit`, dar experiența rămâne abstractă și identică cu restul landing pages.

**Scena:** o trecere estică de la noapte la zori, reprezentată printr-o bandă de lumină și o axă de călătorie. Este legată vizual de aviație, fără a copia hubloul Home.

**Interacțiunea semnătură:** `What must your first day feel like?`

- Rested;
- Ready for a commitment;
- Continuing onward.

Apare o axă ilustrativă `Depart → Arrive → First plan`, iar alegerea completează scopul sosirii în Trip Brief. Nu afișăm orare, zboruri sau disponibilitate inventată.

**CTA:** `Plan my Europe arrival`.

### 7. Europe → USA — Beyond the Gateway

**Problema actuală:** diferența față de ruta inversă există mai ales în copy.

**Scena:** o călătorie spre vest, cu trei puncte: `European origin → US gateway → actual destination`.

**Interacțiunea semnătură:** întrebarea `Where does your journey really end?`. Vizitatorul indică dacă primul aeroport este destinația finală sau urmează o conexiune ori un transfer. Derek primește contextul complet, nu numai primul cod de aeroport.

**CTA:** `Map my complete US journey`.

### 8. Complex Itineraries — Route Atelier

**Problema actuală:** cea mai bună dovadă a valorii lui Derek este redusă la liste statice.

**Scena:** o hartă abstractă premium, ca o constelație de orașe. Liniile se desenează ca niște contrails fine.

**Interacțiunea semnătură:** vizitatorul adaugă și reordonează până la șase segmente, marchează date fixed/flexible și stabilește unde cabina este esențială. Un strat `Derek will verify` evidențiază cabin continuity, airport continuity și dependențele dintre segmente.

Pe mobil, harta devine o listă verticală clară cu `Move up`/`Move down`. Experiența trebuie să funcționeze complet cu tastatura.

**CTA:** `Build my complete itinerary`.

Acesta ar trebui să fie al doilea mare moment wow al site-ului după Home.

### 9. Last-minute Business Class — Departure Brief

**Problema actuală:** o cerere urgentă este obligată să parcurgă o pagină lungă și apoi ajunge într-un formular generic, pierzând contextul.

**Scena:** lumini calme de pistă pe timp de noapte și un panou foarte clar, cu energie controlată.

**Interacțiunea semnătură:** două coloane:

- `Cannot move`;
- `Can flex`.

Un indicator de completare spune ce informații lipsesc și ajunge la `Ready for Derek to review`. Nu folosim un countdown care promite răspuns, nu promitem disponibilitate și nu creăm presiune artificială.

**CTA:** `Start my time-sensitive brief`.

### 10. Premium Flight Advisor — Derek’s Review Lens

**Problema actuală:** serviciul cel mai personal este aproape fără Derek și arată ca toate celelalte landing pages.

**Scena:** portret autentic al lui Derek lângă un itinerar brut, încă neordonat.

**Interacțiunea semnătură:** itinerarul se clarifică strat cu strat când vizitatorul alege `Rest`, `Timing`, `Connections`, `Flexibility` sau `Cabin continuity`. Interfața evidențiază compromisurile relevante și afișează o explicație scurtă din perspectiva lui Derek.

Exemplul este etichetat clar ca demonstrație ilustrativă, fără companii, prețuri sau recomandări live.

**CTA:** `Share my priorities with Derek`.

### 11. Blog — The Flight Journal

**Problema actuală:** cele trei articole sunt rânduri text fără identitate editorială memorabilă.

**Scena:** o publicație premium cu un articol principal ilustrat și două articole secundare. Imaginile trebuie să explice subiectul: continuitatea cabinei, anatomia unei conexiuni și structura unui brief.

**Interacțiunea semnătură:** `What are you deciding?` cu trei intrări legate de biblioteca reală:

- Comparing options;
- Evaluating the whole journey;
- Preparing a time-sensitive request.

Nu construim un sistem mare de filtre pentru numai trei articole. Pe măsură ce biblioteca crește, un departure board discret poate deveni navigația de categorii.

**CTA:** `Apply a guide to my trip`.

### 12. Articol — A Better Way to Compare Business Class Options

**Modul unic:** o matrice de decizie cu Schedule, Cabin continuity, Routing, Flexibility și Conditions. Vizitatorul marchează ce contează; selecțiile intră transparent în Trip Brief.

**Efect:** articolul devine instrument de decizie, nu doar lectură.

### 13. Articol — Business Class Is More Than the Seat

**Modul unic:** `Journey X-ray`, o poveste la scroll prin aeroport, plecare, cabină, conexiune și sosire. Fiecare scenă explică o întrebare concretă pe care merită să o pui.

**Efect:** promisiunea `whole journey` devine vizibilă și ușor de înțeles.

### 14. Articol — How to Prepare a Time-Sensitive Premium Flight Request

**Modul unic:** un checklist de pregătire cu `Known`, `Flexible`, `Missing`. Rezultatul se transferă în Departure Brief.

**Efect:** Derek primește cereri mai complete, iar utilizatorul vede progres real fără promisiuni de răspuns.

### 15. Privacy — Privacy in Plain English

**Scena:** document foarte curat, cu sumar executiv, cuprins sticky și textul legal complet.

**Modul util:** o diagramă simplă `What you send → Why it is used → What not to send`, urmată de politica integrală. Data ultimei actualizări rămâne vizibilă.

Fără video, parallax sau efecte care reduc lizibilitatea.

### 16. Terms — Before You Decide

**Scena:** același document shell ca Privacy, cu punctele operaționale esențiale la început și termenii compleți mai jos.

**Modul util:** checkpoint-uri pentru request, availability, booking, payment/change responsibilities și contact, numai după ce procesele reale sunt confirmate juridic.

### 17. 404 — Lost Route

**Scena:** o linie de traseu se întrerupe calm deasupra norilor, apoi găsește o rută înapoi.

**Acțiuni:** `Return home`, `Explore services`, `Plan my trip`. Este memorabilă, dar extrem de rapidă și clară.

## O pagină nouă care merită evaluată

O rută separată `/plan-my-trip` ar face formularul ușor de distribuit din reclame, mesaje și articole. Ar reutiliza aceeași stare și același contract ca formularul Home. Nu recomand o pagină generică `/contact` dacă singurul scop este o cerere de zbor; `Plan my trip` exprimă mai bine acțiunea de business.

## Reguli vizuale și de business

- Un singur moment spectaculos pe pagină; restul rămâne calm și aerisit.
- Home deține hubloul cinematic. Celelalte pagini folosesc obiecte proprii: desk, ribbon, route map, journal, checklist.
- Mișcarea explică o schimbare sau o alegere. Fără scroll hijacking, cursor gimmicks sau animații continue inutile.
- Fiecare interacțiune funcționează și prin tastatură și atingere.
- Cu `prefers-reduced-motion`, video devine poster, rutele apar desenate și starea se comunică și prin text.
- Pe mobil, CTA-ul și prima acțiune utilă rămân în primul ecran.
- Nu publicăm prețuri, economii, review-uri, client counts, parteneriate, disponibilitate, produse de companie sau biografie fără dovezi și aprobarea proprietarului.
- Nu sugerăm afiliere cu o companie aeriană. Imaginile de cabină sunt ilustrative și etichetate ca atare.
- Păstrăm slugurile, canonicalele, un singur H1, prerenderingul, sitemapul, noindex pentru preview și pagina 404 reală.

## Fundație comună versus identitate proprie

**Comune:** paleta navy/burgundy/alb, Syne + DM Sans, header, footer, butoane, focus states, breadcrumbs, motion primitives, FAQ, CTA și Trip Brief.

**Distincte:** compoziția hero, obiectul central, întrebarea principală și interacțiunea care pregătește următorul pas.

Ținta este aproximativ 70% fundație comună și 30% experiență specifică. Astfel, site-ul rămâne coerent fără ca paginile să pară duplicate.

## Ordinea recomandată

1. Repararea navigației Home și definirea fundației multipagină.
2. Services — distribuie corect vizitatorii și validează fundația interactivă.
3. About — ancora umană.
4. Complex Itineraries — al doilea moment wow.
5. Business Class.
6. First Class.
7. US → Europe și Europe → USA proiectate împreună, dar distinct.
8. Last-minute Business Class.
9. Premium Flight Advisor.
10. Blog hub.
11. Cele trei articole și modulele lor.
12. Privacy, Terms și 404.
13. Opțional, `/plan-my-trip`.

## Alegerile necesare înainte de briefurile Astra

Răspunsul poate fi trimis în formatul `1A, 2A, 3B...`.

1. **Navigație:** A — `Services · About Derek · Journal · Plan my trip`, fără dropdown; B — `Services · About Derek · Plan my trip`, cu Journal doar în footer; C — meniu full-screen editorial deschis dintr-un singur buton.
2. **Services:** A — Itinerary Desk; B — trei portaluri cinematice; C — combinație Desk + portaluri.
3. **About:** A — Across the Desk + brief adnotat; B — mini-documentar video; C — combinație portret, video și brief.
4. **Business Class:** A — Whole-Journey Lens; B — Cabin Fit Lab; C — combinație cronologie + lentilă.
5. **First Class:** A — Continuity Ribbon; B — galerie senzorială de suită; C — combinație ribbon + selector de priorități.
6. **Coridoare:** A — Arrival Horizon și Beyond the Gateway; B — două hărți cinematice; C — combinație hartă + axă temporală.
7. **Complex:** A — Route Atelier complet interactiv; B — hartă cinematică ghidată; C — builder mai simplu în pași.
8. **Last minute:** A — Departure Brief; B — Priority Board; C — combinație checklist + brief.
9. **Advisor:** A — Derek’s Review Lens; B — povestea unei consultații; C — combinație portret + transformarea itinerarului.
10. **Blog:** A — Flight Journal; B — Decision Lab; C — combinație revistă + instrumente.
11. **Articole:** A — modul interactiv unic în fiecare; B — un modul comun adaptat; C — editorial static foarte premium.
12. **Conversie:** A — adăugăm `/plan-my-trip`; B — păstrăm numai formularul Home; C — formular Home + CTA WhatsApp dominant.
13. **Prototipare:** A — câte o pagină, aprobată înainte de următoarea; B — trei familii în paralel; C — toate wireframe-urile, apoi designul final pe rând.
