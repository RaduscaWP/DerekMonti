import { useEffect, useRef } from 'react';
import { loadGsap, prefersReducedMotion } from '../../utils/motion.js';
import { ClipboardList, Inbox, MessageCircle, PlaneTakeoff } from 'lucide-react';
import { steps } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';

const STEP_ICONS = [MessageCircle, ClipboardList, Inbox, PlaneTakeoff];

// Dash pattern of the connector, in CSS pixels. Keep in sync with _process.scss.
const DASH = 6;
const GAP = 8;

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return undefined;
    if (prefersReducedMotion()) return undefined;

    let cancelled = false;
    let trigger = null;
    let tween = null;

    const reset = () => {
      line.style.opacity = '';
      line.style.strokeDasharray = '';
      line.style.strokeDashoffset = '';
    };

    loadGsap()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        // Hide the connector until the section scrolls into view; the dash pattern is
        // measured at that moment so a resize before then cannot leave a stale length.
        line.style.opacity = '0';

        trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const rect = line.getBoundingClientRect();
            const length =
              typeof line.getTotalLength === 'function'
                ? line.getTotalLength()
                : Math.hypot(rect.width, rect.height);
            if (!length) {
              line.style.opacity = '';
              return;
            }

            // A dashed line cannot be drawn with stroke-dashoffset alone, so the
            // pattern is written out explicitly (dash/gap pairs covering the full
            // length) followed by one gap as long as the line. Sliding the offset
            // from that length down to 0 reveals the dashes from the first step on.
            const unit = DASH + GAP;
            const pairs = Math.ceil(length / unit);
            const dashSum = pairs * unit;
            line.style.strokeDasharray = `${Array(pairs).fill(`${DASH} ${GAP}`).join(' ')} ${dashSum}`;
            line.style.strokeDashoffset = `${dashSum}px`;
            line.style.opacity = '';

            tween = gsap.to(line, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: 'power2.inOut',
              onComplete: () => {
                // Hand the pattern back to the stylesheet so later resizes stay clean.
                line.style.strokeDasharray = '';
                line.style.strokeDashoffset = '';
              },
            });
          },
        });
      })
      .catch(reset);

    return () => {
      cancelled = true;
      if (trigger) trigger.kill();
      if (tween) tween.kill();
      reset();
    };
  }, []);

  return (
    <section className="how-it-works" id="how-it-works" aria-labelledby="how-it-works-title" ref={sectionRef}>
      <div className="container">
        <div className="how-it-works__header" data-reveal>
          <p className="how-it-works__eyebrow">How it works</p>
          <h2 id="how-it-works-title">From message to boarding pass in four steps.</h2>
        </div>

        <ol className="how-it-works__steps">
          <svg className="how-it-works__track" aria-hidden="true" focusable="false">
            <line ref={lineRef} x1="0" y1="0" x2="100%" y2="100%" />
          </svg>

          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] || MessageCircle;
            const number = String(index + 1).padStart(2, '0');
            return (
              <li className="how-it-works__step" key={step.title} data-reveal data-reveal-y="32">
                <span className="how-it-works__marker">
                  <Icon aria-hidden="true" size={26} strokeWidth={1.9} />
                </span>
                <div className="how-it-works__body">
                  <p className="how-it-works__label">Step {number}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="how-it-works__links" data-reveal data-reveal-y="24">
          <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            Message me on WhatsApp
          </a>
          <span aria-hidden="true">or</span>
          <a href="#request-form">Get a quote</a>
        </p>
      </div>
    </section>
  );
}
