import apiUrl from './api_url'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useQuestionCommentStore = defineStore('questionComment', () => {
    const metadata = ref({
        items_per_page: 50,
        page: 1,
        total: 1,
    })
    const comments = ref([])
    const loading = ref(true)
    const submitted = ref(false)
    const submitError = ref(false)

    async function fetchCommentsByQuestionId(params) {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/question/comment/${params.questionId}?page=${params.page || 1}`)
            const data = await response.json()
            metadata.value = data.metadata
            comments.value = data.comments
            loading.value = false
        } catch (error) {
            console.error('Failed to fetch comments : ', error)
        }
    }

    async function createComment(data) {
        submitted.value = true
        submitError.value = false

        try {
            const response = await fetch(`${apiUrl}/question/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const result = await response.json()
                comments.value.unshift(result)
                comments.value = comments.value.slice(0, metadata.value.items_per_page)
                metadata.value.total += 1
            } else {
                submitError.value = true
            }
        } catch (error) {
            console.error('Failed to create comment : ', error)
            submitError.value = true
        }
        
        submitted.value = false
    }

    return { metadata, comments, loading, submitted, submitError, fetchCommentsByQuestionId, createComment }
})

export default useQuestionCommentStore