<script setup>
import { usePokedexStore } from '@/stores/pokedex'
const route = useRoute()
const pokedexStore = usePokedexStore()
const { id } = route.params
const pokemon = computed(() => {
    return pokedexStore.pokedex[id] || {}
})
const movesToNames = (moveIds = []) => {
    if (moveIds.length === 0) return ''
    return moveIds
        .map((moveId) => {
            const move = pokedexStore.movedex[moveId]
            if (move) {
                return move.name
            }
            return '無此招資料'
        })
        .join(', ')
}
const abilitiesToNames = (abilityIds = []) => {
    if (abilityIds.length === 0) return ''
    return abilityIds
        .map((abilityId) => {
            const ability = pokedexStore.abilitydex[abilityId]
            if (ability) {
                return ability.name
            }
            return '無此特性資料'
        })
        .join(', ')
}
</script>
<template>
    <div class="bg-white">
        <h2>精靈名稱</h2>
        <h3>{{ pokemon.name }}</h3>
        <h2>精靈屬性</h2>
        <h3>{{ pokemon.attribute }}</h3>
        <h2>自學招式</h2>
        <h3>{{ movesToNames(pokemon.moves) }}</h3>
        <h2>學習機招式</h2>
        <h3>{{ movesToNames(pokemon.learnMoves) }}</h3>
        <h2>精靈特性</h2>
        <h3>{{ abilitiesToNames(pokemon.features) }}</h3>
    </div>
</template>
