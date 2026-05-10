# CLAUDE.md — Derek Monti Aviation Website
## Complete Project Specification & Design System

---

## 0. PROJECT OVERVIEW

**Client:** Derek Monti — Personal Aviation Ticketing Advisor  
**Site type:** Personal brand website (NOT a company site — Derek IS the product)  
**Model:** claude-opus-4-6 (use this model for all generation tasks)  
**Reference site:** https://travelbusinessclass.com  
**Core value proposition:** Business & First Class tickets at insider prices, sourced personally by Derek  
**Target audience:** His 20-25 existing clients + potential new international clients  
**Language:** English only  

---

## 1. DESIGN SYSTEM

### 1.1 Color Palette (STRICT — do not deviate)

```scss
// Primary colors
$color-bg-white:        #FFFFFF;
$color-bg-light:        #F5F5F7;
$color-bg-dark:         #0B1929;       // dark navy sections
$color-bg-darker:       #08101A;       // footer, deepest sections

// Accent — DEFINITIVE, never change
$color-accent:          #8A194F;       // crimson/burgundy — primary CTA, highlights
$color-accent-hover:    #6E1340;       // darker on hover
$color-accent-light:    rgba(138,25,79,0.12); // soft tint for card borders etc

// Text
$color-text-primary:    #0B1929;       // dark navy on white bg
$color-text-secondary:  #4A5568;       // gray body text
$color-text-light:      #FFFFFF;       // on dark sections
$color-text-muted:      rgba(255,255,255,0.65); // muted white on dark

// Trustpilot
$color-trustpilot:      #00B67A;

// Gradients
$gradient-crimson:      linear-gradient(135deg, #8A194F 0%, #5C0F35 100%);
$gradient-dark:         linear-gradient(180deg, #0B1929 0%, #08101A 100%);
$gradient-hero-overlay: linear-gradient(to bottom, rgba(8,16,26,0.55) 0%, rgba(8,16,26,0.75) 100%);
```

### 1.2 Typography

```scss
// Fonts — import from Google Fonts
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

// Display / Headings
$font-display:   'Syne', sans-serif;   // bold, modern, premium feel

// Body
$font-body:      'DM Sans', sans-serif; // clean, readable

// Scale
$text-eyebrow:   0.75rem;    // uppercase, spaced, accent color
$text-sm:        0.875rem;
$text-base:      1rem;
$text-lg:        1.125rem;
$text-xl:        1.25rem;
$text-2xl:       1.5rem;
$text-3xl:       2rem;
$text-4xl:       2.75rem;
$text-5xl:       3.5rem;
$text-6xl:       4.5rem;
$text-hero:      clamp(3rem, 7vw, 6rem);

// Letter spacing
$tracking-eyebrow: 0.15em;
$tracking-tight:   -0.02em;
$tracking-normal:  0;
```

### 1.3 Spacing & Layout

```scss
$container-max:   1280px;
$container-pad:   clamp(1.5rem, 5vw, 5rem);

$section-py-sm:   4rem;
$section-py-md:   6rem;
$section-py-lg:   8rem;
$section-py-xl:   10rem;

$radius-sm:       8px;
$radius-md:       16px;
$radius-lg:       24px;
$radius-xl:       32px;
$radius-pill:     999px;

$shadow-sm:       0 2px 8px rgba(0,0,0,0.08);
$shadow-md:       0 8px 32px rgba(0,0,0,0.12);
$shadow-lg:       0 20px 60px rgba(0,0,0,0.18);
$shadow-card:     0 4px 24px rgba(11,25,41,0.10);
$shadow-card-hover: 0 16px 48px rgba(11,25,41,0.20);
```

### 1.4 Motion & Animation Tokens

```scss
$ease-smooth:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
$ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
$ease-in-expo:  cubic-bezier(0.95, 0.05, 0.795, 0.035);
$ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

$dur-fast:    0.2s;
$dur-base:    0.4s;
$dur-slow:    0.7s;
$dur-slower:  1.0s;
```

---

## 2. TECH STACK

### 2.1 Core Stack
```
Framework:    React 18 (with React Router v6 for SPA routing)
Styling:      SCSS Modules + CSS Custom Properties
Animations:   GSAP 3 + ScrollTrigger plugin
3D/Particles: Three.js (hero section only)
Build:        Vite
Language:     JavaScript (ES2022+)
```

### 2.2 Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "gsap": "^3.12.x",
    "three": "^0.160.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "sass": "^1.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

### 2.3 GSAP Registration (required in main.jsx or App.jsx)
```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### 2.4 Project File Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.module.scss
│   │   ├── Footer.jsx
│   │   └── Footer.module.scss
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── SectionEyebrow.jsx
│   │   ├── RouteCard.jsx
│   │   ├── ReviewCard.jsx
│   │   └── AnimatedCounter.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── TrustBar.jsx
│   │   ├── SmartSavings.jsx
│   │   ├── WhyDerek.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FaqSection.jsx
│   │   └── BlogPreview.jsx
│   ├── services/
│   ├── about/
│   └── blog/
├── pages/
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── About.jsx
│   ├── Blog.jsx
│   └── BlogArticle.jsx
├── hooks/
│   ├── useScrollAnimation.js
│   └── useCounterAnimation.js
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _reset.scss
│   └── global.scss
├── utils/
│   └── threeParticles.js
├── App.jsx
└── main.jsx
```

