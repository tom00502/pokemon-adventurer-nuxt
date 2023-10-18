<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
import candyAreas from '@/assets/json/candyAreas.json'
const MAX_AREAS = 10
const pokedexStore = usePokedexStore()
const { attackCalc, typeTwToEn, typeEnToTw, qualityEnToTw, getTypeColors } = usePokeTypes()
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
const attackType = ref('龍')
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
const types = [
    {
        type: '一般',
        color: 'rgba(220,220,220)',
        alphaColor: 'rgba(220,220,220,0.2)',
    },
    {
        type: '火',
        color: 'rgba(255,105,0)',
        alphaColor: 'rgba(255,105,0, 0.2)',
    },
    {
        type: '水',
        color: 'rgba(20,185,255)',
        alphaColor: 'rgba(20,185,255, 0.2)',
    },
    {
        type: '草',
        color: 'rgba(180,240,0)',
        alphaColor: 'rgba(180,240,0, 0.2)',
    },
    {
        type: '電',
        color: 'rgba(255,255,0)',
        alphaColor: 'rgba(255,255,0, 0.2)',
    },
    {
        type: '冰',
        color: 'rgba(20,245,255)',
        alphaColor: 'rgba(20,245,255, 0.2)',
    },
    {
        type: '格鬥',
        color: 'rgba(220,105,0)',
        alphaColor: 'rgba(220,105,0, 0.2)',
    },
    {
        type: '毒',
        color: 'rgba(210,140,210)',
        alphaColor: 'rgba(210,140,210, 0.2)',
    },
    {
        type: '地面',
        color: 'rgba(250,200,90)',
        alphaColor: 'rgba(250,200,90, 0.2)',
    },
    {
        type: '飛行',
        color: 'rgba(120,220,255)',
        alphaColor: 'rgba(120,220,255, 0.2)',
    },
    {
        type: '超能力',
        color: 'rgba(240,140,220)',
        alphaColor: 'rgba(240,140,220, 0.2)',
    },
    {
        type: '蟲',
        color: 'rgba(70,200,70)',
        alphaColor: 'rgba(70,200,70, 0.2)',
    },
    {
        type: '岩石',
        color: 'rgba(180,140,100)',
        alphaColor: 'rgba(180,140,100, 0.2)',
    },
    {
        type: '幽靈',
        color: 'rgba(160,140,255)',
        alphaColor: 'rgba(160,140,255, 0.2)',
    },
    {
        type: '龍',
        color: 'rgba(80,120,220)',
        alphaColor: 'rgba(80,120,220, 0.2)',
    },
    {
        type: '惡',
        color: 'rgba(120,120,120)',
        alphaColor: 'rgba(120,120,120, 0.2)',
    },
    {
        type: '鋼',
        color: 'rgba(170,200,240)',
        alphaColor: 'rgba(170,200,240, 0.2)',
    },
    {
        type: '妖精',
        color: 'rgba(255,175,200)',
        alphaColor: 'rgba(255,175,200, 0.2)',
    },
]
const sortedAreas = computed(() => {
    let sortareas = candyAreas.map((area) => area)
    if (searchText.value)
        sortareas = sortareas.filter((area) => area.area.includes(searchText.value))
    if (!selectTypes.value.length) return sortareas.slice(0, MAX_AREAS)
    return sortareas
        .filter((area) => selectTypes.value.some((type) => area.candys[type]))
        .sort((a, b) => {
            const aCandys = selectTypes.value.reduce((sum, type) => {
                return sum + (a.candys[type] || 0)
            }, 0)
            const bCandys = selectTypes.value.reduce((sum, type) => {
                return sum + (b.candys[type] || 0)
            }, 0)
            return bCandys - aCandys
        })
        .slice(0, MAX_AREAS)
})
const sortedTypes = computed(() => {
    const sortTypes = types.filter((type) =>
        sortedAreas.value.some((area) => area.candys[type.type])
    )
    if (!selectTypes.value.length) return sortTypes
    return sortTypes.sort((a, b) => {
        const aIndex = selectTypes.value.findIndex((type) => type === a.type)
        const bIndex = selectTypes.value.findIndex((type) => type === b.type)
        if (aIndex === -1 && bIndex === -1) {
            return 0
        }
        if (aIndex === -1) {
            return 1
        }
        if (bIndex === -1) {
            return -1
        }
        return aIndex - bIndex
    })
})
const chartData = computed(() => {
    const labels = sortedAreas.value.map((area) => area.area)
    const datasets = sortedTypes.value.map((type) => {
        return {
            label: type.type,
            data: sortedAreas.value.map((area) => area.candys[type.type]),
            backgroundColor: selectTypes.value.includes(type.type) ? type.color : type.alphaColor,
            borderColor: type.color,
            borderWidth: 1,
            // barThickness: 30,
        }
    })
    return {
        labels,
        datasets,
    }
})
const showTable = computed(() => {
    return types
        .map((type) => {
            const typeName = type.type
            const candyAmounts = candyAreas.map((area) => {
                return area.candys[typeName] || 0
            })
            const maxAmount = Math.max(...candyAmounts)
            const areas = candyAreas.filter((area) => area.candys[typeName] === maxAmount)
            return {
                typeName,
                areaName: areas.map((area) => `${area.area}(${maxAmount})`).join(', '),
                maxAmount,
            }
        })
        .sort((a, b) => b.maxAmount - a.maxAmount)
})
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
/* table {
    margin-top: 8px;
    font-size: 14px;
    border-collapse: collapse;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
} */
table tr {
    /* border-bottom: 1px solid rgb(177, 177, 177); */
}
/* td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
} */
/*第一欄第一列：左上*/
tr:first-child td:first-child {
    border-top-left-radius: 8px;
}
/*第一欄最後列：左下*/
tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}
/*最後欄第一列：右上*/
tr:first-child td:last-child {
    border-top-right-radius: 10px;
}
/*最後欄第一列：右下*/
tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}
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
