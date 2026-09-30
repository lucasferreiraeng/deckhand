import * as M from '../../components/mock'
import type { CSSProperties, ReactNode } from 'react'
import type { Question } from '../../types'

/* ---------- Small helpers built from the kit ---------- */

/** A place on a canvas, absolutely positioned. */
const At = ({ children, style }: { children: ReactNode; style: CSSProperties }) => (
  <M.Box style={{ position: 'absolute', ...style }}>{children}</M.Box>
)

/** An on-screen keyboard: rows of keys; `wide` keys stretch. */
function Keyboard({ rows, wide = [] }: { rows: string[][]; wide?: string[] }) {
  return (
    <M.Stack gap={0.3} pad={0.4} style={{ background: 'var(--mk-line)', borderRadius: '0.5em' }}>
      {rows.map((row, r) => (
        <M.Row key={r} gap={0.25}>
          {row.map((k, i) => (
            <M.Box
              key={i}
              style={{
                flex: wide.includes(k) ? 3 : 1,
                height: '2em',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '0.3em',
                background: k ? 'var(--mk-bg)' : 'transparent',
                boxShadow: k ? '0 1px 0 var(--mk-faint)' : undefined,
                fontSize: k.length > 1 ? '0.7em' : '0.85em',
                fontWeight: 600,
              }}
            >
              {k}
            </M.Box>
          ))}
        </M.Row>
      ))}
    </M.Stack>
  )
}

const CardField = () => <M.Input label="Card number" value="4929 18" focus />

/** A rule under a password field, not yet met. */
const Rule = ({ children }: { children: ReactNode }) => (
  <M.Row gap={0.35}>
    <M.Icon name="check" size={0.9} color="var(--mk-faint)" />
    <M.Text size={0.85} muted>
      {children}
    </M.Text>
  </M.Row>
)

/** A plan tile for pricing pages. */
const Plan = ({ name, price }: { name: string; price: string }) => (
  <M.Card flat pad={0.6} style={{ gap: '0.3em' }}>
    <M.Text weight={700} size={0.9}>
      {name}
    </M.Text>
    <M.Text size={0.8} muted>
      {price}
    </M.Text>
    <M.Button variant="secondary" size="sm">
      Choose
    </M.Button>
  </M.Card>
)

