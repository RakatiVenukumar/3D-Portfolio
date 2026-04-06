# Personal Portfolio

Cinematic React portfolio for Rakati Venu Kumar built as a scroll-driven night-ocean experience with a full-screen loader, interactive content panels, and premium motion design.

## Project Overview

This portfolio is designed to feel like a polished interactive presentation instead of a static personal site. The current build combines a dark cinematic scene, layered glass panels, staged section reveals, and structured content blocks that highlight skills, projects, experience, resume access, and contact channels.

The homepage is intentionally designed around depth and motion:

- Full-screen preloader with a realistic night beach scene
- Centered `LOADING` text with staged reveal timing
- Lighthouse beam sweep with animated water, sand, and starfield
- Scroll-driven page content that appears from bottom to top as sections enter view
- Glassmorphism panels and premium typography for a clean recruiter-facing presentation

## Live Experience

### Loader

- Full-screen preloader that stays visible for 5 seconds
- Realistic night-time beach composition
- Distant lighthouse with sweeping beam
- Dense star field and atmospheric glow layers
- `LOADING` text centered in the scene
- Motion behavior respects `prefers-reduced-motion`

### Homepage

- Hero section with strong name treatment and reflection effect
- Profile badge with portrait and role title
- Primary actions for resume and connection
- Right-side “Currently Working On” card showing the AI job application automation project
- Scroll cue that directs users into the rest of the page

### Section Reveal Behavior

- About, Skills, Projects, Experience, Resume, Contact, and Footer all animate upward into view
- Cards, panels, footer links, and project tiles use a consistent bottom-to-top reveal
- Reveal effect re-triggers when sections re-enter the viewport
- Reduced-motion fallback disables animations and keeps content readable

## Content Structure

### Hero Section

- Personal identity and role label
- Resume CTA
- Let’s Connect CTA
- Case Study CTA
- Profile badge with photo
- “Currently Working On” card

### About Section

- Fresher-focused introduction
- Emphasis on Python, React, algorithmic thinking, and clean systems
- Profile photo placed beside the text panel

### Skills Section

The skills network currently includes:

- Python
- Data Structures
- Algorithms
- Git
- SQL
- HTML
- CSS
- JavaScript
- React
- Django
- RestAPI

The skills view uses connected nodes and lines in a neural-style map on desktop, with a mobile-friendly list fallback.

### Projects Section

The projects area currently contains three featured cards:

1. PRD Golf Charity Subscription Platform
2. AI CRM HCP
3. Navodaya High School Website

Each project card opens a modal with:

- Title and date
- Summary
- Metrics
- Badges
- Problem, build, and result narrative
- GitHub and demo links where available

### Experience Section

The experience area is rendered as a terminal-style typing sequence.

Current experience lines:

- `boot.education("Computer Science Foundations")`
- `load.learning("Python", "React", "Django", "RestAPI")`
- `compile.practice("SQL", "Git", "Frontend Systems")`
- `evolve.mindset("calm", "curious", "engineering-focused")`
- `status => building depth through consistent exploration`

The terminal links point to repository browsing, case study access, and email contact.

### Resume Section

- Resume view button opens the PDF in a new tab
- Resume download button downloads the file directly
- Both actions use the bundled public PDF asset

### Contact Section

Contact channels currently included:

- GitHub
- LinkedIn
- LeetCode
- Instagram
- Phone
- Email form

The contact cards are wired to real profile links and a click-to-call phone link.

### Footer

- Persistent footer navigation
- Social/profile links repeated for convenience
- Footer copy and portfolio attribution

## Current Profile Links

- GitHub: https://github.com/RakatiVenukumar
- LinkedIn: https://www.linkedin.com/in/rakati-venu-kumar-0748bb302/
- LeetCode: https://leetcode.com/u/VenuKumar_23/
- Instagram: https://www.instagram.com/venukumar_23/
- Email: venurakati@gmail.com
- Phone: +91 9381559795

## Tech Stack

- React 19
- TypeScript
- Vite
- Three.js
- React Three Fiber
- Drei
- GSAP

## Visual System

### Design Direction

- Dark cinematic background
- Ocean-night atmosphere
- Neon-cyan glow accents
- Glass panels with layered gradients and blur
- High-contrast typography with reflection details
- Motion driven by subtle reveal timing instead of noisy animation everywhere

### Motion System

- Loader animation for first impression
- Hero reveal sequence with staggered timing
- Scroll reveal for section content
- Lighthouse beam sweep in the loader
- Star twinkle, wave shimmer, and atmospheric movement

### Accessibility Notes

- `prefers-reduced-motion` support is implemented
- Interactive elements use accessible labels and semantic buttons/links
- The content remains readable when motion is disabled

## Project Files

- `src/App.tsx` - main page composition, data wiring, reveal logic, modal handling, and section layout
- `src/components/OceanScene.tsx` - 3D scene wrapper, camera path, scroll container, lighting, and background scene
- `src/components/LoadingSpinner.tsx` - full-screen beach lighthouse preloader
- `src/components/TypingText.tsx` - terminal-style experience typing UI
- `src/components/ContactForm.tsx` - email form component
- `src/content.ts` - skills, projects, experience, contact cards, and layout data
- `src/index.css` - entire visual system, layout, animations, and responsive rules
- `src/utils/analytics.ts` - analytics event helpers

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Development Notes

- The site uses a custom scroll container via `ScrollControls`, so anchor navigation is implemented with container-aware smooth scrolling.
- Project cards open a modal overlay instead of navigating away from the portfolio.
- The loader and reveal timing are synchronized so the homepage content settles after the intro animation.
- The page is designed to work as a single long cinematic journey from hero to footer.

## Content Notes

- The portfolio copy is tuned for a fresher seeking opportunities in full-stack Python and React development.
- The “Currently Working On” card reflects the AI job application automation agent project.
- All current social/contact links are real and should stay updated if profiles change.
- The resume asset is served from the public folder.

## Deployment Notes

- Run `npm run build` before deployment.
- Verify the resume PDF exists in `public/`.
- Verify profile images and the social URLs remain correct.
- Check the site once in a production browser session to confirm loader timing, scroll reveal, and modal interactions.

## Why This Project Stands Out

- It is not a plain portfolio template.
- It combines a cinematic visual language with practical recruiter-friendly content.
- It shows technical range across frontend, Python, AI automation, and product-minded presentation.
- It includes a custom loader, scroll-driven storytelling, and structured project narratives.

## Notes for Future Updates

- Replace the current project metrics if newer results become available.
- Update the “Currently Working On” card if the AI automation agent scope changes.
- Keep the contact links aligned with active profile URLs.
- Add more projects to `src/content.ts` when needed.
