import { useState, type CSSProperties } from 'react'
import type { Route } from '../App'
import type { CardRow } from '../progress'
import { isMuted, setMuted } from '../lib/sound'
import { cardState, countStates, useCards, useOverview, useTipsSeen, type Overview } from '../lib/stats'
import { subjects } from '../subjects'
import type { Level, Subject } from '../types'
import { Bolt, Bulb, Flame, Sound } from './Icons'
import { RichText } from './Text'
import { TIP_KIND_LABEL } from './labels'

export function Home({ go }: { go: (r: Route) => void }) {
  const overview = useOverview()
  const [muted, setMutedState] = useState(isMuted)

  const toggleSound = () => {
    setMuted(!muted)
    setMutedState(!muted)
  }


  return (
    <div className="page home">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          deckhand
        </div>
        <div className="topbar-stats">
          <span className="stat stat-streak" title="Days in a row with at least one answer">
            <Flame />
            <b>{overview?.streak ?? 0}</b>
            <span className="stat-label">day streak</span>
          </span>
          <span className="stat stat-xp" title="10 XP per correct answer">
            <Bolt />
            <b>{overview?.xp ?? 0}</b>
            <span className="stat-label">XP</span>
          </span>
          <button className="icon-btn" onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
            <Sound muted={muted} />
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>{headline(overview)}</h1>
        {overview && <Activity activity={overview.activity} />}
      </section>

      {subjects.map((s) => (
        <Shelf key={s.id} subject={s} go={go} />
      ))}

    </div>
  )
}

function headline(o: Overview | undefined) {
  if (!o) return ' '
  if (o.answeredToday === 0) return o.streak > 0 ? 'Keep your streak alive. Pick a deck.' : 'Ten cards, a few minutes. Pick a deck.'
  return `${o.answeredToday} ${o.answeredToday === 1 ? 'card' : 'cards'} today. One more round?`
}

function Activity({ activity }: { activity: Overview['activity'] }) {
  const max = Math.max(10, ...activity.map((d) => d.count))
  return (
    <figure className="activity" aria-label="Cards answered in the last 14 days">
      <div className="activity-bars">
        {activity.map((d, i) => (
          <span
            key={i}
            className="activity-bar"
            data-today={i === activity.length - 1 || undefined}
            data-empty={d.count === 0 || undefined}
            style={{ '--h': `${Math.max(8, (d.count / max) * 100)}%` } as CSSProperties}
            title={`${d.date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}: ${d.count} cards`}
          />
        ))}
      </div>
      <figcaption>Last 14 days</figcaption>
    </figure>
  )
}

function Shelf({ subject, go }: { subject: Subject; go: (r: Route) => void }) {
  const cards = useCards(subject.id) ?? new Map()
  const seenTips = useTipsSeen(subject.id) ?? new Set<string>()
  const [tip] = useState(() => {
    const unseen = subject.tips.filter((t) => !seenTips.has(t.id))
    const pool = unseen.length ? unseen : subject.tips
    return pool[Math.floor(Math.random() * pool.length)]
  })
  const missed = subject.levels.flatMap((l) => l.questions).filter((q) => cardState(cards.get(q.id)) === 'missed').length

  return (
    <section className="shelf" aria-labelledby={`shelf-${subject.id}`}>
      <div className="shelf-head">
        <span className="subject-badge" style={{ background: subject.color }}>
          {subject.badge}
        </span>
        <div className="shelf-title">
          <h2 id={`shelf-${subject.id}`}>{subject.name}</h2>
          <p>{subject.tagline}</p>
        </div>
        {missed > 0 && (
          <button className="btn btn-flame btn-sm" onClick={() => go({ name: 'session', subjectId: subject.id, levelId: 'review' })}>
            Review {missed} missed
          </button>
        )}
      </div>

      <div className="decks">
        {subject.levels.map((level) => (
          <Deck
            key={level.id}
            level={level}
            cards={cards}
            onOpen={() => go({ name: 'session', subjectId: subject.id, levelId: level.id })}
          />
        ))}
        <button className="deck" data-level="tips" onClick={() => go({ name: 'tips', subjectId: subject.id })}>
          <span className="deck-layer" />
          <span className="deck-layer" />
          <span className="deck-face">
            <span className="deck-glyph" aria-hidden>
              <Bulb />
            </span>
            <span className="deck-name">Tips & curiosities</span>
            <span className="deck-blurb">Short reads: habits worth having, surprises, and a bit of history.</span>
            <span className="deck-meta">
              {seenTips.size} of {subject.tips.length} read
            </span>
          </span>
        </button>
      </div>

      {tip && (
        <aside className="did-you-know">
          <span className="sticker" data-kind={tip.kind}>
            {TIP_KIND_LABEL[tip.kind]}
          </span>
          <h3>
            <RichText text={tip.title} />
          </h3>
          <p>
            <RichText text={tip.body} />
          </p>
        </aside>
      )}
    </section>
  )
}

function Deck({ level, cards, onOpen }: { level: Level; cards: Map<string, CardRow>; onOpen: () => void }) {
  const counts = countStates(level.questions, cards)
  const empty = level.questions.length === 0
  return (
    <button className="deck" data-level={level.id} onClick={onOpen} disabled={empty}>
      <span className="deck-layer" />
      <span className="deck-layer" />
      <span className="deck-face">
        <span className="deck-glyph" aria-hidden>
          {level.glyph}
        </span>
        <span className="deck-name">{level.name}</span>
        <span className="deck-blurb">{level.blurb}</span>
        <span className="pips" aria-hidden>
          {level.questions.map((q) => (
            <i key={q.id} data-state={cardState(cards.get(q.id))} />
          ))}
        </span>
        <span className="deck-meta">
          {empty ? 'No cards yet' : `${counts.mastered} of ${level.questions.length} mastered`}
          {counts.missed > 0 && <span className="deck-missed">{counts.missed} to review</span>}
        </span>
      </span>
    </button>
  )
}
