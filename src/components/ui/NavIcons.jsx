// Duotone icons for the navigation dock: a soft fill plus a crisp outline, each with its own hover animation.
const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'nav-ico',
};
const tint = { fill: 'currentColor', fillOpacity: 0.2 };

export const navIcons = {
  home: () => (
    <svg {...base}>
      <path {...tint} d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M2.5 12L12 3.5 21.5 12" />
      <path className="ico-door" d="M10 21v-6h4v6" />
    </svg>
  ),
  about: () => (
    <svg {...base}>
      <circle {...tint} cx="12" cy="8" r="4" />
      <path {...tint} d="M4 21c0-4.2 3.6-6 8-6s8 1.8 8 6z" />
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.2 3.6-6 8-6s8 1.8 8 6" />
    </svg>
  ),
  experience: () => (
    <svg {...base}>
      <rect {...tint} x="3" y="7" width="18" height="13" rx="2.5" />
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18" />
      <rect x="10.5" y="11.5" width="3" height="3" rx="0.8" fill="currentColor" />
    </svg>
  ),
  projects: () => (
    <svg {...base}>
      <g className="ico-rocket">
        <path {...tint} d="M12 2.5c3 2 4.8 5.6 4.8 9.5L15 15H9l-1.8-3C7.2 8.100 9 4.500 12 2.500z" />
        <path d="M12 2.5c3 2 4.8 5.6 4.8 9.5L15 15H9l-1.8-3C7.200 8.100 9 4.500 12 2.500z" />
        <circle cx="12" cy="9.500" r="1.700" />
        <path d="M7.200 12L4.500 15l3 .8M16.800 12l2.700 3-3 .8" />
        <path className="ico-flame" d="M10.200 18c0 1.800.8 3 1.800 4 1-1 1.800-2.200 1.800-4" />
      </g>
    </svg>
  ),
  skills: () => (
    <svg {...base}>
      <g className="ico-chip">
        <rect {...tint} x="6" y="6" width="12" height="12" rx="2.500" />
        <rect x="6" y="6" width="12" height="12" rx="2.500" />
        <rect x="9.500" y="9.500" width="5" height="5" rx="1" fill="currentColor" />
        <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
      </g>
    </svg>
  ),
  achievements: () => (
    <svg {...base}>
      <g className="ico-trophy">
        <path {...tint} d="M7.500 4h9v6a4.500 4.500 0 0 1-9 0z" />
        <path d="M7.500 4h9v6a4.500 4.500 0 0 1-9 0zM7.500 6H4v1.200a3.300 3.300 0 0 0 3.800 3.200M16.500 6H20v1.200a3.300 3.300 0 0 1-3.800 3.200M12 14.500V18M8.500 21h7M10 18h4" />
        <path d="M12 6.200l.8 1.700 1.800.2-1.300 1.200.4 1.800-1.700-.9-1.700.9.400-1.800L9.400 8.100l1.800-.2z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  ),
  contact: () => (
    <svg {...base}>
      <g className="ico-plane">
        <path {...tint} d="M21 3L3 10.500l7 3 3 7z" />
        <path d="M21 3L3 10.500l7 3 3 7zM21 3L10 13.500" />
      </g>
    </svg>
  ),
};

export const CompassIcon = () => (
  <svg {...base} width="24" height="24" className="nav-ico compass-ico">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2" />
    <g className="compass-needle">
      <path d="M15.8 8.2l-2.2 5.4-5.4 2.2 2.2-5.4z" fill="currentColor" fillOpacity="0.25" />
      <path d="M15.8 8.2l-2.2 5.4-5.4 2.2 2.2-5.4z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </g>
  </svg>
);
