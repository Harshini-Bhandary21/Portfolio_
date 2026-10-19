// Add `github` / `demo` URLs to show the matching buttons on a project card.
export const projects = [
  {
    title: 'SafeDrain',
    subtitle: 'AI and IoT safety platform for sanitation workers',
    featured: true,
    description: [
      'Real-time safety platform for sanitation workers in hazardous sewer environments with live GPS tracking, gas monitoring, SOS alerts and a supervisor dashboard.',
      'Integrates AI-based pre-entry risk prediction with IoT sensor monitoring to help prevent accidents and speed up emergency response.',
    ],
    stack: ['React', 'Vite', 'Capacitor (Android)', 'IoT'],
    github: '',
    demo: 'https://samved-2026-ten.vercel.app/',
  },
  {
    title: 'AI-Powered A* Maze Solver Robot',
    subtitle: 'Computer vision meets autonomous navigation',
    description: [
      'Autonomous robot that detects a maze using computer vision, computes the shortest path with the A* algorithm and navigates wirelessly.',
    ],
    stack: ['Computer Vision', 'A* Pathfinding', 'React', 'Flask', 'Arduino'],
    github: 'https://github.com/Harshini-Bhandary21/A_Star_shortest_pathFinding',
  },
  {
    title: 'Automated Timetable Scheduler',
    subtitle: 'Smart India Hackathon 2025 — Winner',
    description: [
      'Website that automatically generates conflict-free timetables using constraint programming and evolutionary search.',
    ],
    stack: ['CP-SAT', 'Genetic Algorithm'],
    demo: 'https://sih-2025.vercel.app/',
  },
  {
    title: 'HBTM / IABTM',
    subtitle: 'Personal growth media platform',
    description: [
      'Full-stack web app (Next.js + FastAPI) that stores users, goals, identity data, media and interactions in SQLite, plus a browser-tracker extension.',
      'Integrates YouTube, Spotify, Reddit and Pinterest APIs for a "Get more like this" feature, keeping API keys server-side.',
    ],
    stack: ['Next.js', 'FastAPI', 'SQLite', 'REST APIs'],
    github: 'https://github.com/Harshini-Bhandary21/HBTM_IABTM',
  },
  {
    title: 'Krishi Bhav',
    subtitle: 'AI crop price forecasting and market routing for farmers',
    description: [
      'Gives farmers a 7–14 day price forecast with an explicit sell window, and ranks the best mandis within 100 km by profit after transport costs, in the farmer\'s own language.',
      'Built for Smart India Hackathon 2026; the dashboard shows the forecast as a 14-day band that works as the chart, the verdict and the calendar at once.',
    ],
    stack: ['TypeScript', 'ML Forecasting', 'Docker'],
  },
  {
    title: 'Weather Big Data Analytics Platform',
    subtitle: 'SIH 2026 — Ministry of Earth Sciences / IMD',
    description: [
      'Ingests weather reports from citizens, public sources and IMD feeds, then classifies events with a Gemini zero-shot model, removes duplicates and scores trust, serving a live public dashboard and an admin verification panel.',
    ],
    stack: ['FastAPI', 'PostgreSQL + PostGIS', 'Redis', 'React', 'Leaflet'],
    demo: 'https://sih-2026-teal.vercel.app',
  },
  {
    title: 'AgentShield',
    subtitle: 'Runtime security for AI agents',
    description: [
      'Sits between an AI agent and its tools and judges every action on who chose its target, whether the user asked for it, what data it carries and how risky it is, to stop indirect prompt injection.',
      'Combines taint tracking, an isolated intent verifier, capability tokens, DLP and fraud scoring, with a hash-chained audit log.',
    ],
    stack: ['Python', 'FastAPI', 'LLM Security', 'Docker'],
    github: 'https://github.com/Harshini-Bhandary21/CyberForge',
  },
  {
    title: 'Learner-State Engine',
    subtitle: 'Closed-loop personal learning agent',
    description: [
      'Keeps a live Bayesian knowledge-tracing model of each learner\'s per-topic mastery and re-plans their study path with a CP-SAT solver as that mastery changes, driven by verified mastery rather than engagement.',
    ],
    stack: ['Python', 'BKT', 'CP-SAT', 'MongoDB', 'Gemini'],
    github: 'https://github.com/Harshini-Bhandary21/LEARNER_STATE_ENGINE',
  },
  {
    title: 'CampusCompass',
    subtitle: 'Automated timetable generation for MITAOE',
    description: [
      'A coordinator uploads a Faculty/Rooms/Time Excel workbook and a CP-SAT constraint solver returns a clash-free first-year timetable, with faculty, room and division views and an Excel download.',
    ],
    stack: ['Next.js', 'FastAPI', 'OR-Tools CP-SAT', 'MongoDB'],
  },
  {
    title: 'College Automation Platform',
    subtitle: 'One front door for MITAOE\'s campus tools',
    description: [
      'Unifies the academic calendar, syllabus builder, a syllabus-grounded chatbot, previous-year question papers, placement policies and each student\'s personal timetable behind one login.',
    ],
    stack: ['React', 'Python', 'MongoDB', 'Gemini'],
  },
  {
    title: 'Campus Swap',
    subtitle: 'Student marketplace to buy, sell and swap',
    description: [
      'Marketplace for MITAOE students with sign-in, live password validation, search, category filters, price sorting and a wishlist.',
    ],
    stack: ['React', 'Vite'],
    github: 'https://github.com/Harshini-Bhandary21/Campus_swap',
    demo: 'https://campus-swap-nu.vercel.app',
  },
  {
    title: 'Lavender Bloom',
    subtitle: 'Three.js particle animation',
    description: [
      'An interactive particle animation in lavender, white and yellow, built to explore 3D graphics in the browser.',
    ],
    stack: ['Three.js', 'JavaScript'],
    github: 'https://github.com/Harshini-Bhandary21/lavender-bloom',
    demo: 'https://harshini-bhandary21.github.io/lavender-bloom/',
  },
];
