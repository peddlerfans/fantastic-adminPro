<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface InsuranceRecord {
  accountAddress: string
  email: string
  deviceNo: string
  releasedUsdt: number
  releasedPoint: number
  isBuyInsurance: number
}

interface InsuranceResponse {
  records: InsuranceRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  current?: number
  size?: number
}

// 保险类型选项
const insuranceOptions = [
  { label: '未选择', value: 0 },
  { label: '选择U', value: 1 },
  { label: '选择币', value: 2 },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  { prop: 'deviceNo', label: '设备编号', minWidth: 180 },
  {
    prop: 'releasedUsdt',
    label: '已释放USDT',
    minWidth: 120,
    formatter: (row: InsuranceRecord) => {
      return row.releasedUsdt ? row.releasedUsdt.toFixed(8) : '-'
    }
  },
  {
    prop: 'releasedPoint',
    label: '已释放积分',
    minWidth: 120,
    formatter: (row: InsuranceRecord) => {
      return row.releasedPoint ? row.releasedPoint.toFixed(8) : '-'
    }
  },
  {
    prop: 'isBuyInsurance',
    label: '保险类型',
    minWidth: 120,
    formatter: (row: InsuranceRecord) => {
      const option = insuranceOptions.find(opt => opt.value === row.isBuyInsurance)
      return option ? option.label : '-'
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
  return modelApi.getInsuranceList({
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<InsuranceResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取保险记录列表失败:', error)
    return {
      data: {
        list: [] as InsuranceRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="保险记录列表">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
