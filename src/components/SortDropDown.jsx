import React, { useEffect, useRef, useState } from 'react'

function SortDropDown({ sortOrder, onSortChange }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const options = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  const current = options.find(o => o.value === sortOrder) || options[0];

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

  // Keyboard handling on button
  const onButtonKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(v => !v);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const selectValue = (value) => {
    // keep App.jsx handler API (expects event-like object)
    onSortChange?.({ target: { value } });
    setOpen(false);
  };

  return (
    <div className="dropdown" data-variant="compact">
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
          aria-label="Sort order"
          ref={menuRef}
          onPointerDownCapture={(e) => {
            // Stop native propagation so document-level pointerdown doesn't close it
            if (e.nativeEvent && typeof e.nativeEvent.stopPropagation === 'function') {
              e.nativeEvent.stopPropagation();
            } else {
              e.stopPropagation();
            }
          }}
        >
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === sortOrder}
              className={`dropdown__option${opt.value === sortOrder ? ' is-selected' : ''}`}
              onPointerUp={(e) => { e.preventDefault(); selectValue(opt.value); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectValue(opt.value);
                }
              }}
              tabIndex={0}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropDown;