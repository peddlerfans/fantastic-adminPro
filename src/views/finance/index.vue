<script lang="ts" setup>
import CrudTable from '@/components/CrudTable/index.vue'

// 表格列配置
const columns = [
  { prop: 'email', label: '邮箱', minWidth: 140 },
  { prop: 'walletAddress', label: '用户钱包地址', minWidth: 140 },
  { prop: 'rechargeAddress', label: '充值地址', minWidth: 140 },
  { prop: 'usdt', label: 'USDT数量', minWidth: 100 },
  { prop: 'hash', label: '哈希', minWidth: 180 },
  { prop: 'createdAt', label: '时间', minWidth: 140 },
]

// 查询项
const searchItems = [
  { key: 'walletAddress', label: '用户钱包地址', component: 'ElInput', placeholder: '请输入用户钱包地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
]

// mock 数据
const mockList = Array.from({ length: 10 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  walletAddress: `0x${Math.random().toString(16).slice(2, 18)}`,
  rechargeAddress: `充值地址${i + 1}`,
  usdt: Math.floor(Math.random() * 1000),
  hash: `0x${Math.random().toString(16).slice(2, 18)}`,
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

// 数据请求（带筛选）
function requestData(params: any) {
  let list = [...mockList]
  if (params.walletAddress) {
    list = list.filter(item => item.walletAddress.includes(params.walletAddress))
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
    <FaCard title="充值记录" class="mt-4">
      <CrudTable :columns="columns" :search-items="searchItems" :request="requestData" :batch-enabled="false" />
    </FaCard>
  </div>
</template>

<style scoped>
/* 样式 */
</style>
