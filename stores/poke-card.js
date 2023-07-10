import { defineStore } from 'pinia'
import { usePokedexStore } from './pokedex'
import pokedexRef from '@/assets/json/pokedexRef.json'
const { getPokeCards } = useApi()
export const usePokeCardStore = defineStore({
    id: 'usePokeCardStore',
    state: () => ({
        pokeCards: [],
    }),
    getters: {},
    actions: {
        async actionGetPokeCards(params) {
            const { data } = await getPokeCards(params)
            const pokedexStore = usePokedexStore()
            const cards = toRaw(data.value)
            this.pokeCards = cards.map((pokeCard) => {
                const pokemon = pokedexStore.pokedex[pokeCard.p]
                return {
                    id: pokeCard.id,
                    title: pokeCard.t,
                    pokeId: pokeCard.p,
                    poke: pokemon,
                    moves: pokeCard.m,
                    natureId: pokeCard.n,
                    itemId: pokeCard.i,
                    abilityId: pokeCard.a,
                    hp: pokeCard.b[0],
                    attack: pokeCard.b[1],
                    defense: pokeCard.b[2],
                    sAttack: pokeCard.b[3],
                    sDefense: pokeCard.b[4],
                    speed: pokeCard.b[5],
                    description: pokeCard.d,
                    creator: pokeCard.c,
                    createTime: pokeCard.ct,
                    type: pokeCard.ty,
                    reincarnated: pokeCard.r,
                    reference:
                        pokedexRef.find(
                            (poke) =>
                                poke.zukan_id === pokemon.zukanId &&
                                poke.zukan_sub_id === pokemon.zukanSubId
                        ) || {},
                }
            })
            return data
        },
    },
})
