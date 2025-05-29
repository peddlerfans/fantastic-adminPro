<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  type: '',
  date: '',
  status: '未开始',
})
const types = [
  { label: '促销', value: '促销' },
  { label: '发布会', value: '发布会' },
]
const statusOptions = [
  { label: '未开始', value: '未开始' },
  { label: '进行中', value: '进行中' },
  { label: '已结束', value: '已结束' },
]
</script>

<template>
  <FaCard title="编辑活动">
    <FaForm v-model="form">
      <FaFormItem label="活动名称" prop="name">
        <FaInput v-model="form.name" placeholder="请输入活动名称" />
      </FaFormItem>
      <FaFormItem label="类型" prop="type">
        <FaSelect v-model="form.type" :options="types" />
      </FaFormItem>
      <FaFormItem label="日期" prop="date">
        <FaInput v-model="form.date" placeholder="请输入日期" />
      </FaFormItem>
      <FaFormItem label="状态" prop="status">
        <FaSelect v-model="form.status" :options="statusOptions" />
      </FaFormItem>
      <FaFormItem>
        <FaButton type="primary">
          保存
        </FaButton>
      </FaFormItem>
    </FaForm>
  </FaCard>
</template>
