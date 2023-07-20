<script setup>
import { $vfm, VueFinalModal } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
import { usePokeCardStore } from '@/stores/poke-card'
const { typeTwToEn } = usePokeTypes()
const { natures } = usePokeNatures()
const { heldItems } = useHeldItem()
const { createPokeCard } = useApi()
const router = useRouter()
useHead({
    title: '製作精靈卡',
})
const pokedexStore = usePokedexStore()
const pokeCardStore = usePokeCardStore()

const basicPoints = [
    { key: 'hp', name: '生命' },
    { key: 'attack', name: '攻擊' },
    { key: 'defense', name: '防禦' },
    { key: 'sAttack', name: '特攻' },
    { key: 'sDefense', name: '特防' },
    { key: 'speed', name: '速度' },
]
const loading = ref(false)
const title = ref('')
const creator = ref('')
const poke = ref({ name: '' })
const chooseMoves = ref([])
const chooseAbility = ref({ name: '' })
const chooseNature = ref({ name: '' })
const chooseItem = ref({ name: '' })
const describe = ref('')
const chooseType = ref('')
const reincarnated = ref(true)
const basicPoint = ref({ hp: 0, attack: 0, defense: 0, sAttack: 0, sDefense: 0, speed: 0 })
const pokes = computed(() => {
    return pokedexStore.pokes.map((poke) => ({
        id: poke.id,
        name: poke.name,
    }))
})
const pokemon = computed(() => {
    return pokedexStore.pokedex[poke.value.id] || { stat: {} }
})
const pokeMoves = computed(() => {
    const pokeMoves = pokemon.value.moves || []
    const pokeLearnMoves = pokemon.value.learnMoves || []
    const moves = [...new Set([...pokeMoves, ...pokeLearnMoves])]
    return moves.map((moveId) => ({
        ...pokedexStore.movedex[moveId],
    }))
})
const pokeAbilities = computed(() => {
    const pokeAbilities = pokemon.value.features || []
    return pokeAbilities.map((abilityId) => ({
        ...pokedexStore.abilitydex[abilityId],
    }))
})
const reincarnateOptions = [
    { name: '轉生前', value: false },
    { name: '轉生後', value: true },
]
const types = computed(() => {
    return pokemon.value.attribute || []
})
const usedPoint = computed(() => {
    return (
        basicPoint.value.hp +
        basicPoint.value.attack +
        basicPoint.value.defense +
        basicPoint.value.sAttack +
        basicPoint.value.sDefense +
        basicPoint.value.speed
    )
})
watch(
    () => poke.value,
    () => {
        if (!pokemon.value.attribute) return
        chooseType.value = pokemon.value.attribute[0] || ''
    }
)
const myPokeCard = ref(null)
const handleChange = () => {}
const checkPoint = (pointType) => {
    if (usedPoint.value > maxPointAll.value) {
        let sum = 0
        basicPoints.forEach((type) => {
            if (type.key === pointType) {
                return
            }
            sum += basicPoint.value[type.key]
        })
        basicPoint.value[pointType] = maxPointAll.value - sum
    }
}
const maxPointSingle = computed(() => {
    return reincarnated.value ? 252 : 255
})
const maxPointAll = computed(() => {
    return reincarnated.value ? 630 : 510
})
onMounted(() => {
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})

