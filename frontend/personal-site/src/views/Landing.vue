<template>
  <div ref="root" class="landing">
    <header class="bar">
      <a href="#home" @click.prevent="go('home')">Izan de la Cruz</a>
      <nav :aria-label="$t('a11y.menu')">
        <a href="#projects" @click.prevent="go('projects')">{{ $t('nav.projects') }}</a>
        <a href="#about" @click.prevent="go('about')">{{ $t('nav.about') }}</a>
        <a href="#contact" @click.prevent="go('contact')">{{ $t('nav.contact') }}</a>
      </nav>
      <div class="controls">
        <button class="pill" :aria-label="$t('a11y.change_language')" @click="nextLanguage">{{ locale.toUpperCase() }}</button>
        <button class="pill" :aria-label="$t(still ? 'a11y.motion_on' : 'a11y.motion_off')" @click="toggleMotion">{{ $t(still ? 'controls.move' : 'controls.pause') }}</button>
        <button ref="themeButton" class="pill" :aria-label="$t('a11y.toggle_theme')" @click="toggleTheme">{{ $t(dark ? 'controls.day' : 'controls.night') }}</button>
      </div>
    </header>

    <main>
      <div class="stage">
        <section class="sec hero">
          <h1 class="big" aria-label="Izan de la Cruz">
            <span v-for="(c, k) in 'izan'" :key="k" aria-hidden="true" :class="{ i: c === 'i' }">{{ c }}</span>
          </h1>
          <p>{{ $t('hero.intro') }}</p>
        </section>
        <section class="sec me">
          <h2 class="sr-only">{{ $t('about.title') }}</h2>
          <p class="lead">{{ $t('about.text') }}</p>
          <div class="facts">
            <p v-for="f in ['study', 'work', 'also']" :key="f"><strong>{{ $t(`about.${f}_title`) }}</strong> {{ $t(`about.${f}`) }}</p>
          </div>
        </section>
        <section class="sec end">
          <h2 class="big" :aria-label="$t('contact.title')">
            <span v-for="(c, k) in word" :key="`${locale}${k}`" aria-hidden="true" :class="{ i: k === iIndex }">{{ c }}</span>
          </h2>
          <div class="links">
            <button class="link" @click="dialog.open()">{{ $t('contact.form_open') }}</button>
            <a href="mailto:iizan.cruzz@gmail.com">iizan.cruzz@gmail.com</a>
            <a href="https://linkedin.com/in/iizancruzz" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://github.com/chucla0" target="_blank" rel="noopener">GitHub</a>
          </div>
        </section>
      </div>

      <article v-for="(p, i) in projects" :key="p.key" class="ly" :data-scene="p.key" :style="`--w:var(--w${i + 1});--k:var(--k${i + 1});--hi:var(--h${i + 1});z-index:${i + 2}`">
        <div class="in">
          <div class="sc"></div>
          <div class="tx">
            <p>{{ $t(`projects.${p.key}_desc`) }}</p>
            <p>{{ p.tech }}</p>
            <div class="links">
              <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener">{{ $t('projects.view_demo') }}</a>
              <a v-if="p.code" :href="p.code" target="_blank" rel="noopener">{{ $t('projects.view_code') }}</a>
            </div>
          </div>
          <h2 class="big" :aria-label="$t(`projects.${p.key}_name`)">
            <span v-for="(c, k) in p.word" :key="k" aria-hidden="true">{{ c }}</span>
          </h2>
        </div>
      </article>
    </main>
    <div class="spacer" aria-hidden="true"></div>
    <ContactDialog ref="dialog" />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import ContactDialog from '@/components/ContactDialog.vue'
import { createLanding } from '@/landing/engine'

const projects = [
  { key: 'casulab', word: 'casulab', tech: 'Vue.js', demo: 'https://casulab.com/' },
  { key: 'synapse', word: 'synapse', tech: 'React, Node.js, Prisma, PostgreSQL, Socket.io', demo: 'https://synapse-eight-brown.vercel.app/', code: 'https://github.com/chucla0/Synapse' },
  { key: 'optica', word: 'óptica', tech: 'Next.js, TypeScript, Tailwind CSS, Framer Motion', demo: 'https://optica-santa-isabel.vercel.app/', code: 'https://github.com/chucla0/optica-santa-isabel' },
  { key: 'codex', word: 'codex', tech: 'React, Laravel, Socket.io, WebRTC, Redis, Docker', code: 'https://github.com/chucla0/projecte-final-2025-26-daw-codex_trfinal_grup4' }
]

const { locale, t, availableLocales } = useI18n()
const route = useRoute()
const root = ref(null)
const dialog = ref(null)
const themeButton = ref(null)
let landing = null

const store = (key, value) => { try { localStorage.setItem(key, value) } catch { /* storage blocked */ } }
const read = (key) => { try { return localStorage.getItem(key) } catch { return null } }

// The last word always has an "i" for the dot to land on
const word = computed(() => t('contact.word'))
const iIndex = computed(() => word.value.indexOf('i'))

const nextLanguage = () => {
  const order = ['es', 'ca', 'en'].filter((l) => availableLocales.includes(l))
  locale.value = order[(order.indexOf(locale.value) + 1) % order.length]
}
watch(locale, () => nextTick(() => landing?.refresh()))

// Follows the system preference until the visitor chooses
const saved = read('motion')
const still = ref(saved ? saved === 'off' : matchMedia('(prefers-reduced-motion: reduce)').matches)
const toggleMotion = () => {
  still.value = !still.value
  store('motion', still.value ? 'off' : 'on')
}
watch(still, (v) => landing?.setStill(v))

