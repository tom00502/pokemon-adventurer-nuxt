import _gradeCards from '@/assets/json/gradeCards.json'
import { usePokedexStore } from '@/stores/pokedex'
export default function () {
    const { locale, t } = useI18n()
    const pokedexStore = usePokedexStore()
    const gradeCardlevel = {
        1: {
            id: 1,
            label: `<span class="mr-2">${t(
                'gradeCard.white'
            )}</span>>><span class="text-green-700 ml-2">${t('gradeCard.green')}</apan>`,
            useCash: 30000,
        },
        2: {
            id: 2,
            label: `<span class="mr-2 text-green-700">${t(
                'gradeCard.green'
            )}</span>>><span class="text-green-700 ml-2">${t('gradeCard.green')}+1</apan>`,
            useCash: 50000,
        },
        3: {
            id: 3,
            label: `<span class="mr-2 text-green-700">${t(
                'gradeCard.green'
            )}+1</span>>><span class="text-blue-700 ml-2">${t('gradeCard.blue')}</apan>`,
            useCash: 70000,
            useStone: 1,
        },
        4: {
            id: 4,
            label: `<span class="mr-2 text-blue-700">${t(
                'gradeCard.blue'
            )}</span>>><span class="text-blue-700 ml-2">${t('gradeCard.blue')}+1</apan>`,
            useCash: 80000,
            useStone: 1,
        },
        5: {
            id: 5,
            label: `<span class="mr-2 text-blue-700">${t(
                'gradeCard.blue'
            )}+1</span>>><span class="text-blue-700 ml-2">${t('gradeCard.blue')}+2</apan>`,
            useCash: 100000,
            useStone: 2,
        },
        6: {
            id: 6,
            label: `<span class="mr-2 text-blue-700">${t(
                'gradeCard.blue'
            )}+2</span>>><span class="text-purple-700 ml-2">${t('gradeCard.purple')}</apan>`,
            useCash: 150000,
            useStone: 3,
        },
        7: {
            id: 7,
            label: `<span class="mr-2 text-purple-700">${t(
                'gradeCard.purple'
            )}</span>>><span class="text-purple-700 ml-2">${t('gradeCard.purple')}+1</apan>`,
            useCash: 200000,
            useStone: 4,
        },
        8: {
            id: 8,
            label: `<span class="mr-2 text-purple-700">${t(
                'gradeCard.purple'
            )}+1</span>>><span class="text-purple-700 ml-2">${t('gradeCard.purple')}+2</apan>`,
            useCash: 250000,
            useStone: 5,
        },
        9: {
            id: 9,
            label: `<span class="mr-2 text-purple-700">${t(
                'gradeCard.purple'
            )}+2</span>>><span class="text-purple-700 ml-2">${t('gradeCard.purple')}+3</apan>`,
            useCash: 300000,
            useStone: 6,
        },
        10: {
            id: 10,
            label: `<span class="mr-2 text-purple-700">${t(
                'gradeCard.purple'
            )}+3</span>>><span class="text-orange-700 ml-2">${t('gradeCard.orange')}</apan>`,
            useCash: 350000,
            useStone: 7,
        },
        11: {
            id: 11,
            label: `<span class="mr-2 text-orange-700">${t(
                'gradeCard.orange'
            )}</span>>><span class="text-orange-700 ml-2">${t('gradeCard.orange')}+1</apan>`,
            useCash: 400000,
            useStone: 8,
        },
        12: {
            id: 12,
            label: `<span class="mr-2 text-orange-700">${t(
                'gradeCard.orange'
            )}+1</span>>><span class="text-orange-700 ml-2">${t('gradeCard.orange')}+2</apan>`,
            useCash: 450000,
            useStone: 10,
        },
        13: {
            id: 13,
            label: `<span class="mr-2 text-orange-700">${t(
                'gradeCard.orange'
            )}+2</span>>><span class="text-orange-700 ml-2">${t('gradeCard.orange')}+3</apan>`,
            useCash: 500000,
            useStone: 12,
        },
        14: {
            id: 14,
            label: `<span class="mr-2 text-orange-700">${t(
                'gradeCard.orange'
            )}+3</span>>><span class="text-orange-700 ml-2">${t('gradeCard.orange')}+4</apan>`,
            useCash: 550000,
            useStone: 14,
        },
    }
    const gradeCards = computed(() => {
        return _gradeCards.map((item) => ({
            id: item.i,
            // name: item.n,
            name: pokedexStore.localePokemons.find((poke) => poke.id === item.d)?.name || item.n,
            quality: item.q,
            from: item.f?.split(',') || [],
            index: item.d,
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
