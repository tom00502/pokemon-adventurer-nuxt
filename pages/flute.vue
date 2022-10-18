<script setup>
import { computed, ref } from 'vue'
import { useDistributionStore } from '@/stores/distribution'
const distributionStore = useDistributionStore()
const searchText = ref('')
const pokeDistribution = computed(() => {
    return distributionStore.pokeMaps.filter((map) => map.type === '召喚笛')
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
        <div class="page-title">召喚笛明細</div>
        <div class="note">
            <ul>
                <li>解每日田野調查任務或日常寶箱有機會獲得召喚笛</li>
                <li>捕蟲大會的捕蟲點數可以換召喚笛碎片</li>
                <li>召喚的精靈有機率會逃走</li>
            </ul>
        </div>
        搜尋: <input v-model="searchText" type="text" />
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
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
.page-title {
    border-left: 8px solid rgb(60, 242, 255);
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
    max-width: 100px;
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
