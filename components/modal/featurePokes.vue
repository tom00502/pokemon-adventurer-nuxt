<script setup>
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
import usePokemonI18n from '@/composables/usePokemonI18n'

const pokedexStore = usePokedexStore()
const { locale } = useI18n()
const { getLocalizedPokemonName } = usePokemonI18n()
const show = ref(false)
const abilityId = ref(1)
const ability = computed(() => {
    const ability = pokedexStore.abilitydex[abilityId.value]
    if(!ability) return {}
    if(locale.value === 'en') {
        return {
            ...ability,
            name: ability.nameEn || ability.name,
            descript: ability.descriptEn || ability.descript,
        }
    }
    return ability
})
const beforeOpen = (e) => {
    abilityId.value = e.ref.params.value.abilityId
}
</script>
<template>
    <VueFinalModal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="ShowAbilityModal"
        @before-open="beforeOpen"
    >
        <div class="w-[calc(min(100vw,32rem)-48px)] px-4 py-6 text-left">
            <div class="flex items-center justify-between">
                <div class="font-medium">
                    {{ ability.name }}
                </div>
            </div>
            <div class="mt-5 overflow-y-auto whitespace-pre-line">
                {{ ability.descript }}
            </div>
            <div class="mt-5 max-h-[calc(70vh-98px)] overflow-y-auto whitespace-pre-line">
                <div class="flex flex-wrap gap-2">
                    <div
                        v-for="poke in pokedexStore.abilityPokes(ability.id)"
                        :key="poke.id"
                        class="m-1 grow p-1 text-center"
                        :class="poke.quality"
                    >
                        {{ getLocalizedPokemonName(poke) }}
                    </div>
                </div>
            </div>
        </div>
    </VueFinalModal>
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
</style>
