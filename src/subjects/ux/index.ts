import type { Subject } from '../../types'
import { advanced } from './advanced'
import { beginner } from './beginner'
import { intermediate } from './intermediate'
import { tips } from './tips'

export const ux: Subject = {
  id: 'ux',
  name: 'UX',
  badge: 'UX',
  tagline: 'Designing screens people understand at a glance: hierarchy, feedback, forms and accessibility.',
  color: '#A259FF',
  levels: [
    {
      id: 'beginner',
      name: 'Beginner',
      blurb: 'Hierarchy, buttons, labels, feedback and the basic rules of a readable screen.',
      glyph: 'Aa',
      questions: beginner,
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      blurb: 'Forms, navigation, errors, empty states and the classic laws of UX.',
      glyph: '44px',
      questions: intermediate,
    },
    {
      id: 'advanced',
      name: 'Advanced',
      blurb: 'Accessibility, research methods, dark patterns and designing for edge cases.',
      glyph: '4.5:1',
      questions: advanced,
    },
  ],
  tips,
}
