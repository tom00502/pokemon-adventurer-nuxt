<script setup>
import { useI18n } from 'vue-i18n'
import { usePokedexStore } from '@/stores/pokedex'
import tableZh from '@/assets/json/awards.json'
import tableEn from '@/assets/json/awardsEn.json'
const { locale } = useI18n()
const pokedexStore = usePokedexStore()
useHead({
    title: '田野調查',
})
const getPokemonNameById = (id) => {
    return pokedexStore.pokedex[id]?.name || String(id)
}
const day7awards = computed(() => {
    return locale.value === 'en' ? day7awardsEn : day7awardsTw
})
const day7awardsTw = {
    超越: [
        '急凍鳥之笛',
        '閃電鳥之笛',
        '火焰鳥之笛',
        '雷公之笛',
        '炎帝之笛',
        '水君之笛',
        '凱路迪歐之笛',
        '雷吉洛克之笛',
        '雷吉艾斯之笛',
        '雷吉斯奇魯之笛',
        '由克希之笛',
        '亞克諾姆之笛',
    ],
    傳說: [
        '暴鯉龍之笛*2',
        '加熱洛托姆之笛*2',
        '清洗洛托姆之笛*2',
        '結冰洛托姆之笛*2',
        '旋轉洛托姆之笛*2',
        '切割洛托姆之笛*2',
        '偶像皮卡丘之笛*2',
        '博士皮卡丘之笛*2',
        '面罩摔角手皮卡丘之笛*2',
        '貴婦皮卡丘之笛*2',
        '電龍之笛*2',
        '霏歐納之笛',
        '波克基斯之笛',
        '化石翼龍之笛',
        '暴鯉龍之笛',
        '阿羅拉椰蛋樹之笛',
    ],
    史詩: ['阿羅拉雷丘之笛*5', '阿羅拉隆隆岩之笛*5', '阿羅拉隆隆岩之笛*4'],
    稀有: ['阿羅拉三地鼠之笛*5', '阿羅拉貓老大之笛*5', '阿羅拉臭泥之笛*5', '阿羅拉嘎啦嘎啦之笛*5'],
    普通: ['阿羅拉六尾之笛*5', '阿羅拉六尾之笛*3'],
}
const day7awardsEn = {
    supreme: [
        'Articuno Flute',
        'Zapdos Flute',
        'Moltres Flute',
        'Raikou Flute',
        'Entei Flute',
        'Suicune Flute',
        'Keldeo Flute',
        'Regirock Flute',
        'Regice Flute',
        'Registeel Flute',
        'Uxie Flute',
        'Azelf Flute',
    ],
    legend: [
        'Gyarados Flute*2',
        'Heat Rotom Flute*2',
        'Wash Rotom Flute*2',
        'Frost Rotom Flute*2',
        'Fan Rotom Flute*2',
        'Mow Rotom Flute*2',
        'Pikachu - Pop Star Flute*2',
        'Pikachu - Ph. D Flute*2',
        'Pikachu - Libre Flute*2',
        'Pikachu - Libre Belle*2',
        'Ampharos Flute*2',
        'Phione Flute',
        'Togekiss Flute',
        'Aerodactyl Flute',
        'Gyarados Flute',
        'Alola Exeggutor Flute',
    ],
    epic: ['Alola Raichu Flute*5', 'Alola Golem Flute*5', 'Alola Golem Flute*4'],
    rare: ['Alola Dugtrio Flute*5', 'Alola Persian Flute*5', 'Alola Grimer Flute*5', 'Alola Marowak Flute*5'],
    normal: ['Alola Vulpix Flute*5', 'Alola Vulpix Flute*3'],
}
const selectAward = ref('')
const awards = computed(() => {
    const table = locale.value === 'en' ? tableEn : tableZh
    const awardSet = new Set()
    table.forEach((item) => {
        if (item.award.length !== 0) {
            item.award.forEach(awardSet.add, awardSet)
        }
    })
    const awards = [...awardSet]
    return awards.sort()
})
const filterItems = computed(() => {
    const table = locale.value === 'en' ? tableEn : tableZh
    if (selectAward.value === '') return table
    return table.filter((item) => item.award.includes(selectAward.value))
})
</script>

