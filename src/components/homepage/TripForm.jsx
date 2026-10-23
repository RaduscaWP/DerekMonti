import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, CheckCircle2, ChevronRight, LoaderCircle, Mail, MessageCircle, Moon, Pencil, Plane, Plus, Trash2, Users } from 'lucide-react';
import {
  addTripLeg,
  CABIN_OPTIONS,
  changeTripType,
  COMFORT_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  fieldStep,
  findAirportSuggestions,
  FLEXIBILITY_OPTIONS,
  getCabinLabel,
  getContactPreferenceLabel,
  getFlexibilityLabel,
  getTripTypeLabel,
  localTodayIso,
  MAX_TRIP_LEGS,
  removeTripLeg,
  serializeTrip,
  TRIP_TYPE_OPTIONS,
  validateTrip,
  validateTripStep,
} from './tripState.js';
import TurnstileWidget from '../common/TurnstileWidget.jsx';
import './trip-form.scss';
import { useTripBrief } from '../../context/TripBriefProvider.jsx';
import { SERVICE_INTENT_OPTIONS, getServiceIntentLabel } from '../../utils/quoteRequest.js';
import { getMailto, getWhatsappUrl } from '../../utils/message.js';
import { trackEvent } from '../../utils/analytics.js';
import { useLocale } from '../../i18n/useLocale.js';
import { translateFormText, translateSubmissionError } from '../../i18n/formCopy.js';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
const STEPS = ['Your journey', 'Your preferences', 'Contact & review'];
const COMFORT_ICONS = { rested: Moon, work: BriefcaseBusiness, together: Users };
const fieldId = (name) => `trip-field-${name.replaceAll('.', '-')}`;

function fieldLabel(name, text) {
  const legMatch = /^legs\.(\d+)\.(from|to|departure)$/.exec(name);
  if (legMatch) return text('Flight {number}: {field}', { number: Number(legMatch[1]) + 1, field: text({ from: 'From', to: 'To', departure: 'Departure' }[legMatch[2]]) });
  return text(({ from: 'From', to: 'To', departure: 'Departure', returnDate: 'Return', tripType: 'Trip type', legs: 'Flights', travelers: 'Travelers', cabin: 'Cabin', serviceIntent: 'Travel situation', comfort: 'Priority', flexibility: 'Date flexibility', notes: 'Notes', fullName: 'Full name', email: 'Email', phone: 'Phone', contactPreference: 'Contact preference', privacyAcknowledged: 'Privacy acknowledgement', turnstile: 'Human verification' })[name] || 'Your details');
}

function formatDate(date, locale, text) {
  if (!date) return text('Dates to be added');
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime()) || parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) return text('Check this date');
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(parsed);
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

