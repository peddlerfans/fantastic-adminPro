<script setup lang="ts">
import { ref } from 'vue'

const orders = ref([
  { id: 1, no: '20240601001', customer: '张三', amount: 299, status: '已支付' },
  { id: 2, no: '20240601002', customer: '李四', amount: 99, status: '待支付' },
])
</script>

<template>
  <FaCard title="订单管理">
    <FaTable
      :columns="[
        { label: 'ID', prop: 'id' },
        { label: '订单号', prop: 'no' },
        { label: '客户', prop: 'customer' },
        { label: '金额', prop: 'amount' },
        { label: '状态', prop: 'status' },
        { label: '操作', prop: 'action', slot: 'action' },
      ]" :data="orders"
    >
      <template #action="{ row }">
        <FaButton size="sm" @click="$router.push(`/ecommerce/order-detail/${row.id}`)">
          详情
        </FaButton>
      </template>
    </FaTable>
  </FaCard>
</template>
