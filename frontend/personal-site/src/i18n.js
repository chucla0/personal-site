import { createI18n } from 'vue-i18n'
import esMessages from './locales/es.json'
import caMessages from './locales/ca.json'
import enMessages from './locales/en.json'

const messages = {
  es: esMessages,
  ca: caMessages,
  en: enMessages
}

const i18n = createI18n({
  legacy: false,
  locale: 'es', // default language
  fallbackLocale: 'en',
  messages
})

export default i18n
