<route lang="yaml">
meta:
  title: 列表页
</route>

<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref } from 'vue'
import usePagination from '@/utils/composables/usePagination'

interface CrudTableColumn {
  prop: string
  label: string
  [key: string]: any
}

interface CrudTableSearchItem {
  key: string
  label: string
  placeholder?: string
  component: string
  [key: string]: any
}

const props = defineProps({
  columns: {
    type: Array<CrudTableColumn>,
    required: true,
  },
  searchItems: {
    type: Array<CrudTableSearchItem>,
    default: () => [],
  },
  request: {
    type: Function,
    required: true,
  },
  batchEnabled: {
    type: Boolean,
    default: true,
  },
  formMode: {
    type: String as () => 'router' | 'dialog' | 'drawer',
    default: 'router',
  },
})

const emit = defineEmits(['create', 'edit', 'delete', 'selectionChange'])

const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination()

// 表格是否自适应高度
const tableAutoHeight = ref(false)


// 搜索
const searchDefault = {}
const search = ref<Record<string, any>>({})

function searchReset() {
  search.value = {}
  Object.assign(search.value, searchDefault)
  getDataList()
}

// 批量操作
const batch = ref({
  enable: props.batchEnabled,
  selectionDataList: [] as any[], // 明确数据类型
})

// 列表
const loading = ref(false)
const dataList = ref<any[]>([])

onMounted(() => {
  getDataList()
})

onBeforeUnmount(() => {
  // 如果 formMode 为 router，可能需要在父组件手动处理事件监听和移除
  // if (props.formMode === 'router') {
  //   eventBus.off('get-data-list')
  // }
})

function getDataList() {
  loading.value = true
  const params = {
    ...getParams(),
    ...search.value,
  }
  props.request(params).then((res: any) => {
    loading.value = false
    // 确保res.data和res.data.list存在，并res.data.total是数字
    if (res && res.data) {
      dataList.value = res.data.list || []
      pagination.value.total = typeof res.data.total === 'number' ? res.data.total : 0
    }
  }).catch(() => {
    loading.value = false
    dataList.value = []
    pagination.value.total = 0
  })
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}

// 字段排序
function sortChange({ prop, order }: { prop: string, order: string }) {
  onSortChange(prop, order).then(() => getDataList())
}


// function onEdit(row: any) {
//   emit('edit', row)
// }

// function onDel(row: any) {
//   // 这里只触发事件，具体的删除逻辑由父组件实现
//   emit('delete', row)
// }

function onSelectionChange(selection: any[]) {
  batch.value.selectionDataList = selection
  emit('selectionChange', selection)
}

// 暴露一些方法给父组件调用
defineExpose({
  getDataList,
  search,
  searchReset,
})
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <FaPageMain :class="{ 'flex-1 overflow-auto': tableAutoHeight }" :main-class="{ 'flex-1 flex flex-col overflow-auto': tableAutoHeight }">
      <FaSearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="search" size="default" label-width="100px" inline-message inline class="search-form">
            <template v-for="item in props.searchItems" :key="item.key">
              <ElFormItem :label="item.label">
                <template v-if="item.component === 'ElSelect'">
                  <ElSelect
                    v-model="search[item.key]"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    class="w-full"
                  >
                    <ElOption
                      v-for="option in item.options"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </ElSelect>
                </template>
                <component
                  :is="item.component"
                  v-else
                  v-model="search[item.key]"
                  :placeholder="item.placeholder"
                  v-bind="item"
                  @keydown.enter="currentChange()"
                  @clear="currentChange()"
                />
              </ElFormItem>
            </template>
            <ElFormItem>
              <ElButton @click="searchReset()">
                重置
              </ElButton>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <FaIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton link disabled @click="toggle">
                <template #icon>
                  <FaIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top' " />
                </template>
                {{ fold ? '展开' : '收起' }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </FaSearchBar>
      <ElDivider border-style="dashed" />
      <ElSpace wrap>
        <!-- <ElButton type="primary" size="default" @click="onCreate">
          <template #icon>
            <FaIcon name="i-ep:plus" />
          </template>
          新增标准模块
        </ElButton> -->
        <slot name="batch-operations" :selection-data-list="batch.selectionDataList" />
      </ElSpace>
      <ElTable v-loading="loading" class="my-4" :data="dataList" stripe highlight-current-row border height="100%" @sort-change="sortChange" @selection-change="onSelectionChange">
        <ElTableColumn v-if="batch.enable" type="selection" align="center" fixed />
        <template v-for="column in props.columns" :key="column.prop">
          <ElTableColumn v-bind="column" :prop="column.prop" :label="column.label">
            <template #default="scope">
              <slot :name="`col-${column.prop}`" :row="scope.row">
                {{ column.formatter ? column.formatter(scope.row) : scope.row[column.prop] }}
              </slot>
            </template>
          </ElTableColumn>
        </template>
        <ElTableColumn label="操作" width="180" align="center" fixed="right">
          <template #default="scope">
            <!-- <ElButton type="primary" size="small" plain @click="onEdit(scope.row)">
              编辑
            </ElButton>
            <ElButton type="danger" size="small" plain @click="onDel(scope.row)">
              删除
            </ElButton> -->
            <slot name="operation-buttons" :row="scope.row" />
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size" :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
    </FaPageMain>
    <!-- FormMode 组件现在应该由父组件控制 -->
    <!-- <FormMode v-if="props.formMode === 'dialog' || props.formMode === 'drawer'" :id="formModeProps.id" v-model="formModeProps.visible" :mode="props.formMode" @success="getDataList" /> -->
  </div>
</template>

<style scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  margin-bottom: -18px;

  :deep(.el-form-item) {
    grid-column: auto / span 1;

    &:last-child {
      grid-column-end: -1;

      .el-form-item__content {
        justify-content: flex-end;
      }
    }
  }
}

.el-divider {
  width: calc(100% + 40px);
  margin-inline: -20px;
}
</style>
