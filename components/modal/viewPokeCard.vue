<script setup>
import { ref, reactive } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
const { typeTwToEn } = usePokeTypes()
const pokedexStore = usePokedexStore()
const show = ref(false)
const activeTab = ref('self')

const pokeData = ref({})
const beforeOpen = (e) => {
    // const propMove = e.ref.params.value.move
    // Object.assign(move, propMove)
    // console.log('beforeOpen', e.ref.params.value)
    pokeData.value = e.ref.params.value
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="ShowPokeCardModal"
        @before-open="beforeOpen"
    >
        <div class="flex w-[calc(min(100vw,32rem)-12px)] justify-center px-4 py-6 text-left">
            <div class="poke-card">
                <PokeCard ref="myPokeCard" :poke-data="pokeData" class="h-full w-full" />
            </div>
        </div>
    </vue-final-modal>
</template>
<style scoped>
.beyond {
    border: 3px solid transparent;
    border-radius: 8px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, white, white),
        linear-gradient(135deg, #3632ff 0%, #3eff30 33%, #ffff00 66%, #ff5900 100%);
}
.legend {
    border: 3px solid #ffff00;
    border-radius: 8px;
    background: white;
}
.epic {
    border: 3px solid rgb(192, 0, 192);
    border-radius: 8px;
    background: white;
}
.rare {
    border: 3px solid rgb(46, 57, 255);
    border-radius: 8px;
    background: white;
}
.normal {
    border: 3px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
}
.poke-card {
    width: 100%;
    aspect-ratio: 2/3;
}
</style>
