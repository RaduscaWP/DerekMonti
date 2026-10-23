import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionPreference } from '../context/MotionPreferenceProvider.jsx';

gsap.registerPlugin(ScrollTrigger);

function restoreContent(scope) {
  scope.querySelectorAll('[data-reveal]').forEach((element) => {
    element.style.removeProperty('opacity');
    element.style.removeProperty('transform');
    element.style.removeProperty('visibility');
  });
}

export function usePageMotion(scopeRef) {
  const { reduced, motionReady } = useMotionPreference();
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || typeof window === 'undefined' || !motionReady) return undefined;

    if (reduced) {
      restoreContent(scope);
      return undefined;
    }

    let ctx;
    try {
      ctx = gsap.context(() => {}, scope);
      ctx.add(() => {
        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: Number(element.dataset.revealY || 44),
            opacity: 0,
            duration: Number(element.dataset.revealDuration || 0.75),
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          });
        });
        gsap.utils.toArray('[data-parallax]').forEach((image) => {
          const section = image.closest('section');
          if (!section) return;
          const travel = Math.min(4, Number(image.dataset.parallax || 0.05) * 40);
          gsap.fromTo(image, { yPercent: -travel, scale: 1.09 }, { yPercent: travel, scale: 1.09, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
        });
      });
    } catch {
      try { ctx?.revert(); } catch { /* Motion is optional. */ }
      restoreContent(scope);
    }

    const revealFocused = (event) => {
      let element = event.target instanceof Element ? event.target : null;
      while (element && element !== scope) {
        if (element.hasAttribute('data-reveal')) {
          gsap.killTweensOf(element);
          gsap.set(element, { clearProps: 'transform,opacity' });
        }
        element = element.parentElement;
      }
    };
    scope.addEventListener('focusin', revealFocused);
    return () => {
      scope.removeEventListener('focusin', revealFocused);
      try { ctx?.revert(); } catch { restoreContent(scope); }
      try { ScrollTrigger.refresh(); } catch { /* Navigation stays usable when motion fails. */ }
    };
  }, [scopeRef, reduced, motionReady]);
}
