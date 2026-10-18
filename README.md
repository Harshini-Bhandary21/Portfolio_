# Harshini Bhandary — Portfolio

Personal portfolio built with **React 18 + Vite**. Responsive, accessible, with dark/light theme.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the build
```

## Folder structure

```
├── index.html              # Entry HTML, SEO meta, fonts, theme bootstrap
├── public/                 # Static files served as-is (favicon, resume PDF)
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # Page composition
    ├── assets/             # Images (profile photo, project screenshots)
    ├── components/
    │   ├── layout/         # Navbar, Footer
    │   ├── sections/       # Hero, About, Experience, Projects, Skills, Achievements, Contact
    │   └── ui/             # Reusable pieces: Section, Icons, SocialLinks
    ├── data/               # All content lives here — edit these, not the components
    │   ├── profile.js      # Name, contact, socials, education, experience
    │   ├── projects.js     # Projects (add github/demo URLs here)
    │   └── highlights.js   # Skills, achievements, leadership
    ├── hooks/              # useTheme, useReveal, useActiveSection
    └── styles/             # variables (design tokens), global, layout, sections
```

## To-do before publishing

- Add your resume as `public/Harshini-Bhandary-Resume.pdf`.
- Fill in `github` / `demo` URLs in `src/data/projects.js` (buttons appear automatically).
- Deploy to Vercel or Netlify (build: `npm run build`, output: `dist`).
