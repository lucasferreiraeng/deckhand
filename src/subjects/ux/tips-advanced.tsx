import * as M from '../../components/mock'
import type { Tip } from '../../types'

export const advancedTips: Tip[] = [
  {
    id: 'ux-tip-18',
    kind: 'curiosity',
    title: 'Where “dark patterns” got their name',
    body: 'UX designer Harry Brignull coined the term “dark patterns” in 2010 for interfaces built to trick people into things they didn’t mean to do. He has since switched to “deceptive patterns”. This one is “sneak into basket”: an extra you never chose, added for you.',
    visual: (
      <M.Phone height={24}>
        <M.AppBar title="Your booking" back />
        <M.Stack pad="0 1.2em" gap={0.7}>
          <M.Row>
            <M.Text>Flight LIS → BCN</M.Text>
            <M.Spacer />
            <M.Text weight={600}>€84.00</M.Text>
          </M.Row>
          <M.Row>
            <M.Checkbox checked label="Travel insurance" />
            <M.Spacer />
            <M.Text weight={600}>€12.99</M.Text>
          </M.Row>
          <M.Divider />
          <M.Row>
            <M.Text weight={700}>Total</M.Text>
            <M.Spacer />
            <M.Text weight={700}>€96.99</M.Text>
          </M.Row>
          <M.Row justify="flex-end">
            <M.Note>I never added this!</M.Note>
          </M.Row>
          <M.Button full>Pay now</M.Button>
        </M.Stack>
      </M.Phone>
    ),
  },
  {
    id: 'ux-tip-19',
    kind: 'curiosity',
    title: 'The SUS is from 1986, and 68 is average',
    body: 'John Brooke created the System Usability Scale in 1986 as a “quick and dirty” questionnaire: ten statements, each rated 1 to 5. The score runs from 0 to 100 but isn’t a percentage. Across many studies the average lands around 68, so a 72 is only a little above typical.',
    visual: (
      <M.Panel width={24} pad={1.4}>
        <M.Row>
          <M.Text weight={700}>SUS score · Recipe app</M.Text>
          <M.Spacer />
          <M.Title size={1.6}>72</M.Title>
        </M.Row>
        <M.Box style={{ position: 'relative', marginTop: '1.4em' }}>
          <M.Progress value={0.72} />
          <M.Box style={{ position: 'absolute', left: '68%', top: '-1.5em', bottom: '-0.4em', borderLeft: '2px dashed #1b1f2e' }} />
          <M.Text size={0.75} weight={700} style={{ position: 'absolute', right: 'calc(32% + 0.5em)', top: '-1.75em' }}>
            Average ≈ 68
          </M.Text>
        </M.Box>
        <M.Row>
          <M.Text size={0.75} muted>
            0
          </M.Text>
          <M.Spacer />
          <M.Text size={0.75} muted>
            100
          </M.Text>
        </M.Row>
      </M.Panel>
    ),
  },
  {
    id: 'ux-tip-20',
    kind: 'gotcha',
    title: 'Mirror the layout for RTL, not everything in it',
    body: 'For Arabic or Hebrew, flip the layout and anything that points a direction, like back arrows and chevrons. But numbers such as phone numbers still read left to right, and media playback controls and logos usually stay as they are.',
    visual: (
      <M.Stack gap={0.9}>
        <M.Panel width={22} pad={0.6} style={{ gap: '0.2em' }}>
          <M.Badge style={{ marginLeft: '1em' }}>Left to right</M.Badge>
          <M.ListItem avatar="Karim" title="Karim Haddad" subtitle="+44 20 7946 0321" chevron />
        </M.Panel>
        <M.Panel width={22} pad={0.6} style={{ direction: 'rtl', textAlign: 'start', gap: '0.2em' }}>
          <M.Badge style={{ marginRight: '1em' }}>Mirrored for right to left</M.Badge>
          <M.ListItem
            avatar="Karim"
            title="Karim Haddad"
            subtitle={<M.Box style={{ direction: 'ltr', display: 'inline-block' }}>+44 20 7946 0321</M.Box>}
            trailing={<M.Icon name="back" color="#b4b8c7" />}
          />
        </M.Panel>
      </M.Stack>
    ),
  },
  {
    id: 'ux-tip-21',
    kind: 'tip',
    title: 'Optimistic UI needs a way back',
    body: 'Showing a like or a sent message immediately, before the server replies, makes an app feel instant. The catch: when the request fails, undo the change visibly and tell the person, with a way to retry. Silently dropping it is worse than a spinner.',
    visual: (
      <M.Phone height={22}>
        <M.AppBar title="Feed" actions={['bell']} />
        <M.Stack pad="0 1.2em" gap={0.6}>
          <M.Row>
            <M.Avatar name="Priya" />
            <M.Text weight={600}>Priya Nair</M.Text>
          </M.Row>
          <M.Img h={6} tone="dusk" />
          <M.Row gap={0.4}>
            <M.Icon name="heart" />
            <M.Text muted>128</M.Text>
          </M.Row>
        </M.Stack>
        <M.Box style={{ position: 'absolute', left: '0.8em', right: '0.8em', bottom: '1em' }}>
          <M.Toast tone="danger" action="Retry">
            Couldn’t save your like
          </M.Toast>
        </M.Box>
      </M.Phone>
    ),
  },
  {
    id: 'ux-tip-22',
    kind: 'gotcha',
    title: 'Leave room for translation',
    body: 'Labels grow when translated, and short ones grow the most: “Save” becomes “Speichern” in German, more than twice as long. Design buttons, tabs and menus to wrap or stretch, and test with long real names and strings, not tidy placeholder text.',
    visual: (
      <M.Panel width={22}>
        <M.Row gap={0.5}>
          <M.Badge>EN</M.Badge>
          <M.Button variant="secondary" size="sm">
            Cancel
          </M.Button>
          <M.Button size="sm">Save</M.Button>
        </M.Row>
        <M.Row gap={0.5}>
          <M.Badge>DE</M.Badge>
          <M.Button variant="secondary" size="sm">
            Abbrechen
          </M.Button>
          <M.Button size="sm">Speichern</M.Button>
        </M.Row>
      </M.Panel>
    ),
  },
  {
    id: 'ux-tip-23',
    kind: 'tip',
    title: 'Tesler’s law: complexity only moves',
    body: 'Larry Tesler observed that every system has some complexity that can’t be removed, only shifted. Timezones in a calendar are a classic case: either the user sorts them out, or the software does. Good design takes that work on itself, like detecting the timezone.',
    visual: (
      <M.Phone height={24.5}>
        <M.AppBar title="New event" back />
        <M.Stack pad="0 1.2em" gap={0.8}>
          <M.Input label="Title" value="Design review" />
          <M.Input label="Starts" value="Thu 14 Nov, 15:00" icon="calendar" />
          <M.Input label="Timezone" value="Europe/Lisbon" icon="globe" hint="Detected from your device" />
        </M.Stack>
      </M.Phone>
    ),
  },
  {
    id: 'ux-tip-24',
    kind: 'gotcha',
    title: 'Honour “Reduce motion”',
    body: 'Large zooms, parallax and sliding transitions can make some people dizzy or nauseous. When someone turns on their system’s reduce-motion setting, the browser reports `prefers-reduced-motion: reduce`. Swap big movement for a fade or none at all; just making it shorter isn’t enough.',
    visual: (
      <M.Phone height={20}>
        <M.AppBar title="Motion" back />
        <M.Stack pad="0 1.2em" gap={0.9}>
          <M.Toggle on label="Reduce motion" />
          <M.Text size={0.85} muted>
            Apps are asked to cut down on moving effects such as parallax and zooming transitions.
          </M.Text>
          <M.Divider />
          <M.Toggle label="Auto-play video previews" />
        </M.Stack>
      </M.Phone>
    ),
  },
  {
    id: 'ux-tip-25',
    kind: 'curiosity',
    title: 'From WCAG 2.0 to 2.2',
    body: 'WCAG 2.0 became a W3C Recommendation in December 2008, 2.1 followed in June 2018 and 2.2 in October 2023. Version 2.2 added nine success criteria, including Target Size (Minimum) and Focus Not Obscured, and removed the old 4.1.1 Parsing criterion.',
    visual: (
      <M.Panel width={26} pad={1.4}>
        <M.Row gap={0} align="flex-start">
          {[
            ['2008', 'WCAG 2.0'],
            ['2018', 'WCAG 2.1'],
            ['2023', 'WCAG 2.2'],
          ].map(([year, name], i) => (
            <M.Stack key={year} gap={0.4} align="center" style={{ flex: 1 }}>
              <M.Row gap={0} style={{ width: '100%' }}>
                <M.Box style={{ flex: 1, height: '2px', background: i === 0 ? 'transparent' : '#c3c7d4' }} />
                <M.Box style={{ width: '0.9em', height: '0.9em', borderRadius: '50%', background: i === 2 ? '#3b5bfd' : '#c3c7d4' }} />
                <M.Box style={{ flex: 1, height: '2px', background: i === 2 ? 'transparent' : '#c3c7d4' }} />
              </M.Row>
              <M.Title size={1.1}>{year}</M.Title>
              <M.Badge tone={i === 2 ? 'primary' : 'neutral'} style={{ alignSelf: 'center' }}>
                {name}
              </M.Badge>
            </M.Stack>
          ))}
        </M.Row>
      </M.Panel>
    ),
  },
]
