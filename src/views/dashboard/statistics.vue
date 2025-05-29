<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { name: '用户数', value: 1200 },
  { name: '订单数', value: 350 },
  { name: '销售额', value: 98000 },
])
</script>

<template>
  <FaCard title="数据统计">
    <FaTable
      :columns="[
        { label: '指标', prop: 'name' },
        { label: '数值', prop: 'value' },
      ]" :data="stats"
    />
  </FaCard>
</template>