---

## 3. GLOBAL COMPONENTS

### 3.1 Navbar

**Behavior:**
- Sticky, fixed to top at all times
- On hero section: background fully transparent, logo white, links white
- On scroll past 80px: background transitions to `rgba(8,16,26,0.96)` with `backdrop-filter: blur(16px)` — smooth 0.4s transition
- Logo: "Derek **Monti**" — "Derek" in $font-display regular, "Monti" in $font-display bold with crimson color
- Nav links: Home · Services · About · Blog · Contact
- Active link: underline with crimson, font-weight 600
- Right side: "CALL US 24/7" small text above phone number + circular call button (crimson bg, white phone icon)
- Mobile: hamburger menu with full-screen overlay animated with GSAP

**GSAP animation on page load:**
```js
gsap.from('.navbar', { y: -100, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
```

### 3.2 Announcement Bar (above Navbar)

- Background: $color-accent (#8A194F)
- Text: white, font-size 0.75rem, font-weight 500, letter-spacing 0.08em, uppercase
- Content (scrolling marquee): "EXCLUSIVE DEALS · SAVE UP TO 15-60% ON BUSINESS & FIRST CLASS · PERSONAL SERVICE · BOOK WITH DEREK · SAME-DAY QUOTES · "
- Marquee animation: CSS `animation: marquee 30s linear infinite`
- Height: 36px
- On mobile: same, slightly smaller text

### 3.3 Footer

**Structure:**
```
[Top section — dark navy #0B1929]
  Logo + tagline | Navigation | Contact info
  Region links | Country links | City links | Airline links

[Bottom bar — #08101A]
  Copyright | Privacy Policy | Terms | Payment badges
```

**Content:**
- Logo: "Derek Monti" in display font
- Tagline: "Your personal aviation advisor — premium seats at prices you won't find anywhere else."
- Nav: Home · Services · About · Blog · Contact
- Contact: Phone (placeholder) · Email derek@derekmonti.com · WhatsApp button
- Region links: Europe · Asia · Middle East · North America · Latin America · Oceania
- Country links: France · Italy · Germany · Japan · UAE · UK · View More →
- City links: London · Paris · Tokyo · Dubai · Rome · Sydney · View More →
- Airline links: Emirates · Qatar · Turkish · Singapore · Cathay Pacific · Lufthansa
- Payment badges: Visa · Mastercard · American Express (grayscale icons)
- Trustpilot badge: green stars + "Excellent" rating
- Social icons: LinkedIn · Instagram

**GSAP animation:**
- Footer links stagger fade-in when scrolled into view
- Each column: `gsap.from('.footer-col', { y: 30, opacity: 0, stagger: 0.1, duration: 0.6 })`

### 3.4 Button Component

```jsx
// Variants: 'primary' | 'outline' | 'ghost'
// Sizes: 'sm' | 'md' | 'lg'

// Primary: crimson bg, white text, pill shape
// Outline: transparent bg, white border, white text (for dark sections)
// Ghost: no border, text only with arrow icon

// Hover state: scale(1.03) + brightness(1.1) transition
// Active state: scale(0.97)
```

### 3.5 Section Eyebrow Component

```jsx
// Small uppercase label above section headings
// Color: $color-accent
// Font: $font-body, 0.75rem, letter-spacing 0.15em, font-weight 600
// Example: "SMART SAVINGS" above "Save More. Fly Better."
```

---

## 4. HOME PAGE

### 4.1 HERO SECTION

**File:** `src/components/home/HeroSection.jsx`

**Visual:**
- Full viewport height (100vh min)
- Background: HTML5 `<video>` element, autoplay, muted, loop, playsinline
  - Video source: business class cabin interior video (find free stock from Pexels/Pixabay — Qatar QSuite, Emirates Business Class)
  - Fallback image: high-quality business class cabin photo
- Dark overlay: `$gradient-hero-overlay` on top of video
- Content: centered vertically, left-aligned text

**Content structure:**
```
[eyebrow]    PERSONAL AVIATION ADVISOR
[h1]         Business Class.
             Remarkable Prices.
[subtext]    Your personal aviation advisor — premium seats
             at prices you won't find anywhere else.
[airline logos strip]
             "Flying with:" Qatar Airways | Emirates | Turkish Airlines | Singapore | Cathay Pacific | And others...
[search form]
             [Round trip] [One way]
             [ ✈ From — Flying from? ] [ ✈ To — Where are you flying? ] [ 📅 Departure ] [ 📅 Return ] [ 👤 Passengers ]  [ REQUEST → ]
[social proof quote]
             "Last month Derek's clients saved an average of $1,800 per ticket"
```

**Three.js Particles:**
```js
// File: src/utils/threeParticles.js
// Render a canvas absolutely positioned over the video with z-index between video and content
// 800 particles, white color, opacity 0.4
// Size: 1.5px, randomly distributed in a sphere
// Gentle rotation: 0.0003 per frame on Y axis
// Subtle drift upward: particles slowly float up and reset at bottom
// This creates a "stars in luxury cabin" atmosphere
// Performance: use requestAnimationFrame, dispose on component unmount
```

**Search Form:**
```jsx
// Pill-shaped white container: border-radius 999px, background white, shadow-lg
// Tabs: "Round trip" | "One way" — toggle state
// Fields: From airport, To airport, Departure date, Return date (hidden if one way), Passengers
// Submit button: crimson circle with search icon on right end of pill
// On mobile: stacks vertically
// Form submit: opens mailto: or WhatsApp pre-filled message — NOT a real booking engine
```

**GSAP Hero Animations (on mount):**
```js
const tl = gsap.timeline({ delay: 0.3 });
tl.from('.hero-eyebrow', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' })
  .from('.hero-h1 .line-1', { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  .from('.hero-h1 .line-2', { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
  .from('.hero-subtext', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.hero-airlines', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero-form', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  .from('.hero-quote', { opacity: 0, duration: 0.5 }, '-=0.2');
```

---

### 4.2 TRUST BAR

**File:** `src/components/home/TrustBar.jsx`

**Background:** white, border-bottom: 1px solid rgba(0,0,0,0.08)
**Layout:** horizontal flex, centered, 4 items with dividers between
**Content:**
```
[Trustpilot stars ★★★★★]   [Google Reviews ★ 4.9]   [BBB A+ Rating badge]   [ARC Accredited Agency]
"Thousands of verified        "Clients consistently       "Accredited Business       "Secure, compliant
 travelers rate Derek         rate Derek highly for        — A+ Rating"               ticketing"
 Excellent."                  premium service."
```
**GSAP:** stagger fade-in from bottom when section enters viewport

---

### 4.3 SMART SAVINGS SECTION

**File:** `src/components/home/SmartSavings.jsx`

**Background:** $color-bg-dark (dark navy)
**Padding:** $section-py-lg top and bottom

**Header:**
```
[eyebrow]  SMART SAVINGS
[h2]       Save More. Fly Better.
[subtext]  By uncovering hidden fares and exclusive offers, Derek makes business
           and first class travel far more accessible — without compromising on luxury.
```

**Route Cards (horizontal scrollable carousel, 8 cards total):**

Card structure:
```
[destination photo — 16:9 ratio, rounded-top]
[badge top-right: "Saved up to 60%"]
[card body — white bg, rounded-bottom]
  from [CITY] [IATA] → to [CITY] [IATA]
  ─────────────────────────────
  Flexible dates    ±3 days
  Cabin             Business
  Example carriers  QR/BA/EK
  ─────────────────────────────
  Published Fare    $3,570 (strikethrough, muted)
  [Derek's Price    $2,625] — crimson highlight row
  [footer text: "Based on a real booking"]
```

**8 Route Card Data:**
1. New York JFK → London LHR | Business | BA/AA/UA | $3,570 → $2,625 | Saved 60%
2. Chicago ORD → Rome FCO | Business | UA/LH/ITA | $5,060 → $3,530 | Saved 50%
3. San Francisco SFO → Frankfurt FRA | Business | LH/UA | $5,550 → $3,870 | Saved 40%
4. Boston BOS → Dubai DXB | Business | EK/BA/QR | $5,041 → $3,400 | Saved 45%
5. Los Angeles LAX → Tokyo HND | Business | JL/AA/NH | $6,185 → $4,200 | Saved 40%
6. Miami MIA → Singapore SIN | First Class | SQ/EK | $12,400 → $7,200 | Saved 42%
7. New York JFK → Johannesburg JNB | Business | UA/LH/ET | $6,530 → $4,100 | Saved 37%
8. Washington IAD → Cairo CAI | Business | MS/UA/LH | $4,140 → $2,737 | Saved 40%

**3D Tilt on hover (vanilla JS on each card):**
```js
// On mousemove over card: calculate cursor position relative to card center
// Apply transform: perspective(1000px) rotateX(Ydelta * 0.015) rotateY(Xdelta * 0.015)
// On mouseleave: reset transform with transition 0.5s ease
// Max tilt: ±8 degrees
```

**Carousel controls:** prev/next crimson circle buttons + pagination dots

**GSAP ScrollTrigger:**
```js
gsap.from('.savings-card', {
  scrollTrigger: { trigger: '.savings-section', start: 'top 80%' },
  y: 60,
  opacity: 0,
  stagger: 0.1,
  duration: 0.7,
  ease: 'power3.out'
});
```

---

### 4.4 METHODOLOGY SECTION (How Derek Works)

**Background:** $color-bg-dark
**Layout:** 4 items horizontal, centered

**Content:**
```
[eyebrow] HOW IT WORKS
[h2]      Methodology

4 items with circular icon containers (dark slightly lighter than bg):
1. Published Fare — "Snapshot of publicly available business class fares for similar dates"
2. Derek's Fare — "Most recent quote via consolidator partners — exclusive to Derek's clients"
3. Your Savings — "The difference: your advantage, shown as % of published price"
4. Flexible Dates — "(±3 days) to reflect real search windows; exact dates determine final price"
```

---

### 4.5 WHY BOOK WITH DEREK

**File:** `src/components/home/WhyDerek.jsx`

**Background:** $color-bg-light
**Layout:** 2×3 grid of reason items

**Content — 6 reasons:**
```
[icon] Exclusive Deals
       Unlock access to insider airfares negotiated directly with consolidator 
       partners — savings of 15-60% off published rates.

[icon] Last Minute Bookings
       Need a ticket in 48 hours? Derek finds options when search engines 
       show nothing — any destination, any airline.

[icon] Complex Itineraries
       Multi-city, open-jaw, round-the-world. Mixed cabin combinations on 
       multiple carriers — built personally for your journey.

[icon] Personal Attention
       You deal directly with Derek — not a call center. Every booking gets 
       the same care whether it's economy or first class.

[icon] 24/7 Support
       Derek is reachable around the clock via WhatsApp. Before, during, 
       and after your trip.

[icon] Trusted by 20+ Clients
       A growing network of satisfied travelers who come back — and refer 
       their friends and colleagues.
```

**Each item:** circular icon container (white bg, $shadow-sm), icon in crimson, bold title, body text
**GSAP:** stagger reveal from bottom, delay between each item 0.08s

---

### 4.6 PERSONAL BIO TEASER (Passion for Excellence)

**Background:** white
**Layout:** 3 columns: [text left] [photo center — absolute, overlapping] [text right]

**Left text:**
- Eyebrow: "PASSION FOR EXCELLENCE"
- Bold paragraph: "Derek places every client at the center of his attention."
- Body: "With Derek, you get a personal travel advisor entirely dedicated to understanding your needs. He builds long-lasting relationships with his clients, delivering the best service and highest value for money."
- CTA button: "Contact Derek" — crimson primary

**Center:** Professional photo of Derek (placeholder: confident, well-lit portrait)

**Right text:**
- Eyebrow: "24/7 & 365/YEAR"
- Title: "Personal Support Service"
- Body: "Derek is always available for any query and ready to accommodate changes to your booking. If unexpected events occur, he steps in immediately — delivering service second to none."

---

### 4.7 HOW IT WORKS (Simple Steps)

**File:** `src/components/home/HowItWorks.jsx`

**Background:** $color-bg-light
**Layout:** 4 steps horizontal with dashed line connecting them

**Steps:**
```
[🔍 icon]           [📋 icon]           [📬 icon]           [✈️ icon]
STEP 01             STEP 02             STEP 03             STEP 04
Get in Touch        Share Your Needs    Check Your Inbox    Book & Fly

WhatsApp Derek      Destinations,       Best matching       Confirm securely,
or submit a         dates, cabin,       itineraries at      receive e-ticket,
quote request.      budget — all        insider fares       enjoy your trip.
                    handled personally. sent to you.
```

**Dashed line:** SVG line connecting circle icons, drawn with GSAP `drawSVG` or CSS stroke-dashoffset animation on scroll

---

### 4.8 TESTIMONIALS / TRUSTPILOT SECTION

**File:** `src/components/home/Testimonials.jsx`

**Background:** $color-bg-light

**Top:** Trustpilot carousel — 5 review cards visible (auto-scroll every 4s)

Card structure:
```
[★★★★★] ✓ Verified
[Review title]
[Review excerpt — 2 lines max]
[Reviewer name, X days ago]
```

**Below carousel:**
- "Rated 4.9 / 5 based on X reviews · Trustpilot" with green Trustpilot logo
- Button: "SEE ALL REVIEWS" — crimson pill outline

**97% satisfaction stat:**
- Large centered stat: "97% of Travelers Recommend Derek"
- Animate counter from 0 to 97 when section enters viewport

---

### 4.9 FAQ ACCORDION

**File:** `src/components/home/FaqSection.jsx`

**Background:** white

**Questions:**
1. How can I find cheap business class tickets?
2. What's included in business class on international flights?
3. How much can I save with Derek vs. booking directly?
4. What airlines does Derek work with?
5. Is first class worth the extra cost over business class?
6. How quickly will I receive my quote after submitting a request?
7. What's the difference between premium economy and business class?

**Animation:** GSAP height animation on open/close — smooth expand/collapse
**Only one open at a time**
**Open indicator:** crimson chevron rotates 180° when open

**GSAP ScrollTrigger:**
```js
gsap.from('.faq-section', {
  scrollTrigger: { trigger: '.faq-section', start: 'top 85%' },
  y: 40, opacity: 0, duration: 0.6
});
```

---

### 4.10 NEWSLETTER + BLOG PREVIEW

**Newsletter:**
- Background: $color-bg-dark
- Centered: "Be First to Hear About Exclusive Deals"
- Email input + "Subscribe" crimson button
- Subtext: "No spam. Unsubscribe anytime."

**Blog Preview:**
- Background: white
- Eyebrow: "FRESH FROM THE BLOG"
- H2: "Travel Smarter. Fly Better."
- 3 cards grid:
  ```
  [Photo — 16:9]
  [category badge — crimson pill: "Business Class Tips"]
  [date: May 5, 2026]
  [Title: bold, 2 lines max]
  [Excerpt: 2-3 lines, muted gray]
  [Read More → link]
  ```
- CTA: "View All Articles" — crimson outline button

**Card hover:** image zoom (scale 1.05) + crimson overlay gradient at bottom, 0.4s ease

---

## 5. SERVICES PAGE

### 5.1 HERO

**Background:** static image — luxury business class cabin interior
- Lie-flat seats, warm mood lighting, premium leather
- Dark overlay: rgba(8,16,26,0.7)
- Full viewport height

**Content (centered):**
```
[eyebrow]  WHAT I OFFER
[h1]       Premium Travel.
           Extraordinary Value.
[subtext]  Business class and first class tickets at prices most travelers
           never see — sourced personally by Derek.
```

**GSAP:** Same stagger animation as Home hero on page load

---

### 5.2 SERVICE CARDS (4 cards — FLIP on hover)

**Background:** white section

**Header:**
```
[eyebrow]  SERVICES
[h2]       How Derek Can Help You
```

**4 Cards in 2×2 grid:**

Card front (dark navy bg, white text):
```
[circular icon — crimson bg]
[savings badge — "Save up to 60%"]
[Service title — bold white]
```

Card back (white bg, dark text — revealed on hover with 3D flip):
```
[Service description — 3 lines]
[Example route with prices]
[CTA button — crimson pill "Request a Quote"]
```

**CSS 3D Flip:**
```scss
.service-card { transform-style: preserve-3d; transition: transform 0.6s $ease-smooth; }
.service-card:hover { transform: rotateY(180deg); }
.card-front { backface-visibility: hidden; }
.card-back { backface-visibility: hidden; transform: rotateY(180deg); }
```

**4 Services:**

1. **Business Class at Insider Prices**
   - Icon: airplane seat
   - Badge: Save up to 60%
   - Description: "Access negotiated business class fares on 50+ major airlines worldwide. Lie-flat beds, premium dining, priority boarding — at 15-60% off published rates."
   - Example: New York JFK → London LHR · Published $3,570 · Derek's Price $2,200 · You Save $1,370

2. **First Class, Reimagined**
   - Icon: diamond
   - Badge: Save up to 50%
   - Description: "The absolute pinnacle of air travel — private suites, gourmet dining, exclusive lounges. Derek sources first class seats at prices that make the impossible feel reasonable."
   - Example: Chicago ORD → Dubai DXB · Published $8,400 · Derek's Price $5,100 · You Save $3,300

3. **Complex Itineraries**
   - Icon: route/map pins
   - Badge: Fully Personalized
   - Description: "Multi-city, open-jaw, round-the-world. Mixed cabin combinations and multi-airline routings — Derek builds what search engines can't find."
   - Example: London → Tokyo → Sydney → New York · Mixed Business/First · 4 cities, 5 flights

4. **Last Minute Bookings**
   - Icon: clock/lightning
   - Badge: Any Timeline
   - Description: "Need a flight in 48 hours or less? Derek works his network to find availability and pricing when mainstream booking sites show nothing."
   - Example: Same-week international bookings · Any destination · Business or First

**GSAP ScrollTrigger on cards:**
```js
gsap.from('.service-card', {
  scrollTrigger: { trigger: '.services-grid', start: 'top 75%' },
  y: 80, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out'
});
```

---

### 5.3 AIRLINE PARTNERS STRIP (animated marquee)

**Background:** $color-bg-light
**Content:** Scrolling marquee of airline logos (white/grayscale on light bg):
Qatar Airways · Emirates · Turkish Airlines · Singapore Airlines · Cathay Pacific · Lufthansa · Air France · British Airways · United Airlines · American Airlines · Japan Airlines · ANA · Etihad

**CSS marquee animation:** `animation: marquee 25s linear infinite`

---

### 5.4 SAVINGS PROOF (4 Route Cards)

Same structure as Home SmartSavings section — dark navy bg, carousel, 3D tilt on hover.

4 specific routes for Services:
1. NYC → London Business | $3,570 → $2,200
2. Chicago → Rome Business | $5,060 → $3,100  
3. LA → Tokyo Business | $6,185 → $4,000
4. Miami → Dubai First Class | $12,400 → $7,800

---

### 5.5 HOW IT WORKS (4 Steps)

Same component as Home — reuse `HowItWorks.jsx`

---

### 5.6 FAQ ACCORDION (Services-specific)

**5-6 questions specific to services:**
1. What's the difference between a published fare and Derek's fare?
2. Can Derek book last-minute flights within 24-48 hours?
3. Do you handle multi-stop international itineraries?
4. Which airlines does Derek have special access to?
5. How do I submit a booking request?
6. What happens if I need to change or cancel my ticket?

---

### 5.7 FINAL CTA — CRIMSON GRADIENT

**Background:** `$gradient-crimson` (135deg, #8A194F → #5C0F35)
**Content:**
```
[h2]      Ready to Fly Better for Less?
[subtext] Send Derek your travel details and receive options within hours —
          no commitment required.
[buttons] [Request a Quote — white bg, crimson text] [Chat on WhatsApp — white outline]
```

---

## 6. ABOUT PAGE

### 6.1 HERO

**Background:** aerial photograph — airplane wing at golden hour sunset, below: landscape/ocean
**Dark overlay:** rgba(8,16,26,0.65)
**Parallax on scroll:** `gsap.to('.about-hero-img', { y: '30%', ease: 'none', scrollTrigger: { scrub: true } })`

**Content (centered):**
```
[eyebrow]  ABOUT DEREK
[h1]       Helping People Travel Smart.
[subtext]  Years of aviation expertise combined with exclusive industry
           connections — I find the fares others can't.
```

**GSAP text reveal on load:**
```js
// Each word in h1 wraps in a span, reveals from bottom with clip-path
gsap.from('.about-word', { 
  y: 60, opacity: 0, stagger: 0.05, duration: 0.7, ease: 'power3.out' 
});
```

---

### 6.2 BIO SPLIT LAYOUT

**Background:** white

**Left (45%):** Professional photo of Derek
- Rounded corners (24px)
- Subtle shadow: $shadow-lg
- If no real photo: elegant placeholder with initials "DM" on dark bg

**Right (55%):**
- Eyebrow: "MEET DEREK" in crimson
- H2: "Your Personal Aviation Expert"
- Paragraphs (professional tone, 3-4):
  - Years in aviation industry, deep knowledge of consolidator networks
  - Personal relationships with airline partners and GDS systems
  - Commitment to individual client service — not a call center
  - Track record of significant savings for each client

**Stats bar below text (4 counters):**
```
[20+]          [$1,800]       [5★]           [24/7]
Clients        Avg Savings    Trustpilot     Personal
Served         Per Ticket     Rating         Support
```

**AnimatedCounter component:**
```js
// Uses IntersectionObserver to trigger when visible
// GSAP counter: gsap.to(counterObj, { val: targetNum, duration: 2, ease: 'power2.out',
//   onUpdate: () => el.textContent = Math.round(counterObj.val) })
```

---

### 6.3 MY STORY — VERTICAL TIMELINE

**Background:** $color-bg-light

**Header:**
```
[eyebrow]  MY STORY
[h2]       The Journey to Becoming Your Aviation Expert
```

**Timeline items (left-right alternating, connected by vertical crimson line):**
```
[left]                    [center line]    [right]
                              |
                          [● crimson dot]
                              |
[Year / milestone text]       |            [description]
                              |
                          [● crimson dot]
                              |
[description]                 |            [Year / milestone text]
```

**Placeholder timeline entries (Derek fills real data):**
- 2010: "Began career in the aviation industry — discovering the world of consolidator fares"
- 2014: "Built first network of airline partners and negotiated access to unpublished rates"
- 2018: "Started serving individual clients personally — first 5 loyal customers"
- 2022: "Expanded to 20+ satisfied clients across multiple countries"
- 2025: "Launched personal brand to serve a growing community of premium travelers"

**GSAP ScrollTrigger on timeline:**
```js
// Each timeline item reveals on scroll
// Line draws itself using strokeDashoffset animation
gsap.fromTo('.timeline-line', { scaleY: 0, transformOrigin: 'top' }, {
  scaleY: 1,
  scrollTrigger: { trigger: '.timeline-section', start: 'top 70%', scrub: 1 }
});
gsap.from('.timeline-item', {
  x: (i) => i % 2 === 0 ? -60 : 60,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: { trigger: '.timeline-section', start: 'top 70%' }
});
```

---

### 6.4 VALUES — 3 FLOATING CARDS

**Background:** $color-bg-dark with business class cabin photo as background (dark overlay 0.85)

**Header:**
```
[eyebrow]  WHAT I STAND FOR
[h2]       My Commitment to You
```

**3 white floating cards (with $shadow-lg, $radius-xl):**

Card top: crimson icon in white circle (elevated, overhangs top of card)

1. **TRUST**
   Icon: handshake
   "Every quote is honest, transparent, and based on real availability. No hidden fees, no surprises — ever."

2. **SPEED**
   Icon: lightning bolt
   "Submit your request and receive curated options within hours, not days. Your time is valuable and Derek respects it."

3. **PERSONALIZATION**
   Icon: person with star
   "No two travelers are alike. Every itinerary is built specifically around your dates, preferences, and exact budget."

**GSAP:**
```js
gsap.from('.values-card', {
  scrollTrigger: { trigger: '.values-section', start: 'top 75%' },
  y: 80, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.4)'
});
```

---

### 6.5 AIRLINES I WORK WITH

**Background:** white

**Header:**
```
[eyebrow]  PARTNER AIRLINES
[h2]       Airlines I Work With
```

**Grid of airline logos:** 3×3 or 4×3, grayscale on white, color on hover
- Emirates · Qatar Airways · Turkish Airlines · Singapore Airlines · Cathay Pacific
- Lufthansa · Air France · British Airways · United Airlines · American Airlines · Japan Airlines · Etihad

---

### 6.6 SOCIAL PROOF

**Background:** $color-bg-light

**Top half — Trustpilot widget embedded:**
- Green Trustpilot stars
- "Rated 5.0 / 5" badge
- Embed real Trustpilot widget or styled version
- "SEE ALL REVIEWS" crimson pill button → links to Derek's Trustpilot page

**Bottom half — 3 manual review cards:**
Card structure:
```
[★★★★★]  ✓ Verified Trustpilot
[Review title: bold]
[Review body: 2-3 sentences — placeholder]
[Reviewer: Name · X months ago]
```

Placeholder reviews:
1. "Derek found me a business class seat to Tokyo for less than I'd pay for economy elsewhere. Absolutely unbelievable service." — Michael R., 2 months ago
2. "Called Derek last minute before a trip to London. Had me booked in 3 hours. First class. Would never book any other way." — Sarah T., 1 month ago
3. "The personalized service is unlike anything I've experienced. Derek actually knows my preferences. 100% recommend." — James K., 3 weeks ago

---

### 6.7 FINAL CTA

**Background:** $color-bg-dark

```
[h2]      Ready to Work With Derek?
[subtext] Get in touch today and receive your personalized quote within hours.
[buttons] [Request a Quote — crimson primary] [Chat on WhatsApp — white outline]
```

---

## 7. BLOG PAGE

### 7.1 BLOG LISTING PAGE

**URL:** `/blog`

**Hero:** simple dark navy bar (not full-height)
```
[eyebrow]  CURRENT ARTICLES
[h1]       Travel Smarter. Read Better.
[subtext]  Subscribe for updates on premium travel, exclusive business class
           deals, and insider industry insights.
```

**Category Filter Bar:**
- Buttons: All · Business Class Tips · Travel Hacks · Destination Guides · Derek's Picks
- Active category: crimson bg, white text pill
- On click: GSAP filter animation — cards fade out, matching cards fade in (stagger 0.08s)

```js
// Filter logic
function filterCards(category) {
  const all = document.querySelectorAll('.blog-card');
  const targets = category === 'all' ? all : [...all].filter(c => c.dataset.category === category);
  
  gsap.to(all, { opacity: 0, y: 20, duration: 0.3, onComplete: () => {
    all.forEach(c => c.style.display = 'none');
    targets.forEach(c => c.style.display = 'flex');
    gsap.from(targets, { opacity: 0, y: 20, stagger: 0.08, duration: 0.4 });
  }});
}
```

**Main layout:** 2-column split:
- **Left (65%):** 3-column card grid
- **Right sidebar (35%):** Request a Quote form + Recent Articles

**Blog Card structure:**
```jsx
<article className="blog-card" data-category="business-class-tips">
  <div className="card-image">
    <img src={photo} alt={title} />
    <span className="category-badge">Business Class Tips</span>
  </div>
  <div className="card-body">
    <time>May 5, 2026</time>
    <h3>{title}</h3>
    <p>{excerpt}</p>
    <span className="read-time">15 min read</span>
    <a href={`/blog/${slug}`} className="read-more">Read More →</a>
  </div>
</article>
```

**Card hover:** 
```scss
.card-image img { transition: transform 0.5s $ease-smooth; }
.blog-card:hover .card-image img { transform: scale(1.06); }
.card-image::after {
  content: '';
  background: linear-gradient(to top, rgba(138,25,79,0.5), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.blog-card:hover .card-image::after { opacity: 1; }
```

**Sidebar — Request a Quote mini form:**
```
[title: "Get Your Free Quote"]
[subtext: "Derek responds within hours"]
[ From Airport ]
[ To Airport ]
[ Travel Date ]
[ Your Email ]
[ REQUEST QUOTE → ] crimson button full-width
```

**Sidebar — Recent Articles:**
- 5 recent article links: small thumbnail + title + date

**Placeholder articles (8 total):**
1. "Why Some Travelers Keep Overpaying for Business Class" | Business Class Tips | 15 min read
2. "The Part of Business Class Travel That Has Nothing to Do With the Seat" | Travel Hacks | 11 min read
3. "Hidden Business Class Deals: How to Find What Airlines Don't Advertise" | Business Class Tips | 9 min read
4. "Tokyo vs. Singapore: Which First Class Experience Is Worth More?" | Destination Guides | 13 min read
5. "Last Minute Business Class: Is It Actually Possible to Score Good Fares?" | Travel Hacks | 7 min read
6. "My Top 5 Business Class Airlines for Long-Haul Flights in 2026" | Derek's Picks | 10 min read
7. "Emirates vs. Qatar: A First Class Showdown" | Destination Guides | 12 min read
8. "How Consolidator Fares Work — And Why Most Travelers Never Access Them" | Business Class Tips | 8 min read

---

### 7.2 BLOG ARTICLE PAGE

**URL:** `/blog/:slug`

**Structure:**
```
[HERO — full-width article image, dark overlay]
  [category badge]
  [h1: article title]
  [date + read time]

[CONTENT AREA — 2 column]
  [Article body — 65%]    [Sidebar — 35%]
  
  [Article content]       [Request a Quote form]
  [Related articles]      [Recent Articles]
  [Share buttons]         [Category links]
```

**Typography in article body:**
- H2 headings: Syne bold, crimson left border accent
- Body: DM Sans, 1.125rem, line-height 1.8
- Blockquote: left border crimson 4px, italic, gray bg, padding
- Images: full-width within article, rounded 16px

---

## 8. ANIMATIONS MASTER REFERENCE

### 8.1 GSAP ScrollTrigger — Global Pattern
```js
// Apply to all fade-in sections
function createScrollReveal(selector, options = {}) {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      once: true,
      ...options.scrollTrigger
    },
    y: options.y || 50,
    opacity: 0,
    duration: options.duration || 0.7,
    stagger: options.stagger || 0,
    ease: options.ease || 'power3.out'
  });
}
```

### 8.2 Three.js Particles (Hero only)
```js
// src/utils/threeParticles.js
import * as THREE from 'three';

export function initParticles(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // 800 particles
  const geometry = new THREE.BufferGeometry();
  const count = 800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.025,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  camera.position.z = 5;
  
  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;
    renderer.render(scene, camera);
  }
  animate();
  
  // Cleanup
  return () => {
    cancelAnimationFrame(animId);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
```

### 8.3 Navbar Transparency on Scroll
```js
// In Navbar.jsx useEffect
useEffect(() => {
  const handleScroll = () => {
    const isScrolled = window.scrollY > 80;
    navbarRef.current.classList.toggle('scrolled', isScrolled);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

```scss
// Navbar.module.scss
.navbar {
  position: fixed;
  width: 100%;
  z-index: 1000;
  background: transparent;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
  
  &.scrolled {
    background: rgba(8, 16, 26, 0.96);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
```

### 8.4 Animated Number Counters
```js
// src/hooks/useCounterAnimation.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useCounterAnimation(ref, target, prefix = '', suffix = '') {
  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      onUpdate: () => {
        ref.current.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
      }
    });
  }, []);
}
```

---

## 9. RESPONSIVE DESIGN

### 9.1 Breakpoints
```scss
$bp-sm:  480px;
$bp-md:  768px;
$bp-lg:  1024px;
$bp-xl:  1280px;
$bp-2xl: 1536px;