export const intermediate: Question[] = [
  {
    id: 'ux-i-01',
    prompt: 'Starting from the cursor, which button can you hit fastest?',
    visual: (
      <M.Browser url="canvas.example.com/board/42" width={30}>
        <M.Box style={{ position: 'relative', height: '14em', background: 'var(--mk-surface)' }}>
          <At style={{ left: '2.2em', top: '5.6em' }}>
            <M.Cursor style={{ position: 'static', display: 'block' }} />
          </At>
          <At style={{ left: '10em', top: '0.8em' }}>
            <M.Pin n="A" at="left">
              <M.IconButton icon="send" variant="primary" size={1.8} />
            </M.Pin>
          </At>
          <At style={{ right: '2em', bottom: '1.6em' }}>
            <M.Pin n="B">
              <M.Button size="lg">Publish</M.Button>
            </M.Pin>
          </At>
          <At style={{ left: '7.5em', top: '8.6em' }}>
            <M.Pin n="C">
              <M.Button size="lg">Publish</M.Button>
            </M.Pin>
          </At>
          <At style={{ right: '2.4em', top: '2em' }}>
            <M.Pin n="D" at="left">
              <M.IconButton icon="send" variant="primary" size={1.8} />
            </M.Pin>
          </At>
        </M.Box>
      </M.Browser>
    ),
    options: ['A, small and close', 'B, large and far', 'C, large and close', 'D, small and far'],
    answer: 2,
    explanation:
      'Fitts’s law: the time to reach a target grows with its distance and shrinks with its size. A and C are about as far from the cursor, but C is much bigger, so you can move fast without slowing down to aim.',
  },
  {
    id: 'ux-i-02',
    prompt: 'Why is a menu bar along the very top edge of the screen so quick to hit with a mouse?',
    visual: (
      <M.Panel width={30} pad={0} dark style={{ gap: 0 }}>
        <M.Row gap={1.2} pad="0.35em 0.9em" style={{ background: '#2b2f3c', fontSize: '0.9em' }}>
          <M.Icon name="grid" size={1} />
          <M.Text weight={700}>Notes</M.Text>
          <M.Text>File</M.Text>
          <M.Text>Edit</M.Text>
          <M.Text>View</M.Text>
          <M.Text>Window</M.Text>
          <M.Text>Help</M.Text>
        </M.Row>
        <M.Box
          style={{
            height: '11em',
            background: 'linear-gradient(160deg, #3b4a8a, #7a5ea8 60%, #c77d8e)',
            position: 'relative',
          }}
        >
          <At style={{ left: '12em', top: '2.4em', width: '14em' }}>
            <M.Card pad={0.8} style={{ gap: '0.4em' }}>
              <M.Text weight={700} size={0.9}>
                Shopping list
              </M.Text>
              <M.Lines n={3} />
            </M.Card>
          </At>
          <At style={{ left: '7.95em', top: '1.9em', height: '7em', borderLeft: '0.14em dashed rgb(255 255 255 / 0.7)' }}>
            {null}
          </At>
        </M.Box>
        <At style={{ left: '7.6em', top: '0.1em' }}>
          <M.Cursor style={{ position: 'static', display: 'block' }} />
        </At>
      </M.Panel>
    ),
    options: [
      'The cursor stops at the edge, so the target is effectively endlessly tall',
      'Menu text is drawn bolder than the rest of the screen',
      'People read from the top, so they notice it first',
      'Items at the top of the screen are rendered with more pixels',
    ],
    answer: 0,
    explanation:
      'You can fling the mouse upward without aiming: the edge catches the cursor, so under Fitts’s law the target behaves as if it had infinite depth. Corners are even better, since they catch the cursor in two directions.',
  },
  {
    id: 'ux-i-03',
    prompt: 'Which close button meets Apple’s minimum recommended touch target?',
    options: [
      {
        label: '20 × 20 pt',
        visual: (
          <M.Panel width={15}>
            <M.Row style={{ paddingRight: '1.4em' }}>
              <M.Title size={1.1}>Filters</M.Title>
              <M.Spacer />
              <M.Measure label="20 × 20 pt" side="bottom">
                <M.IconButton icon="close" variant="outline" size={1.6} />
              </M.Measure>
            </M.Row>
            <M.Lines n={2} style={{ marginTop: '1.6em' }} />
          </M.Panel>
        ),
      },
      {
        label: '28 × 28 pt',
        visual: (
          <M.Panel width={15}>
            <M.Row style={{ paddingRight: '1.4em' }}>
              <M.Title size={1.1}>Filters</M.Title>
              <M.Spacer />
              <M.Measure label="28 × 28 pt" side="bottom">
                <M.IconButton icon="close" variant="outline" size={2.2} />
              </M.Measure>
            </M.Row>
            <M.Lines n={2} style={{ marginTop: '1.6em' }} />
          </M.Panel>
        ),
      },
      {
        label: '36 × 36 pt',
        visual: (
          <M.Panel width={15}>
            <M.Row style={{ paddingRight: '1.4em' }}>
              <M.Title size={1.1}>Filters</M.Title>
              <M.Spacer />
              <M.Measure label="36 × 36 pt" side="bottom">
                <M.IconButton icon="close" variant="outline" size={2.8} />
              </M.Measure>
            </M.Row>
            <M.Lines n={2} style={{ marginTop: '1.6em' }} />
          </M.Panel>
        ),
      },
      {
        label: '44 × 44 pt',
        visual: (
          <M.Panel width={15}>
            <M.Row style={{ paddingRight: '1.4em' }}>
              <M.Title size={1.1}>Filters</M.Title>
              <M.Spacer />
              <M.Measure label="44 × 44 pt" side="bottom">
                <M.IconButton icon="close" variant="outline" size={3.4} />
              </M.Measure>
            </M.Row>
            <M.Lines n={2} style={{ marginTop: '1.6em' }} />
          </M.Panel>
        ),
      },
    ],
    answer: 3,
    explanation:
      'Apple’s Human Interface Guidelines ask for hit targets of at least 44 × 44 points (Material Design’s equivalent is 48 × 48 dp). The icon can be drawn smaller, as long as the tappable area around it reaches that size.',
  },
  {
    id: 'ux-i-04',
    prompt: 'Holding this big phone in one hand, which marked control is easiest to reach with your thumb?',
    visual: (
      <M.Phone>
        <M.Row pad="0.5em 1em">
          <M.Pin n="A" at="bottom-right">
            <M.IconButton icon="menu" />
          </M.Pin>
          <M.Spacer />
          <M.Pin n="C" at="right">
            <M.Title size={1.05}>Today</M.Title>
          </M.Pin>
          <M.Spacer />
          <M.Pin n="B" at="bottom-left">
            <M.IconButton icon="bell" />
          </M.Pin>
        </M.Row>
        <M.Stack pad="0.4em 1em 1.2em" gap={0.7}>
          <M.Card pad={0.9} style={{ gap: '0.3em' }}>
            <M.Text muted size={0.85}>
              This week
            </M.Text>
            <M.Title size={1.5}>18.4 km</M.Title>
            <M.Progress value={0.62} color="#2a9d68" />
          </M.Card>
          <M.ListItem icon="location" title="River loop" subtitle="Tue · 6.2 km · 34 min" style={{ padding: '0.4em 0' }} />
          <M.ListItem icon="location" title="Park intervals" subtitle="Thu · 5.0 km · 27 min" style={{ padding: '0.4em 0' }} />
          <M.ListItem icon="location" title="Harbor run" subtitle="Sat · 7.2 km · 41 min" style={{ padding: '0.4em 0' }} />
          <M.Row justify="center" style={{ marginTop: '0.8em' }}>
            <M.Pin n="D">
              <M.Button size="lg" icon="play" color="#2a9d68">
                Start run
              </M.Button>
            </M.Pin>
          </M.Row>
        </M.Stack>
      </M.Phone>
    ),
    options: ['A, the top-left corner', 'B, the top-right corner', 'C, the top center', 'D, the bottom center'],
    answer: 3,
    explanation:
      'Used one-handed, the thumb pivots from the bottom of the phone, so the lower middle of the screen is the comfortable zone. The top, especially the corner farthest from the thumb, needs a stretch or a change of grip. That’s why so many apps put main actions and tab bars at the bottom.',
  },
  {
    id: 'ux-i-05',
    prompt: 'Visitors take ages to pick a plan on this page. Which law predicts that?',
    visual: (
      <M.Browser url="cloudnest.example.com/pricing" width={32}>
        <M.Stack pad={1} gap={0.8}>
          <M.Title size={1.15} align="center">
            Choose your plan
          </M.Title>
          <M.Box style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5em' }}>
            <Plan name="Solo" price="$4 / month" />
            <Plan name="Solo Plus" price="$7 / month" />
            <Plan name="Starter" price="$9 / month" />
            <Plan name="Team" price="$15 / month" />
            <Plan name="Team Plus" price="$19 / month" />
            <Plan name="Growth" price="$29 / month" />
            <Plan name="Business" price="$49 / month" />
            <Plan name="Scale" price="$79 / month" />
            <Plan name="Enterprise" price="Contact us" />
          </M.Box>
        </M.Stack>
      </M.Browser>
    ),
    options: ['Fitts’s law', 'Hick’s law', 'Jakob’s law', 'The Doherty threshold'],
    answer: 1,
    explanation:
      'Hick’s law says decision time grows with the number (and similarity) of choices. Nine near-identical plans force a long comparison; three plans with one recommended would be much quicker. Fitts’s law is about reaching a target, not choosing one.',
  },
  {
    id: 'ux-i-06',
    prompt: 'A redesign puts the basket top left and the logo top right. Why will it trip shoppers up?',
    visual: (
      <M.Browser url="tallowandco.example" width={32}>
        <M.Row pad="0.7em 1em" style={{ borderBottom: '1px solid var(--mk-line)' }}>
          <M.Icon name="cart" size={1.2} />
          <M.Text weight={600}>Basket (2)</M.Text>
          <M.Spacer />
          <M.Text muted size={0.9}>
            Candles
          </M.Text>
          <M.Text muted size={0.9}>
            Soaps
          </M.Text>
          <M.Text muted size={0.9}>
            Gifts
          </M.Text>
          <M.Spacer />
          <M.Title size={1.1} style={{ fontFamily: 'Georgia, serif' }}>
            Tallow &amp; Co
          </M.Title>
        </M.Row>
        <M.Row pad={1} gap={0.8} align="flex-start">
          {[
            ['Fig & cedar candle', '$24', 'sand'],
            ['Oat milk soap', '$9', 'forest'],
            ['Winter gift box', '$48', 'sunset'],
          ].map(([name, price, tone]) => (
            <M.Stack key={name} gap={0.3} grow>
              <M.Img h={5} tone={tone as 'sand'} />
              <M.Text size={0.9} weight={600}>
                {name}
              </M.Text>
              <M.Text size={0.85} muted>
                {price}
              </M.Text>
            </M.Stack>
          ))}
        </M.Row>
      </M.Browser>
    ),
    options: [
      'People expect it to work like the other shops they use',
      'Icons placed on the left are physically harder to click',
      'A logo has to be the largest element in the header',
      'Right-aligned items are always read before left-aligned ones',
    ],
    answer: 0,
    explanation:
      'Jakob’s law: users spend most of their time on other sites, so they expect yours to follow the same conventions (logo top left, cart top right). Breaking a convention costs them time unless it brings a clear benefit.',
  },
  {
    id: 'ux-i-07',
    prompt: 'Why is the rule on this sticky note a misreading of Miller’s 7±2?',
    visual: (
      <M.Panel width={28} pad={1}>
        <M.Row align="flex-start" gap={1.2}>
          <M.SideNav
            active={1}
            items={[
              { icon: 'home', label: 'Home' },
              { icon: 'cart', label: 'Orders' },
              { icon: 'grid', label: 'Products' },
              { icon: 'user', label: 'Customers' },
              { icon: 'file', label: 'Reports' },
              { icon: 'star', label: 'Discounts' },
              { icon: 'settings', label: 'Settings' },
            ]}
            style={{ borderRadius: '0.7em' }}
          />
          <M.Note style={{ marginTop: '2em' }}>Team rule: menus can never have more than 7 items. Miller’s law!</M.Note>
        </M.Row>
      </M.Panel>
    ),
    options: [
      'Miller’s research was about reading speed, not memory',
      'The rule is sound: 7±2 is a proven limit for menus',
      'Miller studied short-term recall, and a visible menu needs no memorizing',
      'Miller’s findings only apply to text printed on paper',
    ],
    answer: 2,
    explanation:
      'Miller’s 1956 paper was about how much people can hold in short-term memory. A menu stays on screen, so people recognize items rather than recall them. Menu length should follow the content and how well it’s grouped, not a magic number.',
  },
  {
    id: 'ux-i-08',
    prompt: 'Why do the three highlighted chips read as one group, even though they aren’t next to each other?',
    visual: (
      <M.Panel width={24}>
        <M.Title size={1.1}>Recipes</M.Title>
        <M.Stack gap={0.45}>
          <M.Row gap={0.45}>
            <M.Chip>Under 30 min</M.Chip>
            <M.Chip on icon="check">
              Vegan
            </M.Chip>
            <M.Chip>Italian</M.Chip>
          </M.Row>
          <M.Row gap={0.45}>
            <M.Chip on icon="check">
              Spicy
            </M.Chip>
            <M.Chip>Budget</M.Chip>
            <M.Chip>Thai</M.Chip>
          </M.Row>
          <M.Row gap={0.45}>
            <M.Chip>Mexican</M.Chip>
            <M.Chip>Kid-friendly</M.Chip>
            <M.Chip on icon="check">
              Gluten-free
            </M.Chip>
          </M.Row>
        </M.Stack>
        <M.Divider />
        <M.ListItem icon="heart" title="Chili bean stew" subtitle="45 min · serves 4" style={{ padding: '0.2em 0' }} />
        <M.ListItem icon="heart" title="Sichuan tofu" subtitle="35 min · serves 2" style={{ padding: '0.2em 0' }} />
      </M.Panel>
    ),
    options: ['Proximity', 'Closure', 'Common region', 'Similarity'],
    answer: 3,
    explanation:
      'The Gestalt principle of similarity: things that share a color, shape or style are seen as related, wherever they sit. Proximity can’t explain it here, because the highlighted chips are spread among the others.',
  },
  {
    id: 'ux-i-09',
    prompt: 'What mainly makes each set of settings read as a separate group here?',
    visual: (
      <M.Phone>
        <M.AppBar title="Settings" back />
        <M.Stack pad="0.2em 1em 1.4em" gap={0.6} style={{ background: 'var(--mk-surface)', paddingTop: '0.8em' }}>
          <M.Card flat pad={0} style={{ gap: 0 }}>
            <M.Toggle label="Push notifications" on style={{ padding: '0.65em 0.9em' }} />
            <M.Toggle label="Email digest" style={{ padding: '0.65em 0.9em' }} />
            <M.Toggle label="Sounds" on style={{ padding: '0.65em 0.9em' }} />
          </M.Card>
          <M.Card flat pad={0} style={{ gap: 0 }}>
            <M.Toggle label="Dark mode" on style={{ padding: '0.65em 0.9em' }} />
            <M.Toggle label="Larger text" style={{ padding: '0.65em 0.9em' }} />
          </M.Card>
          <M.Card flat pad={0} style={{ gap: 0 }}>
            <M.Toggle label="Share usage data" style={{ padding: '0.65em 0.9em' }} />
          </M.Card>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'Similarity: all the toggles look alike',
      'Common region: each set sits inside its own card',
      'Closure: the eye completes each card’s outline',
      'Serial position: the first and last rows stand out',
    ],
    answer: 1,
    explanation:
      'Common region: elements inside a shared boundary or background are perceived as a group. Every toggle looks the same, so similarity can’t be what separates the sets; the cards do.',
  },
  {
    id: 'ux-i-10',
    prompt: 'The drop zone’s border is really a row of separate dashes. What makes you see one box anyway?',
    visual: (
      <M.Browser url="photos.example.com/upload" width={28}>
        <M.Stack pad={1.2} gap={0.9}>
          <M.Title size={1.1}>Upload photos</M.Title>
          <M.Box
            style={{
              border: '0.16em dashed var(--mk-muted)',
              borderRadius: '0.9em',
              padding: '1.6em 1em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4em',
            }}
          >
            <M.Icon name="upload" size={2} color="var(--mk-muted)" />
            <M.Text weight={600}>Drag photos here</M.Text>
            <M.Text muted size={0.9}>
              or <M.Link>browse your files</M.Link>
            </M.Text>
          </M.Box>
          <M.Row justify="flex-end">
            <M.Button disabled>Upload</M.Button>
          </M.Row>
        </M.Stack>
      </M.Browser>
    ),
    options: ['Closure', 'Common fate', 'Figure–ground', 'The von Restorff effect'],
    answer: 0,
    explanation:
      'Closure is the Gestalt tendency to fill in gaps and perceive incomplete shapes as whole. That’s why dashed outlines, dotted spinners and icons drawn with broken strokes still read as complete shapes. Common fate is about things that move together, and figure–ground about telling an object from its background.',
  },
  {
    id: 'ux-i-11',
    prompt: 'Which checkout layout do people usually complete fastest and with fewest mistakes?',
    options: [
      {
        label: 'Two columns',
        visual: (
          <M.Panel width={16}>
            <M.Title size={1}>Delivery</M.Title>
            <M.Row gap={0.5} align="flex-start">
              <M.Input label="Full name" placeholder="Ana Souza" style={{ flex: 1 }} />
              <M.Input label="Email" placeholder="ana@mail.com" style={{ flex: 1 }} />
            </M.Row>
            <M.Row gap={0.5} align="flex-start">
              <M.Input label="Phone" placeholder="555 0199" style={{ flex: 1 }} />
              <M.Input label="Address" placeholder="12 Elm St" style={{ flex: 1 }} />
            </M.Row>
            <M.Button full>Continue</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'Three across, one below',
        visual: (
          <M.Panel width={16}>
            <M.Title size={1}>Delivery</M.Title>
            <M.Row gap={0.4} align="flex-start">
              <M.Input label="Name" placeholder="Ana" style={{ flex: 1 }} />
              <M.Input label="Email" placeholder="ana@" style={{ flex: 1 }} />
              <M.Input label="Phone" placeholder="555" style={{ flex: 1 }} />
            </M.Row>
            <M.Input label="Address" placeholder="12 Elm St" />
            <M.Button full>Continue</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'One field per row',
        visual: (
          <M.Panel width={16} style={{ gap: '0.55em' }}>
            <M.Title size={1}>Delivery</M.Title>
            <M.Input label="Full name" placeholder="Ana Souza" />
            <M.Input label="Email" placeholder="ana@mail.com" />
            <M.Input label="Phone" placeholder="555 0199" />
            <M.Input label="Address" placeholder="12 Elm St" />
            <M.Button full>Continue</M.Button>
          </M.Panel>
        ),
      },
    ],
    answer: 2,
    explanation:
      'A single column gives one clear path straight down, so nobody zigzags or skips a field sitting off to the side. Multi-column forms are more often misread and filled in out of order.',
  },
  {
    id: 'ux-i-12',
    prompt: 'The person has typed two letters and is still typing. What’s wrong with this error?',
    visual: (
      <M.Phone>
        <M.AppBar title="Create account" back />
        <M.Stack pad="0.4em 1.2em 1.4em" gap={0.9}>
          <M.Input label="Email" value="ma" focus error="Enter a valid email address" />
          <M.Input label="Password" placeholder="At least 12 characters" password />
          <M.Checkbox label="Send me product news" />
          <M.Button full>Create account</M.Button>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'Errors should only appear after the whole form is submitted',
      'The message belongs in a pop-up dialog instead',
      'The message should sit above the label, not below',
      'It fires too early: check the field once they’ve finished it',
    ],
    answer: 3,
    explanation:
      'Flagging an error mid-word is premature: they haven’t made a mistake yet. Validate when they leave the field, then update live while they fix it. Inline validation itself is good; waiting until submit is worse.',
  },
  {
    id: 'ux-i-13',
    prompt: 'Which password field helps people get it right the first time?',
    options: [
      {
        label: 'A generic error after submitting',
        visual: (
          <M.Panel width={15}>
            <M.Input label="New password" value="summer24" password error="Invalid password" />
            <M.Button full>Save</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'Rules listed under the field before typing',
        visual: (
          <M.Panel width={15}>
            <M.Input label="New password" focus placeholder=" " />
            <M.Stack gap={0.25}>
              <Rule>At least 12 characters</Rule>
              <Rule>One number</Rule>
              <Rule>One symbol, like ! or #</Rule>
            </M.Stack>
            <M.Button full>Save</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'Rules hidden behind a help icon',
        visual: (
          <M.Panel width={15}>
            <M.Input
              label={
                <M.Row gap={0.3}>
                  New password <M.Icon name="help" size={1} color="var(--mk-muted)" />
                </M.Row>
              }
              focus
              placeholder=" "
            />
            <M.Button full>Save</M.Button>
          </M.Panel>
        ),
      },
      {
        label: 'No guidance at all',
        visual: (
          <M.Panel width={15}>
            <M.Input label="New password" focus placeholder=" " />
            <M.Button full>Save</M.Button>
          </M.Panel>
        ),
      },
    ],
    answer: 1,
    explanation:
      'Show the requirements before people type, ideally ticking each one off as it’s met. Otherwise they guess, fail, and have to decode what went wrong. Rules behind an icon are easy to miss.',
  },
  {
    id: 'ux-i-14',
    prompt: 'Which keyboard should open when someone taps the card number field?',
    options: [
      {
        label: 'Number pad',
        visual: (
          <M.Panel width={15} pad={0.9}>
            <CardField />
            <Keyboard
              rows={[
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['', '0', '⌫'],
              ]}
            />
          </M.Panel>
        ),
      },
      {
        label: 'Letter keyboard',
        visual: (
          <M.Panel width={15} pad={0.9}>
            <CardField />
            <Keyboard
              wide={['space']}
              rows={[
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                ['↑', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
                ['123', 'space', 'go'],
              ]}
            />
          </M.Panel>
        ),
      },
      {
        label: 'Email keyboard',
        visual: (
          <M.Panel width={15} pad={0.9}>
            <CardField />
            <Keyboard
              wide={['space']}
              rows={[
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                ['↑', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
                ['123', '@', 'space', '.', 'go'],
              ]}
            />
          </M.Panel>
        ),
      },
      {
        label: 'Symbols keyboard',
        visual: (
          <M.Panel width={15} pad={0.9}>
            <CardField />
            <Keyboard
              wide={['space']}
              rows={[
                ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
                ['_', '\\', '|', '~', '<', '>', '€', '£', '¥'],
                ['.', ',', '?', '!', '’', '"', '⌫'],
                ['ABC', 'space', 'go'],
              ]}
            />
          </M.Panel>
        ),
      },
    ],
    answer: 0,
    explanation:
      'Match the keyboard to the data: digits get a number pad, emails get the @ keyboard, phone numbers get the dial pad. On the web you pick it with the input’s `type` and `inputmode` (for a card number, `inputmode="numeric"`).',
  },
  {
    id: 'ux-i-15',
    prompt: 'Someone made a typo in their phone number and pressed Book. This came back. What’s the biggest problem?',
    visual: (
      <M.Phone>
        <M.AppBar title="Osteria Lume · Fri 8 pm" back />
        <M.Stack pad="0.2em 1.2em 1.4em" gap={0.75}>
          <M.Alert tone="danger" title="We couldn’t book your table">
            Check your phone number: it looks one digit short.
          </M.Alert>
          <M.Input label="Name" placeholder="Full name" />
          <M.Input label="Email" placeholder="you@example.com" />
          <M.Input label="Phone" placeholder="(555) 000-0000" error="Enter all 10 digits" />
          <M.Button full>Book table</M.Button>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'The error is repeated at the top and by the field',
      'The error message is written in plain language',
      'Everything they typed has been wiped',
      'The button label names the action, “Book table”',
    ],
    answer: 2,
    explanation:
      'Never clear what people typed when a submission fails: keep every value and highlight only what needs fixing. The top summary plus a message by the field is good practice, not a problem.',
  },
  {
    id: 'ux-i-16',
    prompt: 'Which control fits switching the same results between a list and a map?',
    options: [
      {
        label: 'Two checkboxes',
        visual: (
          <M.Panel width={15} style={{ height: '14em' }}>
            <M.Title size={1}>Coffee near you</M.Title>
            <M.Row gap={1.2}>
              <M.Checkbox label="List" />
              <M.Checkbox label="Map" checked />
            </M.Row>
            <M.ListItem icon="location" title="Grão Café" subtitle="0.3 km" style={{ padding: 0 }} />
            <M.ListItem icon="location" title="Bean There" subtitle="0.5 km" style={{ padding: 0 }} />
          </M.Panel>
        ),
      },
      {
        label: 'A two-part segmented control',
        visual: (
          <M.Panel width={15} style={{ height: '14em' }}>
            <M.Title size={1}>Coffee near you</M.Title>
            <M.Segmented items={['List', 'Map']} />
            <M.ListItem icon="location" title="Grão Café" subtitle="0.3 km" style={{ padding: 0 }} />
            <M.ListItem icon="location" title="Bean There" subtitle="0.5 km" style={{ padding: 0 }} />
          </M.Panel>
        ),
      },
      {
        label: 'List and Map added to the app’s tab bar',
        visual: (
          <M.Panel width={15} pad={0} style={{ height: '14em', gap: '0.6em' }}>
            <M.Stack pad="1.2em 1.2em 0" gap={0.6}>
              <M.Title size={1}>Coffee near you</M.Title>
              <M.ListItem icon="location" title="Grão Café" subtitle="0.3 km" style={{ padding: 0 }} />
              <M.ListItem icon="location" title="Bean There" subtitle="0.5 km" style={{ padding: 0 }} />
            </M.Stack>
            <M.TabBar
              active={1}
              items={[
                { icon: 'home', label: 'Home' },
                { icon: 'list', label: 'List' },
                { icon: 'location', label: 'Map' },
                { icon: 'user', label: 'Profile' },
              ]}
            />
          </M.Panel>
        ),
      },
    ],
    answer: 1,
    explanation:
      'A segmented control switches between mutually exclusive views of the same content, and shows both choices at once. Checkboxes allow “both” or “neither”, and a tab bar is for moving between the app’s main sections, not for changing how one screen is displayed.',
  },
  {
    id: 'ux-i-17',
    prompt: 'What’s the name for tucking rarely used options behind “Advanced settings” like this?',
    visual: (
      <M.Phone>
        <M.AppBar title="Export video" back />
        <M.Stack pad="0.2em 1.2em 1.4em" gap={0.8}>
          <M.Img h={6} tone="dusk" label="Summer in Porto.mov" />
          <M.Select label="Resolution" value="1080p" />
          <M.Select label="Format" value="MP4" />
          <M.Row pad="0.6em 0" style={{ borderBlock: '1px solid var(--mk-line)' }}>
            <M.Icon name="settings" size={1.1} color="var(--mk-muted)" />
            <M.Text weight={600}>Advanced settings</M.Text>
            <M.Spacer />
            <M.Icon name="down" size={1.1} color="var(--mk-muted)" />
          </M.Row>
          <M.Button full icon="download">
            Export
          </M.Button>
        </M.Stack>
      </M.Phone>
    ),
    options: ['Lazy loading', 'Chunking', 'Information scent', 'Progressive disclosure'],
    answer: 3,
    explanation:
      'Progressive disclosure shows the essentials first and reveals advanced options on request. Most people export with the defaults and never face bitrate or codec choices; experts are one tap away from them.',
  },
  {
    id: 'ux-i-18',
    prompt: 'Someone lands on this page straight from a search engine. What does the marked row help them do?',
    visual: (
      <M.Browser url="trailgear.example/tents/2-person/ridge-2" width={32}>
        <M.Stack pad="1em 1.4em 1.4em" gap={1}>
          <M.Row>
            <M.Pin n="A" at="right">
              <M.Breadcrumbs items={['Home', 'Outdoor', 'Tents', '2-person tents']} />
            </M.Pin>
          </M.Row>
          <M.Row gap={1.2} align="flex-start">
            <M.Img h={7.5} w={10} tone="forest" />
            <M.Stack gap={0.5} grow>
              <M.Title size={1.2}>Ridge 2 tent</M.Title>
              <M.Row gap={0.4}>
                <M.Rating value={4} />
                <M.Text muted size={0.85}>
                  86 reviews
                </M.Text>
              </M.Row>
              <M.Text weight={700} size={1.1}>
                €189
              </M.Text>
              <M.Button size="sm" icon="cart" style={{ alignSelf: 'flex-start' }}>
                Add to basket
              </M.Button>
            </M.Stack>
          </M.Row>
        </M.Stack>
      </M.Browser>
    ),
    options: [
      'See where the page sits and jump up to a broader category',
      'Retrace the exact pages they visited before this one',
      'Filter the products on this page by category',
      'Save the page so they can find it again later',
    ],
    answer: 0,
    explanation:
      'Breadcrumbs show where a page sits in the site’s hierarchy and link to every level above it. They show location, not browsing history, which is why they help most when someone arrives deep in a site straight from search.',
  },
  {
    id: 'ux-i-19',
    prompt: 'A feed takes about two seconds to load. Which placeholder makes the wait feel shortest?',
    options: [
      {
        label: 'Grey blocks in the shape of the posts',
        visual: (
          <M.Panel width={15} style={{ height: '14em' }}>
            {[0, 1].map((i) => (
              <M.Stack key={i} gap={0.45}>
                <M.Row gap={0.5}>
                  <M.Skeleton w={2} h={2} round />
                  <M.Stack gap={0.3} grow>
                    <M.Skeleton w="60%" h={0.6} />
                    <M.Skeleton w="35%" h={0.6} />
                  </M.Stack>
                </M.Row>
                <M.Skeleton h={3.2} />
              </M.Stack>
            ))}
          </M.Panel>
        ),
      },
      {
        label: 'A centered spinner',
        visual: (
          <M.Panel width={15} style={{ height: '14em' }}>
            <M.Stack grow justify="center" align="center">
              <M.Spinner size={2.2} style={{ color: 'var(--mk-primary)' }} />
            </M.Stack>
          </M.Panel>
        ),
      },
      {
        label: 'A blank screen',
        visual: <M.Panel width={15} style={{ height: '14em' }} />,
      },
      {
        label: 'The word “Loading…”',
        visual: (
          <M.Panel width={15} style={{ height: '14em' }}>
            <M.Text muted>Loading…</M.Text>
          </M.Panel>
        ),
      },
    ],
    answer: 0,
    explanation:
      'A skeleton screen previews the layout, so the page seems to be arriving already and nothing jumps when content fills in. A lone spinner only says “wait”, which draws attention to the waiting itself.',
  },
  {
    id: 'ux-i-20',
    prompt: 'Exporting takes about 30 seconds. Which feedback fits best?',
    options: [
      {
        label: 'A spinner with “Exporting…”',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1}>Export photos</M.Title>
            <M.Text muted size={0.85}>
              240 photos · JPEG
            </M.Text>
            <M.Row gap={0.5} style={{ marginTop: '0.4em' }}>
              <M.Spinner size={1.3} style={{ color: 'var(--mk-primary)' }} />
              <M.Text>Exporting…</M.Text>
            </M.Row>
          </M.Panel>
        ),
      },
      {
        label: 'A progress bar with a count and time left',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1}>Export photos</M.Title>
            <M.Text muted size={0.85}>
              240 photos · JPEG
            </M.Text>
            <M.Progress value={0.6} style={{ marginTop: '0.4em' }} />
            <M.Row>
              <M.Text size={0.85}>142 of 240</M.Text>
              <M.Spacer />
              <M.Text size={0.85} muted>
                About 20 s left
              </M.Text>
            </M.Row>
          </M.Panel>
        ),
      },
      {
        label: 'A greyed-out Export button',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1}>Export photos</M.Title>
            <M.Text muted size={0.85}>
              240 photos · JPEG
            </M.Text>
            <M.Button full disabled icon="download" style={{ marginTop: '0.4em' }}>
              Export
            </M.Button>
          </M.Panel>
        ),
      },
    ],
    answer: 1,
    explanation:
      'Past about 10 seconds people’s attention drifts, so show how far along the task is and roughly how long is left; then they can decide to wait or switch tasks. A spinner is fine for a few seconds but gives no sense of progress.',
  },
  {
    id: 'ux-i-21',
    prompt: 'Which confirmation makes it clearest what you’re agreeing to?',
    options: [
      {
        label: '“Yes” and “No”',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1}>Delete 3 files?</M.Title>
            <M.Text muted size={0.85}>
              They’ll be removed from all your devices.
            </M.Text>
            <M.Stack gap={0.4}>
              <M.Button full>Yes</M.Button>
              <M.Button full variant="secondary">
                No
              </M.Button>
            </M.Stack>
          </M.Panel>
        ),
      },
      {
        label: '“OK” and “Cancel”',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1}>Delete 3 files?</M.Title>
            <M.Text muted size={0.85}>
              They’ll be removed from all your devices.
            </M.Text>
            <M.Stack gap={0.4}>
              <M.Button full variant="danger">
                OK
              </M.Button>
              <M.Button full variant="secondary">
                Cancel
              </M.Button>
            </M.Stack>
          </M.Panel>
        ),
      },
      {
        label: '“Continue” and “Go back”',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1}>Delete 3 files?</M.Title>
            <M.Text muted size={0.85}>
              They’ll be removed from all your devices.
            </M.Text>
            <M.Stack gap={0.4}>
              <M.Button full>Continue</M.Button>
              <M.Button full variant="secondary">
                Go back
              </M.Button>
            </M.Stack>
          </M.Panel>
        ),
      },
      {
        label: '“Delete 3 files” and “Cancel”',
        visual: (
          <M.Panel width={15}>
            <M.Title size={1}>Delete 3 files?</M.Title>
            <M.Text muted size={0.85}>
              They’ll be removed from all your devices.
            </M.Text>
            <M.Stack gap={0.4}>
              <M.Button full variant="danger" icon="trash">
                Delete 3 files
              </M.Button>
              <M.Button full variant="secondary">
                Cancel
              </M.Button>
            </M.Stack>
          </M.Panel>
        ),
      },
    ],
    answer: 3,
    explanation:
      'Label the button with the specific action. “Delete 3 files” still makes sense if someone skips the question, while “Yes”, “OK” and “Continue” only mean something after reading the title carefully, which people often don’t.',
  },
  {
    id: 'ux-i-22',
    prompt: 'This sign-up flow has no back button, no close and no skip. Which of Nielsen’s heuristics does it break?',
    visual: (
      <M.Phone>
        <M.Stack pad="1em 1.2em 1.4em" gap={1}>
          <M.Stepper steps={['Profile', 'Goals', 'Plan', 'Pay', 'Done']} current={2} />
          <M.Title size={1.3}>Pick your plan</M.Title>
          <M.Card flat pad={0.9}>
            <M.Radio label="Monthly · $9.99" />
          </M.Card>
          <M.Card flat pad={0.9} style={{ boxShadow: '0 0 0 2px var(--mk-primary)' }}>
            <M.Radio checked label="Yearly · $79.99" />
            <M.Badge style={{ '--tone': 'var(--mk-success)' } as CSSProperties}>Save 33%</M.Badge>
          </M.Card>
          <M.Button full size="lg" style={{ marginTop: '0.6em' }}>
            Continue
          </M.Button>
        </M.Stack>
      </M.Phone>
    ),
    options: [
      'User control and freedom',
      'Visibility of system status',
      'Aesthetic and minimalist design',
      'Recognition rather than recall',
    ],
    answer: 0,
    explanation:
      'User control and freedom asks for clearly marked exits: people take wrong turns and need to go back or leave without penalty. Status is actually well covered here, since the stepper shows exactly where you are.',
  },
  {
    id: 'ux-i-23',
    prompt: 'A home cooking app shows this dialog when you save a recipe. Which heuristic does it break?',
    visual: (
      <M.Phone>
        <M.AppBar title="Lemon ricotta pancakes" back actions={['share']} />
        <M.Stack pad="0.2em 1.2em 1.4em" gap={0.7}>
          <M.Img h={8} tone="sand" />
          <M.Lines n={4} />
          <M.Lines n={3} />
          <M.Button full icon="bookmark">
            Save recipe
          </M.Button>
        </M.Stack>
        <M.Modal
          title="Persist entity?"
          actions={
            <>
              <M.Button variant="secondary" size="sm">
                Abort
              </M.Button>
              <M.Button size="sm">Commit</M.Button>
            </>
          }
        >
          <M.Text muted size={0.9}>
            The Recipe object will be serialized and written to the remote store.
          </M.Text>
        </M.Modal>
      </M.Phone>
    ),
    options: [
      'Error prevention',
      'Flexibility and efficiency of use',
      'Match between the system and the real world',
      'Help and documentation',
    ],
    answer: 2,
    explanation:
      'The dialog speaks the developers’ language (“persist”, “entity”, “serialized”) instead of the cook’s. Match between the system and the real world means using words and concepts familiar to users: “Save this recipe?”, or better, just save it.',
  },
  {
    id: 'ux-i-24',
    prompt: 'Why does the middle plan grab attention and stick in memory?',
    visual: (
      <M.Browser url="pixelpost.example.com/pricing" width={32}>
        <M.Row pad="1.2em 1em" gap={0.7} align="stretch">
          {[
            { name: 'Basic', price: '$0', lines: [80, 60] },
            { name: 'Pro', price: '$12', lines: [80, 70, 55], pop: true },
            { name: 'Studio', price: '$29', lines: [80, 65, 50] },
          ].map((p) => (
            <M.Card
              key={p.name}
              pad={0.9}
              style={{
                flex: 1,
                boxShadow: p.pop ? '0 0 0 2px var(--mk-primary), 0 10px 22px -10px rgb(59 91 253 / 0.6)' : undefined,
              }}
            >
              {p.pop ? <M.Badge style={{ '--tone': 'var(--mk-primary)' } as CSSProperties}>Most popular</M.Badge> : <M.Box style={{ height: '1.2em' }} />}
              <M.Text weight={700}>{p.name}</M.Text>
              <M.Title size={1.4}>
                {p.price}
                <M.Text muted size={0.5} style={{ display: 'inline' }}>
                  {' '}
                  / month
                </M.Text>
              </M.Title>
              <M.Lines widths={p.lines} />
              <M.Spacer />
              <M.Button size="sm" full variant={p.pop ? 'primary' : 'secondary'}>
                Choose
              </M.Button>
            </M.Card>
          ))}
        </M.Row>
      </M.Browser>
    ),
    options: ['The serial position effect', 'The von Restorff effect', 'Hick’s law', 'Jakob’s law'],
    answer: 1,
    explanation:
      'The von Restorff (isolation) effect: the one item that differs from its neighbors is the one people notice and remember. It only works if you use it sparingly; highlight everything and nothing stands out.',
  },
]
