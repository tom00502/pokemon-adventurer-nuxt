import { defineStore } from 'pinia'
import { usePokedexStore } from '@/stores/pokedex'
import pokeMap from '@/assets/json/pokeMap.json'
export const useDistributionStore = defineStore({
    id: 'useDistributionStore',
    state: () => ({
        pokeMaps: [],
    }),
    getters: {
        getterPokeMapTypes() {
            return [...new Set(this.pokeMaps.map((map) => map.type))]
        },
        getterPokeMaps() {
            return this.pokeMaps
        },
    },
    actions: {
        async getDistributions() {
            const mapTypes = {
                草叢: 'Grass',
                試煉之地: 'Road of trial',
                狩獵場: 'Safari',
                召喚笛: 'Flute',
                精靈扭蛋機: 'Pokemon Gashapon Machine',
                寶可夢世界: 'Pokemon World',
                主題扭蛋機: 'Special Gashapon Machine',
            }
            const locale = useNuxtApp().$i18n.locale.value
            if (this.pokeMaps.length === 0) {
                // const data = await getPokeMap()
                const data = pokeMap
                this.pokeMaps = data.map((area) => {
                    const pokes = area.pokes.map((poke) => ({
                        ...usePokedexStore().pokedex[poke],
                    }))
                    const name = locale === 'en' ? area.areaNameEn : area.areaName
                    const type = locale === 'en' ? mapTypes[area.type] : area.type
                    return { name, type, pokes }
                })
            }
        },
    },
})
