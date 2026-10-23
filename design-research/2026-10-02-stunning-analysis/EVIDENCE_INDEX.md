# Probe și limitele analizei

Cercetare: 2–3 octombrie 2026. Folderul păstrează rapoartele și variantele respinse pentru a face decizia verificabilă. Nu conține o implementare nouă a produsului.

## Rapoarte

| Fișier | Rol |
|---|---|
| FINAL_PLAN.md | Recomandare, plan pentru toate paginile, SEO/securitate și verificarea necesară după confirmare. |
| VIDEO_ANALYSIS.md | Timeline complet, cadre, mișcare observată și limitele inferențelor tehnice. |
| CREATIVE_REVIEW_A.md | Critică inițială independentă de design și conținut. |
| FRONTEND_REVIEW_B.md | Critică independentă B, comportamentul cardurilor, accesibilitate, artefacte și bugete. |
| DEBATE_A.md | Contestarea reciprocă a cabin-first/person-first și condițiile direcției. |
| SEO_PLAN.md | Arhitectură multilingvă, inventar de pagini și verificări publice. |
| SECURITY_REVIEW.md | Constătări, severități, teste și probe complet simulate. |
| SECURITY_PEER_REVIEW.md | Critica severităților, erori de expediere/retry și limitele de confidențialitate. |
| CONCEPT_CRITIQUE_A.md / B.md | Respingerea V1, cu motive concrete. |
| VISUAL_FINAL_A.md / B.md | V2 acceptată numai ca structură și propunerea unei compoziții editoriale mai puternice. |

## Capturi din runda curentă

Toate imaginile de mai jos provin din browserul local, nu din Imagegen. Ele arată stări vizuale; nu certifică animația, accesibilitatea sau livrarea formularului.

| Fișier în evidence/ | Ce arată |
|---|---|
| 01-home-current.png | Home, deschiderea desktop. |
| 02-home-reasons-current.png | Introducerea mare și prima explicație de pe Home. |
| 03-services-cards-current.png | Introducerea Services, nu fețele cardurilor. |
| 04-services-card-faces-current.png | Fețele serviciilor, inclusiv un verso vizibil. |
| 05-about-current.png | About în primul viewport. |
| 06-blog-desktop-current.png | Blog, hero și elementul care seamănă cu o căutare. |
| 07-request-desktop-current.png | Proces/expectations; nume istoric greșit. Nu se folosește ca dovadă despre formular. |
| 08-home-mobile-current.png | Home în viewport mobil. |
| 09-request-desktop-current.png | Formularul real, după stabilizarea navigării la ancoră. |

## Alte probe

- `output/video-analysis/2026-10-02-new-reference/`: metadate, eșantioane, contact sheets, cropuri de mișcare și cut frames din videoclipul furnizat. Nu sunt capturi ale unor site-uri live.
- `evidence/production-seo-audit.json`: controale HTTP publice din 2 octombrie 2026, inclusiv 16 pagini canonice, sitemap/robots și 404. Nu identifică commitul publicat și nu include Search Console.
- `evidence/security-finish/`: script și răspunsuri locale sintetice. Niciun lead, email real sau exploit de producție.
- `evidence/security-finish/quote-tests.log`: 47 teste relevante trecute în această analiză.
- `evidence/security-finish/npm-audit.json`: audit de dependențe read-only, zero advisories la momentul verificării.
- `evidence/source-hashes-before.json` / `source-hashes-after.json`: 85 fișiere din sursă/API/teste/scripts comparate; **zero schimbări** între aceste instantanee. Comparația începe după restaurarea locală deja existentă și nu afirmă că întregul working tree este curat.
- `evidence/final-checks.json`: 22 referințe locale ale dosarului HTML verificate, zero lipsă; cele 85 fișiere au fost comparate din nou fără diferențe.
- `evidence/concept-review-browser.png` și `report-overview-browser.png`: capturi ale dosarului/studiului în browserul local. Verificarea documentului a observat toate cele patru imagini încărcate și lățime fără overflow la viewportul implicit. Nu este verificarea responsive a viitorului site.
- `qa/2026-10-02-visual-restoration.md`: raportul etapei anterioare și proveniența efectului Git. Testele de acolo sunt istorice, nu au fost raportate ca teste noi în această analiză.

## Machete Imagegen

`concepts/concept-v1.png`, `concept-v2.png` și `concept-v3.png` sunt imagini generate de explorare, cu referințe locale. V1 a fost respinsă; V2 este numai studiu structural. V3 este studiul editorial recomandat ca atmosferă/conținut, cu corecții obligatorii de compoziție, Syne/DM Sans și mobil. Ambii verificatori au inspectat și V3; nu îl certifică drept rezultatul final „stunning”. Prompturile sunt păstrate. Aceste imagini nu sunt fotografii noi ale lui Derek, capturi funcționale ale site-ului sau dovezi de responsive. Implementarea trebuie să folosească portretul original ca fișier separat, fără a publica o re-creare a persoanei din machetă.

Registrul de active existent rămâne sursa pentru drepturi și proveniență. Capturile cu afirmații actuale nesusținute sunt probe ale problemelor, nu aprobarea lor pentru publicare.
