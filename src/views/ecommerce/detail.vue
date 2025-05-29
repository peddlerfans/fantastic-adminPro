<script setup lang="ts">
import { ref } from 'vue'

const product = ref({
  id: 1,
  name: '示例商品',
  price: 199,
  stock: 100,
  status: '上架',
  desc: '这是一个示例商品',
})
</script>

<template>
  <FaCard title="商品详情">
    <FaDescription
      :data="product" :columns="[
        { label: 'ID', prop: 'id' },
        { label: '商品名称', prop: 'name' },
        { label: '价格', prop: 'price' },
        { label: '库存', prop: 'stock' },
        { label: '状态', prop: 'status' },
        { label: '描述', prop: 'desc' },
      ]"
    />
  </FaCard>
</template>
