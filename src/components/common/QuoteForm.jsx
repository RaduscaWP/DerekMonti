import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Mail, MapPin, Phone, Plane, Search, Send, Users } from 'lucide-react';
import { getMailto, getWhatsappUrl } from '../../utils/message.js';
import Button from './Button.jsx';
import DatePicker from './DatePicker.jsx';
import SelectMenu from './SelectMenu.jsx';

const initialFields = {
  tripType: 'Round trip',
  from: '',
  to: '',
  departure: '',
  returnDate: '',
  passengers: '1 Passenger',
  cabin: 'Business',
  name: '',
  email: '',
  phone: '',
  notes: '',
  companyWebsite: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE_ALLOWED_RE = /^[+()\d\s.-]+$/;

function isValidPhone(value) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  return trimmed.length > 0 && PHONE_ALLOWED_RE.test(trimmed) && digits.length >= 7 && digits.length <= 20;
}

function validateQuote(fields, { requirePhone = false } = {}) {
  if (!fields.from.trim() || !fields.to.trim()) {
    return 'Please add both origin and destination.';
  }

  if (!ISO_DATE_RE.test(fields.departure)) {
    return 'Please choose a departure date.';
  }

  if (!EMAIL_RE.test(fields.email.trim())) {
    return 'Please enter a valid email address, for example name@example.com.';
  }

  if (requirePhone && !isValidPhone(fields.phone)) {
    return 'Please enter a valid phone number so Derek can follow up quickly.';
  }

  return '';
}

function Field({ icon: Icon, label, children, compact = false, wide = false }) {
  return (
    <div
      className={`quote-field ${compact ? 'quote-field--compact' : ''} ${wide ? 'quote-field--wide' : ''}`}
    >
      <span className="quote-field__label">
        {Icon && <Icon aria-hidden="true" size={16} strokeWidth={2} />}
        {label}
      </span>
      {children}
    </div>
  );
}

