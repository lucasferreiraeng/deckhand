// A kit for drawing small, believable app screens inside cards.
//
// Everything renders as <span>s styled as blocks, never as real buttons, inputs or links, so a mock can sit
// inside an answer button and nothing in it can take focus. Sizes are in `em`: the font size of the
// surrounding `.specimen` scales the whole mock. Styles live in `mock.css`.
import type { CSSProperties, ReactNode } from 'react'
import { IconSvg, type IconName } from './icons'

export type { IconName }

interface Base {
  children?: ReactNode
  style?: CSSProperties
}

type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'primary'

const cx = (...names: unknown[]) => names.filter((n) => typeof n === 'string' && n).join(' ')
const em = (n: number | string | undefined) => (typeof n === 'number' ? `${n}em` : n)

/* ---------- Frames ---------- */

/** A phone with a status bar. Content is a column; `height` crops it (in em). */
export function Phone({ children, style, dark, height, time = '9:41' }: Base & { dark?: boolean; height?: number; time?: string }) {
  return (
    <span className={cx('mk-phone', dark && 'mk-dark')} style={{ height: em(height), ...style }}>
      <span className="mk-status">
        <span>{time}</span>
        <span className="mk-status-icons">
          <IconSvg name="wifi" />
          <IconSvg name="battery" />
        </span>
      </span>
      <span className="mk-screen">{children}</span>
    </span>
  )
}

/** A browser window with an address bar. */
export function Browser({ children, style, url = 'app.example.com', dark, width }: Base & { url?: string; dark?: boolean; width?: number }) {
  return (
    <span className={cx('mk-browser', dark && 'mk-dark')} style={{ width: em(width), ...style }}>
      <span className="mk-browser-bar">
        <span className="mk-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mk-url">
          <IconSvg name="lock" />
          {url}
        </span>
      </span>
      <span className="mk-screen">{children}</span>
    </span>
  )
}

/** A bare surface, for showing a component on its own. */
export function Panel({ children, style, dark, width, pad = 1.2 }: Base & { dark?: boolean; width?: number; pad?: number }) {
  return (
    <span className={cx('mk-panel', dark && 'mk-dark')} style={{ width: em(width), padding: em(pad), ...style }}>
      {children}
    </span>
  )
}

/* ---------- Layout ---------- */

interface FlexProps extends Base {
  gap?: number
  pad?: number | string
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: boolean
  grow?: boolean
}

const flex = ({ gap, pad, align, justify, wrap, grow, style }: FlexProps): CSSProperties => ({
  gap: em(gap),
  padding: em(pad),
  alignItems: align,
  justifyContent: justify,
  flexWrap: wrap ? 'wrap' : undefined,
  flex: grow ? 1 : undefined,
  ...style,
})

export function Stack({ gap = 0.75, ...props }: FlexProps) {
  return (
    <span className="mk-stack" style={flex({ gap, ...props })}>
      {props.children}
    </span>
  )
}

export function Row({ gap = 0.6, align = 'center', ...props }: FlexProps) {
  return (
    <span className="mk-row" style={flex({ gap, align, ...props })}>
      {props.children}
    </span>
  )
}

/** Pushes the items after it to the far end of a Row or Stack. */
export const Spacer = () => <span className="mk-spacer" />

export const Divider = ({ style }: { style?: CSSProperties }) => <span className="mk-divider" style={style} />

/** An escape hatch: a plain block you style yourself. */
export function Box({ children, style, inline }: Base & { inline?: boolean }) {
  return (
    <span className="mk-box" style={{ display: inline ? 'inline-block' : undefined, ...style }}>
      {children}
    </span>
  )
}

/* ---------- Text ---------- */

export function Title({ children, size = 1.35, style, align }: Base & { size?: number; align?: CSSProperties['textAlign'] }) {
  return (
    <span className="mk-title" style={{ fontSize: em(size), textAlign: align, ...style }}>
      {children}
    </span>
  )
}

