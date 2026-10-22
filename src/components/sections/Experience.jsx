import Section from '../ui/Section.jsx';
import { experience } from '../../data/profile.js';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="xp-feature">
        {experience.map((x) => (
          <article className="xp-row" key={x.role}>
            <div className="xp-side">
              <span className="xp-year" aria-hidden="true">{x.period.match(/\d{4}/)?.[0]}</span>
              <span className="xp-period">{x.period}</span>
            </div>
            <div className="xp-main">
              <h3>{x.role}</h3>
              <p className="xp-org">{x.org} · Mentor: {x.mentor}</p>
              <ol className="xp-points">
                {x.points.map((p, i) => (
                  <li key={p}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><p>{p}</p></li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
