export type ProjectItem = {
  title: string
  description: string
  technologies: string[]
  github: string
  demo: string
  insight: string
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
    description:
      'An analytics workspace that treats streaming telemetry like a living ocean, combining Python automation, responsive dashboards, and real-time system awareness.',
    technologies: ['Python', 'SQL', 'JavaScript', 'Data Visualization'],
    github: '#',
    demo: '#',
    insight: 'Designed for signal clarity under pressure, with calm interfaces and dependable data flow.',
  },
  {
    title: 'Neural Flow Optimizer',
    description:
      'A problem-solving engine focused on algorithmic efficiency, visualizing graph traversal and optimization paths as connected streams of light.',
    technologies: ['Python', 'Algorithms', 'Data Structures', 'Git'],
    github: '#',
    demo: '#',
    insight: 'Built to reflect how engineering depth grows from disciplined iteration and measurable tradeoffs.',
  },
  {
    title: 'Digital Depth Portfolio System',
    description:
      'A cinematic personal experience that merges storytelling, WebGL environments, and interaction design to communicate technical identity with precision.',
    technologies: ['React', 'Three.js', 'CSS', 'Motion Design'],
    github: '#',
    demo: '#',
    insight: 'Translates software thinking into atmosphere, motion, and spatial UI.',
  },
]

export const experienceLines = [
  'boot.education("Computer Science Foundations")',
  'load.learning("Python", "Data Structures", "Algorithms")',
  'compile.practice("SQL", "Git", "Frontend Systems")',
  'evolve.mindset("calm", "curious", "engineering-focused")',
  'status => building depth through consistent exploration',
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