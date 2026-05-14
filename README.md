# Derek Monti Aviation

Premium Vite + React SPA for Derek Monti's business and first class advisory site.

## Local Development

```bash
npm install
npm run dev
```

## Vercel Environment

Set `RESEND_API_KEY` in Vercel as a Sensitive Environment Variable for Production and Preview.

Do not prefix this key with `VITE_`. Vite exposes `VITE_*` variables to the browser bundle, while `RESEND_API_KEY` is used only by the serverless `/api/quote` route.

## Checks

```bash
npm run build
npm audit --audit-level=moderate
```
