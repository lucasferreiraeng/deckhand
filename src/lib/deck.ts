import type { CardRow } from '../progress'
import type { Option, Question } from '../types'
import { cardState, type CardState } from './stats'

export const SESSION_SIZE = 10

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const PRIORITY: Record<CardState, number> = { missed: 3, new: 2, learning: 1, mastered: 0 }

/** Missed cards first, then new, then learning, then mastered. Random within each group. */
export function pickQuestions(questions: Question[], cards: Map<string, CardRow>, size = SESSION_SIZE) {
  const ranked = shuffle(questions).sort(
    (a, b) => PRIORITY[cardState(cards.get(b.id))] - PRIORITY[cardState(cards.get(a.id))],
  )
  return shuffle(ranked.slice(0, size))
}

/** A question with its options in display order. */
export interface Dealt {
  question: Question
  options: Option[]
  answer: number
}

export function deal(question: Question): Dealt {
  const order = shuffle(question.options.map((_, i) => i))
  return {
    question,
    options: order.map((i) => question.options[i]),
    answer: order.indexOf(question.answer),
  }
}
