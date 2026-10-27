// Paint timeline probe: emulates slow 4G + 4x CPU like Lighthouse mobile and prints the
// LCP candidates, paint entries, long tasks and console errors for one URL.
import { chromium } from '@playwright/test';

const BASE = process.env.AUDIT_BASE || 'http://127.0.0.1:4179';
const route = process.env.ROUTE || '/';
const browser = await chromium.launch(process.env.AUDIT_CHROME ? { executablePath: process.env.AUDIT_CHROME } : {});
const context = await browser.newContext({
  viewport: { width: 412, height: 823 },
  deviceScaleFactor: 1.75,
  isMobile: true,
  hasTouch: true,
  javaScriptEnabled: process.env.NO_JS ? false : true,
});
const page = await context.newPage();
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text().slice(0, 240)}`);
});
page.on('pageerror', (e) => errors.push(`pageerror: ${String(e).slice(0, 240)}`));

const cdp = await context.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
});
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

await page.addInitScript(() => {
  window.__probe = { lcp: [], paint: [], longTasks: [] };
  const describe = (el) =>
    el ? `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}` : '(none)';
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__probe.lcp.push({ t: Math.round(e.startTime), size: e.size, el: describe(e.element), url: e.url || '' });
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__probe.paint.push({ name: e.name, t: Math.round(e.startTime) });
  }).observe({ type: 'paint', buffered: true });
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__probe.longTasks.push({ t: Math.round(e.startTime), d: Math.round(e.duration) });
  }).observe({ type: 'longtask', buffered: true });
});

const started = Date.now();
await page.goto(BASE + route, { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(6000);
const probe = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const copy = document.querySelector('.hero__copy, .route-page__lead, h1');
  const cs = copy ? getComputedStyle(copy) : null;
  return {
    ...window.__probe,
    nav: nav ? { ttfb: Math.round(nav.responseStart), domContentLoaded: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd), transfer: nav.transferSize, decoded: nav.decodedBodySize } : null,
    copyStyle: cs ? { opacity: cs.opacity, visibility: cs.visibility, transform: cs.transform, fontFamily: cs.fontFamily.slice(0, 40) } : null,
    fontsReady: document.fonts.status,
    hydrated: Boolean(document.querySelector('#root')?.hasAttribute('data-hydrated')) || null,
  };
});
console.log(JSON.stringify({ route, wallMs: Date.now() - started, ...probe, errors }, null, 1));
await browser.close();
