// Renders favicon PNGs and the social-share image with the Playwright Chromium already in
// devDependencies. Usage: node scripts/generate-icons.mjs
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const browser = await chromium.launch(process.env.AUDIT_CHROME ? { executablePath: process.env.AUDIT_CHROME } : {});

const iconMarkup = (size) => `<!doctype html><html><head><style>
  html,body{margin:0;background:transparent}
  .mark{width:${size}px;height:${size}px;border-radius:${Math.round(size * 0.22)}px;background:#0B1929;display:grid;place-items:center;font-family:'Syne','Segoe UI',Arial,sans-serif;font-weight:800;color:#fff;letter-spacing:-0.04em;font-size:${Math.round(size * 0.46)}px;line-height:1}
  .mark span{color:#8A194F}
</style></head><body><div class="mark">D<span>M</span></div></body></html>`;

const icons = [
  ['favicon-32.png', 32],
  ['favicon-192.png', 192],
  ['favicon-512.png', 512],
  ['apple-touch-icon.png', 180],
];

for (const [name, size] of icons) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(iconMarkup(size));
  const buffer = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  await writeFile(path.join(publicDir, name), buffer);
  console.log(`public/${name} ${Math.round(buffer.length / 1024)} KB`);
  await page.close();
}

// Default 1200x630 social card.
const ogDir = path.join(publicDir, 'images', 'og');
await mkdir(ogDir, { recursive: true });
const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await ogPage.setContent(`<!doctype html><html><head><style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:'Syne','Segoe UI',Arial,sans-serif}
  .card{position:relative;width:1200px;height:630px;background:linear-gradient(135deg,#0B1929 0%,#08101A 100%);color:#fff;padding:72px 80px;box-sizing:border-box}
  .card::after{content:'';position:absolute;right:-120px;top:-120px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(138,25,79,.55),transparent 65%)}
  .brand{font-size:30px;font-weight:700;letter-spacing:-.02em}
  .brand span{color:#F4B5CF}
  h1{margin:110px 0 0;font-size:72px;line-height:1;letter-spacing:-.04em;font-weight:800;max-width:900px}
  h1 small{display:block;font-size:40px;font-weight:600;margin-top:16px;color:rgba(255,255,255,.85)}
  .meta{position:absolute;left:80px;bottom:64px;font-family:'DM Sans','Segoe UI',Arial,sans-serif;font-size:26px;color:rgba(255,255,255,.8)}
  .meta strong{color:#fff}
</style></head><body><div class="card"><div class="brand">Fly with <span>Derek</span></div><h1>Business &amp; First Class tickets<small>at insider prices, sourced personally.</small></h1><div class="meta"><strong>Derek Monti</strong> · Personal flight advisor · Miami · +1 (786) 706-4828</div></div></body></html>`);
const ogBuffer = await ogPage.screenshot({ type: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await writeFile(path.join(ogDir, 'default.jpg'), ogBuffer);
console.log(`public/images/og/default.jpg ${Math.round(ogBuffer.length / 1024)} KB`);
await ogPage.close();
await browser.close();
