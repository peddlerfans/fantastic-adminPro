<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue'
import userApi from "@/api/modules/user"
import CrudTable from '@/components/CrudTable/index.vue'

// 排序字段映射
const sortTypeMap = {
  usdtBalance: 1,
  carbonBalance: 2,
  totalSteps: 3,
  availableDeviceCount: 4,
  availableAiDevicePower: 5,
  cctBalance: 6,
} as const

type SortField = keyof typeof sortTypeMap

interface UserAsset {
  email: string
  accountAddress: string
  usdtBalance: number
  cctBalance: number
  carbonBalance: number
  availableDeviceCount: number
  availableAiDevicePower: number
  totalSteps: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  page?: number
  size?: number
  sort?: SortField
}

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'accountAddress', label: '用户钱包地址', minWidth: 180 },
  { prop: 'usdtBalance', label: 'USDT余额', minWidth: 120, sortable: true },
  { prop: 'cctBalance', label: 'CCT余额', minWidth: 120, sortable: true },
  { prop: 'carbonBalance', label: '碳积分余额', minWidth: 120, sortable: true },
  { prop: 'availableDeviceCount', label: '可用设备数', minWidth: 120, sortable: true },
  { prop: 'availableAiDevicePower', label: '可用智算设备算力', minWidth: 150, sortable: true },
  { prop: 'totalSteps', label: '总步数', minWidth: 120, sortable: true },
])

// 查询项
const searchItems = ref([
  { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
])

// 数据请求
async function requestData(params: RequestParams) {
  try {
    // 根据排序字段映射到对应的 type 值
    const res = await userApi.getUserAssetListQuery({
      email: params.email,
      accountAddress: params.accountAddress,
      type: params.sort ? sortTypeMap[params.sort] : undefined,
      current: params.page || 1,
      size: params.size || 10,
    })

    return {
      data: {
        list: res.data.records as UserAsset[],
        total: res.data.total,
      }
    }
  }
  catch (error) {
    console.error('获取用户资产列表失败:', error)

    return {
      data: {
        list: [] as UserAsset[],
        total: 0,
      }
    }
  }
}
</script>

<template>
  <FaCard title="用户资产">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
