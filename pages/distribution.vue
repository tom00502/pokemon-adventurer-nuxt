<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useDistributionStore } from '@/stores/distribution'
import { usePokedexStore } from '@/stores/pokedex'
const { locale, t } = useI18n()
useHead({
    title: t('radar.title'),
    meta: [
        {
            name: 'description',
            content: t('radar.ogDescription'),
        },
        {
            property: 'og:title',
            content: t('radar.title'),
        },
        {
            property: 'og:description',
            content: t('radar.ogDescription'),
        },
    ],
})
const distributionStore = useDistributionStore()
const pokedexStore = usePokedexStore()
const data = reactive({ includeMaps: [] })

const searchText = ref('')
const searchArea = ref('')
const activeMaps = computed(() => {
    let activeMaps = []
    data.includeMaps.forEach((mapType) => {
        const maps = distributionStore.getterPokeMaps.filter((map) => map.type === mapType)
        activeMaps = [...activeMaps, ...maps]
    })
    return activeMaps.filter((map) => map.name)
})
const filterDistribution = computed(() => {
    let result = activeMaps.value
    if (searchText.value !== '') {
        if (includeFrom.value) {
            // 找出圖鑑中符合字串的來源
            const find = Object.values(pokedexStore.pokedex)
                .filter(
                    (poke) =>
                        poke.name.toLowerCase().includes(searchText.value.toLowerCase()) &&
                        poke.from
                )
                .map((poke) => poke.from)
            const findSet = new Set(find)
            // 對來源做set
            // 找出分布中有set的人回傳
            result = result
                .map((distribution) => {
                    return {
                        ...distribution,
                        pokes: distribution.pokes.filter((poke) => findSet.has(poke.from)),
                    }
                })
                .filter((distribution) => distribution.pokes.length)
        } else {
            result = result
                .map((distribution) => {
                    return {
                        ...distribution,
                        pokes: distribution.pokes.filter((poke) =>
                            poke.name.toLowerCase().includes(searchText.value.toLowerCase())
                        ),
                    }
                })
                .filter((distribution) => distribution.pokes.length)
        }
    }
    if (searchArea.value !== '') {
        result = result.filter((distribution) => distribution.name.includes(searchArea.value))
    }
    if (selectType.value !== '') {
        const searchType = locale.value === 'en' ? selectType.value.key : selectType.value.name
        result = result
            .map((distribution) => {
                return {
                    ...distribution,
                    pokes: distribution.pokes.filter((poke) => poke.attribute.includes(searchType)),
                }
            })
            .filter((distribution) => distribution.pokes.length)
    }
    return result
})
const attributes = [
    { key: 'normal', name: '一般' },
    { key: 'fighting', name: '格鬥' },
    { key: 'flying', name: '飛行' },
    { key: 'poison', name: '毒' },
    { key: 'ground', name: '地面' },
    { key: 'rock', name: '岩石' },
    { key: 'bug', name: '蟲' },
    { key: 'ghost', name: '幽靈' },
    { key: 'steel', name: '鋼' },
    { key: 'fire', name: '火' },
    { key: 'water', name: '水' },
    { key: 'grass', name: '草' },
    { key: 'electric', name: '電' },
    { key: 'psychic', name: '超能力' },
    { key: 'ice', name: '冰' },
    { key: 'dragon', name: '龍' },
    { key: 'dark', name: '惡' },
    { key: 'fairy', name: '妖精' },
]
const selectType = ref('')
const includeFrom = ref(false)
const isDark = (name) => {
    return name.includes('夜晚') || name.includes('Night')
}
const typeView = (type) => {
    if (locale.value === 'en') return type.key
    return type.name
}
onMounted(async () => {
    // await distributionStore.getDistributions()
    // 根據當前語系設定預設的地圖類型
    const defaultMapType = distributionStore.getterPokeMapTypes.find(type =>
        type.includes('草') || type.includes('Grass') || type.includes('草むら')
    )
    if (defaultMapType) {
        data.includeMaps = [defaultMapType]
    }
})
</script>

<template>
<main>
    <div class="page-title">{{ t('radar.title') }}</div>
    <div class="note">
        <ul>
            <li>{{ t('radar.instructions.intro') }}</li>
            <li>{{ t('radar.instructions.searchPokemon') }}</li>
            <li>{{ t('radar.instructions.searchArea') }}</li>
            <li>{{ t('radar.instructions.selectType') }}</li>
            <li>{{ t('radar.instructions.evolveSearch') }}</li>
            <li>{{ t('radar.instructions.selectScope') }}</li>
        </ul>
    </div>
    <div class="search-bar p-2">
        <div>
            {{ t('radar.pokemonName') }}:
            <input v-model="searchText" type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
            {{ t('radar.mapName') }}:
            <input v-model="searchArea" type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
            {{ t('radar.type') }}:
            <select v-model="selectType"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                <option :value="''">{{ t('radar.selectType') }}</option>
                <option v-for="attribute in attributes" :key="attribute.key" :value="attribute">
                    {{ typeView(attribute) }}
                </option>
            </select>
        </div>
        <div class="flex items-center">
            <input id="checked-checkbox" v-model="includeFrom" type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" />
            <label for="checked-checkbox" class="ml-2 text-sm font-medium">{{
                t('radar.evolve')
                }}</label>
        </div>
        <div class="flex flex-wrap items-center gap-4">
            {{ t('radar.searchFrom') }}:
            <div v-for="mapType in distributionStore.getterPokeMapTypes" :key="mapType" class="flex items-center">
                <input :id="mapType" v-model="data.includeMaps" type="checkbox" :value="mapType"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                <label :for="mapType" class="ml-1 text-sm font-medium">{{ mapType }}</label>
            </div>
        </div>
    </div>
    <div v-if="distributionStore.pokeMaps.length == 0" class="slowpoke-loading" />
    <div v-for="area in filterDistribution" :key="area.name">
        <div class="area">
            <span>{{ area.name }}</span>
        </div>
        <div class="poke-list" :class="{ 'map-dark': isDark(area.name) }">
            <div v-for="poke in area.pokes" :key="poke.name" :class="`poke-${poke.quality}`">
                <div class="text-lg">{{ poke.name }}</div>
                <div class="attribute-line">
                    <div v-for="attribute in poke.attribute" :key="attribute" :class="attribute">
                        {{ attribute }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>
<style scoped>
.poke-beyond {
    border: 3px solid transparent;
    border-radius: 8px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, white, white),
        linear-gradient(135deg, #3632ff 0%, #3eff30 33%, #ffff00 66%, #ff5900 100%);
}

.poke-legend {
    border: 3px solid #ffff00;
    border-radius: 8px;
    background: white;
}

.poke-epic {
    border: 3px solid rgb(192, 0, 192);
    border-radius: 8px;
    background: white;
}

.poke-rare {
    border: 3px solid rgb(46, 57, 255);
    border-radius: 8px;
    background: white;
}

.poke-normal {
    border: 3px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
}

.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}

