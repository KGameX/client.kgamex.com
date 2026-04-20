<template>
    <div class="tab">
        <title>{{ t('ask-question.tab-title') }} | KGΛMΞX</title>
        
        <section class="sample">
            <h3>{{ t('ask-question.title') }}</h3>
        </section>

        <section id="textbox-question" class="no-padding">
            <textarea name="question" v-model="questionBody" :placeholder="t('ask-question.form.placeholder')" rows="10" class="textbox no-parent" maxlength="500"></textarea>
        </section>
        
        <section class="small-block">
            <p>{{ questionBody.length }} / 500</p>
        </section>

        <section class="no-padding flex">
            <div v-if="userStore.user">
                <input type="checkbox" name="anonymous" id="anonymous"  v-model="anonymous">
                <label for="anonymous"><span class="button">{{ t('ask-question.form.anonymous') }}</span></label>
            </div>
            <button class="button" :disabled="questionBody.length == 0 || submitted" @click="questionStore.createQuestion({ user_id: anonymous ? null : userStore.user.id, body: questionBody }); submitted=true">{{ t('buttons.submit') }}</button>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useQuestionStore from '@/stores/question'
import useUserStore from '@/stores/user'

const { t } = useI18n()

const questionStore = useQuestionStore()
const userStore = useUserStore()

const questionBody = ref('')
const anonymous = ref(false)
const submitted = ref(false)
</script>