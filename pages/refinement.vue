<script setup>
import { ref, reactive, computed } from 'vue'
import { $vfm } from 'vue-final-modal'
useHead({
    title: '洗練模擬器',
})
const chartData = computed(() => {
    return {
        labels: [
            `血量(${board.hitPoint})${locked.value[0] ? '🔒' : ''}`,
            `特攻(${board.contact})${locked.value[1] ? '🔒' : ''}`,
            `特防(${board.defence})${locked.value[2] ? '🔒' : ''}`,
            `速度(${board.speed})${locked.value[3] ? '🔒' : ''}`,
            `防禦(${board.block})${locked.value[4] ? '🔒' : ''}`,
            `攻擊(${board.attack})${locked.value[5] ? '🔒' : ''}`,
        ],
        datasets: [
            {
                label: '當前個體值',
                backgroundColor: 'rgba(20,185,255, 0.2)',
                borderColor: 'rgba(20,185,255, 0.2)',
                // pointBackgroundColor: 'rgba(179,181,198,1)',
                // pointBorderColor: '#fff',
                // pointHoverBackgroundColor: '#fff',
                // pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                    board.hitPoint,
                    board.contact,
                    board.defence,
                    board.speed,
                    board.block,
                    board.attack,
                ],
                fill: 'origin',
            },
        ],
    }
})
const labelColors = computed(() => {
    return Object.values(board).map((data) => {
        if (data < 10) return 'black'
        if (data < 20) return 'green'
        if (data < 30) return 'blue'
        if (data < 40) return 'purple'
        return 'red'
    })
})
const locked = ref([false, false, false, false, false, false])
const myCost = reactive({
    coin: 0,
    capsule: 0,
    count: 0,
})
const board = reactive({
    hitPoint: 0,
    contact: 0,
    defence: 0,
    speed: 0,
    block: 0,
    attack: 0,
})
const capsuleTable = [
    { from: '公會週活躍100', number: 3 },
    { from: '公會週活躍200', number: 5 },
    { from: '公會週活躍350', number: 8 },
    { from: '公會祈願週累計25贈與', number: 5 },
    { from: '公會祈願週累計50贈與', number: 20 },
    { from: '公會祈願週累計100贈與', number: 30 },
    { from: '公會戰落敗', number: 3 },
    { from: '公會戰獲勝', number: 12 },
    { from: '伊布的寶藏晝', number: 6 },
    { from: '伊布的寶藏夜', number: 9 },
    { from: '放生商店535點數購買', number: 3 },
    { from: '1劍蘭兌換', number: 20 },
    { from: '田野調查任務', number: 2 },
    { from: '日常寶箱2機率抽', number: 5 },
    { from: '寶可問答A+獎勵機率抽', number: 3 },
    { from: '每月簽到累計15天獎勵', number: 50 },
]
const luckyCount = ref(0)
const clear = () => {
    board.hitPoint = 0
    board.attack = 0
    board.block = 0
    board.contact = 0
    board.defence = 0
    board.speed = 0
    myCost.coin = 0
    myCost.capsule = 0
    myCost.count = 0
    locked.value = [false, false, false, false, false, false]
    luckyCount.value = 0
}
const costTable = {
    0: { coin: 6000, capsule: 1 },
    1: { coin: 18000, capsule: 3 },
    2: { coin: 24000, capsule: 4 },
    3: { coin: 30000, capsule: 5 },
    4: { coin: 36000, capsule: 6 },
    5: { coin: 42000, capsule: 7 },
}
const cost = computed(() => {
    const lockAmount = locked.value.filter((lock) => lock).length
    return {
        coin: costTable[lockAmount].coin,
        capsule: costTable[lockAmount].capsule,
    }
})
const getExpRandom = (lamda) => {
    const y = Math.random()
    const x = -Math.log(1 - y) / lamda
    return x
}
const getGaussRandom = (mean, dev) => {
    const theta = Math.random() * Math.PI * 2
    const R = getExpRandom(1)
    const r = Math.sqrt(2 * R)
    let n = Math.cos(theta) * r
    n = n * dev + mean
    return n
}
const getRandoms = (luckyDice) => {
    const avg = luckyDice ? 24 : 16
    const dev = luckyDice ? 8 : 7
    const numbers = []
    for (let i = 0; i < 6; i++) {
        let number = Math.floor(getGaussRandom(avg, dev))
        if (number < 1) number = 1
        if (number > 47) number = 47
        numbers.push(number)
    }
    if (luckyDice) {
        luckyCount.value = 0
    } else {
        luckyCount.value++
    }
    return numbers
}
const theValue = ref([])
const needConfirm = computed(() => {
    if (searchText.value === 0) {
        return false
    }
    if (board.hitPoint >= searchText.value && locked.value[0] === false) return true
    if (board.contact >= searchText.value && locked.value[1] === false) return true
    if (board.defence >= searchText.value && locked.value[2] === false) return true
    if (board.speed >= searchText.value && locked.value[3] === false) return true
    if (board.block >= searchText.value && locked.value[4] === false) return true
    if (board.attack >= searchText.value && locked.value[5] === false) return true
    return false
})
const handleDiceClick = ({ luckyDice = false }) => {
    if (needConfirm.value) {
        const options = {
            message: `有個體值超過期望值，確定要洗掉嗎?`,
            confirmCallback: doDice,
        }
        $vfm.show('confirmModal', { options })
    } else {
        doDice(true, luckyDice)
    }
}
const doDice = (check, luckyDice = false) => {
    if (!check) return
    theValue.value = getRandoms(luckyDice)
    board.hitPoint = locked.value[0] ? board.hitPoint : theValue.value[0]
    board.contact = locked.value[1] ? board.contact : theValue.value[1]
    board.defence = locked.value[2] ? board.defence : theValue.value[2]
    board.speed = locked.value[3] ? board.speed : theValue.value[3]
    board.block = locked.value[4] ? board.block : theValue.value[4]
    board.attack = locked.value[5] ? board.attack : theValue.value[5]
    myCost.coin += cost.value.coin
    myCost.capsule += cost.value.capsule
    myCost.count++
}
const lockClick = (i) => {
    if (locked.value.filter((lock) => lock).length === 5 && locked.value[i] === false) return
    locked.value[i] = !locked.value[i]
}
const searchText = ref(0)

