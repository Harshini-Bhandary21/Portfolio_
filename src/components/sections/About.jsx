import Section from '../ui/Section.jsx';
import LocalTime from '../ui/LocalTime.jsx';
import { profile, education } from '../../data/profile.js';
import CountUp from '../ui/CountUp.jsx';
import { languages } from '../../data/highlights.js';

const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const icons = [
  // graduation cap
  <svg key="cap" {...svg}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" /><path d="M22 9v6" /></svg>,
  // certificate / patent
  <svg key="cert" {...svg}><path d="M14 3H6a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 6 21h5" /><path d="M14 3l5.5 5.5V11" /><path d="M14 3v5.5h5.5" /><path d="M8 12h6M8 15h3" /><circle cx="16.5" cy="17" r="2.6" /><path d="M15.2 19.3L14.5 23l2-1 2 1-.7-3.7" /></svg>,
  // trophy
  <svg key="trophy" {...svg}><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 5.5H4.5v1.5A3 3 0 0 0 8 10M16 5.5h3.5V7A3 3 0 0 1 16 10" /><path d="M12 13v4M8.5 20.5h7M9.5 17h5l.5 3.5H9z" /></svg>,
  // code
  <svg key="code" {...svg}><path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" /></svg>,
];

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Building software that matters">
      <div className="bento">
        <figure className="bento-tile bento-photo" style={{ '--n': 0 }}>
          <span className="bento-disc" aria-hidden="true" />
          <img src={profile.avatarCutout} alt={profile.name} loading="lazy" />
        </figure>

        <div className="bento-tile bento-intro" style={{ '--n': 1 }}>
          <p className="bento-role">{profile.role}</p>
          <p className="bento-lead">{profile.summary}</p>
          <LocalTime place={profile.location} />
        </div>

        <ul className="bento-stats">
          {profile.stats.map((s, i) => (
            <li className="bento-tile bento-stat" style={{ '--n': 2 + i }} key={s.label}>
              <span className="about-ico">{icons[i]}</span>
              <strong><CountUp value={s.value} /></strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="bento-tile bento-edu" style={{ '--n': 6 }}>
          <h3>Education</h3>
          <ul className="about-timeline">
            {education.map((e) => (
              <li key={e.school}>
                <span className="period">{e.period}</span>
                <h4>{e.school}</h4>
                <p>{e.detail} · <strong>{e.highlight}</strong></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bento-tile bento-langs" style={{ '--n': 7 }}>
          <h3>Languages</h3>
          <ul aria-label="Languages">
            {languages.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>
    </Section>
  );
}