export function Text({
  children,
  style,
  muted,
  size,
  weight,
  align,
  color,
}: Base & { muted?: boolean; size?: number; weight?: number; align?: CSSProperties['textAlign']; color?: string }) {
  return (
    <span
      className={cx('mk-text', muted && 'mk-muted')}
      style={{ fontSize: em(size), fontWeight: weight, textAlign: align, color, ...style }}
    >
      {children}
    </span>
  )
}

export function Link({ children, style }: Base) {
  return (
    <span className="mk-link" style={style}>
      {children}
    </span>
  )
}

/** Grey bars standing in for body copy. `widths` are percentages, one per line. */
export function Lines({ n = 3, widths, style, size = 0.55 }: { n?: number; widths?: number[]; style?: CSSProperties; size?: number }) {
  const ws = widths ?? Array.from({ length: n }, (_, i) => (i === n - 1 && n > 1 ? 62 : 100))
  return (
    <span className="mk-lines" style={style}>
      {ws.map((w, i) => (
        <i key={i} style={{ width: `${w}%`, height: em(size) }} />
      ))}
    </span>
  )
}

/* ---------- Controls ---------- */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link' | 'success'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter,
  full,
  disabled,
  loading,
  color,
  style,
}: Base & {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  icon?: IconName
  iconAfter?: IconName
  full?: boolean
  disabled?: boolean
  loading?: boolean
  /** Overrides the fill colour of primary/danger/success buttons. */
  color?: string
}) {
  return (
    <span
      className={cx('mk-btn', `mk-btn-${variant}`, `mk-btn-${size}`, full && 'mk-full', disabled && 'mk-disabled')}
      style={{ ...(color ? { '--mk-fill': color } : {}), ...style } as CSSProperties}
    >
      {loading ? <Spinner size={1} /> : icon && <IconSvg name={icon} />}
      {children}
      {iconAfter && <IconSvg name={iconAfter} />}
    </span>
  )
}

/** A round button holding only an icon. */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 2.4,
  style,
  badge,
}: {
  icon: IconName
  variant?: 'ghost' | 'filled' | 'outline' | 'primary'
  size?: number
  style?: CSSProperties
  badge?: number | boolean
}) {
  return (
    <span className={cx('mk-iconbtn', `mk-iconbtn-${variant}`)} style={{ width: em(size), height: em(size), ...style }}>
      <IconSvg name={icon} />
      {badge && <span className="mk-dot-badge">{badge === true ? '' : badge}</span>}
    </span>
  )
}

export function Input({
  label,
  placeholder,
  value,
  hint,
  error,
  success,
  focus,
  icon,
  password,
  required,
  disabled,
  multiline,
  labelInside,
  style,
}: {
  label?: ReactNode
  placeholder?: string
  value?: string
  hint?: ReactNode
  error?: ReactNode
  success?: boolean
  focus?: boolean
  icon?: IconName
  password?: boolean
  required?: boolean
  disabled?: boolean
  multiline?: boolean
  /** Uses the placeholder as the only label, a common anti-pattern. */
  labelInside?: boolean
  style?: CSSProperties
}) {
  const shown = value != null ? (password ? '•'.repeat(value.length) : value) : undefined
  return (
    <span className={cx('mk-field', disabled && 'mk-disabled')} style={style}>
      {label && !labelInside && (
        <span className="mk-label">
          {label}
          {required && <span className="mk-required">*</span>}
        </span>
      )}
      <span
        className={cx('mk-input', focus && 'mk-focus', error && 'mk-invalid', success && 'mk-valid', multiline && 'mk-multiline')}
      >
        {icon && <IconSvg name={icon} />}
        {shown ? <span className="mk-value">{shown}</span> : <span className="mk-placeholder">{placeholder}</span>}
        {focus && <span className="mk-caret" />}
        {success && <IconSvg name="check" />}
      </span>
      {error ? (
        <span className="mk-error">
          <IconSvg name="error" />
          {error}
        </span>
      ) : (
        hint && <span className="mk-hint">{hint}</span>
      )}
    </span>
  )
}

