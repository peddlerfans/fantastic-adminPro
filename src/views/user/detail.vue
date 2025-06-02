<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import userApi from "@/api/modules/user"
import CrudTable from '@/components/CrudTable/index.vue'

interface ShareRelation {
  userId: number
  inviteUserId: number
  email: string
  accountAddress: string
  level: number
  levelName: string
  totalInvitePerformance: number
  totalTeamNum: number
  totalPerformance: number
  inviteCount: number
  is33221: number
}

interface ShareRelationResponse {
  records: ShareRelation[]
  total: number
}

interface RequestParams {
  accountAddress?: string
  email?: string
  is33221?: number
  userId?: number
  orderBy?: 'directInviteCount' | 'teamNum' | 'directInvitePerformance' | 'teamPerformance'
  orderDirection?: 'asc' | 'desc'
  page?: number
  size?: number
}

// 排序选项
const orderByOptions = [
  { label: '直推人数', value: 'directInviteCount' },
  { label: '团队人数', value: 'teamNum' },
  { label: '直推业绩', value: 'directInvitePerformance' },
  { label: '团队业绩', value: 'teamPerformance' },
]

const orderDirectionOptions = [
  { label: '降序', value: 'desc' },
  { label: '升序', value: 'asc' },
]

// 33221成员选项
const is33221Options = [
  { label: '是', value: 1 },
  { label: '否', value: 0 },
]

// 表格列配置
const columns = ref([
  { prop: 'userId', label: '用户ID', minWidth: 80 },
  { prop: 'inviteUserId', label: '邀请用户ID', minWidth: 100 },
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  { prop: 'levelName', label: '等级', minWidth: 100 },
  { prop: 'totalInvitePerformance', label: '直推业绩', minWidth: 120 },
  { prop: 'totalTeamNum', label: '网体人数', minWidth: 120 },
  { prop: 'totalPerformance', label: '网体业绩', minWidth: 120 },
  { prop: 'inviteCount', label: '直推人数', minWidth: 120 },
  {
    prop: 'is33221',
    label: '33221成员',
    minWidth: 100,
    formatter: (row: ShareRelation) => row.is33221 === 1 ? '是' : '否'
  },
])

// 查询项
const searchItems = ref([
  { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
  { key: 'userId', label: '用户ID', component: 'ElInput', placeholder: '请输入用户ID' },
  {
    key: 'is33221',
    label: '33221成员',
    component: 'ElSelect',
    placeholder: '请选择是否为33221成员',
    options: is33221Options,
    clearable: true
  },
  {
    key: 'orderBy',
    label: '排序字段',
    component: 'ElSelect',
    placeholder: '请选择排序字段',
    options: orderByOptions,
    clearable: true
  },
  {
    key: 'orderDirection',
    label: '排序方向',
    component: 'ElSelect',
    placeholder: '请选择排序方向',
    options: orderDirectionOptions,
    clearable: true
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return userApi.getShareRelationList({
    accountAddress: params.accountAddress,
    email: params.email,
    is33221: params.is33221,
    userId: params.userId,
    orderBy: params.orderBy,
    orderDirection: params.orderDirection || 'desc',
    current: params.page || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<ShareRelationResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取网体列表失败:', error)
    return {
      data: {
        list: [] as ShareRelation[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="网体列表">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
