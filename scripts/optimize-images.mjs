// Converts the Pexels source JPGs (not kept in git; re-download them from the URLs in
// public/images/legacy/sources.json) into 16:9 WebP route-card images (two sizes) using the
// Playwright Chromium already in devDependencies, so no native image library is needed.
// Usage: node scripts/optimize-images.mjs   (set AUDIT_CHROME to a Chromium executable if the
// default Playwright browser is not installed)
import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'public/images/legacy');
const targetDir = path.join(root, 'public/images/routes');

// id -> output name. Only the city/destination photographs are used for cards.
const routeImages = {
  460672: 'london',
  2064827: 'rome',
  109629: 'frankfurt',
  3787839: 'dubai',
  777059: 'tokyo',
  2506923: 'singapore',
  33702740: 'johannesburg',
  29678689: 'cairo',
  28215960: { name: 'paris', focusY: 0.5 },
  3757144: { name: 'madrid', focusY: 0.45 },
  28898468: { name: 'bucharest', focusY: 0.3 },
};

// ONLY=paris,madrid limits the run to those outputs (and skips the cabin/hero jobs).
const only = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null;

const sizes = [
  { suffix: '', width: 1200, height: 675 },
  { suffix: '-600', width: 600, height: 338 },
];

await mkdir(targetDir, { recursive: true });
const browser = await chromium.launch(process.env.AUDIT_CHROME ? { executablePath: process.env.AUDIT_CHROME } : {});
const page = await browser.newPage();

for (const [id, entry] of Object.entries(routeImages)) {
  const name = typeof entry === 'string' ? entry : entry.name;
  const focusY = typeof entry === 'string' ? 0.5 : entry.focusY;
  if (only && !only.has(name)) continue;
  const source = await readFile(path.join(sourceDir, `pexels-${id}.jpg`));
  const dataUrl = `data:image/jpeg;base64,${source.toString('base64')}`;
  for (const size of sizes) {
    const webp = await page.evaluate(async ({ src, width, height, focusY }) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) * focusY, drawWidth, drawHeight);
      return canvas.toDataURL('image/webp', 0.78).split(',')[1];
    }, { src: dataUrl, width: size.width, height: size.height, focusY });
    const output = path.join(targetDir, `${name}${size.suffix}.webp`);
    const bytes = Buffer.from(webp, 'base64');
    await writeFile(output, bytes);
    console.log(`${path.relative(root, output)} ${Math.round(bytes.length / 1024)} KB`);
  }
}

// Hero poster and generic cabin fallback from the cabin photograph.
if (only) {
  await browser.close();
  process.exit(0);
}
const cabin = await readFile(path.join(sourceDir, 'pexels-11757933.jpg'));
const cabinUrl = `data:image/jpeg;base64,${cabin.toString('base64')}`;
for (const job of [
  { output: path.join(root, 'public/images/hero/cabin-poster.webp'), width: 1600, height: 900, quality: 0.72 },
  { output: path.join(targetDir, 'cabin.webp'), width: 1200, height: 675, quality: 0.78 },
]) {
  await mkdir(path.dirname(job.output), { recursive: true });
  const webp = await page.evaluate(async ({ src, width, height, quality }) => {
    const image = new Image();
    image.src = src;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    return canvas.toDataURL('image/webp', quality).split(',')[1];
  }, { src: cabinUrl, width: job.width, height: job.height, quality: job.quality });
  const bytes = Buffer.from(webp, 'base64');
  await writeFile(job.output, bytes);
  console.log(`${path.relative(root, job.output)} ${Math.round(bytes.length / 1024)} KB`);
}

await browser.close();
