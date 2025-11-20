import { createI18n } from 'vue-i18n'
import esMessages from './locales/es.json?raw'
import caMessages from './locales/ca.json?raw'
import enMessages from './locales/en.json?raw'

const messages = {
  es: JSON.parse(esMessages),
  ca: JSON.parse(caMessages),
  en: JSON.parse(enMessages)
}

const i18n = createI18n({
  legacy: false,
  locale: 'es', // default language
  fallbackLocale: 'en',
  messages
})

export default i18n
