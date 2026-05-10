import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export default function SelectMenu({ name, value, options, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  const select = (nextValue) => {
    onChange({ target: { name, value: nextValue } });
    setOpen(false);
  };

  return (
    <div className={`custom-select ${open ? 'open' : ''}`} ref={ref}>
      <button
        type="button"
        className="custom-select__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span>
        <ChevronDown aria-hidden="true" size={17} strokeWidth={2.2} />
      </button>
      {open && (
        <div className="custom-select__menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option === value}
              className={option === value ? 'selected' : ''}
              key={option}
              onClick={() => select(option)}
            >
              <span>{option}</span>
              {option === value && <Check aria-hidden="true" size={15} strokeWidth={2.4} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
