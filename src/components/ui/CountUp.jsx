import { useEffect, useRef, useState } from 'react';

// Animates "9.13", "2", "4+" up from zero when scrolled into view; other strings render as-is.
export default function CountUp({ value, duration = 1400 }) {
  const m = /^(\d+(?:\.\d+)?)(\+?)$/.exec(value);
  const ref = useRef(null);
  const [shown, setShown] = useState(m ? 0 : null);

  useEffect(() => {
    if (!m) return undefined;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split('.')[1] || '').length;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target.toFixed(decimals));
      return undefined;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        setShown((target * (1 - (1 - t) ** 3)).toFixed(decimals));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{m ? `${shown}${m[2]}` : value}</span>;
}
