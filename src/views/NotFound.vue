<template>
    <section class="main-404">
        <title>{{ t('404.tab-title') }} | KGΛMΞX</title>

        <div>
            <p>404 - {{ t('404.topper') }}</p>
            <h1>{{ t('404.title') }}</h1>
            <p v-html="t('404.subtitle')"></p>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>