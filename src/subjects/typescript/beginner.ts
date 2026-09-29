import type { Question } from '../../types'

export const beginner: Question[] = [
  {
    id: 'ts-b-01',
    prompt: 'What happens to your type annotations when `tsc` compiles TypeScript to JavaScript?',
    options: [
      'They become runtime type checks',
      'They are removed from the output',
      'They are kept as comments',
      'They turn into `typeof` guards',
    ],
    answer: 1,
    explanation:
      'Types only exist at compile time. `tsc` checks them, then erases them, so the emitted JavaScript has no type information and no runtime checks.',
  },
  {
    id: 'ts-b-02',
    prompt: 'What type does TypeScript infer for `x`?',
    code: `let x = 42`,
    options: ['`42`', '`any`', '`number`', '`int`'],
    answer: 2,
    explanation:
      'A `let` can be reassigned later, so TypeScript widens the literal `42` to the general `number` type. You don\'t need an annotation when the initial value makes the type obvious.',
  },
  {
    id: 'ts-b-03',
    prompt: 'What type does TypeScript infer for `greeting`?',
    code: `const greeting = 'hi'`,
    options: ['`string`', '`"hi"`', '`String`', '`any`'],
    answer: 1,
    explanation:
      'A `const` can never be reassigned, so TypeScript keeps the exact literal type `"hi"` instead of widening it to `string`.',
  },
  {
    id: 'ts-b-04',
    prompt: 'Which of these is NOT a built-in TypeScript type?',
    options: ['`bigint`', '`symbol`', '`undefined`', '`int`'],
    answer: 3,
    explanation:
      'TypeScript has a single `number` type for all numeric values, just like JavaScript. There is no separate `int` or `float` type.',
  },
  {
    id: 'ts-b-05',
    prompt: 'What type does TypeScript infer for `items`?',
    code: `let items = [1, 'a']`,
    options: [
      '`(string | number)[]`',
      '`[number, string]`',
      '`any[]`',
      '`number[] | string[]`',
    ],
    answer: 0,
    explanation:
      'For an array literal with mixed values, TypeScript infers an array whose elements can be any of the types it saw. It won\'t infer a tuple unless you ask for one.',
  },
  {
    id: 'ts-b-06',
    prompt: 'What happens when this code is compiled?',
    code: `let nums: number[] = [1, 2]
nums.push('3')`,
    options: [
      'Compiles; `nums` becomes `(number | string)[]`',
      'Compiles; `\'3\'` is converted to `3`',
      'Error: `string` is not assignable to `number`',
      'Error only when the code runs',
    ],
    answer: 2,
    explanation:
      '`nums` is declared as `number[]`, so `push` only accepts numbers. A declared type never changes on its own, and TypeScript never converts values for you.',
  },
  {
    id: 'ts-b-07',
    prompt: 'What is the type of `pair[1]`?',
    code: `let pair: [string, number] = ['a', 1]`,
    options: ['`string | number`', '`number`', '`any`', '`[number]`'],
    answer: 1,
    explanation:
      'A tuple knows the type at each position. Index `0` is a `string` and index `1` is a `number`, so reading `pair[1]` gives exactly `number`.',
  },
  {
    id: 'ts-b-08',
    prompt: 'Which value can NOT be assigned to `id`?',
    code: `let id: string | number`,
    options: ['`42`', '`\'abc\'`', '`-1`', '`true`'],
    answer: 3,
    explanation:
      'A union type `string | number` accepts a value of any member type. A `boolean` like `true` isn\'t a member, so it\'s rejected.',
  },
  {
    id: 'ts-b-09',
    prompt: 'What happens on the last line?',
    code: `type Dir = 'up' | 'down'
let d: Dir = 'left'`,
    options: [
      'Error: `"left"` is not assignable to `Dir`',
      'Compiles; `Dir` is just a `string`',
      'Compiles; `\'left\'` is added to `Dir`',
      'Error only when the code runs',
    ],
    answer: 0,
    explanation:
      'A union of literal types allows only those exact values. `Dir` can be `\'up\'` or `\'down\'` and nothing else, so `\'left\'` is rejected. This is how TypeScript catches misspelled string values.',
  },
  {
    id: 'ts-b-10',
    prompt: 'Does this code compile?',
    code: `const list = [1, 2]
list.push(3)`,
    options: [
      'No: `const` arrays are read-only',
      'Yes: `const` only stops reassigning `list`',
      'No: `list` has the fixed type `[1, 2]`',
      'Yes, but `list` becomes `any[]`',
    ],
    answer: 1,
    explanation:
      '`const` means the variable can\'t point to a different array, but the array itself can still change. Its type is `number[]`, so pushing a number is fine. Use `readonly number[]` to block mutation.',
  },
  {
    id: 'ts-b-11',
    prompt: 'What happens when this code is compiled?',
    code: `function shout(a: unknown) {
  return a.toUpperCase()
}`,
    options: [
      'Compiles; `unknown` works just like `any`',
      'Compiles; `a` is inferred as `string`',
      'Error: `a` is of type `unknown`',
      'Error: `unknown` is not a valid type',
    ],
    answer: 2,
    explanation:
      '`unknown` is the safe version of `any`: anything can be assigned to it, but you can\'t use it until you narrow it, for example with `typeof a === \'string\'`. With `any`, this would compile and could crash at runtime.',
  },
  {
    id: 'ts-b-12',
    prompt: 'What is the type of `user.age`?',
    code: `interface User {
  name: string
  age?: number
}
declare const user: User`,
    options: ['`number`', '`number | null`', '`number | undefined`', '`any`'],
    answer: 2,
    explanation:
      'The `?` makes the property optional, so it may be missing. Reading a missing property gives `undefined`, which TypeScript adds to the type.',
  },
  {
    id: 'ts-b-13',
    prompt: 'Which function signature causes a compile error?',
    options: [
      '`function f(a: string, b?: number)`',
      '`function f(a?: string, b?: number)`',
      '`function f(a: string, ...rest: number[])`',
      '`function f(a?: string, b: number)`',
    ],
    answer: 3,
    explanation:
      'Optional parameters must come after all required ones. Otherwise there\'s no way to skip `a` while still passing `b`, so TypeScript reports "A required parameter cannot follow an optional parameter".',
  },
  {
    id: 'ts-b-14',
    prompt: 'Which of these can a `type` alias express that an `interface` cannot?',
    options: [
      'An object with optional properties',
      'A union like `string | number`',
      'A function\'s call signature',
      'An object with `readonly` fields',
    ],
    answer: 1,
    explanation:
      'Interfaces always describe object shapes. A `type` alias can name any type, including unions, primitives and tuples. For plain object shapes, either one works.',
  },
  {
    id: 'ts-b-15',
    prompt: 'What happens when this code is compiled?',
    code: `function double(n: number): string {
  return n * 2
}`,
    options: [
      'Error: `number` is not assignable to `string`',
      'Compiles; the number is converted to a string',
      'Compiles; the return type is changed to `number`',
      'Error: `n * 2` needs parentheses',
    ],
    answer: 0,
    explanation:
      'A return type annotation is a promise that TypeScript checks. `n * 2` is a `number`, which breaks the promise to return a `string`.',
  },
  {
    id: 'ts-b-16',
    prompt: 'What is the type of `result`?',
    code: `function log(msg: string): void {
  console.log(msg)
}
const result = log('hi')`,
    options: ['`void`', '`string`', '`never`', '`undefined`'],
    answer: 0,
    explanation:
      '`void` means "this function doesn\'t return anything useful", so its result has type `void`. At runtime the value is `undefined`, but you aren\'t supposed to rely on it.',
  },
  {
    id: 'ts-b-17',
    prompt: 'Which line causes a compile error?',
    code: `interface Point {
  readonly x: number
  y: number
}
const p: Point = { x: 1, y: 2 }
p.y = 5
p.x = 10`,
    options: [
      '`const p: Point = { x: 1, y: 2 }`',
      '`p.y = 5`',
      '`p.x = 10`',
      'None of the lines',
    ],
    answer: 2,
    explanation:
      '`readonly` lets you set a property when the object is created but not change it afterwards. `y` has no modifier, so it can be reassigned freely.',
  },
  {
    id: 'ts-b-18',
    prompt: 'What does this print?',
    code: `enum Color { Red, Green, Blue }
console.log(Color.Green)`,
    options: ['`0`', '`1`', '`\'Green\'`', '`2`'],
    answer: 1,
    explanation:
      'Numeric enum members are numbered from `0` unless you give them values. `Red` is `0`, so `Green` is `1`.',
  },
  {
    id: 'ts-b-19',
    prompt: 'How is a regular `enum` different from a `type` alias?',
    options: [
      'It is erased at compile time',
      'It can only hold numbers',
      'It creates a real JavaScript object at runtime',
      'It can\'t be used as a type annotation',
    ],
    answer: 2,
    explanation:
      'Most TypeScript features vanish on compilation, but an `enum` compiles to an actual object you can read at runtime. A `type` alias leaves nothing behind in the output.',
  },
  {
    id: 'ts-b-20',
    prompt: 'What does `as HTMLInputElement` do at runtime?',
    code: `const el = document.getElementById('name') as HTMLInputElement`,
    options: [
      'Converts the element into an input',
      'Throws if the element isn\'t an input',
      'Returns `null` if the cast fails',
      'Nothing; it only changes the compile-time type',
    ],
    answer: 3,
    explanation:
      'A type assertion tells the compiler "trust me, I know the type". It is erased from the output, so if you\'re wrong, nothing warns you at runtime.',
  },
  {
    id: 'ts-b-21',
    prompt: 'With `strict` enabled, what happens here?',
    code: `function len(s: string | null) {
  return s.length
}`,
    options: [
      'Compiles; it returns `0` for `null`',
      'Error: `s` is possibly `null`',
      'Compiles; `null` is ignored',
      'Error: `length` doesn\'t exist on `string`',
    ],
    answer: 1,
    explanation:
      'With `strictNullChecks` on, `null` is its own type and must be handled before you use `s`. A check like `if (s === null) return 0` narrows it to `string`.',
  },
  {
    id: 'ts-b-22',
    prompt: 'What is the type of `v` on the last line?',
    code: `function fmt(v: string | number) {
  if (typeof v === 'string') {
    return v.toUpperCase()
  }
  return v
}`,
    options: ['`string | number`', '`string`', '`number`', '`unknown`'],
    answer: 2,
    explanation:
      'Inside the `if`, `v` is narrowed to `string`, and that branch returns. TypeScript follows the control flow, so after the `if` only `number` is left.',
  },
  {
    id: 'ts-b-23',
    prompt: 'With `strict` enabled, what happens here?',
    code: `function add(a, b) {
  return a + b
}`,
    options: [
      'Compiles; `a` and `b` are inferred as `number`',
      'Compiles; the return type is `string`',
      'Error: the function needs a return type',
      'Error: parameter `a` implicitly has an `any` type',
    ],
    answer: 3,
    explanation:
      'TypeScript doesn\'t guess parameter types from how they are used. Without annotations they would be `any`, and `strict` turns on `noImplicitAny`, which reports that.',
  },
  {
    id: 'ts-b-24',
    prompt: 'What does `"strict": true` in `tsconfig.json` do?',
    options: [
      'Enables a group of stricter checks like `strictNullChecks`',
      'Adds runtime type checks to the output',
      'Forbids writing `any` anywhere',
      'Stops `tsc` from emitting JS when there are errors',
    ],
    answer: 0,
    explanation:
      '`strict` is a shortcut that turns on a family of checks, including `strictNullChecks` and `noImplicitAny`. You can still write `any` on purpose, and blocking output on errors is a separate `noEmitOnError` option.',
  },
]
