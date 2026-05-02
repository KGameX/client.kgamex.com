import apiUrl from './api_url'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useAnswerStore = defineStore('answer', () => {
    const answers = ref([])
    const answer = ref(null)
    const submitted = ref(false)
    const submitError = ref(false)

    async function fetchAnswers() {
        try {
            const response = await fetch(`${apiUrl}/answer`)
            answers.value = await response.json()
        } catch (error) {
            console.error('Failed to fetch answers : ', error)
        }
    }

    async function fetchAnswerByQuestionId(id) {
        try {
            const response = await fetch(`${apiUrl}/answer/${id}`)
            if (response.ok) {
                answer.value = await response.json()
            }
        } catch (error) {
            console.error('Failed to fetch answers : ', error)
        }
    }

    async function createAnswer(data) {
        submitted.value = true
        submitError.value = false

        try {
            const response = await fetch(`${apiUrl}/answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            
            if (response.ok) {
                const result = await response.json()
                router.push(`/questions/${result.id}`)
            } else {
                submitError.value = true
            }
        } catch (error) {
            console.error('Failed to create answer : ', error)
            submitError.value = true
        }

        submitted.value = false
    }

    return { answers, answer, submitted, submitError, fetchAnswers, fetchAnswerByQuestionId, createAnswer }
})

export default useAnswerStore