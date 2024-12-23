<script setup>
import { $vfm } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const { locale, t } = useI18n()
useHead({
    title: t('move.title'),
    meta: [
        {
            name: 'description',
            content: t('move.ogDescription'),
        },
        {
            property: 'og:title',
            content: t('move.title'),
        },
        {
            property: 'og:description',
            content: t('move.ogDescription'),
        },
    ],
})
const pokedexStore = usePokedexStore()
const { typeTwToEn } = usePokeTypes()
const { localeMoveCategories } = useCommons()
const moves = computed(() => pokedexStore.showMoves || [])
const searchText = ref('')
const poke = ref(null)
const selectAttribute = ref('')
const selectCategory = ref('')
const sortBy = ref('')
const direct = ref('desc')
const handleClickMove = (move) => {
    const params = {
        moveId: move.id,
    }
    $vfm.show('ShowMoveModal', params)
}
const handleClear = () => {
    searchText.value = ''
    selectAttribute.value = ''
    selectCategory.value = ''
    poke.value = null
}
const filterMoves = computed(() => {
    let result = moves.value
    if (poke.value?.id) {
        const moveIds = poke.value.moves
        result = moveIds.map((id) => moves.value.find((move) => move.id === id))
        console.log(moveIds)
        console.log(result)
    }
    if (selectAttribute.value !== '') {
        result = result.filter((move) => move.type === selectAttribute.value)
    }
    if (selectCategory.value !== '') {
        result = result.filter((move) => move.category === selectCategory.value)
    }
    if (sortBy.value) {
        result.sort((a, b) => {
            if (a[sortBy.value] === '變化') {
                return direct.value === 'asc' ? 1 : -1
            }
            if (b[sortBy.value] === '變化') {
                return direct.value === 'asc' ? -1 : 1
            }
            if (a[sortBy.value] === '—') {
                if (sortBy.value === 'accuracy') {
                    return direct.value === 'asc' ? 1 : -1
                }
                return direct.value === 'asc' ? -1 : 1
            }
            if (b[sortBy.value] === '—') {
                if (sortBy.value === 'accuracy') {
                    return direct.value === 'asc' ? -1 : 1
                }
                return direct.value === 'asc' ? 1 : -1
            }
            return direct.value === 'asc'
                ? a[sortBy.value] - b[sortBy.value]
                : b[sortBy.value] - a[sortBy.value]
        })
    }
    // if (locale.value === 'en') {
    //     result = result.map((move) => {
    //         return {
    //             ...move,
    //             name: move.nameEn || move.name,
    //             descript: move.descriptEn || move.descript,
    //         }
    //     })
    // }
    if (searchText.value === '') return result
    return result.filter(
        (move) =>
            move.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
            move.descript.toLowerCase().includes(searchText.value.toLowerCase())
    )
})
const learnMoves = computed(() => {
    let result = moves.value
    if (poke.value?.id) {
        const moveIds = poke.value.learnMoves
        result = moveIds.map((id) => moves.value.find((move) => move.id === id))
    }
    if (selectAttribute.value !== '') {
        result = result.filter((move) => move.type === selectAttribute.value)
    }
    if (selectCategory.value !== '') {
        result = result.filter((move) => move.category === selectCategory.value)
    }
    if (sortBy.value) {
        result.sort((a, b) => {
            if (a[sortBy.value] === '變化') {
                return direct.value === 'asc' ? 1 : -1
            }
            if (b[sortBy.value] === '變化') {
                return direct.value === 'asc' ? -1 : 1
            }
            if (a[sortBy.value] === '—') {
                if (sortBy.value === 'accuracy') {
                    return direct.value === 'asc' ? 1 : -1
                }
                return direct.value === 'asc' ? -1 : 1
            }
            if (b[sortBy.value] === '—') {
                if (sortBy.value === 'accuracy') {
                    return direct.value === 'asc' ? -1 : 1
                }
                return direct.value === 'asc' ? 1 : -1
            }
            return direct.value === 'asc'
                ? a[sortBy.value] - b[sortBy.value]
                : b[sortBy.value] - a[sortBy.value]
        })
    }
    if (searchText.value === '') return result
    else {
        return result.filter(
            (move) =>
                move.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
                move.descript.toLowerCase().includes(searchText.value.toLowerCase())
        )
    }
})
const pokes = computed(() => {
    return pokedexStore.localePokemons.filter((poke) => poke.moves?.length)
})
const setSortBy = (type) => {
    if (sortBy.value === type) {
        if (direct.value === 'asc') {
            direct.value = 'desc'
        } else {
            direct.value = 'asc'
        }
        return
    }
    sortBy.value = type
    direct.value = 'asc'
}
const categories = ['物理', '特殊', '變化']
const localeTypes = computed(() => {
    if (locale.value === 'en') return Object.values(typeTwToEn)
    return Object.keys(typeTwToEn)
})
onMounted(() => {
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
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
        <div class="flex justify-between">
            <div class="page-title">{{ t('move.title') }}</div>
        </div>
        <div v-if="locale === 'en'" class="note">
            <ul>
                <li>Click on a move to see which Pokémon can learn it.</li>
                <li>Use the search bar to search for moves by name or effect.</li>
                <li>You can also filter moves by type or category.</li>
                <li>Select a Pokémon to see what moves it can learn.</li>
                <li>Click on the Power, Accuracy, or PP column headers to sort.</li>
                <li>
                    The official list of learnable moves is updated periodically. Please let us know
                    if you find any errors.
                </li>
            </ul>
        </div>
        <div v-else class="note">
            <ul>
                <li>點擊招式可以查看有哪些精靈可以學習該招式</li>
                <li>搜尋欄可以搜尋招式名稱或效果</li>
                <li>也可以使用屬性或類別篩選符合條件的招式</li>
                <li>選擇精靈則可以查看該精靈可學的招式</li>
                <li>點選表頭的威力，命中或PP可進行排序</li>
                <li>官方不定時會更新可學招式，若發現資料有誤請再通知更新！！</li>
            </ul>
        </div>
        <div class="mt-2 flex flex-wrap items-center">
            <div class="my-1 mr-3">
                {{ t('common.search') }}:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="my-1 mr-3">
                {{ t('move.type') }}:
                <select
                    v-model="selectAttribute"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                    <option :value="''">{{ t('move.selectType') }}</option>
                    <option v-for="attribute in localeTypes" :key="attribute" :value="attribute">
                        {{ attribute }}
                    </option>
                </select>
            </div>
            <div class="my-1 mr-3">
                {{ t('move.category') }}:
                <select
                    v-model="selectCategory"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                    <option :value="''">{{ t('move.selectCategory') }}</option>
                    <option
                        v-for="category in localeMoveCategories"
                        :key="category"
                        :value="category"
                    >
                        {{ category }}
                    </option>
                </select>
            </div>

            <div class="my-1 mr-3 flex items-center">
                {{ t('common.pokemon') }}:
                <div class="min-w-[180px]">
                    <v-select
                        v-model="poke"
                        :options="pokes"
                        label="name"
                        :placeholder="t('move.selectPokemon')"
                    ></v-select>
                </div>
            </div>
            <button
                type="button"
                class="ml-auto rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="handleClear"
            >
                {{ t('rebirth.reset') }}
            </button>
        </div>
        <div v-if="moves.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
            <div>{{ moves.length }}</div>
        </div>
        <div class="relative mt-1 overflow-x-auto">
            <div v-if="poke" class="my-2 ml-2 text-lg text-blue-500">自學招式</div>
            <table class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.move') }}
                        </th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.type') }}
                        </th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.category') }}
                        </th>
                        <th
                            scope="col"
                            class="cursor-pointer whitespace-nowrap px-2 py-3 text-blue-600 hover:underline"
                            @click="setSortBy('power')"
                        >
                            {{ t('move.power') }}
                            <template v-if="sortBy === 'power'">
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
                            class="cursor-pointer whitespace-nowrap px-2 py-3 text-blue-600 hover:underline"
                            @click="setSortBy('accuracy')"
                        >
                            {{ t('move.accuracy') }}
                            <template v-if="sortBy === 'accuracy'">
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
                            class="cursor-pointer whitespace-nowrap px-2 py-3 text-blue-600 hover:underline"
                            @click="setSortBy('pp')"
                        >
                            PP
                            <template v-if="sortBy === 'pp'">
                                <Icon
                                    :name="
                                        direct === 'asc'
                                            ? 'material-symbols:arrow-downward'
                                            : 'material-symbols:arrow-upward'
                                    "
                                />
                            </template>
                        </th>
                        <th scope="col" class="px-2 py-3">{{ t('move.moveDescription') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, key) in filterMoves"
                        :key="key"
                        class="cursor-pointer border-b bg-white"
                        @click="handleClickMove(item)"
                    >
                        <th scope="row" class="whitespace-nowrap p-2 font-medium text-gray-900">
                            {{ item.name }}
                        </th>
                        <td class="whitespace-nowrap p-2" :class="item.typeKey">{{ item.type }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.category }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.power }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.accuracy }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.pp }}</td>
                        <td class="min-w-[300px] p-2">{{ item.descript }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="poke" class="my-2 ml-2 text-lg text-red-500">學習機招式</div>
            <table v-if="poke" class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.move') }}
                        </th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.type') }}
                        </th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.category') }}
                        </th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.power') }}
                        </th>
                        <th scope="col" class="whitespace-nowrap px-2 py-3">
                            {{ t('move.accuracy') }}
                        </th>
                        <th scope="col" class="px-2 py-3">PP</th>
                        <th scope="col" class="px-2 py-3">{{ t('move.moveDescription') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, key) in learnMoves"
                        :key="key"
                        class="border-b bg-white"
                        @click="handleClickMove(item)"
                    >
                        <th scope="row" class="whitespace-nowrap p-2 font-medium text-gray-900">
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
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
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
