import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

export function usePageTitle(title, useRaw, noSuffix) {
    const { t, locale } = useI18n()
    
    const updateTitle = () => {
        document.title = useRaw ? `${title}${noSuffix ? '' : ' | KGΛMΞX'}` : `${t(title)}${noSuffix ? '' : ' | KGΛMΞX'}`
    }
    
    updateTitle()
    watch(() => locale.value, updateTitle)
    
    return { updateTitle }
}