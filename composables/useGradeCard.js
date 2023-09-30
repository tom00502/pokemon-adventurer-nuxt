import _gradeCards from '@/assets/json/gradeCards.json'
import { usePokedexStore } from '@/stores/pokedex'
export default function () {
    const pokedexStore = usePokedexStore()
    const gradeCardlevel = {
        1: {
            id: 1,
            label: '<span class="mr-2">白</span>>><span class="text-green-700 ml-2">綠</apan>',
        },
        2: {
            id: 2,
            label: '<span class="mr-2 text-green-700">綠</span>>><span class="text-green-700 ml-2">綠+1</apan>',
        },
        3: {
            id: 3,
            label: '<span class="mr-2 text-green-700">綠+1</span>>><span class="text-blue-700 ml-2">藍</apan>',
        },
        4: {
            id: 4,
            label: '<span class="mr-2 text-blue-700">藍</span>>><span class="text-blue-700 ml-2">藍+1</apan>',
        },
        5: {
            id: 5,
            label: '<span class="mr-2 text-blue-700">藍+1</span>>><span class="text-blue-700 ml-2">藍+2</apan>',
        },
        6: {
            id: 6,
            label: '<span class="mr-2 text-blue-700">藍+2</span>>><span class="text-purple-700 ml-2">紫</apan>',
        },
        7: {
            id: 7,
            label: '<span class="mr-2 text-purple-700">紫</span>>><span class="text-purple-700 ml-2">紫+1</apan>',
        },
        8: {
            id: 8,
            label: '<span class="mr-2 text-purple-700">紫+1</span>>><span class="text-purple-700 ml-2">紫+2</apan>',
        },
        9: {
            id: 9,
            label: '<span class="mr-2 text-purple-700">紫+2</span>>><span class="text-purple-700 ml-2">紫+3</apan>',
        },
        10: {
            id: 10,
            label: '<span class="mr-2 text-purple-700">紫+3</span>>><span class="text-orange-700 ml-2">橙</apan>',
        },
        11: {
            id: 11,
            label: '<span class="mr-2 text-orange-700">橙</span>>><span class="text-orange-700 ml-2">橙+1</apan>',
        },
        12: {
            id: 12,
            label: '<span class="mr-2 text-orange-700">橙+1</span>>><span class="text-orange-700 ml-2">橙+2</apan>',
        },
        13: {
            id: 13,
            label: '<span class="mr-2 text-orange-700">橙+2</span>>><span class="text-orange-700 ml-2">橙+3</apan>',
        },
        14: {
            id: 14,
            label: '<span class="mr-2 text-orange-700">橙+3</span>>><span class="text-orange-700 ml-2">橙+4</apan>',
        },
    }

    const gradeCards = computed(() => {
        return _gradeCards.map((item) => ({
            id: item.i,
            name: item.n,
            quality: item.q,
            from: item.f?.split(',') || [],
        }))
    })
    const getGradeCardById = (id) => {
        return gradeCards.value.find((card) => card.id === id)
    }
    const gradeCardsWithUse = computed(() => {
        const gradeCardsWithUse = gradeCards.value.map((card) => {
            const uses = {}
            pokedexStore.gradeCardUses.forEach((use) => {
                use.gradeCards.forEach((levelUse) => {
                    if (levelUse.cards.some((useCard) => useCard.id === card.id)) {
                        if (!uses[levelUse.level]) uses[levelUse.level] = []
                        uses[levelUse.level].push(use.poke)
                    }
                })
            })
            return {
                ...card,
                uses,
            }
        })
        return gradeCardsWithUse
    })
    onMounted(() => {
        // if (pokedexStore.gradeCardUses?.length || pokedexStore.pokes.length === 0) return
        // pokedexStore.actionGetGradeCardUseMap()
    })
    return {
        gradeCards,
        gradeCardlevel,
        gradeCardsWithUse,
        getGradeCardById,
    }
}
