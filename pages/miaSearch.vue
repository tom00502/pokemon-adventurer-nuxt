<script setup>
useHead({
    title: 'Mia Search',
})
const results = [
    { str1: '如何打爆金寶三', str2: '金寶三弱點' },
    { str1: '年終花紅', str2: '星君老闆企業職缺' },
    { str1: '(´･ω･ˋ)', str2: '喜歡半夜洗澡的妹子' },
    { str1: 'Mia年紀', str2: '依情境自由變化的數字' },
]
const { getCat } = useApi()
const startSearch = ref(false)
const imgSrc = ref('')
const resultIndex = ref(0)
const loading = ref(false)
const handleSearch = async () => {
    resultIndex.value = Math.floor(Math.random() * results.length)
    loading.value = true
    startSearch.value = true
    const { data } = await getCat()
    imgSrc.value = data.value[0].url
}
const isLoad = () => {
    loading.value = false
}
</script>

<template>
    <div class="bg-white">
        <div class="py-3 text-center text-3xl">
            <span class="text-red-500">M</span><span class="text-yellow-500">i</span
            ><span class="text-green-500">A</span
            ><span class="ml-2 text-xl text-blue-500">搜尋</span>
        </div>
        <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                    class="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>
            <input
                id="default-search"
                type="search"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="輸入關鍵字"
                required
            />
            <button
                class="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                @click="handleSearch"
            >
                Search
            </button>
        </div>
        <div v-if="loading" class="loading">
            <div class="lds-dual-ring">loading...</div>
        </div>
        <div v-show="!loading && startSearch" class="flex flex-col items-center">
            <div class="">
                <p class="font-semiblod mt-3 text-xl">
                    <span class="text-red-600">Mia搜哩</span> 沒有相符的搜尋結果
                </p>
                <p class="mt-3 text-gray-500">
                    請嘗試使用目標網頁可能出現的字詞進行搜尋。例如，如果你原本搜尋的是「{{
                        results[resultIndex].str1
                    }}」，可以改為搜尋「{{ results[resultIndex].str2 }}」。
                </p>
            </div>
            <div class="p-3">
                <img :src="imgSrc" alt="" @load="isLoad" />
            </div>
        </div>
    </div>
</template>
