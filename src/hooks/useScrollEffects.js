import { useEffect } from 'react';

// Publishes scroll state as CSS variables: --scroll (px), --progress (0..1) on <html>,
// and --line (0..1) on every [data-line] element (drives growing timeline lines).
export default function useScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty('--scroll', String(window.scrollY));
      root.style.setProperty('--progress', String(Math.min(1, window.scrollY / max)));
      const vh = window.innerHeight;
      document.querySelectorAll('[data-line]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = (vh * 0.65 - r.top) / Math.max(1, r.height);
        el.style.setProperty('--line', String(Math.min(1, Math.max(0, p))));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
