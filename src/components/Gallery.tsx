// Dev only: every card that has a picture, laid out for review. Open /?gallery or /?gallery=ux.
import { subjects } from '../subjects'
import { Specimen } from './Specimen'
import { RichText } from './Text'

export default function Gallery() {
  const only = new URLSearchParams(location.search).get('gallery')
  const shown = subjects.filter((s) => !only || s.id === only)

  return (
    <div className="page gallery">
      {shown.map((s) => (
        <section key={s.id}>
          <h1>{s.name}</h1>
          {s.levels.flatMap((l) =>
            l.questions.map((q) => (
              <article key={q.id} className="gallery-card" id={q.id}>
                <p className="gallery-id">
                  {q.id} · {l.name}
                </p>
                <h2>
                  <RichText text={q.prompt} />
                </h2>
                {q.visual != null && <Specimen>{q.visual}</Specimen>}
                <ol className="gallery-options" data-pictures={q.options.some((o) => typeof o !== 'string') || undefined}>
                  {q.options.map((o, i) => (
                    <li key={i} data-answer={i === q.answer || undefined}>
                      {typeof o === 'string' ? (
                        <RichText text={o} />
                      ) : (
                        <>
                          <Specimen small>{o.visual}</Specimen>
                          <RichText text={o.label} />
                        </>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="gallery-why">
                  <RichText text={q.explanation} />
                </p>
              </article>
            )),
          )}
          {s.tips.map((t) => (
            <article key={t.id} className="gallery-card" id={t.id}>
              <p className="gallery-id">
                {t.id} · {t.kind}
              </p>
              <h2>
                <RichText text={t.title} />
              </h2>
              <p className="gallery-why">
                <RichText text={t.body} />
              </p>
              {t.visual != null && <Specimen>{t.visual}</Specimen>}
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}
