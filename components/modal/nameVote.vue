<script setup>
import { ref, reactive } from 'vue'
import { $vfm, VueFinalModal } from 'vue-final-modal'
const { sentVoteName } = useApi()
const show = ref(false)

const loading = ref(false)
const beforeOpen = () => {}
const voteName = ref('')
const otherName = ref('')
const handleClick = async () => {
    const name = voteName.value === '其他' ? otherName.value : voteName.value
    const params = {
        name,
    }
    loading.value = true
    await sentVoteName(params)
    loading.value = false
    show.value = false
    const doneVote = useCookie('doneVote')
    doneVote.value = 1
    const options = {
        message: `投票完成`,
    }
    $vfm.show('alertModal', { options })
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="nameVoteModal"
        @before-open="beforeOpen"
    >
        <div class="w-[calc(min(100vw,32rem)-48px)] px-4 py-6 text-left">
            <div class="flex items-center justify-between">
                <div class="font-medium">投票活動</div>
            </div>
            <div class="mt-5">
                助理拿到了一張改名卡，想改個閃亮亮不會被遊戲<span class="text-red-700">屏蔽</span
                >的名字，要改成什麼好呢？
            </div>
            <div class="mb-5 mt-5 pr-8">
                <ul class="grid w-full list-none gap-2">
                    <li>
                        <input
                            id="寵物冒險助手"
                            v-model="voteName"
                            type="radio"
                            name="hosting"
                            value="寵物冒險助手"
                            class="peer hidden"
                            required
                        />
                        <label
                            for="寵物冒險助手"
                            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        >
                            <div class="block">
                                <div class="w-full font-semibold">寵物冒險助手</div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <input
                            id="寵物冒險手冊"
                            v-model="voteName"
                            type="radio"
                            name="hosting"
                            value="寵物冒險手冊"
                            class="peer hidden"
                        />
                        <label
                            for="寵物冒險手冊"
                            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        >
                            <div class="block">
                                <div class="w-full font-semibold">寵物冒險手冊</div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <input
                            id="寵物冒險資訊站"
                            v-model="voteName"
                            type="radio"
                            name="hosting"
                            value="寵物冒險資訊站"
                            class="peer hidden"
                        />
                        <label
                            for="寵物冒險資訊站"
                            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        >
                            <div class="block">
                                <div class="w-full font-semibold">寵物冒險資訊站</div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <input
                            id="寵物冒險秘書"
                            v-model="voteName"
                            type="radio"
                            name="hosting"
                            value="寵物冒險秘書"
                            class="peer hidden"
                        />
                        <label
                            for="寵物冒險秘書"
                            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        >
                            <div class="block">
                                <div class="w-full font-semibold">寵物冒險秘書</div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <input
                            id="其他"
                            v-model="voteName"
                            type="radio"
                            name="hosting"
                            value="其他"
                            class="peer hidden"
                        />
                        <label
                            for="其他"
                            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        >
                            <div class="flex w-full items-center">
                                <div class="mr-4 shrink-0">我建議叫做:</div>
                                <input
                                    id="large-input"
                                    v-model="otherName"
                                    for="其他"
                                    type="text"
                                    class="sm:text-md block w-full grow rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    @focus="voteName = '其他'"
                                />
                            </div>
                        </label>
                    </li>
                </ul>
            </div>
            <div class="text-center">
                <div v-if="loading" class="lds-dual-ring"></div>
                <button
                    v-else-if="voteName"
                    type="button"
                    class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleClick"
                >
                    送出
                </button>
                <button
                    v-else
                    type="button"
                    class="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                    送出
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
</style>
