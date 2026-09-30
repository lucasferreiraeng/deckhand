import * as M from '../../components/mock'
import type { Tip } from '../../types'

export const intermediateTips: Tip[] = [
  {
    id: 'ux-tip-10',
    kind: 'curiosity',
    title: 'Two UX laws are older than the computer mouse',
    body: 'Fitts’s law comes from a 1954 paper by psychologist Paul Fitts, who timed people moving a stylus between targets. Hick’s law is really the Hick–Hyman law: William Hick (1952) and Ray Hyman (1953) measured how reaction time grows with the number of choices. Both were lab psychology long before anyone designed a screen.',
  },
  {
    id: 'ux-tip-11',
    kind: 'tip',
    title: 'Three response times worth remembering',
    body: 'Jakob Nielsen’s limits: about 0.1 s feels instant; up to about 1 s people notice the delay but keep their train of thought; around 10 s is the limit of attention. Past a second, show that something is happening; past 10 seconds, show real progress and time left.',
    visual: (
      <M.Panel width={30}>
        <M.Row gap={0.6} align="stretch">
          {[
            { t: '0.1 s', what: 'Feels instant', show: 'No indicator needed', color: '#2a9d68' },
            { t: '1 s', what: 'Flow stays intact', show: 'Subtle busy state', color: '#e79a16' },
            { t: '10 s', what: 'Attention drifts', show: 'Progress bar + time left', color: '#e5484d' },
          ].map((s) => (
            <M.Card key={s.t} flat pad={0.8} style={{ flex: 1, gap: '0.3em' }}>
              <M.Title size={1.5} style={{ color: s.color }}>
                {s.t}
              </M.Title>
              <M.Text weight={600} size={0.9}>
                {s.what}
              </M.Text>
              <M.Text muted size={0.8}>
                {s.show}
              </M.Text>
            </M.Card>
          ))}
        </M.Row>
      </M.Panel>
    ),
  },
  {
    id: 'ux-tip-12',
    kind: 'curiosity',
    title: 'The Doherty threshold: 400 milliseconds',
    body: 'In a 1982 IBM paper, Walter Doherty and Ahrvind Thadani argued that productivity rises sharply when a system responds in under about 400 ms, because people stop waiting for the computer and it keeps pace with them. When you can’t be that fast, fake a little speed: respond to the tap instantly and finish the work in the background.',
  },
  {
    id: 'ux-tip-13',
    kind: 'curiosity',
    title: 'The “three-click rule” is a myth',
    body: 'There’s no evidence that people give up after three clicks. When researchers looked, extra clicks didn’t make people quit more; confusing ones did. Aim for a path where every click clearly moves people closer to their goal, rather than counting clicks.',
  },
  {
    id: 'ux-tip-14',
    kind: 'tip',
    title: 'Long form? Add an error summary at the top',
    body: 'After a failed submit on a long form, show a summary at the top listing every problem, each one linking to its field, and move focus there. Keep the message next to each field too, so people can fix things wherever they land.',
    visual: (
      <M.Browser url="apply.example.org/visa" width={30}>
        <M.Stack pad={1.1} gap={0.8}>
          <M.Alert tone="danger" title="There are 2 problems with your application">
            <M.Stack gap={0.2} style={{ marginTop: '0.3em' }}>
              <M.Link>Enter your date of birth</M.Link>
              <M.Link>Choose when your trip starts</M.Link>
            </M.Stack>
          </M.Alert>
          <M.Input label="Full name" value="Priya Raman" />
          <M.Input label="Date of birth" placeholder="DD / MM / YYYY" error="Enter your date of birth" />
        </M.Stack>
      </M.Browser>
    ),
  },
  {
    id: 'ux-tip-15',
    kind: 'tip',
    title: 'Touch targets: size and spacing',
    body: 'Apple asks for tap targets of at least 44 × 44 pt; Material Design asks for 48 × 48 dp, with about 8 dp between them. The icon can stay small: pad its tappable area out to the minimum, and keep neighbors apart so a fat-fingered tap doesn’t hit the wrong one.',
    visual: (
      <M.Panel width={24} pad={2.2}>
        <M.Row gap={0} justify="center">
          <M.Measure label="48 dp" side="top">
            <M.IconButton icon="heart" variant="filled" size={4} />
          </M.Measure>
          <M.Measure label="8 dp" side="bottom">
            <M.Box style={{ width: '0.8em', height: '4em' }} />
          </M.Measure>
          <M.IconButton icon="chat" variant="filled" size={4} />
          <M.Box style={{ width: '0.8em' }} />
          <M.IconButton icon="share" variant="filled" size={4} />
          <M.Box style={{ width: '0.8em' }} />
          <M.IconButton icon="bookmark" variant="filled" size={4} />
        </M.Row>
      </M.Panel>
    ),
  },
  {
    id: 'ux-tip-16',
    kind: 'gotcha',
    title: 'A pretty prototype can hide usability problems',
    body: 'The aesthetic–usability effect: people perceive attractive interfaces as easier to use and forgive their small flaws. It was described in a 1995 study of ATM screens by Masaaki Kurosu and Kaori Kashimura. In usability tests, trust what people do more than what they say: “it’s lovely” can come right after three failed attempts.',
  },
  {
    id: 'ux-tip-17',
    kind: 'gotcha',
    title: 'Toasts vanish, so don’t put errors in them',
    body: 'A toast is for low-stakes news like “Saved”, ideally with an undo. Anything people must read or act on, like a declined card, belongs inline next to the thing it’s about, and should stay until it’s fixed.',
    visual: (
      <M.Phone>
        <M.AppBar title="Checkout" back />
        <M.Stack pad="0.2em 1.2em 6.5em" gap={0.8}>
          <M.Input label="Card number" value="•••• •••• •••• 4242" />
          <M.Button full>Pay $64.00</M.Button>
          <M.Note style={{ alignSelf: 'flex-end' }}>Gone in 4 seconds… then what?</M.Note>
        </M.Stack>
        <M.Box style={{ position: 'absolute', left: '0.8em', right: '0.8em', bottom: '1em' }}>
          <M.Toast tone="danger">Payment failed: card declined</M.Toast>
        </M.Box>
      </M.Phone>
    ),
  },
]
