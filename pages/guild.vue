<script setup>
import { computed, ref } from 'vue'
const pokeDistribution = {
    左上草叢: [
        { name: '炎帝', level: 'beyond' },
        { name: '快龍', level: 'beyond' },
        { name: '巨金怪', level: 'beyond' },
        { name: '洛奇亞', level: 'beyond' },
        { name: '固拉多', level: 'beyond' },
        { name: '基拉祈', level: 'beyond' },
        { name: '呆呆王', level: 'beyond' },
        { name: '帕路奇亞', level: 'beyond' },
        { name: '萊希拉姆', level: 'beyond' },
        { name: '波爾凱尼恩', level: 'beyond' },
        { name: '代歐奇希斯.速度型態', level: 'beyond' },
        { name: '耿鬼', level: 'legend' },
        { name: '頓甲', level: 'legend' },
        { name: '暴鯉龍', level: 'legend' },
        { name: '妙蛙花', level: 'legend' },
        { name: '君主蛇', level: 'legend' },
        { name: '沙奈朵', level: 'legend' },
        { name: '火爆獸', level: 'legend' },
        { name: '雷伊布', level: 'legend' },
        { name: '沙漠蜻蜓', level: 'legend' },
        { name: '遠古巨蜓', level: 'legend' },
        { name: '達摩狒狒', level: 'legend' },
        { name: '帝王拿波', level: 'legend' },
        { name: '化石翼龍', level: 'legend' },
        { name: '多邊獸II', level: 'legend' },
        { name: '清洗洛托姆', level: 'legend' },
        { name: '阿羅拉椰誕樹', level: 'legend' },
        { name: '面罩摔角手皮卡丘', level: 'legend' },
        { name: '怪力', level: 'epic' },
        { name: '胡地', level: 'epic' },
        { name: '阿羅拉雷丘', level: 'epic' },
        { name: '巴大蝶', level: 'rare' },
    ],
    左下草叢: [
        { name: '超夢', level: 'beyond' },
        { name: '鳳王', level: 'beyond' },
        { name: '急凍鳥', level: 'beyond' },
        { name: '烈空座', level: 'beyond' },
        { name: '捷克羅姆', level: 'beyond' },
        { name: '雷吉艾斯', level: 'beyond' },
        { name: '凱路迪歐', level: 'beyond' },
        { name: '美錄梅塔', level: 'beyond' },
        { name: '拉帝亞斯', level: 'beyond' },
        { name: '達克萊伊', level: 'beyond' },
        { name: '代歐奇希斯 攻擊型態', level: 'beyond' },
        { name: '天蠍王', level: 'legend' },
        { name: '噴火龍', level: 'legend' },
        { name: '倫琴貓', level: 'legend' },
        { name: '黑魯加', level: 'legend' },
        { name: '大力鱷', level: 'legend' },
        { name: '葉伊布', level: 'legend' },
        { name: '大奶罐', level: 'legend' },
        { name: '火焰雞', level: 'legend' },
        { name: '幸福蛋', level: 'legend' },
        { name: '大劍鬼', level: 'legend' },
        { name: '多邊獸Z', level: 'legend' },
        { name: '七夕青鳥', level: 'legend' },
        { name: '月亮伊布', level: 'legend' },
        { name: '拉普拉斯', level: 'legend' },
        { name: '巨鉗螳螂', level: 'legend' },
        { name: '羅絲雷朵', level: 'legend' },
        { name: '博士皮卡丘', level: 'legend' },
        { name: '加熱洛托姆', level: 'legend' },
        { name: '大比鳥', level: 'epic' },
        { name: '阿勃梭魯', level: 'epic' },
        { name: '阿羅拉隆隆岩', level: 'epic' },
    ],
    右上草叢: [
        { name: '夢幻', level: 'beyond' },
        { name: '雷公', level: 'beyond' },
        { name: '閃電鳥', level: 'beyond' },
        { name: '時拉比', level: 'beyond' },
        { name: '班基拉斯', level: 'beyond' },
        { name: '烈咬陸鯊', level: 'beyond' },
        { name: '拉帝歐斯', level: 'beyond' },
        { name: '雷吉洛克', level: 'beyond' },
        { name: '暗黑酋雷姆', level: 'beyond' },
        { name: '代歐奇希斯', level: 'beyond' },
        { name: '克雷色利亞', level: 'beyond' },
        { name: '袋獸', level: 'legend' },
        { name: '烈焰猴', level: 'legend' },
        { name: '蜥蜴王', level: 'legend' },
        { name: '水箭龜', level: 'legend' },
        { name: '風速狗', level: 'legend' },
        { name: '美納斯', level: 'legend' },
        { name: '炎武王', level: 'legend' },
        { name: '大竺葵', level: 'legend' },
        { name: '火神蛾', level: 'legend' },
        { name: '巨沼怪', level: 'legend' },
        { name: '冰鬼護', level: 'legend' },
        { name: '卡比獸', level: 'legend' },
        { name: '波克基斯', level: 'legend' },
        { name: '太陽伊布', level: 'legend' },
        { name: '波士可多拉', level: 'legend' },
        { name: '赫拉克羅斯', level: 'legend' },
        { name: '偶像皮卡丘', level: 'legend' },
        { name: '旋轉洛托姆', level: 'legend' },
        { name: '阿羅拉臭臭泥', level: 'epic' },
        { name: '勾魂眼', level: 'rare' },
        { name: '大針鋒', level: 'rare' },
    ],
    右下草叢: [
        { name: '水君', level: 'beyond' },
        { name: '蓋歐卡', level: 'beyond' },
        { name: '火焰鳥', level: 'beyond' },
        { name: '暴飛龍', level: 'beyond' },
        { name: '請假王', level: 'beyond' },
        { name: '騎拉帝納', level: 'beyond' },
        { name: '阿爾宙斯', level: 'beyond' },
        { name: '帝牙盧卡', level: 'beyond' },
        { name: '焰白酋雷姆', level: 'beyond' },
        { name: '雷吉斯奇魯', level: 'beyond' },
        { name: '代歐奇希斯.防禦型態', level: 'beyond' },
        { name: '電龍', level: 'legend' },
        { name: '大鋼蛇', level: 'legend' },
        { name: '瑪狃拉', level: 'legend' },
        { name: '河馬獸', level: 'legend' },
        { name: '土臺龜', level: 'legend' },
        { name: '水伊布', level: 'legend' },
        { name: '火伊布', level: 'legend' },
        { name: '冰伊布', level: 'legend' },
        { name: '路卡利歐', level: 'legend' },
        { name: '索羅亞克', level: 'legend' },
        { name: '詛咒娃娃', level: 'legend' },
        { name: '仙子伊布', level: 'legend' },
        { name: '艾路雷朵', level: 'legend' },
        { name: '甲賀忍蛙', level: 'legend' },
        { name: '結冰洛托姆', level: 'legend' },
        { name: '切割洛托姆', level: 'legend' },
        { name: '貴婦皮卡丘', level: 'legend' },
        { name: '重搖滾皮卡丘', level: 'legend' },
        { name: '斗笠菇', level: 'epic' },
        { name: '帽子皮卡丘', level: 'epic' },
        { name: '差不多娃娃', level: 'epic' },
    ],
}
const searchText = ref('')
const filterDistribution = computed(() => {
    if (searchText.value === '') return pokeDistribution
    else
        return Object.fromEntries(
            Object.entries(pokeDistribution)
                .map(([key, value]) => {
                    return [key, value.filter((poke) => poke.name.includes(searchText.value))]
                })
                .filter(([, value]) => value.length)
        )
})
</script>

