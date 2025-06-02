<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface DynamicRewardRecord {
  id: number
  userId: number
  accountAddress: string
  email: string
  parentId: number
  leaderPoint: number
  userPoint: number
  totalPoint: number
  leaderRate: number
  userRate: number
  phaseType: number
  createTime: string
}

interface DynamicRewardResponse {
  records: DynamicRewardRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  current?: number
  size?: number
}

// 阶段类型选项
const phaseOptions = [
  { label: '第一阶段', value: 1 },
  { label: '第二阶段', value: 2 },
  { label: '第三阶段', value: 3 },
  { label: '第四阶段', value: 4 },
]

// 表格列配置
const columns = ref([
  { prop: 'id', label: '记录ID', minWidth: 100 },
  { prop: 'userId', label: '用户ID', minWidth: 100 },
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  { prop: 'parentId', label: '上级领导ID', minWidth: 100 },
  {
    prop: 'leaderPoint',
    label: '团长所得积分',
    minWidth: 120,
    formatter: (row: DynamicRewardRecord) => {
      return row.leaderPoint ? row.leaderPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'userPoint',
    label: '推广人员所得积分',
    minWidth: 120,
    formatter: (row: DynamicRewardRecord) => {
      return row.userPoint ? row.userPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'totalPoint',
    label: '奖励总积分',
    minWidth: 120,
    formatter: (row: DynamicRewardRecord) => {
      return row.totalPoint ? row.totalPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'leaderRate',
    label: '团长积分占比',
    minWidth: 120,
    formatter: (row: DynamicRewardRecord) => {
      return row.leaderRate ? `${row.leaderRate.toFixed(2)}%` : '-'
    }
  },
  {
    prop: 'userRate',
    label: '推广人员积分占比',
    minWidth: 120,
    formatter: (row: DynamicRewardRecord) => {
      return row.userRate ? `${row.userRate.toFixed(2)}%` : '-'
    }
  },
  {
    prop: 'phaseType',
    label: '奖励阶段',
    minWidth: 100,
    formatter: (row: DynamicRewardRecord) => {
      const option = phaseOptions.find(opt => opt.value === row.phaseType)
      return option ? option.label : '-'
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 160,
    formatter: (row: DynamicRewardRecord) => {
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
  return modelApi.getDynamicRewardList({
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<DynamicRewardResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取动态奖励明细列表失败:', error)
    return {
      data: {
        list: [] as DynamicRewardRecord[],
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
