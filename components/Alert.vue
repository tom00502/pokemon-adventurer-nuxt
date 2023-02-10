<script setup>
import { useAlertStore } from '@/stores/alert'
const alertStore = useAlertStore()
</script>
<template>
    <div class="relative flex justify-center">
        <div
            class="fixed z-10 mb-4 flex justify-center border-t-4 border-blue-300 bg-blue-50 p-4 text-blue-800 transition-all duration-300 ease-in"
            :class="alertStore.show ? 'top-14' : '-top-14'"
        >
            <svg
                class="h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                ></path>
            </svg>
            <div class="ml-3 text-sm font-medium">{{ alertStore.alertMessage }}</div>
        </div>
    </div>
</template>