onMounted(() => {
    theValue.value = getRandoms()
    board.hitPoint = locked.value[0] ? board.hitPoint : theValue.value[0]
    board.contact = locked.value[1] ? board.contact : theValue.value[1]
    board.defence = locked.value[2] ? board.defence : theValue.value[2]
    board.speed = locked.value[3] ? board.speed : theValue.value[3]
    board.block = locked.value[4] ? board.block : theValue.value[4]
    board.attack = locked.value[5] ? board.attack : theValue.value[5]
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
    <div>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="6422833388"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="page-title">洗練模擬器</div>
        <div class="plan-discript">
            使用說明:
            <ul>
                <li>歡迎無聊時來按按(純屬娛樂)</li>
                <li>點擊個體值文字可以鎖定</li>
                <li>鎖定的屬性個體值不會被洗掉</li>
                <li>鎖定越多屬性，每次洗練消耗的金幣和膠囊會越多</li>
                <li>最多能鎖5個屬性</li>
                <li>洗練參數已經盡量比照遊戲中的數值了，對就是這麼難洗</li>
                <li>為了身心健康著想，特別加入歐皇洗練較容易洗出好數值</li>
                <li>下方有無課膠囊取得來源供參考</li>
            </ul>
        </div>
        <div class="">
            <div class="m-auto max-w-[500px]">
                <ClientOnly>
                    <RadarChart
                        :chart-data="chartData"
                        :label-colors="labelColors"
                        :max="47"
                        @lock-click="lockClick"
                    />
                </ClientOnly>
            </div>
            <div class="action-board">
                <div class="my-1 mr-3">
                    洗練期望值:
                    <input
                        v-model.number="searchText"
                        type="number"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />(0為不提醒)
                </div>
                <div class="use-gen-borad p-4">
                    <div>目前洗練次數: {{ myCost.count }}</div>
                    <div>目前花費金幣: {{ myCost.coin }}</div>
                    <div>目前花費膠囊數: {{ myCost.capsule }}</div>
                    <div>洗鍊一次消耗: 金幣{{ cost.coin }} ,膠囊{{ cost.capsule }}</div>
                </div>
                <div>
                    <button
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="handleDiceClick"
                    >
                        洗練
                    </button>
                    <button
                        v-if="luckyCount >= 10"
                        type="button"
                        class="rainbow my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="handleDiceClick({ luckyDice: true })"
                    >
                        歐皇洗練
                    </button>
                    <button
                        v-else
                        type="button"
                        class="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
                    >
                        歐皇洗練
                    </button>
                    <button
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="clear"
                    >
                        全部重置
                    </button>
                </div>
            </div>
            <div class="mt-4 flex justify-center">
                <table class="text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap py-3 px-3">
                                日常無課膠囊來源
                            </th>
                            <th scope="col" class="whitespace-nowrap py-3 px-3">數量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="capsuleValue in capsuleTable"
                            :key="capsuleValue.from"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <th
                                scope="row"
                                class="whitespace-nowrap py-1 px-4 text-left font-medium text-gray-900"
                            >
                                {{ capsuleValue.from }}
                            </th>
                            <td class="py-1 px-1">{{ capsuleValue.number }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
    .statistics-board {
        display: flex;
        gap: 8px;
        justify-content: space-between;
    }
    .plan-select-board {
        display: flex;
    }
    .plan-select-board > div {
        width: 100%;
    }
}
.action-board {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.board-value {
    display: flex;
    justify-content: space-between;
}
.quality-select {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}
.quality-select > div {
    width: 50px;
    height: 50px;
    border: 1px solid gray;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    cursor: pointer;
}
.quality-select > div.active {
    border: 3px solid orange;
}
.select-quality {
    display: flex;
    flex-direction: column;
    padding: 8px;
}
.select-quality > :nth-child(2) {
    margin-top: auto;
    text-align: center;
    background: rgb(14, 50, 192);
    color: white;
    padding: 8px;
}
.select-quality > :nth-child(3) {
    box-shadow: 0px 1px 0px 0px #fff6af;
    background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
    background-color: #ffec64;
    border-radius: 6px;
    border: 1px solid #ffaa22;
    display: inline-block;
    cursor: pointer;
    color: #333333;
}
.select-quality > :nth-child(3):hover {
    background: linear-gradient(to bottom, #ffab23 5%, #ffec64 100%);
    background-color: #ffab23;
}
.select-quality > :nth-child(3):active {
    position: relative;
    top: 1px;
}
.select-type {
    background: rgb(184, 184, 184);
}
.select-type > div {
    border-left: 1px solid gray;
    background: rgb(184, 184, 184);
    padding: 4px;
    cursor: pointer;
}
.select-type > div.active {
    border: 1px solid gray;
    border-left: 0px;
    background: rgb(160, 212, 255);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}
.use-gen-borad {
    background: rgb(160, 212, 255);
    max-width: 500px;
    width: 100%;
    border: 1px solid gray;
    border-radius: 8px;
}
.plan-discript {
    background: pink;
    padding: 8px;
    border: 1px solid gray;
    border-radius: 8px;
}
.page-title {
    border-left: 8px solid rgb(60, 255, 105);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
@keyframes rotate {
    100% {
        transform: rotate(1turn);
    }
}

.rainbow {
    position: relative;
    z-index: 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #ff0000;
    border-radius: 3px;
    /* box-shadow: 0px 0px 15px 5px #ffff00; */
}
.rainbow::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -100%;
    width: 200%;
    height: 300%;
    background-color: white;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#ff0000, #ff0000), linear-gradient(#fffb00, #fffb00),
        linear-gradient(#ff0000, #ff0000), linear-gradient(#fffb00, #fffb00);
    animation: rotate 1s linear infinite;
    border-radius: 5px;
}

.rainbow::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 4px;
    top: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background: #ff0000;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 5px #ffff00;
}
</style>
