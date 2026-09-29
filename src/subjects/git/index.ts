import type { Subject } from '../../types'
import { advanced } from './advanced'
import { beginner } from './beginner'
import { intermediate } from './intermediate'
import { tips } from './tips'

export const git: Subject = {
  id: 'git',
  name: 'Git',
  badge: 'Git',
  tagline: 'Version control: snapshots, branches and time travel for your code.',
  color: '#F05032',
  codeLanguage: 'shell',
  levels: [
    {
      id: 'beginner',
      name: 'Beginner',
      blurb: 'Commits, the staging area, status, log and your first branches.',
      glyph: 'git add',
      questions: beginner,
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      blurb: 'Merging, rebasing, remotes, stash and undoing mistakes safely.',
      glyph: 'rebase',
      questions: intermediate,
    },
    {
      id: 'advanced',
      name: 'Advanced',
      blurb: 'Reflog, interactive rebase, bisect, the object model and recovery.',
      glyph: 'reflog',
      questions: advanced,
    },
  ],
  tips,
}
