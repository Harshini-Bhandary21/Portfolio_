import { useState } from 'react';
import useTheme from '../../hooks/useTheme.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from '../ui/Icons.jsx';
import { profile } from '../../data/profile.js';

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];
const ids = ['home', ...links.map((l) => l.id)];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(ids);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="brand" aria-label={`${profile.name} — home`}>
          <span className="brand-mark">HB</span>
          <span className="brand-name">Harshini</span>
        </a>

        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
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
  );
}