export function Select({ label, value, placeholder = 'Select…', open, options, style }: {
  label?: string
  value?: string
  placeholder?: string
  open?: boolean
  options?: string[]
  style?: CSSProperties
}) {
  return (
    <span className="mk-field" style={style}>
      {label && <span className="mk-label">{label}</span>}
      <span className={cx('mk-input', open && 'mk-focus')}>
        {value ? <span className="mk-value">{value}</span> : <span className="mk-placeholder">{placeholder}</span>}
        <span className="mk-spacer" />
        <IconSvg name={open ? 'up' : 'down'} />
      </span>
      {open && options && <Menu items={options} active={value ? options.indexOf(value) : undefined} />}
    </span>
  )
}

export function Checkbox({ checked, label, style }: { checked?: boolean; label?: ReactNode; style?: CSSProperties }) {
  return (
    <span className="mk-choice" style={style}>
      <span className={cx('mk-checkbox', checked && 'mk-on')}>{checked && <IconSvg name="check" />}</span>
      {label && <span>{label}</span>}
    </span>
  )
}

export function Radio({ checked, label, style }: { checked?: boolean; label?: ReactNode; style?: CSSProperties }) {
  return (
    <span className="mk-choice" style={style}>
      <span className={cx('mk-radio', checked && 'mk-on')} />
      {label && <span>{label}</span>}
    </span>
  )
}

export function Toggle({ on, label, style }: { on?: boolean; label?: ReactNode; style?: CSSProperties }) {
  return (
    <span className="mk-choice mk-toggle-row" style={style}>
      {label && <span>{label}</span>}
      <span className={cx('mk-toggle', on && 'mk-on')}>
        <i />
      </span>
    </span>
  )
}

/** A horizontal slider; `value` is 0–1. */
export function Slider({ value = 0.5, style }: { value?: number; style?: CSSProperties }) {
  return (
    <span className="mk-slider" style={{ '--v': value, ...style } as CSSProperties}>
      <i />
    </span>
  )
}

export function Segmented({ items, active = 0, style }: { items: ReactNode[]; active?: number; style?: CSSProperties }) {
  return (
    <span className="mk-segmented" style={style}>
      {items.map((item, i) => (
        <span key={i} className={cx(i === active && 'mk-on')}>
          {item}
        </span>
      ))}
    </span>
  )
}

/* ---------- Surfaces ---------- */

export function Card({ children, style, pad = 1, flat }: Base & { pad?: number | string; flat?: boolean }) {
  return (
    <span className={cx('mk-card', flat && 'mk-flat')} style={{ padding: em(pad), ...style }}>
      {children}
    </span>
  )
}

/** A dialog over a dimmed backdrop. It covers the nearest frame (Phone, Browser or Panel). */
export function Modal({ title, children, actions, style, onTop }: Base & { title?: ReactNode; actions?: ReactNode; onTop?: boolean }) {
  return (
    <span className={cx('mk-scrim', onTop && 'mk-top')}>
      <span className="mk-modal" style={style}>
        {title && <span className="mk-modal-title">{title}</span>}
        {children}
        {actions && <span className="mk-modal-actions">{actions}</span>}
      </span>
    </span>
  )
}

/** A panel sliding up from the bottom of the nearest frame, over a dimmed backdrop. */
export function Sheet({ children, style }: Base) {
  return (
    <span className="mk-scrim mk-scrim-sheet">
      <span className="mk-sheet" style={style}>
        <i className="mk-grabber" />
        {children}
      </span>
    </span>
  )
}

const TONE_ICON: Record<Tone, IconName> = {
  neutral: 'info',
  primary: 'info',
  info: 'info',
  success: 'check',
  warning: 'warning',
  danger: 'error',
}

