<script setup>
import { onMounted, reactive } from 'vue'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const { setMoves } = useApi()
const feature = reactive({ features: [] })
const pokoMoves = ref([])
const pokoLearnMoves = ref([])
const poko = ref({ name: '' })
const message = ref('')
const pokedexStore = usePokedexStore()
// onMounted(async () => {
//     const { data } = await getFeatures()
//     feature.features = data
// })
const moveOptions = computed(() => {
    return pokedexStore.moves.map((m) => ({
        id: m.id,
        label: m.name,
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
        move: pokoMoves.value.map((f) => f.id).join(','),
        moveName: pokoMoves.value.map((f) => f.name).join(','),
        learnMove: pokoLearnMoves.value.map((f) => f.id).join(','),
        learnMoveName: pokoLearnMoves.value.map((f) => f.name).join(','),
    }
    const { data } = await setMoves(params)
    message.value = `已將${data.value.pokeName}的招式設定為${data.value.moveName}`
    poko.value = { name: '' }
    pokoMoves.value = []
    pokoLearnMoves.value = []
}
</script>

<template>
    <main>
        要開始編輯拉！！
        <div class="page-title">精靈招式</div>
        選擇精靈
        <v-select v-model="poko" :options="pokes" label="name"></v-select>
        選擇自學招式
        <v-select
            v-model="pokoMoves"
            :options="pokedexStore.moves"
            multiple
            label="name"
        ></v-select>
        選擇學習機招式
        <v-select
            v-model="pokoLearnMoves"
            :options="pokedexStore.moves"
            multiple
            label="name"
        ></v-select>
        <div @click="handleClick">送出</div>
        <div>{{ message }}</div>
        <div>自學招數({{ pokoMoves.length }})</div>
        <div>學習機招數({{ pokoLearnMoves.length }})</div>
        <div class="relative mt-1 overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="py-3 px-2">招式</th>
                        <th scope="col" class="py-3 px-2">屬性</th>
                        <th scope="col" class="py-3 px-2">類別</th>
                        <th scope="col" class="py-3 px-2">威力</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">命中</th>
                        <th scope="col" class="py-3 px-2">PP</th>
                        <th scope="col" class="py-3 px-2">說明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in pokoMoves" :key="key" class="border-b bg-white">
                        <th
                            scope="row"
                            class="whitespace-nowrap p-2 font-medium text-gray-900"
                            :class="{ 'bg-red-500': !item.active }"
                        >
                            {{ item.name }}
                        </th>
                        <td class="whitespace-nowrap p-2">{{ item.type }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.category }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.power }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.accuracy }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.pp }}</td>
                        <td class="min-w-[300px] p-2">{{ item.descript }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="relative mt-1 overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="py-3 px-2">招式</th>
                        <th scope="col" class="py-3 px-2">屬性</th>
                        <th scope="col" class="py-3 px-2">類別</th>
                        <th scope="col" class="py-3 px-2">威力</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">命中</th>
                        <th scope="col" class="py-3 px-2">PP</th>
                        <th scope="col" class="py-3 px-2">說明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in pokoLearnMoves" :key="key" class="border-b bg-white">
                        <th
                            scope="row"
                            class="whitespace-nowrap p-2 font-medium text-gray-900"
                            :class="{ 'bg-red-500': !item.active }"
                        >
                            {{ item.name }}
                        </th>
                        <td class="whitespace-nowrap p-2">{{ item.type }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.category }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.power }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.accuracy }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.pp }}</td>
                        <td class="min-w-[300px] p-2">{{ item.descript }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
