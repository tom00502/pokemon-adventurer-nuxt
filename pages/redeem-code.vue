<script setup>
import { computed, ref, onMounted, reactive } from 'vue'
import moment from 'moment'
const { getFedeemCode } = useApi()
const redeemCode = reactive({ codes: [] })
onMounted(async () => {
    const { data } = await getFedeemCode()
    redeemCode.codes = data
})
const formatDate = (date) => {
    if (!date) return ''
    return moment(date).format('YYYY-MM-DD')
}
</script>

<template>
    <main>
        <div class="page-title">兌換碼</div>
        <div v-if="redeemCode.codes.length == 0" class="loading">
            <div class="lds-dual-ring">loading...</div>
        </div>
        <div class="table-div">
            <table v-if="redeemCode.codes.length">
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>兌換碼</th>
                        <th>內容</th>
                        <th>說明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in redeemCode.codes" :key="key">
                        <td>
                            <div>{{ formatDate(item.date) }}</div>
                        </td>
                        <td>
                            <div>{{ item.code }}</div>
                        </td>
                        <td>
                            <div>{{ item.content }}</div>
                        </td>
                        <td>
                            <div>{{ item.note }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style scoped>
table-div {
    width: 500px;
}
table {
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
}
.text-red {
    color: red;
}
.text-green {
    color: green;
}
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
