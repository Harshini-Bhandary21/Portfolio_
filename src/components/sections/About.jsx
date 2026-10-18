import Section from '../ui/Section.jsx';
import { profile, education } from '../../data/profile.js';
import { languages } from '../../data/highlights.js';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Building software that matters">
      <div className="about-grid">
        <div>
          <p className="lead">{profile.summary}</p>
          <p className="muted">Languages: {languages.join(' · ')}</p>
          <ul className="stats">
            {profile.stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="card-title">Education</h3>
          <ul className="timeline">
            {education.map((e) => (
              <li key={e.school}>
                <span className="period">{e.period}</span>
                <h4>{e.school}</h4>
                <p>{e.detail} · <strong>{e.highlight}</strong></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
