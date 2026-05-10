import { useMemo, useState } from 'react';
import { CalendarDays, MapPin, Plane, Search, Users } from 'lucide-react';
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

function Field({ icon: Icon, label, children, compact = false }) {
  return (
    <div className={`quote-field ${compact ? 'quote-field--compact' : ''}`}>
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

  const mailto = useMemo(() => getMailto(fields), [fields]);
  const whatsapp = useMemo(() => getWhatsappUrl(fields), [fields]);

  const update = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    window.location.href = mailto;
  };

  const isOneWay = fields.tripType === 'One way';
  const passengerOptions = Array.from({ length: 10 }, (_, index) => {
    const count = index + 1;
    return `${count} ${count === 1 ? 'Passenger' : 'Passengers'}`;
  });

  return (
    <form className={`quote-form quote-form--${variant}`} onSubmit={submit}>
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
          <>
            <Field label="Name">
              <input name="name" value={fields.name} onChange={update} placeholder="Your name" />
            </Field>
            <Field label="Email">
              <input name="email" value={fields.email} onChange={update} placeholder="you@example.com" />
            </Field>
          </>
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
            <label className="quote-field quote-field--wide">
              <span className="quote-field__label">Notes</span>
              <textarea
                name="notes"
                value={fields.notes}
                onChange={update}
                placeholder="Airline preference, budget, timing, or anything Derek should know."
                rows={4}
              />
            </label>
          </>
        )}

        <button className="quote-form__submit" type="submit" aria-label="Request quote">
          <Search aria-hidden="true" size={20} />
          <span>Request</span>
        </button>
      </div>

      {full && (
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
