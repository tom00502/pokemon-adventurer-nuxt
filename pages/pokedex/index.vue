<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
useHead({
    title: '精靈圖鑑',
})
const router = useRouter()
const route = useRoute()
const pokedexStore = usePokedexStore()
const searchText = ref('')
const selectMoves = ref([])
const selectAbilities = ref(null)
const selectTypes = ref([])
const sortBy = ref('')
const direct = ref('desc')
const shiny = ref(false)
const advanceSearch = ref(false)
const isTest = ref(!!route.query.test)
const searchStat = reactive({
    hp: '',
    attack: '',
    defense: '',
    sAttack: '',
    sDefense: '',
    speed: '',
    total: '',
})
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
    if (searchStat.hp) {
        result = result.filter((poke) => poke[stat.value].hp >= searchStat.hp)
    }
    if (searchStat.attack) {
        result = result.filter((poke) => poke[stat.value].attack >= searchStat.attack)
    }
    if (searchStat.defense) {
        result = result.filter((poke) => poke[stat.value].defense >= searchStat.defense)
    }
    if (searchStat.sAttack) {
        result = result.filter((poke) => poke[stat.value].sAttack >= searchStat.sAttack)
    }
    if (searchStat.sDefense) {
        result = result.filter((poke) => poke[stat.value].sDefense >= searchStat.sDefense)
    }
    if (searchStat.speed) {
        result = result.filter((poke) => poke[stat.value].speed >= searchStat.speed)
    }
    if (searchStat.total) {
        result = result.filter((poke) => poke[stat.value].total >= searchStat.total)
    }
    return result
})
const sortedPokes = computed(() => {
    const result = [...filterPokes.value]
    if (sortBy.value) {
        result.sort((a, b) => {
            if (!a.stat[sortBy.value]) return 1
            if (!b.stat[sortBy.value]) return -1
            return direct.value === 'asc'
                ? a.stat[sortBy.value] - b.stat[sortBy.value]
                : b.stat[sortBy.value] - a.stat[sortBy.value]
        })
    }
    return result
})
const setSortBy = (type) => {
    if (sortBy.value === type) {
        direct.value = direct.value === 'asc' ? 'desc' : 'asc'
        return
    }
    sortBy.value = type
    direct.value = 'desc'
}
const handleClick = (poke) => {
    // if (isTest.value)
    router.push({ path: `/pokedex/${poke.id}` })
}
const handleClear = () => {
    searchText.value = ''
    selectMoves.value = []
    selectAbilities.value = null
    selectTypes.value = []
    sortBy.value = ''
    direct.value = 'desc'

    searchStat.hp = ''
    searchStat.attack = ''
    searchStat.defense = ''
    searchStat.sAttack = ''
    searchStat.sDefense = ''
    searchStat.speed = ''
    searchStat.total = ''
}
const stat = computed(() => {
    return shiny.value ? 'sStat' : 'stat'
})
const searching = computed(() => {
    return (
        selectMoves.value.length ||
        selectAbilities.value ||
        selectTypes.value.length ||
        searchStat.hp ||
        searchStat.attack ||
        searchStat.defense ||
        searchStat.sAttack ||
        searchStat.sDefense ||
        searchStat.speed ||
        searchStat.total
    )
})
const badges = computed(() => {
    const badge = []
    if (selectMoves.value.length) {
        const moveBadge = selectMoves.value.map((move) => `精靈可學會${move.name}`)
        badge.push(...moveBadge)
    }
    if (selectAbilities.value) {
        badge.push(`精靈擁有${selectAbilities.value.name}特性`)
    }
    if (selectTypes.value.length) {
        const typeBadge = selectTypes.value.map((type) => `精靈擁有${type}屬性`)
        badge.push(...typeBadge)
    }
    if (searchStat.hp) {
        badge.push(`精靈生命種族值${searchStat.hp}以上`)
    }
    if (searchStat.attack) {
        badge.push(`精靈攻擊種族值${searchStat.attack}以上`)
    }
    if (searchStat.defense) {
        badge.push(`精靈防禦種族值${searchStat.defense}以上`)
    }
    if (searchStat.sAttack) {
        badge.push(`精靈特攻種族值${searchStat.sAttack}以上`)
    }
    if (searchStat.sDefense) {
        badge.push(`精靈特防種族值${searchStat.sDefense}以上`)
    }
    if (searchStat.speed) {
        badge.push(`精靈速度種族值${searchStat.speed}以上`)
    }
    if (searchStat.total) {
        badge.push(`精靈種族值加總${searchStat.total}以上`)
    }
    return badge
})
onMounted(() => {
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
</script>
<template>
    <main>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="6422833388"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="page-title">精靈圖鑑</div>
        <div class="note">
            <ul>
                <li>可以搜尋同時符合多個條件的精靈</li>
                <li>可勾選顯示閃光數值來顯示閃光加成後的種族值</li>
                <li>展開進階搜索輸入更多條件</li>
                <li>招式可以多選，這些招式都能學的精靈才顯示</li>
                <li>特性只能選一個，擁有該特性的精靈才顯示</li>
                <li>屬性可以選1~2個，這些屬性都擁有的精靈才顯示</li>
                <li>也可找特定種族值在一定數值以上的精靈</li>
                <li>點選種族值標題可以進行排序</li>
            </ul>
        </div>
        <div class="mt-2 flex flex-wrap items-center">
            <div class="my-1 mr-3">
                搜尋精靈名稱:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="flex items-center">
                <input
                    id="checked-checkbox"
                    v-model="shiny"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label for="checked-checkbox" class="ml-2 text-sm font-medium">顯示閃光數值</label>
            </div>
        </div>
        <div>
            <button
                v-if="advanceSearch == false"
                type="button"
                class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="advanceSearch = true"
            >
                展開進階搜索
            </button>
            <div v-if="advanceSearch" class="transition-all duration-700 ease-linear">
                條件搜尋
                <div class="flex flex-wrap justify-center">
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">招式</div>
                        <v-select
                            v-model="selectMoves"
                            :options="pokedexStore.moves"
                            placeholder="請選擇精靈招式"
                            multiple
                            label="name"
                            class="w-full min-w-[180px]"
                        ></v-select>
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">特性</div>
                        <v-select
                            v-model="selectAbilities"
                            :options="pokedexStore.features"
                            placeholder="請選擇精靈特性"
                            label="name"
                            class="w-full min-w-[180px]"
                        ></v-select>
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">屬性</div>
                        <v-select
                            v-model="selectTypes"
                            :options="pokedexStore.attributes"
                            placeholder="請選擇精靈屬性"
                            multiple
                            :selectable="() => selectTypes.length < 2"
                            :searchable="false"
                            class="w-full min-w-[180px]"
                        ></v-select>
                    </div>
                </div>
                種族值搜尋
                <div class="flex flex-wrap justify-center">
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">生命 ></div>
                        <input
                            v-model.number="searchStat.hp"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">攻擊 ></div>
                        <input
                            v-model.number="searchStat.attack"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">防禦 ></div>
                        <input
                            v-model.number="searchStat.defense"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">特攻 ></div>
                        <input
                            v-model.number="searchStat.sAttack"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">特防 ></div>
                        <input
                            v-model.number="searchStat.sDefense"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">速度 ></div>
                        <input
                            v-model.number="searchStat.speed"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                        <div class="shrink-0">加總 ></div>
                        <input
                            v-model.number="searchStat.total"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div class="flex justify-center">
                    <button
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="advanceSearch = false"
                    >
                        隱藏進階搜索
                    </button>
                    <button
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="handleClear"
                    >
                        全部重置
                    </button>
                </div>
            </div>
        </div>
        <div v-if="searching && !advanceSearch" class="bg-gray-50">
            搜索條件:
            <div class="flex flex-wrap">
                <div
                    v-for="badge in badges"
                    :key="badge"
                    class="my-1 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                >
                    {{ badge }}
                </div>
            </div>
        </div>
        <div
            v-if="sortedPokes.length"
            class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg"
        >
            <table class="w-full text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">精靈</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">屬性1</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">屬性2</th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap py-3 px-1 text-blue-600 hover:underline"
                            @click="setSortBy('hp')"
                        >
                            生命
                            <template v-if="sortBy === 'hp'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap py-3 px-1 text-blue-600 hover:underline"
                            @click="setSortBy('attack')"
                        >
                            攻擊
                            <template v-if="sortBy === 'attack'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap py-3 px-1 text-blue-600 hover:underline"
                            @click="setSortBy('defense')"
                        >
                            防禦
                            <template v-if="sortBy === 'defense'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap py-3 px-1 text-blue-600 hover:underline"
                            @click="setSortBy('sAttack')"
                        >
                            特攻
                            <template v-if="sortBy === 'sAttack'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap py-3 px-1 text-blue-600 hover:underline"
                            @click="setSortBy('sDefense')"
                        >
                            特防
                            <template v-if="sortBy === 'sDefense'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap py-3 px-1 text-blue-600 hover:underline"
                            @click="setSortBy('speed')"
                        >
                            速度
                            <template v-if="sortBy === 'speed'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap py-3 px-1 text-blue-600 hover:underline"
                            @click="setSortBy('total')"
                        >
                            加總
                            <template v-if="sortBy === 'total'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="poke in sortedPokes"
                        :key="poke.id"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <th
                            scope="row"
                            class="cursor-pointer whitespace-nowrap py-1 px-1 font-medium text-gray-900"
                        >
                            <div
                                class="px-1"
                                :class="shiny ? poke.sQuality : poke.quality"
                                @click="handleClick(poke)"
                            >
                                {{ shiny ? '閃光' : '' }}{{ poke.name }}
                            </div>
                        </th>
                        <td class="whitespace-nowrap py-1 px-1">{{ poke.attribute[0] }}</td>
                        <td class="whitespace-nowrap py-1 px-1">{{ poke.attribute[1] }}</td>
                        <td class="py-1 px-1">{{ poke[stat].hp }}</td>
                        <td class="py-1 px-1">{{ poke[stat].attack }}</td>
                        <td class="py-1 px-1">{{ poke[stat].defense }}</td>
                        <td class="py-1 px-1">{{ poke[stat].sAttack }}</td>
                        <td class="py-1 px-1">{{ poke[stat].sDefense }}</td>
                        <td class="py-1 px-1">{{ poke[stat].speed }}</td>
                        <td class="py-1 px-1">{{ poke[stat].total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p class="font-semiblod mt-3 text-xl">沒有相符的搜尋結果</p>
        </div>
        <!-- <div class="poke-list">
            <div
                v-for="poke in filterPokes"
                :key="poke.name"
                :class="poke.quality"
                @click="handleClick(poke)"
            >
                {{ poke.name }}
            </div>
        </div> -->
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
