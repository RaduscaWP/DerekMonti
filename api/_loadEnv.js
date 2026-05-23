import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = resolve(here, '..', '.env');

let loaded = false;

function loadOnce() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = readFileSync(ENV_PATH, 'utf-8');
    let count = 0;
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
      const existing = process.env[key];
      if (key && (existing === undefined || existing === '')) {
        process.env[key] = value;
        count += 1;
      }
    }
    const k = process.env.RESEND_API_KEY;
    const masked = k ? `${k.slice(0, 5)}...${k.slice(-4)}` : 'NOT SET';
    console.log(`[api/_loadEnv] loaded ${count} key(s) from ${ENV_PATH} — RESEND_API_KEY=${masked}`);
  } catch (err) {
    console.log(`[api/_loadEnv] could not read ${ENV_PATH}:`, err.message);
  }
}

loadOnce();
