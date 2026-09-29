// Tiny synthesized cues, no audio files.

const KEY = 'deckhand:muted'
let ctx: AudioContext | null = null

export function isMuted() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function setMuted(muted: boolean) {
  try {
    localStorage.setItem(KEY, muted ? '1' : '0')
  } catch {
    // Storage blocked; the setting just won't stick.
  }
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine', gain = 0.12) {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  const t = ctx.currentTime + start
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(gain, t + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(g).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + duration + 0.02)
}

function play(fn: () => void) {
  if (isMuted()) return
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    fn()
  } catch {
    // Audio unavailable; stay silent.
  }
}

export const sfx = {
  correct: () => play(() => {
    tone(784, 0, 0.14, 'triangle')
    tone(1175, 0.08, 0.22, 'triangle')
  }),
  wrong: () => play(() => {
    tone(196, 0, 0.18, 'square', 0.05)
    tone(147, 0.1, 0.24, 'square', 0.05)
  }),
  complete: () => play(() => {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.3, 'triangle', 0.1))
  }),
}
