<script setup>
import { usePokedexStore } from '@/stores/pokedex'
import { useDistributionStore } from '@/stores/distribution'
const pokedexStore = usePokedexStore()
const distributionStore = useDistributionStore()
onMounted(() => {
    pokedexStore.actionGetPokedex().then(() => {
        distributionStore.getDistributions()
    })
})
</script>
<template>
    <div class="m-4 bg-white">
        <!-- Google Tag Manager (noscript) -->
        <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WF8JSC5"
            height="0"
            width="0"
            style="display: none; visibility: hidden"
        ></iframe>
        <!-- End Google Tag Manager (noscript) -->
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<!-- <script lang="ts" setup>
// const year: number = 1
// const title: string = `${year} iThome 鐵人賽`
</script> -->
