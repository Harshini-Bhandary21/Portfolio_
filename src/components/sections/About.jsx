import useReveal from '../../hooks/useReveal.js';
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
  const ref = useReveal();
  return (
    <section id="about" className="section about-slide">
      <div className="about-inner reveal" ref={ref}>
        <span className="about-dots" aria-hidden="true"><i /><i /><i /></span>

        <div className="about-left">
          <ul className="about-stats">
            {profile.stats.map((s, i) => (
              <li key={s.label}>
                <span className="about-ico">{icons[i]}</span>
                <span className="about-stat-text">
                  <strong><CountUp value={s.value} /></strong>
                  <span>{s.label}</span>
                </span>
              </li>
            ))}
          </ul>
          <ul className="about-langs" aria-label="Languages">
            {languages.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>

        <div className="about-mid">
          <span className="about-ring" aria-hidden="true" />
          <span className="about-disc" aria-hidden="true" />
          <img src={profile.avatarCutout} alt={profile.name} loading="lazy" />
        </div>

        <div className="about-right">
          <p className="about-eyebrow">About</p>
          <h2 className="about-title">Building software that matters</h2>
          <div className="about-card">
            <p className="about-lead">{profile.summary}</p>
            <h3 className="about-edu">Education</h3>
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
        </div>
      </div>
    </section>
  );
}
