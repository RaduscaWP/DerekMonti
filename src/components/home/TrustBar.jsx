import { contactConfig, trustMarks } from '../../data/siteData';

const GOOGLE_STAR = '#FBBC04';
const TRUSTPILOT_GREEN = '#00B67A';

function Star({ fill, size = 14 }) {
  return (
    <svg
      className="trust__star"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.6l2.9 6.05 6.6.86-4.84 4.6 1.23 6.56L12 17.5l-5.89 3.17 1.23-6.56L2.5 9.51l6.6-.86L12 2.6z"
        fill={fill}
      />
    </svg>
  );
}

function StarRow({ fill, boxed = false }) {
  return (
    <span className={`trust__stars${boxed ? ' trust__stars--boxed' : ''}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) =>
        boxed ? (
          <span key={index} className="trust__star-box" style={{ background: fill }}>
            <Star fill="#fff" size={11} />
          </span>
        ) : (
          <Star key={index} fill={fill} />
        ),
      )}
    </span>
  );
}

function Wordmark({ id }) {
  switch (id) {
    case 'google':
      return (
        <span className="trust__mark trust__mark--google">
          <span className="trust__mark-text">Google</span>
          <StarRow fill={GOOGLE_STAR} />
        </span>
      );
    case 'trustpilot':
      return (
        <span className="trust__mark trust__mark--trustpilot">
          <StarRow fill={TRUSTPILOT_GREEN} boxed />
          <span className="trust__mark-text">Trustpilot</span>
        </span>
      );
    case 'bbb':
      return (
        <span className="trust__mark trust__mark--bbb">
          <span className="trust__badge">BBB</span>
          <span className="trust__mark-text">Better Business Bureau</span>
        </span>
      );
    case 'arc':
      return (
        <span className="trust__mark trust__mark--arc">
          <span className="trust__badge trust__badge--outline">ARC</span>
          <span className="trust__mark-text">Airlines Reporting Corp.</span>
        </span>
      );
    default:
      return (
        <span className="trust__mark">
          <span className="trust__mark-text">{id}</span>
        </span>
      );
  }
}

export default function TrustBar() {
  const marks = trustMarks.filter((mark) => mark.verified === true);
  if (marks.length === 0) return null;

  const { agency } = contactConfig;

  return (
    <section className="trust" aria-labelledby="trust-heading">
      <div className="container">
        <h2 id="trust-heading" className="sr-only">
          Ratings and accreditation
        </h2>

        <ul className="trust__grid" data-reveal data-reveal-y="24">
          {marks.map((mark) => (
            <li key={mark.id} className="trust__item">
              <a
                className="trust__cell"
                href={mark.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${mark.label}: ${mark.value}, ${mark.note} (opens in a new tab)`}
              >
                <Wordmark id={mark.id} />
                <span className="trust__value">{mark.value}</span>
                <span className="trust__note">{mark.note}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="trust__attribution" data-reveal data-reveal-y="16">
          Tickets are issued through{' '}
          <a href={agency.url} target="_blank" rel="noopener noreferrer">
            {agency.name}
          </a>
          , an {agency.accreditation}.
        </p>
      </div>
    </section>
  );
}
