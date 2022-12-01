<script setup>
import table from '@/assets/json/awards.json'
useHead({
    title: '田野調查',
})
const day7awards = {
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
const selectAward = ref('')
const awards = computed(() => {
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
    if (selectAward.value === '') return table
    return table.filter((item) => item.award.includes(selectAward.value))
})
</script>

<template>
    <main>
        <div class="page-title">田野調查</div>
        <div class="note">
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
            <div>連續7天完成任務已知獎勵:</div>
            <table>
                <tbody>
                    <tr v-for="(dayAwards, key) in day7awards" :key="key">
                        <td class="min-w-[40px]">{{ key }}</td>
                        <td>{{ dayAwards.join('、') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        任務篩選:
        <select
            v-model="selectAward"
            class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
            <option :value="''">-請選擇獎勵-</option>
            <option v-for="award in awards" :key="award" :value="award">
                {{ award }}
            </option>
        </select>
        <table>
            <tbody>
                <tr>
                    <td>任務</td>
                    <td>獎賞</td>
                </tr>
                <tr v-for="item in filterItems" :key="item.work" :class="item.level">
                    <td>{{ item.work }}</td>
                    <td>{{ item.award.join('、') }}{{ item.checkAward == false ? '.' : '' }}</td>
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
