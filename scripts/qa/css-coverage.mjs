// CSS coverage across every prerendered route (mobile + desktop, with scroll, menu and FAQ
// interactions). Prints the rules never used on any page so dead CSS can be pruned by hand.
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.AUDIT_BASE || 'http://127.0.0.1:4183';
const OUT = process.env.AUDIT_OUT || 'output/playwright/css-coverage.json';
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.flywithderek\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
routes.push('/privacy', '/terms', '/does-not-exist');

const browser = await chromium.launch(process.env.AUDIT_CHROME ? { executablePath: process.env.AUDIT_CHROME } : {});
const used = new Map(); // css text -> Set of used [start,end]
let cssText = null;

for (const [name, viewport] of [
  ['mobile', { width: 390, height: 844, isMobile: true, hasTouch: true }],
  ['desktop', { width: 1440, height: 900, isMobile: false, hasTouch: false }],
]) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, hasTouch: viewport.hasTouch });
  for (const route of routes) {
    const page = await context.newPage();
    await page.coverage.startCSSCoverage();
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(400);
    // Interactions that reveal state styles.
    for (const selector of ['.navbar__toggle', '.faq-item:nth-child(2) button', '.route-carousel__button', '.service-card__toggle', '.blog-filter button:nth-child(2)']) {
      const el = await page.$(selector);
      if (el) {
        try { await el.click({ timeout: 1000 }); } catch {}
        await page.waitForTimeout(150);
      }
    }
    const closeMenu = await page.$('.mobile-menu__top button');
    if (closeMenu) { try { await closeMenu.click({ timeout: 1000 }); } catch {} }
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await page.waitForTimeout(600);
    const entries = await page.coverage.stopCSSCoverage();
    for (const entry of entries) {
      if (!entry.text || entry.text.length < 20000) continue; // the inlined site stylesheet is the big one
      if (!cssText) cssText = entry.text;
      if (entry.text !== cssText) continue;
      const set = used.get('main') || new Set();
      for (const r of entry.ranges) set.add(`${r.start}-${r.end}`);
      used.set('main', set);
    }
    await page.close();
  }
  await context.close();
  console.log(`${name}: ${routes.length} routes covered`);
}
await browser.close();

// Merge used ranges and find top-level rules (selector + block) never covered.
const ranges = [...(used.get('main') || [])].map((s) => s.split('-').map(Number)).sort((a, b) => a[0] - b[0]);
const isUsed = (start, end) => ranges.some(([a, b]) => a < end && b > start);
const unused = [];
let i = 0;
const text = cssText || '';
while (i < text.length) {
  const open = text.indexOf('{', i);
  if (open < 0) break;
  let selector = text.slice(i, open).trim();
  if (selector.startsWith('@media') || selector.startsWith('@supports') || selector.startsWith('@container')) {
    i = open + 1; // descend into the block
    continue;
  }
  let depth = 1;
  let j = open + 1;
  while (j < text.length && depth > 0) {
    if (text[j] === '{') depth++;
    else if (text[j] === '}') depth--;
    j++;
  }
  if (selector.startsWith('@')) {
    i = j;
    continue;
  }
  const lastClose = selector.lastIndexOf('}');
  if (lastClose >= 0) selector = selector.slice(lastClose + 1).trim();
  if (selector && !isUsed(open, j)) unused.push({ selector, length: j - open });
  i = j;
}
const totalUnused = unused.reduce((sum, r) => sum + r.length, 0);
writeFileSync(OUT, JSON.stringify({ routes: routes.length, cssLength: text.length, unusedBytes: totalUnused, unused }, null, 1));
console.log(`CSS ${text.length} bytes, unused on every page: ${totalUnused} bytes in ${unused.length} rules -> ${OUT}`);
