type EventData = {
  event: string
  timestamp: number
  scrollDepth?: number
  element?: string
  value?: string
}

class Analytics {
  private events: EventData[] = []
  private maxScrollDepth = 0
  private sessionStart = Date.now()

  constructor() {
    this.loadFromStorage()
    this.setupScrollTracking()
  }

  trackClick(element: string, label?: string) {
    const event: EventData = {
      event: 'cta_click',
      timestamp: Date.now(),
      element,
      value: label,
    }
    this.events.push(event)
    this.saveToStorage()
  }

  trackScrollDepth(depth: number) {
    if (depth > this.maxScrollDepth) {
      this.maxScrollDepth = depth
      const event: EventData = {
        event: 'scroll_depth',
        timestamp: Date.now(),
        scrollDepth: Math.round(depth),
      }
      this.events.push(event)
      this.saveToStorage()
    }
  }

  trackPageView(path: string) {
    const event: EventData = {
      event: 'page_view',
      timestamp: Date.now(),
      element: path,
    }
    this.events.push(event)
    this.saveToStorage()
  }

  trackProjectView(projectTitle: string) {
    const event: EventData = {
      event: 'project_view',
      timestamp: Date.now(),
      element: projectTitle,
    }
    this.events.push(event)
    this.saveToStorage()
  }

  trackSectionView(sectionId: string) {
    const event: EventData = {
      event: 'section_view',
      timestamp: Date.now(),
      element: sectionId,
    }
    this.events.push(event)
    this.saveToStorage()
  }

  getSessionDuration(): number {
    return Date.now() - this.sessionStart
  }

  getMaxScrollDepth(): number {
    return this.maxScrollDepth
  }

  getEvents(): EventData[] {
    return this.events
  }

  private saveToStorage() {
    try {
      const data = {
        events: this.events,
        maxScrollDepth: this.maxScrollDepth,
        sessionStart: this.sessionStart,
      }
      localStorage.setItem('portfolio_analytics', JSON.stringify(data))
    } catch (err) {
      console.error('Failed to save analytics:', err)
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('portfolio_analytics')
      if (stored) {
        const data = JSON.parse(stored)
        this.events = data.events || []
        this.maxScrollDepth = data.maxScrollDepth || 0
        this.sessionStart = data.sessionStart || Date.now()
      }
    } catch (err) {
      console.error('Failed to load analytics:', err)
    }
  }

  private setupScrollTracking() {
    let ticking = false

    const updateScrollDepth = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0
      this.trackScrollDepth(scrollPercent)
      ticking = false
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDepth)
        ticking = true
      }
    })
  }
}

// Create singleton instance
export const analytics = new Analytics()