export function Toast({ children, tone = 'neutral', action, style }: Base & { tone?: Tone; action?: ReactNode }) {
  return (
    <span className={cx('mk-toast', `mk-tone-${tone}`)} style={style}>
      {tone !== 'neutral' && <IconSvg name={TONE_ICON[tone]} />}
      <span className="mk-grow">{children}</span>
      {action && <span className="mk-toast-action">{action}</span>}
    </span>
  )
}

export function Alert({ children, title, tone = 'info', style }: Base & { title?: ReactNode; tone?: Tone }) {
  return (
    <span className={cx('mk-alert', `mk-tone-${tone}`)} style={style}>
      <IconSvg name={TONE_ICON[tone]} />
      <span className="mk-grow">
        {title && <span className="mk-alert-title">{title}</span>}
        {children}
      </span>
    </span>
  )
}

/** A dark bubble with a pointer. Place it next to what it describes. */
export function Tooltip({ children, pointer = 'down', style }: Base & { pointer?: 'up' | 'down' | 'left' | 'right' }) {
  return (
    <span className={cx('mk-tooltip', `mk-tip-${pointer}`)} style={style}>
      {children}
    </span>
  )
}

export function Menu({ items, active, danger, style }: { items: ReactNode[]; active?: number; danger?: number; style?: CSSProperties }) {
  return (
    <span className="mk-menu" style={style}>
      {items.map((item, i) => (
        <span key={i} className={cx(i === active && 'mk-on', i === danger && 'mk-menu-danger')}>
          {item}
        </span>
      ))}
    </span>
  )
}

/* ---------- Navigation ---------- */

export function AppBar({
  title,
  back,
  actions = [],
  large,
  style,
}: {
  title?: ReactNode
  back?: boolean
  actions?: IconName[]
  large?: boolean
  style?: CSSProperties
}) {
  return (
    <span className={cx('mk-appbar', large && 'mk-appbar-large')} style={style}>
      <span className="mk-appbar-row">
        {back && <IconSvg name="back" />}
        {!large && <span className="mk-appbar-title">{title}</span>}
        <span className="mk-spacer" />
        {actions.map((a) => (
          <IconSvg key={a} name={a} />
        ))}
      </span>
      {large && <span className="mk-appbar-big">{title}</span>}
    </span>
  )
}

export function TabBar({ items, active = 0, labels = true, style }: {
  items: { icon: IconName; label: string }[]
  active?: number
  labels?: boolean
  style?: CSSProperties
}) {
  return (
    <span className="mk-tabbar" style={style}>
      {items.map((t, i) => (
        <span key={t.label} className={cx(i === active && 'mk-on')}>
          <IconSvg name={t.icon} filled={i === active && t.icon !== 'search'} />
          {labels && <small>{t.label}</small>}
        </span>
      ))}
    </span>
  )
}

export function Tabs({ items, active = 0, style }: { items: ReactNode[]; active?: number; style?: CSSProperties }) {
  return (
    <span className="mk-tabs" style={style}>
      {items.map((t, i) => (
        <span key={i} className={cx(i === active && 'mk-on')}>
          {t}
        </span>
      ))}
    </span>
  )
}

export function Breadcrumbs({ items, style }: { items: string[]; style?: CSSProperties }) {
  return (
    <span className="mk-crumbs" style={style}>
      {items.map((c, i) => (
        <span key={i} className={cx(i === items.length - 1 && 'mk-on')}>
          {c}
          {i < items.length - 1 && <IconSvg name="next" />}
        </span>
      ))}
    </span>
  )
}

/** Numbered steps; `current` is the zero-based step in progress. */
export function Stepper({ steps, current = 0, style }: { steps: string[]; current?: number; style?: CSSProperties }) {
  return (
    <span className="mk-stepper" style={style}>
      {steps.map((s, i) => (
        <span key={s} className={cx(i < current && 'mk-done', i === current && 'mk-on')}>
          <b>{i < current ? <IconSvg name="check" /> : i + 1}</b>
          <small>{s}</small>
        </span>
      ))}
    </span>
  )
}

