// Shapes shared by the browser and the local API server (server/).
import type { LevelId } from './types.ts'

/** One answer ever given. The source of truth for XP, streaks and activity. */
export interface AnswerRow {
  id: number
  subjectId: string
  levelId: LevelId
  questionId: string
  correct: boolean
  at: number
}

/** Rolling state of one question, used to decide what to show next. */
export interface CardRow {
  questionId: string
  subjectId: string
  levelId: LevelId
  seen: number
  correct: number
  /** Consecutive correct answers. 0 after a miss. */
  streak: number
  lastSeen: number
}

export interface SessionRow {
  id: number
  subjectId: string
  levelId: LevelId | 'review'
  startedAt: number
  finishedAt: number
  total: number
  correct: number
  bestCombo: number
}

export interface TipSeenRow {
  tipId: string
  subjectId: string
  at: number
}

export interface ImportPayload {
  answers: AnswerRow[]
  cards: CardRow[]
  sessions: SessionRow[]
  tipsSeen: TipSeenRow[]
}
