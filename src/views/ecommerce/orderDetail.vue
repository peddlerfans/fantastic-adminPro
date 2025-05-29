<script setup lang="ts">
import { ref } from 'vue'

const order = ref({
  id: 1,
  no: '20240601001',
  customer: '张三',
  amount: 299,
  status: '已支付',
  time: '2024-06-01 10:00:00',
})
</script>

<template>
  <FaCard title="订单详情">
    <FaDescription
      :data="order" :columns="[
        { label: 'ID', prop: 'id' },
        { label: '订单号', prop: 'no' },
        { label: '客户', prop: 'customer' },
        { label: '金额', prop: 'amount' },
        { label: '状态', prop: 'status' },
        { label: '下单时间', prop: 'time' },
      ]"
    />
  </FaCard>
</template>
