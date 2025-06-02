<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import newApi from "@/api/modules/new"
import CrudTable from '@/components/CrudTable/index.vue'

interface RechargeRecord {
  email: string
  accountAddress: string
  rechargeAddress: string
  amount: number
  hash: string
  createTime: string
}

interface RechargeResponse {
  records: RechargeRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  current?: number
  size?: number
}

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'accountAddress', label: '主账户地址', minWidth: 180 },
  { prop: 'rechargeAddress', label: '充值地址', minWidth: 180 },
  {
    prop: 'amount',
    label: '充值金额',
    minWidth: 120,
    formatter: (row: RechargeRecord) => {
      return row.amount ? row.amount.toFixed(8) : '-'
    }
  },
  { prop: 'hash', label: '交易哈希', minWidth: 220 },
  {
    prop: 'createTime',
    label: '充值时间',
    minWidth: 160,
    formatter: (row: RechargeRecord) => {
      if (!row.createTime) return '-'
      return new Date(row.createTime).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'accountAddress', label: '主账户地址', component: 'ElInput', placeholder: '请输入主账户地址' },
])

// 数据请求
function requestData(params: RequestParams) {
  return newApi.rechargeList({
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<RechargeResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取充值记录失败:', error)
    return {
      data: {
        list: [] as RechargeRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="充值记录">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>

<style scoped>
/* 样式 */
</style>
