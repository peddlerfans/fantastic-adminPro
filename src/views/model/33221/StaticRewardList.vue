<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface StaticRewardRecord {
  userEmail: string
  accountAddress: string
  motivatePoint: number
  motivateDays: number
  getPoint: number
  getTimes: number
  createTime: string
}

interface StaticRewardResponse {
  records: StaticRewardRecord[]
  total: number
}

interface RequestParams {
  email?: string
  address?: string
  current?: number
  size?: number
}

// 表格列配置
const columns = ref([
  { prop: 'userEmail', label: '用户邮箱', minWidth: 180 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  {
    prop: 'motivatePoint',
    label: '总激励积分',
    minWidth: 120,
    formatter: (row: StaticRewardRecord) => {
      return row.motivatePoint ? row.motivatePoint.toFixed(8) : '-'
    }
  },
  { prop: 'motivateDays', label: '激励天数', minWidth: 100 },
  {
    prop: 'getPoint',
    label: '已获得积分',
    minWidth: 120,
    formatter: (row: StaticRewardRecord) => {
      return row.getPoint ? row.getPoint.toFixed(8) : '-'
    }
  },
  { prop: 'getTimes', label: '已释放次数', minWidth: 100 },
  {
    prop: 'createTime',
    label: '激励开始时间',
    minWidth: 160,
    formatter: (row: StaticRewardRecord) => {
      if (!row.createTime) return '-'
      return new Date(row.createTime).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'address', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
])

// 数据请求
function requestData(params: RequestParams) {
  return modelApi.getStaticRewardList({
    email: params.email,
    address: params.address,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<StaticRewardResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取静态奖励列表失败:', error)
    return {
      data: {
        list: [] as StaticRewardRecord[],
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
