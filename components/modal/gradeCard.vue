<script setup>
import { VueFinalModal } from 'vue-final-modal'
const { gradeCardlevel, gradeCardsWithUse } = useGradeCard()
const show = ref(false)
const gradeCardId = ref(1)
const gradeCard = computed(() => {
    return gradeCardsWithUse.value?.find((card) => card.id === gradeCardId.value) || {}
})
const beforeOpen = (e) => {
    gradeCardId.value = e.ref.params.value.gradeCardId
}
const gradeCardColor = computed(() => {
    const gradeCardColors = {
        normal: 'rgb(243 244 246)',
        rare: 'rgb(219 234 254)',
        epic: 'rgb(243 232 255)',
        legend: 'rgb(255 237 213)',
        supreme: 'rgb(254 226 226)',
    }
    return gradeCardColors[gradeCard.value.quality]
})
const cardFrom = {
    normal: ['普通卡牌禮包'],
    rare: ['稀有卡牌禮包'],
    epic: ['史詩卡牌禮包', '友好商店機率出現購買'],
    legend: ['傳說卡牌禮包', '友好商店機率出現購買', '傳說卡牌自選禮包'],
    supreme: ['超越卡牌禮包', '超越卡牌自選禮包'],
}
const cardFragmentsFrom = {
    epic: ['史詩卡牌碎片禮包', '紫卡碎片自選禮包'],
    legend: ['傳說卡牌碎片禮包'],
    supreme: [],
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="ShowGradeCardModal"
        @before-open="beforeOpen"
    >
        <div class="w-[calc(min(100vw,32rem)-48px)] px-4 py-6 text-left">
            <div
                class="mb-2 flex items-center justify-center rounded-md py-2"
                :class="{
                    'bg-gray-100': gradeCard.quality === 'normal',
                    'bg-blue-100': gradeCard.quality === 'rare',
                    'bg-purple-100': gradeCard.quality === 'epic',
                    'bg-orange-100': gradeCard.quality === 'legend',
                    'bg-red-100': gradeCard.quality === 'supreme',
                }"
            >
                <div class="rounded-md px-2 py-1 text-center font-medium">
                    {{ gradeCard.name }}卡牌
                </div>
            </div>
            <div class="max-h-[calc(90vh-98px)] overflow-y-auto whitespace-pre-line">
                <div class="my-2 flex items-center">
                    <div class="w-full border-b border-blue-200 p-1"></div>
                    <div class="shrink-0 rounded-lg border border-blue-200 py-2 px-4 text-center">
                        入手方式
                    </div>
                    <div class="w-full border-b border-blue-200 p-1"></div>
                </div>
                <div class="flex flex-wrap justify-center">
                    <div
                        v-for="f in cardFrom[gradeCard.quality]"
                        :key="f"
                        class="m-1 rounded-md py-1 px-2 text-center"
                        :class="{
                            'bg-gray-100': gradeCard.quality === 'normal',
                            'bg-blue-100': gradeCard.quality === 'rare',
                            'bg-purple-100': gradeCard.quality === 'epic',
                            'bg-orange-100': gradeCard.quality === 'legend',
                            'bg-red-100': gradeCard.quality === 'supreme',
                        }"
                    >
                        {{ f }}
                    </div>
                    <template v-if="gradeCard.quality === 'normal' || gradeCard.quality === 'rare'">
                        <div
                            v-for="f in gradeCard.from"
                            :key="f"
                            class="m-1 rounded-md py-1 px-2 text-center"
                            :class="{
                                'bg-gray-100': gradeCard.quality === 'normal',
                                'bg-blue-100': gradeCard.quality === 'rare',
                                'bg-purple-100': gradeCard.quality === 'epic',
                                'bg-orange-100': gradeCard.quality === 'legend',
                                'bg-red-100': gradeCard.quality === 'supreme',
                            }"
                        >
                            挑戰{{ f }}
                        </div>
                    </template>
                </div>
                <template v-if="gradeCard.quality !== 'normal' && gradeCard.quality !== 'rare'">
                    <div class="my-2 flex justify-center">
                        <div class="method-title">取得碎片合成</div>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <div
                            v-for="f in cardFragmentsFrom[gradeCard.quality]"
                            :key="f"
                            class="m-1 rounded-md py-1 px-2 text-center"
                            :class="{
                                'bg-gray-100': gradeCard.quality === 'normal',
                                'bg-blue-100': gradeCard.quality === 'rare',
                                'bg-purple-100': gradeCard.quality === 'epic',
                                'bg-orange-100': gradeCard.quality === 'legend',
                                'bg-red-100': gradeCard.quality === 'supreme',
                            }"
                        >
                            {{ f }}
                        </div>
                        <div
                            v-for="f in gradeCard.from"
                            :key="f"
                            class="m-1 rounded-md py-1 px-2 text-center"
                            :class="{
                                'bg-gray-100': gradeCard.quality === 'normal',
                                'bg-blue-100': gradeCard.quality === 'rare',
                                'bg-purple-100': gradeCard.quality === 'epic',
                                'bg-orange-100': gradeCard.quality === 'legend',
                                'bg-red-100': gradeCard.quality === 'supreme',
                            }"
                        >
                            挑戰{{ f }}
                        </div>
                    </div>
                </template>
                <div class="my-2 flex items-center">
                    <div class="w-full border-b border-blue-200 p-1"></div>
                    <div class="shrink-0 rounded-lg border border-blue-200 py-2 px-4 text-center">
                        升品階時會使用到此卡牌的精靈
                    </div>
                    <div class="w-full border-b border-blue-200 p-1"></div>
                </div>
                <div v-if="Object.keys(gradeCard.levelPokes).length === 0">沒有任何精靈使用</div>
                <div v-for="(levelUse, key) in gradeCard.levelPokes" :key="key" class="mb-3">
                    <div class="flex justify-between px-2">
                        <div class="text-center font-bold" v-html="gradeCardlevel[key].label"></div>
                        <div class="ml-auto">{{ levelUse.length }}隻</div>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <div
                            v-for="poke in levelUse"
                            :key="poke.id"
                            class="m-1 grow rounded-md py-1 px-2 text-center"
                            :class="{
                                'bg-gray-100': poke.quality === 'normal',
                                'bg-blue-100': poke.quality === 'rare',
                                'bg-purple-100': poke.quality === 'epic',
                                'bg-orange-100': poke.quality === 'legend',
                                'bg-red-100': poke.quality === 'beyond',
                            }"
                        >
                            {{ poke.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </vue-final-modal>
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
.normal {
    border: 3px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
}
* {
    --typeBgColor: v-bind(gradeCardColor);
}
.method-title {
    border-left: 8px solid var(--typeBgColor);
    border-right: 8px solid var(--typeBgColor);
    padding-left: 8px;
    padding-right: 8px;
    font-weight: 700;
    /* margin: 8px 0px 4px 0px; */
    display: inline-block;
}
</style>
