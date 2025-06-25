<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface EliteRecord {
  email: string
  accountAddress: string
  ranking: number
  type: number
  accessUserNum: number
  accessNum: number
  rewardNum: number
  createTime: string
  weekNum: number
  startTime: string
  endTime: string
}

interface EliteResponse {
  records: EliteRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  type?: number
  startTime?: string
  endTime?: string
  current?: number
  size?: number
}

// 榜单类型选项
const eliteTypeOptions = [
  { label: '先锋榜（一星）', value: 1 },
  { label: '荣耀榜（三星）', value: 2 },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  // { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  { prop: 'ranking', label: '排名', minWidth: 80 },
  {
    prop: 'type',
    label: '榜单类型',
    minWidth: 140,
    formatter: (row: EliteRecord) => {
      const option = eliteTypeOptions.find(opt => opt.value === row.type)
      return option ? option.label : '-'
    }
  },
  { prop: 'accessUserNum', label: '达标人数', minWidth: 100 },
  { prop: 'accessNum', label: '奖励份数', minWidth: 100 },
  {
    prop: 'rewardNum',
    label: '奖励金额',
    minWidth: 120,
    formatter: (row: EliteRecord) => {
      return row.rewardNum ? row.rewardNum.toFixed(8) : '-'
    }
  },
  { prop: 'weekNum', label: '自然周数', minWidth: 100 },
  {
    prop: 'startTime',
    label: '周期开始时间',
    minWidth: 160,
    formatter: (row: EliteRecord) => {
      if (!row.startTime) return '-'
      return new Date(row.startTime).toLocaleString()
    }
  },
  {
    prop: 'endTime',
    label: '周期结束时间',
    minWidth: 160,
    formatter: (row: EliteRecord) => {
      if (!row.endTime) return '-'
      return new Date(row.endTime).toLocaleString()
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 160,
    formatter: (row: EliteRecord) => {
      if (!row.createTime) return '-'
      return new Date(row.createTime).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  // { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
  {
    key: 'type',
    label: '榜单类型',
    component: 'ElSelect',
    options: eliteTypeOptions,
    placeholder: '请选择榜单类型',
    clearable: true
  },
  {
    key: 'startTime',
    label: '开始时间',
    component: 'ElDatePicker',
    type: 'datetime',
    placeholder: '请选择开始时间',
    valueFormat: 'YYYY-MM-DD HH:mm:ss'
  },
  {
    key: 'endTime',
    label: '结束时间',
    component: 'ElDatePicker',
    type: 'datetime',
    placeholder: '请选择结束时间',
    valueFormat: 'YYYY-MM-DD HH:mm:ss'
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return modelApi.getEliteList({
    email: params.email,
    accountAddress: params.accountAddress,
    type: params.type,
    startTime: params.startTime,
    endTime: params.endTime,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<EliteResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取精英榜列表失败:', error)
    return {
      data: {
        list: [] as EliteRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="精英榜列表" class="mt-4">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