@mixin sm { @media (max-width: $bp-sm) { @content; } }
@mixin md { @media (max-width: $bp-md) { @content; } }
@mixin lg { @media (max-width: $bp-lg) { @content; } }
```

### 9.2 Mobile Rules
- Navbar: hamburger menu, full-screen overlay
- Hero form: stacks vertically, each field full-width
- Service cards: single column, no flip (tap to reveal back)
- Route cards: horizontal scroll, one card visible at a time
- How It Works: vertical steps, no dashed line
- Footer links: collapsible accordion per column
- Blog grid: single column on mobile
- Three.js particles: disabled on mobile (check `window.innerWidth < 768`)

---

## 10. CONTACT / QUOTE REQUEST

### 10.1 Request a Quote Form (used across site)
```jsx
// Fields:
// - First Name + Last Name
// - Email Address
// - Phone / WhatsApp number
// - Flying From (airport or city)
// - Flying To (airport or city)
// - Departure Date
// - Return Date (optional)
// - Number of Passengers (1-10 dropdown)
// - Cabin Class (Business / First / Either)
// - Budget Range (optional)
// - Additional notes (textarea)
// - [Submit Request] crimson button

// On submit: mailto: link OR direct WhatsApp message pre-filled
// WhatsApp: https://wa.me/DEREKSNUMBER?text=ENCODED_MESSAGE
```

---

## 11. SEO & META

```jsx
// Per page meta tags (React Helmet or native <head> manipulation)

