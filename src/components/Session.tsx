import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import type { Route } from '../App'
import { getCards, recordAnswer, saveSession } from '../progress'
import { deal, pickQuestions, type Dealt } from '../lib/deck'
import { sfx } from '../lib/sound'
import { cardState } from '../lib/stats'
import { getSubject } from '../subjects'
import type { LevelId, Question } from '../types'
import { Check, Close, Flame } from './Icons'
import { Results, type Outcome } from './Results'
import { Code, RichText } from './Text'

interface Item {
  dealt: Dealt
  levelId: LevelId
  /** A second go at a card missed earlier in this session. */
  retry: boolean
}

const PRAISE = ['Nice.', 'Exactly.', 'Spot on.', 'You got it.', 'Clean.', 'Correct.']
const LETTERS = ['1', '2', '3', '4']

interface Props {
  subjectId: string
  levelId: LevelId | 'review'
  onExit: () => void
  go: (r: Route) => void
}

export function Session({ subjectId, levelId, onExit, go }: Props) {
  const subject = getSubject(subjectId)
  const level = levelId === 'review' ? undefined : subject.levels.find((l) => l.id === levelId)
  const accent = levelId === 'review' ? 'flame' : levelId

  const [queue, setQueue] = useState<Item[] | null>(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [outcomes, setOutcomes] = useState<Outcome[]>([])
  const [praise, setPraise] = useState(PRAISE[0])
  const [startedAt] = useState(() => Date.now())
  /** Seconds the round took; set when it ends. */
  const [duration, setDuration] = useState<number | null>(null)
  const done = duration != null

  // Deal once, using what the database knows about each card.
  useEffect(() => {
    let alive = true
    ;(async () => {
      const rows = await getCards(subjectId)
      const cards = new Map(rows.map((r) => [r.questionId, r]))
      const levelOf = new Map<string, LevelId>()
      for (const l of subject.levels) for (const q of l.questions) levelOf.set(q.id, l.id)

      let picked: Question[]
      if (level) picked = pickQuestions(level.questions, cards)
      else {
        const missed = subject.levels.flatMap((l) => l.questions).filter((q) => cardState(cards.get(q.id)) === 'missed')
        picked = pickQuestions(missed, cards)
      }
      if (alive) setQueue(picked.map((q) => ({ dealt: deal(q), levelId: levelOf.get(q.id)!, retry: false })))
    })().catch(() => {})
    return () => {
      alive = false
    }
  }, [subjectId, level, subject])

  const item = queue?.[index]
  const isCorrect = checked && item != null && selected === item.dealt.answer

  const check = useCallback(
    (choice: number | null) => {
      if (!item || checked) return
      const correct = choice === item.dealt.answer
      setSelected(choice)
      setChecked(true)
      recordAnswer(subjectId, item.levelId, item.dealt.question.id, correct).catch(() => {})
      setOutcomes((o) => [...o, { question: item.dealt.question, correct, retry: item.retry }])
      if (correct) {
        sfx.correct()
        setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)])
        setCombo(combo + 1)
        setBestCombo(Math.max(bestCombo, combo + 1))
      } else {
        sfx.wrong()
        setCombo(0)
        // Missed cards come back once at the end of the round.
        if (!item.retry) setQueue((q) => q && [...q, { ...item, dealt: deal(item.dealt.question), retry: true }])
      }
    },
    [item, checked, subjectId, combo, bestCombo],
  )

  const next = useCallback(() => {
    if (!queue) return
    if (index + 1 < queue.length) {
      setIndex(index + 1)
      setSelected(null)
      setChecked(false)
      return
    }
    const now = Date.now()
    const firstTries = outcomes.filter((o) => !o.retry)
    saveSession({
      subjectId,
      levelId,
      startedAt,
      finishedAt: now,
      total: firstTries.length,
      correct: firstTries.filter((o) => o.correct).length,
      bestCombo,
    }).catch(() => {})
    sfx.complete()
    setDuration(Math.round((now - startedAt) / 1000))
  }, [index, queue, outcomes, subjectId, levelId, bestCombo, startedAt])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || !item || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Escape') onExit()
      else if (!checked && /^[1-4]$/.test(e.key)) {
        const n = Number(e.key) - 1
        if (n < item.dealt.options.length) check(n)
      } else if (e.key === 'Enter' && checked) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, item, checked, check, next, onExit])

  if (duration != null) {
    return (
      <Results
        outcomes={outcomes}
        bestCombo={bestCombo}
        seconds={duration}
        title={level ? `${subject.name} ${level.name}` : `${subject.name} review`}
        accent={accent}
        onAgain={() => go({ name: 'session', subjectId, levelId })}
        onHome={onExit}
      />
    )
  }

  if (!queue) return <div className="page session" data-accent={accent} />

  if (!item) {
    return (
      <div className="page session empty-session" data-accent={accent}>
        <h1>Nothing to review.</h1>
        <p>Every card you missed has since been answered correctly.</p>
        <button className="btn btn-sun" onClick={onExit}>
          Back to decks
        </button>
      </div>
    )
  }

  const progress = (index + (checked ? 1 : 0)) / queue.length
  const { question, options, answer } = item.dealt
  const codeHeavy = options.some((o) => o.length > 42)

  return (
    <div className="page session" data-accent={accent}>
      <header className="session-top">
        <button className="icon-btn icon-btn-dim" onClick={onExit} aria-label="Leave session (Esc)">
          <Close />
        </button>
        <div
          className="progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={queue.length}
          aria-valuenow={index + (checked ? 1 : 0)}
        >
          <span className="progress-fill" style={{ '--p': progress } as CSSProperties} />
        </div>
        <span className="combo" data-on={combo >= 3 || undefined} key={combo} aria-live="polite">
          <Flame />
          {combo >= 3 ? `${combo} in a row` : ''}
        </span>
      </header>

      <main className="stage">
        <article className="qcard" key={index} data-retry={item.retry || undefined}>
          <div className="qcard-head">
            <span className="qcard-level">{item.retry ? 'Second chance' : levelName(subject, item.levelId)}</span>
            <span className="qcard-count">
              {index + 1} / {queue.length}
            </span>
          </div>
          <h1 className="qcard-prompt">
            <RichText text={question.prompt} />
          </h1>
          {question.code && <Code code={question.code} lang={subject.codeLanguage} />}
        </article>

        <div className="options" data-wide={codeHeavy || undefined} role="group" aria-label="Answers">
          {options.map((opt, i) => {
            const state = !checked ? undefined : i === answer ? 'correct' : i === selected ? 'wrong' : 'dim'
            return (
              <button
                key={`${index}-${i}`}
                className="option"
                data-state={state}
                disabled={checked}
                onClick={() => check(i)}
                style={{ '--i': i } as CSSProperties}
              >
                <kbd className="option-key">{LETTERS[i]}</kbd>
                <span className="option-text">
                  <RichText text={opt} />
                </span>
              </button>
            )
          })}
        </div>
      </main>

      <footer className="session-foot" data-state={!checked ? 'idle' : isCorrect ? 'correct' : 'wrong'}>
        {!checked ? (
          <div className="foot-inner">
            <span className="foot-hint">Pick an answer, or press 1–4.</span>
            <button className="btn btn-ghost" onClick={() => check(null)}>
              I don't know
            </button>
          </div>
        ) : (
          <div className="foot-inner feedback" role="status">
            <div className="feedback-body">
              <span className="feedback-icon">{isCorrect ? <Check /> : <Close />}</span>
              <div>
                <h2>{isCorrect ? praise : selected == null ? 'Here’s the answer.' : 'Not quite.'}</h2>
                {!isCorrect && (
                  <p className="feedback-answer">
                    <RichText text={options[answer]} />
                  </p>
                )}
                <p className="feedback-why">
                  <RichText text={question.explanation} />
                </p>
                {!isCorrect && !item.retry && <p className="feedback-note">This card will come back at the end of the round.</p>}
              </div>
            </div>
            <button className={`btn ${isCorrect ? 'btn-mint' : 'btn-flame'}`} onClick={next} autoFocus>
              Continue
            </button>
          </div>
        )}
      </footer>
    </div>
  )
}

function levelName(subject: ReturnType<typeof getSubject>, id: LevelId) {
  return subject.levels.find((l) => l.id === id)?.name ?? ''
}
