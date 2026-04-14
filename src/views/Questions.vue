<template>
    <title>{{ t('questions.tab-title') }} | KGΛMΞX</title>

    <div class="tab">
        <section class="sample">
            <h3>{{ t('questions.title') }}</h3>
        </section>

        <section class="sample no-padding">
            <a href="/questions/ask">
                <span class="button">{{ t('questions.ask') }}</span>
            </a>
        </section>

        <section class="question-list" v-if="questionStore.questions.length > 0 && !questionStore.loading">
            <a v-for="question in questionStore.questions" :key="question.id" :href="`/questions/${question.id}`" class="question-card">
                <div>
                    <h6>{{ question.body }}</h6>
                    <p>{{ t('questions.asked', { username: userStore.users.find(u => u.id === question.user_id)?.display_name || t('questions.anonymous'), date: new Date(question.created_at).toLocaleDateString() }) }}</p>
                </div>
                
                <div>
                    <p>
                        <span class="block" :class="{ 'answered': answerStore.answers.find(answer => answer.question_id === question.id) }">
                            {{ answerStore.answers.find(answer => answer.question_id === question.id) ? t('questions.status.answered') : t('questions.status.unanswered') }}
                        </span>
                    </p>
                </div>
            </a>
        </section>

        <section v-else-if="questionStore.loading">
            <p>{{ t('messages.loading') }}</p>
        </section>

        <section v-else>
            <p>{{ t('questions.no-questions') }}</p>
        </section>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import useUserStore from '@/stores/user'
import useQuestionStore from '@/stores/question'
import useAnswerStore from '@/stores/answer'

const userStore = useUserStore()
const questionStore = useQuestionStore()
const answerStore = useAnswerStore()

userStore.fetchUsers()
questionStore.fetchQuestions()
answerStore.fetchAnswers()
</script>