import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function usePageMotion(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: Number(element.dataset.revealY || 44),
          opacity: 0,
          duration: Number(element.dataset.revealDuration || 0.75),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
        });
      });
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [scopeRef]);
}
