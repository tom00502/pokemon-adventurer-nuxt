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
const emit = defineEmits(['lockClick'])
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
        onClick: (evt, activeEls, chart) => {
            const { x, y } = evt
            let index = -1

            for (let i = 0; i < chart.scales.r._pointLabelItems.length; i++) {
                const { bottom, top, left, right } = chart.scales.r._pointLabelItems[i]

                if (x >= left && x <= right && y >= top && y <= bottom) {
                    index = i
                    break
                }
            }

            if (index === -1) {
                return
            }

            // const clickedLabel = chart.scales.r._pointLabels[index]
            emit('lockClick', index)
        },
    }
})
</script>

<template>
    <Radar :data="chartData" :options="chartOptions" />
</template>
