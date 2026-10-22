import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '../../data/projects.js';

// Deal projects into two rows that slide in opposite directions.
const rows = [projects.filter((_, i) => i % 2 === 0), projects.filter((_, i) => i % 2 === 1)];

function Card({ p, hue, hidden, onOpen }) {
  return (
    <li aria-hidden={hidden || undefined}>
      <button
        type="button"
        className="show-card show-card-project"
        style={{ '--h': hue }}
        tabIndex={hidden ? -1 : undefined}
        onClick={(e) => onOpen(p, e.currentTarget)}
      >
        <span className="show-kicker">{p.featured ? 'Featured project' : 'Project'}</span>
        <h3>{p.title}</h3>
        <p>{p.subtitle}</p>
        <ul>{p.stack.slice(0, 3).map((s) => <li key={s}>{s}</li>)}</ul>
        <span className="show-link">View details →</span>
      </button>
    </li>
  );
}

// Full project write-up. Esc / backdrop click / close button dismiss it; focus returns to the opening card.
function ProjectModal({ p, hue, onClose, onStep }) {
  const closeRef = useRef(null);
  const handlers = useRef({ onClose, onStep });
  handlers.current = { onClose, onStep }; // keep the key listener stable across re-renders
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('modal-open');
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') handlers.current.onClose();
      if (e.key === 'ArrowLeft') handlers.current.onStep(-1);
      if (e.key === 'ArrowRight') handlers.current.onStep(1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.classList.remove('modal-open');
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const n = projects.indexOf(p) + 1;

  return (
    <div className="pm-backdrop" onClick={onClose}>
      <div
        className="pm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        style={{ '--h': hue }}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="pm-close" onClick={onClose} aria-label="Close project details">✕</button>
        <span className="show-kicker">{p.featured ? 'Featured project' : 'Project'}</span>
        <h3 id="pm-title">{p.title}</h3>
        <p className="pm-sub">{p.subtitle}</p>
        {p.description.map((d) => <p key={d}>{d}</p>)}
        <ul className="pm-stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
        <div className="pm-nav">
          <button type="button" onClick={() => onStep(-1)} aria-label="Previous project">← Prev</button>
          <span aria-live="polite">{n} / {projects.length}</span>
          <button type="button" onClick={() => onStep(1)} aria-label="Next project">Next →</button>
        </div>
        {(p.demo || p.github) && (
          <div className="pm-links">
            {p.demo && <a className="btn btn-primary" href={p.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
            {p.github && <a className="btn pm-ghost" href={p.github} target="_blank" rel="noopener noreferrer">View code ↗</a>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(null); // { p, opener }
  const step = useCallback((d) => {
    setOpen((o) => o && { ...o, p: projects[(projects.indexOf(o.p) + d + projects.length) % projects.length] });
  }, []);
  const close = () => {
    open?.opener?.focus();
    setOpen(null);
  };
  return (
    <section id="projects" className={`showcase ${paused || open ? 'is-paused' : ''}`} aria-label="Projects">
      {rows.map((row, r) => (
        <div className={`show-row ${r ? 'is-reverse' : ''}`} key={r}>
          <ul className="show-track">
            {[0, 1].flatMap((copy) =>
              row.map((p) => (
                <Card p={p} hue={(projects.indexOf(p) * 47 + 250) % 360} hidden={copy === 1} onOpen={(proj, opener) => setOpen({ p: proj, opener })} key={`${copy}-${p.title}`} />
              ))
            )}
          </ul>
        </div>
      ))}
      <div className="show-title">
        <p className="eyebrow">Projects</p>
        <h2>Things I've built</h2>
        <p>Select a card to open it</p>
      </div>
      <button className="show-pause" onClick={() => setPaused((x) => !x)} aria-label={paused ? 'Play projects' : 'Pause projects'}>
        {paused ? '▶' : '❚❚'}
      </button>
      {open && <ProjectModal p={open.p} hue={(projects.indexOf(open.p) * 47 + 250) % 360} onClose={close} onStep={step} />}
    </section>
  );
}
