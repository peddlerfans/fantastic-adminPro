<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  siteName: '演示系统',
  maxUser: 1000,
  theme: 'light',
})
const themeOptions = [
  { label: '明亮', value: 'light' },
  { label: '暗黑', value: 'dark' },
]
</script>

<template>
  <FaCard title="系统设置">
    <FaForm v-model="form">
      <FaFormItem label="站点名称" prop="siteName">
        <FaInput v-model="form.siteName" placeholder="请输入站点名称" />
      </FaFormItem>
      <FaFormItem label="最大用户数" prop="maxUser">
        <FaInput v-model="form.maxUser" type="number" placeholder="请输入最大用户数" />
      </FaFormItem>
      <FaFormItem label="主题" prop="theme">
        <FaSelect v-model="form.theme" :options="themeOptions" />
      </FaFormItem>
      <FaFormItem>
        <FaButton type="primary">
          保存
        </FaButton>
      </FaFormItem>
    </FaForm>
  </FaCard>
</template>
