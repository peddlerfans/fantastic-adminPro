<script setup lang="ts">
import type { Props } from '../DetailForm/index.vue'
import DetailForm from '../DetailForm/index.vue'

const props = defineProps<{
  mode: 'dialog' | 'drawer'
} & Props>()

const emits = defineEmits<{
  success: []
}>()

const visible = defineModel<boolean>({
  default: false,
})

const formRef = useTemplateRef('formRef')

const title = computed(() => props.id === '' ? '新增标准模块' : '编辑标准模块')

function onSubmit() {
  // submit() 为组件内部方法
  formRef.value?.submit().then(() => {
    emits('success')
    onCancel()
  })
}

function onCancel() {
  visible.value = false
}
</script>

<template>
  <div>
    <ElDialog v-if="props.mode === 'dialog'" v-model="visible" :title="title" width="600px" :close-on-click-modal="false" append-to-body destroy-on-close>
      <DetailForm ref="formRef" v-bind="$props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确定
        </ElButton>
      </template>
    </ElDialog>
    <ElDrawer v-else-if="props.mode === 'drawer'" v-model="visible" :title="title" size="600px" :close-on-click-modal="false" destroy-on-close>
      <DetailForm ref="formRef" v-bind="$props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确定
        </ElButton>
      </template>
    </ElDrawer>
  </div>
</template>
