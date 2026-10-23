import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createInitialTrip, createTripSubmissionController, isTripSubmissionLocked, mergeRestoredTrip, readTripProgress, safeTripProgress, TRIP_PROGRESS_STORAGE_KEY, LEGACY_TRIP_PROGRESS_STORAGE_KEY } from '../components/homepage/tripState.js';
import { SERVICE_INTENT_OPTIONS, CONVERSION_SOURCES } from '../utils/quoteRequest.js';

const TripBriefContext = createContext(null);

export function TripBriefProvider({ children }) {
  const [trip, commitTrip] = useState(createInitialTrip);
  const current = useRef(trip);
  const dirty = useRef(new Set());
  const restored = useRef(false);
  const suspended = useRef(false);
  const [storageReady, setStorageReady] = useState(false);
  const [step, commitStep] = useState(0);
  const submissionController = useRef(null);
  if (!submissionController.current) submissionController.current = createTripSubmissionController();
  const controller = submissionController.current;
  const submission = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
  const setStep = useCallback((next) => {
    if (!isTripSubmissionLocked(controller.getSnapshot())) commitStep(next);
  }, [controller]);

  const setTrip = useCallback((update) => {
    if (isTripSubmissionLocked(controller.getSnapshot())) return;
    const before = current.current;
    const next = typeof update === 'function' ? update(before) : update;
    for (const key of Object.keys(next)) {
      if (next[key] !== before[key]) dirty.current.add(key);
    }
    current.current = next;
    commitTrip(next);
  }, [controller]);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const stored = readTripProgress(window.sessionStorage);
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
    if (isTripSubmissionLocked(controller.getSnapshot())) return;
    if (!CONVERSION_SOURCES.includes(source)) return;
    dirty.current.add('source');
    setTrip((value) => ({ ...value, source }));
  }, [setTrip, controller]);

  const selectServiceIntent = useCallback((serviceIntent) => {
    if (isTripSubmissionLocked(controller.getSnapshot())) return;
    if (serviceIntent !== null && !SERVICE_INTENT_OPTIONS.some(({ value }) => value === serviceIntent)) return;
    dirty.current.add('serviceIntent');
    if (serviceIntent !== null) dirty.current.add('source');
    setTrip((value) => ({ ...value, serviceIntent, ...(serviceIntent === null ? {} : { source: 'services' }) }));
  }, [setTrip, controller]);

  const clearConfirmedDraft = useCallback(() => {
    const next = createInitialTrip();
    suspended.current = true;
    dirty.current = new Set(Object.keys(next));
    current.current = next;
    commitTrip(next);
    commitStep(0);
    try {
      window.sessionStorage.removeItem(TRIP_PROGRESS_STORAGE_KEY);
      window.sessionStorage.removeItem(LEGACY_TRIP_PROGRESS_STORAGE_KEY);
    } catch { /* Optional storage. */ }
  }, []);

  const startNewRequest = useCallback(() => {
    if (!controller.reset()) return;
    const next = createInitialTrip();
    dirty.current = new Set(Object.keys(next));
    suspended.current = false;
    current.current = next;
    commitTrip(next);
    commitStep(0);
    try {
      window.sessionStorage.removeItem(TRIP_PROGRESS_STORAGE_KEY);
      window.sessionStorage.removeItem(LEGACY_TRIP_PROGRESS_STORAGE_KEY);
    } catch { /* Optional storage. */ }
  }, [controller]);

  const submitRequest = useCallback(async (options) => {
    commitStep(2);
    const receipt = await controller.submit(current.current, options);
    // The provider remains mounted across routes, so a late accepted receipt
    // clears the saved draft and remains available when the form returns.
    clearConfirmedDraft();
    return receipt;
  }, [controller, clearConfirmedDraft]);

  return <TripBriefContext.Provider value={{ trip, step, setStep, setTrip, updateTrip: setTrip, selectServiceIntent, markConversionSource, clearConfirmedDraft, startNewRequest, submission, submitRequest, clearSubmissionError: controller.clearError }}>{children}</TripBriefContext.Provider>;
}

export function useTripBrief() {
  const value = useContext(TripBriefContext);
  if (!value) throw new Error('TripBriefProvider is required.');
  return value;
}
