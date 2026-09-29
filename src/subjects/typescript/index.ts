import type { Subject } from '../../types'
import { advanced } from './advanced'
import { beginner } from './beginner'
import { intermediate } from './intermediate'
import { tips } from './tips'

export const typescript: Subject = {
  id: 'typescript',
  name: 'TypeScript',
  badge: 'TS',
  tagline: 'JavaScript with a type checker watching your back.',
  color: '#3178C6',
  levels: [
    {
      id: 'beginner',
      name: 'Beginner',
      blurb: 'Annotations, unions, interfaces and the basics of narrowing.',
      glyph: ': string',
      questions: beginner,
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      blurb: 'Generics, utility types, discriminated unions and type guards.',
      glyph: '<T>',
      questions: intermediate,
    },
    {
      id: 'advanced',
      name: 'Advanced',
      blurb: 'Conditional and mapped types, infer, variance and type-level tricks.',
      glyph: 'infer U',
      questions: advanced,
    },
  ],
  tips,
}
