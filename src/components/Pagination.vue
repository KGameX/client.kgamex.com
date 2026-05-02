<template>
    <section class="sample no-padding flex" v-if="store && store.metadata.total > store.metadata.items_per_page">
        <div class="flex" v-if="store.metadata.page != 1">
            <span class="button" @click="fetchPage({ page: 1, ...params })">&lt;&lt;</span>
            <span class="button" @click="fetchPage({ page: store.metadata.page - 1, ...params })">&lt;</span>
        </div>

        <span class="block">{{ t('pagination.page', { current: store.metadata.page, total: Math.ceil(store.metadata.total / store.metadata.items_per_page) }) }}</span>
        
        <div class="flex" v-if="store.metadata.page != Math.ceil(store.metadata.total / store.metadata.items_per_page)">
            <span class="button" @click="fetchPage({ page: store.metadata.page + 1, ...params })">&gt;</span>
            <span class="button" @click="fetchPage({ page: Math.ceil(store.metadata.total / store.metadata.items_per_page), ...params })">&gt;&gt;</span>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps({
    store: {
        type: Object,
        required: true
    },

    fetchPage: {
        type: Function,
        required: true
    },

    params: {
        type: Object,
        required: false,
        default: () => ({})
    }
})
</script>