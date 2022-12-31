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
    selectTypes: {
        type: Array,
        required: true,
        default: () => {
            return []
        },
    },
})
const { chartData: chartDataProp } = toRefs(props)
const myChart = ref(null)
const isShowAll = ref(true)
const data = computed(() => {
    return props.chartData
})
const selectTypes = computed(() => {
    return props.selectTypes
})
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
const handleShow = (value) => {
    isShowAll.value = value
    if (isShowAll.value) {
        myChart.value.chart.data.datasets.forEach((dataset, index) => {
            myChart.value.chart.show(index)
        })
    } else {
        myChart.value.chart.data.datasets.forEach((dataset, index) => {
            if (!selectTypes.value.includes(dataset.label)) {
                myChart.value.chart.hide(index)
            }
        })
    }
    myChart.value.chart.update()
}
watch(
    () => selectTypes.value,
    () => {
        if (!selectTypes.value.length) {
            isShowAll.value = true
        }
        if (isShowAll.value) {
            myChart.value.chart.data.datasets.forEach((dataset, index) => {
                myChart.value.chart.show(index)
            })
        } else {
            myChart.value.chart.data.datasets.forEach((dataset, index) => {
                if (!selectTypes.value.includes(dataset.label)) {
                    myChart.value.chart.hide(index)
                } else {
                    myChart.value.chart.show(index)
                }
            })
        }
        myChart.value.chart.update()
    }
)
</script>

<template>
    <div>
        <div v-if="selectTypes.length" class="mt-2 flex justify-center">
            <div>
                <button
                    type="button"
                    class="ml-auto rounded-tl-lg border border-b-0 border-sky-700 px-2 py-1 text-sm font-medium hover:bg-sky-800 hover:text-white"
                    :class="{ 'bg-sky-700 text-white': !isShowAll, 'sky-700 bg-white': isShowAll }"
                    @click="handleShow(false)"
                >
                    只顯示選擇屬性
                </button>
                <button
                    type="button"
                    class="ml-auto rounded-tr-lg border border-b-0 border-sky-700 px-2 py-1 text-sm font-medium hover:bg-sky-800 hover:text-white"
                    :class="{ 'bg-sky-700 text-white': isShowAll, 'sky-700 bg-white': !isShowAll }"
                    @click="handleShow(true)"
                >
                    顯示所有屬性
                </button>
            </div>
        </div>
        <div class="overflow-x-auto border border-sky-700">
            <div class="min-w-[600px]" :style="{ height: style.height }">
                <Bar ref="myChart" :data="data" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>
