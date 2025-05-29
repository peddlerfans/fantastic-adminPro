<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

const columns = [
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'leader', label: '上级领导', minWidth: 120 },
  { prop: 'rate', label: '占比', minWidth: 80 },
  { prop: 'score', label: '获得积分', minWidth: 100 },
  { prop: 'stage', label: '所处阶段', minWidth: 100 },
  { prop: 'createdAt', label: '时间', minWidth: 140 },
]

const searchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'mode', label: '模式', component: 'ElSelect', options: [
    { label: '模式A', value: 'A' },
    { label: '模式B', value: 'B' },
  ], placeholder: '请选择模式', clearable: true },
  { key: 'stage', label: '阶段', component: 'ElSelect', options: [
    { label: '第一阶段', value: '1' },
    { label: '第二阶段', value: '2' },
    { label: '第三阶段', value: '3' },
  ], placeholder: '请选择阶段', clearable: true },
]

const mockList = Array.from({ length: 20 }).map((_, i) => ({
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  email: `user${i + 1}@example.com`,
  leader: `leader${i % 5}`,
  rate: `${10 + i}%`,
  score: Math.floor(Math.random() * 1000),
  stage: `${(i % 3) + 1}`,
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
  mode: i % 2 === 0 ? 'A' : 'B',
}))

function requestData(params: any) {
  let list = [...mockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.mode) {
    list = list.filter(item => item.mode === params.mode)
  }
  if (params.stage) {
    list = list.filter(item => item.stage === params.stage)
  }
  const { page = 1, size = 10 } = params
  const start = (page - 1) * size
  const end = start + size
  return Promise.resolve({
    data: {
      list: list.slice(start, end),
      total: list.length,
    }
  })
}
</script>

<template>
  <CrudTable :columns="columns" :search-items="searchItems" :request="requestData" :batch-enabled="false" />
</template>
