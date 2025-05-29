<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

// 设备状态选项
const statusOptions = [
  { label: '激活', value: '激活' },
  { label: '未激活', value: '未激活' },
  { label: '维修中', value: '维修中' },
  { label: '已报废', value: '已报废' },
]

// 设备类型选项
const typeOptions = [
  { label: '智能鞋', value: '智能鞋' },
  { label: '智能戒指', value: '智能戒指' },
  { label: '智能芯片', value: '智能芯片' },
  { label: '零撸设备', value: '零撸设备' },
]

// 设备表格列
const deviceColumns = [
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'deviceId', label: '设备ID', minWidth: 120 },
  { prop: 'status', label: '设备状态', minWidth: 100 },
  { prop: 'type', label: '设备产出', minWidth: 120 },
  { prop: 'activeTime', label: '激活时间', minWidth: 140 },
]

// 查询项
const deviceSearchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'status', label: '设备状态', component: 'ElSelect', options: statusOptions, placeholder: '请选择设备状态', clearable: true },
  { key: 'deviceId', label: '设备ID', component: 'ElInput', placeholder: '请输入设备ID' },
]

// mock 数据
const deviceMockList = Array.from({ length: 20 }).map((_, i) => ({
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  email: `user${i + 1}@example.com`,
  deviceId: `DEV${1000 + i}`,
  status: statusOptions[i % 4].value,
  type: typeOptions[i % 4].value,
  activeTime: `2024-06-0${(i % 9) + 1} 09:00:00`,
}))

// 数据请求（带筛选）
function deviceRequestData(params: any) {
  let list = [...deviceMockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.status) {
    list = list.filter(item => item.status === params.status)
  }
  if (params.deviceId) {
    list = list.filter(item => item.deviceId.includes(params.deviceId))
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
  <FaCard title="设备列表" class="mt-4">
    <CrudTable
      :columns="deviceColumns"
      :search-items="deviceSearchItems"
      :request="deviceRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