const pokeData = computed(() => {
    return {
        title: title.value,
        pokeId: poke.value.id,
        pokeName: poke.value.name,
        moves: chooseMoves.value.map((item) => item.id).join(','),
        abilityId: chooseAbility.value?.id,
        natureId: chooseNature.value?.id,
        itemId: chooseItem.value?.id,
        ...basicPoint.value,
        description: describe.value,
        creator: creator.value,
        type: typeTwToEn[chooseType.value],
        reincarnated: reincarnated.value,
    }
})
const pokeMoveBtns = computed(() => {
    if (chooseMoves.value.length >= 4) return []
    const pokeMoves = pokemon.value.moves || []
    const btns = pokeMoves.map((moveId) => ({
        ...pokedexStore.movedex[moveId],
    }))
    return btns.filter((move) => !chooseMoves.value.some((item) => item.id === move.id))
})
const pokeLearnMoveBtns = computed(() => {
    if (chooseMoves.value.length >= 4) return []
    const pokeLearnMoves = pokemon.value.learnMoves || []
    const btns = pokeLearnMoves.map((moveId) => ({
        ...pokedexStore.movedex[moveId],
    }))
    return btns.filter((move) => !chooseMoves.value.some((item) => item.id === move.id))
})
const handlekeepMoveClick = (move) => {
    // const move = pokedexStore.moves.find((move) => move.id === id)
    chooseMoves.value.push(move)
}
const handleClick = async () => {
    const params = {
        title: title.value,
        pokeId: poke.value.id,
        pokeName: poke.value.name,
        moves: chooseMoves.value.map((item) => item.id).join(','),
        abilityId: chooseAbility.value.id,
        natureId: chooseNature.value.id,
        itemId: chooseItem.value.id,
        ...basicPoint.value,
        description: describe.value,
        creator: creator.value,
        type: typeTwToEn[chooseType.value],
        reincarnated: reincarnated.value,
    }
    loading.value = true
    await createPokeCard(params)
    pokeCardStore.needRefresh = true
    loading.value = false
    const options = {
        message: `製作完成`,
    }
    $vfm.show('alertModal', { options })

    router.push({ path: '/pokeCard' })
}

const handlePokeChange = () => {
    chooseMoves.value = []
    if (pokeAbilities.value.length !== 0) chooseAbility.value = pokeAbilities.value[0]
    else chooseAbility.value = null
    chooseNature.value = null
    chooseItem.value = null
    basicPoint.value = {
        hp: 0,
        attack: 0,
        defense: 0,
        sAttack: 0,
        sDefense: 0,
        speed: 0,
    }
    describe.value = ''
    creator.value = ''
}
</script>

