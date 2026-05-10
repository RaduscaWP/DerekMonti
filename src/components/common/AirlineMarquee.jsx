import { airlines } from '../../data/siteData.js';

export default function AirlineMarquee({ dark = false }) {
  const repeated = [...airlines, ...airlines];

  return (
    <div className={`airline-marquee ${dark ? 'airline-marquee--dark' : ''}`} aria-label="Airlines Derek works with">
      <div className="airline-marquee__track">
        {repeated.map((airline, index) => (
          <span key={`${airline}-${index}`}>{airline}</span>
        ))}
      </div>
    </div>
  );
}
