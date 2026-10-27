import { useEffect, useReducer, useRef } from 'react';
import { getLoadedPage, preloadPage } from './pageLoaders.js';

export const PAGE_READY_EVENT = 'fly-with-derek:page-ready';

// Renders a page chunk from the loader cache. During prerender and on first load the chunk
// is preloaded, so the synchronous lookup succeeds; on in-app navigation it loads on demand.
export default function LazyPage({ name }) {
  const loaded = getLoadedPage(name);
  const [, rerender] = useReducer((count) => count + 1, 0);
  const wasLoadingRef = useRef(!loaded);

  useEffect(() => {
    if (loaded) return undefined;
    let cancelled = false;
    preloadPage(name).then(() => {
      if (!cancelled) rerender();
    });
    return () => {
      cancelled = true;
    };
  }, [name, loaded]);

  useEffect(() => {
    if (loaded && wasLoadingRef.current) {
      wasLoadingRef.current = false;
      window.dispatchEvent(new CustomEvent(PAGE_READY_EVENT));
    }
    if (!loaded) wasLoadingRef.current = true;
  }, [loaded]);

  if (!loaded) {
    return <div className="page-loading" aria-busy="true" style={{ minHeight: '100vh' }} />;
  }

  const Page = loaded;
  return <Page />;
}
