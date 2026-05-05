import { createI18n } from 'vue-i18n'

// IMPORT ALL TRANSLATION JSON FILES
import en from '../i18n/en.json'
import fr from '../i18n/fr.json'
import es from '../i18n/es.json'
import it from '../i18n/it.json'
import id from '../i18n/id.json'
import zh from '../i18n/zh.json'
import ja from '../i18n/ja.json'
import ru from '../i18n/ru.json'

const messages = {
  en,
  fr,
  es,
  it,
  id,
  zh,
  ja,
  ru,
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
