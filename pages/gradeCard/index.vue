<script setup>
import vSelect from 'vue-select'
import { $vfm } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
useHead({
    title: '升品卡牌',
})
const pokedexStore = usePokedexStore()
const { gradeCards } = useGradeCard()
const { isIntersection, intersectionObserver } = useIntersectionObserver()
const levels = [
    { id: 1, label: '白' },
    { id: 2, label: '綠' },
    { id: 3, label: '綠+1' },
    { id: 4, label: '藍' },
    { id: 5, label: '藍+1' },
    { id: 6, label: '藍+2' },
    { id: 7, label: '紫' },
    { id: 8, label: '紫+1' },
    { id: 9, label: '紫+2' },
    { id: 10, label: '紫+3' },
    { id: 11, label: '橙' },
    { id: 12, label: '橙+1' },
    { id: 13, label: '橙+2' },
    { id: 14, label: '橙+3' },
]
const qualityText = {
    normal: '普通',
    rare: '稀有',
    epic: '史詩',
    legend: '傳說',
    supreme: '超越',
}
const pokes = computed(() => {
    return pokedexStore.gradeCardUses
        .filter((record) => record.gradeCards.length === 14)
        .map((record) => ({
            id: record.poke.id,
            name: record.poke.name,
        }))
})
const poke = ref([])
const cards = ref([])
const loadRef = ref(null)
const isPokemonView = ref(true)
const maxViewPokes = ref(20)
const loading = computed(() => {
    return pokedexStore.pokes.length === 0
})
const finishPokes = computed(() => {
    return pokedexStore.gradeCardUses.filter((record) => record.gradeCards.length === 14)
})
const filtedRecords = computed(() => {
    let records = finishPokes.value
    if (poke.value.length) {
        const pokes = poke.value.map((poke) => poke.id)
        records = records.filter((record) => pokes.includes(record.poke.id))
    }
    return records.slice(0, maxViewPokes.value)
})
const gradeCardsGroupByQuality = computed(() => {
    let useCards = gradeCards.value
    if (cards.value.length) {
        useCards = useCards.filter((card) => {
            return cards.value.some((c) => c.id === card.id)
        })
    }
    const result = {}
    useCards.forEach((card) => {
        if (!result[card.quality]) {
            result[card.quality] = []
        }
        result[card.quality].push(card)
    })
    return result
})
const handleClickGradeCard = (gradeCard) => {
    const params = {
        gradeCardId: gradeCard.id,
    }
    $vfm.show('ShowGradeCardModal', params)
}
onMounted(() => {
    intersectionObserver(loadRef.value)
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
watch(isIntersection, (isIntersect) => {
    if (!isIntersect) return
    maxViewPokes.value += 20
})
const handleChange = () => {
    maxViewPokes.value = 20
}
</script>
<template>
    <main>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="1399675524"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="page-title">精靈升品卡牌資訊</div>
        <div class="note">
            <ul>
                <li>精選收集{{ finishPokes.length }}隻升品卡牌資訊</li>
                <li>精靈列表可以查看精靈升品所需卡牌</li>
                <li>卡牌列表則列出所有卡牌</li>
                <li>點選卡牌會出現卡牌詳細資訊</li>
                <li>資源、人力不足，無法集滿所有精靈請見諒。歡迎提供資訊</li>
            </ul>
        </div>
        <div class="mt-2">
            <label
                class="border-type inline-flex cursor-pointer select-none items-center justify-center rounded-md border bg-white p-1"
            >
                <span
                    class="type-text-color flex items-center space-x-[6px] rounded py-1 px-[18px] text-sm font-medium text-gray-400 active:text-black"
                    :class="{ active: isPokemonView }"
                    @click="() => (isPokemonView = true)"
                >
                    精靈列表
                </span>
                <span
                    class="type-text-color flex items-center space-x-[6px] rounded py-1 px-[18px] text-sm font-medium text-gray-400 active:text-black"
                    :class="{ active: !isPokemonView }"
                    @click="() => (isPokemonView = false)"
                >
                    卡牌列表
                </span>
            </label>
        </div>
        <template v-if="isPokemonView">
            選擇精靈
            <v-select
                v-model="poke"
                :options="pokes"
                multiple
                label="name"
                @change="handleChange"
            ></v-select>
            <div v-if="loading">
                資料讀取中...
                <div class="lds-dual-ring"></div>
            </div>
            <div v-show="!loading" class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap py-3 px-2">精靈</th>
                            <th
                                v-for="level in levels"
                                :key="level.id"
                                scope="col"
                                class="whitespace-nowrap py-3 px-2"
                            >
                                {{ level.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="useRecord in filtedRecords"
                            :key="useRecord.poke.id"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <td
                                scope="row"
                                class="whitespace-nowrap py-1 px-1 font-medium text-gray-900"
                            >
                                {{ useRecord.poke.name }}
                            </td>
                            <td v-for="level in levels" :key="level.id" class="whitespace-nowrap">
                                <div
                                    v-for="card in useRecord.gradeCards.find(
                                        (levelCard) => levelCard.level === level.id
                                    )?.cards || []"
                                    :key="card.id"
                                    class="m-1 cursor-pointer rounded-md py-1 px-2"
                                    :class="{
                                        'bg-gray-100': card.quality === 'normal',
                                        'bg-blue-100': card.quality === 'rare',
                                        'bg-purple-100': card.quality === 'epic',
                                        'bg-orange-100': card.quality === 'legend',
                                        'bg-red-100': card.quality === 'supreme',
                                    }"
                                    @click="handleClickGradeCard(card)"
                                >
                                    {{ card.name }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-show="!loading" ref="loadRef" class="flex justify-center">
                    沒有更多資料了
                </div>
            </div>
        </template>
        <template v-else>
            選擇卡牌
            <v-select v-model="cards" :options="gradeCards" multiple label="name"></v-select>
            <div class="mt-2">
                <div v-for="(group, quality) in gradeCardsGroupByQuality" :key="quality">
                    <div class="font-medium text-gray-900">{{ qualityText[quality] }}</div>
                    <div class="flex flex-wrap">
                        <button
                            v-for="card in group"
                            :key="card.id"
                            type="button"
                            class="mr-2 mb-2 flex-grow basis-40 rounded-lg px-5 py-2.5 text-sm text-black hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                            :class="{
                                'bg-gray-100 hover:bg-gray-800': card.quality === 'normal',
                                'bg-blue-100 hover:bg-blue-800': card.quality === 'rare',
                                'bg-purple-100 hover:bg-purple-800': card.quality === 'epic',
                                'bg-orange-100 hover:bg-orange-700': card.quality === 'legend',
                                'bg-red-100 hover:bg-red-700': card.quality === 'supreme',
                                'border-4 border-black':
                                    cards.findIndex((c) => c.id === card.id) > -1,
                            }"
                            @click="handleClickGradeCard(card)"
                        >
                            {{ card.name }}卡牌
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </main>
</template>
<style scoped>
.type-text-color.active {
    color: black;
    background-color: rgb(191 219 254);
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
