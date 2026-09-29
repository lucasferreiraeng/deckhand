import type { Tip } from '../../types'

export const tips: Tip[] = [
  {
    id: 'ts-tip-01',
    kind: 'tip',
    title: 'Check a value with `satisfies`',
    body: '`satisfies` checks that a value matches a type without widening it to that type. You get validation and still keep the precise inferred type.',
    code: `const routes = {
  home: '/',
  about: '/about',
} satisfies Record<string, string>

routes.home // still known to exist`,
  },
  {
    id: 'ts-tip-02',
    kind: 'curiosity',
    title: 'TypeScript went public in 2012',
    body: 'Microsoft first released TypeScript to the public in October 2012, as version 0.8. It has been open source since day one.',
  },
  {
    id: 'ts-tip-03',
    kind: 'gotcha',
    title: '`Object.keys` returns `string[]`',
    body: 'Because types are structural, an object can have more keys at runtime than its type lists. So `Object.keys` gives `string[]`, not `(keyof T)[]`.',
    code: `const user = { name: 'Ana', age: 30 }
const keys = Object.keys(user) // string[]`,
  },
  {
    id: 'ts-tip-04',
    kind: 'tip',
    title: 'Freeze literals with `as const`',
    body: '`as const` infers the narrowest type: literal values, `readonly` properties and readonly tuples. It is great for config objects and lists of options.',
    code: `const sizes = ['sm', 'md', 'lg'] as const
type Size = (typeof sizes)[number]
// 'sm' | 'md' | 'lg'`,
  },
  {
    id: 'ts-tip-05',
    kind: 'curiosity',
    title: 'Made by the creator of Turbo Pascal',
    body: 'Anders Hejlsberg, TypeScript’s lead architect, also wrote Turbo Pascal, was chief architect of Delphi, and led the design of C#.',
  },
  {
    id: 'ts-tip-06',
    kind: 'tip',
    title: 'Make `switch` statements exhaustive',
    body: 'Assign the value to `never` in the `default` branch. If someone adds a new union member and forgets a `case`, the compiler flags it.',
    code: `type Shape = { kind: 'circle' } | { kind: 'square' }

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return 1
    case 'square': return 2
    default: { const x: never = s; return x }
  }
}`,
  },
  {
    id: 'ts-tip-07',
    kind: 'gotcha',
    title: 'Array indexing trusts you blindly',
    body: 'By default `arr[i]` is typed as `T`, not `T | undefined`, even when the index is out of bounds. Turn on `noUncheckedIndexedAccess` to make those reads safe.',
    code: `const nums = [1, 2, 3]
const n = nums[10] // number, but really undefined
n.toFixed()        // compiles, crashes at runtime`,
  },
  {
    id: 'ts-tip-08',
    kind: 'curiosity',
    title: 'The type system is Turing complete',
    body: 'With conditional, recursive and mapped types you can, in principle, compute anything at the type level. To keep the compiler from looping forever, it caps recursion depth and reports "excessively deep" instantiations.',
  },
  {
    id: 'ts-tip-09',
    kind: 'tip',
    title: 'Prefer `unknown` to `any`',
    body: '`any` switches type checking off. `unknown` accepts any value too, but forces you to narrow it before use, which makes it the safe choice for untrusted input.',
    code: `function handle(data: unknown) {
  if (typeof data === 'string') {
    return data.trim() // narrowed to string
  }
}`,
  },
  {
    id: 'ts-tip-10',
    kind: 'tip',
    title: 'Use `@ts-expect-error`, not `@ts-ignore`',
    body: 'Both silence the error on the next line, but `@ts-expect-error` itself errors once there is nothing left to suppress. Stale suppressions can’t pile up unnoticed.',
  },
  {
    id: 'ts-tip-11',
    kind: 'gotcha',
    title: '`{}` does not mean "empty object"',
    body: 'The type `{}` accepts any value except `null` and `undefined`, including strings and numbers. For "any object" use `object`; for "no properties" use `Record<string, never>`.',
    code: `const a: {} = 42      // OK
const b: {} = 'hello' // OK
const c: {} = null    // error`,
  },
  {
    id: 'ts-tip-12',
    kind: 'curiosity',
    title: 'The compiler is being rewritten in Go',
    body: 'In 2025 Microsoft announced a native port of the compiler to Go, codenamed "Corsa", with roughly 10x faster builds. It is the basis of TypeScript 7.',
  },
  {
    id: 'ts-tip-13',
    kind: 'tip',
    title: 'Force complete maps with `Record`',
    body: 'Typing a lookup object as `Record<Union, Value>` makes the compiler demand an entry for every member. Add a new status and every map that forgot it lights up red.',
    code: `type Status = 'idle' | 'loading' | 'done'

const labels: Record<Status, string> = {
  idle: 'Waiting',
  loading: 'Loading…',
  done: 'Finished',
}`,
  },
  {
    id: 'ts-tip-14',
    kind: 'curiosity',
    title: '`enum` is not just a type',
    body: 'Most TypeScript syntax is simply erased, but `enum` generates real JavaScript objects, as do namespaces with values and parameter properties. The `erasableSyntaxOnly` flag (TS 5.8) forbids these.',
  },
  {
    id: 'ts-tip-15',
    kind: 'gotcha',
    title: '`as` is not a runtime cast',
    body: 'A type assertion only changes what the compiler believes; no conversion or check happens at runtime. If you are wrong, the bug shows up later, somewhere else.',
    code: `const input = '42' as unknown as number
input.toFixed(2) // TypeError at runtime`,
  },
  {
    id: 'ts-tip-16',
    kind: 'tip',
    title: 'Mark type-only imports with `import type`',
    body: '`import type` is always erased, so it never pulls a module in at runtime. With `verbatimModuleSyntax` on, TypeScript requires it for imports used only as types.',
  },
  {
    id: 'ts-tip-17',
    kind: 'curiosity',
    title: 'Node.js can run `.ts` files directly',
    body: 'Node.js added type stripping in version 22.6 behind a flag and enabled it by default in 23.6. It removes type annotations without type checking, so erasable syntax only.',
  },
  {
    id: 'ts-tip-18',
    kind: 'tip',
    title: 'Derive types from values',
    body: 'Instead of repeating a list of keys, derive it with `keyof typeof`. The type then stays in sync with the object automatically.',
    code: `const config = { host: 'localhost', port: 8080 }

type ConfigKey = keyof typeof config
// 'host' | 'port'`,
  },
  {
    id: 'ts-tip-19',
    kind: 'gotcha',
    title: '`JSON.parse` returns `any`',
    body: '`JSON.parse` (and `response.json()`) return `any`, which silently disables checking for everything that touches the result. Annotate it as `unknown` and validate before use.',
    code: `const data: unknown = JSON.parse(text)`,
  },
  {
    id: 'ts-tip-20',
    kind: 'curiosity',
    title: 'TypeScript doesn’t follow semver',
    body: 'Minor releases like 5.4 → 5.5 can include breaking changes, such as stricter checks. That is why pinning it with `~` rather than `^` is common advice.',
  },
  {
    id: 'ts-tip-21',
    kind: 'tip',
    title: 'Derive variants with utility types',
    body: '`Partial`, `Pick`, `Omit` and friends build new types from existing ones. Update the source type and every derived type follows.',
    code: `type User = { id: string; name: string; email: string }

type NewUser = Omit<User, 'id'>
type UserPatch = Partial<NewUser>`,
  },
  {
    id: 'ts-tip-22',
    kind: 'gotcha',
    title: '`filter(Boolean)` doesn’t narrow',
    body: '`Boolean` is not a type predicate, so `.filter(Boolean)` keeps `undefined` in the element type. Since TS 5.5, an arrow like `x => x !== undefined` is inferred as a predicate and does narrow.',
    code: `const xs = ['a', undefined]
xs.filter(Boolean)                // (string | undefined)[]
xs.filter(x => x !== undefined)   // string[]`,
  },
  {
    id: 'ts-tip-23',
    kind: 'curiosity',
    title: 'Types for untyped libraries',
    body: 'The community-run DefinitelyTyped repository publishes type definitions for plain JavaScript packages under the `@types/` scope, such as `@types/node`.',
  },
  {
    id: 'ts-tip-24',
    kind: 'tip',
    title: 'Peek at types with `// ^?`',
    body: 'In the TypeScript Playground, a `// ^?` comment under an identifier shows its inferred type inline. It is a handy way to experiment and to share examples.',
  },
]
