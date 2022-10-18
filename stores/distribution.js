import { defineStore } from 'pinia'
import { usePokedexStore } from '@/stores/pokedex'
const { getPokeMap } = useApi()
export const useDistributionStore = defineStore({
    id: 'useDistributionStore',
    state: () => ({
        pokeMaps: [],
    }),
    getters: {
        getterPokeMapTypes() {
            return [...new Set(this.pokeMaps.map((map) => map.type))]
        },
    },
    actions: {
        async getDistributions() {
            if (this.pokeMaps.length === 0) {
                const { data } = await getPokeMap()
                this.pokeMaps = data.value.map((area) => {
                    const pokes = area.pokes.map((poke) => ({
                        // ...(poke.f && { frequency: poke.f }),
                        ...usePokedexStore().pokes[poke],
                    }))
                    return { name: area.areaName, type: area.type, pokes }
                })
            }
        },
    },
})
