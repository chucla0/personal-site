// Drawings for each project. Each one returns update(p), with p from 0 to 1.
import { clamp, ease, lerp } from './math'

const NS = 'http://www.w3.org/2000/svg'

const add = (parent, tag, attrs = {}, text) => {
  const el = document.createElementNS(NS, tag)
  for (const key in attrs) el.setAttribute(key, attrs[key])
  if (text != null) el.textContent = text
  parent.append(el)
  return el
}

const canvas = (host) => {
  host.replaceChildren()
  return add(host, 'svg', { viewBox: '0 0 800 600', 'aria-hidden': 'true', preserveAspectRatio: 'xMidYMid meet' })
}

export const scenes = {
  // A 96-well lab plate that fills up
  casulab(host) {
    const s = canvas(host)
    const wells = []
    add(s, 'path', { d: 'M70 60H700l40 40v440H70z', fill: 'none', stroke: 'var(--fg)', 'stroke-width': 8 })
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 12; i++) {
        const cx = 121 + i * 51
        const cy = 122 + j * 51
        add(s, 'circle', { cx, cy, r: 20, fill: 'none', stroke: 'var(--fg)', 'stroke-width': 4 })
        const fill = (i * 7 + j * 5) % 11 === 0 ? 'var(--hi)' : 'var(--fg)'
        wells.push([add(s, 'circle', { cx, cy, r: 0, fill }), (i + j * 1.3) / 20])
      }
    }
    return (p) => wells.forEach(([c, d]) => c.setAttribute('r', (20 * ease((p * 1.5 - d) / 0.35)).toFixed(2)))
  },

  // Loose events that settle into a calendar
  synapse(host) {
    const s = canvas(host)
    for (let i = 0; i <= 5; i++) add(s, 'path', { d: `M${100 + i * 120} 60V540`, stroke: 'var(--fg)', 'stroke-width': 4 })
    for (let j = 0; j <= 6; j++) add(s, 'path', { d: `M100 ${60 + j * 80}H700`, stroke: 'var(--fg)', 'stroke-width': j % 6 ? 1.5 : 4 })
    // [column, row, height, start x, start y, start angle]
    const events = [
      [0, 0, 2, -260, 420, -50], [0, 3, 1, 300, -380, 34], [1, 1, 3, 420, 300, 62], [2, 0, 1, -380, -300, -40],
      [2, 3, 2, 120, 460, 24], [3, 2, 2, -300, -420, -70], [4, 0, 3, 420, 180, 46], [4, 4, 1, -520, 120, -28]
    ].map(([c, r, h, dx, dy, angle], i) => ({
      el: add(s, 'rect', { width: 108, height: h * 80 - 12, fill: i % 4 === 2 ? 'var(--hi)' : 'var(--fg)' }),
      x: 106 + c * 120, y: 66 + r * 80, h, dx, dy, angle, i
    }))
    return (p) => events.forEach(({ el, x, y, h, dx, dy, angle, i }) => {
      const t = 1 - ease((p * 1.45 - i * 0.05) / 0.75)
      el.setAttribute('transform', `translate(${x + dx * t} ${y + dy * t}) rotate(${angle * t} 54 ${h * 40})`)
    })
  },

  // Students that find each other and start talking
  codex(host) {
    const s = canvas(host)
    const people = [[150, 170, 54], [400, 110, 70], [655, 190, 50], [255, 390, 66], [540, 375, 78], [110, 520, 40], [400, 535, 46], [690, 520, 56]]
    const bonds = [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5], [3, 6], [4, 6], [4, 7]].map(([a, b], i) => {
      const [x1, y1] = people[a]
      const [x2, y2] = people[b]
      return { el: add(s, 'path', { d: `M${x1} ${y1}L${x2} ${y2}`, pathLength: 1, 'stroke-dasharray': '1 1', stroke: 'var(--fg)', 'stroke-width': 9, 'stroke-linecap': 'round' }), at: 0.08 + i * 0.028 }
    })
    const dots = people.map(([cx, cy, r], i) => ({ el: add(s, 'circle', { cx, cy, r: 0, fill: i === 4 || i === 0 ? 'var(--hi)' : 'var(--fg)' }), r, at: i * 0.025 }))
    const bubble = (x, y, fill, ink) => {
      const g = add(s, 'g')
      add(g, 'path', { d: 'M-70 -44H70a34 34 0 0 1 34 34v10a34 34 0 0 1 -34 34H-30L-64 66V34H-70a34 34 0 0 1 -34 -34v-10a34 34 0 0 1 34 -34z', fill })
      ;[-44, 0, 44].forEach((cx) => add(g, 'circle', { cx, cy: -5, r: 11, fill: ink }))
      return { el: g, x, y }
    }
    const talk = [bubble(500, 40, 'var(--hi)', 'var(--fg)'), bubble(395, 300, 'var(--fg)', 'var(--w)'), bubble(690, 300, 'var(--hi)', 'var(--fg)')]
    return (p) => {
      dots.forEach(({ el, r, at }) => el.setAttribute('r', (r * ease((p - at) / 0.25)).toFixed(1)))
      bonds.forEach(({ el, at }) => {
        const t = ease((p - at) / 0.2)
        el.setAttribute('stroke-dashoffset', (1 - t).toFixed(3))
        el.setAttribute('opacity', t > 0.01 ? 1 : 0)
      })
      talk.forEach(({ el, x, y }, i) => {
        const t = 0.82 * ease((p - 0.36 - i * 0.08) / 0.16)
        el.setAttribute('transform', `translate(${x} ${y}) scale(${t.toFixed(3)})`)
        el.setAttribute('visibility', t > 0.02 ? 'inherit' : 'hidden')
      })
    }
  },

  // A lens that brings an eye chart into focus
  optica(host) {
    const s = canvas(host)
    const id = `lens${Math.random().toString(36).slice(2)}`
    const rows = [['I', 150], ['ZA', 108], ['NDE', 80], ['LACR', 58], ['UZWEB', 42]]
    const chart = (g) => {
      let y = 20
      rows.forEach(([text, size]) => {
        y += size * 0.94
        add(g, 'text', { x: 400, y, 'text-anchor': 'middle', 'font-size': size, 'font-weight': 800, 'letter-spacing': size * 0.28, fill: 'var(--fg)' }, text)
        y += 16
      })
    }
    const defs = add(s, 'defs')
    const blur = add(defs, 'filter', { id: `${id}f`, x: '-20%', y: '-20%', width: '140%', height: '140%' })
    add(blur, 'feGaussianBlur', { stdDeviation: 9 })
    const hole = add(add(defs, 'clipPath', { id: `${id}c` }), 'circle', { r: 118 })
    chart(add(s, 'g', { filter: `url(#${id}f)`, opacity: 0.75 }))
    const glass = add(s, 'circle', { r: 118, fill: 'var(--hi)' })
    chart(add(s, 'g', { 'clip-path': `url(#${id}c)` }))
    const ring = add(s, 'circle', { r: 118, fill: 'none', stroke: 'var(--fg)', 'stroke-width': 14 })
    return (p) => {
      const x = 400 + Math.sin(p * Math.PI * 3) * 150
      const y = lerp(60, 520, clamp(p))
      ;[hole, glass, ring].forEach((c) => { c.setAttribute('cx', x); c.setAttribute('cy', y) })
    }
  }
}
