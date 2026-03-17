import { useEffect, useMemo, useState } from 'react'

type TypingTextProps = {
  lines: string[]
  speed?: number
}

export function TypingText({ lines, speed = 26 }: TypingTextProps) {
  const fullText = useMemo(() => lines.join('\n'), [lines])
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
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
  }, [fullText, speed])

  return (
    <pre className="terminal-output">
      {fullText.slice(0, visibleChars)}
      <span className="terminal-caret">|</span>
    </pre>
  )
}