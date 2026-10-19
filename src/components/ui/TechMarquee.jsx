import { techIcons, iconUrl } from '../../data/highlights.js';

const names = Object.keys(techIcons);
const rows = [names.slice(0, 6), names.slice(6)];

function Item({ name }) {
  return (
    <li className="tech-chip">
      <img src={iconUrl(name)} alt="" loading="lazy" width="36" height="36"
        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      <span>{name}</span>
    </li>
  );
}

// Two infinite sliders scrolling in opposite directions; hover pauses them.
export default function TechMarquee() {
  return (
    <div className="marquee-wrap" aria-label="Tech stack">
      {rows.map((row, i) => (
        <div className={`marquee ${i ? 'is-reverse' : ''}`} key={i}>
          <ul className="marquee-track">
            {[...row, ...row, ...row, ...row].map((n, k) => (
              <Item name={n} key={`${n}-${k}`} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
