<!-- eslint-disable style/brace-style -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import testApi from "@/api/modules/test"
import CrudTable from '@/components/CrudTable/index.vue'

interface TransferRecord {
  email: string
  fromAddress: string
  toAddress: string
  token: string
  amount: number
  extend: string
  status: string
  createTime: string
}

interface TransferResponse {
  records: TransferRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  type: string
  current?: number
  size?: number
}

// 币种类型选项
const tokenOptions = [
  { label: 'USDT', value: 'USDT' },
  { label: 'CCT', value: 'CCT' },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'fromAddress', label: '出账地址', minWidth: 180 },
  { prop: 'toAddress', label: '入账地址', minWidth: 180 },
  {
    prop: 'token',
    label: '转账币种',
    minWidth: 100,
    formatter: (row: TransferRecord) => {
      return row.token || '-'
    }
  },
  {
    prop: 'amount',
    label: '转账数量',
    minWidth: 120,
    formatter: (row: TransferRecord) => {
      return row.amount ? row.amount.toFixed(8) : '-'
    }
  },
  {
    prop: 'extend',
    label: '服务费',
    minWidth: 120,
    formatter: (row: TransferRecord) => {
      try {
        const extendData = JSON.parse(row.extend)
        return extendData ? extendData.toFixed(8) : '-'
      } catch {
        return '-'
      }
    }
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 100,
    formatter: (row: TransferRecord) => {
      return row.status || '-'
    }
  },
  {
    prop: 'createTime',
    label: '转账时间',
    minWidth: 160,
    formatter: (row: TransferRecord) => {
      if (!row.createTime) return '-'
      return new Date(row.createTime).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'accountAddress', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  {
    key: 'type',
    label: '币种类型',
    component: 'ElSelect',
    options: tokenOptions,
    placeholder: '请选择币种类型',
    required: true,
    defaultValue: 'USDT'
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return testApi.transferStatistics({
    email: params.email,
    accountAddress: params.accountAddress,
    type: params.type || 'USDT',
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<TransferResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取划转列表失败:', error)
    return {
      data: {
        list: [] as TransferRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="划转列表">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
