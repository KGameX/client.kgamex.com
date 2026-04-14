import apiUrl from './api_url'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useQuestionStore = defineStore('question', () => {
    const questions = ref([])
    const loading = ref(true)
    const question = ref(null)
    const notFound = ref(false)

    async function fetchQuestions() {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/question`)
            questions.value = await response.json()
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
                notFound.value = false
            } else if (response.status === 404) {
                question.value = null
                notFound.value = true
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

    return { questions, loading, question, notFound, fetchQuestions, fetchQuestionById, createQuestion }
})

export default useQuestionStore