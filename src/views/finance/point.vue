<script setup lang="ts">
// import { ref } from 'vue'
import CrudTable from '@/components/CrudTable/index.vue'

// 积分来源选项
const sourceOptions = [
  { label: '设备采集', value: '设备采集' },
  { label: '分佣', value: '分佣' },
  { label: '确权', value: '确权' },
  { label: '智算设备', value: '智算设备' },
]

// 积分记录表格列
const scoreColumns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'source', label: '积分来源', minWidth: 120 },
  { prop: 'amount', label: '积分数量', minWidth: 100 },
  { prop: 'createdAt', label: '时间', minWidth: 140 },
]

// 查询项
const scoreSearchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'source', label: '积分来源', component: 'ElSelect', options: sourceOptions, placeholder: '请选择积分来源', multiple: true, clearable: true },
]

// mock 数据
const scoreMockList = Array.from({ length: 20 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  source: sourceOptions[i % 4].value,
  amount: Math.floor(Math.random() * 1000),
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

// 数据请求（带筛选）
function scoreRequestData(params: any) {
  let list = [...scoreMockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.source && params.source.length) {
    list = list.filter(item => params.source.includes(item.source))
  }
  // 分页
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
  <FaCard title="积分记录" class="mt-4">
    <CrudTable
      :columns="scoreColumns"
      :search-items="scoreSearchItems"
      :request="scoreRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