// Home:
// title: "Derek Monti — Personal Aviation Advisor | Business Class at Insider Prices"
// description: "Get business and first class flights at 15-60% off published fares.
//               Derek Monti is your personal aviation expert — quotes within hours."

// Services:
// title: "Services — Business Class, First Class & Complex Itineraries | Derek Monti"

// About:
// title: "About Derek Monti — Your Personal Aviation Advisor"

// Blog:
// title: "Blog — Business Class Tips, Travel Hacks & Deals | Derek Monti"
```

---

## 12. DEPLOYMENT

- **Platform:** Vercel
- **Build command:** `vite build`
- **Output dir:** `dist`
- **SPA routing:** add `vercel.json` with rewrites for React Router
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
- **Domain:** client's own domain (Derek provides)
- **HTTPS:** automatic via Vercel

---

## 13. PLACEHOLDER DATA (to be replaced by Derek)

Replace all instances of:
- `[DEREK'S PHONE NUMBER]` → real phone
- `derek@derekmonti.com` → real email
- `[DEREK'S WHATSAPP NUMBER]` → real WhatsApp
- `[DEREK'S PHOTO]` → real professional photo
- `[DEREK'S TRUSTPILOT URL]` → real Trustpilot page
- `[YEARS OF EXPERIENCE]` → real number
- Review names and texts → real Trustpilot reviews (copy from his page)
- Timeline dates → real career milestones Derek provides

---

## 14. CLAUDE DESIGN INSTRUCTIONS (for claude-opus-4-6)

When generating any section or page, always:
1. Follow the exact color system in Section 1 — NEVER use blue or purple
2. Use Syne for headings, DM Sans for body — ALWAYS
3. Crimson #8A194F is the ONLY accent color — buttons, eyebrows, highlights
4. Dark navy #0B1929 for all dark sections — not pure black
5. Every page has the same Navbar and Footer — consistent always
6. Cards use $radius-md (16px) or $radius-lg (24px) — never sharp corners
7. GSAP animations are required — not optional decorations
8. Three.js particles ONLY on Hero of Home page
9. Service cards MUST have 3D flip on hover
10. Route cards MUST have 3D tilt on hover
11. This is a PERSONAL brand — copy tone is "I" / "Derek" — not "we" / "our team"
12. All CTAs include WhatsApp option alongside form — never form-only
13. The site must feel like travelbusinessclass.com but MORE personal and boutique

---

*End of CLAUDE.md — Version 1.0 — May 2026*
*Built for Derek Monti Aviation — Personal Brand Site*