<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  price: 0,
  stock: 0,
  status: '上架',
  desc: '',
})
const statusOptions = [
  { label: '上架', value: '上架' },
  { label: '下架', value: '下架' },
]
</script>

<template>
  <FaCard title="编辑商品">
    <FaForm v-model="form">
      <FaFormItem label="商品名称" prop="name">
        <FaInput v-model="form.name" placeholder="请输入商品名称" />
      </FaFormItem>
      <FaFormItem label="价格" prop="price">
        <FaInput v-model="form.price" type="number" placeholder="请输入价格" />
      </FaFormItem>
      <FaFormItem label="库存" prop="stock">
        <FaInput v-model="form.stock" type="number" placeholder="请输入库存" />
      </FaFormItem>
      <FaFormItem label="状态" prop="status">
        <FaSelect v-model="form.status" :options="statusOptions" />
      </FaFormItem>
      <FaFormItem label="描述" prop="desc">
        <FaInput v-model="form.desc" placeholder="请输入描述" />
      </FaFormItem>
      <FaFormItem>
        <FaButton type="primary">
          保存
        </FaButton>
      </FaFormItem>
    </FaForm>
  </FaCard>
</template>
