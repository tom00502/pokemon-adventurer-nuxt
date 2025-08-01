import { useI18n } from 'vue-i18n'
export default function () {
    const { locale } = useI18n()
    const _categories = [
        {
            name: '熱門功能',
            category: 'hot',
            routes: [
                {
                    path: '/redeem-code',
                    name: 'redeem-code',
                    title: '兌換碼',
                    descript: '大家最需要的功能不解釋',
                    category: 'hot',
                },
                {
                    path: '/pokoQA',
                    name: 'pokoQA',
                    title: '寶可問答',
                    descript: '每日中午的寶可問答，所有題目的解答快速查詢。',
                    category: 'hot',
                    nameEn: 'Pokémon Q&A',
                    descriptEn:
                        'Quickly query the answers to all questions in the daily Pokémon Q&A at noon!',
                },
                {
                    path: '/field-investigation',
                    name: 'fieldInvestigation',
                    title: '田野調查',
                    descript: '查詢所有田野調查任務能獲得的獎賞，還有連續7天完成任務已知獎勵',
                    category: 'hot',
                    nameEn: 'Field Investigation',
                    descriptEn:
                        'Query all field investigation tasks for their rewards, as well as the known rewards for completing tasks for seven consecutive days!',
                },
                {
                    path: '/pokedex',
                    name: 'pokedex',
                    title: '精靈圖鑑',
                    descript: '可利用名稱,招式,特性,種族值快速查詢符合條件的精靈',
                    category: 'hot',
                    nameEn: 'Pokédex',
                    descriptEn:
                        'You can quickly search for Pokémon that meet specific criteria using their name, moves, abilities, and base stats.',
                },
            ],
        },
        {
            name: '精靈資訊',
            category: 'information',
            routes: [
                {
                    path: '/pokedex',
                    name: 'pokedex',
                    title: '精靈圖鑑',
                    descript: '可利用名稱,招式,特性,種族值快速查詢符合條件的精靈',
                    category: 'information',
                    nameEn: 'Pokédex',
                    descriptEn:
                        'You can quickly search for Pokémon that meet specific criteria using their name, moves, abilities, and base stats.',
                },
                {
                    path: '/pokeCard',
                    name: 'pokeCard',
                    title: '精靈卡匣',
                    descript: '查看大家的精靈配置分享，也可以製作專屬精靈卡',
                    category: 'information',
                },
                {
                    path: '/move',
                    name: 'move',
                    title: '精靈招式',
                    descript: '可查詢特定精靈可學的招式，也可查詢特定招式有哪些精靈可以學',
                    category: 'information',
                    nameEn: 'Moves',
                    descriptEn:
                        'You can check which moves each Pokémon can learn, and also see which Pokémon can learn specific moves.',
                },
                {
                    path: '/ability',
                    name: 'ability',
                    title: '精靈特性',
                    descript: '可查詢特定精靈可學的特性，也可查詢特定特性有哪些精靈可以學',
                    category: 'information',
                    nameEn: 'Abilities',
                    descriptEn:
                        'You can check which abilities each Pokémon can learn, and also see which Pokémon can learn specific abilities.',
                },
                {
                    path: '/types',
                    name: 'types',
                    title: '屬性剋制',
                    descript: '可查詢屬性間的剋制關係',
                    category: 'information',
                },
                {
                    path: '/gradeCard',
                    name: 'gradeCard',
                    title: '升品卡牌',
                    descript: '可查詢特定精靈升品所需的卡牌，也可查詢特定卡牌有哪些精靈需要',
                    category: 'information',
                    nameEn: 'Grade Card',
                    descriptEn:
                        'You can check the cards required for a specific Pokémon to upgrade, and also see which Pokémon need specific cards.',
                },
                {
                    path: '/character',
                    name: 'character',
                    title: '性格列表',
                    descript: '查詢各種性格對精靈的影響',
                    category: 'information',
                },
                {
                    path: '/fetter',
                    name: 'fetter',
                    title: '羈絆之心',
                    descript: '查詢精靈的羈絆效果',
                    category: 'information',
                },
            ],
        },
        {
            name: '精靈捕捉',
            category: 'capture',
            routes: [
                {
                    path: '/distribution',
                    name: 'distribution',
                    title: '尋寵地圖',
                    descript: '收錄各地區出沒的精靈，快速找到想抓的精靈，開圖鑑捉寵必備神器!!',
                    category: 'capture',
                    nameEn: 'Pokémon Radar',
                    descriptEn:
                        'Quickly find the Pokémon you want to catch by recording the Pokémon that appear in each area. The essential artifact for catching Pokémon!',
                    nameJa: 'ポケモンレーダー',
                    descriptJa:
                        '各地域に出現するポケモンを記録し、捕まえたいポケモンを素早く見つけることができます。図鑑完成とポケモン捕獲の必須ツール！',
                },
                {
                    path: '/flute',
                    name: 'flute',
                    title: '召喚笛子',
                    descript: '查詢各種召喚笛能召喚到哪些精靈',
                    category: 'capture',
                },
                {
                    path: '/hunting',
                    name: 'hunting',
                    title: '狩獵場',
                    descript: '查詢狩獵場各地圖能遇到哪些精靈',
                    category: 'capture',
                },
            ],
        },
        {
            name: '寶可攻略',
            category: 'raider',
            routes: [
                {
                    path: '/pokoQA',
                    name: 'pokoQA',
                    title: '寶可問答',
                    descript: '每日中午的寶可問答，所有題目的解答快速查詢。',
                    category: 'raider',
                    nameEn: 'Pokémon Q&A',
                    descriptEn:
                        'Quickly query the answers to all questions in the daily Pokémon Q&A at noon!',
                },
                {
                    path: '/field-investigation',
                    name: 'fieldInvestigation',
                    title: '田野調查',
                    descript: '查詢所有田野調查任務能獲得的獎賞，還有連續7天完成任務已知獎勵',
                    category: 'raider',
                    nameEn: 'Field Investigation',
                    descriptEn:
                        'Query all field investigation tasks for their rewards, as well as the known rewards for completing tasks for seven consecutive days!',
                },
                {
                    path: '/redeem-code',
                    name: 'redeem-code',
                    title: '兌換碼',
                    descript: '大家最需要的功能不解釋',
                    category: 'raider',
                },
                {
                    path: '/timepiece',
                    name: 'timepiece',
                    title: '遊戲時鐘',
                    descript: '顯示當前遊戲時間、活動開啟或關閉時間，還有倒數功能。',
                    category: 'raider',
                    nameEn: 'Timepiece',
                    descriptEn:
                        'The timepiece is a tool that can help you to know the game time, the time to open or close the event, the time to change the day or night. It also provides the countdown function.',
                },
                {
                    path: '/candy',
                    name: 'candy',
                    title: '親密糖果',
                    descript: '親密糖果餵食攻略',
                    category: 'raider',
                },
                {
                    path: '/candySearch',
                    name: 'candySearch',
                    title: '糖果分佈',
                    descript: '親密糖果取得攻略',
                    category: 'raider',
                },
                {
                    path: '/candyValue',
                    name: 'candyValue',
                    title: '親密查表',
                    descript: '查詢餵食親密糖果鑑定後能提升多少素質',
                    category: 'raider',
                },
                {
                    path: '/guild',
                    name: 'guild',
                    title: '公會備戰',
                    descript: '公會備戰各精靈所在的草叢查詢',
                    category: 'raider',
                    nameEn: 'Guild War',
                    descriptEn: 'This is a Pokémon distribution table for guild war',
                },
                {
                    path: '/badges',
                    name: 'badges',
                    title: '道館徽章',
                    descript: '道館徽章效果介紹',
                    category: 'raider',
                },
                {
                    path: '/heldItem',
                    name: 'heldItem',
                    title: '攜帶物',
                    descript: '介紹精靈攜帶物效果與攜帶物升級資訊',
                    category: 'raider',
                },
            ],
        },
        {
            name: '功能模擬',
            category: 'simulation',
            routes: [
                {
                    path: '/rebirth',
                    name: 'rebirth',
                    title: '轉生模擬',
                    descript: '練習轉生寶石的鑲嵌，還有懶人套餐可以選擇，一秒成為轉生專家！！',
                    category: 'simulation',
                    nameEn: 'Rebirth Simulator',
                    descriptEn:
                        'Practice the inlay of rebirth gems, and there are lazy packages to choose from, become a rebirth expert in one second!',
                },
                {
                    path: '/star',
                    name: 'star',
                    title: '升星計算',
                    descript: '透過升星計算機了解精靈還需要多少經驗',
                    category: 'simulation',
                    nameEn: 'Star Calculator',
                    descriptEn:
                        'Understand how much experience the pokemon still needs through the star calculator',
                },
                {
                    path: '/refinement',
                    name: 'refinement',
                    title: '洗練模擬',
                    descript: '洗練小遊戲，另可查詢膠囊取特列表',
                    category: 'simulation',
                },
            ],
        },
        {
            name: '其他',
            category: 'other',
            routes: [
                {
                    path: '/about',
                    name: 'about',
                    title: '關於本站',
                    descript: '關於本站',
                    category: 'other',
                    nameEn: 'About',
                    descriptEn: 'About',
                    nameJa: 'このサイトについて',
                    descriptJa: 'このサイトについて',
                },
                {
                    path: '/setting',
                    name: 'setting',
                    title: '設定',
                    descript: '設定',
                    category: 'other',
                    nameEn: 'Setting',
                    descriptEn: 'Setting',
                    nameJa: '設定',
                    descriptJa: '設定',
                },
            ],
        },
    ]
    const routers = [
        {
            path: '/',
            name: 'home',
            title: 'home',
        },
    ]
    const categories = computed(() => {
        if (locale.value === 'en') {
            return _categories.map((category) => {
                return {
                    ...category,
                    name: category.category,
                    routes: category.routes
                        .filter((route) => route.nameEn)
                        .map((route) => {
                            return {
                                ...route,
                                title: route.nameEn,
                                descript: route.descriptEn,
                            }
                        }),
                }
            })
        } else if (locale.value === 'ja') {
            return _categories.map((category) => {
                return {
                    ...category,
                    name: category.category,
                    routes: category.routes
                        .filter((route) => route.nameJa)
                        .map((route) => {
                            return {
                                ...route,
                                title: route.nameJa,
                                descript: route.descriptJa,
                            }
                        }),
                }
            })
        } else {
            return _categories
        }
    })
    return {
        routers,
        categories,
    }
}
