<script setup>
import { onMounted, reactive } from 'vue'
import { $vfm } from 'vue-final-modal'
import moment from 'moment'
import { usePokeCardStore } from '@/stores/poke-card'
import { useCommonStore } from '@/stores/common'
useHead({
    title: '精靈卡片',
})
const pokeCardStore = usePokeCardStore()
onMounted(() => {
    const commonStore = useCommonStore()
    commonStore.actionRegisterCallAfterReadyFunction(() => {
        pokeCardStore.actionGetPokeCards()
    })
})
const handleClick = (card) => {
    $vfm.show('ShowPokeCardModal', card)
}
</script>
<template>
    <div>
        <RouterLink to="pokeCard/create">
            <button
                type="button"
                class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                建立卡片
            </button>
        </RouterLink>
        <div
            v-for="card in pokeCardStore.pokeCards"
            :key="card.id"
            class="flex"
            @click="() => handleClick(card)"
        >
            <div>{{ card.title }}</div>
            <div>{{ card.poke.name }}</div>
        </div>
        <ModalViewPokeCard />
    </div>
</template>

<style scoped>
.about {
    /*text-align: center;*/
    padding: 8px;
}
.card {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    /*font-size: 1.5rem;*/
    color: black;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
</style>
