// Generates responsive WebP variants of Derek's portrait from public/images/derek-monti.jpg
// using the Playwright Chromium already in devDependencies (no native image library needed).
// Usage: node scripts/optimize-portrait.mjs   (set AUDIT_CHROME to a Chromium executable if needed)
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public/images/derek-monti.jpg');
const outputs = [
  { width: 160, quality: 0.84 }, // avatars (56–64px, 2–3x)
  { width: 480, quality: 0.8 },
  { width: 768, quality: 0.8 },
  { width: 1122, quality: 0.78 },
];

const browser = await chromium.launch(process.env.AUDIT_CHROME ? { executablePath: process.env.AUDIT_CHROME } : {});
const page = await browser.newPage();
const dataUrl = `data:image/jpeg;base64,${(await readFile(source)).toString('base64')}`;

for (const { width, quality } of outputs) {
  const webp = await page.evaluate(
    async ({ src, width: targetWidth, quality: targetQuality }) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      const scale = targetWidth / image.naturalWidth;
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = Math.round(image.naturalHeight * scale);
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/webp', targetQuality).split(',')[1];
    },
    { src: dataUrl, width, quality },
  );
  const bytes = Buffer.from(webp, 'base64');
  const output = path.join(root, `public/images/derek-monti-${width}.webp`);
  await writeFile(output, bytes);
  console.log(`${path.relative(root, output)} ${Math.round(bytes.length / 1024)} KB`);
}

await browser.close();
