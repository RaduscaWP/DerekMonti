// Synthetic provider fixtures only. This module never performs network requests.
export class SyntheticRedis {
  constructor({ now = () => Date.now() } = {}) { this.now = now; this.entries = new Map(); this.commands = []; this.fail = false; }
  get(key) {
    const entry = this.entries.get(key);
    if (entry && entry.expiresAt !== null && entry.expiresAt <= this.now()) { this.entries.delete(key); return null; }
    return entry;
  }
  async eval(script, keys, args) {
    this.commands.push({ script, keys, args });
    if (this.fail) throw new Error('Synthetic Redis outage');
    if (script.startsWith('-- quote-rate-v1')) {
      let allowed = 1; let wait = 0;
      keys.forEach((key, index) => {
        const entry = this.get(key) || { value: 0, expiresAt: null };
        entry.value += 1;
        if (entry.value === 1 || entry.expiresAt === null) entry.expiresAt = this.now() + Number(args[0]);
        this.entries.set(key, entry);
        if (entry.value > Number(args[index + 1])) { allowed = 0; wait = Math.max(wait, entry.expiresAt - this.now()); }
      });
      return [allowed, wait];
    }
    if (script.startsWith('-- quote-claim-v1')) {
      const [digest, now, retryWindow, leaseToken, leaseMs, candidate, retention] = args;
      const existing = this.get(keys[0]);
      let record = existing ? JSON.parse(existing.value) : JSON.parse(candidate);
      if (existing) {
        if (record.digest !== digest) return ['conflict'];
        if (record.advisorState === 'accepted') return ['received', existing.value];
        if (Number(now) - record.createdAt >= Number(retryWindow)) return ['expired'];
        if (record.leaseUntil > Number(now)) return ['busy'];
        record = { ...record, leaseToken, leaseUntil: Number(now) + Number(leaseMs) };
      }
      const value = JSON.stringify(record);
      this.entries.set(keys[0], { value, expiresAt: record.createdAt + Number(retention) });
      return ['claimed', value];
    }
    if (script.startsWith('-- quote-update-v1')) {
      const existing = this.get(keys[0]);
      if (!existing) return 0;
      const record = JSON.parse(existing.value);
      if (record.leaseToken !== args[0]) return 0;
      existing.value = JSON.stringify({ ...record, ...JSON.parse(args[1]) });
      return 1;
    }
    throw new Error('Unexpected Redis command');
  }
  async rest(options) {
    const [command, script, count, ...values] = JSON.parse(options.body);
    if (String(command).toLowerCase() !== 'eval') throw new Error('Non-atomic Redis command blocked');
    const result = await this.eval(script, values.slice(0, Number(count)), values.slice(Number(count)));
    // Match Upstash's default encoded REST response, including nested Lua arrays.
    const encode = (value) => typeof value === 'string' ? Buffer.from(value, 'utf8').toString('base64') : Array.isArray(value) ? value.map(encode) : value;
    return Response.json({ result: encode(result) });
  }
}

export function setSyntheticEnvironment() {
  const overrides = {
    RESEND_API_KEY: 're_test_local_only', MAIL_FROM_ADDRESS: 'Derek test <test@example.com>',
    NODE_ENV: 'test', VERCEL_ENV: '', VERCEL_URL: '',
    TURNSTILE_SECRET: 'test_turnstile_secret', VITE_TURNSTILE_SITE_KEY: 'test_public_widget',
    TURNSTILE_EXPECTED_HOSTNAMES: 'www.flywithderek.com', QUOTE_ALLOWED_ORIGINS: 'https://www.flywithderek.com',
    QUOTE_CHALLENGE_MODE: 'required', QUOTE_DIGEST_SECRET: 'synthetic-local-only-digest-key-32-characters',
    UPSTASH_REDIS_REST_URL: '', UPSTASH_REDIS_REST_TOKEN: '', KV_REST_API_URL: '', KV_REST_API_TOKEN: '',
  };
  Object.assign(process.env, overrides);
  return overrides;
}
