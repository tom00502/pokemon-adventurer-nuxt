import { defineStore } from 'pinia'
import { ref, computed, shallowRef } from 'vue'
import _gradeCards from '@/assets/json/gradeCards.json'
import features from '@/assets/json/features.json'
import moves from '@/assets/json/moves.json'
import fetters from '@/assets/json/fetters.json'
import cardPattens from '@/assets/json/cardPattens.json'
import _gradeCardUsesSimplify from '@/assets/json/gradeCardUsesSimplify.json'
import _pokedex from '@/assets/json/pokedex.json'
import pokemonNames from '@/assets/json/pokemonNames.json'
import { useNuxtApp } from '#app'

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
export const usePokedexStore = defineStore('usePokedexStore', () => {
    // State
    const pokes = shallowRef([])
    const _features = ref(features)
    const _moves = ref(moves)
    const attributes = ref([
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
    ])
    const extraData = ref([
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
    ])
    const gradeCards = ref(
        Object.fromEntries(
            _gradeCards.map((item) => [
                item.i,
                {
                    id: item.i,
                    name: item.n,
                    quality: item.q,
                    from: item.f?.split(','),
                    index: item.d,
                },
            ])
        )
    )
    const gradeCardUsesOnline = ref([])

    // Get API functions
    const { getPokedex, getFeatures, reportFeatures, getPokeCards, getGradeCardUseMap } = useApi()

    // Getters - Define showFeatures and showMoves first as they're used by other getters
    const showFeatures = computed(() => {
        const locale = useNuxtApp().$i18n.locale.value

        return _features.value.map((feature) => {
            return {
                ...feature,
                name: feature.name?.[locale] || feature.name?.en || feature.name?.zh || '',
                descript:
                    feature.descript?.[locale] ||
                    feature.descript?.en ||
                    feature.descript?.zh ||
                    '',
            }
        })
    })

    const showMoves = computed(() => {
        const locale = useNuxtApp().$i18n.locale.value
        const { typeTwToEn, typeZhToJa } = usePokeTypes()
        const { moveCategoryTwToEn } = useCommons()
        const localeMoves = _moves.value.filter((move) => move.active)

        return localeMoves.map((move) => {
            let type = move.type
            let typeKey = typeTwToEn[move.type]
            if (locale === 'en') {
                type = typeTwToEn[move.type]
            } else if (locale === 'ja') {
                type = typeZhToJa[move.type] || move.type
            }
            return {
                ...move,
                name: move.name?.[locale] || move.name?.en || move.name?.zh || '',
                type,
                typeKey,
                descript: move.descript?.[locale] || move.descript?.en || move.descript?.zh || '',
                power: move.power === '變化' ? '—' : move.power,
                accuracy: move.accuracy === '變化' ? '—' : move.accuracy,
                category: moveCategoryTwToEn[move.category] || move.category,
            }
        })
    })

    const pokedex = computed(() => {
        const locale = useNuxtApp().$i18n.locale.value
        const { typeTwToEn, typeZhToJa } = usePokeTypes()

        // 統一的名稱轉換函數
        const getLocalizedName = (poke, isShiny = false) => {
            const localizedName = pokemonNames[poke.id]?.[locale] || poke.name
            if (isShiny) {
                switch (locale) {
                    case 'en':
                        return `Shiny ${localizedName}`
                    case 'ja':
                        return `色違い${localizedName}`
                    default:
                        return `閃光${localizedName}`
                }
            }
            return localizedName
        }

        // 統一的屬性轉換函數
        const getLocalizedAttributes = (attributes) => {
            switch (locale) {
                case 'en':
                    return attributes.map((attr) => typeTwToEn[attr])
                case 'ja':
                    return attributes.map((attr) => typeZhToJa[attr] || attr)
                default:
                    return attributes
            }
        }

        // 處理一般精靈
        const entries = pokes.value.map((poke) => [
            poke.id,
            {
                ...poke,
                name: getLocalizedName(poke),
                attribute: getLocalizedAttributes(poke.attribute),
            },
        ])

        // 處理閃光精靈
        const flashEntries = pokes.value.map((poke) => [
            poke.id + 10000,
            {
                ...poke,
                name: getLocalizedName(poke, true),
                attribute: getLocalizedAttributes(poke.attribute),
            },
        ])

        return Object.fromEntries([...entries, ...flashEntries])
    })

    const movedex = computed(() => {
        const entries = showMoves.value.map((move) => {
            return [move.id, move]
        })
        return Object.fromEntries(entries)
    })

    const abilitydex = computed(() => {
        const entries = showFeatures.value.map((ability) => {
            return [ability.id, ability]
        })
        return Object.fromEntries(entries)
    })

    const showAbilities = computed(() => {
        return showFeatures.value.filter((feature) => feature.cost)
    })

    const abilityPokes = computed(() => (featureId) => {
        return pokes.value.filter((poke) => poke.features.includes(featureId))
    })

    const movePokes = computed(() => (moveId) => {
        return pokes.value.filter((poke) => poke.moves.includes(moveId))
    })

    const learnMovePokes = computed(() => (moveId) => {
        return pokes.value.filter((poke) => poke.learnMoves.includes(moveId))
    })

    const gradeCardUses = computed(() => {
        if (pokes.value.length === 0) return []
        if (gradeCardUsesOnline.value.length > 0) return gradeCardUsesOnline.value
        return _gradeCardUsesSimplify.map((gradeCard) => {
            return {
                poke: pokedex.value[gradeCard.i] || {},
                gradeCards: gradeCard.g.map((use) => ({
                    cards: cardPattens[use.c].split(',').map((cardId) => {
                        const card = gradeCards.value[cardId]
                        return {
                            ...card,
                            name: pokedex.value[card.index]?.name || card.name,
                        }
                    }),
                    checked: use.k === 1,
                    level: use.l,
                    groupKey: use.c,
                })),
                pokeGroupKey: gradeCard.g.map((use) => use.c).join(','),
            }
        })
    })

    const localePokemons = computed(() => {
        const locale = useNuxtApp().$i18n.locale.value
        const { typeTwToEn, typeZhToJa } = usePokeTypes()

        return pokes.value.map((poke) => {
            const localizedName = pokemonNames[poke.id]?.[locale] || poke.name
            let localizedTypes

            switch (locale) {
                case 'en':
                    localizedTypes = poke.attribute.map((attr) => typeTwToEn[attr])
                    break
                case 'ja':
                    localizedTypes = poke.attribute.map((attr) => typeZhToJa[attr] || attr)
                    break
                default:
                    localizedTypes = poke.attribute
            }

            return {
                ...poke,
                name: localizedName,
                types: localizedTypes,
            }
        })
    })

    // Actions
    async function actionGetPokedex() {
        const { typeTwToEn } = usePokeTypes()
        const quality = {
            n: 'normal',
            r: 'rare',
            e: 'epic',
            l: 'legend',
            b: 'beyond',
        }
        const data = await getPokedex()
        if (data) {
            pokes.value = data.map((poke) => {
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
                const _extraData = extraData.value.find((p) => p.id == poke.i)
                return {
                    id: poke.i,
                    name: poke.n,
                    attribute: poke.a.filter((attr) => attr),
                    types: poke.a.filter((attr) => attr).map((type) => typeTwToEn[type]),
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
                    ...(_extraData && { img: _extraData.img }),
                    rebirthable: poke.r === 1,
                }
            })
        }
        return data
    }

    async function actionGetFeatures() {
        const { data } = await getFeatures()
        _features.value = data.value
    }

    async function actionReportFeatures(params) {
        const { data } = await reportFeatures(params)
        return data
    }

    async function actionGetPokeCards(params) {
        const { data } = await getPokeCards(params)
        return data
    }

    async function actionGetGradeCardUseMap() {
        const { data } = await getGradeCardUseMap()
        gradeCardUsesOnline.value = data?.value?.map((gradeCard) => {
            return {
                poke: pokedex.value[gradeCard.i],
                gradeCards: gradeCard.g.map((use) => ({
                    cards: use.c.map((cardId) => gradeCards.value[cardId]),
                    checked: use.k === 1,
                    level: use.l,
                })),
            }
        })
    }

    return {
        // State
        pokes,
        pokemonNames,
        features: _features,
        moves: _moves,
        attributes,
        extraData,
        gradeCards,
        gradeCardUsesOnline,
        // Getters
        pokedex,
        movedex,
        abilitydex,
        showAbilities,
        showFeatures,
        showMoves,
        abilityPokes,
        movePokes,
        learnMovePokes,
        gradeCardUses,
        localePokemons,
        // Actions
        actionGetPokedex,
        actionGetFeatures,
        actionReportFeatures,
        actionGetPokeCards,
        actionGetGradeCardUseMap,
    }
})
