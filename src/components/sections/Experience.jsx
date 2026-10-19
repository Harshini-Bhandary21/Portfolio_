import Section from '../ui/Section.jsx';
import { experience } from '../../data/profile.js';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="xp-timeline" data-line>
      {experience.map((x) => (
        <div className="xp-item" key={x.role}>
        <span className="xp-dot" aria-hidden="true" />
        <article className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">{x.role}</h3>
              <p className="muted">{x.org} · Mentor: {x.mentor}</p>
            </div>
            <span className="period">{x.period}</span>
          </div>
          <ul className="bullets">
            {x.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </article>
        </div>
      ))}
      </div>
    </Section>
  );
}
