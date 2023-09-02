<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const { setGradeCards } = useApi()
const { gradeCards } = useGradeCard()
const filteredGradeCards = computed(() => {
    let cards = gradeCards.value
    if (level.value.id < 11) {
        cards = cards.filter((card) => card.quality !== 'supreme')
    }
    if (level.value.id < 7) {
        cards = cards.filter((card) => card.quality !== 'legend')
    }
    if (level.value.id < 4) {
        cards = cards.filter((card) => card.quality !== 'epic')
    }
    if (level.value.id > 2) {
        cards = cards.filter((card) => card.quality !== 'normal')
    }
    if (level.value.id > 5) {
        cards = cards.filter((card) => card.quality !== 'rare')
    }
    if (level.value.id > 9) {
        cards = cards.filter((card) => card.quality !== 'epic')
    }
    if (level.value.id > 13) {
        cards = cards.filter((card) => card.quality !== 'legend')
    }
    return cards
})
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
const level = ref(levels[0])
const cards = ref([])
const poke = ref({ name: '' })
const message = ref('')
const pokedexStore = usePokedexStore()
const pokes = computed(() => {
    return pokedexStore.pokes.map((poke) => ({
        id: poke.id,
        name: poke.name,
    }))
})
const filtedRecords = computed(() => {
    if (!poke.value.id) {
        return []
    }
    let records = pokedexStore.gradeCardUses
    if (poke.value.id) {
        records = records.filter((record) => record.poke.id === poke.value.id)
    }
    return records
})
const handleCardsClick = (id) => {
    const card = gradeCards.value.find((card) => card.id === id)
    cards.value.push(card)
}

const handleClick = async () => {
    const obj = {
        cards: cards.value.map((card) => card.id),
        level: level.value.id,
        check: true,
    }
    const params = {
        pokeId: poke.value.id,
        level: level.value.id,
        valueString: JSON.stringify(obj),
    }
    console.log(params)
    const { data } = await setGradeCards(params)
    message.value = `已將${data.value.pokeName}的品階設定為${data.value.valueString}`
    poke.value = { name: '' }
    cards.value = []
}
const handleRenew = () => {
    pokedexStore.actionGetGradeCardUseMap()
}

const gradeCardGroup = computed(() => {
    const levelGroups = {
        1: {
            level: 1,
            groups: [],
        },
        2: {
            level: 2,
            groups: [],
        },
        3: {
            level: 3,
            groups: [],
        },
        4: {
            level: 4,
            groups: [],
        },
        5: {
            level: 5,
            groups: [],
        },
        6: {
            level: 6,
            groups: [],
        },
        7: {
            level: 7,
            groups: [],
        },
        8: {
            level: 8,
            groups: [],
        },
        9: {
            level: 9,
            groups: [],
        },
        10: {
            level: 10,
            groups: [],
        },
        11: {
            level: 11,
            groups: [],
        },
        12: {
            level: 12,
            groups: [],
        },
        13: {
            level: 13,
            groups: [],
        },
        14: {
            level: 14,
            groups: [],
        },
    }
    pokedexStore.gradeCardUses.forEach((record) => {
        record.gradeCards.forEach((use) => {
            const level = use.level
            const groups = levelGroups[level].groups
            // 比對陣列是否完全相同
            if (groups.length === 0) {
                const group = {
                    count: 1,
                    cards: [...use.cards],
                    key: use.cards.map((card) => card.id).join(),
                }
                levelGroups[level].groups.push(group)
                return
            }
            let match = false
            groups.forEach((group) => {
                if (group.cards.length !== use.cards.length) {
                    return
                }
                if (group.key === use.cards.map((card) => card.id).join()) {
                    group.count += 1
                    match = true
                }
            })
            if (!match) {
                const group = {
                    count: 1,
                    cards: [...use.cards],
                    key: use.cards.map((card) => card.id).join(),
                }
                levelGroups[level].groups.push(group)
            }
        })
    })
    // 用id排序
    Object.keys(levelGroups).forEach((key) => {
        levelGroups[key].groups.sort((a, b) => {
            return a.cards[0].id - b.cards[0].id
        })
    })
    return levelGroups
})
</script>

<template>
    <main>
        <RouterLink to="/gradeCard">要開始編輯拉！！</RouterLink>

        <div class="page-title" @click="handleRenew">精靈招式</div>
        選擇精靈
        <v-select v-model="poke" :options="pokes" label="name"></v-select>
        <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
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
                            class="whitespace-nowrap py-1 px-6 font-medium text-gray-900"
                        >
                            {{ useRecord.poke.name }}
                        </td>
                        <td v-for="l in levels" :key="level.id" class="whitespace-nowrap">
                            <div
                                v-for="card in useRecord.gradeCards.find(
                                    (levelCard) => levelCard.level === l.id
                                )?.cards || []"
                                :key="card.id"
                                class="m-1 rounded-md py-1 px-2"
                                :class="{
                                    'bg-gray-100': card.quality === 'normal',
                                    'bg-blue-100': card.quality === 'rare',
                                    'bg-purple-100': card.quality === 'epic',
                                    'bg-orange-100': card.quality === 'legend',
                                    'bg-red-100': card.quality === 'supreme',
                                }"
                            >
                                {{ card.name }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        選擇品級
        <v-select v-model="level" :options="levels"></v-select>
        選擇卡牌
        <v-select v-model="cards" :options="gradeCards" multiple label="name"></v-select>
        <div class="mt-2">
            <button
                v-for="card in filteredGradeCards"
                :key="card.id"
                type="button"
                class="mr-2 mb-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-black hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                :class="{
                    'bg-blue-100': card.quality === 'rare',
                    'bg-purple-100': card.quality === 'epic',
                    'bg-orange-100': card.quality === 'legend',
                    'bg-red-100': card.quality === 'supreme',
                    'border-4 border-black': cards.findIndex((c) => c.id === card.id) > -1,
                }"
                @click="handleCardsClick(card.id)"
            >
                {{ card.name }}
            </button>
        </div>
        <span @click="handleClick">送出</span>
        <div>{{ message }}</div>
        <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
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
                    <tr class="border-b bg-white hover:bg-gray-50">
                        <td
                            scope="row"
                            class="whitespace-nowrap py-1 px-6 font-medium text-gray-900"
                        >
                            組合
                        </td>
                        <td v-for="l in levels" :key="l.id" class="whitespace-nowrap text-left">
                            <div
                                v-for="group in gradeCardGroup[l.id].groups"
                                :key="group.key"
                                class="p-1"
                            >
                                <span
                                    v-for="card in group.cards"
                                    :key="card.id"
                                    class="m-1 rounded-md py-1 px-2"
                                    :class="{
                                        'bg-gray-100': card.quality === 'normal',
                                        'bg-blue-100': card.quality === 'rare',
                                        'bg-purple-100': card.quality === 'epic',
                                        'bg-orange-100': card.quality === 'legend',
                                        'bg-red-100': card.quality === 'supreme',
                                    }"
                                    >{{ card.name }}({{ card.id }})</span
                                >
                                x {{ group.count }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style scoped>
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
