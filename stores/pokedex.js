import { defineStore } from 'pinia'
import _gradeCards from '@/assets/json/gradeCards.json'
import features from '@/assets/json/features.json'
import moves from '@/assets/json/moves.json'
import fetters from '@/assets/json/fetters.json'
import cardPattens from '@/assets/json/cardPattens.json'
import _gradeCardUsesSimplify from '@/assets/json/gradeCardUsesSimplify.json'
import _pokedex from '@/assets/json/pokedex.json'
import { useNuxtApp } from '#app'
const { getPokedex, getFeatures, reportFeatures, getPokeCards, getGradeCardUseMap } = useApi()
// const extraData = [
//     {
//         id: 374,
//         img: '/images/poke/376.webp',
//     },
//     {
//         id: 956,
//         img: '/images/poke/956.png',
//     },
// ]
// const quality = {
//     n: 'normal',
//     r: 'rare',
//     e: 'epic',
//     l: 'legend',
//     b: 'beyond',
// }
// const pokedexInit = _pokedex.map((poke) => {
//     let features = []
//     let moves = []
//     let learnMoves = []
//     const stat = {
//         hp: poke.s[0],
//         attack: poke.s[1],
//         defense: poke.s[2],
//         sAttack: poke.s[3],
//         sDefense: poke.s[4],
//         speed: poke.s[5],
//         total: poke.s[0] + poke.s[1] + poke.s[2] + poke.s[3] + poke.s[4] + poke.s[5],
//     }
//     const sStat = {
//         hp: stat.hp ? Math.ceil((stat.hp * 1.1).toFixed(1)) : stat.hp,
//         attack: stat.attack ? Math.ceil((stat.attack * 1.1).toFixed(1)) : stat.attack,
//         defense: stat.defense ? Math.ceil((stat.defense * 1.1).toFixed(1)) : stat.defense,
//         sAttack: stat.sAttack ? Math.ceil((stat.sAttack * 1.1).toFixed(1)) : stat.sAttack,
//         sDefense: stat.sDefense ? Math.ceil((stat.sDefense * 1.1).toFixed(1)) : stat.sDefense,
//         speed: stat.speed ? Math.ceil((stat.speed * 1.1).toFixed(1)) : stat.speed,
//     }
//     sStat.total =
//         sStat.hp + sStat.attack + sStat.defense + sStat.sAttack + sStat.sDefense + sStat.speed
//     if (poke.fe) {
//         features = poke.fe.split(',').map((featureId) => Number(featureId))
//     }
//     if (poke.m) {
//         moves = poke.m
//             .toString()
//             .split(',')
//             .map((moveId) => Number(moveId))
//     }
//     if (poke.ml) {
//         learnMoves = poke.ml
//             .toString()
//             .split(',')
//             .map((moveId) => Number(moveId))
//     }
//     const fetter = fetters.find((fetter) => fetter.name === poke.n)
//     const _extraData = extraData.find((p) => p.id == poke.i)
//     return {
//         id: poke.i,
//         name: poke.n,
//         attribute: poke.a.filter((attr) => attr),
//         quality: quality[poke.q] || quality[poke.q2],
//         sQuality: quality[poke.q2] || quality[poke.q],
//         from: poke.f,
//         features,
//         moves,
//         learnMoves,
//         stat,
//         sStat,
//         zukanId: poke.z,
//         zukanSubId: poke.zs,
//         fetter,
//         ...(_extraData && { img: _extraData.img }),
//     }
// })
// const pokedexInit = []
// console.log(pokedexInit, 'pokedexinit')
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
        extraData: [
            {
                id: 374,
                img: '/images/poke/376.webp',
            },
            {
                id: 956,
                img: '/images/poke/956.png',
            },
            {
                id: 1222,
                img: '/images/poke/1222.webp',
            },
        ],
        gradeCards: Object.fromEntries(
            _gradeCards.map((item) => [
                item.i,
                {
                    id: item.i,
                    name: item.n,
                    quality: item.q,
                    from: item.f?.split(','),
                },
            ])
        ),
        gradeCardUsesOnline: [],
    }),
    getters: {
        pokedex: (state) => {
            const locale = useNuxtApp().$i18n.locale.value
            if (locale === 'en') {
                const entries = state.pokes.map((poke) => {
                    return [poke.id, { ...poke, ...(poke.names.en && { name: poke.names.en }) }]
                })
                const flashEntries = state.pokes.map((poke) => {
                    return [
                        poke.id + 10000,
                        {
                            ...poke,
                            ...(poke.names.en
                                ? { name: `Shiny ${poke.names.en}` }
                                : { name: `閃光${poke.name}` }),
                        },
                    ]
                })
                return Object.fromEntries([...entries, ...flashEntries])
            } else {
                const entries = state.pokes.map((poke) => {
                    return [poke.id, poke]
                })
                const flashEntries = state.pokes.map((poke) => {
                    return [poke.id + 10000, { ...poke, name: `閃光${poke.name}` }]
                })
                return Object.fromEntries([...entries, ...flashEntries])
            }
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
        showAbilities: (state) => {
            return state.features.filter((feature) => feature.cost)
        },
        showMoves: (state) => {
            return state.moves.filter((feature) => feature.active)
        },
        abilityPokes: (state) => (featureId) => {
            return state.pokes.filter((poke) => poke.features.includes(featureId))
        },
        movePokes: (state) => (moveId) => {
            return state.pokes.filter((poke) => poke.moves.includes(moveId))
        },
        learnMovePokes: (state) => (moveId) => {
            return state.pokes.filter((poke) => poke.learnMoves.includes(moveId))
        },
        gradeCardUses(state) {
            if (state.pokes.length === 0) return []
            if (state.gradeCardUsesOnline.length > 0) return state.gradeCardUsesOnline
            return _gradeCardUsesSimplify.map((gradeCard) => {
                return {
                    poke: this.pokedex[gradeCard.i] || {},
                    gradeCards: gradeCard.g.map((use) => ({
                        cards: cardPattens[use.c]
                            .split(',')
                            .map((cardId) => state.gradeCards[cardId]),
                        checked: use.k === 1,
                        level: use.l,
                        groupKey: use.c,
                    })),
                    pokeGroupKey: gradeCard.g.map((use) => use.c).join(','),
                }
            })
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
            // try {
            const data = await getPokedex()
            if (data) {
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
                        total:
                            poke.s[0] + poke.s[1] + poke.s[2] + poke.s[3] + poke.s[4] + poke.s[5],
                    }
                    const sStat = {
                        hp: stat.hp ? Math.ceil((stat.hp * 1.1).toFixed(1)) : stat.hp,
                        attack: stat.attack
                            ? Math.ceil((stat.attack * 1.1).toFixed(1))
                            : stat.attack,
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
                    const extraData = this.extraData.find((p) => p.id == poke.i)
                    return {
                        id: poke.i,
                        name: poke.n,
                        names: {
                            en: poke.en,
                        },
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
                        ...(extraData && { img: extraData.img }),
                    }
                })
            }
            return data
            // } catch (e) {
            //     return e
            // }
        },
        async actionGetFeatures() {
            const { data } = await getFeatures()
            this.features = data.value
        },
        async actionReportFeatures(params) {
            const { data } = await reportFeatures(params)
            return data
        },
        async actionGetPokeCards(params) {
            const { data } = await getPokeCards(params)
            return data
        },
        async actionGetGradeCardUseMap() {
            const { data } = await getGradeCardUseMap()
            this.gradeCardUsesOnline = data?.value?.map((gradeCard) => {
                return {
                    poke: this.pokedex[gradeCard.i],
                    gradeCards: gradeCard.g.map((use) => ({
                        cards: use.c.map((cardId) => this.gradeCards[cardId]),
                        checked: use.k === 1,
                        level: use.l,
                    })),
                }
            })
        },
    },
})
