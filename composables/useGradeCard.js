import _gradeCards from '@/assets/json/gradeCards.json'
import { usePokedexStore } from '@/stores/pokedex'
export default function () {
    const pokedexStore = usePokedexStore()
    const gradeCardlevel = {
        1: {
            id: 1,
            label: '<span class="mr-2">白</span>>><span class="text-green-700 ml-2">綠</apan>',
            useCash: 30000,
        },
        2: {
            id: 2,
            label: '<span class="mr-2 text-green-700">綠</span>>><span class="text-green-700 ml-2">綠+1</apan>',
            useCash: 50000,
        },
        3: {
            id: 3,
            label: '<span class="mr-2 text-green-700">綠+1</span>>><span class="text-blue-700 ml-2">藍</apan>',
            useCash: 70000,
            useStone: 1,
        },
        4: {
            id: 4,
            label: '<span class="mr-2 text-blue-700">藍</span>>><span class="text-blue-700 ml-2">藍+1</apan>',
            useCash: 80000,
            useStone: 1,
        },
        5: {
            id: 5,
            label: '<span class="mr-2 text-blue-700">藍+1</span>>><span class="text-blue-700 ml-2">藍+2</apan>',
            useCash: 100000,
            useStone: 2,
        },
        6: {
            id: 6,
            label: '<span class="mr-2 text-blue-700">藍+2</span>>><span class="text-purple-700 ml-2">紫</apan>',
            useCash: 150000,
            useStone: 3,
        },
        7: {
            id: 7,
            label: '<span class="mr-2 text-purple-700">紫</span>>><span class="text-purple-700 ml-2">紫+1</apan>',
            useCash: 200000,
            useStone: 4,
        },
        8: {
            id: 8,
            label: '<span class="mr-2 text-purple-700">紫+1</span>>><span class="text-purple-700 ml-2">紫+2</apan>',
            useCash: 250000,
            useStone: 5,
        },
        9: {
            id: 9,
            label: '<span class="mr-2 text-purple-700">紫+2</span>>><span class="text-purple-700 ml-2">紫+3</apan>',
            useCash: 300000,
            useStone: 6,
        },
        10: {
            id: 10,
            label: '<span class="mr-2 text-purple-700">紫+3</span>>><span class="text-orange-700 ml-2">橙</apan>',
            useCash: 350000,
            useStone: 7,
        },
        11: {
            id: 11,
            label: '<span class="mr-2 text-orange-700">橙</span>>><span class="text-orange-700 ml-2">橙+1</apan>',
            useCash: 400000,
            useStone: 8,
        },
        12: {
            id: 12,
            label: '<span class="mr-2 text-orange-700">橙+1</span>>><span class="text-orange-700 ml-2">橙+2</apan>',
            useCash: 450000,
            useStone: 10,
        },
        13: {
            id: 13,
            label: '<span class="mr-2 text-orange-700">橙+2</span>>><span class="text-orange-700 ml-2">橙+3</apan>',
            useCash: 500000,
            useStone: 12,
        },
        14: {
            id: 14,
            label: '<span class="mr-2 text-orange-700">橙+3</span>>><span class="text-orange-700 ml-2">橙+4</apan>',
            useCash: 550000,
            useStone: 14,
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
            const levelPokes = {}
            let useCount = 0
            pokedexStore.gradeCardUses.forEach((use) => {
                use.gradeCards.forEach((levelUse) => {
                    if (levelUse.cards.some((useCard) => useCard.id === card.id)) {
                        if (!levelPokes[levelUse.level]) levelPokes[levelUse.level] = []
                        levelPokes[levelUse.level].push(use.poke)
                        useCount++
                    }
                })
            })
            return {
                ...card,
                levelPokes,
                useCount,
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
