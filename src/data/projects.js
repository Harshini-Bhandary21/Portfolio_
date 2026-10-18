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
    demo: '',
  },
  {
    title: 'AI-Powered A* Maze Solver Robot',
    subtitle: 'Computer vision meets autonomous navigation',
    description: [
      'Autonomous robot that detects a maze using computer vision, computes the shortest path with the A* algorithm and navigates wirelessly.',
    ],
    stack: ['Computer Vision', 'A* Pathfinding', 'React', 'Flask', 'Arduino'],
    github: '',
  },
  {
    title: 'Automated Timetable Scheduler',
    subtitle: 'Smart India Hackathon 2025 — Winner',
    description: [
      'Website that automatically generates conflict-free timetables using constraint programming and evolutionary search.',
    ],
    stack: ['CP-SAT', 'Genetic Algorithm'],
    demo: '',
  },
  {
    title: 'HBTM / IABTM',
    subtitle: 'Personal growth media platform',
    description: [
      'Full-stack web app (Next.js + FastAPI) that stores users, goals, identity data, media and interactions in SQLite, plus a browser-tracker extension.',
      'Integrates YouTube, Spotify, Reddit and Pinterest APIs for a "Get more like this" feature, keeping API keys server-side.',
    ],
    stack: ['Next.js', 'FastAPI', 'SQLite', 'REST APIs'],
    github: '',
  },
];
