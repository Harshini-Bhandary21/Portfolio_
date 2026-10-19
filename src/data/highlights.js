export const skills = [
  { group: 'Languages', items: ['C++', 'Java', 'JavaScript'] },
  { group: 'Frameworks', items: ['React', 'Node.js', 'Express.js'] },
  { group: 'Tools & Platforms', items: ['Git', 'GitHub', 'Postman'] },
  {
    group: 'AI / ML',
    items: ['LangGraph', 'LangChain', 'LightGBM', 'RAG', 'Random Forest', 'Seasonal-naive', 'CP-SAT', 'Genetic Algorithm', 'A*'],
  },
];

export const achievements = [
  {
    title: 'SIH Winner 2025',
    text: 'Automated Timetable Scheduler, Smart India Hackathon.',
  },
  {
    title: '2 Patents Filed',
    text: 'Factorization Skill Kit and Probability Model, both for visually impaired students.',
  },
  {
    title: '1st Runner-up',
    text: 'HBTM Hackathon, sponsored by the I Am Better Than Me startup, at IIIT Pune.',
  },
  {
    title: 'Brand Ambassador',
    text: 'MIT Academy of Engineering.',
  },
];

export const leadership = [
  { role: 'Vice President', org: 'Girl Script Club (current); previously Tech Team lead (SY)' },
  { role: 'President', org: 'Knights of the Square Table (MITAOE Chess Club)' },
  { role: 'Ladies Representative', org: 'FY B.Tech 2024–25; SY 2025–26, ASSCET' },
];

export const languages = ['English', 'Hindi', 'Marathi'];

// Logos served by simple-icons (https://cdn.simpleicons.org/<slug>/<hex>); dark icons use white for the dark theme.
export const techIcons = {
  'C++': { slug: 'cplusplus', color: '00599C' },
  Java: { slug: 'openjdk', color: 'ED8B00' },
  JavaScript: { slug: 'javascript', color: 'F7DF1E' },
  React: { slug: 'react', color: '61DAFB' },
  'Node.js': { slug: 'nodedotjs', color: '5FA04E' },
  'Express.js': { slug: 'express', color: 'ffffff' },
  Git: { slug: 'git', color: 'F05032' },
  GitHub: { slug: 'github', color: 'ffffff' },
  Postman: { slug: 'postman', color: 'FF6C37' },
  LangChain: { slug: 'langchain', color: '1C9C8C' },
  LangGraph: { slug: 'langgraph', color: '1C9C8C' },
};

export const iconUrl = (name) => {
  const i = techIcons[name];
  return i ? `https://cdn.simpleicons.org/${i.slug}/${i.color}` : null;
};
