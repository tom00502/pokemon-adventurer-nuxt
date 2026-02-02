import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usePokedexStore } from '@/stores/pokedex'
import pokeMap from '@/assets/json/pokeMap.json'

export const useDistributionStore = defineStore('useDistributionStore', () => {
    // state
    const pokeMaps = ref([])

    // getters
    // 地圖類型多語系對照
    const mapTypeTranslations = computed(() => ({
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
    }))

    // 根據當前語系轉換地圖類型
    const getterPokeMapTypes = computed(() => {
        const locale = useNuxtApp().$i18n.locale.value
        return [
            ...new Set(
                pokeMaps.value.map((map) => {
                    if (locale === 'zh') return map.type
                    return mapTypeTranslations.value[map.type]?.[locale] || map.type
                })
            ),
        ]
    })

    // 根據當前語系轉換地圖資料
    const getterPokeMaps = computed(() => {
        const locale = useNuxtApp().$i18n.locale.value
        return pokeMaps.value.map((area) => {
            const name = getLocalizedAreaName(area, locale)
            const type = getLocalizedMapType(area.type, locale)
            return { ...area, name, type }
        })
    })

    // actions
    async function getDistributions() {
        if (pokeMaps.value.length === 0) {
            const data = pokeMap
            pokeMaps.value = data.map((area) => {
                const pokes = area.pokes.map((poke) => ({
                    ...usePokedexStore().pokedex[poke],
                }))
                return {
                    ...area,
                    pokes,
                }
            })
        }
    }

    // 輔助方法：取得本地化區域名稱
    function getLocalizedAreaName(area, locale) {
        switch (locale) {
            case 'en':
                return area.areaNameEn || area.areaName
            case 'ja':
                return area.areaNameJa || area.areaName
            default:
                return area.areaName
        }
    }

    // 輔助方法：取得本地化地圖類型
    function getLocalizedMapType(type, locale) {
        if (locale === 'zh') return type
        return mapTypeTranslations.value[type]?.[locale] || type
    }

    return {
        // state
        pokeMaps,
        // getters
        mapTypeTranslations,
        getterPokeMapTypes,
        getterPokeMaps,
        // actions
        getDistributions,
        getLocalizedAreaName,
        getLocalizedMapType,
    }
})
