<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import userApi from "@/api/modules/user"
import CrudTable from '@/components/CrudTable/index.vue'

interface UserAddress {
  email: string
  accountAddress: string
  createTime: string
  receiverName: string
  province: string
  city: string
  area: string
  street: string
  address: string
  receiverPhone: string
}

interface UserAddressResponse {
  records: UserAddress[]
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
  { prop: 'receiverName', label: '收货人姓名', minWidth: 120 },
  { prop: 'receiverPhone', label: '收货手机号', minWidth: 120 },
  { prop: 'province', label: '省份', minWidth: 100 },
  { prop: 'city', label: '城市', minWidth: 100 },
  { prop: 'area', label: '区', minWidth: 100 },
  { prop: 'street', label: '街道', minWidth: 120 },
  { prop: 'address', label: '详细地址', minWidth: 200 },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 160,
    formatter: (row: UserAddress) => {
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
  return userApi.getUserAddressListQuery({
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<UserAddressResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取用户地址列表失败:', error)
    return {
      data: {
        list: [] as UserAddress[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="用户地址列表">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
