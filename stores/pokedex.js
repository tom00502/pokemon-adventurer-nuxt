import { defineStore } from 'pinia'
import features from '@/assets/json/features.json'
const { getPokedex, getFeatures, reportFeatures } = useApi()
export const usePokedexStore = defineStore({
    id: 'usePokedexStore',
    state: () => ({
        pokes: [],
        features,
    }),
    getters: {
        pokedex: (state) => {
            const entries = state.pokes.map((poke) => {
                return [poke.id, poke]
            })
            const flashEntries = state.pokes.map((poke) => {
                return [poke.id + 10000, { ...poke, name: `閃光${poke.name}` }]
            })
            return Object.fromEntries([...entries, ...flashEntries])
        },
        showFeatures: (state) => {
            return state.features.filter((feature) => feature.cost)
        },
        featurePokes: (state) => (featureId) => {
            return state.pokes.filter((poke) => poke.features.includes(featureId))
        },
    },
    actions: {
        async actionGetPokedex() {
            const quality = {
                n: 'normal',
                r: 'rare',
                e: 'epic',
                l: 'legend',
                b: 'beyond',
            }
            const data = await getPokedex()
            this.pokes = data.map((poke) => {
                let features = []
                if (poke.fe) {
                    features = poke.fe.split(',').map((featureId) => Number(featureId))
                }
                return {
                    id: poke.i,
                    name: poke.n,
                    attribute: poke.a.filter((attr) => attr),
                    quality: quality[poke.q] || quality[poke.q2],
                    from: poke.f,
                    features,
                }
            })
        },
        async actionGetFeatures() {
            const { data } = await getFeatures()
            this.features = data.value
        },
        async actionReportFeatures(params) {
            const { data } = await reportFeatures(params)
            return data
        },
    },
})
