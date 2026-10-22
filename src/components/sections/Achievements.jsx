import Section from '../ui/Section.jsx';
import { achievements, leadership } from '../../data/highlights.js';

export default function Achievements() {
  return (
    <Section id="achievements">
      <div className="wall">
        <h2 className="wall-title">Achievements</h2>
        <ul className="wall-grid">
          {achievements.map((x, i) => (
            <li className="wall-tile" style={{ '--n': i }} key={x.title}>
              <span className="wall-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </li>
          ))}
        </ul>
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
