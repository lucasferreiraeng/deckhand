import * as M from '../../components/mock'
import type { Tip } from '../../types'
import { advancedTips } from './tips-advanced'
import { beginnerTips } from './tips-beginner'
import { intermediateTips } from './tips-intermediate'

export const tips: Tip[] = [
  {
    id: 'ux-tip-01',
    kind: 'tip',
    title: 'Offer undo instead of asking “Are you sure?”',
    body: 'People click through confirmation dialogs on autopilot. For actions you can reverse, act right away and show an undo for a few seconds; keep confirmations for things that truly can’t be undone.',
    visual: (
      <M.Phone height={20}>
        <M.AppBar title="Inbox" actions={['search']} />
        <M.ListItem avatar="Maya" title="Maya Chen" subtitle="Lunch on Friday?" />
        <M.ListItem avatar="Omar" title="Omar Diaz" subtitle="Draft is ready for review" />
        <M.Box style={{ position: 'absolute', left: '0.8em', right: '0.8em', bottom: '1em' }}>
          <M.Toast action="Undo">Conversation deleted</M.Toast>
        </M.Box>
      </M.Phone>
    ),
  },
  ...beginnerTips,
  ...intermediateTips,
  ...advancedTips,
]
