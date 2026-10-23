import { createHmac } from 'node:crypto';
import { Redis } from '@upstash/redis';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
export const TURNSTILE_ACTION = 'quote_request';
export const RATE_WINDOW_MS = 10 * 60 * 1000;
const LOCAL_BUCKETS = new Map();
const LOCAL_KEY = 'local-development-only-quote-digest';

export function isPublicDeployment() {
  return process.env.NODE_ENV === 'production' || ['production', 'preview'].includes(process.env.VERCEL_ENV);
}

export function getDigestSecret() {
  const secret = process.env.QUOTE_DIGEST_SECRET || '';
  return secret.length >= 32 ? secret : isPublicDeployment() ? null : LOCAL_KEY;
}

export function privateDigest(value) {
  const secret = getDigestSecret();
  if (!secret) throw new Error('digest-configuration-unavailable');
  return createHmac('sha256', secret).update(value).digest('hex');
}

// A timeout bounds waiting; an aborted provider request can still have taken effect.
export async function withDeadline(task, timeoutMs = 5000) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      task(controller.signal),
      new Promise((_, reject) => {
        timer = setTimeout(() => { controller.abort(); reject(new Error('provider-timeout')); }, timeoutMs);
      }),
    ]);
  } finally { clearTimeout(timer); }
}

export function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token, retry: false, enableAutoPipelining: false, signal: () => AbortSignal.timeout(5000) });
  } catch { return null; }
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return String(value || req.socket?.remoteAddress || 'unknown').split(',')[0].trim().slice(0, 128);
}

export const RATE_SCRIPT = `-- quote-rate-v1
local result = {1, 0}
for i, key in ipairs(KEYS) do
  local count = redis.call('INCR', key)
  local ttl = redis.call('PTTL', key)
  if count == 1 or ttl < 0 then
    redis.call('PEXPIRE', key, ARGV[1])
    ttl = tonumber(ARGV[1])
  end
  if count > tonumber(ARGV[i + 1]) then
    result[1] = 0
    result[2] = math.max(result[2], ttl)
  end
end
return result`;

export async function checkRateLimit(req, { recipient = '', redis = getRedis(), windowMs = RATE_WINDOW_MS, max = 8 } = {}) {
  if (!getDigestSecret()) return { ok: false, available: false, retryAfter: 60 };
  const keys = recipient
    ? [`quote:rl:recipient:${privateDigest(recipient)}`, 'quote:rl:dispatch']
    : [`quote:rl:ip:${privateDigest(getClientIp(req))}`];
  const maxima = recipient ? [4, 80] : [max];
  if (redis) {
    try {
      const result = await withDeadline(() => redis.eval(RATE_SCRIPT, keys, [windowMs, ...maxima]));
      if (!Array.isArray(result) || ![0, 1].includes(Number(result[0]))) throw new Error('invalid-rate-result');
      return { ok: Number(result[0]) === 1, available: true, retryAfter: Math.max(1, Math.ceil(Number(result[1] || windowMs) / 1000)) };
    } catch { return { ok: false, available: false, retryAfter: 60 }; }
  }
  // Process memory is deliberately limited to local development, never public intake.
  if (isPublicDeployment()) return { ok: false, available: false, retryAfter: 60 };
  const now = Date.now();
  for (const [key, value] of LOCAL_BUCKETS) if (value.expiresAt <= now) LOCAL_BUCKETS.delete(key);
  if (LOCAL_BUCKETS.size > 5000) return { ok: false, available: false, retryAfter: 60 };
  let ok = true;
  keys.forEach((key, index) => {
    const value = LOCAL_BUCKETS.get(key) || { count: 0, expiresAt: now + windowMs };
    value.count += 1;
    LOCAL_BUCKETS.set(key, value);
    if (value.count > maxima[index]) ok = false;
  });
  return { ok, available: true, retryAfter: Math.ceil(windowMs / 1000) };
}

function configuredOrigins() {
  const values = (process.env.QUOTE_ALLOWED_ORIGINS || 'https://www.flywithderek.com,https://flywithderek.com').split(',');
  if (process.env.VERCEL_URL) values.push(`https://${process.env.VERCEL_URL}`);
  if (!isPublicDeployment()) values.push('http://localhost:5173', 'http://127.0.0.1:5173');
  return values.map((value) => { try { return new URL(value.trim()).origin; } catch { return ''; } }).filter(Boolean);
}

export function checkRequestContext(req) {
  const type = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') return { ok: false, status: 415, code: 'JSON_REQUIRED' };
  if (req.headers['sec-fetch-site'] === 'cross-site') return { ok: false, status: 403, code: 'ORIGIN_REJECTED' };
  const origin = req.headers.origin;
  if (origin && (typeof origin !== 'string' || !configuredOrigins().includes(origin))) return { ok: false, status: 403, code: 'ORIGIN_REJECTED' };
  return { ok: true };
}

export async function verifyTurnstile(token, req) {
  const mode = process.env.QUOTE_CHALLENGE_MODE || 'required';
  if (!['required', 'distributed_only'].includes(mode)) return { ok: false, unavailable: true, reason: 'configuration' };
  if (mode === 'distributed_only') {
    // This deliberate mode still requires distributed admission and registry controls.
    if (!getRedis() || !getDigestSecret()) return { ok: false, unavailable: true, reason: 'configuration' };
    return { ok: true, skipped: true };
  }
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return { ok: false, unavailable: true, reason: 'configuration' };
  if (isPublicDeployment() && !process.env.VITE_TURNSTILE_SITE_KEY) return { ok: false, unavailable: true, reason: 'configuration' };
  if (typeof token !== 'string' || !token || token.length > 2048) return { ok: false, reason: 'invalid-token' };
  const hosts = (process.env.TURNSTILE_EXPECTED_HOSTNAMES || configuredOrigins().map((origin) => new URL(origin).hostname).join(',')).split(',').map((host) => host.trim());
  try {
    return await withDeadline(async (signal) => {
      const response = await fetch(VERIFY_URL, {
        method: 'POST', signal,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token, remoteip: getClientIp(req) }),
      });
      if (!response.ok) return { ok: false, unavailable: true, reason: 'verify-unavailable' };
      const result = await response.json();
      if (result?.success !== true) return { ok: false, reason: 'verify-failed' };
      if (result.action !== TURNSTILE_ACTION || !hosts.includes(result.hostname)) return { ok: false, reason: 'context-mismatch' };
      return { ok: true };
    });
  } catch { return { ok: false, unavailable: true, reason: 'verify-unavailable' }; }
}
