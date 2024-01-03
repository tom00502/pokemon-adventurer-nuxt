<script setup>
import playerExps from '@/assets/json/playerExperience.json'
useHead({
    title: '玩家經驗計算機',
})
const nowLevel = ref(1)
const nowExp = ref(0)
const expPerDay = ref(0)
const levelExp = computed(() => {
    return playerExps.find((exp) => exp.level == nowLevel.value).exp
})
const levelSum = computed(() => {
    return playerExps.find((exp) => exp.level == nowLevel.value).sum
})
const calcDay = (sum) => {
    if (expPerDay.value == 0) return '-'
    const needExp = Number(sum) - nowExp.value - levelSum.value
    if (needExp <= 0) return 0
    return Math.ceil(needExp / expPerDay.value)
}
const calcExp = (sum) => {
    const needExp = Number(sum) - nowExp.value - levelSum.value
    if (needExp <= 0) return 0
    return needExp
}
const viewPlayerExps = computed(() => {
    return playerExps.filter((exp) => Number(exp.level) >= nowLevel.value)
})
const everydayExpTable = [
    { from: '扭蛋高手', exp: 100 },
    { from: '點石成金', exp: 100 },
    { from: '天王剋星', exp: 100 },
    { from: '遠征之路', exp: 100 },
    { from: '道館常客', exp: 100 },
    { from: '寶藏獵人', exp: 100 },
    { from: '勤苦修練', exp: 100 },
    { from: '精靈達人', exp: 100 },
    { from: '戰鬥達人', exp: 50 },
    { from: '精靈速成', exp: 50 },
    { from: '精靈放生', exp: 50 },
    { from: '熟門熟客', exp: 50 },
]
const missionExpTable = [
    { from: '四大天王', exp: 20 },
    { from: '道館館主', exp: 20 },
    { from: '菁英訓練師', exp: 15 },
    { from: '羈絆副本', exp: 15 },
    { from: '普通訓練師', exp: 10 },
    { from: '伊布的寶藏', exp: 10 },
    { from: '遠征之路', exp: 5 },
]
</script>
<template>
    <main>
        <div class="page-title">玩家經驗計算機</div>
        <div class="note">
            <ul>
                <li>玩家等級就是精靈等級的上限</li>
                <li>輸入等級與預計每日獲得經驗，即可計算到達目標等級還要多久！</li>
            </ul>
        </div>
        <h2 class="mt-2 text-center font-medium">玩家經驗來源</h2>
        <div class="mt-2 flex justify-center gap-4">
            <!-- <div class="flex max-w-xs justify-center"> -->
            <table class="max-w-xs text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-3">每日任務</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-3">取得經驗</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="capsuleValue in everydayExpTable"
                        :key="capsuleValue.from"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <th
                            scope="row"
                            class="whitespace-nowrap py-1 px-4 text-center font-medium text-gray-900"
                        >
                            {{ capsuleValue.from }}
                        </th>
                        <td class="py-1 px-1">{{ capsuleValue.exp }}</td>
                    </tr>
                </tbody>
            </table>
            <!-- </div> -->
            <!-- <div class="flex max-w-xs justify-center"> -->
            <table class="max-w-xs text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-3">副本</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-3">取得經驗</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="capsuleValue in missionExpTable"
                        :key="capsuleValue.from"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <th
                            scope="row"
                            class="whitespace-nowrap py-1 px-4 text-center font-medium text-gray-900"
                        >
                            {{ capsuleValue.from }}
                        </th>
                        <td class="py-1 px-1">{{ capsuleValue.exp }}</td>
                    </tr>
                </tbody>
            </table>
            <!-- </div> -->
        </div>
        <div class="star-input-container">
            <div>
                <div>目前等級</div>
                <div class="w-full px-3">
                    <input v-model.number="nowLevel" type="range" min="1" max="90" class="w-full" />
                    <input
                        v-model.number="nowLevel"
                        type="number"
                        max="90"
                        min="1"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div>
                <div>目前已獲得經驗</div>
                <div class="w-full px-3">
                    <input
                        v-model="nowExp"
                        type="range"
                        min="0"
                        :max="levelExp - 1"
                        class="w-full"
                    />
                    <input
                        v-model="nowExp"
                        type="number"
                        :max="levelExp - 1"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {{ ` / ${levelExp}` }}
                </div>
            </div>
            <div>
                <div>預計每日取得經驗值</div>
                <div class="w-full px-3">
                    <input
                        v-model.number="expPerDay"
                        type="range"
                        max="5000"
                        min="0"
                        class="w-full"
                    />
                    <input
                        v-model.number="expPerDay"
                        type="number"
                        max="5000"
                        min="0"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
        <div>
            <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap py-3 px-2">目標等級</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-2">升級所需經驗</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-2">累積經驗</th>
                            <th scope="col" class="whitespace-nowrap py-3 px-2">
                                升級到此等級還需經驗(天數)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="data in viewPlayerExps"
                            :key="data.level"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <td
                                scope="row"
                                class="whitespace-nowrap py-1 px-6 font-medium text-gray-900"
                            >
                                {{ data.level }}
                            </td>
                            <td>{{ data.exp }}</td>
                            <td>{{ data.sum }}</td>
                            <td>
                                {{ calcExp(data.sum)
                                }}<span v-if="expPerDay > 0">({{ calcDay(data.sum) }}天)</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>
