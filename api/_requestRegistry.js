import { randomUUID } from 'node:crypto';
import { getRedis, isPublicDeployment, privateDigest, withDeadline } from './_security.js';

export const RECEIPT_TTL_MS = 48 * 60 * 60 * 1000;
// Resend retains keys for 24h. Leave a margin; never replay an unknown send later.
export const PROVIDER_RETRY_WINDOW_MS = 23 * 60 * 60 * 1000;
export const CLAIM_LEASE_MS = 60 * 1000;
const LOCAL_RECORDS = new Map();
export const VALID_REQUEST_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const CLAIM_SCRIPT = `-- quote-claim-v1
local raw = redis.call('GET', KEYS[1])
local record
if raw then
  record = cjson.decode(raw)
  if record.digest ~= ARGV[1] then return {'conflict'} end
  if record.advisorState == 'accepted' then return {'received', raw} end
  if tonumber(ARGV[2]) - record.createdAt >= tonumber(ARGV[3]) then return {'expired'} end
  if record.leaseUntil > tonumber(ARGV[2]) then return {'busy'} end
  record.leaseToken = ARGV[4]
  record.leaseUntil = tonumber(ARGV[2]) + tonumber(ARGV[5])
else
  record = cjson.decode(ARGV[6])
end
local encoded = cjson.encode(record)
redis.call('SET', KEYS[1], encoded, 'PX', tonumber(ARGV[7]) - (tonumber(ARGV[2]) - record.createdAt))
return {'claimed', encoded}`;

export const UPDATE_SCRIPT = `-- quote-update-v1
local raw = redis.call('GET', KEYS[1])
if not raw then return 0 end
local record = cjson.decode(raw)
if record.leaseToken ~= ARGV[1] then return 0 end
local changes = cjson.decode(ARGV[2])
for key, value in pairs(changes) do record[key] = value end
local ttl = redis.call('PTTL', KEYS[1])
if ttl <= 0 then return 0 end
redis.call('SET', KEYS[1], cjson.encode(record), 'PX', ttl)
return 1`;

export function canonicalPayloadDigest(fields) {
  // Normalization supplies a deterministic field order. No token/timer in the binding.
  const { companyWebsite, formStartedAt, ...payload } = fields;
  return privateDigest(JSON.stringify(payload));
}

function parseRecord(result) {
  if (!Array.isArray(result) || !['claimed', 'received', 'conflict', 'busy', 'expired'].includes(result[0])) throw new Error('invalid-registry-result');
  const record = typeof result[1] === 'string' ? JSON.parse(result[1]) : result[1];
  return { status: result[0], record };
}

export function createRequestRegistry(redis = getRedis()) {
  return {
    async claim(requestId, fields, now = Date.now()) {
      const digest = canonicalPayloadDigest(fields);
      const key = `quote:receipt:${requestId}`;
      const leaseToken = randomUUID();
      const record = {
        digest, reference: `DM-${requestId.toUpperCase()}`, issued: new Date(now).toISOString().slice(0, 10),
        submittedAt: new Date(now).toISOString(), createdAt: now,
        advisorState: 'pending', confirmationSent: false, leaseToken, leaseUntil: now + CLAIM_LEASE_MS,
      };
      if (redis) {
        const result = await withDeadline(() => redis.eval(CLAIM_SCRIPT, [key], [digest, now, PROVIDER_RETRY_WINDOW_MS, leaseToken, CLAIM_LEASE_MS, JSON.stringify(record), RECEIPT_TTL_MS]));
        return { ...parseRecord(result), key, leaseToken };
      }
      if (isPublicDeployment()) throw new Error('registry-unavailable');
      for (const [recordKey, entry] of LOCAL_RECORDS) if (now - entry.createdAt >= RECEIPT_TTL_MS) LOCAL_RECORDS.delete(recordKey);
      if (LOCAL_RECORDS.size > 5000) throw new Error('registry-unavailable');
      const existing = LOCAL_RECORDS.get(key);
      if (existing?.digest !== digest && existing) return { status: 'conflict' };
      if (existing?.advisorState === 'accepted') return { status: 'received', record: { ...existing } };
      if (existing && now - existing.createdAt >= PROVIDER_RETRY_WINDOW_MS) return { status: 'expired' };
      if (existing?.leaseUntil > now) return { status: 'busy' };
      const claimed = existing ? { ...existing, leaseToken, leaseUntil: now + CLAIM_LEASE_MS } : record;
      LOCAL_RECORDS.set(key, claimed);
      return { status: 'claimed', record: { ...claimed }, key, leaseToken };
    },
    async update(claim, changes) {
      if (redis) {
        const result = await withDeadline(() => redis.eval(UPDATE_SCRIPT, [claim.key], [claim.leaseToken, JSON.stringify(changes)]));
        if (Number(result) !== 1) throw new Error('registry-claim-lost');
        return;
      }
      if (isPublicDeployment()) throw new Error('registry-unavailable');
      const record = LOCAL_RECORDS.get(claim.key);
      if (!record || record.leaseToken !== claim.leaseToken) throw new Error('registry-claim-lost');
      Object.assign(record, changes);
    },
  };
}
