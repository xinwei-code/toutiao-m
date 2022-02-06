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

/* 
关注用户
*/
export const addFollow = (userId: string) => {
  return request({
    method: 'POST',
    url: 'app/v1_0/user/followings',
    data: {
      target: userId,
    },
  })
}

/* 
取消关注用户
*/
export const deleteFollow = (userId: string) => {
  return request({
    method: 'DELETE',
    url: `app/v1_0/user/followings/${userId}`, //  app/v1_0/user/channels
  })
}

/* 
获取用户个人资料
*/
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `app/v1_0/user/profile`, //  app/v1_0/user/channels
  })
}

/* 
编辑用户资料
*/
export const updateUserProfile = (data: any) => {
  return request({
    method: 'PATCH',
    url: `app/v1_0/user/profile`, //  app/v1_0/user/channels
    data,
  })
}

/* 
修改用户头像资料
*/
export const updateUserAvatar = (data: any) => {
  return request({
    method: 'PATCH',
    url: `app/v1_0/user/photo`, //  app/v1_0/user/channels
    data,
  })
}
