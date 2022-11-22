<script setup>
import { $vfm } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const moves = pokedexStore.showMoves
const searchText = ref('')
const poke = ref({ name: '' })
const handleClickFeature = (feature) => {
    const params = {
        feature,
    }
    $vfm.show('ShowBulletinModal', params)
}

const filterMoves = computed(() => {
    const result = moves
    // if (poke.value?.id) {
    //     const featureIds = poke.value.features
    //     result = result.filter((result) => featureIds.includes(result.id))
    // }
    if (searchText.value === '') return result
    else {
        return result.filter(
            (move) =>
                move.name.includes(searchText.value) || move.descript.includes(searchText.value)
        )
    }
})
const pokes = computed(() => {
    return pokedexStore.pokes.filter((poke) => poke.features.length)
})
</script>

<template>
    <main>
        <ModalFeaturePokes />
        <div class="flex justify-between">
            <div class="page-title">精靈招式</div>
            <!-- <div class="relative">
                <span class="absolute right-1 -top-1 z-10 ml-auto flex h-3 w-3">
                    <span
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"
                    ></span>
                    <span class="relative inline-flex h-3 w-3 rounded-full bg-pink-500"></span>
                </span>
                <NuxtLink
                    to="/feature/discover"
                    class="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400"
                >
                    <span
                        class="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0"
                    >
                        [支] 特性調查
                    </span>
                </NuxtLink>
            </div> -->
        </div>
        <div class="mt-2 flex items-center">
            <div class="mr-3">
                搜尋:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            精靈:
            <div class="min-w-[180px]">
                <v-select v-model="poke" :options="pokes" label="name"></v-select>
            </div>
        </div>
        <div v-if="moves.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
            <div>{{ moves.length }}</div>
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
                    <tr
                        v-for="(item, key) in filterMoves"
                        :key="key"
                        class="border-b bg-white"
                        @click="handleClickFeature(item)"
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
</style>
