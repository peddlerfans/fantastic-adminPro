import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('test/list', {
    params: data,
  }),

  detail: (id: number | string) => api.get('test/detail', {
    params: {
      id,
    },
  }),

  create: (data: any) => api.post('test/create', data),

  edit: (data: any) => api.post('test/edit', data),

  delete: (id: number | string) => api.post('test/delete', {
    id,
  }),

  // 用户报表查询
  userStatistics: (data: { startDate: string, endDate: string }) => api.post('statistics/user/query', data),

  // 设备报表查询
  deviceStatistics: (data: { startDate: string, endDate: string }) => api.post('statistics/device2/query', data),

  // 充值报表查询
  rechargeStatistics: (data: { startDate: string, endDate: string }) => api.post('statistics/tokenRecharge/query', data),

  // 提现报表查询
  withdrawStatistics: (data: { startDate: string, endDate: string }) => api.post('statistics/tokenWithdraw/query', data),

  // 智算报表查询
  aiStatistics: (data: { startDate: string, endDate: string }) => api.post('statistics/computingAiUserDevice/query', data),

  // 奖励报表查询
  rewardStatistics: (data: { startDate: string, endDate: string }) => api.post('statistics/reward/query', data),


}
