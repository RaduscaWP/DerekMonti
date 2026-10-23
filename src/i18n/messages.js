import { translations as home } from './homeCopy.js';
import { translations as pages } from './pageCopy.js';
import { translations as forms } from './formCopy.js';
import { translations as legal } from './legalCopy.js';
import { translations as priority } from './priorityCopy.js';

export const messages = Object.freeze(Object.fromEntries(['en', 'ro', 'ru', 'de'].map((locale) => [
  locale, Object.freeze({ ...home[locale], ...pages[locale], ...forms[locale], ...legal[locale], ...priority[locale] }),
])));

const missingTranslations = new Set();

export function resetTranslationAudit() {
  missingTranslations.clear();
}

export function getMissingTranslations() {
  return [...missingTranslations].sort();
}

export function createTranslator(locale = 'en') {
  return function translate(key, englishFallback = key, values = {}) {
    if (locale !== 'en' && !Object.prototype.hasOwnProperty.call(messages[locale] || {}, key)) {
      missingTranslations.add(`${locale}:${key}`);
    }
    const source = messages[locale]?.[key] ?? messages.en[key] ?? englishFallback;
    return String(source).replace(/\{([a-zA-Z\d_]+)\}/g, (match, name) => (
      Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match
    ));
  };
}
