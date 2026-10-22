import { useState } from 'react';

// Remembers a section's chosen layout in localStorage (falls back silently if storage is blocked).
export function useStoredChoice(key, options) {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return options.some(([k]) => k === v) ? v : options[0][0];
    } catch {
      return options[0][0];
    }
  });
  const set = (v) => {
    setValue(v);
    try { localStorage.setItem(key, v); } catch { /* storage unavailable */ }
  };
  return [value, set];
}

// Pill switch between layouts. `ink` is the variant for light sections.
export default function ViewToggle({ options, value, onChange, label, ink }) {
  return (
    <div className={`view-toggle ${ink ? 'view-toggle--ink' : ''}`} role="group" aria-label={label}>
      {options.map(([key, text]) => (
        <button key={key} type="button" aria-pressed={value === key} className={value === key ? 'is-on' : ''} onClick={() => onChange(key)}>
          {text}
        </button>
      ))}
    </div>
  );
}
