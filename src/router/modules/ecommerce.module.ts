import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/ecommerce',
  component: Layout,
  redirect: '/ecommerce/index',
  name: 'ecommerce',
  meta: {
    title: $t('route.ecommerce.root'),
    icon: 'i-heroicons-solid:shopping-cart',
    defaultOpened: true,
  },
  children: [
    {
      path: 'index',
      name: 'ecommerceIndex',
      component: () => import('@/views/ecommerce/index.vue'),
      meta: {
        title: $t('route.ecommerce.index'),
      },
    },
    {
      path: 'detail/:id',
      name: 'ecommerceDetail',
      component: () => import('@/views/ecommerce/detail.vue'),
      meta: {
        title: $t('route.ecommerce.detail'),
        hidden: true,
      },
    },
    {
      path: 'edit/:id',
      name: 'ecommerceEdit',
      component: () => import('@/views/ecommerce/edit.vue'),
      meta: {
        title: $t('route.ecommerce.edit'),
        hidden: true,
      },
    },
    {
      path: 'order',
      name: 'ecommerceOrder',
      component: () => import('@/views/ecommerce/order.vue'),
      meta: {
        title: $t('route.ecommerce.order'),
      },
    },
    {
      path: 'order-detail/:id',
      name: 'ecommerceOrderDetail',
      component: () => import('@/views/ecommerce/orderDetail.vue'),
      meta: {
        title: $t('route.ecommerce.orderDetail'),
        hidden: true,
      },
    },
    {
      path: 'customer',
      name: 'ecommerceCustomer',
      component: () => import('@/views/ecommerce/customer.vue'),
      meta: {
        title: $t('route.ecommerce.customer'),
      },
    },
    {
      path: 'customer-detail/:id',
      name: 'ecommerceCustomerDetail',
      component: () => import('@/views/ecommerce/customerDetail.vue'),
      meta: {
        title: $t('route.ecommerce.customerDetail'),
        hidden: true,
      },
    },
  ],
}

export default routes
