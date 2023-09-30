<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const { gradeCards, getGradeCardById } = useGradeCard()
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
const pokes = computed(() => {
    return pokedexStore.gradeCardUses.map((record) => ({
        id: record.poke.id,
        name: record.poke.name,
    }))
})
const poke = ref([])
const cards = ref([])
const finished = ref(false)
const chooseLevel = ref(null)
const filtedRecords = computed(() => {
    let records = pokedexStore.gradeCardUses
    if (poke.value.length) {
        const pokes = poke.value.map((poke) => poke.id)
        records = records.filter((record) => pokes.includes(record.poke.id))
    }
    if (cards.value.length) {
        records = records.filter((record) => {
            return cards.value.some((card) => {
                return record.gradeCards.some((level) => {
                    if (!chooseLevel.value) {
                        return level.cards.some((lcard) => lcard.id === card.id)
                    }
                    return (
                        level.level === chooseLevel.value.id &&
                        level.cards.some((lcard) => lcard.id === card.id)
                    )
                })
            })
        })
    }
    if (finished.value) {
        records = records.filter((record) => record.gradeCards.length === 14)
    }
    return records
})
</script>
<template>
    <main>
        <RouterLink to="/gradeCard/edit">新增</RouterLink>
        選擇精靈
        <v-select v-model="poke" :options="pokes" multiple label="name"></v-select>
        選擇卡牌
        <v-select v-model="cards" :options="gradeCards" multiple label="name"></v-select>
        選擇品級
        <v-select v-model="chooseLevel" :options="levels"></v-select>
        <div class="flex items-center">
            <input
                id="checked-checkbox"
                v-model="finished"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label for="checked-checkbox" class="ml-2 text-sm font-medium">調查完畢</label>
        </div>
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
    </main>
</template>
<style scoped></style>
