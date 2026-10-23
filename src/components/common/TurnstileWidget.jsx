import { useEffect, useRef } from 'react';

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise = null;

function loadScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src^="${TURNSTILE_SRC.split('?')[0]}"]`);
    const script = existing || document.createElement('script');
    let timer;
    const cleanup = () => { clearTimeout(timer); script.removeEventListener('load', loaded); script.removeEventListener('error', failed); };
    const failed = () => { cleanup(); script.remove(); reject(new Error('turnstile script unavailable')); };
    const loaded = () => { if (!window.turnstile) return failed(); cleanup(); resolve(window.turnstile); };
    script.addEventListener('load', loaded);
    script.addEventListener('error', failed);
    timer = setTimeout(failed, 8000);
    if (existing) return;
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }).catch((error) => { scriptPromise = null; throw error; });

  return scriptPromise;
}

export default function TurnstileWidget({ siteKey, onToken, onExpire, onError, registerReset, className = '', size = 'normal', language = 'en' }) {
  const hostRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbacksRef = useRef({ onToken, onExpire, onError });
  callbacksRef.current = { onToken, onExpire, onError };

  useEffect(() => {
    if (!siteKey || !hostRef.current) return undefined;

    let cancelled = false;
    let widgetId = null;

    loadScript()
      .then((turnstile) => {
        if (cancelled || !turnstile || !hostRef.current) return;
        widgetId = turnstile.render(hostRef.current, {
          sitekey: siteKey,
          size,
          action: 'quote_request',
          language,
          callback: (token) => callbacksRef.current.onToken?.(token),
          'expired-callback': () => callbacksRef.current.onExpire?.(),
          'error-callback': () => callbacksRef.current.onError?.(),
          theme: 'light',
          appearance: 'always',
        });
        widgetIdRef.current = widgetId;
        registerReset?.(() => {
          if (window.turnstile && widgetId !== null) {
            try {
              window.turnstile.reset(widgetId);
            } catch {
              // ignore
            }
          }
        });
      })
      .catch(() => callbacksRef.current.onError?.());

    return () => {
      cancelled = true;
      if (window.turnstile && widgetId !== null) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // widget already gone
        }
      }
      widgetIdRef.current = null;
      registerReset?.(null);
    };
  }, [siteKey, registerReset, size, language]);

  if (!siteKey) return null;

  return <div ref={hostRef} className={`turnstile-widget ${className}`.trim()} />;
}