export default function QuoteForm({
  variant = 'hero',
  full = false,
  requirePhone = false,
  source = '',
  requestTitle = '',
}) {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [ticketMeta, setTicketMeta] = useState(null);

  const messageFields = useMemo(
    () => ({
      ...fields,
      source,
      requestTitle,
    }),
    [fields, source, requestTitle],
  );
  const mailto = useMemo(() => getMailto(messageFields), [messageFields]);
  const whatsapp = useMemo(() => getWhatsappUrl(messageFields), [messageFields]);

  const update = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  };

  const reset = () => {
    setFields(initialFields);
    setStatus('idle');
    setErrorMsg('');
    setTicketMeta(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const validationError = validateQuote(fields, { requirePhone });
    if (validationError) {
      setStatus('error');
      setErrorMsg(validationError);
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageFields),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'We could not send your boarding pass right now.');
      }
      setTicketMeta({ reference: data.reference, issued: data.issued });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof TypeError
          ? 'The request service is not reachable from this page right now. Please use WhatsApp or email Derek directly.'
          : err.message || 'Network error. Please try again.',
      );
    }
  };

  const isOneWay = fields.tripType === 'One way';
  const showPhone = requirePhone || full;
  const passengerOptions = Array.from({ length: 10 }, (_, index) => {
    const count = index + 1;
    return `${count} ${count === 1 ? 'Passenger' : 'Passengers'}`;
  });
  const formClassName = `quote-form quote-form--${variant} ${showPhone ? 'quote-form--phone' : ''}`;

  if (status === 'success') {
    return (
      <div className={`${formClassName} quote-form--success`} role="status" aria-live="polite">
        <div className="quote-success">
          <div className="quote-success__icon" aria-hidden="true">
            <CheckCircle2 size={32} strokeWidth={2.2} />
          </div>
          <div className="quote-success__copy">
            <h3>Request received</h3>
            <p>
              Reference <strong>{ticketMeta?.reference || 'DM request'}</strong> has been sent to{' '}
              <strong>{fields.email}</strong>. Derek will audit the route, cabin, fare rules, and private availability
              before replying with options.
            </p>
            <div className="quote-success__meta">
              <span>Next step</span>
              <strong>Derek replies personally within hours.</strong>
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
    <form className={formClassName} onSubmit={submit} noValidate>
      <div className="quote-form__honeypot" aria-hidden="true">
        <label>
          Company website
          <input
            name="companyWebsite"
            value={fields.companyWebsite}
            onChange={update}
            tabIndex={-1}
            autoComplete="off"
            maxLength={120}
          />
        </label>
      </div>
      <div className="quote-form__tabs" role="tablist" aria-label="Trip type">
        {['Round trip', 'One way'].map((type) => (
          <button
            className={fields.tripType === type ? 'active' : ''}
            key={type}
            type="button"
            onClick={() => setFields((current) => ({ ...current, tripType: type }))}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="quote-form__grid">
        {full && (
          <Field label="Name">
            <input name="name" value={fields.name} onChange={update} placeholder="Your name" maxLength={80} />
          </Field>
        )}

        <Field icon={Plane} label="From" compact={!full}>
          <input name="from" value={fields.from} onChange={update} placeholder="Flying from?" maxLength={80} />
        </Field>
        <Field icon={MapPin} label="To" compact={!full}>
          <input name="to" value={fields.to} onChange={update} placeholder="Where to?" maxLength={80} />
        </Field>
        <Field icon={CalendarDays} label="Departure" compact={!full}>
          <DatePicker name="departure" value={fields.departure} onChange={update} ariaLabel="Departure date" />
        </Field>
        {!isOneWay && (
          <Field icon={CalendarDays} label="Return" compact={!full}>
            <DatePicker name="returnDate" value={fields.returnDate} onChange={update} ariaLabel="Return date" />
          </Field>
        )}
        <Field icon={Users} label="Passengers" compact={!full}>
          <SelectMenu
            name="passengers"
            value={fields.passengers}
            options={passengerOptions}
            onChange={update}
            ariaLabel="Passenger count"
          />
        </Field>
        <Field icon={Mail} label="Your email" compact={!full}>
          <input
            name="email"
            type="email"
            value={fields.email}
            onChange={update}
            placeholder="you@gmail.com"
            required
            autoComplete="email"
            maxLength={120}
          />
        </Field>
        {showPhone && (
          <Field icon={Phone} label="Phone Number" compact={!full}>
            <input
              name="phone"
              type="tel"
              value={fields.phone}
              onChange={update}
              placeholder="Your phone number"
              required={requirePhone}
              autoComplete="tel"
              maxLength={40}
            />
          </Field>
        )}

        {full && (
          <>
            <Field label="Cabin">
              <SelectMenu
                name="cabin"
                value={fields.cabin}
                options={['Business', 'First', 'Either']}
                onChange={update}
                ariaLabel="Cabin class"
              />
            </Field>
            <Field label="Notes" wide>
              <textarea
                name="notes"
                value={fields.notes}
                onChange={update}
                placeholder="Airline preference, budget, timing, or anything Derek should know."
                rows={4}
                maxLength={600}
              />
            </Field>
          </>
        )}

        <button
          className="quote-form__submit"
          type="submit"
          aria-label="Request quote"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Send aria-hidden="true" size={18} />
              <span>Sending&hellip;</span>
            </>
          ) : (
            <>
              <Search aria-hidden="true" size={20} />
              <span>Request</span>
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <div className="quote-form__error" role="alert">
          <p>{errorMsg}</p>
          <div className="quote-form__error-actions">
            <Button href={whatsapp} variant="primary" icon={false}>
              Message Derek on WhatsApp
            </Button>
            <a href={mailto} className="quote-form__error-mailto">
              Or open your email app
            </a>
          </div>
        </div>
      )}

      {full && status !== 'error' && (
        <div className="quote-form__actions">
          <Button href={whatsapp} variant="outline-dark" icon={false}>
            Chat on WhatsApp
          </Button>
          <p>Derek replies personally. No booking engine, no automated handoff.</p>
        </div>
      )}
    </form>
  );
}
