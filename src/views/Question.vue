<template>
    <div>
        <div class="tab" v-if="questionStore.question && !questionStore.loading">
            <section>
                <p>{{ t('question.asked', { username: questionStore.question.user?.display_name || t('question.anonymous'), date: new Date(questionStore.question.created_at).toLocaleDateString()}) }}</p>
                <h4>{{ questionStore.question.body }}</h4>
            </section>

            <section>
                <div v-if="questionStore.question.answer">
                    <p>{{ t('question.status.answered', {date: new Date(questionStore.question.answer.created_at).toLocaleDateString()}) }}</p>
                    <h6>{{ questionStore.question.answer.body }}</h6>
                </div>

                <div v-else>
                    <p>{{ t('question.status.unanswered') }}</p>
                </div>
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
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useQuestionStore from '@/stores/question'

const { t } = useI18n()
const route = useRoute()

document.title = t('questions.tab-title') + ' | KGΛMΞX'

const questionStore = useQuestionStore()
questionStore.fetchQuestionById(route.params.id)
</script>