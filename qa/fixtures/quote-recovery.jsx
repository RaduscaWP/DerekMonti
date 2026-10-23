// LOCAL TEST FIXTURE ONLY. This file is outside src/public and has no production entry.
// It must never be used to evaluate provider availability or actual mail delivery.
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../src/styles/fonts.css';
import '../../src/i18n/cyrillicFonts.css';
import '../../src/styles/global.scss';

if (!['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) || !window.location.pathname.startsWith('/qa/fixtures/')) {
  throw new Error('The quote recovery fixture is available only on a local QA path.');
}

gsap.registerPlugin(ScrollTrigger);
const originalFetch = window.fetch.bind(window);
const records = [];
const waiting = new Map();
const announce = () => window.dispatchEvent(new Event('local-quote-fixture-change'));

window.fetch = (input, options = {}) => {
  const url = new URL(input instanceof URL ? input.href : typeof input === 'string' ? input : input.url, window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== '/api/quote') return originalFetch(input, options);
  // Always intercept quote traffic before validation; no branch forwards to the API.
  let payload;
  try { payload = JSON.parse(options.body); } catch { return Promise.reject(new Error('Fixture requires JSON')); }
  if (!String(payload.email || '').endsWith('@example.test')) return Promise.reject(new Error('Fixture accepts synthetic example.test email addresses only'));
  const index = records.length + 1;
  records.push({ index, payload, outcome: 'pending' });
  const response = new Promise((resolve) => { waiting.set(index, resolve); });
  announce();
  return response;
};

// A synthetic widget prevents loading or solving a real challenge in this fixture.
let widgetCounter = 0;
const widgets = new Map();
window.turnstile = {
  render(host, options) {
    const id = ++widgetCounter;
    widgets.set(id, options);
    host.textContent = 'LOCAL QA verification supplied. No challenge provider.';
    queueMicrotask(() => widgets.get(id)?.callback?.(`local-qa-token-${id}`));
    return id;
  },
  reset(id) { queueMicrotask(() => widgets.get(id)?.callback?.(`local-qa-token-${id}-retry`)); },
  remove(id) { widgets.delete(id); },
};

function settle(outcome) {
  const pending = waiting.entries().next().value;
  if (!pending) return;
  const [index, resolve] = pending;
  const record = records[index - 1];
  record.outcome = outcome;
  waiting.delete(index);
  resolve(outcome === 'accepted'
    ? Response.json({ ok: true, reference: `DM-${record.payload.requestId.toUpperCase()}`, confirmationSent: true })
    : Response.json({ error: 'Receipt could not be confirmed. Your entries are kept. Retry this same request later or contact Derek about the earlier attempt.', code: 'DELIVERY_UNCONFIRMED' }, { status: 502 }));
  announce();
}

function FixtureControls() {
  const navigate = useNavigate();
  const [, refresh] = useState(0);
  useEffect(() => {
    const changed = () => refresh((value) => value + 1);
    window.addEventListener('local-quote-fixture-change', changed);
    return () => window.removeEventListener('local-quote-fixture-change', changed);
  }, []);
  const button = { padding: '6px 8px', border: '1px solid #fff', borderRadius: 4, background: '#08101A', color: '#fff', fontSize: 11, cursor: 'pointer' };
  return <aside aria-label="Local quote recovery fixture" style={{ position: 'fixed', bottom: 4, left: 4, right: 4, zIndex: 10000, padding: 8, background: '#08101A', border: '2px solid #8A194F', color: '#fff', font: '12px Arial', maxHeight: '28vh', overflow: 'auto' }}>
    <strong>LOCAL QA ONLY · Synthetic quotes · No real API</strong>
    <p style={{ margin: '5px 0' }}>Recorded: {records.length} · Pending: {waiting.size}</p>
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      <button style={button} onClick={() => navigate('/services')}>Fixture: Services</button>
      <button style={button} onClick={() => navigate('/#request-form')}>Fixture: Return Home</button>
      <button style={button} disabled={!waiting.size} onClick={() => settle('accepted')}>Fixture: Accept pending</button>
      <button style={button} disabled={!waiting.size} onClick={() => settle('unknown')}>Fixture: Unknown pending</button>
    </div>
    <details style={{ marginTop: 6 }}><summary>Fixture payload evidence</summary>
      <pre id="local-quote-fixture-evidence" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: 10 }}>{JSON.stringify(records, null, 2)}</pre>
    </details>
  </aside>;
}

const { default: App } = await import('../../src/App.jsx');
createRoot(document.getElementById('root')).render(<MemoryRouter initialEntries={['/#request-form']}><FixtureControls /><App /></MemoryRouter>);
