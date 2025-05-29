<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

// 保险状态选项
const statusOptions = [
  { label: '未选择', value: '未选择' },
  { label: '选择U', value: '选择U' },
  { label: '选择币', value: '选择币' },
  { label: '自动选择', value: '自动选择' },
]

// 保险表格列
const insuranceColumns = [
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'releasedToken', label: '已释放币', minWidth: 100 },
  { prop: 'releasedScore', label: '已释放积分', minWidth: 100 },
  { prop: 'status', label: '状态', minWidth: 100 },
  { prop: 'buyTime', label: '购买时间', minWidth: 140 },
]

// 查询项
const insuranceSearchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'status', label: '状态', component: 'ElSelect', options: statusOptions, placeholder: '请选择状态', clearable: true },
]

// mock 数据
const insuranceMockList = Array.from({ length: 20 }).map((_, i) => ({
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  email: `user${i + 1}@example.com`,
  releasedToken: Math.floor(Math.random() * 1000),
  releasedScore: Math.floor(Math.random() * 500),
  status: statusOptions[i % 4].value,
  buyTime: `2024-06-0${(i % 9) + 1} 09:00:00`,
}))

// 数据请求（带筛选）
function insuranceRequestData(params: any) {
  let list = [...insuranceMockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.status) {
    list = list.filter(item => item.status === params.status)
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
  <FaCard title="保险列表" class="mt-4">
    <CrudTable
      :columns="insuranceColumns"
      :search-items="insuranceSearchItems"
      :request="insuranceRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
