import RouteCarousel from '../common/RouteCarousel.jsx';
import { methodology, routeDeals, routeDealsNote } from '../../data/siteData.js';

export default function SavingsSection() {
  return (
    <section className="savings" id="savings" aria-labelledby="savings-title">
      <div className="container">
        <header className="savings__header" data-reveal>
          <p className="savings__eyebrow">Smart savings</p>
          <h2 id="savings-title">Save more. Fly better.</h2>
          <p className="savings__intro">
            Consolidator fares put business and first class within reach. These are real-world examples of
            what my clients pay next to the airline&rsquo;s published price.
          </p>
        </header>

        <div className="savings__carousel" data-reveal data-reveal-y="32">
          <RouteCarousel deals={routeDeals} />
        </div>

        <p className="savings__note">{routeDealsNote}</p>

        <div className="savings__method" data-reveal>
          <h3 className="savings__method-title">How the numbers work</h3>
          <dl className="savings__method-grid">
            {methodology.map((item) => (
              <div className="savings__method-item" key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
