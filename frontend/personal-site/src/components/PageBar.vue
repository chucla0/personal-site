<template>
  <header class="page-bar">
    <router-link to="/">Izan de la Cruz</router-link>
    <router-link v-if="overview" to="/resumen">{{ $t('nav.overview') }}</router-link>
    <div class="controls">
      <button class="pill" :aria-label="$t('a11y.change_language')" @click="nextLanguage">{{ locale.toUpperCase() }}</button>
      <button class="pill" :aria-label="$t('a11y.toggle_theme')" @click="toggleTheme">{{ $t(dark ? 'controls.day' : 'controls.night') }}</button>
    </div>
  </header>
</template>

<script setup>
import { usePrefs } from '@/prefs'

defineProps({ overview: Boolean })
const { locale, dark, nextLanguage, toggleTheme } = usePrefs()
</script>

<style scoped>
.page-bar { display: flex; align-items: center; gap: 14px 28px; flex-wrap: wrap; padding: 14px 0; font-weight: 700; }
.page-bar > a { text-decoration: none; padding: 8px 0; }
.page-bar > a:first-child { margin-right: auto; }
.page-bar > a:hover { text-decoration: underline; }
.controls { display: flex; gap: 8px; }
.pill { background: var(--k, var(--ink)); color: var(--w, var(--paper)); }
</style>
