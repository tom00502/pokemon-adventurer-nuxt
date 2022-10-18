<script setup>
import { usePokedexStore } from '@/stores/pokedex'
import { useDistributionStore } from '@/stores/distribution'
const pokedexStore = usePokedexStore()
const distributionStore = useDistributionStore()
onMounted(() => {
    pokedexStore.getPokedex().then(() => {
        distributionStore.getDistributions()
    })
})
</script>
<template>
    <div class="m-4 bg-white">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<!-- <script lang="ts" setup>
// const year: number = 1
// const title: string = `${year} iThome 鐵人賽`
</script> -->
