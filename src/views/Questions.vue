<template>
    <div class="tab">
        <title>{{ t('questions.tab-title') }} | KGΛMΞX</title>

        <section class="sample">
            <h3>{{ t('questions.title') }}</h3>
        </section>
        
        <section class="sample no-padding">
            <router-link to="/questions/ask">
                <span class="button">{{ t('questions.ask') }}</span>
            </router-link>
        </section>

        <div v-if="questionStore.questions.length > 0 && !questionStore.loading">        
            <section class="question-list">
                <router-link v-for="question in questionStore.questions" :key="question.id" :to="`/questions/${question.id}`" class="question-card">
                    <div>
                        <h6>{{ question.body }}</h6>
                        <p>{{ t('questions.asked', { username: question.user?.display_name || t('questions.anonymous'), date: new Date(question.created_at).toLocaleDateString() }) }}</p>
                    </div>
                    
                    <div>
                        <p>
                            <span class="block" :class="{ 'answered': question.answer }">
                                {{ question.answer ? t('questions.status.answered') : t('questions.status.unanswered') }}
                            </span>
                        </p>
                    </div>
                </router-link>
            </section>
        </div>
        
        <section v-else-if="questionStore.loading">
            <p>{{ t('messages.loading') }}</p>
        </section>
        
        <section v-else>
            <p>{{ t('questions.no-questions') }}</p>
        </section>

        <section class="sample no-padding flex" v-if="questionStore">
            <div class="flex" v-if="questionStore.metadata.page != 1">
                <span class="button" @click="questionStore.fetchQuestions(1)">&lt;&lt;</span>
                <span class="button" @click="questionStore.fetchQuestions(questionStore.metadata.page - 1)">&lt;</span>
            </div>

            <span class="block">{{ t('questions.page', { current: questionStore.metadata.page, total: Math.ceil(questionStore.metadata.total / questionStore.metadata.items_per_page) }) }}</span>
            
            <div class="flex" v-if="questionStore.metadata.page != Math.ceil(questionStore.metadata.total / questionStore.metadata.items_per_page)">
                <span class="button" @click="questionStore.fetchQuestions(questionStore.metadata.page + 1)">&gt;</span>
                <span class="button" @click="questionStore.fetchQuestions(Math.ceil(questionStore.metadata.total / questionStore.metadata.items_per_page))">&gt;&gt;</span>
            </div>
        </section>        
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import useQuestionStore from '@/stores/question'

const { t } = useI18n()
const questionStore = useQuestionStore()

questionStore.fetchQuestions()
</script>