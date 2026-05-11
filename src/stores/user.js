import apiUrl from './api_url'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const loginError = ref(false)
    const signupError = ref(false)
    const updateSuccess = ref(false)
    const updateError = ref(false)
    const usernameExistsError = ref(false)
    const emailExistsError = ref(false)
    const submitted = ref(false)

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

    async function renewAuth() {
        try {
            const response = await fetch(`${apiUrl}/auth/renew`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (response.ok) {
                user.value = await response.json()
            }
        } catch (error) {
            console.error('Failed to renew auth : ', error)
        }
    }

    async function redirectIfAuthenticated() {
        if (user.value) {
            router.push('/')
        }
    }

    async function checkRole(roleId, failPath) {
        if (!user.value) {
            router.push(failPath)
            return
        } else if (user.value.role_id < roleId) {
            router.push(failPath)
            return
        }
    }

    async function login(data) {
        loginError.value = false
        submitted.value = true

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

        submitted.value = false
    }

    async function signup(data) {
        signupError.value = false
        submitted.value = true
        usernameExistsError.value = false
        emailExistsError.value = false

        try {
            const response = await fetch(`${apiUrl}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.ok) {
                user.value = await response.json()
                router.push('/')
            } else if (response.status === 409) {
                setTimeout(async () => {
                    const errorData = await response.json()
                    usernameExistsError.value = errorData.username_exists
                    emailExistsError.value = errorData.email_exists
                    submitted.value = false
                }, 1000 + Math.random() * 1000 - 500)
            } else {
                setTimeout(() => {
                    signupError.value = true
                    submitted.value = false
                }, 1000 + Math.random() * 1000 - 500)
            }
        } catch (error) {
            console.error('Failed to register : ', error)
            signupError.value = true
            submitted.value = false
        }
    }

    async function updateAccount(data) {
        updateSuccess.value = false
        updateError.value = false
        submitted.value = true
        usernameExistsError.value = false
        emailExistsError.value = false
        
        let updateData = {}

        try {
            if (data.username) updateData.username = data.username
            if (data.email) updateData.email = data.email
            if (data.displayName) updateData.display_name = data.displayName

            const response = await fetch(`${apiUrl}/user`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updateData)
            })

            if (response.ok) {
                user.value = await response.json()
                updateSuccess.value = true
                submitted.value = false
            } else if (response.status === 409) {
                setTimeout(async () => {
                    const errorData = await response.json()
                    usernameExistsError.value = errorData.username_exists
                    emailExistsError.value = errorData.email_exists
                    submitted.value = false
                }, 1000 + Math.random() * 1000 - 500)
            } else {
                setTimeout(() => {
                    updateError.value = true
                    submitted.value = false
                }, 1000 + Math.random() * 1000 - 500)
            }
        } catch (error) {
            console.error('Failed to update account : ', error)
            updateError.value = true
            submitted.value = false
        }
    }

    async function deleteAccount() {
        try {
            await fetch(`${apiUrl}/user`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            user.value = null
            router.push('/')
        } catch (error) {
            console.error('Failed to delete account : ', error)
        }
    }

    async function removeEmail() {
        updateError.value = false
        updateSuccess.value = false
        
        try {
            const response = await fetch(`${apiUrl}/user/email`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (response.ok) {
                user.value = await response.json()
                updateSuccess.value = true
            } else {
                setTimeout(() => {
                    updateError.value = true
                }, 1000 + Math.random() * 1000 - 500)
            }
        } catch (error) {
            console.error('Failed to remove email : ', error)
            setTimeout(() => {
                updateError.value = true
            }, 1000 + Math.random() * 1000 - 500)
        }
    }

    async function logout() {
        fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        
        router.push('/')
        user.value = null
    }

    function resetFlags() {
        loginError.value = false
        signupError.value = false
        updateSuccess.value = false
        updateError.value = false
        usernameExistsError.value = false
        emailExistsError.value = false
    }

    return { user, loginError, signupError, updateSuccess, updateError, usernameExistsError, emailExistsError, submitted, checkAuth, renewAuth, redirectIfAuthenticated, checkRole, login, signup, updateAccount, deleteAccount, removeEmail, logout, resetFlags }
})

export default useUserStore