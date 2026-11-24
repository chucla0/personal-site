export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const ease = (v) => {
  const t = clamp(v)
  return t * t * t * (t * (t * 6 - 15) + 10)
}
