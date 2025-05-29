<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

// 表格列配置
const columns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 120 },
  { prop: 'ip', label: '用户ip', minWidth: 120 },
  { prop: 'createdAt', label: '记录时间', minWidth: 140 },
]

// 查询项
const searchItems = [
  { key: 'address', label: '地址', component: 'ElInput', placeholder: '请输入地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
]

// mock 数据
const mockList = Array.from({ length: 10 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: ['北京', '上海', '深圳', '广州'][i % 4],
  ip: `192.168.1.${i + 1}`,
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

// 数据请求（带筛选）
function requestData(params: any) {
  let list = [...mockList]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
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
  <div>
    <FaCard title="用户IP地址" class="mt-4">
      <CrudTable :columns="columns" :search-items="searchItems" :request="requestData" :batch-enabled="false" />
    </FaCard>
  </div>
</template>
