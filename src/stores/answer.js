import apiUrl from './api_url'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useAnswerStore = defineStore('answer', () => {
    const answers = ref([])
    const answer = ref(null)
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
                console.log(result)
                router.push(`/questions/${result.id}`)
            } else {
                submitError.value = true
            }
        } catch (error) {
            console.error('Failed to create answer : ', error)
        }
    }

    return { answers, answer, submitError, fetchAnswers, fetchAnswerByQuestionId, createAnswer }
})

export default useAnswerStore