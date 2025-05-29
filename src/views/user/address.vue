<script setup lang="ts">
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable/index.vue'

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'address', label: '用户地址', minWidth: 120 },
  { prop: 'createdAt', label: '添加时间', minWidth: 140 },
  { prop: 'receiver', label: '收货人', minWidth: 100 },
  { prop: 'receiveAddress', label: '收货地址', minWidth: 180 },
  { prop: 'receivePhone', label: '收货手机号', minWidth: 120 },
])

// 查询项
const searchItems = ref([
  { key: 'address', label: '地址', component: 'ElInput', placeholder: '请输入地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
])

// mock 数据
const mockList = Array.from({ length: 10 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  address: ['北京', '上海', '深圳', '广州'][i % 4],
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
  receiver: `收货人${i + 1}`,
  receiveAddress: `详细地址${i + 1}`,
  receivePhone: `13800000${(100 + i)}`,
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
    <FaCard title="用户收货地址列表" class="mt-4">
      <CrudTable
        :columns="columns"
        :search-items="searchItems"
        :request="requestData"
        :batch-enabled="false"
      />
    </FaCard>
  </div>
</template>
