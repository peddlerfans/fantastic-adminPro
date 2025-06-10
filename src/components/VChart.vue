<script setup lang="ts">
import VChartClass from '@visactor/vchart'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  option: any
  style?: string
  autoResize?: boolean // 新增自动调整尺寸属性
}>()

const chartRef = ref<HTMLElement | null>(null)
const chartInstance = ref<any>(null)
const renderCount = ref(0) // 重试计数器

// 安全销毁图表
function safeDispose() {
  if (chartInstance.value) {
    try {
      chartInstance.value.release()
    }
    catch (e) {
      console.warn('图表销毁异常:', e)
    }
    chartInstance.value = null
  }
}

// 增强版渲染逻辑
async function renderChart() {
  await nextTick() // 等待DOM更新

  if (!chartRef.value || !props.option) {
    return
  }

  // 检查容器尺寸
  const { offsetWidth, offsetHeight } = chartRef.value
  if (offsetWidth === 0 || offsetHeight === 0) {
    console.warn('图表容器尺寸为0，延迟重试...')
    if (renderCount.value++ < 3) {
      setTimeout(renderChart, 500)
    }
    return
  }

  try {
    safeDispose()

    // 克隆配置避免污染
    const option = JSON.parse(JSON.stringify(props.option))

    chartInstance.value = new VChartClass(option, {
      dom: chartRef.value,
      mode: 'desktop-browser', // 明确指定模式
      disableDirtyRect: true, // 禁用脏矩形优化
      renderer: 'canvas' // 强制使用canvas
    })

    await chartInstance.value.renderAsync() // 使用异步渲染
    renderCount.value = 0
  }
  catch (error) {
    console.error('图表初始化失败:', error)
    if (renderCount.value++ < 3) {
      setTimeout(renderChart, 1000)
    }
  }
}

// 自动调整尺寸
const resizeObserver = ref<ResizeObserver>()

onMounted(() => {
  renderChart()

  // 添加响应式尺寸监听
  if (props.autoResize !== false && chartRef.value) {
    resizeObserver.value = new ResizeObserver(() => {
      if (chartInstance.value) {
        chartInstance.value.resize()
      }
    })
    resizeObserver.value.observe(chartRef.value)
  }
})

watch(() => props.option, renderChart, { deep: true })

onBeforeUnmount(() => {
  safeDispose()
  resizeObserver.value?.disconnect()
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
