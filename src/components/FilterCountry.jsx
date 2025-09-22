import React, { useEffect, useMemo, useRef, useState } from 'react'

function FilterCountry({ value, onselect }) {
  // Use API slugs as values (lowercase) to match App.jsx fetch logic
  const continents = useMemo(() => ([
    { id: 0, value: 'all', label: 'All Regions' },
    { id: 1, value: 'africa', label: 'Africa' },
    { id: 2, value: 'americas', label: 'Americas' },
    { id: 3, value: 'asia', label: 'Asia' },
    { id: 4, value: 'europe', label: 'Europe' },
    { id: 5, value: 'oceania', label: 'Oceania' },
    { id: 6, value: 'antarctic', label: 'Antarctic' },
  ]), []);

  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const current = continents.find(c => c.value === value) || continents[0];

  // Close on outside click
  useEffect(() => {
    function handleDocPointerUp(e) {
      if (!open) return;
      if (btnRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener('pointerup', handleDocPointerUp);
    return () => document.removeEventListener('pointerup', handleDocPointerUp);
  }, [open]);

  const onButtonKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(v => !v);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const selectValue = (v) => {
    onselect?.(v);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="dropdown__control"
        aria-haspopup="listbox"
        aria-expanded={open}
        onPointerDown={(e) => { e.preventDefault(); setOpen(v => !v); }}
        onKeyDown={onButtonKeyDown}
        ref={btnRef}
      >
        <span>{current.label}</span>
        <span className="dropdown__chevron" aria-hidden>▾</span>
      </button>

      {open && (
        <ul
          className="dropdown__menu"
          role="listbox"
          aria-label="Filter by region"
          ref={menuRef}
          onPointerDownCapture={(e) => {
            if (e.nativeEvent && typeof e.nativeEvent.stopPropagation === 'function') {
              e.nativeEvent.stopPropagation();
            } else {
              e.stopPropagation();
            }
          }}
        >
          {continents.map((c) => (
            <li
              key={c.id}
              role="option"
              aria-selected={c.value === current.value}
              className={`dropdown__option${c.value === current.value ? ' is-selected' : ''}`}
              onPointerUp={(e) => { e.preventDefault(); selectValue(c.value); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectValue(c.value);
                }
              }}
              tabIndex={0}
            >
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterCountry