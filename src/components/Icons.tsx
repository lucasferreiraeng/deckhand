import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': true } as const

export const Flame = (p: P) => (
  <svg {...base} {...p}>
    <path
      fill="currentColor"
      d="M12.6 2.2c.4 3-1 4.6-2.5 6.2C8.6 10 7 11.7 7 14.6 7 18.2 9.3 21 12.4 21c3.4 0 5.6-2.6 5.6-6.2 0-2.4-1-4-2.1-5.5-.2 1.4-.8 2.5-1.9 3 .5-3.6-.3-7.5-1.4-10.1Z"
    />
    <path fill="#fff" opacity=".55" d="M12.3 13c.9 1.5 2.4 2.6 2.4 4.6 0 1.6-1 2.6-2.3 2.6-1.4 0-2.4-1-2.4-2.6 0-1.6 1.3-2.5 2.3-4.6Z" />
  </svg>
)

export const Bolt = (p: P) => (
  <svg {...base} {...p}>
    <path fill="currentColor" d="M13.5 2 4.8 13.1h6.1L9.8 22l9.4-12.2h-6.3L13.5 2Z" />
  </svg>
)

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const Arrow = ({ dir = 'right', ...p }: P & { dir?: 'left' | 'right' }) => (
  <svg {...base} {...p} style={{ transform: dir === 'left' ? 'scaleX(-1)' : undefined, ...p.style }}>
    <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M5 12h13m-5-6 6 6-6 6" />
  </svg>
)

export const Sound = ({ muted, ...p }: P & { muted: boolean }) => (
  <svg {...base} {...p}>
    <path fill="currentColor" d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    {muted ? (
      <path stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="m16 9.5 5 5m0-5-5 5" />
    ) : (
      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
    )}
  </svg>
)

export const Shuffle = (p: P) => (
  <svg {...base} {...p}>
    <path
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      d="M3 7h3.5c4.5 0 6.5 10 11 10H21m0 0-3-3m3 3-3 3M3 17h3.5c1.4 0 2.5-.9 3.4-2.2M21 7h-3.5c-1.4 0-2.5.9-3.4 2.2M21 7l-3-3m3 3-3 3"
    />
  </svg>
)

export const Bulb = (p: P) => (
  <svg {...base} {...p}>
    <path fill="currentColor" d="M12 2.5a7 7 0 0 0-4.2 12.6c.7.5 1.2 1.3 1.2 2.2V18h6v-.7c0-.9.5-1.7 1.2-2.2A7 7 0 0 0 12 2.5Z" />
    <rect x="9" y="19.2" width="6" height="2.3" rx="1.1" fill="currentColor" />
  </svg>
)