export function SideNav({ items, active = 0, style }: { items: { icon: IconName; label: string }[]; active?: number; style?: CSSProperties }) {
  return (
    <span className="mk-sidenav" style={style}>
      {items.map((t, i) => (
        <span key={t.label} className={cx(i === active && 'mk-on')}>
          <IconSvg name={t.icon} />
          {t.label}
        </span>
      ))}
    </span>
  )
}

/* ---------- Content ---------- */

const AVATAR_COLORS = ['#f59e7a', '#7ab8f5', '#9be0b0', '#c9a7f5', '#f5d27a', '#f59ec4']

export function Avatar({ name = 'A', size = 2.2, color, style }: { name?: string; size?: number; color?: string; style?: CSSProperties }) {
  const bg = color ?? AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
  return (
    <span className="mk-avatar" style={{ width: em(size), height: em(size), fontSize: em(size * 0.42), background: bg, ...style }}>
      {name.slice(0, 1).toUpperCase()}
    </span>
  )
}

export function Badge({ children, tone = 'neutral', style }: Base & { tone?: Tone }) {
  return (
    <span className={cx('mk-badge', `mk-tone-${tone}`)} style={style}>
      {children}
    </span>
  )
}

export function Chip({ children, on, icon, style }: Base & { on?: boolean; icon?: IconName }) {
  return (
    <span className={cx('mk-chip', on && 'mk-on')} style={style}>
      {icon && <IconSvg name={icon} />}
      {children}
    </span>
  )
}

export function ListItem({
  title,
  subtitle,
  avatar,
  icon,
  trailing,
  chevron,
  style,
}: {
  title: ReactNode
  subtitle?: ReactNode
  /** A name; its first letter is shown. */
  avatar?: string
  icon?: IconName
  trailing?: ReactNode
  chevron?: boolean
  style?: CSSProperties
}) {
  return (
    <span className="mk-listitem" style={style}>
      {avatar && <Avatar name={avatar} />}
      {icon && (
        <span className="mk-listicon">
          <IconSvg name={icon} />
        </span>
      )}
      <span className="mk-grow">
        <span className="mk-list-title">{title}</span>
        {subtitle && <span className="mk-list-sub">{subtitle}</span>}
      </span>
      {trailing}
      {chevron && <IconSvg name="next" />}
    </span>
  )
}

const IMG_TONES = {
  sky: ['#bfe3ff', '#7fb6f0'],
  sunset: ['#ffd3a8', '#f08a7f'],
  forest: ['#c8efc4', '#6fbf8b'],
  dusk: ['#d7c8ff', '#8f7fe0'],
  sand: ['#f5e6c8', '#d8b884'],
  grey: ['#e6e8ef', '#c3c7d4'],
}

/** A placeholder photo. */
export function Img({ h = 7, w, tone = 'sky', label, round, style }: {
  h?: number
  w?: number
  tone?: keyof typeof IMG_TONES
  label?: ReactNode
  round?: boolean
  style?: CSSProperties
}) {
  const [a, b] = IMG_TONES[tone]
  return (
    <span
      className={cx('mk-img', round && 'mk-round')}
      style={{ height: em(h), width: em(w), background: `linear-gradient(160deg, ${a}, ${b})`, ...style }}
    >
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
        <path d="M0 40 L28 16 L46 30 L66 10 L100 40 Z" fill="rgb(255 255 255 / 0.45)" />
      </svg>
      {label && <span className="mk-img-label">{label}</span>}
    </span>
  )
}

export function Skeleton({ w = '100%', h = 0.8, round, style }: { w?: number | string; h?: number; round?: boolean; style?: CSSProperties }) {
  return <span className={cx('mk-skeleton', round && 'mk-round')} style={{ width: em(w), height: em(h), ...style }} />
}

