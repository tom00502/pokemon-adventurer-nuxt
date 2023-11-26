<script setup>
import { onMounted, reactive } from 'vue'
import fetters from '@/assets/json/fetters.json'
useHead({
    title: '羈絆之心',
})
</script>

<template>
    <main>
        <div class="page-title">精靈羈絆</div>
        <div class="table-div">
            <table v-if="fetters.length">
                <thead>
                    <tr>
                        <th>精靈</th>
                        <th>羈絆內容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in fetters" :key="key">
                        <td>
                            <div>{{ item.name }}</div>
                        </td>
                        <td>
                            <div>{{ item.effect }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style scoped>
table {
    margin-top: 8px;
    font-size: 14px;
    /* border-collapse: collapse; */
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
}
td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
}
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
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
