import Section from '../ui/Section.jsx';
import TechMarquee from '../ui/TechMarquee.jsx';
import { skills, iconUrl } from '../../data/highlights.js';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technical toolkit">
      <TechMarquee />
      <div className="skill-grid">
        {skills.map((g) => (
          <div className="card" key={g.group}>
            <h3 className="card-title">{g.group}</h3>
            <ul className="tags">
              {g.items.map((i) => (
                <li key={i}>
                  {iconUrl(i) && <img src={iconUrl(i)} alt="" width="14" height="14" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
