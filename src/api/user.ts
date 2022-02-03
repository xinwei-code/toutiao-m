import request from '../utils/request'
import { ILoginInfo } from '../types/user'

/* 
用户登录
*/
export const login = (data: ILoginInfo) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data,
  })
}

/* 
发送短信验证码
*/
export const sendSms = (mobile: string) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}

/* 
获取登录用户的信息
*/
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`,
    // headers: {
    //   Authorization:`Bearer ${userStore.user.token}`
    // }
  })
}

/* 
获取登录用户频道列表
*/
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user/channels', //  app/v1_0/user/channels
  })
}
