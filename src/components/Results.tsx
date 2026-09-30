import { useEffect, useRef } from 'react'
import { XP_PER_CORRECT } from '../progress'
import type { Question } from '../types'
import { Bolt, Check, Close, Flame } from './Icons'
import { OptionText } from './Specimen'
import { RichText } from './Text'

export interface Outcome {
  question: Question
  correct: boolean
  retry: boolean
}

interface Props {
  outcomes: Outcome[]
  bestCombo: number
  seconds: number
  title: string
  accent: string
  onAgain: () => void
  onHome: () => void
}

export function Results({ outcomes, bestCombo, seconds, title, accent, onAgain, onHome }: Props) {
  const firstTries = outcomes.filter((o) => !o.retry)
  const right = firstTries.filter((o) => o.correct).length
  const accuracy = firstTries.length ? Math.round((right / firstTries.length) * 100) : 0
  const xp = outcomes.filter((o) => o.correct).length * XP_PER_CORRECT
  const missed = firstTries.filter((o) => !o.correct).map((o) => o.question)
  const time = seconds >= 60 ? `${Math.floor(seconds / 60)}m ${seconds % 60}s` : `${seconds}s`

  const verdict =
    accuracy === 100
      ? 'Flawless round.'
      : accuracy >= 80
        ? 'Strong round.'
        : accuracy >= 50
          ? 'Getting there.'
          : 'Rough one. That’s how it sticks.'

  return (
    <div className="page results" data-accent={accent}>
      {accuracy >= 80 && <Confetti />}
      <div className="results-card">
        <div className="results-body">
          <div>
            <p className="results-deck">{title}</p>
            <h1 className="results-verdict">{verdict}</h1>

            <div className="results-score" aria-label={`${right} of ${firstTries.length} right on the first try`}>
              <span className="results-big">{accuracy}%</span>
              <span className="results-sub">
                {right} of {firstTries.length} right on the first try
              </span>
            </div>

            <dl className="results-stats">
              <div>
                <dt>
                  <Bolt /> XP earned
                </dt>
                <dd>+{xp}</dd>
              </div>
              <div>
                <dt>
                  <Flame /> Best combo
                </dt>
                <dd>{bestCombo}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{time}</dd>
              </div>
            </dl>
          </div>

          {missed.length > 0 ? (
            <section className="results-missed">
              <h2>Worth another look</h2>
              <ul>
                {missed.map((q) => (
                  <li key={q.id}>
                    <span className="miss-icon">
                      <Close />
                    </span>
                    <div>
                      <p className="miss-q">
                        <RichText text={q.prompt} />
                      </p>
                      <p className="miss-a">
                        <OptionText option={q.options[q.answer]} />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <p className="results-clean">
              <Check /> No misses this round.
            </p>
          )}
        </div>

        <div className="results-actions">
          <button className="btn btn-ghost-dark" onClick={onHome}>
            Back to decks
          </button>
          <button className="btn btn-sun" onClick={onAgain} autoFocus>
            Practice again
          </button>
        </div>
      </div>
    </div>
  )
}

const CONFETTI_COLORS = ['#FFC83D', '#25D39A', '#56B8FF', '#D26BFF', '#FF5C6C', '#F6F7FF']

function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const dpr = window.devicePixelRatio || 1
    const w = (canvas.width = window.innerWidth * dpr)
    const h = (canvas.height = window.innerHeight * dpr)

    const bits = Array.from({ length: 140 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * w * 0.2,
      y: h * 0.35,
      vx: (Math.random() - 0.5) * 22 * dpr,
      vy: (-Math.random() * 20 - 8) * dpr,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      s: (6 + Math.random() * 7) * dpr,
      c: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    }))

    let frame = 0
    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const b of bits) {
        b.vy += 0.55 * dpr
        b.vx *= 0.985
        b.x += b.vx
        b.y += b.vy
        b.r += b.vr
        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate(b.r)
        ctx.fillStyle = b.c
        ctx.globalAlpha = Math.max(0, 1 - frame / 170)
        ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2)
        ctx.restore()
      }
      if (++frame < 170) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} className="confetti" aria-hidden />
}
