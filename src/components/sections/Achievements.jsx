import Section from '../ui/Section.jsx';
import { achievements, leadership } from '../../data/highlights.js';

export default function Achievements() {
  return (
    <Section id="achievements" eyebrow="Recognition" title="Achievements & leadership">
      <div className="achievement-grid">
        {achievements.map((a) => (
          <div className="card" key={a.title}>
            <h3 className="card-title">{a.title}</h3>
            <p>{a.text}</p>
          </div>
        ))}
      </div>
      <h3 className="subhead">Leadership &amp; activities</h3>
      <ul className="leadership">
        {leadership.map((l) => (
          <li key={l.role}><strong>{l.role}</strong> — {l.org}</li>
        ))}
      </ul>
    </Section>
  );
}
