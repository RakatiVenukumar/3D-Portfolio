import { useEffect, useMemo, useState } from 'react'

type TypingLine = {
  line: string
  href?: string
  label?: string
}

type TypingTextProps = {
  lines: TypingLine[]
  speed?: number
  reducedMotion?: boolean
  onAnchorClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export function TypingText({
  lines,
  speed = 26,
  reducedMotion = false,
  onAnchorClick,
}: TypingTextProps) {
  const fullText = useMemo(() => lines.map((entry) => entry.line).join('\n'), [lines])
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setVisibleChars(fullText.length)
      return
    }

    setVisibleChars(0)

    const timer = window.setInterval(() => {
      setVisibleChars((current) => {
        if (current >= fullText.length) {
          window.clearInterval(timer)
          return current
        }

        return current + 1
      })
    }, speed)

    return () => window.clearInterval(timer)
  }, [fullText, reducedMotion, speed])

  const isDone = visibleChars >= fullText.length

  return (
    <div>
      <pre className="terminal-output">
        {fullText.slice(0, visibleChars)}
        <span className="terminal-caret" aria-hidden="true">
          |
        </span>
      </pre>

      <div className={`terminal-links ${isDone ? 'is-visible' : ''}`}>
        {lines
          .filter((entry) => entry.href && entry.label)
          .map((entry) => (
            <a
              key={entry.line}
              href={entry.href}
              className="terminal-link"
              aria-label={entry.label}
              onClick={entry.href?.startsWith('#') ? onAnchorClick : undefined}
            >
              {entry.label}
            </a>
          ))}
      </div>
    </div>
  )
}