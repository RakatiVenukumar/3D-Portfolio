import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { OceanScene } from './components/OceanScene'
import { TypingText } from './components/TypingText'
import { ContactForm } from './components/ContactForm'
import { LoadingSpinner } from './components/LoadingSpinner'
import {
  contactCards,
  experienceEntries,
  projects,
  skillLinks,
  skillNodePositions,
  skills,
} from './content'
import { analytics } from './utils/analytics'

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

function Section({
  className,
  children,
  id,
  ariaLabel,
}: {
  className?: string
  children: ReactNode
  id?: string
  ariaLabel?: string
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={`page-section ${className ?? ''}`.trim()}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

function linkClickGuard(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (href === '#') {
    event.preventDefault()
  }
}

function smoothScrollToAnchor(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href')
  if (href?.startsWith('#')) {
    event.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }
}

function CaseStudyPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="case-study-shell" aria-label="Deep-dive case study">
      <section className="case-study-wrap">
        <p className="eyebrow">Case Study</p>
        <h1>Digital Depth Portfolio System</h1>
        <p className="case-study-intro">
          A cinematic engineering portfolio designed to communicate technical depth, architecture thinking,
          and product storytelling in one coherent experience.
        </p>

        <div className="case-study-grid">
          <article className="glass-panel compact-panel">
            <h2>Architecture Decisions</h2>
            <ul className="case-study-list">
              <li>Separated content data in structured modules to keep UI rendering clean and scalable.</li>
              <li>Used React Three Fiber + Drei to combine declarative React patterns with real-time 3D scenes.</li>
              <li>Designed section primitives for reuse across About, Skills, Projects, Resume, and Contact.</li>
            </ul>
          </article>

          <article className="glass-panel compact-panel">
            <h2>Tradeoffs</h2>
            <ul className="case-study-list">
              <li>Visual richness increased render cost, so performance monitors and graceful fallback were added.</li>
              <li>Scroll-driven camera improved storytelling but required reduced-motion support for accessibility.</li>
              <li>Custom layout identity was prioritized over template speed, increasing implementation effort.</li>
            </ul>
          </article>

          <article className="glass-panel compact-panel">
            <h2>Lessons Learned</h2>
            <ul className="case-study-list">
              <li>Outcome-focused project narratives convert better than feature-only descriptions.</li>
              <li>Accessibility is most effective when built alongside animation and interaction design.</li>
              <li>Progressive enhancement keeps visual ambition without excluding lower-end devices.</li>
            </ul>
          </article>
        </div>

        <div className="resume-actions">
          <button type="button" className="action-button primary" onClick={onBack}>
            Back To Homepage
          </button>
          <a className="action-button secondary" href="https://github.com/RakatiVenukumar/3D-Portfolio">
            View Repository
          </a>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectModalItem | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showCaseStudy, setShowCaseStudy] = useState(false)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
  const sectionObserverRef = useRef<IntersectionObserver | null>(null)

  const openCaseStudy = () => {
    const nextUrl = new URL(window.location.href)
    nextUrl.searchParams.set('case-study', 'digital-depth')
    window.history.pushState({}, '', nextUrl)
    setShowCaseStudy(true)
  }

  const closeCaseStudy = () => {
    const nextUrl = new URL(window.location.href)
    nextUrl.searchParams.delete('case-study')
    window.history.pushState({}, '', nextUrl)
    setShowCaseStudy(false)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setReducedMotion(mediaQuery.matches)
    syncPreference()

    mediaQuery.addEventListener('change', syncPreference)
    return () => mediaQuery.removeEventListener('change', syncPreference)
  }, [])

  useEffect(() => {
    // Hide loading spinner after scene loads
    const timer = setTimeout(() => setShowLoadingSpinner(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Track page view
    analytics.trackPageView(window.location.pathname)
  }, [])

  useEffect(() => {
    // Track scroll progress and depth
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      analytics.trackScrollDepth(progress * 100)
    }

    let ticking = false
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll)
        ticking = true
      }
    })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Track section views with Intersection Observer
    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect()
    }

    sectionObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (sectionId) {
            analytics.trackSectionView(sectionId)
          }
        }
      })
    })

    document.querySelectorAll('.page-section').forEach((el) => {
      sectionObserverRef.current?.observe(el)
    })

    return () => sectionObserverRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const syncCaseStudyState = () => {
      const params = new URLSearchParams(window.location.search)
      setShowCaseStudy(params.get('case-study') === 'digital-depth')
    }

    syncCaseStudyState()
    window.addEventListener('popstate', syncCaseStudyState)
    return () => window.removeEventListener('popstate', syncCaseStudyState)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (activeProject && modalRef.current) {
      modalRef.current.focus()
    }
  }, [activeProject])

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

  const contactMeta: Record<string, string> = {
    github: 'Best for code reviews, collaboration, and project history.',
    linkedin: 'Best for role opportunities and professional conversations.',
    email: 'Best for direct inquiries, interviews, and quick follow-ups.',
  }
  const currentYear = new Date().getFullYear()

  if (showCaseStudy) {
    return <CaseStudyPage onBack={closeCaseStudy} />
  }

  return (
    <>
      {showLoadingSpinner && <LoadingSpinner />}
      <OceanScene reducedMotion={reducedMotion}>
        <div className="page-shell">
          <Section id="hero" ariaLabel="Hero section" className="hero-section">
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
              <div className="hero-actions">
                <a 
                  href="#resume" 
                  className="action-button primary"
                  onClick={(e) => {
                    smoothScrollToAnchor(e)
                    analytics.trackClick('view_resume', 'View Resume')
                  }}
                >
                  View Resume
                </a>
                <a 
                  href="#contact" 
                  className="action-button secondary"
                  onClick={(e) => {
                    smoothScrollToAnchor(e)
                    analytics.trackClick('contact_me', 'Contact Me')
                  }}
                >
                  Contact Me
                </a>
                <button 
                  type="button" 
                  className="action-button secondary" 
                  onClick={() => {
                    openCaseStudy()
                    analytics.trackClick('case_study', 'Case Study')
                  }}
                >
                  Case Study
                </button>
              </div>
            </div>
          </Section>

          <Section id="about" ariaLabel="About section" className="about-section">
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

          <Section id="skills" ariaLabel="Skills section" className="skills-section">
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

              <ul className="skill-list-mobile" aria-label="Skills list for mobile screens">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="projects" ariaLabel="Projects section" className="projects-section">
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
                    onClick={() => {
                      setActiveProject(project)
                      analytics.trackProjectView(project.title)
                    }}
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <span className="project-card-glow" aria-hidden="true" />
                    <span className="project-card-label">Knowledge Vault 0{index + 1}</span>
                    <strong>{project.title}</strong>
                    <span className="project-outcome">{project.result}</span>
                    <span>{project.technologies.join(' · ')}</span>
                    <div className="project-card-meta">
                      <span className="project-date">{project.date}</span>
                      {project.badges.map((badge) => (
                        <span key={badge} className={`project-badge badge-${badge.toLowerCase().replace(' ', '-')}`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section id="experience" ariaLabel="Experience section" className="experience-section">
            <div className="glass-panel terminal-panel">
              <div className="terminal-topbar">
                <span />
                <span />
                <span />
              </div>
              <p className="eyebrow">Experience</p>
              <h2>Learning journey rendered as a submerged terminal.</h2>
              <TypingText lines={experienceEntries} reducedMotion={reducedMotion} />
            </div>
          </Section>

          <Section id="resume" ariaLabel="Resume section" className="resume-section">
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

          <Section id="contact" ariaLabel="Contact section" className="contact-section">
            <div className="contact-layout">
              <div className="glass-panel contact-panel">
                <p className="eyebrow">Contact</p>
                <div className="contact-title-row">
                  <h2>Let&apos;s build something meaningful together.</h2>
                  <span className="contact-status">Open to opportunities</span>
                </div>
                <p className="contact-note">
                  Choose the channel that matches your intent. Code discussions, hiring conversations, and direct
                  outreach each have a fast path below.
                </p>
              </div>

              <div className="contact-grid">
                {contactCards.filter(card => card.id !== 'email').map((card) => (
                  <a
                    key={card.id}
                    href={card.href}
                    className="contact-card"
                    onClick={(event) => {
                      linkClickGuard(event, card.href)
                      analytics.trackClick(`contact_${card.id}`, `Contact via ${card.label}`)
                    }}
                    aria-label={`${card.label}: ${card.subtitle}`}
                  >
                    <div className="contact-card-top">
                      <span className="contact-icon">
                        <ContactIcon id={card.id} />
                      </span>
                      <span className="contact-card-arrow" aria-hidden="true">
                        {'->'}
                      </span>
                    </div>
                    <strong>{card.label}</strong>
                    <span>{card.subtitle}</span>
                    <small>{contactMeta[card.id] ?? 'Connect here for portfolio-related discussion.'}</small>
                  </a>
                ))}
                
                <div className="contact-card form-card">
                  <div className="contact-card-top">
                    <span className="contact-icon">
                      <ContactIcon id="email" />
                    </span>
                    <span className="contact-card-arrow" aria-hidden="true">
                      {'->'}
                    </span>
                  </div>
                  <strong>Email</strong>
                  <span>Direct message form</span>
                  <ContactForm 
                    onSuccess={() => analytics.trackClick('contact_email_submit', 'Email Form Submitted')} 
                  />
                </div>
              </div>
            </div>

            <footer className="site-footer glass-panel" aria-label="Portfolio footer">
              <div className="site-footer-main">
                <div>
                  <p className="footer-eyebrow">Portfolio Footer</p>
                  <p className="footer-title">Rakati Venu Kumar</p>
                  <p className="footer-subtitle">Python Developer | Software Engineer</p>
                </div>

                <nav className="footer-nav" aria-label="Footer navigation">
                  <a href="#about" onClick={smoothScrollToAnchor}>About</a>
                  <a href="#projects" onClick={smoothScrollToAnchor}>Projects</a>
                  <a href="#experience" onClick={smoothScrollToAnchor}>Experience</a>
                  <a href="#contact" onClick={smoothScrollToAnchor}>Contact</a>
                </nav>

                <div className="footer-socials">
                  {contactCards.map((card) => (
                    <a
                      key={`footer-${card.id}`}
                      href={card.href}
                      aria-label={card.label}
                      onClick={(event) => linkClickGuard(event, card.href)}
                    >
                      <span className="contact-icon" aria-hidden="true">
                        <ContactIcon id={card.id} />
                      </span>
                      <span>{card.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <p className="footer-copy">
                © {currentYear} Rakati Venu Kumar. Designed with cinematic depth and engineered with React + Three.js.
              </p>
            </footer>
          </Section>
        </div>
      </OceanScene>

      <div className="depth-indicator" aria-hidden="true">
        <span>Knowledge depth</span>
        <div className="depth-line" />
      </div>

      {activeProject ? (
        <div className="project-modal-backdrop" onClick={() => setActiveProject(null)}>
          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} details`}
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close project modal"
              onClick={() => setActiveProject(null)}
            >
              ×
            </button>
            <p className="eyebrow">Project Display</p>
            <div className="modal-header-row">
              <div>
                <h3>{activeProject.title}</h3>
                <span className="modal-date">{activeProject.date}</span>
              </div>
              <div className="modal-badges">
                {activeProject.badges.map((badge) => (
                  <span key={badge} className={`project-badge badge-${badge.toLowerCase().replace(' ', '-')}`}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <p>{activeProject.summary}</p>
            
            <div className="project-metrics">
              {activeProject.metrics.map((metric) => (
                <div key={metric.label} className="metric-item">
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-label">{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="project-detail-blocks">
              <p>
                <strong>Problem:</strong> {activeProject.problem}
              </p>
              <p>
                <strong>What I Built:</strong> {activeProject.built}
              </p>
              <p className="project-insight">
                <strong>Measurable Result:</strong> {activeProject.result}
              </p>
            </div>
            <div className="project-tech-list">
              {activeProject.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="resume-actions">
              <a
                href={activeProject.github}
                className="action-button primary"
                onClick={(event) => {
                  linkClickGuard(event, activeProject.github)
                  analytics.trackClick('project_github', `GitHub: ${activeProject.title}`)
                }}
              >
                GitHub Link
              </a>
              <a
                href={activeProject.demo}
                className="action-button secondary"
                onClick={(event) => {
                  linkClickGuard(event, activeProject.demo)
                  analytics.trackClick('project_demo', `Demo: ${activeProject.title}`)
                }}
              >
                Demo Link
              </a>
              <button 
                type="button" 
                className="action-button secondary" 
                onClick={() => {
                  openCaseStudy()
                  analytics.trackClick('view_case_study_modal', 'Case Study from Modal')
                }}
              >
                View Deep-Dive
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}