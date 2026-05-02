<template>
    <div>
        <title>{{ t('reply-question.tab-title') }} | KGΛMΞX</title>

        <div class="tab" v-if="questionStore.question && !questionStore.loading">
            <section>
                <p>{{ t('question.asked', { username: questionStore.question.user?.display_name || t('question.anonymous'), date: new Date(questionStore.question.created_at).toLocaleDateString()}) }}</p>
                <h4>{{ questionStore.question.body }}</h4>
            </section>

            <section id="textbox-question" class="no-padding">
                <textarea name="reply" v-model="replyBody" :placeholder="t('reply-question.form.placeholder')" rows="5" class="textbox no-parent" maxlength="500"></textarea>
            </section>
            
            <section class="small-block">
                <p>{{ replyBody.length }} / 500</p>
                <p class="danger" v-if="answerStore.submitError">{{ t('messages.submit-error') }}</p>
            </section>

            <section class="no-padding flex">
                <button class="button" :disabled="replyBody.length == 0 || answerStore.submitted" @click="answerStore.createAnswer({ question_id: route.params.id, body: replyBody }); submitted=true">{{ t('buttons.submit') }}</button>
            </section>
        </div>

        <div class="tab" v-else-if="questionStore.loading">
            <section>
                <p>{{ t('messages.loading') }}</p>
            </section>
        </div>
        
        <div class="tab" v-else>
            <section>
                <p>{{ t('question.not-found') }}</p>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useAnswerStore from '@/stores/answer'
import useQuestionStore from '@/stores/question'
import useUserStore from '@/stores/user'

const { t } = useI18n()
const route = useRoute()

const answerStore = useAnswerStore()
const questionStore = useQuestionStore()
const userStore = useUserStore()

userStore.checkRole(3, '/questions')

questionStore.fetchQuestionById(route.params.id)

const replyBody = ref('')
</script>