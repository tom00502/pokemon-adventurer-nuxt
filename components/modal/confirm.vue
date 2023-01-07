<script setup>
import { VueFinalModal } from 'vue-final-modal'
const show = ref(false)
const modalOptions = reactive({
    message: '提示訊息',
})
let confirmCallback = () => {}
const handleConfirm = (value) => {
    show.value = false
    confirmCallback(value)
}
const beforeOpen = (e) => {
    const options = e.ref.params.value.options
    modalOptions.message = options.message || modalOptions.message
    confirmCallback = options.confirmCallback
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="rounded-2xl p-4 bg-white"
        name="confirmModal"
        @before-open="beforeOpen"
    >
        <div class="text-sm">
            <div class="flex h-[40px] items-center justify-center">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.9999 16.2001L4.7999 12.0001L3.3999 13.4001L8.9999 19.0001L20.9999 7.0001L19.5999 5.6001L8.9999 16.2001Z"
                        fill="black"
                    />
                </svg>
            </div>
            <div class="whitespace-pre-line">
                {{ modalOptions.message }}
            </div>
            <div class="mt-5 flex justify-around">
                <button
                    type="button"
                    class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleConfirm(true)"
                >
                    確認
                </button>
                <button
                    type="button"
                    class="my-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="handleConfirm(false)"
                >
                    取消
                </button>
            </div>
        </div>
    </vue-final-modal>
</template>
<style></style>
