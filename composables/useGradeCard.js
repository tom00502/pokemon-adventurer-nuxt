import _gradeCards from '@/assets/json/gradeCards.json'
import { usePokedexStore } from '@/stores/pokedex'
export default function () {
    const pokedexStore = usePokedexStore()
    const gradeCards = computed(() => {
        return _gradeCards.map((item) => ({
            id: item.i,
            name: item.n,
            quality: item.q,
        }))
    })
    const getGradeCardById = (id) => {
        return gradeCards.value.find((card) => card.id === id)
    }
    onMounted(() => {
        if (pokedexStore.gradeCardUses?.length) return
        pokedexStore.actionGetGradeCardUseMap()
    })
    return {
        gradeCards,
        getGradeCardById,
    }
}
