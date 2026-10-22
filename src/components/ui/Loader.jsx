import { useEffect, useState } from 'react';
import { profile } from '../../data/profile.js';

const DURATION = 1100;
const SEEN_KEY = 'intro-seen';

const skipIntro = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

// Intro curtain: counts to 100, then slides away and flags <html> as loaded so hero text can animate in.
export default function Loader() {
  const [skip] = useState(skipIntro);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(skip);

  useEffect(() => {
    const root = document.documentElement;
    if (skip) {
      root.classList.add('is-loaded');
      return undefined;
    }
    root.classList.add('is-loading');
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        root.classList.remove('is-loading');
        root.classList.add('is-loaded');
        try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage unavailable */ }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('is-loading');
      root.classList.add('is-loaded');
    };
  }, [skip]);

  if (gone) return null;
  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} onTransitionEnd={() => leaving && setGone(true)} aria-hidden="true">
      <span className="loader-name">{profile.name}</span>
      <span className="loader-count">{String(pct).padStart(3, '0')}</span>
      <span className="loader-bar" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}
