<script setup lang="ts">
import { ref } from 'vue'

const customers = ref([
  { id: 1, name: '张三', phone: '13800000000', level: 'VIP' },
  { id: 2, name: '李四', phone: '13900000000', level: '普通' },
])
</script>

<template>
  <FaCard title="客户管理">
    <FaTable
      :columns="[
        { label: 'ID', prop: 'id' },
        { label: '客户名称', prop: 'name' },
        { label: '手机号', prop: 'phone' },
        { label: '等级', prop: 'level' },
        { label: '操作', prop: 'action', slot: 'action' },
      ]" :data="customers"
    >
      <template #action="{ row }">
        <FaButton size="sm" @click="$router.push(`/ecommerce/customer-detail/${row.id}`)">
          详情
        </FaButton>
      </template>
    </FaTable>
  </FaCard>
</template>
