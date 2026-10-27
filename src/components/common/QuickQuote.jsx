import { useEffect, useId, useRef, useState } from 'react';
import { Armchair, CalendarDays, ChevronDown, PlaneLanding, PlaneTakeoff, Users } from 'lucide-react';
import { CABIN_OPTIONS, TRIP_TYPE_OPTIONS } from '../../utils/quoteRequest.js';
import Button from './Button.jsx';

const STORAGE_KEY = 'fly-with-derek:quote-progress:v2';
const PREFILL_EVENT = 'fly-with-derek:quote-prefill';
const QUICK_TRIP_TYPES = TRIP_TYPE_OPTIONS.filter((option) => option.value === 'round_trip' || option.value === 'one_way');
const TRAVELER_COUNTS = Array.from({ length: 10 }, (_, index) => index + 1);
const CABIN_VALUES = new Set(CABIN_OPTIONS.map((option) => option.value));

function todayIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function normalizeCabinProp(cabin) {
  const value = String(cabin || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  return CABIN_VALUES.has(value) ? value : 'business';
}

function mergeStoredProgress(partial) {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : null;
    const base = existing && typeof existing === 'object' && !Array.isArray(existing) ? existing : {};
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...base, ...partial }));
  } catch {
    // Storage may be blocked; the event dispatch and scroll still work without it.
  }
}

function isFillableField(element) {
  if (element.disabled || element.tabIndex === -1) return false;
  if (element.closest('[aria-hidden="true"]')) return false;
  const type = String(element.type || '').toLowerCase();
  if (['hidden', 'radio', 'checkbox', 'submit', 'button'].includes(type)) return false;
  return String(element.value || '').trim() === '';
}

function handOffToRequestForm() {
  const target = document.getElementById('request-form');
  if (!target) {
    window.location.assign('/#request-form');
    return;
  }

  const reduceMotion =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

  const firstEmpty = Array.from(target.querySelectorAll('input, select, textarea')).find(isFillableField);
  if (firstEmpty) {
    try {
      firstEmpty.focus({ preventScroll: true });
    } catch {
      firstEmpty.focus();
    }
  }
}

