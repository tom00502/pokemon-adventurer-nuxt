<script setup>
import { onMounted, reactive } from 'vue'
import { $vfm } from 'vue-final-modal'
import moment from 'moment'
import { usePokeCardStore } from '@/stores/poke-card'
import { useCommonStore } from '@/stores/common'
const { typeTwToEn, typeEnToTw, qualityEnToTw, getTypeColors } = usePokeTypes()
const { isIntersection, intersectionObserver } = useIntersectionObserver()
useHead({
    title: '精靈卡片',
})
const pokeCardStore = usePokeCardStore()
const loading = ref(true)
const loadRef = ref(null)

const searchText = ref('')
const filteredCards = computed(() => {
    return pokeCardStore.pokeCards
        .filter((card) => {
            if (pokeCardStore.searchText === '') return true
            return (
                card.title.includes(searchText.value) ||
                card.description.includes(searchText.value) ||
                card.poke.name.includes(searchText.value) ||
                String(card.creator).includes(searchText.value)
            )
        })
        .splice(0, maxViewCards.value)
})

onMounted(() => {
    const commonStore = useCommonStore()
    commonStore.actionRegisterCallAfterReadyFunction(() => {
        pokeCardStore.actionGetPokeCards().then(() => {
            loading.value = false
        })
    })
    intersectionObserver(loadRef.value)
})
const handleClick = (card) => {
    $vfm.show('ShowPokeCardModal', card)
}
const maxViewCards = ref(20)

watch(isIntersection, (isIntersect) => {
    if (!isIntersect) return
    maxViewCards.value += 20
})
const handleChange = () => {
    maxViewCards.value = 20
}
</script>
<template>
    <div>
        <RouterLink to="/pokeCard/create">
            <button
                type="button"
                class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                建立卡片
            </button>
        </RouterLink>
        <div class="my-1 mr-3">
            搜尋:
            <input
                v-model="searchText"
                type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                @keyup.enter="handleChange"
            />
        </div>
        <div class="flex flex-wrap justify-center gap-2">
            <div v-if="loading" class="lds-dual-ring"></div>
            <div
                v-for="card in filteredCards"
                :key="card.id"
                class="h-60 w-40 cursor-pointer rounded-md"
                :style="`border: 3px solid ${getTypeColors(card.type).color}; background: ${
                    getTypeColors(card.type).alphaColor
                };`"
                @click="() => handleClick(card)"
            >
                <div class="flex h-10 items-center justify-center">{{ card.title }}</div>
                <div class="h-40 p-4">
                    <img
                        :src="`https://tw.portal-pokemon.com/play/resources/pokedex${card.reference.file_name}`"
                        class="h-full w-full"
                    />
                </div>
                <div class="flex h-10 items-center justify-center">{{ card.poke.name }}</div>
            </div>
        </div>
        <div v-show="!loading" ref="loadRef" class="flex justify-center">沒有更多卡片了</div>
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
