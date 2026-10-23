import { airlines } from '../../data/siteData.js';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';

export default function AirlineMarquee({ dark = false }) {
  const { reduced, motionReady } = useMotionPreference();
  const repeated = [...airlines, ...airlines];

  return (
    <div className={`airline-marquee ${dark ? 'airline-marquee--dark' : ''}`} aria-label="Airlines available for itinerary review">
      <div className="airline-marquee__track" style={{ animationPlayState: reduced || !motionReady ? 'paused' : 'running' }}>
        {repeated.map((airline, index) => (
          <span key={`${airline}-${index}`} aria-hidden={index >= airlines.length ? true : undefined}>{airline}</span>
        ))}
      </div>
    </div>
  );
}
