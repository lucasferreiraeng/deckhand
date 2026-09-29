import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import type { AnswerRow, CardRow, ImportPayload, SessionRow, TipSeenRow } from '../src/progress-types.ts'

export function openDatabase(file: string) {
  mkdirSync(dirname(file), { recursive: true })
  const db = new DatabaseSync(file)
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS answers (
      id          INTEGER PRIMARY KEY,
      subject_id  TEXT    NOT NULL,
      level_id    TEXT    NOT NULL,
      question_id TEXT    NOT NULL,
      correct     INTEGER NOT NULL,
      at          INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS answers_at ON answers (at);

    CREATE TABLE IF NOT EXISTS cards (
      question_id TEXT PRIMARY KEY,
      subject_id  TEXT    NOT NULL,
      level_id    TEXT    NOT NULL,
      seen        INTEGER NOT NULL,
      correct     INTEGER NOT NULL,
      streak      INTEGER NOT NULL,
      last_seen   INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS cards_subject ON cards (subject_id);

    CREATE TABLE IF NOT EXISTS sessions (
      id          INTEGER PRIMARY KEY,
      subject_id  TEXT    NOT NULL,
      level_id    TEXT    NOT NULL,
      started_at  INTEGER NOT NULL,
      finished_at INTEGER NOT NULL,
      total       INTEGER NOT NULL,
      correct     INTEGER NOT NULL,
      best_combo  INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tips_seen (
      tip_id     TEXT PRIMARY KEY,
      subject_id TEXT    NOT NULL,
      at         INTEGER NOT NULL
    );
  `)

  const q = {
    insertAnswer: db.prepare(
      'INSERT INTO answers (subject_id, level_id, question_id, correct, at) VALUES (?, ?, ?, ?, ?)',
    ),
    upsertCard: db.prepare(`
      INSERT INTO cards (question_id, subject_id, level_id, seen, correct, streak, last_seen)
      VALUES (:questionId, :subjectId, :levelId, 1, :correct, :correct, :at)
      ON CONFLICT (question_id) DO UPDATE SET
        seen      = seen + 1,
        correct   = correct + :correct,
        streak    = CASE WHEN :correct = 1 THEN streak + 1 ELSE 0 END,
        last_seen = :at
    `),
    putCard: db.prepare(
      'INSERT OR REPLACE INTO cards (question_id, subject_id, level_id, seen, correct, streak, last_seen) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ),
    answers: db.prepare('SELECT at, correct FROM answers ORDER BY at'),
    cards: db.prepare(`
      SELECT question_id AS questionId, subject_id AS subjectId, level_id AS levelId,
             seen, correct, streak, last_seen AS lastSeen
      FROM cards WHERE subject_id = ?
    `),
    insertSession: db.prepare(`
      INSERT INTO sessions (subject_id, level_id, started_at, finished_at, total, correct, best_combo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `),
    tipsSeen: db.prepare('SELECT tip_id AS tipId FROM tips_seen WHERE subject_id = ?'),
    markTip: db.prepare('INSERT OR REPLACE INTO tips_seen (tip_id, subject_id, at) VALUES (?, ?, ?)'),
    answerCount: db.prepare('SELECT COUNT(*) AS n FROM answers'),
  }

  const transaction = <T>(fn: () => T): T => {
    db.exec('BEGIN')
    try {
      const result = fn()
      db.exec('COMMIT')
      return result
    } catch (err) {
      db.exec('ROLLBACK')
      throw err
    }
  }

  return {
    recordAnswer(a: Omit<AnswerRow, 'id'>) {
      const correct = a.correct ? 1 : 0
      transaction(() => {
        q.insertAnswer.run(a.subjectId, a.levelId, a.questionId, correct, a.at)
        q.upsertCard.run({ questionId: a.questionId, subjectId: a.subjectId, levelId: a.levelId, correct, at: a.at })
      })
    },

    answers() {
      return (q.answers.all() as { at: number; correct: number }[]).map((r) => ({ at: r.at, correct: r.correct === 1 }))
    },

    cards(subjectId: string) {
      return q.cards.all(subjectId) as unknown as CardRow[]
    },

    addSession(s: Omit<SessionRow, 'id'>) {
      q.insertSession.run(s.subjectId, s.levelId, s.startedAt, s.finishedAt, s.total, s.correct, s.bestCombo)
    },

    tipsSeen(subjectId: string) {
      return (q.tipsSeen.all(subjectId) as { tipId: string }[]).map((r) => r.tipId)
    },

    markTipSeen(t: TipSeenRow) {
      q.markTip.run(t.tipId, t.subjectId, t.at)
    },

    /** Loads progress saved by the old in-browser version. Only runs into an empty database. */
    importAll(data: ImportPayload) {
      if ((q.answerCount.get() as { n: number }).n > 0) return false
      transaction(() => {
        for (const a of data.answers) q.insertAnswer.run(a.subjectId, a.levelId, a.questionId, a.correct ? 1 : 0, a.at)
        for (const c of data.cards)
          q.putCard.run(c.questionId, c.subjectId, c.levelId, c.seen, c.correct, c.streak, c.lastSeen)
        for (const s of data.sessions)
          q.insertSession.run(s.subjectId, s.levelId, s.startedAt, s.finishedAt, s.total, s.correct, s.bestCombo)
        for (const t of data.tipsSeen) q.markTip.run(t.tipId, t.subjectId, t.at)
      })
      return true
    },
  }
}

export type ProgressDb = ReturnType<typeof openDatabase>
