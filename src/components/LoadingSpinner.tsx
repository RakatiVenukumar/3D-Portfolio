import type { CSSProperties } from 'react'
import { useMemo } from 'react'

export function LoadingSpinner() {
  const letters = 'LOADING'.split('')
  const stars = useMemo(
    () =>
      Array.from({ length: 96 }, (_, index) => {
        const noiseA = Math.abs(Math.sin((index + 1) * 12.9898) * 43758.5453) % 1
        const noiseB = Math.abs(Math.sin((index + 1) * 78.233) * 12345.6789) % 1
        const noiseC = Math.abs(Math.sin((index + 1) * 39.425) * 2048.5567) % 1

        return {
          x: 2 + noiseA * 96,
          y: 2 + noiseB * 54,
          size: noiseC > 0.86 ? 2.8 + noiseC * 1.4 : 0.9 + noiseC * 1.7,
          alpha: noiseC > 0.86 ? 0.8 + noiseA * 0.15 : 0.4 + noiseA * 0.38,
          blur: noiseC > 0.9 ? 0 : 0.15 + noiseB * 0.6,
          delay: noiseC * 1.6,
        }
      }),
    [],
  )

  return (
    <div className="loading-spinner-overlay" aria-label="Loading portfolio" role="progressbar" aria-valuetext="Loading">
      <div className="loading-spinner-container">
        <div className="loading-cinematic" aria-hidden="true">
          <div className="loading-stars">
            {stars.map((star, index) => (
              <span
                key={`star-${index}`}
                style={
                  {
                    '--x': `${star.x}%`,
                    '--y': `${star.y}%`,
                    '--size': `${star.size}px`,
                    '--alpha': `${star.alpha}`,
                    '--blur': `${star.blur}px`,
                    '--delay': `${star.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="loading-horizon">
            <div className="loading-water" />
            <div className="loading-sand" />
            <div className="loading-lighthouse" />
            <div className="loading-beam" />
            <div className="loading-beach-items">
              <span />
              <span />
              <span />
            </div>
          </div>

          <p className="loading-stage stage-sand">SAND</p>
          <p className="loading-stage stage-loading">LOADING</p>
          <p className="loading-stage stage-water">WATER</p>
        </div>

        <p className="spinner-text" aria-label="LOADING">
          {letters.map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ '--char-delay': `${index * 0.14}s` } as CSSProperties}>
              {letter}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
