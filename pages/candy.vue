<script setup></script>

<template>
    <main>
        <div class="page-title">親密糖果</div>
        <div class="note">
            <ul>
                <li>捕捉寶可夢機率獲得親密糖果,掉落的糖果屬性與抓到的寶可夢屬性一致</li>
                <li>每天捕捉30隻同屬性精靈後會開始掉落L糖,捕捉30隻以前掉落S或X糖,每天0點重置</li>
                <li>每階段所需要味的糖果數量參考下表,選一種餵就可以了</li>
                <li>雙屬性寶可夢兩種屬性的糖果可以混著餵</li>
                <li>當餵食糖果出現餵養提示語時,代表該階段已餵滿</li>
                <li>餵滿一個階段後,可以進行親密度鑑定,鑑定後才會增加寶可夢素質</li>
                <li>鑑定需要親密度鑑定石,友好商店有賣,一個45水晶</li>
                <li>鑑定次數不影響提升的能力,每個階段能提升的能力值是固定的</li>
                <li>沒事不要去鑑定,鑑定次數越多,每次鑑定所需的鑑定石也會增加</li>
            </ul>
        </div>

        <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="py-3 px-6">親密度階段</th>
                        <th scope="col" class="py-3 px-6">第一階段</th>
                        <th scope="col" class="py-3 px-6">第二階段</th>
                        <th scope="col" class="py-3 px-6">第三階段</th>
                        <th scope="col" class="py-3 px-6">第四階段</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b bg-white hover:bg-gray-50">
                        <th
                            scope="row"
                            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                        >
                            所需糖果數量
                        </th>
                        <td class="py-4 px-6">
                            <div>17S</div>
                            <div>13X</div>
                            <div>10L</div>
                        </td>
                        <td class="py-4 px-6">
                            <div>25S</div>
                            <div>16X</div>
                            <div>13L</div>
                        </td>
                        <td class="py-4 px-6">
                            <div>49S</div>
                            <div>25X</div>
                            <div>16L</div>
                        </td>
                        <td class="py-4 px-6">
                            <div>79L</div>
                        </td>
                    </tr>
                    <tr class="border-b bg-white hover:bg-gray-50">
                        <th
                            scope="row"
                            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                        >
                            餵養提示語
                        </th>
                        <td class="py-4 px-6">你的寶可夢...好像有了些變化</td>
                        <td class="py-4 px-6">你的寶可夢...好像有了些變化</td>
                        <td class="py-4 px-6">你的寶可夢...好像有了些變化</td>
                        <td class="py-4 px-6">「寶可夢名字」好像對這糖果不太感興趣</td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50">
                        <th
                            scope="row"
                            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900"
                        >
                            鑑定提示語
                        </th>
                        <td class="py-4 px-6">
                            你的寶可夢...要更加疼愛它，可以麼?好像還不是和你很熟
                        </td>
                        <td class="py-4 px-6">你的寶可夢...那當可愛。</td>
                        <td class="py-4 px-6">你的寶可夢...和你這麼親密，總覺得很幸福。</td>
                        <td class="py-4 px-6">你的寶可夢...好像非常幸福，肯定和你相當親密吧!。</td>
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
