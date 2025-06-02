<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import newApi from "@/api/modules/new"
import CrudTable from '@/components/CrudTable/index.vue'

interface WithdrawRecord {
  email: string
  accountAddress: string
  withdrawAddress: string
  amount: number
  fee: number
  state: number
  hash: string
  createTime: string
}

interface WithdrawResponse {
  records: WithdrawRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  state?: number
  current?: number
  size?: number
}

// 提现状态选项
const stateOptions = [
  { label: '待审核', value: 0 },
  { label: '审核通过', value: 1 },
  { label: '审核拒绝', value: 2 },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  { prop: 'withdrawAddress', label: '提现地址', minWidth: 180 },
  {
    prop: 'amount',
    label: '提现金额',
    minWidth: 120,
    formatter: (row: WithdrawRecord) => {
      return row.amount ? row.amount.toFixed(8) : '-'
    }
  },
  {
    prop: 'fee',
    label: '手续费',
    minWidth: 120,
    formatter: (row: WithdrawRecord) => {
      return row.fee ? row.fee.toFixed(8) : '-'
    }
  },
  {
    prop: 'state',
    label: '状态',
    minWidth: 100,
    formatter: (row: WithdrawRecord) => {
      const state = stateOptions.find(item => item.value === row.state)
      return state ? state.label : '-'
    }
  },
  { prop: 'hash', label: '交易哈希', minWidth: 220 },
  {
    prop: 'createTime',
    label: '提现时间',
    minWidth: 160,
    formatter: (row: WithdrawRecord) => {
      if (!row.createTime) return '-'
      return new Date(row.createTime).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
  {
    key: 'state',
    label: '提现状态',
    component: 'ElSelect',
    placeholder: '请选择提现状态',
    options: stateOptions,
    clearable: true
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return newApi.withdrawList({
    email: params.email,
    accountAddress: params.accountAddress,
    state: params.state,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<WithdrawResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取提现记录失败:', error)
    return {
      data: {
        list: [] as WithdrawRecord[],
        total: 0,
      }
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
  <FaCard title="提现记录">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    >
      <template #operation-buttons="{ row }">
        <ElButton
          v-if="row.state === 0"
          type="primary"
          size="small"
          @click="handleAudit(row)"
        >审核</ElButton>
        <span v-else>{{ row.status }}</span>
      </template>
    </CrudTable>
  </FaCard>
</template>
