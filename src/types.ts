// Text fields support `inline code` with backticks.

export type LevelId = 'beginner' | 'intermediate' | 'advanced'

export type CodeLanguage = 'typescript' | 'shell'

export interface Question {
  /** Stable, unique within the subject. Progress is stored against it, so never rename. */
  id: string
  prompt: string
  /** Optional snippet shown under the prompt. */
  code?: string
  /** 3–4 options. Order is shuffled at runtime. */
  options: string[]
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
