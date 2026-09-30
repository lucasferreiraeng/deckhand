import type { ReactNode } from 'react'
import * as M from '../../components/mock'
import type { Question } from '../../types'

/* ---------- Small helpers shared by several picture options ---------- */

const leaveDialog = (stay: string, leave: string) => (
  <M.Panel width={18}>
    <M.Title size={1.1}>Leave this page?</M.Title>
    <M.Text muted>Your edits to “Trip to Porto” haven’t been saved.</M.Text>
    <M.Row justify="flex-end" gap={0.5}>
      <M.Button variant="secondary" size="sm">
        {stay}
      </M.Button>
      <M.Button size="sm">{leave}</M.Button>
    </M.Row>
  </M.Panel>
)

const toolbarIcons = ['folder', 'bookmark', 'share', 'trash'] as const
const toolbarLabels = ['Move', 'Save', 'Share', 'Delete']

const studioText =
  'Our pottery studio is open Tuesday to Saturday. Bring your own clay or buy it here, and book a wheel at least a day ahead.'

const studioParagraph = (align: 'left' | 'center' | 'right', caps?: boolean) => (
  <M.Panel width={15}>
    <M.Title size={1.05} align={align}>
      {caps ? 'VISITING THE STUDIO' : 'Visiting the studio'}
    </M.Title>
    <M.Text size={0.9} align={align} style={caps ? { letterSpacing: '0.02em' } : undefined}>
      {caps ? studioText.toUpperCase() : studioText}
    </M.Text>
  </M.Panel>
)

const payPanel = (button: ReactNode) => (
  <M.Panel width={15}>
    <M.Row>
      <M.Text muted>Total</M.Text>
      <M.Spacer />
      <M.Text weight={700}>€48.00</M.Text>
    </M.Row>
    <M.Text size={0.85} muted>
      Visa ending 4417
    </M.Text>
    {button}
  </M.Panel>
)

const fitnessHome = (
  <M.Stack pad="0.2em 1em" gap={0.6}>
    <M.Card pad={0.8}>
      <M.Text weight={700}>Spin, 18:30</M.Text>
      <M.Lines n={2} />
    </M.Card>
    <M.Card pad={0.8}>
      <M.Text weight={700}>Yoga, 07:15</M.Text>
      <M.Lines n={2} />
    </M.Card>
  </M.Stack>
)

const fitnessTabs = [
  { icon: 'home' as const, label: 'Home' },
  { icon: 'calendar' as const, label: 'Classes' },
  { icon: 'chat' as const, label: 'Messages' },
  { icon: 'user' as const, label: 'Profile' },
]

