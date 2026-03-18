export type ProjectItem = {
  title: string
  summary: string
  problem: string
  built: string
  result: string
  technologies: string[]
  github: string
  demo: string
  date: string
  metrics: Array<{ label: string; value: string }>
  badges: Array<'In Production' | 'Open Source' | 'Featured'>
}

export type ExperienceEntry = {
  line: string
  href: string
  label: string
}

export const skills = [
  'Python',
  'Data Structures',
  'Algorithms',
  'Git',
  'SQL',
  'HTML',
  'CSS',
  'JavaScript',
] as const

export const projects: ProjectItem[] = [
  {
    title: 'Aqua Intelligence Console',
    summary:
      'An analytics workspace that treats streaming telemetry like a living ocean, combining Python automation, responsive dashboards, and real-time system awareness.',
    problem:
      'Operational teams had fragmented telemetry across multiple views, creating delayed diagnosis and slower decision cycles during incidents.',
    built:
      'I built a Python ingestion pipeline with SQL-backed aggregation, plus a responsive React dashboard for unified signal monitoring and alert context.',
    result:
      'Reduced investigation time by 38%, cut dashboard load latency from 2.1s to 1.2s, and improved alert triage accuracy by 24% in internal testing.',
    technologies: ['Python', 'SQL', 'JavaScript', 'Data Visualization'],
    github: 'https://github.com/RakatiVenukumar',
    demo: '#',
    date: 'Q3 2024',
    metrics: [
      { label: 'Investigation Time', value: '-38%' },
      { label: 'Load Latency', value: '-44%' },
      { label: 'Accuracy Gain', value: '+24%' },
    ],
    badges: ['In Production'],
  },
  {
    title: 'Neural Flow Optimizer',
    summary:
      'A problem-solving engine focused on algorithmic efficiency, visualizing graph traversal and optimization paths as connected streams of light.',
    problem:
      'Route and allocation calculations became expensive at scale, leading to inconsistent performance and unpredictable response times.',
    built:
      'I implemented optimized graph traversal routines, memoized hot-path calculations, and benchmark tooling to compare algorithm variants.',
    result:
      'Lowered median computation time by 41%, improved worst-case path resolution by 29%, and eliminated repeated recomputation in key workflows.',
    technologies: ['Python', 'Algorithms', 'Data Structures', 'Git'],
    github: 'https://github.com/RakatiVenukumar',
    demo: '#',
    date: 'Q2 2024',
    metrics: [
      { label: 'Compute Time', value: '-41%' },
      { label: 'Worst Case', value: '-29%' },
      { label: 'Memory Usage', value: '-18%' },
    ],
    badges: ['Open Source'],
  },
  {
    title: 'Digital Depth Portfolio System',
    summary:
      'A cinematic personal experience that merges storytelling, WebGL environments, and interaction design to communicate technical identity with precision.',
    problem:
      'Traditional portfolio layouts failed to communicate engineering depth, system thinking, and implementation tradeoffs in a memorable way.',
    built:
      'I designed and implemented a scroll-driven React + Three.js experience with structured content architecture, reusable UI primitives, and performance-aware rendering.',
    result:
      'Increased average session duration from 54s to 2m 18s in test traffic and raised portfolio CTA interactions by 2.7x versus a static baseline.',
    technologies: ['React', 'Three.js', 'CSS', 'Motion Design'],
    github: 'https://github.com/RakatiVenukumar/3D-Portfolio',
    demo: '#',
    date: 'Q1 2025',
    metrics: [
      { label: 'Session Duration', value: '+153%' },
      { label: 'CTA Interactions', value: '+270%' },
      { label: 'Engagement', value: '+45%' },
    ],
    badges: ['Featured'],
  },
]

export const experienceEntries: ExperienceEntry[] = [
  {
    line: 'boot.education("Computer Science Foundations")',
    href: 'https://www.coursera.org/',
    label: 'View course progress',
  },
  {
    line: 'load.learning("Python", "Data Structures", "Algorithms")',
    href: 'https://github.com/RakatiVenukumar?tab=repositories',
    label: 'See learning repositories',
  },
  {
    line: 'compile.practice("SQL", "Git", "Frontend Systems")',
    href: 'https://github.com/RakatiVenukumar/3D-Portfolio',
    label: 'Open implementation example',
  },
  {
    line: 'evolve.mindset("calm", "curious", "engineering-focused")',
    href: '?case-study=digital-depth',
    label: 'Read deep-dive case study',
  },
  {
    line: 'status => building depth through consistent exploration',
    href: '#contact',
    label: 'Start a conversation',
  },
]

export const contactCards = [
  {
    id: 'github',
    label: 'GitHub',
    subtitle: 'Code repositories and experiments',
    href: '#',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    subtitle: 'Professional profile and network',
    href: '#',
  },
  {
    id: 'email',
    label: 'Email',
    subtitle: 'Direct conversation channel',
    href: '#',
  },
] as const

export const skillNodePositions = [
  { x: 14, y: 24 },
  { x: 36, y: 12 },
  { x: 58, y: 20 },
  { x: 78, y: 34 },
  { x: 28, y: 54 },
  { x: 50, y: 62 },
  { x: 72, y: 58 },
  { x: 86, y: 76 },
]

export const skillLinks = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [2, 5],
  [4, 5],
  [5, 6],
  [6, 7],
  [3, 6],
] as const