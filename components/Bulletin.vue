<script setup>
import { useI18n } from 'vue-i18n'
import { useBulletinStore } from '@/stores/bulletin'
const { locale } = useI18n()
const bulletinStore = useBulletinStore()
</script>
<template>
    <div
        v-if="bulletinStore.summary && locale !== 'en'"
        class="rounded-lg bg-[#FF7F56] p-2 text-white"
    >
        <details>
            <summary>{{ bulletinStore.summary }}</summary>
            <pre>{{ bulletinStore.detail }}</pre>
        </details>
    </div>
</template>
