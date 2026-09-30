import type { CSSProperties, ReactNode } from 'react'
import * as M from '../../components/mock'
import type { Question } from '../../types'

// Overrides the kit's CSS variables (e.g. `--mk-line`) on one element and its children.
const vars = (v: Record<string, string>) => v as CSSProperties

// Every colour pair shown with a contrast ratio was checked with the WCAG relative-luminance formula.

/* ---------- a-02: contrast thresholds, one swatch per tile ---------- */
function ContrastTile({ bg, px, bold, size, ratio }: { bg: string; px: number; bold?: boolean; size: number; ratio: string }) {
  return (
    <M.Panel width={17}>
      <M.Swatch
        fg="#ffffff"
        bg={bg}
        text="Book now"
        size={size}
        caption={<M.Text size={1.45}>{`${ratio} · ${px}px ${bold ? 'bold' : 'regular'}`}</M.Text>}
        style={{ fontWeight: bold ? 700 : 400, height: '8em', whiteSpace: 'nowrap' }}
      />
    </M.Panel>
  )
}

/* ---------- a-04: keyboard focus on a button ---------- */
function FocusTile({ button }: { button: CSSProperties }) {
  return (
    <M.Panel width={15}>
      <M.Input label="Email" value="noor@fastmail.com" />
      <M.Button full style={{ marginTop: '0.3em', ...button }}>
        Sign in
      </M.Button>
    </M.Panel>
  )
}

/* ---------- a-09: an invalid card number ---------- */
const RED = vars({ '--mk-danger': '#c62828' })

/* ---------- a-17: dark themes ---------- */
function DarkTile({ bg, text, muted, accent, accentText }: { bg: string; text: string; muted: string; accent: string; accentText: string }) {
  return (
    <M.Panel width={15} dark style={vars({ '--mk-bg': bg, '--mk-text': text, '--mk-line': '#2c2c2c' })}>
      <M.Title size={1.15} style={{ color: text }}>
        Evening run
      </M.Title>
      <M.Text size={0.9} color={muted}>
        6.2 km along the river, 34 min
      </M.Text>
      <M.Button full color={accent} style={{ color: accentText }}>
        Start run
      </M.Button>
    </M.Panel>
  )
}

/* ---------- a-19: cancelling a membership ---------- */
function CancelTile({ children }: { children: ReactNode }) {
  return (
    <M.Panel width={15} pad={1}>
      <M.Title size={1}>Membership</M.Title>
      <M.Text size={0.85} muted>
        Plus plan · €7.99 a month
      </M.Text>
      {children}
    </M.Panel>
  )
}

/* ---------- a-23: a phone number field ---------- */
function PhoneTile({ field }: { field: ReactNode }) {
  return (
    <M.Panel width={15} pad={1}>
      <M.Title size={1}>Delivery contact</M.Title>
      {field}
    </M.Panel>
  )
}

/* ---------- a-24: a column of amounts ---------- */
const INVOICES = [
  ['Studio rent', '€1,204.50'],
  ['Printer ink', '€89.00'],
  ['Laptops', '€12,430.00'],
  ['Stamps', '€7.25'],
]

function AmountsTile({ align, amounts = INVOICES.map((r) => r[1]) }: { align: 'left' | 'center' | 'right'; amounts?: string[] }) {
  return (
    <M.Panel width={17} pad={1} style={{ gap: '0.45em' }}>
      <M.Row>
        <M.Text size={0.8} weight={700} muted>
          Item
        </M.Text>
        <M.Spacer />
        <M.Text size={0.8} weight={700} muted style={{ width: '6.5em', textAlign: align }}>
          Amount
        </M.Text>
      </M.Row>
      <M.Divider />
      {INVOICES.map(([item], i) => (
        <M.Row key={item}>
          <M.Text size={1.05}>{item}</M.Text>
          <M.Spacer />
          <M.Text size={1.05} style={{ width: '6.5em', textAlign: align, fontVariantNumeric: 'tabular-nums' }}>
            {amounts[i]}
          </M.Text>
        </M.Row>
      ))}
    </M.Panel>
  )
}

/* ---------- a-11: Nielsen & Landauer's curve, 1 − (1 − 0.31)^n ---------- */
const USERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]
const found = (n: number) => 1 - (1 - 0.31) ** n

/* ---------- a-21: a journey map ---------- */
const JOURNEY: [string, number][] = [
  ['Search', 2],
  ['Compare', 1],
  ['Payment fails', -3],
  ['Retry', 0],
  ['Confirmed', 3],
]

