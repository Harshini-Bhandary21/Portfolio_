import { useEffect } from 'react';
import HeroBrushSection from '../ui/HeroBrushSection.jsx';

// Publishes the pointer position as --hx/--hy (-1..1) on the hero so its layers can parallax in 3D.
export default function Hero() {
  useEffect(() => {
    const el = document.getElementById('home');
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--hx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty('--hy', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const onLeave = () => { el.style.setProperty('--hx', 0); el.style.setProperty('--hy', 0); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);
  return <HeroBrushSection />;
}
