import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { markTipSeen } from '../progress'
import { shuffle } from '../lib/deck'
import { useTipsSeen } from '../lib/stats'
import { getSubject } from '../subjects'
import { Arrow, Close, Shuffle } from './Icons'
import { TIP_KIND_LABEL } from './labels'
import { Specimen } from './Specimen'
import { Code, RichText } from './Text'

export function TipsDeck({ subjectId, onExit }: { subjectId: string; onExit: () => void }) {
  const subject = getSubject(subjectId)
  const seen = useTipsSeen(subjectId)
  const [order, setOrder] = useState(() => subject.tips)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const touchX = useRef<number | null>(null)
  const tip = order[index]

  useEffect(() => {
    if (tip) markTipSeen(subjectId, tip.id).catch(() => {})
  }, [tip, subjectId])

  const move = (step: 1 | -1) => {
    const n = index + step
    if (n < 0 || n >= order.length) return
    setDir(step)
    setIndex(n)
  }

  const reshuffle = () => {
    setOrder(shuffle(subject.tips))
    setDir(1)
    setIndex(0)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        move(1)
      } else if (e.key === 'ArrowLeft') move(-1)
      else if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!tip) {
    return (
      <div className="page tips empty-session">
        <h1>No tips here yet.</h1>
        <button className="btn btn-sun" onClick={onExit}>
          Back to decks
        </button>
      </div>
    )
  }

  return (
    <div className="page tips">
      <header className="session-top">
        <button className="icon-btn icon-btn-dim" onClick={onExit} aria-label="Back to decks (Esc)">
          <Close />
        </button>
        <div className="tips-title">
          {subject.name} tips & curiosities
          <span className="tips-read">
            {seen?.size ?? 0} of {subject.tips.length} read
          </span>
        </div>
        <button className="icon-btn icon-btn-dim" onClick={reshuffle} aria-label="Shuffle">
          <Shuffle />
        </button>
      </header>

      <main
        className="tips-stage"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <div className="tip-stack">
          {index + 2 < order.length && <span className="tip-under tip-under-2" aria-hidden />}
          {index + 1 < order.length && <span className="tip-under" aria-hidden />}
          <article className="tip-card" key={tip.id} data-kind={tip.kind} style={{ '--dir': dir } as CSSProperties}>
          <span className="sticker" data-kind={tip.kind}>
            {TIP_KIND_LABEL[tip.kind]}
          </span>
          <h1>
            <RichText text={tip.title} />
          </h1>
          <p>
            <RichText text={tip.body} />
          </p>
          {tip.code && <Code code={tip.code} lang={subject.codeLanguage} />}
          {tip.visual != null && <Specimen>{tip.visual}</Specimen>}
          </article>
        </div>
      </main>

      <footer className="tips-nav">
        <button className="btn btn-ghost" onClick={() => move(-1)} disabled={index === 0} aria-label="Previous tip">
          <Arrow dir="left" />
        </button>
        <span className="tips-count">
          {index + 1} / {order.length}
        </span>
        {index + 1 < order.length ? (
          <button className="btn btn-sun" onClick={() => move(1)} aria-label="Next tip">
            <Arrow />
          </button>
        ) : (
          <button className="btn btn-sun" onClick={onExit}>
            Done
          </button>
        )}
      </footer>
    </div>
  )
}
