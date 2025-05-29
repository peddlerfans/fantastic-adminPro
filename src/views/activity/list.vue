<script setup lang="ts">
import { ref } from 'vue'

const activities = ref([
  { id: 1, name: '春季促销', date: '2024-03-01' },
  { id: 2, name: '夏季新品发布', date: '2024-06-15' },
])
</script>

<template>
  <div>
    <h2>活动列表</h2>
    <table border="1" width="100%">
      <tr><th>ID</th><th>活动名称</th><th>时间</th></tr>
      <tr v-for="item in activities" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.date }}</td>
      </tr>
    </table>
  </div>
</template>
