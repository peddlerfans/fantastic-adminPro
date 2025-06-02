import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'user',
  meta: {
    title: $t('route.user.root'),
    icon: 'i-heroicons-solid:user-group',
    defaultOpened: true,
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () => import('@/views/user/list.vue'),
      meta: {
        title: $t('route.user.list'),
      },
    },
    {
      path: 'detail',
      name: 'userDetail',
      component: () => import('@/views/user/detail.vue'),
      meta: {
        title: $t('route.user.detail'),
        hidden: true,
      },
    },
    {
      path: 'edit',
      name: 'userEdit',
      component: () => import('@/views/user/assets.vue'),
      meta: {
        title: $t('route.user.edit'),
        hidden: true,
      },
    },
    {
      path: 'ipAddress',
      name: 'ipAddress',
      component: () => import('@/views/user/ipAddress.vue'),
      meta: {
        title: $t('route.user.ipAddress'),
      },
    },
    {
      path: 'address',
      name: 'address',
      component: () => import('@/views/user/address.vue'),
      meta: {
        title: $t('route.user.address'),
      },
    },
  ],
}

export default routes
