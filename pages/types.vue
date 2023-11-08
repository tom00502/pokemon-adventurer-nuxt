<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const { attackCalc, typeTwToEn, typeEnToTw } = usePokeTypes()
useHead({
    title: '屬性剋制',
})
const defenses = [
    { title: '2倍弱', value: 2 },
    { title: '4倍弱', value: 4 },
    { title: '2倍抗', value: 0.5 },
    { title: '4倍抗', value: 0.25 },
    { title: '免疫', value: 0 },
]
// 攻擊
const attacks = [
    { title: '4倍克', value: 4 },
    { title: '2倍克', value: 2 },
    { title: '2倍弱', value: 0.5 },
    { title: '4倍弱', value: 0.25 },
    { title: '無效', value: 0 },
]
const validDefenses = computed(() => {
    const valid = defenses.map((attack) => {
        const types = getDefenseTypes(attack.value)
        return {
            ...attack,
            types,
        }
    })
    return valid.filter((attack) => attack.types.length)
})
const validAttacks = computed(() => {
    const valid = attacks.map((attack) => {
        const types = getAttackTypes(attack.value)
        return {
            ...attack,
            types,
        }
    })
    return valid.filter((attack) => attack.types.length)
})
const validAttacks2 = computed(() => {
    const valid = attacks.map((attack) => {
        const types = getAttackTypes2(attack.value)
        return {
            ...attack,
            types,
        }
    })
    return valid.filter((attack) => attack.types.length)
})
const attack = computed(() => {
    return Object.values(typeTwToEn).map((type) => {
        let attack = 1
        selectTypes.value?.forEach((t) => {
            attack *= attackCalc[type][typeTwToEn[t]]
        })
        return { name: type, attack }
    })
})
const attackTypes = computed(() => {
    const attackTypes = []
    if (selectTypes.value.length === 0) return attackTypes
    for (let i = 0; i < 18; i++) {
        for (let j = i; j < 18; j++) {
            const type1 = typeTwToEn[pokedexStore.attributes[i]]
            const type2 = typeTwToEn[pokedexStore.attributes[j]]
            let attack = 1
            attack *= attackCalc[typeTwToEn[selectTypes.value[0]]][type1]
            if (type1 !== type2) attack *= attackCalc[typeTwToEn[selectTypes.value[0]]][type2]
            attackTypes.push({
                name: type1,
                name2: type2,
                attack,
            })
        }
    }
    return attackTypes
})
const attackTypes2 = computed(() => {
    const attackTypes = []
    if (selectTypes.value.length < 2) return attackTypes
    for (let i = 0; i < 18; i++) {
        for (let j = i; j < 18; j++) {
            const type1 = typeTwToEn[pokedexStore.attributes[i]]
            const type2 = typeTwToEn[pokedexStore.attributes[j]]
            let attack = 1
            attack *= attackCalc[typeTwToEn[selectTypes.value[1]]][type1]
            if (type1 !== type2) attack *= attackCalc[typeTwToEn[selectTypes.value[1]]][type2]
            attackTypes.push({
                name: type1,
                name2: type2,
                attack,
            })
        }
    }
    return attackTypes
})
const getDefenseTypes = (atk) => {
    return attack.value.filter((type) => type.attack === atk)
}
const getAttackTypes = (atk) => {
    return attackTypes.value.filter((type) => {
        if ([2, 0.5, 0].includes(atk)) return type.attack === atk && type.name === type.name2
        return type.attack === atk
    })
}
const getAttackTypes2 = (atk) => {
    return attackTypes2.value.filter((type) => {
        if ([2, 0.5, 0].includes(atk)) return type.attack === atk && type.name === type.name2
        return type.attack === atk
    })
}
const handleClear = () => {
    searchText.value = ''
    selectTypes.value = []
}
const searchText = ref('')
const selectTypes = ref([])
const filterPokes = computed(() => {
    if (selectTypes.value.length === 0) return []
    let result = pokedexStore.pokes
    if (selectTypes.value.length) {
        result = result.filter(
            (poke) =>
                poke.attribute.every((type) => selectTypes.value.includes(type)) &&
                selectTypes.value.every((type) => poke.attribute.includes(type))
        )
    }
    return result
})
const typeString = computed(() => {
    if (selectTypes.value.length === 0) return ''
    if (selectTypes.value.length === 1) return selectTypes.value[0]
    return `${selectTypes.value[0]} + ${selectTypes.value[1]}`
})
const handleSelectType = (type) => {
    if (type.name && type.name2) {
        selectTypes.value = [typeEnToTw[type.name], typeEnToTw[type.name2]]
    } else {
        selectTypes.value = [typeEnToTw[type.name]]
    }
}
</script>

