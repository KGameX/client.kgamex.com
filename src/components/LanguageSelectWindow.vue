<template>
    <div class="language-select-container">
        <section class="language-select-window">
            <h4>{{ t("languageSelectWindow.title") }}</h4>
            <div class="radio">
                <div v-for="(langName, langCode) in langs" :key="langCode">
                    <input :id="langCode" :value="langCode" v-model="locale" @change="selectLanguage(langCode)" class="radio-button" type="radio">
                    <label :for="langCode"><span class="button">{{ langName }}</span></label>
                </div>
            </div>
            <p><span id="close" class="button">{{ t("buttons.close") }}</span></p>
        </section>
        
        <div class="language-select-cover-box"></div>
    </div>

</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const emit = defineEmits(['close-language-select-window'])

const { t, locale } = useI18n()

const langs = {
    en: "English",
    fr: "Français"
}

function selectLanguage(lang) {
    document.cookie = `lang=${lang};path=/;max-age=7776000`
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