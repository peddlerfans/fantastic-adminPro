<script setup lang="ts">
import { ref } from 'vue'

const permissions = ref([
  { id: 1, name: '用户管理', code: 'user_manage' },
  { id: 2, name: '角色管理', code: 'role_manage' },
])
</script>

<template>
  <FaCard title="权限管理">
    <FaTable
      :columns="[
        { label: 'ID', prop: 'id' },
        { label: '权限名称', prop: 'name' },
        { label: '权限标识', prop: 'code' },
      ]" :data="permissions"
    />
  </FaCard>
</template>
