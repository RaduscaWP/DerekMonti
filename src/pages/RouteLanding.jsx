import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import QuickQuote from '../components/common/QuickQuote.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import { contactConfig, stats } from '../data/siteData.js';
import { routePages } from '../data/routePages.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { getWhatsappUrl } from '../utils/message.js';

function Breadcrumbs({ page }) {
  return (
    <nav className="route-page__breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={page.corridor}>Business class flights</Link>
        </li>
        <li>
          <span aria-current="page">
            {page.origin.city} to {page.destination.city}
          </span>
        </li>
      </ol>
    </nav>
  );
}

export default function RouteLanding({ page }) {
  if (!page) throw new Error('RouteLanding requires a route page data object.');

  const pageRef = useRef(null);
  usePageMotion(pageRef);
  const whatsapp = getWhatsappUrl({
    from: `${page.origin.city} (${page.origin.code})`,
    to: `${page.destination.city} (${page.destination.code})`,
    requestTitle: `${page.origin.city} to ${page.destination.city} business class quote`,
  });
  const related = page.related.map((slug) => routePages.find((item) => item.slug === slug)).filter(Boolean);

  return (
    <div className="route-page" ref={pageRef}>
      <section className="route-page__hero" aria-labelledby={`${page.slug}-title`}>
        <div className="container">
          <Breadcrumbs page={page} />
          <div className="route-page__hero-grid">
            <div className="route-page__hero-copy" data-reveal>
              <p className="eyebrow route-page__eyebrow">
                {page.origin.code} → {page.destination.code} · Business &amp; First Class
              </p>
              <h1 id={`${page.slug}-title`}>{page.h1}</h1>
              <p className="route-page__lead">{page.intro[0]}</p>
              <ul className="route-page__proof" aria-label="Why book with Derek">
                <li>
                  <strong>{stats.savings}</strong>
                  <span>{stats.savingsLabel}</span>
                </li>
                <li>
                  <strong>{stats.support}</strong>
                  <span>{stats.supportLabel}</span>
                </li>
                <li>
                  <strong>Same day</strong>
                  <span>quotes for most requests</span>
                </li>
              </ul>
              <div className="route-page__actions">
                <a className="btn btn--outline" href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" size={17} />
                  WhatsApp Derek
                </a>
                <a className="route-page__phone" href={`tel:${contactConfig.phoneHref}`}>
                  <Phone aria-hidden="true" size={16} />
                  Call {contactConfig.phoneLabel}
                </a>
              </div>
            </div>
            <figure className="route-page__image" data-reveal data-reveal-y="18">
              <img
                src={page.image}
                srcSet={`${page.imageSmall} 600w, ${page.image} 1200w`}
                sizes="(max-width: 940px) 92vw, 520px"
                alt={page.imageAlt}
                width="1200"
                height="675"
                fetchpriority="high"
                decoding="async"
              />
              <figcaption>
                <span>Example fare, {page.exampleFare.cabin.toLowerCase()}</span>
                <strong>
                  <del>{page.exampleFare.published}</del> {page.exampleFare.derek}
                </strong>
              </figcaption>
            </figure>
          </div>
          <div className="route-page__quote" id="quote">
            <QuickQuote variant="inline" label="Get my quote" />
          </div>
        </div>
      </section>

      <section className="route-page__facts" aria-labelledby={`${page.slug}-facts-title`}>
        <div className="container route-page__facts-grid">
          <div data-reveal>
            <p className="eyebrow">The route</p>
            <h2 id={`${page.slug}-facts-title`}>
              {page.origin.city} to {page.destination.city} at a glance
            </h2>
            {page.intro.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <dl className="route-page__fact-list" data-reveal>
            {page.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="route-page__cabins" aria-labelledby={`${page.slug}-cabins-title`}>
        <div className="container">
          <header data-reveal>
            <p className="eyebrow">Cabins on this route</p>
            <h2 id={`${page.slug}-cabins-title`}>What the seat actually is</h2>
          </header>
          <div className="route-page__cabin-grid">
            {page.cabins.map((cabin) => (
              <article key={`${cabin.airline}-${cabin.product}`} data-reveal>
                <h3>{cabin.airline}</h3>
                <strong>{cabin.product}</strong>
                <p>{cabin.note}</p>
              </article>
            ))}
          </div>
          <div className="route-page__tips" data-reveal>
            <h3>How I find the better fare on this route</h3>
            <ul>
              {page.tips.map((tip) => (
                <li key={tip.slice(0, 40)}>{tip}</li>
              ))}
            </ul>
            <p className="route-page__fineprint">{page.exampleFare.label}. Fares change daily; I confirm the price before you book.</p>
          </div>
        </div>
      </section>

      <section className="faq-section route-page__faq" aria-labelledby={`${page.slug}-faq-title`}>
        <div className="container faq-section__inner">
          <div data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id={`${page.slug}-faq-title`}>
              {page.origin.city} to {page.destination.city} questions
            </h2>
            <p className="route-page__faq-intro">Straight answers before you request a quote.</p>
            <Button href="#quote">Get a quote</Button>
          </div>
          <FaqAccordion items={page.faqs} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="route-page__related" aria-labelledby={`${page.slug}-related-title`}>
          <div className="container">
            <header data-reveal>
              <p className="eyebrow">More routes</p>
              <h2 id={`${page.slug}-related-title`}>Other routes I price every week</h2>
            </header>
            <nav className="route-page__related-grid" aria-label="Related routes" data-reveal>
              {related.map((item) => (
                <Link to={item.path} key={item.slug}>
                  <span>
                    {item.origin.code} → {item.destination.code}
                  </span>
                  <strong>
                    {item.origin.city} to {item.destination.city}
                  </strong>
                  <small>
                    Example {item.exampleFare.cabin.toLowerCase()} fare {item.exampleFare.derek}
                  </small>
                  <ArrowUpRight aria-hidden="true" size={18} />
                </Link>
              ))}
              <Link to={page.corridor}>
                <span>All routes</span>
                <strong>Business class flights</strong>
                <small>Corridor overview and more examples</small>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </nav>
          </div>
        </section>
      )}

      <FinalCta
        title={`Flying ${page.origin.city} to ${page.destination.city}?`}
        text="Send me your dates. I reply within hours with real fares, the published price next to mine and the ticket rules spelled out."
      />
    </div>
  );
}
