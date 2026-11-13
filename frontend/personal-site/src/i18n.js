import { createI18n } from 'vue-i18n'
import esMessages from './locales/es.json'
import caMessages from './locales/ca.json'
import enMessages from './locales/en.json'

const messages = {
  es: esMessages,
  ca: caMessages,
  en: enMessages
}

// Restore the visitor's last language (saved by App.vue); default to Spanish
let savedLocale = null
try {
  savedLocale = localStorage.getItem('lang')
} catch {
  // storage blocked (private mode): fall back to the default
}

const i18n = createI18n({
  legacy: false,
  locale: messages[savedLocale] ? savedLocale : 'es',
  fallbackLocale: 'en',
  messages
})

export default i18n
