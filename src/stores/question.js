import apiUrl from './api_url'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useQuestionStore = defineStore('question', () => {
    const metadata = ref({
        items_per_page: 50,
        page: 1,
        total: 1,
    })
    const questions = ref([])
    const question = ref(null)
    const loading = ref(true)

    async function fetchQuestions(page) {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/question?page=${page || 1}`)
            const data = await response.json()
            metadata.value = data.metadata
            questions.value = data.questions
            loading.value = false
        } catch (error) {
            console.error('Failed to fetch questions : ', error)
        }
    }

    async function fetchQuestionById(id) {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/question/${id}`)

            if (response.ok) {
                question.value = await response.json()
            } else if (response.status === 404) {
                question.value = null
            }

            loading.value = false
        } catch (error) {
            console.error('Failed to fetch question : ', error)
        }
    }

    async function createQuestion(data) {
        try {
            const response = await fetch(`${apiUrl}/question`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            router.push(`/questions/${result.id}`)
        } catch (error) {
            console.error('Failed to create question : ', error)
        }
    }

    return { metadata, questions, loading, question, fetchQuestions, fetchQuestionById, createQuestion }
})

export default useQuestionStore