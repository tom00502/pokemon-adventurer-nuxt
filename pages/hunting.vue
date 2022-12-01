<script setup>
import { computed, ref } from 'vue'
import { useDistributionStore } from '@/stores/distribution'
useHead({
    title: '狩獵場',
})
const distributionStore = useDistributionStore()
const searchText = ref('')
const pokeDistribution = computed(() => {
    return distributionStore.pokeMaps.filter((map) => map.type === '狩獵場')
})
const filterDistribution = computed(() => {
    const result = pokeDistribution.value
    if (searchText.value === '') return result
    else {
        return result
            .map((map) => {
                return {
                    ...map,
                    pokes: map.pokes.filter((poke) => poke.name.includes(searchText.value)),
                }
            })
            .filter((map) => map.pokes.length)
    }
})
</script>

<template>
    <main>
        <div class="page-title">狩獵場精靈分布表</div>
        <div class="note">
            <ul>
                <li>狩獵場可使用30個狩獵球捕捉精靈，用完就結束了</li>
                <li>丟誘餌防止逃跑、但也會降低捕獲率</li>
                <li>丟泥巴則容易捉到，但也會提高逃跑機率</li>
                <li>狩獵場開放時間: 10:00 ~ 12:00, 18:00 ~ 22:00</li>
            </ul>
        </div>
        <div class="mt-2">
            搜尋:
            <input
                v-model="searchText"
                type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        <div v-if="distributionStore.pokeMaps.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
        </div>
        <div v-for="area in filterDistribution" :key="area.name">
            <div class="area">
                <span>{{ area.name }}</span>
            </div>
            <div class="poke-list">
                <div v-for="poke in area.pokes" :key="poke.name" :class="poke.quality">
                    {{ poke.name }}
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
.normal {
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
    border-left: 8px solid rgb(255, 122, 60);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.poke-list {
    display: flex;
    flex-wrap: wrap;
    background: #dbffdba4;
    padding: 8px;
    border-radius: 8px;
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
</style>
