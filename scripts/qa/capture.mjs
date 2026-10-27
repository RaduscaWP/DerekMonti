import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.AUDIT_BASE || 'http://127.0.0.1:4173';
const OUT = path.resolve(process.env.AUDIT_OUT || 'output/playwright/2026-10-23-audit');
await mkdir(OUT, { recursive: true });

const pages = [
  ['home', '/'], ['services', '/services'], ['about', '/about'], ['blog', '/blog'],
  ['article', '/blog/how-to-find-cheap-business-class-flights'],
  ['business-class', '/business-class-flights'], ['first-class', '/first-class-flights'], ['bc-europe', '/business-class-flights/europe'],
  ['last-minute', '/services/last-minute-business-class'], ['complex', '/services/complex-itineraries'], ['advisor', '/services/premium-flight-advisor'],
  ['route-mia-lhr', '/business-class-flights/miami-to-london'], ['route-bos-dxb', '/business-class-flights/boston-to-dubai'],
  ['privacy', '/privacy'], ['terms', '/terms'], ['not-found', '/this-page-does-not-exist'],
];
const pageFilter = process.env.AUDIT_PAGES ? new Set(process.env.AUDIT_PAGES.split(',')) : null;
const viewports = {
  tiny: { width: 320, height: 568, dpr: 2, mobile: true },
  mobile: { width: 390, height: 844, dpr: 3, mobile: true },
  tablet: { width: 768, height: 1024, dpr: 2, mobile: true },
  laptop: { width: 1024, height: 768, dpr: 1, mobile: false },
  desktop: { width: 1440, height: 900, dpr: 1, mobile: false },
  wide: { width: 1920, height: 1080, dpr: 1, mobile: false },
};
const vpFilter = process.env.AUDIT_VIEWPORTS ? new Set(process.env.AUDIT_VIEWPORTS.split(',')) : null;
const fullPageSet = new Set(['mobile', 'desktop']);
const foldOnlyPages = new Set(['home', 'services', 'about', 'blog', 'business-class', 'article', 'route-mia-lhr']);

const browser = await chromium.launch(process.env.AUDIT_CHROME ? { executablePath: process.env.AUDIT_CHROME } : {});
const report = [];

