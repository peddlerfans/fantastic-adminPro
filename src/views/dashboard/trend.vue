<script setup lang="ts">
import { ref } from 'vue'

const trendData = ref([
  { date: '2024-06-01', value: 100 },
  { date: '2024-06-02', value: 120 },
  { date: '2024-06-03', value: 150 },
  { date: '2024-06-04', value: 180 },
])
</script>

<template>
  <FaCard title="趋势分析">
    <FaChart :data="trendData" x-field="date" y-field="value" type="line" height="300" />
  </FaCard>
</template>
