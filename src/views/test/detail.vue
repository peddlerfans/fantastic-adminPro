<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'
import DetailForm from './components/DetailForm/index.vue'

defineOptions({
  name: 'TestDetail',
})

const route = useRoute()
const router = useRouter()
const tabbar = useTabbar()

const settingsStore = useSettingsStore()

const formRef = useTemplateRef('formRef')

function onSubmit() {
  formRef.value?.submit().then(() => {
    eventBus.emit('get-data-list')
    goBack()
  })
}

function onCancel() {
  goBack()
}

// 返回列表页
function goBack() {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.close({ name: 'pagesExampleGeneralFormModeList' })
  }
  else {
    router.push({ name: 'pagesExampleGeneralFormModeList' })
  }
}
</script>

<template>
  <div>
    <FaPageHeader :title="route.name === 'routerName' ? '新增标准模块' : '编辑标准模块'">
      <ElButton size="default" round @click="goBack">
        <template #icon>
          <FaIcon name="i-ep:arrow-left" />
        </template>
        返回
      </ElButton>
    </FaPageHeader>
    <FaPageMain>
      <ElRow>
        <ElCol :md="24" :lg="16">
          <DetailForm :id="route.params.id as string" ref="formRef" />
        </ElCol>
      </ElRow>
    </FaPageMain>
    <FaFixedActionBar>
      <ElButton type="primary" size="large" @click="onSubmit">
        提交
      </ElButton>
      <ElButton size="large" @click="onCancel">
        取消
      </ElButton>
    </FaFixedActionBar>
  </div>
</template>

<style scoped>
/* 样式 */
</style>