<style scoped>
.star-input-container {
    margin: 1rem 0;
}
.star-input-container > div {
    display: flex;
    border-width: 1px;
    border-color: rgb(163 163 163);
    border-style: solid;
    width: 100%;
    align-items: center;
    padding: 0.25rem;
}
.star-unselect {
    color: rgb(255, 251, 202);
}
.star-unselect2 {
    color: rgb(255, 174, 248);
}
.star-select {
    color: rgb(255, 238, 0);
}
.star-select2 {
    color: rgb(255, 81, 241);
}
.quality-box {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 0.5rem;
}
.quality-box > div {
    cursor: pointer;
}
.star-box > div {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}
.star-box {
    width: 100%;
    padding: 0.5rem;
}
.star-input-container > div :nth-child(1) {
    flex-shrink: 0;
}
table {
    width: 100%;
}
.qualityBtn {
    border-width: 3px;
    border-color: rgb(163 163 163);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeBeyond {
    border-width: 3px;
    border-image-slice: 1;
    border-image-source: linear-gradient(
        135deg,
        #3632ff 0%,
        #3eff30 33%,
        #ffff00 66%,
        #ff5900 100%
    );
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeLegend {
    border-width: 3px;
    border-color: rgb(255, 253, 114);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeEpic {
    border-width: 3px;
    border-color: rgb(243, 116, 255);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeRare {
    border-width: 3px;
    border-color: rgb(136, 123, 255);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeNormal {
    border-width: 3px;
    border-color: rgb(210, 210, 210);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.page-title {
    border-left: 8px solid rgb(248, 255, 60);
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
.w-25 {
    width: 100px;
}
.w-full {
    width: 100%;
}
.px-3 {
    padding-left: 12px;
    padding-right: 12px;
}
.type-text-color.active {
    color: black;
    background-color: yellow;
}
.type-text-color.normal {
    color: rgb(145, 145, 145);
}
.type-text-color.normal.active {
    color: black;
    background-color: rgb(190, 190, 190, 0.5);
}
.type-text-color.rare {
    color: rgb(136, 123, 255);
}
.type-text-color.rare.active {
    color: black;
    background-color: rgb(136, 123, 255, 0.5);
}
.type-text-color.epic {
    color: rgb(243, 116, 255);
}
.type-text-color.epic.active {
    color: black;
    background-color: rgb(243, 116, 255);
}
.type-text-color.legend {
    color: rgb(197, 174, 0);
}
.type-text-color.legend.active {
    color: black;
    background-color: rgb(255, 225, 0);
}
.type-text-color.beyond {
    color: black;
}
.type-text-color.beyond.active {
    color: black;
    background: linear-gradient(135deg, #3632ffcc 0%, #3eff30cc 33%, #ffff00cc 66%, #ff5900cc 100%);
}
</style>
