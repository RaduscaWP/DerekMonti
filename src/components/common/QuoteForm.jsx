import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Plane, Plus, Search, Send, Trash2, Users } from 'lucide-react';
import { getMailto, getWhatsappUrl } from '../../utils/message.js';
import {
  CABIN_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  FLEXIBILITY_OPTIONS,
  TRIP_TYPE_OPTIONS,
  validateQuoteFields,
} from '../../utils/quoteRequest.js';
import Button from './Button.jsx';
import TurnstileWidget from './TurnstileWidget.jsx';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
const STORAGE_KEY = 'fly-with-derek:quote-progress:v2';
const MAX_LEGS = 6;

function todayIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createLeg() {
  return { from: '', to: '', departure: '' };
}

function createInitialFields() {
  return {
    tripType: 'round_trip',
    from: '',
    to: '',
    departure: '',
    returnDate: '',
    legs: [createLeg(), createLeg()],
    travelers: '1',
    cabin: 'business',
    flexibility: 'exact',
    fullName: '',
    email: '',
    phone: '',
    contactPreference: 'email',
    notes: '',
    privacyAcknowledged: false,
    companyWebsite: '',
    formStartedAt: Date.now(),
  };
}

function restoreSafeProgress(defaults) {
  if (typeof window === 'undefined') return defaults;
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || 'null');
    if (!stored || typeof stored !== 'object') return defaults;
    const storedLegs = Array.isArray(stored.legs)
      ? stored.legs.slice(0, MAX_LEGS).map((leg) => ({
          from: String(leg?.from || '').slice(0, 80),
          to: String(leg?.to || '').slice(0, 80),
          departure: String(leg?.departure || '').slice(0, 10),
        }))
      : defaults.legs;

    return {
      ...defaults,
      tripType: stored.tripType || defaults.tripType,
      from: String(stored.from || '').slice(0, 80),
      to: String(stored.to || '').slice(0, 80),
      departure: String(stored.departure || '').slice(0, 10),
      returnDate: String(stored.returnDate || '').slice(0, 10),
      legs: storedLegs.length >= 2 ? storedLegs : defaults.legs,
      travelers: String(stored.travelers || defaults.travelers),
      cabin: stored.cabin || defaults.cabin,
      flexibility: stored.flexibility || defaults.flexibility,
      contactPreference: stored.contactPreference || defaults.contactPreference,
    };
  } catch {
    return defaults;
  }
}

function persistSafeProgress(fields) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tripType: fields.tripType,
        from: fields.from,
        to: fields.to,
        departure: fields.departure,
        returnDate: fields.returnDate,
        legs: fields.legs,
        travelers: fields.travelers,
        cabin: fields.cabin,
        flexibility: fields.flexibility,
        contactPreference: fields.contactPreference,
      }),
    );
  } catch {
    // Storage may be blocked; the form remains fully functional without it.
  }
}

function clearSafeProgress() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore unavailable storage.
  }
}

