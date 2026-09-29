import type { Question } from '../../types'

export const advanced: Question[] = [
  {
    id: 'ts-a-01',
    prompt: 'What does `(string | never) & unknown` resolve to?',
    options: ['`never`', '`string`', '`unknown`', '`string & unknown`'],
    answer: 1,
    explanation:
      '`never` is the empty set, so it vanishes from any union. `unknown` is the set of all values, so intersecting with it changes nothing, leaving just `string`.',
  },
  {
    id: 'ts-a-02',
    prompt: 'How many string literals does the `Class` union contain?',
    code: `type Size = 'sm' | 'lg'
type Color = 'red' | 'blue'
type Class = \`\${Size}-\${Color}\``,
    options: ['2', '1', '4', 'None, it widens to `string`'],
    answer: 2,
    explanation:
      "Unions inside a template literal type expand as a cross product: 2 sizes × 2 colors gives 4 literals, from `'sm-red'` to `'lg-blue'`.",
  },
  {
    id: 'ts-a-03',
    prompt: 'What are `A` and `B`?',
    code: `type ElementOf<T> = T extends (infer U)[] ? U : never

type A = ElementOf<string[]>
type B = ElementOf<number>`,
    options: [
      '`string[]` and `number`',
      '`string` and `number`',
      '`unknown` and `never`',
      '`string` and `never`',
    ],
    answer: 3,
    explanation:
      '`infer U` captures the element type when `T` matches the array pattern. `number` is not an array, so it takes the false branch and becomes `never`.',
  },
  {
    id: 'ts-a-04',
    prompt: 'Which statement about `abstract` classes is true?',
    options: [
      "They can't be created with `new`, but work as types",
      "They can't contain implemented methods",
      'They are erased entirely from the JS output',
      "They can't declare a constructor",
    ],
    answer: 0,
    explanation:
      '`abstract` only blocks `new Shape()` at compile time. The class still exists in the emitted JavaScript and can have real methods, fields and a constructor; concrete subclasses must implement every `abstract` member.',
  },
  {
    id: 'ts-a-05',
    prompt: 'What does `L` resolve to?',
    code: `type Last<T extends unknown[]> =
  T extends [...unknown[], infer X] ? X : never

type L = Last<[1, 'two', true]>`,
    options: ['`1`', '`true`', '`1 | \'two\' | true`', '`never`'],
    answer: 1,
    explanation:
      '`infer` works inside tuple patterns too. The rest element `...unknown[]` soaks up everything before it, so `X` binds to the final element, `true`.',
  },
  {
    id: 'ts-a-06',
    prompt: 'Which mapped type removes both `readonly` and `?` from every property of `T`?',
    options: [
      '`{ readonly [K in keyof T]?: T[K] }`',
      '`{ [K in keyof T]: T[K] }`',
      '`{ -readonly [K in keyof T]-?: T[K] }`',
      '`{ +readonly [K in keyof T]+?: T[K] }`',
    ],
    answer: 2,
    explanation:
      'A `-` prefix strips a modifier, while `+` (or no sign) adds it. A plain `[K in keyof T]` mapping preserves the original modifiers, so it changes nothing.',
  },
  {
    id: 'ts-a-07',
    prompt: 'What does `R` resolve to?',
    code: `type IsString<T> = T extends string ? 'yes' : 'no'

type R = IsString<string | number>`,
    options: ["`'no'`", "`'yes'`", '`boolean`', "`'yes' | 'no'`"],
    answer: 3,
    explanation:
      'When the checked type is a naked type parameter, the conditional distributes over unions: it runs once for `string` and once for `number`, then unions the results.',
  },
  {
    id: 'ts-a-08',
    prompt: 'What does `R` resolve to now?',
    code: `type IsString<T> = [T] extends [string] ? 'yes' : 'no'

type R = IsString<string | number>`,
    options: ["`'no'`", "`'yes' | 'no'`", "`'yes'`", '`never`'],
    answer: 0,
    explanation:
      'Wrapping both sides in a one-element tuple means `T` is no longer naked, so nothing distributes. The whole union is checked at once, and `string | number` is not assignable to `string`.',
  },
  {
    id: 'ts-a-09',
    prompt: 'What are `K1` and `K2`?',
    code: `type A = { id: number; name: string }
type B = { id: number; age: number }

type K1 = keyof (A | B)
type K2 = keyof (A & B)`,
    options: [
      "`'id'` and `'id' | 'name' | 'age'`",
      "`'id' | 'name' | 'age'` and `'id'`",
      "`'id' | 'name' | 'age'` for both",
      "`'id'` for both",
    ],
    answer: 0,
    explanation:
      'A value of type `A | B` is only guaranteed to have the keys both share, so `keyof` a union gives the common keys. A value of `A & B` has everything, so its `keyof` is all keys.',
  },
  {
    id: 'ts-a-10',
    prompt: 'What does `G` resolve to?',
    code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<K & string>}\`]: () => T[K]
}

type G = Getters<{ name: string }>`,
    options: [
      '`{ name: () => string }`',
      '`{ getname: () => string }`',
      '`{ getName: string }`',
      '`{ getName: () => string }`',
    ],
    answer: 3,
    explanation:
      'The `as` clause remaps each key to a new name. `Capitalize` uppercases the first letter, and `K & string` drops `number` and `symbol` keys, which a template literal cannot hold.',
  },
  {
    id: 'ts-a-11',
    prompt: 'Which lines error?',
    code: `type Point = { x: number; y: number }

const a: Point = { x: 1, y: 2, z: 3 }   // A
const tmp = { x: 1, y: 2, z: 3 }
const b: Point = tmp                    // B
const c = { x: 1, y: 2, z: 3 } as Point // C`,
    options: ['A and B', 'Only A', 'Only B', 'A, B and C'],
    answer: 1,
    explanation:
      'Excess property checks only apply to fresh object literals assigned straight to a typed target. Via a variable (B) or an assertion (C), the extra `z` is structurally fine, so no error.',
  },
  {
    id: 'ts-a-12',
    prompt: 'What is the type of `input` on the `return` line?',
    code: `function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== 'string') throw new Error('Not a string')
}

function shout(input: unknown) {
  assertIsString(input)
  return input.toUpperCase()
}`,
    options: ['`unknown`', '`string | undefined`', '`string`', '`never`'],
    answer: 2,
    explanation:
      'An `asserts x is T` signature says the function only returns normally if the condition holds. After the call, `input` is narrowed to `string` for the rest of the scope.',
  },
  {
    id: 'ts-a-13',
    prompt: 'Does the last line compile?',
    code: `class Builder {
  set(key: string) { console.log(key); return this }
}
class HtmlBuilder extends Builder {
  tag(name: string) { console.log(name); return this }
}

new HtmlBuilder().set('id').tag('div')`,
    options: [
      'No: `set` returns `Builder`, which has no `tag`',
      'Only if `set` is annotated `: HtmlBuilder`',
      'Only with an `as HtmlBuilder` assertion',
      'Yes: `set` returns the polymorphic `this` type',
    ],
    answer: 3,
    explanation:
      'Returning `this` from a method gives it the polymorphic `this` type, which refers to whatever subclass the call is made on. That is what makes fluent chains work across inheritance.',
  },
  {
    id: 'ts-a-14',
    prompt: 'Which assignment errors?',
    code: `type Json =
  | string | number | boolean | null
  | Json[]
  | { [key: string]: Json }

const a: Json = { tags: ['x', 1, null] }
const b: Json = [[[true]]]
const c: Json = { when: undefined }`,
    options: [
      '`a`',
      '`b`',
      '`c`',
      'None, recursive aliases resolve to `any`',
    ],
    answer: 2,
    explanation:
      'A type alias can refer to itself inside arrays, objects and unions, so arbitrarily nested data checks fine. `undefined` is not a member of the union, so `c` fails under `strict`.',
  },
  {
    id: 'ts-a-15',
    prompt: 'When is `closed` logged?',
    code: `function open() {
  return { [Symbol.dispose]() { console.log('closed') } }
}

{
  using file = open()
  console.log('working')
}`,
    options: [
      'Immediately after `open()` returns',
      'When `file` is garbage collected',
      'Only if you call `file[Symbol.dispose]()`',
      'When the block exits, even via an exception',
    ],
    answer: 3,
    explanation:
      '`using` calls the value’s `[Symbol.dispose]()` method automatically when its scope ends, whether it exits normally or by throwing. `await using` does the same with `Symbol.asyncDispose`.',
  },
  {
    id: 'ts-a-16',
    prompt: 'In a class body, what does `accessor count = 0` do?',
    options: [
      'Creates a `get`/`set` pair over private storage',
      'Makes `count` read-only outside the class',
      'Initializes `count` lazily on first read',
      'Makes `count` visible only to subclasses',
    ],
    answer: 0,
    explanation:
      'An auto-accessor turns the field into a getter/setter pair backed by a private slot. It exists mainly so standard decorators can intercept reads and writes of a field.',
  },
  {
    id: 'ts-a-17',
    prompt: 'After `plugin.ts` is loaded, what is the shape of `User`?',
    code: `// user.ts
export interface User { name: string }

// plugin.ts
import './user'
declare module './user' {
  interface User { age: number }
}`,
    options: [
      '`{ age: number }`, the augmentation replaces it',
      '`{ name: string; age: number }`',
      'An error: `User` is declared twice',
      '`{ name: string }`, augmentations need a `.d.ts`',
    ],
    answer: 1,
    explanation:
      'Inside a module file, `declare module` augments an existing module, and same-named interfaces merge their members. This is how libraries let plugins add fields to their types.',
  },
  {
    id: 'ts-a-18',
    prompt: 'What is the type of `r`?',
    code: `function parse(x: string | number): string
function parse(x: string): number
function parse(x: string | number): string | number {
  return x
}

const r = parse('42')`,
    options: [
      '`number`',
      '`string | number`',
      '`string`',
      'An error: the overloads are ambiguous',
    ],
    answer: 2,
    explanation:
      'Overloads are tried top to bottom and the first match wins, so the broad signature shadows the specific one. Always order overloads from most specific to least specific.',
  },
  {
    id: 'ts-a-19',
    prompt: 'Which call errors?',
    code: `declare const brand: unique symbol
type UserId = string & { [brand]: 'UserId' }

const toUserId = (s: string) => s as UserId
declare function load(id: UserId): void

load(toUserId('u1')) // A
load('u1')           // B`,
    options: ['Only A', 'Both', 'Only B', 'Neither, brands are erased'],
    answer: 2,
    explanation:
      'A plain `string` lacks the `[brand]` property, so it is not a `UserId`. Because `brand` is a `unique symbol` that exists only at the type level, the cast in `toUserId` is the only way in.',
  },
  {
    id: 'ts-a-20',
    prompt: 'What is the type of `r`?',
    code: `function routes<const T extends readonly string[]>(paths: T) {
  return paths
}

const r = routes(['/home', '/about'])`,
    options: [
      "`readonly ['/home', '/about']`",
      '`string[]`',
      "`('/home' | '/about')[]`",
      '`readonly string[]`',
    ],
    answer: 0,
    explanation:
      'A `const` type parameter infers as if the caller had written `as const`: literal types and a readonly tuple. The `readonly` constraint lets that tuple satisfy it.',
  },
  {
    id: 'ts-a-21',
    prompt: 'What happens with this call?',
    code: `function pick<T extends string>(options: T[], fallback: NoInfer<T>): T {
  return options[0] ?? fallback
}

pick(['a', 'b'], 'c')`,
    options: [
      "Compiles, and `T` is `'a' | 'b' | 'c'`",
      "Error: `'c'` isn't assignable to `'a' | 'b'`",
      'Compiles, and `T` is `string`',
    ],
    answer: 1,
    explanation:
      '`NoInfer` stops `fallback` from being a source for inferring `T`, so `T` comes from `options` alone. Without it, `T` would widen to `\'a\' | \'b\' | \'c\'` and the typo would slip through.',
  },
  {
    id: 'ts-a-22',
    prompt: "With `type IsString<T> = T extends string ? 'yes' : 'no'`, what is `IsString<never>`?",
    options: ["`'yes'`", "`'no'`", '`never`', "`'yes' | 'no'`"],
    answer: 2,
    explanation:
      '`never` is the empty union, and a distributive conditional maps over each member. With zero members there is nothing to map, so the result is `never`. `[T] extends [string]` avoids this.',
  },
  {
    id: 'ts-a-23',
    prompt: 'With `strictFunctionTypes` on, which line errors?',
    code: `interface A { handle(x: string | number): void }
interface B { handle: (x: string | number) => void }

const fn = (x: string) => x.toUpperCase()

const a: A = { handle: fn } // 1
const b: B = { handle: fn } // 2`,
    options: ['Only line 1', 'Both lines', 'Neither line', 'Only line 2'],
    answer: 3,
    explanation:
      '`strictFunctionTypes` checks parameters contravariantly only for function-typed properties. Members written with method syntax stay bivariant, so line 1 slips through even though `a.handle(42)` would crash.',
  },
  {
    id: 'ts-a-24',
    prompt: 'What does `out` declare in `interface Producer<out T> { get(): T }`?',
    options: [
      '`T` is covariant, used only in output positions',
      '`T` is contravariant, used only as input',
      '`T` is invariant',
      '`T` is inferred only from return values',
    ],
    answer: 0,
    explanation:
      '`out` marks `T` as covariant, `in` as contravariant, and `in out` as invariant. TypeScript reports an error if the annotation contradicts how `T` is used, and can use it to skip costly structural checks.',
  },
]
