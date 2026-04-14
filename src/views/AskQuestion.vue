<template>
    <div class="tab">
        <section class="sample">
            <h3>{{ t('ask-question.title') }}</h3>
        </section>

        <section id="textbox-question" class="no-padding">
            <textarea name="question" v-model="questionBody" :placeholder="t('ask-question.form.placeholder')" rows="20" class="textbox no-parent" maxlength="2000"></textarea>
        </section>
        
        <section class="no-padding">
            <button class="button" :disabled="questionBody.length == 0 || submitted" @click="questionStore.createQuestion({ body: questionBody }); submitted=true">{{ t('buttons.submit') }}</button>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import useQuestionStore from '@/stores/question'
const questionStore = useQuestionStore()

const questionBody = ref('')
const submitted = ref(false)
</script>