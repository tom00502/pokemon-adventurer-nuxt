<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
import candyAreas from '@/assets/json/candyAreas.json'
const MAX_AREAS = 10
const pokedexStore = usePokedexStore()
useHead({
    title: '糖果分佈',
})
const handleClear = () => {
    searchText.value = ''
    selectTypes.value = []
}
const searchText = ref('')
const selectTypes = ref([])
const types = [
    {
        type: '一般',
        color: 'rgba(220,220,220)',
        alphaColor: 'rgba(220,220,220,0.2)',
    },
    {
        type: '火',
        color: 'rgba(255,105,0)',
        alphaColor: 'rgba(255,105,0, 0.2)',
    },
    {
        type: '水',
        color: 'rgba(20,185,255)',
        alphaColor: 'rgba(20,185,255, 0.2)',
    },
    {
        type: '草',
        color: 'rgba(180,240,0)',
        alphaColor: 'rgba(180,240,0, 0.2)',
    },
    {
        type: '電',
        color: 'rgba(255,255,0)',
        alphaColor: 'rgba(255,255,0, 0.2)',
    },
    {
        type: '冰',
        color: 'rgba(20,245,255)',
        alphaColor: 'rgba(20,245,255, 0.2)',
    },
    {
        type: '格鬥',
        color: 'rgba(220,105,0)',
        alphaColor: 'rgba(220,105,0, 0.2)',
    },
    {
        type: '毒',
        color: 'rgba(210,140,210)',
        alphaColor: 'rgba(210,140,210, 0.2)',
    },
    {
        type: '地面',
        color: 'rgba(250,200,90)',
        alphaColor: 'rgba(250,200,90, 0.2)',
    },
    {
        type: '飛行',
        color: 'rgba(120,220,255)',
        alphaColor: 'rgba(120,220,255, 0.2)',
    },
    {
        type: '超能力',
        color: 'rgba(240,140,220)',
        alphaColor: 'rgba(240,140,220, 0.2)',
    },
    {
        type: '蟲',
        color: 'rgba(70,200,70)',
        alphaColor: 'rgba(70,200,70, 0.2)',
    },
    {
        type: '岩石',
        color: 'rgba(180,140,100)',
        alphaColor: 'rgba(180,140,100, 0.2)',
    },
    {
        type: '幽靈',
        color: 'rgba(160,140,255)',
        alphaColor: 'rgba(160,140,255, 0.2)',
    },
    {
        type: '龍',
        color: 'rgba(80,120,220)',
        alphaColor: 'rgba(80,120,220, 0.2)',
    },
    {
        type: '惡',
        color: 'rgba(120,120,120)',
        alphaColor: 'rgba(120,120,120, 0.2)',
    },
    {
        type: '鋼',
        color: 'rgba(170,200,240)',
        alphaColor: 'rgba(170,200,240, 0.2)',
    },
    {
        type: '妖精',
        color: 'rgba(255,175,200)',
        alphaColor: 'rgba(255,175,200, 0.2)',
    },
]
const sortedAreas = computed(() => {
    let sortareas = candyAreas.map((area) => area)
    if (searchText.value)
        sortareas = sortareas.filter((area) => area.area.includes(searchText.value))
    if (!selectTypes.value.length) return sortareas.slice(0, MAX_AREAS)
    return sortareas
        .filter((area) => selectTypes.value.some((type) => area.candys[type]))
        .sort((a, b) => {
            const aCandys = selectTypes.value.reduce((sum, type) => {
                return sum + (a.candys[type] || 0)
            }, 0)
            const bCandys = selectTypes.value.reduce((sum, type) => {
                return sum + (b.candys[type] || 0)
            }, 0)
            return bCandys - aCandys
        })
        .slice(0, MAX_AREAS)
})
const sortedTypes = computed(() => {
    const sortTypes = types.filter((type) =>
        sortedAreas.value.some((area) => area.candys[type.type])
    )
    if (!selectTypes.value.length) return sortTypes
    return sortTypes.sort((a, b) => {
        const aIndex = selectTypes.value.findIndex((type) => type === a.type)
        const bIndex = selectTypes.value.findIndex((type) => type === b.type)
        if (aIndex === -1 && bIndex === -1) {
            return 0
        }
        if (aIndex === -1) {
            return 1
        }
        if (bIndex === -1) {
            return -1
        }
        return aIndex - bIndex
    })
})
const chartData = computed(() => {
    const labels = sortedAreas.value.map((area) => area.area)
    const datasets = sortedTypes.value.map((type) => {
        return {
            label: type.type,
            data: sortedAreas.value.map((area) => area.candys[type.type]),
            backgroundColor: selectTypes.value.includes(type.type) ? type.color : type.alphaColor,
            borderColor: type.color,
            borderWidth: 1,
            // barThickness: 30,
        }
    })
    return {
        labels,
        datasets,
    }
})
const showTable = computed(() => {
    return types
        .map((type) => {
            const typeName = type.type
            const candyAmounts = candyAreas.map((area) => {
                return area.candys[typeName] || 0
            })
            const maxAmount = Math.max(...candyAmounts)
            const areas = candyAreas.filter((area) => area.candys[typeName] === maxAmount)
            return {
                typeName,
                areaName: areas.map((area) => `${area.area}(${maxAmount})`).join(', '),
                maxAmount,
            }
        })
        .sort((a, b) => b.maxAmount - a.maxAmount)
})
</script>

