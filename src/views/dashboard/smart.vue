<script setup lang="ts">
import { onMounted, ref } from 'vue'
import testApi from '@/api/modules/test'
import VChart from '@/components/VChart.vue'

const total = ref({
  totalCount: 0,
  totalPrice: 0,
})
const today = ref({
  totalCount: 0,
  totalPrice: 0,
})
const chartData = ref<any[]>([])
const option = ref<any>({
  type: 'line',
  data: [],
  xField: 'date',
  yField: 'count',
  height: 300,
})

async function fetchUserStatistics() {
  // 示例：默认查询最近7天
  const now = new Date()
  const endDate = now.toISOString().slice(0, 10)
  const startDate = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const res = await testApi.aiStatistics({ startDate, endDate })
  total.value = res.data.historyAiComputingCountAndTotalPrice
  today.value = res.data.todayNewAiComputingCountAndTotalPrice || {
    count: 0,
    price: 0,
  }
  chartData.value = res.data.dailyNewAiComputingReport || []
  option.value = {
    type: 'line',
    data: [{ id: "ai", values: chartData.value }],
    xField: 'date',
    yField: 'count',
    height: 300,
  }
}

onMounted(fetchUserStatistics)
</script>

<template>
  <FaCard title="智算报表" class="mb-4">
    <div class="mb-6 flex gap-8">
      <div class="flex-1 rounded-lg from-indigo-100 to-indigo-50 bg-gradient-to-r p-6 shadow">
        <div class="text-2xl text-indigo-600 font-bold">
          {{ total.totalCount }} {{ total.totalPrice }}
        </div>
        <div class="mt-2 text-gray-500">
          历史智算数及总价
        </div>
      </div>
      <div class="flex-1 rounded-lg from-pink-100 to-pink-50 bg-gradient-to-r p-6 shadow">
        <div class="text-2xl text-pink-600 font-bold">
          {{ today.totalCount }} {{ today.totalPrice }}
        </div>
        <div class="mt-2 text-gray-500">
          今日新增智算数及总价
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="mb-2 font-bold">
        每日新增智算数及总价曲线图
      </div>
      <VChart :option="option" />
    </div>
  </FaCard>
</template>
