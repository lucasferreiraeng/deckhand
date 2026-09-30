import { lazy, Suspense, useState } from 'react'
import { Home } from './components/Home'
import { Session } from './components/Session'
import { TipsDeck } from './components/TipsDeck'
import { useOffline } from './progress'
import type { LevelId } from './types'

const Gallery = import.meta.env.DEV ? lazy(() => import('./components/Gallery')) : null
const showGallery = Gallery != null && new URLSearchParams(location.search).has('gallery')

export type Route =
  | { name: 'home' }
  | { name: 'session'; subjectId: string; levelId: LevelId | 'review' }
  | { name: 'tips'; subjectId: string }

export default function App() {
  // `visit` bumps on every navigation so re-entering the same deck deals a fresh hand.
  const [{ route, visit }, setState] = useState<{ route: Route; visit: number }>({ route: { name: 'home' }, visit: 0 })
  const go = (route: Route) => {
    setState((s) => ({ route, visit: s.visit + 1 }))
    window.scrollTo(0, 0)
  }
  const home = () => go({ name: 'home' })
  const offline = useOffline()

  if (showGallery && Gallery) {
    return (
      <Suspense>
        <Gallery />
      </Suspense>
    )
  }

  return (
    <>
      {offline && (
        <p className="offline-banner" role="alert">
          Can't reach the progress database, so answers aren't being saved. Start the app with <code>npm run dev</code>.
        </p>
      )}
      {route.name === 'home' && <Home key={visit} go={go} />}
      {route.name === 'session' && (
        <Session key={visit} subjectId={route.subjectId} levelId={route.levelId} onExit={home} go={go} />
      )}
      {route.name === 'tips' && <TipsDeck key={visit} subjectId={route.subjectId} onExit={home} />}
    </>
  )
}
