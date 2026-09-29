import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'
import type { Connect, Plugin } from 'vite'
import { openDatabase, type ProgressDb } from './db.ts'

/** Serves `/api/*` from a SQLite file, inside both `vite` (dev) and `vite preview`. */
export function progressApi(file = process.env.DECKHAND_DB ?? resolve('data/deckhand.db')): Plugin {
  let db: ProgressDb | undefined
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    if (!req.url?.startsWith('/api/')) return next()
    db ??= openDatabase(file)
    handle(db, req, res).catch((err: unknown) => {
      console.error('[progress api]', err)
      send(res, 500, { error: err instanceof Error ? err.message : String(err) })
    })
  }
  return {
    name: 'deckhand-progress-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

async function handle(db: ProgressDb, req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url!, 'http://local')
  const route = `${req.method} ${url.pathname}`
  const subject = url.searchParams.get('subject') ?? ''

  switch (route) {
    case 'GET /api/answers':
      return send(res, 200, db.answers())
    case 'POST /api/answers':
      db.recordAnswer({ ...(await body(req)), at: Date.now() })
      return send(res, 204)
    case 'GET /api/cards':
      return send(res, 200, db.cards(subject))
    case 'POST /api/sessions':
      db.addSession(await body(req))
      return send(res, 204)
    case 'GET /api/tips-seen':
      return send(res, 200, db.tipsSeen(subject))
    case 'POST /api/tips-seen':
      db.markTipSeen({ ...(await body(req)), at: Date.now() })
      return send(res, 204)
    case 'POST /api/import':
      return send(res, 200, { imported: db.importAll(await body(req)) })
    default:
      return send(res, 404, { error: `No route for ${route}` })
  }
}

async function body(req: IncomingMessage) {
  let raw = ''
  for await (const chunk of req) raw += chunk
  return JSON.parse(raw)
}

function send(res: ServerResponse, status: number, data?: unknown) {
  res.statusCode = status
  if (data === undefined) return void res.end()
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}