export default function QuickQuote({ variant = 'hero', cabin = null, label = 'Get my quote' }) {
  const instanceId = useId().replace(/:/g, '');
  const fieldId = (name) => `quick-quote-${instanceId}-${name}`;

  const [tripType, setTripType] = useState('round_trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [cabinValue, setCabinValue] = useState(() => normalizeCabinProp(cabin));
  const [minDate, setMinDate] = useState('');
  const [error, setError] = useState('');
  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    setMinDate(todayIso());
  }, []);

  useEffect(() => {
    if (cabin) setCabinValue(normalizeCabinProp(cabin));
  }, [cabin]);

  const isOneWay = tripType === 'one_way';
  const errorId = fieldId('error');

  const handleSubmit = (event) => {
    event.preventDefault();
    const origin = from.trim();
    const destination = to.trim();

    if (!origin || !destination) {
      setError(
        !origin && !destination
          ? 'Tell me where you are flying from and to, and I will take it from there.'
          : !origin
            ? 'Add the city or airport you are flying from.'
            : 'Add the city or airport you are flying to.',
      );
      (!origin ? fromRef.current : toRef.current)?.focus();
      return;
    }

    setError('');
    const partial = {
      tripType,
      from: origin,
      to: destination,
      departure,
      returnDate: isOneWay ? '' : returnDate,
      travelers,
      cabin: cabinValue,
    };

    mergeStoredProgress(partial);
    try {
      window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: partial }));
    } catch {
      // CustomEvent is unavailable in very old engines; the stored progress still carries the data.
    }
    handOffToRequestForm();
  };

  const classes = ['quick-quote', `quick-quote--${variant}`, isOneWay ? 'quick-quote--one-way' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <form className={classes} onSubmit={handleSubmit} noValidate aria-describedby={error ? errorId : undefined}>
      <fieldset className="quick-quote__trip">
        <legend className="quick-quote__legend">Trip type</legend>
        <div className="quick-quote__segment">
          {QUICK_TRIP_TYPES.map((option) => {
            const id = fieldId(`trip-${option.value}`);
            return (
              <label className="quick-quote__option" htmlFor={id} key={option.value}>
                <input
                  id={id}
                  type="radio"
                  name={`tripType-${instanceId}`}
                  value={option.value}
                  checked={tripType === option.value}
                  onChange={() => setTripType(option.value)}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="quick-quote__bar">
        <div className="quick-quote__field quick-quote__field--from">
          <label className="quick-quote__label" htmlFor={fieldId('from')}>
            From
          </label>
          <div className="quick-quote__control">
            <PlaneTakeoff className="quick-quote__icon" aria-hidden="true" size={18} strokeWidth={2} />
            <input
              ref={fromRef}
              id={fieldId('from')}
              name="from"
              type="text"
              value={from}
              onChange={(event) => {
                setFrom(event.target.value);
                if (error) setError('');
              }}
              placeholder="From: city or airport"
              autoComplete="off"
              maxLength={80}
              required
              aria-invalid={error && !from.trim() ? 'true' : undefined}
              aria-describedby={error ? errorId : undefined}
            />
          </div>
        </div>

        <div className="quick-quote__field quick-quote__field--to">
          <label className="quick-quote__label" htmlFor={fieldId('to')}>
            To
          </label>
          <div className="quick-quote__control">
            <PlaneLanding className="quick-quote__icon" aria-hidden="true" size={18} strokeWidth={2} />
            <input
              ref={toRef}
              id={fieldId('to')}
              name="to"
              type="text"
              value={to}
              onChange={(event) => {
                setTo(event.target.value);
                if (error) setError('');
              }}
              placeholder="To: city or airport"
              autoComplete="off"
              maxLength={80}
              required
              aria-invalid={error && !to.trim() ? 'true' : undefined}
              aria-describedby={error ? errorId : undefined}
            />
          </div>
        </div>

        <div className="quick-quote__field quick-quote__field--departure">
          <label className="quick-quote__label" htmlFor={fieldId('departure')}>
            Departure
          </label>
          <div className="quick-quote__control">
            <CalendarDays className="quick-quote__icon" aria-hidden="true" size={18} strokeWidth={2} />
            <input
              id={fieldId('departure')}
              name="departure"
              type="date"
              value={departure}
              min={minDate || undefined}
              onChange={(event) => setDeparture(event.target.value)}
            />
          </div>
        </div>

        {!isOneWay && (
          <div className="quick-quote__field quick-quote__field--return">
            <label className="quick-quote__label" htmlFor={fieldId('return')}>
              Return
            </label>
            <div className="quick-quote__control">
              <CalendarDays className="quick-quote__icon" aria-hidden="true" size={18} strokeWidth={2} />
              <input
                id={fieldId('return')}
                name="returnDate"
                type="date"
                value={returnDate}
                min={departure || minDate || undefined}
                onChange={(event) => setReturnDate(event.target.value)}
              />
            </div>
          </div>
        )}

        <div className="quick-quote__field quick-quote__field--travelers">
          <label className="quick-quote__label" htmlFor={fieldId('travelers')}>
            Travelers
          </label>
          <div className="quick-quote__control">
            <Users className="quick-quote__icon" aria-hidden="true" size={18} strokeWidth={2} />
            <select
              id={fieldId('travelers')}
              name="travelers"
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
            >
              {TRAVELER_COUNTS.map((count) => (
                <option value={String(count)} key={count}>
                  {count} {count === 1 ? 'traveler' : 'travelers'}
                </option>
              ))}
            </select>
            <ChevronDown className="quick-quote__chevron" aria-hidden="true" size={16} strokeWidth={2.2} />
          </div>
        </div>

        <div className="quick-quote__field quick-quote__field--cabin">
          <label className="quick-quote__label" htmlFor={fieldId('cabin')}>
            Cabin
          </label>
          <div className="quick-quote__control">
            <Armchair className="quick-quote__icon" aria-hidden="true" size={18} strokeWidth={2} />
            <select
              id={fieldId('cabin')}
              name="cabin"
              value={cabinValue}
              onChange={(event) => setCabinValue(event.target.value)}
            >
              {CABIN_OPTIONS.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="quick-quote__chevron" aria-hidden="true" size={16} strokeWidth={2.2} />
          </div>
        </div>

        <div className="quick-quote__action">
          <Button type="submit" variant="primary" className="quick-quote__submit">
            {label}
          </Button>
        </div>
      </div>

      {error && (
        <p className="quick-quote__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
