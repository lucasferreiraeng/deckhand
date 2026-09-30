import type { Subject } from '../types'
import { git } from './git'
import { typescript } from './typescript'
import { ux } from './ux'

// To add a subject: create a folder next to `typescript/` with the same shape, then list it here.
export const subjects: Subject[] = [typescript, git, ux]

export function getSubject(id: string) {
  const subject = subjects.find((s) => s.id === id)
  if (!subject) throw new Error(`Unknown subject "${id}"`)
  return subject
}
