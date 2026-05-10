import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Mail, MapPin, Plane, Search, Send, Users } from 'lucide-react';
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
};

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

export default function QuoteForm({ variant = 'hero', full = false }) {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const mailto = useMemo(() => getMailto(fields), [fields]);
  const whatsapp = useMemo(() => getWhatsappUrl(fields), [fields]);

  const update = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  };

  const reset = () => {
    setFields(initialFields);
    setStatus('idle');
    setErrorMsg('');
  };

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'We could not send your boarding pass right now.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Network error. Please try again.');
    }
  };

  const isOneWay = fields.tripType === 'One way';
  const passengerOptions = Array.from({ length: 10 }, (_, index) => {
    const count = index + 1;
    return `${count} ${count === 1 ? 'Passenger' : 'Passengers'}`;
  });

  if (status === 'success') {
    return (
      <div className={`quote-form quote-form--${variant} quote-form--success`} role="status" aria-live="polite">
        <div className="quote-success">
          <div className="quote-success__icon" aria-hidden="true">
            <CheckCircle2 size={32} strokeWidth={2.2} />
          </div>
          <div className="quote-success__copy">
            <h3>Your boarding pass is on its way</h3>
            <p>
              Check <strong>{fields.email}</strong> in a moment — Derek's branded ticket has been sent and
              he&rsquo;ll personally reply with options within hours.
            </p>
            <button type="button" className="quote-success__reset" onClick={reset}>
              Send another request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={`quote-form quote-form--${variant}`} onSubmit={submit} noValidate>
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
            <input name="name" value={fields.name} onChange={update} placeholder="Your name" />
          </Field>
        )}

        <Field icon={Plane} label="From" compact={!full}>
          <input name="from" value={fields.from} onChange={update} placeholder="Flying from?" />
        </Field>
        <Field icon={MapPin} label="To" compact={!full}>
          <input name="to" value={fields.to} onChange={update} placeholder="Where to?" />
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
          />
        </Field>

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
            <Field label="Phone / WhatsApp">
              <input name="phone" value={fields.phone} onChange={update} placeholder="+1 ..." />
            </Field>
            <Field label="Notes" wide>
              <textarea
                name="notes"
                value={fields.notes}
                onChange={update}
                placeholder="Airline preference, budget, timing, or anything Derek should know."
                rows={4}
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
