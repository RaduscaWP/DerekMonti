import { BadgeCheck, Clock3, Headset, Route, Tag, UserRound } from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter.jsx';
import { imagery, stats, whyDerek } from '../../data/siteData.js';

const ICONS = {
  tag: Tag,
  clock: Clock3,
  route: Route,
  user: UserRound,
  headset: Headset,
  badge: BadgeCheck,
};

export default function WhyDerek() {
  return (
    <section className="why" id="why-derek" aria-labelledby="why-derek-title">
      <div className="container why__inner">
        <div className="why__intro" data-reveal>
          <p className="eyebrow">Why book with Derek</p>
          <h2 className="why__title" id="why-derek-title">
            Why my clients stop booking on airline websites.
          </h2>
          <p className="why__lead">
            I spend my days inside the fare systems the airline websites never show you. Tell me
            where you are flying and I will find the seat, the price and the ticket rules that
            actually fit your trip.
          </p>

          <div className="why__person">
            <img
              className="why__avatar"
              src={imagery.derekAvatar}
              alt="Derek Monti"
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
            />
            <div className="why__person-text">
              <strong className="why__person-name">Derek Monti</strong>
              <span className="why__person-role">Personal flight advisor, Miami</span>
            </div>
          </div>

          <ul className="why__stats" aria-label="Key figures">
            <li className="why__stat">
              <AnimatedCounter value={20} suffix="+" label={stats.clientsLabel} />
            </li>
            <li className="why__stat">
              <AnimatedCounter display={stats.savings} label={stats.savingsLabel} />
            </li>
            <li className="why__stat">
              <AnimatedCounter display={stats.support} label={stats.supportLabel} />
            </li>
          </ul>
        </div>

        <ul className="why__list">
          {whyDerek.map((item) => {
            const Icon = ICONS[item.icon] || Tag;
            return (
              <li className="why__item" key={item.title} data-reveal data-reveal-y="28">
                <Icon className="why__icon" aria-hidden="true" size={22} strokeWidth={1.9} />
                <h3 className="why__item-title">{item.title}</h3>
                <p className="why__item-body">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
