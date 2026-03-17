import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { OceanScene } from './components/OceanScene'
import { TypingText } from './components/TypingText'
import {
  contactCards,
  experienceLines,
  projects,
  skillLinks,
  skillNodePositions,
  skills,
} from './content'

type ProjectModalItem = (typeof projects)[number]

function ContactIcon({ id }: { id: string }) {
  const icons: Record<string, ReactNode> = {
    github: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.08.65-.2.65-.46v-1.8c-2.64.57-3.2-1.13-3.2-1.13-.44-1.1-1.06-1.39-1.06-1.39-.88-.59.07-.58.07-.58.97.07 1.48 1 1.48 1 .87 1.46 2.28 1.04 2.83.8.09-.62.34-1.03.62-1.26-2.1-.23-4.31-1.03-4.31-4.58 0-1.01.37-1.84.97-2.49-.1-.24-.42-1.2.09-2.49 0 0 .8-.25 2.62.95a9.24 9.24 0 0 1 4.78 0c1.82-1.2 2.62-.95 2.62-.95.5 1.29.18 2.25.09 2.49.61.65.97 1.48.97 2.49 0 3.56-2.22 4.34-4.33 4.56.35.3.66.87.66 1.76v2.61c0 .26.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.34 8.5H2.72V21h2.62V8.5Zm.16-3.86A1.53 1.53 0 1 0 5.48 7.7a1.53 1.53 0 0 0 .02-3.06ZM21 13.2c0-3.08-1.64-4.51-3.84-4.51a3.34 3.34 0 0 0-3 1.65V8.5h-2.62V21h2.62v-6.55c0-1.73.94-2.88 2.37-2.88 1.4 0 1.86.96 1.86 2.84V21H21v-7.8Z" />
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2.09-.25L12 11.57l6.91-5.07H5.09Zm13.41 1.56-5.76 4.22a1.25 1.25 0 0 1-1.48 0L5.5 8.06v9.19c0 .14.11.25.25.25h12.5c.14 0 .25-.11.25-.25V8.06Z" />
      </svg>
    ),
  }

  return icons[id] ?? null
}

