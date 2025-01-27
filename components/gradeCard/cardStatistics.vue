<script setup>
import { $vfm } from 'vue-final-modal'
const { locale, t } = useI18n()
const { gradeCardsWithUse } = useGradeCard()
const noUseCards = computed(() => {
    return gradeCardsWithUse.value?.filter((card) => card.useCount === 0) || {}
})
const top10Cards = computed(() => {
    return gradeCardsWithUse.value?.sort((a, b) => b.useCount - a.useCount).slice(0, 10) || []
})
const handleClickGradeCard = (gradeCard) => {
    const params = {
        gradeCardId: gradeCard.id,
    }
    $vfm.show('ShowGradeCardModal', params)
}
</script>
<template>
    <div class="p-3">
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
                {{ t('gradeCard.usageRateRank') }}
            </legend>
            <div class="relative mt-2 flex justify-center overflow-x-auto shadow-md sm:rounded-lg">
                <table class="text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap p-3">
                                {{ t('gradeCard.rank') }}
                            </th>
                            <th scope="col" class="whitespace-nowrap p-3">
                                {{ t('gradeCard.card') }}
                            </th>
                            <th scope="col" class="whitespace-nowrap p-3">
                                {{ t('gradeCard.useCount') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(card, index) in top10Cards"
                            :key="card.id"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <td
                                scope="row"
                                class="whitespace-nowrap px-1 py-1 font-medium text-gray-900"
                            >
                                {{ index + 1 }}
                            </td>
                            <td class="whitespace-nowrap">
                                <button
                                    class="m-1 w-32 cursor-pointer rounded-md px-2 py-1"
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
                                </button>
                            </td>
                            <td>
                                {{ card.useCount }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </fieldset>
        <fieldset class="mt-3 border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
                {{ t('gradeCard.uselessCards') }}
            </legend>
            <div class="relative mt-2 flex justify-center overflow-x-auto shadow-md sm:rounded-lg">
                <table class="text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap p-3">
                                {{ t('gradeCard.rank') }}
                            </th>
                            <th scope="col" class="whitespace-nowrap p-3">
                                {{ t('gradeCard.card') }}
                            </th>
                            <th scope="col" class="whitespace-nowrap p-3">
                                {{ t('gradeCard.useCount') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(card, index) in noUseCards"
                            :key="card.id"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <td
                                scope="row"
                                class="whitespace-nowrap px-1 py-1 font-medium text-gray-900"
                            >
                                {{ index + 1 }}
                            </td>
                            <td class="whitespace-nowrap">
                                <button
                                    class="m-1 w-32 cursor-pointer rounded-md px-2 py-1"
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
                                </button>
                            </td>
                            <td>
                                {{ card.useCount }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </fieldset>
    </div>
</template>
