<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from "axios"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import newApi from "@/api/modules/new"
import CrudTable from "@/components/CrudTable/index.vue"

interface TokenRecord {
  email: string
  accountAddress: string
  type: string
  type2: string
  amount: number
  createTime: string
}

interface TokenResponse {
  records: TokenRecord[]
  total: number
}

interface RequestParams {
  type?: string
  type2?: string
  accountAddress?: string
  current?: number
  size?: number
  email?: string
}

const { t } = useI18n()

// 表格列配置
const columns = ref([
  { prop: "email", label: "用户邮箱", minWidth: 180 },
  { prop: "accountAddress", label: "钱包地址", minWidth: 180 },
  { prop: "type", label: "代币来源类型", minWidth: 120 },
  {
    prop: "type2",
    label: "代币来源细分类型",
    minWidth: 120,
    formatter: (row: TokenRecord) => {
      return t(`tokenType2.${row.type2}`)
    },
  },
  {
    prop: "amount",
    label: "代币数量",
    minWidth: 120,
    formatter: (row: TokenRecord) => {
      return row.amount ? row.amount.toLocaleString() : "-"
    },
  },
  {
    prop: "createTime",
    label: "创建时间",
    minWidth: 160,
    formatter: (row: TokenRecord) => {
      if (!row.createTime) return "-"
      return new Date(row.createTime).toLocaleString()
    },
  },
])

// 查询项
const searchItems = ref([
  {
    key: "email",
    label: "邮箱地址",
    component: "ElInput",
    placeholder: "请输入邮箱",
  },
  {
    key: "accountAddress",
    label: "钱包地址",
    component: "ElInput",
    placeholder: "请输入钱包地址",
  },
  {
    key: "type",
    label: "代币来源类型",
    component: "ElInput",
    placeholder: "请输入代币来源类型",
  },
  {
    key: "type2",
    label: "代币来源细分类型",
    component: "ElInput",
    placeholder: "请输入代币来源细分类型",
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return newApi
    .tokenList({
      type: params.type,
      type2: params.type2,
      accountAddress: params.accountAddress,
      current: params.current || 1,
      size: params.size || 10,
      email: params.email
    })
    .then((res: AxiosResponse<TokenResponse>) => ({
      data: {
        list: res.data.records,
        total: res.data.total,
      },
    }))
    .catch((error: unknown) => {
      console.error("获取代币记录失败:", error)
      return {
        data: {
          list: [] as TokenRecord[],
          total: 0,
        },
      }
    })
}
</script>

<template>
  <FaCard title="代币记录">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
