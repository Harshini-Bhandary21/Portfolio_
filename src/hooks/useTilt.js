import { useEffect } from 'react';

const SELECTOR = '.card, .stats li';
const MAX_DEG = 9;

// 3D hover tilt with a moving glare, via event delegation (no per-card listeners).
export default function useTilt() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let current = null;

    const reset = (el) => {
      el.style.transform = '';
      el.classList.remove('is-tilting');
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const el = e.target.closest?.(SELECTOR);
      if (current && current !== el) reset(current);
      current = el || null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      el.style.transform =
        `perspective(900px) rotateX(${(0.5 - py) * MAX_DEG}deg) rotateY(${(px - 0.5) * MAX_DEG * 1.4}deg) translateY(-4px) scale(1.015)`;
      el.classList.add('is-tilting');
    };
    const onLeave = () => {
      if (current) reset(current);
      current = null;
    };

    document.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      onLeave();
    };
  }, []);
}
