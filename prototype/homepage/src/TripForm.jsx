import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, CheckCircle2, ChevronRight, LoaderCircle, Moon, Pencil, Plane, Plus, Trash2, Users } from 'lucide-react';
import {
  addTripLeg,
  CABIN_OPTIONS,
  changeTripType,
  COMFORT_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  fieldStep,
  FLEXIBILITY_OPTIONS,
  getCabinLabel,
  getContactPreferenceLabel,
  getFlexibilityLabel,
  getTripTypeLabel,
  localTodayIso,
  MAX_TRIP_LEGS,
  removeTripLeg,
  simulateTripSubmission,
  TRIP_TYPE_OPTIONS,
  validateTrip,
  validateTripStep,
} from './tripState.js';
import './trip-form.scss';

const STEPS = ['Your journey', 'Your preferences', 'Contact & review'];
const COMFORT_ICONS = { rested: Moon, work: BriefcaseBusiness, together: Users };
const fieldId = (name) => `trip-field-${name.replaceAll('.', '-')}`;

function fieldLabel(name) {
  const legMatch = /^legs\.(\d+)\.(from|to|departure)$/.exec(name);
  if (legMatch) return `Flight ${Number(legMatch[1]) + 1}: ${{ from: 'from', to: 'to', departure: 'departure date' }[legMatch[2]]}`;
  return ({ from: 'From', to: 'To', departure: 'Departure', returnDate: 'Return', tripType: 'Trip type', legs: 'Flights', travelers: 'Travelers', cabin: 'Cabin', comfort: 'Priority', flexibility: 'Date flexibility', notes: 'Notes', fullName: 'Full name', email: 'Email', phone: 'Phone', contactPreference: 'Contact preference', privacyAcknowledged: 'Privacy acknowledgement' })[name] || name;
}

function formatDate(date) {
  if (!date) return 'Dates to be added';
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime()) || parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) return 'Check this date';
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(parsed);
}

