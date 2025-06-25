<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import modelApi from "@/api/modules/model"
import CrudTable from '@/components/CrudTable/index.vue'

interface DeviceRecord {
  deviceName: string
  deviceNo: string
  deviceStatus: number
  isAuthorized: number
  point: number
  expireStart: string
  isPledged: number
  accountAddress: string
  email: string
}

interface DeviceResponse {
  records: DeviceRecord[]
  total: number
}

interface RequestParams {
  email?: string
  accountAddress?: string
  status?: number
  deviceName?: string
  current?: number
  size?: number
}

// 设备状态选项
const statusOptions = [
  { label: '正常', value: 1 },
  { label: '失效', value: 0 },
]

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 180 },
  { prop: 'deviceName', label: '设备ID', minWidth: 180 },
  { prop: 'deviceNo', label: '设备编号', minWidth: 180 },
  { prop: 'accountAddress', label: '用户地址', minWidth: 180 },

  {
    prop: 'deviceStatus',
    label: '设备状态',
    minWidth: 100,
    formatter: (row: DeviceRecord) => {
      const option = statusOptions.find(opt => opt.value === row.deviceStatus)
      return option ? option.label : '-'
    }
  },
  {
    prop: 'isAuthorized',
    label: '确权状态',
    minWidth: 100,
    formatter: (row: DeviceRecord) => {
      return row.isAuthorized === 1 ? '已确权' : '未确权'
    }
  },
  {
    prop: 'point',
    label: '积分',
    minWidth: 120,
    formatter: (row: DeviceRecord) => {
      return row.point ? row.point.toFixed(8) : '-'
    }
  },
  {
    prop: 'isPledged',
    label: '质押状态',
    minWidth: 100,
    formatter: (row: DeviceRecord) => {
      return row.isPledged === 1 ? '已质押' : '未质押'
    }
  },

  {
    prop: 'expireStart',
    label: '激活时间',
    minWidth: 160,
    formatter: (row: DeviceRecord) => {
      if (!row.expireStart) return '-'
      return new Date(row.expireStart).toLocaleString()
    }
  },
])

// 查询项
const searchItems = ref([
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'accountAddress', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'deviceName', label: '设备ID', component: 'ElInput', placeholder: '请输入设备ID' },
  {
    key: 'status',
    label: '设备状态',
    component: 'ElSelect',
    options: statusOptions,
    placeholder: '请选择设备状态',
    clearable: true
  },
])

// 数据请求
function requestData(params: RequestParams) {
  return modelApi.getDeviceList({
    email: params.email,
    accountAddress: params.accountAddress,
    status: params.status,
    deviceName: params.deviceName,
    current: params.current || 1,
    size: params.size || 10,
  }).then((res: AxiosResponse<DeviceResponse>) => ({
    data: {
      list: res.data.records,
      total: res.data.total,
    }
  })).catch((error: unknown) => {
    console.error('获取实体设备列表失败:', error)
    return {
      data: {
        list: [] as DeviceRecord[],
        total: 0,
      }
    }
  })
}
</script>

<template>
  <FaCard title="实体设备列表">
    <CrudTable
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      :batch-enabled="false"
    />
  </FaCard>
</template>
