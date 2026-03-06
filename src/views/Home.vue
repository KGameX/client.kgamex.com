<template>
    <section class="home-main">
        <div>
            <h1>Live it,<br>for Real.</h1>
            <p>{{ t("home.main-subtitle") }}</p>
        </div>
    </section>

    <section>
        <p>{{ t("under-construction") }}</p>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>