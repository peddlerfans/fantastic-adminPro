<script setup lang="ts">
/// <reference lib="dom" />
import { VChart as VChartClass } from '@visactor/vchart'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  option: any
  style?: string
}>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: any = null

function renderChart() {
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.release()
    }
    chartInstance = new VChartClass(props.option, { dom: chartRef.value })
    chartInstance.renderSync()
  }
}

onMounted(() => {
  renderChart()
})

watch(() => props.option, () => {
  renderChart()
}, { deep: true })

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.release()
    chartInstance = null
  }
})
</script>

<script lang="ts">
export default {
  name: 'VChart',
}
</script>

<template>
  <div ref="chartRef" :style="style || 'width: 100%; height: 300px;'" />
</template>
