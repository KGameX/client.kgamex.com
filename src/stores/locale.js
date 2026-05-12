import apiUrl from './api_url'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const useLocaleStore = defineStore('locale', () => {
    const locales = ref([])
    const userLocale = ref(document.cookie.split(';').find(cookie => cookie.trim().startsWith('lang='))?.split('=')[1] || navigator.language.split('-')[0])
    const loading = ref(true)

    async function fetchLocales() {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/locale`)
            locales.value = await response.json()             
            loading.value = false
        } catch (error) {
            console.error('Failed to fetch locales : ', error)
        }
    }

    function setLocale(locale) {
        userLocale.value = locale
        document.cookie = `lang=${locale};path=/;max-age=7776000`
    }

    return { locales, userLocale, loading, fetchLocales, setLocale }
})

export default useLocaleStore