export const advanced: Question[] = [
  {
    id: 'ux-a-01',
    prompt: 'Both lines use the same grey on white, a 3.5:1 contrast ratio. Which one passes WCAG AA?',
    visual: (
      <M.Panel width={24} pad={1.4}>
        <M.Row gap={0.8}>
          <M.Text size={1.72} weight={400} color="#888888">
            Summer timetable
          </M.Text>
          <M.Spacer />
          <M.Badge tone="primary">24px regular</M.Badge>
        </M.Row>
        <M.Row gap={0.8} align="flex-start">
          <M.Text size={1.15} weight={400} color="#888888">
            Buses run every 20 minutes from June to September.
          </M.Text>
          <M.Badge tone="primary">16px regular</M.Badge>
        </M.Row>
        <M.Text size={0.8} muted>
          Text colour #888888 on #FFFFFF
        </M.Text>
      </M.Panel>
    ),
    options: ['Only the 24px heading', 'Only the 16px body text', 'Both of them', 'Neither of them'],
    answer: 0,
    explanation:
      'WCAG 1.4.3 asks for 4.5:1 for normal text but only 3:1 for large text, which is at least 24px regular or about 18.66px bold. So 3.5:1 is fine for the heading but too faint for the body copy.',
  },
  {
    id: 'ux-a-02',
    prompt: 'White text on each colour. Which sample passes WCAG 2.2 AA contrast?',
    options: [
      { label: '4.2:1 at 16px regular', visual: <ContrastTile bg="#1c7ed6" px={16} size={1.3} ratio="4.2:1" /> },
      { label: '3.4:1 at 24px regular', visual: <ContrastTile bg="#ea5f10" px={24} size={1.95} ratio="3.4:1" /> },
      { label: '3.4:1 at 14px bold', visual: <ContrastTile bg="#9775fa" px={14} bold size={1.15} ratio="3.4:1" /> },
      { label: '2.8:1 at 32px bold', visual: <ContrastTile bg="#0ea5e9" px={32} bold size={2.2} ratio="2.8:1" /> },
    ],
    answer: 1,
    explanation:
      'Large text needs only 3:1, and 24px regular counts as large, so 3.4:1 passes. 14px bold does not: the bold threshold is 14pt, about 18.66px. 16px regular needs the full 4.5:1, and nothing gets by with less than 3:1.',
  },
  {
    id: 'ux-a-03',
    prompt: 'Which marked element fails WCAG 1.4.11, non-text contrast?',
    visual: (
      <M.Panel width={23} pad={1.6} style={{ paddingRight: '3em' }}>
        <M.Title size={1.2}>Sign in</M.Title>
        <M.Pin n="A" block at="right">
          <M.Input label="Email" value="ines.moreau@orange.fr" style={vars({ '--mk-field-line': '#8a8f9e' })} />
        </M.Pin>
        <M.Pin n="B" block at="right">
          <M.Input label="Password" placeholder="At least 8 characters" style={vars({ '--mk-field-line': '#d4d7e0' })} />
        </M.Pin>
        <M.Row>
          <M.Pin n="C" at="right">
            <M.Checkbox label="Keep me signed in" style={vars({ '--mk-field-line': '#6b7280' })} />
          </M.Pin>
        </M.Row>
        <M.Pin n="D" block at="right">
          <M.Button full>Sign in</M.Button>
        </M.Pin>
      </M.Panel>
    ),
    options: ['A, the Email field', 'B, the Password field', 'C, the checkbox', 'D, the Sign in button'],
    answer: 1,
    explanation:
      'The Password field’s border is about 1.4:1 against white, and it’s the only thing showing where the field is. 1.4.11 asks for 3:1 on the visual boundaries people need to identify a control. The Email border, at about 3.2:1, just passes.',
  },
  {
    id: 'ux-a-04',
    prompt: 'Keyboard focus is on the Sign in button in every version. Which one shows it properly?',
    options: [
      {
        label: 'A slightly lighter button fill',
        visual: <FocusTile button={{ ...vars({ '--mk-fill': '#4d6afd' }) }} />,
      },
      { label: 'No visible change', visual: <FocusTile button={{}} /> },
      {
        label: 'A dark outline ring offset from the button',
        visual: <FocusTile button={{ outline: '0.2em solid #1b1f2e', outlineOffset: '0.2em' }} />,
      },
      {
        label: 'A pale glow around the button',
        visual: <FocusTile button={{ boxShadow: '0 0 0 0.3em #e6ebff' }} />,
      },
    ],
    answer: 2,
    explanation:
      'Focus Visible (2.4.7) needs a visible indicator, and a focus ring should contrast at least 3:1 with what’s around it (1.4.11). The pale glow is about 1.2:1 against white, and a slightly lighter fill is a change almost nobody can spot.',
  },
  {
    id: 'ux-a-05',
    prompt: 'These toolbar buttons are 16×16 px and 2 px apart. What does WCAG 2.2 AA (2.5.8) ask for?',
    visual: (
      <M.Panel width={25} pad={1.4}>
        <M.Row gap={0.14} style={{ marginTop: '1.7em' }}>
          <M.IconButton icon="edit" size={1.9} variant="filled" />
          <M.IconButton icon="image" size={1.9} variant="filled" />
          <M.Measure label="16 × 16 px" side="top">
            <M.IconButton icon="list" size={1.9} variant="filled" />
          </M.Measure>
          <M.IconButton icon="grid" size={1.9} variant="filled" />
          <M.IconButton icon="share" size={1.9} variant="filled" />
          <M.IconButton icon="undo" size={1.9} variant="filled" />
          <M.Spacer />
          <M.Text size={0.8} muted>
            2 px gaps
          </M.Text>
        </M.Row>
        <M.Divider />
        <M.Title size={1.05}>Trip notes: Kyoto</M.Title>
        <M.Lines n={4} />
      </M.Panel>
    ),
    options: [
      'At least 44×44 CSS px each, and spacing doesn’t count',
      'At least 24×24 CSS px, or spacing so 24px circles on them don’t overlap',
      'Nothing: target size rules only apply on touch screens',
      'At least 48×48 px, to match Android’s guideline',
    ],
    answer: 1,
    explanation:
      '2.5.8 Target Size (Minimum) is AA and asks for 24×24 CSS px, with an exception for smaller targets that are spaced out enough. The 44×44 px rule is 2.5.5, which is AAA. It applies to mouse users too.',
  },
  {
    id: 'ux-a-06',
    prompt: 'A screen reader announces this heart button as just “Button”. What’s the best fix?',
    visual: (
      <M.Phone height={27}>
        <M.AppBar title="Shop" back actions={['cart']} />
        <M.Stack pad="0 1.2em" gap={0.7}>
          <M.Img h={9} tone="sand" />
          <M.Row>
            <M.Stack gap={0.1}>
              <M.Title size={1.1}>Speckled stoneware mug</M.Title>
              <M.Text muted>€24 · handmade in Porto</M.Text>
            </M.Stack>
            <M.Spacer />
            <M.Pin n="A">
              <M.IconButton icon="heart" variant="outline" />
            </M.Pin>
          </M.Row>
          <M.Toast tone="info" style={{ marginTop: '0.6em' }}>
            Screen reader: “Button”
          </M.Toast>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'Add `role="button"` to the heart svg',
      'Give it `aria-label="Heart icon"`',
      'Give it `aria-label="Save to favourites"`',
      'Show a tooltip with the name on hover',
    ],
    answer: 2,
    explanation:
      'An icon-only button needs an accessible name that says what it does, not what it looks like, so “Save to favourites” beats “Heart icon”. A hover tooltip doesn’t help keyboard, touch or screen reader users, and the element is already a button.',
  },
  {
    id: 'ux-a-07',
    prompt: 'The photo and the text below it sit inside the same link. What should the photo’s alt text be?',
    visual: (
      <M.Phone height={26}>
        <M.AppBar title="Running shoes" back actions={['filter']} />
        <M.Row pad="0.2em 1.2em" gap={0.8} align="flex-start">
          <M.Card pad={0.6} style={{ flex: 1, outline: '0.15em dashed #3b5bfd', outlineOffset: '0.2em' }}>
            <M.Pin n="A">
              <M.Img h={6} tone="sky" />
            </M.Pin>
            <M.Text weight={600}>Trail runner, blue</M.Text>
            <M.Text muted>€89</M.Text>
          </M.Card>
          <M.Card pad={0.6} style={{ flex: 1 }}>
            <M.Img h={6} tone="sunset" />
            <M.Text weight={600}>Road racer, coral</M.Text>
            <M.Text muted>€109</M.Text>
          </M.Card>
        </M.Row>
        <M.Row pad="0.8em 1.2em">
          <M.Note>Dashed line: the whole card is one link</M.Note>
        </M.Row>
      </M.Phone>
    ),
    options: ['`alt=""`', '`alt="Trail runner, blue"`', '`alt="Photo of a shoe"`', 'No alt attribute at all'],
    answer: 0,
    explanation:
      'The link text already says “Trail runner, blue”, so the image adds nothing and `alt=""` stops screen readers reading the name twice. Leaving out alt entirely is worse: some screen readers fall back to reading the file name.',
  },
  {
    id: 'ux-a-08',
    prompt: 'What’s wrong with this page’s heading structure?',
    visual: (
      <M.Browser url="gympass.example.com/pricing" width={34}>
        <M.Row pad="1.2em" gap={1.4} align="flex-start">
          <M.Stack gap={0.6} grow>
            <M.Row gap={0.5}>
              <M.Badge tone="primary">h1</M.Badge>
              <M.Title size={1.45}>Plans and pricing</M.Title>
            </M.Row>
            <M.Lines n={2} />
            <M.Row gap={0.5} style={{ marginTop: '0.4em' }}>
              <M.Badge tone="primary">h4</M.Badge>
              <M.Text size={0.95} weight={700}>
                Compare plans
              </M.Text>
            </M.Row>
            <M.Lines n={3} widths={[100, 100, 70]} />
            <M.Row gap={0.5} style={{ marginTop: '0.4em' }}>
              <M.Badge tone="primary">h2</M.Badge>
              <M.Title size={1.15}>Common questions</M.Title>
            </M.Row>
            <M.Lines n={2} />
          </M.Stack>
          <M.Note style={{ marginTop: '0.6em' }}>
            The designer chose h4 because it “looked the right size”
          </M.Note>
        </M.Row>
      </M.Browser>
    ),
    options: [
      'Common questions should also be an h1',
      'A page can only have one h2',
      'It jumps from h1 to h4, so sections seem to be missing',
      'Nothing: screen readers ignore heading levels',
    ],
    answer: 2,
    explanation:
      'Screen reader users often navigate by a list of headings, and jumping from h1 to h4 suggests missing levels in between. Pick the level for its place in the outline and set the size with CSS. The page title is the one h1; the other sections belong under it as h2s.',
  },
  {
    id: 'ux-a-09',
    prompt: 'The card number is too short. Which version shows the error so everyone can perceive and fix it?',
    options: [
      {
        label: 'Red border only',
        visual: (
          <M.Panel width={15} style={RED}>
            <M.Input label="Card number" value="4242 4242 42" style={vars({ '--mk-field-line': '#c62828' })} />
            <M.Button full>Pay €42.00</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'Generic alert above the form',
        visual: (
          <M.Panel width={15} style={RED}>
            <M.Alert tone="danger">Please check the form.</M.Alert>
            <M.Input label="Card number" value="4242 4242 42" />
          </M.Panel>
        ),
      },
      {
        label: 'Red label only',
        visual: (
          <M.Panel width={15} style={RED}>
            <M.Input label={<M.Text color="#c62828">Card number</M.Text>} value="4242 4242 42" />
            <M.Button full>Pay €42.00</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'Border, icon and a specific message',
        visual: (
          <M.Panel width={15} style={RED}>
            <M.Input label="Card number" value="4242 4242 42" error="Enter all 16 digits" />
            <M.Button full>Pay €42.00</M.Button>
          </M.Panel>
        ),
      },
    ],
    answer: 3,
    explanation:
      'Colour alone fails WCAG 1.4.1 (colour-blind users may not see it), and 3.3.1 asks for errors to be identified and described in text. A generic alert is text, but it doesn’t say which field is wrong or how to fix it.',
  },
  {
    id: 'ux-a-10',
    prompt: 'Pressing Tab moves focus behind this open dialog. What should happen instead?',
    visual: (
      <M.Browser url="northwind.app/projects" width={34}>
        <M.Row pad="0.8em 1.2em" gap={1.2}>
          <M.Text weight={800}>Northwind</M.Text>
          <M.Text muted>Projects</M.Text>
          <M.Text style={{ outline: '0.22em solid #3b5bfd', outlineOffset: '0.25em', borderRadius: '0.2em' }}>Pricing</M.Text>
          <M.Text muted>Help</M.Text>
        </M.Row>
        <M.Stack pad="0.4em 1.2em 1.4em" gap={0.7}>
          <M.Card>
            <M.Lines n={2} />
          </M.Card>
          <M.Card>
            <M.Lines n={3} />
          </M.Card>
          <M.Card>
            <M.Lines n={2} />
          </M.Card>
        </M.Stack>
        <M.Modal
          title="Delete project “Atlas”?"
          style={{ maxWidth: '19em' }}
          actions={
            <>
              <M.Button variant="secondary" size="sm">
                Cancel
              </M.Button>
              <M.Button variant="danger" size="sm">
                Delete
              </M.Button>
            </>
          }
        >
          <M.Text muted>This removes 214 files for everyone on the team.</M.Text>
        </M.Modal>
        <M.Box style={{ position: 'absolute', top: '0.35em', right: '1em', zIndex: 6 }}>
          <M.Note>After three Tabs, focus is on “Pricing”</M.Note>
        </M.Box>
      </M.Browser>
    ),
    options: [
      'The dialog should close as soon as focus leaves it',
      'Nothing: the dimmed backdrop already shows it’s modal',
      'Focus should jump back to the top of the page',
      'Tab should cycle inside it, and closing should return focus to the opener',
    ],
    answer: 3,
    explanation:
      'While a modal dialog is open, keyboard focus should stay inside it (start on a sensible element, loop at the ends), and on close it should go back to the control that opened it. The backdrop only dims the page visually; it doesn’t stop Tab reaching things behind it.',
  },
  {
    id: 'ux-a-11',
    prompt: 'You have budget for 15 usability test sessions. Given this curve, what’s the smartest plan?',
    visual: (
      <M.Panel width={27} pad={1.4}>
        <M.Text weight={700}>Share of usability problems found</M.Text>
        <M.Row gap={0.4} align="flex-end" style={{ height: '8.5em' }}>
          {USERS.map((n) => (
            <M.Stack key={n} gap={0.25} align="center" style={{ flex: 1 }}>
              {(n === 1 || n === 5 || n === 15) && (
                <M.Text size={0.72} weight={700}>
                  {Math.floor(found(n) * 100)}%
                </M.Text>
              )}
              <M.Box
                style={{
                  width: '100%',
                  height: `${found(n) * 6.5}em`,
                  borderRadius: '0.25em 0.25em 0 0',
                  background: n === 5 ? '#3b5bfd' : '#c3c7d4',
                  marginLeft: n === 15 ? '0.6em' : undefined,
                }}
              />
            </M.Stack>
          ))}
        </M.Row>
        <M.Row gap={0.4} style={{ marginTop: '-0.5em' }}>
          {USERS.map((n) => (
            <M.Text key={n} size={0.75} muted align="center" style={{ flex: 1, marginLeft: n === 15 ? '0.6em' : undefined }}>
              {n}
            </M.Text>
          ))}
        </M.Row>
        <M.Text size={0.78} muted align="center">
          Users tested per round (Nielsen and Landauer’s model)
        </M.Text>
      </M.Panel>
    ),
    options: [
      'One round of 15 users, so no problem slips through',
      'A 15-person survey instead, since it’s cheaper per answer',
      'Three rounds of about 5 users, fixing issues in between',
      'Test all 15 users on the finished product just before launch',
    ],
    answer: 2,
    explanation:
      'Returns drop fast after about 5 users, as each new person mostly hits the same problems. Spending the rest on further rounds after fixing things finds new issues, including ones the first problems were hiding. This applies to qualitative testing, not to measuring metrics.',
  },
  {
    id: 'ux-a-12',
    prompt: 'During a think-aloud session, the participant asks this. What’s the best reply?',
    visual: (
      <M.Phone height={29}>
        <M.AppBar title="Checkout" back />
        <M.Stack pad="0 1.2em" gap={0.8}>
          <M.Stepper steps={['Cart', 'Delivery', 'Payment']} current={1} />
          <M.Input label="Street address" placeholder="Start typing your address" />
          <M.Row justify="center">
            <M.Button variant="link">Use a saved address</M.Button>
          </M.Row>
          <M.Button full>Continue to payment</M.Button>
        </M.Stack>
        <M.Cursor kind="touch" style={{ top: '13.5em', left: '8.6em' }} />
        <M.Box style={{ position: 'absolute', top: '18.4em', left: '1.6em', right: '1.6em', zIndex: 6 }}>
          <M.Note>Participant: “Hmm… should I tap here?”</M.Note>
        </M.Box>
      </M.Phone>
    ),
    options: [
      '“What would you expect to happen if you did?”',
      '“Yes, that’s the right one.”',
      '“No, try the address field first.”',
      '“Don’t worry, let’s skip to the next task.”',
    ],
    answer: 0,
    explanation:
      'Answering yes or no hands them the solution, and you lose the finding. Turning the question back keeps them thinking aloud and shows you their mental model, which is the whole point of the session.',
  },
  {
    id: 'ux-a-13',
    prompt: 'Participants sort these cards into groups they create and name themselves. Which method is this?',
    visual: (
      <M.Panel width={33} pad={1.3}>
        <M.Row>
          <M.Text weight={700}>Pet shop study</M.Text>
          <M.Spacer />
          <M.Badge>Participant 7 of 20</M.Badge>
        </M.Row>
        <M.Row gap={0.7} align="flex-start">
          {[
            ['Stuff for my dog', ['Dog lead', 'Chew toys', 'Puppy food']],
            ['Cleaning up', ['Cat litter', 'Poop bags']],
            ['Fish things', ['Aquarium filter']],
          ].map(([group, cards]) => (
            <M.Card key={group as string} flat pad={0.6} style={{ flex: 1, gap: '0.4em', background: '#f4f5f8' }}>
              <M.Note style={{ transform: 'rotate(-1.5deg)' }}>{group}</M.Note>
              {(cards as string[]).map((c) => (
                <M.Chip key={c} style={{ background: '#fff' }}>
                  {c}
                </M.Chip>
              ))}
            </M.Card>
          ))}
        </M.Row>
        <M.Row gap={0.5} wrap>
          <M.Text size={0.85} muted>
            Still to sort:
          </M.Text>
          <M.Chip>Bird seed</M.Chip>
          <M.Chip>Hamster wheel</M.Chip>
          <M.Button variant="ghost" size="sm" icon="plus">
            New group
          </M.Button>
        </M.Row>
      </M.Panel>
    ),
    options: ['Closed card sort', 'Tree testing', 'Open card sort', 'First-click testing'],
    answer: 2,
    explanation:
      'In an open card sort, people invent and name their own groups, which shows how they think about the content. In a closed sort the categories are given. Tree testing then checks whether a proposed structure actually works.',
  },
  {
    id: 'ux-a-14',
    prompt: 'Participants get a task and this clickable, text-only menu, with no visual design. What does it test?',
    visual: (
      <M.Panel width={25} pad={1.4}>
        <M.Alert tone="primary" title="Task 4 of 8">
          Where would you download last month’s invoice?
        </M.Alert>
        <M.Stack gap={0.45} style={{ marginLeft: '0.3em' }}>
          {(
            [
              [0, 'next', 'Shop'],
              [0, 'next', 'Help centre'],
              [0, 'down', 'My account'],
              [1, 'next', 'Orders'],
              [1, 'down', 'Billing'],
              [2, null, 'Payment methods'],
              [2, null, 'Invoices'],
              [1, 'next', 'Profile'],
            ] as const
          ).map(([depth, icon, label]) => (
            <M.Row key={label} gap={0.35} style={{ marginLeft: `${depth * 1.3}em` }}>
              {icon ? <M.Icon name={icon} size={0.95} color="#6a7087" /> : <M.Box style={{ width: '0.95em' }} />}
              <M.Text weight={icon === 'down' ? 700 : 400}>{label}</M.Text>
            </M.Row>
          ))}
        </M.Stack>
        <M.Row justify="flex-end">
          <M.Button size="sm" variant="secondary">
            I’d find it here
          </M.Button>
        </M.Row>
      </M.Panel>
    ),
    options: [
      'How people would group the content themselves',
      'Whether people can find things in the menu structure',
      'Which page layout draws the eye first',
      'Whether the menu labels have enough contrast',
    ],
    answer: 1,
    explanation:
      'This is a tree test. Stripping away the visual design isolates the hierarchy and its labels, so you learn whether people can find things in it. Grouping content from scratch is what card sorting is for.',
  },
  {
    id: 'ux-a-15',
    prompt: 'The team wants to know why B won. What’s the best next step?',
    visual: (
      <M.Panel width={27} pad={1.4}>
        <M.Row>
          <M.Text weight={700}>Experiment: checkout button</M.Text>
          <M.Spacer />
          <M.Badge tone="success">Finished</M.Badge>
        </M.Row>
        <M.Row gap={0.8} align="stretch">
          <M.Card flat style={{ flex: 1 }}>
            <M.Text size={0.8} muted weight={700}>
              A · control
            </M.Text>
            <M.Button size="sm">Continue</M.Button>
            <M.Title size={1.3}>3.1%</M.Title>
            <M.Progress value={0.31} color="#c3c7d4" />
          </M.Card>
          <M.Card flat style={{ flex: 1, boxShadow: '0 0 0 2px #2a9d68' }}>
            <M.Row>
              <M.Text size={0.8} muted weight={700}>
                B
              </M.Text>
              <M.Spacer />
              <M.Badge tone="success">Winner</M.Badge>
            </M.Row>
            <M.Button size="sm">Continue to payment</M.Button>
            <M.Title size={1.3}>3.6%</M.Title>
            <M.Progress value={0.36} color="#2a9d68" />
          </M.Card>
        </M.Row>
        <M.Text size={0.8} muted>
          Checkout completion rate, 41,200 sessions per variant
        </M.Text>
      </M.Panel>
    ),
    options: [
      'Watch people use both versions in usability sessions',
      'Run the same test again for twice as long',
      'Add variants C and D to the same experiment',
      'Ship B and assume the longer label was clearer',
    ],
    answer: 0,
    explanation:
      'An A/B test tells you what happened, not why. Watching people and asking them what they expected is how you find the reason, and the reason is what lets you apply it elsewhere. Running longer only makes you more sure of the same “what”.',
  },
  {
    id: 'ux-a-16',
    prompt: 'Which question in this interview guide will give the most reliable insight?',
    visual: (
      <M.Panel width={27} pad={1.4}>
        <M.Row>
          <M.Icon name="chat" color="#3b5bfd" />
          <M.Text weight={700}>Interview guide · bill-splitting app</M.Text>
        </M.Row>
        <M.Stack gap={1.1} pad="0.3em 0 0.3em 2.4em">
          <M.Pin n="A" at="left">
            <M.Text>Would you use an app that splits bills for you automatically?</M.Text>
          </M.Pin>
          <M.Pin n="B" at="left">
            <M.Text>Don’t you find splitting bills with friends annoying?</M.Text>
          </M.Pin>
          <M.Pin n="C" at="left">
            <M.Text>How much would you pay each month for this?</M.Text>
          </M.Pin>
          <M.Pin n="D" at="left">
            <M.Text>Tell me about the last time you split a bill with friends.</M.Text>
          </M.Pin>
        </M.Stack>
      </M.Panel>
    ),
    options: ['A, “Would you use…”', 'B, “Don’t you find…”', 'C, “How much would you pay…”', 'D, “Tell me about the last time…”'],
    answer: 3,
    explanation:
      'People are poor at predicting what they’d do or pay, but good at recalling what they actually did. Asking about a specific past event gets real behaviour. B is a leading question that suggests the answer.',
  },
  {
    id: 'ux-a-17',
    prompt: 'Which dark theme follows dark-mode best practice?',
    options: [
      {
        label: 'Pure black, pure white text, saturated red button',
        visual: <DarkTile bg="#000000" text="#ffffff" muted="#ffffff" accent="#ff0000" accentText="#ffffff" />,
      },
      {
        label: 'Dark grey, off-white text, softened blue button',
        visual: <DarkTile bg="#121212" text="#e8e8e8" muted="#a8a8a8" accent="#8ab4f8" accentText="#10131f" />,
      },
      {
        label: 'Pure black with saturated blue text',
        visual: <DarkTile bg="#000000" text="#0000ff" muted="#0000ff" accent="#0000ff" accentText="#ffffff" />,
      },
      {
        label: 'Dark grey with mid-grey text',
        visual: <DarkTile bg="#1e1e1e" text="#555555" muted="#555555" accent="#3a3a3a" accentText="#555555" />,
      },
    ],
    answer: 1,
    explanation:
      'A dark grey (like #121212) leaves room for shadows and elevation, off-white text avoids harsh glare, and softened accents don’t “vibrate” on dark backgrounds. Saturated blue on black is only about 2.4:1, and the mid-grey text is about 2.2:1.',
  },
  {
    id: 'ux-a-18',
    prompt: 'Which deceptive pattern is this pop-up using?',
    visual: (
      <M.Phone height={28}>
        <M.AppBar title="Verde Home" actions={['search', 'cart']} />
        <M.Stack pad="0 1.2em" gap={0.7}>
          <M.Img h={8} tone="forest" />
          <M.Lines n={3} />
        </M.Stack>
        <M.Modal title="Get 15% off your first order">
          <M.Input placeholder="Email address" icon="mail" />
          <M.Button full>Yes, give me 15% off</M.Button>
          <M.Text size={0.9} align="center">
            <M.Link>No thanks, I enjoy paying full price</M.Link>
          </M.Text>
        </M.Modal>
      </M.Phone>
    ),
    options: ['Confirmshaming', 'Roach motel', 'Sneak into basket', 'Disguised ad'],
    answer: 0,
    explanation:
      'Confirmshaming words the “no” option to make you feel foolish or guilty for declining. A neutral “No thanks” respects the choice. A roach motel is easy to get into and hard to leave, like a subscription you can’t cancel.',
  },
  {
    id: 'ux-a-19',
    prompt: 'Which way of cancelling a membership is fair to the user?',
    options: [
      {
        label: 'A confirmation worded as a double negative',
        visual: (
          <CancelTile>
            <M.Card flat pad={0.7}>
              <M.Text size={0.9} weight={600}>
                Are you sure you don’t want to keep your perks?
              </M.Text>
              <M.Row justify="flex-end" gap={0.4}>
                <M.Button size="sm" variant="secondary">
                  No
                </M.Button>
                <M.Button size="sm">Yes</M.Button>
              </M.Row>
            </M.Card>
          </CancelTile>
        ),
      },
      {
        label: 'Cancelling only by phone, in office hours',
        visual: (
          <CancelTile>
            <M.Alert tone="neutral">To cancel, call us Mon–Fri, 9am–5pm.</M.Alert>
            <M.Text size={0.9} weight={700}>
              0161 496 0714
            </M.Text>
          </CancelTile>
        ),
      },
      {
        label: 'A big “keep” button and a tiny cancel link',
        visual: (
          <CancelTile>
            <M.Button full color="#2a9d68">
              Keep my perks
            </M.Button>
            <M.Row justify="center">
              <M.Text size={0.6} color="#b4b8c7">
                cancel anyway
              </M.Text>
            </M.Row>
          </CancelTile>
        ),
      },
      {
        label: 'A plain cancel button with the end date',
        visual: (
          <CancelTile>
            <M.Text size={0.85}>Ends on 12 June. You keep access until then.</M.Text>
            <M.Button full variant="secondary">
              Cancel membership
            </M.Button>
          </CancelTile>
        ),
      },
    ],
    answer: 3,
    explanation:
      'Leaving should be as easy as joining. Forcing a phone call is a roach motel, the tiny grey link hides the choice, and the double negative is a trick question that makes “yes” and “no” hard to read.',
  },
  {
    id: 'ux-a-20',
    prompt: 'On this file page, which marked button most likely downloads the file you came for?',
    visual: (
      <M.Browser url="files.example.net/hikemap" width={34}>
        <M.Stack pad="1em 1.2em 1.3em" gap={0.9}>
          <M.Box style={{ position: 'relative', padding: '0.8em', borderRadius: '0.6em', background: '#eef7f1' }}>
            <M.Text size={0.55} muted style={{ position: 'absolute', top: '0.25em', right: '0.5em' }}>
              Ad
            </M.Text>
            <M.Row justify="center">
              <M.Pin n="A">
                <M.Button variant="success" size="lg" icon="download">
                  Download now
                </M.Button>
              </M.Pin>
            </M.Row>
          </M.Box>
          <M.Row gap={1} align="flex-start">
            <M.Card flat style={{ flex: 1 }}>
              <M.Row>
                <M.Icon name="file" color="#6a7087" size={1.6} />
                <M.Stack gap={0.1}>
                  <M.Text weight={700}>hikemap-setup-2.4.1.exe</M.Text>
                  <M.Text size={0.85} muted>
                    84 MB · Windows · uploaded 3 days ago
                  </M.Text>
                </M.Stack>
              </M.Row>
              <M.Row>
                <M.Pin n="B" at="right">
                  <M.Button variant="secondary" size="sm" icon="download">
                    Download v2.4.1
                  </M.Button>
                </M.Pin>
              </M.Row>
            </M.Card>
            <M.Stack gap={0.4} align="center" style={{ width: '9em', padding: '0.6em', borderRadius: '0.6em', background: '#eef7f1' }}>
              <M.Text size={0.55} muted>
                Sponsored
              </M.Text>
              <M.Pin n="C">
                <M.Button variant="success" size="sm" iconAfter="arrow">
                  Start download
                </M.Button>
              </M.Pin>
            </M.Stack>
          </M.Row>
        </M.Stack>
      </M.Browser>
    ),
    options: ['A, the big Download now button', 'B, the button next to the file details', 'C, the Start download button at the side'],
    answer: 1,
    explanation:
      'A and C are disguised ads: adverts dressed up as the page’s own controls, with only a tiny “Ad” or “Sponsored” label. The real button sits with the file name, size and version it belongs to.',
  },
  {
    id: 'ux-a-21',
    prompt: 'According to the peak-end rule, which moments will most shape how people remember this booking?',
    visual: (
      <M.Panel width={29} pad={1.4}>
        <M.Text weight={700}>Journey map · booking a holiday</M.Text>
        <M.Row gap={0.5} align="stretch">
          {JOURNEY.map(([step, mood]) => (
            <M.Stack key={step} gap={0} align="center" style={{ flex: 1 }}>
              <M.Box style={{ height: '4.2em', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                {mood > 0 && (
                  <M.Box style={{ width: '1.8em', height: `${mood * 1.3}em`, background: '#2a9d68', borderRadius: '0.3em 0.3em 0 0' }} />
                )}
              </M.Box>
              <M.Box style={{ height: '1px', width: '100%', background: '#1b1f2e' }} />
              <M.Box style={{ height: '4.2em', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                {mood < 0 && (
                  <M.Box style={{ width: '1.8em', height: `${-mood * 1.3}em`, background: '#e5484d', borderRadius: '0 0 0.3em 0.3em' }} />
                )}
                {mood === 0 && <M.Box style={{ width: '1.8em', height: '0.25em', background: '#c3c7d4' }} />}
              </M.Box>
              <M.Text size={0.8} weight={600} align="center">
                {step}
              </M.Text>
            </M.Stack>
          ))}
        </M.Row>
      </M.Panel>
    ),
    options: [
      'The average of all five steps',
      'The first step, since first impressions stick',
      'Whichever step took the longest',
      'The payment failure and the confirmation',
    ],
    answer: 3,
    explanation:
      'The peak-end rule says people judge an experience mostly by its most intense moment and by how it ends, not by the average or the duration. So fixing the payment failure and making the ending good pay off the most.',
  },
  {
    id: 'ux-a-22',
    prompt: 'Hardly anyone ever buys the Plus plan. Why might it still be on the page?',
    visual: (
      <M.Browser url="cloudbox.example.com/pricing" width={34}>
        <M.Stack pad="1.1em 1.2em 1.4em" gap={0.9}>
          <M.Title size={1.2} align="center">
            Choose your storage
          </M.Title>
          <M.Row gap={0.8} align="stretch">
            {(
              [
                ['Basic', '€3', '50 GB', false],
                ['Plus', '€9.50', '200 GB', false],
                ['Premium', '€10', '2 TB', true],
              ] as const
            ).map(([name, price, space, best]) => (
              <M.Card key={name} style={{ flex: 1, alignItems: 'center', boxShadow: best ? '0 0 0 2px #3b5bfd' : undefined }}>
                <M.Row>
                  <M.Text weight={700}>{name}</M.Text>
                  {best && <M.Badge tone="primary">Best value</M.Badge>}
                </M.Row>
                <M.Title size={1.5}>{price}</M.Title>
                <M.Text size={0.85} muted>
                  per month · {space}
                </M.Text>
                <M.Button size="sm" variant={best ? 'primary' : 'secondary'} full>
                  Choose
                </M.Button>
              </M.Card>
            ))}
          </M.Row>
        </M.Stack>
      </M.Browser>
    ),
    options: [
      'It’s a decoy that makes Premium look like a bargain',
      'It gives more choice, and more choice always lifts sign-ups',
      'It anchors Basic as the cheapest option',
      'Pricing law requires a middle tier',
    ],
    answer: 0,
    explanation:
      'Plus is a decoy: it’s barely cheaper than Premium but has a tenth of the space, so Premium looks like an obvious deal next to it. More choice doesn’t reliably lift sign-ups; per Hick’s law it slows the decision.',
  },
  {
    id: 'ux-a-23',
    prompt: 'Someone types their number with spaces. Which field best follows Postel’s law?',
    options: [
      {
        label: 'Rejects the spaces',
        visual: <PhoneTile field={<M.Input label="Phone" value="020 7946 0958" error="Use digits only, no spaces" />} />,
      },
      {
        label: 'Demands one international format',
        visual: <PhoneTile field={<M.Input label="Phone" value="020 7946 0958" error="Format: +44XXXXXXXXXX" />} />,
      },
      {
        label: 'Accepts it and tidies it up',
        visual: <PhoneTile field={<M.Input label="Phone" value="020 7946 0958" success hint="Saved as +44 20 7946 0958" />} />,
      },
      {
        label: 'Stops typing at 11 characters',
        visual: <PhoneTile field={<M.Input label="Phone" value="020 7946 09" focus hint="11 characters max" />} />,
      },
    ],
    answer: 2,
    explanation:
      'Postel’s law: be liberal in what you accept and conservative in what you send. Let people type the number however they write it, then normalise it yourself instead of making them reformat it.',
  },
  {
    id: 'ux-a-24',
    prompt: 'Which column of amounts is easiest to compare at a glance?',
    options: [
      { label: 'Left-aligned', visual: <AmountsTile align="left" /> },
      { label: 'Centred', visual: <AmountsTile align="center" /> },
      {
        label: 'Right-aligned, with the decimals dropped where possible',
        visual: <AmountsTile align="right" amounts={['€1,204.5', '€89', '€12,430', '€7.25']} />,
      },
      { label: 'Right-aligned, always two decimals', visual: <AmountsTile align="right" /> },
    ],
    answer: 3,
    explanation:
      'Right-aligning numbers with the same number of decimals lines up units, tens and hundreds, so bigger amounts literally stick out further. Dropping decimals breaks that alignment, and left or centred columns make you read every digit.',
  },
]
