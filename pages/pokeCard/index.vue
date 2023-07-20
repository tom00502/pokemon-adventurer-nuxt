<script setup>
import { $vfm } from 'vue-final-modal'
import { usePokeCardStore } from '@/stores/poke-card'
import { useCommonStore } from '@/stores/common'
const { getTypeColors } = usePokeTypes()
const { isIntersection, intersectionObserver } = useIntersectionObserver()
useHead({
    title: '精靈卡匣',
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
        .slice(0, maxViewCards.value)
})
const newCards = computed(() => {
    return pokeCardStore.pokeCards
        .slice(pokeCardStore.pokeCards.length - 10, pokeCardStore.pokeCards.length)
        .reverse()
        .filter((card) => {
            if (pokeCardStore.searchText === '') return true
            return (
                card.title.includes(searchText.value) ||
                card.description.includes(searchText.value) ||
                card.poke.name.includes(searchText.value) ||
                String(card.creator).includes(searchText.value)
            )
        })
})
onMounted(() => {
    const commonStore = useCommonStore()
    commonStore.actionRegisterCallAfterReadyFunction(() => {
        pokeCardStore.actionGetPokeCards().then(() => {
            loading.value = false
        })
    })
    intersectionObserver(loadRef.value)
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
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
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="1399675524"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="page-title">精靈卡匣</div>
        <div class="note">
            <ul>
                <li>點擊精靈卡可看詳細資訊</li>
                <li>可利用搜尋功能快速找到想要參考的卡片</li>
                <li>也可以點選建立卡片製作專屬於自己的卡</li>
                <li>
                    大家的分享不是絕對，參考後再思考如何搭配自己的隊伍做調整，才是優秀的訓練師哦！！
                </li>
                <li>也歡迎各位分享自己的配招，讓大家一起學習，一起成長，一起變得更強吧！！</li>
            </ul>
        </div>
        <div class="mt-2 flex">
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
        </div>
        <div class="flex items-center">
            <div class="shrink-0 border-b border-blue-200 p-1"></div>
            <div
                class="shrink-0 rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left"
            >
                最新卡片
            </div>
            <div class="w-full border-b border-blue-200 p-1"></div>
        </div>
        <div class="p-2">
            <div class="flex gap-2 overflow-x-auto overflow-y-hidden">
                <div
                    v-for="card in newCards"
                    :key="card.id"
                    class="h-60 w-40 shrink-0 cursor-pointer rounded-md"
                    :style="`border: 3px solid ${getTypeColors(card.type).color}; background: ${
                        getTypeColors(card.type).alphaColor
                    };`"
                    @click="() => handleClick(card)"
                >
                    <div class="flex h-8 items-center justify-center">
                        <div class="line-clamp-1">
                            {{ card.title || card.poke.name }}
                        </div>
                    </div>
                    <div class="h-36 px-4 py-2"><img :src="card.img" class="h-full w-full" /></div>
                    <div class="mt-2 flex h-6 items-center justify-center">
                        {{ card.poke.name }}
                    </div>
                    <div class="mr-2 mt-2 flex h-4 justify-end text-xs">{{ card.creator }}</div>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <div class="shrink-0 border-b border-blue-200 p-1"></div>
            <div
                class="shrink-0 rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left"
            >
                卡片列表
            </div>
            <div class="w-full border-b border-blue-200 p-1"></div>
        </div>
        <div class="p-2">
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
                    <div class="flex h-8 items-center justify-center">
                        <div class="line-clamp-1">
                            {{ card.title || card.poke.name }}
                        </div>
                    </div>
                    <div class="h-36 px-4 py-2"><img :src="card.img" class="h-full w-full" /></div>
                    <div class="mt-2 flex h-6 items-center justify-center">
                        {{ card.poke.name }}
                    </div>
                    <div class="mr-2 mt-2 flex h-4 justify-end text-xs">{{ card.creator }}</div>
                </div>
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
.page-title {
    border-left: 8px solid rgb(191, 219, 254);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
</style>
