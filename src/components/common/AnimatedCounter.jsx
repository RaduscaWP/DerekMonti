import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMotionPreference } from '../../context/MotionPreferenceProvider.jsx';

export default function AnimatedCounter({ value, prefix = '', suffix = '', label }) {
  const ref = useRef(null);
  const { reduced, motionReady } = useMotionPreference();
  const target = Number(value);
  const displayValue = Number.isFinite(target) ? target.toLocaleString('en-US') : value;
  const finalText = `${prefix}${displayValue}${suffix}`;

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    element.textContent = finalText;
    if (typeof window === 'undefined' || !motionReady || reduced || !Number.isFinite(target)) return undefined;

    const data = { value: 0 };
    let tween;
    try {
      tween = gsap.to(data, {
        value: target,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 82%', once: true },
        onUpdate: () => {
          element.textContent = `${prefix}${Math.round(data.value).toLocaleString('en-US')}${suffix}`;
        },
        onComplete: () => { element.textContent = finalText; },
      });
    } catch {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      element.textContent = finalText;
    }

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      element.textContent = finalText;
    };
  }, [finalText, motionReady, prefix, reduced, suffix, target]);

  return (
    <div className="counter">
      <strong ref={ref} aria-label={finalText}>{finalText}</strong>
      <span>{label}</span>
    </div>
  );
}
