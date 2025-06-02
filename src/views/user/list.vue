<route lang="yaml">
meta:
  title: 用户列表
</route>

<script setup lang="ts">
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import FormMode from '@/components/CrudTable/components/FormMode/index.vue'
// eslint-disable-next-line perfectionist/sort-imports
import userApi from "@/api/modules/user"
import CrudTable from '@/components/CrudTable/index.vue'

// 获取 CrudTable 实例，用于调用其暴露的方法
const crudTableRef = ref<InstanceType<typeof CrudTable> | null>(null)

interface UserInfo {
  email: string
  accountAddress: string
  status: number
  createTime: string
}

interface RequestParams {
  email?: string
  accountAddress?: string
  page?: number
  size?: number
}

// 表格列配置
const columns = ref([
  { prop: 'email', label: '用户邮箱', minWidth: 140 },
  { prop: 'accountAddress', label: '钱包地址', minWidth: 180 },
  {
    prop: 'status',
    label: '状态',
    minWidth: 100,
    formatter: (row: UserInfo) => row.status === 1 ? '正常' : '已删除'
  },
  {
    prop: 'createTime',
    label: '注册时间',
    minWidth: 160,
    formatter: (row: UserInfo) => new Date(row.createTime).toLocaleString()
  },
])

// 查询项
const searchItems = ref([
  { key: 'accountAddress', label: '钱包地址', component: 'ElInput', placeholder: '请输入钱包地址' },
  { key: 'email', label: '邮箱', component: 'ElInput', placeholder: '请输入邮箱' },
])

// 数据请求
function requestData(params: RequestParams) {
  return userApi.getUserList({
    email: params.email,
    accountAddress: params.accountAddress,
    current: params.page || 1,
    size: params.size || 10
  }).then(res => ({
    data: {
      list: res.data.records as UserInfo[],
      total: res.data.total
    }
  })).catch(error => {
    console.error('获取用户列表失败:', error)
    return {
      data: {
        list: [] as UserInfo[],
        total: 0
      }
    }
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
        <ElTag :type="row.status === 1 ? 'success' : 'danger'">{{ row.status === 1 ? '正常' : '软删除' }}</ElTag>
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
