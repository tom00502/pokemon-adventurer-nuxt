<script setup>
import { ref, reactive } from 'vue'
import { $vfm, VueFinalModal } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const show = ref(false)
const pokoFeatures = ref([])
const focusPoke = reactive({ title: '' })
const loading = ref(false)
const beforeOpen = (e) => {
    const propPoke = e.ref.params.value.poke
    Object.assign(focusPoke, propPoke)
    pokoFeatures.value = []
}
const featureOptions = computed(() => {
    return pokedexStore.features.map((f) => ({
        id: f.id,
        label: f.name,
    }))
})
const handleClick = async () => {
    const params = {
        pokeId: focusPoke.id,
        pokeName: focusPoke.name,
        feature: pokoFeatures.value.map((f) => f.id).join(','),
        featureName: pokoFeatures.value.map((f) => f.label).join(','),
    }
    loading.value = true
    const data = await pokedexStore.actionReportFeatures(params)
    loading.value = false
    show.value = false
    const options = {
        message: `${data.value.pokeName}的特性檔案已傳送成功。
        對精靈的研究總算又有進展了呢！！
        做得好，訓練師，願野閃與你同在！！`,
    }
    $vfm.show('alertModal', { options })
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="enterFeatureModal"
        @before-open="beforeOpen"
    >
        <div class="w-[calc(min(100vw,32rem)-48px)] px-4 py-6 text-left">
            <div class="flex items-center justify-between">
                <div class="font-medium">
                    真不愧是訓練師，『{{ focusPoke.name }}』的特性調查已經完成了嗎！？
                </div>
            </div>
            <div class="mt-5">請於下方輸入特性(可複選)</div>
            <div class="mb-5 mt-5">
                <v-select
                    v-model="pokoFeatures"
                    :options="featureOptions"
                    multiple
                    label="label"
                ></v-select>
            </div>
            <div class="text-center">
                <div v-if="loading" class="slowpoke-loading" />
                <button
                    v-else-if="pokoFeatures.length"
                    type="button"
                    class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClick"
                >
                    送出
                </button>
                <button
                    v-else
                    type="button"
                    class="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                    送出
                </button>
            </div>
        </div>
    </vue-final-modal>
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
</style>
