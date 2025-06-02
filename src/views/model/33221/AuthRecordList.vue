<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface AuthRecord {
  accountAddress: string
  email: string
  amount: number
  createTime: string
}

interface AuthRecordResponse {
  records: AuthRecord[]
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
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  {
    prop: 'amount',
    label: '确权积分',
    minWidth: 120,
    formatter: (row: AuthRecord) => {
      return row.amount ? row.amount.toFixed(8) : '-'
    }
  },
  {
    prop: 'createTime',
    label: '确权时间',
    minWidth: 160,
    formatter: (row: AuthRecord) => {
      if (!row.createTime) return '-'
      return new Date(row.createTime).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
])

// 数据请求
function requestData(params: RequestParams) {
  return modelApi.getConfirmRecordList({
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<AuthRecordResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取确权记录列表失败:', error)
    return {
      data: {
        list: [] as AuthRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <CrudTable
    :columns="columns"
    :search-items="searchItems"
    :request="requestData"
    :batch-enabled="false"
  />
</template>
