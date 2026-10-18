import Section from '../ui/Section.jsx';
import { experience } from '../../data/profile.js';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      {experience.map((x) => (
        <article className="card" key={x.role}>
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
      ))}
    </Section>
  );
}
