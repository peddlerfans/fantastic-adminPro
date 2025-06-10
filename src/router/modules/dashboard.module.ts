import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/dashboard',
  component: Layout,
  name: 'dashboard',
  meta: {
    title: $t('route.dashboard.root'),
    icon: 'i-heroicons-solid:chart-bar',
    defaultOpened: true,
  },
  children: [
    {
      path: 'user',
      name: 'dashboardUser',
      component: () => import('@/views/dashboard/user.vue'),
      meta: {
        title: $t('route.dashboard.user'),
      },
    },
    {
      path: 'device',
      name: 'dashboardDevice',
      component: () => import('@/views/dashboard/device.vue'),
      meta: {
        title: $t('route.dashboard.device'),
      },
    },
    {
      path: 'recharge',
      name: 'dashboardRecharge',
      component: () => import('@/views/dashboard/recharge.vue'),
      meta: {
        title: $t('route.dashboard.recharge'),
      },
    },
    {
      path: 'withdraw',
      name: 'dashboardWithdraw',
      component: () => import('@/views/dashboard/withdraw.vue'),
      meta: {
        title: $t('route.dashboard.withdraw'),
      },
    },
    {
      path: 'smart',
      name: 'dashboardSmart',
      component: () => import('@/views/dashboard/smart.vue'),
      meta: {
        title: $t('route.dashboard.smart'),
      },
    },
    {
      path: 'reward',
      name: 'dashboardReward',
      component: () => import('@/views/dashboard/reward.vue'),
      meta: {
        title: $t('route.dashboard.reward'),
      },
    },
  ],
}

export default routes
