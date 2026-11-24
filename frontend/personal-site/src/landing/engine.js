// Drives the landing: the dot of the "i" falls, becomes the tide that brings
// each project, and ends up as the dot of the last word.
// Everything is a function of u = scroll / viewport height.
import { clamp, ease, lerp } from './math'
import { scenes } from './scenes'

export const STOPS = { home: 0, projects: 2.6, about: 8.1, contact: 10.1 }
const TOTAL = 11.1
const FONT = '"Bagel Fat One"'

// Where the printed dot of the "i" ends and its stem begins, in em from the baseline
const DEFAULT_GLYPH = { top: 0.8, bot: 0.6, stem: 0.56, cx: 0.14, w: 0.2 }
function scanGlyph() {
  const c = document.createElement('canvas')
  c.width = 400
  c.height = 500
  const g = c.getContext('2d', { willReadFrequently: true })
  g.font = `400 300px ${FONT}`
  g.fillText('i', 120, 400)
  const px = g.getImageData(0, 0, 400, 500).data
  const row = (y) => {
    let a = -1
    let b = -1
    for (let x = 0; x < 400; x++) {
      if (px[(y * 400 + x) * 4 + 3] > 60) {
        if (a < 0) a = x
        b = x
      }
    }
    return a < 0 ? null : [a, b]
  }
  let y = 0
  while (y < 499 && !row(y)) y++
  const top = y
  let left = 400
  let right = 0
  while (y < 499 && row(y)) {
    const [a, b] = row(y)
    left = Math.min(left, a)
    right = Math.max(right, b)
    y++
  }
  const bot = y
  while (y < 499 && !row(y)) y++
  if (y > 498 || bot > 380) return DEFAULT_GLYPH
  return { top: (400 - top) / 300, bot: (400 - bot) / 300, stem: (400 - y) / 300, cx: ((left + right) / 2 - 120) / 300, w: (right - left) / 300 }
}

const oval = (x, y, rx, ry) =>
  `M${(x - rx).toFixed(1)} ${y.toFixed(1)}a${rx.toFixed(1)} ${ry.toFixed(1)} 0 1 0 ${(2 * rx).toFixed(1)} 0a${rx.toFixed(1)} ${ry.toFixed(1)} 0 1 0 ${(-2 * rx).toFixed(1)} 0Z`

