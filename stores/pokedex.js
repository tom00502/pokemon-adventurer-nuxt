import { defineStore } from 'pinia'
import features from '@/assets/json/features.json'
import moves from '@/assets/json/moves.json'
import fetters from '@/assets/json/fetters.json'
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
                const stat = {
                    hp: poke.s[0],
                    attack: poke.s[1],
                    defense: poke.s[2],
                    sAttack: poke.s[3],
                    sDefense: poke.s[4],
                    speed: poke.s[5],
                    total: poke.s[0] + poke.s[1] + poke.s[2] + poke.s[3] + poke.s[4] + poke.s[5],
                }
                const sStat = {
                    hp: stat.hp ? Math.ceil((stat.hp * 1.1).toFixed(1)) : stat.hp,
                    attack: stat.attack ? Math.ceil((stat.attack * 1.1).toFixed(1)) : stat.attack,
                    defense: stat.defense
                        ? Math.ceil((stat.defense * 1.1).toFixed(1))
                        : stat.defense,
                    sAttack: stat.sAttack
                        ? Math.ceil((stat.sAttack * 1.1).toFixed(1))
                        : stat.sAttack,
                    sDefense: stat.sDefense
                        ? Math.ceil((stat.sDefense * 1.1).toFixed(1))
                        : stat.sDefense,
                    speed: stat.speed ? Math.ceil((stat.speed * 1.1).toFixed(1)) : stat.speed,
                }
                sStat.total =
                    sStat.hp +
                    sStat.attack +
                    sStat.defense +
                    sStat.sAttack +
                    sStat.sDefense +
                    sStat.speed
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
                const fetter = fetters.find((fetter) => fetter.name === poke.n)
                return {
                    id: poke.i,
                    name: poke.n,
                    attribute: poke.a.filter((attr) => attr),
                    quality: quality[poke.q] || quality[poke.q2],
                    sQuality: quality[poke.q2] || quality[poke.q],
                    from: poke.f,
                    features,
                    moves,
                    learnMoves,
                    stat,
                    sStat,
                    zukanId: poke.z,
                    zukanSubId: poke.zs,
                    fetter,
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
