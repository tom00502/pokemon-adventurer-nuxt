<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
useHead({
    title: '寶可問答',
})
const tableZh = {
    口袋怪獸: [
        { question: '以下HP不同於其他三只的是?', answer: '叉字蝠' },
        { question: '以下物攻不同於其他三只的是?', answer: '暴鲤龙' },
        { question: '以下物防不同於其他三只的是?', answer: '沙河马' },
        { question: '以下特攻不同於其他三只的是?', answer: '猎斑鳗' },
        { question: '以下特防不同於其他三只的是?', answer: '摇篮百合' },
        { question: '以下速度不同於其他三只的是?', answer: '爱心鱼' },
        { question: '以下絕招中威力不同於其他三只的是?', answer: '瓦割' },
        { question: '以下絕招中初始PP不同於其他三只的是?', answer: '起风' },
        { question: '以下絕招中命中不同於其他三只的是?', answer: '岩石封杀' },
        { question: '口袋妖怪中，總共有多少種屬性?', answer: '18' },
        { question: '下麵沒有隨身攜帶物品的神奇寶貝是?', answer: '可達鴨' },
        {
            question: '已知小磁怪的體蟲為6千克，那三合一磁怪的體重是多少?',
            answer: '60',
        },
        { question: '以下不屬於舊版四大物盾的是?', answer: '大钢蛇' },
        {
            question: '圖圖犬、咩利羊、呆呆獸、電龍的尾巴末端分別是什麼顏色?',
            answer: '绿、橘、白、红',
        },
        { question: '以下四只口袋妖怪裏，誰最重?', answer: '古拉顿' },
        {
            question: '那只精靈的體溫比太陽表面的溫度還要高?',
            answer: '熔岩蜗牛',
        },
        { question: '以下種族值為600是?', answer: '梦幻' },
        { question: '光合作用，在大晴天時回復HP最大值的?', answer: '2/3' },
        { question: '光合作用，在無天氣時回復HP最大值的?', answer: '1/2' },
        {
            question: '光合作用，在沙暴、冰雹、下雨、大雨或霧天氣下，回復自己最大HP的',
            answer: '1/4',
        },
        { question: '以下最適合速攻的是?', answer: '化石翼龙' },
        { question: '雷吉洛克有幾只眼睛?', answer: '7只' },
        { question: '皮卡丘是屬於什麼系的寶可夢?', answer: '電系' },
        {
            question: '噴火龍被隆隆岩用原始力量，則原始力量的實際威力是?',
            answer: '360',
        },
        { question: '小火龍是第幾世代的寶可夢?', answer: '第一世代' },
        { question: '木守宮是第幾世代的寶可夢?', answer: '第三世代' },
        { question: '卡拉卡拉頭上戴著的是誰的頭骨?', answer: '它的母亲' },
        { question: '圖鑒編號為001的是下麵哪只精靈?', answer: '妙蛙種子' },
    ],
    屬性克制: [
        { question: '普通系克制多少種屬性?', answer: '0' },
        { question: '格鬥系克制多少種屬性?', answer: '5' },
        { question: '火系克制多少種屬性?', answer: '4' },
        { question: '克制鬼蟬的屬性有幾個?', answer: '5' },
        { question: '草系被多少種屬性克制?', answer: '5' },
        { question: '鋼系克制下麵那3種屬性?', answer: '岩石系、冰系、妖精系' },
        { question: '電系克制下麵那2種屬性?', answer: '水系、飞行系' },
        {
            question: '地面系克制屬性的數量和下面哪種屬性一樣多?',
            answer: '格斗系',
        },
        { question: '以下哪種屬性不被格鬥系克制?', answer: '飞行系' },
        { question: '妖精系克制下面哪種屬性?', answer: '格斗系、龙系、恶系' },
        { question: '飛行系克制下麵那3種屬性?', answer: '格斗系、虫系、草系' },
        { question: '草系克制下麵那3種屬性?', answer: '地面系、岩石系、水系' },
        { question: '水系克制下麵那3種屬性?', answer: '地面系、岩石系、火系' },
        { question: '蟲系克制下麵那3種屬性?', answer: '超能力系、草系、恶系' },
        { question: '惡系克制下麵那2中屬性?', answer: '幽灵系、超能力系' },
        { question: '幽靈系克制下麵那2種屬性?', answer: '幽灵系、超能力系' },
        { question: '超能力系克制下麵那2種屬性?', answer: '格斗系、毒系' },
        { question: '毒系克制下麵那2種屬性?', answer: '草系、妖精系' },
        { question: '岩石系克制下麵哪種屬性?', answer: '飞行系' },
        { question: '格鬥系克制下麵哪種屬性?', answer: '冰系' },
        { question: '龍系克制下麵哪種屬性?', answer: '龙系' },
        { question: '岩石系被克制的數量和下面哪種屬性一樣多', answer: '草系' },
        {
            question: '超能力系被下麵那3種屬性克制?',
            answer: '虫系、幽灵系、恶系',
        },
        { question: '惡系被哪3種屬性克制?', answer: '格斗系、虫系、妖精系' },
        {
            question: '鋼系被以下那3種屬性克制?',
            answer: '格斗系、地面系、火系',
        },
        { question: '水系被下麵那2種屬性克制?', answer: '电系、草系' },
        { question: '龍系被下麵那3種屬性克制?', answer: '冰系、龙系、妖精系' },
        {
            question: '火系被下麵那3種屬性克制?',
            answer: '水系、地面系、岩石系',
        },
        { question: '幽靈系被下麵那2種屬性克制?', answer: '幽灵系、恶系' },
        { question: '妖精系被下麵那2種屬性克制?', answer: '毒系、钢系' },
        { question: '普通系被下麵哪種屬性克制?', answer: '格斗系' },
        { question: '以下屬性中被克制最多的屬性是?', answer: '岩石' },
        { question: '以下那3種屬性克制蟲系?', answer: '飞行系、岩石系、火系' },
        {
            question: '以下那3種屬性克制格鬥系?',
            answer: '飞行系、超能力系、妖精系',
        },
        {
            question: '以下那3種屬性克制飛行系?',
            answer: '岩石系、电系、冰系',
        },
        { question: '以下那三種屬性克制地面系?', answer: '水系、草系、冰系' },
        { question: '以下那2種屬性克制毒系?', answer: '地面系、超能力系' },
        { question: '下麵哪種屬性不克制冰系?', answer: '超能力系' },
        { question: '以下那種屬性是不克制草系的?', answer: '普通系' },
        { question: '下麵哪種屬性克制電系?', answer: '地面系' },
        { question: '冰系不克制下麵那種屬性?', answer: '水系' },
        {
            question: '對超能抗性兩倍，並火屬性對其有兩倍效果，該PM屬性為?',
            answer: '钢',
        },
        {
            question:
                '已知某兩個屬性任意混合，且幽靈對其效果兩倍，飛行對其效果兩倍，蟲對其效果減半，則超能對其',
            answer: '正常效果',
        },
        {
            question: '屬性為草+冰，特性厚脂肪，當受到火系傷害係數為?',
            answer: '2',
        },
    ],
    遊戲背景: [
        { question: '下麵不屬於精靈獲得技能方式是?', answer: '華麗大賽' },
        { question: '下麵哪種不屬於精靈的培養方式?', answer: '覺醒' },
        { question: '下麵哪種不是遊戲中的扭蛋機?', answer: '糖果扭蛋機' },
        { question: '下麵哪種方式不是遊戲體力恢復的方式?', answer: '旅館休息' },
        { question: '今日美食每天領取幾次?', answer: '3' },
        { question: '精靈之星主要產出什麼?', answer: '精靈碎片' },
        { question: '四大天王在那個城市召開?', answer: '石英聯盟' },
        { question: '瀕死的精靈可以去哪裡治療?', answer: '精靈中心' },
        { question: '真新鎮在常青市那個方位?', answer: '南方' },
        { question: '那個培養方式是本作特有的?', answer: '轉生' },
        {
            question: '洗練個體值的神奇膠囊可以從那裏獲得?',
            answer: '伊布的宝藏',
        },
        { question: '我們的疲勞可以用來幹什麼?', answer: '捕捉寵物' },
        { question: '挑戰訓練家,每一關,最高為幾星?', answer: '3' },
        { question: 'MEGA石是由什麼碎片合成的?', answer: 'MEGA石碎片' },
        { question: '狩獵場在下面那個城市?', answer: '滿金市' },
        { question: 'MEGA石碎片主要是在那個副本產出?', answer: '聯盟大會' },
        { question: '在野外草叢捕捉寵物，需要消耗?', answer: '疲勞' },
        { question: '扭蛋機中的精靈扭蛋機現有幾個世代?', answer: '6' },
        { question: '巴大蝶可以在下面那個地點捕捉?', answer: '桐樹林' },
        { question: '列車正在維修的是那個市?', answer: '吉花市' },
        { question: '在滿金市開發布會的歌星叫什麼?', answer: '梨香' },
        {
            question: '挑戰精靈訓練家,可以獲得下麵哪種物品?',
            answer: '精靈經驗',
        },
        { question: '下麵哪種途徑不能獲得攜帶物的?', answer: '遠征之路' },
        { question: '精靈有那些途徑獲得經驗?', answer: '選項全對' },
        {
            question: '首沖送的巨鉗螳螂，技能"點到為止"，最適合用來?',
            answer: '捕捉宠物',
        },
    ],
    其他: [
        { question: '皮卡丘是屬於哪位訓練家的精靈?', answer: '小智' },
        { question: '小智的皮卡丘最愛的食物是什麼?', answer: '番茄酱' },
        {
            question: '請問火箭隊出場臺詞中"可愛又迷人的反派腳色"上一句是什麼?',
            answer: '貫徹愛與真實的邪惡',
        },
        { question: '火箭隊中女隊員叫什麼?', answer: '武藏' },
    ],
}
const tableEn = {
    Pokémon: [
        {
            question: 'Which of the following has a different HP from the other three?',
            answer: 'Crobat',
        },
        {
            question: 'Which of the following has a different P.ATK from the other three?',
            answer: 'Gyarados',
        },
        {
            question: 'Which of the following has a different P.DEF from the other three?',
            answer: 'Hippopotas',
        },
        {
            question: 'Which of the following has a different SP.ATK from the other three?',
            answer: 'Huntail',
        },
        {
            question: 'Which of the following has a different SP.DEF from the other three?',
            answer: 'Cradily',
        },
        {
            question: 'Which of the following has a different Speed from the other three?',
            answer: 'Luvdisc',
        },
        {
            question: 'Which of the following has a different Ultimate Power from the other three?',
            answer: 'Brick Break',
        },
        {
            question:
                'In which of the following has a different Ultimate Initial PP from the other three?',
            answer: 'Gust',
        },
        {
            question:
                'Which of the following has a different Ultimate Accuracy from the other three?',
            answer: 'Rock Tomb',
        },
        { question: 'How many types are there for Pokémons', answer: '18' },
        {
            question: 'Which of the following Pokémon has no held item?',
            answer: 'Psyduck',
        },
        {
            question: `Magnemite's body worm is known to be 6 kg, so how much does Magneton weigh?`,
            answer: '60',
        },
        {
            question: 'Which of the following does not belong th the old-version big four shield?',
            answer: 'Steelix',
        },
        {
            question: 'What colors are the tail ends of Smeargle, Mareep, Slowpoke, and Ampharos?',
            answer: 'Green, orange, white, red',
        },
        { question: 'Which of the following four Pokémon is the heaviest?', answer: 'Groudon' },
        {
            question: 'Which Pokémon has a warmer body temperature than the surface of the sun?',
            answer: 'Magcargo',
        },
        { question: 'Which of the following has a race value of 600', answer: 'Mew' },
        {
            question: `What's the maximum of HP can Photosynthesis restore on sunny days?`,
            answer: '2/3',
        },
        {
            question: `What's the maximum of HP can Photosynthesis restore without weather status?`,
            answer: '1/2',
        },
        { question: 'Which of the following is best for a  quick attack?', answer: 'Aerodactyl' },
        { question: 'How many eyes does Regirock have?', answer: '7' },
        { question: 'What type of Pokémon is Pikachu', answer: 'Electric Type' },
        {
            question:
                'When Golem uses Ancient Power to attack Charizard, what is the actual strength of the Ancient Power?',
            answer: '360',
        },
        { question: 'Which generation of Pokémon does Charmander belong to?', answer: 'Gen I' },
        { question: 'Which generation of Pokémon does Treecko belong to?', answer: 'Gen III' },
        { question: 'Whose skull is Cubone wearing on its head?', answer: 'Its mother' },
        { question: 'Which Pokémon below is the Pokédex No.001?', answer: 'Bulbasaur' },
    ],
    'Type restrain': [
        { question: 'How many types does the Normal-type restrain?', answer: '0' },
        { question: 'How many types does the Fighting-type restrain?', answer: '5' },
        { question: 'How many types does the Fire-type restrain?', answer: '4' },
        { question: 'How many types is Shedinja restrained by?', answer: '5' },
        { question: 'How many types is the Grass-type restrained by?', answer: '5' },
        {
            question: 'Which 3 of the following types does the Steel-type restrain?',
            answer: 'Rock type, Ice type, Fairy type',
        },
        {
            question: 'Which 2 of the following types does the Electric-type restrain?',
            answer: 'Water type, Flying type',
        },
        {
            question:
                'Which of the following types restrains as many types as the Ground-type does?',
            answer: 'Fighting type',
        },
        // { question: '以下哪種屬性不被格鬥系克制?', answer: '飞行系' },
        {
            question: 'Which of the following types does the Fairy-type restrain?',
            answer: 'Fighting type, Dragon type, Dark type',
        },
        {
            question: 'Which 3 of the following types does the Flying-type restrain?',
            answer: 'Fighting type, Bug type, Grass type',
        },
        // { question: '草系克制下麵那3種屬性?', answer: '地面系、岩石系、水系' },
        // { question: '水系克制下麵那3種屬性?', answer: '地面系、岩石系、火系' },
        {
            question: 'Which 3 of the following types does the Bug-type restrain?',
            answer: 'Psychic type, Grass type, Dark type',
        },
        // { question: '惡系克制下麵那2中屬性?', answer: '幽灵系、超能力系' },
        {
            question: 'Which 2 of the following types does the Ghost-type restrain?',
            answer: 'Ghost type, Psychic type',
        },
        {
            question: 'Which 2 of the following types does the Psychic-type restrain?',
            answer: 'Fighting type, Poison type',
        },
        {
            question: 'Which 2 of the following types does the Poison-type restrain?',
            answer: 'Gress type, Fairy type',
        },
        {
            question: 'Which of the following types does the Rock-type restrain?',
            answer: 'Flying type',
        },
        {
            question: 'Which of the following types does the Fighting-type restrain?',
            answer: 'Ice type',
        },
        {
            question: 'Which of the following types does the Dragon-type restrain?',
            answer: 'Dragon type',
        },
        {
            question:
                'Which of the following types is restrained as many times as the Rock type is?',
            answer: 'Grass type',
        },
        // {
        //     question: '超能力系被下麵那3種屬性克制?',
        //     answer: '虫系、幽灵系、恶系',
        // },
        {
            question: 'Which 3 of the following types restrain the Dark-type?',
            answer: 'Fighting type, Bug type, Fairy type',
        },
        {
            question: 'Which 3 of the following types restrain the Steel-type?',
            answer: 'Fighting type, Ground type, Fire type',
        },
        {
            question: 'Which 2 of the following types restrain the Water-type?',
            answer: 'Electric type, Grass type',
        },
        // { question: '龍系被下麵那3種屬性克制?', answer: '冰系、龙系、妖精系' },
        // {
        //     question: '火系被下麵那3種屬性克制?',
        //     answer: '水系、地面系、岩石系',
        // },
        {
            question: 'Which 2 of the following types restrain the Ghost-type?',
            answer: 'Ghost type, Dark type',
        },
        {
            question: 'Which 2 of the followning types restrain the Fairy-type?',
            answer: 'Poison type, Steel type',
        },
        {
            question: 'Which of the following types restrains the Normal-type?',
            answer: 'Fighting type',
        },
        { question: 'Which of the following types is the most restrained?', answer: 'Rock' },
        {
            question: 'Which 3 of the following types restrain the Bug-type?',
            answer: 'Flying type, Rock type, Fire type',
        },
        {
            question: 'Which 3 of the following types restrain the Fighting-type?',
            answer: 'Flying type, Psychic type, Fairy type',
        },
        {
            question: 'Which 3 of the following types restrain the Flying-type?',
            answer: 'Rock type, Electric type, Ice type',
        },
        {
            question: 'Which 3 of the following types restrain the Ground-type?',
            answer: 'Water type, Grass type, Ice type',
        },
        {
            question: 'Which 2 of the following types restrain the Poison-type?',
            answer: 'Ground type, Psychic type',
        },
        {
            question: 'Which of the following types does not restrain the Ice-type?',
            answer: 'Psychic type',
        },
        {
            question: `Which of the following types doesn't restrain the Grass-type?`,
            answer: 'Normal type',
        },
        {
            question: 'Which of the following types restrains the Electric-type?',
            answer: 'Ground type',
        },
        {
            question: 'Which of the following types does the Ice-type not restrain?',
            answer: 'Water type',
        },
        {
            question: `It has double resistance to Psychic power, while Fire-type has a doubled effect on it. What is the PM's type`,
            answer: 'Steel',
        },
        {
            question:
                'The type is Grass + Ice, with the ability as Thick Fat, what is the coefficient upon receiving Fire-type damage?',
            answer: '2',
        },
    ],
    'Game background': [
        {
            question: 'In which of the following ways the Pokemons cannot get skills?',
            answer: 'Pokémon Contest',
        },
        {
            question: 'Which of the following is not the training method of Pokémons',
            answer: 'Awakening',
        },
        {
            question: 'Which of the following is not a gashapon in the game?',
            answer: 'Candy Gashapon',
        },
        {
            question: 'Which of the following methods cannot restore Energy in the game?',
            answer: 'Rest in inn',
        },
        { question: 'How many times can you get Daily Food during one day?', answer: '3' },
        { question: 'What does Pokémon Star mainly produce?', answer: 'Pokémon Shard' },
        { question: 'In which city is the Elite Four held?', answer: 'Indigo League' },
        { question: 'Where can a dying Pokémon be healed?', answer: 'Pokémon Center' },
        { question: 'From Viridian City, which direction is Pallet Town?', answer: 'South' },
        { question: 'Which training method is unique to the Cutie Clash?', answer: 'Rebirth' },
        {
            question: 'Where can you get the Marvel Capsule that refines IV?',
            answer: `Eevee's treasure`,
        },
        { question: 'What can the Exhaust be used for?', answer: 'Capture pet' },
        {
            question:
                'When challenging the trainer, how many stars you get at most for each level?',
            answer: '3',
        },
        { question: 'What shards are MEGA stones made of?', answer: 'MEGA Stone Shard' },
        { question: 'Which city below is the Safari Zone in', answer: 'Goldenrod City' },
        {
            question: 'In which instance are the MEGA Stone Shards mainly produced?',
            answer: 'League Conference',
        },
        { question: 'What does catching a pet in the wild cost?', answer: 'Exhaust' },
        { question: 'How many generations are there for Pokemon Gashapon?', answer: '6' },
        {
            question: 'From which of the following locations can the Butterfree be caugh?',
            answer: 'Ilex Forest',
        },
        { question: 'In which city is the train being repaired?', answer: 'Cherrygrove City' },
        {
            question: 'What is the name of the singer who held the show in Goldenrod City?',
            answer: 'Rika',
        },
        {
            question: 'What items can be obtained by challenging the Pokémon Trainer?',
            answer: 'Pokémon EXP',
        },
        // { question: '下麵哪種途徑不能獲得攜帶物的?', answer: '遠征之路' },
        { question: 'In what ways can Pokemon gain EXP?', answer: 'All are correct' },
        {
            question: `For Scizor from the 1st top-up, what's its skill "False Swipe" most suitable for?`,
            answer: 'Capture pet',
        },
    ],
    Other: [
        { question: 'Which trainer does Pikachu belong to?', answer: 'Ash' },
        { question: "What is the favorite food of Satoshi's Picahu?", answer: 'Ketchup' },
        {
            question:
                'What is the line before "to extend our reach to the stars above!" when Team Rocket shows up?',
            answer: 'To denounce the evils of truth and love',
        },
        { question: 'What is the name of the femail member of the Team Rocket?', answer: 'Jessie' },
    ],
}
const searchText = ref('')
const filterTable = computed(() => {
    const table = locale.value === 'zh' ? tableZh : tableEn
    if (searchText.value === '') return table
    else
        return Object.fromEntries(
            Object.entries(table)
                .map(([key, value]) => {
                    return [
                        key,
                        value.filter(
                            (question) =>
                                question.question
                                    .toLowerCase()
                                    .includes(searchText.value.toLowerCase()) ||
                                question.answer
                                    .toLowerCase()
                                    .includes(searchText.value.toLowerCase())
                        ),
                    ]
                })
                .filter(([, value]) => value.length)
        )
})
onMounted(() => {
    // 加timeout是因為onMounted似乎在完全rander完之前就呼叫了
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
</script>

<template>
    <main>
        <div class="page-title">{{ $t('qa.title') }}</div>
        {{ $t('common.search') }}:
        <input
            v-model="searchText"
            type="text"
            class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        <div v-for="(category, key) in filterTable" :key="key">
            <div class="text-red">{{ key }}</div>
            <table>
                <tbody>
                    <tr v-for="item in category" :key="item.question">
                        <td>{{ item.question }}</td>
                        <td>{{ item.answer }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="6422833388"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    </main>
</template>
<style scoped>
table {
    font-size: 14px;
    border-collapse: collapse;
    width: 100%;
}
table tr {
    border-bottom: 1px rgb(177, 177, 177) solid;
}
td {
    padding: 4px;
}
.text-red {
    margin: 8px 0px;
    font-size: 16px;
    color: red;
}
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