export function createLanding(root) {
  const $ = (s) => root.querySelector(s)
  const $$ = (s) => [...root.querySelectorAll(s)]
  const measure = document.createElement('canvas').getContext('2d')
  const hero = $('.hero')
  const me = $('.me')
  const end = $('.end')
  const spacer = $('.spacer')
  const layers = $$('.ly').map((el) => ({
    el,
    inner: el.firstElementChild,
    title: el.querySelector('h2'),
    draw: scenes[el.dataset.scene](el.querySelector('.sc'))
  }))
  let letters = {}
  let glyph = DEFAULT_GLYPH
  let still = false
  let raf = 0
  let smooth = scrollY
  let last = scrollY
  let slosh = 0
  let vel = 0
  let time = 0
  let before = performance.now()
  let unit = innerHeight
  let width = innerWidth

  // Call again whenever the words change (language)
  function refresh() {
    letters = {
      hero: $$('.hero h1 > span'),
      end: $$('.end h2 > span'),
      heroI: $('.hero .i'),
      endI: $('.end .i'),
      layers: layers.map((l) => [...l.title.children])
    }
    layers.forEach(({ title }) => {
      title.style.fontSize = ''
      const w = title.scrollWidth
      const max = innerWidth * 0.94
      if (w > max) title.style.fontSize = `${(parseFloat(getComputedStyle(title).fontSize) * max) / w}px`
    })
    spacer.style.height = `${unit * TOTAL}px`
  }

  // Mobile browser bars resize the viewport while scrolling: ignore those changes
  function resize() {
    if (innerWidth !== width || Math.abs(innerHeight - unit) > 140) {
      const u = scrollY / unit
      width = innerWidth
      unit = innerHeight
      refresh()
      // Stay at the same point of the story
      scrollTo({ top: u * unit, behavior: 'instant' })
      smooth = last = scrollY
      return
    }
    refresh()
  }

  // Hides the printed dot and returns where ours belongs
  function tittle(span) {
    const r = span.getBoundingClientRect()
    const fs = parseFloat(getComputedStyle(span).fontSize)
    measure.font = `400 ${fs}px ${FONT}`
    const m = measure.measureText('i')
    const base = r.top + (r.height - m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2 + m.fontBoundingBoxAscent
    span.style.clipPath = `inset(${(base - ((glyph.bot + glyph.stem) / 2) * fs - r.top).toFixed(1)}px -30% -30% -30%)`
    return { x: r.left + glyph.cx * fs, y: base - ((glyph.top + glyph.bot) / 2) * fs, r: (Math.max(glyph.w, glyph.top - glyph.bot) / 2) * fs }
  }

  // Slow swells, the tilt of the spring and an optional bump in the middle
  function water(W, H, level, seed, bump = 0, spread = 0.1) {
    const amp = H * (0.024 + Math.abs(slosh) * 0.07)
    const pts = []
    for (let k = 0; k <= 36; k++) {
      const f = k / 36
      const g = Math.exp(-((f - 0.5) ** 2) / (2 * spread * spread))
      pts.push([
        f * W,
        H * (1 - level) + Math.sin(f * 5.2 + time * 1.15 + seed) * amp + Math.sin(f * 10.5 - time * 1.5 + seed * 2) * amp * 0.36 + slosh * H * 0.34 * (f - 0.5) - bump * H * g
      ])
    }
    let d = `M${pts[0][0]} ${pts[0][1].toFixed(1)}`
    for (let k = 1; k < pts.length - 1; k++) {
      const [x, y] = pts[k]
      const [nx, ny] = pts[k + 1]
      d += `Q${x.toFixed(1)} ${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)} ${((y + ny) / 2).toFixed(1)}`
    }
    return `${d}L${W + 2} ${pts[36][1].toFixed(1)}L${W + 2} ${H + 60}L-2 ${H + 60}Z`
  }

  function section(el, opacity, shift = 0) {
    el.style.visibility = opacity > 0.01 ? 'visible' : 'hidden'
    el.style.opacity = opacity
    el.inert = opacity < 0.5
    el.style.transform = still ? '' : `translateY(${shift.toFixed(2)}vh)`
  }

  function layer(l, path, full, keep, opacity, u, mid) {
    const on = (full || path) && keep
    l.el.style.visibility = on ? 'visible' : 'hidden'
    l.el.inert = !on || Math.abs(u - mid) > 0.75
    if (!on) return
    l.el.style.clipPath = full ? 'none' : `path("${path}")`
    l.inner.style.opacity = opacity
    l.inner.style.visibility = opacity > 0.01 ? 'inherit' : 'hidden'
    l.title.style.transform = still ? '' : `translateY(${(clamp(mid - u, -1, 1.4) * 5).toFixed(2)}vh)`
    l.draw(clamp((u - mid + 0.75) / 1.1))
  }

  // Letters float like corks
  function bob(el, k, amount = 1) {
    if (still) {
      el.style.transform = ''
      return
    }
    const y = Math.sin(time * 1.1 + k * 0.85) * 0.9 * amount - slosh * 9 * Math.cos(k * 1.1)
    const a = Math.sin(time * 0.8 + k * 1.4) * 0.5 * amount + slosh * 3.2 * Math.sin(k * 1.9)
    el.style.transform = `translateY(${y.toFixed(2)}%) rotate(${a.toFixed(2)}deg)`
  }

  function frame(now) {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, Math.max(0, now - before) / 1000)
    // Time-based smoothing: feels the same at 60 or 240 Hz, and never hijacks the scroll
    smooth = still ? scrollY : smooth + (scrollY - smooth) * (1 - Math.exp((-6.5 * Math.max(0, now - before)) / 1000))
    if (Math.abs(scrollY - smooth) < 0.2) smooth = scrollY
    before = now
    if (!still) time += dt

    const W = innerWidth
    const H = innerHeight
    const u = smooth / unit
    const push = still ? 0 : clamp((smooth - last) / H, -0.08, 0.08)
    last = smooth
    vel += push * 0.62 - slosh * 0.85 * dt
    vel *= Math.exp(-2.6 * dt)
    slosh = still ? 0 : clamp(slosh + vel * 60 * dt, -0.6, 0.6)

    const a = tittle(letters.heroI)
    const b = tittle(letters.endI)
    const [one, two, three] = layers

    section(hero, u < 2.5 ? 1 : 0)
    section(me, u > 5.9 ? 1 - ease((u - 8.6) / 0.5) : 0, -ease((u - 8.6) / 0.7) * 14)
    section(end, ease((u - 8.95) / 0.5), (1 - ease((u - 8.95) / 0.8)) * 10)
    // Covered by water: keep it out of the tab order
    if (u > 1.6) hero.inert = true
    if (u < 6.9) me.inert = true

    // 1. The dot lets go, falls, and its splash becomes the first tide
    const fall = clamp((u - 0.28) / 0.85)
    const t1 = clamp((u - 1.13) / 1.15)
    const hitX = lerp(a.x, W / 2, ease(fall))
    let d1 = ''
    if (t1 <= 0) {
      const g = fall * fall * (1.25 - 0.25 * fall)
      const y = lerp(a.y, H + a.r * 0.3, g)
      const v = Math.min(1, fall * 1.3) * (1 - clamp((fall - 0.93) / 0.07) * 0.8)
      const pre = still ? 0 : Math.sin(time * 2.2) * 0.025 + Math.sin(clamp((u - 0.05) / 0.25) * Math.PI) * 0.1
      d1 = oval(hitX, y, a.r * (1 + pre - v * 0.16), a.r * (1 - pre + v * 0.3))
    } else if (t1 < 1) {
      const level = lerp(-0.12, 1.16, ease(t1 * 0.92 + 0.08 * t1))
      const s = clamp(t1 / 0.55)
      const jet = Math.sin(Math.PI * Math.min(1, s * 1.15)) * 0.2 * (1 - s * 0.35)
      d1 = water(W, H, level, 1, Math.max(0, jet), lerp(0.05, 0.3, s))
      for (let k = 0; k < 11 && s < 1; k++) {
        const q = (k - 5) / 5
        const n = Math.abs(Math.sin(k * 91.7))
        const x = hitX + q * W * (0.1 + n * 0.22) * s * 1.5
        const y = H * (1 - Math.max(0, level)) - H * (0.95 + n * 0.75) * s * (1 - s) * 1.5 + s * s * H * 0.1
        const r = a.r * (0.14 + n * 0.32) * Math.sin(Math.PI * Math.min(1, s + 0.12))
        if (r > 1) d1 += oval(x, y, r, r * (1 + (0.5 - s) * 0.3))
      }
    }
    layer(one, d1, t1 >= 1, u < 4.15, ease((u - 1.35) / 0.7), u, 2.55)

    // 2. One tide per project
    const t2 = clamp((u - 2.95) / 1.15)
    const t3 = clamp((u - 4.8) / 1.15)
    layer(two, t2 > 0 && t2 < 1 ? water(W, H, lerp(-0.14, 1.16, ease(t2)), 2) : '', t2 >= 1, u < 6, 1, u, 4.4)

    // 3. The last tide goes out, warms up to orange and gathers into the final dot
    const out = clamp((u - 6.6) / 1.15)
    const q = clamp((u - 8.65) / 1.45)
    let d3 = ''
    let full = false
    if (q > 0) {
      const pull = ease(q / 0.56)
      const go = ease((q - 0.5) / 0.5)
      const calm = 1 - ease(q / 0.2)
      if (calm > 0.02) d3 = water(W, H, lerp(0, 0.22, calm), 3)
      const rise = still ? 0 : Math.sin(Math.PI * go)
      const land = still ? 0 : Math.sin(clamp((q - 0.9) / 0.1) * Math.PI * 2) * 0.8 * (1 - q)
      const rx = lerp(W * 1.5, b.r, pull) * (1 - rise * 0.13 * pull + land)
      const ry = lerp(H * 0.22, b.r, pull) * (1 + rise * 0.22 * pull - land)
      d3 += oval(lerp(W / 2, b.x, go), lerp(lerp(H, H * 0.88, pull), b.y, go), rx, ry)
    } else if (out > 0) d3 = water(W, H, lerp(1.16, 0.22, ease(out)), 3)
    else if (t3 >= 1) full = true
    else if (t3 > 0) d3 = water(W, H, lerp(-0.14, 1.16, ease(t3)), 3)
    layer(three, d3, full, true, out > 0 ? 1 - ease(out / 0.45) : 1, u, 6.25)
    const warm = ease((out - 0.1) / 0.85) * 2
    if (warm <= 0.002) three.el.style.background = ''
    else if (warm < 1) three.el.style.background = `color-mix(in oklab, var(--wm) ${(warm * 100).toFixed(1)}%, var(--w3))`
    else three.el.style.background = `color-mix(in oklab, var(--w1) ${((warm - 1) * 100).toFixed(1)}%, var(--wm))`

    letters.layers.forEach((ls) => ls.forEach((el, k) => bob(el, k)))
    letters.hero.forEach((el, k) => { if (el !== letters.heroI) bob(el, k, 0.5) })
    letters.end.forEach((el, k) => { if (el !== letters.endI) bob(el, k, 0.5) })
  }

  refresh()
  document.fonts.load(`400 300px ${FONT}`, 'i').then(() => {
    glyph = scanGlyph()
    refresh()
  })
  addEventListener('resize', resize)
  raf = requestAnimationFrame(frame)

  return {
    refresh,
    setStill(value) { still = value },
    goTo(name, instant = false) {
      scrollTo({ top: STOPS[name] * unit, behavior: instant || still ? 'instant' : 'smooth' })
    },
    destroy() {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
    }
  }
}
