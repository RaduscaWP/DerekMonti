import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createInitialTrip, mergeRestoredTrip, safeTripProgress, TRIP_PROGRESS_STORAGE_KEY } from '../components/homepage/tripState.js';
import { SERVICE_INTENT_OPTIONS, CONVERSION_SOURCES } from '../utils/quoteRequest.js';

const TripBriefContext = createContext(null);

export function TripBriefProvider({ children }) {
  const [trip, commitTrip] = useState(createInitialTrip);
  const current = useRef(trip);
  const dirty = useRef(new Set());
  const restored = useRef(false);
  const suspended = useRef(false);
  const [storageReady, setStorageReady] = useState(false);
  const [step, setStep] = useState(0);

  const setTrip = useCallback((update) => {
    const before = current.current;
    const next = typeof update === 'function' ? update(before) : update;
    for (const key of Object.keys(next)) {
      if (next[key] !== before[key]) dirty.current.add(key);
    }
    current.current = next;
    commitTrip(next);
  }, []);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const stored = JSON.parse(window.sessionStorage.getItem(TRIP_PROGRESS_STORAGE_KEY) || 'null');
      const next = mergeRestoredTrip(current.current, stored, dirty.current);
      current.current = next;
      commitTrip(next);
    } catch { /* Storage is optional. */ }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady || suspended.current) return;
    try { window.sessionStorage.setItem(TRIP_PROGRESS_STORAGE_KEY, JSON.stringify(safeTripProgress(trip))); }
    catch { /* Private browsing may disable storage. */ }
  }, [trip, storageReady]);

  const markConversionSource = useCallback((source) => {
    if (!CONVERSION_SOURCES.includes(source)) return;
    dirty.current.add('source');
    setTrip((value) => ({ ...value, source }));
  }, [setTrip]);

  const selectServiceIntent = useCallback((serviceIntent) => {
    if (serviceIntent !== null && !SERVICE_INTENT_OPTIONS.some(({ value }) => value === serviceIntent)) return;
    dirty.current.add('serviceIntent');
    if (serviceIntent !== null) dirty.current.add('source');
    setTrip((value) => ({ ...value, serviceIntent, ...(serviceIntent === null ? {} : { source: 'services' }) }));
  }, [setTrip]);

  const clearConfirmedDraft = useCallback(() => {
    const next = createInitialTrip();
    suspended.current = true;
    dirty.current = new Set(Object.keys(next));
    current.current = next;
    commitTrip(next);
    setStep(0);
    try { window.sessionStorage.removeItem(TRIP_PROGRESS_STORAGE_KEY); } catch { /* Optional storage. */ }
  }, []);

  const startNewRequest = useCallback(() => {
    const next = createInitialTrip();
    dirty.current = new Set(Object.keys(next));
    suspended.current = false;
    current.current = next;
    commitTrip(next);
    setStep(0);
    try { window.sessionStorage.removeItem(TRIP_PROGRESS_STORAGE_KEY); } catch { /* Optional storage. */ }
  }, []);

  return <TripBriefContext.Provider value={{ trip, step, setStep, setTrip, updateTrip: setTrip, selectServiceIntent, markConversionSource, clearConfirmedDraft, startNewRequest }}>{children}</TripBriefContext.Provider>;
}

export function useTripBrief() {
  const value = useContext(TripBriefContext);
  if (!value) throw new Error('TripBriefProvider is required.');
  return value;
}
