import api from '../index'

export default {
  // 精英榜列表查询
  getEliteList: (data: any) => api.post('/api/mode/getUserRankingListPage', data),

  // 智算设备列表查询
  getAiDeviceList: (data: any) => api.post('/api/mode/getComputingAiDeviceList', data),

  // 实体设备列表查询
  getDeviceList: (data: any) => api.post('/api/mode/getUserDeviceList', data),

  // 虚拟设备列表查询
  getVirtualDeviceList: (data: any) => api.post('/api/mode/getUserDeviceVirtualList', data),

  // 保险列表查询
  getInsuranceList: (data: any) => api.post('/api/mode/getInsuranceDevicePage', data),

  // 静态奖励
  getStaticRewardList: (data: any) => api.post('/api/mode/33221/getStaticMotivateList', data),

  // 动态奖励用户列表查询
  getDynamicRewardUserList: (data: any) => api.post('/api/mode/33221/getDynamicMotivateUserList', data),

  // 动态奖励列表查询
  getDynamicRewardList: (data: any) => api.post('/api/mode/33221/getDynamicMotivateList', data),

  // 确权记录列表查询
  getConfirmRecordList: (data: any) => api.post('/api/mode/33221/getConfirmRecordPage', data),
}
