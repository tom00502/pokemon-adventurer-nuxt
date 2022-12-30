<script setup>
import { Bar } from 'vue-chartjs'
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed } from 'vue'
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const props = defineProps({
    chartData: {
        type: Object,
        required: true,
    },
    // labelColors: {
    //     type: Object,
    //     required: true,
    // },
})
const { chartData: chartDataProp } = toRefs(props)
const style = computed(() => {
    const dataHeight = chartDataProp?.labels?.length * 25
    const height = dataHeight > 400 ? dataHeight : 400
    return {
        height: `${height}px`,
    }
})
const chartOptions = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    }
})
</script>

<template>
    <div :style="{ height: style.height }">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>
