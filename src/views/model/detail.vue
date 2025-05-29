<script setup lang="ts">
import { ref } from 'vue'

const model = ref({
  id: 1,
  name: '示例模式',
  type: 'A',
  status: '启用',
  desc: '这是一个示例模式',
})
</script>

<template>
  <FaCard title="模式详情">
    <FaDescription
      :data="model" :columns="[
        { label: 'ID', prop: 'id' },
        { label: '模式名称', prop: 'name' },
        { label: '类型', prop: 'type' },
        { label: '状态', prop: 'status' },
        { label: '描述', prop: 'desc' },
      ]"
    />
  </FaCard>
</template>
