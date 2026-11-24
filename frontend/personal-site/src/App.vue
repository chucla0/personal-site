<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale, t } = useI18n()
const route = useRoute()

// Remember the language and keep <html lang> and the tab title in sync with the page
watch(
  [locale, () => route.path],
  ([lang, path]) => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // storage blocked: the choice just won't persist
    }
    document.documentElement.lang = lang
    const name = route.params.slug ? t(`projects.${route.params.slug}_name`) : path === '/resumen' ? t('nav.overview') : ''
    document.title = name ? `${name} | Izan de la Cruz` : t('meta.title')
  },
  { immediate: true }
)
</script>
