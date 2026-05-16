<template>
    <div>
        <section class="main-home">
            <div>
                <h1>Live it,<br>for Real.</h1>
                <p>{{ t('home.main-subtitle') }}</p>
            </div>
        </section>

        <section class="text-image">
            <div class="text-image-text" v-html="t('home.presentation')"></div>
            <div class="text-image-image" id="poses">
                <Transition name="image-fade">
                    <img class="pose" :key="poses[pose]" :src="poses[pose]">
                </Transition>
            </div>
        </section>

        <section class="text-image">
            <div class="text-image-text" v-html="t('home.tools-presentation')"></div>
            <div class="text-image-image" id="applications">
                <Transition name="image-fade">
                    <img class="application" :key="applications[application]" :src="applications[application]">
                </Transition>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePageTitle } from '@/composables/page_title'

const { t } = useI18n()
usePageTitle('KGΛMΞX - Live it, for Real.', true, true)

const poses = [
    '/images/kgamex-poses/beat-saber.svg',
    '/images/kgamex-poses/desktop.svg',
    '/images/kgamex-poses/projects.svg',
    '/images/kgamex-poses/mario-kart.svg',
    '/images/kgamex-poses/lost.svg'
]

const applications = [
    '/images/applications/code.svg',
    '/images/applications/inkscape.svg',
    '/images/applications/intellij.svg',
    '/images/applications/shotcut.svg',
    '/images/applications/unity.svg'
]

const pose = ref(0)
const application = ref(0)

function poseLoop() {
    setInterval(() => {
        pose.value = (pose.value + 1) % poses.length
    }, 15000)
}

function applicationLoop() {
    setInterval(() => {
        application.value = (application.value + 1) % applications.length
    }, 5000)
}

onMounted(() => {
    poseLoop()
    setTimeout(() => {
        applicationLoop()
    }, 2500);
})
</script>