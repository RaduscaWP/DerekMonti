import { useEffect, useRef } from 'react';
import { isInViewport, loadGsap, prefersReducedMotion } from '../../utils/motion.js';

// en-US keeps the server HTML and the first client render byte-identical
// (a viewer's own locale could otherwise turn "1,800" into "1.800" and break hydration).
function formatValue(number, prefix, suffix) {
  return `${prefix}${Math.round(number).toLocaleString('en-US')}${suffix}`;
}

/**
 * Stat counter.
 * - `display` given: rendered as-is, no animation (for non-numeric stats such as "15–60%").
 * - otherwise: the final value is in the server HTML; in the browser it counts from 0 to
 *   `value` over 2s (power2.out) once the element scrolls into view. A counter that is
 *   already on screen when the script arrives keeps its final value. Reduced motion -> static.
 */
export default function AnimatedCounter({
  value = 0,
  prefix = '',
  suffix = '',
  label,
  display,
  className = '',
}) {
  const valueRef = useRef(null);
  const isStatic = display !== undefined && display !== null;
  const finalText = isStatic ? String(display) : formatValue(value, prefix, suffix);

  useEffect(() => {
    const element = valueRef.current;
    if (isStatic || !element) return undefined;
    if (prefersReducedMotion()) return undefined;

    let cancelled = false;
    let tween = null;

    loadGsap().then(({ gsap }) => {
      if (cancelled || isInViewport(element)) return;
      const counter = { n: 0 };
      element.textContent = formatValue(0, prefix, suffix);
      tween = gsap.to(counter, {
        n: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        onUpdate: () => {
          element.textContent = formatValue(counter.n, prefix, suffix);
        },
        onComplete: () => {
          element.textContent = finalText;
        },
      });
    });

    return () => {
      cancelled = true;
      if (tween) {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
      }
      element.textContent = finalText;
    };
  }, [isStatic, value, prefix, suffix, finalText]);

  return (
    <div className={`stat-counter ${className}`.trim()}>
      <span className="stat-counter__value" ref={valueRef} aria-hidden={isStatic ? undefined : 'true'}>
        {finalText}
      </span>
      {!isStatic && <span className="sr-only">{finalText}</span>}
      {label && <span className="stat-counter__label">{label}</span>}
    </div>
  );
}
