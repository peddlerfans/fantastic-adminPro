<script setup lang="ts">
import CrudTable from '@/components/CrudTable/index.vue'

// 划转记录表格列
const transferColumns = [
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'fromAddress', label: '出账地址', minWidth: 140 },
  { prop: 'toAddress', label: '入账地址', minWidth: 140 },
  { prop: 'coin', label: '转账币种', minWidth: 100 },
  { prop: 'amount', label: '转账数量', minWidth: 100 },
  { prop: 'fee', label: '服务费', minWidth: 100 },
  { prop: 'status', label: '状态', minWidth: 100 },
  { prop: 'createdAt', label: '时间', minWidth: 140 },
]

// 查询项
const transferSearchItems = [
  { key: 'fromAddress', label: '出账地址', component: 'ElInput', placeholder: '请输入出账地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
]

// mock 数据
const transferMockList = Array.from({ length: 10 }).map((_, i) => ({
  email: `user${i + 1}@example.com`,
  fromAddress: `0x${Math.random().toString(16).slice(2, 18)}`,
  toAddress: `0x${Math.random().toString(16).slice(2, 18)}`,
  coin: ['USDT', 'BTC', 'ETH'][i % 3],
  amount: Math.floor(Math.random() * 1000),
  fee: Math.floor(Math.random() * 10),
  status: i % 2 === 0 ? '成功' : '失败',
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
}))

// 数据请求（带筛选）
function transferRequestData(params: any) {
  let list = [...transferMockList]
  if (params.fromAddress) {
    list = list.filter(item => item.fromAddress.includes(params.fromAddress))
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
  <FaCard title="划转记录" class="mt-4">
    <CrudTable
      :columns="transferColumns"
      :search-items="transferSearchItems"
      :request="transferRequestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
