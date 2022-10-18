<script setup>
import { computed, reactive, ref } from 'vue'
import { useDistributionStore } from '@/stores/distribution'
import { usePokedexStore } from '@/stores/pokedex'
const distributionStore = useDistributionStore()
const pokedexStore = usePokedexStore()
const data = reactive({ includeMaps: ['草叢'] })

const searchText = ref('')
const searchArea = ref('')
const activeMaps = computed(() => {
    let activeMaps = []
    data.includeMaps.forEach((mapType) => {
        const maps = distributionStore.pokeMaps.filter((map) => map.type === mapType)
        activeMaps = [...activeMaps, ...maps]
    })
    return activeMaps
})
const filterDistribution = computed(() => {
    let result = activeMaps.value
    if (searchText.value !== '') {
        if (includeFrom.value) {
            // 找出圖鑑中符合字串的來源
            const find = Object.values(pokedexStore.pokes)
                .filter((poke) => poke.name.includes(searchText.value) && poke.from)
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
                            poke.name.includes(searchText.value)
                        ),
                    }
                })
                .filter((distribution) => distribution.pokes.length)
        }
    }
    if (searchArea.value !== '') {
        result = result.filter((distribution) => distribution.name.includes(searchArea.value))
    }
    if (selectAttribute.value !== '') {
        result = result
            .map((distribution) => {
                return {
                    ...distribution,
                    pokes: distribution.pokes.filter((poke) =>
                        poke.attribute.includes(selectAttribute.value)
                    ),
                }
            })
            .filter((distribution) => distribution.pokes.length)
    }
    return result
})
const attributes = [
    '一般',
    '格鬥',
    '飛行',
    '毒',
    '地面',
    '岩石',
    '蟲',
    '幽靈',
    '鋼',
    '火',
    '水',
    '草',
    '電',
    '超能力',
    '冰',
    '龍',
    '惡',
    '妖精',
]
const selectAttribute = ref('')
const includeFrom = ref(false)
const isDark = (name) => {
    return name.includes('夜晚')
}
</script>

<template>
    <main>
        <div class="page-title">尋寵地圖</div>
        <div class="note">
            <ul>
                <li>收錄各地區出沒的精靈，快速找到想抓的精靈，開圖鑑捉寵必備神器!!</li>
                <li>可搜尋精靈名稱 ex:路卡利歐</li>
                <li>可搜尋地區名稱 ex:白銀山</li>
                <li>可選擇精靈屬性 ex:龍</li>
                <li>同源搜索: 搜尋同一進化來源的寶可夢 ex:輸入噴火龍可找出小火龍</li>
                <li>可針對自己的需求選擇搜尋範圍</li>
            </ul>
        </div>
        <div class="search-bar">
            <div>精靈搜尋: <input v-model="searchText" type="text" /></div>
            <div>地點搜尋: <input v-model="searchArea" type="text" /></div>
            <div>
                屬性篩選:
                <select v-model="selectAttribute">
                    <option :value="''">-請選擇屬性-</option>
                    <option v-for="attribute in attributes" :key="attribute" :value="attribute">
                        {{ attribute }}
                    </option>
                </select>
            </div>
            <div>同源搜索: <input v-model="includeFrom" type="checkbox" /></div>
            <div class="area-select">
                範圍選擇:
                <div v-for="mapType in distributionStore.getterPokeMapTypes" :key="mapType">
                    <input
                        :id="mapType"
                        v-model="data.includeMaps"
                        type="checkbox"
                        :value="mapType"
                    />
                    <label :for="mapType">{{ mapType }}</label>
                </div>
            </div>
        </div>
        <div v-if="distributionStore.pokeMaps.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
        </div>
        <div v-for="area in filterDistribution" :key="area.name">
            <div class="area">
                <span>{{ area.name }}</span>
            </div>
            <div class="poke-list" :class="{ dark: isDark(area.name) }">
                <div v-for="poke in area.pokes" :key="poke.name" :class="poke.quality">
                    {{ poke.name }}
                    <div class="attribute-line">
                        <div
                            v-for="attribute in poke.attribute"
                            :key="attribute"
                            :class="attribute"
                        >
                            {{ attribute }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
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
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
.normal {
    border: 3px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
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
.dark {
    background: #164916;
}
.poke-list > div {
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
.attribute-line > div {
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
