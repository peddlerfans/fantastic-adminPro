import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/new',
  component: Layout,
  redirect: '/new/list',
  name: 'new',
  meta: {
    title: $t('route.new.root'),
    icon: 'i-heroicons-document-plus',
    defaultOpened: true,
  },
  children: [
    {
      path: 'list',
      name: 'newList',
      component: () => import('@/components/CrudTable/index.vue'),
      meta: {
        title: $t('route.new.list'),
      },
    },
    // {
    //   path: 'detail',
    //   name: 'newDetail',
    //   component: () => import('@/views/new/detail.vue'),
    //   meta: {
    //     title: $t('route.new.detail'),
    //   },
    // },
  ],
}

export default routes
