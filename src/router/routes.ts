import type { Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:meta-layouts'
import ActivityModule from './modules/activity.module'
import DashboardModule from './modules/dashboard.module'
import EcommerceModule from './modules/ecommerce.module'
import FinanceModule from './modules/finance.module'
import ModelModule from './modules/model.module'
import MultilevelMenuExample from './modules/multilevel.menu.example'
import NewModule from './modules/new.module'
import SystemModule from './modules/system.module'
import UserModule from './modules/user.module'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    // Make sure that src/views/login.vue exists, or update the path if the file is located elsewhere.
    meta: {
      whiteList: true,
      title: $t('app.route.login'),
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/user.vue'),
        meta: {
          title: $t(useSettingsStore(pinia).settings.home.title),
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: $t('app.route.reload'),
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '首页报表',
      icon: 'i-uim:box',
    },
    children: [
      DashboardModule,
    ],
  },
  {
    meta: {
      title: '用户列表',
      icon: 'i-uim:box',
    },
    children: [
      UserModule,
    ],
  },
  {
    meta: {
      title: '资金流水',
      icon: 'i-uim:box',
    },
    children: [
      FinanceModule,
    ],
  },
  {
    meta: {
      title: '模式列表',
      icon: 'i-uim:box',
    },
    children: [
      ModelModule,
    ],
  },
  {
    meta: {
      title: '电商管理',
      icon: 'i-uim:box',
    },
    children: [
      EcommerceModule,
    ],
  },
  {
    meta: {
      title: '活动列表',
      icon: 'i-uim:box',
    },
    children: [
      ActivityModule,
    ],
  },
  {
    meta: {
      title: '系统设置',
      icon: 'i-uim:box',
    },
    children: [
      SystemModule,
    ],
  },
  {
    meta: {
      title: '新模块',
      icon: 'i-uim:box',
    },
    children: [
      NewModule,
    ],
  },
]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))

export {
  asyncRoutes,
  asyncRoutesByFilesystem,
  constantRoutes,
  constantRoutesByFilesystem,
  systemRoutes,
}
