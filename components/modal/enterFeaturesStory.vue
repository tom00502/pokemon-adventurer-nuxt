<script setup>
import { ref, reactive } from 'vue'
import { $vfm, VueFinalModal } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
const pokedexStore = usePokedexStore()
const show = ref(true)
const messages = [
    '大事不好拉！！火箭隊入侵了精靈研究中心，把部分的精靈特性檔案偷走了！！',
    '如果不找回這些檔案．．．寵物冒險助理的特性搜尋功能有可能會故障．．',
    '若是有人能協助調查，補回這些缺失的檔案就好了．．．',
    '真的嗎訓練師，你願意幫忙？那真是太好了！！',
    '趕快開始進行調查吧！！',
]
const message = ref(messages[0])
const step = ref(0)
const beforeOpen = (e) => {}
const handleClick = () => {
    step.value++
    message.value = messages[step.value]
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="enterFeatureStoryModal"
        @before-open="beforeOpen"
    >
        <div class="w-[calc(min(100vw,32rem)-48px)] px-4 py-6 text-left">
            <div class="flex items-center justify-between">
                <div class="font-medium">支線任務:精靈特性調查</div>
            </div>
            <div class="mt-5 rounded-lg border-[4px] border border-black p-2">
                {{ message }}
            </div>
            <div class="mb-5 mt-5"></div>
            <div class="text-center">
                <button
                    v-if="step < 4"
                    type="button"
                    class="mr-2 inline-flex items-center rounded-lg bg-blue-700 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClick"
                >
                    <div class="animate-bounce">
                        <svg
                            aria-hidden="true"
                            class="h-5 w-5 rotate-90"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <span class="sr-only">Icon description</span>
                </button>
                <button
                    v-else
                    type="button"
                    class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="show = false"
                >
                    開始調查
                </button>
            </div>
        </div>
    </vue-final-modal>
</template>
<style></style>
