import { Redis } from '@upstash/redis';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const FALLBACK_BUCKETS = globalThis.__derekQuoteRateBuckets || new Map();
globalThis.__derekQuoteRateBuckets = FALLBACK_BUCKETS;

let cachedRedis = null;

function getRedis() {
  if (cachedRedis !== null) return cachedRedis;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    cachedRedis = false;
    return cachedRedis;
  }
  try {
    cachedRedis = new Redis({ url, token });
  } catch {
    cachedRedis = false;
  }
  return cachedRedis;
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (firstForwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

export async function checkRateLimit(req, { key = 'quote', windowMs = 10 * 60 * 1000, max = 8 } = {}) {
  const ip = getClientIp(req);
  const redis = getRedis();

  if (redis) {
    const redisKey = `rl:${key}:${ip}`;
    try {
      const count = await redis.incr(redisKey);
      if (count === 1) {
        await redis.pexpire(redisKey, windowMs);
      }
      return count <= max;
    } catch (error) {
      console.error('[rate-limit] redis error, falling back to memory:', error?.message);
    }
  }

  const now = Date.now();
  const current = FALLBACK_BUCKETS.get(ip);
  if (!current || now - current.startedAt > windowMs) {
    FALLBACK_BUCKETS.set(ip, { startedAt: now, count: 1 });
    return true;
  }
  current.count += 1;
  return current.count <= max;
}

export async function verifyTurnstile(token, req) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    return { ok: true, skipped: true };
  }
  if (!token || typeof token !== 'string') {
    return { ok: false, reason: 'missing-token' };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: getClientIp(req),
    });
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) {
      return { ok: false, reason: `verify-status-${res.status}` };
    }
    const data = await res.json();
    if (!data.success) {
      return { ok: false, reason: (data['error-codes'] || []).join(',') || 'verify-failed' };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error?.message || 'verify-error' };
  }
}
