import { ref } from 'vue'
import { defineStore } from 'pinia'

const useBeatLeaderStore = defineStore('beatleader', () => {
    const metadata = ref({
        item_per_page: 20,
        page: 1,
        total: 1,
    })
    const playerData = ref(null)
    const scores = ref([])
    const attempts = ref([])
    const loading = ref(true)

    async function fetchScores(params) {
        let response, data

        try {
            loading.value = true
            response = await fetch(`https://api.beatleader.xyz/player/6710843375710982`)
            data = await response.json()
            playerData.value = data
            response = await fetch(`https://api.beatleader.xyz/player/6710843375710982/${params.tab === 'attempts' ? 'scoresstats' : 'scores'}?count=20&sortBy=${params.tab === 'ranked' ? 'pp' : 'date'}&page=${params.page || 1}${params.tab === 'ranked' ? '&type=ranked' : ''}`)
            data = await response.json()
            metadata.value = {
                items_per_page: data.metadata.itemsPerPage,
                page: data.metadata.page,
                total: data.metadata.total
            }
            scores.value = data.data
            loading.value = false
        } catch (error) {
            console.error('Failed to fetch scores : ', error)
        }
    }

    return { metadata, playerData, scores, attempts, loading, fetchScores }
})

export default useBeatLeaderStore