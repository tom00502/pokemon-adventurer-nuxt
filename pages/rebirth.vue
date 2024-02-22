<script setup>
import { ref, reactive, computed } from 'vue'
import { $vfm } from 'vue-final-modal'
import { useI18n } from 'vue-i18n'
import attPlans from '@/assets/json/attPlans.json'
import defPlans from '@/assets/json/defPlans.json'
const { locale, t } = useI18n()
const { getTypeColors } = usePokeTypes()
useHead({
    title: '轉生模擬',
})

class GemCount {
    constructor() {
        this.cheap = 0
        this.common = 0
        this.excellent = 0
    }

    get total() {
        return this.cheap + this.common + this.excellent
    }
}
const chartData = computed(() => {
    return {
        labels: [
            `${t('pokemon.hp')}(${board.hitPoint})`,
            `${t('pokemon.spAtk')}(${board.contact})`,
            `${t('pokemon.spDef')}(${board.defence})`,
            `${t('pokemon.speed')}(${board.speed})`,
            `${t('pokemon.defense')}(${board.block})`,
            `${t('pokemon.attack')}(${board.attack})`,
        ],
        datasets: [
            {
                label: t('rebirth.slot'),
                backgroundColor: typeColor.value.alphaColor,
                borderColor: typeColor.value.color,
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
const typeColor = computed(() => {
    return getTypeColors('water')
})
const labelColors = computed(() => {
    return Object.values(board).map((data) => {
        if (data === 0) return 'black'
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
const nowSelect = reactive({ type: 'hitPoint', quality: 'excellent' })
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
const useGem = (type = nowSelect.type, quality = nowSelect.quality) => {
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
    if (quality === 'cheap') {
        board[type] += 1
        board[effect[type]] -= 1
    }
    if (quality === 'common') {
        board[type] += 2
        board[effect[type]] -= 1
    }
    if (quality === 'excellent') {
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
}

const statistics = computed(() => {
    const gems = {
        hitPoint: new GemCount(),
        defence: new GemCount(),
        block: new GemCount(),
        contact: new GemCount(),
        attack: new GemCount(),
        speed: new GemCount(),
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
        gems: Object.fromEntries(Object.entries(gems).filter(([, value]) => value.total)),
    }
})
const gemLabel = (gem, type) => {
    const gemTypeName = t(`rebirth.gems.${type}`)
    let label = `${gemTypeName}(${gem.total}): `
    if (gem.excellent) {
        label += `${t('rebirth.excellent')}(${gem.excellent}) `
    }
    if (gem.common) {
        label += `${t('rebirth.common')}(${gem.common}) `
    }
    if (gem.cheap) {
        label += `${t('rebirth.cheap')}(${gem.cheap}) `
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
    if (step.count === 0) {
        return
    }
    step.count--
    const { quality, type } = step
    if (quality === 'cheap') {
        if (step.overflow === 0) {
            board[type] -= 1
        } else {
            step.overflow--
        }
        if (step.overflowMinus === 0) {
            board[effect[type]] += 1
        } else {
            step.overflowMinus--
        }
    }
    if (quality === 'common') {
        if (step.overflow === 0) {
            board[type] -= 2
        } else {
            step.overflow -= 2
        }
        if (step.overflowMinus === 0) {
            board[effect[type]] += 1
        } else {
            step.overflowMinus--
        }
    }
    if (quality === 'excellent') {
        if (step.overflow === 0) {
            board[type] -= 2
        } else {
            step.overflow -= 2
        }
    }
    if (step.count === 0) {
        if (steps.value.length === 0) {
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
const discript = computed(() => {
    return t(`rebirth.genDiscript.${nowSelect.type}.${nowSelect.quality}`)
    // return genDiscript[nowSelect.type][nowSelect.quality]
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
const tryLuck = () => {
    const params = {
        board,
    }
    $vfm.show('tryReincarnationModal', params)
}
const canTry = computed(() => {
    if (
        board.hitPoint < 3 ||
        board.contact < 3 ||
        board.defence < 3 ||
        board.speed < 3 ||
        board.block < 3 ||
        board.attack < 3
    )
        return false
    return true
})
</script>
<template>
    <div>
        <ModalTryReincarnation />
        <div class="page-title">{{ $t('rebirth.pageTitle') }}</div>
        <div v-if="locale == 'en'" class="plan-discript">
            Instructions:
            <ul>
                <li>
                    You can practice gem inlay, and the steps and gem usage statistics will be
                    displayed below.
                </li>
                <li>
                    Once you have achieved satisfactory values, you can inlay gems in the game
                    according to the recorded steps, making sure you have enough gems.
                </li>
                <li>
                    If you don't know how to inlay gems, you can also directly select a package.
                    After selecting, the steps and gem quantities will be displayed, which can be
                    matched according to your own gem quantities.
                </li>
            </ul>
        </div>
        <div v-else class="plan-discript">
            使用說明:
            <ul>
                <li>可進行寶石鑲嵌練習，下面會顯示操作步驟與使用寶石統計</li>
                <li>做出滿意的數值後，依照紀錄的步驟於遊戲中鑲嵌即可，須注意寶石數量是否足夠</li>
                <li>
                    不知道怎麼鑲嵌，也可以直接選套餐，選好後會顯示步驟與寶石數，可依據自身寶石數量搭配
                </li>
            </ul>
        </div>
        <div class="mt-1 lg:flex lg:gap-1">
            <div class="lg:w-full">
                {{ $t('rebirth.attackPackageSelection') }}:
                <select
                    v-model="attPlan"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    @change="usePlan()"
                >
                    <option value="">{{ $t('rebirth.pleaseSelectAttackPackage') }}</option>
                    <option v-for="(value, key) in attPlans" :key="key" :value="key">
                        {{ $t(`rebirth.packages.${key}.name`) }}
                    </option>
                </select>
                <div v-if="attPlan" class="plan-discript">
                    {{ $t(`rebirth.packages.${attPlan}.description`) }}
                </div>
            </div>
            <div class="lg:w-full">
                {{ $t('rebirth.defensePackageSelection') }}:
                <select
                    v-model="defPlan"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    @change="usePlan()"
                >
                    <option value="">{{ $t('rebirth.pleaseSelectDefensePackage') }}</option>
                    <option v-for="(value, key) in defPlans" :key="key" :value="key">
                        {{ $t(`rebirth.packages.${key}.name`) }}
                    </option>
                </select>
                <div v-if="defPlan" class="plan-discript">
                    {{ $t(`rebirth.packages.${defPlan}.description`) }}
                </div>
            </div>
        </div>
        <div class="lg:grid lg:grid-cols-2 lg:items-center">
            <div class="m-auto max-w-[500px]">
                <ClientOnly>
                    <RadarChart :chart-data="chartData" :label-colors="labelColors" />
                </ClientOnly>
            </div>
            <div class="action-board lg:shrink">
                <div class="use-gen-borad">
                    <div class="select-quality">
                        <div class="quality-select">
                            <div
                                :class="{ active: 'excellent' === nowSelect.quality }"
                                @click="setQuality('excellent')"
                            >
                                {{ $t('rebirth.gems.excellent') }}
                            </div>
                            <div
                                :class="{ active: 'common' === nowSelect.quality }"
                                @click="setQuality('common')"
                            >
                                {{ $t('rebirth.gems.common') }}
                            </div>
                            <div
                                :class="{ active: 'cheap' === nowSelect.quality }"
                                @click="setQuality('cheap')"
                            >
                                {{ $t('rebirth.gems.cheap') }}
                            </div>
                        </div>
                        <div>{{ discript }}</div>
                        <button class="m-2 p-1" @click="useGem()">{{ $t('rebirth.inlay') }}</button>
                    </div>
                    <div class="select-type">
                        <div
                            v-for="(name, type) in names"
                            :key="name"
                            :class="{ active: type === nowSelect.type }"
                            @click="setType(type)"
                        >
                            {{ $t(`rebirth.gems.${type}`) }}
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="undo"
                    >
                        {{ $t('rebirth.undo') }}
                    </button>
                    <button
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="clear"
                    >
                        {{ $t('rebirth.reset') }}
                    </button>
                    <button
                        v-if="canTry"
                        type="button"
                        class="my-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        @click="tryLuck"
                    >
                        {{ $t('rebirth.try') }}
                    </button>
                </div>
            </div>
        </div>
        <div class="statistics-board">
            <div>
                <div>{{ $t('rebirth.step') }}</div>
                <div v-for="(stepLog, i) in steps" :key="i">
                    <template v-if="locale != 'en'">
                        {{ i + 1 }}. 使用{{ stepLog.count }}個{{
                            $t(`rebirth.gemtype.${stepLog.type}`)
                        }}{{ $t(`rebirth.gems.${stepLog.quality}`) }}
                    </template>
                    <template v-else>
                        {{ i + 1 }}. Use {{ stepLog.count }}
                        {{ $t(`rebirth.${stepLog.quality}`) }}
                        {{ $t(`rebirth.gemtype.${stepLog.type}`) }} gem(s)
                    </template>
                </div>
                <div v-if="step.count">
                    <!-- {{ steps.length + 1 }}. 使用了{{ step.count }}個{{ names[step.type]
                    }}{{ qualityNames[step.quality] }}寶石 -->
                    <template v-if="locale != 'en'">
                        {{ steps.length + 1 }}. 使用{{ step.count }}個{{
                            $t(`rebirth.gemtype.${step.type}`)
                        }}{{ $t(`rebirth.gems.${step.quality}`) }}
                    </template>
                    <template v-else>
                        {{ steps.length + 1 }}. Use {{ step.count }}
                        {{ $t(`rebirth.${step.quality}`) }}
                        {{ $t(`rebirth.gemtype.${step.type}`) }} gem(s)
                    </template>
                </div>
            </div>
            <div>
                <div>{{ $t('rebirth.statistics') }}</div>
                <div>{{ $t('rebirth.totalGemUsed') }}:{{ statistics.total }}</div>
                <div v-for="(gem, type) in statistics.gems" :key="type">
                    {{ gemLabel(gem, type) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    justify-content: space-evenly;
    gap: 1rem;
}
.quality-select > div {
    /* width: 50px;
    height: 50px; */
    flex-basis: 1px;
    flex-grow: 1;
    min-width: 50px;
    min-height: 50px;
    border: 1px solid gray;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    cursor: pointer;
    padding: 0rem 0.25rem;
    text-align: center;
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
    flex-shrink: 0;
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
