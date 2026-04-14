import apiUrl from './api_url'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useUserStore = defineStore('user', () => {
    const users = ref([])
    const user = ref(null)

    async function fetchUsers() {
        try {
            const response = await fetch(`${apiUrl}/user`)
            users.value = await response.json()
        } catch (error) {
            console.error('Failed to fetch users : ', error)
        }
    }

    async function fetchUserById(id) {
        try {
            const response = await fetch(`${apiUrl}/user/${id}`)
            user.value = await response.json()
        } catch (error) {
            console.error('Failed to fetch user : ', error)
        }
    }

    return { users, user, fetchUsers, fetchUserById }
})

export default useUserStore