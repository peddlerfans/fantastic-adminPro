import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/activity',
  component: Layout,
  redirect: '/activity/list',
  name: 'activity',
  meta: {
    title: $t('route.activity.root'),
    icon: 'i-heroicons-solid:calendar',
    defaultOpened: true,
  },
  children: [
    {
      path: 'list',
      name: 'activityList',
      component: () => import('@/views/activity/list.vue'),
      meta: {
        title: $t('route.activity.list'),

      },
    },
    {
      path: 'detail/:id',
      name: 'activityDetail',
      component: () => import('@/views/activity/detail.vue'),
      meta: {
        title: $t('route.activity.detail'),
        hidden: true,
      },
    },
    {
      path: 'edit/:id',
      name: 'activityEdit',
      component: () => import('@/views/activity/edit.vue'),
      meta: {
        title: $t('route.activity.edit'),
        hidden: true,
      },
    },
    {
      path: 'type',
      name: 'activityType',
      component: () => import('@/views/activity/type.vue'),
      meta: {
        title: $t('route.activity.type'),
      },
    },
  ],
}

export default routes
