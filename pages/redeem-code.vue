<script setup>
import { computed, ref, onMounted, reactive } from 'vue'
import moment from 'moment'
import { useAlertStore } from '@/stores/alert'
const alertStore = useAlertStore()
useHead({
    title: '兌換碼',
    script: [
        {
            src: 'https://www.googleoptimize.com/optimize.js?id=OPT-KTZQJSL',
        },
    ],
})
const { getFedeemCode } = useApi()
const redeemCode = reactive({ codes: [] })
onMounted(async () => {
    const { data } = await getFedeemCode()
    redeemCode.codes = data
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
const formatDate = (date) => {
    if (!date) return ''
    return moment(date).format('YYYY-MM-DD')
}
const copyCode = (code) => {
    const cb = navigator.clipboard
    cb.writeText(code)
    alertStore.triggerAlert(`已複製禮包碼: ${code}`)
}
</script>

<template>
    <main>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="6422833388"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="page-title">兌換碼</div>
        <div v-if="redeemCode.codes.length == 0" class="slowpoke-loading" />
        <div class="relative mt-1 overflow-x-auto">
            <table v-if="redeemCode.codes.length" class="w-full text-left text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">日期</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">兌換碼</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2"></th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">內容</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-2">說明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, key) in redeemCode.codes"
                        :key="key"
                        class="border-b bg-white"
                    >
                        <td class="whitespace-nowrap p-2">{{ formatDate(item.date) }}</td>
                        <th scope="row" class="whitespace-nowrap p-2 font-medium text-gray-900">
                            {{ item.code }}
                        </th>
                        <td class="whitespace-nowrap p-2">
                            <button
                                type="button"
                                class="rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                @click="copyCode(item.code)"
                            >
                                複製
                            </button>
                        </td>
                        <td class="whitespace-nowrap p-2">{{ item.content }}</td>
                        <td class="whitespace-nowrap p-2">{{ item.note }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style scoped>
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
