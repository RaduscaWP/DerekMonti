import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { createTranslator } from './messages.js';
import { localeFromPath, localePath as resolvePath } from './locales.js';

export function useLocale() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  return useMemo(() => ({
    locale,
    t: createTranslator(locale),
    localePath: (path) => resolvePath(path, locale),
  }), [locale]);
}
