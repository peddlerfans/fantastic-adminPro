import api from '../index'

export default {
  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post('user/login', data, { baseURL: '/mock/' }),

  // 获取权限
  permission: () => api.get('user/permission'),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newPassword: string
  }) => api.post('user/password/edit', data),

  // 获取偏好设置
  preferences: () => api.get('user/preferences'),

  // 修改偏好设置
  preferencesEdit: (preferences: string) => api.post('user/preferences/edit', {
    preferences,
  }),

  // 获取标签栏固定标签页数据
  tabbar: () => api.get('user/tabbar'),

  // 修改标签栏固定标签页数据
  tabbarEdit: (tabbar: string) => api.post('user/tabbar/edit', {
    tabbar,
  }),

  // 获取收藏夹
  favorites: () => api.get('user/favorites'),

  // 修改收藏夹
  favoritesEdit: (favorites: string) => api.post('user/favorites/edit', {
    favorites,
  }),

  // 用户收货地址列表
  getUserAddressList: (data: any) => api.post('user/getUserAddressList', data),

  // 用户资产列表
  getUserAssetList: (data: any) => api.post('user/getUserAssetList', data),
}