for (const [vpName, vp] of Object.entries(viewports)) {
  if (vpFilter && !vpFilter.has(vpName)) continue;
  const RM = Boolean(process.env.AUDIT_REDUCED); if (RM && !fullPageSet.has(vpName)) continue;
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr, isMobile: vp.mobile && !RM, hasTouch: vp.mobile, reducedMotion: RM ? "reduce" : "no-preference" });
  for (const [name, route] of pages) {
    if (pageFilter && !pageFilter.has(name)) continue;
    if (!fullPageSet.has(vpName) && !foldOnlyPages.has(name)) continue;
    const page = await context.newPage();
    const consoleErrors = [];
    const requests = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consoleErrors.push(`${m.type()}: ${m.text().slice(0, 200)}`); });
    page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${String(e).slice(0, 200)}`));
    page.on('response', async (r) => {
      try {
        const url = r.url(); const type = r.request().resourceType();
        let size = Number(r.headers()['content-length'] || 0);
        if (!size && url.startsWith(BASE)) { try { size = (await r.body()).length; } catch { size = 0; } }
        requests.push({ url: url.replace(BASE, ''), type, status: r.status(), size });
      } catch {}
    });
    const t0 = Date.now();
    const response = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1800);
    const metrics = await page.evaluate(() => {
      const vw = window.innerWidth;
      const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
      const describe = (el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''} "${(el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || '').trim().slice(0, 40)}"`;
      const overflowing = [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return visible(el) && (r.right > vw + 1 || r.left < -1); }).slice(0, 12).map((el) => { const r = el.getBoundingClientRect(); return `${describe(el)} [${Math.round(r.left)}..${Math.round(r.right)}]`; });
      const interactive = [...document.querySelectorAll('a[href], button, input, select, textarea, [role=button], summary')].filter(visible);
      const smallTargets = interactive.filter((el) => { const r = el.getBoundingClientRect(); return r.width < 40 || r.height < 40; }).map((el) => { const r = el.getBoundingClientRect(); return `${describe(el)} ${Math.round(r.width)}x${Math.round(r.height)}`; });
      const textEls = [...document.querySelectorAll('body *')].filter((el) => visible(el) && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1));
      const tiny = textEls.filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12).map((el) => `${describe(el)} ${getComputedStyle(el).fontSize}`);
      const imgs = [...document.images];
      const noAlt = imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.currentSrc.replace(location.origin, ''));
      const oversized = imgs.filter((i) => i.naturalWidth && i.getBoundingClientRect().width > 0 && i.naturalWidth > i.getBoundingClientRect().width * devicePixelRatio * 1.6).map((i) => `${i.currentSrc.replace(location.origin, '')} natural ${i.naturalWidth}x${i.naturalHeight} rendered ${Math.round(i.getBoundingClientRect().width)}px @${devicePixelRatio}x`);
      const headings = [...document.querySelectorAll('h1, h2, h3')].map((h) => `${h.tagName} ${h.innerText.replace(/\s+/g, ' ').trim().slice(0, 90)}`);
      const main = document.querySelector('main') || document.body;
      const words = main.innerText.trim().split(/\s+/).filter(Boolean).length;
      const links = [...document.querySelectorAll('a[href]')];
      const internal = links.filter((a) => a.href.startsWith(location.origin)).length;
      const external = links.filter((a) => !a.href.startsWith(location.origin) && /^https?:/.test(a.href)).map((a) => a.href);
      const hidden = [...document.querySelectorAll('[data-reveal], .hero-enter')].filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.05).length;
      const fonts = [...new Set([...document.querySelectorAll('h1,h2,h3,p,a,button,span,li')].filter(visible).map((el) => getComputedStyle(el).fontFamily.split(',')[0].replace(/"/g, '')))];
      const title = document.title; const desc = document.querySelector('meta[name=description]')?.content || ''; const canonical = document.querySelector('link[rel=canonical]')?.href || ''; const robots = document.querySelector('meta[name=robots]')?.content || '';
      const lang = document.documentElement.lang;
      const h1Count = document.querySelectorAll('h1').length;
      const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent.slice(0, 400));
      const hreflang = [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => `${l.hreflang}=${l.href}`);
      const docHeight = document.documentElement.scrollHeight;
      const foldText = [...document.querySelectorAll('h1, h2, button, a.button, input')].filter((el) => visible(el) && el.getBoundingClientRect().top < window.innerHeight).map(describe).slice(0, 14);
      const headerCta = document.querySelector('.header-cta'); const headerCtaVisible = headerCta ? visible(headerCta) : null;
      const firstFormTop = document.querySelector('form')?.getBoundingClientRect().top ?? null;
      const nav = performance.getEntriesByType('navigation')[0];
      return { vw, scrollWidth: document.documentElement.scrollWidth, overflowing, smallTargetsCount: smallTargets.length, smallTargets: smallTargets.slice(0, 20), tinyTextCount: tiny.length, tinyText: tiny.slice(0, 25), noAlt, oversized: oversized.slice(0, 12), headings, words, internal, external, hiddenAfterLoad: hidden, fonts, title, desc, descLength: desc.length, titleLength: title.length, canonical, robots, lang, h1Count, jsonld, hreflang, docHeight, foldText, headerCtaVisible, firstFormTop, timing: nav ? { dcl: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd), transfer: nav.transferSize } : null };
    });
    const lcp = await page.evaluate(() => new Promise((resolve) => { let v = 0; try { const po = new PerformanceObserver((l) => { for (const e of l.getEntries()) v = e.startTime; }); po.observe({ type: 'largest-contentful-paint', buffered: true }); setTimeout(() => { po.disconnect(); resolve(Math.round(v)); }, 800); } catch { resolve(null); } }));
    const cls = await page.evaluate(() => new Promise((resolve) => { let v = 0; try { const po = new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) v += e.value; }); po.observe({ type: 'layout-shift', buffered: true }); setTimeout(() => { po.disconnect(); resolve(Number(v.toFixed(3))); }, 500); } catch { resolve(null); } }));
    const totalBytes = requests.reduce((s, r) => s + (r.size || 0), 0);
    const byType = {};
    for (const r of requests) byType[r.type] = (byType[r.type] || 0) + (r.size || 0);
    const file = `${name}-${vpName}${process.env.AUDIT_REDUCED ? "-rm" : ""}`;
    await page.screenshot({ path: path.join(OUT, `${file}-fold.png`) });
    let hiddenAfterScroll = null;
    if (fullPageSet.has(vpName)) {
      await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); } window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 500)); });
      await page.waitForTimeout(900);
      hiddenAfterScroll = await page.evaluate(() => [...document.querySelectorAll("[data-reveal], .hero-enter")].filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.05).map((el) => el.tagName.toLowerCase() + "." + String(el.className).split(" ")[0] + " " + (el.innerText || "").trim().slice(0, 40)));
      await page.screenshot({ path: path.join(OUT, `${file}-full.png`), fullPage: true });
    }
    report.push({ page: name, route, viewport: vpName, hiddenAfterScroll, status: response?.status(), elapsedMs: Date.now() - t0, lcp, cls, totalBytes, byType, requestCount: requests.length, largest: requests.sort((a, b) => b.size - a.size).slice(0, 6), consoleErrors: consoleErrors.slice(0, 10), ...metrics });
    console.log(`${file}: status ${response?.status()} overflow ${metrics.scrollWidth > metrics.vw ? 'YES ' + metrics.scrollWidth : 'no'} small-targets ${metrics.smallTargetsCount} tiny-text ${metrics.tinyTextCount} hidden ${metrics.hiddenAfterLoad}/${hiddenAfterScroll ? hiddenAfterScroll.length : "-"} lcp ${lcp} cls ${cls} bytes ${Math.round(totalBytes / 1024)}KB errors ${consoleErrors.length}`);
    await page.close();
  }
  await context.close();
}
await browser.close();
await writeFile(path.join(OUT, process.env.AUDIT_REDUCED ? 'metrics-rm.json' : 'metrics.json'), JSON.stringify(report, null, 2));
console.log('done');
