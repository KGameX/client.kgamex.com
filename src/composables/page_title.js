import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

export function usePageTitle(title, useRaw) {
    const { t, locale } = useI18n()
    
    const updateTitle = () => {
        document.title = useRaw ? `${title} | KGΛMΞX` : `${t(title)} | KGΛMΞX`
    }
    
    updateTitle()
    watch(() => locale.value, updateTitle)
    
    return { updateTitle }
}