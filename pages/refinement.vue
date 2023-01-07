<script setup>
import { ref, reactive, computed } from 'vue'
import { $vfm } from 'vue-final-modal'
useHead({
    title: '轉生模擬',
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
const getRandoms = () => {
    const numbers = []
    for (let i = 0; i < 6; i++) {
        let number = Math.floor(getGaussRandom(24, 8))
        if (number < 1) number = 1
        if (number > 47) number = 47
        numbers.push(number)
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
const handleDiceClick = () => {
    if (needConfirm.value) {
        const options = {
            message: `有個體值超過期望值，確定要洗掉嗎?`,
            confirmCallback: doDice,
        }
        $vfm.show('confirmModal', { options })
    } else {
        doDice(true)
    }
}
const doDice = (check) => {
    if (!check) return
    theValue.value = getRandoms()
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
theValue.value = getRandoms()
board.hitPoint = locked.value[0] ? board.hitPoint : theValue.value[0]
board.contact = locked.value[1] ? board.contact : theValue.value[1]
board.defence = locked.value[2] ? board.defence : theValue.value[2]
board.speed = locked.value[3] ? board.speed : theValue.value[3]
board.block = locked.value[4] ? board.block : theValue.value[4]
board.attack = locked.value[5] ? board.attack : theValue.value[5]
</script>
<template>
    <div>
        <div class="page-title">洗練模擬器</div>
        <div class="plan-discript">
            使用說明:
            <ul>
                <li>特地為寶三哥開發的，無聊可以來點點ＸＤ</li>
                <li>洗練亂數採常態分佈平均24標準差8</li>
                <li>點擊個體值文字可以鎖定</li>
                <li>鎖定的屬性個體值不會被洗掉</li>
                <li>鎖定越多屬性，每次洗練消耗的金幣和膠囊會越多</li>
                <li>最多能鎖5個屬性(鎖6個屬性是有事嗎...)</li>
            </ul>
        </div>
        <div class="lg:grid lg:grid-cols-2 lg:items-center">
            <div class="m-auto max-w-[500px]">
                <ClientOnly>
                    <RadarChart
                        :chart-data="chartData"
                        :label-colors="labelColors"
                        @lock-click="lockClick"
                    />
                </ClientOnly>
            </div>
            <div class="action-board lg:shrink">
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
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="clear"
                    >
                        全部重置
                    </button>
                </div>
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
</style>
