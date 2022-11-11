<script setup>
import { VueFinalModal } from 'vue-final-modal'
const show = ref(false)
const modalOptions = reactive({
    message: '提示訊息',
})
const beforeOpen = (e) => {
    const options = e.ref.params.value.options
    modalOptions.message = options.message || modalOptions.message
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="rounded-2xl p-4 bg-white"
        name="alertModal"
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
        </div>
    </vue-final-modal>
</template>
<style></style>
