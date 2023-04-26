<script setup>
import { usePokedexStore } from '@/stores/pokedex'
const { getHeldItem, stateIncreases } = useHeldItem()
const route = useRoute()
const pokedexStore = usePokedexStore()
const { typeTwToEn, qualityEnToTw, getTypeColors } = usePokeTypes()
const { id } = route.params
const heldItem = computed(() => {
    return getHeldItem(id) || {}
})
const pokemon = computed(() => {
    return pokedexStore.pokedex[id] || { stat: {} }
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
const costCoinName = computed(() => {
    if (heldItem.value.quality === 'beyond') {
        return 'costCoinSupreme'
    }
    if (heldItem.value.quality === 'legend') {
        return 'costCoinLegend'
    }
    return 'costCoinEpic'
})
const costCubeName = computed(() => {
    if (heldItem.value.quality === 'beyond') {
        return 'costCubeSupreme'
    }
    if (heldItem.value.quality === 'legend') {
        return 'costCubeLegend'
    }
    return 'costCubeEpic'
})
const decompose = {
    beyond: {
        coupon: 100,
        fragment: 25,
        fragmentToComposition: 100,
    },
    legend: {
        coupon: 50,
        fragment: 18,
        fragmentToComposition: 75,
    },
    epic: {
        coupon: 25,
        fragment: 12,
        fragmentToComposition: 50,
    },
}
const star = {
    1: {
        epic: 300,
        legend: 0,
        beyond: 0,
        levelLimit: 5,
    },
    2: {
        epic: 420,
        legend: 720,
        beyond: 0,
        levelLimit: 10,
    },
    3: {
        epic: 540,
        legend: 900,
        beyond: 1500,
        levelLimit: 15,
    },
    4: {
        epic: 660,
        legend: 1080,
        beyond: 2000,
        levelLimit: 20,
    },
    5: {
        epic: 780,
        legend: 1260,
        beyond: 2500,
        levelLimit: 25,
    },
    6: {
        epic: 0,
        legend: 0,
        beyond: 0,
        levelLimit: 30,
    },
    total: {
        epic: 2700,
        legend: 3960,
        beyond: 6000,
    },
}
const exp = {
    epic: 5,
    legend: 10,
    beyond: 20,
}
const costTotal = {
    epic: {
        coin: '3,277,590',
        cube1: 396,
        cube2: 480,
    },
    legend: {
        coin: '739,850+?',
        cube1: 504,
        cube2: 600,
    },
    beyond: {
        coin: '4,586,670',
        cube1: 720,
        cube2: 840,
    },
}
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
                升星資訊
            </legend>
            <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">星級</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">升星所需經驗</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">等級上限</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="level in 6"
                            :key="level"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <th
                                scope="row"
                                class="whitespace-nowrap py-1 px-1 font-medium text-gray-900"
                            >
                                <div class="py-1 px-1">
                                    {{ level }}
                                </div>
                            </th>
                            <td class="py-1 px-1">
                                <div v-if="star[level][heldItem.quality]">
                                    {{
                                        `${star[level][heldItem.quality]}(${
                                            star[level][heldItem.quality] / exp[heldItem.quality]
                                        }碎片)`
                                    }}
                                </div>
                            </td>
                            <td class="py-1 px-1">
                                <div>{{ star[level]['levelLimit'] }}</div>
                            </td>
                        </tr>
                        <tr>
                            <th class="whitespace-nowrap py-1 px-1 font-medium text-gray-900">
                                加總
                            </th>
                            <td>
                                {{
                                    `${star['total'][heldItem.quality]}(${
                                        star['total'][heldItem.quality] / exp[heldItem.quality]
                                    }碎片)`
                                }}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </fieldset>
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                合成與分解
            </legend>
            <div class="mt-2 ml-2">
                <div class="mt-2">
                    {{ decompose[heldItem.quality].fragmentToComposition }}個{{
                        heldItem.name
                    }}碎片可合成1個{{ heldItem.name }}
                </div>
                <div class="mt-2">分解後可獲得</div>
                <div class="mt-1 ml-2 flex">
                    <div class="mr-2">器物券:</div>
                    <div>{{ decompose[heldItem.quality].coupon }}</div>
                </div>
                <div class="ml-2 flex">
                    <div class="mr-2">{{ heldItem.name }}碎片:</div>
                    <div>{{ decompose[heldItem.quality].fragment }}</div>
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
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                升等消耗
            </legend>
            <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">等級</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">金幣</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-1">魔力方塊</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="level in 29"
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
                            <td class="py-1 px-1">
                                <div v-if="stateIncreases[level][costCoinName]">
                                    {{ stateIncreases[level][costCoinName] }}
                                </div>
                                <div v-else class="text-red-700">???</div>
                            </td>
                            <td class="py-1 px-1">
                                <div v-if="level < 10">
                                    魔力方塊(小)*{{ stateIncreases[level][costCubeName] }}
                                </div>
                                <div v-else-if="level < 20">
                                    魔力方塊(中)*{{ stateIncreases[level][costCubeName] }}
                                </div>
                                <div v-else>
                                    魔力方塊(大)*{{ stateIncreases[level][costCubeName] }}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th class="whitespace-nowrap py-1 px-1 font-medium text-gray-900">
                                加總
                            </th>
                            <td>
                                {{ costTotal[heldItem.quality].coin }}
                            </td>
                            <td>
                                <div>魔力方塊(小)*{{ costTotal[heldItem.quality].cube1 }}</div>
                                <div>魔力方塊(中)*{{ costTotal[heldItem.quality].cube2 }}</div>
                                <div>魔力方塊(大)*{{ costTotal[heldItem.quality].cube2 }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
