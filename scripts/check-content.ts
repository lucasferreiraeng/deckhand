// Sanity-checks every subject's cards. Run with `npm run check:content`.
import { subjects } from '../src/subjects/index.ts'

const ids = new Set<string>()
let problems = 0
const problem = (msg: string) => {
  problems++
  console.log(`  ✗ ${msg}`)
}
const unbalancedBackticks = (text: string) => text.split('`').length % 2 === 0

for (const s of subjects) {
  console.log(`\n${s.name}`)
  for (const l of s.levels) {
    for (const q of l.questions) {
      if (ids.has(q.id)) problem(`duplicate id ${q.id}`)
      ids.add(q.id)
      if (q.options.length < 3 || q.options.length > 4) problem(`${q.id}: has ${q.options.length} options, needs 3–4`)
      if (!(q.answer >= 0 && q.answer < q.options.length)) problem(`${q.id}: answer index ${q.answer} is out of range`)
      if (new Set(q.options).size !== q.options.length) problem(`${q.id}: two options are identical`)
      if (/all of the above|none of the above/i.test(q.options.join('|')))
        problem(`${q.id}: options are shuffled, so "all/none of the above" won't make sense`)
      for (const text of [q.prompt, q.explanation, ...q.options])
        if (unbalancedBackticks(text)) problem(`${q.id}: unbalanced backtick in "${text.slice(0, 40)}…"`)
    }
    console.log(`  ${l.name}: ${l.questions.length} questions`)
  }
  for (const t of s.tips) {
    if (ids.has(t.id)) problem(`duplicate id ${t.id}`)
    ids.add(t.id)
    for (const text of [t.title, t.body]) if (unbalancedBackticks(text)) problem(`${t.id}: unbalanced backtick`)
  }
  console.log(`  Tips: ${s.tips.length}`)
}

console.log(problems ? `\n${problems} problem(s) found.` : '\nAll good.')
process.exit(problems ? 1 : 0)
