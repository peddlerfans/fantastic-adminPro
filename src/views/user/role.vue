<script setup lang="ts">
import { ref } from 'vue'

const roles = ref([
  { id: 1, name: '管理员', desc: '拥有所有权限' },
  { id: 2, name: '普通用户', desc: '只能查看部分数据' },
])
</script>

<template>
  <FaCard title="角色管理">
    <FaTable
      :columns="[
        { label: 'ID', prop: 'id' },
        { label: '角色名称', prop: 'name' },
        { label: '描述', prop: 'desc' },
      ]" :data="roles"
    />
  </FaCard>
</template>
