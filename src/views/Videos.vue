<template>
    <div class="tab">
        <title>{{ t('videos.tab-title') }} | KGΛMΞX</title>

        <section class="sample">
            <h3>{{ t('videos.title') }}</h3>
        </section>

        <section class="sample no-padding radio">
            <div>
                <input v-model="tab" @change="tab = 'videos'; videoStore.fetchVideos(1, tab);" class="radio-button" type="radio" id="videos" name="videos" value="videos" checked>
                <label for="videos"><span class="button">{{ t('videos.search.videos') }}</span></label>
            </div>

            <div>
                <input v-model="tab" @change="tab = 'shorts'; videoStore.fetchVideos(1, tab);" class="radio-button" type="radio" id="shorts" name="videos" value="shorts">
                <label for="shorts"><span class="button">{{ t('videos.search.shorts') }}</span></label>
            </div>

            <span class="button" v-if="userStore.user && userStore.user.role_id >= 3" @click="confirmFetch = true">{{ t('videos.fetch-from-youtube') }}</span>

            <div v-if="userStore.user && userStore.user.role_id >= 3 && confirmFetch" class="radio">
                <span class="button" @click="confirmFetch = false; videoStore.fetchFromYouTube()">{{ t('buttons.confirm') }}</span>

                <span class="button" @click="confirmFetch = false">{{ t('buttons.cancel') }}</span>
            </div>
        </section>

        <div class="video-grid" v-if="videoStore.videos.length > 0 && !videoStore.loading">
            <router-link v-for="video in videoStore.videos" :key="video.id" :to="`/videos/${video.id}`" :class="video.is_short ? 'short-card' : 'video-card'" :style="{ backgroundImage: `url(${video.thumbnail_url})` }">
                <div>
                    <p><b>{{ video.video_locales.find(locale => locale.locale_id === localeStore.userLocale)?.name || video.video_locales.find(locale => locale.locale_id === 'en').name }}</b></p>
                </div>
            </router-link>
        </div>
        
        <section v-else-if="videoStore.loading">
            <p>{{ t('messages.loading') }}</p>
        </section>
        
        <section v-else>
            <p>{{ t('videos.no-videos') }}</p>
        </section>

        <section class="sample no-padding flex" v-if="videoStore">
            <div class="flex" v-if="videoStore.metadata.page != 1">
                <span class="button" @click="videoStore.fetchVideos(1, tab)">&lt;&lt;</span>
                <span class="button" @click="videoStore.fetchVideos(videoStore.metadata.page - 1, tab)">&lt;</span>
            </div>

            <span class="block">{{ t('pagination.page', { current: videoStore.metadata.page, total: Math.ceil(videoStore.metadata.total / videoStore.metadata.items_per_page) }) }}</span>
            
            <div class="flex" v-if="videoStore.metadata.page != Math.ceil(videoStore.metadata.total / videoStore.metadata.items_per_page)">
                <span class="button" @click="videoStore.fetchVideos(videoStore.metadata.page + 1, tab)">&gt;</span>
                <span class="button" @click="videoStore.fetchVideos(Math.ceil(videoStore.metadata.total / videoStore.metadata.items_per_page), tab)">&gt;&gt;</span>
            </div>
        </section>

        <section class="sample no-padding">
            <p class="footnote">{{ t('videos.disclaimer', { dayOfLaunch: t(`days.${uptimeStore.dayOfLaunch}`) }) }}</p>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useUserStore from '@/stores/user'
import useVideoStore from '@/stores/video'
import useLocaleStore from '@/stores/locale'
import useUptimeStore from '@/stores/uptime'

const { t } = useI18n()
const userStore = useUserStore()
const videoStore = useVideoStore()
const localeStore = useLocaleStore()
const uptimeStore = useUptimeStore()

const tab = ref('videos')
const confirmFetch = ref(false)
videoStore.fetchVideos()
</script>