function Section({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={`page-section ${className ?? ''}`.trim()}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

function linkClickGuard(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (href === '#') {
    event.preventDefault()
  }
}

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectModalItem | null>(null)

  const skillNodes = useMemo(
    () =>
      skills.map((skill, index) => {
        const position = skillNodePositions[index]!

        return {
        skill,
        x: position.x,
        y: position.y,
      }
      }),
    [],
  )

  const skillNetworkLinks = useMemo(
    () =>
      skillLinks.map(([from, to]) => ({
        key: `${from}-${to}`,
        from: skillNodes[from]!,
        to: skillNodes[to]!,
      })),
    [skillNodes],
  )

  return (
    <>
      <OceanScene>
        <div className="page-shell">
          <Section className="hero-section">
            <div className="hero-copy">
              <p className="eyebrow">Digital Ocean Portfolio</p>
              <div className="hero-title-wrap">
                <h1 className="hero-name">Rakati Venu Kumar</h1>
                <div className="hero-reflection" aria-hidden="true">
                  Rakati Venu Kumar
                </div>
              </div>
              <p className="hero-role">Python Developer | Software Engineer</p>
              <p className="hero-tagline">Exploring depth through code.</p>
              <div className="hero-meta">
                <span>Calm surface</span>
                <span>Scroll to descend</span>
              </div>
            </div>
          </Section>

          <Section className="about-section">
            <div className="glass-panel panel-wide">
              <p className="eyebrow">About</p>
              <h2>Developer thinking translated into an ocean of systems, structure, and curiosity.</h2>
              <p>
                I build software with a bias for clarity, reliability, and technical depth. This space is
                designed like a mind map underwater: calm on the surface, increasingly structured as you move
                deeper into the architecture of ideas.
              </p>
              <p>
                My focus sits at the intersection of Python engineering, algorithmic problem solving, and
                practical frontend systems that communicate complexity without noise.
              </p>
            </div>
          </Section>

          <Section className="skills-section">
            <div className="glass-panel panel-skill-network">
              <div className="panel-header">
                <p className="eyebrow">Skills</p>
                <h2>Connected knowledge spheres in a neural-style map.</h2>
              </div>

              <div className="skill-network">
                <svg className="skill-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {skillNetworkLinks.map((link) => (
                    <line
                      key={link.key}
                      x1={link.from.x}
                      y1={link.from.y}
                      x2={link.to.x}
                      y2={link.to.y}
                    />
                  ))}
                </svg>

                {skillNodes.map((node, index) => (
                  <button
                    key={node.skill}
                    type="button"
                    className="skill-node"
                    style={
                      {
                        '--x': `${node.x}%`,
                        '--y': `${node.y}%`,
                        '--delay': `${index * 0.45}s`,
                      } as CSSProperties
                    }
                  >
                    <span>{node.skill}</span>
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section className="projects-section">
            <div className="section-split">
              <div className="section-copy glass-panel compact-panel">
                <p className="eyebrow">Projects</p>
                <h2>Vault platforms emerging from the ocean floor.</h2>
                <p>
                  Each project is presented like a stored knowledge object. Select a platform to expand its
                  holographic detail card.
                </p>
              </div>

              <div className="project-grid">
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    type="button"
                    className="project-card"
                    onClick={() => setActiveProject(project)}
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <span className="project-card-glow" aria-hidden="true" />
                    <span className="project-card-label">Knowledge Vault 0{index + 1}</span>
                    <strong>{project.title}</strong>
                    <span>{project.technologies.join(' · ')}</span>
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section className="experience-section">
            <div className="glass-panel terminal-panel">
              <div className="terminal-topbar">
                <span />
                <span />
                <span />
              </div>
              <p className="eyebrow">Experience</p>
              <h2>Learning journey rendered as a submerged terminal.</h2>
              <TypingText lines={experienceLines} />
            </div>
          </Section>

          <Section className="resume-section">
            <div className="glass-panel resume-panel">
              <p className="eyebrow">Resume</p>
              <h2>A glowing archive container with multiple access paths.</h2>
              <p>
                Connect your final resume destination here. The interface is already prepared for both view and
                download actions.
              </p>
              <div className="resume-actions">
                <a href="#" onClick={(event) => linkClickGuard(event, '#')} className="action-button primary">
                  View Resume
                </a>
                <a href="#" onClick={(event) => linkClickGuard(event, '#')} className="action-button secondary">
                  Download Resume
                </a>
              </div>
            </div>
          </Section>

          <Section className="contact-section">
            <div className="section-split contact-layout">
              <div className="glass-panel compact-panel">
                <p className="eyebrow">Contact</p>
                <h2>Ascending back toward the surface with a minimal contact interface.</h2>
                <p>
                  Replace the placeholder destinations below with your live GitHub, LinkedIn, email, and resume
                  endpoints before deployment.
                </p>
              </div>

              <div className="contact-grid">
                {contactCards.map((card) => (
                  <a
                    key={card.id}
                    href={card.href}
                    className="contact-card"
                    onClick={(event) => linkClickGuard(event, card.href)}
                  >
                    <span className="contact-icon">
                      <ContactIcon id={card.id} />
                    </span>
                    <strong>{card.label}</strong>
                    <span>{card.subtitle}</span>
                  </a>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </OceanScene>

      <div className="depth-indicator" aria-hidden="true">
        <span>Knowledge depth</span>
        <div className="depth-line" />
      </div>

      {activeProject ? (
        <div className="project-modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="project-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setActiveProject(null)}>
              Close
            </button>
            <p className="eyebrow">Project Display</p>
            <h3>{activeProject.title}</h3>
            <p>{activeProject.description}</p>
            <p className="project-insight">{activeProject.insight}</p>
            <div className="project-tech-list">
              {activeProject.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="resume-actions">
              <a
                href={activeProject.github}
                className="action-button primary"
                onClick={(event) => linkClickGuard(event, activeProject.github)}
              >
                GitHub Link
              </a>
              <a
                href={activeProject.demo}
                className="action-button secondary"
                onClick={(event) => linkClickGuard(event, activeProject.demo)}
              >
                Demo Link
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}