import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/model',
  component: Layout,
  redirect: '/model/index',
  name: 'model',
  meta: {
    title: $t('route.model.root'),
    icon: 'i-heroicons-solid:template',
    defaultOpened: true,
  },
  children: [
    {
      path: 'eliteList',
      name: 'modelEliteList',
      component: () => import('@/views/model/eliteList.vue'),
      meta: {
        title: $t('route.model.eliteList'),
      },
    },
    {
      path: 'aiDeviceList',
      name: 'modelAiDeviceList',
      component: () => import('@/views/model/aiDeviceList.vue'),
      meta: {
        title: $t('route.model.aiDeviceList'),
        hidden: true,
      },
    },
    {
      path: 'deviceList',
      name: 'modelDeviceList',
      component: () => import('@/views/model/deviceList.vue'),
      meta: {
        title: $t('route.model.deviceList'),
        hidden: true,
      },
    },
    {
      path: 'virtualDeviceList',
      name: 'VirtualDeviceList',
      component: () => import('@/views/model/virtualDeviceList.vue'),
      meta: {
        title: '虚拟设备列表',
        hidden: true,
      },
    },
    {
      path: 'insuranceList',
      name: 'modelInsuranceList',
      component: () => import('@/views/model/insuranceList.vue'),
      meta: {
        title: $t('route.model.insuranceList'),
        hidden: true,
      },
    },
    {
      path: '33221List',
      name: 'model33221List',
      component: () => import('@/views/model/33221List.vue'),
      meta: {
        title: $t('route.model.33221List'),
        hidden: true,
      },
    },
  ],
}

export default routes
