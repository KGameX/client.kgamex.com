<template>
    <div class="tab" v-if="question && !loading">
        <section>
            <p>{{ t('question.asked', {username: user?.display_name || t('question.anonymous'), date: new Date(question.created_at).toLocaleDateString()}) }}</p>
            <h4>{{ question.body }}</h4>
        </section>

        <section>
            <div v-if="answer">
                <p>{{ t('question.status.answered', {date: new Date(answer.created_at).toLocaleDateString()}) }}</p>
                <h6>{{ answer.body }}</h6>
            </div>

            <div v-else>
                <p>{{ t('question.status.unanswered') }}</p>
            </div>
        </section>
    </div>

    <div class="tab" v-else-if="loading">
        <section>
            <p>{{ t('messages.loading') }}</p>
        </section>
    </div>
    
    <div class="tab" v-else>
        <section>
            <p>{{ t('question.not-found') }}</p>
        </section>
    </div>

</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

import useUserStore from '@/stores/user'
import useQuestionStore from '@/stores/question'
import useAnswerStore from '@/stores/answer'

const userStore = useUserStore()
const questionStore = useQuestionStore()
const answerStore = useAnswerStore()

const question = computed(() => questionStore.question)
const notFound = computed(() => questionStore.notFound)
const loading = computed(() => questionStore.loading)
const answer = computed(() => answerStore.answer)
const user = computed(() => userStore.user)

onMounted(async () => {
    await questionStore.fetchQuestionById(route.params.id)
    await answerStore.fetchAnswerByQuestionId(route.params.id)

    if (question.value?.user_id) {
        await userStore.fetchUserById(question.value.user_id)
    }
})
</script>