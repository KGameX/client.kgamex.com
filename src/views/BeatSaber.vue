<template>
    <div class="tab">
        <section class="main-activity" id="beat-saber">
            <div>
                <h2>Beat Saber</h2>
            </div>
        </section>

        <div class="player-stats" v-if="beatLeaderStore.playerData">
            <div class="player-data">
                <h6>{{ (beatLeaderStore.playerData.accPp + beatLeaderStore.playerData.passPp + beatLeaderStore.playerData.techPp).toFixed(2) }} pp</h6>
            </div>

            <div class="player-data">
                <p>{{ t('activities.beat-saber.player-stats.global-country-rank') }}</p>
                <h6>{{ beatLeaderStore.playerData.rank }} / {{ beatLeaderStore.playerData.countryRank }}</h6>
            </div>

            <div class="player-data">
                <p>{{ t('activities.beat-saber.player-stats.average-median-accuracy') }}</p>
                <h6>{{ (beatLeaderStore.playerData.scoreStats.averageRankedAccuracy * 100).toFixed(2) }} % / {{ (beatLeaderStore.playerData.scoreStats.medianRankedAccuracy * 100).toFixed(2) }} %</h6>
            </div>

            <div class="player-data">
                <p>{{ t('activities.beat-saber.player-stats.play-count') }}</p>
                <h6>{{ t('activities.beat-saber.player-stats.total-play-count', { total: beatLeaderStore.playerData.scoreStats.totalPlayCount, ranked: beatLeaderStore.playerData.scoreStats.rankedPlayCount }) }}</h6>
            </div>

            <div class="player-data">
                <p>{{ t('activities.beat-saber.player-stats.play-time') }}</p>
                <h6>{{ (beatLeaderStore.playerData.scoreStats.scorePlaytime / 60).toFixed(1) }} h</h6>
            </div>
        </div>

        <section class="sample no-padding flex">
            <div>
                <input v-model="tab" @change="tab = 'ranked'" class="radio-button" type="radio" id="ranked" name="ranked" value="ranked" checked>
                <label for="ranked"><span class="button">{{ t('activities.beat-saber.score-sort.ranked') }}</span></label>
            </div>

            <div>
                <input v-model="tab" @change="tab = 'scores'" class="radio-button" type="radio" id="scores" name="scores" value="scores">
                <label for="scores"><span class="button">{{ t('activities.beat-saber.score-sort.all-scores') }}</span></label>
            </div>

            <div>
                <input v-model="tab" @change="tab = 'attempts'" class="radio-button" type="radio" id="attempts" name="attempts" value="attempts">
                <label for="attempts"><span class="button">{{ t('activities.beat-saber.score-sort.attempts') }}</span></label>
            </div>
        </section>
        
        <div class="score-list" v-if="beatLeaderStore.scores.length > 0 && !beatLeaderStore.loading">
            <div class="score-card" v-for="score in beatLeaderStore.scores" :key="score.id">
                <img :src="`${score.leaderboard.song.coverImage}`" class="score-cover">                

                <div class="score-text">
                    <div>
                        <h6>{{ score.leaderboard.song.name }} <span class="footnote">{{ score.leaderboard.song.subName }}</span></h6>
                        <p>{{ score.leaderboard.song.author }} <span class="footnote">{{ score.leaderboard.song.mapper }}</span></p>
                        <p>{{ parseMode(score.leaderboard.difficulty.mode) + ' ' + parseDifficulty(score.leaderboard.difficulty.value) }}<span v-if="score.leaderboard.difficulty.stars">, {{ score.leaderboard.difficulty.stars?.toFixed(2) }} ★</span></p>
                    </div>

                    <div class="score-data">
                        <div>
                            <p>{{ new Date(score.timepost * 1000).toLocaleDateString() }}</p>
                            <p v-if="tab === 'attempts'">{{ t(`activities.beat-saber.score.attempt-status.${score.endType}`, { time: Math.floor(score.time / 60) + ":" + (score.time % 60).toFixed(0).padStart(2, '0'), startTime: Math.floor(score.startTime / 60) + ":" + (score.startTime % 60).toFixed(0).padStart(2, '0') }) }}</p>
                        </div>

                        <div>
                            <p class="flex">
                                <span class="block pp" :title="score.leaderboard.difficulty.stars && score.weight ? t('activities.beat-saber.score.weighted-pp', { value: (score.pp * score.weight).toFixed(2) }) : ''">{{ !score.leaderboard.difficulty.stars ? t('activities.beat-saber.score.unranked') : score.pp.toFixed(2) + ' pp' }}</span>
                                <span class="block score">{{ score.baseScore.toLocaleString() }}</span>
                            </p>

                            <p class="flex">
                                <span class="block acc-left" :title="t('activities.beat-saber.score.left-hand-accuracy')">{{ score.accLeft.toFixed(2) }}</span>
                                <span class="block acc-right" :title="t('activities.beat-saber.score.right-hand-accuracy')">{{ score.accRight.toFixed(2) }}</span>
                                <span class="block score" :title="parseMistakes(score)">{{ (score.accuracy * 100).toFixed(2) }} %</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section v-else-if="beatLeaderStore.loading">
            <p>{{ t('messages.loading') }}</p>
        </section>

        <section v-else>
            <p>{{ t('activities.beat-saber.no-scores') }}</p>
        </section>

        <Pagination :store="beatLeaderStore" :fetchPage="beatLeaderStore.fetchScores" :params="{ tab: tab }"/>

        <span class="sample no-padding">
            <p class="footnote">{{ t('activities.beat-saber.footnote') }}</p>
        </span>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import useBeatLeaderStore from '@/stores/beatleader'
import Pagination from '@/components/Pagination.vue'
import { usePageTitle } from '@/composables/page_title'

const { t } = useI18n()
const beatLeaderStore = useBeatLeaderStore()
usePageTitle('Beat Saber', true)

beatLeaderStore.fetchScores({ tab: 'ranked' })

const tab = ref('ranked')

watch(tab, (newTab) => {
    beatLeaderStore.fetchScores({ tab: newTab })
})

function parseMistakes(score) {
    const mistakes = []

    if (score.badCuts > 0) {
        mistakes.push(t('activities.beat-saber.score.bad-cuts', { count: score.badCuts }))
    }

    if (score.missedNotes > 0) {
        mistakes.push(t('activities.beat-saber.score.missed-notes', { count: score.missedNotes }))
    }

    if (score.bombCuts > 0) {
        mistakes.push(t('activities.beat-saber.score.bomb-cuts', { count: score.bombCuts }))
    }

    if (score.wallsHit > 0) {
        mistakes.push(t('activities.beat-saber.score.walls-hit', { count: score.wallsHit }))
    }

    if (mistakes.length === 0) {
        return t('activities.beat-saber.score.full-combo')
    }
    
    return mistakes.join(', ')
}

function parseDifficulty(difficulty) {
    switch (difficulty) {
        case 1:
            return 'Easy'
        case 3:
            return 'Normal'
        case 5:
            return 'Hard'
        case 7:
            return 'Expert'
        case 9:
            return 'Expert+'
        default:
            return difficulty
    }
}

function parseMode(mode) {
    switch (mode) {
        case 1:
            return 'Standard'
        case 2:
            return 'One Saber'
        case 3:
            return 'No Arrows'
        case 4:
            return '90°'
        case 5:
            return '360°'
        default:
            return mode
    }
}
</script>