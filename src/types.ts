// Text fields support `inline code` with backticks.
import type { ReactNode } from 'react'

export type LevelId = 'beginner' | 'intermediate' | 'advanced'

export type CodeLanguage = 'typescript' | 'shell'

/** A picture instead of code: a mock screen built from `components/mock`. */
export type Visual = ReactNode

/** Plain text, or a picture with a text label. The label is announced to screen readers and shown after answering. */
export type Option = string | { visual: Visual; label: string }

export interface Question {
  /** Stable, unique within the subject. Progress is stored against it, so never rename. */
  id: string
  prompt: string
  /** Optional snippet shown under the prompt. */
  code?: string
  /** Optional mock screen shown under the prompt. */
  visual?: Visual
  /** 3–4 options. Order is shuffled at runtime. */
  options: Option[]
  /** Index into `options` of the correct one. */
  answer: number
  /** Shown after answering, right or wrong. */
  explanation: string
}

export type TipKind = 'tip' | 'curiosity' | 'gotcha'

export interface Tip {
  id: string
  kind: TipKind
  title: string
  body: string
  code?: string
  visual?: Visual
}

export interface Level {
  id: LevelId
  name: string
  blurb: string
  /** A short code fragment printed big on the deck cover, e.g. "<T>". */
  glyph: string
  questions: Question[]
}

export interface Subject {
  id: string
  name: string
  /** 2–3 characters shown on the subject badge, e.g. "TS". */
  badge: string
  tagline: string
  /** Badge colour. */
  color: string
  /** How `code` snippets are highlighted. Defaults to TypeScript. */
  codeLanguage?: CodeLanguage
  levels: Level[]
  tips: Tip[]
}
