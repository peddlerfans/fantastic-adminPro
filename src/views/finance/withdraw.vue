<script setup lang="ts">
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable/index.vue'

const accounts = ref([
  { id: 1, name: '主账户', balance: 5000, status: '正常' },
  { id: 2, name: '备用账户', balance: 2000, status: '冻结' },
])

// 提现记录表格列
const withdrawColumns = [
  { prop: 'email', label: '邮箱', minWidth: 140 },
  { prop: 'walletAddress', label: '用户钱包地址', minWidth: 140 },
  { prop: 'withdrawAddress', label: '提现地址', minWidth: 140 },
  { prop: 'usdt', label: 'USDT数量', minWidth: 100 },
  { prop: 'status', label: '状态', minWidth: 100 },
  { prop: 'hash', label: '哈希', minWidth: 180 },
  { prop: 'createdAt', label: '时间', minWidth: 140 },
  { prop: 'fee', label: '手续费', minWidth: 100 },
  { prop: 'action', label: '操作', minWidth: 120, slot: 'action' },
]

// 查询项
const withdrawSearchItems = [
  { key: 'walletAddress', label: '用户钱包地址', component: 'ElInput', placeholder: '请输入用户钱包地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
]

// mock 数据
const withdrawMockList = ref(Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  email: `user${i + 1}@example.com`,
  walletAddress: `0x${Math.random().toString(16).slice(2, 18)}`,
  withdrawAddress: `提现地址${i + 1}`,
  usdt: Math.floor(Math.random() * 1000),
  status: i % 2 === 0 ? '待审核' : '已完成',
  hash: `0x${Math.random().toString(16).slice(2, 18)}`,
  createdAt: `2024-06-0${(i % 9) + 1} 10:00:00`,
  fee: Math.floor(Math.random() * 10),
})))

// 数据请求（带筛选）
function withdrawRequestData(params: any) {
  let list = [...withdrawMockList.value]
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

// 审核操作
function handleAudit(row: any) {
  ElMessageBox.confirm('确认通过该提现申请吗？', '审核确认', {
    confirmButtonText: '通过',
    cancelButtonText: '拒绝',
    type: 'warning',
  }).then(() => {
    // 审核通过
    row.status = '已完成'
    ElMessage.success('审核通过')
  }).catch(() => {
    // 审核拒绝
    row.status = '已拒绝'
    ElMessage.info('已拒绝该提现')
  })
}
</script>

<template>
  <FaCard title="提现记录" class="mt-4">
    <CrudTable
      :columns="withdrawColumns"
      :search-items="withdrawSearchItems"
      :request="withdrawRequestData"
      :batch-enabled="false"
    >
      <template #operation-buttons="{ row }">
        <ElButton
          v-if="row.status === '待审核'"
          type="primary"
          size="small"
          @click="handleAudit(row)"
        >审核</ElButton>
        <span v-else>{{ row.status }}</span>
      </template>
    </CrudTable>
  </FaCard>
</template>
