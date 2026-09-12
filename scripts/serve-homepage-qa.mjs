// Local-only browser fixture. No delivery SDK, provider credentials or outbound calls.
// Serves the production build and exercises its real HTTP adapter against a fake service.
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateQuoteFields } from '../src/utils/quoteRequest.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const evidence = path.join(root, 'qa/homepage-production/browser-request-check.json');
const port = 4175;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webm': 'video/webm', '.mp4': 'video/mp4', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json' };
let attempts = 0;

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  try {
    if (url.pathname === '/api/quote' && req.method === 'POST') {
      let raw = '';
      for await (const chunk of req) { raw += chunk; if (raw.length > 20000) throw new Error('oversize'); }
      const body = JSON.parse(raw);
      const fieldErrors = validateQuoteFields(body);
      res.setHeader('Content-Type', 'application/json');
      if (Object.keys(fieldErrors).length) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Review the highlighted fields.', fieldErrors }));
        return;
      }
      attempts += 1;
      await writeFile(evidence, JSON.stringify({
        fixture: true, outboundDelivery: false, attempts,
        payloadKeys: Object.keys(body), tripType: body.tripType,
        comfortPreference: body.comfortPreference ?? null,
        notes: body.notes, travelers: body.travelers,
        formStartedAtPresent: Number.isFinite(body.formStartedAt),
        honeypotPresent: Object.hasOwn(body, 'companyWebsite'),
        tokenPresent: Object.hasOwn(body, 'turnstileToken'),
        privacyAcknowledged: body.privacyAcknowledged,
      }, null, 2));
      // First valid attempt fails; the retry succeeds with a clearly test-only reference.
      await new Promise(resolve => setTimeout(resolve, 650));
      if (attempts === 1) {
        res.writeHead(503);
        res.end(JSON.stringify({ error: 'The request service is temporarily unavailable. Your entries have been kept.' }));
      } else {
        res.end(JSON.stringify({ ok: true, reference: 'QA-LOCAL-RECEIPT', confirmationSent: false }));
      }
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const decoded = decodeURIComponent(url.pathname);
    if (decoded.includes('\\')) throw new Error('invalid path');
    const relative = decoded === '/' ? 'index.html' : decoded.slice(1);
    let file = path.resolve(dist, relative);
    if (!file.startsWith(dist + path.sep)) throw new Error('invalid path');
    if (!path.extname(file)) file += '.html';
    let content;
    try { content = await readFile(file); }
    catch { file = path.join(dist, '404.html'); content = await readFile(file); res.statusCode = 404; }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch {
    res.writeHead(400); res.end('Invalid local QA request');
  }
}).listen(port, '127.0.0.1', () => console.log(`Local QA fixture: http://127.0.0.1:${port}/ — no external delivery`));
