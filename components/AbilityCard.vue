<script setup>
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const props = defineProps({
    abilityId: {
        type: Number,
        required: true,
    },
})
const ability = computed(() => {
    if (!props.abilityId) return {}
    return pokedexStore.abilitydex[props.abilityId]
})
</script>
<template>
    <div class="ability normal w-10 min-w-[120px] max-w-[150px] rounded py-1 px-2 text-center">
        {{ ability.name }}
    </div>
</template>
<style scoped>
.ability:hover {
    filter: saturate(200%);
    transform: scale(1.1);
    cursor: pointer;
}
.normal {
    background: rgba(220, 220, 220, 0.2);
}
</style>
