<script setup>
import { $vfm } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const moves = pokedexStore.showMoves
const searchText = ref('')
const poke = ref(null)
const selectAttribute = ref('')
const selectCategory = ref('')

const handleClickMove = (move) => {
    const params = {
        move,
    }
    $vfm.show('ShowMoveModal', params)
}

const filterMoves = computed(() => {
    let result = moves
    if (poke.value?.id) {
        const moveIds = poke.value.moves
        result = moveIds.map((id) => moves.find((move) => move.id === id))
    }
    if (selectAttribute.value !== '') {
        result = result.filter((move) => move.type === selectAttribute.value)
    }
    if (selectCategory.value !== '') {
        result = result.filter((move) => move.category === selectCategory.value)
    }
    if (searchText.value === '') return result
    return result.filter(
        (move) => move.name.includes(searchText.value) || move.descript.includes(searchText.value)
    )
})
const learnMoves = computed(() => {
    let result = moves
    if (poke.value?.id) {
        const moveIds = poke.value.learnMoves
        result = moveIds.map((id) => moves.find((move) => move.id === id))
    }
    if (selectAttribute.value !== '') {
        result = result.filter((move) => move.type === selectAttribute.value)
    }
    if (selectCategory.value !== '') {
        result = result.filter((move) => move.category === selectCategory.value)
    }
    if (searchText.value === '') return result
    else {
        return result.filter(
            (move) =>
                move.name.includes(searchText.value) || move.descript.includes(searchText.value)
        )
    }
})
const pokes = computed(() => {
    return pokedexStore.pokes.filter((poke) => poke.moves?.length)
})
const categories = ['物理', '特殊', '變化']
</script>

<template>
    <main>
        <ModalMovePokes />
        <div class="flex justify-between">
            <div class="page-title">精靈招式</div>
        </div>
        <div class="note">
            <ul>
                <li>點擊招式可以查看有哪些精靈可以學習該招式</li>
                <li>搜尋欄可以搜尋招式名稱或效果</li>
                <li>也可以使用屬性或類別篩選符合條件的招式</li>
                <li>選擇精靈則可以查看該精靈可學的招式</li>
            </ul>
        </div>
        <div class="mt-2 flex flex-wrap items-center">
            <div class="my-1 mr-3">
                搜尋:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div class="my-1 mr-3">
                屬性:
                <select
                    v-model="selectAttribute"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                    <option :value="''">-請選擇屬性-</option>
                    <option
                        v-for="attribute in pokedexStore.attributes"
                        :key="attribute"
                        :value="attribute"
                    >
                        {{ attribute }}
                    </option>
                </select>
            </div>
            <div class="my-1 mr-3">
                類別:
                <select
                    v-model="selectCategory"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                    <option :value="''">-請選擇類別-</option>
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>

            <div class="my-1 flex items-center">
                精靈:
                <div class="min-w-[180px]">
                    <v-select v-model="poke" :options="pokes" label="name"></v-select>
                </div>
            </div>
        </div>
        <div v-if="moves.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
            <div>{{ moves.length }}</div>
        </div>
        <div class="relative mt-1 overflow-x-auto">
            <div v-if="poke" class="my-2 ml-2 text-lg text-blue-500">自學招數</div>
            <table class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">招式</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">屬性</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">類別</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">威力</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">命中</th>
                        <th scope="col" class="py-3 px-2">PP</th>
                        <th scope="col" class="py-3 px-2">說明</th>
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
                        <td class="whitespace-nowrap p-2">{{ item.type }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.category }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.power }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.accuracy }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.pp }}</td>
                        <td class="min-w-[300px] p-2">{{ item.descript }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="poke" class="my-2 ml-2 text-lg text-red-500">學習機招數</div>
            <table v-if="poke" class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">招式</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">屬性</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">類別</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">威力</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">命中</th>
                        <th scope="col" class="py-3 px-2">PP</th>
                        <th scope="col" class="py-3 px-2">說明</th>
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
</style>