function AirportInput({ value, onChange, ...props }) {
  const { t } = useLocale();
  const text = (english, values) => translateFormText(t, english, values);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const input = useRef(null);
  const list = useRef(null);
  const suggestions = findAirportSuggestions(value);
  const expanded = open && suggestions.length > 0;
  const listId = `${props.id}-suggestions`;
  const statusId = `${props.id}-airport-status`;

  useEffect(() => { setActive(-1); }, [value]);

  useEffect(() => {
    if (expanded && active >= 0) list.current?.children[active]?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  }, [expanded, active]);

  function choose(option) {
    onChange(option.label);
    setOpen(false);
    setActive(-1);
    input.current?.focus({ preventScroll: true });
  }

  function keyDown(event) {
    if (event.key === 'Escape') {
      if (open) event.preventDefault();
      setOpen(false);
      setActive(-1);
    } else if (event.key === 'Tab') {
      setOpen(false);
      setActive(-1);
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      const next = event.key === 'ArrowDown' ? active + 1 : active < 0 ? suggestions.length - 1 : active - 1;
      setActive((next + suggestions.length) % suggestions.length);
    } else if (event.key === 'Enter' && expanded && active >= 0) {
      event.preventDefault();
      choose(suggestions[active]);
    }
  }

  return <div className="trip-airport">
    <input {...props} ref={input} role="combobox" aria-autocomplete="list" aria-expanded={expanded}
      aria-controls={listId} aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
      aria-describedby={[props['aria-describedby'], statusId].filter(Boolean).join(' ')}
      value={value} onChange={(event) => { onChange(event.target.value); setActive(-1); setOpen(true); }}
      onFocus={() => { setActive(-1); setOpen(true); }} onKeyDown={keyDown}
      onBlur={(event) => { setOpen(false); setActive(-1); props.onBlur?.(event); }} />
    <p id={statusId} className="trip-sr-only" role="status" aria-live="polite" aria-atomic="true">
      {open && value.trim().length >= 2 ? suggestions.length ? text('Airport suggestions: {count}. Use the arrow keys to explore and Enter to select. You can also keep your own city or airport.', { count: suggestions.length }) : text('No matching airport suggestion. You can keep the city or airport you entered.') : text('Enter a city or airport code. Suggestions cover selected airports; other cities and airports are welcome.')}
    </p>
    <ul ref={list} id={listId} role="listbox" aria-label={text('Airport suggestions')} className="trip-airport-list" hidden={!expanded}>
      {suggestions.map((option, index) => <li key={option.code} id={`${listId}-${index}`} role="option" aria-selected={active === index}
        onMouseDown={(event) => event.preventDefault()} onClick={() => choose(option)}>
        <span>{option.city}</span><strong>{option.code}</strong>
      </li>)}
    </ul>
  </div>;
}

