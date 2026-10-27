import { airlines } from '../../data/siteData.js';

const LABEL = 'Airlines my clients fly with';

/**
 * Full-width strip of airline wordmarks in a seamless CSS marquee.
 * The list is rendered twice so `translateX(-50%)` loops without a seam;
 * the second copy is aria-hidden and hidden under prefers-reduced-motion,
 * where the track becomes a static wrapped row instead.
 * Pure markup — no window/document access, so it renders identically on the server.
 */
export default function AirlineMarquee({ dark = false }) {
  const copies = [airlines, airlines];
  const sectionClass = dark ? 'airline-marquee airline-marquee--dark' : 'airline-marquee';

  return (
    <section className={sectionClass} aria-label={LABEL}>
      <div className="container airline-marquee__inner" data-reveal data-reveal-y="24">
        <p className="airline-marquee__label">{LABEL}</p>

        <div
          className="airline-marquee__viewport"
          role="group"
          aria-label="Scrolling list of airlines. Hover or focus to pause."
          tabIndex={0}
        >
          <ul className="airline-marquee__track" role="list">
            {copies.map((list, copyIndex) =>
              list.map((name, index) => {
                const isDuplicate = copyIndex > 0;
                const isLast = index === list.length - 1;
                let itemClass = 'airline-marquee__item';
                if (isDuplicate) itemClass += ' airline-marquee__item--dup';
                if (isLast) itemClass += ' airline-marquee__item--last';

                return (
                  <li
                    key={`${copyIndex}-${name}`}
                    className={itemClass}
                    aria-hidden={isDuplicate ? 'true' : undefined}
                  >
                    {name}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
