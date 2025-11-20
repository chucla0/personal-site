import { createI18n } from 'vue-i18n'
import esMessages from './locales/es.json?raw'
import enMessages from './locales/en.json?raw'
// import caMessages from './locales/ca.json?raw'

const messages = {
  es: JSON.parse(esMessages),
  en: JSON.parse(enMessages)
  // ca: JSON.parse(caMessages),
}

const i18n = createI18n({
  legacy: false,
  locale: 'es', // default language
  fallbackLocale: 'en',
  messages
})

export default i18n
