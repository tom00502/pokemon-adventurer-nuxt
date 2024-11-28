import { defineStore } from 'pinia'
import { usePokedexStore } from '@/stores/pokedex'
import pokeMap from '@/assets/json/pokeMap.json'
const { getPokeMap } = useApi()
// const areaNameToEn = {
//     '29號道路白天': 'Route 29 Day',
//     '29號道路夜晚': 'Route 29 Night',
//     桐樹林白天: 'Ilex Forest Day',
//     桐樹林夜晚: 'Ilex Forest Night',
//     '30號道路白天': 'Route 30 Day',
//     '30號道路夜晚': 'Route 30 Night',
//     '31號道路白天': 'Route 31 Day',
//     '31號道路夜晚': 'Route 31 Night',
//     呆呆獸之井: 'Slowpoke Well',
//     '32號道路白天': 'Route 32 Day',
//     '32號道路夜晚': 'Route 32 Night',
//     幕緣鎮白天: 'Muyuan Town Day',
//     幕緣鎮夜晚: 'Muyuan Town Night',
//     互連洞南白天: "Union Cave 'S Day",
//     互連洞南夜晚: "Union Cave 'S Night",
//     '33號道路白天': 'Route 33 Day',
//     '33號道路夜晚': 'Route 33 Night',
//     自然公園白天: 'Nature Park Day',
//     自然公園夜晚: 'Nature Park Night',
//     '35號道路白天': 'Route 35 Day',
//     '35號道路夜晚': 'Route 35 Night',
//     '41號水路白天': 'Route 41 Day',
//     '41號水路夜晚': 'Route 41 Night',
//     漩渦列島北白天: "Whirl Islands 'N Day",
//     漩渦列島北夜晚: "Whirl Islands 'N Night",
//     '40號道路白天': 'Route 40 Day',
//     '40號道路夜晚': 'Route 40 Night',
//     石英洞穴1F: 'Indigo Cave 1F',
//     石英洞穴2F: 'Indigo Cave 2F',
//     石英洞穴3F: 'Indigo Cave 3F',
//     石英洞穴4F: 'Indigo Cave 4F',
//     石英高原南白天: "Indigo Plateau 'S Day",
//     石英高原南夜晚: "Indigo Plateau 'S Night",
//     石英高原北白天: "Indigo Plateau 'N Day",
//     石英高原北夜晚: "Indigo Plateau 'N Night",
//     石英高原東白天: "Indigo Plateau 'E Day",
//     石英高原東夜晚: "Indigo Plateau 'E Night",
//     桐樹林東白天: 'Ilex Forest East Day',
//     桐樹林東夜晚: 'Ilex Forest East Night',
//     '36號道路白天': 'Route 36 Day',
//     '36號道路夜晚': 'Route 36 Night',
//     '37號道路白天': 'Route 37 Day',
//     '37號道路夜晚': 'Route 37 Night',
//     白銀山1F: 'Mt. Silver 1F',
//     白銀山2F: 'Mt. Silver 2F',
//     白銀山東白天: 'Mt. Silver East Day',
//     白銀山東夜晚: 'Mt. Silver East Night',
//     白銀山南白天: 'Mt. Silver South Day',
//     白銀山南夜晚: 'Mt. Silver South Night',
//     '1號道路白天': 'Route 1 Day',
//     '1號道路夜晚': 'Route 1 Night',
//     '21號水路(真新鎮下方草叢)': '',
//     '21號水路': '',
//     '20號水路': '',
//     雙子島: '',
//     雙子島地下一層: '',
//     雙子島地下二層: '',
//     雙子島地下三層: '',
//     雙子島地下四層: '',
//     試煉之地1: '',
//     試煉之地2: '',
//     試煉之地3: '',
//     試煉之地4: '',
//     試煉之地5: '',
//     草原狩獵場: '',
//     森林狩獵場: '',
//     岩石狩獵場: '',
//     禦三家之笛: '',
//     GEN1超越之笛: '',
//     GEN1傳說之笛: '',
//     GEN1史詩之笛: '',
//     GEN1稀有之笛: '',
//     GEN2超越之笛: '',
//     GEN2傳說之笛: '',
//     GEN2史詩之笛: '',
//     GEN2稀有之笛: '',
//     GEN3超越之笛: '',
//     GEN3傳說之笛: '',
//     GEN3史詩之笛: '',
//     GEN3稀有之笛: '',
//     GEN4超越之笛: '',
//     GEN4傳說之笛: '',
//     GEN4史詩之笛: '',
//     GEN4稀有之笛: '',
//     GEN5超越之笛: '',
//     GEN5傳說之笛: '',
//     GEN5史詩之笛: '',
//     GEN5稀有之笛: '',
//     GEN6超越之笛: '',
//     GEN6傳說之笛: '',
//     GEN6史詩之笛: '',
//     GEN6稀有之笛: '',
//     精靈扭蛋機GEN1: '',
//     精靈扭蛋機GEN2: '',
//     精靈扭蛋機GEN3: '',
//     精靈扭蛋機GEN4: '',
//     精靈扭蛋機GEN5: '',
//     精靈扭蛋機GEN6: '',
//     友好扭蛋機: '',
//     寶可夢世界: '',
//     幻之寶可夢扭蛋機: '',
//     三聖鳥扭蛋機: '',
//     超夢的逆襲扭蛋機: '',
//     換裝皮卡丘扭蛋機: '',
//     心靈之金扭蛋機: '',
//     三聖獸扭蛋機: '',
//     飛行家的噩夢扭蛋機: '',
//     血翼飛龍扭蛋機: '',
//     空之王者扭蛋機: '',
//     地之魔物扭蛋機: '',
//     水都的守護者扭蛋機: '',
//     天生懶惰扭蛋機: '',
//     三神柱扭蛋機: '',
//     大地與海洋扭蛋機: '',
//     巨金與血翼扭蛋機: '',
//     天地之龍扭蛋機: '',
//     '破格的世界扭蛋機、噩夢神扭蛋機': '',
//     '時間之神扭蛋機、空間之神扭蛋機': '',
//     神柱王來襲扭蛋機: '',
//     阿爾宙斯扭蛋機: '',
//     白英雄扭蛋機: '',
//     暗黑與焰白扭蛋機: '',
//     傳說的三雲神扭蛋機: '',
//     礦國的公主扭蛋機: '',
//     光環的超魔神扭蛋機: '',
//     Y神扭蛋機: '',
//     Z神扭蛋機: '',
// }
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
            const locale = useNuxtApp().$i18n.locale.value
            return this.pokeMaps
            // if (locale === 'en') {
            //     return this.pokeMaps.map((map) => {
            //         return {
            //             ...map,
            //             name: areaNameToEn[map.name],
            //         }
            //     })
            // } else {
            //     return this.pokeMaps
            // }
        },
    },
    actions: {
        async getDistributions() {
            const locale = useNuxtApp().$i18n.locale.value
            if (this.pokeMaps.length === 0) {
                // const data = await getPokeMap()
                const data = pokeMap
                this.pokeMaps = data.map((area) => {
                    const pokes = area.pokes.map((poke) => ({
                        ...usePokedexStore().pokedex[poke],
                    }))
                    const name = locale === 'en' ? area.areaNameEn : area.areaName
                    return { name, type: area.type, pokes }
                })
            }
        },
    },
})
