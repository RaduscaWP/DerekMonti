import { Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import FaqAccordion from '../components/common/FaqAccordion.jsx';
import QuoteForm from '../components/common/QuoteForm.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import AirlineMarquee from '../components/common/AirlineMarquee.jsx';
import FinalCta from '../components/common/FinalCta.jsx';
import BlogCard from '../components/blog/BlogCard.jsx';
import Testimonials, { hasReviews } from '../components/common/Testimonials.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import TrustBar from '../components/home/TrustBar.jsx';
import SavingsSection from '../components/home/SavingsSection.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import WhyDerek from '../components/home/WhyDerek.jsx';
import { blogPosts } from '../data/blog.js';
import { discoveryLinks, homeFaqs, imagery } from '../data/siteData.js';
import { usePageMotion } from '../hooks/usePageMotion.js';

const HOME_REQUEST_TITLE = 'Premium flight quote request';
const HOME_REQUEST_SOURCE = 'Home page quote form';

function QuoteSection() {
  return (
    <section className="quote-section" id="quote" aria-labelledby="quote-title">
      <div className="container quote-section__layout">
        <div className="quote-section__intro" data-reveal>
          <p className="eyebrow">Get a quote</p>
          <h2 id="quote-title">Tell me where you want to fly.</h2>
          <p>
            Route, dates, travelers and cabin. I reply with real fares, usually the same day, with the published price
            next to mine so you can see the saving.
          </p>
          <ol>
            <li>
              <Check aria-hidden="true" size={18} />
              <p>Route, dates, travelers and cabin.</p>
            </li>
            <li>
              <Check aria-hidden="true" size={18} />
              <p>Your flexibility and what matters most on board.</p>
            </li>
            <li>
              <Check aria-hidden="true" size={18} />
              <p>WhatsApp, phone or email for my reply.</p>
            </li>
          </ol>
        </div>
        <div className="quote-section__form" id="request-form">
          <QuoteForm
            variant="full"
            full
            source={HOME_REQUEST_SOURCE}
            requestTitle={HOME_REQUEST_TITLE}
            confirmationContext={{ advisorAvatarSrc: imagery.derekAvatar }}
          />
        </div>
      </div>
    </section>
  );
}

function DiscoverySection() {
  return (
    <section className="discovery-section" aria-labelledby="discovery-title">
      <div className="container">
        <SectionHeader
          eyebrow="Explore by need"
          title="Start with the trip you are planning."
          text="Each guide has a distinct purpose and leads back to the same focused request when you are ready."
          align="left"
        />
        <h2 className="sr-only" id="discovery-title">
          Services and travel guides
        </h2>
        <div className="discovery-grid">
          {discoveryLinks.map((item) => (
            <Link to={item.href} key={item.href} data-reveal>
              <span>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <strong>
                Explore <ArrowRight aria-hidden="true" size={17} />
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuidesSection() {
  const latest = [...blogPosts]
    .sort((a, b) => (b.publishedTime || '').localeCompare(a.publishedTime || ''))
    .slice(0, 3);

  return (
    <section className="blog-preview" aria-labelledby="guides-title">
      <div className="container">
        <div className="blog-preview__header" data-reveal>
          <div>
            <p className="eyebrow">From the blog</p>
            <h2 id="guides-title">What I tell clients before they book</h2>
          </div>
          <Link className="text-link" to="/blog">
            All articles <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <div className="blog-preview__grid">
          {latest.map((post) => (
            <BlogCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const pageRef = useRef(null);

  usePageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <HeroSection />
      <TrustBar />
      <Suspense fallback={null}>
        <SavingsSection />
        <HowItWorks />
      </Suspense>
      <Suspense fallback={null}>
        <WhyDerek />
        <AirlineMarquee />
        {hasReviews() && <Testimonials />}
      </Suspense>
      <Suspense fallback={null}>
        <QuoteSection />
      </Suspense>
      <Suspense fallback={null}>
        <DiscoverySection />
        <GuidesSection />
      </Suspense>
      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="container faq-section__layout">
          <div data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Questions travelers ask before booking.</h2>
            <p>Savings, airlines, timing and what happens after you send a request.</p>
          </div>
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>
      <FinalCta quoteHref="#request-form" />
    </div>
  );
}
