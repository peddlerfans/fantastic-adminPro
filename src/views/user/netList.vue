<script setup lang="ts">
import {ElButton, ElInput, ElOption, ElSelect, ElTable, ElTableColumn, ElTag } from 'element-plus'
import { ref } from 'vue'

// 查询条件
const filters = ref({
  address: '',
  email: '',
  club: '',
  group33221: '',
})

// 俱乐部和33221选项（可根据实际接口替换）
const clubOptions = [
  { label: '全部', value: '' },
  { label: '俱乐部A', value: 'A' },
  { label: '俱乐部B', value: 'B' },
]
const group33221Options = [
  { label: '全部', value: '' },
  { label: '33221成员', value: '1' },
  { label: '非33221成员', value: '0' },
]

// 网体信息 mock 数据
const netList = ref([
  {
    email: 'user1@example.com',
    address: '北京',
    level: 'VIP1',
    directCount: 5,
    directPerformance: 10000,
    netCount: 50,
    netPerformance: 50000,
    isClub: true,
    is33221: true,
  },
  {
    email: 'user2@example.com',
    address: '上海',
    level: 'VIP2',
    directCount: 3,
    directPerformance: 8000,
    netCount: 30,
    netPerformance: 30000,
    isClub: false,
    is33221: false,
  },
  // ...更多数据
])

// 查询方法（这里只做前端过滤，实际应请求后端）
function handleSearch() {
  // 这里只是演示，实际应请求接口
  // 可以根据filters.value过滤netList.value
}

function handleReset() {
  filters.value = { address: '', email: '', club: '', group33221: '' }
  handleSearch()
}
</script>

<template>
  <FaCard title="网体列表">
    <!-- 查询条件 -->
    <div style="margin-bottom: 16px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <ElInput v-model="filters.address" placeholder="根据地址查询" clearable style="width: 180px;" />
      <ElInput v-model="filters.email" placeholder="根据邮箱查询" clearable style="width: 180px;" />
      <ElSelect v-model="filters.club" placeholder="根据俱乐部筛选" clearable style="width: 180px;">
        <ElOption v-for="item in clubOptions" :key="item.value" :label="item.label" :value="item.value" />
      </ElSelect>
      <ElSelect v-model="filters.group33221" placeholder="根据33221筛选" clearable style="width: 180px;">
        <ElOption v-for="item in group33221Options" :key="item.value" :label="item.label" :value="item.value" />
      </ElSelect>
      <ElButton type="primary" @click="handleSearch">查询</ElButton>
      <ElButton @click="handleReset">重置</ElButton>
    </div>
    <!-- 网体信息表格 -->
    <ElTable :data="netList" border stripe style="width: 100%">
      <ElTableColumn prop="email" label="用户邮箱" min-width="120" />
      <ElTableColumn prop="address" label="用户地址" min-width="100" />
      <ElTableColumn prop="level" label="用户等级" min-width="80" />
      <ElTableColumn prop="directCount" label="直推人数" min-width="80" />
      <ElTableColumn prop="directPerformance" label="直推业绩" min-width="100" />
      <ElTableColumn prop="netCount" label="网体人数" min-width="80" />
      <ElTableColumn prop="netPerformance" label="网体业绩" min-width="100" />
      <ElTableColumn prop="isClub" label="是否俱乐部成员" min-width="120">
        <template #default="{ row }">
          <ElTag :type="row.isClub ? 'success' : 'info'">{{ row.isClub ? '是' : '否' }}</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="is33221" label="是否33221成员" min-width="120">
        <template #default="{ row }">
          <ElTag :type="row.is33221 ? 'success' : 'info'">{{ row.is33221 ? '是' : '否' }}</ElTag>
        </template>
      </ElTableColumn>
    </ElTable>
  </FaCard>
</template>
