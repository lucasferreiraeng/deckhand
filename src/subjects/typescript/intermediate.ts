import type { Question } from '../../types'

export const intermediate: Question[] = [
  {
    id: 'ts-i-01',
    prompt: 'What is `K`?',
    code: `interface User {
  id: number
  name: string
}
type K = keyof User`,
    options: [
      '`string | number`',
      '`"id" | "name"`',
      '`["id", "name"]`',
      '`string`',
    ],
    answer: 1,
    explanation:
      '`keyof` produces a union of an object type\'s property names as string literal types. It works on types, not values, and gives you a union, not an array.',
  },
  {
    id: 'ts-i-02',
    prompt: 'What is `Config`?',
    code: `const config = { port: 3000, host: 'localhost' }
type Config = typeof config`,
    options: [
      '`{ port: 3000; host: "localhost" }`',
      '`"object"`',
      '`{ port: number; host: string }`',
      '`object`',
    ],
    answer: 2,
    explanation:
      'In a type position, `typeof` gives you the type TypeScript inferred for a variable. Object properties can be changed later, so their literals are widened to `number` and `string`.',
  },
  {
    id: 'ts-i-03',
    prompt: 'What is `Tag`?',
    code: `interface Post {
  id: number
  tags: string[]
}
type Tag = Post['tags'][number]`,
    options: ['`string[]`', '`number`', '`"tags"`', '`string`'],
    answer: 3,
    explanation:
      '`Post[\'tags\']` looks up the property type, `string[]`. Indexing an array type with `[number]` then gives the element type, `string`.',
  },
  {
    id: 'ts-i-04',
    prompt: 'Fill in the blank so `PublicUser` has only `id` and `name`.',
    code: `interface User {
  id: number
  name: string
  password: string
}
type PublicUser = ____<User, 'password'>`,
    options: ['`Pick`', '`Omit`', '`Exclude`', '`Partial`'],
    answer: 1,
    explanation:
      '`Omit<T, K>` builds an object type with the keys in `K` removed. `Pick` does the opposite (keeps only `K`), and `Exclude` works on union members, not object properties.',
  },
  {
    id: 'ts-i-05',
    prompt: 'What happens on the last line?',
    code: `type Scores = Record<'alice' | 'bob', number>
const s: Scores = { alice: 10 }`,
    options: [
      'Error: property `bob` is missing',
      'Compiles; `bob` defaults to `0`',
      'Compiles; `Record` keys are optional',
      'Error: `Record` keys must be `string`',
    ],
    answer: 0,
    explanation:
      '`Record<K, V>` creates an object type with every key in `K` required, each holding a `V`. Wrap it in `Partial` if you want the keys to be optional.',
  },
  {
    id: 'ts-i-06',
    prompt: 'What is the type of `b.value`?',
    code: `interface Box<T = string> {
  value: T
}
const b: Box = { value: 'hi' }`,
    options: ['`unknown`', '`any`', '`T`', '`string`'],
    answer: 3,
    explanation:
      '`T = string` gives the type parameter a default. When you write `Box` without a type argument, TypeScript uses `Box<string>`.',
  },
  {
    id: 'ts-i-07',
    prompt: 'Which call causes a compile error?',
    code: `function getLength<T extends { length: number }>(x: T) {
  return x.length
}`,
    options: [
      '`getLength(\'abc\')`',
      '`getLength([1, 2])`',
      '`getLength(42)`',
      '`getLength({ length: 3 })`',
    ],
    answer: 2,
    explanation:
      '`extends` constrains `T` to types that have a numeric `length`. Strings, arrays and that object all do; a `number` doesn\'t, so `42` is rejected.',
  },
  {
    id: 'ts-i-08',
    prompt: 'What is the type of `city`?',
    code: `interface User {
  address?: { city: string }
}
declare const u: User
const city = u.address?.city ?? 'Unknown'`,
    options: [
      '`string`',
      '`string | undefined`',
      '`string | null`',
      '`"Unknown"`',
    ],
    answer: 0,
    explanation:
      '`u.address?.city` is `string | undefined`, because the chain stops at a missing `address`. `?? \'Unknown\'` replaces `undefined` with a string, so the result is just `string`.',
  },
  {
    id: 'ts-i-09',
    prompt: 'What is `string & number`?',
    options: ['`never`', '`string | number`', '`unknown`', '`any`'],
    answer: 0,
    explanation:
      'An intersection means "both at once". No value can be a string and a number at the same time, so the result is `never`. Intersections are useful for combining object types instead.',
  },
  {
    id: 'ts-i-10',
    prompt: 'What is `U`?',
    code: `function makeUser() {
  return { id: 1, name: 'Ana' }
}
type U = ReturnType<typeof makeUser>`,
    options: [
      '`{ id: 1; name: "Ana" }`',
      '`() => { id: number; name: string }`',
      '`{ id: number; name: string }`',
      '`any`',
    ],
    answer: 2,
    explanation:
      '`ReturnType` takes a function type and gives back what it returns. You need `typeof makeUser` because `makeUser` is a value, and the object\'s literals are widened just like in a variable.',
  },
  {
    id: 'ts-i-11',
    prompt: 'What is `A`?',
    code: `type A = Awaited<Promise<Promise<number>>>`,
    options: [
      '`Promise<number>`',
      '`Promise<Promise<number>>`',
      '`unknown`',
      '`number`',
    ],
    answer: 3,
    explanation:
      '`Awaited` models what `await` does, and it unwraps promises recursively. Just like awaiting a promise of a promise gives the inner value, the result is `number`.',
  },
  {
    id: 'ts-i-12',
    prompt: 'What is the type of `a` inside the `if`?',
    code: `type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(a: Fish | Bird) {
  if ('swim' in a) {
    a
  }
}`,
    options: ['`Fish | Bird`', '`Fish`', '`Bird`', '`{ swim: unknown }`'],
    answer: 1,
    explanation:
      'The `in` operator narrows a union to the members that have that property. Only `Fish` declares `swim`, so inside the `if`, `a` is `Fish`.',
  },
  {
    id: 'ts-i-13',
    prompt: 'Why does `x instanceof Cat` fail to compile here?',
    code: `interface Cat {
  meow(): void
}
declare const x: unknown
if (x instanceof Cat) {}`,
    options: [
      '`instanceof` only works on primitives',
      '`x` must be narrowed to `object` first',
      'Interfaces don\'t exist at runtime',
      '`instanceof` needs a type guard function',
    ],
    answer: 2,
    explanation:
      '`instanceof` is a runtime check against a constructor, but interfaces are erased during compilation. Use a class, an `in` check, or a custom type guard instead.',
  },
  {
    id: 'ts-i-14',
    prompt: 'What does the `x is string` return type do?',
    code: `function isString(x: unknown): x is string {
  return typeof x === 'string'
}`,
    options: [
      'Narrows the argument to `string` when it returns `true`',
      'Casts `x` to `string` inside the function',
      'Adds a runtime check that `x` is a string',
      'Nothing; it\'s the same as returning `boolean`',
    ],
    answer: 0,
    explanation:
      'A type predicate turns a boolean function into a type guard: in `if (isString(v))`, TypeScript narrows `v` to `string`. It adds no runtime code; the body\'s `typeof` check does the real work.',
  },
  {
    id: 'ts-i-15',
    prompt: 'Why is `s.size` allowed on the last line?',
    code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }

function area(s: Shape) {
  if (s.kind === 'circle') {
    return Math.PI * s.radius ** 2
  }
  return s.size ** 2
}`,
    options: [
      'Checking `kind` narrowed `s` to the square shape',
      'All union members share every property',
      'TypeScript doesn\'t check properties on unions',
      '`size` is `number | undefined` there',
    ],
    answer: 0,
    explanation:
      'This is a discriminated union: each member has a literal `kind`. After the circle branch returns, the only member left is the square, so `s.size` is known to exist.',
  },
  {
    id: 'ts-i-16',
    prompt: 'Which return type says this function never finishes normally?',
    code: `function fail(msg: string): ____ {
  throw new Error(msg)
}`,
    options: ['`void`', '`undefined`', '`never`', '`null`'],
    answer: 2,
    explanation:
      '`void` means the function returns, just without a useful value. `never` means it never returns at all, because it always throws or loops forever.',
  },
  {
    id: 'ts-i-17',
    prompt: 'What is `Dir`?',
    code: `const dirs = ['up', 'down'] as const
type Dir = (typeof dirs)[number]`,
    options: [
      '`string`',
      '`string[]`',
      '`readonly string[]`',
      '`"up" | "down"`',
    ],
    answer: 3,
    explanation:
      '`as const` makes the array a readonly tuple of literal types, `readonly ["up", "down"]`. Indexing it with `[number]` gives the union of its elements.',
  },
  {
    id: 'ts-i-18',
    prompt: 'What is the type of `v`?',
    code: `function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
const user = { id: 1, name: 'Ana' }
const v = getProp(user, 'name')`,
    options: ['`string | number`', '`"Ana"`', '`string`', '`unknown`'],
    answer: 2,
    explanation:
      '`K` is inferred as `"name"`, so the return type `T[K]` becomes the type of `user.name`, which is `string`. The `keyof T` constraint also makes a typo like `\'nme\'` a compile error.',
  },
  {
    id: 'ts-i-19',
    prompt: 'What happens when this interface is compiled?',
    code: `interface Dict {
  [key: string]: number
  name: string
}`,
    options: [
      'Compiles; `name` is a string, others are numbers',
      'Error: `name` must be a `number` to match the index signature',
      'Compiles; `name` becomes `string | number`',
      'Error: interfaces can\'t have index signatures',
    ],
    answer: 1,
    explanation:
      'A string index signature says every string key maps to a `number`, and `name` is a string key too. Every named property must fit the index signature, so change the signature to `[key: string]: string | number` if you need both.',
  },
  {
    id: 'ts-i-20',
    prompt: 'What happens on the last line?',
    code: `interface User { name: string }
interface User { age: number }

const u: User = { name: 'Ana' }`,
    options: [
      'Error: duplicate identifier `User`',
      'Compiles; the second `User` replaces the first',
      'Compiles; `age` is optional after merging',
      'Error: property `age` is missing',
    ],
    answer: 3,
    explanation:
      'Interfaces with the same name in the same scope merge into one, so `User` requires both `name` and `age`. Declaring a `type` alias twice would be a duplicate identifier error instead.',
  },
  {
    id: 'ts-i-21',
    prompt: 'What happens when this code is compiled?',
    code: `type Shape = { kind: 'circle' } | { kind: 'square' } | { kind: 'triangle' }

function label(s: Shape): string {
  switch (s.kind) {
    case 'circle': return 'Circle'
    case 'square': return 'Square'
    default: {
      const check: never = s
      return check
    }
  }
}`,
    options: [
      'Compiles; `default` catches `triangle`',
      'Error: `{ kind: "triangle" }` is not assignable to `never`',
      'Compiles, but throws for triangles at runtime',
      'Error: a `switch` can\'t use `never`',
    ],
    answer: 1,
    explanation:
      'In `default`, `s` holds whatever cases weren\'t handled. The triangle is still possible, and nothing but `never` itself can be assigned to `never`, so the compiler points to the missing case.',
  },
  {
    id: 'ts-i-22',
    prompt: 'What is the type of `palette.red`?',
    code: `type Colors = Record<string, string | number[]>

const palette = {
  red: '#f00',
  green: [0, 255, 0],
} satisfies Colors`,
    options: [
      '`string | number[]`',
      '`string`',
      '`"#f00"`',
      '`unknown`',
    ],
    answer: 1,
    explanation:
      '`satisfies` checks that the value matches `Colors` but keeps the type TypeScript inferred. With `const palette: Colors`, `palette.red` would be `string | number[]` and you couldn\'t call `.toUpperCase()` on it.',
  },
  {
    id: 'ts-i-23',
    prompt: 'What is the type of `r`?',
    code: `function parse(x: string): number
function parse(x: number): string
function parse(x: string | number) {
  return typeof x === 'string' ? Number(x) : String(x)
}
const r = parse('42')`,
    options: ['`string | number`', '`string`', '`any`', '`number`'],
    answer: 3,
    explanation:
      'Callers only see the overload signatures, not the implementation. The call matches the first overload, `(x: string): number`, so `r` is `number`.',
  },
  {
    id: 'ts-i-24',
    prompt: 'Which line causes a compile error?',
    code: `interface Point { x: number; y: number }

const a = { x: 1, y: 2, z: 3 }
const p1: Point = a
const p2: Point = { x: 1, y: 2, z: 3 }`,
    options: [
      '`const p1: Point = a`',
      '`const p2: Point = { x: 1, y: 2, z: 3 }`',
      'Both assignments',
      'Neither assignment',
    ],
    answer: 1,
    explanation:
      'Typing is structural, so an object with extra properties still fits `Point`. But a fresh object literal gets an excess property check, because an unknown key written directly there is usually a typo.',
  },
]
