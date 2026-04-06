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
    leetcode: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.09 3.36a1 1 0 0 1 1.42 0l4.13 4.13a1 1 0 1 1-1.42 1.42l-4.13-4.13a1 1 0 0 1 0-1.42Z" />
        <path d="M10.21 7.23a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-4.7 4.7 4.7 4.7a1 1 0 1 1-1.41 1.41l-5.41-5.4a1 1 0 0 1 0-1.42l5.41-5.41Z" />
        <path d="M9.35 13.35a1 1 0 0 1 1-1h8.83a1 1 0 0 1 0 2h-8.83a1 1 0 0 1-1-1Z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5Zm0 2A1.5 1.5 0 0 0 5.5 7v10A1.5 1.5 0 0 0 7 18.5h10a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 17 5.5H7Zm10.25 1.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 2.8a1.5 1.5 0 0 1 1.54.36l2.06 2.06a1.5 1.5 0 0 1 .35 1.59l-.7 2.1a1.5 1.5 0 0 0 .36 1.53l2.33 2.33a1.5 1.5 0 0 0 1.53.36l2.1-.7a1.5 1.5 0 0 1 1.59.35l2.06 2.06a1.5 1.5 0 0 1 .36 1.54 5.7 5.7 0 0 1-5.47 3.94A12.72 12.72 0 0 1 4.74 9.73 5.7 5.7 0 0 1 8.68 4.26l-2.06-2.06Z" />
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
    const target = document.querySelector<HTMLElement>(href)
    if (target) {
      // ScrollControls uses a nested scroll container, so we must target the real scroll parent.
      const getScrollableParent = (element: HTMLElement): HTMLElement | null => {
        let parent = element.parentElement

        while (parent) {
          const style = window.getComputedStyle(parent)
          const canScrollY = /(auto|scroll)/.test(style.overflowY)

          if (canScrollY && parent.scrollHeight > parent.clientHeight) {
            return parent
          }

          parent = parent.parentElement
        }

        return (document.scrollingElement as HTMLElement | null) ?? null
      }

      const scrollParent = getScrollableParent(target)
      if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        const top = targetRect.top - parentRect.top + scrollParent.scrollTop

        scrollParent.scrollTo({
          top,
          behavior: 'smooth',
        })
      }
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
  const revealObserverRef = useRef<IntersectionObserver | null>(null)

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
    // Keep the intro visible long enough for the full cinematic loader to complete.
    // Hide loading spinner after scene loads
    const timer = setTimeout(() => setShowLoadingSpinner(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Prevent the homepage from animating in until the loader is finished.
    document.body.classList.toggle('site-loading', showLoadingSpinner)
    return () => {
      document.body.classList.remove('site-loading')
    }
  }, [showLoadingSpinner])

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
    // Each major section and card gets a bottom-up reveal as it enters the viewport.
    if (revealObserverRef.current) {
      revealObserverRef.current.disconnect()
    }

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          '.about-section .section-inner > *',
          '.skills-section .section-inner > *',
          '.skills-section .skill-network > *',
          '.projects-section .section-inner > *',
          '.projects-section .project-card',
          '.experience-section .section-inner > *',
          '.experience-section .terminal-link',
          '.resume-section .section-inner > *',
          '.contact-section .section-inner > *',
          '.contact-section .contact-card',
          '.site-footer .site-footer-main > *',
          '.site-footer .footer-nav a',
          '.site-footer .footer-socials a',
          '.site-footer .footer-copy',
        ].join(', '),
      ),
    )

    // Attach the observer after the targets are tagged with reveal classes.
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal-on-scroll')
      element.style.setProperty('--reveal-delay', `${(index % 6) * 70}ms`)
    })

    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement

          if (entry.isIntersecting) {
            element.classList.add('is-revealed')
          } else {
            element.classList.remove('is-revealed')
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    revealTargets.forEach((element) => revealObserverRef.current?.observe(element))

    return () => revealObserverRef.current?.disconnect()
  }, [showCaseStudy, showLoadingSpinner])

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
    document.body.classList.toggle('case-study-open', showCaseStudy)

    return () => {
      document.body.classList.remove('case-study-open')
    }
  }, [showCaseStudy])

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
    leetcode: 'Best for algorithm practice history and coding consistency.',
    instagram: 'Best for personal updates and lightweight networking.',
    phone: 'Best for urgent calls and direct hiring conversations.',
    email: 'Best for direct inquiries, interviews, and quick follow-ups.',
  }

  const currentYear = new Date().getFullYear()
  const resumeFile = '/VenuKumarResume.pdf'

  if (showCaseStudy) {
    return <CaseStudyPage onBack={closeCaseStudy} />
  }

  return (
    <>
      {showLoadingSpinner && <LoadingSpinner />}
      <OceanScene reducedMotion={reducedMotion}>
        <div className="page-shell">
          <Section id="hero" ariaLabel="Hero section" className="hero-section">
            <div className="hero-layout">
              <div className="hero-copy">
                <p className="eyebrow hero-reveal" style={{ '--d': '0.02s' } as CSSProperties}>Personal Portfolio</p>
                <div className="hero-title-wrap">
                  <h1 className="hero-name hero-reveal" style={{ '--d': '0.12s' } as CSSProperties}>Rakati Venu Kumar</h1>
                  <div className="hero-reflection" aria-hidden="true">
                    Rakati Venu Kumar
                  </div>
                </div>
                <p className="hero-role hero-reveal" style={{ '--d': '0.24s' } as CSSProperties}>Python Developer | Software Engineer</p>
                <p className="hero-tagline hero-reveal" style={{ '--d': '0.34s' } as CSSProperties}>Building reliable full-stack products with Python at the core.</p>
                <div className="hero-actions hero-reveal" style={{ '--d': '0.46s' } as CSSProperties}>
                  <a 
                    href={resumeFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button primary"
                    onClick={() => {
                      analytics.trackClick('view_resume', 'View Resume')
                    }}
                  >
                    View Resume
                  </a>
                  <a
                    href="#footer"
                    className="action-button accent"
                    onClick={(event) => {
                      smoothScrollToAnchor(event)
                      analytics.trackClick('lets_connect', "Let's Connect")
                    }}
                  >
                    Let&apos;s Connect
                  </a>
                  <button 
                    type="button" 
                    className="action-button ghost" 
                    onClick={() => {
                      openCaseStudy()
                      analytics.trackClick('case_study', 'Case Study')
                    }}
                  >
                    Case Study
                  </button>
                </div>

                <div className="hero-profile-badge hero-reveal" style={{ '--d': '0.58s' } as CSSProperties}>
                  <img src="/Profile3.jpeg" alt="Rakati Venu Kumar" loading="lazy" />
                  <div>
                    <strong>Rakati Venu Kumar</strong>
                    <span>Full-Stack Python Developer</span>
                  </div>
                </div>

                <a
                  href="#about"
                  className="hero-scroll-cue hero-reveal"
                  style={{ '--d': '0.7s' } as CSSProperties}
                  onClick={smoothScrollToAnchor}
                >
                  <span className="hero-scroll-arrow" aria-hidden="true">↓</span>
                  <span>Scroll to explore projects and skills</span>
                </a>
              </div>

              <aside className="hero-now-card hero-reveal" style={{ '--d': '0.54s' } as CSSProperties}>
                <p className="eyebrow">Currently Working On</p>
                <h3>AI Job Application Automation Agent</h3>
                <p>
                  Building an AI automation agent that applies to jobs based on user preferences such as role,
                  salary expectations, and experience level across portals like LinkedIn, Naukri, Unstop, and
                  Indeed.
                </p>
                <div className="hero-now-meta">
                  <span>Python AI</span>
                  <span>Automation</span>
                  <span>Multi-Portal</span>
                </div>
              </aside>
            </div>
          </Section>

          <Section id="about" ariaLabel="About section" className="about-section">
            <div className="glass-panel panel-wide about-panel">
              <div className="about-layout">
                <div className="about-copy">
                  <p className="eyebrow about-eyebrow">About</p>
                  <h2>Fresher seeking opportunities in full-stack Python and React development.</h2>
                  <p>
                    I am a fresher focused on clarity, reliability, and technical depth. My interest is in
                    practical systems that are clean, scalable, and easy to understand.
                  </p>
                  <p>
                    My interest sits at the intersection of Python engineering, algorithmic problem solving, and
                    frontend systems that communicate complexity without noise.
                  </p>
                </div>

                <figure className="about-photo-frame" aria-label="Profile photo">
                  <img src="/Profile3.jpeg" alt="Portrait of Rakati Venu Kumar" loading="lazy" />
                </figure>
              </div>
            </div>
          </Section>

          <Section id="skills" ariaLabel="Skills section" className="skills-section">
            <div className="glass-panel panel-skill-network">
              <div className="panel-header">
                <p className="eyebrow skills-eyebrow">Skills</p>
                <h2>A constellation of connected expertise</h2>
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
                <h2>Projects built by a fresher with strong Python full-stack skills.</h2>
                <p>
                  Each project highlights practical work across Python backends, databases, and modern web
                  interfaces. Select any one to open its interactive detail card.
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
              <TypingText
                lines={experienceEntries}
                reducedMotion={reducedMotion}
                onAnchorClick={smoothScrollToAnchor}
              />
            </div>
          </Section>

          <Section id="resume" ariaLabel="Resume section" className="resume-section">
            <div className="glass-panel resume-panel">
              <p className="eyebrow">Resume</p>
              <h2>Resume access for recruiters and hiring teams.</h2>
              <p>
                Open the latest version instantly or download a copy for review. Both options point to the same
                up-to-date resume file.
              </p>
              <div className="resume-actions">
                <a
                  href={resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button primary"
                  onClick={() => analytics.trackClick('resume_view_section', 'View Resume (Section)')}
                >
                  View Resume
                </a>
                <a
                  href={resumeFile}
                  download="Rakati_Venu_Kumar_Resume.pdf"
                  className="action-button secondary"
                  onClick={() => analytics.trackClick('resume_download', 'Download Resume')}
                >
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

            <footer id="footer" className="site-footer glass-panel" aria-label="Portfolio footer">
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