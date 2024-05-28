<script setup>
import { $vfm } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
useHead({
    title: '精靈特性',
})
const { locale } = useI18n()
const pokedexStore = usePokedexStore()
const abilities = pokedexStore.showAbilities
const searchText = ref('')
const poke = ref({ name: '' })
const handleClickAbility = (ability) => {
    const params = {
        abilityId: ability.id,
    }
    $vfm.show('ShowAbilityModal', params)
}

const filterAbilities = computed(() => {
    let result = abilities
    if (poke.value?.id) {
        const abilityIds = poke.value.features
        result = result.filter((result) => abilityIds.includes(result.id))
    }
    if (locale.value === 'en') {
        result = result.map((ability) => {
            return {
                ...ability,
                name: ability.nameEn || ability.name,
                descript: ability.descriptEn || ability.descript,
            }
        })
    }
    if (searchText.value === '') return result
    return result.filter(
        (ability) =>
            ability.name.includes(searchText.value) ||
            ability.descript.includes(searchText.value)
    )

})
const pokes = computed(() => {
    return pokedexStore.pokes.filter((poke) => poke.features.length).map((poke) => ({
        ...poke,
        ...(locale.value === 'en' && { name: poke.names.en || poke.name })
    }))
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
            <div class="page-title">{{ $t('ability.title') }}</div>
            <div v-if="locale !== 'en'" class="relative">
                <span class="absolute right-1 -top-1 z-10 ml-auto flex h-3 w-3">
                    <span
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"
                    ></span>
                    <span class="relative inline-flex h-3 w-3 rounded-full bg-pink-500"></span>
                </span>
                <NuxtLink
                    to="/ability/discover"
                    class="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400"
                >
                    <span
                        class="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0"
                    >
                        [支] 特性調查
                    </span>
                </NuxtLink>
            </div>
        </div>
        <div class="mt-2 flex items-center">
            <div class="mr-3">
                {{ $t('common.search') }}:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            {{ $t('common.pokemon') }}:
            <div class="min-w-[180px]">
                <v-select v-model="poke" :options="pokes" label="name"></v-select>
            </div>
        </div>
        <div class="relative mt-1 overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="py-3 px-2">{{ $t('pokemon.ability') }}</th>
                        <th scope="col" class="py-3 px-2">{{ $t('common.description') }}</th>
                        <th scope="col" class="w-14 py-3 px-2">{{ $t('game.abilityStone') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, key) in filterAbilities"
                        :key="key"
                        class="border-b bg-white cursor-pointer"
                        @click="handleClickAbility(item)"
                    >
                        <th scope="row" class="whitespace-nowrap p-2 font-medium text-gray-900">
                            {{ item.name }}
                        </th>
                        <td class="min-w-[300px] p-2">{{ item.descript }}</td>
                        <td class="p-2">{{ item.cost }}</td>
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
