<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface DynamicUserRecord {
  accountAddress: string
  email: string
  userMotivatePercent: number
  firstPhaseTotalPoint: number
  secondPhaseTotalPoint: number
  thirdPhaseTotalPoint: number
  lastPhaseTotalPoint: number
  createTime: string
}

interface DynamicUserResponse {
  records: DynamicUserRecord[]
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
    prop: 'userMotivatePercent',
    label: '分成占比',
    minWidth: 100,
    formatter: (row: DynamicUserRecord) => {
      return row.userMotivatePercent ? `${row.userMotivatePercent}%` : '-'
    }
  },
  {
    prop: 'firstPhaseTotalPoint',
    label: '第一阶段收益',
    minWidth: 120,
    formatter: (row: DynamicUserRecord) => {
      return row.firstPhaseTotalPoint ? row.firstPhaseTotalPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'secondPhaseTotalPoint',
    label: '第二阶段收益',
    minWidth: 120,
    formatter: (row: DynamicUserRecord) => {
      return row.secondPhaseTotalPoint ? row.secondPhaseTotalPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'thirdPhaseTotalPoint',
    label: '第三阶段收益',
    minWidth: 120,
    formatter: (row: DynamicUserRecord) => {
      return row.thirdPhaseTotalPoint ? row.thirdPhaseTotalPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'lastPhaseTotalPoint',
    label: '第四阶段收益',
    minWidth: 120,
    formatter: (row: DynamicUserRecord) => {
      return row.lastPhaseTotalPoint ? row.lastPhaseTotalPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'createTime',
    label: '加入时间',
    minWidth: 160,
    formatter: (row: DynamicUserRecord) => {
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
  return modelApi.getDynamicRewardUserList({
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<DynamicUserResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取动态奖励用户列表失败:', error)
    return {
      data: {
        list: [] as DynamicUserRecord[],
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
