// GSAP is loaded on demand so it stays out of the main bundle and never delays hydration.
// Every animation effect awaits loadGsap() and bails out if its component unmounted meanwhile.
let gsapPromise = null;

export function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, plugin]) => {
      core.gsap.registerPlugin(plugin.ScrollTrigger);
      return { gsap: core.gsap, ScrollTrigger: plugin.ScrollTrigger };
    });
  }
  return gsapPromise;
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// True when the element is on screen right now: such content has been visible since the
// server HTML arrived, so it must not be hidden again just to animate it in.
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}
