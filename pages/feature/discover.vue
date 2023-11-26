<script setup>
import { $vfm } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const features = pokedexStore.showFeatures
const searchText = ref('')
const handleClick = (poke) => {
    const params = {
        poke,
    }
    $vfm.show('enterFeatureModal', params)
}

const filterPokes = computed(() => {
    const result = noFeaturePokes.value
    if (searchText.value === '') return result
    else {
        return result.filter((poke) => poke.name.includes(searchText.value))
    }
})

const noFeaturePokes = computed(() => {
    return pokedexStore.pokes.filter((poke) => poke.features.length === 0)
})
</script>

<template>
    <main>
        <ModalEnterFeatures />
        <ModalEnterFeaturesStory />

        <div class="page-title">精靈特性調查</div>
        <div class="border-1 rounded-lg border border-black bg-[#FFC0CB] p-2">
            <ul>
                <li>
                    可惡的火箭隊，目前缺失的精靈特性檔案還有．．．{{ noFeaturePokes.length }}隻😱
                </li>
                <li>從下面的列表選出要調查的精靈，調查完成後，點選精靈進行特性輸入</li>
                <li>資料整理過後就會更新到特性頁面讓大家可以查詢了！！</li>
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
        <div v-if="features.length == 0" class="slowpoke-loading" />
        <div class="mt-2 flex flex-wrap gap-2">
            <div
                v-for="poke in filterPokes"
                :key="poke.id"
                class="m-1 grow cursor-pointer p-1 text-center"
                :class="poke.quality"
                @click="handleClick(poke)"
            >
                {{ poke.name }}
            </div>
        </div>
    </main>
</template>
<style scoped>
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
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
</style>
