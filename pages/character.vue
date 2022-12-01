<script setup>
useHead({
    title: '性格列表',
})
const table = {
    怕寂寞: { attack: '+', block: '-' },
    固执: { attack: '+', contact: '-' },
    顽皮: { attack: '+', defence: '-' },
    勇敢: { attack: '+', speed: '-' },
    大胆: { attack: '-', block: '+' },
    淘气: { contact: '-', block: '+' },
    乐天: { defence: '-', block: '+' },
    悠闲: { speed: '-', block: '+' },
    内敛: { contact: '+', attack: '-' },
    慢吞吞: { contact: '+', block: '-' },
    马虎: { contact: '+', defence: '-' },
    冷静: { contact: '+', speed: '-' },
    温和: { defence: '+', attack: '-' },
    温顺: { defence: '+', block: '-' },
    慎重: { defence: '+', contact: '-' },
    自大: { defence: '+', speed: '-' },
    胆小: { speed: '+', attack: '-' },
    急躁: { speed: '+', block: '-' },
    爽朗: { speed: '+', contact: '-' },
    天真: { speed: '+', defence: '-' },
    勤奋: {},
    浮躁: {},
    坦率: {},
    害羞: {},
    认真: {},
}
const getText = (value) => {
    if (value === '+') {
        return '+10%'
    }
    if (value === '-') {
        return '-10%'
    }
    return ' '
}
</script>

<template>
    <main>
        <div class="page-title">性格列表</div>
        <div class="table-div">
            <table>
                <thead>
                    <tr>
                        <th>性格</th>
                        <th>攻擊</th>
                        <th>防禦</th>
                        <th>特攻</th>
                        <th>特防</th>
                        <th>速度</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in table" :key="key">
                        <td>{{ key }}</td>
                        <td>
                            <div
                                :class="{
                                    'text-red': item.attack == '-',
                                    'text-green': item.attack == '+',
                                }"
                            >
                                {{ getText(item.attack) }}
                            </div>
                        </td>
                        <td>
                            <div
                                :class="{
                                    'text-red': item.block == '-',
                                    'text-green': item.block == '+',
                                }"
                            >
                                {{ getText(item.block) }}
                            </div>
                        </td>
                        <td>
                            <div
                                :class="{
                                    'text-red': item.contact == '-',
                                    'text-green': item.contact == '+',
                                }"
                            >
                                {{ getText(item.contact) }}
                            </div>
                        </td>
                        <td>
                            <div
                                :class="{
                                    'text-red': item.defence == '-',
                                    'text-green': item.defence == '+',
                                }"
                            >
                                {{ getText(item.defence) }}
                            </div>
                        </td>
                        <td>
                            <div
                                :class="{
                                    'text-red': item.speed == '-',
                                    'text-green': item.speed == '+',
                                }"
                            >
                                {{ getText(item.speed) }}
                            </div>
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
    text-align: center;
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
