<template>
    <div>
        <title>{{ t('videos.tab-title') }} | KGΛMΞX</title>

        <div class="tab" v-if="videoStore.video && !videoStore.loading">
            <section class="sample no-padding">
                <div :class="videoStore.video.is_short ? 'short-thumbnail' : 'video-thumbnail'" :style="{ backgroundImage: `url(${videoStore.video.thumbnail_url})` }"></div>
            </section>

            <section class="sample">
                <h4>{{ videoStore.video.video_locales.find(locale => locale.locale_id === localeStore.userLocale)?.name || videoStore.video.video_locales.find(locale => locale.locale_id === 'en').name }}</h4>
            </section>

            <section class="sample">
                <p>{{ t('video.published-at', { date: new Date(videoStore.video.published_at).toLocaleDateString() }) }}</p>
            </section>

            <section class="sample no-padding">
                <a :href="`https://www.youtube.com/watch?v=${videoStore.video.id}`" target="_blank"><span class="button" id="youtube">{{ t('video.watch') }}</span></a>
            </section>
            
            <section>
                <p>{{ videoStore.video.video_locales.find(locale => locale.locale_id === localeStore.userLocale)?.description || videoStore.video.video_locales.find(locale => locale.locale_id === 'en').description }}</p>
            </section>
        </div>

        <div class="tab" v-else-if="videoStore.loading">
            <section>
                <p>{{ t('messages.loading') }}</p>
            </section>
        </div>
        
        <div class="tab" v-else>
            <section>
                <p>{{ t('video.not-found') }}</p>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useVideoStore from '@/stores/video'
import useLocaleStore from '@/stores/locale'

const { t } = useI18n()
const videoStore = useVideoStore()
const route = useRoute()
const localeStore = useLocaleStore()

videoStore.fetchVideoById(route.params.id)
</script>