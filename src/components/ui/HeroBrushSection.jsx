import { useEffect, useRef, useState } from 'react';
import { GithubIcon, LinkedinIcon, InstagramIcon, MailIcon, DownloadIcon } from './Icons.jsx';
import { profile } from '../../data/profile.js';

const BASE_SRC = '/assets/hero-developer.png';
const REVEAL_SRC = '/assets/hero-student.png';

const BRUSH_RADIUS = 115; // px, feathered edge included
const STAMP_SPACING = 0.22; // fraction of radius between interpolated stamps
const LIFETIME_MS = 2200; // time for a stroke to fade fully
const IDLE_MS = 2500; // touch devices: auto-pulse after this long without input

const links = [
  { label: 'GitHub', href: profile.socials.github, Icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'Instagram', href: profile.socials.instagram, Icon: InstagramIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: 'Resume', href: profile.resume, Icon: DownloadIcon, download: true },
];

// object-fit: cover geometry, so the canvas image lines up with the <img> beneath it
function drawCover(ctx, img, w, h) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) * 0.3, dw, dh); // matches object-position: 50% 30%
}

// Pre-rendered feathered dab, stamped with globalAlpha each frame
function makeBrushSprite(radius, dpr) {
  const size = Math.ceil(radius * 2 * dpr);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, 'rgba(0,0,0,1)');
  grad.addColorStop(0.45, 'rgba(0,0,0,0.85)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export default function HeroBrushSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState({ base: false, reveal: false });
  const ready = loaded.base && loaded.reveal;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const mask = document.createElement('canvas');
    const mctx = mask.getContext('2d');

    const reveal = new Image();
    let revealLoaded = false;
    let sprite = null;
    let dpr = 1;
    let w = 0;
    let h = 0;
    let stamps = []; // { x, y, t } in CSS px
    let last = null;
    let raf = 0;
    let lastInput = performance.now();
    let disposed = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = mask.width = Math.round(w * dpr);
      canvas.height = mask.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sprite = makeBrushSprite(BRUSH_RADIUS, dpr);
      schedule();
    };

    const toLocal = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const paint = (x, y) => {
      lastInput = performance.now();
      const now = lastInput;
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const step = BRUSH_RADIUS * STAMP_SPACING;
        const n = Math.max(1, Math.floor(dist / step));
        for (let i = 1; i <= n; i += 1) {
          const k = i / n;
          stamps.push({ x: last.x + (x - last.x) * k, y: last.y + (y - last.y) * k, t: now });
        }
      } else {
        stamps.push({ x, y, t: now });
      }
      last = { x, y };
      schedule();
    };

    const frame = (now) => {
      raf = 0;
      stamps = stamps.filter((s) => now - s.t < LIFETIME_MS);

      mctx.clearRect(0, 0, w, h);
      for (const s of stamps) {
        const life = 1 - (now - s.t) / LIFETIME_MS;
        mctx.globalAlpha = life * life * (3 - 2 * life); // smoothstep ease-out
        mctx.drawImage(sprite, s.x - BRUSH_RADIUS, s.y - BRUSH_RADIUS, BRUSH_RADIUS * 2, BRUSH_RADIUS * 2);
      }
      mctx.globalAlpha = 1;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      if (stamps.length && revealLoaded) {
        drawCover(ctx, reveal, w, h);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(mask, 0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
      }

      // touch devices without active finger: gentle autonomous pulse
      if (coarse && !reducedMotion && now - lastInput > IDLE_MS) {
        const t = now / 1000;
        last = null;
        paint(w * (0.5 + 0.28 * Math.sin(t * 0.7)), h * (0.35 + 0.18 * Math.sin(t * 1.1 + 1)));
        lastInput = now - IDLE_MS - 1; // keep idle state so pulse continues
      }
      if (stamps.length || (coarse && !reducedMotion)) schedule();
    };

    function schedule() {
      if (!raf && !disposed) raf = requestAnimationFrame(frame);
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return; // handled by touchmove
      const p = toLocal(e.clientX, e.clientY);
      paint(p.x, p.y);
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const p = toLocal(t.clientX, t.clientY);
      paint(p.x, p.y);
    };
    const endStroke = () => {
      last = null;
    };

    reveal.onload = () => {
      revealLoaded = true;
      schedule();
    };
    reveal.src = REVEAL_SRC;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', endStroke);
    section.addEventListener('touchstart', onTouch, { passive: true });
    section.addEventListener('touchmove', onTouch, { passive: true });
    section.addEventListener('touchend', endStroke);
    section.addEventListener('touchcancel', endStroke);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', endStroke);
      section.removeEventListener('touchstart', onTouch);
      section.removeEventListener('touchmove', onTouch);
      section.removeEventListener('touchend', endStroke);
      section.removeEventListener('touchcancel', endStroke);
    };
  }, []);

  // Preload both images for the fallback/skeleton state
  useEffect(() => {
    const mark = (key) => () => setLoaded((s) => ({ ...s, [key]: true }));
    const a = new Image();
    const b = new Image();
    a.onload = a.onerror = mark('base');
    b.onload = b.onerror = mark('reveal');
    a.src = BASE_SRC;
    b.src = REVEAL_SRC;
    return () => {
      a.onload = a.onerror = b.onload = b.onerror = null;
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className={`hbs ${ready ? 'is-ready' : ''}`}>
      <div className="hbs-bg" aria-hidden="true">
        <div className="hbs-stage">
          <img className="hbs-img" src={BASE_SRC} alt="" decoding="async" />
          <canvas ref={canvasRef} className="hbs-canvas" />
          <div className="hbs-dim" />
        </div>
      </div>

      <div className="hbs-fg">
        <div className="hbs-card">
          <span className="hbs-eyebrow">Hi, I'm</span>
          <h1 className="hbs-name">{profile.name}</h1>
          <p className="hbs-bio">{profile.tagline}</p>

          <ul className="hbs-links">
            {links.map(({ label, href, Icon, external, download }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(download ? { download: true } : {})}
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
