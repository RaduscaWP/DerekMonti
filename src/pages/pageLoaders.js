// Route-level code splitting that works with the prerender pipeline.
// Each page chunk is loaded on demand; the server entry and the client entry preload the
// chunk for the requested URL before rendering, so SSR output and hydration stay identical.

const loaders = {
  Home: () => import('./Home.jsx'),
  Services: () => import('./Services.jsx'),
  About: () => import('./About.jsx'),
  Blog: () => import('./Blog.jsx'),
  BlogArticle: () => import('./BlogArticle.jsx'),
  Privacy: () => import('./Privacy.jsx'),
  Terms: () => import('./Terms.jsx'),
  Landing: () => import('./LandingRoute.jsx'),
  NotFound: () => import('./NotFound.jsx'),
};

const cache = new Map();
const pending = new Map();

export function getLoadedPage(name) {
  return cache.get(name) || null;
}

export function preloadPage(name) {
  if (cache.has(name)) return Promise.resolve(cache.get(name));
  if (!pending.has(name)) {
    const loader = loaders[name] || loaders.NotFound;
    pending.set(
      name,
      loader().then((module) => {
        cache.set(name, module.default);
        pending.delete(name);
        return module.default;
      }),
    );
  }
  return pending.get(name);
}

export function preloadAllPages() {
  return Promise.all(Object.keys(loaders).map(preloadPage));
}

// Mirrors the <Routes> table in App.jsx without importing any page data.
export function pageNameForPath(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  if (path === '/') return 'Home';
  if (path === '/services') return 'Services';
  if (path === '/about') return 'About';
  if (path === '/blog') return 'Blog';
  if (path.startsWith('/blog/')) return 'BlogArticle';
  if (path === '/privacy') return 'Privacy';
  if (path === '/terms') return 'Terms';
  if (
    path === '/business-class-flights' ||
    path.startsWith('/business-class-flights/') ||
    path === '/first-class-flights' ||
    path.startsWith('/services/')
  ) {
    return 'Landing';
  }
  return 'NotFound';
}
