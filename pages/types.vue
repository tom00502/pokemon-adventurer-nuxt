<script setup>
import vSelect from 'vue-select'
import { useI18n } from 'vue-i18n'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const { getLocalizedPokemonName } = usePokemonI18n()
const { attackCalc, typeTwToEn, typeOptions } = usePokeTypes()
const { t } = useI18n()
useHead({
    title: t('types.title'),
})
const defenses = [
    { translationKey: 'superEffective2x', value: 2 },
    { translationKey: 'superEffective4x', value: 4 },
    { translationKey: 'resistant2x', value: 0.5 },
    { translationKey: 'resistant4x', value: 0.25 },
    { translationKey: 'immune', value: 0 },
]
// 攻擊
const attacks = [
    { translationKey: 'superEffective4x', value: 4 },
    { translationKey: 'superEffective2x', value: 2 },
    { translationKey: 'notEffective2x', value: 0.5 },
    { translationKey: 'notEffective4x', value: 0.25 },
    { translationKey: 'noEffect', value: 0 },
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
            attack *= attackCalc[type][t.key]
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
            attack *= attackCalc[selectTypes.value[0].key][type1]
            if (type1 !== type2) attack *= attackCalc[selectTypes.value[0].key][type2]
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
            attack *= attackCalc[selectTypes.value[1].key][type1]
            if (type1 !== type2) attack *= attackCalc[selectTypes.value[1].key][type2]
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
const localizedPokes = computed(() => {
    return pokedexStore.pokes.map((poke) => ({
        ...poke,
        localizedName: getLocalizedPokemonName(poke),
    }))
})
const filterPokes = computed(() => {
    if (selectTypes.value.length === 0) return []
    let result = localizedPokes.value
    if (selectTypes.value.length) {
        result = result.filter(
            (poke) =>
                poke.types.every((type) => selectTypes.value.some((option) => option.key === type)) &&
                selectTypes.value.every((option) => poke.types.includes(option.key))
        )
    }
    return result
})
const typeString = computed(() => {
    if (selectTypes.value.length === 0) return ''
    if (selectTypes.value.length === 1) return selectTypes.value[0].name
    return `${selectTypes.value[0].name} + ${selectTypes.value[1].name}`
})
const handleSelectType = (type) => {
    const option1 = typeOptions.value.find((option) => option.key === type.name)
    const option2 = typeOptions.value.find((option) => option.key === type.name2)
    if (option1 && option2) {
        selectTypes.value = [option1, option2]
        return
    }
    if (option1) {
        selectTypes.value = [option1]
    }
}
onMounted(() => {
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        for (let i = 0; i < childList.length; i++) {
            ; (adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
</script>

<template>
<main>
    <ins class="adsbygoogle focusAd" style="display: block" data-ad-client="ca-pub-2683150416576260"
        data-ad-slot="6422833388" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <div class="page-title">{{ t('types.pageTitle') }}</div>
    <div class="note">
        <ul>
            <li>{{ t('types.notes.line1') }}</li>
            <li>{{ t('types.notes.line2') }}</li>
            <li>{{ t('types.notes.line3') }}</li>
            <li>{{ t('types.notes.line4') }}</li>
        </ul>
    </div>
    <div class="mt-2 flex flex-wrap items-center px-3">
        <div class="my-1 mr-3 flex items-center">
            {{ t('types.selectTypeLabel') }}
            <div class="min-w-[180px]">
                <v-select v-model="selectTypes" :options="typeOptions" :placeholder="t('types.selectTypePlaceholder')"
                    multiple :searchable="false" :selectable="() => selectTypes.length < 2" label="name"></v-select>
            </div>
        </div>
        <button type="button"
            class="my-1 ml-auto rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="handleClear">
            {{ t('types.clear') }}
        </button>
    </div>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
            {{ t('types.defenseLegend', { types: typeString }) }}
        </legend>
        <div v-for="a in validDefenses" :key="a.translationKey"
            class="mt-2 ml-2 grid grid-cols-[150px_1fr] items-center gap-x-2">
            <div class="py-1 whitespace-nowrap">{{ t(`pokedex.typeEffects.${a.translationKey}`) }}:</div>
            <div class="flex flex-wrap items-center gap-2">
                <div v-for="type in a.types" :key="type"
                    class="flex shrink-0 cursor-pointer rounded-lg border border-gray-200 p-1"
                    @click="() => handleSelectType(type)">
                    <TypeIcon :type="type.name" class="w-20 shrink-0" />
                </div>
            </div>
        </div>
    </fieldset>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
            {{ t('types.attackLegend', { type: selectTypes[0]?.name || '' }) }}
        </legend>
        <div v-for="a in validAttacks" :key="a.translationKey"
            class="mt-2 ml-2 grid grid-cols-[150px_1fr] items-center gap-x-2">
            <div class="py-1 whitespace-nowrap">{{ t(`types.attackEffects.${a.translationKey}`) }}:</div>
            <div class="flex flex-wrap items-center gap-2">
                <div v-for="type in a.types" :key="`${type.name}${type.name2}`"
                    class="flex shrink-0 cursor-pointer rounded-lg border border-gray-200 p-1"
                    @click="() => handleSelectType(type)">
                    <TypeIcon :key="type" :type="type.name" class="w-20 shrink-0" />
                    <div v-if="type.name != type.name2" class="px-2">+</div>
                    <TypeIcon v-if="type.name != type.name2" :key="type" :type="type.name2" class="w-20 shrink-0" />
                </div>
            </div>
        </div>
    </fieldset>
    <fieldset v-if="selectTypes.length === 2" class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
            {{ t('types.attackLegend', { type: selectTypes[1]?.name || '' }) }}
        </legend>
        <div v-for="a in validAttacks2" :key="a.translationKey"
            class="mt-2 ml-2 grid grid-cols-[150px_1fr] items-center gap-x-2">
            <div class="py-1 whitespace-nowrap">{{ t(`types.attackEffects.${a.translationKey}`) }}:</div>
            <div class="flex flex-wrap items-center gap-2">
                <div v-for="type in a.types" :key="`${type.name}${type.name2}`"
                    class="flex shrink-0 cursor-pointer rounded-lg border border-gray-200 p-1"
                    @click="() => handleSelectType(type)">
                    <TypeIcon :key="type" :type="type.name" class="w-20 shrink-0" />
                    <div v-if="type.name != type.name2" class="px-2">+</div>
                    <TypeIcon v-if="type.name != type.name2" :key="type" :type="type.name2" class="w-20 shrink-0" />
                </div>
            </div>
        </div>
    </fieldset>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 py-2 px-4 text-center md:text-left">
            {{ t('types.representativeLegend', { types: typeString }) }}
        </legend>
        <div class="m-2 flex flex-wrap justify-center md:justify-start">
            <div v-for="poke in filterPokes" :key="poke.id" class="m-1 cursor-pointer rounded-md py-1 px-2 text-center"
                :class="{
                    'bg-gray-100': poke.quality === 'normal',
                    'bg-blue-100': poke.quality === 'rare',
                    'bg-purple-100': poke.quality === 'epic',
                    'bg-orange-100': poke.quality === 'legend',
                    'bg-red-100': poke.quality === 'beyond',
                }" @click="() => $router.push(`/pokedex/${poke.id}`)">
                {{ poke.localizedName }}
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
