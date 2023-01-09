<script setup>
import candyValues from '@/assets/json/candyValues.json'
useHead({
    title: '親密度提升表',
})
const searchText = ref(0)
const showTable = computed(() => {
    if (!searchText.value) return candyValues
    return candyValues.filter((value) => value.stat === searchText.value)
})
onMounted(async () => {
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
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
        <div class="page-title">親密度提升表</div>
        <div class="note">
            <ul>
                <li>
                    取得糖果攻略請至<RouterLink
                        class="font-bold text-blue-700 underline"
                        to="/candySearch"
                        >糖果分佈</RouterLink
                    >功能
                </li>
                <li>
                    糖果餵食攻略請至<RouterLink
                        class="font-bold text-blue-700 underline"
                        to="/candy"
                        >親密糖果</RouterLink
                    >功能
                </li>
                <li>親密度鑑定後提升的能力值與精靈種族值有關</li>
                <li>從精靈頁面點擊愛心後可查看目前因為親密度提升的數值(綠色部分)</li>
                <li>
                    相同種族值每個階段提升的能力值是固定的，可以藉由下表知道該精靈目前的親密度階段
                </li>
                <li>若是沒餵滿糖果就鑑定，能力值會依照該目前餵食的糖果數量做等比例的提升</li>
            </ul>
        </div>
        <div class="my-1 mr-3">
            搜尋種族值:
            <input
                v-model.number="searchText"
                type="number"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">種族值</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生後<br />第四階</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生後<br />第三階</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生後<br />第二階</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生後<br />第一階</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生前<br />第四階</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生前<br />第三階</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生前<br />第二階</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">轉生前<br />第一階</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="candyValue in showTable"
                        :key="candyValue.stat"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <th
                            scope="row"
                            class="whitespace-nowrap py-1 px-4 font-medium text-gray-900"
                        >
                            {{ candyValue.stat }}
                        </th>
                        <td class="py-1 px-1">{{ candyValue.s4 }}</td>
                        <td class="py-1 px-1">{{ candyValue.s3 }}</td>
                        <td class="py-1 px-1">{{ candyValue.s2 }}</td>
                        <td class="py-1 px-1">{{ candyValue.s1 }}</td>
                        <td class="py-1 px-1">{{ candyValue.v4 }}</td>
                        <td class="py-1 px-1">{{ candyValue.v3 }}</td>
                        <td class="py-1 px-1">{{ candyValue.v2 }}</td>
                        <td class="py-1 px-1">{{ candyValue.v1 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style scoped>
/* table {
    margin-top: 8px;
    font-size: 14px;
    border-collapse: collapse;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
} */
table tr {
    /* border-bottom: 1px solid rgb(177, 177, 177); */
}
/* td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
} */
/*第一欄第一列：左上*/
tr:first-child td:first-child {
    border-top-left-radius: 8px;
}
/*第一欄最後列：左下*/
tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}
/*最後欄第一列：右上*/
tr:first-child td:last-child {
    border-top-right-radius: 10px;
}
/*最後欄第一列：右下*/
tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}
.legend {
    background: rgb(255, 255, 150);
    /* background: linear-gradient(to right, #feffdb 5%, #f8ff36e1 100%);
    border-left: 7px solid yellow;
    border-right: 7px solid yellow; */
}
.epic {
    background: rgb(201, 150, 255);
    /* background: linear-gradient(to right, #ffdbff 5%, #ff36f8e1 100%);
    border-left: 7px solid rgb(192, 0, 192);
    border-right: 7px solid rgb(192, 0, 192); */
}
.rare {
    background: rgb(111, 255, 255);
    /* border-left: 7px solid rgb(46, 57, 255); */
}
.great {
    background: rgb(150, 255, 164);
    /* border-left: 7px solid rgb(150, 255, 164); */
}

.page-title {
    border-left: 8px solid rgb(255, 60, 93);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
</style>
