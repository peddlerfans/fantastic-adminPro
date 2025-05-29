<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

// 星级选项
const starOptions = [
  { label: '一星', value: '一星' },
  { label: '二星', value: '二星' },
  { label: '三星', value: '三星' },
  { label: '四星', value: '四星' },
  { label: '五星', value: '五星' },
]

// 精英榜表格列
const eliteColumns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'rank', label: '排名', minWidth: 80 },
  { prop: 'star', label: '星级', minWidth: 100 },
  { prop: 'targetCount', label: '达标人数', minWidth: 100 },
  { prop: 'statTime', label: '统计时间', minWidth: 140 },
]

// 查询项
const eliteSearchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'star', label: '星级', component: 'ElSelect', options: starOptions, placeholder: '请选择星级', multiple: true, clearable: true },
]

// mock 数据
const eliteMockList = Array.from({ length: 20 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  rank: i + 1,
  star: starOptions[i % 5].value,
  targetCount: Math.floor(Math.random() * 100),
  statTime: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

// 数据请求（带筛选）
function eliteRequestData(params: any) {
  let list = [...eliteMockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.star && params.star.length) {
    list = list.filter(item => params.star.includes(item.star))
  }
  // 排序（可根据rank字段排序）
  list = list.sort((a, b) => a.rank - b.rank)
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
  <FaCard title="精英榜列表" class="mt-4">
    <CrudTable
      :columns="eliteColumns"
      :search-items="eliteSearchItems"
      :request="eliteRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
