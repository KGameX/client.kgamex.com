import apiUrl from './api_url'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useUptimeStore = defineStore('uptime', () => {
    const uptime = ref(null)
    const dayOfLaunch = ref(0)

    async function fetchUptime() {
        try {
            const response = await fetch(`${apiUrl}/uptime`)
            const data = await response.json()
            uptime.value = data.uptime
        } catch (error) {
            console.error('Failed to fetch uptime : ', error)
        }
    }

    async function fetchDayOfLaunch() {
        try {
            const response = await fetch(`${apiUrl}/uptime/day`)
            const data = await response.json()
            dayOfLaunch.value = data.day_of_launch
        } catch (error) {
            console.error('Failed to fetch day of launch : ', error)
        }
    }

    return { uptime, dayOfLaunch, fetchUptime, fetchDayOfLaunch }
})

export default useUptimeStore