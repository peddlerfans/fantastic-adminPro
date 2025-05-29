import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/system',
  component: Layout,
  redirect: '/system/settings',
  name: 'system',
  meta: {
    title: $t('route.system.root'),
    icon: 'i-heroicons-solid:cog',
    defaultOpened: true,
  },
  children: [
    {
      path: 'settings',
      name: 'systemSettings',
      component: () => import('@/views/system/settings.vue'),
      meta: {
        title: $t('route.system.settings'),
      },
    },
    {
      path: 'log',
      name: 'systemLog',
      component: () => import('@/views/system/log.vue'),
      meta: {
        title: $t('route.system.log'),
      },
    },
  ],
}

export default routes
