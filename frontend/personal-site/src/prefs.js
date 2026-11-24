// Language, theme and motion: shared by every page and remembered
import { nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const browser = typeof document !== 'undefined'
const store = (key, value) => { try { localStorage.setItem(key, value) } catch { /* storage blocked */ } }
const read = (key) => { try { return localStorage.getItem(key) } catch { return null } }

const html = browser ? document.documentElement : null
const dark = ref(html?.dataset.theme === 'dark')
// Follows the system preference until the visitor chooses
const saved = browser ? read('motion') : null
const still = ref(saved ? saved === 'off' : browser && matchMedia('(prefers-reduced-motion: reduce)').matches)

export function usePrefs() {
  const { locale } = useI18n()
  const order = ['es', 'ca', 'en']
  return {
    locale,
    dark,
    still,
    nextLanguage() {
      locale.value = order[(order.indexOf(locale.value) + 1) % order.length]
    },
    toggleMotion() {
      still.value = !still.value
      store('motion', still.value ? 'off' : 'on')
    },
    toggleTheme(event) {
      const apply = () => {
        dark.value = !dark.value
        html.dataset.theme = dark.value ? 'dark' : 'light'
        store('theme', html.dataset.theme)
        return nextTick()
      }
      if (!document.startViewTransition || still.value) return apply()
      const r = event.currentTarget.getBoundingClientRect()
      html.style.setProperty('--tx', `${r.left + r.width / 2}px`)
      html.style.setProperty('--ty', `${r.top + r.height / 2}px`)
      document.startViewTransition(apply)
    }
  }
}