<template>
<main>
    <div class="page-title">{{ $t('fieldwork.title') }}</div>
    <div v-if="locale === 'en'" class="note">
        <ul>
            <li>You can visit the girl in the upper right corner of the Pokémon Center in each town to receive tasks.
            </li>
            <li>Each Pokémon Center can only receive one task, and you can complete up to two tasks per day.</li>
            <li>After completing each task, there will be corresponding rewards, and you can choose tasks according to
                the rewards you want.</li>
            <li>If you complete two tasks every day within a week, totaling 14 tasks, you can receive the final reward,
                some special flutes.</li>
            <li>
                The quality of the final reward flute depends on the total score of the 14 tasks completed. The higher
                the total score, the better the reward. If you complete all yellow tasks, you are likely to receive an
                supreme flute; if you complete all white tasks, you will only receive a normal flute.
            </li>
            <li>Task scores from highest to lowest: yellow > purple > blue > green > white.</li>
        </ul>
    </div>
    <div v-else class="note">
        <ul>
            <li>每天可至各大城鎮精靈中心右上角的小姐姐領取任務</li>
            <li>一個精靈中心只能領取一個任務，一天最多做兩個任務</li>
            <li>每個任務完成後都有對應的獎賞，可依照想要的獎賞選擇任務</li>
            <li>一週內每天都做滿兩個任務，共14個任務，可再領取最終獎勵笛子</li>
            <li>
                最終獎勵笛子的品質其實會依照做過的14個任務總分來發放，總分越高獎勵越好，如果都做黃色任務，大機率會領到超越笛子，如果都做白色任務，就只會拿到普通笛子
            </li>
            <li>任務分數高至低: 黃 > 紫 > 藍 > 綠 > 白</li>
            <li>GEN3稀有之笛田野任務沒有哦~要開日常寶箱1抽</li>
        </ul>
    </div>
    <div class="p-2">
        <div>{{ $t('fieldwork.7dayRewardTitle') }}:</div>
        <table>
            <tbody>
                <tr v-for="(dayAwards, key) in day7awards" :key="key">
                    <td class="min-w-[40px]">{{ key }}</td>
                    <td>{{ dayAwards.join('、') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    {{ $t('fieldwork.taskFilter') }}:
    <select v-model="selectAward"
        class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
        <option :value="''">-{{ $t('fieldwork.selectReward') }}-</option>
        <option v-for="award in awards" :key="award" :value="award">
            {{ award }}
        </option>
    </select>
    <table>
        <tbody>
            <tr>
                <td class="">{{ $t('fieldwork.task') }}</td>
                <td>{{ $t('fieldwork.reward') }}</td>
                <td>{{ $t('fieldwork.suggest') }}</td>
            </tr>
            <tr v-for="item in filterItems" :key="item.work" :class="item.level">
                <td class="">{{ item.work }}</td>
                <td>{{ item.award.join('、') }}{{ item.checkAward == false ? '.' : '' }}</td>
                <td>
                    {{
                        item.suggestPokemonIds?.length
                            ? item.suggestPokemonIds.map(getPokemonNameById).join('、')
                            : ''
                    }}
                </td>
            </tr>
        </tbody>
    </table>
</main>
</template>
<style scoped>
table {
    margin-top: 8px;
    font-size: 14px;
    /* border-collapse: collapse; */
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
}

table tr {
    /* border-bottom: 1px solid rgb(177, 177, 177); */
}

td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
}

/*第一欄第一列：左上*/
tr:first-child td:first-child {
    border-top-left-radius: 8px;
}

/*第一欄最後列：左下*/
tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}

/*最後欄第一列：右上*/
tr:first-child td:last-child {
    border-top-right-radius: 10px;
}

/*最後欄第一列：右下*/
tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}

.legend {
    background: rgb(255, 255, 150);
    /* background: linear-gradient(to right, #feffdb 5%, #f8ff36e1 100%);
    border-left: 7px solid yellow;
    border-right: 7px solid yellow; */
}

.epic {
    background: rgb(201, 150, 255);
    /* background: linear-gradient(to right, #ffdbff 5%, #ff36f8e1 100%);
    border-left: 7px solid rgb(192, 0, 192);
    border-right: 7px solid rgb(192, 0, 192); */
}

.rare {
    background: rgb(111, 255, 255);
    /* border-left: 7px solid rgb(46, 57, 255); */
}

.great {
    background: rgb(150, 255, 164);
    /* border-left: 7px solid rgb(150, 255, 164); */
}

.page-title {
    border-left: 8px solid rgb(255, 60, 93);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}

.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
</style>
