import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function fromIso(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDisplay(value) {
  const date = fromIso(value);
  if (!date) return 'mm / dd / yyyy';
  return `${String(date.getMonth() + 1).padStart(2, '0')} / ${String(date.getDate()).padStart(2, '0')} / ${date.getFullYear()}`;
}

function sameDay(a, b) {
  return Boolean(
    a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate(),
  );
}

function buildCalendar(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export default function DatePicker({ name, value, onChange, ariaLabel }) {
  const selectedDate = fromIso(value);
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate || new Date());
  const ref = useRef(null);
  const today = useMemo(() => new Date(), []);
  const days = useMemo(() => buildCalendar(visibleMonth), [visibleMonth]);

  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setVisibleMonth(selectedDate);
    }
  }, [value]);

  const chooseDate = (date) => {
    onChange({ target: { name, value: toIso(date) } });
    setOpen(false);
  };

  const clearDate = () => {
    onChange({ target: { name, value: '' } });
    setOpen(false);
  };

  const changeMonth = (delta) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  return (
    <div className={`date-picker ${open ? 'open' : ''}`} ref={ref}>
      <button
        type="button"
        className={`date-picker__button ${value ? 'selected' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{formatDisplay(value)}</span>
        <CalendarDays aria-hidden="true" size={19} strokeWidth={2.1} />
      </button>

      {open && (
        <div className="date-picker__panel" role="dialog" aria-label={ariaLabel}>
          <div className="date-picker__header">
            <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <strong>{monthFormatter.format(visibleMonth)}</strong>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>

          <div className="date-picker__weekdays">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="date-picker__grid">
            {days.map((date) => {
              const iso = toIso(date);
              const isSelected = sameDay(date, selectedDate);
              const isToday = sameDay(date, today);
              const isOutside = date.getMonth() !== visibleMonth.getMonth();

              return (
                <button
                  type="button"
                  key={iso}
                  className={`${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isOutside ? 'outside' : ''}`}
                  onClick={() => chooseDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="date-picker__footer">
            <button type="button" onClick={clearDate}>
              <X aria-hidden="true" size={14} />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
