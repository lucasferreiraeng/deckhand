// Line icons for mock screens, drawn on a 24×24 grid with a 2px stroke.
const PATHS = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4',
  home: 'M4 11l8-7 8 7M6 9.5V20h12V9.5',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16ZM10 20.5a2 2 0 0 0 4 0',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
  trash: 'M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5',
  plus: 'M12 5v14M5 12h14',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  back: 'M15 5l-7 7 7 7',
  next: 'M9 5l7 7-7 7',
  down: 'M5 9l7 7 7-7',
  up: 'M5 15l7-7 7 7',
  menu: 'M4 7h16M4 12h16M4 17h16',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6',
  cart: 'M3 4h2.5l2 11h10.5l2-8H6.5M9 20h.01M17 20h.01',
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5.5M12 7.5h.01',
  warning: 'M12 3.5 2.5 20h19L12 3.5ZM12 10v4.5M12 17.5h.01',
  error: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9 9l6 6M15 9l-6 6',
  mail: 'M3.5 6h17v12h-17V6ZM3.5 6.5l8.5 7 8.5-7',
  lock: 'M6 11h12v9H6v-9ZM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  calendar: 'M4 6h16v14H4V6ZM4 10h16M8 3.5V7M16 3.5V7',
  filter: 'M4 5h16l-6.5 8v6l-3-1.5V13L4 5Z',
  share: 'M12 15V3.5M7.5 8 12 3.5 16.5 8M5 12v8h14v-8',
  upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  download: 'M12 4v12M7 11l5 5 5-5M4 20h16',
  edit: 'M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4',
  arrow: 'M4 12h16M14 6l6 6-6 6',
  grid: 'M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  image: 'M4 5h16v14H4V5ZM4 16l5-5 4 4 2.5-2.5L20 17M15.5 9.5h.01',
  camera: 'M4 8h3.5L9 5.5h6L16.5 8H20v11H4V8ZM12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  send: 'M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4 17-6.5Z',
  bookmark: 'M6 3.5h12v17l-6-4.5-6 4.5v-17Z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z',
  logout: 'M10 4H5v16h5M15 8l4 4-4 4M19 12H9',
  chat: 'M4 5h16v11H9l-5 4V5Z',
  play: 'M7 4.5v15L19.5 12 7 4.5Z',
  pause: 'M8 5v14M16 5v14',
  undo: 'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17.5h.01',
  location: 'M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  sun: 'M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4',
  moon: 'M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z',
  file: 'M6 3.5h8l4 4v13H6v-17ZM14 3.5V8h4',
  folder: 'M3.5 6h6l2 2.5h9V19h-17V6Z',
  wifi: 'M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01',
  battery: 'M3 8h15v8H3V8ZM20.5 11v2M5 10h9v4H5v-4Z',
} as const

export type IconName = keyof typeof PATHS

export function IconSvg({ name, filled }: { name: IconName; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="mk-icon" aria-hidden>
      <path
        d={PATHS[name]}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={name === 'more' ? 3.2 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
