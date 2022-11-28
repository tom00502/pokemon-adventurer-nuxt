<script setup>
import { ref, reactive } from 'vue'
import { $vfm, VueFinalModal } from 'vue-final-modal'
const show = ref(false)
const count = ref(0)
const items = ref([
    { name: '血量', value: 10, rank: 20 },
    { name: '攻擊', value: 10, rank: 20 },
    { name: '防禦', value: 10, rank: 20 },
    { name: '特攻', value: 10, rank: 20 },
    { name: '特防', value: 10, rank: 20 },
    { name: '速度', value: 10, rank: 20 },
])
const beforeOpen = (e) => {
    const board = e.ref.params.value.board
    items.value[0].rank = board.hitPoint
    items.value[1].rank = board.attack
    items.value[2].rank = board.block
    items.value[3].rank = board.contact
    items.value[4].rank = board.defence
    items.value[5].rank = board.speed
    count.value = 0
    handleAgain()
}
const getRandomValueByRank = (rank) => {
    // 0 - 29
    const randomKey = Math.floor(Math.random() * 30)
    // add rank base
    const rankValue = Math.floor(((rank - 3) * 70) / 17) + randomKey
    const trueValue = Math.floor(rankValue / 10) + 1
    return trueValue
}

const handleAgain = () => {
    items.value.forEach((item) => {
        item.value = getRandomValueByRank(item.rank)
    })
    count.value += 1
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="tryReincarnationModal"
        @before-open="beforeOpen"
    >
        <div class="w-[calc(min(100vw,32rem)-48px)] px-4 py-6 text-left">
            <div class="flex items-center justify-between">
                <div class="font-medium">轉生資質</div>
            </div>
            <div class="mt-5">依據您目前的轉生石板，您的精靈轉生資質為</div>
            <div class="mb-5 mt-5">
                <div v-for="item in items" :key="item.name" class="flex items-center">
                    <div class="w-10 shrink-0">{{ item.name }}</div>
                    <div class="h-2.5 w-full rounded-full bg-gray-200">
                        <div
                            class="h-2.5 rounded-full bg-blue-600"
                            :style="`width: ${item.value}0%`"
                        ></div>
                    </div>
                    <div class="w-10 shrink-0 text-center">{{ item.value }}</div>
                </div>
            </div>
            <div class="mt-5">已試轉{{ count }}次</div>
            <div class="text-center">
                <button
                    type="button"
                    class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleAgain"
                >
                    再來一次
                </button>
            </div>
        </div>
    </vue-final-modal>
</template>
<style>
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
.normal {
    border: 3px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
}
</style>
