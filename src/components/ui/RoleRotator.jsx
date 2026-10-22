import { useEffect, useState } from 'react';

const INTERVAL_MS = 2400;

// Cycles through short role titles; each swap re-keys the span so the CSS entrance replays.
export default function RoleRotator({ roles }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [roles.length]);
  return (
    <p className="role-rotator">
      <span className="sr-only">{roles.join(', ')}</span>
      <span key={i} className="role-word" aria-hidden="true">{roles[i]}</span>
    </p>
  );
}