export function Spinner({ size = 1.6, style }: { size?: number; style?: CSSProperties }) {
  return <span className="mk-spinner" style={{ width: em(size), height: em(size), ...style }} />
}

/** A progress bar; `value` is 0–1. */
export function Progress({ value = 0.5, color, style }: { value?: number; color?: string; style?: CSSProperties }) {
  return (
    <span className="mk-progress" style={{ '--v': value, ...(color ? { '--mk-fill': color } : {}), ...style } as CSSProperties}>
      <i />
    </span>
  )
}

export function Rating({ value = 4, style }: { value?: number; style?: CSSProperties }) {
  return (
    <span className="mk-rating" style={style}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={cx(n <= value && 'mk-on')}>
          <IconSvg name="star" filled={n <= value} />
        </span>
      ))}
    </span>
  )
}

export function Icon({ name, size = 1.3, color, filled, style }: { name: IconName; size?: number; color?: string; filled?: boolean; style?: CSSProperties }) {
  return (
    <span className="mk-icon-wrap" style={{ fontSize: em(size), color, ...style }}>
      <IconSvg name={name} filled={filled} />
    </span>
  )
}

/** A block of colour with sample text, for contrast questions. */
export function Swatch({ fg, bg, text = 'Aa', size = 1.6, caption, style }: {
  fg: string
  bg: string
  text?: ReactNode
  size?: number
  caption?: ReactNode
  style?: CSSProperties
}) {
  return (
    <span className="mk-swatch" style={{ background: bg, color: fg, ...style }}>
      <span style={{ fontSize: em(size) }}>{text}</span>
      {caption && <small>{caption}</small>}
    </span>
  )
}

/* ---------- Annotations (the designer's markup on top of a screen) ---------- */

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right'

/** A lettered marker on whatever it wraps, for "which of these" questions. */
export function Pin({ n, children, at = 'top-right', style, block }: Base & { n: ReactNode; at?: Corner; block?: boolean }) {
  return (
    <span className={cx('mk-pinned', block && 'mk-block')} style={style}>
      {children}
      <span className={cx('mk-pin', `mk-at-${at}`)}>{n}</span>
    </span>
  )
}

/** A redline measurement beside what it wraps, like a design spec. */
export function Measure({ children, label, side = 'right', style, block }: Base & { label: ReactNode; side?: 'top' | 'right' | 'bottom' | 'left'; block?: boolean }) {
  return (
    <span className={cx('mk-measured', block && 'mk-block')} style={style}>
      {children}
      <span className={cx('mk-measure', `mk-side-${side}`)}>
        <span className="mk-measure-label">{label}</span>
      </span>
    </span>
  )
}

/** A pointer or a fingertip, placed absolutely inside the nearest frame. */
export function Cursor({ kind = 'pointer', style }: { kind?: 'pointer' | 'hand' | 'touch'; style?: CSSProperties }) {
  if (kind === 'touch') return <span className="mk-touch" style={style} />
  return (
    <span className="mk-cursor" style={style}>
      <svg viewBox="0 0 24 24" aria-hidden>
        {kind === 'hand' ? (
          <path
            d="M9 11V4.5a1.5 1.5 0 0 1 3 0V10v-1.5a1.5 1.5 0 0 1 3 0V10v-.5a1.5 1.5 0 0 1 3 0V11a1.5 1.5 0 0 1 3 0v4.5a6.5 6.5 0 0 1-6.5 6.5h-1.2a6 6 0 0 1-4.8-2.4L4.5 15a1.6 1.6 0 0 1 2.4-2.1L9 15V11Z"
            fill="#fff"
            stroke="#111"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        ) : (
          <path d="M5 3l14 8.5-6.2 1.3L9.6 19 5 3Z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  )
}

/** A handwritten-style critique note. */
export function Note({ children, style }: Base) {
  return (
    <span className="mk-note" style={style}>
      {children}
    </span>
  )
}