function Field({ id, icon: Icon, label, required = false, error, help, children, wide = false }) {
  return (
    <div className={`quote-field ${wide ? 'quote-field--wide' : ''}`}>
      <label className="quote-field__label" htmlFor={id}>
        {Icon && <Icon aria-hidden="true" size={16} strokeWidth={2} />}
        <span>
          {label}
          {required ? ' (required)' : ''}
        </span>
      </label>
      {children}
      {help && (
        <small className="quote-field__help" id={`${id}-help`}>
          {help}
        </small>
      )}
      {error && (
        <p className="quote-field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessAdvisorAvatar({ src, alt }) {
  const [showFallback, setShowFallback] = useState(!src);

  useEffect(() => {
    setShowFallback(!src);
  }, [src]);

  return (
    <div className="quote-success__avatar-shell">
      {showFallback ? (
        <div className="quote-success__avatar quote-success__avatar--fallback" aria-hidden="true">
          <span>DM</span>
        </div>
      ) : (
        <img
          className="quote-success__avatar"
          src={src}
          alt={alt}
          onError={() => setShowFallback(true)}
          loading="eager"
          decoding="async"
        />
      )}
      <span className="quote-success__avatar-badge" aria-hidden="true">
        <CheckCircle2 size={16} strokeWidth={2.2} />
      </span>
    </div>
  );
}

function humanizeErrorKey(key) {
  const legMatch = /^legs\.(\d+)\.(from|to|departure)$/.exec(key);
  if (legMatch) {
    const labels = { from: 'origin', to: 'destination', departure: 'departure date' };
    return `Flight ${Number(legMatch[1]) + 1} ${labels[legMatch[2]]}`;
  }

  return (
    {
      tripType: 'Trip type',
      from: 'Origin',
      to: 'Destination',
      departure: 'Departure date',
      returnDate: 'Return date',
      legs: 'Multi-city itinerary',
      travelers: 'Travelers',
      cabin: 'Cabin preference',
      flexibility: 'Date flexibility',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone or WhatsApp',
      contactPreference: 'Contact preference',
      privacyAcknowledged: 'Privacy acknowledgement',
      turnstile: 'Human verification',
    }[key] || 'Form field'
  );
}

export default function QuoteForm({
  variant = 'hero',
  source = '',
  requestTitle = '',
  confirmationContext = null,
}) {
  const instanceId = useId().replace(/:/g, '');
  const [fields, setFields] = useState(createInitialFields);
  const [storageReady, setStorageReady] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submissionError, setSubmissionError] = useState('');
  const [ticketMeta, setTicketMeta] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const errorSummaryRef = useRef(null);
  const successRef = useRef(null);
  const turnstileResetRef = useRef(null);

  const fieldId = useCallback(
    (name) => `quote-${instanceId}-${name.replace(/[^a-zA-Z0-9_-]/g, '-')}`,
    [instanceId],
  );

  const registerTurnstileReset = useCallback((resetFn) => {
    turnstileResetRef.current = resetFn;
  }, []);
  const handleTurnstileToken = useCallback((token) => {
    setTurnstileToken(token || '');
    if (token) {
      setErrors((current) => {
        if (!current.turnstile) return current;
        const next = { ...current };
        delete next.turnstile;
        return next;
      });
    }
  }, []);
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(''), []);
  const handleTurnstileError = useCallback(() => setTurnstileToken(''), []);

  useEffect(() => {
    setFields((current) => restoreSafeProgress(current));
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (storageReady) persistSafeProgress(fields);
  }, [fields, storageReady]);

  useEffect(() => {
    if (status !== 'success') return undefined;
    const frame = window.requestAnimationFrame(() => successRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [status]);

  const messageFields = useMemo(
    () => ({
      ...fields,
      source,
      requestTitle,
    }),
    [fields, requestTitle, source],
  );
  const mailto = useMemo(() => getMailto(messageFields), [messageFields]);
  const whatsapp = useMemo(() => getWhatsappUrl(messageFields), [messageFields]);

  const clearError = (name) => {
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const updateField = (name, value) => {
    setFields((current) => ({ ...current, [name]: value }));
    clearError(name);
    if (status === 'error') {
      setStatus('idle');
      setSubmissionError('');
    }
  };

  const updateLeg = (index, name, value) => {
    setFields((current) => ({
      ...current,
      legs: current.legs.map((leg, legIndex) => (legIndex === index ? { ...leg, [name]: value } : leg)),
    }));
    clearError(`legs.${index}.${name}`);
    clearError('legs');
  };

  const validateOnBlur = (name) => {
    const nextErrors = validateQuoteFields(fields);
    setErrors((current) => {
      const next = { ...current };
      if (nextErrors[name]) next[name] = nextErrors[name];
      else delete next[name];
      return next;
    });
  };

  const addLeg = () => {
    setFields((current) =>
      current.legs.length >= MAX_LEGS ? current : { ...current, legs: [...current.legs, createLeg()] },
    );
    clearError('legs');
  };

  const removeLeg = (index) => {
    setFields((current) => {
      if (current.legs.length <= 2) return current;
      return { ...current, legs: current.legs.filter((_, legIndex) => legIndex !== index) };
    });
    setErrors({});
  };

  const focusErrorSummary = () => {
    window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
  };

  const reset = () => {
    clearSafeProgress();
    setFields(createInitialFields());
    setErrors({});
    setStatus('idle');
    setSubmissionError('');
    setTicketMeta(null);
    setTurnstileToken('');
    turnstileResetRef.current?.();
  };

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const validationErrors = validateQuoteFields(fields);
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      validationErrors.turnstile = 'Complete the human-verification challenge.';
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus('error');
      setSubmissionError('Review the highlighted fields and try again.');
      focusErrorSummary();
      return;
    }

    setStatus('submitting');
    setErrors({});
    setSubmissionError('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...messageFields, turnstileToken }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const serverErrors = data.fieldErrors && typeof data.fieldErrors === 'object' ? data.fieldErrors : {};
        if (data.code === 'FORM_TIMING') {
          setFields((current) => ({ ...current, formStartedAt: Date.now() }));
        }
        setErrors(serverErrors);
        setStatus('error');
        setSubmissionError(data.error || 'The request could not be sent. Your entries have been kept.');
        focusErrorSummary();
        setTurnstileToken('');
        turnstileResetRef.current?.();
        return;
      }

      setTicketMeta({ reference: data.reference });
      setStatus('success');
      clearSafeProgress();
      setTurnstileToken('');
      turnstileResetRef.current?.();
    } catch {
      setStatus('error');
      setSubmissionError('The request service is not reachable right now. Your entries have been kept.');
      focusErrorSummary();
      setTurnstileToken('');
      turnstileResetRef.current?.();
    }
  };

  const describedBy = (name, { help = false } = {}) => {
    const ids = [];
    if (help) ids.push(`${fieldId(name)}-help`);
    if (errors[name]) ids.push(`${fieldId(name)}-error`);
    return ids.length ? ids.join(' ') : undefined;
  };

  const inputA11y = (name, options) => ({
    id: fieldId(name),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': describedBy(name, options),
    onBlur: () => validateOnBlur(name),
  });

  const errorEntries = Object.entries(errors);
  const formClassName = `quote-form quote-form--${variant} quote-form--phone`;
  const isMultiCity = fields.tripType === 'multi_city';
  const isRoundTrip = fields.tripType === 'round_trip';
  const minimumTravelDate = todayIso();

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        className={`${formClassName} quote-form--success`}
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <div className="quote-success">
          {confirmationContext?.advisorAvatarSrc ? (
            <div className="quote-success__identity">
              <SuccessAdvisorAvatar
                src={confirmationContext.advisorAvatarSrc}
                alt="Derek Monti"
              />
              <div className="quote-success__identity-copy">
                <span>Your advisor</span>
                <strong>Derek Monti</strong>
              </div>
            </div>
          ) : (
            <div className="quote-success__icon" aria-hidden="true">
              <CheckCircle2 size={32} strokeWidth={2.2} />
            </div>
          )}
          <div className="quote-success__copy">
            <h3>Request received</h3>
            <p>
              Your reference is <strong>{ticketMeta?.reference || 'available in your confirmation'}</strong>. Derek
              will review the itinerary and use your preferred contact method for the next step.
            </p>
            <div className="quote-success__meta">
              <span>What happens next</span>
              <strong>Your request will be reviewed personally. Fares and availability are confirmed before booking.</strong>
            </div>
            <button type="button" className="quote-success__reset" onClick={reset}>
              Send another request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={formClassName} onSubmit={submit} noValidate aria-busy={status === 'submitting'}>
      <div className="quote-form__honeypot" aria-hidden="true">
        <label htmlFor={fieldId('companyWebsite')}>Company website</label>
        <input
          id={fieldId('companyWebsite')}
          name="companyWebsite"
          value={fields.companyWebsite}
          onChange={(event) => updateField('companyWebsite', event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          maxLength={120}
        />
      </div>

      {(submissionError || errorEntries.length > 0) && (
        <div
          className="quote-form__error"
          role="alert"
          aria-labelledby={fieldId('error-summary-title')}
          ref={errorSummaryRef}
          tabIndex={-1}
        >
          <p id={fieldId('error-summary-title')}>
            <strong>{submissionError || 'Review the highlighted fields.'}</strong>
          </p>
          {errorEntries.length > 0 && (
            <ul>
              {errorEntries.map(([name, message]) => (
                <li key={name}>
                  <a href={`#${fieldId(name)}`}>
                    {humanizeErrorKey(name)}: {message}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {status === 'error' && submissionError && !errorEntries.length && (
            <div className="quote-form__error-actions">
              <Button href={whatsapp} variant="primary" icon={false}>
                Message Derek on WhatsApp
              </Button>
              <a href={mailto} className="quote-form__error-mailto">
                Or open your email app
              </a>
            </div>
          )}
        </div>
      )}

      <fieldset className="quote-form__tabs">
        <legend>Trip type</legend>
        {TRIP_TYPE_OPTIONS.map((option) => {
          const id = fieldId(`tripType-${option.value}`);
          return (
            <label className={fields.tripType === option.value ? 'active' : ''} htmlFor={id} key={option.value}>
              <input
                id={id}
                type="radio"
                name={`tripType-${instanceId}`}
                value={option.value}
                checked={fields.tripType === option.value}
                onChange={() => {
                  updateField('tripType', option.value);
                  setErrors({});
                }}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </fieldset>

      <div className="quote-form__grid">
        {isMultiCity ? (
          <fieldset
            className="quote-form__multi-city"
            id={fieldId('legs')}
            tabIndex={errors.legs ? -1 : undefined}
            aria-describedby={errors.legs ? `${fieldId('legs')}-error` : undefined}
          >
            <legend>Multi-city itinerary</legend>
            {errors.legs && (
              <p className="quote-field__error" id={`${fieldId('legs')}-error`}>
                {errors.legs}
              </p>
            )}
            {fields.legs.map((leg, index) => (
              <div className="quote-form__leg" key={`leg-${index + 1}`}>
                <h3>Flight {index + 1}</h3>
                <Field
                  id={fieldId(`legs.${index}.from`)}
                  icon={Plane}
                  label="Origin"
                  required
                  error={errors[`legs.${index}.from`]}
                >
                  <input
                    {...inputA11y(`legs.${index}.from`)}
                    name={`legs[${index}][from]`}
                    value={leg.from}
                    onChange={(event) => updateLeg(index, 'from', event.target.value)}
                    placeholder="City or airport"
                    autoComplete="off"
                    maxLength={80}
                    required
                  />
                </Field>
                <Field
                  id={fieldId(`legs.${index}.to`)}
                  icon={MapPin}
                  label="Destination"
                  required
                  error={errors[`legs.${index}.to`]}
                >
                  <input
                    {...inputA11y(`legs.${index}.to`)}
                    name={`legs[${index}][to]`}
                    value={leg.to}
                    onChange={(event) => updateLeg(index, 'to', event.target.value)}
                    placeholder="City or airport"
                    autoComplete="off"
                    maxLength={80}
                    required
                  />
                </Field>
                <Field
                  id={fieldId(`legs.${index}.departure`)}
                  label="Departure"
                  required
                  error={errors[`legs.${index}.departure`]}
                >
                  <input
                    {...inputA11y(`legs.${index}.departure`)}
                    type="date"
                    name={`legs[${index}][departure]`}
                    value={leg.departure}
                    min={minimumTravelDate}
                    onChange={(event) => updateLeg(index, 'departure', event.target.value)}
                    required
                  />
                </Field>
                {fields.legs.length > 2 && (
                  <button
                    type="button"
                    className="quote-form__remove-leg"
                    onClick={() => removeLeg(index)}
                    aria-label={`Remove flight ${index + 1}`}
                  >
                    <Trash2 aria-hidden="true" size={16} />
                    Remove flight
                  </button>
                )}
              </div>
            ))}
            {fields.legs.length < MAX_LEGS && (
              <button type="button" className="quote-form__add-leg" onClick={addLeg}>
                <Plus aria-hidden="true" size={17} />
                Add another flight
              </button>
            )}
          </fieldset>
        ) : (
          <>
            <Field id={fieldId('from')} icon={Plane} label="From" required error={errors.from}>
              <input
                {...inputA11y('from')}
                name="from"
                value={fields.from}
                onChange={(event) => updateField('from', event.target.value)}
                placeholder="City or airport"
                autoComplete="off"
                maxLength={80}
                required
              />
            </Field>
            <Field id={fieldId('to')} icon={MapPin} label="To" required error={errors.to}>
              <input
                {...inputA11y('to')}
                name="to"
                value={fields.to}
                onChange={(event) => updateField('to', event.target.value)}
                placeholder="City or airport"
                autoComplete="off"
                maxLength={80}
                required
              />
            </Field>
            <Field id={fieldId('departure')} label="Departure" required error={errors.departure}>
              <input
                {...inputA11y('departure')}
                type="date"
                name="departure"
                value={fields.departure}
                min={minimumTravelDate}
                onChange={(event) => updateField('departure', event.target.value)}
                required
              />
            </Field>
            {isRoundTrip && (
              <Field id={fieldId('returnDate')} label="Return" required error={errors.returnDate}>
                <input
                  {...inputA11y('returnDate')}
                  type="date"
                  name="returnDate"
                  value={fields.returnDate}
                  min={fields.departure || undefined}
                  onChange={(event) => updateField('returnDate', event.target.value)}
                  required
                />
              </Field>
            )}
          </>
        )}

        <Field id={fieldId('travelers')} icon={Users} label="Travelers" required error={errors.travelers}>
          <select
            {...inputA11y('travelers')}
            name="travelers"
            value={fields.travelers}
            onChange={(event) => updateField('travelers', event.target.value)}
            required
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
              <option value={String(count)} key={count}>
                {count} {count === 1 ? 'traveler' : 'travelers'}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId('cabin')} label="Cabin preference" required error={errors.cabin}>
          <select
            {...inputA11y('cabin')}
            name="cabin"
            value={fields.cabin}
            onChange={(event) => updateField('cabin', event.target.value)}
            required
          >
            {CABIN_OPTIONS.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId('flexibility')} label="Date flexibility" required error={errors.flexibility}>
          <select
            {...inputA11y('flexibility')}
            name="flexibility"
            value={fields.flexibility}
            onChange={(event) => updateField('flexibility', event.target.value)}
            required
          >
            {FLEXIBILITY_OPTIONS.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId('fullName')} label="Full name" required error={errors.fullName}>
          <input
            {...inputA11y('fullName')}
            name="fullName"
            value={fields.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            autoComplete="name"
            maxLength={80}
            required
          />
        </Field>

        <Field id={fieldId('email')} icon={Mail} label="Email" required error={errors.email}>
          <input
            {...inputA11y('email')}
            name="email"
            type="email"
            value={fields.email}
            onChange={(event) => updateField('email', event.target.value)}
            autoComplete="email"
            inputMode="email"
            maxLength={120}
            required
          />
        </Field>

        <Field
          id={fieldId('phone')}
          icon={Phone}
          label="Phone or WhatsApp"
          error={errors.phone}
          help="Optional unless you prefer phone or WhatsApp contact."
        >
          <input
            {...inputA11y('phone', { help: true })}
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
          />
        </Field>

        <Field
          id={fieldId('contactPreference')}
          label="Preferred contact"
          required
          error={errors.contactPreference}
        >
          <select
            {...inputA11y('contactPreference')}
            name="contactPreference"
            value={fields.contactPreference}
            onChange={(event) => updateField('contactPreference', event.target.value)}
            required
          >
            {CONTACT_PREFERENCE_OPTIONS.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId('notes')} label="Notes or priorities" wide>
          <textarea
            id={fieldId('notes')}
            name="notes"
            value={fields.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Airline preferences, schedule priorities, or accessibility needs (optional)"
            rows={3}
            maxLength={600}
          />
        </Field>

        <div className="quote-form__privacy">
          <input
            id={fieldId('privacyAcknowledged')}
            name="privacyAcknowledged"
            type="checkbox"
            checked={fields.privacyAcknowledged}
            onChange={(event) => updateField('privacyAcknowledged', event.target.checked)}
            onBlur={() => validateOnBlur('privacyAcknowledged')}
            aria-invalid={errors.privacyAcknowledged ? 'true' : undefined}
            aria-describedby={errors.privacyAcknowledged ? `${fieldId('privacyAcknowledged')}-error` : undefined}
            required
          />
          <label htmlFor={fieldId('privacyAcknowledged')}>
            I have read the{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy (opens in a new tab)
            </a>{' '}
            and agree that my trip and contact details may be used to respond to this request. (required)
          </label>
          {errors.privacyAcknowledged && (
            <p className="quote-field__error" id={`${fieldId('privacyAcknowledged')}-error`}>
              {errors.privacyAcknowledged}
            </p>
          )}
        </div>

        <button className="quote-form__submit" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Send aria-hidden="true" size={18} />
              <span>Sending&hellip;</span>
            </>
          ) : (
            <>
              <Search aria-hidden="true" size={20} />
              <span>Send trip for review</span>
            </>
          )}
        </button>
      </div>

      {TURNSTILE_SITE_KEY && (
        <div
          className="quote-form__turnstile"
          id={fieldId('turnstile')}
          tabIndex={errors.turnstile ? -1 : undefined}
          aria-describedby={errors.turnstile ? `${fieldId('turnstile')}-error` : undefined}
        >
          <TurnstileWidget
            siteKey={TURNSTILE_SITE_KEY}
            onToken={handleTurnstileToken}
            onExpire={handleTurnstileExpire}
            onError={handleTurnstileError}
            registerReset={registerTurnstileReset}
          />
          {errors.turnstile && (
            <p className="quote-field__error" id={`${fieldId('turnstile')}-error`}>
              {errors.turnstile}
            </p>
          )}
        </div>
      )}

      <p className="quote-form__privacy-note">
        Your details are used only to review and respond to this request. No payment is collected here.
      </p>
    </form>
  );
}
