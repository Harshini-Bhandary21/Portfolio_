import Section from '../ui/Section.jsx';
import { GithubIcon, ExternalIcon } from '../ui/Icons.jsx';
import { projects } from '../../data/projects.js';

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div className="project-grid">
        {projects.map((p) => (
          <article key={p.title} className={`card project ${p.featured ? 'is-featured' : ''}`}>
            {p.featured && <span className="badge">Featured</span>}
            <h3 className="card-title">{p.title}</h3>
            <p className="muted">{p.subtitle}</p>
            {p.description.map((d) => <p key={d}>{d}</p>)}
            <ul className="tags">
              {p.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            {(p.github || p.demo) && (
              <div className="project-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"><GithubIcon /> Code</a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"><ExternalIcon /> Live demo</a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
