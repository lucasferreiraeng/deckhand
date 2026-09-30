import { useLayoutEffect, useRef, type ReactNode } from 'react'
import type { Option } from '../types'
import { RichText } from './Text'

/**
 * The canvas a mock screen sits on. `inert` keeps anything inside it out of the tab order.
 * Mocks are sized in em, so when one is wider than the canvas (on a phone, say) the font size is scaled
 * down until it fits, rather than letting flexbox squash parts of it.
 */
export function Specimen({ children, small }: { children: ReactNode; small?: boolean }) {
  const outer = useRef<HTMLSpanElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const canvas = outer.current
    const content = inner.current
    if (!canvas || !content) return
    const fit = () => {
      canvas.style.removeProperty('--fit')
      const style = getComputedStyle(canvas)
      const room = canvas.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      const need = content.offsetWidth
      if (need > room && room > 0) canvas.style.setProperty('--fit', (room / need).toFixed(3))
    }
    fit()
    let width = canvas.clientWidth
    const observer = new ResizeObserver(() => {
      if (canvas.clientWidth === width) return
      width = canvas.clientWidth
      fit()
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={outer} className={small ? 'specimen specimen-sm' : 'specimen'} inert>
      <span ref={inner} className="specimen-fit">
        {children}
      </span>
    </span>
  )
}

/** An option as text, or as its picture's label when a picture can't be shown. */
export function OptionText({ option }: { option: Option }) {
  return <RichText text={typeof option === 'string' ? option : option.label} />
}
