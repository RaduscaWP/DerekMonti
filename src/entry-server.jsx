import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { getRouteMetadata } from './seo/routeManifest.js';

export function render(url) {
  const metadata = getRouteMetadata(url);
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

  return { html, metadata };
}
