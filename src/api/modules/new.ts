import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('new/list', {
    params: data,
  }),

  detail: (id: number | string) => api.get('new/detail', {
    params: {
      id,
    },
  }),

  create: (data: any) => api.post('new/create', data),

  edit: (data: any) => api.post('new/edit', data),

  delete: (id: number | string) => api.post('new/delete', {
    id,
  }),

  // 充值记录分页查询
  rechargeList: (data: any) => api.post('transactionFlow/recharge/list', data),

  // USDT划转记录分页查询
  usdtTransferList: (data: any) => api.post('transactionFlow/transfer/usdt/list', data),
}
