import { defineFakeRoute } from 'vite-plugin-fake-server/client'

/**
 * 用户相关 mock 接口
 * 你可以根据实际表单字段调整返回内容
 */
export default defineFakeRoute([
  // 获取用户详情
  {
    url: '/api/user/detail',
    method: 'get',
    response: ({ query }) => {
      // query.id 是传入的用户ID
      return {
        code: 0, // 0表示成功
        message: 'ok',
        data: {
          id: query.id || 1,
          username: '测试用户',
          email: 'test@example.com',
          address: '北京市朝阳区',
          status: 1,
        },
      }
    },
  },
  // 保存用户（新增/编辑）
  {
    url: '/api/user/save',
    method: 'post',
    response: ({ body }) => {
      // body 是提交的表单数据
      return {
        code: 0,
        message: '保存成功',
        data: body, // 返回前端提交的数据
      }
    },
  },
])
