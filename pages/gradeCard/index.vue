<script setup>
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
</script>
<template>
    <main>
        <RouterLink to="/gradeCard/edit">新增</RouterLink>
        <div v-for="useRecord in pokedexStore.gradeCardUses" :key="useRecord.poke.id">
            {{ useRecord.poke.name }}
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
                        v-for="useRecord in pokedexStore.gradeCardUses"
                        :key="useRecord.poke.id"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <td
                            scope="row"
                            class="whitespace-nowrap py-1 px-6 font-medium text-gray-900"
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
