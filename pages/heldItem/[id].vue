<script setup>
import { $vfm } from 'vue-final-modal'
import { groupBy } from 'lodash'
import moment from 'moment'
import { usePokedexStore } from '@/stores/pokedex'
import { useDistributionStore } from '@/stores/distribution'
import pokedexRef from '@/assets/json/pokedexRef.json'
const { getHeldItem, stateIncreases } = useHeldItem()
const route = useRoute()
const pokedexStore = usePokedexStore()
const distributionStore = useDistributionStore()
const { shinyIncomes: _shinyIncomes, costGroup } = usePokeSource()
const { attackCalc, typeTwToEn, qualityEnToTw, getTypeColors } = usePokeTypes()
const { id } = route.params
const heldItem = computed(() => {
    return getHeldItem(id) || {}
})
const pokemon = computed(() => {
    return pokedexStore.pokedex[id] || { stat: {} }
})
const pokeRef = computed(() => {
    if (!pokemon.value.zukanId) return {}
    return (
        pokedexRef.find(
            (poke) =>
                poke.zukan_id === pokemon.value.zukanId &&
                poke.zukan_sub_id === pokemon.value.zukanSubId
        ) || {}
    )
})
const typeColor = computed(() => {
    if (useType.value) return getTypeColors(useType.value)
    let type = 'normal'
    if (pokemon.value.attribute) {
        type = typeTwToEn[pokemon.value.attribute[0]] || 'normal'
    }
    return getTypeColors(type)
})

const useType = ref('')

const mainBody = ref(null)
onMounted(() => {
    if (process.client) {
        // mainBody.value.scrollTo({ top: 0, behavior: 'smooth' })
        window.scrollTo(0, 0)
    }
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
</script>

<template>
    <div id="capture" ref="mainBody" class="bg-white">
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="1399675524"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="flex items-center justify-center">
            <div class="text-center text-2xl font-bold drop-shadow-lg">
                {{ heldItem.name }}
            </div>
            <span class="quality mx-2 px-2" :class="heldItem.quality">
                {{ qualityEnToTw[heldItem.quality] }}
            </span>
        </div>
        <div class="flex justify-center">
            <div class="flex max-w-lg justify-center">
                <img class="w-4/5" :src="`/icons/heldItem/${heldItem.id}.png`" alt="" />
            </div>
        </div>
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                配戴效果
            </legend>
            <div class="mt-2 ml-2">
                <div class="mt-2">{{ heldItem.direction }}</div>
                <div class="mt-2 flex">
                    <div class="mr-2 w-20">1等效果:</div>
                    <div v-html="heldItem.effectStrings[0]"></div>
                </div>
                <div class="flex">
                    <div class="mr-2 w-20">10等效果:</div>
                    <div v-html="heldItem.effectStrings[1]"></div>
                </div>
                <div class="flex">
                    <div class="mr-2 w-20">20等效果:</div>
                    <div v-html="heldItem.effectStrings[2]"></div>
                </div>
                <div class="flex">
                    <div class="mr-2 w-20">30等效果:</div>
                    <div v-html="heldItem.effectStrings[3]"></div>
                </div>
            </div>
        </fieldset>
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                屬性提升
            </legend>
            <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">等級</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">生命</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">攻擊</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">防禦</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">特攻</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">特防</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">速度</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="level in 30"
                            :key="level"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <th
                                scope="row"
                                class="cursor-pointer whitespace-nowrap py-1 px-1 font-medium text-gray-900"
                            >
                                <div class="py-1 px-1">
                                    {{ level }}
                                </div>
                            </th>
                            <td class="py-1 px-1 text-green-500">
                                <div>
                                    {{ stateIncreases[level][`${heldItem.stateIncrease[0]}`] }}
                                </div>
                            </td>
                            <td class="py-1 px-1 text-green-500">
                                <div>
                                    {{ stateIncreases[level][`${heldItem.stateIncrease[1]}`] }}
                                </div>
                            </td>
                            <td class="py-1 px-1 text-green-500">
                                <div>
                                    {{ stateIncreases[level][`${heldItem.stateIncrease[2]}`] }}
                                </div>
                            </td>
                            <td class="py-1 px-1 text-green-500">
                                <div>
                                    {{ stateIncreases[level][`${heldItem.stateIncrease[3]}`] }}
                                </div>
                            </td>
                            <td class="py-1 px-1 text-green-500">
                                <div>
                                    {{ stateIncreases[level][`${heldItem.stateIncrease[4]}`] }}
                                </div>
                            </td>
                            <td class="py-1 px-1 text-green-500">
                                <div>
                                    {{ stateIncreases[level][`${heldItem.stateIncrease[5]}`] }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {{ stateIncreases[1]['v2'] }}
        </fieldset>
    </div>
</template>
<style scoped>
* {
    --myBorderColor: v-bind(typeColor.color);
    --typeBgColor: v-bind(typeColor.alphaColor);
}
fieldset {
    border-color: var(--myBorderColor);
    margin-top: 1rem;
}
legend {
    border-color: var(--myBorderColor);
    background-color: var(--typeBgColor);
}
.method-title {
    border-left: 8px solid var(--typeBgColor);
    border-right: 8px solid var(--typeBgColor);
    padding-left: 8px;
    padding-right: 8px;
    font-weight: 700;
    margin: 8px 0px 4px 0px;
    display: inline-block;
}
.type-text-color.active {
    color: black;
    background-color: var(--typeBgColor);
}
.border-type {
    border-color: var(--typeBgColor);
}
.quality.beyond {
    border: 2px solid transparent;
    border-radius: 8px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, white, white),
        linear-gradient(135deg, #3632ff 0%, #3eff30 33%, #ffff00 66%, #ff5900 100%);
}
.quality.legend {
    border: 2px solid #ffff00;
    border-radius: 8px;
    background: white;
}
.quality.epic {
    border: 2px solid rgb(192, 0, 192);
    border-radius: 8px;
    background: white;
}
.quality.rare {
    border: 2px solid rgb(46, 57, 255);
    border-radius: 8px;
    background: white;
}
.quality.normal {
    border: 2px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
}
</style>
