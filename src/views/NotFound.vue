<template>
    <section class="main-404">
        <div>
            <h1>{{ t("404.title") }}</h1>
            <p>{{ t("404.subtitle-1") }}<br>{{ t("404.subtitle-2") }}</p>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>