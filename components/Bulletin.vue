<script setup>
import { useBulletinStore } from '@/stores/bulletin'
const bulletinStore = useBulletinStore()
</script>
<template>
    <div v-if="bulletinStore.summary" class="rounded-lg bg-[#FF7F56] p-2 text-white">
        <details>
            <summary>{{ bulletinStore.summary }}</summary>
            <pre>{{ bulletinStore.detail }}</pre>
        </details>
    </div>
</template>
