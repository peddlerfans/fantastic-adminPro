<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import CrudTable from '@/components/CrudTable/index.vue'


const columns = [
  { prop: 'address', label: '用户地址', minWidth: 140 },
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'rate', label: '分成占比', minWidth: 100 },
  { prop: 'income1', label: '第一阶段收益', minWidth: 120 },
  { prop: 'income2', label: '第二阶段收益', minWidth: 120 },
  { prop: 'income3', label: '第三阶段收益', minWidth: 120 },
  { prop: 'joinTime', label: '加入时间', minWidth: 140 },
]

const searchItems = [
  { key: 'address', label: '用户地址', component: 'ElInput', placeholder: '请输入用户地址' },
  { key: 'email', label: '用户邮箱', component: 'ElInput', placeholder: '请输入用户邮箱' },
  { key: 'mode', label: '模式', component: 'ElSelect', options: [
    { label: '模式A', value: 'A' },
    { label: '模式B', value: 'B' },
  ], placeholder: '请选择模式', clearable: true },
  { key: 'stage', label: '阶段', component: 'ElSelect', options: [
    { label: '第一阶段', value: '1' },
    { label: '第二阶段', value: '2' },
    { label: '第三阶段', value: '3' },
  ], placeholder: '请选择阶段', clearable: true },
]

const mockList = ref(Array.from({ length: 20 }).map((_, i) => ({
  address: `0x${Math.random().toString(16).slice(2, 18)}`,
  email: `user${i + 1}@example.com`,
  rate: `${10 + i}%`,
  income1: Math.floor(Math.random() * 1000),
  income2: Math.floor(Math.random() * 1000),
  income3: Math.floor(Math.random() * 1000),
  joinTime: `2024-06-0${(i % 9) + 1} 10:00:00`,
  mode: i % 2 === 0 ? 'A' : 'B',
  stage: `${(i % 3) + 1}`,
})))

function requestData(params: any) {
  let list = [...mockList.value]
  if (params.address) {
    list = list.filter(item => item.address.includes(params.address))
  }
  if (params.email) {
    list = list.filter(item => item.email.includes(params.email))
  }
  if (params.mode) {
    list = list.filter(item => item.mode === params.mode)
  }
  if (params.stage) {
    list = list.filter(item => item.stage === params.stage)
  }
  const { page = 1, size = 10 } = params
  const start = (page - 1) * size
  const end = start + size
  return Promise.resolve({
    data: {
      list: list.slice(start, end),
      total: list.length,
    }
  })
}

function handleAddUser() {
  ElMessage.success('模拟新增用户成功')
}
</script>

<template>
  <div>
    <el-button type="primary" class="mb-2" @click="handleAddUser">新增用户</el-button>
    <CrudTable :columns="columns" :search-items="searchItems" :request="requestData" :batch-enabled="false" />
  </div>
</template>
