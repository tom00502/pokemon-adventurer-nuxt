<script setup>
useHead({
    title: '精靈攜帶物',
})
const { heldItems } = useHeldItem()
const router = useRouter()
const searchText = ref('')
const filterItems = computed(() => {
    let result = heldItems.value
    if (searchText.value)
        result = result.filter(
            (item) =>
                item.name.includes(searchText.value) ||
                item.effectStrings[3].includes(searchText.value) ||
                item.direction.includes(searchText.value)
        )
    return result
})
const handleClick = (poke) => {
    router.push({ path: `/heldItem/${poke.id}` })
}
onMounted(() => {
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})

const handleImageError = (event) => {
    // 圖片加載錯誤時觸發此方法
    // 將圖片的 src 屬性設置為替代圖片的網址
    event.target.src = '/icons/heldItem/unknow.webp'
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
        <div class="page-title">精靈攜帶物</div>
        <div class="note">
            <ul>
                <li>裝備不同攜帶物可獲得不同效果</li>
                <li>點擊攜帶物名稱可以查看詳細數據</li>
            </ul>
        </div>
        <div class="mt-2 flex flex-wrap items-center">
            <div class="my-1 mr-3">
                攜帶物名稱或效果:
                <input
                    v-model="searchText"
                    type="text"
                    class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
        </div>
        <div
            v-if="filterItems.length"
            class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg"
        >
            <table class="w-full text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">攜帶物</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">1等效果</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">10等效果</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">20等效果</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">30等效果</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">說明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in filterItems"
                        :key="item.id"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <th
                            scope="row"
                            class="cursor-pointer whitespace-nowrap py-1 px-1 font-medium text-gray-900"
                        >
                            <div
                                class="flex items-center justify-start gap-1 px-1"
                                @click="handleClick(item)"
                            >
                                <div class="icon">
                                    <img
                                        :src="`/icons/heldItem/${item.id}.png`"
                                        @error="handleImageError"
                                    />
                                </div>
                                {{ item.name }}
                            </div>
                        </th>
                        <td class="min-w-[100px] py-1 px-1">
                            <div v-html="item.effectStrings[0]"></div>
                        </td>
                        <td class="min-w-[100px] py-1 px-1">
                            <div v-html="item.effectStrings[1]"></div>
                        </td>
                        <td class="min-w-[100px] py-1 px-1">
                            <div v-html="item.effectStrings[2]"></div>
                        </td>
                        <td class="min-w-[100px] py-1 px-1">
                            <div v-html="item.effectStrings[3]"></div>
                        </td>
                        <td class="min-w-[200px] py-1 px-1">
                            <div>{{ item.direction }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p class="font-semiblod mt-3 text-xl">沒有相符的搜尋結果</p>
        </div>
    </main>
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
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
.page-title {
    border-left: 8px solid rgb(255, 122, 60);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.poke-list {
    display: flex;
    flex-wrap: wrap;
    background: #dbffdba4;
    padding: 8px;
    border-radius: 8px;
}
.poke-list > div {
    padding: 4px;
    margin: 4px;
    flex-grow: 1;
    text-align: center;
    max-width: 160px;
}
.area {
    margin: 8px 0px;
}
.area span {
    border-left: 4px solid green;
    border-right: 4px solid green;
    padding: 0px 8px;
}
.icon img {
    height: 70%;
    width: 70%;
    margin: 15%;
}
.icon {
    border-radius: 100%;
    height: 50px;
    width: 50px;
    /* margin: auto; */
    transition: 200ms all;
}
.icon:hover {
    filter: saturate(200%);
    transform: scale(1.1);
    cursor: pointer;
}
</style>