<template>
    <main>
        <div class="page-title">備戰精靈分布表</div>
        <div class="note">
            <ul>
                <li>於備戰聖地抓到的精靈才能在公會戰出戰</li>
                <li>一人抓到全公會都可以用</li>
                <li>若本身有該精靈，會連動自己精靈的數據，若沒有，則由系統自動配置</li>
            </ul>
        </div>
        <div class="mt-2">
            搜尋:
            <input
                v-model="searchText"
                type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        <div v-for="(pokes, area) in filterDistribution" :key="area">
            <div class="area">
                <span>{{ area }}</span>
            </div>
            <div class="poke-list">
                <div v-for="poke in pokes" :key="poke.name" :class="poke.level">
                    {{ poke.name }}
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
.beyond {
    border: 3px solid transparent;
    border-radius: 8px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, white, white),
        linear-gradient(135deg, #3632ff 0%, #3eff30 33%, #ffff00 66%, #ff5900 100%);
}
.legend {
    border: 3px solid #ffff00;
    border-radius: 8px;
    background: white;
}
.epic {
    border: 3px solid rgb(192, 0, 192);
    border-radius: 8px;
    background: white;
}
.rare {
    border: 3px solid rgb(46, 57, 255);
    border-radius: 8px;
    background: white;
}
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
.page-title {
    border-left: 8px solid rgb(255, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.poke-list {
    display: flex;
    flex-wrap: wrap;
    background: #dbffdba4;
    padding: 8px;
    border-radius: 8px;
}
.poke-list > div {
    padding: 4px;
    margin: 4px;
    flex-grow: 1;
    text-align: center;
    max-width: 170px;
}
.area {
    margin: 8px 0px;
}
.area span {
    border-left: 4px solid green;
    border-right: 4px solid green;
    padding: 0px 8px;
}
</style>
