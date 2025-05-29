<script setup lang="ts">
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable/index.vue'

// 表格列配置，支持排序
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 100 },
  { prop: 'usdt', label: 'USDT余额', minWidth: 100, sortable: true },
  { prop: 'cct', label: 'CCT余额', minWidth: 100, sortable: true },
  { prop: 'carbon', label: '碳积分余额', minWidth: 100, sortable: true },
  { prop: 'deviceCount', label: '可用设备数', minWidth: 100, sortable: true },
  { prop: 'aiDeviceCount', label: '可用智算设备', minWidth: 110, sortable: true },
  { prop: 'totalSteps', label: '产生总步数', minWidth: 120, sortable: true },
])

// 查询项
const searchItems = ref([
  { key: 'address', label: '地址', component: 'ElInput', placeholder: '请输入地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
])

// mock 数据
const mockList = Array.from({ length: 20 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: ['北京', '上海', '深圳', '广州'][i % 4],
  usdt: Math.floor(Math.random() * 10000),
  cct: Math.floor(Math.random() * 5000),
  carbon: Math.floor(Math.random() * 2000),
  deviceCount: Math.floor(Math.random() * 10),
  aiDeviceCount: Math.floor(Math.random() * 5),
  totalSteps: Math.floor(Math.random() * 100000),
}))

// 数据请求（带排序和筛选）
// eslint-disable-next-line style/type-annotation-spacing
function requestData(params:any) {
  let list = [...mockList]
  // 筛选
  if (params.address){
    list = list.filter(item => item.address.includes(params.address))
  }
  // eslint-disable-next-line curly
  if (params.email) list = list.filter(item => item.email.includes(params.email))
  // 排序
  if (params.sort && params.order) {
    list.sort((a, b) => {
      if (params.order === 'asc') return a[params.sort] - b[params.sort]
      if (params.order === 'desc') return b[params.sort] - a[params.sort]
      return 0
    })
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
  <FaCard title="用户资产">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