<template>
    <div>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="1399675524"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="page-title">製作精靈卡</div>
        <div class="note">
            <ul>
                <li>基本上尊重大家創意，但為確保品質，若發現太誇張或惡意的卡片將會被刪除！！</li>
            </ul>
        </div>
        <div class="mt-2 md:flex md:gap-2">
            <div class="md:max-h-[calc(100vh-150px)] md:flex-1 md:overflow-auto">
                <div>
                    <RouterLink to="/pokeCard">
                        <button
                            type="button"
                            class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            返回
                        </button>
                    </RouterLink>
                </div>

                選擇精靈
                <v-select
                    v-model="poke"
                    :options="pokes"
                    label="name"
                    @option:selected="handlePokeChange"
                ></v-select>
                精靈稱號
                <div>
                    <input
                        v-model="title"
                        type="text"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        @input="handleChange"
                    />
                </div>
                <template v-if="types.length > 1">
                    選擇主題色
                    <vSelect
                        v-model="chooseType"
                        :options="types"
                        label="name"
                        @option:selected="handleChange"
                    ></vSelect>
                </template>
                選擇招式
                <v-select
                    v-model="chooseMoves"
                    :options="pokeMoves"
                    multiple
                    label="name"
                    :selectable="() => chooseMoves.length < 4"
                    @option:selected="handleChange"
                    @option:deselected="handleChange"
                ></v-select>
                <div class="mt-2">
                    <button
                        v-for="move in pokeMoveBtns"
                        :key="move.id"
                        type="button"
                        class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="handlekeepMoveClick(move)"
                    >
                        {{ move.name }}
                    </button>
                </div>
                <div class="mt-2">
                    <button
                        v-for="move in pokeLearnMoveBtns"
                        :key="move.id"
                        type="button"
                        class="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        @click="handlekeepMoveClick(move)"
                    >
                        {{ move.name }}
                    </button>
                </div>

                選擇特性
                <v-select
                    v-model="chooseAbility"
                    :options="pokeAbilities"
                    label="name"
                    @option:selected="handleChange"
                    @option:deselected="handleChange"
                ></v-select>
                選擇個性
                <v-select
                    v-model="chooseNature"
                    :options="natures"
                    label="name"
                    @option:selected="handleChange"
                    @option:deselected="handleChange"
                ></v-select>
                選擇攜帶物
                <v-select
                    v-model="chooseItem"
                    :options="heldItems"
                    label="name"
                    @option:selected="handleChange"
                    @option:deselected="handleChange"
                ></v-select>
                轉生狀態
                <v-select
                    v-model="reincarnated"
                    :options="reincarnateOptions"
                    :reduce="(option) => option.value"
                    label="name"
                    @option:selected="handleChange"
                    @option:deselected="handleChange"
                ></v-select>
                努力值({{ usedPoint }} / {{ maxPointAll }})
                <div v-for="basicType in basicPoints" :key="basicType.key" class="w-full px-3">
                    {{ basicType.name }}
                    <input
                        v-model.number="basicPoint[basicType.key]"
                        type="range"
                        min="0"
                        :max="maxPointSingle"
                        class="w-full"
                        @change="() => checkPoint(basicType.key)"
                    />
                    <input
                        v-model.number="basicPoint[basicType.key]"
                        type="number"
                        :max="maxPointSingle"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        @change="() => checkPoint(basicType.key)"
                        @keyup="() => checkPoint(basicType.key)"
                    />
                    {{ ` / ${maxPointSingle}` }}
                    <div class="flex py-1">
                        <button
                            type="button"
                            class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            :disabled="usedPoint + 63 > maxPointAll + basicPoint[basicType.key]"
                            :class="
                                usedPoint + 63 > maxPointAll + basicPoint[basicType.key]
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            "
                            @click="basicPoint[basicType.key] = 63"
                        >
                            63
                        </button>
                        <button
                            type="button"
                            class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            :disabled="usedPoint + 100 > maxPointAll + basicPoint[basicType.key]"
                            :class="
                                usedPoint + 100 > maxPointAll + basicPoint[basicType.key]
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            "
                            @click="basicPoint[basicType.key] = 100"
                        >
                            100
                        </button>
                        <button
                            type="button"
                            class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            :disabled="usedPoint + 150 > maxPointAll + basicPoint[basicType.key]"
                            :class="
                                usedPoint + 150 > maxPointAll + basicPoint[basicType.key]
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            "
                            @click="basicPoint[basicType.key] = 150"
                        >
                            150
                        </button>
                        <button
                            type="button"
                            class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            :disabled="usedPoint + 200 > maxPointAll + basicPoint[basicType.key]"
                            :class="
                                usedPoint + 200 > maxPointAll + basicPoint[basicType.key]
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            "
                            @click="basicPoint[basicType.key] = 200"
                        >
                            200
                        </button>
                        <button
                            type="button"
                            class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            :disabled="
                                usedPoint + maxPointSingle > maxPointAll + basicPoint[basicType.key]
                            "
                            :class="
                                usedPoint + maxPointSingle > maxPointAll + basicPoint[basicType.key]
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                            "
                            @click="basicPoint[basicType.key] = maxPointSingle"
                        >
                            {{ maxPointSingle }}
                        </button>
                    </div>
                </div>

                <label for="message" class="mb-2 block text-sm font-medium text-gray-900"
                    >使用說明(約可填150字，請自己檢查有沒有太長被卡掉)</label
                >
                <textarea
                    id="message"
                    v-model="describe"
                    rows="4"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="介紹一下如何使用"
                    @input="handleChange"
                ></textarea>
                製作人(不想留名可以空白)
                <div>
                    <input
                        v-model="creator"
                        type="text"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        @input="handleChange"
                    />
                </div>
                <div v-if="loading" class="lds-dual-ring hidden md:block"></div>
                <button
                    v-else
                    type="button"
                    class="my-2 mr-2 hidden rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:block"
                    @click="handleClick"
                >
                    送出製作精靈卡
                </button>
            </div>
            <!-- <canvas id="canvas" width="150" height="150"></canvas> -->
            <div class="md:flex-1">
                <div class="poke-card md:max-w-[600px]">
                    <PokeCard ref="myPokeCard" :poke-data="pokeData" />
                </div>
                <div class="flex justify-center md:hidden">
                    <div v-if="loading" class="lds-dual-ring"></div>
                    <button
                        v-else
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="handleClick"
                    >
                        送出製作精靈卡
                    </button>
                </div>
            </div>
            <!-- <div>
            <canvas id="pokeCard" :width="canvasWidth" height="900"></canvas>
        </div> -->
        </div>
    </div>
</template>

<style scoped>
.poke-card {
    width: 100%;
    aspect-ratio: 2/3;
}
.page-title {
    border-left: 8px solid rgb(191, 219, 254);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
</style>
