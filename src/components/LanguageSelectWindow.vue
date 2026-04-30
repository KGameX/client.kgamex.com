<template>
    <div class="language-select-container">
        <section class="language-select-window">
            <h4>{{ t("languageSelectWindow.title") }}</h4>
            <div class="padding radio" v-if="!localeStore.loading">
                <div v-for="locale in localeStore.locales" :key="locale.code">
                    <input :id="locale.id" :value="locale.id" v-model="localeStore.userLocale" @change="selectLocale(locale.id)" class="radio-button" type="radio">
                    <label :for="locale.id"><span class="button">{{ locale.name }}</span></label>
                </div>
            </div>
            <p v-else>{{ t("messages.loading") }}</p>
            <p><span id="close" class="button">{{ t("buttons.close") }}</span></p>
        </section>
        
        <div class="language-select-cover-box"></div>
    </div>

</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import useLocaleStore from '@/stores/locale'

const emit = defineEmits(['close-language-select-window'])
const { t, locale } = useI18n()
const localeStore = useLocaleStore()

localeStore.fetchLocales()
locale.value = localeStore.userLocale

function selectLocale(lang) {
    document.cookie = `lang=${lang};path=/;max-age=7776000`
    localeStore.setLocale(lang)
    locale.value = lang
}

onMounted(() => {
    const windowCoverBox = document.getElementsByClassName('language-select-cover-box')[0]
    const closeButton = document.getElementById('close')

    windowCoverBox.addEventListener('click', () => {
        emit('close-language-select-window')
    });

    closeButton.addEventListener('click', () => {
        emit('close-language-select-window')
    });
});
</script>