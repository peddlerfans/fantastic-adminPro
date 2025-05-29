<script setup lang="ts">
import { ref } from 'vue'
import AuthRecordList from './33221/AuthRecordList.vue'
import DynamicRewardDetailList from './33221/DynamicRewardDetailList.vue'
import DynamicUserList from './33221/DynamicUserList.vue'
import StaticRewardList from './33221/StaticRewardList.vue'

const mainTab = ref('static')
const dynamicTab = ref('user')
</script>

<template>
  <FaCard title="33221计划列表" class="mt-4">
    <ElTabs v-model="mainTab">
      <ElTabPane label="静态奖励" name="static">
        <StaticRewardList />
      </ElTabPane>
      <ElTabPane label="动态奖励" name="dynamic">
        <ElTabs v-model="dynamicTab" tab-position="top" style="margin-bottom: 16px;">
          <ElTabPane label="用户列表" name="user">
            <DynamicUserList />
          </ElTabPane>
          <ElTabPane label="奖励明细" name="detail">
            <DynamicRewardDetailList />
          </ElTabPane>
        </ElTabs>
      </ElTabPane>
      <ElTabPane label="确权记录" name="auth">
        <AuthRecordList />
      </ElTabPane>
    </ElTabs>
  </FaCard>
</template>
