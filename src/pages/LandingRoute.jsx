import { useLocation } from 'react-router-dom';
import { corePages } from '../data/corePages.js';
import { routePages } from '../data/routePages.js';
import CoreLanding from './CoreLanding.jsx';
import NotFound from './NotFound.jsx';
import RouteLanding from './RouteLanding.jsx';

const normalize = (pathname) => pathname.replace(/\/+$/, '') || '/';

// One chunk for every data-driven landing page (service pages, corridors and city pairs).
export default function LandingRoute() {
  const pathname = normalize(useLocation().pathname);

  const core = corePages.find((page) => page.path === pathname);
  if (core) return <CoreLanding page={core} key={core.id} />;

  const route = routePages.find((page) => page.path === pathname);
  if (route) return <RouteLanding page={route} key={route.slug} />;

  return <NotFound />;
}
