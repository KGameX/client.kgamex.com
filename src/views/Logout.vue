<template>
    <div class="tab">
        <title>{{ t('nav.texts.log-out') }} | KGΛMΞX</title>

        <section>
            <p>{{ t('messages.logging-out') }}</p>
        </section>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import useUserStore from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()

userStore.logout()
</script>