<script setup>
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
import usePokeTypes from '@/composables/usePokeTypes'
const { isIntersection, intersectionObserver } = useIntersectionObserver()
const { locale, t } = useI18n()
useHead({
    title: t('pokedex.title'),
    meta: [
        {
            name: 'description',
            content: t('pokedex.ogDescription'),
        },
        {
            property: 'og:title',
            content: t('pokedex.title'),
        },
        {
            property: 'og:description',
            content: t('pokedex.ogDescription'),
        },
    ],
})
const localePath = useLocalePath()
const { getLocalizedPokemonName, getLocalizedAttributes } = usePokemonI18n()
const pokedexStore = usePokedexStore()
const { typeOptions } = usePokeTypes()
const router = useRouter()
const route = useRoute()
const searchText = ref('')
const selectMoves = ref([])
const selectAbilities = ref(null)
const selectTypes = ref([])
const selectQualitys = ref([])
const sortBy = ref('')
const direct = ref('desc')
const shiny = ref(false)
const canRebirth = ref(false)
const cannotRebirth = ref(false)
const advanceSearch = ref(false)
const isTest = ref(!!route.query.test)
const maxViewPokes = ref(20)
const loadRef = ref(null)
const searchStat = reactive({
    hp: '',
    attack: '',
    defense: '',
    sAttack: '',
    sDefense: '',
    speed: '',
    total: '',
})
const qualitys = [
    { id: 'normal', name: t('pokedex.quality.normal') },
    { id: 'rare', name: t('pokedex.quality.rare') },
    { id: 'epic', name: t('pokedex.quality.epic') },
    { id: 'legend', name: t('pokedex.quality.legend') },
    { id: 'beyond', name: t('pokedex.quality.beyond') },
]
const pokesWithGradeCard = computed(() => {
    return pokedexStore.pokes.map((poke) => {
        const gradeCard = pokedexStore.gradeCardUses.find((use) => use.poke.id === poke.id) || {
            gradeCards: [],
        }

        return {
            ...poke,
            name: getLocalizedPokemonName(poke),
            attribute: getLocalizedAttributes(poke.attribute),
            typeKeys: poke.attribute.map((type) => type.toLowerCase()),
            gradeCard,
        }
    })
})
const filterPokes = computed(() => {
    // let result = pokedexStore.pokes
    let result = pokesWithGradeCard.value
    if (searchText.value) {
        const keyword = searchText.value.toLowerCase()
        result = result.filter((poke) => poke.name.toLowerCase().includes(keyword))
    }
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
            selectTypes.value.every((type) => poke.types.includes(type.key))
        )
    }
    if (selectQualitys.value.length) {
        result = result.filter((poke) =>
            selectQualitys.value.some((quality) => poke.quality === quality.id)
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
    // 轉生篩選邏輯
    if (canRebirth.value && !cannotRebirth.value) {
        // 只勾選可轉生
        result = result.filter((poke) => poke.rebirthable)
    } else if (!canRebirth.value && cannotRebirth.value) {
        // 只勾選不可轉生
        result = result.filter((poke) => !poke.rebirthable)
    }
    // 兩個都勾選或都不勾選，顯示全部（不需要額外處理）
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
    return result.slice(0, maxViewPokes.value)
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
    router.push({ path: localePath(`/pokedex/${poke.id}`) })
}
const handleClear = () => {
    searchText.value = ''
    selectMoves.value = []
    selectAbilities.value = null
    selectTypes.value = []
    sortBy.value = ''
    direct.value = 'desc'
    maxViewPokes.value = 20
    canRebirth.value = false
    cannotRebirth.value = false

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
        searchStat.total ||
        canRebirth.value ||
        cannotRebirth.value
    )
})
const badges = computed(() => {
    const badge = []
    if (selectMoves.value.length) {
        const moveBadge = selectMoves.value.map((move) =>
            t('pokedex.searchBadges.canLearnMove', { move: move.name })
        )
        badge.push(...moveBadge)
    }
    if (selectAbilities.value) {
        badge.push(t('pokedex.searchBadges.hasAbility', { ability: selectAbilities.value.name }))
    }
    if (selectTypes.value.length) {
        const typeBadge = selectTypes.value.map((type) =>
            t('pokedex.searchBadges.hasType', { type: type.name })
        )
        badge.push(...typeBadge)
    }
    if (searchStat.hp) {
        badge.push(t('pokedex.searchBadges.hpAbove', { value: searchStat.hp }))
    }
    if (searchStat.attack) {
        badge.push(t('pokedex.searchBadges.attackAbove', { value: searchStat.attack }))
    }
    if (searchStat.defense) {
        badge.push(t('pokedex.searchBadges.defenseAbove', { value: searchStat.defense }))
    }
    if (searchStat.sAttack) {
        badge.push(t('pokedex.searchBadges.spAttackAbove', { value: searchStat.sAttack }))
    }
    if (searchStat.sDefense) {
        badge.push(t('pokedex.searchBadges.spDefenseAbove', { value: searchStat.sDefense }))
    }
    if (searchStat.speed) {
        badge.push(t('pokedex.searchBadges.speedAbove', { value: searchStat.speed }))
    }
    if (searchStat.total) {
        badge.push(t('pokedex.searchBadges.totalAbove', { value: searchStat.total }))
    }
    if (canRebirth.value && !cannotRebirth.value) {
        badge.push(t('pokedex.searchBadges.rebirthable'))
    }
    if (!canRebirth.value && cannotRebirth.value) {
        badge.push(t('pokedex.searchBadges.notRebirthable'))
    }
    return badge
})
onMounted(() => {
    intersectionObserver(loadRef.value)
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ; (adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
watch(isIntersection, (isIntersect) => {
    if (!isIntersect) return
    maxViewPokes.value += 20
})

// 當搜索條件改變時重置分頁
watch(
    [
        searchText,
        selectMoves,
        selectAbilities,
        selectTypes,
        selectQualitys,
        searchStat,
        canRebirth,
        cannotRebirth,
    ],
    () => {
        maxViewPokes.value = 20
    },
    { deep: true }
)
</script>
<template>
<main>
    <ins class="adsbygoogle focusAd" style="display: block" data-ad-client="ca-pub-2683150416576260"
        data-ad-slot="6422833388" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <div class="page-title">{{ t('pokedex.title') }}</div>
    <div class="note">
        <ul>
            <li>{{ t('pokedex.notes.multiCondition') }}</li>
            <li>{{ t('pokedex.notes.shinyStats') }}</li>
            <li>{{ t('pokedex.notes.advancedSearch') }}</li>
            <li>{{ t('pokedex.notes.multiMoves') }}</li>
            <li>{{ t('pokedex.notes.singleAbility') }}</li>
            <li>{{ t('pokedex.notes.multiTypes') }}</li>
            <li>{{ t('pokedex.notes.statFilter') }}</li>
            <li>{{ t('pokedex.notes.sortByStats') }}</li>
        </ul>
    </div>
    <div class="mt-2 flex flex-wrap items-center">
        <div class="my-1 mr-3">
            {{ t('pokedex.searchPokemonName') }}:
            <input v-model="searchText" type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div class="flex items-center">
            <input id="checked-checkbox" v-model="shiny" type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" />
            <label for="checked-checkbox" class="ml-2 text-sm font-medium">{{
                t('pokedex.showShinyStats')
                }}</label>
        </div>
    </div>
    <div>
        <button v-if="advanceSearch == false" type="button"
            class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="advanceSearch = true">
            {{ t('pokedex.expandAdvancedSearch') }}
        </button>
        <div v-if="advanceSearch" class="transition-all duration-700 ease-linear">
            {{ t('pokedex.conditionSearch') }}
            <div class="flex flex-wrap justify-center">
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.moves') }}</div>
                    <v-select v-model="selectMoves" :options="pokedexStore.showMoves"
                        :placeholder="t('pokedex.placeholders.selectMoves')" multiple label="name"
                        class="w-full min-w-[180px]"></v-select>
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.ability') }}</div>
                    <v-select v-model="selectAbilities" :options="pokedexStore.showFeatures"
                        :placeholder="t('pokedex.placeholders.selectAbility')" label="name"
                        class="w-full min-w-[180px]"></v-select>
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.type') }}</div>
                    <v-select v-model="selectTypes" :options="typeOptions"
                        :placeholder="t('pokedex.placeholders.selectType')" multiple
                        :selectable="() => selectTypes.length < 2" :searchable="false" label="name"
                        class="w-full min-w-[180px]"></v-select>
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.qualityLabel') }}</div>
                    <v-select v-model="selectQualitys" :options="qualitys" label="name"
                        :placeholder="t('pokedex.placeholders.selectQuality')" multiple :searchable="false"
                        class="w-full min-w-[180px]"></v-select>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-4">
                <div class="flex items-center">
                    <input id="can-rebirth" v-model="canRebirth" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                    <label for="can-rebirth" class="ml-2 text-sm font-medium">{{
                        t('pokedex.canRebirth')
                        }}</label>
                </div>
                <div class="flex items-center">
                    <input id="cannot-rebirth" v-model="cannotRebirth" type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                    <label for="cannot-rebirth" class="ml-2 text-sm font-medium">{{
                        t('pokedex.cannotRebirth')
                        }}</label>
                </div>
            </div>
            {{ t('pokedex.statsSearch') }}
            <div class="flex flex-wrap justify-center">
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.hp') }} ></div>
                    <input v-model.number="searchStat.hp" type="number"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.attack') }} ></div>
                    <input v-model.number="searchStat.attack" type="number"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.defense') }} ></div>
                    <input v-model.number="searchStat.defense" type="number"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.spAttack') }} ></div>
                    <input v-model.number="searchStat.sAttack" type="number"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.spDefense') }} ></div>
                    <input v-model.number="searchStat.sDefense" type="number"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.speed') }} ></div>
                    <input v-model.number="searchStat.speed" type="number"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div class="my-1 mr-3 flex flex-grow items-center gap-1">
                    <div class="shrink-0">{{ t('pokedex.total') }} ></div>
                    <input v-model.number="searchStat.total" type="number"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
                </div>
            </div>
            <div class="flex justify-center">
                <button type="button"
                    class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="advanceSearch = false">
                    {{ t('pokedex.hideAdvancedSearch') }}
                </button>
                <button type="button"
                    class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClear">
                    {{ t('pokedex.resetAll') }}
                </button>
            </div>
        </div>
    </div>
    <div v-if="searching && !advanceSearch" class="bg-gray-50">
        {{ t('pokedex.searchConditions') }}:
        <div class="flex flex-wrap">
            <div v-for="badge in badges" :key="badge"
                class="my-1 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {{ badge }}
            </div>
        </div>
    </div>
    <div v-if="pokedexStore.pokes.length == 0" class="slowpoke-loading" />
    <div v-if="sortedPokes.length" class="mt-2 overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-center text-sm text-gray-500">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                    <th scope="col" class="whitespace-nowrap px-1 py-3">
                        {{ t('pokedex.pokemon') }}
                    </th>
                    <th scope="col" class="whitespace-nowrap px-1 py-3">
                        {{ t('pokedex.type1') }}
                    </th>
                    <th scope="col" class="whitespace-nowrap px-1 py-3">
                        {{ t('pokedex.type2') }}
                    </th>
                    <th scope="col" class="cursor-pointer whitespace-nowrap px-1 py-3 text-blue-600 hover:underline"
                        @click="setSortBy('hp')">
                        {{ t('pokedex.hp') }}
                        <template v-if="sortBy === 'hp'">
                            <Icon :name="direct === 'asc'
                                ? 'material-symbols:arrow-downward'
                                : 'material-symbols:arrow-upward'
                                " />
                        </template>
                    </th>
                    <th scope="col" class="cursor-pointer whitespace-nowrap px-1 py-3 text-blue-600 hover:underline"
                        @click="setSortBy('attack')">
                        {{ t('pokedex.attack') }}
                        <template v-if="sortBy === 'attack'">
                            <Icon :name="direct === 'asc'
                                ? 'material-symbols:arrow-downward'
                                : 'material-symbols:arrow-upward'
                                " />
                        </template>
                    </th>
                    <th scope="col" class="cursor-pointer whitespace-nowrap px-1 py-3 text-blue-600 hover:underline"
                        @click="setSortBy('defense')">
                        {{ t('pokedex.defense') }}
                        <template v-if="sortBy === 'defense'">
                            <Icon :name="direct === 'asc'
                                ? 'material-symbols:arrow-downward'
                                : 'material-symbols:arrow-upward'
                                " />
                        </template>
                    </th>
                    <th scope="col" class="cursor-pointer whitespace-nowrap px-1 py-3 text-blue-600 hover:underline"
                        @click="setSortBy('sAttack')">
                        {{ t('pokedex.spAttack') }}
                        <template v-if="sortBy === 'sAttack'">
                            <Icon :name="direct === 'asc'
                                ? 'material-symbols:arrow-downward'
                                : 'material-symbols:arrow-upward'
                                " />
                        </template>
                    </th>
                    <th scope="col" class="cursor-pointer whitespace-nowrap px-1 py-3 text-blue-600 hover:underline"
                        @click="setSortBy('sDefense')">
                        {{ t('pokedex.spDefense') }}
                        <template v-if="sortBy === 'sDefense'">
                            <Icon :name="direct === 'asc'
                                ? 'material-symbols:arrow-downward'
                                : 'material-symbols:arrow-upward'
                                " />
                        </template>
                    </th>
                    <th scope="col" class="cursor-pointer whitespace-nowrap px-1 py-3 text-blue-600 hover:underline"
                        @click="setSortBy('speed')">
                        {{ t('pokedex.speed') }}
                        <template v-if="sortBy === 'speed'">
                            <Icon :name="direct === 'asc'
                                ? 'material-symbols:arrow-downward'
                                : 'material-symbols:arrow-upward'
                                " />
                        </template>
                    </th>
                    <th scope="col" class="cursor-pointer whitespace-nowrap px-1 py-3 text-blue-600 hover:underline"
                        @click="setSortBy('total')">
                        {{ t('pokedex.total') }}
                        <template v-if="sortBy === 'total'">
                            <Icon :name="direct === 'asc'
                                ? 'material-symbols:arrow-downward'
                                : 'material-symbols:arrow-upward'
                                " />
                        </template>
                    </th>
                    <th scope="col" class="whitespace-nowrap px-1 py-3">
                        {{ t('pokedex.rebirthable') }}
                    </th>
                    <!-- <th scope="col" class="whitespace-nowrap py-3 px-1">升品</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="poke in sortedPokes" :key="poke.id" class="border-b bg-white hover:bg-gray-50">
                    <th scope="row" class="cursor-pointer whitespace-nowrap px-1 py-1 font-medium text-gray-900">
                        <div class="poke-name px-1" :class="shiny ? poke.sQuality : poke.quality"
                            @click="handleClick(poke)">
                            {{ shiny ? t('pokedex.shiny') : '' }}{{ poke.name }}
                        </div>
                    </th>
                    <td class="whitespace-nowrap px-1 py-1" :class="poke.types[0]">
                        {{ poke.attribute[0] }}
                    </td>
                    <td class="whitespace-nowrap px-1 py-1" :class="poke.types[1]">
                        {{ poke.attribute[1] }}
                    </td>
                    <td class="px-1 py-1">{{ poke[stat].hp }}</td>
                    <td class="px-1 py-1">{{ poke[stat].attack }}</td>
                    <td class="px-1 py-1">{{ poke[stat].defense }}</td>
                    <td class="px-1 py-1">{{ poke[stat].sAttack }}</td>
                    <td class="px-1 py-1">{{ poke[stat].sDefense }}</td>
                    <td class="px-1 py-1">{{ poke[stat].speed }}</td>
                    <td class="px-1 py-1">{{ poke[stat].total }}</td>
                    <td class="px-1 py-1">{{ poke.rebirthable ? '✅' : '' }}</td>
                    <!-- <td class="py-1 px-1">{{ poke.gradeCard.gradeCards.length }}</td> -->
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <p class="mt-3 text-xl font-semibold">{{ t('pokedex.noResults') }}</p>
    </div>
    <div ref="loadRef" class="mt-4 flex justify-center">
        {{ t('pokedex.noMorePokemon') }}
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

.poke-name.normal {
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

.poke-list>div {
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

.bug {
    background: rgba(70, 200, 70, 0.2);
}

.dark {
    background: rgba(120, 120, 120, 0.2);
}

.dragon {
    background: rgba(80, 120, 220, 0.2);
}

.electric {
    background: rgba(255, 255, 0, 0.2);
}

.fire {
    background: rgba(255, 105, 0, 0.2);
}

.fairy {
    background: rgba(255, 175, 200, 0.2);
}

.fighting {
    background: rgba(220, 105, 0, 0.2);
}

.flying {
    background: rgba(120, 220, 255, 0.2);
}

.ghost {
    background: rgba(160, 140, 255, 0.2);
}

.grass {
    background: rgba(180, 240, 0, 0.2);
}

.ground {
    background: rgba(250, 200, 90, 0.2);
}

.ice {
    background: rgba(20, 245, 255, 0.2);
}

.normal {
    background: rgba(220, 220, 220, 0.2);
}

.poison {
    background: rgba(210, 140, 210, 0.2);
}

.psychic {
    background: rgba(240, 140, 220, 0.2);
}

.rock {
    background: rgba(180, 140, 100, 0.2);
}

.steel {
    background: rgba(170, 200, 240, 0.2);
}

.water {
    background: rgba(20, 185, 255, 0.2);
}
</style>
