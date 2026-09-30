import { track } from '@vercel/analytics';

const EVENTS = new Set(['quote_form_view', 'quote_form_start', 'quote_form_step_complete', 'quote_form_validation_error', 'quote_form_submit', 'quote_form_success', 'quote_form_server_error', 'contact_method_click', 'journey_select', 'comfort_select', 'comparison_view', 'article_read']);
const VALUES = {
  trip_type: ['round_trip', 'one_way', 'multi_city'],
  cabin: ['business', 'first', 'premium_economy', 'mixed'],
  step: ['journey', 'preferences', 'contact'],
  field_category: ['journey', 'preferences', 'contact', 'verification'],
  method: ['whatsapp', 'email', 'phone'],
  source: ['homepage', 'services', 'blog'],
  priority: ['rested', 'work', 'together'],
};

// Only categorical values pass this boundary. Trip/contact text never enters analytics.
export function trackEvent(name, properties = {}) {
  if (!EVENTS.has(name) || typeof window === 'undefined') return;
  if (import.meta.env.VITE_ANALYTICS_EVENTS_ENABLED !== 'true') return;
  if (['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) return;
  const safe = Object.fromEntries(Object.entries(properties).filter(([key, value]) => Object.hasOwn(VALUES, key) && VALUES[key].includes(value)));
  try { track(name, safe); } catch { /* Analytics must never interrupt a request. */ }
}