export default function TripForm({ trip, setTrip, step, setStep, onBusyChange }) {
  const { locale, t, localePath } = useLocale();
  const text = (english, values) => translateFormText(t, english, values);
  const [errors, setErrors] = useState({});
  const { startNewRequest, submission, submitRequest, clearSubmissionError } = useTripBrief();
  const { status, result } = submission;
  const unresolved = submission.attempt?.unresolved === true;
  const submissionError = submission.error ? translateSubmissionError(t,
    unresolved && submission.error.code === 'DELIVERY_REJECTED'
      ? { code: 'EARLIER_ATTEMPT_UNCONFIRMED' }
      : unresolved && submission.error.code === 'VALIDATION'
        ? { code: 'ORIGINAL_RETRY_BLOCKED' } : submission.error) : '';
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const [today, setToday] = useState('');
  const formStartedAt = useRef(0);
  const turnstileReset = useRef(null);
  const errorRef = useRef(null);
  const headingRef = useRef(null);
  const successRef = useRef(null);
  const previousStep = useRef(step);
  const mounted = useRef(true);
  const submissionLock = useRef(false);
  const pendingFocus = useRef(null);
  const shellRef = useRef(null);
  const viewed = useRef(false);
  const started = useRef(false);
  const eventTrip = useRef(trip);
  eventTrip.current = trip;
  const busy = status === 'submitting';
  const received = status === 'success';
  const locked = busy || received || unresolved;
  const summaryTrip = received ? result.trip : unresolved ? submission.attempt.trip : trip;
  const comfort = COMFORT_OPTIONS.find(({ value }) => value === summaryTrip.comfort);
  const recoveryDetails = serializeTrip(summaryTrip);
  if (unresolved) recoveryDetails.notes = [recoveryDetails.notes, `Earlier attempt reference: DM-${submission.attempt.identity.requestId.toUpperCase()}. Receipt is unconfirmed.`].filter(Boolean).join('\n');
  const eventProperties = () => ({ trip_type: eventTrip.current.tripType, cabin: eventTrip.current.cabin === 'either' ? 'mixed' : eventTrip.current.cabin, source: eventTrip.current.source || 'homepage' });

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent('quote_form_start', eventProperties());
  }

  const registerTurnstileReset = useCallback((resetFn) => { turnstileReset.current = resetFn; }, []);
  const handleTurnstileToken = useCallback((token) => {
    setTurnstileToken(token || '');
    if (token) setVerificationFailed(false);
    if (token) setErrors((current) => {
      const next = { ...current }; delete next.turnstile; return next;
    });
  }, []);
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(''), []);
  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('');
    setVerificationFailed(true);
    setErrors((current) => ({ ...current, turnstile: 'Human verification could not load. Retry the verification or contact Derek directly.' }));
  }, []);

  function retryVerification() {
    setTurnstileToken('');
    setVerificationFailed(false);
    clearError('turnstile');
    setVerificationAttempt((attempt) => attempt + 1);
  }

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    formStartedAt.current = Date.now();
    setToday(localTodayIso());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || viewed.current) return;
      viewed.current = true;
      trackEvent('quote_form_view', eventProperties());
      observer.disconnect();
    }, { threshold: .15 });
    if (shellRef.current) observer.observe(shellRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onBusyChange?.(locked);
    return () => onBusyChange?.(false);
  }, [onBusyChange, locked]);

  useEffect(() => {
    if (previousStep.current !== step) {
      previousStep.current = step;
      if (step !== 2) setTurnstileToken('');
      if (!received && !pendingFocus.current) requestFocus(() => headingRef.current);
    }
  }, [step]);

  useEffect(() => {
    if (status === 'success') requestFocus(() => successRef.current);
  }, [status]);

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
    if (status === 'error') clearSubmissionError();
  }

  function update(name, value) {
    if (submissionLock.current || locked) return;
    setTrip((current) => ({ ...current, [name]: value }));
    clearError(name);
  }

  function updateLeg(index, name, value) {
    if (submissionLock.current || locked) return;
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
    if (first) trackEvent('quote_form_validation_error', { ...eventProperties(), field_category: first === 'turnstile' ? 'verification' : ['journey', 'preferences', 'contact'][fieldStep(first)] });
    if (first) setStep(fieldStep(first));
    requestFocus(() => errorRef.current);
  }

  function navigate(target) {
    if (submissionLock.current || locked) return;
    markStarted();
    if (target > step) {
      const nextErrors = Object.assign({}, ...Array.from({ length: target }, (_, index) => validateTripStep(trip, index)));
      if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
      trackEvent('quote_form_step_complete', { ...eventProperties(), step: ['journey', 'preferences', 'contact'][step] });
    }
    setErrors({});
    setStep(target);
    clearSubmissionError();
    requestFocus(() => headingRef.current);
  }

  function focusField(name) {
    setStep(fieldStep(name));
    requestFocus(() => document.getElementById(fieldId(name)));
  }

  function startAnotherRequest() {
    startNewRequest();
    setErrors({});
    setCompanyWebsite('');
    setTurnstileToken('');
    formStartedAt.current = Date.now();
    started.current = false;
    requestFocus(() => headingRef.current);
  }

  async function submit(event) {
    event.preventDefault();
    if (submissionLock.current || busy || received) return;
    markStarted();
    if (step < 2) { navigate(step + 1); return; }
    const nextErrors = unresolved ? {} : validateTrip(trip);
    if (TURNSTILE_SITE_KEY && !turnstileToken) nextErrors.turnstile = 'Complete the human-verification challenge.';
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
    submissionLock.current = true;
    setErrors({});
    trackEvent('quote_form_step_complete', { ...eventProperties(), step: 'contact' });
    trackEvent('quote_form_submit', eventProperties());
    try {
      await submitRequest({ turnstileToken, companyWebsite, formStartedAt: formStartedAt.current });
      if (!mounted.current) return;
      trackEvent('quote_form_success', eventProperties());
    } catch (error) {
      if (!mounted.current) return;
      if (error.code === 'FORM_TIMING') formStartedAt.current = Date.now();
      if (!unresolved && Object.keys(error.fieldErrors || {}).length) showErrors(error.fieldErrors);
      else requestFocus(() => errorRef.current);
      trackEvent('quote_form_server_error', eventProperties());
    } finally {
      submissionLock.current = false;
      if (mounted.current) {
        setTurnstileToken('');
        turnstileReset.current?.();
      }
    }
  }

  const routeFields = (leg, index = null) => {
    const prefix = index === null ? '' : `legs.${index}.`;
    const edit = (name, value) => index === null ? update(name, value) : updateLeg(index, name, value);
    return <>
      {['from', 'to'].map((name) => <Field key={name} name={`${prefix}${name}`} label={text(name === 'from' ? 'From' : 'To')} error={text(errors[`${prefix}${name}`])}>
        <AirportInput {...inputProps(`${prefix}${name}`)} autoComplete="off" maxLength={80} value={leg[name]} onChange={(value) => edit(name, value)} placeholder={text(name === 'from' ? 'City or airport' : 'Your destination')} required />
      </Field>)}
      <Field name={`${prefix}departure`} label={text("Departure")} error={text(errors[`${prefix}departure`])}>
        <input {...inputProps(`${prefix}departure`)} type="date" value={leg.departure} min={index > 0 ? (trip.legs[index - 1].departure || today) : today} onChange={(event) => edit('departure', event.target.value)} required />
      </Field>
    </>;
  };

  const itinerary = summaryTrip.tripType === 'multi_city' ? summaryTrip.legs : [{ from: summaryTrip.from, to: summaryTrip.to, departure: summaryTrip.departure }];

  return <div ref={shellRef} className="trip-shell">
    <div className="trip-main">
      <nav className="trip-steps" aria-label={text('Trip request steps')}>
        {STEPS.map((label, index) => <button type="button" key={label} aria-current={step === index ? 'step' : undefined} onClick={() => navigate(index)} disabled={locked}>
          <span className="trip-step-number" aria-hidden="true">{index < step ? <Check size={13} /> : `0${index + 1}`}</span>
          <span>{text(label)}</span>
        </button>)}
      </nav>

      {status === 'success' ? <div className="trip-success" ref={successRef} tabIndex={-1} role="status">
        <CheckCircle2 size={38} strokeWidth={1.3} aria-hidden="true" />
        <span className="trip-kicker">{text('PERSONALLY REVIEWED, FROM HERE')}</span>
        <h3>{text('Your request has been received.')}</h3>
        <p>{text('Request reference:')} <strong>{result.reference}</strong></p>
        <p className="trip-success-detail">{text('Derek will review the trip shown here and use your preferred contact method for the next step. Fares and availability are confirmed before booking.')}</p>
        {result.confirmationSent === true && <p>{text('A confirmation email was accepted for sending to {email}. Please check your inbox and spam folder.', { email: result.trip.email })}</p>}
        {result.confirmationSent === false && <p>{text('Your request was received. An email confirmation could not be sent; please keep your reference.')}</p>}
        <button type="button" className="trip-button trip-button--primary" onClick={startAnotherRequest}>{text('Start another request')} <ArrowRight size={16} aria-hidden="true" /></button>
      </div> : <form className="trip-form" noValidate onSubmit={submit} onChange={markStarted} aria-busy={busy}>
        <div className="trip-honeypot" aria-hidden="true">
          <label htmlFor={fieldId('companyWebsite')}>{text('Company website')}</label>
          <input id={fieldId('companyWebsite')} name="companyWebsite" value={companyWebsite} onChange={(event) => setCompanyWebsite(event.target.value)} tabIndex={-1} autoComplete="off" maxLength={120} />
        </div>
        <div className="trip-step-heading">
          <h3 ref={headingRef} tabIndex={-1}>{text(['Where are we taking you?', 'Make it your kind of journey.', 'A few details. Then you’re ready.'][step])}</h3>
          <p>{text(['Start with the route. Derek can help with the finer details.', 'Tell Derek what would make the difference for you.', 'Review your trip brief and choose how you would like to be contacted.'][step])}</p>
        </div>

        {(submissionError || Object.keys(errors).length > 0) && <div className="trip-errors" tabIndex={-1} ref={errorRef} role="alert">
          <strong>{submissionError || text('A few details need your attention.')}</strong>
          <ul>{Object.entries(errors).map(([name, message]) => <li key={name}><button type="button" onClick={() => focusField(name)}>{fieldLabel(name, text)}: {text(message)}</button></li>)}</ul>
        </div>}

        {unresolved && <div className="trip-recovery" role="status">
          <h4>{text('Earlier request receipt is still unconfirmed.')}</h4>
          <p>{text('Your submitted details are held for the same retry. Contact Derek before changing them or starting another request. Keep this page open to retain the attempt.')}</p>
          <p>{text('Attempt reference:')} <strong>DM-{submission.attempt.identity.requestId.toUpperCase()}</strong></p>
        </div>}

        {(status === 'error' || verificationFailed) && <div className="trip-recovery" aria-labelledby="trip-recovery-title">
          <h4 id="trip-recovery-title">{text('Continue directly with Derek.')}</h4>
          <p>{text('Your entries are kept here. Open a message with your trip details, then review it before sending. If receipt was uncertain, mention the earlier attempt.')}</p>
          <div><a href={getWhatsappUrl(recoveryDetails)} onClick={() => trackEvent('contact_method_click', { ...eventProperties(), method: 'whatsapp' })} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> {text('Continue on WhatsApp')}</a><a href={getMailto(recoveryDetails)} onClick={() => trackEvent('contact_method_click', { ...eventProperties(), method: 'email' })}><Mail size={17} aria-hidden="true" /> {text('Email your trip details')}</a></div>
        </div>}

        {/* Each step owns a fresh set of native controls; values remain in shared React state. */}
        <fieldset key={step} className="trip-active-fields" disabled={busy}>
          <legend className="trip-sr-only">{text(STEPS[step])}</legend>
          {step === 0 && <>
            <fieldset className="trip-type-options" id={fieldId('tripType')} tabIndex={-1} aria-invalid={errors.tripType ? true : undefined}>
              <legend>{text('Trip type')}</legend>
              <div>{TRIP_TYPE_OPTIONS.map((option) => <label key={option.value} className={trip.tripType === option.value ? 'is-selected' : ''}>
                <input type="radio" name="trip-type" value={option.value} checked={trip.tripType === option.value} onChange={() => { setTrip((current) => changeTripType(current, option.value)); setErrors({}); }} />
                <span>{text(option.label)}</span>
              </label>)}</div>
            </fieldset>

            {trip.tripType === 'multi_city' ? <div className="trip-legs" id={fieldId('legs')} tabIndex={-1}>
              {trip.legs.map((leg, index) => <div className="trip-leg" key={index}>
                <div className="trip-leg-heading"><span><Plane size={14} aria-hidden="true" /> {text('FLIGHT {number}', { number: String(index + 1).padStart(2, '0') })}</span>
                  {trip.legs.length > 2 && <button type="button" className="trip-text-button" aria-label={text('Remove flight {number}', { number: index + 1 })} onClick={() => { setTrip((current) => removeTripLeg(current, index)); setErrors({}); requestFocus(() => document.getElementById(fieldId(`legs.${Math.min(index, trip.legs.length - 2)}.from`))); }}><Trash2 size={15} aria-hidden="true" /> {text('Remove')}</button>}
                </div>
                <div className="trip-fields trip-fields--leg">{routeFields(leg, index)}</div>
              </div>)}
              <button type="button" className="trip-add-flight" disabled={trip.legs.length >= MAX_TRIP_LEGS} onClick={() => { setTrip(addTripLeg); setErrors({}); requestFocus(() => document.getElementById(fieldId(`legs.${trip.legs.length}.from`))); }}><Plus size={16} aria-hidden="true" /> {text(trip.legs.length >= MAX_TRIP_LEGS ? 'Six-flight maximum reached' : 'Add another flight')}</button>
            </div> : <div className="trip-fields">
              {routeFields(trip)}
              {trip.tripType === 'round_trip' && <Field name="returnDate" label={text("Return")} error={text(errors.returnDate)}><input {...inputProps('returnDate')} type="date" value={trip.returnDate} min={trip.departure || today} onChange={(event) => update('returnDate', event.target.value)} required /></Field>}
            </div>}

            <div className="trip-fields trip-fields--after-route">
              <Field name="travelers" label={text("Travelers")} error={text(errors.travelers)}><select {...inputProps('travelers')} value={trip.travelers} onChange={(event) => update('travelers', event.target.value)}>{Array.from({ length: 10 }, (_, index) => <option value={String(index + 1)} key={index}>{index + 1} {text(index === 0 ? 'traveler' : 'travelers')}</option>)}</select></Field>
              <Field name="cabin" label={text("Cabin preference")} error={text(errors.cabin)}><select {...inputProps('cabin')} value={trip.cabin} onChange={(event) => update('cabin', event.target.value)}>{CABIN_OPTIONS.map(({ value, label }) => <option value={value} key={value}>{text(label)}</option>)}</select></Field>
            </div>
          </>}

          {step === 1 && <>
            <fieldset className="trip-comfort-options" id={fieldId('comfort')} tabIndex={-1} aria-invalid={errors.comfort ? true : undefined} aria-describedby="trip-comfort-note">
              <legend>{text('Your arrival priority')} <span>{text("Optional")}</span></legend>
              {COMFORT_OPTIONS.map((option) => {
                const Icon = COMFORT_ICONS[option.value];
                return <label key={option.value} className={trip.comfort === option.value ? 'is-selected' : ''}>
                  <input type="radio" name="trip-comfort" value={option.value} checked={trip.comfort === option.value} onChange={() => update('comfort', option.value)} />
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span><strong>{text(option.label)}</strong><small>{text(option.description)}</small></span>
                  <span className="trip-radio-mark" aria-hidden="true">{trip.comfort === option.value && <Check size={12} />}</span>
                </label>;
              })}
              <p id="trip-comfort-note" className="trip-field-hint">{text("Preferences help guide the review. Cabin details vary by flight.")}</p>
              {trip.comfort && <button type="button" className="trip-text-button" onClick={() => update('comfort', null)}>{text("Clear priority")}</button>}
            </fieldset>
            <div className="trip-fields">
              <Field name="serviceIntent" label={text("Travel situation (optional)")} wide error={text(errors.serviceIntent)}><select {...inputProps('serviceIntent')} value={trip.serviceIntent || ''} onChange={(event) => update('serviceIntent', event.target.value || null)}><option value="">{text("No situation selected")}</option>{SERVICE_INTENT_OPTIONS.map(({ value, label }) => <option value={value} key={value}>{text(label)}</option>)}</select></Field>
              <Field name="flexibility" label={text("Date flexibility")} wide error={text(errors.flexibility)}><select {...inputProps('flexibility')} value={trip.flexibility} onChange={(event) => update('flexibility', event.target.value)}>{FLEXIBILITY_OPTIONS.map(({ value, label }) => <option value={value} key={value}>{text(label.replace('+/-', '±'))}</option>)}</select></Field>
              <Field name="notes" label={text("Anything else Derek should know?")} wide error={text(errors.notes)} hint={text("Optional · up to 600 characters")}><textarea {...inputProps('notes', true)} value={trip.notes} maxLength={600} rows={3} onChange={(event) => update('notes', event.target.value)} placeholder={text("An arrival time, a preferred airline, or something you need along the way…")} /></Field>
            </div>
          </>}

          {step === 2 && <>
            <div className="trip-fields">
              <Field name="fullName" label={text("Full name")} error={text(errors.fullName)} wide><input {...inputProps('fullName')} disabled={unresolved} autoComplete="name" maxLength={80} value={trip.fullName} onChange={(event) => update('fullName', event.target.value)} required /></Field>
              <Field name="email" label={text("Email address")} error={text(errors.email)}><input {...inputProps('email')} disabled={unresolved} type="email" autoComplete="email" maxLength={120} value={trip.email} onChange={(event) => update('email', event.target.value)} required /></Field>
              <Field name="phone" label={text(trip.contactPreference === 'email' ? 'Phone or WhatsApp (optional)' : 'Phone or WhatsApp')} error={text(errors.phone)}><input {...inputProps('phone')} disabled={unresolved} type="tel" autoComplete="tel" maxLength={40} value={trip.phone} onChange={(event) => update('phone', event.target.value)} required={trip.contactPreference !== 'email'} /></Field>
              <Field name="contactPreference" label={text("Preferred way to hear from Derek")} error={text(errors.contactPreference)} wide><select {...inputProps('contactPreference')} disabled={unresolved} value={trip.contactPreference} onChange={(event) => update('contactPreference', event.target.value)}>{CONTACT_PREFERENCE_OPTIONS.map(({ value, label }) => <option value={value} key={value}>{text(label)}</option>)}</select></Field>
            </div>
            <div className="trip-privacy">
              <label><input {...inputProps('privacyAcknowledged')} disabled={unresolved} type="checkbox" checked={trip.privacyAcknowledged} onChange={(event) => update('privacyAcknowledged', event.target.checked)} required /><span>{text('I have read the')} <a href={localePath('/privacy')} target="_blank" rel="noreferrer">{text("Privacy Policy")}<span className="trip-sr-only">{text("(opens in a new tab)")}</span></a>.</span></label>
              {errors.privacyAcknowledged && <p className="trip-field-error" id={`${fieldId('privacyAcknowledged')}-error`}>{text(errors.privacyAcknowledged)}</p>}
            </div>
            {TURNSTILE_SITE_KEY && <div className="trip-verification" id={fieldId('turnstile')} tabIndex={-1} aria-label={text("Human verification")} aria-describedby={errors.turnstile ? `${fieldId('turnstile')}-error` : undefined}>
              <TurnstileWidget key={verificationAttempt} siteKey={TURNSTILE_SITE_KEY} size="compact" language={locale} onToken={handleTurnstileToken} onExpire={handleTurnstileExpire} onError={handleTurnstileError} registerReset={registerTurnstileReset} />
              {errors.turnstile && <p className="trip-field-error" id={`${fieldId('turnstile')}-error`}>{text(errors.turnstile)}</p>}
              <button type="button" className="trip-text-button" onClick={retryVerification} disabled={busy}>{text("Retry verification")}</button>
            </div>}
          </>}
        </fieldset>

        <div className="trip-form-actions">
          {step > 0 ? <button type="button" className="trip-button trip-button--back" onClick={() => navigate(step - 1)} disabled={locked}><ArrowLeft size={16} aria-hidden="true" /> {text('Back')}</button> : <span className="trip-step-count">{text('Step {number} of {total}', { number: '01', total: '03' })}</span>}
          <button type="submit" className="trip-button trip-button--primary" disabled={busy}>{busy ? <>{text('Sending your request')} <LoaderCircle className="trip-loader" size={17} aria-hidden="true" /></> : <>{text(unresolved ? 'Retry the same request' : step === 2 ? (status === 'error' ? 'Try again' : 'Send my trip request') : 'Continue')} <ArrowRight size={17} aria-hidden="true" /></>}</button>
        </div>
        <div className="trip-request-note">
          <p>{text('Derek uses these details to respond to your flight request. No booking commitment.')} <a href={localePath('/privacy')}>{text("Privacy Policy")}</a></p>
          <p>{text('Acknowledgement emails are currently in English.')}</p><p>{text('Prefer direct contact?')} <a href={getWhatsappUrl()}>{text('WhatsApp Derek')}</a> {text('or')} <a href={getMailto()}>{text('email Derek')}</a>.</p>
        </div>
      </form>}
      <span className="trip-sr-only" role="status">{busy ? text('Sending your request to Derek. Please wait for your reference.') : ''}</span>
    </div>

    <aside className="trip-brief" aria-label={text("Your trip brief")}>
      <div className="trip-brief-heading"><span className="trip-kicker">{text("PERSONALLY ARRANGED")}</span><Plane size={22} strokeWidth={1.2} aria-hidden="true" /></div>
      <h3>{text("Trip brief")}<span>.</span></h3>
      <div className="trip-brief-block">
        <div className="trip-brief-label"><span>{text(getTripTypeLabel(summaryTrip.tripType))}</span><button type="button" disabled={locked} onClick={() => navigate(0)} aria-label={text("Edit route and dates")}><Pencil size={13} aria-hidden="true" /> {text('Edit')}</button></div>
        {itinerary.map((leg, index) => <div className="trip-brief-route" key={index}>
          <div><strong>{leg.from || text('Your departure')}</strong><ChevronRight size={15} aria-hidden="true" /><strong>{leg.to || text('Your destination')}</strong></div>
          <p>{formatDate(leg.departure, locale, text)}{summaryTrip.tripType === 'round_trip' && summaryTrip.returnDate ? ` — ${formatDate(summaryTrip.returnDate, locale, text)}` : ''}</p>
        </div>)}
        <p className="trip-brief-cabin">{summaryTrip.travelers} {text(summaryTrip.travelers === '1' ? 'traveler' : 'travelers')}<span>·</span>{text(getCabinLabel(summaryTrip.cabin))}</p>
      </div>
      <div className="trip-brief-block">
        <div className="trip-brief-label"><span>{text("Your preferences")}</span><button type="button" disabled={locked} onClick={() => navigate(1)} aria-label={text("Edit preferences")}><Pencil size={13} aria-hidden="true" /> {text('Edit')}</button></div>
        <p className="trip-brief-priority">{text(comfort ? comfort.label : 'Your priority, when you’re ready.')}</p>
        {summaryTrip.serviceIntent && <div className="trip-brief-situation"><p className="trip-brief-priority">{text(getServiceIntentLabel(summaryTrip.serviceIntent))}</p><button type="button" className="trip-text-button" disabled={locked} onClick={() => update('serviceIntent', null)}>{text("Remove travel situation")}</button></div>}
        <p className="trip-brief-muted">{text(getFlexibilityLabel(summaryTrip.flexibility).replace('+/-', '±'))}</p>
        {summaryTrip.notes && <p className="trip-brief-notes">{summaryTrip.notes}</p>}
      </div>
      {(summaryTrip.fullName || summaryTrip.email || summaryTrip.phone) && <div className="trip-brief-block">
        <div className="trip-brief-label"><span>{text("Contact")}</span><button type="button" disabled={locked} onClick={() => navigate(2)} aria-label={text("Edit contact details")}><Pencil size={13} aria-hidden="true" /> {text('Edit')}</button></div>
        {summaryTrip.fullName && <p className="trip-brief-priority">{summaryTrip.fullName}</p>}
        {summaryTrip.email && <p className="trip-brief-muted">{summaryTrip.email}</p>}
        {summaryTrip.phone && <p className="trip-brief-muted">{summaryTrip.phone}</p>}
        <p className="trip-brief-muted">{text('Preferred contact: {method}', { method: text(getContactPreferenceLabel(summaryTrip.contactPreference)) })}</p>
      </div>}
      <p className="trip-brief-footer">{text("A starting point for your personal review.")}<br />{text("This is not a ticket or reservation.")}</p>
    </aside>
  </div>;
}
