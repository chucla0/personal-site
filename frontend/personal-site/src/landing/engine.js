// Drives the landing: the dot of the "i" falls, becomes the tide that brings
// each project, and ends up as the dot of the last word.
// Everything is a function of u, the scrolled distance in units of PACE screens.
import { clamp, ease, lerp } from './math'
import { scenes } from './scenes'

const PACE = 0.66 // how much of a screen one unit of the story takes
const STEP = 1.85 // from one project to the next
const FIRST = 2.55 // where the first project is centred

// Where the printed dot of the "i" ends and its stem begins, in em from the baseline
const DEFAULT_GLYPH = { top: 0.8, bot: 0.6, stem: 0.56, cx: 0.14, w: 0.2 }
function scanGlyph(font) {
  const c = document.createElement('canvas')
  c.width = 400
  c.height = 500
  const g = c.getContext('2d', { willReadFrequently: true })
  g.font = font(300)
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
  const bar = $('.bar')
  const hero = $('.hero')
  const me = $('.me')
  const end = $('.end')
  const spacer = $('.spacer')
  const layers = $$('.ly').map((el) => ({
    el,
    inner: el.firstElementChild,
    title: el.querySelector('h2'),
    art: el.querySelector('.art'),
    shot: el.querySelector('.shot'),
    draw: scenes[el.dataset.scene](el.querySelector('.art')),
    drawn: -1
  }))
  const count = layers.length
  // Everything after the last project moves with the number of projects
  const tail = (count - 3) * STEP
  const stops = { home: 0, projects: FIRST + 0.05, about: 8.1 + tail, contact: 10.1 + tail }

  let letters = {}
  let dots = {}
  let glyph = DEFAULT_GLYPH
  let still = false
  let dirty = true
  let raf = 0
  let smooth = scrollY
  let speed = 0
  let last = scrollY
  let slosh = 0
  let vel = 0
  let time = 0
  let trip = null
  let barOn = null
  const born = performance.now()
  let before = born
  let unit = innerHeight
  let pace = unit * PACE
  let width = innerWidth

  const font = (size) => {
    const cs = getComputedStyle(letters.heroI)
    return `${cs.fontWeight} ${size}px ${cs.fontFamily}`
  }

  function fit(el, max, size = el.scrollWidth) {
    if (size > max) el.style.fontSize = `${(parseFloat(getComputedStyle(el).fontSize) * max) / size}px`
  }

  // Hides the printed dot and returns where ours belongs
  function tittle(span, section) {
    const transform = section.style.transform
    section.style.transform = ''
    const r = span.getBoundingClientRect()
    section.style.transform = transform
    const fs = parseFloat(getComputedStyle(span).fontSize)
    measure.font = font(fs)
    const m = measure.measureText('i')
    const base = r.top + (r.height - m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2 + m.fontBoundingBoxAscent
    span.style.clipPath = `inset(${(base - ((glyph.bot + glyph.stem) / 2) * fs - r.top).toFixed(1)}px -30% -30% -30%)`
    return { x: r.left + glyph.cx * fs, y: base - ((glyph.top + glyph.bot) / 2) * fs, r: (Math.max(glyph.w, glyph.top - glyph.bot) / 2) * fs }
  }

  // Call again whenever the words, the font or the size of the window change
  function refresh() {
    letters = {
      hero: $$('.hero h1 > span'),
      end: $$('.end h2 > span'),
      heroI: $('.hero .i'),
      endI: $('.end .i'),
      layers: layers.map((l) => [...l.title.children])
    }
    const titles = [hero.querySelector('h1'), end.querySelector('h2'), ...layers.map((l) => l.title)]
    titles.forEach((el) => { el.style.fontSize = '' })
    const room = innerWidth * (innerWidth > 760 ? 0.86 : 0.9)
    fit(titles[0], room, titles[0].offsetWidth)
    fit(titles[1], room, titles[1].offsetWidth)
    layers.forEach((l) => {
      const cs = getComputedStyle(l.inner)
      fit(l.title, l.inner.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight))
    })
    glyph = scanGlyph(font)
    dots = { a: tittle(letters.heroI, hero), b: tittle(letters.endI, end) }
    // 100lvh: phones hide their bars while scrolling and would otherwise fall short
    spacer.style.height = `calc(${pace * (stops.contact + 0.1)}px + 100lvh)`
    dirty = true
  }

  function land(y) {
    scrollTo({ top: y, behavior: 'instant' })
    smooth = last = scrollY
    speed = 0
    dirty = true
  }

  // Mobile browser bars resize the viewport while scrolling: ignore those changes
  function resize() {
    if (innerWidth === width && Math.abs(innerHeight - unit) <= 140) return refresh()
    const u = scrollY / pace
    width = innerWidth
    unit = innerHeight
    pace = unit * PACE
    refresh()
    // Stay at the same point of the story
    land(u * pace)
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
    el.style.transform = still || !shift ? '' : `translateY(${((shift * unit) / 100).toFixed(1)}px)`
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

  function layer(i, path, full, keep, opacity, u) {
    const l = layers[i]
    const mid = FIRST + i * STEP
    const on = (full || path) && keep
    l.el.style.visibility = on ? 'visible' : 'hidden'
    l.el.inert = !on || Math.abs(u - mid) > 0.75
    if (!on) return
    l.el.style.clipPath = full ? 'none' : `path("${path}")`
    l.inner.style.opacity = opacity
    l.inner.style.visibility = opacity > 0.01 ? 'inherit' : 'hidden'
    if (opacity <= 0.01) return
    l.title.style.transform = still ? '' : `translateY(${(clamp(mid - u, -1, 1.4) * 5).toFixed(2)}vh)`
    const p = clamp((u - mid + 0.75) / 1.1)
    if (Math.abs(p - l.drawn) > 0.0004) {
      l.drawn = p
      // The drawing sets itself up and gives way to the real thing
      l.draw(clamp(p / 0.46))
      const t = ease((p - 0.46) / 0.22)
      l.art.style.opacity = 1 - t
      l.shot.style.opacity = t
      l.shot.style.transform = `translateY(${((1 - t) * 14).toFixed(2)}%) scale(${(0.9 + t * 0.1).toFixed(3)})`
    }
    letters.layers[i].forEach((el, k) => bob(el, k))
  }

  function frame(now) {
    raf = requestAnimationFrame(frame)
    const real = Math.max(0, now - before) / 1000
    const dt = Math.min(0.05, real)
    before = now

    if (trip) {
      const k = clamp((now - trip.start) / trip.time)
      scrollTo({ top: lerp(trip.from, trip.to, ease(k)), behavior: 'instant' })
      if (k >= 1) trip = null
    }

    // A critically damped spring follows the scroll: wheel notches jump 100px at
    // once, so the drawing needs continuous speed. Never hijacks the scroll itself.
    if (now - born < 500) smooth = scrollY // the browser may restore the position
    const stiff = still ? 20 : 9
    const gap = smooth - scrollY
    const move = (speed + stiff * gap) * real
    const decay = Math.exp(-stiff * real)
    smooth = scrollY + (gap + move) * decay
    speed = (speed - stiff * move) * decay
    if (Math.abs(scrollY - smooth) < 0.2 && Math.abs(speed) < 4) {
      smooth = scrollY
      speed = 0
    }
    if (still && !dirty && smooth === last) return
    dirty = false

    if (!still) time += dt
    const W = innerWidth
    const H = innerHeight
    const u = smooth / pace
    const push = still ? 0 : clamp((smooth - last) / H, -0.08, 0.08)
    last = smooth
    vel += push * 0.62 - slosh * 0.85 * dt
    vel *= Math.exp(-2.6 * dt)
    slosh = still ? 0 : clamp(slosh + vel * 60 * dt, -0.6, 0.6)

    const v = u - tail // position counted from the end
    const calmLevel = W > 760 ? 0.22 : 0.12
    const endShift = (1 - ease((v - 8.95) / 0.8)) * 10
    const a = dots.a
    const b = { ...dots.b, y: dots.b.y + (still ? 0 : (endShift * unit) / 100) }

    section(hero, u < 2.5 ? 1 : 0)
    section(me, v > 5.9 ? 1 - ease((v - 8.6) / 0.5) : 0, -ease((v - 8.6) / 0.7) * 14)
    section(end, ease((v - 8.95) / 0.5), endShift)
    // Covered by water: keep it out of the tab order
    if (u > 1.6) hero.inert = true
    if (v < 6.9) me.inert = true

    // Which water is behind the header
    let top = -1

    // 1. The dot lets go, falls, and its splash becomes the first tide
    const fall = clamp((u - 0.28) / 0.85)
    const t1 = clamp((u - 1.13) / 1.15)
    const hitX = lerp(a.x, W / 2, ease(fall))
    let d1 = ''
    if (t1 <= 0) {
      const g = fall * fall * (1.25 - 0.25 * fall)
      const y = lerp(a.y, H + a.r * 0.3, g)
      const s = Math.min(1, fall * 1.3) * (1 - clamp((fall - 0.93) / 0.07) * 0.8)
      const pre = still ? 0 : Math.sin(time * 2.2) * 0.025 + Math.sin(clamp((u - 0.05) / 0.25) * Math.PI) * 0.1
      d1 = oval(hitX, y, a.r * (1 + pre - s * 0.16), a.r * (1 - pre + s * 0.3))
    } else if (t1 < 1) {
      const level = lerp(-0.12, 1.16, ease(t1 * 0.92 + 0.08 * t1))
      if (level > 0.97) top = 0
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
    } else top = 0
    layer(0, d1, t1 >= 1, u < 4.15, ease((u - 1.35) / 0.7), u)

    // 2. One tide per project
    for (let i = 1; i < count; i++) {
      const t = clamp((u - (2.95 + (i - 1) * STEP)) / 1.15)
      const level = lerp(-0.14, 1.16, ease(t))
      if (level > 0.97) top = i
      const path = t > 0 && t < 1 ? water(W, H, level, i + 1) : ''
      if (i < count - 1) {
        layer(i, path, t >= 1, u < 4.15 + i * STEP, 1, u)
        continue
      }

      // 3. The last tide goes out, warms up to orange and gathers into the final dot
      const out = clamp((v - 6.6) / 1.15)
      const q = clamp((v - 8.65) / 1.45)
      let d = path
      let full = t >= 1
      if (q > 0) {
        const pull = ease(q / 0.56)
        const go = ease((q - 0.5) / 0.5)
        const calm = 1 - ease(q / 0.2)
        d = calm > 0.02 ? water(W, H, lerp(0, calmLevel, calm), 3) : ''
        const rise = still ? 0 : Math.sin(Math.PI * go)
        const bounce = still ? 0 : Math.sin(clamp((q - 0.9) / 0.1) * Math.PI * 2) * 0.8 * (1 - q)
        const rx = lerp(W * 1.5, b.r, pull) * (1 - rise * 0.13 * pull + bounce)
        const ry = lerp(H * calmLevel, b.r, pull) * (1 + rise * 0.22 * pull - bounce)
        d += oval(lerp(W / 2, b.x, go), lerp(lerp(H, H * 0.88, pull), b.y, go), rx, ry)
        full = false
      } else if (out > 0) {
        const l = lerp(1.16, calmLevel, ease(out))
        d = water(W, H, l, 3)
        full = false
      }
      if (out > 0 && lerp(1.16, calmLevel, ease(out)) < 0.97) top = -1
      layer(i, d, full, true, out > 0 ? 1 - ease(out / 0.45) : 1, u)
      const warm = ease((out - 0.1) / 0.85) * 2
      const style = layers[i].el.style
      if (warm <= 0.002) style.background = ''
      else if (warm < 1) style.background = `color-mix(in oklab, var(--wm) ${(warm * 100).toFixed(1)}%, var(--w))`
      else style.background = `color-mix(in oklab, var(--w1) ${((warm - 1) * 100).toFixed(1)}%, var(--wm))`
    }

    if (top !== barOn) {
      barOn = top
      bar.style.setProperty('--on', top < 0 ? 'var(--ink)' : `var(--k${top + 1})`)
      bar.style.setProperty('--under', top < 0 ? 'var(--paper)' : `var(--w${top + 1})`)
    }
    if (u < 2.5) letters.hero.forEach((el, k) => { if (el !== letters.heroI) bob(el, k, 0.5) })
    if (v > 8.9) letters.end.forEach((el, k) => { if (el !== letters.endI) bob(el, k, 0.5) })
  }

  const stopTrip = () => { trip = null }
  const stopEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown']

  refresh()
  document.fonts.load(font(300), 'i').then(refresh)
  document.fonts.ready.then(refresh)
  addEventListener('resize', resize)
  stopEvents.forEach((e) => addEventListener(e, stopTrip, { passive: true, capture: true }))
  raf = requestAnimationFrame(frame)

  return {
    stops,
    refresh,
    setStill(value) {
      still = value
      dirty = true
    },
    goTo(name, instant = false) {
      const to = stops[name] * pace
      if (instant || still) return land(to)
      const far = Math.abs(to - scrollY) / unit
      trip = { from: scrollY, to, start: performance.now(), time: Math.min(3200, 700 + far * 260) }
    },
    destroy() {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      stopEvents.forEach((e) => removeEventListener(e, stopTrip, { capture: true }))
    }
  }
}
