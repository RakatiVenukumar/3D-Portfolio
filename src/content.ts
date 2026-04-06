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
  href?: string
  label?: string
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
  'React',
  'Django',
  'RestAPI',
] as const

export const projects: ProjectItem[] = [
  {
    title: 'PRD Golf Charity Subscription Platform',
    summary:
      'A subscription platform for golf charity with separate user and admin experiences, designed to support memberships, access control, and streamlined management.',
    problem:
      'The platform needed clear separation between user flows and admin operations so both audiences could complete their tasks efficiently in one product.',
    built:
      'I worked on both the admin and user parts of the application, shaping the role-based flows, subscription experience, and content structure in a Next.js codebase.',
    result:
      'Delivered a dual-portal subscription experience that supports end users and admin management from a single maintainable application.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/RakatiVenukumar/-PRD-Golf-Charity-Subscription-Platform',
    demo: '#',
    date: '2026',
    metrics: [
      { label: 'Portals', value: 'Admin + User' },
      { label: 'Stack', value: 'Next.js' },
      { label: 'Data', value: 'Supabase' },
    ],
    badges: ['Featured'],
  },
  {
    title: 'AI CRM HCP',
    summary:
      'An AI-first CRM interaction module that turns raw HCP notes into structured records, summaries, and follow-up actions through a conversational workflow.',
    problem:
      'Field interaction notes were hard to convert into structured CRM data quickly, making follow-up tracking and review slower than it should be.',
    built:
      'I built the agent workflow, persistence layer, and editable frontend so the app can extract interaction details, preserve conversation context, and save useful CRM outputs.',
    result:
      'Created a personal AI automation project with multi-turn context, auto-fill extraction, manual overrides, and next-step recommendations.',
    technologies: ['Python', 'FastAPI', 'React', 'Redux', 'LangGraph', 'SQLite'],
    github: 'https://github.com/RakatiVenukumar/Ai-crm-hcp',
    demo: '#',
    date: '2026',
    metrics: [
      { label: 'Agent Tools', value: '5' },
      { label: 'Context', value: 'Multi-turn' },
      { label: 'Workflow', value: 'AI-assisted' },
    ],
    badges: ['Open Source'],
  },
  {
    title: 'Navodaya High School Website',
    summary:
      'A responsive school website prototype focused on frontend technologies, built to present school information, admissions, and contact details clearly across devices.',
    problem:
      'The school needed a modern frontend presence that felt polished, mobile-friendly, and easy to maintain for future content updates.',
    built:
      'I built the React and Vite frontend with modular sections, smooth navigation, responsive layouts, and centralized content for easy updates.',
    result:
      'Delivered a clean frontend-focused school website with accessible structure, responsive interactions, and a production-ready static build.',
    technologies: ['React', 'Vite', 'JavaScript', 'CSS'],
    github: 'https://github.com/Girish2513/School-Prototype',
    demo: 'https://school-prototype-six.vercel.app/',
    date: '2025',
    metrics: [
      { label: 'Layout', value: 'Responsive' },
      { label: 'Content', value: 'Modular' },
      { label: 'UX', value: 'Accessible' },
    ],
    badges: ['Featured'],
  },
]

export const experienceEntries: ExperienceEntry[] = [
  {
    line: 'boot.education("Computer Science Foundations")',
  },
  {
    line: 'load.learning("Python", "React", "Django", "RestAPI")',
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
    href: 'mailto:venurakati@gmail.com',
    label: 'Start a conversation by email',
  },
]

export const contactCards = [
  {
    id: 'github',
    label: 'GitHub',
    subtitle: 'Code repositories and experiments',
    href: 'https://github.com/RakatiVenukumar',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    subtitle: 'Professional profile and network',
    href: 'https://www.linkedin.com/in/rakati-venu-kumar-0748bb302/',
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    subtitle: 'Problem solving and DSA practice',
    href: 'https://leetcode.com/u/VenuKumar_23/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    subtitle: 'Community and personal updates',
    href: 'https://www.instagram.com/venukumar_23/',
  },
  {
    id: 'phone',
    label: 'Phone',
    subtitle: '+91 9381559795',
    href: 'tel:+919381559795',
  },
  {
    id: 'email',
    label: 'Email',
    subtitle: 'Direct conversation channel',
    href: 'mailto:venurakati@gmail.com',
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
  { x: 68, y: 8 },
  { x: 14, y: 78 },
  { x: 42, y: 88 },
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
  [7, 8],
  [5, 8],
  [6, 8],
  [0, 9],
  [4, 9],
  [9, 10],
  [7, 10],
] as const