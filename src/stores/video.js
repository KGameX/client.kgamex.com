import apiUrl from './api_url'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const useVideoStore = defineStore('video', () => {
    const metadata = ref({
        items_per_page: 50,
        page: 1,
        total: 1,
    })
    const videos = ref([])
    const video = ref(null)
    const loading = ref(true)

    async function fetchVideos(page, tab) {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/video?page=${page || 1}&isShort=${tab === 'shorts'}`)
            const data = await response.json()
            metadata.value = data.metadata
            videos.value = data.data
            loading.value = false
        } catch (error) {
            console.error('Failed to fetch videos : ', error)
        }
    }
    
    async function fetchVideoById(id) {
        try {
            loading.value = true
            const response = await fetch(`${apiUrl}/video/${id}`)

            if (response.ok) {
                video.value = await response.json()
            } else if (response.status === 404) {
                video.value = null
            }

            loading.value = false
        } catch (error) {
            console.error('Failed to fetch video : ', error)
        }
    }

    async function fetchFromYouTube() {
        try {
            const response = await fetch(`${apiUrl}/video/fetch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            if (response.ok) {
                alert('Videos are being fetched from YouTube API')
            } else {
                alert('Failed to fetch videos from YouTube API')
            }
        } catch (error) {
            console.error('Failed to fetch videos from YouTube API : ', error)
        }
    }

    return { metadata, videos, video, loading, fetchVideos, fetchVideoById, fetchFromYouTube }
})

export default useVideoStore