const html = document.documentElement
const dark = ref(html.dataset.theme === 'dark')
const toggleTheme = () => {
  const apply = () => {
    dark.value = !dark.value
    html.dataset.theme = dark.value ? 'dark' : 'light'
    store('theme', html.dataset.theme)
    return nextTick()
  }
  if (!document.startViewTransition || still.value) return apply()
  const r = themeButton.value.getBoundingClientRect()
  html.style.setProperty('--tx', `${r.left + r.width / 2}px`)
  html.style.setProperty('--ty', `${r.top + r.height / 2}px`)
  document.startViewTransition(apply)
}

const go = (name) => landing?.goTo(name)
const follow = (instant) => {
  const name = route.hash.slice(1)
  if (name in landing.stops) landing.goTo(name, instant)
}

onMounted(() => {
  landing = createLanding(root.value)
  landing.setStill(still.value)
  follow(true)
})
watch(() => route.hash, () => landing && follow(false))
onBeforeUnmount(() => landing?.destroy())
</script>

<style scoped>
.stage, .ly { position: fixed; inset: 0; overflow: hidden; }
.ly { background: var(--w); color: var(--k); --fg: var(--k); will-change: clip-path; visibility: hidden; }
.in, .sec { position: absolute; inset: 0; }
.sec { visibility: hidden; }
.big > span { display: inline-block; will-change: transform; }

.bar { position: fixed; inset: 0 0 auto; z-index: 30; display: flex; align-items: center; gap: 28px; padding: 14px clamp(16px, 3.2vw, 52px); font-weight: 700; }
.bar > a { margin-right: auto; }
.bar a { text-decoration: none; padding: 8px 0; }
.bar a:hover { text-decoration: underline; }
.bar nav { display: flex; gap: 28px; }
.controls { display: flex; gap: 8px; }
/* The engine sets these to the colours of the water behind the header */
.bar { color: var(--on, var(--ink)); transition: color 0.25s; }
.bar .pill { background: var(--on, var(--ink)); color: var(--under, var(--paper)); transition: background-color 0.25s, color 0.25s; }
.bar :focus-visible { outline-color: currentColor; }

/* The drawing takes whatever room the words leave */
.in { display: grid; grid-template: minmax(0, 1fr) auto / min(38vw, 38ch) minmax(0, 1fr); gap: 2vh 8vw; padding: max(10vh, 82px) clamp(18px, 3.2vw, 52px) 8vh; }
.ly h2 { grid-area: 2 / 1 / auto / -1; justify-self: start; font-size: 40vh; }
.tx { grid-area: 1 / 1; padding-top: 3vh; }
.tx p { margin-bottom: 0.7em; }
.sc { grid-area: 1 / 2; min-height: 0; }
.sc :deep(svg) { width: 100%; height: 100%; overflow: visible; }

.hero h1 { position: absolute; left: 50%; top: 45%; transform: translate(-50%, -50%); font-size: 62vh; }
.hero p { position: absolute; left: clamp(18px, 3.2vw, 52px); bottom: 6vh; max-width: 32ch; }
.me { display: flex; flex-direction: column; gap: 5vh; padding: max(15vh, 88px) clamp(18px, 3.2vw, 52px) 0; }
.lead { max-width: 24ch; font-size: clamp(28px, min(4.4vw, 8vh), 84px); line-height: 1.08; font-weight: 700; letter-spacing: -0.025em; }
.facts { display: grid; grid-template-columns: repeat(3, minmax(0, 34ch)); gap: 1.4em 4vw; }
.facts strong { display: block; }
.end h2 { position: absolute; left: 50%; top: 47%; transform: translate(-50%, -50%); font-size: 56vh; }
.end .links { position: absolute; left: 0; right: 0; bottom: 8vh; justify-content: center; font-size: 1.1em; }
.ly :focus-visible { outline-color: currentColor; }

@media (max-width: 760px) and (orientation: portrait) {
  .bar { flex-wrap: wrap; gap: 0 8px; padding: 10px 18px; }
  .bar nav { order: 3; width: 100%; gap: 22px; }
  .controls { gap: 5px; }
  .in { grid-template: minmax(0, 1fr) auto auto / minmax(0, 1fr); padding: 100px 18px 3vh; }
  .sc { grid-area: 1 / 1; }
  .tx { grid-area: 2 / 1; padding: 0; font-size: 16px; line-height: 1.42; }
  .ly h2 { grid-area: 3 / 1; }
  .hero h1 { top: 44%; }
  .me { padding-top: 104px; gap: 18px; }
  .facts { grid-template-columns: minmax(0, 1fr); gap: 12px; font-size: clamp(14px, 2.2vh, 17px); line-height: 1.42; }
  .end h2 { top: 42%; }
  .end .links { flex-direction: column; align-items: center; gap: 2px; bottom: 8vh; }
}
/* Phones held sideways */
@media (max-height: 480px) and (orientation: landscape) {
  .bar { gap: 20px; padding: 8px 24px; }
  .bar nav { gap: 20px; }
  .hero h1 { top: 48%; font-size: 54vh; }
  .end h2 { font-size: 50vh; }
  .in { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1vh 5vw; padding: 60px 24px 2vh; font-size: 14px; line-height: 1.35; }
  .tx { padding: 0; }
  .ly h2 { font-size: 25vh; }
  .tx p { margin-bottom: 0.3em; }
  .tx .links a { padding: 4px 0; }
  .me { padding-top: 62px; gap: 8px; }
  .lead { font-size: 24px; max-width: none; }
  .facts { font-size: 14px; line-height: 1.35; }
}
</style>
