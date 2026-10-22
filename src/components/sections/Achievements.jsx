import { useEffect, useState } from 'react';
import Section from '../ui/Section.jsx';
import { achievements, leadership } from '../../data/highlights.js';

const N = achievements.length;

// Awards sit in a 3D coverflow that loops; the centre card is the active one.
function AwardRing() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d) => setIndex((i) => i + d);
  const active = ((index % achievements.length) + achievements.length) % achievements.length;

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setIndex((i) => i + 1), 3600);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="ring-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ring-stage">
        <ul className="ring">
          {achievements.map((x, i) => {
            const off = ((((i - index) % N) + N + N / 2) % N) - N / 2;
            return (
            <li
              className={`ring-card${i === active ? ' is-front' : ''}`}
              style={{ '--o': off }}
              key={x.title}
              aria-hidden={i !== active}
            >
              <span className="ring-medal" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </li>
            );
          })}
        </ul>
        <div className="ring-floor" aria-hidden="true" />
      </div>
      <div className="ring-controls">
        <button type="button" onClick={() => go(-1)} aria-label="Previous achievement">‹</button>
        <span className="ring-count" aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(achievements.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => go(1)} aria-label="Next achievement">›</button>
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <Section id="achievements">
      <div className="wall">
        <p className="eyebrow">Recognition</p>
        <h2 className="wall-title">Achievements</h2>
        <AwardRing />
        <p className="eyebrow">Beyond the code</p>
        <h2 className="wall-title">Leadership</h2>
        <ul className="wall-lead">
          {leadership.map((l, i) => (
            <li style={{ '--n': i }} key={l.role}><strong>{l.role}</strong><span>{l.org}</span></li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