<template>
    <main>
        <div class="page-title">親密糖果分佈查詢</div>
        <div class="note">
            <ul>
                <li>
                    糖果餵食攻略請至<RouterLink
                        class="font-bold text-blue-700 underline"
                        to="/candy"
                        >親密糖果</RouterLink
                    >功能
                </li>
                <li>捕捉寶可夢機率獲得親密糖果,掉落的糖果屬性與抓到的寶可夢屬性一致</li>
                <li>每天捕捉30隻同屬性精靈後會開始掉落L糖,捕捉30隻以前掉落S或X糖,每天0點重置</li>
                <li>
                    下表列出的數值代表每該地點每100隻精靈中,擁有該屬性的精靈數量,理論上遇到的多得到的糖果就多
                </li>
                <li>至於捕捉時會不會掉糖果,取決於您當天的運氣XD</li>
                <li>選擇屬性後,會推薦能取得最多糖果的地點排序,可依照個人需求選擇地點</li>
                <li>可同時選擇多個屬性,會依照這些屬性的加總進行排列</li>
                <li>特別感謝Lori與各位社群前輩的實測,才能整理出此功能！</li>
            </ul>
        </div>
        <div class="mt-2 flex flex-wrap items-center px-3">
            <div class="my-1 mr-3">
                搜尋地點:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="my-1 mr-3 flex items-center">
                屬性:
                <div class="min-w-[180px]">
                    <v-select
                        v-model="selectTypes"
                        :options="pokedexStore.attributes"
                        placeholder="請選擇糖果屬性"
                        multiple
                        :searchable="false"
                    ></v-select>
                </div>
            </div>
            <button
                type="button"
                class="my-1 ml-auto rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="handleClear"
            >
                清除
            </button>
        </div>
        <CandyAmountChart :chart-data="chartData" :select-types="selectTypes" />
        <h3 class="my-2">屬性地點速查</h3>
        <div class="relative mt-2 overflow-x-auto rounded-lg shadow-md">
            <table class="w-full text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="py-3 px-6">屬性</th>
                        <th scope="col" class="py-3 px-6">最多掉落地點</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="typeArea in showTable"
                        :key="typeArea.typeName"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <th
                            scope="row"
                            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                        >
                            {{ typeArea.typeName }}
                        </th>
                        <td class="py-4 px-6">
                            {{ typeArea.areaName }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style scoped>
/* table {
    margin-top: 8px;
    font-size: 14px;
    border-collapse: collapse;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
} */
table tr {
    /* border-bottom: 1px solid rgb(177, 177, 177); */
}
/* td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
} */
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
.legend {
    background: rgb(255, 255, 150);
    /* background: linear-gradient(to right, #feffdb 5%, #f8ff36e1 100%);
    border-left: 7px solid yellow;
    border-right: 7px solid yellow; */
}
.epic {
    background: rgb(201, 150, 255);
    /* background: linear-gradient(to right, #ffdbff 5%, #ff36f8e1 100%);
    border-left: 7px solid rgb(192, 0, 192);
    border-right: 7px solid rgb(192, 0, 192); */
}
.rare {
    background: rgb(111, 255, 255);
    /* border-left: 7px solid rgb(46, 57, 255); */
}
.great {
    background: rgb(150, 255, 164);
    /* border-left: 7px solid rgb(150, 255, 164); */
}

.page-title {
    border-left: 8px solid rgb(255, 60, 93);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
</style>
