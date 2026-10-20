import { useEffect, useRef, useState } from 'react';
import { skills, iconUrl } from '../../data/highlights.js';

const COLORS = ['#ff8fa3', '#f2b880', '#e9cf8a', '#d9a0e8'];
const HUB_MARK = ['</>', '{ }', '⌘', 'AI'];

const monogram = (name) => {
  const words = name.replace(/[^A-Za-z0-9* ]/g, ' ').split(/\s+/).filter(Boolean);
  if (name === 'A*') return 'A*';
  if (words.length > 1) return words.map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return name.slice(0, name.length > 3 ? 2 : 3).toUpperCase();
};

// One focused slide per domain: the hub in the middle, its tools orbiting around it.
const RW = 1000, RH = 480, CX = 500, CY = 240;

function DomainGraph({ group, gi }) {
  const [hot, setHot] = useState(null);
  const color = COLORS[gi % COLORS.length];
  const n = group.items.length;
  const R = n <= 4 ? 150 : 178;
  const nodes = group.items.map((name, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { name, icon: iconUrl(name), x: CX + R * 1.55 * Math.cos(a), y: CY + R * Math.sin(a), dx: Math.cos(a), dy: Math.sin(a) };
  });
  return (
    <div className="sg-body">
      <svg className="sg" viewBox={`0 0 ${RW} ${RH}`} role="img" aria-label={`${group.group}: ${group.items.join(', ')}`} style={{ '--c': color }}>
        <defs>
          <filter id={`sg-glow-d${gi}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle className="sg-pulse-ring" cx={CX} cy={CY} r="96" />
        <circle className="sg-pulse-ring sg-pulse-ring-b" cx={CX} cy={CY} r="96" />
        {nodes.map((nd, i) => {
          const id = `sg-d-${gi}-${i}`;
          return (
            <g key={nd.name} className={`sg-edges${hot !== null && hot !== i ? ' is-dim' : ''}${hot === i ? ' is-on' : ''}`} style={{ '--c': color }}>
              <path className="sg-base" id={id} d={`M${nd.x} ${nd.y} L${CX} ${CY}`} pathLength="1" />
              <circle className="sg-packet" r="3.2" filter={`url(#sg-glow-d${gi})`}>
                <animateMotion dur={`${2.6 + (i % 4) * 0.5}s`} begin={`${(i * 0.31).toFixed(2)}s`} repeatCount="indefinite"><mpath href={`#${id}`} /></animateMotion>
              </circle>
            </g>
          );
        })}
        {nodes.map((nd, i) => {
          const side = nd.dx > 0.25 ? 'start' : nd.dx < -0.25 ? 'end' : 'middle';
          const lx = nd.dx * 36, ly = nd.dy * 36 + (side === 'middle' ? (nd.dy > 0 ? 8 : -2) : 4);
          return (
            <g key={nd.name} className={`sg-leaf${hot !== null && hot !== i ? ' is-dim' : ''}${hot === i ? ' is-on' : ''}`} style={{ '--c': color }}
               transform={`translate(${nd.x} ${nd.y})`} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)}>
              <g className="sg-pop sg-float" style={{ animationDelay: `${i * -0.7}s` }}>
                <circle className="sg-chip" r="24" />
                <text className="sg-mono" y="4" textAnchor="middle" style={{ opacity: nd.icon ? 0 : 1, fontSize: 11 }}>{monogram(nd.name)}</text>
                {nd.icon && <image href={nd.icon} x="-13" y="-13" width="26" height="26" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.previousSibling.style.opacity = 1; }} />}
              </g>
              <text className="sg-label" x={lx} y={ly} textAnchor={side}>{nd.name}</text>
            </g>
          );
        })}
        <g className="sg-hub is-on" style={{ '--c': color }} transform={`translate(${CX} ${CY})`}>
          <circle className="sg-orbit" r="72" />
          <circle className="sg-aura" r="56" />
          <circle className="sg-core" r="44" />
          <text className="sg-mark" y="9" textAnchor="middle" style={{ fontSize: 26 }}>{HUB_MARK[gi % HUB_MARK.length]}</text>
          <text className="sg-hub-label" y="102" textAnchor="middle">{group.group}</text>
        </g>
      </svg>
    </div>
  );
}

export default function SkillGraph() {
  const track = useRef(null);
  const [idx, setIdx] = useState(0);
  const slides = skills.map((g) => ({ label: g.group }));

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const onScroll = () => setIdx(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = (i) => {
    const el = track.current;
    const k = (i + slides.length) % slides.length;
    el.scrollTo({ left: k * el.clientWidth, behavior: 'smooth' });
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
  };

  return (
    <div className="sg-wrap" role="group" aria-roledescription="carousel" aria-label="Tech stack graphs" onKeyDown={onKey}>
      <div className="sg-bar">
        <div className="sg-tabs" role="tablist">
          {slides.map((s, i) => (
            <button key={s.label} type="button" role="tab" aria-selected={idx === i} className={`sg-tab${idx === i ? ' is-active' : ''}`} onClick={() => go(i)}>{s.label}</button>
          ))}
        </div>
        <div className="sg-arrows">
          <button type="button" aria-label="Previous graph" onClick={() => go(idx - 1)}>‹</button>
          <button type="button" aria-label="Next graph" onClick={() => go(idx + 1)}>›</button>
        </div>
      </div>
      <div className="sg-track" ref={track} tabIndex={0}>
        {skills.map((g, gi) => (
          <div className="sg-slide" key={g.group} aria-label={g.group}><DomainGraph group={g} gi={gi} /></div>
        ))}
      </div>
      <div className="sg-dots" aria-hidden="true">
        {slides.map((s, i) => <i key={s.label} className={idx === i ? 'is-active' : ''} />)}
      </div>
    </div>
  );
}
