import Section from '../ui/Section.jsx';
import { skills } from '../../data/highlights.js';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technical toolkit">
      <div className="skill-grid">
        {skills.map((g) => (
          <div className="card" key={g.group}>
            <h3 className="card-title">{g.group}</h3>
            <ul className="tags">
              {g.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
