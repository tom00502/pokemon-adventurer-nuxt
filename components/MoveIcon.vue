<script setup>
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const { typeTwToEn } = usePokeTypes()
const props = defineProps({
    moveId: {
        type: Number,
        required: true,
    },
})
const move = computed(() => {
    if (!props.moveId) return {}
    return pokedexStore.movedex[props.moveId]
})
</script>
<template>
    <div
        class="move w-10 min-w-[120px] max-w-[150px] rounded py-1 px-2 text-center"
        :class="typeTwToEn[move.type]"
    >
        {{ move.name }}
    </div>
</template>
<style scoped>
.move:hover {
    filter: saturate(200%);
    transform: scale(1.1);
    cursor: pointer;
}
.bug {
    background: rgba(70, 200, 70, 0.2);
}

.dark {
    background: rgba(120, 120, 120, 0.2);
}

.dragon {
    background: rgba(80, 120, 220, 0.2);
}

.electric {
    background: rgba(255, 255, 0, 0.2);
}

.fire {
    background: rgba(255, 105, 0, 0.2);
}

.fairy {
    background: rgba(255, 175, 200, 0.2);
}

.fighting {
    background: rgba(220, 105, 0, 0.2);
}

.flying {
    background: rgba(120, 220, 255, 0.2);
}

.ghost {
    background: rgba(160, 140, 255, 0.2);
}

.grass {
    background: rgba(180, 240, 0, 0.2);
}

.ground {
    background: rgba(250, 200, 90, 0.2);
}

.ice {
    background: rgba(20, 245, 255, 0.2);
}

.normal {
    background: rgba(220, 220, 220, 0.2);
}

.poison {
    background: rgba(210, 140, 210, 0.2);
}

.psychic {
    background: rgba(240, 140, 220, 0.2);
}

.rock {
    background: rgba(180, 140, 100, 0.2);
}

.steel {
    background: rgba(170, 200, 240, 0.2);
}

.water {
    background: rgba(20, 185, 255, 0.2);
}
</style>
