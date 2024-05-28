import { useI18n } from 'vue-i18n'
export default function () {
    const { locale } = useI18n()
    const _routers = [
        {
            path: '/',
            name: 'home',
            title: 'home',
            nameEn: 'home',
        },
        {
            path: '/pokoQA',
            name: 'pokoQA',
            title: '寶可問答',
            nameEn: 'Pokémon Q&A',
        },
        {
            path: '/field-investigation',
            name: 'fieldInvestigation',
            title: '田野調查',
            nameEn: 'Field Investigation',
        },
        {
            path: '/pokedex',
            name: 'pokedex',
            title: '精靈圖鑑',
        },
        {
            path: '/pokeCard',
            name: 'pokeCard',
            title: '精靈卡匣',
        },
        {
            path: '/move',
            name: 'move',
            title: '精靈招式',
        },
        {
            path: '/ability',
            name: 'ability',
            title: '精靈特性',
            nameEn: 'Abilities',
        },
        {
            path: '/types',
            name: 'types',
            title: '屬性剋制',
        },
        {
            path: '/gradeCard',
            name: 'gradeCard',
            title: '升品卡牌',
        },
        {
            path: '/hunting',
            name: 'hunting',
            title: '狩獵場',
        },
        {
            path: '/guild',
            name: 'guild',
            title: '公會備戰',
        },
        {
            path: '/flute',
            name: 'flute',
            title: '召喚笛子',
        },
        {
            path: '/distribution',
            name: 'distribution',
            title: '尋寵地圖',
        },
        {
            path: '/rebirth',
            name: 'rebirth',
            title: '轉生模擬',
            nameEn: 'Rebirth Simulator',
        },
        {
            path: '/refinement',
            name: 'refinement',
            title: '洗練模擬',
        },
        {
            path: '/star',
            name: 'star',
            title: '升星計算',
            nameEn: 'Star Calculator',
        },
        {
            path: '/character',
            name: 'character',
            title: '性格列表',
        },
        {
            path: '/redeem-code',
            name: 'redeem-code',
            title: '兌換碼',
        },
        {
            path: '/fetter',
            name: 'fetter',
            title: '羈絆之心',
        },
        {
            path: '/candy',
            name: 'candy',
            title: '親密糖果',
        },
        {
            path: '/candySearch',
            name: 'candySearch',
            title: '糖果分佈',
        },
        {
            path: '/candyValue',
            name: 'candySearch',
            title: '親密查表',
        },
        {
            path: '/badges',
            name: 'badges',
            title: '道館徽章',
        },
        {
            path: '/heldItem',
            name: 'heldItem',
            title: '攜帶物',
        },
        {
            path: '/about',
            name: 'about',
            title: '關於本站',
        },
    ]
    const routers = computed(() => {
        if (locale.value === 'en') {
            return _routers
                .filter((router) => router.nameEn)
                .map((router) => {
                    return { ...router, title: router.nameEn }
                })
        }
        return _routers
    })
    return {
        routers,
    }
}
