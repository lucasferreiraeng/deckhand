// Progress lives in a SQLite file on disk (data/deckhand.db), served by the local API in server/.
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { CardRow, ImportPayload, SessionRow } from './progress-types'
import type { LevelId } from './types'

export type { CardRow } from './progress-types'

/** A card counts as mastered after this many correct answers in a row. */
export const MASTERY_STREAK = 2
export const XP_PER_CORRECT = 10

// Every write bumps `version`, and every `useQuery` refetches, so the UI never shows stale progress.
let version = 0
let offline = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

function changed() {
  version++
  emit()
}

function setOffline(value: boolean) {
  if (offline === value) return
  offline = value
  emit()
}

async function request<T = void>(path: string, init?: { method: 'POST'; body?: unknown }): Promise<T> {
  let res: Response
  try {
    res = await fetch(`/api/${path}`, {
      method: init?.method ?? 'GET',
      headers: init?.body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    })
  } catch (err) {
    setOffline(true)
    throw err
  }
  if (!res.ok) {
    setOffline(true)
    throw new Error(`/api/${path} answered ${res.status}`)
  }
  setOffline(false)
  return (res.status === 204 ? undefined : await res.json()) as T
}

const post = (path: string, body?: unknown) => request(path, { method: 'POST', body })

/** Fetches `load()` and refetches after every write. `key` identifies the query's inputs. */
export function useQuery<T>(key: string, load: () => Promise<T>): T | undefined {
  const v = useSyncExternalStore(subscribe, () => version)
  const [data, setData] = useState<T>()
  const loadRef = useRef(load)
  useLayoutEffect(() => {
    loadRef.current = load
  })
  useEffect(() => {
    let alive = true
    loadRef.current().then(
      (d) => alive && setData(d),
      () => {},
    )
    return () => {
      alive = false
    }
  }, [key, v])
  return data
}

/** True when the local API can't be reached, e.g. the page was opened without `npm run dev`. */
export function useOffline() {
  return useSyncExternalStore(subscribe, () => offline)
}

export const getAnswers = () => request<{ at: number; correct: boolean }[]>('answers')
export const getCards = (subjectId: string) => request<CardRow[]>(`cards?subject=${encodeURIComponent(subjectId)}`)
export const getTipsSeen = (subjectId: string) => request<string[]>(`tips-seen?subject=${encodeURIComponent(subjectId)}`)

export async function recordAnswer(subjectId: string, levelId: LevelId, questionId: string, correct: boolean) {
  await post('answers', { subjectId, levelId, questionId, correct })
  changed()
}

export async function saveSession(session: Omit<SessionRow, 'id'>) {
  await post('sessions', session)
  changed()
}

export async function markTipSeen(subjectId: string, tipId: string) {
  await post('tips-seen', { subjectId, tipId })
  changed()
}

/**
 * Earlier versions kept progress in the browser (IndexedDB "deckhand").
 * If that database exists, copy it into the SQLite file once, then delete it.
 */
export async function migrateBrowserProgress() {
  try {
    const existing = await indexedDB.databases?.()
    if (!existing?.some((d) => d.name === 'deckhand')) return
    const idb = await new Promise<IDBDatabase>((ok, fail) => {
      const req = indexedDB.open('deckhand')
      req.onsuccess = () => ok(req.result)
      req.onerror = () => fail(req.error)
    })
    const all = <T>(store: string) =>
      new Promise<T[]>((ok, fail) => {
        if (!idb.objectStoreNames.contains(store)) return ok([])
        const req = idb.transaction(store).objectStore(store).getAll()
        req.onsuccess = () => ok(req.result as T[])
        req.onerror = () => fail(req.error)
      })
    const payload: ImportPayload = {
      answers: await all('answers'),
      cards: await all('cards'),
      sessions: await all('sessions'),
      tipsSeen: await all('tipsSeen'),
    }
    idb.close()
    const { imported } = await request<{ imported: boolean }>('import', { method: 'POST', body: payload })
    // Only drop the browser copy once the file holds it. If the file already had progress, keep both untouched.
    if (imported) {
      indexedDB.deleteDatabase('deckhand')
      changed()
    }
  } catch (err) {
    console.warn('Could not move browser progress to the local database:', err)
  }
}
