<script setup>
import { onMounted, reactive } from 'vue'
import moment from 'moment'
useHead({
    title: '關於本站',
})
const { getVersions } = useApi()
const version = reactive({ details: [] })
onMounted(async () => {
    const { data } = await getVersions()
    version.details = data
})
const formatDate = (date) => {
    if (!date) return ''
    return moment(date).format('YYYY-MM-DD')
}
</script>
<template>
    <div class="about">
        <div class="card">
            <div>陸續更新中~您的回饋是進步的動力!!</div>
            <div>若有任何建議、或想提供攻略資訊、發現錯誤，歡迎在群組留言或寄信至站長信箱</div>
        </div>
        <div class="card">
            <h3>
                <a href="mailto:gongyingparsons@gmail.com">寄信給站長</a>
            </h3>

            gongyingparsons@gmail.com
        </div>
        <div class="card">
            <div>製作: S67_Sanna</div>
            <div>特別感謝: S109_夏天</div>
        </div>
        <div class="card relative overflow-x-auto">
            <table v-if="version.details.length" class="w-full text-left text-sm text-gray-500">
                <thead class="ext-xs bg-gray-50 uppercase text-gray-700">
                    <tr>
                        <th class="py-3 px-6">日期</th>
                        <th class="py-3 px-6">版本</th>
                        <th class="py-3 px-6">內容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in version.details" :key="key">
                        <td class="py-3 px-6">
                            <div>{{ formatDate(item.date) }}</div>
                        </td>
                        <td class="py-3 px-6">
                            <div>{{ item.version }}</div>
                        </td>
                        <td class="py-3 px-6">
                            <div>{{ item.detail }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.about {
    /*text-align: center;*/
    padding: 8px;
}
.card {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    /*font-size: 1.5rem;*/
    color: black;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
/* table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid gray;
    text-align: left;
    font-size: 16px;
}
table tr {
    border-bottom: 1px rgb(177, 177, 177) solid;
    width: 100%;
    display: table;
    table-layout: fixed;
}
table tbody {
    display: block;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
table tbody::-webkit-scrollbar {
    display: none;
} */
</style>
