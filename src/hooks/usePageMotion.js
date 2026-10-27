import { useEffect } from 'react';
import { isInViewport, loadGsap, prefersReducedMotion } from '../utils/motion.js';

export function usePageMotion(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    if (prefersReducedMotion()) {
      scope.querySelectorAll('[data-reveal]').forEach((element) => {
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      });
      return undefined;
    }

    let cancelled = false;
    let cleanup = null;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          // Content already on screen stays put; only what scrolls in later is revealed.
          if (isInViewport(element)) return;
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
      cleanup = () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, [scopeRef]);
}
