<!-- eslint-disable style/brace-style -->
<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'
// import { ref } from 'vue'

// 星级选项
const starOptions = [
  { label: '一星', value: '一星' },
  { label: '二星', value: '二星' },
  { label: '三星', value: '三星' },
  { label: '四星', value: '四星' },
  { label: '五星', value: '五星' },
]

// 状态选项
const statusOptions = [
  { label: '进行中', value: '进行中' },
  { label: '已结束', value: '已结束' },
]

// 智算设备表格列
const aiColumns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'star', label: '星级', minWidth: 100 },
  { prop: 'price', label: '价格', minWidth: 100 },
  { prop: 'status', label: '状态', minWidth: 100 },
  { prop: 'insurance', label: '是否购买保险', minWidth: 120 },
  { prop: 'released', label: '已释放', minWidth: 100 },
  { prop: 'toRelease', label: '待释放', minWidth: 100 },
  { prop: 'startTime', label: '开启时间', minWidth: 140, sortable: true },
  { prop: 'endTime', label: '结束时间', minWidth: 140, sortable: true },
]

// 查询项
const aiSearchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'star', label: '星级', component: 'ElSelect', options: starOptions, placeholder: '请选择星级', multiple: true, clearable: true },
  { key: 'status', label: '状态', component: 'ElSelect', options: statusOptions, placeholder: '请选择状态', clearable: true },
]

// mock 数据
const aiMockList = Array.from({ length: 20 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  star: starOptions[i % 5].value,
  price: Math.floor(Math.random() * 10000),
  status: i % 2 === 0 ? '进行中' : '已结束',
  insurance: i % 2 === 0 ? '是' : '否',
  released: Math.floor(Math.random() * 5000),
  toRelease: Math.floor(Math.random() * 5000),
  startTime: `2024-06-0${(i % 9) + 1} 08:00:00`,
  endTime: `2024-06-1${(i % 9) + 1} 08:00:00`,
}))

// 数据请求（带筛选和排序）
function aiRequestData(params: any) {
  let list = [...aiMockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.star && params.star.length) {
    list = list.filter(item => params.star.includes(item.star))
  }
  if (params.status) {
    list = list.filter(item => item.status === params.status)
  }
  // 排序
  if (params.sort === 'startTime') {
    list = list.sort((a, b) => {
      if (params.order === 'asc') return a.startTime.localeCompare(b.startTime)
      if (params.order === 'desc') return b.startTime.localeCompare(a.startTime)
      return 0
    })
  } else if (params.sort === 'endTime') {
    list = list.sort((a, b) => {
      if (params.order === 'asc') return a.endTime.localeCompare(b.endTime)
      if (params.order === 'desc') return b.endTime.localeCompare(a.endTime)
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
  <FaCard title="智算设备列表" class="mt-4">
    <CrudTable
      :columns="aiColumns"
      :search-items="aiSearchItems"
      :request="aiRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
