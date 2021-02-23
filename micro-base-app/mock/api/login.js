import Mock from '../utils/mock'

// 注册

// 登录
// eslint-disable-next-line no-unused-vars
Mock.mock('/devApi/getSms/', 'post', options => ({
  resCode: 0,
  data: null,
  message: '验证码已发送，验证码：26tqej'
}))

// 获取验证码
// eslint-disable-next-line no-unused-vars
Mock.mock('/devApi/login/', 'post', options => ({
  resCode: 0,
  data: {
    username: 'ao@jz.com',
    token: 'b358a8a296f8277ceb921cfd67e3cc91'
  },
  username: 'ao@jz.com',
  token: 'b358a8a296f8277ceb921cfd67e3cc91',
  message: '登录成功！！'
}))

// 获取用户角色
// eslint-disable-next-line no-unused-vars
Mock.mock('/devApi/userRole/', 'post', options => ({ resCode: 0, data: ['admin'], message: 'OK' }))


