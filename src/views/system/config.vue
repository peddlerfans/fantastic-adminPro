<script setup lang="ts">
import { ref } from 'vue'

const configs = ref([
  { id: 1, key: 'site_name', value: '演示系统', desc: '站点名称' },
  { id: 2, key: 'max_user', value: '1000', desc: '最大用户数' },
])
</script>

<template>
  <FaCard title="参数配置">
    <FaTable
      :columns="[
        { label: 'ID', prop: 'id' },
        { label: '参数键', prop: 'key' },
        { label: '参数值', prop: 'value' },
        { label: '描述', prop: 'desc' },
        { label: '操作', prop: 'action', slot: 'action' },
      ]" :data="configs"
    >
      <template #action="{ row }">
        <FaButton size="sm">
          编辑
        </FaButton>
      </template>
    </FaTable>
  </FaCard>
</template>