<template>
    <main>
        <div class="page-title">屬性剋制查詢</div>
        <div class="note">
            <ul>
                <li>選擇屬性查看該屬性特色</li>
                <li>一次最多可以選擇兩個屬性</li>
                <li>點擊結果的屬性可以快速置換查詢</li>
                <li>點擊精靈可進入該精靈圖鑑詳細介紹頁</li>
            </ul>
        </div>
        <div class="mt-2 flex flex-wrap items-center px-3">
            <div class="my-1 mr-3 flex items-center">
                選擇屬性:
                <div class="min-w-[180px]">
                    <v-select
                        v-model="selectTypes"
                        :options="pokedexStore.attributes"
                        placeholder="請選擇屬性"
                        multiple
                        :searchable="false"
                        :selectable="() => selectTypes.length < 2"
                    ></v-select>
                </div>
            </div>
            <button
                type="button"
                class="my-1 ml-auto rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="handleClear"
            >
                清除
            </button>
        </div>
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                {{ typeString }}屬性特色(抵抗面)
            </legend>
            <div v-for="a in validDefenses" :key="a.title" class="mt-2 ml-2 flex">
                <div class="mr-2 w-12 shrink-0 py-1">{{ a.title }}:</div>
                <div class="flex flex-wrap items-center gap-2">
                    <div
                        v-for="type in a.types"
                        :key="type"
                        class="flex shrink-0 cursor-pointer rounded-lg border border-gray-200 p-1"
                        @click="() => handleSelectType(type)"
                    >
                        <TypeIcon :type="type.name" class="w-20 shrink-0" />
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                {{ selectTypes[0] }}屬性特色(打擊面)
            </legend>
            <div v-for="a in validAttacks" :key="a.title" class="mt-2 ml-2 flex">
                <div class="mr-2 w-12 shrink-0 py-1">{{ a.title }}:</div>
                <div class="flex flex-wrap items-center gap-2">
                    <div
                        v-for="type in a.types"
                        :key="`${type.name}${type.name2}`"
                        class="flex shrink-0 cursor-pointer rounded-lg border border-gray-200 p-1"
                        @click="() => handleSelectType(type)"
                    >
                        <TypeIcon :key="type" :type="type.name" class="w-20 shrink-0" />
                        <div v-if="type.name != type.name2" class="px-2">+</div>
                        <TypeIcon
                            v-if="type.name != type.name2"
                            :key="type"
                            :type="type.name2"
                            class="w-20 shrink-0"
                        />
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset v-if="selectTypes.length === 2" class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                {{ selectTypes[1] }}屬性特色(打擊面)
            </legend>
            <div v-for="a in validAttacks2" :key="a.title" class="mt-2 ml-2 flex">
                <div class="mr-2 w-12 shrink-0 py-1">{{ a.title }}:</div>
                <div class="flex flex-wrap items-center gap-2">
                    <div
                        v-for="type in a.types"
                        :key="`${type.name}${type.name2}`"
                        class="flex shrink-0 cursor-pointer rounded-lg border border-gray-200 p-1"
                        @click="() => handleSelectType(type)"
                    >
                        <TypeIcon :key="type" :type="type.name" class="w-20 shrink-0" />
                        <TypeIcon
                            v-if="type.name != type.name2"
                            :key="type"
                            :type="type.name2"
                            class="w-20 shrink-0"
                        />
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset class="border-t border-blue-200 p-2">
            <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
                {{ typeString }}代表精靈
            </legend>
            <div class="m-2 flex flex-wrap justify-center md:justify-start">
                <div
                    v-for="poke in filterPokes"
                    :key="poke.id"
                    class="m-1 cursor-pointer rounded-md py-1 px-2 text-center"
                    :class="{
                        'bg-gray-100': poke.quality === 'normal',
                        'bg-blue-100': poke.quality === 'rare',
                        'bg-purple-100': poke.quality === 'epic',
                        'bg-orange-100': poke.quality === 'legend',
                        'bg-red-100': poke.quality === 'beyond',
                    }"
                    @click="() => $router.push(`/pokedex/${poke.id}`)"
                >
                    {{ poke.name }}
                </div>
            </div>
        </fieldset>
    </main>
</template>
<style scoped>
.legend {
    background: rgb(255, 255, 150);
    /* background: linear-gradient(to right, #feffdb 5%, #f8ff36e1 100%);
    border-left: 7px solid yellow;
    border-right: 7px solid yellow; */
}
.epic {
    background: rgb(201, 150, 255);
    /* background: linear-gradient(to right, #ffdbff 5%, #ff36f8e1 100%);
    border-left: 7px solid rgb(192, 0, 192);
    border-right: 7px solid rgb(192, 0, 192); */
}
.rare {
    background: rgb(111, 255, 255);
    /* border-left: 7px solid rgb(46, 57, 255); */
}
.great {
    background: rgb(150, 255, 164);
    /* border-left: 7px solid rgb(150, 255, 164); */
}

.page-title {
    border-left: 8px solid rgb(255, 60, 93);
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
