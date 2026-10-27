import { chromium } from '@playwright/test';
const BASE = process.env.AUDIT_BASE || 'http://127.0.0.1:4176';
const browser = await chromium.launch(process.env.AUDIT_CHROME ? { executablePath: process.env.AUDIT_CHROME } : {});
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
for (const route of (process.env.ROUTES || "/").split(",")) {
  const page = await context.newPage();
  await page.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(800);
  const rows = await page.evaluate(() => {
    const out = [];
    const main = document.querySelector('main');
    const walk = (el) => {
      for (const child of el.children) {
        const r = child.getBoundingClientRect();
        if (['SECTION', 'HEADER', 'FOOTER', 'DIV', 'NAV'].includes(child.tagName) && r.height > 0) {
          if (child.tagName === 'DIV' && child.children.length && (!child.className || [...child.children].some((c) => c.tagName === 'SECTION'))) { walk(child); continue; }
          out.push(`${Math.round(r.top + window.scrollY)}\t${Math.round(r.height)}\t${child.tagName.toLowerCase()}.${String(child.className).split(' ').slice(0, 2).join('.')}`);
        }
      }
    };
    walk(main);
    const footer = document.querySelector('footer');
    if (footer) { const r = footer.getBoundingClientRect(); out.push(`${Math.round(r.top + window.scrollY)}\t${Math.round(r.height)}\tfooter`); }
    out.push(`total\t${document.documentElement.scrollHeight}`);
    return out;
  });
  console.log(`\n## ${route}\n${rows.join('\n')}`);
  await page.close();
}
await browser.close();
