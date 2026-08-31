import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = resolve(here, '..', '.env');

let attempted = false;

export function ensureEnv() {
  if (process.env.RESEND_API_KEY) return;
  try {
    const raw = readFileSync(ENV_PATH, 'utf-8');
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
      }
    }
    attempted = true;
  } catch {
    attempted = true;
  }
}

ensureEnv();
