import { useRef } from 'react';
import { ArrowRight, Check, Handshake, MessageCircle, Phone, UserRound, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AirlineMarquee from '../components/common/AirlineMarquee.jsx';
import AnimatedCounter from '../components/common/AnimatedCounter.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import TrustBar from '../components/home/TrustBar.jsx';
import { contactConfig, evaluationItems, imagery, stats } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';
import { getWhatsappUrl } from '../utils/message.js';

const values = [
  {
    icon: Handshake,
    title: 'Trust',
    body: 'Every quote shows the published fare next to mine and the ticket rules before you pay. No hidden fees and no surprises after ticketing.',
  },
  {
    icon: Zap,
    title: 'Speed',
    body: 'Send me the trip and you get real options within hours, not days. When something changes on the road, I answer the same day.',
  },
  {
    icon: UserRound,
    title: 'Personal',
    body: 'You deal with me, not a call center. I learn how you like to fly, which seats you avoid and when a one-stop is worth the saving to you.',
  },
];

export default function About() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);
  const whatsapp = getWhatsappUrl({ requestTitle: 'Business class quote' });

  return (
    <div ref={pageRef}>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="container about-hero__inner">
          <div className="about-hero__copy" data-reveal>
            <p className="eyebrow eyebrow--light">About Derek</p>
            <h1 id="about-title">Business class tickets, sourced by one advisor you can actually call.</h1>
            <p className="about-hero__lead">
              I&rsquo;m Derek Monti, a personal flight advisor based in Miami. I book business and first class tickets
              for 20+ private clients through consolidator contracts, typically 15–60% below the fare the airline
              publishes. You message me, I send real options with the published price next to mine, and I stay
              reachable until you land.
            </p>
            <div className="about-hero__actions">
              <Link className="btn btn--primary btn--md" to="/#request-form">
                <span>Get a quote</span>
                <ArrowRight aria-hidden="true" size={18} strokeWidth={2.1} />
              </Link>
              <a className="about-hero__contact" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" size={17} />
                WhatsApp Derek
              </a>
              <a className="about-hero__contact" href={`tel:${contactConfig.phoneHref}`}>
                <Phone aria-hidden="true" size={17} />
                {contactConfig.phoneLabel}
              </a>
            </div>
            <div className="about-hero__stats">
              <AnimatedCounter value={60} prefix="Up to " suffix="%" label={stats.savingsLabel} />
              <AnimatedCounter value={20} suffix="+" label={stats.clientsLabel} />
              <AnimatedCounter display={stats.support} label={stats.supportLabel} />
            </div>
          </div>
          <figure className="about-portrait" data-reveal data-reveal-y="24">
            <img
              src="/images/derek-monti-768.webp"
              srcSet="/images/derek-monti-480.webp 480w, /images/derek-monti-768.webp 768w, /images/derek-monti-1122.webp 1122w"
              sizes="(max-width: 940px) 380px, 460px"
              alt="Derek Monti"
              width="1122"
              height="1402"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <figcaption>
              <strong>Derek Monti</strong>
              <span>Personal flight advisor · {contactConfig.location}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <TrustBar />

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="container about-story__inner">
          <div className="about-story__copy" data-reveal>
            <p className="eyebrow">How it works</p>
            <h2 id="about-story-title">How I get fares the airlines don&rsquo;t advertise.</h2>
            <p>
              Airlines sell part of their premium inventory through consolidators at net fares that never appear on
              their websites. Those contracts are only available to accredited agencies, which is why the same seat
              can cost $3,570 on the airline&rsquo;s site and $2,625 through me.
            </p>
            <p>
              My tickets are issued through {contactConfig.agency.name}, an ARC-accredited agency with a BBB A+
              rating. You get a real airline ticket with a record locator you can check on the airline&rsquo;s own
              website, plus the miles and the lounge access that come with the fare class.
            </p>
            <p>
              Before I quote, I run the same six checks on every option. They catch the mixed-cabin leg, the 11-hour
              layover and the non-refundable fare class that a cheaper headline price tends to hide.
            </p>
            <Link className="text-link" to="/business-class-flights">
              See example fares <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="about-checks" data-reveal>
            <h3>The six checks before every quote</h3>
            <ol>
              {evaluationItems.map((item) => (
                <li key={item.title}>
                  <Check aria-hidden="true" size={20} />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <div className="container">
          <div className="about-values__header" data-reveal>
            <p className="eyebrow eyebrow--light">What I stand for</p>
            <h2 id="about-values-title">What you can count on.</h2>
          </div>
          <div className="about-values__grid">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article className="about-values__card" key={value.title} data-reveal>
                  <Icon aria-hidden="true" size={26} strokeWidth={1.8} />
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <AirlineMarquee />

      <section className="about-agency" aria-labelledby="about-agency-title">
        <div className="container about-agency__inner">
          <div data-reveal>
            <p className="eyebrow">Ticketing partner</p>
            <h2 id="about-agency-title">Every ticket is issued through {contactConfig.agency.name}.</h2>
          </div>
          <div className="about-agency__copy" data-reveal>
            <p>
              I&rsquo;m affiliated with {contactConfig.agency.name}, an {contactConfig.agency.accreditation} with a BBB
              A+ rating; the Google rating shown on this site is the agency&rsquo;s. Accreditation means the airlines
              recognise the agency as an authorised ticket seller, which is what makes consolidator contracts possible
              in the first place.
            </p>
            <p>
              For you it means a real airline ticket, the miles and lounge access of the fare class, and one person who
              answers when plans change.{' '}
              <a href={contactConfig.agency.url} target="_blank" rel="noopener noreferrer">
                Visit {contactConfig.agency.name}
              </a>
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        title="Have a premium trip in mind?"
        text="Send me the route and dates. I reply within hours with real fares and the published price next to mine."
      />
    </div>
  );
}
