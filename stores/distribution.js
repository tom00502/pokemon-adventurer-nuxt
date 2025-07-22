import { defineStore } from 'pinia'
import { usePokedexStore } from '@/stores/pokedex'
import pokeMap from '@/assets/json/pokeMap.json'
export const useDistributionStore = defineStore({
    id: 'useDistributionStore',
    state: () => ({
        pokeMaps: [],
    }),
    getters: {
        // 地圖類型多語系對照
        mapTypeTranslations() {
            return {
                草叢: {
                    en: 'Grass',
                    ja: '草むら',
                },
                試煉之地: {
                    en: 'Road of trial',
                    ja: '試練の地',
                },
                狩獵場: {
                    en: 'Safari',
                    ja: 'サファリ',
                },
                召喚笛: {
                    en: 'Flute',
                    ja: '笛',
                },
                精靈扭蛋機: {
                    en: 'Pokemon Gashapon Machine',
                    ja: 'ポケモンガチャマシン',
                },
                寶可夢世界: {
                    en: 'Pokemon World',
                    ja: 'ポケモンワールド',
                },
                主題扭蛋機: {
                    en: 'Special Gashapon Machine',
                    ja: 'スペシャルガチャマシン',
                },
            }
        },

        // 根據當前語系轉換地圖類型
        getterPokeMapTypes() {
            const locale = useNuxtApp().$i18n.locale.value
            return [
                ...new Set(
                    this.pokeMaps.map((map) => {
                        if (locale === 'zh') return map.type
                        return this.mapTypeTranslations[map.type]?.[locale] || map.type
                    })
                ),
            ]
        },

        // 根據當前語系轉換地圖資料
        getterPokeMaps() {
            const locale = useNuxtApp().$i18n.locale.value
            return this.pokeMaps.map((area) => {
                const name = this.getLocalizedAreaName(area, locale)
                const type = this.getLocalizedMapType(area.type, locale)
                return { ...area, name, type }
            })
        },
    },
    actions: {
        async getDistributions() {
            if (this.pokeMaps.length === 0) {
                const data = pokeMap
                this.pokeMaps = data.map((area) => {
                    const pokes = area.pokes.map((poke) => ({
                        ...usePokedexStore().pokedex[poke],
                    }))
                    return {
                        ...area,
                        pokes,
                    }
                })
            }
        },

        // 輔助方法：取得本地化區域名稱
        getLocalizedAreaName(area, locale) {
            switch (locale) {
                case 'en':
                    return area.areaNameEn || area.areaName
                case 'ja':
                    return area.areaNameJa || area.areaName
                default:
                    return area.areaName
            }
        },

        // 輔助方法：取得本地化地圖類型
        getLocalizedMapType(type, locale) {
            if (locale === 'zh') return type
            return this.mapTypeTranslations[type]?.[locale] || type
        },
    },
})