.page-title {
    border-left: 8px solid rgb(255, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}

.poke-list {
    display: flex;
    flex-wrap: wrap;
    background: #8eff8e86;
    padding: 8px;
    border-radius: 8px;
}

.map-dark {
    background: #164916;
}

.poke-list>div {
    padding: 4px;
    margin: 4px;
    flex-grow: 1;
    text-align: center;
    max-width: 160px;
}

.area {
    margin: 8px 0px;
}

.area span {
    border-left: 4px solid green;
    border-right: 4px solid green;
    padding: 0px 8px;
}

.attribute-line {
    display: flex;
    justify-content: space-around;
    gap: 4px;
}

.attribute-line>div {
    font-size: 12px;
    border-radius: 4px;
    /* padding: 0px 8px; */
    width: 48px;
}

.一般 {
    background: gray;
    color: white;
}

.草 {
    background: green;
    color: white;
}

.電 {
    background: rgb(219, 208, 83);
    color: white;
}

.水 {
    background: rgb(60, 142, 215);
    color: white;
}

.蟲 {
    background: rgb(126, 175, 100);
    color: white;
}

.火 {
    background: rgb(176, 0, 0);
    color: white;
}

.冰 {
    background: rgb(58, 226, 231);
    color: white;
}

.毒 {
    background: rgb(166, 68, 166);
    color: white;
}

.鋼 {
    background: rgb(155, 155, 155);
    color: white;
}

.惡 {
    background: rgb(104, 29, 0);
    color: white;
}

.龍 {
    background: rgb(15, 30, 114);
    color: white;
}

.超能力 {
    background: rgb(220, 20, 170);
    color: white;
}

.飛行 {
    background: rgb(42, 105, 221);
    color: white;
}

.岩石 {
    background: rgb(165, 96, 31);
    color: white;
}

.幽靈 {
    background: rgb(160, 38, 216);
    color: white;
}

.格鬥 {
    background: rgb(204, 75, 35);
    color: white;
}

.地面 {
    background: rgb(221, 106, 52);
    color: white;
}

.妖精 {
    background: rgb(255, 97, 194);
    color: white;
}

.normal {
    background: rgba(220, 220, 220, 0.2);
    border: 1px solid rgba(220, 220, 220);
}

.fire {
    background: rgba(255, 105, 0, 0.2);
    border: 1px solid rgba(255, 105, 0);
}

.water {
    background: rgba(20, 185, 255, 0.2);
    border: 1px solid rgba(20, 185, 255);
}

.grass {
    background: rgba(180, 240, 0, 0.2);
    border: 1px solid rgba(180, 240, 0);
}

.electric {
    background: rgba(255, 255, 0, 0.2);
    border: 1px solid rgba(255, 255, 0);
}

.ice {
    background: rgba(20, 245, 255, 0.2);
    border: 1px solid rgba(20, 245, 255);
}

.fighting {
    background: rgba(220, 105, 0, 0.2);
    border: 1px solid rgba(220, 105, 0);
}

.poison {
    background: rgba(210, 140, 210, 0.2);
    border: 1px solid rgba(210, 140, 210);
}

.ground {
    background: rgba(250, 200, 90, 0.2);
    border: 1px solid rgba(250, 200, 90);
}

.flying {
    background: rgba(120, 220, 255, 0.2);
    border: 1px solid rgba(120, 220, 255);
}

.psychic {
    background: rgba(240, 140, 220, 0.2);
    border: 1px solid rgba(240, 140, 220);
}

.bug {
    background: rgba(160, 200, 0, 0.2);
    border: 1px solid rgba(160, 200, 0);
}

.rock {
    background: rgba(200, 160, 100, 0.2);
    border: 1px solid rgba(200, 160, 100);
}

.ghost {
    background: rgba(160, 140, 255, 0.2);
    border: 1px solid rgba(160, 140, 255);
}

.dragon {
    background: rgba(80, 120, 220, 0.2);
    border: 1px solid rgba(80, 120, 220);
}

.dark {
    background: rgba(120, 120, 120, 0.2);
    border: 1px solid rgba(120, 120, 120);
}

.steel {
    background: rgba(170, 200, 240, 0.2);
    border: 1px solid rgba(170, 200, 240);
}

.fairy {
    background: rgba(255, 175, 200, 0.2);
    border: 1px solid rgba(255, 175, 200);
}

.search-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.area-select {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
</style>
