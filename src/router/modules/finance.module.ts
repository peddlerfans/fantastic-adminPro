import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/finance',
  component: Layout,
  redirect: '/finance/index',
  name: 'finance',
  meta: {
    title: $t('route.finance.root'),
    icon: 'i-heroicons-solid:currency-dollar',
    defaultOpened: true,
  },
  children: [
    {
      path: 'index',
      name: 'financeIndex',
      component: () => import('@/views/finance/index.vue'),
      meta: {
        title: $t('route.finance.index'),
      },
    },
    {
      path: 'transfer',
      name: 'financeTransfer',
      component: () => import('@/views/finance/transfer.vue'),
      meta: {
        title: $t('route.finance.transfer'),
        hidden: true,
      },
    },
    {
      path: 'withdraw',
      name: 'financeWithdraw',
      component: () => import('@/views/finance/withdraw.vue'),
      meta: {
        title: $t('route.finance.withdraw'),
      },
    },
    {
      path: 'point',
      name: 'financePoint',
      component: () => import('@/views/finance/point.vue'),
      meta: {
        title: $t('route.finance.point'),
        hidden: true,
      },
    },
    {
      path: 'token',
      name: 'financeToken',
      component: () => import('@/views/finance/token.vue'),
      meta: {
        title: $t('route.finance.token'),
        hidden: true,
      },
    },
    {
      path: 'step',
      name: 'financeStep',
      component: () => import('@/views/finance/step.vue'),
      meta: {
        title: $t('route.finance.step'),
        hidden: true,
      },
    },
  ],
}

export default routes
