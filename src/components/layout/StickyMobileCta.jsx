import { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { contactConfig } from '../../data/siteData.js';
import { getWhatsappUrl } from '../../utils/message.js';

const BODY_CLASS = 'has-sticky-cta';
const FORM_ID = 'request-form';
const SUCCESS_CLASS = 'quote-form--success';

/**
 * StickyMobileCta
 *
 * Fixed bottom action bar for viewports <= 940px with three equal buttons:
 * WhatsApp, Call, Get a quote. Hidden while #request-form is in the viewport
 * or while the quote form shows its success state.
 *
 * Side effects (client only):
 *  - adds the class "has-sticky-cta" to <body> while mounted, so the layout
 *    can reserve bottom space (e.g. footer padding) for the bar.
 *
 * Markup is identical on the server and on first client render (bar present,
 * hidden). Visibility is toggled in an effect, so there is no hydration mismatch.
 */
export default function StickyMobileCta() {
  const [quoteHref, setQuoteHref] = useState('/#request-form');
  const [visible, setVisible] = useState(false);

  // Resolve the quote link once the path is known (home page uses an in-page anchor).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    setQuoteHref(path === '/' ? '#request-form' : '/#request-form');
  }, []);

  // Body hook for layout spacing.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.body.classList.add(BODY_CLASS);
    return () => document.body.classList.remove(BODY_CLASS);
  }, []);

  // Visibility: hide while the quote form is on screen or its success state is shown.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    let formInView = false;
    let formSucceeded = false;
    let io = null;
    let mo = null;
    let retryTimer = null;

    const apply = () => setVisible(!formInView && !formSucceeded);

    const checkSuccess = (form) => {
      formSucceeded = Boolean(
        form && (form.classList.contains(SUCCESS_CLASS) || form.querySelector(`.${SUCCESS_CLASS}`)),
      );
    };

    const attach = () => {
      const form = document.getElementById(FORM_ID);
      if (!form) {
        // Not on this page (or not rendered yet): show the bar and retry once the
        // route has had a moment to mount.
        formInView = false;
        formSucceeded = false;
        apply();
        retryTimer = window.setTimeout(attach, 800);
        return;
      }

      checkSuccess(form);
      apply();

      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(
          (entries) => {
            const entry = entries[entries.length - 1];
            formInView = Boolean(entry && entry.isIntersecting);
            apply();
          },
          { threshold: 0.1 },
        );
        io.observe(form);
      }

      if ('MutationObserver' in window) {
        mo = new MutationObserver(() => {
          checkSuccess(form);
          apply();
        });
        mo.observe(form, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
      }
    };

    attach();

    return () => {
      if (retryTimer) window.clearTimeout(retryTimer);
      if (io) io.disconnect();
      if (mo) mo.disconnect();
    };
  }, []);

  const whatsappHref = getWhatsappUrl();
  const phoneHref = `tel:${contactConfig.phoneHref}`;
  const tab = visible ? 0 : -1;

  return (
    <nav
      className={`sticky-cta${visible ? ' is-visible' : ''}`}
      aria-label="Quick contact"
      aria-hidden={visible ? undefined : 'true'}
    >
      <div className="sticky-cta__inner">
        <a
          className="sticky-cta__btn sticky-cta__btn--whatsapp"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tab}
        >
          <MessageCircle aria-hidden="true" size={20} strokeWidth={2} />
          <span>WhatsApp</span>
        </a>
        <a className="sticky-cta__btn sticky-cta__btn--call" href={phoneHref} tabIndex={tab}>
          <Phone aria-hidden="true" size={20} strokeWidth={2} />
          <span>Call</span>
        </a>
        <a className="sticky-cta__btn sticky-cta__btn--quote" href={quoteHref} tabIndex={tab}>
          <span>Get a quote</span>
          <ArrowRight aria-hidden="true" size={20} strokeWidth={2.1} />
        </a>
      </div>
    </nav>
  );
}