export const beginner: Question[] = [
  {
    id: 'ux-b-01',
    prompt: 'Which button is the primary action on this screen?',
    visual: (
      <M.Phone>
        <M.AppBar title="Edit profile" back />
        <M.Stack pad="0.2em 1.2em 1.2em" gap={0.9}>
          <M.Input label="Display name" value="Sam Rivera" />
          <M.Input label="Bio" value="Designer in Lisbon" />
          <M.Stack gap={1.2} style={{ marginTop: '0.5em' }}>
            <M.Pin n="A" block>
              <M.Button variant="secondary" full>
                Cancel
              </M.Button>
            </M.Pin>
            <M.Pin n="B" block>
              <M.Button full>Save changes</M.Button>
            </M.Pin>
            <M.Row justify="center">
              <M.Pin n="C" at="right">
                <M.Button variant="link">Preview profile</M.Button>
              </M.Pin>
            </M.Row>
          </M.Stack>
        </M.Stack>
      </M.Phone>
    ),
    options: ['A, the outlined button', 'B, the filled button', 'C, the text link', 'None: they have equal weight'],
    answer: 1,
    explanation:
      'A solid fill carries the most visual weight, so the filled button reads as the main thing to do, wherever it sits. Outlined buttons and text links step down the hierarchy for secondary and minor actions.',
  },
  {
    id: 'ux-b-02',
    prompt: 'Which sign-up field is easiest to fill in correctly?',
    options: [
      {
        label: 'A visible label above the field, with a hint',
        visual: (
          <M.Panel width={15}>
            <M.Input label="Email" placeholder="you@example.com" hint="We’ll send a confirmation link." />
          </M.Panel>
        ),
      },
      {
        label: 'The placeholder as the only label',
        visual: (
          <M.Panel width={15}>
            <M.Input labelInside placeholder="Email address" />
          </M.Panel>
        ),
      },
      {
        label: 'A label that disappears once you type',
        visual: (
          <M.Panel width={15}>
            <M.Input labelInside value="sam@exa" focus />
          </M.Panel>
        ),
      },
      {
        label: 'An icon with no text label',
        visual: (
          <M.Panel width={15}>
            <M.Input icon="mail" />
          </M.Panel>
        ),
      },
    ],
    answer: 0,
    explanation:
      'A persistent label stays visible while you type and when you review the form. Placeholders vanish on input, are usually low contrast, and look like pre-filled values. An icon alone makes people guess.',
  },
  {
    id: 'ux-b-03',
    prompt: 'Which pair of buttons makes this choice clearest?',
    options: [
      { label: 'Buttons labelled Cancel and OK', visual: leaveDialog('Cancel', 'OK') },
      { label: 'Buttons labelled No and Yes', visual: leaveDialog('No', 'Yes') },
      { label: 'Buttons labelled Keep editing and Discard edits', visual: leaveDialog('Keep editing', 'Discard edits') },
      { label: 'Buttons labelled Back and Continue', visual: leaveDialog('Back', 'Continue') },
    ],
    answer: 2,
    explanation:
      'Specific verbs say exactly what each button will do, so people can choose without rereading the question. With “OK”, “Yes” or “Continue” you have to work out whether they mean “leave” or “stay”, and a wrong guess loses the edits.',
  },
  {
    id: 'ux-b-04',
    prompt: 'All four marked items can be tapped. Which one are people most likely to miss?',
    visual: (
      <M.Phone>
        <M.AppBar title="Casa Alfama" back actions={['share']} />
        <M.Stack pad="0 1.2em 1.2em" gap={0.7}>
          <M.Box style={{ position: 'relative' }}>
            <M.Img h={6.5} tone="sunset" />
            <M.Box style={{ position: 'absolute', top: '0.5em', right: '0.5em' }}>
              <M.Pin n="D" at="left">
                <M.IconButton icon="heart" variant="filled" size={2.2} />
              </M.Pin>
            </M.Box>
          </M.Box>
          <M.Title size={1.15}>Sunny flat in Alfama</M.Title>
          <M.Row gap={0.4}>
            <M.Rating value={5} />
            <M.Text weight={600}>4.8</M.Text>
          </M.Row>
          <M.Row>
            <M.Pin n="A" at="right">
              <M.Text muted>Read all 212 reviews</M.Text>
            </M.Pin>
          </M.Row>
          <M.Row>
            <M.Pin n="B" at="right">
              <M.Link>See cancellation policy</M.Link>
            </M.Pin>
          </M.Row>
          <M.Pin n="C" block>
            <M.Button full>Reserve · €96 a night</M.Button>
          </M.Pin>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'B, the underlined blue link',
      'C, the filled button',
      'A, the plain grey text',
      'D, the heart on the photo',
    ],
    answer: 2,
    explanation:
      'Grey text with no underline, colour or shape looks like a caption, so nothing signals that it can be tapped. The link, the button and the familiar heart icon all carry signifiers of being interactive.',
  },
  {
    id: 'ux-b-05',
    prompt: 'Which toolbar will first-time users understand fastest?',
    options: [
      {
        label: 'Icons only',
        visual: (
          <M.Panel width={17}>
            <M.Row justify="space-around">
              {toolbarIcons.map((icon) => (
                <M.IconButton key={icon} icon={icon} />
              ))}
            </M.Row>
          </M.Panel>
        ),
      },
      {
        label: 'Icons with a text label under each',
        visual: (
          <M.Panel width={17}>
            <M.Row justify="space-around">
              {toolbarIcons.map((icon, i) => (
                <M.Stack key={icon} gap={0.25} align="center">
                  <M.Icon name={icon} size={1.4} />
                  <M.Text size={0.8} weight={600}>
                    {toolbarLabels[i]}
                  </M.Text>
                </M.Stack>
              ))}
            </M.Row>
          </M.Panel>
        ),
      },
      {
        label: 'Icons only, with a tooltip on hover',
        visual: (
          <M.Panel width={17} style={{ paddingTop: '3.2em' }}>
            <M.Box style={{ position: 'absolute', top: '0.7em', left: '1.6em' }}>
              <M.Tooltip>Move to folder</M.Tooltip>
            </M.Box>
            <M.Row justify="space-around">
              {toolbarIcons.map((icon) => (
                <M.IconButton key={icon} icon={icon} />
              ))}
            </M.Row>
            <M.Cursor style={{ top: '4.3em', left: '3.2em' }} />
          </M.Panel>
        ),
      },
      {
        label: 'Larger icons in bright colours',
        visual: (
          <M.Panel width={17}>
            <M.Row justify="space-around">
              {toolbarIcons.map((icon, i) => (
                <M.Icon key={icon} name={icon} size={2} color={['#e79a16', '#3b5bfd', '#2a9d68', '#e5484d'][i]} />
              ))}
            </M.Row>
          </M.Panel>
        ),
      },
    ],
    answer: 1,
    explanation:
      'Few icons are universally understood, so a short text label removes the guessing. Tooltips only appear after people hover, which they have to think of doing, and there is no hover at all on a touch screen.',
  },
  {
    id: 'ux-b-06',
    prompt: 'Why does this form feel hard to scan?',
    visual: (
      <M.Panel width={20}>
        <M.Title size={1.1}>Delivery address</M.Title>
        <M.Stack gap={1.1}>
          <M.Text weight={600} size={0.9}>
            Street
          </M.Text>
          <M.Input value="14 Harbour Lane" />
          <M.Text weight={600} size={0.9}>
            City
          </M.Text>
          <M.Input value="Bristol" />
          <M.Text weight={600} size={0.9}>
            Postcode
          </M.Text>
          <M.Input value="BS1 5TY" />
        </M.Stack>
      </M.Panel>
    ),
    options: [
      'Each label is as close to the field above it as to its own field',
      'The labels are above the fields instead of beside them',
      'All the fields are the same width',
      'The labels are in bold',
    ],
    answer: 0,
    explanation:
      'We read things that sit close together as a group (the Gestalt principle of proximity). With even gaps everywhere, each label floats between two fields; tuck it right against its own field and leave more space before the next pair.',
  },
  {
    id: 'ux-b-07',
    prompt: 'Which event card looks the most orderly?',
    options: [
      {
        label: 'Title centred, date right-aligned, the rest left-aligned',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1.05} align="center">
              Jazz by the river
            </M.Title>
            <M.Text muted size={0.85} align="right">
              Sat 12 July · 19:00
            </M.Text>
            <M.Lines n={2} />
            <M.Row justify="center">
              <M.Button size="sm">Get tickets</M.Button>
            </M.Row>
          </M.Panel>
        ),
      },
      {
        label: 'Each element starts at a different indent',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1.05} style={{ paddingLeft: '0.8em' }}>
              Jazz by the river
            </M.Title>
            <M.Text muted size={0.85}>
              Sat 12 July · 19:00
            </M.Text>
            <M.Lines n={2} style={{ paddingLeft: '1.6em', width: 'auto' }} />
            <M.Row style={{ paddingLeft: '0.4em' }}>
              <M.Button size="sm">Get tickets</M.Button>
            </M.Row>
          </M.Panel>
        ),
      },
      {
        label: 'Everything lines up on one left edge',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1.05}>Jazz by the river</M.Title>
            <M.Text muted size={0.85}>
              Sat 12 July · 19:00
            </M.Text>
            <M.Lines n={2} />
            <M.Row>
              <M.Button size="sm">Get tickets</M.Button>
            </M.Row>
          </M.Panel>
        ),
      },
    ],
    answer: 2,
    explanation:
      'When elements share an edge, the eye follows one clean line from top to bottom and the card feels calm. Mixing alignments or indents creates ragged edges that make even the same content look messy.',
  },
  {
    id: 'ux-b-08',
    prompt: 'Which settings screen is easiest to scan?',
    options: [
      {
        label: 'Tight spacing everywhere',
        visual: (
          <M.Panel width={15} pad={0.6} style={{ gap: '0.2em' }}>
            <M.Text weight={700}>Notifications</M.Text>
            <M.Toggle on label="Email" />
            <M.Toggle label="Push" />
            <M.Text weight={700}>Privacy</M.Text>
            <M.Toggle on label="Private profile" />
            <M.Toggle label="Show online status" />
          </M.Panel>
        ),
      },
      {
        label: 'Small gaps within groups, bigger gaps between them',
        visual: (
          <M.Panel width={15}>
            <M.Stack gap={0.5}>
              <M.Text weight={700}>Notifications</M.Text>
              <M.Toggle on label="Email" />
              <M.Toggle label="Push" />
            </M.Stack>
            <M.Stack gap={0.5} style={{ marginTop: '0.9em' }}>
              <M.Text weight={700}>Privacy</M.Text>
              <M.Toggle on label="Private profile" />
              <M.Toggle label="Show online status" />
            </M.Stack>
          </M.Panel>
        ),
      },
      {
        label: 'The same generous gap everywhere',
        visual: (
          <M.Panel width={15} style={{ gap: '1.1em' }}>
            <M.Text weight={700}>Notifications</M.Text>
            <M.Toggle on label="Email" />
            <M.Toggle label="Push" />
            <M.Text weight={700}>Privacy</M.Text>
            <M.Toggle on label="Private profile" />
            <M.Toggle label="Show online status" />
          </M.Panel>
        ),
      },
    ],
    answer: 1,
    explanation:
      'Whitespace does more than let a screen breathe: varying it shows what belongs together. With the same gap everywhere, or none, the two sections blur into one long list.',
  },
  {
    id: 'ux-b-09',
    prompt: 'Everything on this recipe page looks the same. Which change would help most?',
    visual: (
      <M.Phone>
        <M.Stack pad="0.8em 1.4em 1.4em" gap={0.45}>
          <M.Text>Lemon drizzle cake</M.Text>
          <M.Text>Serves 8 · 1 hr 10 min</M.Text>
          <M.Text>Ingredients</M.Text>
          <M.Text>225 g soft butter</M.Text>
          <M.Text>225 g caster sugar</M.Text>
          <M.Text>4 eggs</M.Text>
          <M.Text>Zest of 1 lemon</M.Text>
          <M.Text>Method</M.Text>
          <M.Text>Heat the oven to 180 °C.</M.Text>
          <M.Text>Beat the butter and sugar until pale.</M.Text>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'Put every line in bold',
      'Centre all the text',
      'Change all the text to one brighter colour',
      'Make the title and section headings larger and bolder',
    ],
    answer: 3,
    explanation:
      'Hierarchy comes from contrast: the title and headings need more size or weight than the body so people can see the structure at a glance. Making everything bold, centred or brighter changes nothing, because it all still looks equally important.',
  },
  {
    id: 'ux-b-10',
    prompt: 'Which checkout footer makes the next step clearest?',
    options: [
      {
        label: 'Three filled buttons',
        visual: (
          <M.Panel width={15}>
            <M.Text weight={700}>Total £54.20</M.Text>
            <M.Button size="sm" full>
              Pay now
            </M.Button>
            <M.Button size="sm" full>
              Continue shopping
            </M.Button>
            <M.Button size="sm" full>
              Add a promo code
            </M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'Three text links',
        visual: (
          <M.Panel width={15}>
            <M.Text weight={700}>Total £54.20</M.Text>
            <M.Button variant="link">Pay now</M.Button>
            <M.Button variant="link">Continue shopping</M.Button>
            <M.Button variant="link">Add a promo code</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'Three filled buttons in different colours',
        visual: (
          <M.Panel width={15}>
            <M.Text weight={700}>Total £54.20</M.Text>
            <M.Button size="sm" full color="#2a9d68">
              Pay now
            </M.Button>
            <M.Button size="sm" full color="#e79a16">
              Continue shopping
            </M.Button>
            <M.Button size="sm" full color="#8b5cf6">
              Add a promo code
            </M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'One filled button, one outlined, one link',
        visual: (
          <M.Panel width={15}>
            <M.Text weight={700}>Total £54.20</M.Text>
            <M.Button size="sm" full>
              Pay now
            </M.Button>
            <M.Button size="sm" full variant="secondary">
              Continue shopping
            </M.Button>
            <M.Row justify="center">
              <M.Button variant="link">Add a promo code</M.Button>
            </M.Row>
          </M.Panel>
        ),
      },
    ],
    answer: 3,
    explanation:
      'One filled button marks the main action, and quieter styles step the others down. When every button shouts, whether in one colour or three, nothing stands out and people have to read them all to decide.',
  },
  {
    id: 'ux-b-11',
    prompt: 'The body text on this blog spans the whole window. What’s the main readability problem?',
    visual: (
      <M.Browser url="blog.example.com/slow-travel" width={34}>
        <M.Stack pad="1.4em 1.4em 1.8em" gap={1.8}>
          <M.Title size={1.3}>Slow travel across the Alps by train</M.Title>
          <M.Measure label="≈ 140 characters per line" side="top" block>
            <M.Lines widths={[100, 99, 100, 98, 100, 64]} size={0.45} />
          </M.Measure>
        </M.Stack>
      </M.Browser>
    ),
    options: [
      'Lines this long make it hard to find the start of the next one',
      'The paragraph needs a background colour',
      'The text should be justified to both edges',
      'There are too few lines in the paragraph',
    ],
    answer: 0,
    explanation:
      'On very long lines the eye struggles to track back to the start of the next line and tires quickly. A common guideline is roughly 45–75 characters per line, so cap the width of the text column even on a wide screen.',
  },
  {
    id: 'ux-b-12',
    prompt: 'Which way of setting this paragraph is easiest to read?',
    options: [
      { label: 'Centred paragraph', visual: studioParagraph('center') },
      { label: 'Right-aligned paragraph', visual: studioParagraph('right') },
      { label: 'Left-aligned paragraph', visual: studioParagraph('left') },
      { label: 'Left-aligned, in capital letters', visual: studioParagraph('left', true) },
    ],
    answer: 2,
    explanation:
      'In left-to-right languages, left-aligned text gives every line the same starting point, so the eye always knows where to return. Centred and right-aligned paragraphs make each line start somewhere new, and long runs of capitals are slower to read.',
  },
  {
    id: 'ux-b-13',
    prompt: 'Many people say they can’t read the delivery details. What’s the most likely cause?',
    visual: (
      <M.Phone>
        <M.AppBar title="Your order" back />
        <M.Stack pad="0 1.2em 1.4em" gap={0.8}>
          <M.Row gap={0.8}>
            <M.Img w={3.6} h={3.6} tone="forest" />
            <M.Stack gap={0.2} grow>
              <M.Text weight={700}>Monstera plant, large</M.Text>
              <M.Text muted size={0.9}>
                Order #40518
              </M.Text>
            </M.Stack>
          </M.Row>
          <M.Box style={{ background: '#eef0f4', borderRadius: '0.8em', padding: '0.9em 1em' }}>
            <M.Stack gap={0.35}>
              <M.Text weight={700}>Arriving Thursday</M.Text>
              <M.Text color="#b9bdc9" size={0.9}>
                Between 10:00 and 14:00. The courier will call 30 minutes before. Someone must be home to sign.
              </M.Text>
            </M.Stack>
          </M.Box>
          <M.Button variant="secondary" full icon="location">
            Track parcel
          </M.Button>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'The text is left-aligned',
      'Pale grey text on a light grey background',
      'The box has rounded corners',
      'The heading above it is bold',
    ],
    answer: 1,
    explanation:
      'Pale grey on light grey has very little contrast, so it fades away on dim screens, in sunlight and for anyone with weaker eyesight. Keep important text dark enough to stand clearly apart from its background.',
  },
  {
    id: 'ux-b-14',
    prompt: 'Money in is green and money out is red. What’s the problem with this list?',
    visual: (
      <M.Phone>
        <M.AppBar title="Activity" actions={['filter']} />
        <M.ListItem
          icon="file"
          title="Brightwave Ltd"
          subtitle="28 May"
          trailing={<M.Text weight={700} color="#2a9d68">£2,140.00</M.Text>}
        />
        <M.ListItem
          icon="cart"
          title="Green Street Grocer"
          subtitle="27 May"
          trailing={<M.Text weight={700} color="#e5484d">£64.30</M.Text>}
        />
        <M.ListItem
          icon="globe"
          title="Northline Rail"
          subtitle="26 May"
          trailing={<M.Text weight={700} color="#2a9d68">£18.50</M.Text>}
        />
        <M.ListItem
          icon="home"
          title="Harbour Lettings"
          subtitle="25 May"
          trailing={<M.Text weight={700} color="#e5484d">£950.00</M.Text>}
        />
        <M.Box style={{ height: '0.8em' }} />
      </M.Phone>
    ),
    options: [
      'Colour is the only clue, so some people can’t tell in from out',
      'Red and green are too bright for a banking app',
      'The amounts should be centred',
      'Green should be used for money out instead',
    ],
    answer: 0,
    explanation:
      'Red–green colour blindness is the most common kind, and colours also wash out in sunlight or greyscale. Add a second clue such as a + or − sign, an arrow or the words “in” and “out”, and keep the colour as a bonus.',
  },
  {
    id: 'ux-b-15',
    prompt: 'You tap Pay and the payment takes a few seconds. Which screen gives the best feedback meanwhile?',
    options: [
      {
        label: 'The button looks exactly the same',
        visual: payPanel(
          <M.Box style={{ position: 'relative' }}>
            <M.Button full>Pay €48.00</M.Button>
            <M.Cursor kind="hand" style={{ top: '35%', left: '80%' }} />
          </M.Box>,
        ),
      },
      {
        label: 'The button disappears',
        visual: payPanel(<M.Box style={{ height: '2.6em' }} />),
      },
      {
        label: 'The whole screen turns into a spinner',
        visual: (
          <M.Panel width={15} style={{ minHeight: '8.4em', alignItems: 'center', justifyContent: 'center' }}>
            <M.Spinner size={2.2} style={{ color: '#b4b8c7' }} />
          </M.Panel>
        ),
      },
      {
        label: 'The button shows a spinner and says it’s paying',
        visual: payPanel(
          <M.Button full loading>
            Paying…
          </M.Button>,
        ),
      },
    ],
    answer: 3,
    explanation:
      'Feedback right where you tapped confirms the tap worked and that something is happening, which also stops people tapping again and paying twice. A button that doesn’t change leaves people unsure, and a screen that vanishes hides what they were doing.',
  },
  {
    id: 'ux-b-16',
    prompt: 'Priya taps “Create account” and nothing happens. What’s the real problem?',
    visual: (
      <M.Phone>
        <M.AppBar title="Sign up" back />
        <M.Stack pad="0 1.2em 1.4em" gap={0.8}>
          <M.Input label="Name" value="Priya Nair" />
          <M.Input label="Email" value="priya.nair@example.com" />
          <M.Input label="Password" value="tulips-in-may" password />
          <M.Checkbox label="I agree to the terms of service" />
          <M.Box style={{ position: 'relative', marginTop: '0.4em' }}>
            <M.Button full disabled>
              Create account
            </M.Button>
            <M.Cursor kind="touch" style={{ top: '50%', left: '84%' }} />
          </M.Box>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'The password is hidden behind dots',
      'The button is at the bottom of the form',
      'The form asks for an email address',
      'The button is disabled and nothing says what’s missing',
    ],
    answer: 3,
    explanation:
      'A greyed-out button tells people “not yet” but not why, so they hunt for the problem. Say what’s still needed next to the button, or keep it enabled and, on tap, point to the unticked box.',
  },
  {
    id: 'ux-b-17',
    prompt: 'Which error message helps the most?',
    options: [
      {
        label: 'An error code with technical wording',
        visual: (
          <M.Panel width={15}>
            <M.Input label="Expiry date" value="03/24" error="Error 402: invalid exp_date" />
          </M.Panel>
        ),
      },
      {
        label: 'A two-word message',
        visual: (
          <M.Panel width={15}>
            <M.Input label="Expiry date" value="03/24" error="Invalid input" />
          </M.Panel>
        ),
      },
      {
        label: 'What happened and what to do next',
        visual: (
          <M.Panel width={15}>
            <M.Input label="Expiry date" value="03/24" error="This card has expired. Try another card." />
          </M.Panel>
        ),
      },
      {
        label: 'A general apology',
        visual: (
          <M.Panel width={15}>
            <M.Input label="Expiry date" value="03/24" error="Sorry, something went wrong." />
          </M.Panel>
        ),
      },
    ],
    answer: 2,
    explanation:
      'A helpful error says, in plain words, what went wrong and how to fix it. Codes and jargon mean nothing to most people, and “Invalid input” or “Something went wrong” leave them guessing what to change.',
  },
  {
    id: 'ux-b-18',
    prompt: 'Showing recent searches here puts which principle into practice?',
    visual: (
      <M.Phone>
        <M.Stack pad="0.6em 1.2em 0.4em" gap={0.9}>
          <M.Input icon="search" placeholder="Search recipes" focus />
          <M.Text muted size={0.85} weight={600}>
            RECENT
          </M.Text>
        </M.Stack>
        <M.ListItem icon="undo" title="Thai green curry" style={{ paddingBlock: '0.4em' }} />
        <M.ListItem icon="undo" title="Sourdough starter" style={{ paddingBlock: '0.4em' }} />
        <M.ListItem icon="undo" title="Vegan brownies" style={{ paddingBlock: '0.4em' }} />
        <M.Stack pad="0.6em 1.2em 1.4em" gap={0.6}>
          <M.Text muted size={0.85} weight={600}>
            POPULAR
          </M.Text>
          <M.Row gap={0.4} wrap>
            <M.Chip>Under 30 min</M.Chip>
            <M.Chip>Pasta</M.Chip>
            <M.Chip>Gluten-free</M.Chip>
          </M.Row>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'Visual hierarchy',
      'Recognition rather than recall',
      'Proximity',
      'Progressive disclosure',
    ],
    answer: 1,
    explanation:
      'Spotting a familiar option is much easier than remembering and retyping it. Recent searches, suggestions and visible menus let people recognise what they want instead of recalling it from memory.',
  },
  {
    id: 'ux-b-19',
    prompt: 'Both marked buttons save the settings in their card. What should change?',
    visual: (
      <M.Browser url="app.example.com/settings" width={34}>
        <M.Stack pad="1.2em 1.6em 1.6em" gap={1.1} style={{ background: 'var(--mk-surface)' }}>
          <M.Card>
            <M.Text weight={700}>Profile</M.Text>
            <M.Row gap={0.8}>
              <M.Input label="Name" value="Kofi Mensah" style={{ flex: 1 }} />
              <M.Input label="City" value="Accra" style={{ flex: 1 }} />
            </M.Row>
            <M.Row justify="flex-end">
              <M.Pin n="A" at="left">
                <M.Button size="sm">Save changes</M.Button>
              </M.Pin>
            </M.Row>
          </M.Card>
          <M.Card>
            <M.Text weight={700}>Notifications</M.Text>
            <M.Toggle on label="Weekly summary email" />
            <M.Row>
              <M.Pin n="B" at="right">
                <M.Button size="sm" variant="success">
                  Submit
                </M.Button>
              </M.Pin>
            </M.Row>
          </M.Card>
        </M.Stack>
      </M.Browser>
    ),
    options: [
      'Give both the same label, style and position',
      'Make button B bigger so it stands out more',
      'Nothing: different colours help tell the cards apart',
      'Swap them, so A says Submit and B says Save changes',
    ],
    answer: 0,
    explanation:
      'The same action should look and behave the same everywhere in a product. When it changes name, colour and place from card to card, people have to stop and wonder whether it does something different.',
  },
  {
    id: 'ux-b-20',
    prompt: 'Which statement best describes the difference between UX and UI?',
    options: [
      'UX is the mobile app, while UI is the website',
      'UX is the whole experience of using a product; UI is the screens and controls you interact with',
      'UX is about colours and fonts, while UI is about code',
      'They are two names for exactly the same thing',
    ],
    answer: 1,
    explanation:
      'User experience covers everything a person goes through with a product, from finding it to getting a task done and getting help. The user interface is one part of that: the visible screens, buttons and text. A beautiful UI can still be a poor experience.',
  },
  {
    id: 'ux-b-21',
    prompt: 'A new user opens Projects for the first time. Which screen helps them most?',
    options: [
      {
        label: 'A short “No data” message',
        visual: (
          <M.Panel width={15} style={{ minHeight: '11em' }}>
            <M.Title size={1.05}>Projects</M.Title>
            <M.Stack grow justify="center" align="center">
              <M.Text muted>No data</M.Text>
            </M.Stack>
          </M.Panel>
        ),
      },
      {
        label: 'Table headings with no rows',
        visual: (
          <M.Panel width={15} style={{ minHeight: '11em' }}>
            <M.Title size={1.05}>Projects</M.Title>
            <M.Row style={{ borderBottom: '1px solid var(--mk-line)', paddingBottom: '0.4em' }}>
              <M.Text size={0.8} weight={700} muted style={{ flex: 2 }}>
                NAME
              </M.Text>
              <M.Text size={0.8} weight={700} muted style={{ flex: 1 }}>
                OWNER
              </M.Text>
              <M.Text size={0.8} weight={700} muted style={{ flex: 1 }}>
                DUE
              </M.Text>
            </M.Row>
          </M.Panel>
        ),
      },
      {
        label: 'An explanation with a button to create one',
        visual: (
          <M.Panel width={15} style={{ minHeight: '11em' }}>
            <M.Title size={1.05}>Projects</M.Title>
            <M.Stack align="center" gap={0.45}>
              <M.Icon name="folder" size={2} color="var(--mk-primary)" />
              <M.Text weight={700}>No projects yet</M.Text>
              <M.Text muted size={0.85} align="center">
                Projects keep a team’s tasks and files together.
              </M.Text>
              <M.Button size="sm" icon="plus">
                Create a project
              </M.Button>
            </M.Stack>
          </M.Panel>
        ),
      },
      {
        label: 'A loading spinner',
        visual: (
          <M.Panel width={15} style={{ minHeight: '11em' }}>
            <M.Title size={1.05}>Projects</M.Title>
            <M.Stack grow justify="center" align="center">
              <M.Spinner style={{ color: 'var(--mk-primary)' }} />
            </M.Stack>
          </M.Panel>
        ),
      },
    ],
    answer: 2,
    explanation:
      'An empty screen is a chance to explain what belongs there and offer the first step. “No data” or bare table headings look broken, and a spinner suggests something is still coming when nothing is.',
  },
  {
    id: 'ux-b-22',
    prompt: 'This app has four main sections people switch between all day. Which navigation suits it best?',
    options: [
      {
        label: 'A menu icon in the top corner',
        visual: (
          <M.Phone height={21}>
            <M.Row pad="0.6em 1em" gap={0.8}>
              <M.Icon name="menu" size={1.3} />
              <M.Text weight={700}>Home</M.Text>
            </M.Row>
            {fitnessHome}
          </M.Phone>
        ),
      },
      {
        label: 'A bottom tab bar with icons and labels',
        visual: (
          <M.Phone height={21}>
            <M.Row pad="0.6em 1em">
              <M.Text weight={700}>Home</M.Text>
            </M.Row>
            {fitnessHome}
            <M.TabBar items={fitnessTabs} />
          </M.Phone>
        ),
      },
      {
        label: 'A bottom tab bar with icons only',
        visual: (
          <M.Phone height={21}>
            <M.Row pad="0.6em 1em">
              <M.Text weight={700}>Home</M.Text>
            </M.Row>
            {fitnessHome}
            <M.TabBar items={fitnessTabs} labels={false} />
          </M.Phone>
        ),
      },
    ],
    answer: 1,
    explanation:
      'A labelled tab bar keeps every main destination visible and one tap away, and shows where you are. A menu icon hides the sections, so people use them less, and icons without labels leave people guessing.',
  },
  {
    id: 'ux-b-23',
    prompt: 'Which of these actions most deserves an “Are you sure?” confirmation?',
    options: [
      'Archiving an email',
      'Marking a task as done',
      'Muting a group chat',
      'Permanently deleting a shared photo album',
    ],
    answer: 3,
    explanation:
      'Confirmations slow people down, so save them for actions that are serious and can’t be reversed, like wiping photos for everyone. Archiving, completing and muting are easy to undo, so just do them and offer a way back.',
  },
  {
    id: 'ux-b-24',
    prompt: 'After switching to dark mode, the marked heading is hard to read. Why?',
    visual: (
      <M.Phone dark>
        <M.AppBar title="Wallet" actions={['bell']} />
        <M.Stack pad="0 1.2em 1.4em" gap={0.9}>
          <M.Card pad={1}>
            <M.Text muted size={0.9}>
              Balance
            </M.Text>
            <M.Title size={1.7}>€3,482.10</M.Title>
          </M.Card>
          <M.Row>
            <M.Pin n="A" at="right">
              <M.Text weight={700} size={1.1} color="#2b2f3c">
                Recent payments
              </M.Text>
            </M.Pin>
          </M.Row>
          <M.Stack gap={0}>
            <M.ListItem icon="cart" title="Mercado Central" subtitle="Yesterday" style={{ paddingInline: 0 }} />
            <M.ListItem icon="globe" title="Skyline Airways" subtitle="Monday" style={{ paddingInline: 0 }} />
          </M.Stack>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'Headings should never be bold in dark mode',
      'Its colour was fixed for light mode, so it’s dark text on a dark background',
      'The heading is too large for a phone screen',
      'Dark mode always lowers contrast, so nothing can be done',
    ],
    answer: 1,
    explanation:
      'Dark mode swaps the colours, and any text colour hard-coded for a white background is left dark on dark. Use colours that switch with the theme, and check every screen in both modes.',
  },
]
