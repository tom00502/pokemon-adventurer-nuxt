<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
useHead({
    title: '精靈圖鑑',
})
const router = useRouter()
const pokedexStore = usePokedexStore()
const searchText = ref('')
const selectMoves = ref([])
const selectAbilities = ref(null)
const selectTypes = ref([])
const filterPokes = computed(() => {
    let result = pokedexStore.pokes
    if (searchText.value) result = result.filter((poke) => poke.name.includes(searchText.value))
    if (selectMoves.value.length) {
        result = result.filter((poke) =>
            selectMoves.value.every(
                (move) => poke.moves.includes(move.id) || poke.learnMoves.includes(move.id)
            )
        )
    }
    if (selectAbilities.value) {
        result = result.filter((poke) => poke.features.includes(selectAbilities.value.id))
    }
    if (selectTypes.value.length) {
        result = result.filter((poke) =>
            selectTypes.value.every((type) => poke.attribute.includes(type))
        )
    }
    return result
})
const handleClick = (poke) => {
    router.push({ path: `/pokedex/${poke.id}` })
}
</script>

<template>
    <main>
        <div class="page-title">精靈圖鑑</div>
        <div class="note">
            <ul>
                <li>可以搜尋同時符合多個條件的精靈</li>
                <li>招式與屬性可以多選，全都包含才顯示</li>
                <li>特性只能選一個</li>
            </ul>
        </div>
        <div class="mt-2 flex flex-wrap items-center">
            <div class="my-1 mr-3">
                搜尋:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="my-1 mr-3 flex items-center">
                招式:
                <div class="min-w-[180px]">
                    <v-select
                        v-model="selectMoves"
                        :options="pokedexStore.moves"
                        placeholder="請選擇精靈招式"
                        multiple
                        label="name"
                    ></v-select>
                </div>
            </div>
            <div class="my-1 mr-3 flex items-center">
                特性:
                <div class="min-w-[180px]">
                    <v-select
                        v-model="selectAbilities"
                        :options="pokedexStore.features"
                        placeholder="請選擇精靈特性"
                        label="name"
                    ></v-select>
                </div>
            </div>
            <div class="my-1 mr-3 flex items-center">
                屬性:
                <div class="min-w-[180px]">
                    <v-select
                        v-model="selectTypes"
                        :options="pokedexStore.attributes"
                        placeholder="請選擇精靈屬性"
                        multiple
                        :selectable="() => selectTypes.length < 2"
                        :searchable="false"
                    ></v-select>
                </div>
            </div>
        </div>
        <!-- <div v-if="distributionStore.pokeMaps.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
        </div> -->

        <div class="poke-list">
            <div
                v-for="poke in filterPokes"
                :key="poke.name"
                :class="poke.quality"
                @click="handleClick(poke)"
            >
                {{ poke.name }}
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
