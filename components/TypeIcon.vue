<script setup>
const { locale } = useI18n()
const props = defineProps({
    type: {
        type: String,
        required: true,
    },
})
const { typeEnToTw } = usePokeTypes()
</script>
<template>
    <div class="flex items-center gap-2">
        <div class="icon" :class="props.type">
            <img :src="`/icons/${props.type}.svg`" />
        </div>
        <div v-if="locale === 'en'" class="w-12 text-center">{{ props.type }}</div>
        <div v-else class="w-12 text-center">{{ typeEnToTw[props.type] }}</div>
    </div>
</template>
<style scoped>
.icon {
    border-radius: 100%;
    height: 24px;
    width: 24px;
    margin: auto;
    transition: 200ms all;
}

.icon:hover {
    filter: saturate(200%);
    transform: scale(1.1);
    cursor: pointer;
}

.icon img {
    height: 60%;
    width: 60%;
    margin: 20%;
}

.bug {
    background: #92bc2c;
    box-shadow: 0 0 20px #92bc2c;
}

.dark {
    background: #595761;
    box-shadow: 0 0 20px #595761;
}

.dragon {
    background: #0c69c8;
    box-shadow: 0 0 20px #0c69c8;
}

.electric {
    background: #f2d94e;
    box-shadow: 0 0 20px #f2d94e;
}

.fire {
    background: #fba54c;
    box-shadow: 0 0 20px #fba54c;
}

.fairy {
    background: #ee90e6;
    box-shadow: 0 0 20px #ee90e6;
}

.fighting {
    background: #d3425f;
    box-shadow: 0 0 20px #d3425f;
}

.flying {
    background: #a1bbec;
    box-shadow: 0 0 20px #a1bbec;
}

.ghost {
    background: #5f6dbc;
    box-shadow: 0 0 20px #5f6dbc;
}

.grass {
    background: #5fbd58;
    box-shadow: 0 0 20px #5fbd58;
}

.ground {
    background: #da7c4d;
    box-shadow: 0 0 20px #da7c4d;
}

.ice {
    background: #75d0c1;
    box-shadow: 0 0 20px #75d0c1;
}

.normal {
    background: #a0a29f;
    box-shadow: 0 0 20px #a0a29f;
}

.poison {
    background: #b763cf;
    box-shadow: 0 0 20px #b763cf;
}

.psychic {
    background: #fa8581;
    box-shadow: 0 0 20px #fa8581;
}

.rock {
    background: #c9bb8a;
    box-shadow: 0 0 20px #c9bb8a;
}

.steel {
    background: #5695a3;
    box-shadow: 0 0 20px #5695a3;
}

.water {
    background: #539ddf;
    box-shadow: 0 0 20px #539ddf;
}
</style>
