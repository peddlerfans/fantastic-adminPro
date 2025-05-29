<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

const columns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'score', label: '获得积分', minWidth: 100 },
  { prop: 'createdAt', label: '获得时间', minWidth: 140 },
]

const searchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
]

const mockList = Array.from({ length: 20 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  score: Math.floor(Math.random() * 1000),
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

function requestData(params: any) {
  let list = [...mockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
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
