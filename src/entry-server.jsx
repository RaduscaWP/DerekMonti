import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { pageNameForPath, preloadPage } from './pages/pageLoaders.js';
import { getRouteMetadata } from './seo/routeManifest.js';

export async function render(url) {
  // Page chunks are split per route; load the one this URL needs before rendering.
  await preloadPage(pageNameForPath(url));
  const metadata = getRouteMetadata(url);
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

  return { html, metadata };
}
