import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import ca from './locales/ca.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'es', // default language
  fallbackLocale: 'en',
  messages: {
    es,
    ca,
    en
  }
})

export default i18n
