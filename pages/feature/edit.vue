<script setup>
import { onMounted, reactive } from 'vue'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const { getFeatures, setFeatures } = useApi()
const pokedexStore = usePokedexStore()
const features = pokedexStore.features
const pokoFeatures = ref([])
const poko = ref({ name: '' })
const message = ref('')
// onMounted(async () => {
//     const { data } = await getFeatures()
//     feature.features = data
// })
const featureOptions = computed(() => {
    return features.map((f) => ({
        id: f.id,
        label: f.name,
    }))
})
const pokes = computed(() => {
    return pokedexStore.pokes.map((poke) => ({
        id: poke.id,
        name: poke.name,
    }))
})

const handleClick = async () => {
    const params = {
        pokeId: poko.value.id,
        feature: pokoFeatures.value.map((f) => f.id).join(','),
        featureName: pokoFeatures.value.map((f) => f.label).join(','),
    }
    const { data } = await setFeatures(params)
    message.value = `已將${data.value.pokeName}的特性設定為${data.value.featureName}`
    poko.value = { name: '' }
    pokoFeatures.value = []
}
</script>

<template>
    <main>
        要開始編輯拉！！
        <div class="page-title">精靈特性</div>
        <div v-if="features.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
        </div>
        <v-select v-model="poko" :options="pokes" label="name"></v-select>
        <v-select
            v-model="pokoFeatures"
            :options="featureOptions"
            multiple
            label="label"
        ></v-select>
        <div @click="handleClick">送出</div>
        <div>{{ message }}</div>
    </main>
</template>
<style scoped>
table {
    margin-top: 8px;
    font-size: 14px;
    /* border-collapse: collapse; */
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
}
td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
}
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
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
