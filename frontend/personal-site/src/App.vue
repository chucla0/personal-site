<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// Remember the language and keep <html lang> and the tab title in sync with it
watch(
  locale,
  (lang) => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // storage blocked: the choice just won't persist
    }
    document.documentElement.lang = lang
    document.title = t('meta.title')
  },
  { immediate: true }
)
</script>
