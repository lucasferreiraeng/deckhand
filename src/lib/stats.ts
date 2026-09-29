import { getAnswers, getCards, getTipsSeen, MASTERY_STREAK, useQuery, XP_PER_CORRECT, type CardRow } from '../progress'
import type { Question } from '../types'

export type CardState = 'new' | 'missed' | 'learning' | 'mastered'

export function cardState(row: CardRow | undefined): CardState {
  if (!row) return 'new'
  if (row.streak === 0) return 'missed'
  return row.streak >= MASTERY_STREAK ? 'mastered' : 'learning'
}

export function dayKey(ts: number) {
  const d = new Date(ts)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

/** Consecutive days with at least one answer, ending today (or yesterday, so the streak survives until you play today). */
function dayStreak(days: Set<string>) {
  const cursor = new Date()
  if (!days.has(dayKey(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1)
  let n = 0
  while (days.has(dayKey(cursor.getTime()))) {
    n++
    cursor.setDate(cursor.getDate() - 1)
  }
  return n
}

export interface Overview {
  xp: number
  streak: number
  answeredToday: number
  /** Answers per day for the last 14 days, oldest first. */
  activity: { date: Date; count: number }[]
}

export function useOverview(): Overview | undefined {
  return useQuery('overview', async () => {
    const rows = await getAnswers()
    const perDay = new Map<string, number>()
    let correct = 0
    for (const r of rows) {
      if (r.correct) correct++
      const k = dayKey(r.at)
      perDay.set(k, (perDay.get(k) ?? 0) + 1)
    }
    const activity = Array.from({ length: 14 }, (_, i) => {
      const date = new Date()
      date.setHours(0, 0, 0, 0)
      date.setDate(date.getDate() - (13 - i))
      return { date, count: perDay.get(dayKey(date.getTime())) ?? 0 }
    })
    return {
      xp: correct * XP_PER_CORRECT,
      streak: dayStreak(new Set(perDay.keys())),
      answeredToday: perDay.get(dayKey(Date.now())) ?? 0,
      activity,
    }
  })
}

export function useCards(subjectId: string) {
  return useQuery(`cards:${subjectId}`, async () => {
    const rows = await getCards(subjectId)
    return new Map(rows.map((r) => [r.questionId, r]))
  })
}

export function useTipsSeen(subjectId: string) {
  return useQuery(`tips:${subjectId}`, async () => new Set(await getTipsSeen(subjectId)))
}

export function countStates(questions: Question[], cards: Map<string, CardRow>) {
  const counts: Record<CardState, number> = { new: 0, missed: 0, learning: 0, mastered: 0 }
  for (const q of questions) counts[cardState(cards.get(q.id))]++
  return counts
}
