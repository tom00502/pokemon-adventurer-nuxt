<script setup>
import { useBulletinStore } from '@/stores/bulletin'
const bulletinStore = useBulletinStore()
</script>
<template>
    <div
        v-if="bulletinStore.summary"
        class="rounded-lg border-4 border-double border-[#323cce] bg-[#7dcbff] p-2"
    >
        <details>
            <summary>{{ bulletinStore.summary }}</summary>
            <pre>{{ bulletinStore.detail }}</pre>
        </details>
    </div>
</template>
