import { createContext, useContext, useEffect, useState } from 'react';

const MotionContext = createContext(null);

export function MotionPreferenceProvider({ children }) {
  const [systemReduced, setSystemReduced] = useState(false);
  const [quietMotion, setQuietMotion] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(query.matches);
    update();
    setMotionReady(true);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return <MotionContext.Provider value={{ reduced: systemReduced || quietMotion, systemReduced, quietMotion, setQuietMotion, motionReady }}>{children}</MotionContext.Provider>;
}

export function useMotionPreference() {
  const value = useContext(MotionContext);
  if (!value) throw new Error('MotionPreferenceProvider is required.');
  return value;
}
