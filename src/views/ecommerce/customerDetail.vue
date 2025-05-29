<script setup lang="ts">
import { ref } from 'vue'

const customer = ref({
  id: 1,
  name: '张三',
  phone: '13800000000',
  level: 'VIP',
  address: '北京市朝阳区',
})
</script>

<template>
  <FaCard title="客户详情">
    <FaDescription
      :data="customer" :columns="[
        { label: 'ID', prop: 'id' },
        { label: '客户名称', prop: 'name' },
        { label: '手机号', prop: 'phone' },
        { label: '等级', prop: 'level' },
        { label: '地址', prop: 'address' },
      ]"
    />
  </FaCard>
</template>
