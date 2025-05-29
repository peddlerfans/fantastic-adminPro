<script setup lang="ts">
import { onMounted, ref } from 'vue'
import testApi from '@/api/modules/test'
import VChart from '@/components/VChart.vue'

const total = ref(0)
const today = ref(0)
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
  const res = await testApi.deviceStatistics({ startDate, endDate })
  total.value = res.data.historyDeviceCount
  today.value = res.data.totalNewDevices || 0
  chartData.value = res.data.dailyNewDeviceList || []
  option.value = {
    type: 'line',
    data: [{ id: "device", values: chartData.value }],
    xField: 'date',
    yField: 'count',
    height: 300,
  }
}

onMounted(fetchUserStatistics)
</script>

<template>
  <FaCard title="设备报表" class="mb-4">
    <div class="mb-6 flex gap-8">
      <div class="flex-1 rounded-lg from-purple-100 to-purple-50 bg-gradient-to-r p-6 shadow">
        <div class="text-2xl text-purple-600 font-bold">
          {{ total }}
        </div>
        <div class="mt-2 text-gray-500">
          总设备数
        </div>
      </div>
      <div class="flex-1 rounded-lg from-yellow-100 to-yellow-50 bg-gradient-to-r p-6 shadow">
        <div class="text-2xl text-yellow-600 font-bold">
          {{ today }}
        </div>
        <div class="mt-2 text-gray-500">
          今日新增设备数
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="mb-2 font-bold">
        每日新增设备数
      </div>
      <VChart :option="option" />
    </div>
  </FaCard>
</template>
