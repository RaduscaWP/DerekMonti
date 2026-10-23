# Analiză de securitate

Data: 2 octombrie 2026. Referință Git: `699c3cfea06852e0dc6d991da81fa1079c9b4fc6`, cu modificările locale existente incluse în inspecție.

## Rezultat

Nu am confirmat vulnerabilități Critical sau High în suprafața analizată. Prioritatea este protecția endpointului public `/api/quote` împotriva abuzului de email: limita din memorie nu este comună proceselor, iar lipsa secretului Turnstile permite continuarea cererii. Urmează prevenirea emailurilor duplicate și repararea expirării neatomice a limitelor Redis.

Au trecut **47/47** de teste existente pentru contractul de ofertă și formularul activ. Un audit npm nou, efectuat fără instalări sau actualizări, raportează **0 vulnerabilități cunoscute pentru 171 de dependențe**. Aceste rezultate nu certifică securitatea logicii aplicației sau configurația producției.

**Analiză exclusiv:** nu am modificat sursa aplicației, nu am publicat și nu am trimis leaduri sau emailuri reale. Fișierele adăugate sunt acest raport și probele sale. Nu am citit valorile `.env`. Înaintea importării API-ului am setat o cheie Resend sintetică, astfel încât `_loadEnv.js` să nu citească acel fișier. Toate apelurile providerilor din probe au fost înlocuite cu răspunsuri locale; orice destinație neașteptată este blocată.

## Suprafața verificată

- React **18.3.1**, React Router **7.18.3**, Vite **6.4.3**, Resend **4.8.0**, Upstash Redis **1.38.0**, conform lockfile-ului curent. SSR este folosit la build pentru prerandare; nu am presupus că site-ul rulează un server SSR dinamic în producție.
- Formularul activ este `src/components/homepage/TripForm.jsx`, prin `Homepage.jsx` și `HomeSections.jsx`. `src/pages/Home.jsx:1` exportă `Homepage.jsx`. `QuoteForm.jsx` există în sursă, dar căutarea importurilor nu a identificat un consumator activ; comportamentul său nu a fost atribuit formularului afișat.
- Am verificat API-ul, validarea comună, randarea emailurilor, progresul salvat în sesiune, analytics, generarea metadatelor, URL-urile externe și configurarea headerelor.
- Configurația Vercel, Redis, Turnstile și Resend din producție, regulile WAF, bugetele providerilor și headerele live nu au fost accesate. Nu am folosit memoria proiectului ca dovadă despre configurația curentă.

## Constatări prioritizate

### SEC-01 · Medium · Protecția anti-abuz pierde limita comună când Redis lipsește sau eșuează

**Locație:** `api/_security.js:4-5,9-22,31-55,58-62`; `api/quote.js:228-229,263-269,289-296,313-320`.

**Dovadă:** lipsa configurării Redis produce `cachedRedis = false`. O eroare Redis trece la `FALLBACK_BUCKETS`, un `Map` din `globalThis`. În lipsa `TURNSTILE_SECRET`, verificarea întoarce `{ ok: true, skipped: true }`. După validare, handlerul trimite un email către advisor și un email către adresa furnizată de solicitant.

Probele `endpoint-worker-a.json` și `endpoint-worker-b.json`, executate în două procese independente, au permis fiecare opt cereri pentru aceeași adresă sintetică `192.0.2.88`, înainte de răspunsul 429. Împreună au produs **16 cereri acceptate și 32 de apeluri email simulate** în aceeași fereastră. Au existat zero apeluri de verificare umană deoarece secretul sintetic fusese lăsat intenționat gol.

**Impact și condiții:** un atacator poate genera mesaje nedorite, încărca inboxul advisorului și consuma cota de email. Impactul de scalare se aplică dacă producția folosește fallbackul și cererile ajung la procese diferite sau procese restartate. Lipsa verificării umane scade suplimentar costul abuzului. Câmpurile honeypot și timpul de începere sunt controlate de client și pot fi completate corect de un script. Nu am demonstrat că producția are aceste configurații lipsă și nu am demonstrat abuz live.

**Recomandare:** pentru producție, impuneți o limită distribuită sau un control echivalent la edge. Dacă protecția distribuită nu poate fi verificată, refuzați temporar expedierea automată, oferind contactul direct. Faceți explicită configurația de verificare umană și validați concordanța cheilor client/server la livrare. Adăugați limite pentru destinatar și un plafon global de expediere, cu alertare fără date personale. Reduceți confirmarea către un destinatar neverificat la conținut fix; păstrați notele libere și titlurile interne în mesajul advisorului.

