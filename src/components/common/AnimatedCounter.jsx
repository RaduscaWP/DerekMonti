import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedCounter({ value, prefix = '', suffix = '', label }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const target = Number(value);
    const data = { value: 0 };

    const tween = gsap.to(data, {
      value: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 82%',
        once: true,
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(data.value).toLocaleString()}${suffix}`;
      },
    });

    return () => tween.kill();
  }, [prefix, suffix, value]);

  return (
    <div className="counter">
      <strong ref={ref}>
        {prefix}
        {value}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}
