<template>
    <div class="tab">
        <section class="sample">
            <h3>{{ t('activities.title') }}</h3>
        </section>

        <section class="swiper">
            <div class="swiper-card unavailable">
                <div class="swiper-image" id="image-algodoo"></div>
                <div class="swiper-text">
                    <div>
                        <h6>Algodoo</h6>
                    </div>
                    <button disabled>{{ t('activities.coming-soon') }}</button>
                </div>
            </div>

            <div class="swiper-card">
                <div class="swiper-image" id="image-beat-saber"></div>
                <div class="swiper-text">
                    <div>
                        <h6>Beat Saber</h6>
                    </div>
                    <router-link to="/activities/beat-saber"><span class="button beat-saber">Look</span></router-link>
                </div>
            </div>

            <div class="swiper-card unavailable">
                <div class="swiper-image" id="image-mario-kart"></div>
                <div class="swiper-text">
                    <div>
                        <h6>Mario Kart</h6>
                    </div>
                    <button disabled>{{ t('activities.coming-soon') }}</button>
                </div>
            </div>

            <div class="swiper-card unavailable">
                <div class="swiper-image" id="image-geometry-dash"></div>
                <div class="swiper-text">
                    <div>
                        <h6>Geometry Dash</h6>
                    </div>
                    <button disabled>{{ t('activities.coming-soon') }}</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/page_title'

const { t } = useI18n()
usePageTitle('activities.tab-title')
</script>