**Atenuări/limite:** Redis funcțional, Turnstile impus și un WAF pot reduce material acest risc. Un formular public de contact nu necesită automat cont sau login. Riscul este controlul abuzului unei funcții care consumă resurse și trimite email, în sensul [OWASP API4](https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption/) și [OWASP API6](https://api-security.owasp.org/editions/2023/en/0xa6-unrestricted-access-to-sensitive-business-flows/).

### SEC-02 · Low · Retrimiterea aceleiași solicitări produce alte emailuri și altă referință

**Locație:** `api/quote.js:240-241,289-296,313-320`; `src/components/homepage/tripState.js:150-186`; `src/components/homepage/TripForm.jsx:306-345`.

**Dovadă:** fiecare apel creează o referință nouă și face două apeluri `resend.emails.send` fără o cheie de idempotency. Retrimiterea aceluiași payload în proba izolată a generat patru apeluri email și două referințe diferite. Niciun apel către providerul simulat nu avea `Idempotency-Key`.

**Impact și condiții:** dacă mesajul a fost livrat, dar răspunsul HTTP este pierdut, un retry poate dubla solicitarea și confirmarea. Un alt tab sau client API poate retrimite aceeași solicitare. Aceasta este o problemă de integritate operațională și amplificare a volumului, fără dovadă de acces la datele altor persoane.

**Recomandare:** creați un identificator aleator al solicitării, păstrat pentru retry și verificat într-un registru distribuit cu TTL. Legați-l de payload pentru a refuza reutilizarea cu alt conținut. Folosiți chei separate pentru emailul advisorului și confirmarea clientului și returnați aceeași referință pentru aceeași solicitare. [Resend documentează idempotency pentru emailuri, cu retenție de 24 de ore](https://resend.com/docs/dashboard/emails/idempotency-keys).

**Atenuări/limite:** formularul activ are deja `submissionLock`, dezactivează fluxul în timpul trimiterii și spune utilizatorului să verifice emailul înainte de retry. Acestea reduc dublul click, dar nu deduplică cererile serverului. Turnstile activ respinge reutilizarea aceluiași token; un retry legitim cu un token proaspăt rămâne o nouă expediere fără idempotency.

### SEC-03 · Low · Eșecul expirării Redis poate bloca o adresă după trecerea ferestrei

**Locație:** `api/_security.js:38-45`.

**Dovadă:** `incr` și `pexpire` sunt două operații distincte. Expirarea este setată numai când contorul este 1. Dacă incrementarea reușește, dar expirarea nu reușește sau procesul se oprește între ele, apelurile ulterioare nu repară TTL-ul. Proba `redis-expiry.json` simulează exact această eroare: limita continuă să refuze cereri după fereastra de test, iar `pexpire` a fost încercat o singură dată.

**Impact și condiții:** un incident de provider poate transforma limita de zece minute într-un blocaj fără expirare pentru adresa afectată. Utilizatorii din aceeași rețea pot fi afectați împreună. Atacatorul nu a fost demonstrat capabil să provoace eroarea Redis; severitatea rămâne Low, cu impact de disponibilitate.

**Recomandare:** utilizați o operație atomică pentru contor și expirare, printr-un script Redis verificat sau un limiter consacrat. Verificați și reparați prudent contoarele fără TTL. [Documentația Redis descrie acest risc al perechii INCR/EXPIRE și rezolvarea atomică](https://redis.io/docs/latest/commands/incr/).

## Întăriri și verificări de configurație

Aceste puncte nu sunt raportate ca vulnerabilități High sau exploatări de producție confirmate.

| Punct | Dovadă și efect | Acțiune propusă |
| --- | --- | --- |
| Origin și tipul payloadului | `api/quote.js:167-219,222-240` nu impune `application/json` și nu verifică Origin/Fetch Metadata. Payloadul JSON trimis ca `text/plain` cu Origin străin a declanșat două emailuri simulate. Într-un deployment care permite cereri simple, aceasta poate permite trimiterea dintr-o pagină străină fără preflight. Nu există sesiune autentificată sau cookie de privilegii în acest flux, deci nu este un CSRF de cont confirmat. | Acceptați JSON explicit și origini aprobate sau o politică Fetch Metadata. Aceste filtre reduc abuzul prin browser, însă clienții direcți pot controla Origin și necesită în continuare rate limiting/verificare umană. |
| Legarea Turnstile de context | `api/_security.js:81-85` acceptă numai în baza `success`. Proba unui răspuns simulat cu alt hostname/action a fost acceptată. Nu am demonstrat că un astfel de token poate fi obținut de la Cloudflare pentru widgetul real. | Verificați hostname-urile permise ale widgetului; setați un `action` pentru ofertă și verificați-l pe server. Riscul contează în special pentru un secret reutilizat între suprafețe sau o listă de hostname-uri prea permisivă. [Cloudflare recomandă verificarea contextului](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/). |
| IP și proxy | `api/_security.js:25-28` folosește primul `x-forwarded-for`. | La mutarea de pe Vercel, verificați rescrierea headerului de către proxy. Nu raportez spoofing pe Vercel: [documentația Vercel precizează că headerul este rescris pentru a preveni spoofingul](https://vercel.com/docs/headers/request-headers). |
| Timeouturi și monitorizare | Apelul Siteverify din `api/_security.js:73-77` nu are un timeout explicit al aplicației. Rate limiting este condiționat de `NODE_ENV === 'production'`, `api/quote.js:228`. | Verificați limita totală a funcției și timeouturile providerilor; nu legați protecția unui deployment public doar de o presupunere despre NODE_ENV. Monitorizați volume și erori fără corpuri de cereri, tokens sau date de contact. |

## Protecții confirmate în sursă

- **Email HTML escapate:** `api/_emailTemplate.js:18-28,66-80,83-123`. Notele și rutele sunt text escapate; testele includ un payload `<script>` care rămâne text. Metadatele SEO sunt escapate, iar JSON-LD înlocuiește `<`, în `src/seo/head.js`. Nu am găsit un traseu activ de input utilizator către `dangerouslySetInnerHTML`, `innerHTML`, `eval`, shell, SQL sau un URL de fetch arbitrar.
- **Validare server:** `api/quote.js:240-260` și `src/utils/quoteRequest.js:155-228` verifică rutele, datele, clasele, numărul întreg de călători, contactul și acordul explicit. Ocolirea validării din browser nu ocolește validarea endpointului.
- **Limita payloadului:** `api/quote.js:167-205` verifică 12 KiB pentru obiecte deja parsate, stringuri și fluxul de request; nu se bazează numai pe Content-Length. Metodele diferite de POST primesc 405.
- **Date păstrate minim în browser:** `tripState.js:207-217` salvează în sesiune ruta și preferințele, excluzând numele, emailul, telefonul, notele, acordul și tokenul de verificare. Acest progres poate fi tot sensibil prin itinerariu; nu este anonim și trebuie păstrată opțiunea de ștergere după confirmare.
- **Analytics fără textul formularului:** `src/utils/analytics.js:3-22` permite numai evenimente și categorii enumerate. Nu am identificat trimiterea numelui, emailului, telefonului sau notelor prin acest helper. Această concluzie nu este o certificare legală a întregului sistem analytics.
- **Headere declarate:** `vercel.json:8-26` include `nosniff`, CSP cu `frame-ancestors 'none'`, Referrer-Policy și Permissions-Policy. `unsafe-inline` este permis pentru stiluri, nu pentru scripturi. Aplicarea lor live rămâne neverificată; nu am recomandat adăugarea sau extinderea HSTS.
- **Chei server/client separate:** cheia Resend este citită în API, nu în `src`. Variabila client Turnstile este o cheie publică de widget. Lista fișierelor urmărite Git conține `.env.example`, nu `.env`; conținutul fișierelor secrete nu a fost inspectat.

## Probe și limite

| Probă | Rezultat |
| --- | --- |
| `evidence/security-finish/quote-tests.log` | 47 teste, 47 trecute, 0 eșuate; numai quote-contract și homepage-trip. |
| `evidence/security-finish/npm-audit.json` | Audit read-only nou: total 0 vulnerabilități; 171 dependențe. Reîncercat cu acces la registrul npm după blocarea accesului implicit. |
| `evidence/security-finish/endpoint-worker-a.json`, `endpoint-worker-b.json` | Două procese independente; fiecare 8×200 apoi 429 pentru același IP; 16 apeluri email simulate per proces; retry generează altă referință. |
| `evidence/security-finish/turnstile-binding.json` | Răspuns Siteverify sintetic cu alt hostname/action acceptat. Nu este un token Cloudflare real. |
| `evidence/security-finish/redis-expiry.json` | Eroare sintetică de expirare lasă contorul fără resetare după fereastră. |
| `evidence/security-finish/isolated-quote-proof.mjs` | Scriptul reproductibil al probelor, cu configurație sintetică înainte de import și blocarea tuturor apelurilor reale. |

**Atenție pentru QA ulterior:** localhost nu garantează absența trimiterii de email. `vite.config.js:4-36` instalează un middleware care poate încărca și executa `/api/quote`; `api/_loadEnv.js:10-32` poate încărca configurația locală. Pentru orice test de submit în browser, interceptați cererea înainte de trimitere sau porniți serviciul cu provideri exclusiv simulați. În această analiză nu s-a trimis formularul către serverul de dezvoltare.

Ordinea recomandată este: verificarea protecțiilor efective de producție și SEC-01, apoi idempotency și expirarea atomică, apoi întăririle de context. Nu sunt necesare schimbări de design pentru a repara aceste probleme.
