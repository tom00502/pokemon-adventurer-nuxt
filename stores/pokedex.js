import { defineStore } from 'pinia'
import features from '@/assets/json/features.json'
import moves from '@/assets/json/moves.json'
const { getPokedex, getFeatures, reportFeatures } = useApi()
export const usePokedexStore = defineStore({
    id: 'usePokedexStore',
    state: () => ({
        pokes: [],
        features,
        moves,
        attributes: [
            '一般',
            '格鬥',
            '飛行',
            '毒',
            '地面',
            '岩石',
            '蟲',
            '幽靈',
            '鋼',
            '火',
            '水',
            '草',
            '電',
            '超能力',
            '冰',
            '龍',
            '惡',
            '妖精',
        ],
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
        movedex: (state) => {
            const entries = state.moves.map((move) => {
                return [move.id, move]
            })
            return Object.fromEntries(entries)
        },
        abilitydex: (state) => {
            const entries = state.features.map((ability) => {
                return [ability.id, ability]
            })
            return Object.fromEntries(entries)
        },
        showFeatures: (state) => {
            return state.features.filter((feature) => feature.cost)
        },
        showMoves: (state) => {
            return state.moves.filter((feature) => feature.active)
        },
        featurePokes: (state) => (featureId) => {
            return state.pokes.filter((poke) => poke.features.includes(featureId))
        },
        movePokes: (state) => (moveId) => {
            return state.pokes.filter((poke) => poke.moves.includes(moveId))
        },
        learnMovePokes: (state) => (moveId) => {
            return state.pokes.filter((poke) => poke.learnMoves.includes(moveId))
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
                let moves = []
                let learnMoves = []
                if (poke.fe) {
                    features = poke.fe.split(',').map((featureId) => Number(featureId))
                }
                if (poke.m) {
                    moves = poke.m
                        .toString()
                        .split(',')
                        .map((moveId) => Number(moveId))
                }
                if (poke.ml) {
                    learnMoves = poke.ml
                        .toString()
                        .split(',')
                        .map((moveId) => Number(moveId))
                }
                return {
                    id: poke.i,
                    name: poke.n,
                    attribute: poke.a.filter((attr) => attr),
                    quality: quality[poke.q] || quality[poke.q2],
                    from: poke.f,
                    features,
                    moves,
                    learnMoves,
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
