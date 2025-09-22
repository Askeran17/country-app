import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomSelect
 * Props:
 * - options: Array<{ value: string, label: string }>
 * - value: string | undefined
 * - onChange: (value: string) => void
 * - placeholder?: string
 * - className?: string
 */
export default function CustomSelect({ options, value, onChange, placeholder = 'Select…', className = '' }) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const toggle = () => setOpen((o) => !o);
  const selectOption = (opt) => {
    onChange && onChange(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
        setHighlightIndex(0);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (highlightIndex >= 0) selectOption(options[highlightIndex]);
    }
  };

  return (
    <div className={`custom-select ${className}`} ref={containerRef}>
      <button
        type="button"
        className="custom-select__control"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={`custom-select__chevron ${open ? 'open' : ''}`}
          viewBox="0 0 20 20"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            d="M5.5 7.5l4.5 4 4.5-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul className="custom-select__menu" role="listbox" tabIndex={-1}>
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`custom-select__option ${idx === highlightIndex ? 'is-active' : ''} ${
                value === opt.value ? 'is-selected' : ''
              }`}
              onMouseEnter={() => setHighlightIndex(idx)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectOption(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
