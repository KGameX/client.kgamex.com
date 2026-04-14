import apiUrl from './api_url'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useAnswerStore = defineStore('answer', () => {
    const answers = ref([])
    const answer = ref(null)

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
        try {
            const response = await fetch(`${apiUrl}/answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            router.push(`/questions/${result.question_id}`)
        } catch (error) {
            console.error('Failed to create answer : ', error)
        }
    }

    return { answers, answer, fetchAnswers, fetchAnswerByQuestionId, createAnswer }
})

export default useAnswerStore