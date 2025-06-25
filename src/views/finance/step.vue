<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import newApi from "@/api/modules/new"
import CrudTable from '@/components/CrudTable/index.vue'

interface StepRecord {
  email: string
  accountAddress: string
  virtual: number
  amount: number
  date: string
}

interface StepResponse {
  records: StepRecord[]
  total: number
}

interface RequestParams {
  type?: string
  type2?: string
  email?: string
  accountAddress?: string
  date?: string
  current?: number
  size?: number
  virtual?: number
}

// 步数来源选项
const virtualOptions = [
  { label: '实体设备', value: 1 },
  { label: '虚拟设备', value: 2 },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  // { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  {
    prop: 'virtual',
    label: '步数来源',
    minWidth: 120,
    formatter: (row: StepRecord) => {
      if (row.virtual === 1) return '实体设备'
      if (row.virtual === 2) return '虚拟设备'
      return '-'
    }
  },
  {
    prop: 'amount',
    label: '步数',
    minWidth: 120,
    formatter: (row: StepRecord) => {
      return row.amount ? row.amount.toLocaleString() : '-'
    }
  },
  { prop: 'date', label: '记录日期', minWidth: 120 },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  // { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
  {
    key: 'virtual',
    label: '步数来源',
    component: 'ElSelect',
    placeholder: '请选择步数来源',
    options: virtualOptions,
    clearable: true
  },
  {
    key: 'date',
    label: '记录日期',
    component: 'ElDatePicker',
    placeholder: '请选择日期',
    type: 'date',
    valueFormat: 'YYYY-MM-DD'
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return newApi.stepList({
    type: params.virtual,
    type2: params.type2,
    email: params.email,
    accountAddress: params.accountAddress,
    date: params.date,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<StepResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取步数记录失败:', error)
    return {
      data: {
        list: [] as StepRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="步数记录">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
