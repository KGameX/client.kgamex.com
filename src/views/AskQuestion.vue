<template>
    <div class="tab">
        <section class="sample">
            <h3>{{ t('ask-question.title') }}</h3>
        </section>

        <section id="textbox-question" class="no-padding">
            <textarea name="question" v-model="questionBody" :placeholder="t('ask-question.form.placeholder')" rows="10" class="textbox no-parent" maxlength="500"></textarea>
        </section>
        
        <section class="small-block">
            <p>{{ questionBody.length }} / 500</p>
        </section>

        <section class="no-padding">
            <button class="button" :disabled="questionBody.length == 0 || submitted" @click="questionStore.createQuestion({ body: questionBody }); submitted=true">{{ t('buttons.submit') }}</button>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useQuestionStore from '@/stores/question'

const { t } = useI18n()

document.title = t('ask-question.tab-title') + ' | KGΛMΞX'

const questionStore = useQuestionStore()
const questionBody = ref('')
const submitted = ref(false)
</script>