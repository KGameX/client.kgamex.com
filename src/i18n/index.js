import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

const cookieLang = document.cookie.split(';').find(row => row.startsWith('lang='))
let userLang
if (cookieLang) {
    userLang = cookieLang.split('=')[1]
} else {
    userLang = navigator.language.split('-')[0]
}

const i18n = createI18n({
    legacy: false,
    locale: userLang,
    fallbackLocale: 'en',
    messages: { en, fr }
})

export default i18n