import apiUrl from './api_url'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const loginError = ref(false)
    const signupError = ref(false)
    const usernameExistsError = ref(false)
    const emailExistsError = ref(false)
    
    const usernameExists = ref(false)
    const emailExists = ref(false)

    async function checkAuth() {
        try {
            const response = await fetch(`${apiUrl}/auth/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (response.ok) {
                user.value = await response.json()
            }
        } catch (error) {
            console.error('Failed to check auth : ', error)
        }
    }

    async function login(data) {
        loginError.value = false

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.ok) {
                user.value = await response.json()
                router.push('/')
            } else {
                setTimeout(() => {
                    loginError.value = true
                }, 1000 + Math.random() * 1000 - 500)
            }
        } catch (error) {
            console.error('Failed to login : ', error)
            loginError.value = true
        }
    }

    async function signup(data) {
        signupError.value = false

        usernameExists.value = false
        emailExists.value = false

        usernameExistsError.value = false
        emailExistsError.value = false

        let response

        try {
            response = await fetch(`${apiUrl}/user/username/${data.username}`)

            if (response.ok) {
                usernameExists.value = true
            }

            response = await fetch(`${apiUrl}/user/email/${data.email}`)

            if (response.ok) {
                emailExists.value = true
            }

            if (usernameExists.value || emailExists.value) {
                setTimeout(() => {
                    usernameExistsError.value = usernameExists.value
                    emailExistsError.value = emailExists.value
                    signupError.value = true
                }, 1000 + Math.random() * 1000 - 500)
                return
            }
            
            response = await fetch(`${apiUrl}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.ok) {
                user.value = await response.json()
                router.push('/')
            } else {
                setTimeout(() => {
                    signupError.value = true
                }, 1000 + Math.random() * 1000 - 500)
            }
        } catch (error) {
            console.error('Failed to register : ', error)
            signupError.value = true
        }
    }

    return { user, loginError, signupError, usernameExistsError, emailExistsError, checkAuth, login, signup }
})

export default useUserStore