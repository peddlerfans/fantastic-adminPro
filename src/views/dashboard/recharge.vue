<script setup lang="ts">
import { onMounted, ref } from 'vue'
import testApi from '@/api/modules/test'
import VChart from '@/components/VChart.vue'

const total = ref(88888)
const today = ref(888)
const chartData = ref<any[]>([])
const option = ref<any>({
  type: 'line',
  data: [],
  xField: 'date',
  yField: 'value',
  height: 300,
})

async function fetchUserStatistics() {
  // 示例：默认查询最近7天
  const now = new Date()
  const endDate = now.toISOString().slice(0, 10)
  const startDate = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const res = await testApi.rechargeStatistics({ startDate, endDate })
  total.value = res.data.totalRecharge
  today.value = res.data.totalRechargeToday || 0
  chartData.value = res.data.dailyNewRechargesList || []
  option.value = {
    type: 'line',
    data: [{ id: "user", values: chartData.value }],
    xField: 'date',
    yField: 'count',
    height: 300,
  }
}

onMounted(fetchUserStatistics)
</script>

<template>
  <FaCard title="充值报表" class="mb-4">
    <div class="mb-6 flex gap-8">
      <div class="flex-1 rounded-lg from-pink-100 to-pink-50 bg-gradient-to-r p-6 shadow">
        <div class="text-2xl text-pink-600 font-bold">
          {{ total }}
        </div>
        <div class="mt-2 text-gray-500">
          充值总数
        </div>
      </div>
      <div class="flex-1 rounded-lg from-orange-100 to-orange-50 bg-gradient-to-r p-6 shadow">
        <div class="text-2xl text-orange-600 font-bold">
          {{ today }}
        </div>
        <div class="mt-2 text-gray-500">
          今日充值数
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="mb-2 font-bold">
        每日充值曲线图
      </div>
      <VChart :option="option" />
    </div>
  </FaCard>
</template>
