<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

// 步数来源选项
const stepSourceOptions = [
  { label: '智能鞋', value: '智能鞋' },
  { label: '智能戒指', value: '智能戒指' },
  { label: '智能芯片', value: '智能芯片' },
  { label: '零撸设备', value: '零撸设备' },
]

// 步数记录表格列
const stepColumns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'source', label: '步数来源', minWidth: 120 },
  { prop: 'step', label: '步数', minWidth: 100 },
  { prop: 'createdAt', label: '时间', minWidth: 140 },
]

// 查询项
const stepSearchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'source', label: '步数来源', component: 'ElSelect', options: stepSourceOptions, placeholder: '请选择步数来源', multiple: true, clearable: true },
]

// mock 数据
const stepMockList = Array.from({ length: 20 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  source: stepSourceOptions[i % 4].value,
  step: Math.floor(Math.random() * 20000),
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

// 数据请求（带筛选）
function stepRequestData(params: any) {
  let list = [...stepMockList]
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
  <FaCard title="步数记录" class="mt-4">
    <CrudTable
      :columns="stepColumns"
      :search-items="stepSearchItems"
      :request="stepRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
