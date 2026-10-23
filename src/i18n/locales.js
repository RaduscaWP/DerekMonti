export const LOCALES = Object.freeze([
  { code: 'en', label: 'English', root: '/', openGraph: 'en_US' },
  { code: 'ro', label: 'Română', root: '/ro', openGraph: 'ro_RO' },
  { code: 'ru', label: 'Русский', root: '/ru', openGraph: 'ru_RU' },
  { code: 'de', label: 'Deutsch', root: '/de', openGraph: 'de_DE' },
]);

// Only real translated pages appear here. Planning/article paths are added
// when their complete content and request journey have passed review.
export const contentRoutes = Object.freeze([
  { id: 'home', paths: { en: '/', ro: '/ro', ru: '/ru', de: '/de' } },
  { id: 'services', paths: { en: '/services', ro: '/ro/servicii', ru: '/ru/uslugi', de: '/de/leistungen' } },
  { id: 'about', paths: { en: '/about', ro: '/ro/despre-derek', ru: '/ru/o-dereke', de: '/de/ueber-derek' } },
  { id: 'privacy', paths: { en: '/privacy', ro: '/ro/confidentialitate', ru: '/ru/konfidencialnost', de: '/de/datenschutz' } },
  { id: 'terms', paths: { en: '/terms', ro: '/ro/termeni', ru: '/ru/usloviya', de: '/de/nutzungsbedingungen' } },
]);

function normalizedPath(path) {
  const pathname = new URL(path || '/', 'https://www.flywithderek.com').pathname;
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
}

export function localeFromPath(path) {
  const prefix = normalizedPath(path).split('/')[1];
  return LOCALES.some(({ code }) => code !== 'en' && code === prefix) ? prefix : 'en';
}

export function contentEntityForPath(path) {
  const pathname = normalizedPath(path);
  return contentRoutes.find(({ paths }) => Object.values(paths).includes(pathname)) || null;
}

export function getLocalizedPath(path, locale = 'en') {
  if (!LOCALES.some(({ code }) => code === locale)) return null;
  return contentEntityForPath(path)?.paths[locale] || null;
}

export function localePath(path, locale = 'en') {
  if (!path || /^[#?]/.test(path) || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path;
  const url = new URL(path, 'https://www.flywithderek.com');
  const translatedPath = getLocalizedPath(url.pathname, locale);
  return `${translatedPath || url.pathname}${url.search}${url.hash}`;
}

export function localeDetails(locale) {
  return LOCALES.find(({ code }) => code === locale) || LOCALES[0];
}
