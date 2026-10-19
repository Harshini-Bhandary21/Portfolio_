import { useState } from 'react';
import { projects } from '../../data/projects.js';

// Deal projects into two rows that slide in opposite directions.
const rows = [projects.filter((_, i) => i % 2 === 0), projects.filter((_, i) => i % 2 === 1)];

function Card({ p, hue, hidden }) {
  const href = p.demo || p.github;
  const body = (
    <>
      <span className="show-kicker">{p.featured ? 'Featured project' : 'Project'}</span>
      <h3>{p.title}</h3>
      <p>{p.subtitle}</p>
      <ul>{p.stack.slice(0, 3).map((s) => <li key={s}>{s}</li>)}</ul>
      {href && <span className="show-link">{p.demo ? 'Live demo ↗' : 'View code ↗'}</span>}
    </>
  );
  const props = { className: 'show-card show-card-project', style: { '--h': hue } };
  return (
    <li aria-hidden={hidden || undefined}>
      {href ? (
        <a {...props} href={href} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>{body}</a>
      ) : (
        <div {...props}>{body}</div>
      )}
    </li>
  );
}

export default function Projects() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="projects" className={`showcase ${paused ? 'is-paused' : ''}`} aria-label="Projects">
      {rows.map((row, r) => (
        <div className={`show-row ${r ? 'is-reverse' : ''}`} key={r}>
          <ul className="show-track">
            {[0, 1].flatMap((copy) =>
              row.map((p) => (
                <Card p={p} hue={(projects.indexOf(p) * 47 + 250) % 360} hidden={copy === 1} key={`${copy}-${p.title}`} />
              ))
            )}
          </ul>
        </div>
      ))}
      <div className="show-title">
        <p className="eyebrow">Projects</p>
        <h2>Things I've built</h2>
        <p>Hover a card to bring it into focus</p>
      </div>
      <button className="show-pause" onClick={() => setPaused((x) => !x)} aria-label={paused ? 'Play projects' : 'Pause projects'}>
        {paused ? '▶' : '❚❚'}
      </button>
    </section>
  );
}
