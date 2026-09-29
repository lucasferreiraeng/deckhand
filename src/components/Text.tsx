import { Fragment, type ReactNode } from 'react'
import type { CodeLanguage } from '../types'

/** Renders `backtick` spans as inline code. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') && part.length > 1 ? (
          <code key={i} className="inline-code">
            {part.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

const KEYWORDS = new Set(
  (
    'abstract any as asserts async await boolean break case catch class const continue declare default do else enum export ' +
    'extends false finally for from function get if implements import in infer instanceof interface is keyof let module ' +
    'namespace never new null number object of out private protected public readonly return satisfies set static string ' +
    'super switch symbol this throw true try type typeof undefined unique unknown using var void while yield bigint accessor'
  ).split(' '),
)

type Classify = (m: RegExpMatchArray) => string | undefined

const TS_TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|(\b\d[\d_]*(?:\.\d+)?n?\b)|([A-Za-z_$][\w$]*)|(=>|[{}()[\]<>;:,.?|&=!+\-*/%])/g

const tsClass: Classify = ([, comment, str, num, ident, punct]) => {
  if (comment) return 'tk-comment'
  if (str) return 'tk-string'
  if (num) return 'tk-number'
  if (ident) return KEYWORDS.has(ident) ? 'tk-keyword' : /^[A-Z]/.test(ident) ? 'tk-type' : undefined
  if (punct) return 'tk-punct'
}

// Shell: `# comments`, quoted strings, the `git` command and its subcommand, --flags, special refs, conflict markers.
const SHELL_TOKEN =
  /((?<=^|\s)#[^\n]*)|('[^'\n]*'|"(?:\\.|[^"\\\n])*")|(\bgit\b(?=\s|$))|((?<=\bgit\s+)[a-z][\w-]*)|((?<=^|\s)--?[A-Za-z][\w-]*)|(\b(?:ORIG_|FETCH_|MERGE_)?HEAD\b[~^@{}\d]*)|(^(?:<{7}|={7}|>{7}).*$)/gm

const shellClass: Classify = ([, comment, str, cmd, sub, flag, ref, marker]) => {
  if (comment) return 'tk-comment'
  if (str) return 'tk-string'
  if (cmd) return 'tk-keyword'
  if (sub) return 'tk-type'
  if (flag) return 'tk-punct'
  if (ref) return 'tk-number'
  if (marker) return 'tk-keyword'
}

const GRAMMARS: Record<CodeLanguage, [RegExp, Classify]> = {
  typescript: [TS_TOKEN, tsClass],
  shell: [SHELL_TOKEN, shellClass],
}

export function Code({ code, lang = 'typescript' }: { code: string; lang?: CodeLanguage }) {
  const [pattern, classify] = GRAMMARS[lang]
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  for (const m of code.matchAll(pattern)) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const cls = classify(m)
    out.push(cls ? <span key={i++} className={cls}>{m[0]}</span> : m[0])
    last = m.index + m[0].length
  }
  if (last < code.length) out.push(code.slice(last))
  return (
    <pre className="code-block" data-lang={lang}>
      <code>{out}</code>
    </pre>
  )
}