function focusAndReveal(element) {
  if (!element) return;
  element.focus({ preventScroll: true });
  const bounds = element.getBoundingClientRect();
  if (bounds.top < 120 || bounds.bottom > window.innerHeight - 24) {
    element.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
}

function Field({ name, label, error, hint, wide = false, children }) {
  return <div className={`trip-field${wide ? ' trip-field--wide' : ''}`}>
    <label htmlFor={fieldId(name)}>{label}</label>
    {children}
    {hint && <small id={`${fieldId(name)}-hint`} className="trip-field-hint">{hint}</small>}
    {error && <p className="trip-field-error" id={`${fieldId(name)}-error`}>{error}</p>}
  </div>;
}

export default function TripForm({ trip, setTrip, step, setStep }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submissionError, setSubmissionError] = useState('');
  const [scenario, setScenario] = useState('success');
  const [result, setResult] = useState(null);
  const errorRef = useRef(null);
  const headingRef = useRef(null);
  const successRef = useRef(null);
  const previousStep = useRef(step);
  const mounted = useRef(true);
  const submissionLock = useRef(false);
  const latestTrip = useRef(trip);
  const pendingFocus = useRef(null);
  latestTrip.current = trip;
  const today = localTodayIso();
  const busy = status === 'submitting';
  const comfort = COMFORT_OPTIONS.find(({ value }) => value === trip.comfort);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (previousStep.current !== step) {
      previousStep.current = step;
      if (status === 'success') { setStatus('idle'); setResult(null); }
      if (!pendingFocus.current) requestFocus(() => headingRef.current);
    }
  }, [step]);

  useEffect(() => {
    if (status === 'success') requestFocus(() => successRef.current);
  }, [status]);

  // A preference change from the comfort studio invalidates only the old preview.
  useEffect(() => {
    if (status === 'success') {
      setStatus('idle');
      setResult(null);
    }
  }, [trip]); // eslint-disable-line react-hooks/exhaustive-deps

  function requestFocus(getElement) {
    const request = { getElement };
    pendingFocus.current = request;
    requestAnimationFrame(() => {
      if (!mounted.current || pendingFocus.current !== request) return;
      pendingFocus.current = null;
      focusAndReveal(getElement());
    });
  }

  function clearError(name) {
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
    if (status === 'error') { setStatus('idle'); setSubmissionError(''); }
  }

  function update(name, value) {
    setTrip((current) => ({ ...current, [name]: value }));
    clearError(name);
  }

  function updateLeg(index, name, value) {
    setTrip((current) => ({ ...current, legs: current.legs.map((leg, i) => i === index ? { ...leg, [name]: value } : leg) }));
    clearError(`legs.${index}.${name}`);
  }

  function blur(name) {
    const currentErrors = validateTrip(trip);
    setErrors((current) => {
      const next = { ...current };
      if (currentErrors[name]) next[name] = currentErrors[name];
      else delete next[name];
      return next;
    });
  }

  function inputProps(name, hint = false) {
    return {
      id: fieldId(name), name,
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': [errors[name] ? `${fieldId(name)}-error` : '', hint ? `${fieldId(name)}-hint` : ''].filter(Boolean).join(' ') || undefined,
      onBlur: () => blur(name),
    };
  }

  function showErrors(nextErrors) {
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) setStep(fieldStep(first));
    requestFocus(() => errorRef.current);
  }

  function navigate(target) {
    if (busy) return;
    if (target > step) {
      const nextErrors = Object.assign({}, ...Array.from({ length: target }, (_, index) => validateTripStep(trip, index)));
      if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
    }
    setErrors({});
    setStep(target);
    setStatus('idle');
    setResult(null);
    setSubmissionError('');
    requestFocus(() => headingRef.current);
  }

  function focusField(name) {
    setStep(fieldStep(name));
    requestFocus(() => document.getElementById(fieldId(name)));
  }

  async function submit(event) {
    event.preventDefault();
    if (submissionLock.current) return;
    if (step < 2) { navigate(step + 1); return; }
    const nextErrors = validateTrip(trip);
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
    submissionLock.current = true;
    setErrors({});
    setSubmissionError('');
    setStatus('submitting');
    const submittedTrip = trip;
    try {
      const preview = await simulateTripSubmission(trip, { outcome: scenario });
      if (!mounted.current) return;
      // The hero and comfort studio remain editable while this local delay runs.
      // Never present an old payload as the preview of a newly edited trip.
      if (latestTrip.current !== submittedTrip) {
        setResult(null);
        setStatus('idle');
        setSubmissionError('Your trip changed while the preview was preparing. Review your updated brief, then preview it again. No request was sent.');
        return;
      }
      setResult(preview);
      setStatus('success');
    } catch (error) {
      if (!mounted.current) return;
      if (error.fieldErrors) showErrors(error.fieldErrors);
      setSubmissionError(error.message);
      setStatus('error');
      // Failure mode demonstrates one recoverable error, then allows a real retry.
      setScenario('success');
    } finally {
      submissionLock.current = false;
    }
  }

  const routeFields = (leg, index = null) => {
    const prefix = index === null ? '' : `legs.${index}.`;
    const edit = (name, value) => index === null ? update(name, value) : updateLeg(index, name, value);
    return <>
      {['from', 'to'].map((name) => <Field key={name} name={`${prefix}${name}`} label={name === 'from' ? 'From' : 'To'} error={errors[`${prefix}${name}`]}>
        <input {...inputProps(`${prefix}${name}`)} autoComplete="off" maxLength={80} value={leg[name]} onChange={(event) => edit(name, event.target.value)} placeholder={name === 'from' ? 'City or airport' : 'Your destination'} required />
      </Field>)}
      <Field name={`${prefix}departure`} label="Departure" error={errors[`${prefix}departure`]}>
        <input {...inputProps(`${prefix}departure`)} type="date" value={leg.departure} min={index > 0 ? (trip.legs[index - 1].departure || today) : today} onChange={(event) => edit('departure', event.target.value)} required />
      </Field>
    </>;
  };

  const itinerary = trip.tripType === 'multi_city' ? trip.legs : [{ from: trip.from, to: trip.to, departure: trip.departure }];

  return <div className="trip-shell">
    <div className="trip-main">
      <nav className="trip-steps" aria-label="Trip request steps">
        {STEPS.map((label, index) => <button type="button" key={label} aria-current={step === index ? 'step' : undefined} onClick={() => navigate(index)} disabled={busy}>
          <span className="trip-step-number" aria-hidden="true">{index < step ? <Check size={13} /> : `0${index + 1}`}</span>
          <span>{label}</span>
        </button>)}
      </nav>

      {status === 'success' ? <div className="trip-success" ref={successRef} tabIndex={-1} role="status">
        <CheckCircle2 size={38} strokeWidth={1.3} aria-hidden="true" />
        <span className="trip-kicker">ALL THE DETAILS, TOGETHER</span>
        <h3>Your trip brief is ready.</h3>
        <p>Preview only — no request has been sent.</p>
        <p className="trip-success-detail">Your route, preferences and contact details are ready to review. You can still make changes.</p>
        <button type="button" className="trip-button trip-button--primary" onClick={() => navigate(2)}>Edit my trip brief <Pencil size={16} aria-hidden="true" /></button>
        <details className="trip-payload"><summary>View simulated request data</summary><pre>{JSON.stringify(result?.payload, null, 2)}</pre></details>
      </div> : <form className="trip-form" noValidate onSubmit={submit} aria-busy={busy}>
        <div className="trip-step-heading">
          <h3 ref={headingRef} tabIndex={-1}>{['Where are we taking you?', 'Make it your kind of journey.', 'A few details. Then you’re ready.'][step]}</h3>
          <p>{['Start with the route. Derek can help with the finer details.', 'Tell Derek what would make the difference for you.', 'Review your trip brief and choose how you would like to be contacted.'][step]}</p>
        </div>

        {Object.keys(errors).length > 0 && <div className="trip-errors" tabIndex={-1} ref={errorRef} role="alert">
          <strong>A few details need your attention.</strong>
          <ul>{Object.entries(errors).map(([name, message]) => <li key={name}><button type="button" onClick={() => focusField(name)}>{fieldLabel(name)}: {message}</button></li>)}</ul>
        </div>}

        {/* Each step owns a fresh set of native controls; values remain in shared React state. */}
        <fieldset key={step} className="trip-active-fields" disabled={busy}>
          <legend className="trip-sr-only">{STEPS[step]}</legend>
          {step === 0 && <>
            <fieldset className="trip-type-options" id={fieldId('tripType')} tabIndex={-1} aria-invalid={errors.tripType ? true : undefined}>
              <legend>Trip type</legend>
              <div>{TRIP_TYPE_OPTIONS.map((option) => <label key={option.value} className={trip.tripType === option.value ? 'is-selected' : ''}>
                <input type="radio" name="trip-type" value={option.value} checked={trip.tripType === option.value} onChange={() => { setTrip((current) => changeTripType(current, option.value)); setErrors({}); }} />
                <span>{option.label}</span>
              </label>)}</div>
            </fieldset>

            {trip.tripType === 'multi_city' ? <div className="trip-legs" id={fieldId('legs')} tabIndex={-1}>
              {trip.legs.map((leg, index) => <div className="trip-leg" key={index}>
                <div className="trip-leg-heading"><span><Plane size={14} aria-hidden="true" /> FLIGHT {String(index + 1).padStart(2, '0')}</span>
                  {trip.legs.length > 2 && <button type="button" className="trip-text-button" aria-label={`Remove flight ${index + 1}`} onClick={() => { setTrip((current) => removeTripLeg(current, index)); setErrors({}); requestFocus(() => document.getElementById(fieldId(`legs.${Math.min(index, trip.legs.length - 2)}.from`))); }}><Trash2 size={15} aria-hidden="true" /> Remove</button>}
                </div>
                <div className="trip-fields trip-fields--leg">{routeFields(leg, index)}</div>
              </div>)}
              <button type="button" className="trip-add-flight" disabled={trip.legs.length >= MAX_TRIP_LEGS} onClick={() => { setTrip(addTripLeg); setErrors({}); requestFocus(() => document.getElementById(fieldId(`legs.${trip.legs.length}.from`))); }}><Plus size={16} aria-hidden="true" /> {trip.legs.length >= MAX_TRIP_LEGS ? 'Six-flight maximum reached' : 'Add another flight'}</button>
            </div> : <div className="trip-fields">
              {routeFields(trip)}
              {trip.tripType === 'round_trip' && <Field name="returnDate" label="Return" error={errors.returnDate}><input {...inputProps('returnDate')} type="date" value={trip.returnDate} min={trip.departure || today} onChange={(event) => update('returnDate', event.target.value)} required /></Field>}
            </div>}

            <div className="trip-fields trip-fields--after-route">
              <Field name="travelers" label="Travelers" error={errors.travelers}><select {...inputProps('travelers')} value={trip.travelers} onChange={(event) => update('travelers', event.target.value)}>{Array.from({ length: 10 }, (_, index) => <option value={String(index + 1)} key={index}>{index + 1} {index === 0 ? 'traveler' : 'travelers'}</option>)}</select></Field>
              <Field name="cabin" label="Cabin preference" error={errors.cabin}><select {...inputProps('cabin')} value={trip.cabin} onChange={(event) => update('cabin', event.target.value)}>{CABIN_OPTIONS.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}</select></Field>
            </div>
          </>}

          {step === 1 && <>
            <fieldset className="trip-comfort-options" id={fieldId('comfort')} tabIndex={-1} aria-invalid={errors.comfort ? true : undefined} aria-describedby="trip-comfort-note">
              <legend>Your arrival priority <span>Optional</span></legend>
              {COMFORT_OPTIONS.map((option) => {
                const Icon = COMFORT_ICONS[option.value];
                return <label key={option.value} className={trip.comfort === option.value ? 'is-selected' : ''}>
                  <input type="radio" name="trip-comfort" value={option.value} checked={trip.comfort === option.value} onChange={() => update('comfort', option.value)} />
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span><strong>{option.label}</strong><small>{option.description}</small></span>
                  <span className="trip-radio-mark" aria-hidden="true">{trip.comfort === option.value && <Check size={12} />}</span>
                </label>;
              })}
              <p id="trip-comfort-note" className="trip-field-hint">Preferences help guide the review. Cabin details vary by flight.</p>
              {trip.comfort && <button type="button" className="trip-text-button" onClick={() => update('comfort', null)}>Clear priority</button>}
            </fieldset>
            <div className="trip-fields">
              <Field name="flexibility" label="Date flexibility" wide error={errors.flexibility}><select {...inputProps('flexibility')} value={trip.flexibility} onChange={(event) => update('flexibility', event.target.value)}>{FLEXIBILITY_OPTIONS.map(({ value, label }) => <option value={value} key={value}>{label.replace('+/-', '±')}</option>)}</select></Field>
              <Field name="notes" label="Anything else Derek should know?" wide error={errors.notes} hint="Optional · up to 600 characters"><textarea {...inputProps('notes', true)} value={trip.notes} maxLength={600} rows={3} onChange={(event) => update('notes', event.target.value)} placeholder="An arrival time, a preferred airline, or something you need along the way…" /></Field>
            </div>
          </>}

          {step === 2 && <>
            <div className="trip-fields">
              <Field name="fullName" label="Full name" error={errors.fullName} wide><input {...inputProps('fullName')} autoComplete="name" maxLength={80} value={trip.fullName} onChange={(event) => update('fullName', event.target.value)} required /></Field>
              <Field name="email" label="Email address" error={errors.email}><input {...inputProps('email')} type="email" autoComplete="email" maxLength={120} value={trip.email} onChange={(event) => update('email', event.target.value)} required /></Field>
              <Field name="phone" label={`Phone or WhatsApp${trip.contactPreference === 'email' ? ' (optional)' : ''}`} error={errors.phone}><input {...inputProps('phone')} type="tel" autoComplete="tel" maxLength={40} value={trip.phone} onChange={(event) => update('phone', event.target.value)} required={trip.contactPreference !== 'email'} /></Field>
              <Field name="contactPreference" label="Preferred way to hear from Derek" error={errors.contactPreference} wide><select {...inputProps('contactPreference')} value={trip.contactPreference} onChange={(event) => update('contactPreference', event.target.value)}>{CONTACT_PREFERENCE_OPTIONS.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}</select></Field>
            </div>
            <div className="trip-privacy">
              <label><input {...inputProps('privacyAcknowledged')} type="checkbox" checked={trip.privacyAcknowledged} onChange={(event) => update('privacyAcknowledged', event.target.checked)} required /><span>I have read the <a href="https://www.flywithderek.com/privacy" target="_blank" rel="noreferrer">Privacy Policy<span className="trip-sr-only"> (opens in a new tab)</span></a>.</span></label>
              {errors.privacyAcknowledged && <p className="trip-field-error" id={`${fieldId('privacyAcknowledged')}-error`}>{errors.privacyAcknowledged}</p>}
            </div>
          </>}
        </fieldset>

        {submissionError && <p className="trip-submission-error" role="alert">{submissionError}</p>}
        <div className="trip-form-actions">
          {step > 0 ? <button type="button" className="trip-button trip-button--back" onClick={() => navigate(step - 1)} disabled={busy}><ArrowLeft size={16} aria-hidden="true" /> Back</button> : <span className="trip-step-count">STEP 01 OF 03</span>}
          <button type="submit" className="trip-button trip-button--primary" disabled={busy}>{busy ? <>Preparing your brief <LoaderCircle className="trip-loader" size={17} aria-hidden="true" /></> : <>{step === 2 ? (status === 'error' ? 'Try again' : 'Preview my trip brief') : 'Continue'} <ArrowRight size={17} aria-hidden="true" /></>}</button>
        </div>
        <div className="trip-preview-note">
          <p>Prototype preview. No request is sent.</p>
          {step === 2 && <details><summary>Preview controls</summary><label htmlFor="trip-preview-scenario">Simulated result<select id="trip-preview-scenario" value={scenario} disabled={busy} onChange={(event) => setScenario(event.target.value)}><option value="success">Success</option><option value="error">Recoverable error</option></select></label></details>}
        </div>
      </form>}
      <span className="trip-sr-only" role="status">{busy ? 'Preparing your local preview. No request is being sent.' : ''}</span>
    </div>

    <aside className="trip-brief" aria-label="Your trip brief">
      <div className="trip-brief-heading"><span className="trip-kicker">PERSONALLY ARRANGED</span><Plane size={22} strokeWidth={1.2} aria-hidden="true" /></div>
      <h3>Trip brief<span>.</span></h3>
      <div className="trip-brief-block">
        <div className="trip-brief-label"><span>{getTripTypeLabel(trip.tripType)}</span><button type="button" disabled={busy} onClick={() => navigate(0)} aria-label="Edit route and dates"><Pencil size={13} aria-hidden="true" /> Edit</button></div>
        {itinerary.map((leg, index) => <div className="trip-brief-route" key={index}>
          <div><strong>{leg.from || 'Your departure'}</strong><ChevronRight size={15} aria-hidden="true" /><strong>{leg.to || 'Your destination'}</strong></div>
          <p>{formatDate(leg.departure)}{trip.tripType === 'round_trip' && trip.returnDate ? ` — ${formatDate(trip.returnDate)}` : ''}</p>
        </div>)}
        <p className="trip-brief-cabin">{trip.travelers} {trip.travelers === '1' ? 'traveler' : 'travelers'}<span>·</span>{getCabinLabel(trip.cabin)}</p>
      </div>
      <div className="trip-brief-block">
        <div className="trip-brief-label"><span>Your preferences</span><button type="button" disabled={busy} onClick={() => navigate(1)} aria-label="Edit preferences"><Pencil size={13} aria-hidden="true" /> Edit</button></div>
        <p className="trip-brief-priority">{comfort ? comfort.label : 'Your priority, when you’re ready.'}</p>
        <p className="trip-brief-muted">{getFlexibilityLabel(trip.flexibility).replace('+/-', '±')}</p>
        {trip.notes && <p className="trip-brief-notes">{trip.notes}</p>}
      </div>
      {(trip.fullName || trip.email || trip.phone) && <div className="trip-brief-block">
        <div className="trip-brief-label"><span>Contact</span><button type="button" disabled={busy} onClick={() => navigate(2)} aria-label="Edit contact details"><Pencil size={13} aria-hidden="true" /> Edit</button></div>
        {trip.fullName && <p className="trip-brief-priority">{trip.fullName}</p>}
        {trip.email && <p className="trip-brief-muted">{trip.email}</p>}
        {trip.phone && <p className="trip-brief-muted">{trip.phone}</p>}
        <p className="trip-brief-muted">Preferred contact: {getContactPreferenceLabel(trip.contactPreference)}</p>
      </div>}
      <p className="trip-brief-footer">A starting point for your personal review.<br />This is not a ticket or reservation.</p>
    </aside>
  </div>;
}
