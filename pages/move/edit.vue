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
const learnMoves = [
    { id: 526, name: '自我激勵' },
    { id: 337, name: '龍爪' },
    { id: 473, name: '精神衝擊' },
    { id: 347, name: '冥想' },
    { id: 46, name: '吼叫' },
    { id: 92, name: '劇毒' },
    { id: 258, name: '冰雹' },
    { id: 339, name: '健美' },
    { id: 474, name: '毒液衝擊' },
    { id: 237, name: '覺醒力量' },
    { id: 241, name: '大晴天' },
    { id: 269, name: '挑釁' },
    { id: 58, name: '冰凍光束' },
    { id: 59, name: '暴風雪' },
    { id: 63, name: '破壞光線' },
    { id: 113, name: '光牆' },
    { id: 182, name: '守住' },
    { id: 240, name: '求雨' },
    { id: 355, name: '羽棲' },
    { id: 219, name: '神秘守護' },
    { id: 76, name: '日光束' },
    { id: 479, name: '擊落' },
    { id: 85, name: '十萬伏特' },
    { id: 87, name: '打雷' },
    { id: 89, name: '地震' },
    { id: 141, name: '吸血' },
    { id: 94, name: '精神強念' },
    { id: 247, name: '暗影球' },
    { id: 280, name: '劈瓦' },
    { id: 104, name: '影子分身' },
    { id: 115, name: '反射壁' },
    { id: 482, name: '污泥波' },
    { id: 53, name: '噴射火焰' },
    { id: 188, name: '污泥炸彈' },
    { id: 201, name: '沙暴' },
    { id: 126, name: '大字爆炎' },
    { id: 317, name: '岩石封鎖' },
    { id: 332, name: '燕返' },
    { id: 259, name: '無理取鬧' },
    { id: 263, name: '硬撐' },
    { id: 488, name: '蓄能焰襲' },
    { id: 156, name: '睡覺' },
    { id: 213, name: '迷人' },
    { id: 490, name: '下盤踢' },
    { id: 497, name: '回聲' },
    { id: 503, name: '熱水' },
    { id: 315, name: '過熱' },
    { id: 211, name: '鋼翼' },
    { id: 411, name: '真氣彈' },
    { id: 412, name: '能量球' },
    { id: 206, name: '點到為止' },
    { id: 451, name: '充電光束' },
    { id: 507, name: '自由落體' },
    { id: 693, name: '狂舞揮打' },
    { id: 261, name: '鬼火' },
    { id: 153, name: '大爆炸' },
    { id: 421, name: '暗影爪' },
    { id: 371, name: '以牙還牙' },
    { id: 684, name: '修長之角' },
    { id: 373, name: '查封' },
    { id: 694, name: '極光幕' },
    { id: 19, name: '飛翔' },
    { id: 447, name: '打草結' },
    { id: 416, name: '終極衝擊' },
    { id: 397, name: '岩石打磨' },
    { id: 444, name: '尖石攻擊' },
    { id: 521, name: '伏特替換' },
    { id: 86, name: '電磁波' },
    { id: 360, name: '陀螺球' },
    { id: 244, name: '自我暗示' },
    { id: 14, name: '劍舞' },
    { id: 523, name: '重踏' },
    { id: 524, name: '冰息' },
    { id: 157, name: '岩崩' },
    { id: 404, name: '十字剪' },
    { id: 525, name: '龍尾' },
    { id: 611, name: '死纏爛打' },
    { id: 398, name: '毒擊' },
    { id: 138, name: '食夢' },
    { id: 207, name: '虛張聲勢' },
    { id: 214, name: '夢話' },
    { id: 369, name: '急速折返' },
    { id: 164, name: '替身' },
    { id: 433, name: '戲法空間' },
    { id: 528, name: '瘋狂伏特' },
    { id: 57, name: '衝浪' },
    { id: 399, name: '惡之波動' },
    { id: 127, name: '攀瀑' },
    { id: 605, name: '魔法閃耀' },
    { id: 590, name: '密語' },
    { id: 282, name: '拍落' },
    { id: 675, name: '地獄突刺' },
    { id: 492, name: '欺詐' },
    { id: 566, name: '潛靈奇襲' },
    { id: 506, name: '禍不單行' },
    { id: 299, name: '火焰踢' },
    { id: 542, name: '暴風' },
    { id: 7, name: '火焰拳' },
    { id: 9, name: '雷電拳' },
    { id: 8, name: '冰凍拳' },
    { id: 349, name: '龍之舞' },
    { id: 853, name: '雷霆萬鈞' },
]
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
const learnMovesBtns = computed(() => {
    if (pokoLearnMoves.value.length === 0) return learnMoves.slice(0, 15)

    const id = pokoLearnMoves.value[pokoLearnMoves.value.length - 1].id
    const index = learnMoves.findIndex((move) => move.id === id)
    return learnMoves.slice(index + 1, index + 16)
})
const handlelearnMoveClick = (id) => {
    const move = pokedexStore.moves.find((move) => move.id === id)
    pokoLearnMoves.value.push(move)
}
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
        <div class="mt-2">
            <button
                v-for="move in learnMovesBtns"
                :key="move.id"
                type="button"
                class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="handlelearnMoveClick(move.id)"
            >
                {{ move.name }}
            </button>
        </div>
        <span @click="handleClick">送出</span>
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
                        <th scope="col" class="py-3 px-2">編號</th>
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
                        <td class="whitespace-nowrap p-2">{{ item.id }}</td>
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
