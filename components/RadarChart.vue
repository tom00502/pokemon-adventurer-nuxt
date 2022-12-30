<script setup>
import { Radar } from 'vue-chartjs'
import {
    Chart,
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement,
} from 'chart.js'
import { computed } from 'vue'
Chart.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement)
const props = defineProps({
    chartData: {
        type: Object,
        required: true,
    },
    labelColors: {
        type: Object,
        required: true,
    },
})
const chartOptions = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 20,
                pointLabels: {
                    font: {
                        size: 20,
                    },
                    color: props.labelColors,
                },
            },
        },
    }
})
</script>

<template>
    <Radar :data="chartData" :options="chartOptions" />
</template>
