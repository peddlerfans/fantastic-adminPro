<script setup lang="ts">
import { ref } from 'vue'

const operations = ref([
  { id: 1, user: 'admin', action: '登录', time: '2024-06-01 10:00:00' },
  { id: 2, user: '张三', action: '修改参数', time: '2024-06-01 11:00:00' },
])
</script>

<template>
  <FaCard title="操作记录">
    <FaTable
      :columns="[
        { label: 'ID', prop: 'id' },
        { label: '用户', prop: 'user' },
        { label: '操作', prop: 'action' },
        { label: '时间', prop: 'time' },
      ]" :data="operations"
    />
  </FaCard>
</template>
