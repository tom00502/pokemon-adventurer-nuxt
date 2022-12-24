<script setup>
import { ref, reactive } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const show = ref(false)
const activeTab = ref('self')
const move = reactive({ name: '' })
const beforeOpen = (e) => {
    const propMove = e.ref.params.value.move
    Object.assign(move, propMove)
    if (pokedexStore.movePokes(move.id).length) {
        activeTab.value = 'self'
    } else {
        activeTab.value = 'learn'
    }
}
const movePokeCount = computed(() => {
    return pokedexStore.movePokes(move.id).length
})
const learnMovePokeCount = computed(() => {
    return pokedexStore.learnMovePokes(move.id).length
})
const movePokes = computed(() => {
    if (activeTab.value === 'self') {
        return pokedexStore.movePokes(move.id)
    }
    return pokedexStore.learnMovePokes(move.id)
})
const handleClick = (tab) => {
    activeTab.value = tab
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="ShowMoveModal"
        @before-open="beforeOpen"
    >
        <div class="w-[calc(min(100vw,32rem)-48px)] px-4 py-6 text-left">
            <div class="flex items-center justify-between">
                <div class="font-medium">
                    {{ move.name }}
                </div>
            </div>
            <div class="mt-5 overflow-y-auto whitespace-pre-line">
                {{ move.descript }}
            </div>

            <div class="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
                <ul class="-mb-px flex list-none flex-wrap justify-around">
                    <li class="mr-2">
                        <a
                            href="#"
                            class="inline-block rounded-t-lg border-b-2 p-4"
                            :class="{
                                'border-blue-600 text-blue-600': activeTab === 'self',
                                'border-transparent hover:border-gray-300 hover:text-gray-600':
                                    activeTab !== 'self',
                                'cursor-not-allowed': movePokeCount === 0,
                            }"
                            @click.prevent="movePokeCount && handleClick('self')"
                            >自學的精靈({{ movePokeCount }})</a
                        >
                    </li>
                    <li class="mr-2">
                        <a
                            href="#"
                            class="inline-block rounded-t-lg border-b-2 p-4"
                            :class="{
                                'border-blue-600 text-blue-600': activeTab === 'learn',
                                'border-transparent hover:border-gray-300 hover:text-gray-600':
                                    activeTab !== 'learn',
                                'cursor-not-allowed': learnMovePokeCount === 0,
                            }"
                            @click.prevent="learnMovePokeCount && handleClick('learn')"
                            >招式機學習的精靈({{ learnMovePokeCount }})</a
                        >
                    </li>
                </ul>
            </div>
            <div class="mt-5 max-h-[calc(70vh-98px)] overflow-y-auto whitespace-pre-line">
                <div class="flex flex-wrap gap-2">
                    <div
                        v-for="poke in movePokes"
                        :key="poke.id"
                        class="m-1 grow p-1 text-center"
                        :class="poke.quality"
                    >
                        {{ poke.name }}
                    </div>
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>
<style>
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
</style>
