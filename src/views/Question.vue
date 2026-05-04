<template>
    <div>
        <title>{{ t('questions.tab-title') }} | KGΛMΞX</title>

        <div class="tab" v-if="questionStore.question && !questionStore.loading">
            <section>
                <p :title="questionStore.question.user?.username">{{ t('question.asked', { username: questionStore.question.user?.display_name || t('question.anonymous'), date: new Date(questionStore.question.created_at).toLocaleDateString()}) }}</p>
                <h4>{{ questionStore.question.body }}</h4>
            </section>

            <section>
                <div v-if="questionStore.question.answer">
                    <p title="kgamex_vk">{{ t('question.status.answered', {date: new Date(questionStore.question.answer.created_at).toLocaleDateString()}) }}</p>
                    <h6>{{ questionStore.question.answer.body }}</h6>
                </div>

                <div v-else>
                    <p>{{ t('question.status.unanswered') }}</p>
                </div>
            </section>

            <section class="no-padding">
                <router-link :to="`/questions/${questionStore.question.id}/reply`" v-if="userStore.user && userStore.user.role_id >= 3 && !questionStore.question.answer">
                    <span class="button">{{ t('questions.reply') }}</span>
                </router-link>
            </section>

            <div v-if="questionCommentStore && !questionCommentStore.loading">
                <section class="sample">
                    <p>{{ t('question.comments.count', { count: questionCommentStore.metadata.total }) }}</p>
                </section>

                <div v-if="userStore.user">
                    <section id="textbox-question" class="no-padding">
                        <textarea name="question" v-model="questionCommentBody" :placeholder="t('question.comments.comment-placeholder')" rows="5" class="textbox no-parent" maxlength="500"></textarea>
                    </section>
            
                    <section class="small-block">
                        <p>{{ questionCommentBody.length }} / 500</p>
                        <p class="danger" v-if="questionCommentStore.submitError">{{ t('messages.submit-error') }}</p>
                    </section>

                    <section class="no-padding flex">
                        <button class="button" :disabled="questionCommentBody.length == 0 || questionCommentStore.submitted" @click="questionCommentStore.createComment({ question_id: questionStore.question.id, body: questionCommentBody }); questionCommentBody = ''">{{ t('buttons.submit') }}</button>
                    </section>
                </div>

                <section class="sample no-padding" v-else>
                    <p class="footnote">{{ t('question.comments.login-required') }}</p>
                </section>

                <section v-for="comment in questionCommentStore.comments" :key="comment.id">
                    <p><b :title="comment.user.username">{{ comment.user.display_name }}</b> <span class="footnote">{{ new Date(comment.created_at).toLocaleDateString() }}</span></p>
                    <p>{{ comment.body }}</p>
                </section>

                <Pagination :store="questionCommentStore" :fetchPage="questionCommentStore.fetchCommentsByQuestionId" :params="{ questionId: questionStore.question.id }"/>
            </div>
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
import useQuestionStore from '@/stores/question'
import useQuestionCommentStore from '@/stores/question_comment'
import useUserStore from '@/stores/user'
import Pagination from '@/components/Pagination.vue'

const { t } = useI18n()
const route = useRoute()
const questionStore = useQuestionStore()
const questionCommentStore = useQuestionCommentStore()
const userStore = useUserStore()

const questionCommentBody = ref('')

questionStore.fetchQuestionById(route.params.id)
questionCommentStore.fetchCommentsByQuestionId({ questionId: route.params.id })
</script>