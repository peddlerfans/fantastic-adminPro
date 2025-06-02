<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface AiDeviceRecord {
  email: string
  accountAddress: string
  level: string
  price: number
  status: number
  isBuyInsurance: number
  expireStart: string
  expireEnd: string
}

interface AiDeviceResponse {
  records: AiDeviceRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  level?: string
  status?: number
  sortBy?: string
  current?: number
  size?: number
}

// 星级选项
const levelOptions = [
  { label: 'S1', value: 'S1' },
  { label: 'S2', value: 'S2' },
  { label: 'S3', value: 'S3' },
  { label: 'S4', value: 'S4' },
  { label: 'S5', value: 'S5' },
]

// 设备状态选项
const statusOptions = [
  { label: '进行中', value: 1 },
  { label: '已结束', value: 0 },
]

// 排序选项
const sortOptions = [
  { label: '有效期开始时间升序', value: 'expireStartAsc' },
  { label: '有效期开始时间降序', value: 'expireStartDesc' },
  { label: '有效期结束时间升序', value: 'expireEndAsc' },
  { label: '有效期结束时间降序', value: 'expireEndDesc' },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  { prop: 'level', label: '星级', minWidth: 80 },
  {
    prop: 'price',
    label: '价格',
    minWidth: 120,
    formatter: (row: AiDeviceRecord) => {
      return row.price ? row.price.toFixed(8) : '-'
    }
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 100,
    formatter: (row: AiDeviceRecord) => {
      const option = statusOptions.find(opt => opt.value === row.status)
      return option ? option.label : '-'
    }
  },
  {
    prop: 'isBuyInsurance',
    label: '保险状态',
    minWidth: 100,
    formatter: (row: AiDeviceRecord) => {
      return row.isBuyInsurance === 1 ? '已购买' : '未购买'
    }
  },
  {
    prop: 'expireStart',
    label: '有效期开始时间',
    minWidth: 160,
    formatter: (row: AiDeviceRecord) => {
      if (!row.expireStart) return '-'
      return new Date(row.expireStart).toLocaleString()
    }
  },
  {
    prop: 'expireEnd',
    label: '有效期结束时间',
    minWidth: 160,
    formatter: (row: AiDeviceRecord) => {
      if (!row.expireEnd) return '-'
      return new Date(row.expireEnd).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
  {
    key: 'level',
    label: '星级',
    component: 'ElSelect',
    options: levelOptions,
    placeholder: '请选择星级',
    clearable: true
  },
  {
    key: 'status',
    label: '设备状态',
    component: 'ElSelect',
    options: statusOptions,
    placeholder: '请选择设备状态',
    clearable: true
  },
  {
    key: 'sortBy',
    label: '排序方式',
    component: 'ElSelect',
    options: sortOptions,
    placeholder: '请选择排序方式',
    clearable: true
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return modelApi.getAiDeviceList({
    email: params.email,
    accountAddress: params.accountAddress,
    level: params.level,
    status: params.status,
    sortBy: params.sortBy,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<AiDeviceResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取智算设备列表失败:', error)
    return {
      data: {
        list: [] as AiDeviceRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="智算设备列表">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
