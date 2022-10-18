import { defineStore } from 'pinia'
const { getPokedex } = useApi()
// import api from '@/libs/api'
export const usePokedexStore = defineStore({
    id: 'usePokedexStore',
    state: () => ({
        pokes: [],
    }),
    getters: {
        doubleCount: (state) => state.counter * 2,
    },
    actions: {
        async getPokedex() {
            const quality = {
                n: 'normal',
                r: 'rare',
                e: 'epic',
                l: 'legend',
                b: 'beyond',
            }
            const { data } = await getPokedex()
            const entries = data.value.map((poke) => {
                return [
                    poke.i,
                    {
                        name: poke.n,
                        attribute: poke.a.filter((attr) => attr),
                        quality: quality[poke.q] || quality[poke.q2],
                        from: poke.f,
                    },
                ]
            })
            const flashEntries = data.value.map((poke) => {
                return [
                    poke.i + 10000,
                    {
                        name: `閃光${poke.n}`,
                        attribute: poke.a.filter((attr) => attr),
                        quality: quality[poke.q2] || quality[poke.q],
                        from: poke.f,
                    },
                ]
            })
            this.pokes = Object.fromEntries([...entries, ...flashEntries])
        },
    },
})
