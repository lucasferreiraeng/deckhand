import * as M from '../../components/mock'
import type { Tip } from '../../types'

const squintScreen = (
  <M.Panel width={13} pad={1}>
    <M.Title size={1.1}>Summer sale</M.Title>
    <M.Lines n={2} />
    <M.Img h={3.5} tone="sunset" />
    <M.Button size="sm" full>
      Shop the sale
    </M.Button>
    <M.Row justify="center">
      <M.Text muted size={0.8}>
        Terms apply
      </M.Text>
    </M.Row>
  </M.Panel>
)

export const beginnerTips: Tip[] = [
  {
    id: 'ux-tip-02',
    kind: 'curiosity',
    title: 'Who named “user experience”?',
    body: 'Don Norman is credited with coining the term. When he joined Apple in 1993 his title was User Experience Architect, and he has said he picked the phrase because “human interface” and “usability” felt too narrow for everything a person goes through with a product.',
  },
  {
    id: 'ux-tip-03',
    kind: 'tip',
    title: 'Try the squint test',
    body: 'Squint, or blur a screenshot, until you can’t read the words. Whatever still stands out is what people notice first. If that isn’t the main message or the main action, the hierarchy needs work.',
    visual: (
      <M.Row gap={1.6} align="center">
        {squintScreen}
        <M.Icon name="arrow" size={1.6} color="#6a7087" />
        <M.Box style={{ filter: 'blur(0.28em)' }}>{squintScreen}</M.Box>
      </M.Row>
    ),
  },
  {
    id: 'ux-tip-04',
    kind: 'curiosity',
    title: 'Norman doors',
    body: 'A door with a pull handle that you have to push is nicknamed a “Norman door”, after Don Norman, who wrote about badly signalled doors in The Design of Everyday Things (first published in 1988 as The Psychology of Everyday Things). If a door needs a PUSH sign, the design has already failed.',
    visual: (
      <M.Row gap={1.4} align="flex-end">
        <M.Box
          style={{
            position: 'relative',
            width: '8em',
            height: '13em',
            borderRadius: '0.3em',
            background: 'linear-gradient(180deg, #c89b6d, #a8794c)',
            boxShadow: '0 0 0 0.35em #5b4636, 0 12px 24px -12px rgb(0 0 0 / 0.5)',
          }}
        >
          <M.Box
            style={{
              position: 'absolute',
              top: '4.4em',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '0.2em 0.6em',
              borderRadius: '0.2em',
              background: '#fff',
              color: '#1b1f2e',
              fontWeight: 800,
              fontSize: '0.9em',
              letterSpacing: '0.08em',
            }}
          >
            PUSH
          </M.Box>
          <M.Box
            style={{
              position: 'absolute',
              top: '5.6em',
              right: '0.9em',
              width: '0.55em',
              height: '3.6em',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #d9dce4, #9aa0b4)',
              boxShadow: '0 2px 4px rgb(0 0 0 / 0.35)',
            }}
          />
        </M.Box>
        <M.Note>The handle says pull. The sign says push.</M.Note>
      </M.Row>
    ),
  },
  {
    id: 'ux-tip-05',
    kind: 'gotcha',
    title: 'There’s no hover on a touch screen',
    body: 'A tooltip that explains an icon only appears when a mouse rests on it. On phones and tablets nobody can hover, so the explanation never shows. Put the words on screen, next to the icon, instead.',
    visual: (
      <M.Row gap={1.6} align="flex-end">
        <M.Panel width={11} style={{ paddingTop: '3.3em' }}>
          <M.Box style={{ position: 'absolute', top: '0.8em', left: '0.7em' }}>
            <M.Tooltip>Add to reading list</M.Tooltip>
          </M.Box>
          <M.Row justify="space-around">
            <M.IconButton icon="bookmark" />
            <M.IconButton icon="share" />
            <M.IconButton icon="more" />
          </M.Row>
          <M.Cursor style={{ top: '4.4em', left: '2.9em' }} />
        </M.Panel>
        <M.Panel width={11} style={{ paddingTop: '3.3em' }}>
          <M.Box style={{ position: 'absolute', top: '1.1em', left: 0, right: 0 }}>
            <M.Text muted size={0.85} align="center">
              A tap shows nothing
            </M.Text>
          </M.Box>
          <M.Row justify="space-around">
            <M.IconButton icon="bookmark" />
            <M.IconButton icon="share" />
            <M.IconButton icon="more" />
          </M.Row>
          <M.Cursor kind="touch" style={{ top: '4.6em', left: '3.1em' }} />
        </M.Panel>
      </M.Row>
    ),
  },
  {
    id: 'ux-tip-06',
    kind: 'curiosity',
    title: 'The hamburger icon is older than the web',
    body: 'The three-line menu icon was designed by Norm Cox for the Xerox Star workstation, released in 1981. It stayed fairly obscure for decades, until mobile apps and responsive websites needed a small button for a hidden menu.',
    visual: (
      <M.Panel width={12} pad={1.4} style={{ alignItems: 'center' }}>
        <M.Icon name="menu" size={3.2} />
        <M.Text muted size={0.9}>
          Xerox Star, 1981
        </M.Text>
      </M.Panel>
    ),
  },
  {
    id: 'ux-tip-07',
    kind: 'gotcha',
    title: 'Lorem ipsum hides real problems',
    body: 'Placeholder text is always the perfect length. Real names, prices and translations aren’t, so layouts that looked fine start truncating or wrapping. Design with realistic content. (Lorem ipsum itself is scrambled Latin from Cicero’s De finibus bonorum et malorum.)',
    visual: (
      <M.Stack gap={1}>
        <M.Panel width={19} pad={0.4}>
          <M.ListItem avatar="Lorem" title="Lorem ipsum" subtitle="Dolor sit amet" chevron />
        </M.Panel>
        <M.Panel width={19} pad={0.4}>
          <M.ListItem
            avatar="Maria"
            title="Maria Fernanda de Albuquerque"
            subtitle="Rua Doutor Joaquim Nabuco, 1240"
            chevron
          />
        </M.Panel>
      </M.Stack>
    ),
  },
  {
    id: 'ux-tip-08',
    kind: 'tip',
    title: 'Echo the question in the button',
    body: 'If a dialog asks “Delete 3 files?”, label the button “Delete files”, not “OK” or “Yes”. People often skim the buttons before the text, and a button that repeats the action can be understood on its own.',
    visual: (
      <M.Panel width={19}>
        <M.Title size={1.1}>Delete 3 files?</M.Title>
        <M.Text muted>They’ll move to the bin for 30 days.</M.Text>
        <M.Row justify="flex-end" gap={0.5}>
          <M.Button variant="secondary" size="sm">
            Cancel
          </M.Button>
          <M.Button variant="danger" size="sm">
            Delete files
          </M.Button>
        </M.Row>
      </M.Panel>
    ),
  },
  {
    id: 'ux-tip-09',
    kind: 'curiosity',
    title: 'The mouse made its debut in 1968',
    body: 'On 9 December 1968 in San Francisco, Douglas Engelbart gave a 90-minute live demo of the computer mouse, hypertext links, on-screen windows, real-time collaborative editing and video calls. It was later nicknamed “the Mother of All Demos”.',
  },
]
