/* eslint-disable style/indent */
/* eslint-disable style/multiline-ternary */
/* eslint-disable perfectionist/sort-imports */
import type { Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'
import { setupLayouts } from 'virtual:meta-layouts'
import generatedRoutes from 'virtual:generated-pages'
import ActivityModule from './modules/activity.module'
import DashboardModule from './modules/dashboard.module'
import EcommerceModule from './modules/ecommerce.module'
import FinanceModule from './modules/finance.module'
import ModelModule from './modules/model.module'
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
  // {
  //   path: '/:all(.*)*',
  //   name: 'notFound',
  //   component: () => import('@/views/[...all].vue'),
  //   meta: {
  //     title: '找不到页面',
  //   },
  // },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/layouts/index.vue'),
    redirect: '/dashboard/user',
    children: [
      {
        path: 'dashboard/user',
        name: 'dashboardUser',
        component: () => import('@/views/dashboard/user.vue'),
        meta: {
          title: '用户统计',
          icon: 'mdi:account-group',
          auth: ['dashboard:user'],
        },
      },
    ],
  },
  {
    path: '/reload',
    name: 'reload',
    component: () => import('@/views/reload.vue'),
    meta: {
      title: '重新加载',
      icon: 'mdi:reload',
      auth: ['reload'],
    },
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

// 新增方法：获取完整路由（在路由守卫中使用）
export function getFinalRoutes() {
  return [
    ...systemRoutes,
    ...asyncRoutes.flatMap(route => route.children || []),
    // 生产环境最后添加404路由
    // eslint-disable-next-line node/prefer-global/process
    ...(process.env.NODE_ENV === 'production'
      ? [{
        path: '/:all(.*)*',
        name: 'notFound',
        component: () => import('@/views/[...all].vue'),
        meta: {
          title: '找不到页面',
        },
      }] : [])
  ]
}
