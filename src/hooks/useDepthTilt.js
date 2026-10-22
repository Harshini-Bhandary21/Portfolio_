import { useEffect } from 'react';

// Selector -> max tilt in degrees. Tiles also get a moving glare (--mx/--my) and their children can pop out with translateZ.
const TARGETS = [
  ['.bento-tile', 11],
  ['.wall-tile', 11],
  ['.wall-lead li', 9],
  ['.xp-points li', 6],
  ['.sg-wrap', 2.5],
];
const SELECTOR = TARGETS.map(([s]) => s).join(',');

// Delegated 3D tilt for the non-project sections; the base useTilt hook only covers .card / .stats li.
export default function useDepthTilt() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let current = null;

    const reset = (el) => {
      el.style.transform = '';
      el.classList.remove('is-depth');
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const el = e.target.closest?.(SELECTOR);
      if (current && current !== el) reset(current);
      current = el || null;
      if (!el) return;
      const max = TARGETS.find(([s]) => el.matches(s))[1];
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max * 1.4}deg) translateZ(14px)`;
      el.classList.add('is-depth');
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
