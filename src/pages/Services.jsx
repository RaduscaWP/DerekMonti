import { useRef, useState } from 'react';
import { Armchair, ArrowRight, Clock3, Gem, MessageCircle, Phone, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import AirlineMarquee from '../components/common/AirlineMarquee.jsx';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import QuickQuote from '../components/common/QuickQuote.jsx';
import RouteCarousel from '../components/common/RouteCarousel.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import { contactConfig, routeDeals, routeDealsNote, servicesFaqs } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { getWhatsappUrl } from '../utils/message.js';

// TODO(owner-data): example fares mirror routeDeals in siteData.js; replace with Derek's real bookings.
const services = [
  {
    id: 'business',
    icon: Armchair,
    badge: 'Save up to 60%',
    title: 'Business Class at insider prices',
    tagline: 'Lie-flat seats on 50+ airlines, 15–60% below the fare the airline publishes.',
    description:
      'I hold consolidator contracts that price business class below the airline’s own website. Same seat, same lounge, same miles; only the channel changes.',
    example: {
      label: 'Example from a recent quote',
      route: 'New York JFK → London LHR, business',
      published: '$3,570',
      derek: '$2,625',
      saving: 'You save $945',
    },
    href: '/business-class-flights',
    pageLabel: 'Business class flights',
  },
  {
    id: 'first',
    icon: Gem,
    badge: 'Save up to 50%',
    title: 'First Class, within reach',
    tagline: 'Private suites, showers in the sky and chauffeur service, at prices that make the upgrade reasonable.',
    description:
      'First class inventory is small and the published fares are brutal. I watch the carriers that release unpublished first class fares and tell you honestly when business is the better buy.',
    example: {
      label: 'Example from a recent quote',
      route: 'Miami MIA → Singapore SIN, first class',
      published: '$12,400',
      derek: '$7,200',
      saving: 'You save $5,200',
    },
    href: '/first-class-flights',
    pageLabel: 'First class flights',
  },
  {
    id: 'complex',
    icon: Route,
    badge: 'Fully personalized',
    title: 'Multi-city and round-the-world',
    tagline: 'Open-jaw, mixed cabins, several airlines: one plan, one price, one person responsible.',
    description:
      'Search engines break on anything beyond a round trip. I build the routing by hand, mix carriers where it saves money and keep every leg on one ticket so a delay is the airline’s problem, not yours.',
    example: {
      label: 'Example itinerary',
      route: 'London → Tokyo → Sydney → New York',
      published: null,
      derek: '4 cities, 5 flights, mixed business and first',
      saving: 'Priced as one ticket',
    },
    href: '/services/complex-itineraries',
    pageLabel: 'Complex itineraries',
  },
  {
    id: 'last-minute',
    icon: Clock3,
    badge: 'Any timeline',
    title: 'Last-minute business class',
    tagline: 'Flying in 24 to 72 hours? Premium cabins often leave with empty seats. I find them.',
    description:
      'Business cabins are rarely full at departure, and some of the best unpublished fares appear inside the final week. Send me the trip and I reply within hours with what is actually available.',
    example: {
      label: 'Typical request',
      route: 'Same-week transatlantic, business or first',
      published: null,
      derek: 'Options within hours, ticketed the same day',
      saving: '24/7 on WhatsApp',
    },
    href: '/services/last-minute-business-class',
    pageLabel: 'Last-minute flights',
  },
];

const corridors = [
  {
    small: 'US → Europe',
    title: 'Business class flights to Europe',
    text: 'London, Paris, Rome, Madrid and Frankfurt from the East Coast, Miami and the West Coast.',
    href: '/business-class-flights/europe',
  },
  {
    small: 'Europe → US',
    title: 'Business class flights to the USA',
    text: 'Transatlantic fares priced from the European side, where the published price often differs.',
    href: '/business-class-flights/usa',
  },
  {
    small: 'One advisor',
    title: 'Personal business class advisor',
    text: 'What working with me looks like next to an airline website or an online travel agency.',
    href: '/services/premium-flight-advisor',
  },
];

function ServiceCard({ service }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = service.icon;

  return (
    <article className={`service-card${flipped ? ' is-flipped' : ''}`} data-reveal>
      <div className="service-card__inner">
        <div className="service-card__face service-card__front">
          <span className="service-card__icon">
            <Icon aria-hidden="true" size={24} strokeWidth={1.9} />
          </span>
          <span className="service-card__badge">{service.badge}</span>
          <h3>{service.title}</h3>
          <p>{service.tagline}</p>
          <button
            type="button"
            className="service-card__toggle"
            aria-expanded={flipped}
            onClick={() => setFlipped((value) => !value)}
          >
            {flipped ? 'Hide details' : 'See details'}
          </button>
        </div>
        <div className="service-card__face service-card__back">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <div className="service-card__example">
            <span>{service.example.label}</span>
            <strong>{service.example.route}</strong>
            {service.example.published ? (
              <p>
                <del>Published {service.example.published}</del> · Derek&rsquo;s fare <em>{service.example.derek}</em>
              </p>
            ) : (
              <p>{service.example.derek}</p>
            )}
            <small>{service.example.saving}</small>
          </div>
          <div className="service-card__actions">
            <Button href="#quote" size="sm">
              Get a quote
            </Button>
            <Link className="service-card__page" to={service.href}>
              {service.pageLabel}
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);
  const whatsapp = getWhatsappUrl({ requestTitle: 'Business class quote' });

  return (
    <div ref={pageRef}>
      <section className="services-hero" aria-labelledby="services-title">
        <div className="container services-hero__inner">
          <div className="services-hero__copy" data-reveal>
            <p className="eyebrow eyebrow--light">Services</p>
            <h1 id="services-title">Business and First Class tickets, 15–60% below the published fare.</h1>
            <p className="services-hero__lead">
              Four things I do for my clients: business class at insider prices, first class within reach, complex
              itineraries built by hand and last-minute seats when the search engines show nothing. Every quote
              shows the airline&rsquo;s published price next to mine.
            </p>
            <div className="services-hero__actions">
              <Button href="#quote">Get a quote</Button>
              <a className="services-hero__contact" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" size={17} />
                WhatsApp Derek
              </a>
              <a className="services-hero__contact" href={`tel:${contactConfig.phoneHref}`}>
                <Phone aria-hidden="true" size={17} />
                {contactConfig.phoneLabel}
              </a>
            </div>
          </div>
          <div className="services-hero__quote" id="quote" data-reveal data-reveal-y="18">
            <p className="services-hero__quote-title">Price my trip</p>
            <QuickQuote variant="inline" label="Get my quote" />
            <p className="services-hero__quote-note">Free quote, no obligation. Fares are confirmed before ticketing.</p>
          </div>
        </div>
      </section>

      <section className="services-cards" aria-labelledby="services-cards-title">
        <div className="container">
          <div className="services-cards__header" data-reveal>
            <p className="eyebrow">What I do</p>
            <h2 id="services-cards-title">Four ways I get you a better seat for less.</h2>
          </div>
          <div className="services-cards__grid">
            {services.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-corridors" aria-label="Routes and advisor pages">
        <div className="container">
          <nav className="services-corridors__grid" aria-label="Related pages" data-reveal>
            {corridors.map((item) => (
              <Link to={item.href} key={item.href}>
                <small>{item.small}</small>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="services-proof" aria-labelledby="services-proof-title">
        <div className="container">
          <header className="services-proof__header" data-reveal>
            <p className="eyebrow eyebrow--light">Example fares</p>
            <h2 id="services-proof-title">What my clients pay next to the published price.</h2>
            <p>Four routes I price every week, business class unless marked, with the airline&rsquo;s own fare for the same dates.</p>
          </header>
          <div data-reveal data-reveal-y="32">
            <RouteCarousel deals={routeDeals.slice(0, 4)} />
          </div>
          <p className="services-proof__note">{routeDealsNote}</p>
        </div>
      </section>

      <HowItWorks />

      <AirlineMarquee />

      <section className="faq-section" aria-labelledby="services-faq-title">
        <div className="container faq-section__inner">
          <div data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="services-faq-title">Questions clients ask before the first quote</h2>
            <p>Straight answers on fares, timing and what happens after you book.</p>
            <Button href="#quote">Get a quote</Button>
          </div>
          <FaqAccordion items={servicesFaqs} />
        </div>
      </section>

      <FinalCta
        title="Ready to fly better for less?"
        text="Send me the route, dates and cabin. You get real options within hours, with the published price next to mine."
        quoteHref="#quote"
      />
    </div>
  );
}
