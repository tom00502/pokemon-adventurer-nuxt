<script setup>
import { ref, reactive, computed } from 'vue'
import attPlans from '@/assets/json/attPlans.json'
import defPlans from '@/assets/json/defPlans.json'
class gemCount {
    constructor() {
        this.low = 0
        this.normal = 0
        this.perfect = 0
    }

    get total() {
        return this.low + this.normal + this.perfect
    }
}
const chartData = computed(() => {
    return {
        labels: [
            `血量(${board.hitPoint})`,
            `特攻(${board.contact})`,
            `特防(${board.defence})`,
            `速度(${board.speed})`,
            `防禦(${board.block})`,
            `攻擊(${board.attack})`,
        ],
        datasets: [
            {
                label: '轉生石板成長檔',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
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
        if (data == 0) return 'black'
        if (data < 11) return 'green'
        if (data < 16) return 'blue'
        if (data < 20) return 'purple'
        return 'red'
    })
})
const board = reactive({
    hitPoint: 0,
    contact: 0,
    defence: 0,
    speed: 0,
    block: 0,
    attack: 0,
})
const attPlan = ref('')
const defPlan = ref('')
const steps = ref([])
const nowSelect = reactive({ type: 'hitPoint', quality: 'perfect' })
const step = reactive({
    count: 0,
    type: '',
    quality: '',
    overflow: 0,
    overflowMinus: 0,
})
const effect = {
    hitPoint: 'defence',
    defence: 'block',
    block: 'hitPoint',
    contact: 'attack',
    attack: 'speed',
    speed: 'contact',
}
const names = {
    hitPoint: '血量',
    contact: '特攻',
    defence: '特防',
    attack: '物攻',
    block: '物防',
    speed: '速度',
}
const qualityNames = {
    low: '劣質',
    normal: '普通',
    perfect: '極好',
}
const useGem = (type = nowSelect.type, quality = nowSelect.quality) => {
    if (quality === 'low') {
        board[type] += 1
        board[effect[type]] -= 1
    }
    if (quality === 'normal') {
        board[type] += 2
        board[effect[type]] -= 1
    }
    if (quality === 'perfect') {
        board[type] += 2
    }
    if (board[type] > 20) {
        step.overflow += board[type] - 20
        board[type] = 20
    }
    if (board[effect[type]] < 0) {
        board[effect[type]] = 0
        step.overflowMinus++
    }
    if (step.type === type && step.quality === quality) {
        step.count++
    } else {
        if (step.count !== 0) {
            const { count, type, quality, overflow, overflowMinus } = step
            steps.value.push({ count, type, quality, overflow, overflowMinus })
        }
        step.type = type
        step.count = 1
        step.quality = quality
        step.overflow = 0
        step.overflowMinus = 0
    }
}

const statistics = computed(() => {
    const gems = {
        hitPoint: new gemCount(),
        defence: new gemCount(),
        block: new gemCount(),
        contact: new gemCount(),
        attack: new gemCount(),
        speed: new gemCount(),
    }
    let total = 0
    steps.value.forEach((step) => {
        total += step.count
        gems[step.type][step.quality] += step.count
    })
    total += step.count
    if (step.count) {
        gems[step.type][step.quality] += step.count
    }
    return {
        total,
        gems: Object.fromEntries(Object.entries(gems).filter(([key, value]) => value.total)),
    }
})
const gemLabel = (gem, type) => {
    let label = `${names[type]}寶石(${gem.total}): `
    if (gem.perfect) {
        label += `極好(${gem.perfect}) `
    }
    if (gem.normal) {
        label += `普通(${gem.normal}) `
    }
    if (gem.low) {
        label += `劣質(${gem.low}) `
    }
    return label
}
const clear = () => {
    board.hitPoint = 0
    board.attack = 0
    board.block = 0
    board.contact = 0
    board.defence = 0
    board.speed = 0
    steps.value = []
    step.count = 0
    attPlan.value = ''
    defPlan.value = ''
}
const undo = () => {
    if (step.count == 0) {
        return
    }
    step.count--
    const { quality, type } = step
    if (quality === 'low') {
        if (step.overflow == 0) {
            board[type] -= 1
        } else {
            step.overflow--
        }
        if (step.overflowMinus == 0) {
            board[effect[type]] += 1
        } else {
            step.overflowMinus--
        }
    }
    if (quality === 'normal') {
        if (step.overflow == 0) {
            board[type] -= 2
        } else {
            step.overflow -= 2
        }
        if (step.overflowMinus == 0) {
            board[effect[type]] += 1
        } else {
            step.overflowMinus--
        }
    }
    if (quality === 'perfect') {
        if (step.overflow == 0) {
            board[type] -= 2
        } else {
            step.overflow -= 2
        }
    }
    if (step.count == 0) {
        if (steps.value.length == 0) {
            return
        }
        const { count, quality, type, overflow, overflowMinus } = steps.value.pop()
        step.count = count
        step.quality = quality
        step.type = type
        step.overflow = overflow
        step.overflowMinus = overflowMinus
    }
}
const setQuality = (quality) => {
    nowSelect.quality = quality
}
const setType = (type) => {
    nowSelect.type = type
}
const genDiscript = {
    hitPoint: {
        low: '血量+1, 特防-1',
        normal: '血量+2, 特防-1',
        perfect: '血量+2~4',
    },
    defence: {
        low: '特防+1, 物防-1',
        normal: '特防+2, 物防-1',
        perfect: '特防+2~4',
    },
    block: {
        low: '物防+1, 血量-1',
        normal: '物防+2, 血量-1',
        perfect: '物防+2~4',
    },
    contact: {
        low: '特攻+1, 物攻-1',
        normal: '特攻+2, 物攻-1',
        perfect: '特攻+2~4',
    },
    attack: {
        low: '物攻+1, 速度-1',
        normal: '物攻+2, 速度-1',
        perfect: '物攻+2~4',
    },
    speed: {
        low: '速度+1, 特攻-1',
        normal: '速度+2, 特攻-1',
        perfect: '速度+2~4',
    },
}
const discript = computed(() => {
    return genDiscript[nowSelect.type][nowSelect.quality]
})
const usePlan = () => {
    if (attPlan.value === '' && defPlan.value === '') {
        board.hitPoint = 0
        board.contact = 0
        board.defence = 0
        board.speed = 0
        board.block = 0
        board.attack = 0
        return
    }
    steps.value = []
    if (attPlan.value) {
        steps.value = [...attPlans[attPlan.value].steps]
    }
    if (defPlan.value) {
        steps.value = [...steps.value, ...defPlans[defPlan.value].steps]
    }
    const { count, quality, type, overflow, overflowMinus } = steps.value.pop()
    step.count = count
    step.quality = quality
    step.type = type
    step.overflow = overflow
    step.overflowMinus = overflowMinus
    const { contact = 0, speed = 0, attack = 0 } = attPlans[attPlan.value]?.board || {}
    const { hitPoint = 0, defence = 0, block = 0 } = defPlans[defPlan.value]?.board || {}
    board.hitPoint = hitPoint
    board.contact = contact
    board.defence = defence
    board.speed = speed
    board.block = block
    board.attack = attack
}
</script>
<template>
    <div>
        <div class="page-title">轉生模擬器</div>
        <div class="plan-discript">
            使用說明:
            <ul>
                <li>可進行寶石鑲嵌練習，下面會顯示操作步驟與使用寶石統計</li>
                <li>做出滿意的數值後，依照紀錄的步驟於遊戲中鑲嵌即可，須注意寶石數量是否足夠</li>
                <li>
                    不知道怎麼鑲嵌，也可以直接選套餐，選好後會顯示步驟與寶石數，可依據自身寶石數量搭配
                </li>
            </ul>
        </div>
        <div class="plan-select-board">
            <div>
                攻擊套餐選擇:
                <select v-model="attPlan" @change="usePlan()">
                    <option value="">請選擇攻擊套餐</option>
                    <option v-for="(value, key) in attPlans" :key="key">
                        {{ key }}
                    </option>
                </select>
                <div v-if="attPlan" class="plan-discript">
                    {{ attPlans[attPlan].discript }}
                </div>
            </div>
            <div>
                防禦套餐選擇:
                <select v-model="defPlan" @change="usePlan()">
                    <option value="">請選擇防禦套餐</option>
                    <option v-for="(value, key) in defPlans" :key="key">
                        {{ key }}
                    </option>
                </select>
                <div v-if="defPlan" class="plan-discript">
                    {{ defPlans[defPlan].discript }}
                </div>
            </div>
        </div>

        <div>
            <ClientOnly>
                <RadarChart :chart-data="chartData" :label-colors="labelColors" />
            </ClientOnly>
        </div>
        <div class="action-board">
            <div class="use-gen-borad">
                <div class="select-quality">
                    <div class="quality-select">
                        <div
                            :class="{ active: 'perfect' === nowSelect.quality }"
                            @click="setQuality('perfect')"
                        >
                            極好<br />寶石
                        </div>
                        <div
                            :class="{ active: 'normal' === nowSelect.quality }"
                            @click="setQuality('normal')"
                        >
                            普通<br />寶石
                        </div>
                        <div
                            :class="{ active: 'low' === nowSelect.quality }"
                            @click="setQuality('low')"
                        >
                            劣質<br />寶石
                        </div>
                    </div>
                    <div>{{ discript }}</div>
                    <button @click="useGem()">鑲嵌</button>
                </div>
                <div class="select-type">
                    <div
                        v-for="(name, type) in names"
                        :key="name"
                        :class="{ active: type === nowSelect.type }"
                        @click="setType(type)"
                    >
                        {{ name }}寶石
                    </div>
                </div>
            </div>
            <div>
                <button @click="undo">上一步</button>
                <button @click="clear">全部重置</button>
            </div>
        </div>
        <div class="statistics-board">
            <div>
                <div>操作步驟</div>
                <div v-for="(step, i) in steps" :key="i">
                    {{ i + 1 }}. 使用了{{ step.count }}個{{ names[step.type]
                    }}{{ qualityNames[step.quality] }}寶石
                </div>
                <div v-if="step.count">
                    {{ steps.length + 1 }}. 使用了{{ step.count }}個{{ names[step.type]
                    }}{{ qualityNames[step.quality] }}寶石
                </div>
            </div>
            <div>
                <div>統計</div>
                <div>總使用寶石數:{{ statistics.total }}</div>
                <div v-for="(gem, type) in statistics.gems" :key="type">
                    {{ gemLabel(gem, type) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flex {
    display: flex;
}
button {
    margin: 8px;
    padding: 4px;
}
.statistics-board > :nth-child(2) {
    margin-top: 16px;
}
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
    display: flex;
    justify-content: space-between;
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
