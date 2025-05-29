<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

// 代币来源选项
const tokenSourceOptions = [
  { label: '确权产生', value: '确权产生' },
]

// 代币记录表格列
const tokenColumns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'source', label: '代币来源', minWidth: 120 },
  { prop: 'amount', label: '代币数量', minWidth: 100 },
  { prop: 'createdAt', label: '时间', minWidth: 140 },
]

// 查询项
const tokenSearchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'source', label: '代币来源', component: 'ElSelect', options: tokenSourceOptions, placeholder: '请选择代币来源', clearable: true },
]

// mock 数据
const tokenMockList = Array.from({ length: 20 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  source: '确权产生',
  amount: Math.floor(Math.random() * 1000),
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

// 数据请求（带筛选）
function tokenRequestData(params: any) {
  let list = [...tokenMockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.source) {
    list = list.filter(item => item.source === params.source)
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
  <FaCard title="CCT代币记录" class="mt-4">
    <CrudTable
      :columns="tokenColumns"
      :search-items="tokenSearchItems"
      :request="tokenRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
