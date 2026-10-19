import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useActiveSection from '../../hooks/useActiveSection.js';
import { MenuIcon, CloseIcon } from '../ui/Icons.jsx';
import { DownloadIcon } from '../ui/Icons.jsx';
import { navIcons, CompassIcon } from '../ui/NavIcons.jsx';
import { profile } from '../../data/profile.js';

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];
const dockLinks = [{ id: 'home', label: 'Home' }, ...links];
const ids = dockLinks.map((l) => l.id);
const NAV_H = 68;

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu on the hero
  const [dockOpen, setDockOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const active = useActiveSection(ids);
  const [hovered, setHovered] = useState(null);
  const [pill, setPill] = useState({ x: 0, w: 0, show: false });
  const linkRefs = useRef({});
  const headerRef = useRef(null);

  // The sliding pill follows the hovered link, falling back to the current section.
  const target = hovered || (links.some((l) => l.id === active) ? active : null);
  useLayoutEffect(() => {
    const place = () => {
      const el = target && linkRefs.current[target];
      setPill(el ? { x: el.offsetLeft, w: el.offsetWidth, show: true } : (p) => ({ ...p, show: false }));
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [target, onHero]);

  // cursor spotlight inside the bar
  const onMove = (e) => {
    const r = headerRef.current.getBoundingClientRect();
    headerRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
  };

  // The top bar is only shown while the hero is still under it.
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return undefined;
    const io = new IntersectionObserver(([e]) => setOnHero(e.isIntersecting), {
      rootMargin: `-${NAV_H}px 0px 0px 0px`,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (onHero) setDockOpen(false);
    else setOpen(false);
  }, [onHero]);

  useEffect(() => {
    if (!dockOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setDockOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dockOpen]);

  return (
    <>
      <header ref={headerRef} onPointerMove={onMove} className={`navbar ${onHero ? '' : 'is-hidden'}`}>
        <div className="container navbar-inner">
          <a href={profile.socials.instagram} className="brand" target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on Instagram`}>
            <span className="brand-mark"><b>HB</b></span>
            <span className="brand-name">Harshini</span>
          </a>

          <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary" onPointerLeave={() => setHovered(null)}>
            <span className="nav-pill" aria-hidden="true" style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.show ? 1 : 0 }} />
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                ref={(el) => { linkRefs.current[l.id] = el; }}
                className={active === l.id ? 'is-active' : ''}
                onPointerEnter={() => setHovered(l.id)}
                onFocus={() => setHovered(l.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="nav-cta" href={profile.resume} download>
              <DownloadIcon /> <span>Resume</span>
            </a>
            <button
              className="icon-btn menu-btn"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <div className={`dock ${!onHero ? 'is-shown' : ''} ${dockOpen ? 'is-open' : ''}`}>
        <nav className="dock-links" aria-label="Section navigation" aria-hidden={!dockOpen}>
          {dockLinks.map(({ id, label }, i) => {
          const Icon = navIcons[id];
          return (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              style={{ '--i': dockLinks.length - i }}
              aria-label={label}
              tabIndex={dockOpen ? undefined : -1}
              onClick={() => setDockOpen(false)}
            >
              <Icon />
              <span className="dock-tip">{label}</span>
            </a>
          );
          })}
        </nav>
        <button
          className="dock-toggle"
          onClick={() => setDockOpen((o) => !o)}
          aria-label={dockOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={dockOpen}
        >
          {dockOpen ? <CloseIcon /> : <CompassIcon />}
        </button>
      </div>
    </>
  );
}
