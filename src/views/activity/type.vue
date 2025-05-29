<script setup lang="ts">
import { ref } from 'vue'

const types = ref([
  { id: 1, name: '促销', desc: '促销活动' },
  { id: 2, name: '发布会', desc: '新品发布会' },
])
</script>

<template>
  <FaCard title="活动类型管理">
    <FaTable
      :columns="[
        { label: 'ID', prop: 'id' },
        { label: '类型名称', prop: 'name' },
        { label: '描述', prop: 'desc' },
      ]" :data="types"
    />
  </FaCard>
</template>
