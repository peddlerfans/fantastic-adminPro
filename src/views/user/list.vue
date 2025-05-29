<route lang="yaml">
meta:
  title: 用户列表
</route>

<script setup lang="ts">
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import FormMode from '@/components/CrudTable/components/FormMode/index.vue'

import CrudTable from '@/components/CrudTable/index.vue'

// 获取 CrudTable 实例，用于调用其暴露的方法
const crudTableRef = ref<InstanceType<typeof CrudTable> | null>(null)

// 定义表格列
const columns = ref([
  {
    prop: 'id',
    label: '用户ID',
    width: 80,
  },
  {
    prop: 'username',
    label: '用户名',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'status',
    label: '状态',
    width: 80,
    formatter: (row: any) => (row.status === 1 ? '正常' : '冻结'),
  },
])

// 定义搜索项
const searchItems = ref([
  {
    key: 'address',
    label: '地址',
    component: 'ElInput',
    placeholder: '请输入地址',
  },
  {
    key: 'email',
    label: '邮箱',
    component: 'ElInput',
    placeholder: '请输入邮箱',
  },
])

// 模拟数据请求
function requestData(params: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockList = Array.from({ length: 20 }).map((_, index) => ({
        id: index + 1,
        username: `用户${index + 1}`,
        email: `user${index + 1}@example.com`,
        address: `地址${index + 1}`,
        status: index % 2 === 0 ? 1 : 0, // 1: 正常, 0: 冻结
      }))

      // 模拟筛选
      let filteredList = mockList
      if (params.address) {
        filteredList = filteredList.filter(item => item.address.includes(params.address))
      }
      if (params.email) {
        filteredList = filteredList.filter(item => item.email.includes(params.email))
      }

      // 模拟分页
      const { page, size } = params
      const startIndex = (page - 1) * size
      const endIndex = startIndex + size
      const paginatedList = filteredList.slice(startIndex, endIndex)

      resolve({
        data: {
          list: paginatedList,
          total: filteredList.length,
        },
      })
    }, 500)
  })
}

// 控制新增/编辑弹窗的显示
const formModeProps = ref({
  visible: false,
  id: '', // 编辑时传递用户ID，新增时为空字符串
  mode: 'dialog' as 'dialog' | 'drawer', // 或 'drawer'
})

// 处理 CrudTable 触发的事件
function handleCreate() {
  formModeProps.value.id = ''
  formModeProps.value.visible = true
}

function handleEdit(row: any) {
  formModeProps.value.id = row.id
  formModeProps.value.visible = true
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确认删除用户「${row.username}」吗？`, '确认信息').then(() => {
    ElMessage.success(`模拟删除用户: ${row.username}`)
    // TODO: 调用实际删除接口并刷新列表
    crudTableRef.value?.getDataList()
  }).catch(() => {})
}

function handleSelectionChange(selection: any[]) {
  // TODO: 处理批量操作
}

// 冻结账户操作
function handleFreezeAccount(row: any) {
  ElMessageBox.confirm(`确认冻结用户「${row.username}」吗？`, '确认信息').then(() => {
    ElMessage.success(`模拟冻结用户: ${row.username}`)
    // TODO: 调用实际冻结接口并刷新列表
    crudTableRef.value?.getDataList()
  }).catch(() => {})
}

// FormMode 弹窗成功后的回调
function handleFormSuccess() {
  crudTableRef.value?.getDataList()
}
</script>

<template>
  <div>
    <CrudTable
      ref="crudTableRef"
      :columns="columns"
      :search-items="searchItems"
      :request="requestData"
      @create="handleCreate"
      @edit="handleEdit"
      @delete="handleDelete"
      @selection-change="handleSelectionChange"
    >
      <!-- 在这里通过 slot 添加其他批量操作按钮 -->
      <template #batch-operations="{ selectionDataList }">
        <!-- 例如：批量冻结 -->
        <!-- <ElButton :disabled="!selectionDataList.length" @click="handleBatchFreeze(selectionDataList)">批量冻结</ElButton> -->
      </template>

      <!-- 在这里通过 slot 添加操作列的其他按钮 -->
      <template #operation-buttons="{ row }">
        <ElButton type="warning" size="small" plain @click="handleFreezeAccount(row)">
          {{ row.status === 1 ? '冻结' : '解冻' }}
        </ElButton>
        <!-- 其他操作按钮 -->
      </template>

      <!-- 如果需要自定义列的内容，可以使用具名 slot，slot名为 col-加上列的 prop -->
      <template #col-status="{ row }">
        <ElTag :type="row.status === 1 ? 'success' : 'danger'">{{ row.status === 1 ? '正常' : '冻结' }}</ElTag>
      </template>

    </CrudTable>

    <!-- 新增/编辑弹窗 -->
    <FormMode
      :id="formModeProps.id"
      v-model="formModeProps.visible"
      :mode="formModeProps.mode"
      @success="handleFormSuccess"
    />
  </div>
</template>
