<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import newApi from "@/api/modules/new"
import CrudTable from '@/components/CrudTable/index.vue'

interface PointRecord {
  email: string
  accountAddress: string
  type: string
  type2: string
  amount: number
  createTime: string
}

interface PointResponse {
  records: PointRecord[]
  total: number
}

interface RequestParams {
  type?: string
  type2?: string
  email?: string
  accountAddress?: string
  current?: number
  size?: number
}

// 积分来源类型选项
const pointTypeOptions = [
  { label: '步数', value: 'step' },
  { label: '兑换', value: 'exchange' },
  { label: '扣除', value: 'deduct' },
  { label: '佣金', value: 'commision' },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  {
    prop: 'type',
    label: '积分来源类型',
    minWidth: 120,
    formatter: (row: PointRecord) => {
      const option = pointTypeOptions.find(opt => opt.value === row.type)
      return option ? option.label : row.type
    }
  },
  { prop: 'type2', label: '积分子类型', minWidth: 120 },
  {
    prop: 'amount',
    label: '积分数量',
    minWidth: 120,
    formatter: (row: PointRecord) => {
      return row.amount ? row.amount.toLocaleString() : '-'
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 160,
    formatter: (row: PointRecord) => {
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
    key: 'type',
    label: '积分来源类型',
    component: 'ElSelect',
    options: pointTypeOptions,
    placeholder: '请选择积分来源类型',
    clearable: true
  },
  { key: 'type2', label: '积分子类型', component: 'ElInput', placeholder: '请输入积分子类型' },
])

// 数据请求
function requestData(params: RequestParams) {
  return newApi.carbonList({
    type: params.type,
    type2: params.type2,
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<PointResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取积分记录失败:', error)
    return {
      data: {
        list: [] as PointRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="积分记录">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
